'use client';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { getOpportunityBySlug, SPACES_DATA } from '@/lib/spaces';
import { useAuth } from '@/components/AuthContext';
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  MessageSquare,
  Share,
  ShieldCheck,
  Users,
} from 'lucide-react';
import styles from './page.module.css';

export default function SpaceDetailPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const space = getOpportunityBySlug(slug);
  const [isSaved, setIsSaved] = useState(false);

  if (!space) notFound();

  useEffect(() => {
    if (!user) return;
    const saved = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
    setIsSaved(saved.includes(space.id));
  }, [user, space.id]);

  const toggleSave = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    const saved = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
    const nextSaved = isSaved ? saved.filter((id) => id !== space.id) : [...saved, space.id];
    localStorage.setItem(`saved_spaces_${user.id}`, JSON.stringify(nextSaved));
    setIsSaved(!isSaved);
  };

  const handlePrimary = () => {
    if (space.cta === 'Apply') router.push(`/apply/vendor?event=${space.slug}`);
    else if (!user) router.push('/login');
    else alert('Request sent. The host will receive your message in this demo.');
  };

  const similar = SPACES_DATA.filter((item) => item.id !== space.id).slice(0, 3);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Link href="/browse" className={styles.backBtn}><ChevronLeft size={19} /> Back to opportunities</Link>

          <div className={styles.titleArea}>
            <div>
              <div className={styles.kicker}>{space.type} · {space.trust}</div>
              <h1>{space.name}</h1>
              <div className={styles.metaLine}>
                <span><MapPin size={16} /> {space.location}</span>
                <span><CalendarDays size={16} /> {space.date}</span>
                <span><Users size={16} /> {space.expectedAttendance}</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button><Share size={16} /> Share</button>
              <button onClick={toggleSave}><Heart size={16} fill={isSaved ? '#E53E3E' : 'none'} color={isSaved ? '#E53E3E' : 'currentColor'} /> {isSaved ? 'Saved' : 'Save'}</button>
            </div>
          </div>

          <div className={styles.gallery}>
            {space.gallery.map((image, index) => (
              <div key={image} className={index === 0 ? styles.galleryMain : styles.gallerySide}>
                <Image src={image} alt={`${space.name} photo ${index + 1}`} fill className={styles.galleryImg} priority={index === 0} />
              </div>
            ))}
          </div>

          <div className={styles.contentGrid}>
            <article className={styles.content}>
              <section className={styles.summaryGrid}>
                {[
                  ['Price or vendor fee', space.price],
                  ['Application deadline', space.deadline],
                  ['Indoor/outdoor', space.indoorOutdoor],
                  ['Food allowed', space.foodAllowed],
                  ['Capacity', space.capacity],
                  ['Setup time', space.setupTime],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </section>

              <section className={styles.section}>
                <h2>Description</h2>
                <p>{space.description}</p>
              </section>

              <section className={styles.section}>
                <h2>Best for</h2>
                <div className={styles.tagList}>{space.bestFor.map((item) => <span key={item}>{item}</span>)}</div>
              </section>

              <section className={styles.section}>
                <h2>Amenities</h2>
                <ul className={styles.listGrid}>{space.amenities.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>

              <section className={styles.section}>
                <h2>Rules and requirements</h2>
                <div className={styles.twoLists}>
                  <div>
                    <h3>Rules</h3>
                    <ul>{space.rules.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <h3>Vendor requirements</h3>
                    <ul>{space.vendorRequirements.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2>Parking and load-in</h2>
                <p>{space.parking}</p>
              </section>

              <section className={styles.hostProfile}>
                <div className={styles.hostAvatar}>{space.host.name.charAt(0)}</div>
                <div>
                  <span><ShieldCheck size={16} /> {space.host.type}</span>
                  <h2>{space.host.name}</h2>
                  <p>{space.host.response}. {space.host.history}.</p>
                </div>
              </section>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.bookingCard}>
                <div className={styles.bookingTop}>
                  <strong>{space.price}</strong>
                  <span>{space.status}</span>
                </div>
                <div className={styles.bookingFact}><Clock size={16} /> Deadline: {space.deadline}</div>
                <div className={styles.bookingFact}><ShieldCheck size={16} /> {space.trust}</div>
                <button className="btn btn--primary btn--full" onClick={handlePrimary}>{space.cta === 'Apply' ? 'Apply to sell' : space.cta}</button>
                <button className="btn btn--secondary btn--full"><MessageSquare size={16} /> Message host</button>
                <p>You will see fees, rules, and requirements before making a paid commitment.</p>
              </div>
            </aside>
          </div>

          <section className={styles.similar}>
            <h2>Similar listings</h2>
            <div className="grid-3">{similar.map((item) => <SpaceCard key={item.id} space={item} />)}</div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
