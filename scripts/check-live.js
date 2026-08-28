#!/usr/bin/env node
'use strict';

/**
 * End-to-end check of a deployed instance of this site.
 *
 *   node scripts/check-live.js https://kala-georgia-landing.vercel.app
 *   node scripts/check-live.js https://kala-georgia.com
 *
 * Reads the committed sitemap for the URL list, so it always checks whatever
 * the current build actually publishes. Used for the migration runbook's
 * step 3 (before the domain moves) and step 5 (after).
 *
 * Note: this sends one POST to /api/track, which is the only way to tell
 * whether Blob writes work from the outside. It counts as a single visit in
 * the admin stats.
 */

const fs = require('fs');
const path = require('path');

const CANONICAL = 'https://kala-georgia.com';
const base = (process.argv[2] || CANONICAL).replace(/\/+$/, '');

const results = { pass: 0, fail: 0 };

function report(ok, label, detail) {
  if (ok) results.pass++;
  else results.fail++;
  console.log('  ' + (ok ? 'ok  ' : 'FAIL') + '  ' + label + (detail ? '  — ' + detail : ''));
}

async function status(url, options) {
  try {
    const res = await fetch(url, Object.assign({ redirect: 'manual' }, options));
    return { code: res.status, location: res.headers.get('location'), res: res };
  } catch (e) {
    return { code: 0, error: e.message };
  }
}

async function main() {
  console.log('Checking ' + base + '\n');

  // ---- every published page returns 200 -------------------------------
  const sitemap = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(CANONICAL, ''));

  console.log('Pages (' + paths.length + ' from sitemap.xml)');
  let bad = [];
  for (const p of paths) {
    const r = await status(base + p);
    if (r.code !== 200) bad.push(p + ' -> ' + (r.code || r.error));
  }
  report(bad.length === 0, paths.length + ' sitemap URLs return 200', bad.slice(0, 5).join('; '));

  // ---- old addresses still redirect -----------------------------------
  console.log('\nRedirects');
  const redirects = [
    ['/', '/en/'],
    ['/index.html', '/en/'],
    ['/ru.html', '/ru/'],
    ['/ka.html', '/ka/'],
    ['/en', '/en/'],
    ['/ru/transfer-iz-aeroporta-tbilisi', '/ru/transfer-iz-aeroporta-tbilisi/']
  ];
  for (const [from, to] of redirects) {
    const r = await status(base + from);
    const dest = (r.location || '').replace(base, '');
    const ok = (r.code === 301 || r.code === 308) && dest === to;
    report(ok, from.padEnd(36) + ' -> ' + to, ok ? '' : r.code + ' ' + dest);
  }

  // ---- API ------------------------------------------------------------
  console.log('\nAPI');
  for (const p of ['/api/content', '/api/fleet', '/api/tours', '/api/gallery']) {
    const r = await status(base + p);
    report(r.code === 200, 'GET ' + p);
  }

  const auth = await status(base + '/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ en: {}, ka: {}, ru: {} })
  });
  report(auth.code === 401, 'POST /api/content without a session is rejected', 'got ' + auth.code);

  // ---- storage --------------------------------------------------------
  console.log('\nStorage (Vercel Blob)');
  const track = await status(base + '/api/track', { method: 'POST' });
  let body = null;
  try {
    body = await track.res.json();
  } catch (e) { /* non-JSON means something is badly wrong */ }
  const writes = body && body.ok === true;
  report(
    writes,
    'blob writes work (POST /api/track)',
    writes ? '' : 'got ' + JSON.stringify(body) + ' — connect a Blob store and redeploy, admin saves will fail until then'
  );

  // ---- admin ----------------------------------------------------------
  console.log('\nAdmin');
  for (const p of ['/admin', '/admin.html']) {
    const r = await status(base + p);
    report(r.code === 200, 'GET ' + p);
  }

  // ---- image paths resolve from a nested page -------------------------
  console.log('\nAssets referenced by the API');
  try {
    const fleet = await (await fetch(base + '/api/fleet')).json();
    const relative = fleet.filter((c) => c.image && c.image[0] !== '/' && !/^https?:/.test(c.image));
    report(relative.length === 0, 'fleet image paths are absolute or root-relative', relative.length + ' relative');

    let broken = [];
    for (const car of fleet.slice(0, 8)) {
      if (!car.image) continue;
      const url = /^https?:/.test(car.image) ? car.image : base + car.image;
      const r = await status(url);
      if (r.code !== 200) broken.push(car.image + ' -> ' + r.code);
    }
    report(broken.length === 0, 'fleet images load', broken.join('; '));
  } catch (e) {
    report(false, 'fleet image check', e.message);
  }

  console.log('\n' + results.pass + ' passed, ' + results.fail + ' failed');
  process.exit(results.fail ? 1 : 0);
}

main();
