import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

const ALLOWED_TABLES = ['vendor_applications', 'venue_applications', 'host_applications', 'contacts'];

export async function POST(request) {
  try {
    const { password, table, id, status } = await request.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin not configured' }, { status: 503 });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!ALLOWED_TABLES.includes(table)) {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
    }

    const db = getServiceClient();
    if (!db) return NextResponse.json({ error: 'No database configured' }, { status: 503 });

    const { error } = await db.from(table).update({ status }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
