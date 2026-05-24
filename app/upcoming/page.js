'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PLACEHOLDER_EVENTS } from '@/lib/data';
import { MapPin, Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'accepting', label: 'Accepting Vendors' },
  { id: 'coming_soon', label: 'Coming Soon' },
  { id: 'food', label: 'Food Trucks Welcome' },
  { id: 'nonprofit', label: 'Nonprofit-Friendly' },
  { id: 'venue_needed', label: 'Venue Needed' },
];

const statusConfig = {
  accepting: { label: 'Accepting Vendors', cls: styles.statusGreen },
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
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    pageRef.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = PLACEHOLDER_EVENTS.filter((event) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'accepting') return event.status === 'accepting';
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
              Apply to sell at curated pop-up markets across the Bay Area.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {/* Filters */}
            <div className={styles.filters}>
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`${styles.filterBtn} ${activeFilter === f.id ? styles.filterActive : ''}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Events */}
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>No events match that filter right now. Check back soon.</p>
                <button onClick={() => setActiveFilter('all')} className="btn btn--secondary btn--sm">
                  View all events
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((event, i) => {
                  const status = statusConfig[event.status] || statusConfig.coming_soon;
                  const ctaHref = event.status === 'accepting'
                    ? `/apply/vendor?event=${event.slug}`
                    : event.status === 'venue_needed'
                    ? '/apply/venue'
                    : `/upcoming/${event.slug}`;

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
                        <p className={styles.desc}>{event.description}</p>

                        <div className={styles.details}>
                          {event.vendor_spots_total > 0 && (
                            <div className={styles.detail}>
                              <span className={styles.detailLabel}>Vendor spots</span>
                              <span className={styles.detailVal}>Up to {event.vendor_spots_total}</span>
                            </div>
                          )}
                          {event.booth_price_min && (
                            <div className={styles.detail}>
                              <span className={styles.detailLabel}>Booth range</span>
                              <span className={styles.detailVal}>${event.booth_price_min}–${event.booth_price_max}</span>
                            </div>
                          )}
                          {event.application_deadline && (
                            <div className={styles.detail}>
                              <span className={styles.detailLabel}>Applications</span>
                              <span className={styles.detailVal}>{event.application_deadline}</span>
                            </div>
                          )}
                          <div className={styles.detail}>
                            <span className={styles.detailLabel}>Nonprofit discount</span>
                            <span className={styles.detailVal}>{event.nonprofit_discount ? 'Available' : 'Not available'}</span>
                          </div>
                        </div>

                        {event.food_allowed === 1 && (
                          <div className={styles.foodNote}>
                            <AlertCircle size={13} />
                            Food, beverage & food truck vendors welcome. Additional permits may be required.
                          </div>
                        )}

                        <div className={styles.categories}>
                          {event.categories.split(',').map((c) => (
                            <span key={c} className="badge badge--neutral" style={{fontSize:'0.6875rem', padding:'3px 8px'}}>{c.trim()}</span>
                          ))}
                        </div>

                        <div className={styles.cardCtas}>
                          <Link href={ctaHref} className="btn btn--primary btn--sm">
                            {event.cta_text}
                          </Link>
                          <Link href={`/upcoming/${event.slug}`} className="btn btn--secondary btn--sm">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Notice */}
            <div className={`notice notice--info ${styles.notice}`}>
              <strong>More events coming soon.</strong> Pop Up Co. is actively planning additional markets across the Bay Area. Apply now or join the waitlist to be considered for upcoming events.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
