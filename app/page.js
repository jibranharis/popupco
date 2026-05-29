'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Search, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

const searchModes = [
  {
    id: 'sell',
    label: 'Find a place to sell',
    button: 'Find Opportunities',
    href: '/browse',
    fields: [
      ['Where', 'Where do you want to sell?'],
      ['Category', 'What do you sell?'],
      ['When', 'Any weekend'],
      ['Budget', '$75-$250'],
    ],
  },
  {
    id: 'space',
    label: 'List your space',
    button: 'List Your Space',
    href: '/apply/venue',
    fields: [
      ['Location', 'Where is your space?'],
      ['Type', 'Space type'],
      ['Capacity', 'Capacity'],
      ['Availability', 'Availability'],
    ],
  },
  {
    id: 'host',
    label: 'Host a pop-up',
    button: 'Start Hosting',
    href: '/apply/host',
    fields: [
      ['Location', 'Where are you hosting?'],
      ['Event', 'Event type'],
      ['Vendors', 'Vendor categories'],
      ['Date', 'Date'],
    ],
  },
];

const moments = [
  {
    title: 'Sell at a local market',
    copy: 'Find weekend markets, vendor fairs, and community events where your products can meet real local customers.',
    cta: 'Find markets',
    href: '/browse?type=vendor-markets',
    image: '/hero-market.png',
  },
  {
    title: 'Launch a product in person',
    copy: 'Test a new product with real shoppers before committing to a storefront, lease, or long-term retail plan.',
    cta: 'Find launch spaces',
    href: '/browse?type=retail-spaces',
    image: '/images/media__1779838728727.jpg',
  },
  {
    title: 'Sell art or handmade goods',
    copy: 'Discover art markets, maker fairs, gallery nights, and local events built for creative sellers.',
    cta: 'Find creative markets',
    href: '/browse?category=artists-makers',
    image: '/cat-jewelry.png',
  },
  {
    title: 'Find food pop-up space',
    copy: 'Find markets, halls, patios, and event spaces that welcome food vendors, tastings, and small food concepts.',
    cta: 'Find food spaces',
    href: '/browse?category=food',
    image: '/cat-food.png',
  },
  {
    title: 'Book a community space',
    copy: 'Reserve halls, courtyards, storefronts, and local venues for pop-ups, workshops, and community events.',
    cta: 'Browse spaces',
    href: '/browse?type=event-venues',
    image: '/images/media__1779838851661.jpg',
  },
  {
    title: 'Host a vendor market',
    copy: 'Bring vendors, artists, food sellers, and shoppers together with tools to collect applications and manage interest.',
    cta: 'Start hosting',
    href: '/apply/host',
    image: '/event-1.png',
  },
  {
    title: 'List your venue',
    copy: 'Turn empty space into local activity by making your venue available for pop-ups, markets, and community events.',
    cta: 'List your space',
    href: '/apply/venue',
    image: '/images/media__1779840173203.jpg',
  },
];

const roles = [
  {
    title: "I'm a vendor",
    copy: 'Find markets, booths, spaces, and pop-up opportunities that match what you sell.',
    cta: 'Find opportunities',
    href: '/browse',
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
    href: '/apply/host',
  },
  {
    title: "I'm exploring events",
    copy: 'Discover local markets, food pop-ups, art shows, and community events near you.',
    cta: 'Explore events',
    href: '/upcoming',
  },
];

const filmstrip = [
  ['Weekend vendor fair', 'Local makers selling in person', '/hero-market.png'],
  ['Product launch table', 'A new brand testing demand', '/images/media__1779838728727.jpg'],
  ['Artist market', 'Original work, prints, and handmade goods', '/cat-jewelry.png'],
  ['Food vendor setup', 'Pop-up food, tastings, and prepared goods', '/cat-food.png'],
  ['Community hall', 'A flexible space for local events', '/images/media__1779838851661.jpg'],
  ['Host-led market', 'Applications, vendors, and foot traffic', '/event-1.png'],
  ['Available venue', 'Empty space turned into opportunity', '/images/media__1779840173203.jpg'],
];

const messages = [
  ['Vendor', 'Is the booth fee fixed, or does it depend on category?'],
  ['Host', 'Booths start at $75. Food vendors need a permit, but handmade goods are ready to apply.'],
  ['Vendor', 'How many people usually attend?'],
  ['Host', 'We expect 400–600 visitors based on last month\'s market.'],
  ['Vendor', 'Perfect. Can I apply for the Saturday slot?'],
  ['Host', 'Yes, applications are open until Friday.'],
  ['Vendor', 'Thank you.'],
];

const opportunityRows = [
  ['Booth fee', '$125'],
  ['Expected attendance', '400-600'],
  ['Application deadline', 'June 14'],
  ['Setup window', '8:00-9:30 AM'],
  ['Food permits', 'Required for prepared food'],
  ['Cancellation', 'Refundable up to 7 days before'],
];

function useFadeInObserver(ref) {
  useEffect(() => {
    if (!ref.current) return undefined;
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
  const [activeMode, setActiveMode] = useState(searchModes[0]);
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
              <div className={styles.heroCopy}>
                <div className={styles.rolePills}>
                  {['Vendors', 'Venues', 'Hosts', 'Bay Area first'].map((item) => <span key={item}>{item}</span>)}
                </div>
                <h1>
                  <span>Find your next</span>
                  <span>Pop-Up</span>
                  <span>Opportunity.</span>
                </h1>
              </div>

              <div className={styles.heroMedia}>
                <Image src="/hero-market.png" alt="Local vendors selling at a warm market" fill priority className={styles.heroImage} />
                <div className={styles.heroTag}>
                  <strong>Booth from $50+</strong>
                </div>
              </div>

              <div className={styles.searchPanel} aria-label="PopUpCo search">
                <div className={styles.modeTabs} role="tablist" aria-label="Search intent">
                  {searchModes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      aria-selected={activeMode.id === mode.id}
                      className={activeMode.id === mode.id ? styles.activeMode : ''}
                      onClick={() => setActiveMode(mode)}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
                <form className={styles.searchFields}>
                  {activeMode.fields.map(([label, placeholder]) => (
                    <label key={label}>
                      <span>{label}</span>
                      <input placeholder={placeholder} />
                    </label>
                  ))}
                  <Link href={activeMode.href}><Search size={18} /> {activeMode.button}</Link>
                </form>
              </div>
            </div>
          </section>

          <section className={styles.momentsSection}>
            <div className={`container ${styles.momentsShell}`}>
              <div className={`fade-in ${styles.sectionIntro}`}>
                <span className="label">Browse by moment</span>
                <h2>A Pop-Up For Every Idea.</h2>
                <p>Explore the different ways vendors, venues, and hosts can bring local commerce to life.</p>
              </div>

              <div className={styles.momentsGrid}>
                <div className={`fade-in ${styles.momentTabs}`}>
                  {moments.map((moment, index) => (
                    <Link
                      key={moment.title}
                      href={moment.href}
                      className={`${styles.momentOption} ${activeMoment === index ? styles.activeMoment : ''}`}
                      style={{ '--moment-index': index }}
                      onMouseEnter={() => setActiveMoment(index)}
                      onFocus={() => setActiveMoment(index)}
                      onClick={() => setActiveMoment(index)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {moment.title}
                    </Link>
                  ))}
                </div>

                <div className={`fade-in fade-in--d2 ${styles.momentStage}`}>
                  <div className={styles.momentVisual}>
                    <Image
                      key={moments[activeMoment].image}
                      src={moments[activeMoment].image}
                      alt={moments[activeMoment].title}
                      fill
                      className={styles.momentImage}
                      sizes="(max-width: 900px) 100vw, 54vw"
                    />
                    <div className={styles.momentShade} />
                  </div>
                  <div className={styles.momentContent}>
                    <h3>{moments[activeMoment].title}</h3>
                    <p>{moments[activeMoment].copy}</p>
                    <Link href={moments[activeMoment].href}>{moments[activeMoment].cta} <ArrowRight size={17} /></Link>
                  </div>
                  <div className={styles.filmstripWrap} aria-label="Local commerce examples">
                    <div className={styles.filmstrip}>
                      {[...filmstrip, ...filmstrip].map(([label, type, image], index) => (
                        <div key={`${label}-${index}`} className={index % filmstrip.length === activeMoment ? styles.filmCardActive : styles.filmCard}>
                          <Image src={image} alt={`${label} for ${type}`} width={150} height={104} className={styles.filmImage} />
                          <span>{label}</span>
                          <strong>{type}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className={styles.messageSection}>
          <div className={`container ${styles.messageGrid}`}>
            <div className={`fade-in ${styles.messageCopy}`}>
              <span className="label">Clear conversations</span>
              <h2>Get the details before you commit.</h2>
              <p>
                PopUpCo keeps fees, attendance, setup needs, permits, and deadlines in one place so vendors and hosts can move with confidence.
              </p>
            </div>
            <div className={`fade-in fade-in--d2 ${styles.messageChain}`}>
              {messages.map(([sender, text], index) => (
                <div
                  key={`${sender}-${index}`}
                  className={`${styles.messageBubble} ${sender === 'Vendor' ? styles.vendorMessage : styles.hostMessage}`}
                  style={{ '--message-index': index }}
                >
                  <span>{sender.toUpperCase()}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.rolesSection} id="how-it-works">
          <div className="container">
            <div className={`fade-in ${styles.sectionIntro} ${styles.roleIntro}`}>
              <span className="label">Start where you are</span>
              <h2>Choose how you want to use PopUpCo.</h2>
            </div>
            <div className={styles.roleGrid}>
              {roles.map((role, index) => (
                <Link
                  key={role.title}
                  href={role.href}
                  className={`fade-in ${styles.roleCard}`}
                  style={{ '--role-index': index }}
                >
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
            <div className={`fade-in ${styles.trustCopy}`}>
              <span className="label">Marketplace clarity</span>
              <h2>Know Before You Apply.</h2>
              <p>Vendors should not have to guess what an event costs, what to bring, or whether the audience fits their business.</p>
              <div className={styles.trustPoints}>
                {['Clear booth fees', 'Attendance ranges', 'Setup requirements'].map((point) => (
                  <span key={point}><ShieldCheck size={16} />{point}</span>
                ))}
              </div>
            </div>
            <div className={`fade-in fade-in--d2 ${styles.detailsCard}`}>
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

        <section className={styles.finalCta}>
          <div className={`container fade-in ${styles.finalInner}`}>
            <h2>Ready to find your next pop-up opportunity?</h2>
            <div className={styles.finalButtons}>
              <Link href="/browse" className="btn btn--primary btn--lg">Find a place to sell</Link>
              <Link href="/signup" className="btn btn--secondary btn--lg">Create account</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
