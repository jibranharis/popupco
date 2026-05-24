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
              Helping local brands take<br />the next step offline.
            </h1>
            <p className={styles.sub}>
              Pop Up Co. was created to make in-person selling more accessible for small brands, creators, vendors, and community organizations. We believe local commerce should feel easier to start, more exciting to attend, and more connected to the neighborhoods around it.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <div className={styles.content}>
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Why pop-ups?</h2>
                <p className={styles.blockText}>
                  Not every brand is ready for a lease. Not every product needs a storefront. Pop-ups give small businesses a way to test ideas, meet real customers, and build a local presence without the overhead that comes with permanent retail space.
                </p>
                <p className={styles.blockText}>
                  We think that's worth building infrastructure around.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Why the Bay Area?</h2>
                <p className={styles.blockText}>
                  The Bay Area has an incredible mix of local brands, creative communities, diverse neighborhoods, and people who genuinely support small businesses. It was the right place to start.
                </p>
                <p className={styles.blockText}>
                  We're launching here first — and building toward expanding to more cities as we grow.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Our approach</h2>
                <p className={styles.blockText}>
                  Pop Up Co. is application-based. We curate events to make sure the mix of vendors makes sense for the space, the neighborhood, and the shoppers who show up. That means not every application is accepted — but it also means every event feels intentional.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Community is part of the model</h2>
                <p className={styles.blockText}>
                  Nonprofits and community organizations may qualify for discounted vendor spots. Select events may include a local cause or community partner. We want local commerce to actually benefit the communities it happens in.
                </p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>More cities coming soon</h2>
                <p className={styles.blockText}>
                  We're starting in the Bay Area and building from here. If you're interested in Pop Up Co. coming to your city, reach out.
                </p>
              </div>

              <div className={`card ${styles.founderCard}`}>
                <p className={styles.founderText}>
                  Founded by Bay Area builders with a focus on local small business, community, and real-world retail experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className={`section ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaH2}>Ready to get involved?</h2>
              <div className={styles.ctaBtns}>
                <Link href="/apply/vendor" className="btn btn--primary">Apply as a Vendor</Link>
                <Link href="/apply/venue" className="btn btn--secondary">List Your Space</Link>
                <Link href="/contact" className="btn btn--ghost">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
