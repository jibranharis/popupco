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
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coins,
  DollarSign,
  Flag,
  LayoutGrid,
  MapPin,
  Paintbrush,
  PlayCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Store,
  Utensils,
  Users,
  Zap,
} from 'lucide-react';
import styles from './page.module.css';

/* ─── Calendar Component ────────────────────────────────── */

function CalendarPicker({ selectedDates, setSelectedDates, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));

  const toggleDate = (date) => {
    if (!date) return;
    const exists = selectedDates.find(d => d.getTime() === date.getTime());
    if (exists) {
      setSelectedDates(selectedDates.filter(d => d.getTime() !== date.getTime()));
    } else {
      if (selectedDates.length >= 3) {
        setSelectedDates([...selectedDates.slice(1), date]);
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    }
  };

  const isSelected = (date) => date && selectedDates.some(d => d.getTime() === date.getTime());
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button className={styles.calendarNavBtn} onClick={(e) => { e.stopPropagation(); prevMonth(); }}><ChevronLeft size={16} /></button>
        <div className={styles.calendarMonthYear}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button className={styles.calendarNavBtn} onClick={(e) => { e.stopPropagation(); nextMonth(); }}><ChevronRight size={16} /></button>
      </div>
      <div className={styles.calendarGrid}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className={styles.calendarDayHeader}>{day}</div>
        ))}
        {days.map((date, idx) => (
          <button 
            key={idx} 
            className={`${styles.calendarDay} ${isSelected(date) ? styles.calendarDaySelected : ''} ${!date ? styles.calendarDayEmpty : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleDate(date); }}
            disabled={!date}
          >
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>
      <div className={styles.calendarFooter}>
        <span className={styles.calendarHint}>Select up to 3 days</span>
        <button className={styles.calendarApplyBtn} onClick={(e) => { e.stopPropagation(); onClose(); }}>Apply</button>
      </div>
    </div>
  );
}

/* ─── Static data ─────────────────────────────────────── */

const moments = [
  {
    title: 'Sell at a local market',
    copy: 'Find weekend markets, vendor fairs, and community events where your products can meet real local customers.',
    cta: 'Find markets',
    href: '/vendors?type=vendor-markets',
    image: '/images/use-case-1.jpg',
    icon: Store,
  },
  {
    title: 'Launch a product in person',
    copy: 'Test a new product with real shoppers before committing to a storefront, lease, or long-term retail plan.',
    cta: 'Find launch spaces',
    href: '/vendors?type=retail-spaces',
    image: '/images/use-case-2.jpg',
    icon: Zap,
  },
  {
    title: 'Sell art or handmade goods',
    copy: 'Discover art markets, maker fairs, gallery nights, and local events built for creative sellers.',
    cta: 'Find creative markets',
    href: '/vendors?category=artists-makers',
    image: '/images/use-case-3.jpg',
    icon: Paintbrush,
  },
  {
    title: 'Find food pop-up space',
    copy: 'Find markets, halls, patios, and event spaces that welcome food vendors, tastings, and small food concepts.',
    cta: 'Find food spaces',
    href: '/vendors?category=food',
    image: '/images/use-case-4.jpg',
    icon: Utensils,
  },
  {
    title: 'Book a community space',
    copy: 'Reserve halls, courtyards, storefronts, and local venues for pop-ups, workshops, and community events.',
    cta: 'Browse spaces',
    href: '/vendors?type=event-venues',
    image: '/images/use-case-5.jpg',
    icon: Users,
  },
  {
    title: 'Host a vendor market',
    copy: 'Bring vendors, artists, food sellers, and shoppers together with tools to collect applications and manage interest.',
    cta: 'Start hosting',
    href: '/apply/host',
    image: '/images/use-case-6.jpg',
    icon: Building2,
  },
  {
    title: 'List your venue',
    copy: 'Turn empty space into local activity by making your venue available for pop-ups, markets, and community events.',
    cta: 'List your space',
    href: '/apply/venue',
    image: '/images/use-case-7.jpg',
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
  ['Weekend vendor fair', 'Local makers selling in person', '/images/use-case-1.jpg'],
  ['Product launch table', 'A new brand testing demand', '/images/use-case-2.jpg'],
  ['Artist market', 'Original work, prints, and handmade goods', '/images/use-case-3.jpg'],
  ['Food vendor setup', 'Pop-up food, tastings, and prepared goods', '/images/use-case-4.jpg'],
  ['Community hall', 'A flexible space for local events', '/images/use-case-5.jpg'],
  ['Host-led market', 'Applications, vendors, and foot traffic', '/images/use-case-6.jpg'],
  ['Available venue', 'Empty space turned into opportunity', '/images/use-case-7.jpg'],
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
  const heroRef = useRef(null);
  const [activeTab, setActiveTab] = useState('sell');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  
  // States for all tabs
  const [location, setLocation] = useState('Bay Area, CA');
  const [category, setCategory] = useState('All categories');
  const [selectedDates, setSelectedDates] = useState([]);
  const [budget, setBudget] = useState('$75 – $250+');
  const [spaceType, setSpaceType] = useState('All types');
  const [size, setSize] = useState('Any size');
  const [duration, setDuration] = useState('Any duration');
  const [eventType, setEventType] = useState('All events');
  const [attendance, setAttendance] = useState('Any');
  const [fee, setFee] = useState('Any fee');

  const [activeMoment, setActiveMoment] = useState(0);
  useFadeInObserver(pageRef);

  // Fade hero out as user scrolls
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const heroH = heroRef.current.offsetHeight;
      const scrollY = window.scrollY;
      // Start fading at 20% through the hero, fully transparent at 70%
      const start = heroH * 0.2;
      const end = heroH * 0.7;
      const opacity = scrollY <= start ? 1 : scrollY >= end ? 0 : 1 - (scrollY - start) / (end - start);
      setHeroOpacity(opacity);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dateValue = selectedDates.length > 0 
    ? selectedDates.map(d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })).join(', ') 
    : 'Any weekend';

  // Configuration for dynamic search bar rendering
  const searchConfig = {
    sell: {
      fields: [
        { id: 'location', label: 'LOCATION', value: location, isDefault: location === 'Bay Area, CA', icon: MapPin, options: ['Bay Area, CA', 'San Francisco', 'Oakland', 'San Jose'] },
        { id: 'category', label: 'CATEGORY', value: category, isDefault: category === 'All categories', icon: LayoutGrid, options: ['All categories', 'Retail spaces', 'Food pop-ups', 'Vendor markets'] },
        { id: 'date', label: 'DATE', value: dateValue, isDefault: selectedDates.length === 0, icon: CalendarDays, options: [] },
        { id: 'budget', label: 'BUDGET', value: budget, isDefault: budget === '$75 – $250+', icon: DollarSign, options: ['$75 – $250+', 'Under $100', '$100 - $500', 'Over $500'] },
      ],
      href: '/signup?type=vendor'
    },
    space: {
      fields: [
        { id: 'location', label: 'LOCATION', value: location, isDefault: location === 'Bay Area, CA', icon: MapPin, options: ['Bay Area, CA', 'San Francisco', 'Oakland', 'San Jose'] },
        { id: 'spaceType', label: 'SPACE TYPE', value: spaceType, isDefault: spaceType === 'All types', icon: Building2, options: ['All types', 'Retail storefront', 'Event space', 'Shared space', 'Warehouse/Industrial', 'Outdoor market'] },
        { id: 'size', label: 'SIZE', value: size, isDefault: size === 'Any size', icon: LayoutGrid, options: ['Any size', 'Under 500 sq ft', '500 - 1000 sq ft', 'Over 1000 sq ft'] },
        { id: 'duration', label: 'DURATION', value: duration, isDefault: duration === 'Any duration', icon: Clock3, options: ['Any duration', 'Daily', 'Weekly', 'Monthly'] },
      ],
      href: '/signup?type=venue'
    },
    host: {
      fields: [
        { id: 'location', label: 'LOCATION', value: location, isDefault: location === 'Bay Area, CA', icon: MapPin, options: ['Bay Area, CA', 'San Francisco', 'Oakland', 'San Jose'] },
        { id: 'eventType', label: 'EVENT TYPE', value: eventType, isDefault: eventType === 'All events', icon: LayoutGrid, options: ['All events', 'Vendor Market', 'Art Fair', 'Food Festival', 'Showcase'] },
        { id: 'attendance', label: 'ATTENDANCE', value: attendance, isDefault: attendance === 'Any', icon: Users, options: ['Any', 'Under 100', '100-500', '500-1000', '1000+'] },
        { id: 'fee', label: 'VENDOR FEE', value: fee, isDefault: fee === 'Any fee', icon: DollarSign, options: ['Any fee', 'Under $50', '$50-$100', '$100-$200', '$200+'] },
      ],
      href: '/signup?type=host'
    }
  };

  const currentConfig = searchConfig[activeTab];

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

        {/* ── STICKY CINEMATIC HERO ───────────────────── */}
        <div className={styles.introScroll} ref={heroRef}>
          <section className={styles.hero} style={{ opacity: heroOpacity }}>
            {/* Full-bleed background image */}
            <Image
              src="/images/hero-market-cinematic.jpg"
              alt="Warm sunny pop-up market with string lights and white vendor tents"
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
              </div>
            </div>

            {/* ── Floating search panel ── */}
            <div className={styles.heroPanel}>
              <div className="container">
                <div className={styles.searchPanelContainer}>
                  {/* Search Tabs */}
                  <div className={styles.searchTabs}>
                    <button 
                      className={`${styles.searchTab} ${activeTab === 'sell' ? styles.searchTabActive : ''}`}
                      onClick={() => setActiveTab('sell')}
                    >
                      Find a place to sell
                    </button>
                    <button 
                      className={`${styles.searchTab} ${activeTab === 'space' ? styles.searchTabActive : ''}`}
                      onClick={() => setActiveTab('space')}
                    >
                      List your space
                    </button>
                    <button 
                      className={`${styles.searchTab} ${activeTab === 'host' ? styles.searchTabActive : ''}`}
                      onClick={() => setActiveTab('host')}
                    >
                      Host a pop-up
                    </button>
                  </div>

                <div className={styles.searchBar}>
                  {currentConfig.fields.map((field, idx) => (
                    <div key={field.id} className={styles.searchFieldGroup}>
                      <div 
                        className={styles.searchFieldWrapper}
                        onMouseEnter={() => { if (field.id === 'location' || field.id === 'date' || field.id === 'spaceType') setActiveDropdown(field.id); }}
                        onMouseLeave={() => { if (field.id === 'location' || field.id === 'date' || field.id === 'spaceType') setActiveDropdown(null); }}
                      >
                        <div 
                          className={`${styles.searchField} ${field.id !== 'location' && field.id !== 'date' && field.id !== 'spaceType' ? styles.searchFieldTypable : ''}`}
                        >
                          <field.icon size={18} className={styles.fieldIcon} />
                          <div className={styles.fieldContent}>
                            <span className={styles.fieldLabel}>{field.label}</span>
                            {field.id === 'location' || field.id === 'date' || field.id === 'spaceType' ? (
                              <span className={`${styles.fieldValue} ${!field.isDefault ? styles.textActive : ''}`}>{field.value}</span>
                            ) : (
                              <input 
                                type="text"
                                className={`${styles.fieldInput} ${!field.isDefault ? styles.textActive : ''}`}
                                value={field.value}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (field.id === 'category') setCategory(val);
                                  else if (field.id === 'budget') setBudget(val);
                                  else if (field.id === 'size') setSize(val);
                                  else if (field.id === 'duration') setDuration(val);
                                  else if (field.id === 'eventType') setEventType(val);
                                  else if (field.id === 'attendance') setAttendance(val);
                                  else if (field.id === 'fee') setFee(val);
                                }}
                              />
                            )}
                          </div>
                          {(field.id === 'location' || field.id === 'date' || field.id === 'spaceType') && <ChevronDown size={16} className={styles.fieldChevron} />}
                        </div>
                        {(activeDropdown === field.id && (field.id === 'location' || field.id === 'spaceType')) && (
                          <div className={styles.dropdownMenu}>
                            {field.options.map(opt => (
                              <button key={opt} onClick={() => { 
                                if (field.id === 'location') setLocation(opt);
                                if (field.id === 'spaceType') setSpaceType(opt);
                                setActiveDropdown(null); 
                              }}>
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                        {activeDropdown === field.id && field.id === 'date' && (
                          <div className={`${styles.dropdownMenu} ${styles.dropdownMenuCalendar}`}>
                            <CalendarPicker 
                              selectedDates={selectedDates} 
                              setSelectedDates={setSelectedDates} 
                              onClose={() => setActiveDropdown(null)} 
                            />
                          </div>
                        )}
                      </div>
                      {idx < currentConfig.fields.length - 1 && <div className={styles.searchDivider} />}
                    </div>
                  ))}

                  <Link href={currentConfig.href} className={styles.searchBtn}>
                    <Search size={18} />
                    Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.overContent}>

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
                        <Image src={image} alt={`${label} for ${type}`} width={130} height={90} className={styles.filmImage} />
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
            <div className={`fade-in ${styles.messageCopy}`}>
              <span className="label">Clear conversations</span>
              <h2>Get the details before you commit.</h2>
              <p>Ask the right questions, get real answers, and move forward with confidence.</p>
              <ol className={styles.msgFeatures}>
                <li>
                  <span className={styles.msgFeatureNum}>1</span>
                  <div>
                    <strong>Event details</strong>
                    <p>Confirm key info like dates, booth fee, and what&apos;s included.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.msgFeatureNum}>2</span>
                  <div>
                    <strong>Attendance</strong>
                    <p>Understand expected foot traffic and your target audience.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.msgFeatureNum}>3</span>
                  <div>
                    <strong>Permits</strong>
                    <p>Learn what&apos;s required and who handles the paperwork.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.msgFeatureNum}>4</span>
                  <div>
                    <strong>Confirm fit</strong>
                    <p>Review everything and confirm it&apos;s the right match.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div className={`fade-in fade-in--d2 ${styles.messageChain}`}>
              {messages.map(([sender, text], index) => {
                const isVendor = sender === 'Vendor';
                const times = ['10:22 AM','10:23 AM','10:34 AM','10:36 AM','10:44 AM','10:46 AM','10:47 AM'];
                return (
                  <div
                    key={`${sender}-${index}`}
                    className={`${styles.messageBubble} ${isVendor ? styles.vendorMessage : styles.hostMessage}`}
                    style={{ '--message-index': index }}
                  >
                    {isVendor && <div className={styles.msgAvatar} data-role="V">V</div>}
                    <div className={styles.msgBubbleInner}>
                      <span className={styles.msgLabel}>{sender.toUpperCase()}</span>
                      <p>{text}</p>
                      <span className={styles.msgTime}>{times[index]}</span>
                    </div>
                    {!isVendor && <div className={styles.msgAvatar} data-role="H">H</div>}
                  </div>
                );
              })}
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

      </div>{/* end overContent */}

      </main>
      <Footer />
    </>
  );
}
