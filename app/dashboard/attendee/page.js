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
          <section id="messages" className={styles.section} style={{ marginTop: 'var(--sp-12)' }}>
            <h2 className={styles.sectionTitle}>Messages</h2>
            <div className={styles.welcomeMessage}>
              <div className={styles.messageAvatar}>P</div>
              <div>
                <div className={styles.messageTop}>
                  <strong>PopUpCo</strong>
                  <span className={styles.unreadPill}>New</span>
                </div>
                <p>Welcome to PopUpCo. Event updates, saved event notes, and local discovery messages will show up here.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
