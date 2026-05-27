'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { useAuth } from '@/components/AuthContext';
import { SPACES_DATA } from '@/lib/spaces';
import { Settings, FileText, Heart, MessageSquare, ChevronRight } from 'lucide-react';
import styles from '../page.module.css';
import Link from 'next/link';

export default function VendorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.type !== 'vendor')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const savedSpaceIds = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
  const savedSpaces = SPACES_DATA.filter(s => savedSpaceIds.includes(s.id));

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.dashboardHeader}>
            <div className={styles.headerLeft}>
              <h1>Welcome back, {user.name}</h1>
              <p className="text-muted">Manage your pop-up applications, saved opportunities, messages, and vendor profile.</p>
            </div>
            <Link href="/browse" className="btn btn--primary">Find Opportunities</Link>
          </div>

          <div className={styles.grid}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className="card p-6">
                <div className={styles.profileSummary}>
                  <div className={styles.avatarLarge}>{user.name.charAt(0)}</div>
                  <h3>{user.name}</h3>
                  <p className="text-muted text-sm">{user.email}</p>
                  
                  <div className={styles.progressBlock}>
                    <div className={styles.progressText}>
                      <span>Profile completion</span>
                      <span>60%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{width: '60%'}}></div>
                    </div>
                  </div>
                  
                  <button className="btn btn--secondary btn--full btn--sm mt-4">Edit Profile</button>
                </div>
              </div>

              <nav className={styles.sideNav}>
                <Link href="#overview" className={styles.navItemActive}>
                  <FileText size={18} /> Overview
                </Link>
                <Link href="#saved" className={styles.navItem}>
                  <Heart size={18} /> Saved ({savedSpaces.length})
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
              
              {/* Applications Status */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Active Applications</h2>
                <div className={styles.emptyState} style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--sp-10)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <FileText size={32} className="text-muted mb-4" />
                  <h4>No active applications</h4>
                  <p className="text-muted mt-2 mb-4">You haven't applied to any upcoming events yet.</p>
                  <Link href="/apply/vendor" className="btn btn--secondary">Apply to an Event</Link>
                </div>
              </section>

              {/* Saved Spaces */}
              <section id="saved" className={styles.section}>
                <h2 className={styles.sectionTitle}>Saved Opportunities</h2>
                {savedSpaces.length > 0 ? (
                  <div className="grid-2">
                    {savedSpaces.map(space => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <Heart size={32} className="text-muted mb-4" />
                    <h4>No saved opportunities yet</h4>
                    <p className="text-muted mt-2 mb-4">Keep track of markets, spaces, and events you like by clicking the heart icon.</p>
                    <Link href="/browse" className="btn btn--secondary">Browse Opportunities</Link>
                  </div>
                )}
              </section>

              {/* Recommended */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Recommended for you</h2>
                <div className="grid-2">
                  {SPACES_DATA.slice(0, 2).map(space => (
                    <SpaceCard key={space.id} space={space} />
                  ))}
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
