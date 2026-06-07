-- Run this entire file in the Supabase SQL Editor once.
-- It creates the opportunities and events tables with public read access.

-- Opportunities: vendor-facing listings shown on /spaces/[slug]
CREATE TABLE IF NOT EXISTS opportunities (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  type          text,
  location      text,
  neighborhood  text,
  category      text,
  date          text,
  availability  text,
  price         text,
  cta           text DEFAULT 'Apply',
  status        text DEFAULT 'accepting',
  trust         text,
  expected_attendance text,
  deadline      text,
  indoor_outdoor text,
  food_allowed  text,
  capacity      text,
  setup_time    text,
  parking       text,
  image         text,
  gallery       text[],
  description   text,
  amenities     text[],
  rules         text[],
  best_for      text[],
  vendor_requirements text[],
  host_name     text,
  host_type     text,
  host_response text,
  host_history  text,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read opportunities" ON opportunities;
CREATE POLICY "Public read opportunities" ON opportunities FOR SELECT USING (true);

-- Events: attendee-facing event pages shown on /upcoming/[slug]
CREATE TABLE IF NOT EXISTS events (
  id                     uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug                   text UNIQUE NOT NULL,
  event_name             text NOT NULL,
  status                 text DEFAULT 'coming_soon',
  date                   text,
  start_time             text,
  end_time               text,
  city                   text,
  neighborhood           text,
  location_name          text,
  venue_status           text,
  event_type             text,
  attendee_info          text,
  access_type            text,
  description            text,
  public_description     text,
  organizer_name         text,
  parking                text,
  categories             text,
  image_url              text,
  expected_attendance    text,
  expected_vendors       text,
  family_friendly        text,
  pets_allowed           text,
  food_available         text,
  accessibility          text,
  food_allowed           integer DEFAULT 0,
  nonprofit_discount     integer DEFAULT 0,
  vendor_applications_open boolean DEFAULT false,
  vendor_spots_total     integer,
  vendor_spots_available integer,
  booth_price_min        numeric,
  booth_price_max        numeric,
  application_deadline   text,
  related_opportunity_slug text,
  cta_text               text,
  created_at             timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read events" ON events;
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
