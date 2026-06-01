import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const data = await request.json();
    const db = getServiceClient();

    if (!db) {
      console.log('[Vendor Application - no DB]', JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true });
    }

    const { error } = await db.from('vendor_applications').insert({
      event_slug: data.eventSlug || data.event_slug,
      brand_name: data.brandName || data.brand_name,
      contact_name: data.contactName || data.contact_name || data.name,
      email: data.email,
      phone: data.phone,
      website: data.website,
      instagram: data.instagram,
      categories: Array.isArray(data.categories) ? data.categories : [data.categories].filter(Boolean),
      description: data.description,
      price_range: data.priceRange || data.price_range,
      booth_needs: data.boothNeeds || data.booth_needs,
      food_permit: data.foodPermit || data.food_permit,
      previous_events: data.previousEvents || data.previous_events,
      message: data.message,
      status: 'pending',
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vendor application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit application.' }, { status: 500 });
  }
}
