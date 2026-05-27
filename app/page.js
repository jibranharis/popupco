'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CalendarDays, MapPin, Search, ShieldCheck, Sparkles, Store, Users } from 'lucide-react';
import styles from './page.module.css';

const moments = [
  {
    title: 'Sell at a Local Market',
    copy: 'Find weekend markets, community fairs, and vendor events where your products can meet real local customers.',
    cta: 'Find Markets',
    href: '/browse',
    image: '/hero-market.png',
  },
  {
    title: 'Launch a New Product',
    copy: 'Test a product in person before committing to a long-term retail space.',
    cta: 'Explore Pop-Up Spaces',
    href: '/browse',
    image: '/images/media__1779838728727.jpg',
  },
  {
    title: 'Host a Vendor Fair',
    copy: 'Bring local makers, food vendors, artists, and shoppers together in one place.',
    cta: 'Start Hosting',
    href: '/hosts',
    image: '/event-1.png',
  },
  {
    title: 'Book a Community Hall',
    copy: 'Compare halls, schools, studios, and community spaces with rules and setup details up front.',
    cta: 'See Venues',
    href: '/venues',
    image: '/images/media__1779838851661.jpg',
  },
  {
    title: 'Find Food Pop-Up Space',
    copy: 'Find food-friendly opportunities with permit notes, electricity, load-in, and outdoor details.',
    cta: 'Find Food Spaces',
    href: '/browse',
    image: '/cat-food.png',
  },
  {
    title: 'Run an Art Market',
    copy: 'Curate artists, print sellers, jewelry makers, and local shoppers into one warm market night.',
    cta: 'Plan an Art Market',
    href: '/hosts',
    image: '/cat-jewelry.png',
  },
  {
    title: 'Plan a Holiday Market',
    copy: 'Create a seasonal market with a balanced vendor mix, clear deadlines, and space that fits.',
    cta: 'Host a Holiday Market',
    href: '/hosts',
    image: '/event-2.png',
  },
];

const roles = [
  {
    title: "I'm a Vendor",
    copy: 'Find markets, booths, spaces, and pop-up opportunities that match what you sell.',
    cta: 'Find opportunities',
    href: '/browse',
  },
  {
    title: 'I Have an Empty Venue',
    copy: 'List your space, set rules and availability, and connect with hosts or vendors.',
    cta: 'List your space',
    href: '/apply/venue',
  },
  {
    title: "I'm a Host",
    copy: 'Create pop-up events, recruit vendors, manage applications, and bring local experiences to life.',
    cta: 'Host a pop-up',
    href: '/hosts',
  },
  {
    title: "I'm Exploring Events",
    copy: 'Discover local markets, food pop-ups, art shows, and community events near you.',
    cta: 'Explore events',
    href: '/browse',
  },
];

const trustPoints = [
  'Clear booth fees',
  'Application deadlines',
  'Attendance ranges',
  'Setup requirements',
  'Permit notes',
  'Cancellation policy',
  'Verified hosts and venues',
  'Reviews and event history, future feature',
];

const opportunityRows = [
  ['Booth fee', '$125'],
  ['Expected attendance', '400-600'],
  ['Application deadline', 'June 14'],
  ['Setup window', '8:00-9:30 AM'],
  ['Food permits', 'Required for prepared food'],
  ['Indoor/outdoor', 'Outdoor'],
  ['Cancellation', 'Refundable up to 7 days before'],
  ['Reviews', 'Coming soon'],
];

const filmstrip = [
  ['Empty storefront', 'Weekend pop-up', '/images/media__1779838728727.jpg'],
  ['Community hall', 'Vendor fair', '/images/media__1779838851661.jpg'],
  ['Food vendor', 'Local market', '/cat-food.png'],
  ['Artist', 'Gallery night', '/cat-jewelry.png'],
  ['Nonprofit', 'Fundraiser market', '/event-1.png'],
  ['Venue', 'Weekday revenue', '/images/media__1779840173203.jpg'],
];

function useFadeInObserver(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export default function HomePage() {
  const pageRef = useRef(null);
  const [activeMoment, setActiveMoment] = useState(0);
  useFadeInObserver(pageRef);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const timer = setInterval(() => {
      setActiveMoment((current) => (current + 1) % moments.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />
      <main ref={pageRef} className={styles.page}>
        <div className={styles.introScroll}>
          <section className={styles.hero}>
            <div className={`container ${styles.heroGrid}`}>
              <div className={`fade-in ${styles.heroCopy}`}>
                <div className={styles.rolePills}>
                  {['Vendors', 'Venues', 'Hosts', 'Bay Area first'].map((item) => <span key={item}>{item}</span>)}
                </div>
                <h1>Find Local Markets, Booths, and Pop-Up Spaces.</h1>
                <p>
                  PopUpCo connects vendors, venues, and hosts so local markets, pop-ups, and community events can come to life.
                </p>
                <div className={styles.heroCtas}>
                  <Link href="/browse" className="btn btn--primary btn--lg">Find a Place to Sell</Link>
                  <Link href="/apply/venue" className="btn btn--secondary btn--lg">List Your Space</Link>
                  <Link href="/hosts" className="btn btn--secondary btn--lg">Host a Pop-Up</Link>
                </div>
              </div>

              <div className={`fade-in fade-in--d2 ${styles.heroMedia}`}>
                <Image src="/hero-market.png" alt="Local vendors selling at a warm market" fill priority className={styles.heroImage} />
                <div className={styles.mediaOverlay} />
                <div className={`${styles.marketCard} ${styles.cardOne}`}><span />Booths from $50</div>
                <div className={`${styles.marketCard} ${styles.cardTwo}`}><span />Applications open</div>
                <div className={`${styles.marketCard} ${styles.cardThree}`}><span />400+ expected visitors</div>
                <div className={`${styles.marketCard} ${styles.cardFour}`}><span />Bay Area market</div>
              </div>

              <form className={`fade-in fade-in--d3 ${styles.searchCard}`}>
                <label>
                  <span>Where</span>
                  <input placeholder="Where do you want to sell?" />
                </label>
                <label>
                  <span>Category</span>
                  <input placeholder="What do you sell?" />
                </label>
                <label>
                  <span>Date</span>
                  <input placeholder="Any weekend" />
                </label>
                <label>
                  <span>Budget</span>
                  <input placeholder="$75-$250" />
                </label>
                <Link href="/browse"><Search size={18} /> Find Opportunities</Link>
              </form>
            </div>
          </section>

          <section className={styles.momentsSection}>
            <div className={`container ${styles.momentsShell}`}>
              <div className={styles.sectionIntro}>
                <span className="label">Browse by moment</span>
                <h2>A Space for Every Kind of Pop-Up.</h2>
              </div>
              <div className={styles.momentsGrid}>
                <div className={styles.momentTabs}>
                  {moments.map((moment, index) => (
                    <Link
                      key={moment.title}
                      href={moment.href}
                      className={activeMoment === index ? styles.activeMoment : ''}
                      onMouseEnter={() => setActiveMoment(index)}
                      onFocus={() => setActiveMoment(index)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {moment.title}
                    </Link>
                  ))}
                </div>
                <div className={styles.momentVisual}>
                  <Image
                    key={moments[activeMoment].image}
                    src={moments[activeMoment].image}
                    alt={moments[activeMoment].title}
                    fill
                    className={styles.momentImage}
                    sizes="(max-width: 900px) 100vw, 58vw"
                  />
                  <div className={styles.momentContent}>
                    <h3>{moments[activeMoment].title}</h3>
                    <p>{moments[activeMoment].copy}</p>
                    <Link href={moments[activeMoment].href}>{moments[activeMoment].cta} <ArrowRight size={17} /></Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className={styles.rolesSection} id="how-it-works">
          <div className="container">
            <div className={styles.sectionIntro}>
              <span className="label">Start where you are</span>
              <h2>Choose How You Want to Use PopUpCo.</h2>
            </div>
            <div className={styles.roleGrid}>
              {roles.map((role) => (
                <Link key={role.title} href={role.href} className={styles.roleCard}>
                  <h3>{role.title}</h3>
                  <p>{role.copy}</p>
                  <span>{role.cta} <ArrowRight size={16} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.trustSection}>
          <div className={`container ${styles.trustGrid}`}>
            <div className={styles.trustCopy}>
              <span className="label">Know before you apply</span>
              <h2>Know Before You Apply.</h2>
              <p>
                Vendors should not have to guess whether an event is legitimate, what it costs, what to bring, or whether the audience fits their business.
              </p>
              <div className={styles.trustPoints}>
                {trustPoints.map((point) => <span key={point}><ShieldCheck size={16} />{point}</span>)}
              </div>
            </div>
            <div className={styles.detailsCard}>
              <div className={styles.detailsHeader}>
                <div>
                  <span>Opportunity Details</span>
                  <h3>Walnut Creek Weekend Market</h3>
                </div>
                <strong><ShieldCheck size={15} /> Verified host</strong>
              </div>
              <div className={styles.detailsRows}>
                {opportunityRows.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.localSection}>
          <div className={`container ${styles.localGrid}`}>
            <div className={styles.localCopy}>
              <span className="label">Bay Area first</span>
              <h2>Local Commerce Should Feel Local.</h2>
              <p>
                PopUpCo starts in the Bay Area with the people who make neighborhoods feel alive: makers, food vendors, artists, nonprofits, venues, and hosts.
              </p>
              <div className={styles.softStats}>
                <span><MapPin size={16} /> Bay Area first</span>
                <span><Store size={16} /> Vendor markets</span>
                <span><Users size={16} /> Community halls</span>
                <span><CalendarDays size={16} /> Event history coming soon</span>
              </div>
            </div>
            <div className={styles.filmstripWrap} aria-label="Local commerce examples">
              <div className={styles.filmstrip}>
                {[...filmstrip, ...filmstrip].map(([from, to, image], index) => (
                  <div key={`${from}-${index}`} className={index % 3 === 1 ? styles.filmCardActive : styles.filmCard}>
                    <Image src={image} alt={`${from} to ${to}`} width={220} height={150} className={styles.filmImage} />
                    <span>{from}</span>
                    <strong>{to}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalInner}`}>
            <div>
              <span className="label">Next step</span>
              <h2>Ready to Show Up Locally?</h2>
              <p>Find a booth, list a space, or host a pop-up in your community.</p>
            </div>
            <div className={styles.finalButtons}>
              <Link href="/browse" className="btn btn--primary btn--lg">Find a Place to Sell</Link>
              <Link href="/apply/venue" className="btn btn--secondary btn--lg">List Your Space</Link>
              <Link href="/hosts" className="btn btn--secondary btn--lg">Host an Event</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
