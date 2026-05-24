'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const VENUE_TYPES = [
  { icon: '🏪', label: 'Empty storefronts' },
  { icon: '🛍️', label: 'Retail shops' },
  { icon: '☕', label: 'Cafes' },
  { icon: '🖼️', label: 'Galleries' },
  { icon: '🎨', label: 'Studios' },
  { icon: '🏛️', label: 'Community centers' },
  { icon: '🅿️', label: 'Parking lots' },
  { icon: '📦', label: 'Warehouses' },
  { icon: '🎪', label: 'Event spaces' },
  { icon: '🏫', label: 'Schools & community orgs' },
  { icon: '🤲', label: 'Nonprofit spaces' },
];

const BENEFITS = [
  'Generate rental income from underused space',
  'Bring real foot traffic to your location',
  'Support local small businesses and creators',
  'Activate underused or vacant square footage',
  'Choose what types of events fit your space',
  'We review vendor fit and event needs before moving forward',
];

const HOW_IT_WORKS = [
  { num: '01', title: 'Submit your space', desc: 'Tell us about your venue, capacity, availability, and what types of events you\'d consider.' },
  { num: '02', title: 'We review fit', desc: 'We assess capacity, location, logistics, city requirements, and overall event suitability.' },
  { num: '03', title: 'Get matched', desc: 'We connect your space with the right event concept or vendor group when the fit is right.' },
  { num: '04', title: 'Coordinate next steps', desc: 'We work with you directly on details, contracts, setup needs, and event planning.' },
];

export default function VenuesPage() {
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

  return (
    <>
      <Header />
      <main ref={pageRef}>
        <section className={styles.hero}>
          <div className="container">
            <div className={`badge badge--sage ${styles.badge}`}>For venues</div>
            <h1 className={styles.headline}>
              Turn your space into<br />a curated local pop-up.
            </h1>
            <p className={styles.sub}>
              Pop Up Co. partners with Bay Area venues, storefronts, galleries, studios, cafes, parking lots, and community spaces to host local pop-up events.
            </p>
            <Link href="/apply/venue" className="btn btn--primary btn--lg">
              List Your Space
            </Link>
          </div>
        </section>

        {/* Venue types */}
        <section className="section">
          <div className="container">
            <p className="fade-in section-label">Space types</p>
            <h2 className={`fade-in ${styles.sectionH2}`}>All kinds of spaces work.</h2>
            <div className={styles.typesGrid}>
              {VENUE_TYPES.map((type, i) => (
                <div key={type.label} className={`card fade-in fade-in--delay-${(i % 4) + 1} ${styles.typeCard}`}>
                  <span className={styles.typeIcon}>{type.icon}</span>
                  <span className={styles.typeLabel}>{type.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className={`section ${styles.benefitsSection}`}>
          <div className="container">
            <div className={styles.benefitsInner}>
              <div className={styles.benefitsContent}>
                <p className="fade-in section-label">Why partner</p>
                <h2 className={`fade-in ${styles.sectionH2}`}>Your space, better utilized.</h2>
                <ul className={styles.benefitsList}>
                  {BENEFITS.map((benefit) => (
                    <li key={benefit} className={`fade-in ${styles.benefitItem}`}>
                      <CheckCircle size={18} className={styles.checkIcon} />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link href="/apply/venue" className={`btn btn--primary fade-in`}>
                  List Your Space <ArrowRight size={16} />
                </Link>
              </div>
              <div className={`fade-in ${styles.trustCard}`}>
                <h3 className={styles.trustTitle}>Before we move forward</h3>
                <p className={styles.trustText}>
                  We review every event concept before moving forward and do not guarantee that every submitted space will be used. Final event details depend on vendor fit, safety, availability, city requirements, and venue approval.
                </p>
                <div className={styles.trustDivider} />
                <p className={styles.trustText}>
                  Pop Up Co. does not provide legal, insurance, or permitting advice. Venue owners are responsible for confirming any permits or approvals required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section">
          <div className="container">
            <p className="fade-in section-label">How it works</p>
            <h2 className={`fade-in ${styles.sectionH2}`}>From submission to pop-up.</h2>
            <div className={styles.stepsGrid}>
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.num} className={`card fade-in fade-in--delay-${i + 1} ${styles.stepCard}`}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section--dark ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaInner}>
              <h2 className={`fade-in ${styles.ctaH2}`}>Have a space that could host a pop-up?</h2>
              <p className={`fade-in ${styles.ctaSub}`}>
                Submit your space and we'll review fit, capacity, and event suitability. No commitment required.
              </p>
              <Link href="/apply/venue" className={`btn btn--primary btn--lg fade-in`}>
                Submit Your Space
              </Link>
              <p className={`fade-in ${styles.ctaDisclaimer}`}>
                Submitting a space does not guarantee Pop Up Co. will host an event there.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
