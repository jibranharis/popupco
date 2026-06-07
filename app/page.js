'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OpportunityCard from '@/components/OpportunityCard';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  Clock3,
  Coins,
  DollarSign,
  FileText,
  Flag,
  Info,
  LayoutGrid,
  MapPin,
  MessageSquare,
  Paintbrush,
  PlayCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Send,
  Store,
  Utensils,
  Users,
  Zap,
} from 'lucide-react';
import styles from './page.module.css';

/* ─── Static data ─────────────────────────────────────── */

const moments = [
  {
    title: 'Sell at a local market',
    copy: 'Find weekend markets, vendor fairs, and community events where your products can meet real local customers.',
    cta: 'Find markets',
    href: '/vendors?type=vendor-markets',
    image: '/hero-market.png',
    icon: Store,
  },
  {
    title: 'Launch a product in person',
    copy: 'Test a new product with real shoppers before committing to a storefront, lease, or long-term retail plan.',
    cta: 'Find launch spaces',
    href: '/vendors?type=retail-spaces',
    image: '/images/media__1779838728727.jpg',
    icon: Zap,
  },
  {
    title: 'Sell art or handmade goods',
    copy: 'Discover art markets, maker fairs, gallery nights, and local events built for creative sellers.',
    cta: 'Find creative markets',
    href: '/vendors?category=artists-makers',
    image: '/cat-jewelry.png',
    icon: Paintbrush,
  },
  {
    title: 'Find food pop-up space',
    copy: 'Find markets, halls, patios, and event spaces that welcome food vendors, tastings, and small food concepts.',
    cta: 'Find food spaces',
    href: '/vendors?category=food',
    image: '/cat-food.png',
    icon: Utensils,
  },
  {
    title: 'Book a community space',
    copy: 'Reserve halls, courtyards, storefronts, and local venues for pop-ups, workshops, and community events.',
    cta: 'Browse spaces',
    href: '/vendors?type=event-venues',
    image: '/images/media__1779838851661.jpg',
    icon: Users,
  },
  {
    title: 'Host a vendor market',
    copy: 'Bring vendors, artists, food sellers, and shoppers together with tools to collect applications and manage interest.',
    cta: 'Start hosting',
    href: '/apply/host',
    image: '/event-1.png',
    icon: Building2,
  },
  {
    title: 'List your venue',
    copy: 'Turn empty space into local activity by making your venue available for pop-ups, markets, and community events.',
    cta: 'List your space',
    href: '/apply/venue',
    image: '/images/media__1779840173203.jpg',
    icon: MapPin,
  },
];

const roles = [
  {
    title: "I'm a vendor",
    copy: 'Find markets, booths, spaces, and pop-up opportunities that match what you sell.',
    cta: 'Find opportunities',
    href: '/vendors',
    icon: Store,
  },
  {
    title: 'I have an empty venue',
    copy: 'List your space, set rules and availability, and connect with hosts or vendors.',
    cta: 'List your space',
    href: '/apply/venue',
    icon: Building2,
  },
  {
    title: "I'm a host",
    copy: 'Create pop-up events, recruit vendors, manage applications, and bring local experiences to life.',
    cta: 'Host a pop-up',
    href: '/apply/host',
    icon: Users,
  },
  {
    title: "I'm exploring events",
    copy: 'Discover local markets, food pop-ups, art shows, and community events near you.',
    cta: 'Explore events',
    href: '/upcoming',
    icon: CalendarDays,
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
  ['Booth fee', '$125', Store],
  ['Expected attendance', '400-600', Users],
  ['Application deadline', 'June 14', CalendarDays],
  ['Setup window', '8:00-9:30 AM', Clock3],
  ['Food permits', 'Required for prepared food', Utensils],
  ['Cancellation', 'Refundable up to 7 days before', RefreshCw],
];

const trustProps = [
  { icon: Flag,         title: 'Bay Area first',     sub: 'Local insights, local opportunities' },
  { icon: CheckCircle,  title: 'Curated venues',     sub: 'Quality spaces, handpicked' },
  { icon: Users,        title: 'Real hosts',          sub: 'Verified, responsive, and ready' },
  { icon: Coins,        title: 'Flexible budgets',   sub: 'Options for every size and stage' },
];

const convSteps = [
  {
    num: 1,
    icon: Info,
    title: 'Event details',
    desc: 'Confirm key info like dates, booth fee, and what\'s included.',
  },
  {
    num: 2,
    icon: Users,
    title: 'Attendance',
    desc: 'Understand expected foot traffic and your target audience.',
  },
  {
    num: 3,
    icon: FileText,
    title: 'Permits',
    desc: 'Learn what\'s required and who handles the paperwork.',
  },
  {
    num: 4,
    icon: CheckCircle,
    title: 'Confirm fit',
    desc: 'Review everything and confirm it\'s the right match.',
  },
];

/* ─── Observer hook ───────────────────────────────────── */

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

/* ─── Page ────────────────────────────────────────────── */

export default function HomePage() {
  const pageRef = useRef(null);
  const [activeMoment, setActiveMoment] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  useFadeInObserver(pageRef);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const timer = setInterval(() => {
      setActiveMoment((current) => (current + 1) % moments.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = window.innerHeight * 0.75;
      
      let opacity = 1;
      if (scrollY > fadeStart) {
        opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      }
      if (opacity < 0) opacity = 0;
      setHeroOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <main ref={pageRef} className={styles.page}>

        {/* ── STICKY CINEMATIC HERO ───────────────────── */}
        <div className={styles.introScroll}>
          <section className={styles.hero} style={{ opacity: heroOpacity }}>
            {/* Full-bleed background image */}
            <Image
              src="/hero-market.png"
              alt="Busy outdoor pop-up market with white tents, vendors, and crowds"
              fill
              priority
              className={styles.heroBg}
              sizes="100vw"
            />
            {/* Dark overlay gradient */}
            <div className={styles.heroOverlay} />

            <div className={`container ${styles.heroInner}`}>
              {/* ── Left hero copy ── */}
              <div className={styles.heroCopy}>
                <h1 className={styles.heroHeadline}>
                  Find your next<br />
                  Pop-Up<br />
                  Opportunity.
                </h1>
                <p className={styles.heroSub}>
                  The Bay Area&apos;s most trusted marketplace for pop-up<br className={styles.heroSubBr} />
                  spaces, vendors, and events.
                </p>
                <div className={styles.heroCtas}>
                  <Link href="/vendors" className={styles.ctaPrimary}>
                    Find Opportunities
                  </Link>
                  <Link href="#how-it-works" className={styles.ctaSecondary}>
                    <PlayCircle size={18} />
                    How it works
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Floating search + trust panel ── */}
            <div className={styles.heroPanel}>
              <div className="container">
                <div className={styles.searchBar}>
                  <div className={styles.searchField}>
                    <MapPin size={15} className={styles.fieldIcon} />
                    <div className={styles.fieldContent}>
                      <span className={styles.fieldLabel}>LOCATION</span>
                      <span className={styles.fieldValue}>Bay Area, CA</span>
                    </div>
                    <ChevronDown size={14} className={styles.fieldChevron} />
                  </div>
                  <div className={styles.searchDivider} />
                  <div className={styles.searchField}>
                    <LayoutGrid size={15} className={styles.fieldIcon} />
                    <div className={styles.fieldContent}>
                      <span className={styles.fieldLabel}>CATEGORY</span>
                      <span className={styles.fieldValue}>All categories</span>
                    </div>
                    <ChevronDown size={14} className={styles.fieldChevron} />
                  </div>
                  <div className={styles.searchDivider} />
                  <div className={styles.searchField}>
                    <CalendarDays size={15} className={styles.fieldIcon} />
                    <div className={styles.fieldContent}>
                      <span className={styles.fieldLabel}>DATE</span>
                      <span className={styles.fieldValue}>Any weekend</span>
                    </div>
                    <ChevronDown size={14} className={styles.fieldChevron} />
                  </div>
                  <div className={styles.searchDivider} />
                  <div className={styles.searchField}>
                    <DollarSign size={15} className={styles.fieldIcon} />
                    <div className={styles.fieldContent}>
                      <span className={styles.fieldLabel}>BUDGET</span>
                      <span className={styles.fieldValue}>$75 – $250+</span>
                    </div>
                    <ChevronDown size={14} className={styles.fieldChevron} />
                  </div>
                  <Link href="/vendors" className={styles.searchBtn}>
                    <Search size={16} />
                    Search
                  </Link>
                </div>

                {/* Trust props row */}
                <div className={styles.trustRow}>
                  {trustProps.map(({ icon: Icon, title, sub }) => (
                    <div key={title} className={styles.trustItem}>
                      <span className={styles.trustIcon}><Icon size={16} /></span>
                      <div>
                        <strong>{title}</strong>
                        <span>{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── BROWSE BY MOMENT ───────────────────────── */}
        <section className={styles.momentsSection}>
          <div className={`container ${styles.momentsShell}`}>
            <div className={`fade-in ${styles.sectionIntro}`}>
              <span className="label">Browse by moment</span>
              <h2>A Pop-Up For Every Idea.</h2>
              <p>Explore the different ways vendors, venues, and hosts can bring local commerce to life.</p>
            </div>

            <div className={styles.momentsGrid}>
              <div className={`fade-in ${styles.momentTabs}`}>
                {moments.map((moment, index) => {
                  const MomentIcon = moment.icon;
                  return (
                    <Link
                      key={moment.title}
                      href={moment.href}
                      className={`${styles.momentOption} ${activeMoment === index ? styles.activeMoment : ''}`}
                      style={{ '--moment-index': index }}
                      onMouseEnter={() => setActiveMoment(index)}
                      onFocus={() => setActiveMoment(index)}
                      onClick={() => setActiveMoment(index)}
                    >
                      <span className={styles.momentNum}>{String(index + 1).padStart(2, '0')}</span>
                      <span className={styles.momentIcon}><MomentIcon size={14} /></span>
                      {moment.title}
                    </Link>
                  );
                })}
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

        {/* ── MESSAGE SECTION ────────────────────────── */}
        <section className={styles.messageSection}>
          <div className={`container ${styles.messageGrid}`}>

            {/* ─ Left: headline + 4-step process ─ */}
            <div className={`fade-in ${styles.messageCopy}`}>
              <span className="label">Clear conversations</span>
              <h2>Get the details before you commit.</h2>
              <p>Ask the right questions, get real answers, and move forward with confidence.</p>

              <div className={styles.convSteps}>
                {convSteps.map(({ num, icon: Icon, title, desc }, i) => (
                  <div
                    key={title}
                    className={`fade-in ${styles.convStep}`}
                    style={{ '--step-index': i }}
                  >
                    {/* Numbered badge */}
                    <div className={styles.convStepLeft}>
                      <span className={styles.convNum}>{num}</span>
                      {i < convSteps.length - 1 && <span className={styles.convLine} />}
                    </div>
                    {/* Icon + text */}
                    <div className={styles.convStepBody}>
                      <span className={styles.convStepIcon}><Icon size={16} /></span>
                      <div>
                        <strong>{title}</strong>
                        <p>{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─ Right: chat panel ─ */}
            <div className={`fade-in fade-in--d2 ${styles.chatPanel}`}>
              {/* Panel header */}
              <div className={styles.chatHeader}>
                <div className={styles.chatTabs}>
                  <button className={styles.chatTabActive}>Conversation</button>
                  <button className={styles.chatTab}>Event details</button>
                </div>
              </div>

              {/* Messages */}
              <div className={styles.messageChain}>
                {messages.map(([sender, text], index) => {
                  const isHost = sender === 'Host';
                  return (
                    <div
                      key={`${sender}-${index}`}
                      className={`${styles.messageRow} ${isHost ? styles.messageRowHost : styles.messageRowVendor}`}
                      style={{ '--message-index': index }}
                    >
                      {!isHost && (
                        <span className={styles.avatarVendor}>V</span>
                      )}
                      <div className={`${styles.messageBubble} ${isHost ? styles.hostMessage : styles.vendorMessage}`}>
                        <span>{sender.toUpperCase()}</span>
                        <p>{text}</p>
                      </div>
                      {isHost && (
                        <span className={styles.avatarHost}>H</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Compose footer */}
              <div className={styles.chatCompose}>
                <span className={styles.chatComposePlaceholder}>Write a message…</span>
                <button className={styles.chatSendBtn} aria-label="Send">
                  <Send size={15} />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ── ROLES SECTION ──────────────────────────── */}
        <section className={styles.rolesSection} id="how-it-works">
          <div className="container">
            <div className={`fade-in ${styles.sectionIntro} ${styles.roleIntro}`}>
              <span className="label">Start where you are</span>
              <h2>Choose how you want to use PopUpCo.</h2>
            </div>
            <div className={styles.roleGrid}>
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <Link
                    key={role.title}
                    href={role.href}
                    className={`fade-in ${styles.roleCard}`}
                    style={{ '--role-index': index }}
                  >
                    <span className={styles.roleIcon}><Icon size={28} strokeWidth={1.8} /></span>
                    <h3>{role.title}</h3>
                    <p>{role.copy}</p>
                    <span>{role.cta} <ArrowRight size={16} /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TRUST SECTION ──────────────────────────── */}
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
            <div className="fade-in fade-in--d2">
              <OpportunityCard />
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────────────── */}
        <section className={styles.finalCta}>
          <div className={`container fade-in ${styles.finalInner}`}>
            <h2>Ready to find your next pop-up opportunity?</h2>
            <div className={styles.finalButtons}>
              <Link href="/vendors" className="btn btn--primary btn--lg">Find a place to sell</Link>
              <Link href="/signup" className="btn btn--secondary btn--lg">Create account</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
