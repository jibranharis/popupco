import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CalendarDays, CheckCircle2, ClipboardList, MessageSquare, Store } from 'lucide-react';
import styles from '../hosts/page.module.css';

const features = [
  'List your space with photos, capacity, amenities, and rules',
  'Set availability and pricing',
  'Receive booking or event requests',
  'Approve the right hosts and vendors',
  'Bring foot traffic to your location',
  'Support local businesses',
];

const dashboardItems = [
  [Store, 'Active listings', 'Show photos, capacity, amenities, and rules.'],
  [ClipboardList, 'Booking requests', 'Review host and event fit before saying yes.'],
  [CalendarDays, 'Calendar', 'Keep availability clear and organized.'],
  [MessageSquare, 'Messages', 'Coordinate details with hosts and vendors.'],
];

export default function VenuesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="label">For venues</span>
              <h1>Turn your space into a pop-up destination.</h1>
              <p>List a storefront, hall, cafe, studio, lot, gallery, school, or community space. PopUpCo helps match it with the right hosts, vendors, and events.</p>
              <div className={styles.ctas}>
                <Link href="/apply/venue" className="btn btn--primary btn--lg">List your space</Link>
                <Link href="/browse" className="btn btn--secondary btn--lg">See marketplace</Link>
              </div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <strong>Venue tools</strong>
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
              <h2>A clearer way to activate underused space.</h2>
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
