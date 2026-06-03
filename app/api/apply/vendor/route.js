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

    const contactName = data.contact_name || data.contactName || data.name ||
      [data.first_name, data.last_name].filter(Boolean).join(' ') || null;

    const { error } = await db.from('vendor_applications').insert({
      event_slug: data.event_preference || data.eventSlug || data.event_slug || null,
      brand_name: data.business_name || data.brandName || data.brand_name || null,
      contact_name: contactName,
      email: data.email,
      phone: data.phone || null,
      website: data.website || null,
      instagram: data.instagram || null,
      categories: Array.isArray(data.categories) ? data.categories : [data.categories].filter(Boolean),
      description: data.product_description || data.description || null,
      price_range: data.avg_price_range || data.priceRange || data.price_range || null,
      booth_needs: data.booth_size || data.boothNeeds || data.booth_needs || null,
      food_permit: data.health_permit || data.foodPermit || data.food_permit || null,
      previous_events: data.sold_before_where || data.previousEvents || data.previous_events || null,
      message: data.additional_notes || data.message || null,
      status: 'pending',
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vendor application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit application.' }, { status: 500 });
  }
}
