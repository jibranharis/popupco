import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CalendarDays, MapPin, Store, Users } from 'lucide-react';
import styles from './page.module.css';

const paths = [
  {
    title: 'Sell',
    copy: 'Sell your products at markets and pop-ups.',
    href: '/browse',
    cta: 'Browse vendor opportunities',
    Icon: Store,
    active: true,
  },
  {
    title: 'Explore',
    copy: 'Find pop-ups, events, and local experiences.',
    href: '/upcoming',
    cta: 'View upcoming events',
    Icon: CalendarDays,
  },
  {
    title: 'Host',
    copy: 'Bring vendors and communities together.',
    href: '/apply/host',
    cta: 'Start host request',
    Icon: Users,
  },
  {
    title: 'Venue',
    copy: 'List your space and attract great events.',
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
              {paths.map(({ title, copy, href, cta, Icon, active }) => (
                <Link key={title} href={href} className={`card ${styles.pathCard} ${active ? styles.activePathCard : ''}`}>
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
