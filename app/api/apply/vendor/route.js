import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { validateFields } from '@/lib/validate';
import { sendVendorWelcomeEmail, sendAdminNotification } from '@/lib/email';

export async function POST(request) {
  try {
    const data = await request.json();
    const contactName = data.contact_name || data.contactName || data.name ||
      [data.first_name, data.last_name].filter(Boolean).join(' ') || null;
    const submission = {
      user_id: data.user_id || null,
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
    };
    const validationError = validateFields(submission, {
      brand_name: { required: true, max: 200, label: 'Business name' },
      contact_name: { required: true, max: 200, label: 'Contact name' },
      email: { required: true, max: 320, email: true, label: 'Email' },
      phone: { max: 100, label: 'Phone' },
      website: { max: 500, label: 'Website' },
      instagram: { max: 200, label: 'Instagram' },
      categories: { type: 'array', required: true, label: 'Category' },
      description: { required: true, max: 5000, label: 'Description' },
      price_range: { max: 200, label: 'Price range' },
      booth_needs: { max: 500, label: 'Booth needs' },
      food_permit: { max: 500, label: 'Food permit' },
      previous_events: { max: 5000, label: 'Previous events' },
      message: { max: 5000, label: 'Message' },
    });
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const db = getServiceClient();

    if (db) {
      const { error } = await db.from('vendor_applications').insert(submission);
      if (error) {
        console.error('Failed to insert vendor application into DB:', error);
      }
    } else {
      console.log('[Vendor Application - no DB configured]', JSON.stringify(submission, null, 2));
    }

    // Send emails (non-blocking)
    const firstName = contactName?.split(' ')[0] || 'Vendor';
    Promise.all([
      sendVendorWelcomeEmail(submission.email, firstName),
      sendAdminNotification(`New Vendor App: ${submission.brand_name}`, {
        Name: submission.contact_name,
        Email: submission.email,
        Brand: submission.brand_name,
        Categories: submission.categories.join(', '),
      })
    ]).catch((err) => console.error('Failed to send notification emails', err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vendor application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit application.' }, { status: 500 });
  }
}
