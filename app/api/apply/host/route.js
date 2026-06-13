import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { validateFields } from '@/lib/validate';
import { sendHostWelcomeEmail, sendAdminNotification } from '@/lib/email';

export async function POST(request) {
  try {
    const data = await request.json();
    const submission = {
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
    };
    const validationError = validateFields(submission, {
      name: { required: true, max: 200, label: 'Name' },
      email: { required: true, max: 320, email: true, label: 'Email' },
      phone: { max: 100, label: 'Phone' },
      org_name: { max: 200, label: 'Organization' },
      role: { max: 200, label: 'Role' },
      event_concept: { max: 5000, label: 'Event concept' },
      venue_status: { required: true, max: 200, label: 'Venue status' },
      expected_attendance: { max: 200, label: 'Expected attendance' },
      event_date: { max: 200, label: 'Event date' },
      location: { max: 200, label: 'Location' },
      budget: { max: 200, label: 'Budget' },
      experience: { max: 5000, label: 'Experience' },
      goals: { max: 5000, label: 'Goals' },
    });
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const db = getServiceClient();

    if (db) {
      const { error } = await db.from('host_applications').insert(submission);
      if (error) {
        console.error('Failed to insert host application into DB:', error);
      }
    } else {
      console.log('[Host Application - no DB configured]', JSON.stringify(submission, null, 2));
    }

    // Send emails (non-blocking)
    const firstName = submission.name?.split(' ')[0] || 'Host';
    const eventName = data.event_name || data.eventName || 'your pop-up event';
    Promise.all([
      sendHostWelcomeEmail(submission.email, firstName, eventName),
      sendAdminNotification(`New Host Request: ${eventName}`, {
        Name: submission.name,
        Email: submission.email,
        Organization: submission.org_name || 'N/A',
        VenueStatus: submission.venue_status,
      })
    ]).catch((err) => console.error('Failed to send notification emails', err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Host application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit host request.' }, { status: 500 });
  }
}
