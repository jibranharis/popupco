import { notFound } from 'next/navigation';
import { getOpportunityBySlug, mapDbOpportunity, SPACES_DATA } from '@/lib/spaces';
import { supabase } from '@/lib/supabase';
import SpaceDetailClient from './SpaceDetailClient';

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
