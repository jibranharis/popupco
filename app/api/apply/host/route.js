import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const data = await request.json();
    const db = getServiceClient();

    if (!db) {
      console.log('[Host Application - no DB]', JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true });
    }

    const { error } = await db.from('host_applications').insert({
      user_id: data.user_id || null,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      org_name: data.organization || data.orgName || data.org_name || null,
      role: data.host_role || data.role || null,
      event_concept: data.event_description || data.eventConcept || data.event_concept || null,
      venue_status: data.venue_status || data.venueStatus || null,
      expected_vendors: parseInt(data.vendor_spots || data.expectedVendors || data.expected_vendors) || null,
      expected_attendance: data.estimated_attendance || data.expectedAttendance || data.expected_attendance || null,
      event_date: data.preferred_date || data.eventDate || data.event_date || null,
      location: data.preferred_city || data.location || null,
      budget: data.budget_range || data.budget || null,
      experience: data.experience || null,
      goals: data.additional_notes || data.goals || null,
      status: 'pending',
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Host application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit host request.' }, { status: 500 });
  }
}
