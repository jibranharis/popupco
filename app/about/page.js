import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, HeartHandshake, MapPin, Store, Users } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'Building the home for local pop-up commerce',
  description: 'Meet PopUpCo, a Bay Area marketplace helping vendors, venues, and hosts create better local pop-up experiences.',
};

const values = [
  {
    icon: Store,
    title: 'Small businesses deserve better access',
    copy: 'A great product should not need a long lease, expensive buildout, or the right connection just to meet customers in person.',
  },
  {
    icon: Users,
    title: 'Events should feel curated',
    copy: 'The best pop-ups have the right vendor mix, clear rules, smooth setup, and a reason for people to stay.',
  },
  {
    icon: MapPin,
    title: 'Empty space can become community',
    copy: 'A storefront, cafe, hall, parking lot, or school space can turn into a local market when the right people can find each other.',
  },
  {
    icon: HeartHandshake,
    title: 'Trust has to come first',
    copy: 'Vendors need fees, deadlines, permits, load-in details, host credibility, and attendance expectations before they commit.',
  },
];

const founders = [
  {
    name: 'Founder',
    role: 'Product, marketplace, and vendor experience',
    image: '/images/founder-1.jpg',
    copy: 'Focused on making PopUpCo practical for the people using it on busy weekends: clear listings, simple applications, and less back-and-forth.',
  },
  {
    name: 'Co-founder',
    role: 'Community, operations, and local partnerships',
    image: '/images/founder-2.jpg',
    copy: 'Focused on building relationships with vendors, venues, hosts, and community spaces so each pop-up feels real, local, and worth showing up for.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div>
              <span className="label">About PopUpCo</span>
              <h1>Building the home for local pop-up commerce.</h1>
              <p>
                PopUpCo started from a simple frustration: local vendors have talent, ambition, and products people want, but finding the next place to sell is still scattered across DMs, flyers, forms, and word of mouth.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/browse" className="btn btn--primary btn--lg">Explore opportunities</Link>
                <Link href="/contact" className="btn btn--secondary btn--lg">Talk to us</Link>
              </div>
            </div>
            <div className={styles.logoPanel}>
              <Image src="/images/popupco-logo.png" alt="PopUpCo logo" fill priority className={styles.logoImage} />
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyLead}>
                <span className="label">Why we started</span>
                <h2>We wanted to make selling in real life feel possible again.</h2>
              </div>
              <div className={styles.storyCopy}>
                <p>
                  Pop-ups are one of the most realistic ways for small businesses to grow. They let a candle maker, baker, clothing brand, jewelry seller, artist, student entrepreneur, or food vendor test demand, meet customers, and build a name without taking on a permanent storefront.
                </p>
                <p>
                  But the process is harder than it should be. Vendors often have to chase Instagram posts, fill out random forms, wonder if the event is legitimate, ask about booth fees, guess the audience size, and hope setup details arrive in time. Venues have unused space but do not always know how to activate it. Hosts want to create great markets but end up buried in spreadsheets and messages.
                </p>
                <p>
                  We built PopUpCo to bring those pieces into one place: opportunities, spaces, hosts, applications, messages, rules, deadlines, and trust signals. The goal is not just to rent space. The goal is to help local businesses show up, sell, and be discovered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-alt">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="label">Why it matters</span>
              <h2>Local commerce should be easier to start and easier to trust.</h2>
            </div>
            <div className={styles.valuesGrid}>
              {values.map(({ icon: Icon, title, copy }) => (
                <div key={title} className={styles.valueCard}>
                  <Icon size={22} />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.foundersSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="label">The founders</span>
              <h2>Built by people who care about local business.</h2>
              <p>
                PopUpCo is early, hands-on, and Bay Area first. We are talking to vendors, venues, hosts, schools, nonprofits, and community spaces so the product is shaped by real problems, not startup theater.
              </p>
            </div>
            <div className={styles.founderGrid}>
              {founders.map((founder) => (
                <article key={founder.image} className={styles.founderCard}>
                  <div className={styles.founderPhoto}>
                    <Image src={founder.image} alt={`${founder.name} portrait`} fill className={styles.founderImage} />
                  </div>
                  <div className={styles.founderBody}>
                    <h3>{founder.name}</h3>
                    <span>{founder.role}</span>
                    <p>{founder.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.noteSection}>
          <div className="container">
            <div className={styles.noteCard}>
              <span className="label">Where we are starting</span>
              <h2>Bay Area first, community always.</h2>
              <p>
                The Bay Area is full of people making things, selling things, organizing things, and trying to bring neighborhoods together. PopUpCo starts here because this is where we can learn directly from the people we are building for.
              </p>
              <Link href="/browse" className={styles.textLink}>See Bay Area opportunities <ArrowRight size={17} /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
