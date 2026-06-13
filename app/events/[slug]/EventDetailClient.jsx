'use client';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GatedLink, { loginHref } from '@/components/GatedLink';
import { getPublicEventBySlug, PLACEHOLDER_EVENTS } from '@/lib/data';
import { useAuth } from '@/components/AuthContext';
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  MessageSquare,
  Share,
  ShieldCheck,
  Users,
} from 'lucide-react';
import styles from '../../spaces/[slug]/page.module.css';

export default function EventDetailClient({ event }) {
  const router = useRouter();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user || !event) return;
    const saved = JSON.parse(localStorage.getItem(`saved_events_${user.id}`) || '[]');
    setIsSaved(saved.includes(event.id));
  }, [user, event?.id]);

  const toggleSave = () => {
    if (!user) {
      router.push(loginHref(`/events/${event.slug}`, 'save'));
      return;
    }
    const saved = JSON.parse(localStorage.getItem(`saved_events_${user.id}`) || '[]');
    const nextSaved = isSaved ? saved.filter((id) => id !== event.id) : [...saved, event.id];
    localStorage.setItem(`saved_events_${user.id}`, JSON.stringify(nextSaved));
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://popupco.vercel.app/events/${event.slug}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title: event.event_name, url: shareUrl });
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Link href="/upcoming" className={styles.backBtn}><ChevronLeft size={19} /> Back to opportunities</Link>

          <div className={styles.titleArea}>
            <div>
              <div className={styles.kicker}>{event.eventType}</div>
              <h1>{event.event_name}</h1>
              <div className={styles.metaLine}>
                <span><MapPin size={16} /> {event.location_name}</span>
                <span><CalendarDays size={16} /> {event.date}</span>
                <span><Users size={16} /> {event.expectedAttendance}</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={handleShare}><Share size={16} /> {copied ? 'Copied!' : 'Share'}</button>
              <button onClick={toggleSave}><Heart size={16} fill={isSaved ? '#E53E3E' : 'none'} color={isSaved ? '#E53E3E' : 'currentColor'} /> {isSaved ? 'Saved' : 'Save'}</button>
            </div>
          </div>

          <div className={styles.gallery} style={{ height: '400px', gridTemplateColumns: '1fr' }}>
            <div className={styles.galleryMain}>
              <Image src={event.image_url} alt={`${event.event_name} photo`} fill className={styles.galleryImg} priority />
            </div>
          </div>

          <div className={styles.contentGrid}>
            <article className={styles.content}>
              <section className={styles.summaryGrid}>
                {[
                  ['Date', event.date],
                  ['Time', `${event.startTime} - ${event.endTime}`],
                  ['City', event.city],
                  ['Booth price', `$${event.booth_price_min} - $${event.booth_price_max}`],
                  ['Total vendors', event.vendor_spots_total],
                  ['Deadline', event.application_deadline],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </section>

              <section className={styles.section}>
                <h2>About the event</h2>
                <p>{event.description}</p>
                <p style={{ marginTop: '16px' }}>{event.publicDescription}</p>
              </section>

              <section className={styles.section}>
                <h2>Vendor details</h2>
                <div className={styles.twoLists}>
                  <div>
                    <h3>Looking for</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '8px' }}>{event.categories}</p>
                  </div>
                  <div>
                    <h3>Amenities & Rules</h3>
                    <ul>
                      <li>Family friendly: {event.familyFriendly}</li>
                      <li>Pets: {event.petsAllowed}</li>
                      <li>Food/Drink: {event.foodAvailable}</li>
                      {event.nonprofit_discount === 1 && <li>Nonprofit discounts available</li>}
                    </ul>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2>Attendee Information</h2>
                <p>{event.attendeeInfo}</p>
                <p style={{ marginTop: '8px' }}><strong>Access:</strong> {event.accessType}</p>
              </section>

              <section className={styles.hostProfile}>
                <div className={styles.hostAvatar}>{event.organizerName.charAt(0)}</div>
                <div>
                  <span><ShieldCheck size={16} /> Verified Organizer</span>
                  <h2>{event.organizerName}</h2>
                  <p>Organizing since 2026. Typically responds within 2 days.</p>
                </div>
              </section>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.bookingCard}>
                <div className={styles.bookingTop}>
                  <strong>${event.booth_price_min} - ${event.booth_price_max}</strong>
                  <span>{event.status === 'accepting' ? 'Accepting vendors' : 'Coming soon'}</span>
                </div>
                <div className={styles.bookingFact}><Clock size={16} /> Deadline: {event.application_deadline}</div>
                <div className={styles.bookingFact}><ShieldCheck size={16} /> Verified Event</div>
                
                {event.vendorApplicationsOpen ? (
                  <GatedLink href={`/apply/vendor/interest?event=${event.slug}`} intent="apply" className="btn btn--primary btn--full">
                    {event.cta_text}
                  </GatedLink>
                ) : (
                  <button className="btn btn--secondary btn--full" disabled style={{ opacity: 0.5 }}>
                    Applications closed
                  </button>
                )}
                
                <GatedLink href={`/contact?subject=${encodeURIComponent(event.event_name)}`} intent="message" className="btn btn--secondary btn--full" style={{ marginTop: '8px' }}>
                  <MessageSquare size={16} /> Contact Organizer
                </GatedLink>
                <p>Applying does not guarantee a spot. You will only pay if approved.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
