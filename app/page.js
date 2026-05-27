'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { SPACES_DATA } from '@/lib/spaces';
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Heart,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react';
import styles from './page.module.css';

const useCases = [
  ['Sell at a local market', 'Find booth opportunities with fees, deadlines, and host details up front.', '/hero-market.png'],
  ['Launch a new product', 'Book a boutique takeover or curated event for a sharper first impression.', '/images/media__1779838728727.jpg'],
  ['Host a vendor fair', 'Recruit the right mix of vendors and keep applications organized.', '/event-1.png'],
  ['Book a community hall', 'Compare local venues with capacity, setup, and rule details.', '/images/media__1779838851661.jpg'],
  ['Find food pop-up space', 'See permit notes, food rules, electricity, and load-in details before applying.', '/cat-food.png'],
  ['Curate an art market', 'Balance vendor categories and promote a local creative lineup.', '/cat-jewelry.png'],
  ['Bring vendors to your venue', 'Turn quiet space into a reason for neighbors to stop by.', '/images/media__1779840173203.jpg'],
  ['Turn an empty space into an event', 'Connect with hosts and vendors who can activate underused space.', '/cat-fashion.png'],
  ['Discover weekend pop-ups', 'Browse local markets, retail moments, and community experiences.', '/event-2.png'],
  ['Run a school fundraiser', 'Organize vendors, rules, deadlines, and community participation.', '/cat-beauty.png'],
  ['Create a holiday market', 'Plan seasonal vendor mixes with clear applications and booth details.', '/hero-market.png'],
  ['Host a boutique takeover', 'Invite brands into your retail environment for a focused pop-up.', '/images/media__1779838728727.jpg'],
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
    title: "I'm a venue",
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

const dashboardData = {
  Vendor: ['Recommended opportunities', '5 saved opportunities', '3 applications pending', '2 new messages', 'Profile 70% complete', 'Upcoming event checklist'],
  Venue: ['Active listings', 'Booking requests', 'Availability calendar', 'Listing performance', 'Messages', 'Profile 82% complete'],
  Host: ['My events', 'Vendor applications', 'Venue searches', 'Event checklist', 'Saved vendors', 'Promotion status'],
};

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
  const [activeDash, setActiveDash] = useState('Vendor');
  useFadeInObserver(pageRef);

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
                <Link href="/hosts" className="btn btn--ghost btn--lg">Host a pop-up</Link>
              </div>
              <p className={styles.supportText}>Starting in the Bay Area.</p>
            </div>

            <div className={`fade-in fade-in--d2 ${styles.heroVisual}`}>
              <Image src="/hero-market.png" alt="Local vendors selling at a warm Bay Area market" fill priority className={styles.heroImage} />
              <div className={`${styles.floatCard} ${styles.floatTop}`}>
                <span>Vendor Market</span>
                <strong>Booth from $95</strong>
              </div>
              <div className={`${styles.floatCard} ${styles.floatMid}`}>
                <span>Applications open</span>
                <strong>Expected attendance: 400+</strong>
              </div>
              <div className={`${styles.floatCard} ${styles.floatBottom}`}>
                <span><ShieldCheck size={14} /> Verified host</span>
                <strong>Deadline: June 12</strong>
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
                {useCases.map(([title], index) => (
                  <button
                    key={title}
                    className={activeUseCase === index ? styles.useActive : ''}
                    onMouseEnter={() => setActiveUseCase(index)}
                    onClick={() => setActiveUseCase(index)}
                  >
                    {title}
                  </button>
                ))}
              </div>
              <div className={styles.useVisual}>
                <Image src={useCases[activeUseCase][2]} alt={useCases[activeUseCase][0]} fill className={styles.useImage} />
                <div className={styles.useCaption}>
                  <h3>{useCases[activeUseCase][0]}</h3>
                  <p>{useCases[activeUseCase][1]}</p>
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

        <section className="section bg-alt">
          <div className="container">
            <div className={styles.featuredHeader}>
              <div>
                <span className="label">Marketplace</span>
                <h2>Featured pop-up opportunities</h2>
              </div>
              <Link href="/browse" className="btn btn--secondary">Discover opportunities</Link>
            </div>
            <div className="grid-3">
              {SPACES_DATA.slice(0, 6).map((space) => <SpaceCard key={space.id} space={space} />)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className={`container ${styles.valueSplit}`}>
            <div className={styles.valueCopy}>
              <span className="label">For vendors</span>
              <h2>Find places to sell, grow, and get discovered.</h2>
              <p>No more chasing Instagram posts, random forms, and scattered DMs. PopUpCo brings pop-up opportunities, booth details, applications, messages, and saved listings into one place.</p>
              <ul>
                {['Search by location, date, category, and budget', 'Understand fees, rules, setup needs, and deadlines', 'Save spaces and markets you like', 'Track applications in one dashboard', 'Message hosts directly', 'Build a vendor profile that looks credible'].map((item) => (
                  <li key={item}><CheckCircle2 size={17} /> {item}</li>
                ))}
              </ul>
              <Link href="/signup" className="btn btn--primary">Create your vendor profile</Link>
            </div>
            <div className={styles.dashboardMock}>
              <div className={styles.mockHeader}>
                <strong>Vendor dashboard</strong>
                <span>Profile 70% complete</span>
              </div>
              {[
                ['3', 'applications pending', ClipboardList],
                ['5', 'saved opportunities', Heart],
                ['2', 'new markets near you', MapPin],
                ['1', 'message from host', MessageSquare],
              ].map(([num, label, Icon]) => (
                <div className={styles.mockRow} key={label}>
                  <Icon size={18} />
                  <strong>{num}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-cream">
          <div className={`container ${styles.twoBand}`}>
            <div>
              <span className="label">For venues</span>
              <h2>Turn your space into a pop-up destination.</h2>
              <p>List a storefront, cafe, studio, gallery, school, parking lot, or community center with photos, amenities, capacity, rules, pricing, and availability.</p>
              <Link href="/apply/venue" className="btn btn--secondary">List your space</Link>
            </div>
            <div>
              <span className="label">For hosts</span>
              <h2>Create better pop-up events without the chaos.</h2>
              <p>Create an event page, find venues, recruit vendors, balance categories, message accepted sellers, and promote your market from one place.</p>
              <Link href="/hosts" className="btn btn--secondary">Host a pop-up</Link>
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

        <section className="section bg-alt">
          <div className={`container ${styles.appPreview}`}>
            <div>
              <span className="label">After signup</span>
              <h2>Everything organized after you sign up.</h2>
              <p>Role-specific dashboards make PopUpCo feel like a working marketplace, not a brochure.</p>
            </div>
            <div className={styles.previewPanel}>
              <div className={styles.previewTabs}>
                {Object.keys(dashboardData).map((tab) => (
                  <button key={tab} className={activeDash === tab ? styles.previewActive : ''} onClick={() => setActiveDash(tab)}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className={styles.previewList}>
                {dashboardData[activeDash].map((item, index) => (
                  <div key={item}><span>{index + 1}</span>{item}</div>
                ))}
              </div>
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
