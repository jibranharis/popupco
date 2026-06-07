import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { SPACES_DATA } from '@/lib/spaces';
import { PLACEHOLDER_EVENTS } from '@/lib/data';

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const db = getServiceClient();
  if (!db) {
    return NextResponse.json({ success: false, error: 'No service client configured' }, { status: 503 });
  }

  const opportunities = SPACES_DATA.map((s) => ({
    slug: s.slug,
    name: s.name,
    type: s.type,
    location: s.location,
    neighborhood: s.neighborhood,
    category: s.category,
    date: s.date,
    availability: s.availability,
    price: s.price,
    cta: s.cta,
    status: s.status,
    trust: s.trust,
    expected_attendance: s.expectedAttendance,
    deadline: s.deadline,
    indoor_outdoor: s.indoorOutdoor,
    food_allowed: s.foodAllowed,
    capacity: s.capacity,
    setup_time: s.setupTime,
    parking: s.parking,
    image: s.image,
    gallery: s.gallery,
    description: s.description,
    amenities: s.amenities,
    rules: s.rules,
    best_for: s.bestFor,
    vendor_requirements: s.vendorRequirements,
    host_name: s.host?.name,
    host_type: s.host?.type,
    host_response: s.host?.response,
    host_history: s.host?.history,
  }));

  const events = PLACEHOLDER_EVENTS.map((e) => ({
    slug: e.slug,
    event_name: e.event_name,
    status: e.status,
    date: e.date,
    start_time: e.startTime,
    end_time: e.endTime,
    city: e.city,
    neighborhood: e.neighborhood,
    location_name: e.location_name,
    venue_status: e.venueStatus,
    event_type: e.eventType,
    attendee_info: e.attendeeInfo,
    access_type: e.accessType,
    description: e.description,
    public_description: e.publicDescription,
    organizer_name: e.organizerName,
    parking: e.parking,
    categories: e.categories,
    image_url: e.image_url,
    expected_attendance: e.expectedAttendance,
    expected_vendors: e.expectedVendors,
    family_friendly: e.familyFriendly,
    pets_allowed: e.petsAllowed,
    food_available: e.foodAvailable,
    accessibility: e.accessibility,
    food_allowed: e.food_allowed,
    nonprofit_discount: e.nonprofit_discount,
    vendor_applications_open: e.vendorApplicationsOpen,
    vendor_spots_total: e.vendor_spots_total,
    vendor_spots_available: e.vendor_spots_available,
    booth_price_min: e.booth_price_min,
    booth_price_max: e.booth_price_max,
    application_deadline: e.application_deadline,
    related_opportunity_slug: e.relatedOpportunitySlug,
    cta_text: e.cta_text,
  }));

  const [oppResult, evtResult] = await Promise.all([
    db.from('opportunities').upsert(opportunities, { onConflict: 'slug' }),
    db.from('events').upsert(events, { onConflict: 'slug' }),
  ]);

  const errors = [oppResult.error, evtResult.error].filter(Boolean);
  if (errors.length) {
    return NextResponse.json({ success: false, errors: errors.map((e) => e.message) }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    seeded: { opportunities: opportunities.length, events: events.length },
  });
}
