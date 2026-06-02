'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Store,
  CalendarDays,
  Users,
  MapPin,
  TrendingUp,
  CheckCircle,
  Building2,
  HeartHandshake
} from 'lucide-react';
import styles from './DiscoverPathsCarousel.module.css';

const paths = [
  {
    id: 'vendor',
    tabIcon: Store,
    tabLabel: 'I want to sell at an event',
    eyebrow: 'VENDORS',
    heading: 'I want to sell at an event',
    body: 'Browse vendor markets, booth opportunities, food pop-ups, and spaces currently accepting vendor interest. Find events that fit your products, audience, and goals.',
    cta: 'Browse vendor opportunities',
    href: '/vendors',
    image: '/images/path-vendor.png',
    benefits: [
      { icon: Users, label: 'Reach new customers' },
      { icon: CalendarDays, label: 'Flexible events and spaces' },
      { icon: TrendingUp, label: 'Grow your brand' },
      { icon: CheckCircle, label: 'Track and build your impact' }
    ]
  },
  {
    id: 'attendee',
    tabIcon: CalendarDays,
    tabLabel: 'I want to attend local pop-ups',
    eyebrow: 'EXPLORERS',
    heading: 'I want to attend local pop-ups',
    body: 'Find public markets, food events, brand pop-ups, and community experiences near you.',
    cta: 'View upcoming events',
    href: '/discover',
    image: '/images/path-attendee.png',
    benefits: [
      { icon: MapPin, label: 'Discover what’s nearby' },
      { icon: Store, label: 'Explore local brands' },
      { icon: HeartHandshake, label: 'Enjoy unique experiences' },
      { icon: Users, label: 'Support your community' }
    ]
  },
  {
    id: 'host',
    tabIcon: Users,
    tabLabel: 'I want to host a pop-up',
    eyebrow: 'HOSTS',
    heading: 'I want to host a pop-up',
    body: 'Start an event request, recruit vendors, and tell PopUpCo what you have in mind.',
    cta: 'Start host request',
    href: '/hosts',
    image: '/images/path-host.png',
    benefits: [
      { icon: Building2, label: 'Build your event vision' },
      { icon: Users, label: 'Recruit the right vendors' },
      { icon: CheckCircle, label: 'Manage details clearly' },
      { icon: HeartHandshake, label: 'Create community impact' }
    ]
  },
  {
    id: 'venue',
    tabIcon: MapPin,
    tabLabel: 'I have a venue or space',
    eyebrow: 'VENUES',
    heading: 'I have a venue or space',
    body: 'List your storefront, hall, cafe, studio, lot, or community space for pop-up use.',
    cta: 'Submit a venue',
    href: '/venues',
    image: '/images/path-venue.png',
    benefits: [
      { icon: Store, label: 'Fill unused space' },
      { icon: Users, label: 'Attract the right events' },
      { icon: CheckCircle, label: 'Set your rules clearly' },
      { icon: HeartHandshake, label: 'Build local partnerships' }
    ]
  }
];

export default function DiscoverPathsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((current) => (current + 1) % paths.length);
  const prev = () => setActiveIndex((current) => (current === 0 ? paths.length - 1 : current - 1));

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.mainContainer}>
        {/* Top Tabs */}
        <div className={styles.tabScrollWrapper}>
          <div className={styles.tabRow}>
            {paths.map((path, index) => {
              const Icon = path.tabIcon;
              const isActive = index === activeIndex;
              return (
                <button 
                  key={path.id}
                  className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <Icon size={16} className={styles.tabIcon} />
                  <span>{path.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Carousel Content */}
        <div className={styles.trackContainer}>
           {paths.map((path, index) => {
              let positionClass = styles.activeSlide;
              if (index === (activeIndex + 1) % paths.length) positionClass = styles.nextSlide;
              else if (index === (activeIndex === 0 ? paths.length - 1 : activeIndex - 1)) positionClass = styles.prevSlide;
              else positionClass = styles.hiddenSlide;

              // Only render slides that are visible or adjacent to save DOM weight
              if (positionClass === styles.hiddenSlide) return null;

              return (
                <div key={path.id} className={`${styles.slide} ${positionClass}`} onClick={() => {
                  if (positionClass === styles.prevSlide) prev();
                  if (positionClass === styles.nextSlide) next();
                }}>
                   <div className={styles.contentPanel}>
                     <span className={styles.eyebrow}>{path.eyebrow}</span>
                     <h3>{path.heading}</h3>
                     <p>{path.body}</p>
                     
                     <Link href={path.href} className={styles.ctaButton} onClick={(e) => {
                        // Prevent navigation if clicking on a background slide preview
                        if (positionClass !== styles.activeSlide) e.preventDefault();
                     }}>
                       {path.cta} <ArrowRight size={18} />
                     </Link>

                     <div className={styles.benefitsArea}>
                       <span className={styles.benefitsLabel}>What you get</span>
                       <div className={styles.benefitsGrid}>
                         {path.benefits.map((benefit, i) => {
                           const BIcon = benefit.icon;
                           return (
                             <div key={i} className={styles.benefitItem}>
                               <span className={styles.benefitIconWrap}>
                                 <BIcon size={18} />
                               </span>
                               <span className={styles.benefitText}>{benefit.label}</span>
                             </div>
                           )
                         })}
                       </div>
                     </div>
                   </div>
                   <div className={styles.imagePanel}>
                     <Image src={path.image} alt={path.heading} fill className={styles.slideImage} sizes="(max-width: 1024px) 100vw, 600px" />
                   </div>
                </div>
              );
           })}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
           <button onClick={prev} className={styles.arrowBtn} aria-label="Previous path"><ChevronLeft size={24} /></button>
           <div className={styles.dots}>
             {paths.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setActiveIndex(i)} 
                 className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`} 
                 aria-label={`Go to path ${i+1}`} 
               />
             ))}
           </div>
           <button onClick={next} className={styles.arrowBtn} aria-label="Next path"><ChevronRight size={24} /></button>
         </div>
      </div>
    </div>
  );
}
