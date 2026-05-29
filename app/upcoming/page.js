'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PLACEHOLDER_EVENTS } from '@/lib/data';
import { MapPin, Calendar, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'accepting', label: 'Vendor Applications Open' },
  { id: 'coming_soon', label: 'Coming Soon' },
  { id: 'food', label: 'Food Pop-Ups' },
  { id: 'nonprofit', label: 'Nonprofit-Friendly' },
  { id: 'venue_needed', label: 'Venue Needed' },
];

const statusConfig = {
  accepting: { label: 'Vendor Applications Open', cls: styles.statusGreen },
  coming_soon: { label: 'Coming Soon', cls: styles.statusOrange },
  venue_needed: { label: 'Venue Needed', cls: styles.statusSage },
  closed: { label: 'Applications Closed', cls: styles.statusNeutral },
};

export default function UpcomingPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    pageRef.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = PLACEHOLDER_EVENTS.filter((event) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'accepting') return event.vendorApplicationsOpen;
    if (activeFilter === 'coming_soon') return event.status === 'coming_soon';
    if (activeFilter === 'venue_needed') return event.status === 'venue_needed';
    if (activeFilter === 'food') return event.food_allowed === 1;
    if (activeFilter === 'nonprofit') return event.nonprofit_discount === 1;
    return true;
  });

  return (
    <>
      <Header />
      <main ref={pageRef}>
        <section className={styles.hero}>
          <div className="container">
            <div className={`badge badge--accent ${styles.badge}`}>On the calendar</div>
            <h1 className={styles.headline}>Upcoming Pop-Ups</h1>
            <p className={styles.sub}>
              Find local markets, food pop-ups, brand events, and community experiences near you.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className={styles.filters}>
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.filterActive : ''}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>No events match that filter right now. Try another filter or check back soon.</p>
                <button onClick={() => setActiveFilter('all')} className="btn btn--secondary btn--sm">
                  View all events
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((event) => {
                  const status = statusConfig[event.status] || statusConfig.coming_soon;

                  return (
                    <div key={event.id} className={`card fade-in ${styles.eventCard}`}>
                      <div className={styles.imageWrap}>
                        <Image
                          src={event.image_url}
                          alt={event.event_name}
                          fill
                          className={styles.image}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <span className={`${status.cls} ${styles.statusBadge}`}>{status.label}</span>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.meta}>
                          <span className={styles.date}><Calendar size={13} /> {event.date}</span>
                          <span className={styles.location}><MapPin size={13} /> {event.city}</span>
                        </div>
                        <h2 className={styles.eventName}>{event.event_name}</h2>
                        <p className={styles.locationFull}>{event.location_name}</p>
                        <p className={styles.desc}>{event.publicDescription || event.description}</p>

                        <div className={styles.details}>
                          <div className={styles.detail}>
                            <span className={styles.detailLabel}>Time</span>
                            <span className={styles.detailVal}>{event.startTime}-{event.endTime}</span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.detailLabel}>Access</span>
                            <span className={styles.detailVal}>{event.accessType}</span>
                          </div>
                          <div className={styles.detail}>
                            <span className={styles.detailLabel}>Type</span>
                            <span className={styles.detailVal}>{event.eventType}</span>
                          </div>
                        </div>

                        {event.food_allowed === 1 && (
                          <div className={styles.foodNote}>
                            <AlertCircle size={13} />
                            Food vendors may participate when permits and venue rules allow.
                          </div>
                        )}

                        <div className={styles.categories}>
                          {event.categories.split(',').map((category) => (
                            <span key={category} className="badge badge--neutral" style={{ fontSize: '0.6875rem', padding: '3px 8px' }}>
                              {category.trim()}
                            </span>
                          ))}
                        </div>

                        <div className={styles.cardCtas}>
                          <Link href={`/upcoming/${event.slug}`} className="btn btn--primary btn--sm">
                            View Event
                          </Link>
                          {event.vendorApplicationsOpen && (
                            <Link href={`/apply/vendor?event=${event.slug}`} className="btn btn--secondary btn--sm">
                              Apply to Sell
                            </Link>
                          )}
                          {event.status === 'venue_needed' && (
                            <Link href="/apply/venue" className="btn btn--secondary btn--sm">
                              Offer a Venue
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={`notice notice--info ${styles.notice}`}>
              <strong>More events coming soon.</strong> PopUpCo is actively planning additional markets across the Bay Area. Attendees can view public event details here, while vendors can apply separately when applications are open.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
