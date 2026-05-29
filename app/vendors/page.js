import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Bookmark, CheckCircle2, ClipboardList, MapPin, TrendingUp } from 'lucide-react';
import styles from '../hosts/page.module.css';

const features = [
  'Search opportunities by location, date, category, and budget',
  'See booth fees, rules, setup needs, and deadlines',
  'Save markets you like',
  'Track applications in one place',
  'Message hosts directly',
  'Build a credible vendor profile',
];

const dashboardItems = [
  [ClipboardList, '3 applications pending', 'Track where each application stands.'],
  [Bookmark, '5 saved opportunities', 'Keep promising markets in one place.'],
  [MapPin, '2 new markets near you', 'Get matched with nearby events.'],
  [TrendingUp, 'Profile 70% complete', 'Show hosts what you sell and how you set up.'],
];

export default function VendorsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="label">For vendors</span>
              <h1>Find pop-up opportunities without chasing DMs.</h1>
              <p>Browse markets, booth opportunities, and local events with the details you need before you apply. Fees, deadlines, setup needs, and host info stay in one place.</p>
              <div className={styles.ctas}>
                <Link href="/browse" className="btn btn--primary btn--lg">Find opportunities</Link>
                <Link href="/apply/vendor" className="btn btn--secondary btn--lg">Create your vendor profile</Link>
              </div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <strong>Vendor dashboard</strong>
                <span className={styles.visualPill}>Preview</span>
              </div>
              <div className={styles.visualRows}>
                {dashboardItems.map(([Icon, title, copy]) => (
                  <div className={styles.visualRow} key={title}>
                    <Icon size={20} />
                    <strong>{title}</strong>
                    <span>{copy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className={`container ${styles.grid}`}>
            <div className={styles.copy}>
              <h2>Know the details before you apply.</h2>
              <ul>{features.map((feature) => <li key={feature}><CheckCircle2 size={18} /> {feature}</li>)}</ul>
            </div>
            <div className={styles.panel}>
              {dashboardItems.map(([Icon, title, copy]) => (
                <div key={title}><Icon size={20} /><strong>{title}</strong><span>{copy}</span></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
