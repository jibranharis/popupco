import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';
import styles from '../hosts/page.module.css';

const features = [
  'List your space with photos, amenities, capacity, and rules',
  'Set availability and pricing',
  'Receive booking or event requests',
  'Approve the right hosts and vendors',
  'Bring foot traffic to your location',
  'Support local businesses',
];

export default function VenuesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="label">For venues</span>
            <h1>Turn your space into a pop-up destination.</h1>
            <p>Have a storefront, event hall, cafe, studio, parking lot, gallery, school, community center, or unused retail space? PopUpCo helps you show it beautifully, set rules, and connect with hosts or vendors who want to bring people in.</p>
            <p>Submitting a venue does not guarantee a booking, but it helps PopUpCo understand what types of pop-ups could fit your space.</p>
            <div className={styles.ctas}>
              <Link href="/apply/venue" className="btn btn--primary btn--lg">List your space</Link>
              <Link href="/browse" className="btn btn--secondary btn--lg">See marketplace</Link>
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
              {['Active listings', 'Booking requests', 'Calendar', 'Messages'].map((item) => (
                <div key={item}><CheckCircle2 size={20} /><strong>{item}</strong><span>Managed from your venue dashboard.</span></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
