import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, ClipboardList, MapPin, MessageSquare, Users } from 'lucide-react';
import styles from './page.module.css';

const features = [
  'Create an event page',
  'Find venues',
  'Recruit vendors',
  'Manage vendor applications',
  'Balance categories',
  'Message accepted vendors',
  'Promote your event',
];

const dashboardItems = [
  [ClipboardList, '24 vendor applications', 'Review, accept, waitlist, or message vendors.'],
  [MapPin, '6 saved spaces', 'Compare venue rules, capacity, load-in, and fees.'],
  [Users, 'Category balance', 'Keep the vendor mix varied and intentional.'],
  [MessageSquare, 'Event messages', 'Send setup details and deadline reminders.'],
];

export default function HostsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="label">For hosts</span>
              <h1>Create better pop-up events without the chaos.</h1>
              <p>Create an event, find a venue, recruit vendors, and manage applications without scattered forms and DMs.</p>
              <div className={styles.ctas}>
                <Link href="/apply/host" className="btn btn--primary btn--lg">Host a pop-up</Link>
                <Link href="/apply/host" className="btn btn--secondary btn--lg">Need a venue</Link>
              </div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <strong>Host dashboard</strong>
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
              <h2>One place for the work behind the market.</h2>
              <ul>
                {features.map((feature) => <li key={feature}><CheckCircle2 size={18} /> {feature}</li>)}
              </ul>
            </div>
            <div className={styles.panel}>
              {dashboardItems.map(([Icon, title, copy]) => (
                <div key={title}>
                  <Icon size={20} />
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
