'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VENDOR_CATEGORIES, PLACEHOLDER_EVENTS } from '@/lib/data';
import { MapPin, ArrowRight, Users, Sparkles, HandHeart, Store } from 'lucide-react';
import styles from './page.module.css';

function useFadeInObserver(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const statusConfig = {
  accepting: { label: 'Accepting Vendors', cls: styles.statusGreen },
  coming_soon: { label: 'Coming Soon', cls: styles.statusOrange },
  venue_needed: { label: 'Venue Needed', cls: styles.statusSage },
};

export default function HomePage() {
  const pageRef = useRef(null);
  useFadeInObserver(pageRef);

  const events = PLACEHOLDER_EVENTS.slice(0, 3);

  return (
    <>
      <Header />
      <main ref={pageRef}>

        {/* ─── HERO ─── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroContent}>
              <div className={`badge badge--accent ${styles.heroBadge}`}>
                <span className={styles.dot} />
                Launching in the Bay Area · More cities coming soon
              </div>
              <h1 className={styles.heroHeadline}>
                Launch your brand<br />
                <span className={styles.heroAccent}>in person.</span>
              </h1>
              <p className={styles.heroSub}>
                Pop Up Co. helps local brands, creators, vendors, and small businesses sell at curated pop-up events across the Bay Area.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/upcoming" className="btn btn--primary btn--lg">
                  Find a Pop-Up Space
                </Link>
                <Link href="/apply/vendor" className="btn btn--secondary btn--lg">
                  Apply as a Vendor
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImageWrap}>
                <Image
                  src="/hero-market.png"
                  alt="A curated pop-up market with local vendors, clothing racks, and community shoppers"
                  fill
                  priority
                  className={styles.heroImage}
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                <div className={styles.heroImageOverlay} />
                <div className={styles.heroFloatCard}>
                  <div className={styles.floatDot} />
                  <div>
                    <p className={styles.floatTitle}>Vendor applications open</p>
                    <p className={styles.floatSub}>Bay Area Brand Market</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST STRIP ─── */}
        <div className={styles.trustStrip}>
          <div className="container">
            <div className={styles.trustGrid}>
              {[
                { icon: <Sparkles size={18} />, text: 'Curated vendor markets' },
                { icon: <MapPin size={18} />, text: 'Bay Area focused' },
                { icon: <Store size={18} />, text: 'Short-term retail opportunities' },
                { icon: <HandHeart size={18} />, text: 'Nonprofit discounts available' },
              ].map((item) => (
                <div key={item.text} className={styles.trustItem}>
                  <span className={styles.trustIcon}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── HOW IT WORKS ─── */}
        <section className={`section ${styles.howSection}`}>
          <div className="container">
            <div className={`fade-in ${styles.sectionLabel}`}>How it works</div>
            <h2 className={`fade-in ${styles.sectionH2}`}>Three steps to selling in person.</h2>
            <div className={styles.stepsGrid}>
              {[
                {
                  num: '01',
                  title: 'Apply',
                  desc: 'Tell us about your brand, products, setup needs, and preferred Bay Area locations.',
                  delay: 1,
                },
                {
                  num: '02',
                  title: 'Get matched',
                  desc: 'We review your application and match you with upcoming pop-up events or suitable spaces.',
                  delay: 2,
                },
                {
                  num: '03',
                  title: 'Sell in person',
                  desc: 'Show up, set up, connect with customers, and grow your brand offline.',
                  delay: 3,
                },
              ].map((step) => (
                <div key={step.num} className={`card fade-in fade-in--delay-${step.delay} ${styles.stepCard}`}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VENDOR TYPES ─── */}
        <section className={`section ${styles.typesSection}`}>
          <div className="container">
            <div className={`fade-in ${styles.sectionLabel}`}>Who it's for</div>
            <h2 className={`fade-in ${styles.sectionH2}`}>
              Built for local brands ready<br />to show up offline.
            </h2>
            <div className={styles.typesGrid}>
              {VENDOR_CATEGORIES.map((cat, i) => (
                <div
                  key={cat.label}
                  className={`card fade-in fade-in--delay-${(i % 4) + 1} ${styles.typeCard}`}
                >
                  <span className={styles.typeIcon}>{cat.icon}</span>
                  <h4 className={styles.typeLabel}>{cat.label}</h4>
                  <p className={styles.typeDesc}>{cat.description}</p>
                  {cat.note && <p className={styles.typeNote}>*{cat.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── UPCOMING EVENTS ─── */}
        <section className={`section ${styles.eventsSection}`}>
          <div className="container">
            <div className={styles.eventsSectionHead}>
              <div>
                <div className={`fade-in ${styles.sectionLabel}`}>On the calendar</div>
                <h2 className={`fade-in ${styles.sectionH2}`}>Upcoming pop-up markets.</h2>
              </div>
              <Link href="/upcoming" className={`btn btn--secondary fade-in ${styles.viewAllBtn}`}>
                View all events <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.eventsGrid}>
              {events.map((event, i) => {
                const status = statusConfig[event.status] || statusConfig.coming_soon;
                const ctaHref = event.status === 'accepting'
                  ? `/apply/vendor?event=${event.slug}`
                  : event.status === 'venue_needed'
                  ? '/apply/venue'
                  : `/upcoming/${event.slug}`;

                return (
                  <div key={event.id} className={`card fade-in fade-in--delay-${i + 1} ${styles.eventCard}`}>
                    <div className={styles.eventImageWrap}>
                      <Image
                        src={event.image_url}
                        alt={`${event.event_name} event`}
                        fill
                        className={styles.eventImage}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className={styles.eventBody}>
                      <div className={styles.eventMeta}>
                        <span className={`badge ${status.cls}`}>{status.label}</span>
                        <span className={styles.eventDate}>{event.date}</span>
                      </div>
                      <h3 className={styles.eventName}>{event.event_name}</h3>
                      <div className={styles.eventLocation}>
                        <MapPin size={14} />
                        {event.city}
                      </div>
                      {event.vendor_spots_total > 0 && (
                        <p className={styles.eventSpots}>
                          Up to {event.vendor_spots_total} vendor spots
                        </p>
                      )}
                      {event.booth_price_min && (
                        <p className={styles.eventPrice}>
                          ${event.booth_price_min}–${event.booth_price_max} booth range
                        </p>
                      )}
                      <div className={styles.eventCategories}>
                        {event.categories.split(',').slice(0, 3).map((c) => (
                          <span key={c} className={`badge badge--neutral ${styles.catBadge}`}>{c.trim()}</span>
                        ))}
                      </div>
                      <Link href={ctaHref} className={`btn btn--primary btn--sm ${styles.eventCta}`}>
                        {event.cta_text}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── FOR VENDORS ─── */}
        <section className={`section ${styles.vendorSection}`}>
          <div className="container">
            <div className={styles.splitSection}>
              <div className={styles.splitContent}>
                <div className={`fade-in ${styles.sectionLabel}`}>For vendors</div>
                <h2 className={`fade-in ${styles.splitH2}`}>
                  Get in front of real customers without signing a lease.
                </h2>
                <p className={`fade-in ${styles.splitDesc}`}>
                  Whether you're testing a new product, launching a collection, growing your local audience, or selling in person for the first time — Pop Up Co. gives you a simpler way to access curated retail opportunities.
                </p>
                <ul className={`fade-in ${styles.splitList}`}>
                  {[
                    'Apply to upcoming Bay Area pop-ups',
                    'Get matched with events that fit your brand',
                    'Bring your own setup or rent tables, tents, and chairs when available',
                    'Food trucks and food vendors welcome, with additional approval',
                    'Nonprofit and community discounts available',
                  ].map((item) => (
                    <li key={item} className={styles.splitListItem}>
                      <span className={styles.listCheck}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/apply/vendor" className={`btn btn--primary fade-in`}>
                  Apply as a Vendor
                </Link>
              </div>
              <div className={`fade-in ${styles.splitVisual}`}>
                <div className={styles.vendorVisualCard}>
                  <div className={styles.vendorStat}>
                    <span className={styles.vendorStatNum}>$75</span>
                    <span className={styles.vendorStatLabel}>Starting booth price</span>
                  </div>
                  <div className={styles.vendorDivider} />
                  <div className={styles.vendorStat}>
                    <span className={styles.vendorStatNum}>$25</span>
                    <span className={styles.vendorStatLabel}>Application fee, credited if accepted</span>
                  </div>
                  <div className={styles.vendorDivider} />
                  <div className={styles.vendorStat}>
                    <span className={styles.vendorStatNum}>Bay Area</span>
                    <span className={styles.vendorStatLabel}>Launching now · More cities coming</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOR VENUES ─── */}
        <section className={`section ${styles.venueSection}`}>
          <div className="container">
            <div className={`card ${styles.venueCard}`}>
              <div className={styles.venueCardContent}>
                <div className={`fade-in ${styles.sectionLabel}`}>For venues</div>
                <h2 className={`fade-in ${styles.splitH2}`}>
                  Have space? Host a curated pop-up.
                </h2>
                <p className={`fade-in ${styles.splitDesc}`}>
                  Pop Up Co. partners with venues, storefronts, galleries, cafes, community spaces, parking lots, and studios to host curated local pop-up events.
                </p>
                <ul className={`fade-in ${styles.splitList}`}>
                  {[
                    'Turn underused space into revenue',
                    'Bring foot traffic to your location',
                    'Support local small businesses',
                    'Choose event types that fit your space',
                  ].map((item) => (
                    <li key={item} className={styles.splitListItem}>
                      <span className={styles.listCheck}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/apply/venue" className={`btn btn--secondary fade-in`}>
                  List Your Space <ArrowRight size={16} />
                </Link>
              </div>
              <div className={styles.venueTypes}>
                {['Storefronts', 'Galleries', 'Cafes', 'Parking lots', 'Studios', 'Community spaces', 'Warehouses', 'Event spaces'].map((t) => (
                  <span key={t} className={`badge badge--neutral ${styles.venueTypeBadge}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMMUNITY ─── */}
        <section className={`section ${styles.communitySection}`}>
          <div className="container">
            <div className={styles.communityInner}>
              <HandHeart size={40} className={`fade-in ${styles.communityIcon}`} />
              <h2 className={`fade-in ${styles.communityH2}`}>
                Local commerce should help the community around it.
              </h2>
              <p className={`fade-in ${styles.communityDesc}`}>
                Pop Up Co. is built to support small businesses, local creators, and community organizations. Nonprofits and community groups may qualify for discounted vendor spots, and select events may include a local cause or community partner.
              </p>
              <Link href="/contact" className={`btn btn--secondary fade-in`}>
                Contact Us About Community Partnerships
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PRICING PREVIEW ─── */}
        <section className={`section ${styles.pricingSection}`}>
          <div className="container">
            <div className={`fade-in ${styles.sectionLabel}`}>Pricing</div>
            <h2 className={`fade-in ${styles.sectionH2}`}>Simple pricing that depends on the event.</h2>
            <div className={styles.pricingGrid}>
              {[
                {
                  title: 'Vendor Spot',
                  price: 'Typically $75–$250',
                  desc: 'For vendors selling at curated pop-up markets.',
                  features: ['Booth or selling area', 'Event listing', 'Basic promotion', 'Vendor setup guide', 'Application review'],
                  cta: { label: 'Apply as a Vendor', href: '/apply/vendor' },
                  highlighted: false,
                },
                {
                  title: 'Featured Vendor',
                  price: 'Custom',
                  desc: 'For vendors who want extra visibility at an event.',
                  features: ['Priority placement when available', 'Featured social post or story', 'Featured placement on event page', 'Priority consideration for future events'],
                  cta: { label: 'Contact Us', href: '/contact' },
                  highlighted: true,
                },
                {
                  title: 'Brand Pop-Up Package',
                  price: 'Custom',
                  desc: 'For brands that want a dedicated pop-up experience.',
                  features: ['Space sourcing', 'Event planning support', 'Promotion support', 'Setup guidance', 'On-site coordination when available'],
                  cta: { label: 'Get in Touch', href: '/contact' },
                  highlighted: false,
                },
              ].map((tier, i) => (
                <div
                  key={tier.title}
                  className={`card fade-in fade-in--delay-${i + 1} ${styles.pricingCard} ${tier.highlighted ? styles.pricingCardHighlighted : ''}`}
                >
                  <div className={styles.pricingCardTop}>
                    <h3 className={styles.pricingTitle}>{tier.title}</h3>
                    <div className={styles.pricingPrice}>{tier.price}</div>
                    <p className={styles.pricingDesc}>{tier.desc}</p>
                  </div>
                  <ul className={styles.pricingFeatures}>
                    {tier.features.map((f) => (
                      <li key={f} className={styles.pricingFeature}>
                        <span className={styles.featureCheck}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.cta.href} className={`btn ${tier.highlighted ? 'btn--primary' : 'btn--secondary'} ${styles.pricingCta}`}>
                    {tier.cta.label}
                  </Link>
                </div>
              ))}
            </div>
            <p className={`fade-in ${styles.pricingNote}`}>
              Vendor spots typically range from $75 to $250 depending on event size, location, and placement. A $25 application fee is credited toward your booth fee if accepted.
            </p>
            <div className={`fade-in ${styles.pricingViewAll}`}>
              <Link href="/pricing" className="btn btn--ghost">
                View full pricing details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className={`section--dark ${styles.finalCta}`}>
          <div className="container">
            <div className={styles.finalCtaInner}>
              <h2 className={`fade-in ${styles.finalCtaH2}`}>
                Ready to take your brand offline?
              </h2>
              <p className={`fade-in ${styles.finalCtaSub}`}>
                Apply to sell at an upcoming Bay Area pop-up or join the waitlist for future events.
              </p>
              <div className={`fade-in ${styles.finalCtaBtns}`}>
                <Link href="/apply/vendor" className="btn btn--primary btn--lg">
                  Apply as a Vendor
                </Link>
                <Link href="/upcoming" className={`btn btn--secondary btn--lg ${styles.finalCtaSecondary}`}>
                  View Upcoming Pop-Ups
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
