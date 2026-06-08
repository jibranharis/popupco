-- Read-only. Run this in the Supabase SQL Editor and send the results back —
-- the live DB has drifted from the repo's SQL files (two competing schemas were
-- applied over time: schema.sql + setup.sql), so we need to see what actually
-- exists before writing a safe consolidation migration.

-- 1. Which of the "duplicate" tables actually exist, and how many rows do they have?
select table_name,
       (xpath('/row/cnt/text()', query_to_xml(format('select count(*) as cnt from %I', table_name), false, true, '')))[1]::text::int as row_count
from information_schema.tables
where table_schema = 'public'
  and table_name in ('spaces', 'opportunities', 'events', 'vendor_applications', 'host_applications', 'venue_applications', 'contacts')
order by table_name;

-- 2. What does the live "events" table actually look like? (schema.sql has bigint-identity PK,
--    setup.sql has uuid PK — these are incompatible; only one could have "won" with IF NOT EXISTS)
select column_name, data_type, udt_name
from information_schema.columns
where table_schema = 'public' and table_name = 'events'
order by ordinal_position;

-- 3. Same for "opportunities" vs "spaces" — confirm which one actually has the live listing data
select 'opportunities' as t, count(*) from opportunities
union all
select 'spaces', count(*) from spaces;

-- 4. Confirm add_user_id.sql was actually applied (column + policies present?)
select column_name from information_schema.columns
where table_schema='public' and table_name='vendor_applications' and column_name='user_id';

select policyname, tablename from pg_policies
where schemaname = 'public' and policyname like '%own%application%';
