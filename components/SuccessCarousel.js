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
  }
];

export default function SuccessCarousel() {
  // We want the center card (index 1) to be active initially to match the prompt's layout
  const [activeIndex, setActiveIndex] = useState(1);

  const next = () => setActiveIndex((current) => (current + 1) % cases.length);
  const prev = () => setActiveIndex((current) => (current === 0 ? cases.length - 1 : current - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % cases.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.carouselSection}>
      <div className={styles.backgroundArch}></div>
      
      <div className={styles.headerArea}>
        <span className={styles.eyebrow}>SUCCESS STORIES</span>
        <h2 className={styles.headline}>
          True stories.<br/>
          Real results.
        </h2>
        <p className={styles.subtext}>
          See how vendors use PopUpCo to launch memorable pop-ups, reach better audiences, and grow with confidence.
        </p>
      </div>

      <div className={styles.carouselContainer}>
         <div className={styles.carouselTrack}>
            {cases.map((item, index) => {
               // Calculate relative position: -1 (left), 0 (center), 1 (right)
               let position = 0;
               if (index === activeIndex) position = 0;
               else if (index === (activeIndex + 1) % cases.length) position = 1;
               else position = -1;

               let positionClass = styles.active;
               if (position === -1) positionClass = styles.prev;
               if (position === 1) positionClass = styles.next;

               return (
                 <div 
                   key={item.id} 
                   className={`${styles.card} ${positionClass}`}
                   onClick={() => setActiveIndex(index)}
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
                 aria-label={`Go to slide ${i+1}`} 
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
