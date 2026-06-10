import { notFound } from 'next/navigation';
import { getOpportunityBySlug, SPACES_DATA } from '@/lib/spaces';
import { supabase } from '@/lib/supabase';
import SpaceDetailClient from './SpaceDetailClient';

function mapDbOpportunity(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    type: row.type,
    location: row.location,
    neighborhood: row.neighborhood,
    category: row.category,
    date: row.date,
    availability: row.availability,
    price: row.price,
    cta: row.cta || 'Apply',
    status: row.status || 'accepting',
    trust: row.trust,
    expectedAttendance: row.expected_attendance,
    deadline: row.deadline,
    indoorOutdoor: row.indoor_outdoor,
    foodAllowed: row.food_allowed,
    capacity: row.capacity,
    setupTime: row.setup_time,
    parking: row.parking,
    image: row.image,
    gallery: row.gallery?.length ? row.gallery : [row.image].filter(Boolean),
    description: row.description,
    amenities: row.amenities || [],
    rules: row.rules || [],
    bestFor: row.best_for || [],
    vendorRequirements: row.vendor_requirements || [],
    host: {
      name: row.host_name || 'PopUpCo',
      type: row.host_type || 'Verified host',
      response: row.host_response || 'Responds within 48 hours',
      history: row.host_history || '',
    },
  };
}

async function getSpace(slug) {
  const { data } = await supabase.from('opportunities').select('*').eq('slug', slug).single();
  if (data) return mapDbOpportunity(data);
  return getOpportunityBySlug(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const space = await getSpace(slug);
  if (!space) return {};
  return {
    title: space.name,
    description: space.description,
  };
}

export default async function SpaceDetailPage({ params }) {
  const { slug } = await params;
  const space = await getSpace(slug);
  if (!space) notFound();

  const similar = SPACES_DATA.filter((item) => item.id !== space.id).slice(0, 3);

  return <SpaceDetailClient space={space} similar={similar} />;
}
