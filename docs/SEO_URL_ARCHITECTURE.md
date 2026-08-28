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
/            → 301 → /en/
/index.html  → 301 → /en/
/ru.html     → 301 → /ru/
/ka.html     → 301 → /ka/
```

Wave-1 landing pages, with localized slugs and localized group segments:

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
```

`tours.html` and `gallery.html` stay at the root. They are admin-driven pages
outside the wave-1 scope, they still translate client-side, and moving them
would add migration risk for no ranking benefit. Their internal links were
updated to the new addresses.

### Trailing slash

Canonical form is **with** a trailing slash. Rather than setting Vercel's
global `trailingSlash: true`, the generator emits one explicit 301 per
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

- **Homepage and `corporate-transport-georgia`** keep the strict B2B/VIP tone
  from the v3 positioning — delegations, partners, contracts, escort.
- **The other nine landing pages** address individual travellers, couples,
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
   Batumi 5–6 h are general geographic estimates, not measured times — confirm
   or correct.
3. **Georgian copy** needs a native-speaker read-through before it is
   promoted; it is published as supplied.
4. **Guiding on tours.** The FAQ on the two tour pages says basic site
   information is included and in-depth guiding is arranged separately.
   Confirm this matches what KALA actually offers.

## 5. Working on this

```bash
npm run seo
```

Regenerates the 30 landing pages, `sitemap.xml` and `vercel.json` from
`seo/pages.js` + `seo/chrome.js`, then validates the whole site. Edit the
content in `seo/pages.js` — never the generated HTML, which is overwritten.

`scripts/migrate-homepages.js` is the one-off migration helper for the
`/en/ /ru/ /ka/` move. It is idempotent and already applied.

## 6. After deploying

- Submit `https://kala-georgia.com/sitemap.xml` in Search Console.
- Watch the `/`, `/ru.html`, `/ka.html` 301s land, and request re-indexing.
- Confirm `POST /api/track` and `GET /api/fleet|tours|gallery` still return
  200 — the redirect table should not touch them, but verify on the live host.
