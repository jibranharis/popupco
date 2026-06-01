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

    const { error } = await db.from('venue_applications').insert({
      contact_name: data.contactName || data.contact_name || data.name,
      email: data.email,
      phone: data.phone,
      venue_name: data.venueName || data.venue_name,
      address: data.address,
      city: data.city,
      capacity: data.capacity,
      indoor_outdoor: data.indoorOutdoor || data.indoor_outdoor,
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
      food_allowed: data.foodAllowed ?? data.food_allowed ?? false,
      parking: data.parking,
      rental_price: data.rentalPrice || data.rental_price,
      availability: data.availability,
      description: data.description,
      website: data.website,
      status: 'pending',
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Venue application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit venue application.' }, { status: 500 });
  }
}
