import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Pop-Up Vendor Pricing',
  description: 'Transparent pricing for vendors, venues, and brand pop-up packages. Spots typically range from $75–$250.',
};

const TIERS = [
  {
    title: 'Vendor Spot',
    price: '$75–$250',
    priceNote: 'Depending on event size, location, and placement',
    desc: 'For vendors joining a curated multi-vendor pop-up market.',
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
    title: 'Featured Vendor',
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
    title: 'Brand Pop-Up Package',
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
    title: 'Table / Tent / Chair Rentals',
    price: 'Optional add-on',
    desc: 'Vendors may bring their own setup or request tables, tents, and chairs for an additional fee when available. Availability depends on event location and inventory.',
  },
  {
    title: 'Nonprofit / Community Rate',
    price: 'Discounted',
    desc: 'Nonprofits and community organizations may qualify for discounted vendor spots depending on the event. Eligibility is reviewed during the application process.',
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
            <h1 className={styles.headline}>Flexible pricing for different pop-up formats.</h1>
            <p className={styles.sub}>
              Every event is different, so pricing depends on location, event size, setup needs, and placement.
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
                <strong>Application fee:</strong> A $25 application fee is collected at time of submission. If accepted, this amount is credited toward your booth fee. Application fee policy may vary by event and will be clearly stated before payment.
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
