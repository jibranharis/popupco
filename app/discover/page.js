import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiscoverPathsCarousel from '@/components/DiscoverPathsCarousel';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  MapPin,
  Store,
  Users,
  Sparkles,
} from 'lucide-react';
import styles from './page.module.css';

const quickActions = [
  [Store, 'Sell at an event'],
  [CalendarDays, 'Attend local pop-ups'],
  [Users, 'Host a pop-up'],
  [MapPin, 'List a venue'],
];

const popularPaths = [
  [Store, 'Vendor', 'Find markets and events to sell your products and grow your brand.', '/vendors'],
  [CalendarDays, 'Explorer', 'Discover local pop-ups, markets, and experiences happening near you.', '/upcoming'],
  [Users, 'Host', 'Plan a pop-up, recruit vendors, and bring your vision to life.', '/hosts'],
  [MapPin, 'Venue', 'List your space and connect with hosts and creators looking for the perfect spot.', '/venues'],
];

const pathCards = [
  {
    title: 'I want to sell at an event',
    copy: 'Browse vendor markets, booth opportunities, food pop-ups, and spaces currently accepting vendor interest.',
    href: '/browse',
    cta: 'Browse vendor opportunities',
    Icon: Store,
  },
  {
    title: 'I want to attend local pop-ups',
    copy: 'Find public markets, food events, brand pop-ups, and community experiences near you.',
    href: '/upcoming',
    cta: 'View upcoming events',
    Icon: CalendarDays,
  },
  {
    title: 'I want to host a pop-up',
    copy: 'Start an event request, recruit vendors, and tell PopUpCo what you have in mind.',
    href: '/hosts',
    cta: 'Start host request',
    Icon: Users,
  },
  {
    title: 'I have a venue or space',
    copy: 'List your storefront, hall, cafe, studio, lot, or community space for pop-up use.',
    href: '/venues',
    cta: 'Submit a venue',
    Icon: MapPin,
  },
];

export const metadata = {
  title: 'Discover',
  description: 'Choose the right PopUpCo marketplace path for vendors, attendees, hosts, and venues.',
};

export default function DiscoverPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.pathSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <span className="label">CHOOSE YOUR PATH</span>
              <h2>Start with what you need.</h2>
              <p className={styles.introSub}>Four ways in. Endless possibilities to grow, connect, and create.</p>
            </div>
          </div>
          
          <DiscoverPathsCarousel />
        </section>

        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="label">Discover</span>
              <h1>Find your place in the pop-up economy.</h1>
              <p>
                Whether you want to sell, attend, host, or list a space, PopUpCo connects you with the people, places, and opportunities that bring pop-ups to life.
              </p>
              <div className={styles.heroChips}>
                {quickActions.map(([Icon, text]) => (
                  <span key={text}><Icon size={16} /> {text}</span>
                ))}
              </div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <strong>Popular paths on PopUpCo</strong>
                <span className={styles.visualPill}><Sparkles size={15} /></span>
              </div>
              <div className={styles.visualRows}>
                {popularPaths.map(([Icon, title, copy, href]) => (
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
      </main>
      <Footer />
    </>
  );
}
