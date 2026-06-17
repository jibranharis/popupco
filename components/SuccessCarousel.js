'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './SuccessCarousel.module.css';

const cases = [
  {
    id: 1,
    title: 'Studio Market',
    description: 'Expanded into a new neighborhood with a curated maker event and stronger in-person sales.',
    image: '/images/case_studio_market.png',
  },
  {
    id: 2,
    title: 'Label Rose',
    description: 'Launched a weekend fashion pop-up that brought in 2.4K+ visitors and built a stronger local customer list.',
    image: '/images/case_label_rose.png',
  },
  {
    id: 3,
    title: 'Northline Goods',
    description: 'Tested a new product line in-market and turned real customer feedback into repeat demand.',
    image: '/images/case_northline_goods.png',
  },
  {
    id: 4,
    title: 'Bloom & Thread',
    description: 'Grew from a single weekend market to a recurring quarterly event with a loyal vendor community.',
    image: '/images/case_bloom_thread.png',
  },
  {
    id: 5,
    title: 'Dusk Collective',
    description: 'Partnered with local venues to host a multi-day artisan pop-up series that sold out every session.',
    image: '/images/case_dusk_collective.png',
  },
];

export default function SuccessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const n = cases.length;
  const next = () => setActiveIndex((current) => (current + 1) % n);
  const prev = () => setActiveIndex((current) => (current - 1 + n) % n);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % n);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevIndex = (activeIndex - 1 + n) % n;
  const nextIndex = (activeIndex + 1) % n;

  return (
    <section className={styles.carouselSection}>
      <div className={styles.backgroundArch}></div>

      <div className={styles.headerArea}>
        <span className={styles.eyebrow}>SUCCESS STORIES</span>
        <h2 className={styles.headline}>
          True stories. Real results.
        </h2>
        <p className={styles.subtext}>
          See how vendors use PopUpCo to launch memorable pop-ups, reach better audiences, and grow with confidence.
        </p>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {cases.map((item, index) => {
            // Only render the 3 visible cards: prev, active, next
            let positionClass;
            if (index === activeIndex)   positionClass = styles.active;
            else if (index === prevIndex) positionClass = styles.prev;
            else if (index === nextIndex) positionClass = styles.next;
            else return null; // the other 2 are hidden

            return (
              <div
                key={item.id}
                className={`${styles.card} ${positionClass}`}
                onClick={() => {
                  if (index === prevIndex) prev();
                  if (index === nextIndex) next();
                }}
              >
                <div className={styles.cardInner}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.cardImage}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <div className={styles.overlay}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className={styles.cta}>VIEW PROJECT <ArrowRight size={16} /></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button onClick={prev} className={styles.arrowBtn} aria-label="Previous slide">
            <ChevronLeft size={24} />
          </button>
          <div className={styles.dots}>
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className={styles.arrowBtn} aria-label="Next slide">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
