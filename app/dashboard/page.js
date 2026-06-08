'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { FileText, Heart, Mail, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import styles from './dashboard.module.css';

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [applicationCount, setApplicationCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    supabase
      .from('vendor_applications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .then(({ count }) => setApplicationCount(count || 0));

    try {
      const savedSpaces = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
      const savedEvents = JSON.parse(localStorage.getItem(`saved_events_${user.id}`) || '[]');
      setSavedCount(savedSpaces.length + savedEvents.length);
    } catch {
      setSavedCount(0);
    }
  }, [user]);

  if (!user) return null; // handled by layout AuthGuard

  const renderRoleSpecificContent = () => {
    switch (user.type) {
      case 'vendor':
        return 'Find markets, manage your booth applications, and update your vendor profile.';
      case 'venue':
        return 'Manage your venue listings and review host requests.';
      case 'host':
        return 'Manage your events, review vendor applications, and coordinate your pop-ups.';
      default:
        return 'Discover and save your favorite local pop-ups and events.';
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Welcome back, {user.name.split(' ')[0]}</h1>
        <p className={styles.pageSubtitle}>{renderRoleSpecificContent()}</p>
      </div>

      <div className={`${styles.grid} ${styles.grid3}`}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Active Applications</span>
            <FileText size={20} className={styles.cardIcon} />
          </div>
          <div className={styles.statValue}>{applicationCount}</div>
          <div className={styles.statLabel}>Pending review</div>
          <Link href="/dashboard/applications" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px', color: 'var(--color-accent)', fontWeight: '600', fontSize: '0.9rem' }}>
            View applications <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Saved</span>
            <Heart size={20} className={styles.cardIcon} />
          </div>
          <div className={styles.statValue}>{savedCount}</div>
          <div className={styles.statLabel}>Opportunities saved</div>
          <Link href="/dashboard/saved" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px', color: 'var(--color-accent)', fontWeight: '600', fontSize: '0.9rem' }}>
            View saved <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Messages</span>
            <Mail size={20} className={styles.cardIcon} />
          </div>
          <div className={styles.statValue}>0</div>
          <div className={styles.statLabel}>Unread messages</div>
          <Link href="/dashboard/messages" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px', color: 'var(--color-accent)', fontWeight: '600', fontSize: '0.9rem' }}>
            Open inbox <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className={`${styles.grid} ${styles.grid2}`} style={{ marginTop: '24px' }}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Next steps</h3>
          <ul className={styles.checklist}>
            <li className={styles.checklistItem}>
              <CheckCircle2 size={20} className={`${styles.checkCircle} ${styles.checkCircleCompleted}`} />
              <div className={styles.checkContent}>
                <h4>Create your account</h4>
                <p>You're all set and logged in.</p>
              </div>
            </li>
            <li className={styles.checklistItem}>
              <Circle size={20} className={styles.checkCircle} />
              <div className={styles.checkContent}>
                <h4>Complete your profile</h4>
                <p>Add photos and details so hosts know who you are.</p>
                <Link href="/dashboard/profile" style={{ display: 'inline-block', marginTop: '8px', color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: '600' }}>Edit profile</Link>
              </div>
            </li>
            <li className={styles.checklistItem}>
              <Circle size={20} className={styles.checkCircle} />
              <div className={styles.checkContent}>
                <h4>Apply to an opportunity</h4>
                <p>Browse open markets and submit your first application.</p>
                <Link href="/vendors" style={{ display: 'inline-block', marginTop: '8px', color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: '600' }}>Browse opportunities</Link>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Recommended for you</h3>
          <div className={styles.emptyState} style={{ padding: '32px 16px', background: 'transparent', border: '1px dashed var(--color-border)' }}>
            <Heart size={32} className={styles.emptyIcon} />
            <h4 className={styles.emptyTitle}>No recommendations yet</h4>
            <p className={styles.emptyText} style={{ fontSize: '0.9rem', marginBottom: '16px' }}>Complete your profile to get personalized recommendations for upcoming pop-ups.</p>
            <Link href="/dashboard/profile" className="btn btn--secondary btn--sm">Complete Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
}
