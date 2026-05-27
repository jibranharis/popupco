import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'About Pop Up Co.',
  description: 'Pop Up Co. was built to make in-person selling more accessible for small brands, creators, and community organizations across the Bay Area.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className="badge badge--accent" style={{marginBottom: '16px'}}>Our story</div>
            <h1 className={styles.headline}>
              Built to make local selling easier.
            </h1>
            <p className={styles.sub}>
              We started Pop Up Co. because we noticed how hard it is for small brands to just... sell their stuff in person. We wanted to fix that.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <div className={styles.content}>
              
              {/* Event Photo */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <img src="/images/hero_market_warm_1779840281321.png" alt="Pop Up Market" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>So, why pop-ups?</h2>
                <p className={styles.blockText}>
                  Look, getting a permanent retail space is a massive headache. Leases are expensive, commitments are long, and honestly, not every product needs a 24/7 storefront. Pop-ups give you the freedom to test the waters, meet your customers face-to-face, and build a local following without betting the house on rent.
                </p>
                <p className={styles.blockText}>
                  We thought, "Why isn't there an easier way to do this?" So we built one.
                </p>
              </div>

              {/* Vendor Booth Photo */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <img src="/images/cat_vintage_1779835805698.png" alt="Vendor Booth" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Why start in the Bay Area?</h2>
                <p className={styles.blockText}>
                  The Bay Area is bursting with creativity—from independent streetwear labels to incredible bakers. The people here love supporting local, and there are so many unique spaces waiting to be activated. It was the absolute perfect place to kick things off. 
                </p>
                <p className={styles.blockText}>
                  We're rolling out here first, but trust us, we've got plans to expand.
                </p>
              </div>

              {/* Event Photo */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <img src="/images/cat_jewelry_1779836003934.png" alt="Event" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>How we do things</h2>
                <p className={styles.blockText}>
                  We hand-pick the mix for each event to make sure it feels right for the neighborhood and the folks showing up. We don't just cram as many tables into a room as possible. We curate. It means we can't accept everyone right away, but it also means every pop-up actually feels special.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Keeping it community-first</h2>
                <p className={styles.blockText}>
                  We genuinely care about the communities we're operating in. That's why nonprofits and local orgs can score discounted spots. We want to make sure the money being made is also doing some good locally.
                </p>
              </div>

              {/* Founder Photos */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <img src="/images/media__1779838728727.jpg" alt="Founder" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                <img src="/images/media__1779838851661.jpg" alt="Founder" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
              </div>

              <div className={`card ${styles.founderCard}`}>
                <p className={styles.founderText}>
                  Founded by a couple of Bay Area locals who are obsessed with making real-world retail feel fresh and accessible again.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className={`section ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaH2}>Want to jump in?</h2>
              <div className={styles.ctaBtns}>
                <Link href="/apply/vendor" className="btn btn--primary">Apply as a Vendor</Link>
                <Link href="/apply/venue" className="btn btn--secondary">List Your Space</Link>
                <Link href="/contact" className="btn btn--ghost">Say Hello</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
