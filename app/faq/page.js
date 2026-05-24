'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';
import styles from './page.module.css';

const FAQS = [
  {
    q: 'What is Pop Up Co.?',
    a: 'Pop Up Co. helps vendors, small businesses, creators, and local brands access curated pop-up selling opportunities, starting in the Bay Area.',
  },
  {
    q: 'Is this a farmers market?',
    a: 'Not exactly. Some events may feel market-style, but Pop Up Co. focuses on curated local brand pop-ups, retail events, creator markets, food trucks, and community-based selling opportunities. The goal is for each event to feel intentional and well-curated.',
  },
  {
    q: 'Who can apply?',
    a: 'Small brands, vendors, creators, artists, vintage sellers, nonprofits, food trucks, and local businesses can apply. Applications are reviewed based on event fit, category mix, and setup needs.',
  },
  {
    q: 'How much does it cost?',
    a: 'Vendor spots typically range from $75 to $250 depending on event size, location, and placement. Featured placements, rentals, and dedicated pop-ups may cost more.',
  },
  {
    q: 'Is there an application fee?',
    a: 'A $25 application fee is credited toward your booth fee if accepted. Event-specific application terms will be shown before payment.',
  },
  {
    q: "Do I need a seller's permit?",
    a: "Requirements vary by city, venue, event, and product type. Vendors are responsible for having any required permits, licenses, insurance, or approvals for what they sell. Pop Up Co. does not provide legal or permitting advice.",
  },
  {
    q: 'Can food vendors or food trucks apply?',
    a: 'Yes. Food, beverage, and food truck vendors may require additional permits and approval. Permit requirements will be communicated during the review process.',
  },
  {
    q: 'Do you provide tables, tents, and chairs?',
    a: 'Vendors are expected to bring their own setup. Tables, tents, and chairs may be available for an additional fee depending on the event.',
  },
  {
    q: 'Do nonprofits get a discount?',
    a: 'Nonprofit and community organizations may qualify for discounted vendor spots. Eligibility is reviewed during the application process.',
  },
  {
    q: 'Can I list my venue?',
    a: 'Yes. Venue owners and space operators can submit their space through the venue partner form. Submission does not guarantee that Pop Up Co. will host an event at your location.',
  },
  {
    q: 'Where are you launching?',
    a: 'Pop Up Co. is launching in the Bay Area. More cities coming soon.',
  },
  {
    q: 'Do you guarantee I will be accepted?',
    a: 'No. Applications are reviewed based on event fit, category mix, space, setup needs, and availability. Submitting an application does not guarantee acceptance.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button
        className={styles.faqQuestion}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
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
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
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
            <h1 className={styles.headline}>Frequently asked questions</h1>
            <p className={styles.sub}>
              Answers to common questions about Pop Up Co., vendor applications, pricing, and how it works.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <div className={`fade-in ${styles.faqList}`}>
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>

            <div className={`fade-in notice notice--warning ${styles.legalNotice}`}>
              Pop Up Co. does not provide legal, tax, insurance, or permitting advice. Vendors and venues are responsible for confirming and maintaining any permits, licenses, insurance, approvals, or documents required for their products, services, city, venue, and event type.
            </div>

            <div className={`fade-in ${styles.ctaBlock}`}>
              <h2 className={styles.ctaH2}>Still have questions?</h2>
              <div className={styles.ctaBtns}>
                <Link href="/contact" className="btn btn--primary">Contact Us</Link>
                <Link href="/apply/vendor" className="btn btn--secondary">Apply as a Vendor</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
