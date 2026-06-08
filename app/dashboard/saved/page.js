'use client';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from '../dashboard.module.css';

export default function SavedPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Saved Opportunities</h1>
        <p className={styles.pageSubtitle}>Keep track of pop-ups, venues, and events you want to revisit.</p>
      </div>

      <div className={styles.emptyState}>
        <Heart size={48} className={styles.emptyIcon} />
        <h3 className={styles.emptyTitle}>No saved opportunities yet</h3>
        <p className={styles.emptyText}>Click the heart icon on any listing to save it here for quick access later.</p>
        <Link href="/vendors" className="btn btn--primary">Browse opportunities</Link>
      </div>
    </>
  );
}
