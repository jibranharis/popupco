-- Add user_id to application tables so submissions can be linked to Supabase auth users.
-- Run this in the Supabase SQL Editor.

ALTER TABLE vendor_applications ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE venue_applications  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE host_applications   ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Allow authenticated users to read their own applications.
CREATE POLICY "Users can view own vendor applications"
  ON vendor_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own venue applications"
  ON venue_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own host applications"
  ON host_applications FOR SELECT
  USING (auth.uid() = user_id);
