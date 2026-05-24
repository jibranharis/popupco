import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PLACEHOLDER_EVENTS } from '@/lib/data';
import { MapPin, Calendar, Users, DollarSign, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return PLACEHOLDER_EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const event = PLACEHOLDER_EVENTS.find((e) => e.slug === params.slug);
  if (!event) return {};
  return {
    title: event.event_name,
    description: event.description,
  };
}

const statusConfig = {
  accepting: { label: 'Accepting Vendors', cls: styles.statusGreen },
  coming_soon: { label: 'Coming Soon', cls: styles.statusOrange },
  venue_needed: { label: 'Venue Needed', cls: styles.statusSage },
};

export default function EventDetailPage({ params }) {
  const event = PLACEHOLDER_EVENTS.find((e) => e.slug === params.slug);
  if (!event) notFound();

  const status = statusConfig[event.status] || statusConfig.coming_soon;
  const ctaHref = event.status === 'accepting'
    ? `/apply/vendor?event=${event.slug}`
    : event.status === 'venue_needed'
    ? '/apply/venue'
    : null;

  const faqs = [
    { q: 'What does the booth fee include?', a: 'Your selling area, event listing, basic promotion, and vendor setup guide.' },
    { q: 'Do I need to bring my own setup?', a: 'Vendors are expected to bring their own display. Tables, tents, and chairs may be available for an additional fee depending on availability.' },
    { q: 'What if I sell food or beverages?', a: 'Food, beverage, and food truck vendors may require additional permits and approval. These will be verified before acceptance.' },
    { q: 'Do nonprofits get a discount?', a: event.nonprofit_discount ? 'Yes — nonprofits and community organizations may qualify for a discounted vendor spot at this event.' : 'Nonprofit discounts are not available for this event.' },
    { q: 'When will I hear back after applying?', a: 'We review applications on a rolling basis and will follow up via email. Submitting an application does not guarantee acceptance.' },
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero */}
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
              <span><Calendar size={15} /> {event.date}</span>
              <span><MapPin size={15} /> {event.city}</span>
            </div>
          </div>
        </div>

        <div className={`container ${styles.body}`}>
          <div className={styles.left}>
            {/* About */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About this event</h2>
              <p className={styles.sectionText}>{event.description}</p>
              <p className={styles.sectionText}>
                This is a curated, application-based pop-up — not every applicant will be accepted. We review brand fit, category mix, setup needs, and event capacity.
              </p>
            </section>

            {/* What to expect */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>What's included</h2>
              <ul className={styles.checkList}>
                {['Your selling area / booth space', 'Event listing on Pop Up Co.', 'Basic event promotion', 'Vendor setup guide', 'Event-day coordination (when available)'].map((item) => (
                  <li key={item} className={styles.checkItem}>
                    <CheckCircle size={16} className={styles.checkIcon} /> {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Rental note */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Setup & rentals</h2>
              <p className={styles.sectionText}>
                Vendors are expected to bring their own display setup. Tables, tents, and chairs may be available for an additional fee depending on the event. Select this option in your application.
              </p>
            </section>

            {event.food_allowed === 1 && (
              <section className={styles.section}>
                <div className={`notice notice--warning ${styles.foodNotice}`}>
                  <AlertCircle size={16} />
                  <div>
                    <strong>Food & beverage vendors welcome.</strong><br />
                    Food, beverage, and food truck vendors may require additional permits and approval before being accepted. Details will be provided during the review process.
                  </div>
                </div>
              </section>
            )}

            {/* FAQ */}
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

          {/* Sidebar */}
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
              {event.vendor_spots_total > 0 && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Vendor spots</span>
                  <span className={styles.sideVal}>Up to {event.vendor_spots_total}</span>
                </div>
              )}
              {event.booth_price_min && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Booth fee range</span>
                  <span className={styles.sideVal}>${event.booth_price_min}–${event.booth_price_max}</span>
                </div>
              )}
              <div className={styles.sideDetail}>
                <span className={styles.sideLabel}>Application fee</span>
                <span className={styles.sideVal}>$25 (credited if accepted)</span>
              </div>
              {event.application_deadline && (
                <div className={styles.sideDetail}>
                  <span className={styles.sideLabel}>Applications</span>
                  <span className={styles.sideVal}>{event.application_deadline}</span>
                </div>
              )}
              <div className={styles.sideDetail}>
                <span className={styles.sideLabel}>Categories</span>
                <span className={styles.sideVal}>{event.categories}</span>
              </div>
              {event.nonprofit_discount === 1 && (
                <div className={`notice notice--info ${styles.nonprofitNote}`}>
                  Nonprofit and community discounts may be available for this event.
                </div>
              )}

              {ctaHref ? (
                <Link href={ctaHref} className={`btn btn--primary ${styles.applyBtn}`}>
                  {event.cta_text}
                </Link>
              ) : (
                <div className={styles.comingSoonNote}>
                  Applications opening soon. <Link href="/contact" className={styles.notifyLink}>Get notified →</Link>
                </div>
              )}
              <p className={styles.disclaimer}>Submitting an application does not guarantee acceptance.</p>
            </div>

            <div className={`card ${styles.feeCard}`}>
              <h3 className={styles.feeTitle}>Application fee</h3>
              <p className={styles.feeText}>
                A $25 application fee is collected at time of submission. If accepted, this amount is credited toward your booth fee. Application fee policy may vary by event and will be clearly stated before payment.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
