'use client';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import styles from '../dashboard.module.css';

export default function ApplicationsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Applications</h1>
        <p className={styles.pageSubtitle}>Track your submitted applications and requests.</p>
      </div>

      <div className={styles.emptyState}>
        <FileText size={48} className={styles.emptyIcon} />
        <h3 className={styles.emptyTitle}>No active applications yet</h3>
        <p className={styles.emptyText}>You haven't applied to any upcoming events yet. Browse opportunities and submit your first application when you're ready.</p>
        <Link href="/vendors" className="btn btn--primary">Browse vendor opportunities</Link>
      </div>
    </>
  );
}
