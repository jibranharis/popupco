import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GatedLink from '@/components/GatedLink';
import { getPublicEventBySlug } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import { MapPin, Calendar, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

function mapDbEvent(row) {
  return {
    slug: row.slug,
    event_name: row.event_name,
    status: row.status,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time,
    city: row.city,
    location_name: row.location_name,
    image_url: row.image_url,
    description: row.description,
    publicDescription: row.public_description,
    attendeeInfo: row.attendee_info,
    accessType: row.access_type,
    eventType: row.event_type,
    expectedVendors: row.expected_vendors,
    familyFriendly: row.family_friendly,
    petsAllowed: row.pets_allowed,
    foodAvailable: row.food_available,
    accessibility: row.accessibility,
    organizerName: row.organizer_name,
    parking: row.parking,
    categories: row.categories,
    food_allowed: row.food_allowed,
    vendorApplicationsOpen: row.vendor_applications_open,
    vendor_spots_total: row.vendor_spots_total,
    booth_price_min: row.booth_price_min,
    booth_price_max: row.booth_price_max,
    application_deadline: row.application_deadline,
  };
}

async function getEvent(slug) {
  const { data } = await supabase.from('events').select('*').eq('slug', slug).single();
  if (data) return mapDbEvent(data);
  return getPublicEventBySlug(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEvent(slug);
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
  const event = await getEvent(slug);
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
          {event.image_url && (
            <>
              <Image
                src={event.image_url}
                alt={event.event_name}
                fill
                priority
                className={styles.heroImage}
                sizes="100vw"
              />
              <div className={styles.heroOverlay} />
            </>
          )}
          <div className={`container ${styles.heroContent}`}>
            <Link href="/upcoming" className={styles.backLink}>
              <ArrowLeft size={15} /> Back to Upcoming Pop-Ups
            </Link>
            <span className={`${status.cls} ${styles.statusPill}`}>{status.label}</span>
            <h1 className={styles.heroTitle}>{event.event_name}</h1>
            <div className={styles.heroMeta}>
              {event.date && <span><Calendar size={15} /> {event.date}{event.startTime ? ` · ${event.startTime}-${event.endTime}` : ''}</span>}
              {event.city && <span><MapPin size={15} /> {event.city}</span>}
            </div>
          </div>
        </div>

        <div className={`container ${styles.body}`}>
          <div className={styles.left}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About this event</h2>
              <p className={styles.sectionText}>{event.publicDescription || event.description}</p>
              {event.attendeeInfo && <p className={styles.sectionText}>{event.attendeeInfo}</p>}
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Attendee details</h2>
              <ul className={styles.checkList}>
                {[
                  event.accessType && `Access: ${event.accessType}`,
                  event.eventType && `Event type: ${event.eventType}`,
                  event.expectedVendors && `Expected vendors: ${event.expectedVendors}`,
                  event.familyFriendly && `Family-friendly: ${event.familyFriendly}`,
                  event.petsAllowed && `Pets: ${event.petsAllowed}`,
                  event.foodAvailable && `Food: ${event.foodAvailable}`,
                  event.accessibility && `Accessibility: ${event.accessibility}`,
                ].filter(Boolean).map((item) => (
                  <li key={item} className={styles.checkItem}>
                    <CheckCircle size={16} className={styles.checkIcon} /> {item}
                  </li>
                ))}
              </ul>
            </section>

            {event.organizerName && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Organizer</h2>
                <p className={styles.sectionText}>{event.organizerName}</p>
                <p className={styles.sectionText}>
                  PopUpCo is currently developing its marketplace experience. Some event details may require direct follow-up from the PopUpCo team before they are final.
                </p>
              </section>
            )}

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
              {event.location_name && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Location</span>
                  <span className={styles.sideVal}>{event.location_name}</span>
                </div>
              )}
              {event.date && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Date</span>
                  <span className={styles.sideVal}>{event.date}</span>
                </div>
              )}
              {event.startTime && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Time</span>
                  <span className={styles.sideVal}>{event.startTime}-{event.endTime}</span>
                </div>
              )}
              {event.accessType && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Access</span>
                  <span className={styles.sideVal}>{event.accessType}</span>
                </div>
              )}
              {event.parking && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Parking</span>
                  <span className={styles.sideVal}>{event.parking}</span>
                </div>
              )}
              {event.categories && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Categories</span>
                  <span className={styles.sideVal}>{event.categories}</span>
                </div>
              )}
              {event.vendorApplicationsOpen && (
                <>
                  {event.vendor_spots_total && (
                    <div className={styles.sideDetail}>
                      <span className={styles.sideLabel}>Vendor spots</span>
                      <span className={styles.sideVal}>Up to {event.vendor_spots_total}</span>
                    </div>
                  )}
                  {(event.booth_price_min || event.booth_price_max) && (
                    <div className={styles.sideDetail}>
                      <span className={styles.sideLabel}>Vendor booth range</span>
                      <span className={styles.sideVal}>${event.booth_price_min}-${event.booth_price_max}</span>
                    </div>
                  )}
                  {event.application_deadline && (
                    <div className={styles.sideDetail}>
                      <span className={styles.sideLabel}>Applications</span>
                      <span className={styles.sideVal}>{event.application_deadline}</span>
                    </div>
                  )}
                </>
              )}

              <GatedLink href={`/events/${event.slug}`} intent="save" className={`btn btn--secondary ${styles.applyBtn}`}>
                Save / share event
              </GatedLink>

              {event.vendorApplicationsOpen ? (
                <GatedLink href={vendorHref} intent="apply" className={`btn btn--primary ${styles.applyBtn}`}>
                  Apply to sell at this event
                </GatedLink>
              ) : event.status === 'venue_needed' ? (
                <GatedLink href="/apply/venue" intent="venue" className={`btn btn--primary ${styles.applyBtn}`}>
                  Offer a venue
                </GatedLink>
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
