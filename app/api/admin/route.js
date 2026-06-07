import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.action === 'login') {
      const password = process.env.ADMIN_PASSWORD;
      if (!password) return NextResponse.json({ success: false, error: 'Admin not configured' }, { status: 503 });
      if (body.password === password) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (body.action === 'fetch') {
      const db = getServiceClient();
      if (!db) {
        return NextResponse.json({ success: true, data: { vendors: [], venues: [], hosts: [], contacts: [] } });
      }

      const [vendors, venues, hosts, contacts] = await Promise.all([
        db.from('vendor_applications').select('*').order('created_at', { ascending: false }),
        db.from('venue_applications').select('*').order('created_at', { ascending: false }),
        db.from('host_applications').select('*').order('created_at', { ascending: false }),
        db.from('contacts').select('*').order('created_at', { ascending: false }),
      ]);

      return NextResponse.json({
        success: true,
        data: {
          vendors: vendors.data || [],
          venues: venues.data || [],
          hosts: hosts.data || [],
          contacts: contacts.data || [],
        },
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Admin error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
