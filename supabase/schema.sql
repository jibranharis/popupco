-- PopUpCo schema
-- Run this in your Supabase SQL editor

-- Spaces / Opportunities
create table if not exists spaces (
  id text primary key,
  slug text unique not null,
  name text not null,
  location text,
  neighborhood text,
  type text,
  category text,
  date text,
  availability text,
  price text,
  cta text,
  status text,
  trust text,
  expected_attendance text,
  deadline text,
  indoor_outdoor text,
  food_allowed text,
  capacity text,
  setup_time text,
  parking text,
  image text,
  gallery jsonb default '[]',
  description text,
  amenities jsonb default '[]',
  rules jsonb default '[]',
  best_for jsonb default '[]',
  vendor_requirements jsonb default '[]',
  host jsonb default '{}',
  created_at timestamptz default now()
);

-- Events
create table if not exists events (
  id bigint primary key generated always as identity,
  event_name text not null,
  slug text unique not null,
  date text,
  start_time text,
  end_time text,
  city text,
  neighborhood text,
  location_name text,
  venue_status text,
  event_type text,
  attendee_info text,
  access_type text,
  description text,
  public_description text,
  status text default 'coming_soon',
  vendor_applications_open boolean default false,
  related_opportunity_slug text,
  vendor_spots_total int,
  vendor_spots_available int,
  booth_price_min int,
  booth_price_max int,
  application_deadline text,
  expected_attendance text,
  expected_vendors text,
  food_allowed int default 0,
  nonprofit_discount int default 0,
  organizer_name text,
  parking text,
  family_friendly text,
  pets_allowed text,
  food_available text,
  accessibility text,
  image_url text,
  cta_text text,
  categories text,
  created_at timestamptz default now()
);

-- Vendor applications
create table if not exists vendor_applications (
  id bigint primary key generated always as identity,
  event_slug text,
  brand_name text,
  contact_name text,
  email text not null,
  phone text,
  website text,
  instagram text,
  categories text[],
  description text,
  price_range text,
  booth_needs text,
  food_permit text,
  previous_events text,
  message text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Host applications
create table if not exists host_applications (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  phone text,
  org_name text,
  role text,
  event_concept text,
  venue_status text,
  expected_vendors int,
  expected_attendance text,
  event_date text,
  location text,
  budget text,
  experience text,
  goals text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Venue applications
create table if not exists venue_applications (
  id bigint primary key generated always as identity,
  contact_name text not null,
  email text not null,
  phone text,
  venue_name text,
  address text,
  city text,
  capacity text,
  indoor_outdoor text,
  amenities text[],
  food_allowed boolean,
  parking text,
  rental_price text,
  availability text,
  description text,
  website text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Contact form
create table if not exists contacts (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  subject text,
  message text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table spaces enable row level security;
alter table events enable row level security;
alter table vendor_applications enable row level security;
alter table host_applications enable row level security;
alter table venue_applications enable row level security;
alter table contacts enable row level security;

-- Public read on spaces + events
create policy "public read spaces" on spaces for select using (true);
create policy "public read events" on events for select using (true);

-- Insert only for applications (no auth required yet - open beta)
create policy "insert vendor apps" on vendor_applications for insert with check (true);
create policy "insert host apps" on host_applications for insert with check (true);
create policy "insert venue apps" on venue_applications for insert with check (true);
create policy "insert contacts" on contacts for insert with check (true);

-- Service role reads all (for admin panel)
create policy "service read vendor apps" on vendor_applications for select using (auth.role() = 'service_role');
create policy "service read host apps" on host_applications for select using (auth.role() = 'service_role');
create policy "service read venue apps" on venue_applications for select using (auth.role() = 'service_role');
create policy "service read contacts" on contacts for select using (auth.role() = 'service_role');
create policy "service update apps" on vendor_applications for update using (auth.role() = 'service_role');
