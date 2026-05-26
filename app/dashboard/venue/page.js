'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { Settings, Home, Calendar, MessageSquare, ChevronRight, TrendingUp } from 'lucide-react';
import styles from '../page.module.css';
import Link from 'next/link';

export default function VenueDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.type !== 'venue')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.dashboardHeader}>
            <div className={styles.headerLeft}>
              <h1>Venue Host Dashboard</h1>
              <p className="text-muted">Manage your spaces, bookings, and incoming requests.</p>
            </div>
            <Link href="/apply/venue" className="btn btn--primary">List Another Space</Link>
          </div>

          <div className={styles.grid}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className="card p-6">
                <div className={styles.profileSummary}>
                  <div className={styles.avatarLarge} style={{background: 'var(--color-sage)'}}>
                    {user.name.charAt(0)}
                  </div>
                  <h3>{user.name}</h3>
                  <p className="text-muted text-sm">{user.email}</p>
                  <p className="text-sm font-medium mt-2">⭐ 4.9 (12 reviews)</p>
                </div>
              </div>

              <nav className={styles.sideNav}>
                <Link href="#overview" className={styles.navItemActive}>
                  <TrendingUp size={18} /> Overview
                </Link>
                <Link href="#spaces" className={styles.navItem}>
                  <Home size={18} /> My Spaces (1)
                </Link>
                <Link href="#requests" className={styles.navItem}>
                  <Calendar size={18} /> Booking Requests
                </Link>
                <Link href="#messages" className={styles.navItem}>
                  <MessageSquare size={18} /> Messages
                </Link>
                <Link href="#settings" className={styles.navItem}>
                  <Settings size={18} /> Settings
                </Link>
              </nav>
            </aside>

            {/* Main Content */}
            <div className={styles.content}>
              
              {/* Quick Stats */}
              <div className={styles.statsGrid}>
                <div className="card p-6">
                  <p className="text-muted text-sm font-semibold uppercase tracking-wider mb-2">This Month</p>
                  <h2 className="text-3xl">$1,450</h2>
                  <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                </div>
                <div className="card p-6">
                  <p className="text-muted text-sm font-semibold uppercase tracking-wider mb-2">Pending Requests</p>
                  <h2 className="text-3xl">3</h2>
                  <p className="text-sm text-muted mt-2">Requires your attention</p>
                </div>
                <div className="card p-6">
                  <p className="text-muted text-sm font-semibold uppercase tracking-wider mb-2">Upcoming</p>
                  <h2 className="text-3xl">4</h2>
                  <p className="text-sm text-muted mt-2">Bookings next 30 days</p>
                </div>
              </div>

              {/* Booking Requests */}
              <section id="requests" className={styles.section}>
                <h2 className={styles.sectionTitle}>Action Required</h2>
                <div className="card">
                  <div className={styles.appRow}>
                    <div>
                      <div className="badge badge--orange mb-2">New Request</div>
                      <h4>Weekend Pop-Up: Vintage & Vinyl</h4>
                      <p className="text-sm text-muted mt-1">Requested by Retro Finds • Dates: Jun 12 - Jun 14</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn--secondary btn--sm">Decline</button>
                      <button className="btn btn--primary btn--sm">Review</button>
                    </div>
                  </div>
                  <hr className={styles.rowDivider} />
                  <div className={styles.appRow}>
                    <div>
                      <div className="badge badge--neutral mb-2">Message Received</div>
                      <h4>Inquiry about space layout</h4>
                      <p className="text-sm text-muted mt-1">From: Bloom Skincare • Regarding: San Jose Community Market</p>
                    </div>
                    <button className="btn btn--secondary btn--sm">Reply</button>
                  </div>
                </div>
              </section>

              {/* My Spaces */}
              <section id="spaces" className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle} style={{margin: 0}}>My Listed Spaces</h2>
                  <Link href="/browse" className="text-sm text-accent underline">View as public</Link>
                </div>
                <div className="card p-5 flex items-center justify-between" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{width: '80px', height: '60px', background: 'var(--color-bg-alt)', borderRadius: '8px', overflow: 'hidden'}}>
                      <img src="/space_sanjose.png" alt="Space" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                    <div>
                      <h4 style={{marginBottom: '4px'}}>San Jose Community Market</h4>
                      <p className="text-sm text-muted">Active • $150/day</p>
                    </div>
                  </div>
                  <button className="btn btn--secondary btn--sm">Edit Listing</button>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
