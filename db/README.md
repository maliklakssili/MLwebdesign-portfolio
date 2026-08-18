# Quote system — setup (Vercel + Neon)

Everything on the code side is built: `/api` serverless functions handle
the form, admin auth, and the admin data — no Supabase, no separate
backend service. These are the manual steps to connect it to a real
database and email sending, since they need your accounts/credentials.

## 1. Connect a Postgres database (Neon, via Vercel)

1. In the Vercel dashboard, open your `mlwebdesign` project → **Storage**
   tab → **Connect Store** → **Neon** (listed under Marketplace
   Database Providers) → follow the prompts to create a database.
2. Vercel automatically adds a `DATABASE_URL` (or `POSTGRES_URL`)
   environment variable to your project once connected — you don't need
   to copy/paste a connection string yourself.

## 2. Run the schema

1. From the same Storage tab, open your new database → **Query** (or
   open it directly in the Neon console, linked from there).
2. Paste the contents of `db/schema.sql` and run it. This creates the
   `quote_requests` table. Safe to re-run if you need to.

## 3. Set the admin login + session secret

In Vercel → Project Settings → Environment Variables, add:
```
ADMIN_EMAIL=contact@mlwebdesign.ca
ADMIN_PASSWORD=<choose a strong password>
SESSION_SECRET=<random string>
```
Generate `SESSION_SECRET` with `openssl rand -hex 32` in Terminal, or any
long random string — it's just used to sign the login cookie, you never
need to type it in yourself.

There's no separate "create a user" step — whatever email/password you
set here is what you log in with at `/admin/login`.

## 4. Set up Resend (email sending)

1. [resend.com](https://resend.com) → create an account (free tier covers
   this easily).
2. **Domains → Add domain** → `mlwebdesign.ca`. Resend will give you DNS
   records to add.
3. Add those in the Vercel dashboard (Project → Settings → Domains →
   mlwebdesign.ca → DNS Records), same place you added the DMARC record.
   **Important:** if Resend asks you to add an SPF `TXT` record, do **not**
   create a second `TXT` record at the same name if one already exists —
   DNS only allows one SPF record per name. Your domain already has
   `v=spf1 include:_spf.google.com ~all` for Google Workspace. Merge them
   into one line instead, e.g.:
   ```
   v=spf1 include:_spf.google.com include:amazonses.com ~all
   ```
   (Resend sends through Amazon SES under the hood, so its include is
   usually `amazonses.com` — the exact value will be shown on their setup
   screen. If you're unsure, send me a screenshot and I'll tell you
   exactly how to merge it.)
4. Once the domain shows "Verified" in Resend, generate an **API key**
   (Resend dashboard → API Keys).
5. Back in Vercel → Environment Variables, add:
   ```
   RESEND_API_KEY=<your Resend API key>
   FROM_EMAIL=MLwebdesign <notifications@mlwebdesign.ca>
   ADMIN_DASHBOARD_URL=https://www.mlwebdesign.ca/admin/quotes
   ```
   (`FROM_EMAIL` must be an address on the domain you just verified.)

## 5. Redeploy

Environment variable changes don't apply to already-built deployments —
trigger a new deployment (push a commit, or use "Redeploy" in the Vercel
dashboard) after adding the variables above.

## Test it

1. Go to `/pricing`, fill out and submit the quote form.
2. You should get a notification email, and the address you used in the
   form should get a confirmation email.
3. Sign in at `/admin/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD`
   you set, and the request should show up at `/admin/quotes`.

If step 1 saves the request but no emails arrive, check the function logs
(Vercel dashboard → your project → Logs, filter to `/api/quotes`) — Resend
errors are logged there with the exact reason (e.g. domain not verified
yet).

## Local development note

Plain `npm run dev` (Vite) does **not** run the `/api` serverless
functions — those only run on Vercel itself, or locally via the Vercel
CLI (`npx vercel dev`, which needs `npx vercel login` first). The
easiest path is just testing on a real deployment: push to a branch,
open the Vercel preview URL it generates, and test the form/admin flow
there before merging to `main`.
