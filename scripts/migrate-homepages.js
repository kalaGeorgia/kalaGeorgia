#!/usr/bin/env node
'use strict';

/**
 * One-off migration helper for the /en/ /ru/ /ka/ move.
 *
 * - turns the client-side language switcher into real crawlable links
 *   (the URL is now the source of truth for language, not localStorage);
 * - pins each homepage to its own language via KALA_FORCE_LANG;
 * - adds the wave-1 landing-page cluster to the footer of every page.
 *
 * Safe to re-run: every step is skipped when it has already been applied.
 */

const fs = require('fs');
const path = require('path');

const { LANGS, CHROME } = require('../seo/chrome.js');
const { GROUP_SEGMENT, PAGES } = require('../seo/pages.js');

const ROOT = path.join(__dirname, '..');

const CLUSTER = [
  'private-transfers-georgia',
  'airport-transfer-tbilisi',
  'private-driver-georgia',
  'private-tours-georgia',
  'corporate-transport-georgia'
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function pageUrl(page, lang) {
  const seg = page.group ? GROUP_SEGMENT[page.group][lang] + '/' : '';
  return '/' + lang + '/' + seg + page.slug[lang] + '/';
}

function langSwitchLinks(lang, indent) {
  return LANGS.map((other) => {
    const href = '/' + other + '/';
    const cls = other === lang ? ' class="is-active" aria-current="true"' : '';
    return `${indent}<a href="${href}"${cls} hreflang="${other}">${other.toUpperCase()}</a>`;
  }).join('\n');
}

function footerColumn(lang) {
  const c = CHROME[lang];
  const links = CLUSTER.map((key) => {
    const p = PAGES.find((x) => x.key === key);
    return `          <li><a href="${pageUrl(p, lang)}">${esc(p.l[lang].crumb)}</a></li>`;
  }).join('\n');

  return `      <div>
        <h4>${esc(c.footer.servicesTitle)}</h4>
        <ul>
${links}
        </ul>
      </div>
`;
}

function migrate(file, lang) {
  const full = path.join(ROOT, file);
  let html = fs.readFileSync(full, 'utf8');
  const before = html;
  const done = [];

  // 1. Language switcher: buttons -> links.
  const switcher = /(<div class="lang-switch" id="langSwitch">\n)([\s\S]*?)(\n\s*<\/div>)/;
  const m = html.match(switcher);
  if (m && m[2].includes('<button')) {
    const indent = (m[2].match(/^\s*/) || [''])[0];
    html = html.replace(switcher, `$1${langSwitchLinks(lang, indent)}$3`);
    done.push('lang switcher -> links');
  }

  // 2. Pin the page to its own language before i18n.js runs.
  if (!html.includes('KALA_FORCE_LANG')) {
    html = html.replace(
      '<script src="/js/script.js"></script>',
      `<script>window.KALA_FORCE_LANG = "${lang}";</script>\n<script src="/js/script.js"></script>`
    );
    done.push('KALA_FORCE_LANG');
  }

  // 3. Footer column linking into the new landing-page cluster.
  if (!html.includes('site-footer__grid-cluster-added')) {
    const anchor = /(\n)( *)(<div>\n\s*<h4 data-i18n="footer_contacts">)/;
    if (anchor.test(html)) {
      html = html.replace(
        anchor,
        `$1<!-- site-footer__grid-cluster-added -->\n${footerColumn(lang)}$2$3`
      );
      done.push('footer cluster column');
    }
  }

  if (html !== before) {
    fs.writeFileSync(full, html, 'utf8');
  }
  console.log(`${file}: ${done.length ? done.join(', ') : 'already up to date'}`);
}

migrate('en/index.html', 'en');
migrate('ru/index.html', 'ru');
migrate('ka/index.html', 'ka');
