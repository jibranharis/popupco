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
      name: data.name,
      email: data.email,
      phone: data.phone,
      org_name: data.orgName || data.org_name,
      role: data.role,
      event_concept: data.eventConcept || data.event_concept,
      venue_status: data.venueStatus || data.venue_status,
      expected_vendors: parseInt(data.expectedVendors || data.expected_vendors) || null,
      expected_attendance: data.expectedAttendance || data.expected_attendance,
      event_date: data.eventDate || data.event_date,
      location: data.location,
      budget: data.budget,
      experience: data.experience,
      goals: data.goals,
      status: 'pending',
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Host application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit host request.' }, { status: 500 });
  }
}
