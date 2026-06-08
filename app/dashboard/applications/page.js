'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import styles from '../dashboard.module.css';

const STATUS_STYLES = {
  pending: { label: 'Pending Review', color: 'var(--color-text-muted)', bg: 'var(--color-bg-alt)' },
  approved: { label: 'Approved', color: 'var(--color-sage)', bg: 'rgba(141, 163, 141, 0.12)' },
  rejected: { label: 'Not Selected', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' },
};

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('vendor_applications')
      .select('id, event_slug, brand_name, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setApplications(data || []);
        setLoading(false);
      });
  }, [user]);

  if (!user) return null;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Applications</h1>
        <p className={styles.pageSubtitle}>Track your submitted applications and requests.</p>
      </div>

      {loading ? null : applications.length === 0 ? (
        <div className={styles.emptyState}>
          <FileText size={48} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No active applications yet</h3>
          <p className={styles.emptyText}>You haven't applied to any upcoming events yet. Browse opportunities and submit your first application when you're ready.</p>
          <Link href="/vendors" className="btn btn--primary">Browse vendor opportunities</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {applications.map((application) => {
            const status = STATUS_STYLES[application.status] || STATUS_STYLES.pending;
            return (
              <Link
                key={application.id}
                href={application.event_slug ? `/events/${application.event_slug}` : '/dashboard/applications'}
                className={styles.card}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}
              >
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{application.brand_name || application.event_slug || 'Application'}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Submitted {new Date(application.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, padding: '6px 12px', borderRadius: 'var(--radius-full)', color: status.color, background: status.bg }}>
                    {status.label}
                  </span>
                  <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
