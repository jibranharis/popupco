'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from '../../login/page.module.css';

export default function ConfirmPage() {
  const router = useRouter();
  const [status, setStatus] = useState('confirming');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setStatus('success');
        setTimeout(() => router.push('/dashboard'), 2000);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setStatus('success');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setStatus('error');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <main className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>
        <img src="/images/popupco-logo-mark.png" alt="" />
        <span>PopUpCo</span>
      </Link>
      <section className={styles.authContainer}>
        {status === 'confirming' && (
          <>
            <h1 className={styles.title}>Confirming your account...</h1>
            <p className={styles.subtitle}>Just a moment.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h1 className={styles.title}>Email confirmed</h1>
            <p className={styles.subtitle}>Redirecting to your dashboard...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className={styles.title}>Confirmation failed</h1>
            <p className={styles.subtitle}>Link may have expired. Try signing in or signing up again.</p>
            <Link href="/login" className="btn btn--primary btn--full">Back to login</Link>
          </>
        )}
      </section>
    </main>
  );
}
