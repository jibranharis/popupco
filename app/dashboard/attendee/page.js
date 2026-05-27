'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { useAuth } from '@/components/AuthContext';
import { SPACES_DATA } from '@/lib/spaces';
import styles from '../page.module.css';

export default function AttendeeDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.type !== 'attendee')) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.dashboardHeader}>
            <div className={styles.headerLeft}>
              <h1>Saved Events</h1>
              <p className="text-muted">Discover local markets, pop-ups, food events, and community experiences.</p>
            </div>
            <Link href="/browse" className="btn btn--primary">Discover</Link>
          </div>
          <div className="grid-3">
            {SPACES_DATA.slice(0, 3).map((space) => <SpaceCard key={space.id} space={space} />)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
