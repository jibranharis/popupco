import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PLACEHOLDER_EVENTS, getPublicEventBySlug } from '@/lib/data';
import { MapPin, Calendar, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export async function generateStaticParams() {
  return PLACEHOLDER_EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getPublicEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.event_name,
    description: event.publicDescription || event.description,
  };
}

const statusConfig = {
  accepting: { label: 'Vendor Applications Open', cls: styles.statusGreen },
  coming_soon: { label: 'Public Details Coming Soon', cls: styles.statusOrange },
  venue_needed: { label: 'Venue Partner Needed', cls: styles.statusSage },
  closed: { label: 'Applications Closed', cls: styles.statusNeutral },
};

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = getPublicEventBySlug(slug);
  if (!event) notFound();

  const status = statusConfig[event.status] || statusConfig.coming_soon;
  const vendorHref = `/apply/vendor?event=${event.slug}`;

  const faqs = [
    {
      q: 'Is this page for attendees or vendors?',
      a: 'This is the public event page for attendees. Vendors can use the separate application CTA when vendor applications are open.',
    },
    {
      q: 'Where is the event located?',
      a: event.location_name,
    },
    {
      q: 'Is the event free?',
      a: event.accessType,
    },
    {
      q: 'Can vendors apply?',
      a: event.vendorApplicationsOpen
        ? `Yes. Vendor applications are open. Booth fees are currently listed as $${event.booth_price_min}-$${event.booth_price_max}, and any required fee will be shown before a vendor confirms participation.`
        : 'Vendor applications are not open for this event yet. You can contact PopUpCo or browse vendor opportunities for current openings.',
    },
    {
      q: 'What should food vendors know?',
      a: event.food_allowed
        ? 'Food, beverage, and food truck vendors may need city, county, or venue approvals before participating.'
        : 'Food participation is limited for this event unless a specific approved category is listed.',
    },
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.heroWrap}>
          <Image
            src={event.image_url}
            alt={event.event_name}
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <Link href="/upcoming" className={styles.backLink}>
              <ArrowLeft size={15} /> Back to Upcoming Pop-Ups
            </Link>
            <span className={`${status.cls} ${styles.statusPill}`}>{status.label}</span>
            <h1 className={styles.heroTitle}>{event.event_name}</h1>
            <div className={styles.heroMeta}>
              <span><Calendar size={15} /> {event.date} · {event.startTime}-{event.endTime}</span>
              <span><MapPin size={15} /> {event.city}</span>
            </div>
          </div>
        </div>

        <div className={`container ${styles.body}`}>
          <div className={styles.left}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About this event</h2>
              <p className={styles.sectionText}>{event.publicDescription || event.description}</p>
              <p className={styles.sectionText}>{event.attendeeInfo}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Attendee details</h2>
              <ul className={styles.checkList}>
                {[
                  `Access: ${event.accessType}`,
                  `Event type: ${event.eventType}`,
                  `Expected vendors: ${event.expectedVendors}`,
                  `Family-friendly: ${event.familyFriendly}`,
                  `Pets: ${event.petsAllowed}`,
                  `Food: ${event.foodAvailable}`,
                  `Accessibility: ${event.accessibility}`,
                ].map((item) => (
                  <li key={item} className={styles.checkItem}>
                    <CheckCircle size={16} className={styles.checkIcon} /> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Organizer</h2>
              <p className={styles.sectionText}>{event.organizerName}</p>
              <p className={styles.sectionText}>
                PopUpCo is currently developing its marketplace experience. Some event details may require direct follow-up from the PopUpCo team before they are final.
              </p>
            </section>

            {event.food_allowed === 1 && (
              <section className={styles.section}>
                <div className={`notice notice--warning ${styles.foodNotice}`}>
                  <AlertCircle size={16} />
                  <div>
                    <strong>Food may be part of this event.</strong><br />
                    Food vendors may need additional permits, insurance, and venue approval before participating.
                  </div>
                </div>
              </section>
            )}

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Common questions</h2>
              <div className={styles.faqs}>
                {faqs.map((faq) => (
                  <div key={faq.q} className={styles.faq}>
                    <p className={styles.faqQ}>{faq.q}</p>
                    <p className={styles.faqA}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={`card ${styles.sideCard}`}>
              <div className={styles.sideDetail}>
                <span className={styles.sideLabel}>Location</span>
                <span className={styles.sideVal}>{event.location_name}</span>
              </div>
              <div className={styles.sideDetail}>
                <span className={styles.sideLabel}>Date</span>
                <span className={styles.sideVal}>{event.date}</span>
              </div>
              <div className={styles.sideDetail}>
                <span className={styles.sideLabel}>Time</span>
                <span className={styles.sideVal}>{event.startTime}-{event.endTime}</span>
              </div>
              <div className={styles.sideDetail}>
                <span className={styles.sideLabel}>Access</span>
                <span className={styles.sideVal}>{event.accessType}</span>
              </div>
              <div className={styles.sideDetail}>
                <span className={styles.sideLabel}>Parking</span>
                <span className={styles.sideVal}>{event.parking}</span>
              </div>
              <div className={styles.sideDetail}>
                <span className={styles.sideLabel}>Categories</span>
                <span className={styles.sideVal}>{event.categories}</span>
              </div>
              {event.vendorApplicationsOpen && (
                <>
                  <div className={styles.sideDetail}>
                    <span className={styles.sideLabel}>Vendor spots</span>
                    <span className={styles.sideVal}>Up to {event.vendor_spots_total}</span>
                  </div>
                  <div className={styles.sideDetail}>
                    <span className={styles.sideLabel}>Vendor booth range</span>
                    <span className={styles.sideVal}>${event.booth_price_min}-${event.booth_price_max}</span>
                  </div>
                  <div className={styles.sideDetail}>
                    <span className={styles.sideLabel}>Applications</span>
                    <span className={styles.sideVal}>{event.application_deadline}</span>
                  </div>
                </>
              )}

              <Link href="/contact" className={`btn btn--secondary ${styles.applyBtn}`}>
                Save / share event
              </Link>

              {event.vendorApplicationsOpen ? (
                <Link href={vendorHref} className={`btn btn--primary ${styles.applyBtn}`}>
                  Apply to sell at this event
                </Link>
              ) : event.status === 'venue_needed' ? (
                <Link href="/apply/venue" className={`btn btn--primary ${styles.applyBtn}`}>
                  Offer a venue
                </Link>
              ) : (
                <div className={styles.comingSoonNote}>
                  Vendor applications are not open yet. <Link href="/contact" className={styles.notifyLink}>Ask about this event</Link>
                </div>
              )}
              <p className={styles.disclaimer}>Event details may change while PopUpCo finalizes venue and host logistics.</p>
            </div>

            <div className={`card ${styles.feeCard}`}>
              <h3 className={styles.feeTitle}>Vendor applications</h3>
              <p className={styles.feeText}>
                Applying to PopUpCo is free unless a specific event clearly lists an application or booth fee. Any required fee will be shown before a vendor confirms participation.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
