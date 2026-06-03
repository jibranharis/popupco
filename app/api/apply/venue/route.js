import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const data = await request.json();
    const db = getServiceClient();

    if (!db) {
      console.log('[Venue Application - no DB]', JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true });
    }

    const contactName = data.contact_name || data.contactName || data.name ||
      [data.first_name, data.last_name].filter(Boolean).join(' ') || null;
    const foodAllowed = data.food_vendors_allowed === 'Yes' || data.food_trucks_allowed === 'Yes' ||
      data.foodAllowed || data.food_allowed || false;

    const { error } = await db.from('venue_applications').insert({
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
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Venue application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit venue application.' }, { status: 500 });
  }
}
