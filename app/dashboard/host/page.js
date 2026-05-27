'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { CalendarDays, CheckCircle2, ClipboardList, MapPin, MessageSquare, Users } from 'lucide-react';
import styles from '../page.module.css';

export default function HostDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.type !== 'host')) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.dashboardHeader}>
            <div className={styles.headerLeft}>
              <h1>Host Dashboard</h1>
              <p className="text-muted">Plan events, manage vendor applications, compare spaces, and keep event details moving.</p>
            </div>
            <Link href="/browse" className="btn btn--primary">Find Spaces</Link>
          </div>

          <div className={styles.statsGrid}>
            {[
              ['My Events', '2 drafts', CalendarDays],
              ['Vendor Applications', '24 to review', ClipboardList],
              ['Saved Spaces', '6 options', MapPin],
            ].map(([label, value, Icon]) => (
              <div key={label} className="card" style={{ padding: 'var(--sp-6)' }}>
                <Icon size={22} className="text-accent" />
                <h3 style={{ marginTop: 'var(--sp-3)' }}>{value}</h3>
                <p className="text-muted">{label}</p>
              </div>
            ))}
          </div>

          <section id="applications" className={styles.section}>
            <h2 className={styles.sectionTitle}>Vendor Applications</h2>
            <div className="card">
              {['Bloom Skincare', 'Retro Finds', 'Oakland Print Studio'].map((vendor) => (
                <div key={vendor} className={styles.appRow}>
                  <div>
                    <div className="badge badge--accent mb-2">Needs review</div>
                    <h4>{vendor}</h4>
                    <p className="text-muted text-sm">Category fit, setup needs, and photos ready for review.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn--secondary btn--sm">Waitlist</button>
                    <button className="btn btn--primary btn--sm">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="events" className={styles.section}>
            <h2 className={styles.sectionTitle}>Event Checklist</h2>
            <div className="grid-3">
              {['Venue shortlist', 'Vendor category balance', 'Load-in details', 'Promotion status', 'Food permit notes', 'Message accepted vendors'].map((item) => (
                <div key={item} className="card" style={{ padding: 'var(--sp-5)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle2 size={18} className="text-sage" />
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </section>

          <section id="messages" className={styles.section}>
            <h2 className={styles.sectionTitle}>Messages</h2>
            <div className={styles.welcomeMessage}>
              <div className={styles.messageAvatar}>P</div>
              <div>
                <div className={styles.messageTop}>
                  <strong>PopUpCo</strong>
                  <span className={styles.unreadPill}>New</span>
                </div>
                <p>Welcome to PopUpCo. Host messages will show venue replies, vendor questions, accepted vendor updates, and event reminders here.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
