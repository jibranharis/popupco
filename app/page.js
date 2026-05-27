'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import ComingSoonCard from '@/components/ComingSoonCard';
import { SPACES_DATA } from '@/lib/spaces';
import { Package, MapPin, Users, Heart, Search, Calendar } from 'lucide-react';
import styles from './page.module.css';

const VENDOR_CATEGORIES = [
  { label: 'Clothing brands', image: '/cat-fashion.png' },
  { label: 'Vintage sellers', image: '/cat-vintage.png' },
  { label: 'Food trucks', image: '/cat-food.png' },
  { label: 'Jewelry & accessories', image: '/cat-jewelry.png' },
  { label: 'Artists & makers', image: '/cat-beauty.png' },
  { label: 'Student businesses', image: null },
  { label: 'Nonprofits', image: null },
  { label: 'Community events', image: null },
  { label: 'Retail storefronts', image: null },
  { label: 'Outdoor markets', image: null },
];

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

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Header />
      <main ref={pageRef}>

        {/* ─── HERO MARKETPLACE ─── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroContainer}`}>
            <div className={`fade-in ${styles.heroContent}`}>
              <h1 className={styles.heroTitle}>Find your next place to sell.</h1>
              <p className={styles.heroSub}>
                Browse curated pop-up markets, short-term spaces, and community events built for local vendors, small businesses, and creators.
              </p>
              
              <div className={styles.heroCtas}>
                <Link href="/browse" className="btn btn--primary btn--lg">Find a Space</Link>
                <Link href="/apply/vendor" className="btn btn--secondary btn--lg">Apply as a Vendor</Link>
              </div>
              <div className={styles.heroLinks}>
                <Link href="/apply/venue">List Your Space</Link>
              </div>
              
              <div className={styles.trustChips}>
                <span className="badge badge--neutral"><MapPin size={14}/> Bay Area focused</span>
                <span className="badge badge--neutral"><Package size={14}/> Vendor-friendly</span>
                <span className="badge badge--neutral"><Heart size={14}/> Community-first</span>
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
            <div className={styles.floatingCard}>
              <div className="badge badge--accent mb-2">Example Opportunity</div>
              <h4>Weekend Market Opportunity</h4>
              <p className="text-sm text-muted">Vendor applications opening soon</p>
            </div>
          </div>
        </section>

        {/* ─── INTERACTIVE CATEGORIES ─── */}
        <section className={`section ${styles.categorySection}`}>
          <div className="container">
            <h2 className={`fade-in ${styles.categoryTitle}`}>A pop-up for every kind of vendor.</h2>
            
            <div className={styles.categoryGrid}>
              <div className={styles.categoryList}>
                {VENDOR_CATEGORIES.map((cat, i) => (
                  <button
                    key={cat.label}
                    className={`${styles.categoryBtn} ${activeCategory === i ? styles.categoryActive : ''} fade-in fade-in--d${(i%5)+1}`}
                    onMouseEnter={() => setActiveCategory(i)}
                    onClick={() => setActiveCategory(i)}
                  >
                    <span className={styles.categoryLabel}>{cat.label}</span>
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
                          {cat.label} Image Coming Soon
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURED SPACES ─── */}
        <section className="section bg-alt">
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className="fade-in">What an opportunity looks like</h2>
              <Link href="/browse" className={`btn btn--secondary fade-in ${styles.desktopOnly}`}>
                Browse all spaces
              </Link>
            </div>
            
            <div className="grid-3">
              {/* Honest 1 real space */}
              <div className="fade-in fade-in--d1 relative">
                <div className={styles.exampleBadge}>Preview Listing</div>
                <SpaceCard space={SPACES_DATA.find(s => s.slug === 'walnut-creek-weekend-market')} />
              </div>
              {/* Coming soon cards */}
              <div className="fade-in fade-in--d2">
                <ComingSoonCard title="More spaces coming soon" desc="We are adding new retail and market spaces across the Bay Area." cta="Get Notified" />
              </div>
              <div className="fade-in fade-in--d3">
                <ComingSoonCard title="Be the first to list" desc="Have an empty storefront or event space? List it for pop-ups." cta="List a Space" href="/apply/venue" />
              </div>
            </div>
            
            <Link href="/browse" className={`btn btn--secondary btn--full fade-in ${styles.mobileOnly} mt-6`}>
              Browse all spaces
            </Link>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="section" id="how-it-works">
          <div className="container">
            <h2 className="fade-in text-center mb-12">How it works</h2>
            <div className="grid-4">
              {[
                { step: '01', title: 'Browse opportunities', desc: 'Find curated markets and retail spaces that fit your brand.', icon: <Search size={24}/> },
                { step: '02', title: 'Apply or save spaces', desc: 'Submit a simple application or save spaces for later.', icon: <Heart size={24}/> },
                { step: '03', title: 'Get approved', desc: 'Connect directly with the host or market organizer.', icon: <Users size={24}/> },
                { step: '04', title: 'Show up and sell', desc: 'Set up your shop and connect with local customers in person.', icon: <Package size={24}/> }
              ].map((s, i) => (
                <div key={s.step} className={`fade-in fade-in--d${i+1} ${styles.stepCard}`}>
                  <div className={styles.stepNum}>{s.step}</div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOR VENDORS ─── */}
        <section className="section bg-cream">
          <div className="container">
            <div className={styles.venueSplit}>
              <div className={`fade-in ${styles.venueContent}`}>
                <span className="label">For Vendors</span>
                <h2>Built for small businesses, creators, and community vendors.</h2>
                <p>Less intimidating than big platforms. Easier than figuring it out alone. Real spaces. Real vendors. Local events.</p>
                <Link href="/apply/vendor" className="btn btn--primary mt-4">
                  Apply as a Vendor
                </Link>
              </div>
              <div className={`fade-in ${styles.venueStats}`}>
                <div className={styles.statBox}>
                  <h4>Find affordable places to sell</h4>
                </div>
                <div className={styles.statBox}>
                  <h4>Apply to opportunities easily</h4>
                </div>
                <div className={styles.statBox}>
                  <h4>Build your offline presence</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOR VENUES ─── */}
        <section className="section bg-tan">
          <div className="container">
            <div className={styles.venueSplit} style={{ flexDirection: 'row-reverse' }}>
              <div className={`fade-in ${styles.venueContent}`}>
                <span className="label">For Venues & Hosts</span>
                <h2>List your space and bring local vendors in.</h2>
                <p>Activate your underused space, drive foot traffic, and support local small businesses by hosting pop-up events.</p>
                <Link href="/apply/venue" className="btn btn--secondary mt-4">
                  List Your Space
                </Link>
              </div>
              <div className={`fade-in ${styles.venueStats}`}>
                <div className={styles.statBox}>
                  <h4>Create new revenue opportunities</h4>
                </div>
                <div className={styles.statBox}>
                  <h4>Host community events</h4>
                </div>
                <div className={styles.statBox}>
                  <h4>Review interested vendors easily</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMMUNITY ─── */}
        <section className={`section--dark ${styles.communitySection}`}>
          <div className="container">
            <div className={styles.communityInner}>
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

        {/* ─── FINAL CTA ─── */}
        <section className={`section bg-cream ${styles.finalCta}`}>
          <div className="container text-center">
            <h2 className="fade-in mb-6">Ready to find your next place to sell?</h2>
            <Link href="/browse" className="btn btn--primary btn--xl fade-in">
              Find a Space
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
