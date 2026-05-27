import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, HelpCircle, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'Simple pricing for pop-up opportunities',
  description: 'Transparent pricing for vendors, venues, hosts, featured placement, and dedicated pop-up opportunities.',
};

const plans = [
  {
    title: 'Vendor spots',
    price: '$75-$250',
    eyebrow: 'For markets and booth opportunities',
    copy: 'For vendors joining curated markets, community events, food pop-ups, and shared selling opportunities.',
    features: ['Booth or table space', 'Event details before applying', 'Application review', 'Setup instructions', 'Host messaging when accepted'],
    cta: 'Find opportunities',
    href: '/browse',
  },
  {
    title: 'Featured vendor placement',
    price: 'Custom',
    eyebrow: 'For extra visibility',
    copy: 'For vendors who want more visibility at select markets or in PopUpCo discovery experiences.',
    features: ['Priority placement when available', 'Featured listing treatment', 'Social or event-page highlight', 'Category fit review', 'Future event consideration'],
    cta: 'Contact us',
    href: '/contact',
    featured: true,
  },
  {
    title: 'Dedicated brand pop-up',
    price: 'Custom',
    eyebrow: 'For solo launches and takeovers',
    copy: 'For brands that want a focused retail moment, product launch, boutique takeover, or short-term activation.',
    features: ['Space sourcing support', 'Launch planning guidance', 'Dedicated event page', 'Setup notes', 'Optional event-day support'],
    cta: 'Plan a pop-up',
    href: '/contact',
  },
];

const variables = ['Location', 'Expected attendance', 'Booth size', 'Indoor or outdoor setup', 'Tables, chairs, or electricity', 'Food permit needs', 'Event type', 'Promotion level'];

const faqs = [
    ['Do vendors always pay to apply?', 'No. Application fees are not the default. A $25 application fee may apply for select events, and if accepted it is credited toward the booth fee.'],
    ['When does a vendor pay?', 'Vendors should see the fee before submitting a paid commitment. For accepted applications, payment timing depends on the host and event terms.'],
    ['Can nonprofits get discounted spots?', 'Yes, community organizations and nonprofits may qualify for reduced pricing depending on the event and available space.'],
    ['Are venue listings free?', 'During the early marketplace phase, venue listing and host tools are launch-priced while we learn what partners need most.'],
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <span className="label">Pricing</span>
            <h1>Simple pricing for pop-up opportunities.</h1>
            <p>
              PopUpCo should make costs easier to understand, not harder. Prices vary by location, expected attendance, booth size, amenities, and event type, but the goal is always clear fees before vendors commit.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className={styles.planGrid}>
              {plans.map((plan) => (
                <article key={plan.title} className={`${styles.planCard} ${plan.featured ? styles.featured : ''}`}>
                  {plan.featured && <div className={styles.featuredBadge}>Most flexible</div>}
                  <span>{plan.eyebrow}</span>
                  <h2>{plan.title}</h2>
                  <strong>{plan.price}</strong>
                  <p>{plan.copy}</p>
                  <ul>
                    {plan.features.map((feature) => <li key={feature}><CheckCircle2 size={17} /> {feature}</li>)}
                  </ul>
                  <Link href={plan.href} className={`btn ${plan.featured ? 'btn--primary' : 'btn--secondary'} btn--full`}>{plan.cta}</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.explainSection}>
          <div className={`container ${styles.explainGrid}`}>
            <div>
              <span className="label">How pricing works</span>
              <h2>Every opportunity is different, so pricing needs context.</h2>
              <p>
                A $95 booth at a small maker market and a custom boutique takeover are not the same product. PopUpCo keeps pricing tied to the details vendors actually care about.
              </p>
            </div>
            <div className={styles.variableGrid}>
              {variables.map((item) => <div key={item}>{item}</div>)}
            </div>
          </div>
        </section>

        <section className="section bg-alt">
          <div className="container">
            <div className={styles.trustPanel}>
              <ShieldCheck size={28} />
              <div>
                <h2>Application fees are not the default.</h2>
                <p>
                  A $25 application fee may apply for select events. If accepted, it is credited toward the booth fee. Any event with an application fee should clearly show that before submission so vendors are never surprised.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className={styles.faqHeader}>
              <span className="label">Common questions</span>
              <h2>Pricing should be easy to understand before you apply.</h2>
            </div>
            <div className={styles.faqGrid}>
              {faqs.map(([question, answer]) => (
                <article key={question} className={styles.faqCard}>
                  <HelpCircle size={20} />
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaInner}>
              <h2>Not sure what your pop-up should cost?</h2>
              <p>Tell us what you are trying to do and we will help route you to the right vendor, venue, or host path.</p>
              <div className={styles.ctaBtns}>
                <Link href="/browse" className="btn btn--primary btn--lg">Browse opportunities</Link>
                <Link href="/contact" className="btn btn--secondary btn--lg">Ask about pricing</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
