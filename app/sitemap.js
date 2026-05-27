import { SPACES_DATA } from '@/lib/spaces';

const baseUrl = 'https://popupco.vercel.app';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/browse',
    '/vendors',
    '/venues',
    '/hosts',
    '/apply/vendor',
    '/apply/venue',
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

  return [...staticRoutes, ...opportunityRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith('/spaces') || route === '/browse' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/browse' ? 0.9 : 0.7,
  }));
}
