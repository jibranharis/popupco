import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Simple pricing for pop-up opportunities',
  description: 'Transparent pricing for vendors, venues, host tools, featured placement, and dedicated pop-up packages.',
};

const TIERS = [
  {
    title: 'Vendor spots',
    price: '$75-$250',
    priceNote: 'Varies by location, attendance, booth size, amenities, and event type',
    desc: 'For vendors joining curated markets, booth opportunities, and community pop-ups.',
    features: [
      'Selling space / booth area',
      'Event listing on Pop Up Co.',
      'Basic event promotion',
      'Vendor setup instructions',
      'Application review',
    ],
    cta: { label: 'Apply as a Vendor', href: '/apply/vendor' },
    highlighted: false,
  },
  {
    title: 'Featured vendor placement',
    price: 'Custom',
    priceNote: 'Inquire for pricing',
    desc: 'For vendors who want more visibility at an event.',
    features: [
      'Premium placement when available',
      'Featured vendor social post or story',
      'Highlighted on event page',
      'Priority consideration for future events',
    ],
    cta: { label: 'Contact Us', href: '/contact' },
    highlighted: true,
  },
  {
    title: 'Dedicated brand pop-up',
    price: 'Custom',
    priceNote: 'Dedicated pop-up experience',
    desc: 'For brands that want a dedicated retail pop-up rather than a shared vendor market.',
    features: [
      'Space sourcing',
      'Launch planning support',
      'Event page and promotion',
      'Setup guidance',
      'Optional event-day coordination',
    ],
    cta: { label: 'Get in Touch', href: '/contact' },
    highlighted: false,
  },
];

const ADDONS = [
  {
    title: 'Venue listing',
    price: 'Launch pricing',
    desc: 'Venues can list space details, availability, amenities, rules, and pricing so hosts and vendors can evaluate fit.',
  },
  {
    title: 'Host tools',
    price: 'Included during MVP',
    desc: 'Event pages, vendor applications, saved venues, messaging, and event checklists are being shaped with early hosts.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className="badge badge--accent" style={{marginBottom: '16px'}}>Pricing</div>
            <h1 className={styles.headline}>Simple pricing for pop-up opportunities.</h1>
            <p className={styles.sub}>
              Pricing varies by location, expected attendance, booth size, amenities, and event type. Every opportunity should show the cost before you apply or request.
            </p>
          </div>
        </section>

        {/* Main tiers */}
        <section className="section">
          <div className="container">
            <div className={styles.tiersGrid}>
              {TIERS.map((tier) => (
                <div key={tier.title} className={`card ${styles.tierCard} ${tier.highlighted ? styles.tierHighlighted : ''}`}>
                  {tier.highlighted && (
                    <div className={styles.popularBadge}>Most asked about</div>
                  )}
                  <div className={styles.tierTop}>
                    <h2 className={styles.tierTitle}>{tier.title}</h2>
                    <div className={styles.tierPrice}>{tier.price}</div>
                    <p className={styles.tierPriceNote}>{tier.priceNote}</p>
                    <p className={styles.tierDesc}>{tier.desc}</p>
                  </div>
                  <ul className={styles.tierFeatures}>
                    {tier.features.map((f) => (
                      <li key={f} className={styles.tierFeature}>
                        <span className={styles.featureCheck}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.cta.href} className={`btn ${tier.highlighted ? 'btn--primary' : 'btn--secondary'} ${styles.tierCta}`}>
                    {tier.cta.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <div className={styles.addons}>
              <h2 className={styles.addonsTitle}>Additional options</h2>
              <div className={styles.addonsGrid}>
                {ADDONS.map((addon) => (
                  <div key={addon.title} className={`card ${styles.addonCard}`}>
                    <div className={styles.addonTop}>
                      <h3 className={styles.addonTitle}>{addon.title}</h3>
                      <span className={`badge badge--sage`}>{addon.price}</span>
                    </div>
                    <p className={styles.addonDesc}>{addon.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important notes */}
            <div className={styles.notes}>
              <div className={`notice notice--info ${styles.note}`}>
                <strong>Application fees are not the default:</strong> A $25 application fee may apply for select events. If accepted, it is credited toward the booth fee, and events with a fee will clearly show that before submission.
              </div>
              <div className={`notice notice--warning ${styles.note}`}>
                <strong>Food & beverage vendors:</strong> Food, beverage, and food truck vendors may require additional permits and approval. Additional requirements will be communicated during the review process.
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section--dark ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaH2}>Questions about pricing?</h2>
              <p className={styles.ctaSub}>Every event is a little different. Reach out and we'll walk you through what to expect.</p>
              <div className={styles.ctaBtns}>
                <Link href="/apply/vendor" className="btn btn--primary btn--lg">Apply as a Vendor</Link>
                <Link href="/contact" className={`btn btn--secondary btn--lg ${styles.ctaSecondary}`}>Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
