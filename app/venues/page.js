import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VenueShowcaseSection from '@/components/VenueShowcaseSection';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Eye,
  MessageSquare,
  Package,
  Settings,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react';
import styles from '../hosts/page.module.css';

const chips = [
  [Users, 'Show capacity clearly'],
  [ShieldCheck, 'Set rules upfront'],
  [CalendarDays, 'Manage bookings in one place'],
];

const dashboardItems = [
  [Store, 'Active listings', 'Show photos, capacity, amenities, and rules.'],
  [ClipboardList, 'Booking requests', 'Review host and event fit before saying yes.'],
  [CalendarDays, 'Calendar', 'Keep availability clear and organized.'],
  [MessageSquare, 'Messages', 'Coordinate details with hosts and vendors.'],
];

const bottomFeatures = [
  [Package,   'Fill unused space',    'Turn quiet days into local commerce opportunities.'],
  [Eye,       'Review the right fit', 'See host requests before you approve anything.'],
  [Settings,  'Stay in control',      'Set rules, availability, and booking expectations upfront.'],
];

export default function VenuesPage() {
  return (
    <>
      <Header />
      <main className={`${styles.main} ${styles.venuePage}`}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="label">For venues</span>
              <h1>Turn your space into a pop-up destination.</h1>
              <p>List a storefront, hall, cafe, studio, lot, gallery, school, or community space. PopUpCo helps match it with the right hosts, vendors, and events.</p>
              <div className={styles.ctas}>
                <Link href="/apply/venue" className={`${styles.roleButton} ${styles.primaryButton}`}>List your space <ArrowRight size={20} /></Link>
                <Link href="/browse" className={`${styles.roleButton} ${styles.secondaryButton}`}>See marketplace</Link>
              </div>
              <div className={styles.heroChips}>
                {chips.map(([Icon, text]) => (
                  <span key={text}><Icon size={16} /> {text}</span>
                ))}
              </div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <strong>Venue tools</strong>
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

        {/* ── Second feature section: rotating venue showcase ── */}
        <VenueShowcaseSection />

        <section className={styles.featureStripSection}>
          <div className={`container ${styles.featureStrip}`}>
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

