'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Calendar } from 'lucide-react';
import SpaceCard from '@/components/SpaceCard';
import { SPACES_DATA } from '@/lib/spaces';
import { PLACEHOLDER_EVENTS } from '@/lib/data';
import styles from '../dashboard.module.css';

export default function SavedPage() {
  const { user } = useAuth();
  const [savedSpaceIds, setSavedSpaceIds] = useState([]);
  const [savedEventIds, setSavedEventIds] = useState([]);

  useEffect(() => {
    if (!user) return;
    try {
      setSavedSpaceIds(JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]'));
      setSavedEventIds(JSON.parse(localStorage.getItem(`saved_events_${user.id}`) || '[]'));
    } catch {
      setSavedSpaceIds([]);
      setSavedEventIds([]);
    }
  }, [user]);

  if (!user) return null;

  const savedSpaces = SPACES_DATA.filter((space) => savedSpaceIds.includes(space.id));
  const savedEvents = PLACEHOLDER_EVENTS.filter((event) => savedEventIds.includes(event.id));
  const hasSaved = savedSpaces.length > 0 || savedEvents.length > 0;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Saved Opportunities</h1>
        <p className={styles.pageSubtitle}>Keep track of pop-ups, venues, and events you want to revisit.</p>
      </div>

      {!hasSaved ? (
        <div className={styles.emptyState}>
          <Heart size={48} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No saved opportunities yet</h3>
          <p className={styles.emptyText}>Click the heart icon on any listing to save it here for quick access later.</p>
          <Link href="/vendors" className="btn btn--primary">Browse opportunities</Link>
        </div>
      ) : (
        <>
          {savedSpaces.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Saved Spaces</h2>
              <div className={`${styles.grid} ${styles.grid2}`}>
                {savedSpaces.map((space) => <SpaceCard key={space.id} space={space} />)}
              </div>
            </div>
          )}

          {savedEvents.length > 0 && (
            <div>
              <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Saved Events</h2>
              <div className={`${styles.grid} ${styles.grid2}`}>
                {savedEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.slug}`} className={styles.card} style={{ display: 'flex', gap: '16px', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ position: 'relative', width: '96px', height: '72px', flexShrink: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                      <Image src={event.image_url} alt={event.event_name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{event.event_name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} /> Apply by {event.application_deadline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
