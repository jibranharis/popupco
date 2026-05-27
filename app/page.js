'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Search,
  ShieldCheck,
} from 'lucide-react';
import styles from './page.module.css';

const useCases = [
  { title: 'Sell at a local market', copy: 'Find booth opportunities with fees, deadlines, and host details up front.', image: '/hero-market.png', href: '/browse' },
  { title: 'Launch a new product', copy: 'Book a boutique takeover or curated event for a sharper first impression.', image: '/images/media__1779838728727.jpg', href: '/browse' },
  { title: 'Host a vendor fair', copy: 'Recruit the right mix of vendors and keep applications organized.', image: '/event-1.png', href: '/hosts' },
  { title: 'Book a community hall', copy: 'Compare local venues with capacity, setup, and rule details.', image: '/images/media__1779838851661.jpg', href: '/venues' },
  { title: 'Find food pop-up space', copy: 'See permit notes, food rules, electricity, and load-in details before applying.', image: '/cat-food.png', href: '/browse' },
  { title: 'Curate an art market', copy: 'Balance vendor categories and promote a local creative lineup.', image: '/cat-jewelry.png', href: '/hosts' },
  { title: 'Bring vendors to your venue', copy: 'Turn quiet space into a reason for neighbors to stop by.', image: '/images/media__1779840173203.jpg', href: '/venues' },
  { title: 'Turn an empty space into an event', copy: 'Connect with hosts and vendors who can activate underused space.', image: '/cat-fashion.png', href: '/venues' },
  { title: 'Discover weekend pop-ups', copy: 'Browse local markets, retail moments, and community experiences.', image: '/event-2.png', href: '/browse' },
  { title: 'Run a school fundraiser', copy: 'Organize vendors, rules, deadlines, and community participation.', image: '/cat-beauty.png', href: '/hosts' },
  { title: 'Create a holiday market', copy: 'Plan seasonal vendor mixes with clear applications and booth details.', image: '/hero-market.png', href: '/hosts' },
  { title: 'Host a boutique takeover', copy: 'Invite brands into your retail environment for a focused pop-up.', image: '/images/media__1779838728727.jpg', href: '/hosts' },
];

const roleCards = [
  {
    title: "I'm a vendor",
    copy: 'Find markets, booths, spaces, and pop-up opportunities that match what you sell.',
    cta: 'Find opportunities',
    href: '/browse',
    featured: true,
  },
  {
    title: 'I have an empty venue',
    copy: 'List your space, set rules and availability, and connect with hosts or vendors.',
    cta: 'List your space',
    href: '/apply/venue',
  },
  {
    title: "I'm a host",
    copy: 'Create pop-up events, recruit vendors, manage applications, and bring local experiences to life.',
    cta: 'Host a pop-up',
    href: '/hosts',
  },
  {
    title: "I'm exploring events",
    copy: 'Discover local markets, food pop-ups, art shows, and community events near you.',
    cta: 'Explore events',
    href: '/browse',
  },
];

const trustItems = [
  'Clear booth fees',
  'Application deadlines',
  'Expected attendance ranges',
  'Host and venue profiles',
  'Setup requirements',
  'Food permit notes',
  'Indoor/outdoor details',
  'Category limits',
  'Cancellation policy',
  'Verified hosts and venues',
  'Reviews and past event history, future feature',
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
  const [activeUseCase, setActiveUseCase] = useState(0);
  useFadeInObserver(pageRef);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveUseCase((current) => (current + 1) % useCases.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />
      <main ref={pageRef}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={`fade-in ${styles.heroContent}`}>
              <div className={styles.rolePills}>
                {['Vendor', 'Venue', 'Host', 'Local Events'].map((item) => <span key={item}>{item}</span>)}
              </div>
              <h1 className={styles.heroTitle}>Find your next pop-up opportunity.</h1>
              <p className={styles.heroSub}>
                PopUpCo connects vendors, hosts, and venues so local markets, pop-ups, and community events can come to life.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/browse" className="btn btn--primary btn--lg">Find a place to sell</Link>
                <Link href="/apply/venue" className="btn btn--secondary btn--lg">List your space</Link>
                <Link href="/hosts" className="btn btn--secondary btn--lg">Host a pop-up</Link>
              </div>
              <p className={styles.supportText}>Starting in the Bay Area.</p>
            </div>

            <div className={`fade-in fade-in--d2 ${styles.heroVisual}`}>
              <Image src="/hero-market.png" alt="Local vendors selling at a warm Bay Area market" fill priority className={styles.heroImage} />
              <div className={`${styles.floatCard} ${styles.floatTop}`}>
                <span>Vendor Market</span>
                <strong>Booth from $50+</strong>
              </div>
              <div className={`${styles.floatCard} ${styles.floatMid}`}>
                <span>Applications open</span>
                <strong>Expected attendance: 400+</strong>
              </div>
            </div>

            <form className={`fade-in fade-in--d3 search-bar ${styles.searchBar}`}>
              <label className="search-bar__field">
                <span className="search-bar__label">Where</span>
                <input className="search-bar__input" placeholder="Where do you want to sell?" />
              </label>
              <label className="search-bar__field">
                <span className="search-bar__label">Category</span>
                <input className="search-bar__input" placeholder="What do you sell?" />
              </label>
              <label className="search-bar__field">
                <span className="search-bar__label">Date</span>
                <input className="search-bar__input" placeholder="Any weekend" />
              </label>
              <label className="search-bar__field">
                <span className="search-bar__label">Budget</span>
                <input className="search-bar__input" placeholder="$75-$250" />
              </label>
              <Link href="/browse" className="search-bar__btn"><Search size={18} /> Search opportunities</Link>
            </form>
          </div>
        </section>

        <section className={`section ${styles.ideaSection}`}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <span className="label">Browse by moment</span>
              <h2>A pop-up for every idea.</h2>
            </div>
            <div className={styles.ideaGrid}>
              <div className={styles.useList}>
                {useCases.map((item, index) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={activeUseCase === index ? styles.useActive : ''}
                    onMouseEnter={() => setActiveUseCase(index)}
                    onFocus={() => setActiveUseCase(index)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className={styles.useVisual}>
                <Image src={useCases[activeUseCase].image} alt={useCases[activeUseCase].title} fill className={styles.useImage} />
                <div className={styles.useCaption}>
                  <h3>{useCases[activeUseCase].title}</h3>
                  <p>{useCases[activeUseCase].copy}</p>
                  <Link href={useCases[activeUseCase].href}>Go there</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="container">
            <div className={styles.sectionIntro}>
              <span className="label">Role-based paths</span>
              <h2>Choose how you want to use PopUpCo.</h2>
            </div>
            <div className={styles.roleGrid}>
              {roleCards.map((role) => (
                <Link key={role.title} href={role.href} className={`${styles.roleCard} ${role.featured ? styles.roleFeatured : ''}`}>
                  <h3>{role.title}</h3>
                  <p>{role.copy}</p>
                  <span>{role.cta}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles.trustSection}`}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <span className="label">Trust and safety</span>
              <h2>Built for vendors who want clarity before they commit.</h2>
              <p>Vendors should not have to guess whether an event is legitimate, what it costs, what to bring, or whether the audience fits their business.</p>
            </div>
            <div className={styles.trustGrid}>
              {trustItems.map((item) => <div key={item} className={styles.trustCard}><ShieldCheck size={18} /> {item}</div>)}
            </div>
          </div>
        </section>

        <section className={`section--dark ${styles.communitySection}`}>
          <div className="container">
            <div className={styles.communityInner}>
              <span className="label">Bay Area first</span>
              <h2>Local commerce should feel local.</h2>
              <p>PopUpCo starts in the Bay Area with markets, makers, venues, food vendors, artists, nonprofits, and community spaces. The goal is not just to rent space. The goal is to help local businesses show up in real life.</p>
              <Link href="/browse" className="btn btn--outline-white">Explore Bay Area opportunities</Link>
            </div>
          </div>
        </section>

        <section className={`section ${styles.finalCta}`}>
          <div className="container">
            <h2>Ready to find your next pop-up opportunity?</h2>
            <div className={styles.heroCtas}>
              <Link href="/browse" className="btn btn--primary btn--xl">Find a place to sell</Link>
              <Link href="/signup" className="btn btn--secondary btn--xl">Create account</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
