'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Wifi,
  Truck,
  CalendarDays,
  ShieldCheck,
  CheckCircle,
  Star,
  TrendingUp,
  ChevronRight,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  ArrowRight,
  Package,
  DollarSign,
  Eye,
  Settings,
  Inbox,
} from 'lucide-react';
import styles from './VenueShowcaseSection.module.css';

/* ─── Left panel checklist data ─── */
const checklistRows = [
  { Icon: Users,       label: 'Capacity',       value: '80 people' },
  { Icon: Wifi,        label: 'Amenities',       value: 'Wi-Fi, tables, sound system' },
  { Icon: Truck,       label: 'Load-in access',  value: 'Street level' },
  { Icon: CalendarDays,label: 'Availability',    value: 'Weekends + evenings' },
  { Icon: ShieldCheck, label: 'Rules',           value: 'Food vendors allowed' },
];

/* ─── Bottom benefit cards ─── */
const benefits = [
  {
    Icon: Package,
    title: 'Fill unused space',
    body:  'Turn quiet days into local commerce opportunities.',
  },
  {
    Icon: Eye,
    title: 'Review the right fit',
    body:  'See host requests before you approve anything.',
  },
  {
    Icon: Settings,
    title: 'Stay in control',
    body:  'Set rules, availability, and booking expectations upfront.',
  },
];

/* ─── Calendar helpers ─── */
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const JUNE_2025_OFFSET = 0; // June 1 is a Sunday in 2025

const dateStates = {
  // available: soft green
  3: 'avail', 5: 'avail', 6: 'avail', 10: 'avail', 12: 'avail', 13: 'avail',
  17: 'avail', 19: 'avail', 20: 'avail', 24: 'avail', 26: 'avail', 27: 'avail',
  // pending: soft peach
  7: 'pending', 14: 'pending', 21: 'pending', 28: 'pending',
  // booked: deeper terracotta
  1: 'booked', 2: 'booked', 8: 'booked', 9: 'booked', 15: 'booked', 16: 'booked',
  22: 'booked', 23: 'booked',
};

function CalendarGrid() {
  const totalDays = 30;
  const cells = [];
  for (let i = 0; i < JUNE_2025_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  return (
    <div className={styles.calGrid}>
      {DAYS.map(d => <div key={d} className={styles.calDayName}>{d}</div>)}
      {cells.map((d, i) =>
        d === null
          ? <div key={`e${i}`} />
          : (
            <div
              key={d}
              className={[
                styles.calCell,
                dateStates[d] === 'avail'   ? styles.calAvail   : '',
                dateStates[d] === 'pending' ? styles.calPending : '',
                dateStates[d] === 'booked'  ? styles.calBooked  : '',
              ].join(' ')}
            >
              {d}
            </div>
          )
      )}
    </div>
  );
}

/* ─── Carousel slide content ─── */

function SlideListingPreview() {
  return (
    <div className={styles.slide}>
      {/* Listing card */}
      <div className={styles.listingCard}>
        <div className={styles.listingImgWrap}>
          <Image
            src="/venue-sunset-studio.png"
            alt="Sunset Creative Studio interior"
            fill
            sizes="(max-width: 900px) 100vw, 460px"
            className={styles.listingImg}
          />
          <span className={styles.hostFitBadge}>
            <Star size={12} /> Host fit 92%
          </span>
        </div>
        <div className={styles.listingBody}>
          <div className={styles.listingMeta}>
            <h3 className={styles.listingName}>Sunset Creative Studio</h3>
            <p className={styles.listingType}>Cafe &amp; event space · Downtown</p>
          </div>
          <div className={styles.listingDetails}>
            {[
              { Icon: Users,        label: 'Capacity',     val: '80 people' },
              { Icon: Package,      label: 'Best for',     val: 'Markets, tastings, workshops' },
              { Icon: CalendarDays, label: 'Availability', val: 'Weekends + evenings' },
            ].map(({ Icon, label, val }) => (
              <div key={label} className={styles.detailItem}>
                <i className={styles.detailIcon}><Icon size={14} strokeWidth={2.2} /></i>
                <span className={styles.detailLabel}>{label}</span>
                <span className={styles.detailVal}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Matched request */}
      <div className={styles.matchedCard}>
        <span className={styles.matchedEyebrow}>Matched request</span>
        <div className={styles.matchedRow}>
          <div className={styles.matchedAvatar}>
            <Inbox size={16} />
          </div>
          <div className={styles.matchedInfo}>
            <strong>Wellness Market</strong>
            <span>May 16–17 · 12 vendors</span>
          </div>
          <span className={styles.matchedPill}>Pending review</span>
          <ChevronRight size={16} className={styles.matchedArrow} />
        </div>
      </div>
    </div>
  );
}

function SlideSuccessStory() {
  const metrics = [
    { value: '+18',    label: 'inquiries\nin first month',  Icon: Inbox },
    { value: '6',      label: 'events\nhosted',            Icon: CalendarDays },
    { value: '$3,200', label: 'earned\nin first month',    Icon: DollarSign },
    { value: '4.9★',   label: 'host\nrating',             Icon: Star },
  ];
  return (
    <div className={styles.slide}>
      <div className={styles.successCard}>
        <div className={styles.successImgWrap}>
          <Image
            src="/venue-garden-house.png"
            alt="The Garden House interior"
            fill
            sizes="(max-width: 900px) 100vw, 460px"
            className={styles.successImg}
          />
          <div className={styles.successImgOverlay}>
            <div className={styles.venueName}>
              <strong>The Garden House</strong>
              <span><MapPin size={12} /> Los Angeles, CA</span>
            </div>
          </div>
        </div>
        <div className={styles.successBody}>
          <blockquote className={styles.quote}>
            "We used to have long stretches of empty weekdays. PopUpCo helped us connect with amazing vendors and our weekends are now consistently booked."
          </blockquote>
          <p className={styles.quoteAttr}>— Maya P., Space Owner</p>
        </div>
      </div>
      <div className={styles.metricsRow}>
        {metrics.map(({ value, label, Icon }) => (
          <div key={value} className={styles.metricCell}>
            <strong className={styles.metricVal}>{value}</strong>
            <span className={styles.metricLabel}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideAvailability() {
  return (
    <div className={styles.slide}>
      <div className={styles.calCard}>
        <div className={styles.calHeader}>
          <button className={styles.calNav} aria-label="Previous month">
            <ChevronLeft size={16} />
          </button>
          <span className={styles.calTitle}>June 2025</span>
          <button className={styles.calNav} aria-label="Next month">
            <ChevronRightIcon size={16} />
          </button>
        </div>
        <CalendarGrid />
        <div className={styles.calLegend}>
          <span className={styles.legendDot + ' ' + styles.legendAvail} /> Available
          <span className={styles.legendDot + ' ' + styles.legendPending} /> Pending
          <span className={styles.legendDot + ' ' + styles.legendBooked} /> Booked
        </div>
      </div>
      <div className={styles.calExplainer}>
        <h4 className={styles.calExplainerHead}>Make your availability clear and your bookings consistent.</h4>
        <p className={styles.calExplainerBody}>Show hosts when your space is free, what you allow, and how you operate — so planning their pop-up is effortless.</p>
        <ul className={styles.calBullets}>
          <li><CheckCircle size={13} /> Set your hours and seasonal windows</li>
          <li><CheckCircle size={13} /> Control your rules and venue requirements</li>
          <li><CheckCircle size={13} /> Attract quality requests that fit your space</li>
        </ul>
      </div>
    </div>
  );
}

const SLIDES = [
  { id: 'listing',      label: 'Listing Preview',  Component: SlideListingPreview },
  { id: 'success',      label: 'Success Story',    Component: SlideSuccessStory },
  { id: 'availability', label: 'Availability',     Component: SlideAvailability },
];

/* ─── Main component ─── */
export default function VenueShowcaseSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (idx === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 220);
  };

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % SLIDES.length);
        setAnimating(false);
      }, 220);
    }, 5200);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = (idx) => {
    clearInterval(timerRef.current);
    goTo(idx);
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % SLIDES.length);
        setAnimating(false);
      }, 220);
    }, 5200);
  };

  const { Component } = SLIDES[active];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        {/* ── Outer feature card ── */}
        <div className={styles.featureCard}>
          {/* LEFT panel */}
          <div className={styles.leftPanel}>
            <span className={styles.eyebrow}>HOST MATCH FIT</span>
            <h2 className={styles.headline}>Show hosts exactly why your space works.</h2>
            <p className={styles.subtext}>
              Complete your listing with the details hosts care about most — capacity, photos, rules, availability, and setup needs — so the right pop-ups can find you.
            </p>

            {/* Checklist */}
            <div className={styles.checklist}>
              {checklistRows.map(({ Icon, label, value }) => (
                <div key={label} className={styles.checkRow}>
                  <i className={styles.checkIcon}><Icon size={15} strokeWidth={2.2} /></i>
                  <span className={styles.checkLabel}>{label}</span>
                  <em className={styles.checkDots} aria-hidden="true" />
                  <span className={styles.checkValue}>{value}</span>
                  <span className={styles.checkMark}><CheckCircle size={14} /></span>
                </div>
              ))}
            </div>

            {/* Listing strength bar */}
            <div className={styles.strengthWrap}>
              <div className={styles.strengthLabel}>
                <span>Listing strength</span>
                <strong>85%</strong>
              </div>
              <div className={styles.strengthTrack}>
                <div className={styles.strengthFill} style={{ width: '85%' }} />
              </div>
            </div>

            {/* CTA */}
            <Link href="/apply/venue" className={styles.ctaBtn}>
              Start your listing <ArrowRight size={16} />
            </Link>
          </div>

          {/* RIGHT panel — carousel */}
          <div className={styles.rightPanel}>
            {/* Slide content */}
            <div className={[styles.slideWrap, animating ? styles.slideOut : styles.slideIn].join(' ')}>
              <Component />
            </div>

            {/* Dots */}
            <div className={styles.dots} role="tablist" aria-label="Carousel navigation">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={s.label}
                  className={[styles.dot, i === active ? styles.dotActive : ''].join(' ')}
                  onClick={() => resetTimer(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom benefit strip ── */}
        <div className={styles.benefitStrip}>
          {benefits.map(({ Icon, title, body }) => (
            <div key={title} className={styles.benefitItem}>
              <div className={styles.benefitIcon}><Icon size={20} /></div>
              <div className={styles.benefitText}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
