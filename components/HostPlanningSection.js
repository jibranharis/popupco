'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, Mail, Settings, TrendingUp, ArrowRight,
  MapPin, Calendar, CheckCircle, Circle
} from 'lucide-react';
import styles from './HostPlanningSection.module.css';

/* ─── Static Data ─── */
const features = [
  { Icon: Search,     label: 'Find the right space', desc: 'Filter by location, capacity, and amenities.' },
  { Icon: Mail,       label: 'Invite vendors',       desc: 'Send invites and manage applications.' },
  { Icon: Settings,   label: 'Manage details',       desc: 'Setup, rules, schedule, and logistics.' },
  { Icon: TrendingUp, label: 'Promote your event',   desc: 'Share your event and grow your audience.' },
];

const EVENT_STATES = [
  {
    name: "Sunset Wellness Market",
    date: "May 16–17, 2025",
    time: "10:00 AM – 6:00 PM",
    location: "Sunset Creative Studio, Los Angeles, CA",
    statusText: "Upcoming",
    statusClass: styles.pillUpcoming,
    stats: [
      { value: '12', label: 'Vendors' },
      { value: '80', label: 'Expected' },
      { value: '2',  label: 'Days' },
      { value: '92%', label: 'Space fit' },
    ],
    image: '/wellness_market_1781679610904.png'
  },
  {
    name: "Downtown Maker Fair",
    date: "June 7, 2025",
    time: "11:00 AM – 7:00 PM",
    location: "The Garden House, Pasadena, CA",
    statusText: "Planning",
    statusClass: styles.pillPlanning,
    stats: [
      { value: '18', label: 'Vendors' },
      { value: '140', label: 'Expected' },
      { value: '1',  label: 'Day' },
      { value: '76%', label: 'Ready' },
    ],
    image: '/maker_fair_1781679621760.png'
  },
  {
    name: "Weekend Food Pop-Up",
    date: "June 21–22, 2025",
    time: "12:00 PM – 8:00 PM",
    location: "Northline Commons, Long Beach, CA",
    statusText: "Vendor review",
    statusClass: styles.pillReview,
    stats: [
      { value: '9',  label: 'Vendors' },
      { value: '220', label: 'Expected' },
      { value: '2',  label: 'Days' },
      { value: '64%', label: 'Ready' },
    ],
    image: '/food_popup_1781679634504.png'
  },
  {
    name: "Summer Style Market",
    date: "July 13, 2025",
    time: "10:00 AM – 5:00 PM",
    location: "Walnut Street Hall, Santa Monica, CA",
    statusText: "Confirmed",
    statusClass: styles.pillConfirmed,
    stats: [
      { value: '15', label: 'Vendors' },
      { value: '180', label: 'Expected' },
      { value: '1',  label: 'Day' },
      { value: '100%', label: 'Ready' },
    ],
    image: '/style_market_1781679645733.png'
  }
];

const INITIAL_CHECKLIST = [
  { id: 1, label: 'Book your space', status: 'Booked', checked: true },
  { id: 2, label: 'Invite vendors', status: '8 invited', checked: true },
  { id: 3, label: 'Review applications', status: '5 new', checked: false },
  { id: 4, label: 'Confirm logistics', status: 'In progress', checked: false },
  { id: 5, label: 'Set up payments', status: 'Not started', checked: false },
  { id: 6, label: 'Promote your event', status: 'Not started', checked: false },
];

export default function HostPlanningSection() {
  /* ── State ── */
  const [activeEventIdx, setActiveEventIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  /* ── Event Rotation Effect ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveEventIdx(prev => (prev + 1) % EVENT_STATES.length);
        setAnimating(false);
      }, 400); // Wait for fade out
    }, 6000); // Rotate every 6s

    return () => clearInterval(interval);
  }, []);

  /* ── Checklist Logic ── */
  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const completedCount = checklist.filter(item => item.checked).length;
  const totalCount = checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const activeEvent = EVENT_STATES[activeEventIdx];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.featureCard}>
          
          {/* LEFT PANEL */}
          <div className={styles.leftPanel}>
            <div className={styles.eyebrowContainer}>
              <div className={styles.badge}>1</div>
              <span className={styles.eyebrow}>PLAN WITH CONFIDENCE</span>
            </div>
            <h2 className={styles.headline}>Everything you need to plan the perfect pop-up.</h2>
            <p className={styles.subtext}>
              From finding the right space to managing vendors and guests, PopUpCo keeps every detail in one place.
            </p>

            <div className={styles.featureList}>
              {features.map((feat) => {
                const Icon = feat.Icon;
                return (
                  <div key={feat.label} className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className={styles.featureText}>
                      <span className={styles.featureLabel}>{feat.label}</span>
                      <span className={styles.featureDesc}>{feat.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/apply/venue" className={styles.ctaBtn}>
              Start planning your pop-up <ArrowRight size={15} />
            </Link>
          </div>

          {/* RIGHT PANEL */}
          <div className={styles.rightPanel}>
            
            {/* Top Module: Event Overview */}
            <div className={styles.overviewCard}>
              <div className={styles.overviewHeader}>Event overview</div>
              
              <div className={`${styles.eventStrip} ${animating ? styles.animating : ''}`}>
                <div className={styles.eventInfo}>
                  <div className={styles.eventTitleRow}>
                    <h3 className={styles.eventName}>{activeEvent.name}</h3>
                    <span className={`${styles.statusPill} ${activeEvent.statusClass}`}>
                      {activeEvent.statusText}
                    </span>
                  </div>
                  
                  <div className={styles.eventMeta}>
                    <div className={styles.metaRow}>
                      <Calendar size={14} className={styles.metaIcon} />
                      <span>{activeEvent.date} &nbsp;·&nbsp; {activeEvent.time}</span>
                    </div>
                    <div className={styles.metaRow}>
                      <MapPin size={14} className={styles.metaIcon} />
                      <span>{activeEvent.location}</span>
                    </div>
                  </div>

                  <div className={styles.eventStats}>
                    {activeEvent.stats.map(stat => (
                      <div key={stat.label} className={styles.statBlock}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={styles.eventImage}>
                  <Image 
                    src={activeEvent.image} 
                    alt={activeEvent.name} 
                    fill 
                    className={styles.eventImg}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Module: Planning Checklist */}
            <div className={styles.checklistCard}>
              <div className={styles.checklistHeader}>
                <div className={styles.checklistTitle}>Planning checklist</div>
                <div className={styles.checklistProgressWrap}>
                  <span className={styles.progressText}>{completedCount} of {totalCount} completed</span>
                  <div className={styles.progressBarBg}>
                    <div 
                      className={styles.progressBarFill} 
                      style={{ width: `${progressPercent}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className={styles.checklistItems}>
                {checklist.map(item => (
                  <div 
                    key={item.id} 
                    className={`${styles.checklistItem} ${item.checked ? styles.itemChecked : ''}`}
                    onClick={() => toggleCheck(item.id)}
                  >
                    <div className={styles.itemIcon}>
                      {item.checked ? <CheckCircle size={18} /> : <Circle size={18} />}
                    </div>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemStatus}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
