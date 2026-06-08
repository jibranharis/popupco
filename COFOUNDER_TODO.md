# For Jibran — things only Vercel/Supabase dashboard access can do

Generated from a full security/code review on 2026-06-07. Tarun and I (Claude)
fixed everything reachable from the code; these need your dashboard access.

## 🔴 Do today — security

1. **Rotate `ADMIN_PASSWORD` in Vercel.**
   The old default `popupco-admin-2025` has been sitting in `env.example` in
   plaintext (committed to git) since the project started — anyone who's seen
   the repo could log into `/admin` and read every applicant's name/email/phone/address.
   - Vercel dashboard → popupco project → Settings → Environment Variables
   - Generate a long random value (use a password manager — NOT another name combo)
   - Set it for **Production, Preview, and Development** environments
   - Redeploy after saving (Vercel doesn't hot-reload env vars)

2. **Confirm these env vars are set in Vercel** (Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` ← **this one is critical** — if it's missing, the
     admin panel and all application-submission routes silently no-op (return
     success without writing to the DB). Check Vercel's deployment logs for
     `"No service client configured"` to confirm whether this has been happening.
   - `ADMIN_PASSWORD` (the new one from step 1)

## 🔴 Do today — database (run in Supabase SQL Editor)

3. **Run `supabase/DIAGNOSTIC_run_first.sql`** (new file, just added to the repo).
   It's read-only — just inspects what tables/columns actually exist. The repo
   has two competing schema files (`schema.sql` defines `spaces`+`events` with
   one shape, `setup.sql` defines `opportunities`+`events` with an incompatible
   shape) that were both run against the live DB at different times, so nobody
   currently knows for sure which one "won." Paste the query results back to
   Tarun/me so we can write a safe consolidation script — **do not guess and
   drop a table**, that's how you lose data permanently.

4. **Run `supabase/migration_2026_06_07_safe_additive.sql`** (new file).
   This one's safe regardless of what #3 finds — it adds missing indexes
   (queries on `user_id`/`status`/`created_at` were doing full table scans),
   adds `check` constraints so `status` can't be set to garbage values, merges
   the `add_user_id.sql` migration into the main schema (it was applied to prod
   but never folded back in, so fresh installs don't match), and removes some
   no-op RLS policies that were cluttering the access model.

## 🟡 This week

5. **Decide: keep `app/api/admin/seed/route.js` reachable in production or not?**
   It's a password-gated endpoint that mass-overwrites the `opportunities`/`events`
   tables from hardcoded static data — useful for re-seeding, but a live
   destructive endpoint sitting in prod is a foot-gun. Either gate it behind
   `process.env.NODE_ENV !== 'production'` or just remember it exists and don't
   trigger it by accident.

6. **Check Supabase Auth email templates / redirect URLs** match the
   `app/auth/confirm` and `app/auth/reset-password` pages — this isn't something
   I can verify from the code, only from the Supabase Auth dashboard config
   (Authentication → URL Configuration / Email Templates).

7. **Set up Supabase database backups** if you haven't (Database → Backups) —
   especially before running #3/#4 above. Point-in-time recovery costs extra on
   some plans; at minimum confirm daily backups are on.

## 🟢 Nice to have

8. **Vercel → Settings → Environment Variables → check for the typo** that an
   earlier commit (`377ebe0 fix: hardcode correct anon key to bypass Vercel env
   typo`) worked around by hardcoding the anon key in `lib/supabase.js` instead
   of fixing the env var. Once the real env var is correct, that hardcoded
   fallback can eventually be removed (low priority — anon keys are meant to be
   public and RLS is configured correctly, so it's not a security issue, just
   a maintenance smell).

9. **Add Vercel rate-limit / firewall rules** (if on a plan that supports it) as
   defense-in-depth on top of the in-memory rate limiting Codex just added to
   `middleware.js` — in-memory limits reset on every cold start/redeploy.
