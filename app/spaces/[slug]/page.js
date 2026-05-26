'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SPACES_DATA } from '@/lib/spaces';
import { useAuth } from '@/components/AuthContext';
import { Heart, Share, Star, MapPin, ChevronLeft } from 'lucide-react';
import styles from './page.module.css';
import Link from 'next/link';

export default function SpaceDetailPage({ params }) {
  const router = useRouter();
  const { user } = useAuth();
  const space = SPACES_DATA.find(s => s.slug === params.slug);
  
  if (!space) {
    notFound();
  }

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      const savedSpaces = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
      setIsSaved(savedSpaces.includes(space.id));
    }
  }, [user, space.id]);

  const toggleSave = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    const savedSpaces = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
    let newSavedSpaces;
    if (isSaved) {
      newSavedSpaces = savedSpaces.filter((id) => id !== space.id);
    } else {
      newSavedSpaces = [...savedSpaces, space.id];
    }
    localStorage.setItem(`saved_spaces_${user.id}`, JSON.stringify(newSavedSpaces));
    setIsSaved(!isSaved);
  };

  const handleRequest = () => {
    if (!user) {
      router.push('/login');
    } else {
      alert("Booking request submitted! (Simulated)");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          
          <div className={styles.topNav}>
            <Link href="/browse" className={styles.backBtn}>
              <ChevronLeft size={20} /> Back to spaces
            </Link>
          </div>

          {/* Title Area */}
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{space.name}</h1>
            <div className={styles.metaRow}>
              <div className={styles.metaLeft}>
                <span className={styles.rating}><Star size={16} fill="currentColor" /> 4.95</span>
                <span className="text-muted">·</span>
                <span className={styles.location}><MapPin size={16} /> {space.location}</span>
                <span className="text-muted">·</span>
                <span>{space.type}</span>
              </div>
              <div className={styles.metaRight}>
                <button className={styles.actionBtn}><Share size={16} /> Share</button>
                <button className={styles.actionBtn} onClick={toggleSave}>
                  <Heart size={16} fill={isSaved ? '#E53E3E' : 'none'} color={isSaved ? '#E53E3E' : 'currentColor'} /> 
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <Image src={space.image} alt={space.name} fill className={styles.img} priority />
            </div>
            <div className={styles.sideImages}>
              <div className={styles.sideImage}>
                {/* Fallback pattern for now since we only generated one image per space */}
                <div className={styles.fallbackPattern} />
              </div>
              <div className={styles.sideImage}>
                <div className={styles.fallbackPattern} />
              </div>
            </div>
          </div>

          {/* Content Split */}
          <div className={styles.contentSplit}>
            <div className={styles.mainContent}>
              <div className={styles.hostSection}>
                <div>
                  <h2 className={styles.hostTitle}>Hosted by {space.host}</h2>
                  <p className="text-muted">Available: {space.availability}</p>
                </div>
                <div className={styles.hostAvatar}>{space.host.charAt(0)}</div>
              </div>
              
              <hr />
              
              <div className={styles.section}>
                <h3>About this space</h3>
                <p className={styles.description}>{space.description}</p>
              </div>

              <hr />

              <div className={styles.section}>
                <h3>Best for</h3>
                <div className={styles.tagList}>
                  {space.bestFor.map(tag => (
                    <span key={tag} className="badge badge--neutral">{tag}</span>
                  ))}
                </div>
              </div>

              <hr />

              <div className={styles.section}>
                <h3>Amenities</h3>
                <ul className={styles.listGrid}>
                  {space.amenities.map(item => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
              </div>

              <hr />

              <div className={styles.section}>
                <h3>Host Rules</h3>
                <ul className={styles.listCol}>
                  {space.rules.map(item => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Sticky */}
            <div className={styles.sidebar}>
              <div className={styles.bookingCard}>
                <div className={styles.bookingHeader}>
                  <div className={styles.price}>{space.price}</div>
                </div>
                
                <div className={styles.bookingForm}>
                  <div className={styles.datePicker}>
                    <div className={styles.dateField}>
                      <label>DATES</label>
                      <span>Add dates</span>
                    </div>
                  </div>
                  <button className="btn btn--primary btn--full" onClick={handleRequest}>
                    Request to Book
                  </button>
                  <p className="text-center text-muted text-sm mt-4">You won't be charged yet.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
