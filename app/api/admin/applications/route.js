import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'popupco-admin-2025';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  const type = searchParams.get('type') || 'vendors';

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();

  try {
    if (type === 'vendors') {
      const rows = db.prepare('SELECT * FROM vendor_applications ORDER BY created_at DESC').all();
      return NextResponse.json({ data: rows });
    } else if (type === 'venues') {
      const rows = db.prepare('SELECT * FROM venue_applications ORDER BY created_at DESC').all();
      return NextResponse.json({ data: rows });
    } else if (type === 'contacts') {
      const rows = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
      return NextResponse.json({ data: rows });
    } else if (type === 'events') {
      const rows = db.prepare('SELECT * FROM events ORDER BY created_at DESC').all();
      return NextResponse.json({ data: rows });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
