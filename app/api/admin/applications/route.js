import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'popupco-admin-2025';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  const type = searchParams.get('type') || 'vendors';

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getServiceClient();
  if (!db) {
    return NextResponse.json({ data: [] });
  }

  const tableMap = {
    vendors: 'vendor_applications',
    venues: 'venue_applications',
    contacts: 'contacts',
    hosts: 'host_applications',
    events: 'events',
  };

  const table = tableMap[type];
  if (!table) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const { data, error } = await db.from(table).select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Database error' }, { status: 500 });

  return NextResponse.json({ data });
}
