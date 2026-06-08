'use client';

import { useState, useEffect } from 'react';
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
  HeartHandshake,
  Sparkles,
  Sprout,
  Target
} from 'lucide-react';
import styles from './DiscoverPathsCarousel.module.css';

const paths = [
  {
    id: 'vendor',
    tabIcon: Store,
    tabLabel: 'I want to sell at an event',
    eyebrow: 'VENDORS',
    heading: 'I want to sell at an event',
    body: 'Browse vendor markets, booth opportunities, food pop-ups, and spaces currently accepting vendor interest.',
    cta: 'Browse vendor opportunities',
    href: '/vendors',
    image: '/images/path-vendor.png',
    benefits: [
      { icon: Users, label: 'Reach new customers' },
      { icon: CalendarDays, label: 'Flexible events' },
      { icon: TrendingUp, label: 'Grow your brand' },
      { icon: CheckCircle, label: 'Track your impact' }
    ],
    whyWorks: [
      {
        icon: TrendingUp,
        title: 'Real exposure, real sales',
        copy: 'Get in front of curated, ready-to-buy audiences at local events.'
      },
      {
        icon: CalendarDays,
        title: 'Your schedule, your terms',
        copy: 'Choose events that fit your calendar, product type, and growth goals.'
      },
      {
        icon: Sparkles,
        title: 'Built to help vendors grow',
        copy: 'Simple tools to apply, track, and build a strong event presence.'
      }
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
    href: '/upcoming',
    image: '/images/path-attendee.png',
    benefits: [
      { icon: MapPin, label: 'Discover nearby events' },
      { icon: Store, label: 'Explore local brands' },
      { icon: HeartHandshake, label: 'Unique experiences' },
      { icon: Users, label: 'Support community' }
    ],
    whyWorks: [
      {
        icon: MapPin,
        title: 'Hyper-local discovery',
        copy: 'Find events happening in your neighborhood, not just your city.'
      },
      {
        icon: Store,
        title: 'Shop independent brands',
        copy: 'Discover makers, chefs, and creators you won\'t find anywhere else.'
      },
      {
        icon: HeartHandshake,
        title: 'Community-first experiences',
        copy: 'Every event is built around real people and real local culture.'
      }
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
      { icon: Building2, label: 'Build your vision' },
      { icon: Users, label: 'Recruit vendors' },
      { icon: CheckCircle, label: 'Manage clearly' },
      { icon: HeartHandshake, label: 'Community impact' }
    ],
    whyWorks: [
      {
        icon: Building2,
        title: 'From idea to event day',
        copy: 'Guided tools to plan, recruit, and run your pop-up with confidence.'
      },
      {
        icon: Users,
        title: 'The right vendors, fast',
        copy: 'Browse and connect with vendors who fit your event theme and audience.'
      },
      {
        icon: Sparkles,
        title: 'Make a lasting impression',
        copy: 'Host events that build your brand and bring your community together.'
      }
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
      { icon: Sprout, label: 'Fill unused space' },
      { icon: Target, label: 'Attract right audience' },
      { icon: CheckCircle, label: 'Set your own terms' },
      { icon: HeartHandshake, label: 'Build local connections' }
    ],
    whyWorks: [
      {
        icon: Sprout,
        title: 'Turn idle space into real opportunity',
        copy: 'Earn income and support local creators — on your terms.'
      },
      {
        icon: Users,
        title: 'Bring the right people to you',
        copy: 'Connect with curated vendors, hosts, and engaged communities.'
      },
      {
        icon: Sparkles,
        title: 'Designed for easy, impactful hosting',
        copy: 'Simple tools and guidance from listing to pop-up day.'
      }
    ]
  }
];

export default function DiscoverPathsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((current) => (current + 1) % paths.length);
  const prev = () => setActiveIndex((current) => (current === 0 ? paths.length - 1 : current - 1));
  const activateSlide = (positionClass) => {
    if (positionClass === styles.prevSlide) prev();
    if (positionClass === styles.nextSlide) next();
  };
  const handleSlideKeyDown = (event, positionClass) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateSlide(positionClass);
    }
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % paths.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activePath = paths[activeIndex];

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
                  <Icon size={15} className={styles.tabIcon} />
                  <span>{path.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Content */}
        <div className={styles.trackContainer}>
           {paths.map((path, index) => {
              let positionClass;
              if (index === activeIndex) positionClass = styles.activeSlide;
              else if (index === (activeIndex + 1) % paths.length) positionClass = styles.nextSlide;
              else if (index === (activeIndex === 0 ? paths.length - 1 : activeIndex - 1)) positionClass = styles.prevSlide;
              else positionClass = styles.hiddenSlide;

              if (positionClass === styles.hiddenSlide) return null;
              const isInteractiveSlide = positionClass === styles.prevSlide || positionClass === styles.nextSlide;

              return (
                <div
                  key={path.id}
                  className={`${styles.slide} ${positionClass}`}
                  onClick={() => activateSlide(positionClass)}
                  role={isInteractiveSlide ? 'button' : undefined}
                  tabIndex={isInteractiveSlide ? 0 : undefined}
                  onKeyDown={isInteractiveSlide ? (event) => handleSlideKeyDown(event, positionClass) : undefined}
                  aria-label={isInteractiveSlide ? `Show ${path.tabLabel}` : undefined}
                >
                   <div className={styles.contentPanel}>
                     <span className={styles.eyebrow}>{path.eyebrow}</span>
                     <h3>{path.heading}</h3>
                     <p>{path.body}</p>
                     
                     <Link href={path.href} className={styles.ctaButton} onClick={(e) => {
                        if (positionClass !== styles.activeSlide) e.preventDefault();
                     }}>
                       {path.cta} <ArrowRight size={16} />
                     </Link>

                     <div className={styles.benefitsArea}>
                       <span className={styles.benefitsLabel}>What you get</span>
                       <div className={styles.benefitsGrid}>
                         {path.benefits.map((benefit, i) => {
                           const BIcon = benefit.icon;
                           return (
                             <div key={i} className={styles.benefitItem}>
                               <span className={styles.benefitIconWrap}>
                                 <BIcon size={15} />
                               </span>
                               <span className={styles.benefitText}>{benefit.label}</span>
                             </div>
                           );
                         })}
                       </div>
                     </div>
                   </div>
                   <div className={styles.imagePanel}>
                     <Image src={path.image} alt={path.heading} fill className={styles.slideImage} sizes="(max-width: 1024px) 100vw, 560px" />
                   </div>
                </div>
              );
           })}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
           <button onClick={prev} className={styles.arrowBtn} aria-label="Previous path"><ChevronLeft size={20} /></button>
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
           <button onClick={next} className={styles.arrowBtn} aria-label="Next path"><ChevronRight size={20} /></button>
         </div>
      </div>

      {/* Dynamic feature strip — synced to active slide */}
      <div className={styles.pathFeatureSection}>
        <div className={styles.pathFeatureStrip} key={activeIndex}>
          {activePath.whyWorks.map((item, i) => {
            const WIcon = item.icon;
            return (
              <div key={i} className={styles.pathFeatureItem}>
                <span className={styles.pathFeatureIcon}><WIcon size={26} /></span>
                <span className={styles.pathFeatureText}>
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
