#!/usr/bin/env node
'use strict';

/**
 * Generates the wave-1 SEO landing pages, the XML sitemap and the Vercel
 * redirect table from the page registry in seo/.
 *
 * Run with:  npm run build:seo
 *
 * Everything it writes is committed to the repo — the site is plain static
 * HTML on Vercel with no build step, so the generator is a authoring tool,
 * not a deploy-time dependency.
 */

const fs = require('fs');
const path = require('path');

const { SITE, LANGS, OG_LOCALE, CHROME } = require('../seo/chrome.js');
const { GROUP_SEGMENT, GROUP_HUB, FOOTER_CLUSTER, PAGES } = require('../seo/pages.js');

const ROOT = path.join(__dirname, '..');
const CSS_VERSION = 7;
const OG_IMAGE = '/images/hero-tbilisi.jpg';
const PHONE_TEL = '+995557786845';
const PHONE_DISPLAY = '+995 557 78 68 45';
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61592692264788';
const GOOGLE_PROFILE = 'https://www.google.com/search?q=KALA+Georgia&stick=H4sIAAAAAAAA_-NgU1IxqLBIMzcwSEk1sDA0NjNONTC1MqgwtEwyS000NTWwsDAyMzJdxMrj7ejjqOCeml-UnpkIAJGuUbU3AAAA&hl=en';
const LASTMOD = new Date().toISOString().slice(0, 10);

const WA_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C11 9 10.6 8 10.4 7.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.4 2 12c0 1.9.5 3.6 1.5 5.2L2 22l4.9-1.3c1.5.8 3.2 1.3 5.1 1.3 5.5 0 10-4.4 10-10S17.5 2 12 2zm0 18.2c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.5 1 1-3.4-.2-.3C3.5 14.7 3 13.4 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z"/></svg>';
const WA_SVG_LG = WA_SVG.replace('width="18" height="18"', 'width="28" height="28"');
const CALL_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// ---------------------------------------------------------------- helpers

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escAttr(s) {
  return esc(s).replace(/"/g, '&quot;');
}

/** JSON-LD payload that can never break out of its <script> element. */
function jsonLd(obj) {
  return JSON.stringify(obj, null, 2).replace(/</g, '\\u003c');
}

/** Canonical path for a page in one language, always with a trailing slash. */
function pageUrl(page, lang) {
  const seg = page.group ? GROUP_SEGMENT[page.group][lang] + '/' : '';
  return '/' + lang + '/' + seg + page.slug[lang] + '/';
}

function homeUrl(lang) {
  return '/' + lang + '/';
}

function byKey(key) {
  const page = PAGES.find((p) => p.key === key);
  if (!page) throw new Error('Unknown page key: ' + key);
  return page;
}

// ---------------------------------------------------------------- partials

function head(page, lang) {
  const l = page.l[lang];
  const url = SITE + pageUrl(page, lang);
  const c = CHROME[lang];

  const alternates = LANGS.map(
    (other) => `<link rel="alternate" hreflang="${other}" href="${SITE + pageUrl(page, other)}">`
  ).join('\n');

  const breadcrumbItems = [{ name: c.home, item: SITE + homeUrl(lang) }];
  if (page.group) {
    const hub = byKey(GROUP_HUB[page.group]);
    breadcrumbItems.push({ name: hub.l[lang].crumb, item: SITE + pageUrl(hub, lang) });
  }
  breadcrumbItems.push({ name: l.crumb, item: url });

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: l.h1,
      description: l.description,
      serviceType: page.serviceType,
      provider: {
        '@type': 'LocalBusiness',
        name: 'KALA Georgia',
        url: SITE + '/',
        telephone: PHONE_TEL
      },
      areaServed: { '@type': 'Place', name: page.areaServed },
      url: url
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.item
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: l.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    }
  ];

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(l.title)}</title>
<meta name="description" content="${escAttr(l.description)}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0E0E10">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
<link rel="canonical" href="${url}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${SITE + pageUrl(page, 'en')}">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="KALA Georgia">
<meta property="og:title" content="${escAttr(l.title)}">
<meta property="og:description" content="${escAttr(l.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE + OG_IMAGE}">
<meta property="og:locale" content="${OG_LOCALE[lang]}">
${LANGS.filter((x) => x !== lang)
  .map((x) => `<meta property="og:locale:alternate" content="${OG_LOCALE[x]}">`)
  .join('\n')}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escAttr(l.title)}">
<meta name="twitter:description" content="${escAttr(l.description)}">
<meta name="twitter:image" content="${SITE + OG_IMAGE}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Inter:wght@400;500&display=swap">
<link rel="stylesheet" href="/css/style.css?v=${CSS_VERSION}">

${schemas.map((s) => `<script type="application/ld+json">\n${jsonLd(s)}\n</script>`).join('\n')}
</head>`;
}

/** Cluster links shared by the nav/footer of every generated page. */
function clusterLinks(lang) {
  return FOOTER_CLUSTER
    .map((key) => {
      const p = byKey(key);
      return `          <li><a href="${pageUrl(p, lang)}">${esc(p.l[lang].crumb)}</a></li>`;
    })
    .join('\n');
}

function nav(page, lang) {
  const c = CHROME[lang];
  const home = homeUrl(lang);

  const langLinks = LANGS.map((other) => {
    const href = pageUrl(page, other);
    const active = other === lang;
    return active
      ? `        <a href="${href}" class="is-active" aria-current="true" hreflang="${other}">${other.toUpperCase()}</a>`
      : `        <a href="${href}" hreflang="${other}">${other.toUpperCase()}</a>`;
  }).join('\n');

  return `<nav class="site-nav" id="siteNav">
  <div class="container site-nav__inner">
    <a href="${home}" class="site-nav__brand">
      <img src="/images/logo-icon.jpg" alt="KALA Georgia" class="site-nav__mark" width="40" height="40">
      <span class="site-nav__wordmark">KALA <em>Georgia</em></span>
    </a>

    <button type="button" class="site-nav__toggle" id="navToggle" aria-label="${escAttr(c.menuLabel)}" aria-expanded="false" aria-controls="navLinks">
      <span></span><span></span><span></span>
    </button>

    <div class="site-nav__links" id="navLinks">
      <a href="${home}#services">${esc(c.nav.services)}</a>
      <a href="${home}#fleet">${esc(c.nav.fleet)}</a>
      <a href="${home}#process">${esc(c.nav.process)}</a>
      <a href="${home}#b2b">${esc(c.nav.b2b)}</a>
      <a href="${home}#faq">${esc(c.nav.faq)}</a>
      <a href="/tours.html">${esc(c.nav.tours)}</a>
      <a href="/gallery.html">${esc(c.nav.gallery)}</a>
      <div class="lang-switch" id="langSwitch">
${langLinks}
      </div>
      <a href="#" class="btn btn-gold site-nav__cta js-wa" data-wa-text="${escAttr(c.waGeneric)}">${esc(c.nav.cta)}</a>
    </div>
  </div>
</nav>`;
}

function breadcrumbs(page, lang) {
  const c = CHROME[lang];
  const l = page.l[lang];

  const crumbs = [`      <li><a href="${homeUrl(lang)}">${esc(c.home)}</a></li>`];
  if (page.group) {
    const hub = byKey(GROUP_HUB[page.group]);
    crumbs.push(`      <li><a href="${pageUrl(hub, lang)}">${esc(hub.l[lang].crumb)}</a></li>`);
  }
  crumbs.push(`      <li aria-current="page">${esc(l.crumb)}</li>`);

  return `<nav class="breadcrumbs" aria-label="${escAttr(c.breadcrumbLabel)}">
  <div class="container">
    <ol>
${crumbs.join('\n')}
    </ol>
  </div>
</nav>`;
}

function sections(page, lang) {
  return page.l[lang].sections
    .map((s) => {
      const body = s.ul
        ? `      <ul class="seo-section__list">\n${s.ul.map((i) => `        <li>${esc(i)}</li>`).join('\n')}\n      </ul>`
        : `      <p>${esc(s.p)}</p>`;
      return `    <section class="seo-section">\n      <h2>${esc(s.h)}</h2>\n${body}\n    </section>`;
    })
    .join('\n\n');
}

function faq(page, lang) {
  const c = CHROME[lang];
  const items = page.l[lang].faq
    .map((f, i) => {
      const open = i === 0;
      const n = i + 1;
      return `      <div class="faq__item" data-open="${open}">
        <button class="faq__question" aria-expanded="${open}" aria-controls="faq-a${n}" id="faq-q${n}">
          <span>${esc(f.q)}</span>
          <span class="faq__icon" aria-hidden="true"></span>
        </button>
        <div class="faq__answer" id="faq-a${n}" role="region" aria-labelledby="faq-q${n}">
          <div class="faq__answer-inner"><p>${esc(f.a)}</p></div>
        </div>
      </div>`;
    })
    .join('\n\n');

  return `  <section class="faq" id="faq">
    <div class="container">
      <h2 class="section-title">${esc(c.faqTitle)}</h2>
      <div class="faq__list">

${items}

      </div>
    </div>
  </section>`;
}

function related(page, lang) {
  const c = CHROME[lang];
  const links = page.related
    .map((key) => {
      const p = byKey(key);
      return `        <li><a href="${pageUrl(p, lang)}">${esc(p.l[lang].h1)}</a></li>`;
    })
    .join('\n');

  return `  <section class="related">
    <div class="container">
      <h2 class="section-title">${esc(c.relatedTitle)}</h2>
      <ul class="related__list">
${links}
      </ul>
    </div>
  </section>`;
}

function finalCta(lang) {
  const c = CHROME[lang];
  return `  <section class="final-cta" id="contact">
    <div class="container">
      <h2>${esc(c.ctaTitle)}</h2>
      <p class="final-cta__text">${esc(c.ctaText)}</p>
      <div class="final-cta__actions">
        <a href="#" class="btn btn-whatsapp js-wa" data-wa-text="${escAttr(c.waGeneric)}">
          ${WA_SVG}
          <span>${esc(c.ctaButton)}</span>
        </a>
        <p class="final-cta__call"><a class="js-tel" href="tel:${PHONE_TEL}">${esc(c.ctaCall)}</a></p>
      </div>
    </div>
  </section>`;
}

function footer(lang) {
  const c = CHROME[lang];
  const home = homeUrl(lang);
  return `<footer class="site-footer">
  <div class="container">
    <div class="site-footer__brand">
      <img src="/images/logo-footer.jpg" alt="KALA Georgia" class="site-footer__logo" width="160" height="52">
    </div>
    <div class="site-footer__grid">
      <div>
        <h4>${esc(c.footer.navTitle)}</h4>
        <ul>
          <li><a href="${home}#services">${esc(c.nav.services)}</a></li>
          <li><a href="${home}#fleet">${esc(c.nav.fleet)}</a></li>
          <li><a href="${home}#process">${esc(c.nav.process)}</a></li>
          <li><a href="${home}#b2b">${esc(c.nav.b2b)}</a></li>
          <li><a href="${home}#faq">${esc(c.nav.faq)}</a></li>
          <li><a href="/tours.html">${esc(c.nav.tours)}</a></li>
          <li><a href="/gallery.html">${esc(c.nav.gallery)}</a></li>
        </ul>
      </div>
      <div>
        <h4>${esc(c.footer.servicesTitle)}</h4>
        <ul>
${clusterLinks(lang)}
        </ul>
      </div>
      <div>
        <h4>${esc(c.footer.contacts)}</h4>
        <ul>
          <li><a href="#" class="js-wa" data-wa-text="${escAttr(c.waHello)}">WhatsApp</a></li>
          <li><a class="js-tel" href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a></li>
          <li><a href="mailto:info@kala-georgia.com">info@kala-georgia.com</a></li>
        </ul>
      </div>
      <div>
        <h4>${esc(c.footer.hoursTitle)}</h4>
        <ul>
${c.footer.hours.map((h) => `          <li>${esc(h)}</li>`).join('\n')}
        </ul>
      </div>
      <div>
        <h4>${esc(c.footer.linksTitle)}</h4>
        <ul>
          <li><a href="${FACEBOOK}" target="_blank" rel="noopener">${esc(c.footer.facebook)}</a></li>
          <li><a href="${GOOGLE_PROFILE}" target="_blank" rel="noopener">${esc(c.footer.google)}</a></li>
          <li><a href="#" class="js-share">${esc(c.footer.share)}</a></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>${esc(c.footer.bottom)}</span>
    </div>
  </div>
</footer>`;
}

function tail(lang) {
  const c = CHROME[lang];
  return `<div class="sticky-bar" id="stickyBar">
  <a href="#" class="sticky-bar__whatsapp js-wa" data-wa-text="${escAttr(c.waGeneric)}">
    ${WA_SVG}
    WhatsApp
  </a>
  <a href="tel:${PHONE_TEL}" class="sticky-bar__call js-tel">
    ${CALL_SVG}
    <span>${esc(c.stickyCall)}</span>
  </a>
</div>

<a href="#" class="float-whatsapp js-wa" data-wa-text="${escAttr(c.waHello)}" aria-label="${escAttr(c.waAria)}">
  ${WA_SVG_LG}
</a>

<script src="/js/script.js"></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------- page

function renderPage(page, lang) {
  const l = page.l[lang];
  return `${head(page, lang)}
<body>

${nav(page, lang)}

${breadcrumbs(page, lang)}

<header class="page-header page-header--compact">
  <div class="container">
    <h1>${esc(l.h1)}</h1>
    <p class="page-header__intro">${esc(l.lead)}</p>
  </div>
</header>

<main>
  <div class="seo-body">
    <div class="container">
${sections(page, lang)}
    </div>
  </div>

${faq(page, lang)}

${related(page, lang)}

${finalCta(lang)}
</main>

${footer(lang)}

${tail(lang)}`;
}

// ---------------------------------------------------------------- sitemap

function sitemap() {
  const entries = [];

  // Language homepages — one entry each, cross-linked with hreflang.
  for (const lang of LANGS) {
    entries.push({
      loc: SITE + homeUrl(lang),
      priority: lang === 'en' ? '1.0' : '0.9',
      alternates: LANGS.map((o) => ({ lang: o, href: SITE + homeUrl(o) }))
    });
  }

  for (const page of PAGES) {
    for (const lang of LANGS) {
      entries.push({
        loc: SITE + pageUrl(page, lang),
        priority: '0.8',
        alternates: LANGS.map((o) => ({ lang: o, href: SITE + pageUrl(page, o) }))
      });
    }
  }

  entries.push({ loc: SITE + '/tours.html', priority: '0.7', alternates: null });
  entries.push({ loc: SITE + '/gallery.html', priority: '0.6', alternates: null });

  const body = entries
    .map((e) => {
      const alt = e.alternates
        ? e.alternates
            .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
            .join('\n') +
          `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${e.alternates.find((a) => a.lang === 'en').href}" />`
        : null;
      return [
        '  <url>',
        `    <loc>${e.loc}</loc>`,
        `    <lastmod>${LASTMOD}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        `    <priority>${e.priority}</priority>`,
        alt,
        '  </url>'
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

// ---------------------------------------------------------------- vercel

function vercelConfig() {
  const redirects = [
    // Old flat URLs -> the new per-language directories.
    { source: '/', destination: '/en/', permanent: true },
    { source: '/index.html', destination: '/en/', permanent: true },
    { source: '/ru.html', destination: '/ru/', permanent: true },
    { source: '/ka.html', destination: '/ka/', permanent: true }
  ];

  // One trailing-slash normalisation per canonical URL, so that exactly one
  // form of every address returns 200 (spec §18: consistent trailing slash).
  // Done page-by-page rather than with a global `trailingSlash` flag, which
  // would also rewrite the /api/* calls the site depends on.
  for (const lang of LANGS) {
    redirects.push({ source: '/' + lang, destination: '/' + lang + '/', permanent: true });
  }
  for (const page of PAGES) {
    for (const lang of LANGS) {
      const url = pageUrl(page, lang);
      redirects.push({ source: url.replace(/\/$/, ''), destination: url, permanent: true });
    }
  }

  return JSON.stringify(
    {
      redirects,
      rewrites: [
        { source: '/admin', destination: '/admin.html' },
        { source: '/admin/', destination: '/admin.html' }
      ]
    },
    null,
    2
  ) + '\n';
}

// ---------------------------------------------------------------- run

function write(relPath, contents) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, 'utf8');
  return relPath;
}

function main() {
  let count = 0;
  for (const page of PAGES) {
    for (const lang of LANGS) {
      const rel = pageUrl(page, lang).replace(/^\//, '') + 'index.html';
      write(rel, renderPage(page, lang));
      count++;
    }
  }

  write('sitemap.xml', sitemap());
  write('vercel.json', vercelConfig());

  console.log(`Generated ${count} landing pages, sitemap.xml and vercel.json.`);
}

main();
