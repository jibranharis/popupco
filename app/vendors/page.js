'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VENDOR_CATEGORIES } from '@/lib/data';
import { CheckCircle, ArrowRight, Shirt, Flame, Glasses, Gem, Truck, Cake, Coffee, GraduationCap, Palette, HeartHandshake, Sparkles, Footprints, BookOpen, Flower, Scissors } from 'lucide-react';
import styles from './page.module.css';

const WHO_FOR = [
  { icon: <Shirt size={24} />, label: 'Clothing brands', desc: 'Apparel and fashion brands looking to sell offline.' },
  { icon: <Flame size={24} />, label: 'Streetwear brands', desc: 'Hype and emerging streetwear labels.' },
  { icon: <Glasses size={24} />, label: 'Vintage sellers', desc: 'Curated vintage, thrifted, and resale collections.' },
  { icon: <Gem size={24} />, label: 'Jewelry makers', desc: 'Handcrafted and curated jewelry.' },
  { icon: <Truck size={24} />, label: 'Food trucks', desc: 'Food, beverage, and truck vendors (subject to approval).' },
  { icon: <Cake size={24} />, label: 'Bakeries', desc: 'Local baked goods and sweet treats.' },
  { icon: <Coffee size={24} />, label: 'Coffee carts', desc: 'Mobile coffee and specialty beverage carts.' },
  { icon: <GraduationCap size={24} />, label: 'Student businesses', desc: 'Launch your student brand at a real market.' },
  { icon: <Palette size={24} />, label: 'Artists', desc: 'Prints, paintings, and fine art.' },
  { icon: <HeartHandshake size={24} />, label: 'Nonprofits', desc: 'Community organizations looking to connect.' },
  { icon: <Sparkles size={24} />, label: 'Beauty brands', desc: 'Skincare, cosmetics, and self-care products.' },
  { icon: <Footprints size={24} />, label: 'Sneaker sellers', desc: 'Sneakerheads and shoe resellers.' },
  { icon: <BookOpen size={24} />, label: 'Book vendors', desc: 'Independent booksellers and authors.' },
  { icon: <Flower size={24} />, label: 'Flower vendors', desc: 'Florists and plant sellers.' },
  { icon: <Scissors size={24} />, label: 'Handmade products', desc: 'Crafts, ceramics, and unique handmade goods.' },
];

const WHAT_YOU_GET = [
  'Application review and event matching',
  'Vendor guide for your first (or next) event',
  'Basic event promotion and listing',
  'Setup instructions and event-day info',
  'Optional rental support for tables, tents, and chairs',
  'Event-day coordination when available',
];

const CHECKLIST = [
  { text: 'Products ready to sell', required: true },
  { text: 'Payment method (card reader, cash box, etc.)', required: true },
  { text: 'Display and setup materials', required: true },
  { text: "Seller's permit if required by your city or product type", required: false },
  { text: 'General liability insurance if required by venue', required: false },
  { text: 'Food or beverage permits if selling food (additional approval required)', required: false },
  { text: 'Table, tent, and chairs — or a rental request', required: false },
  { text: 'Product photos for your application', required: true },
];

const STEPS = [
  { num: '01', title: 'Apply', desc: 'Submit your vendor application with info about your brand, products, setup needs, and event preferences.' },
  { num: '02', title: 'Review', desc: 'We review your application based on event fit, category mix, capacity, and setup needs. This typically takes a few business days.' },
  { num: '03', title: 'Acceptance & payment', desc: 'Accepted vendors receive details on next steps and booth fee payment. No upfront commitment required to apply.' },
  { num: '04', title: 'Setup details', desc: 'You\'ll receive event-specific setup instructions, arrival time, and any additional requirements before the event.' },
  { num: '05', title: 'Event day', desc: 'Show up, set up, sell, and connect with customers. Event-day coordination will be available when possible.' },
];

export default function VendorsPage() {
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
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={`badge badge--accent ${styles.badge}`}>For vendors</div>
            <h1 className={styles.headline}>
              Sell in person.<br />On your terms.
            </h1>
            <p className={styles.sub}>
              Pop Up Co. helps small brands, creators, vendors, nonprofits, and local businesses access curated Bay Area pop-up opportunities.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/apply/vendor" className="btn btn--primary btn--lg">
                Start Vendor Application
              </Link>
              <Link href="/upcoming" className="btn btn--secondary btn--lg">
                View Upcoming Events <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="section">
          <div className="container">
            <p className={`fade-in section-label`}>Who it's for</p>
            <h2 className={`fade-in ${styles.sectionH2}`}>Any brand, any stage.</h2>
            <div className={styles.whoGrid}>
              {WHO_FOR.map((item, i) => (
                <div key={item.label} className={`card fade-in fade-in--delay-${(i % 4) + 1} ${styles.whoCard}`}>
                  <span className={styles.whoIcon}>{item.icon}</span>
                  <h3 className={styles.whoLabel}>{item.label}</h3>
                  <p className={styles.whoDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className={`section ${styles.getSection}`}>
          <div className="container">
            <div className={styles.getInner}>
              <div className={styles.getContent}>
                <p className={`fade-in section-label`}>What you get</p>
                <h2 className={`fade-in ${styles.sectionH2}`}>Support at every step.</h2>
                <ul className={styles.getList}>
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className={`fade-in ${styles.getItem}`}>
                      <CheckCircle size={18} className={styles.checkIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`fade-in ${styles.getVisual}`}>
                <div className={styles.pricingPreview}>
                  <div className={styles.pricingRow}>
                    <span className={styles.pricingLabel}>Vendor spots</span>
                    <span className={styles.pricingVal}>Starting at $50</span>
                  </div>
                  <div className={styles.pricingDivider} />
                  <div className={styles.pricingDivider} />
                  <div className={styles.pricingRow}>
                    <span className={styles.pricingLabel}>Nonprofit discount</span>
                    <span className={styles.pricingVal}>Available</span>
                  </div>
                  <div className={styles.pricingDivider} />
                  <div className={styles.pricingRow}>
                    <span className={styles.pricingLabel}>Table / tent rentals</span>
                    <span className={styles.pricingVal}>Optional add-on</span>
                  </div>
                  <Link href="/pricing" className={`btn btn--secondary btn--sm ${styles.pricingLink}`}>
                    Full pricing details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Opportunity */}
        <section className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
          <div className="container">
            <p className={`fade-in section-label`}>Opportunities</p>
            <h2 className={`fade-in ${styles.sectionH2}`}>Spaces waiting for you.</h2>
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
              {/* Example Opportunity Card */}
              <div className="card fade-in">
                <div style={{ height: '200px', backgroundColor: 'var(--color-neutral-200)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', marginBottom: 'var(--spacing-md)', backgroundImage: 'url(https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ padding: '0 var(--spacing-sm) var(--spacing-sm)' }}>
                  <span className="badge badge--primary" style={{ marginBottom: 'var(--spacing-xs)' }}>Open for vendors</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xs)' }}>Walnut Creek Weekend Market</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>Downtown Walnut Creek • Weekends</p>
                  <p style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>A bustling weekend market targeting local artisans, vintage sellers, and clothing brands. High foot traffic.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600' }}>$50 / booth</span>
                    <Link href="/apply/vendor" className="btn btn--secondary btn--sm">Apply now</Link>
                  </div>
                </div>
              </div>
              {/* Coming Soon Cards */}
              <div className="card fade-in fade-in--delay-1" style={{ opacity: 0.7 }}>
                <div style={{ height: '200px', backgroundColor: 'var(--color-neutral-200)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Coming Soon</span>
                </div>
                <div style={{ padding: '0 var(--spacing-sm) var(--spacing-sm)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-muted)' }}>SF Ferry Building Pop-Up</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>San Francisco • Dates TBD</p>
                </div>
              </div>
              <div className="card fade-in fade-in--delay-2" style={{ opacity: 0.7 }}>
                <div style={{ height: '200px', backgroundColor: 'var(--color-neutral-200)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Coming Soon</span>
                </div>
                <div style={{ padding: '0 var(--spacing-sm) var(--spacing-sm)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-muted)' }}>Oakland First Fridays</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>Oakland • Monthly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="section">
          <div className="container">
            <div className={styles.checklistInner}>
              <p className={`fade-in section-label`}>What you may need</p>
              <h2 className={`fade-in ${styles.sectionH2}`}>Come prepared.</h2>
              <div className={styles.checklistGrid}>
                {CHECKLIST.map((item, i) => (
                  <div key={item.text} className={`fade-in fade-in--delay-${(i % 3) + 1} ${styles.checkItem}`}>
                    <span className={item.required ? styles.requiredDot : styles.optionalDot} />
                    <span className={styles.checkText}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className={`notice notice--warning fade-in ${styles.notice}`}>
                Requirements vary by event, city, venue, and product type. Food, beverage, and food truck vendors may require additional permits and approval.
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className={`section ${styles.processSection}`}>
          <div className="container">
            <p className={`fade-in section-label`}>How it works</p>
            <h2 className={`fade-in ${styles.sectionH2}`}>The vendor application process.</h2>
            <div className={styles.stepsGrid}>
              {STEPS.map((step, i) => (
                <div key={step.num} className={`card fade-in fade-in--delay-${(i % 3) + 1} ${styles.stepCard}`}>
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
              <h2 className={`fade-in ${styles.ctaH2}`}>Apply to sell at an upcoming pop-up.</h2>
              <p className={`fade-in ${styles.ctaSub}`}>
                Submitting an application is free to start. Apply with no upfront commitment.
              </p>
              <Link href="/apply/vendor" className={`btn btn--primary btn--lg fade-in`}>
                Start Vendor Application
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
