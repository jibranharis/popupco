'use client';

import Link from 'next/link';
import { useAuth } from './AuthContext';

export function loginHref(redirect, intent = 'continue') {
  return `/login?redirect=${encodeURIComponent(redirect)}&intent=${encodeURIComponent(intent)}`;
}

export default function GatedLink({ href, intent = 'continue', children, ...props }) {
  const { user } = useAuth();
  return (
    <Link href={user ? href : loginHref(href, intent)} {...props}>
      {children}
    </Link>
  );
}
