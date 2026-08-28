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
const { GROUP_SEGMENT, FOOTER_CLUSTER, PAGES } = require('../seo/pages.js');

const ROOT = path.join(__dirname, '..');

const START = '<!-- cluster:start -->';
const END = '<!-- cluster:end -->';
const LEGACY = '<!-- site-footer__grid-cluster-added -->';

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
  const links = FOOTER_CLUSTER.map((key) => {
    const p = PAGES.find((x) => x.key === key);
    return `          <li><a href="${pageUrl(p, lang)}">${esc(p.l[lang].crumb)}</a></li>`;
  }).join('\n');

  return `${START}
      <div>
        <h4>${esc(c.footer.servicesTitle)}</h4>
        <ul>
${links}
        </ul>
      </div>
${END}
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

  // 3. Footer column linking into the landing-page cluster. Rewritten in
  //    place on every run so adding a page to FOOTER_CLUSTER reaches the
  //    homepages too, not just the generated pages.
  const column = footerColumn(lang);

  if (html.includes(START) && html.includes(END)) {
    const current = html.slice(html.indexOf(START), html.indexOf(END) + END.length + 1);
    if (current !== column) {
      html = html.slice(0, html.indexOf(START)) + column + html.slice(html.indexOf(END) + END.length + 1);
      done.push('footer cluster column updated');
    }
  } else if (html.includes(LEGACY)) {
    // Upgrade the first version, which had only an opening marker.
    const from = html.indexOf(LEGACY);
    const to = html.indexOf('</div>', html.indexOf('</ul>', from)) + '</div>\n'.length;
    html = html.slice(0, from) + column + html.slice(to);
    done.push('footer cluster column migrated to paired markers');
  } else {
    const anchor = /(\n)( *)(<div>\n\s*<h4 data-i18n="footer_contacts">)/;
    if (anchor.test(html)) {
      html = html.replace(anchor, `$1${column}$2$3`);
      done.push('footer cluster column added');
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
