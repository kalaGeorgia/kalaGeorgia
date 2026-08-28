# SEO wave 1 — repository audit and architecture decisions

Required by `KALA_SEO_CLAUDE_CODE_SPEC.md` §2 (audit report) and §3.1 (document
the URL-architecture decision). Written 2026-08-28.

## 1. Repository audit

| Aspect | Finding |
| --- | --- |
| Framework | None. Hand-written static HTML, deployed on Vercel. |
| Build step | None at deploy time. `scripts/build-seo.js` is an authoring tool; its output is committed. |
| Rendering | Fully static HTML. All SEO-critical content is server-served, not JS-rendered. |
| Routing | Filesystem. Vercel serves `<dir>/index.html` for `<dir>/`. |
| i18n (before) | Three full HTML files (`index.html` EN, `ru.html`, `ka.html`) **plus** `js/i18n.js`, which re-applied a language client-side from `localStorage` on every load. |
| Metadata | Hard-coded per file. |
| Sitemap / robots | Hand-maintained `sitemap.xml`, `robots.txt`. |
| JSON-LD | `TransportationCompany` + `FAQPage` on the homepages only. |
| Canonical / hreflang | Present on the three homepages, absent on `tours.html` / `gallery.html`. |
| Redirects | None. Only a `/admin` → `/admin.html` rewrite. |
| Dynamic content | `/api/*` serverless functions feed the fleet, tours and gallery, and record visits via `POST /api/track`. |
| Analytics | `POST /api/track` from `js/script.js`. Preserved unchanged. |
| Images | JPG / PNG / WebP / AVIF in `/images`, served directly. |

### Pre-existing defect found during the audit

`js/i18n.js` ran `applyLanguage(getSavedLang())` on every page load, rewriting
`document.title`, the meta description, `<html lang>` and all `[data-i18n]`
text from `localStorage`. `ru.html` and `ka.html` pinned themselves with
`window.KALA_FORCE_LANG`, but `index.html` did not — so any visitor whose last
choice was Russian saw the English homepage render as Russian, and a crawler
(no `localStorage`, default `en`) saw whatever the default produced. That is a
canonical/hreflang conflict of the kind §5.2 forbids.

Fixed by pinning every homepage with `KALA_FORCE_LANG` and making the language
switcher navigate between real URLs instead of swapping text in place.

## 2. URL architecture

Migrated to the structure §3.1 prefers:

```
/            → 308 → /en/
/index.html  → 308 → /en/
/ru.html     → 308 → /ru/
/ka.html     → 308 → /ka/
```

Landing pages, with localized slugs and localized group segments. Wave 1 is
the spec's §28 priority list; wave 2 completes the §3.2 architecture:

```
/en/airport-transfer-tbilisi/        /ru/transfer-iz-aeroporta-tbilisi/        /ka/tbilisis-aeroportis-transferi/
/en/private-driver-georgia/          /ru/individualnyy-voditel-gruziya/        /ka/piradi-mdzgholi-saqartveloshi/
/en/private-transfers-georgia/       /ru/individualnye-transfery-gruziya/      /ka/individualuri-transferebi-saqartveloshi/
/en/private-tours-georgia/           /ru/individualnye-tury-gruziya/           /ka/individualuri-turebi-saqartveloshi/
/en/corporate-transport-georgia/     /ru/korporativnyy-transport-gruziya/      /ka/korporatiuli-transporti-saqartveloshi/
/en/transfers/tbilisi-kazbegi/       /ru/transfery/tbilisi-kazbegi/            /ka/transferebi/tbilisi-yazbegi/
/en/transfers/tbilisi-gudauri/       /ru/transfery/tbilisi-gudauri/            /ka/transferebi/tbilisi-gudauri/
/en/transfers/tbilisi-borjomi/       /ru/transfery/tbilisi-borjomi/            /ka/transferebi/tbilisi-borjomi/
/en/transfers/tbilisi-batumi/        /ru/transfery/tbilisi-batumi/             /ka/transferebi/tbilisi-batumi/
/en/tours/kazbegi/                   /ru/tury/kazbegi/                         /ka/turebi/yazbegi/

# wave 2
/en/kutaisi-airport-transfer/        /ru/transfer-iz-aeroporta-kutaisi/        /ka/qutaisis-aeroportis-transferi/
/en/vip-transport-georgia/           /ru/vip-transport-gruziya/                /ka/vip-transporti-saqartveloshi/
/en/transfers/tbilisi-kutaisi/       /ru/transfery/tbilisi-kutaisi/            /ka/transferebi/tbilisi-qutaisi/
/en/tours/kakheti/                   /ru/tury/kakhetiya/                       /ka/turebi/kakheti/
/en/tours/mtskheta/                  /ru/tury/mtskheta/                        /ka/turebi/mtskheta/
/en/tours/borjomi/                   /ru/tury/borjomi/                         /ka/turebi/borjomi/
```

With wave 2 the URL architecture in spec §3.2 is fully built: 16 landing
pages in three languages, 48 in total.

`tours.html` and `gallery.html` stay at the root. They are admin-driven pages
outside the landing-page scope, they still translate client-side, and moving them
would add migration risk for no ranking benefit. Their internal links were
updated to the new addresses.

### Trailing slash

Canonical form is **with** a trailing slash. Rather than setting Vercel's
global `trailingSlash: true`, the generator emits one explicit redirect per
canonical URL (`/en/foo` → `/en/foo/`). The global flag also rewrites `/api/*`,
and the site depends on those endpoints for the fleet, tours, gallery and
visit tracking — §22 requires analytics to keep working. The per-URL table is
verbose but cannot touch `/api`.

### Breadcrumbs on grouped pages

`/en/transfers/` and `/en/tours/` are directories, not pages. Rather than
publishing thin index pages or linking to a 404, the middle breadcrumb points
at the hub page that already covers that group:

- `transfers/*` → `/en/private-transfers-georgia/`
- `tours/*` → `/en/private-tours-georgia/`

`scripts/validate-seo.js` enforces that every breadcrumb and internal link
resolves to a real file and never to a redirect source.

## 3. Two-track positioning

A deliberate split, confirmed with the client on 2026-08-28:

- **Homepage, `corporate-transport-georgia` and `vip-transport-georgia`** keep
  the strict B2B/VIP tone from the v3 positioning — delegations, partners,
  contracts, discretion, escort. These pages carry `tone: 'b2b'` in the
  registry.
- **The other fourteen landing pages** address individual travellers, couples,
  families and small groups (up to the Toyota Alphard's 6 seats), because that
  is the actual search intent behind "Tbilisi airport transfer", "private
  driver Georgia" and "private tours Georgia". Child seats and family framing
  belong on those pages and nowhere else.

## 4. Deliberately not invented

Per §0 and §1.7, no fabricated business facts. Open items for the client
before or shortly after publication:

1. **Prices.** No figures anywhere; every page routes pricing to WhatsApp.
   Add real numbers once calibrated, or leave the wording as it stands.
2. **Route durations.** Kazbegi 2.5–3 h, Gudauri 2–2.5 h, Borjomi 2–2.5 h,
   Batumi 5–6 h, Kutaisi 3–3.5 h, Kutaisi airport to Batumi 2–2.5 h, and the
   tour day-lengths (Kazbegi and Kakheti 8–10 h, Mtskheta 4–5 h, Borjomi 7–8 h
   or 11–12 h with Vardzia) are general estimates, not measured times —
   confirm or correct.
3. **Georgian copy** needs a native-speaker read-through before it is
   promoted; it is published as supplied.
4. **Guiding on tours.** The FAQ on the tours hub says basic site information
   is included and in-depth guiding is arranged separately. Confirm this
   matches what KALA actually offers.
5. **Kakheti tastings.** The page states that tastings are booked at the
   wineries themselves and that KALA plans the driving around them. Confirm
   this, or tell us if you book tastings on the client's behalf.
6. **Personal security on the VIP page.** The wording follows what the
   homepage already claims — escort and security available on request,
   arranged in advance. Confirm nothing more specific should be promised.

## 5. Working on this

```bash
npm run seo
```

Regenerates the 48 landing pages, `sitemap.xml` and `vercel.json` from
`seo/pages.js` + `seo/chrome.js`, then validates the whole site. Edit the
content in `seo/pages.js` — never the generated HTML, which is overwritten.

`scripts/migrate-homepages.js` handles the three hand-written homepages: it
pins each to its language, turns the language switcher into real links, and
rewrites the footer cluster column between the `cluster:start` / `cluster:end`
markers. Re-run it after changing `FOOTER_CLUSTER` in `seo/pages.js`; it is
idempotent and reports when nothing changed.

### Trap: paths in API and admin data must be root-relative

The pages no longer sit at the root, so any path served from `/api/*` or saved
through the admin has to start with `/`. This was missed in the wave-1 audit:
`api/fleet.js` seeded its cars with `images/car.jpg` and `content.default.json`
seeded the hero the same way, which resolved as `/en/images/car.jpg` once the
homepage moved, and every fleet photo plus the hero background 404'd in
production. The local static server has no `/api/*`, so nothing caught it
before deploy.

Two defences are now in place: the seeded paths are root-relative, and
`window.KALA.assetUrl` (in `js/script.js`) anchors anything that is not
already absolute, protocol-relative or a `data:` URI. Route new image sources
through it. When testing anything that depends on `/api/*`, test against the
deployed site or `vercel dev` — not the plain static server.

## 6. Deployment

Merged to `master` and deployed 2026-08-28 (commit `19e8253`). Verified live:

- all 35 sitemap URLs return 200;
- `/`, `/index.html`, `/ru.html`, `/ka.html` redirect to `/en/`, `/en/`,
  `/ru/`, `/ka/`;
- trailing-slash variants (`/en`, `/ru/transfer-iz-aeroporta-tbilisi`, …)
  redirect to the canonical slashed form;
- `GET /api/fleet`, `GET /api/content`, `POST /api/track` and `/admin` all
  still return 200 — the redirect table does not touch them;
- canonical, hreflang and the three JSON-LD blocks render correctly on the
  deployed HTML.

Vercel emits **308 Permanent Redirect** for `"permanent": true`, not 301.
Google treats 308 the same as 301 for canonicalisation, so this is equivalent
for ranking purposes.

Still to do by hand:

- submit `https://kala-georgia.com/sitemap.xml` in Search Console;
- request re-indexing for the moved homepages.
