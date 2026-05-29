import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CalendarDays, MapPin, Store, Users } from 'lucide-react';
import styles from './page.module.css';

const paths = [
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
    copy: 'Start an event request, recruit vendors, and tell PopUpCo whether you already have a venue or need one.',
    href: '/apply/host',
    cta: 'Start host request',
    Icon: Users,
  },
  {
    title: 'I have a venue or space',
    copy: 'Submit a storefront, hall, cafe, studio, lot, gallery, school, or community space for pop-up use.',
    href: '/apply/venue',
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
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="label">Discover</span>
              <h1>What do you want to do on PopUpCo?</h1>
              <p>
                Choose the path that fits you. Find places to sell, events to attend, venues to activate, or hosts to partner with.
              </p>
            </div>
            <div className={styles.visualCard}>
              <Image
                src="/images/hero_market_warm_1779840281321.png"
                alt="Local pop-up market with vendors and shoppers"
                fill
                sizes="(max-width: 980px) 100vw, 380px"
                priority
              />
              <span className={styles.visualPill}>Vendors / Venues / Hosts / Events</span>
            </div>
          </div>
        </section>

        <section className={styles.pathSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <div>
                <span className="label">Choose your path</span>
                <h2>Start with what you need.</h2>
              </div>
            </div>
            <div className={styles.pathGrid}>
              {paths.map(({ title, copy, href, cta, Icon }) => (
                <Link key={title} href={href} className={`card ${styles.pathCard}`}>
                  <span className={styles.pathIcon}><Icon size={22} /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <span className={styles.pathCta}>
                    {cta} <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
