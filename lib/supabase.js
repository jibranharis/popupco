import { createClient } from '@supabase/supabase-js';

// Anon key is public — safe to hardcode. Avoids env var typo issues on host deploys.
const SUPABASE_URL = 'https://onoibpycvzzxpgdbmgmb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ub2licHljdnp6eHBnZGJtZ21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMDQ0ODMsImV4cCI6MjA5NTY4MDQ4M30.iskb-ZiMNrga9Od1xyF6Db-pMG8IxGSkubyoKSwZT_0';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;

export const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);

export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
