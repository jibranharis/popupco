import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HostPlanningSection from '@/components/HostPlanningSection';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Eye,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Users,
} from 'lucide-react';
import styles from './page.module.css';

const chips = [
  [Users, 'Review vendors faster'],
  [MapPin, 'Compare spaces easily'],
  [MessageSquare, 'Send details in one place'],
];

const dashboardItems = [
  [ClipboardList, '24 vendor applications', 'Review, accept, waitlist, or message vendors.'],
  [MapPin, '6 saved spaces', 'Compare venue rules, capacity, load-in, and fees.'],
  [Users, 'Category balance', 'Keep the vendor mix varied and intentional.'],
  [MessageSquare, 'Event messages', 'Send setup details and deadline reminders.'],
];

const bottomFeatures = [
  [Users, 'Build the right lineup', 'Attract great vendors and curate a mix that fits your vision and audience.'],
  [CalendarDays, 'Keep every detail clear', 'Share setup info, deadlines, and updates so vendors always know what\'s next.'],
  [ShieldCheck, 'Run everything from one place', 'Manage vendors, venues, messages, and timelines without the back-and-forth.'],
];

export default function HostsPage() {
  return (
    <>
      <Header />
      <main className={`${styles.main} ${styles.hostPage}`}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="label">For hosts</span>
              <h1>Create better pop-up events without the chaos.</h1>
              <p>Create an event, find a venue, recruit vendors, and manage applications without scattered forms and DMs.</p>
              <div className={styles.ctas}>
                <Link href="/apply/host" className={`${styles.roleButton} ${styles.primaryButton}`}>Host a pop-up <ArrowRight size={20} /></Link>
                <Link href="/venues" className={`${styles.roleButton} ${styles.secondaryButton}`}>Browse spaces</Link>
              </div>
              <div className={styles.heroChips}>
                {chips.map(([Icon, text]) => (
                  <span key={text}><Icon size={16} /> {text}</span>
                ))}
              </div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <strong>Host dashboard</strong>
                <span className={styles.visualPill}><Eye size={15} /> Preview</span>
              </div>
              <div className={styles.visualRows}>
                {dashboardItems.map(([Icon, title, copy]) => (
                  <div className={styles.visualRow} key={title}>
                    <span className={styles.rowIcon}><Icon size={25} /></span>
                    <span className={styles.rowText}>
                      <strong>{title}</strong>
                      <span>{copy}</span>
                    </span>
                    <ChevronRight className={styles.rowArrow} size={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <HostPlanningSection />

        <section className={styles.featureStripSection}>
          <div className={styles.featureStrip}>
            {bottomFeatures.map(([Icon, title, copy]) => (
              <div className={styles.featureItem} key={title}>
                <span className={styles.featureIcon}><Icon size={31} /></span>
                <span>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </span>
              </div>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
