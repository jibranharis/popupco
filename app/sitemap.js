import { SPACES_DATA } from '@/lib/spaces';
import { PLACEHOLDER_EVENTS } from '@/lib/data';

const baseUrl = 'https://popupco.vercel.app';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/discover',
    '/browse',
    '/upcoming',
    '/vendors',
    '/venues',
    '/hosts',
    '/apply/vendor',
    '/apply/venue',
    '/apply/host',
    '/signup',
    '/login',
    '/about',
    '/pricing',
    '/faq',
    '/contact',
    '/help',
    '/terms',
    '/privacy',
  ];

  const opportunityRoutes = SPACES_DATA.map((space) => `/spaces/${space.slug}`);
  const eventRoutes = PLACEHOLDER_EVENTS.map((event) => `/upcoming/${event.slug}`);

  return [...staticRoutes, ...opportunityRoutes, ...eventRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith('/spaces') || route === '/browse' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/browse' ? 0.9 : 0.7,
  }));
}
