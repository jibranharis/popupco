'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users, Wifi, Truck, CalendarDays, ShieldCheck,
  CheckCircle, Star, ChevronRight, MapPin,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  ArrowRight, Package, Inbox, DollarSign,
} from 'lucide-react';
import styles from './VenueShowcaseSection.module.css';

/* ─── Left panel checklist ─── */
const checklistRows = [
  { Icon: Users,        label: 'Capacity',      value: '80 people' },
  { Icon: Wifi,         label: 'Amenities',      value: 'Wi-Fi, tables, sound system' },
  { Icon: Truck,        label: 'Load-in access', value: 'Street level' },
  { Icon: CalendarDays, label: 'Availability',   value: 'Weekends + evenings' },
  { Icon: ShieldCheck,  label: 'Rules',          value: 'Food vendors allowed' },
];

/* ─── Calendar ─── */
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const dateStates = {
  3: 'avail', 5: 'avail', 6: 'avail', 10: 'avail', 12: 'avail', 13: 'avail',
  17: 'avail', 19: 'avail', 20: 'avail', 24: 'avail', 26: 'avail', 27: 'avail',
  7: 'pending', 14: 'pending', 21: 'pending', 28: 'pending',
  1: 'booked', 2: 'booked', 8: 'booked', 9: 'booked', 15: 'booked', 16: 'booked',
  22: 'booked', 23: 'booked',
};

function CalendarGrid() {
  const cells = [];
  for (let d = 1; d <= 30; d++) cells.push(d);
  return (
    <div className={styles.calGrid}>
      {DAYS.map(d => <div key={d} className={styles.calDayName}>{d}</div>)}
      {cells.map(d => (
        <div
          key={d}
          className={[
            styles.calCell,
            dateStates[d] === 'avail'   ? styles.calAvail   : '',
            dateStates[d] === 'pending' ? styles.calPending : '',
            dateStates[d] === 'booked'  ? styles.calBooked  : '',
          ].filter(Boolean).join(' ')}
        >
          {d}
        </div>
      ))}
    </div>
  );
}

/* ── Slide 1: Listing Preview ── */
function SlideListingPreview() {
  return (
    <div className={styles.slide}>
      <div className={styles.listingCard}>
        <div className={styles.listingImgWrap}>
          <Image
            src="/venue-sunset-studio.png"
            alt="Sunset Creative Studio interior"
            fill
            sizes="460px"
            className={styles.listingImg}
          />
          <span className={styles.hostFitBadge}><Star size={11} /> Host fit 92%</span>
        </div>
        <div className={styles.listingBody}>
          <h3 className={styles.listingName}>Sunset Creative Studio</h3>
          <p className={styles.listingType}>Cafe &amp; event space · Downtown</p>
          <div className={styles.listingDetails}>
            {[
              { Icon: Users,        label: 'Capacity',     val: '80 people' },
              { Icon: Package,      label: 'Best for',     val: 'Markets, tastings, workshops' },
              { Icon: CalendarDays, label: 'Availability', val: 'Weekends + evenings' },
            ].map(({ Icon, label, val }) => (
              <div key={label} className={styles.detailItem}>
                <i className={styles.detailIcon}><Icon size={13} strokeWidth={2.2} /></i>
                <span className={styles.detailLabel}>{label}</span>
                <span className={styles.detailVal}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.matchedCard}>
        <span className={styles.matchedEyebrow}>Matched request</span>
        <div className={styles.matchedRow}>
          <div className={styles.matchedAvatar}><Inbox size={15} /></div>
          <div className={styles.matchedInfo}>
            <strong>Wellness Market</strong>
            <span>May 16–17 · 12 vendors</span>
          </div>
          <span className={styles.matchedPill}>Pending review</span>
          <ChevronRight size={15} className={styles.matchedArrow} />
        </div>
      </div>
    </div>
  );
}

/* ── Slide 2: Success Story — unified single card ── */
function SlideSuccessStory() {
  const metrics = [
    { value: '+18',    sub: 'inquiries',  label: 'first month' },
    { value: '6',      sub: 'events',     label: 'hosted' },
    { value: '$3,200', sub: 'earned',     label: 'first month' },
    { value: '4.9★',   sub: 'host',       label: 'rating' },
  ];
  return (
    <div className={styles.slide}>
      <div className={styles.successCard}>
        <div className={styles.successImgWrap}>
          <Image
            src="/venue-garden-house.png"
            alt="The Garden House interior"
            fill
            sizes="460px"
            className={styles.successImg}
          />
          <div className={styles.successImgGrad}>
            <strong className={styles.successVenueName}>The Garden House</strong>
            <span className={styles.successVenueLoc}><MapPin size={11} /> Los Angeles, CA</span>
          </div>
        </div>

        <div className={styles.successBody}>
          <blockquote className={styles.quote}>
            "We used to have long stretches of empty weekdays. PopUpCo helped us connect with amazing vendors and our weekends are now consistently booked."
          </blockquote>
          <p className={styles.quoteAttr}>— Maya P., Space Owner</p>
        </div>

        <div className={styles.metricsDivider} />

        <div className={styles.metricsRow}>
          {metrics.map(({ value, sub, label }) => (
            <div key={value} className={styles.metricCell}>
              <strong className={styles.metricVal}>{value}</strong>
              <span className={styles.metricSub}>{sub}</span>
              <span className={styles.metricLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Slide 3: Availability Calendar ── */
function SlideAvailability() {
  return (
    <div className={styles.slide}>
      <div className={styles.calCard}>
        <div className={styles.calHeader}>
          <button className={styles.calNav} aria-label="Previous month"><ChevronLeft size={14} /></button>
          <span className={styles.calTitle}>June 2025</span>
          <button className={styles.calNav} aria-label="Next month"><ChevronRightIcon size={14} /></button>
        </div>

        <CalendarGrid />

        <div className={styles.calLegend}>
          <span><span className={`${styles.legendDot} ${styles.legendAvail}`} /> Available</span>
          <span><span className={`${styles.legendDot} ${styles.legendPending}`} /> Pending</span>
          <span><span className={`${styles.legendDot} ${styles.legendBooked}`} /> Booked</span>
        </div>

        <div className={styles.calExplainer}>
          <p className={styles.calExplainerHead}>Make your availability clear.</p>
          <p className={styles.calExplainerBody}>Show hosts when you&apos;re free and what you allow — so the right people inquire with confidence.</p>
          <div className={styles.calBullets}>
            <span><CheckCircle size={12} /> Set your hours</span>
            <span><CheckCircle size={12} /> Control your rules</span>
            <span><CheckCircle size={12} /> Get quality requests</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SLIDES = [
  { id: 'listing',      label: 'Listing Preview',  Component: SlideListingPreview },
  { id: 'success',      label: 'Success Story',    Component: SlideSuccessStory },
  { id: 'availability', label: 'Availability',     Component: SlideAvailability },
];

/* ── Main export ── */
export default function VenueShowcaseSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % SLIDES.length);
        setAnimating(false);
      }, 240);
    }, 7500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = (idx) => {
    if (idx === active || animating) return;
    clearInterval(timerRef.current);
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 240);
    startTimer();
  };

  const { Component } = SLIDES[active];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.featureCard}>
          {/* LEFT panel — static */}
          <div className={styles.leftPanel}>
            <span className={styles.eyebrow}>HOST MATCH FIT</span>
            <h2 className={styles.headline}>Show hosts exactly why your space works.</h2>
            <p className={styles.subtext}>
              Complete your listing with the details hosts care about most — capacity, photos, rules, and availability.
            </p>

            <div className={styles.checklist}>
              {checklistRows.map(({ Icon, label, value }) => (
                <div key={label} className={styles.checkRow}>
                  <div className={styles.checkLeft}>
                    <i className={styles.checkIcon}><Icon size={14} strokeWidth={2.2} /></i>
                    <span className={styles.checkLabel}>{label}</span>
                  </div>
                  <div className={styles.checkRight}>
                    <span className={styles.checkValue}>{value}</span>
                    <span className={styles.checkMark}><CheckCircle size={13} /></span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.strengthWrap}>
              <div className={styles.strengthLabel}>
                <span>Listing strength</span>
                <strong>85%</strong>
              </div>
              <div className={styles.strengthTrack}>
                <div className={styles.strengthFill} style={{ width: '85%' }} />
              </div>
            </div>

            <Link href="/apply/venue" className={styles.ctaBtn}>
              Start your listing <ArrowRight size={15} />
            </Link>
          </div>

          {/* RIGHT panel — rotating */}
          <div className={styles.rightPanel}>
            <div className={[styles.slideWrap, animating ? styles.slideOut : styles.slideIn].join(' ')}>
              <Component />
            </div>
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
      </div>
    </section>
  );
}
