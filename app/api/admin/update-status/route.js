import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'popupco-admin-2025';

export async function POST(request) {
  try {
    const { password, table, id, status } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const allowedTables = ['vendor_applications', 'venue_applications', 'contacts'];

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
    }

    db.prepare(`UPDATE ${table} SET status = ? WHERE id = ?`).run(status, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
