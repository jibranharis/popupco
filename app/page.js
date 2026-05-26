'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { VENDOR_CATEGORIES } from '@/lib/data';
import { SPACES_DATA } from '@/lib/spaces';
import { Search, MapPin, Calendar, Clock, HandHeart } from 'lucide-react';
import styles from './page.module.css';

function useFadeInObserver(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  const router = useRouter();
  const pageRef = useRef(null);
  useFadeInObserver(pageRef);

  // Category Interactive State
  const [activeCategory, setActiveCategory] = useState(0);

  // Search State
  const [searchLoc, setSearchLoc] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/browse${searchLoc ? `?location=${encodeURIComponent(searchLoc)}` : ''}`);
  };

  return (
    <>
      <Header />
      <main ref={pageRef}>

        {/* ─── HERO MARKETPLACE ─── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroContainer}`}>
            <div className={`fade-in ${styles.heroContent}`}>
              <div className={`badge badge--accent ${styles.heroBadge}`}>
                Launching in the Bay Area
              </div>
              <h1 className={styles.heroTitle}>Find space for<br/>your next pop-up.</h1>
              <p className={styles.heroSub}>
                Browse curated retail spaces, markets, and short-term opportunities for local brands, makers, and small businesses.
              </p>
              
              <form onSubmit={handleSearch} className={`search-bar ${styles.heroSearch}`}>
                <div className="search-bar__field">
                  <span className="search-bar__label">Location</span>
                  <input 
                    type="text" 
                    placeholder="Bay Area, CA" 
                    className="search-bar__input"
                    value={searchLoc}
                    onChange={(e) => setSearchLoc(e.target.value)}
                  />
                </div>
                <div className="search-bar__field">
                  <span className="search-bar__label">Space Type</span>
                  <select className="search-bar__input" style={{appearance:'none', background:'transparent'}}>
                    <option>Any space type</option>
                    <option>Retail Storefront</option>
                    <option>Vendor Market</option>
                    <option>Shared Space</option>
                  </select>
                </div>
                <button type="submit" className="search-bar__btn">
                  <Search size={18} /> Search
                </button>
              </form>

              <div className={styles.heroLinks}>
                <span className="text-muted">Or browse:</span>
                <Link href="/browse?type=market">Upcoming Markets</Link>
                <Link href="/browse?type=retail">Retail Storefronts</Link>
                <Link href="/apply/venue">List a Space</Link>
              </div>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <Image
              src="/hero-market.png"
              alt="Curated Pop Up Market in the Bay Area"
              fill
              priority
              className={styles.heroImage}
            />
          </div>
        </section>

        {/* ─── FEATURED SPACES ─── */}
        <section className="section bg-alt">
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className="fade-in">Featured spaces</h2>
              <Link href="/browse" className={`btn btn--secondary fade-in ${styles.desktopOnly}`}>
                Browse all spaces
              </Link>
            </div>
            
            <div className="grid-3">
              {SPACES_DATA.slice(0, 6).map((space, i) => (
                <div key={space.id} className={`fade-in fade-in--d${(i%3)+1}`}>
                  <SpaceCard space={space} />
                </div>
              ))}
            </div>
            
            <Link href="/browse" className={`btn btn--secondary btn--full fade-in ${styles.mobileOnly} mt-6`}>
              Browse all spaces
            </Link>
          </div>
        </section>

        {/* ─── INTERACTIVE CATEGORIES (Peerspace Style) ─── */}
        <section className={`section ${styles.categorySection}`}>
          <div className="container">
            <h2 className={`fade-in ${styles.categoryTitle}`}>Find the right space for your brand</h2>
            
            <div className={styles.categoryGrid}>
              <div className={styles.categoryList}>
                {VENDOR_CATEGORIES.map((cat, i) => (
                  <button
                    key={cat.label}
                    className={`${styles.categoryBtn} ${activeCategory === i ? styles.categoryActive : ''} fade-in fade-in--d${(i%5)+1}`}
                    onMouseEnter={() => setActiveCategory(i)}
                    onClick={() => setActiveCategory(i)}
                  >
                    <div className={styles.categoryBtnInner}>
                      <span className={styles.categoryLabel}>{cat.label}</span>
                      <span className={styles.categoryDesc}>{cat.description}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className={`fade-in ${styles.categoryVisual}`}>
                <div className={styles.categoryImageWrap}>
                  {VENDOR_CATEGORIES.map((cat, i) => (
                    <div 
                      key={cat.label} 
                      className={`${styles.categoryImageLayer} ${activeCategory === i ? styles.categoryImageActive : ''}`}
                    >
                      {cat.image ? (
                        <Image src={cat.image} alt={cat.label} fill className={styles.catImg} />
                      ) : (
                        <div className={styles.catFallback}>
                          {cat.label} Placeholder
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="section bg-alt" id="how-it-works">
          <div className="container">
            <h2 className="fade-in text-center mb-12">How it works</h2>
            <div className="grid-3">
              {[
                { step: '01', title: 'Find a space', desc: 'Browse curated retail spaces, markets, and short-term opportunities that fit your brand.', icon: <Search size={24}/> },
                { step: '02', title: 'Request to book', desc: 'Submit a simple application or booking request directly to the host or market organizer.', icon: <Calendar size={24}/> },
                { step: '03', title: 'Launch offline', desc: 'Show up, set up your shop, connect with local customers, and grow your sales in person.', icon: <MapPin size={24}/> }
              ].map((s, i) => (
                <div key={s.step} className={`card p-8 fade-in fade-in--d${i+1} ${styles.stepCard}`}>
                  <div className={styles.stepIcon}>{s.icon}</div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOR VENUES ─── */}
        <section className="section">
          <div className="container">
            <div className={styles.venueSplit}>
              <div className={`fade-in ${styles.venueContent}`}>
                <span className="label">For Venues</span>
                <h2>Have space?<br/>Host a pop-up.</h2>
                <p>Turn your underused retail space, gallery, cafe, or lot into revenue. Connect with a curated network of local brands looking for short-term space.</p>
                <Link href="/apply/venue" className="btn btn--secondary mt-4">
                  List Your Space
                </Link>
              </div>
              <div className={`fade-in ${styles.venueStats}`}>
                <div className={styles.statBox}>
                  <h4>Generate Revenue</h4>
                  <p className="text-muted text-sm mt-1">Monetize vacant time or unused square footage.</p>
                </div>
                <div className={styles.statBox}>
                  <h4>Drive Foot Traffic</h4>
                  <p className="text-muted text-sm mt-1">Bring new energy and customers to your location.</p>
                </div>
                <div className={styles.statBox}>
                  <h4>Support Local</h4>
                  <p className="text-muted text-sm mt-1">Help small Bay Area brands grow.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMMUNITY ─── */}
        <section className={`section--dark ${styles.communitySection}`}>
          <div className="container">
            <div className={styles.communityInner}>
              <HandHeart size={48} className="fade-in mb-6 text-accent" />
              <h2 className="fade-in">Commerce that builds community.</h2>
              <p className="fade-in">
                We believe in supporting the communities we operate in. Nonprofits, mutual aid groups, and local community organizations often qualify for discounted or free space at Pop Up Co. markets.
              </p>
              <div className="fade-in mt-8">
                <Link href="/contact" className="btn btn--outline-white">
                  Contact About Community Partnerships
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
