# Moving the site to a new GitHub and Vercel account

Runbook for migrating `kala-georgia.com` off the original accounts. Written
2026-08-28.

| | from | to |
| --- | --- | --- |
| GitHub | `shakogt-alt/kala-georgia-landing` | `kalaGeorgia/kalaGeorgia` |
| Vercel | `shako-s-projects2` | `kala15` |

Chosen approach: a **fresh repository** on the new GitHub account and a
**fresh Vercel project**, with the domain moved **last**. The old account and
old Vercel project keep running and serving the live site the whole time, so
there is no downtime and there is always somewhere to roll back to.

## What actually needs to move

| Thing | Moves how |
| --- | --- |
| Code and history | `git push` to the new repository — the full history comes along |
| Google Search Console verification | `google809c1c02293832c3.html` is committed, so it moves with the code and the property stays verified |
| `ADMIN_PASSWORD` | Set by hand in the new Vercel project. Choose a new one |
| `ADMIN_SESSION_SECRET` | Set by hand. Generate a fresh random value |
| `BLOB_READ_WRITE_TOKEN` | Added automatically when a Blob store is connected to the new project |
| Gallery photos and tours | **Do not move.** The old blob store answers 403. Re-upload through the admin panel after the move |
| Site texts, fleet, prices | Nothing to do — they live in the code and in `content.default.json` |

Nothing in the repository hardcodes the old account, the old project or the
old blob store, so the code needs no edits to run somewhere else.

## Step 1 — GitHub

The `gh` CLI on this machine is logged in as the **old** account
(`shakogt-alt`), and git uses the Windows Credential Manager, which will
happily reuse that token against the new account's repository and fail with a
403. Add the new account and make `gh` the credential helper first.

Run these yourself — `gh auth login` is interactive and asks for credentials,
so it cannot run from the agent session:

```bash
gh auth login
```

Choose GitHub.com → HTTPS → authenticate in the browser as the **new**
account (`kalaGeorgia`). Then make it active and let `gh` handle git credentials:

```bash
gh auth switch --user kalaGeorgia
```

```bash
gh auth setup-git
```

Confirm the active account before going further:

```bash
gh auth status
```

Once that shows `kalaGeorgia` as the active account, the push can run (the
agent can do this part):

```bash
git remote add new https://github.com/kalaGeorgia/kalaGeorgia.git && git push new master
```

`kalaGeorgia/kalaGeorgia` already exists and is empty, so nothing needs
creating. The old `origin` remote is deliberately left in place as a fallback.

After the new repository is confirmed good, make it the default for day-to-day
work:

```bash
git remote rename origin old && git remote rename new origin
```

### Why the login step cannot be automated

`gh` on this machine is authenticated as `shakogt-alt`, and that token has
`push: false` on `kalaGeorgia/kalaGeorgia` — checked, not assumed. Git also
uses the Windows Credential Manager, which would reuse the old token against
the new repository and fail with a 403. `gh auth setup-git` replaces that for
github.com so the active `gh` account is the one that pushes.

Adding `shakogt-alt` as a collaborator on the new repository would also work,
but it leaves the old account with write access to the new one, which defeats
the point of separating them.

## Step 2 — Vercel

In the new Vercel account (`vercel.com/kala15`):

1. **Add New → Project → Import** `kalaGeorgia/kalaGeorgia`. Framework preset
   is **Other**; there is no build step and no build command. Vercel will need
   to be authorised against the new GitHub account first.
2. **Storage → Create → Blob**, and connect the store to this project. That
   adds `BLOB_READ_WRITE_TOKEN` to the project's environment automatically.
   Without it every admin save fails — that is exactly what broke on the old
   project.

   **The store must be created with public access.** Vercel now offers
   private stores, and a private one fails every write with:

   ```
   Vercel Blob: Cannot use public access on a private store.
   ```

   This site needs public blobs: the browser loads gallery photos, fleet
   images and the hero straight from their blob URL, and `lib/blob.js` reads
   the saved content JSON by plain `fetch(url)`. A private store would mean
   signing a URL for every one of those. If a store was created private, make
   a new public one, connect it, disconnect the private one and redeploy —
   there is nothing to lose while it is still empty.
3. **Settings → Environment Variables**, add for **Production**:

   - `ADMIN_PASSWORD` — the admin panel password. Pick a new one.
   - `ADMIN_SESSION_SECRET` — a long random string. Generate one with:

     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

     If it is unset the code falls back to `ADMIN_PASSWORD`, which works but
     means changing the password invalidates nothing else. Set it properly.

4. **Redeploy.** Environment variables only apply to deployments created after
   they are set.

## Step 3 — Verification before the domain moves

One command, pointed at the new deployment:

```bash
npm run check:live -- https://<the-new-project>.vercel.app
```

It reads the committed sitemap and checks that all 53 pages return 200, that
every old address still redirects, that the API answers, that Blob writes work,
that `/admin` loads, and that the fleet images resolve. It exits non-zero on
any failure.

The one thing it cannot check is the admin password, since that needs a login:
open `/admin`, sign in, and confirm **Save** succeeds.

Canonical tags and hreflang on every page point at `kala-georgia.com`, not at
the deployment address, so testing on `*.vercel.app` cannot pollute the index.
That is deliberate — leave it alone.

## Step 4 — Domain cutover

1. Old Vercel project → **Settings → Domains** → remove `kala-georgia.com`
   (and `www` if present).
2. New Vercel project → **Settings → Domains** → add `kala-georgia.com`.
3. Follow whatever DNS instruction Vercel shows. If the nameservers already
   point at Vercel, this is usually instant; if the domain is at an external
   registrar, the A/CNAME record has to be updated there.

Do these two in quick succession — a domain can only be attached to one
project at a time.

## Step 5 — After the cutover

- Re-run the full verification, this time against `https://kala-georgia.com`.
- Re-upload the gallery photos and re-create the tours through `/admin`.
- Search Console needs no re-verification (the verification file moved with
  the code), but re-submit `https://kala-georgia.com/sitemap.xml` if the
  property shows the sitemap as unread.
- Delete the old Vercel project only once the new one has served the live
  domain for a few days.

## Rollback

Until Step 4, nothing about the live site has changed. To roll back after
Step 4, remove the domain from the new project and add it back to the old one.
Keep the old GitHub repository and the old Vercel project until you are
confident.
