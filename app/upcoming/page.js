'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CalendarX, Bell, ArrowRight, MapPin, Store, Users } from 'lucide-react';
import styles from './page.module.css';

const upcomingHints = [
  [Store, 'Curated vendor markets', 'Handpicked sellers, makers, and food vendors.'],
  [MapPin, 'Bay Area locations', 'San Ramon, East Bay, and surrounding neighborhoods.'],
  [Users, 'Free to attend', 'Open to the public — come shop, explore, and discover.'],
];

export default function UpcomingPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>

        {/* ── HERO ── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <span className="label">Upcoming pop-ups</span>
              <h1>Your next local pop-up is on the way.</h1>
              <p>
                We're curating the next round of Bay Area markets, vendor fairs, and community pop-ups.
                Check back soon — something great is coming to a neighborhood near you.
              </p>
              <div className={styles.ctas}>
                <Link href="/vendors" className={`${styles.roleButton} ${styles.primaryButton}`}>
                  Find opportunities <ArrowRight size={18} />
                </Link>
                <Link href="/discover" className={`${styles.roleButton} ${styles.secondaryButton}`}>
                  Browse the marketplace
                </Link>
              </div>
            </div>

            {/* Empty state card */}
            <div className={styles.emptyCard}>
              <div className={styles.emptyIcon}>
                <CalendarX size={36} />
              </div>
              <strong>No events in your area yet.</strong>
              <p>
                We don't have any scheduled pop-ups to show right now. New events are added regularly — check back in or get notified when something launches near you.
              </p>
              <div className={styles.notifyRow}>
                <Bell size={15} />
                <span>Notifications coming soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT TO EXPECT ── */}
        <section className={styles.featureStripSection}>
          <div className={`container ${styles.featureStrip}`}>
            {upcomingHints.map(([Icon, title, copy]) => (
              <div className={styles.featureItem} key={title}>
                <span className={styles.featureIcon}><Icon size={28} /></span>
                <span>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
