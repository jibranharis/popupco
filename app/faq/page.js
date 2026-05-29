'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';
import styles from './page.module.css';

const FAQS = [
  ['What is PopUpCo?', 'PopUpCo is a local-first marketplace for vendors, hosts, venues, and attendees. Vendors find places to sell, hosts create events, venues submit spaces, and attendees discover local pop-ups.'],
  ['How do vendors apply?', 'Vendors can browse vendor opportunities on Discover or Vendor Opportunities, open a listing, and submit the vendor application. If an event is selected, it is included with the application.'],
  ['What happens after a vendor applies?', 'PopUpCo reviews event fit, category mix, setup needs, permits, and availability. Submitting an application does not guarantee acceptance.'],
  ['Are booth fees required?', 'Applying to PopUpCo is free unless a specific event clearly lists an application or booth fee. Booth fees vary by event and will be shown before a vendor confirms participation.'],
  ['Do vendors need permits?', 'Requirements vary by city, venue, event, and product type. Vendors are responsible for required permits, licenses, insurance, approvals, and tax obligations. PopUpCo does not provide legal or permitting advice.'],
  ['Can food vendors apply?', 'Yes. Food, beverage, and food truck vendors may need health permits, food handler certification, insurance, or venue approval before participating.'],
  ['How do venues submit a space?', 'Venue owners can use the venue application to submit a storefront, hall, cafe, studio, parking lot, gallery, school, community center, or other space.'],
  ['Does listing a venue guarantee bookings?', 'No. Submitting a venue helps PopUpCo understand the space, but it does not guarantee an event, booking, vendor match, or revenue.'],
  ['Can venues approve event types?', 'Yes. Venue submissions ask about event fit, amenities, restrictions, food rules, music, capacity, availability, and pricing preferences.'],
  ['How do hosts create an event?', 'Hosts can use the host request flow to describe the event concept, date, venue status, vendors needed, booth fees, and support needed.'],
  ['Can PopUpCo help hosts find vendors?', 'Yes. Hosts can request help recruiting vendors, managing applications, promoting an event, and coordinating vendor interest.'],
  ['Can PopUpCo help hosts find a venue?', 'Yes. The host flow supports organizers who already have a venue, need help finding one, or are still deciding.'],
  ['How do attendees find events?', 'Attendees can use Upcoming Pop-Ups to view public event pages with date, time, location status, access type, organizer, and attendee details.'],
  ['Are events free?', 'Some events are free, some may be ticketed or RSVP-based, and some are still in planning. Each public event page should show the access type.'],
  ['Where is PopUpCo launching?', 'PopUpCo is starting in the Bay Area, with more markets and regions planned as the marketplace grows.'],
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqQuestion} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <ChevronDown size={18} className={`${styles.faqChevron} ${open ? styles.faqChevronOpen : ''}`} />
      </button>
      <div className={styles.faqAnswer}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );
    pageRef.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main ref={pageRef}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.headline}>Questions vendors, hosts, venues, and attendees ask.</h1>
            <p className={styles.sub}>
              Answers to common questions about PopUpCo applications, public events, venue submissions, host requests, pricing, and marketplace responsibilities.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <div className={`fade-in ${styles.faqList}`}>
              {FAQS.map(([q, a]) => (
                <FAQItem key={q} q={q} a={a} />
              ))}
            </div>

            <div className={`fade-in notice notice--warning ${styles.legalNotice}`}>
              PopUpCo does not provide legal, tax, insurance, or permitting advice. Vendors, hosts, and venues are responsible for confirming and maintaining required permits, licenses, insurance, approvals, or documents.
            </div>

            <div className={`fade-in ${styles.ctaBlock}`}>
              <h2 className={styles.ctaH2}>Still have questions?</h2>
              <div className={styles.ctaBtns}>
                <Link href="/contact" className="btn btn--primary">Contact PopUpCo</Link>
                <Link href="/help" className="btn btn--secondary">Visit Help</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
