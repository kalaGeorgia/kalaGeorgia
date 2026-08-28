#!/usr/bin/env node
'use strict';

/**
 * Static SEO validation for the whole site (KALA_SEO_CLAUDE_CODE_SPEC.md §24).
 *
 * Checks, per indexable HTML page:
 *   - exactly one <h1>, one <title>, one meta description, one canonical;
 *   - the canonical is self-referencing and matches the file's real URL;
 *   - titles / descriptions / H1s are unique across the site;
 *   - every JSON-LD block parses, and FAQPage questions exist in the markup;
 *   - hreflang sets are reciprocal and point at URLs that really resolve;
 *   - every internal link resolves to a file, a redirect source, or an anchor;
 *   - sitemap URLs all resolve and carry no redirect sources.
 *
 * Exits non-zero on any error.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://kala-georgia.com';

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ------------------------------------------------------------ collect files

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'scripts', 'seo', 'docs', 'images', 'css', 'js', 'api', 'lib'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const NON_INDEXABLE = new Set(['admin.html', 'google809c1c02293832c3.html']);

// Tours and Gallery are admin-driven and currently empty, so they are hidden:
// noindex, and out of the sitemap. Toggled by SHOW_TOURS_AND_GALLERY in
// seo/chrome.js — when that flips, these stop being exempt.
const { SHOW_TOURS_AND_GALLERY } = require('../seo/chrome.js');
const HIDDEN = SHOW_TOURS_AND_GALLERY ? new Set() : new Set(['tours.html', 'gallery.html']);

const files = walk(ROOT)
  .map((f) => path.relative(ROOT, f).split(path.sep).join('/'))
  .filter((f) => !NON_INDEXABLE.has(f))
  .sort();

/** The URL path a static file is served at. */
function urlOf(rel) {
  return rel.endsWith('/index.html') ? '/' + rel.slice(0, -'index.html'.length) : '/' + rel;
}

const urlToFile = new Map(files.map((f) => [urlOf(f), f]));

// ------------------------------------------------------------ redirects

const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const redirectSources = new Set((vercel.redirects || []).map((r) => r.source));
const redirectMap = new Map((vercel.redirects || []).map((r) => [r.source, r.destination]));

for (const r of vercel.redirects || []) {
  if (redirectSources.has(r.destination)) {
    err(`redirect chain: ${r.source} -> ${r.destination} -> ${redirectMap.get(r.destination)}`);
  }
  if (!urlToFile.has(r.destination) && !r.destination.endsWith('.html')) {
    err(`redirect target does not resolve: ${r.source} -> ${r.destination}`);
  }
}

// ------------------------------------------------------------ per page

const all = new Map(); // rel -> parsed bits
const seenTitle = new Map();
const seenDesc = new Map();
const seenH1 = new Map();

function one(html, re, label, rel) {
  const m = [...html.matchAll(re)];
  if (m.length === 0) {
    err(`${rel}: missing ${label}`);
    return null;
  }
  if (m.length > 1) err(`${rel}: ${m.length} × ${label} (expected 1)`);
  return m[0][1].trim();
}

for (const rel of files) {
  const html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const url = urlOf(rel);

  const title = one(html, /<title>([\s\S]*?)<\/title>/g, '<title>', rel);
  const desc = one(html, /<meta name="description" content="([^"]*)"/g, 'meta description', rel);
  const canonical = one(html, /<link rel="canonical" href="([^"]*)"/g, 'canonical', rel);
  const h1 = one(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g, '<h1>', rel);
  const lang = (html.match(/<html lang="([^"]*)"/) || [])[1];

  if (!lang) err(`${rel}: missing <html lang>`);

  // Canonical must be absolute, self-referencing and match the served URL.
  if (canonical) {
    if (!canonical.startsWith(SITE)) err(`${rel}: canonical is not absolute on ${SITE}: ${canonical}`);
    const canonPath = canonical.replace(SITE, '');
    if (canonPath !== url) err(`${rel}: canonical ${canonPath} does not match served URL ${url}`);
    if (redirectSources.has(canonPath)) err(`${rel}: canonical points at a redirect source: ${canonPath}`);
  }

  // robots must not exclude a commercial page.
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1];
  if (!robots) warn(`${rel}: no meta robots tag`);
  else if (/noindex/i.test(robots) && !HIDDEN.has(rel)) err(`${rel}: page is noindex`);
  else if (HIDDEN.has(rel) && !/noindex/i.test(robots)) err(`${rel}: hidden page must be noindex`);

  // Uniqueness.
  for (const [value, store, label] of [
    [title, seenTitle, 'title'],
    [desc, seenDesc, 'meta description'],
    [h1, seenH1, 'H1']
  ]) {
    if (!value) continue;
    if (store.has(value)) err(`duplicate ${label} in ${rel} and ${store.get(value)}: "${value.slice(0, 60)}"`);
    else store.set(value, rel);
  }

  // JSON-LD.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const schemas = [];
  for (const b of blocks) {
    try {
      schemas.push(JSON.parse(b[1]));
    } catch (e) {
      err(`${rel}: JSON-LD does not parse — ${e.message}`);
    }
  }

  // FAQPage questions must be visible in the markup (spec §10).
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '');
  for (const s of schemas) {
    if (s['@type'] !== 'FAQPage') continue;
    for (const q of s.mainEntity || []) {
      const needle = q.name.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      if (!text.includes(needle)) err(`${rel}: FAQ schema question not visible on page: "${q.name.slice(0, 50)}"`);
    }
  }

  // hreflang.
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)].map((m) => ({
    lang: m[1],
    href: m[2]
  }));

  all.set(rel, { url, lang, title, desc, canonical, h1, hreflangs, html });
}

// ------------------------------------------------------------ hreflang graph

for (const [rel, page] of all) {
  if (page.hreflangs.length === 0) continue;

  const self = page.hreflangs.find((h) => h.lang === page.lang);
  if (!self) err(`${rel}: hreflang set has no self-reference for lang=${page.lang}`);
  else if (self.href !== SITE + page.url) err(`${rel}: self hreflang ${self.href} != ${SITE + page.url}`);

  if (!page.hreflangs.some((h) => h.lang === 'x-default')) err(`${rel}: no x-default hreflang`);

  for (const h of page.hreflangs) {
    const p = h.href.replace(SITE, '');
    if (!h.href.startsWith(SITE)) err(`${rel}: hreflang href not absolute: ${h.href}`);
    if (redirectSources.has(p)) err(`${rel}: hreflang points at a redirect source: ${p}`);
    if (!urlToFile.has(p)) {
      err(`${rel}: hreflang target does not resolve: ${p}`);
      continue;
    }
    if (h.lang === 'x-default') continue;

    // Reciprocity: the target must link back to this page with our language.
    const target = all.get(urlToFile.get(p));
    const back = target.hreflangs.find((x) => x.lang === page.lang);
    if (!back) err(`${rel}: ${p} does not link back with hreflang=${page.lang}`);
    else if (back.href !== SITE + page.url) err(`${rel}: ${p} links back to ${back.href}, expected ${SITE + page.url}`);
  }
}

// ------------------------------------------------------------ internal links

const EXTERNAL = /^(https?:|mailto:|tel:|#|javascript:)/;

for (const [rel, page] of all) {
  const hrefs = [...page.html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (EXTERNAL.test(href) || href === '') continue;
    if (!href.startsWith('/')) {
      err(`${rel}: relative link "${href}" (pages live in subdirectories — use root-relative)`);
      continue;
    }
    const [pathPart, hash] = href.split('#');
    if (!pathPart) continue;
    if (redirectSources.has(pathPart)) {
      err(`${rel}: internal link points at a redirect source: ${href}`);
      continue;
    }
    if (!urlToFile.has(pathPart)) err(`${rel}: internal link does not resolve: ${href}`);
    else if (hash) {
      const targetHtml = fs.readFileSync(path.join(ROOT, urlToFile.get(pathPart)), 'utf8');
      if (!targetHtml.includes(`id="${hash}"`)) err(`${rel}: link ${href} has no matching id in target`);
    }
  }

  // Generic anchor text is discouraged (spec §13).
  const anchors = [...page.html.matchAll(/<a\b[^>]*>([^<]{2,})<\/a>/g)].map((m) => m[1].trim().toLowerCase());
  for (const a of anchors) {
    if (['click here', 'read more', 'learn more', 'подробнее', 'читать далее'].includes(a)) {
      warn(`${rel}: generic anchor text "${a}"`);
    }
  }
}

// ------------------------------------------------------------ sitemap

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const locSet = new Set(locs);

if (locs.length !== locSet.size) err('sitemap contains duplicate <loc> entries');

for (const loc of locs) {
  const p = loc.replace(SITE, '');
  if (redirectSources.has(p)) err(`sitemap lists a redirect source: ${p}`);
  if (!urlToFile.has(p)) err(`sitemap lists a URL that does not resolve: ${p}`);
}
for (const [url, file] of urlToFile) {
  if (HIDDEN.has(file)) {
    if (locSet.has(SITE + url)) err(`hidden page is still listed in the sitemap: ${url}`);
    continue;
  }
  if (!locSet.has(SITE + url)) warn(`not in sitemap: ${url} (${file})`);
}

// sitemap hreflang alternates must resolve too.
for (const m of sitemap.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)) {
  const p = m[2].replace(SITE, '');
  if (!urlToFile.has(p)) err(`sitemap alternate does not resolve: ${p}`);
}

// ------------------------------------------------------------ report

console.log(`Checked ${files.length} indexable pages, ${vercel.redirects.length} redirects, ${locs.length} sitemap URLs.\n`);

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log('  ! ' + w);
  console.log('');
}

if (errors.length) {
  console.log(`Errors (${errors.length}):`);
  for (const e of errors) console.log('  ✗ ' + e);
  process.exit(1);
}

console.log('All SEO checks passed.');
