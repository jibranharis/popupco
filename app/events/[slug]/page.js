import { notFound } from 'next/navigation';
import { getPublicEventBySlug } from '@/lib/data';
import EventDetailClient from './EventDetailClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getPublicEventBySlug(slug);
  if (!event) return {};

  const url = `https://popupco.vercel.app/events/${slug}`;
  const title = `${event.event_name} | PopUpCo Events`;
  const description = event.description?.substring(0, 160) || 'Find pop-up events and vendor markets on PopUpCo.';
  const images = event.image_url ? [{ url: event.image_url }] : [{ url: 'https://popupco.vercel.app/images/popupco-og.png' }];

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

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = getPublicEventBySlug(slug);
  
  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}
