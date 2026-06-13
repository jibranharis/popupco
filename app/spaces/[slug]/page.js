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
  
  const url = `https://popupco.vercel.app/spaces/${slug}`;
  const title = `${space.name} | PopUpCo Venues`;
  const description = space.description?.substring(0, 160) || 'Find pop-up retail spaces and venues on PopUpCo.';
  const images = space.images?.length > 0 ? [{ url: space.images[0] }] : [{ url: 'https://popupco.vercel.app/images/popupco-og.png' }];

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'PopUpCo',
      images,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

export default async function SpaceDetailPage({ params }) {
  const { slug } = await params;
  const space = await getSpace(slug);
  if (!space) notFound();

  const similar = SPACES_DATA.filter((item) => item.id !== space.id).slice(0, 3);

  return <SpaceDetailClient space={space} similar={similar} />;
}
