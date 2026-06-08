import { NextResponse } from 'next/server';

const WINDOW_MS = 60 * 1000;
const buckets = new Map();

const limits = [
  { prefix: '/api/admin', max: 5 },
  { prefix: '/api/apply/', max: 10 },
  { prefix: '/api/contact', max: 10 },
];

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function getLimit(pathname) {
  return limits.find(({ prefix }) => pathname.startsWith(prefix));
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const limit = getLimit(pathname);
  if (!limit) return NextResponse.next();

  const key = `${getClientIp(request)}:${limit.prefix}`;
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const recent = (buckets.get(key) || []).filter((timestamp) => timestamp > cutoff);

  if (recent.length >= limit.max) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  recent.push(now);
  buckets.set(key, recent);

  // In-memory state keeps this small app dependency-free; it resets per server instance/restart, accepted here.
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/apply/:path*', '/api/contact'],
};
