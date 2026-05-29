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
  'Balance categories so there are not too many duplicate vendors',
  'Message accepted vendors',
  'Promote your event',
];

export default function HostsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="label">For hosts</span>
            <h1>Create better pop-up events without the chaos.</h1>
            <p>PopUpCo helps organizers find venues, recruit vendors, manage applications, communicate event details, and create markets that feel curated instead of chaotic.</p>
            <div className={styles.ctas}>
              <Link href="/apply/host" className="btn btn--primary btn--lg">Host a pop-up</Link>
              <Link href="/apply/host" className="btn btn--secondary btn--lg">Need a venue</Link>
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
              {[
                [ClipboardList, '24 vendor applications', 'Review, accept, waitlist, or message vendors.'],
                [MapPin, '6 saved spaces', 'Compare venue rules, capacity, load-in, and fees.'],
                [Users, 'Category balance', 'Keep the vendor mix varied and intentional.'],
                [MessageSquare, 'Event messages', 'Send setup details and deadline reminders.'],
              ].map(([Icon, title, copy]) => (
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
