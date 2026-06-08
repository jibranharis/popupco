import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { validateFields } from '@/lib/validate';

export async function POST(request) {
  try {
    const data = await request.json();
    const contactName = data.contact_name || data.contactName || data.name ||
      [data.first_name, data.last_name].filter(Boolean).join(' ') || null;
    const foodAllowed = data.food_vendors_allowed === 'Yes' || data.food_trucks_allowed === 'Yes' ||
      data.foodAllowed || data.food_allowed || false;
    const submission = {
      user_id: data.user_id || null,
      contact_name: contactName,
      email: data.email,
      phone: data.phone || null,
      venue_name: data.venue_name || data.venueName || null,
      address: data.address || null,
      city: data.city || null,
      capacity: data.capacity || null,
      indoor_outdoor: data.indoor_outdoor || data.indoorOutdoor || null,
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
      food_allowed: foodAllowed,
      parking: data.parking || null,
      rental_price: data.desired_rate || data.rentalPrice || data.rental_price || null,
      availability: data.preferred_days || data.availability || null,
      description: data.layout_notes || data.additional_notes || data.description || null,
      website: data.website || null,
      status: 'pending',
    };
    const validationError = validateFields(submission, {
      contact_name: { required: true, max: 200, label: 'Contact name' },
      email: { required: true, max: 320, email: true, label: 'Email' },
      phone: { max: 100, label: 'Phone' },
      venue_name: { required: true, max: 200, label: 'Venue name' },
      address: { max: 500, label: 'Address' },
      city: { max: 200, label: 'City' },
      capacity: { max: 100, label: 'Capacity' },
      indoor_outdoor: { max: 100, label: 'Indoor/outdoor' },
      parking: { max: 1000, label: 'Parking' },
      rental_price: { max: 200, label: 'Rental price' },
      availability: { max: 1000, label: 'Availability' },
      description: { max: 5000, label: 'Description' },
      website: { max: 500, label: 'Website' },
    });
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const db = getServiceClient();

    if (!db) {
      console.log('[Venue Application - no DB]', JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true });
    }

    const { error } = await db.from('venue_applications').insert(submission);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Venue application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit venue application.' }, { status: 500 });
  }
}
