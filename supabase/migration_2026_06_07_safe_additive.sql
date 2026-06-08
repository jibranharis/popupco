-- Safe, additive fixes from the 2026-06-07 review. Idempotent — safe to run
-- regardless of which "events"/"opportunities" vs "spaces" branch is live
-- (run DIAGNOSTIC_run_first.sql first if you haven't, just to know what you have).
-- Run this whole file in the Supabase SQL Editor.

-- ── 1. Merge add_user_id.sql so fresh installs match prod (idempotent) ──
alter table vendor_applications add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table venue_applications  add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table host_applications   add column if not exists user_id uuid references auth.users(id) on delete set null;

drop policy if exists "Users can view own vendor applications" on vendor_applications;
create policy "Users can view own vendor applications" on vendor_applications for select using (auth.uid() = user_id);

drop policy if exists "Users can view own venue applications" on venue_applications;
create policy "Users can view own venue applications" on venue_applications for select using (auth.uid() = user_id);

drop policy if exists "Users can view own host applications" on host_applications;
create policy "Users can view own host applications" on host_applications for select using (auth.uid() = user_id);

-- ── 2. Indexes — every FK-ish / filtered / sorted column was missing one ──
create index if not exists idx_vendor_apps_user_id    on vendor_applications (user_id);
create index if not exists idx_vendor_apps_status     on vendor_applications (status);
create index if not exists idx_vendor_apps_created_at on vendor_applications (created_at desc);
create index if not exists idx_vendor_apps_event_slug on vendor_applications (event_slug);

create index if not exists idx_venue_apps_user_id     on venue_applications (user_id);
create index if not exists idx_venue_apps_status      on venue_applications (status);
create index if not exists idx_venue_apps_created_at  on venue_applications (created_at desc);

create index if not exists idx_host_apps_user_id      on host_applications (user_id);
create index if not exists idx_host_apps_status       on host_applications (status);
create index if not exists idx_host_apps_created_at   on host_applications (created_at desc);

create index if not exists idx_contacts_created_at    on contacts (created_at desc);

-- ── 3. Lock down "status" to known values so the admin UI can't write garbage ──
-- (drops + re-adds so this is safe to re-run; if you've ever written a status
--  outside this list these will fail loudly — that's intentional, fix the data first)
alter table vendor_applications drop constraint if exists vendor_status_check;
alter table vendor_applications add constraint vendor_status_check check (status in ('pending','approved','rejected'));

alter table venue_applications drop constraint if exists venue_status_check;
alter table venue_applications add constraint venue_status_check check (status in ('pending','approved','rejected'));

alter table host_applications drop constraint if exists host_status_check;
alter table host_applications add constraint host_status_check check (status in ('pending','approved','rejected'));

-- ── 4. Drop the no-op service_role RLS policies (service role bypasses RLS —
--      these policies do nothing but obscure the real access model) ──
drop policy if exists "service read vendor apps" on vendor_applications;
drop policy if exists "service read host apps"   on host_applications;
drop policy if exists "service read venue apps"  on venue_applications;
drop policy if exists "service read contacts"    on contacts;
drop policy if exists "service update apps"      on vendor_applications;

-- ── Done. See CONSOLIDATION_NEXT_STEP.md in this folder for the spaces/opportunities
--    table cleanup — that part needs the DIAGNOSTIC results before it's safe to write.
