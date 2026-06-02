import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Eye,
  MessageSquare,
  Search,
  ShieldCheck,
  Store,
  Users,
  MapPin,
} from 'lucide-react';
import styles from '../hosts/page.module.css';

const chips = [
  [Store, 'Booth fees upfront'],
  [Users, 'Host info included'],
  [CalendarDays, 'Setup details included'],
];

const dashboardItems = [
  [ClipboardList, '3 applications pending', 'Track where each application stands.'],
  [Bookmark, '5 saved opportunities', 'Keep promising markets in one place.'],
  [MapPin, '2 new markets near you', 'Get matched with nearby events.'],
  [BarChart3, 'Profile 70% complete', 'Show hosts what you sell and how you set up.', '70%'],
];

const bottomFeatures = [
  [Search, 'Find the right fits faster', 'Filter by location, dates, fees, setup needs, and more—so you apply with confidence.'],
  [ShieldCheck, 'See everything up front', 'Booth fees, deadlines, electricity, load-in—no surprises, just clear details.'],
  [MessageSquare, 'Communicate in one place', 'Message hosts, ask questions, and keep everything organized.'],
];

export default function VendorsPage() {
  return (
    <>
      <Header />
      <main className={`${styles.main} ${styles.vendorPage}`}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="label">For vendors</span>
              <h1>Find pop-up opportunities without chasing DMs.</h1>
              <p>Browse markets, booth opportunities, and local events with the details you need before you apply. Fees, deadlines, setup needs, and host info stay in one place.</p>
              <div className={styles.ctas}>
                <Link href="/browse" className={`${styles.roleButton} ${styles.primaryButton}`}>Find opportunities <ArrowRight size={20} /></Link>
                <Link href="/apply/vendor" className={`${styles.roleButton} ${styles.secondaryButton}`}>Create your vendor profile</Link>
              </div>
              <div className={styles.heroChips}>
                {chips.map(([Icon, text]) => (
                  <span key={text}><Icon size={16} /> {text}</span>
                ))}
              </div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <strong>Vendor dashboard</strong>
                <span className={styles.visualPill}><Eye size={15} /> Preview</span>
              </div>
              <div className={styles.visualRows}>
                {dashboardItems.map(([Icon, title, copy, progress]) => (
                  <div className={styles.visualRow} key={title}>
                    <span className={styles.rowIcon}><Icon size={25} /></span>
                    <span className={styles.rowText}>
                      <strong>{title}</strong>
                      <span>{copy}</span>
                    </span>
                    {progress ? <span className={styles.progressRing}>{progress}</span> : <ChevronRight className={styles.rowArrow} size={24} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
