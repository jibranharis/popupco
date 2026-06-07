'use client';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import GatedLink, { loginHref } from '@/components/GatedLink';
import { getOpportunityBySlug, SPACES_DATA } from '@/lib/spaces';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/lib/supabase';
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

function mapDbOpportunity(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    type: row.type,
    location: row.location,
    neighborhood: row.neighborhood,
    category: row.category,
    date: row.date,
    availability: row.availability,
    price: row.price,
    cta: row.cta || 'Apply',
    status: row.status || 'accepting',
    trust: row.trust,
    expectedAttendance: row.expected_attendance,
    deadline: row.deadline,
    indoorOutdoor: row.indoor_outdoor,
    foodAllowed: row.food_allowed,
    capacity: row.capacity,
    setupTime: row.setup_time,
    parking: row.parking,
    image: row.image,
    gallery: row.gallery?.length ? row.gallery : [row.image].filter(Boolean),
    description: row.description,
    amenities: row.amenities || [],
    rules: row.rules || [],
    bestFor: row.best_for || [],
    vendorRequirements: row.vendor_requirements || [],
    host: {
      name: row.host_name || 'PopUpCo',
      type: row.host_type || 'Verified host',
      response: row.host_response || 'Responds within 48 hours',
      history: row.host_history || '',
    },
  };
}

export default function SpaceDetailPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const staticSpace = getOpportunityBySlug(slug);
  const [space, setSpace] = useState(staticSpace);
  const [notFoundState, setNotFoundState] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    supabase.from('opportunities').select('*').eq('slug', slug).single()
      .then(({ data }) => {
        if (data) {
          setSpace(mapDbOpportunity(data));
        } else if (!staticSpace) {
          setNotFoundState(true);
        }
      });
  }, [slug, staticSpace]);

  useEffect(() => {
    if (!user || !space) return;
    const saved = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
    setIsSaved(saved.includes(space.id));
  }, [user, space]);

  if (notFoundState) notFound();
  if (!space) return null;

  const toggleSave = async () => {
    if (!user) {
      router.push(loginHref(`/spaces/${space.slug}`, 'save'));
      return;
    }
    const saved = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
    const nextSaved = isSaved ? saved.filter((id) => id !== space.id) : [...saved, space.id];
    localStorage.setItem(`saved_spaces_${user.id}`, JSON.stringify(nextSaved));
    setIsSaved(!isSaved);
    await supabase.auth.updateUser({ data: { saved_space_ids: nextSaved } });
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://popupco.vercel.app/spaces/${space.slug}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title: space.name, url: shareUrl });
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      alert('Listing link copied.');
    }
  };

  const similar = SPACES_DATA.filter((item) => item.id !== space.id).slice(0, 3);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Link href="/vendors" className={styles.backBtn}><ChevronLeft size={19} /> Back to opportunities</Link>

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
              <button type="button" onClick={handleShare}><Share size={16} /> Share</button>
              <button onClick={toggleSave}><Heart size={16} fill={isSaved ? '#E53E3E' : 'none'} color={isSaved ? '#E53E3E' : 'currentColor'} /> {isSaved ? 'Saved' : 'Save'}</button>
            </div>
          </div>

          {space.gallery?.length > 0 && (
            <div className={styles.gallery}>
              {space.gallery.map((image, index) => (
                <div key={image} className={index === 0 ? styles.galleryMain : styles.gallerySide}>
                  <Image src={image} alt={`${space.name} photo ${index + 1}`} fill className={styles.galleryImg} priority={index === 0} />
                </div>
              ))}
            </div>
          )}

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
                ].filter(([, v]) => v).map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </section>

              {space.description && (
                <section className={styles.section}>
                  <h2>Description</h2>
                  <p>{space.description}</p>
                </section>
              )}

              {space.bestFor?.length > 0 && (
                <section className={styles.section}>
                  <h2>Best for</h2>
                  <div className={styles.tagList}>{space.bestFor.map((item) => <span key={item}>{item}</span>)}</div>
                </section>
              )}

              {space.amenities?.length > 0 && (
                <section className={styles.section}>
                  <h2>Amenities</h2>
                  <ul className={styles.listGrid}>{space.amenities.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              )}

              {(space.rules?.length > 0 || space.vendorRequirements?.length > 0) && (
                <section className={styles.section}>
                  <h2>Rules and requirements</h2>
                  <div className={styles.twoLists}>
                    {space.rules?.length > 0 && (
                      <div>
                        <h3>Rules</h3>
                        <ul>{space.rules.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    )}
                    {space.vendorRequirements?.length > 0 && (
                      <div>
                        <h3>Vendor requirements</h3>
                        <ul>{space.vendorRequirements.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {space.parking && (
                <section className={styles.section}>
                  <h2>Parking and load-in</h2>
                  <p>{space.parking}</p>
                </section>
              )}

              {space.host?.name && (
                <section className={styles.hostProfile}>
                  <div className={styles.hostAvatar}>{space.host.name.charAt(0)}</div>
                  <div>
                    <span><ShieldCheck size={16} /> {space.host.type}</span>
                    <h2>{space.host.name}</h2>
                    <p>{space.host.response}{space.host.history ? `. ${space.host.history}.` : ''}</p>
                  </div>
                </section>
              )}
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.bookingCard}>
                <div className={styles.bookingTop}>
                  <strong>{space.price}</strong>
                  <span>{space.status}</span>
                </div>
                {space.deadline && <div className={styles.bookingFact}><Clock size={16} /> Deadline: {space.deadline}</div>}
                {space.trust && <div className={styles.bookingFact}><ShieldCheck size={16} /> {space.trust}</div>}
                <GatedLink href={`/apply/vendor?event=${space.slug}`} intent="apply" className="btn btn--primary btn--full">
                  {space.cta === 'Apply' ? 'Apply to sell' : 'Request this opportunity'}
                </GatedLink>
                <GatedLink href={`/contact?subject=${encodeURIComponent(space.name)}`} intent="message" className="btn btn--secondary btn--full">
                  <MessageSquare size={16} /> Message host
                </GatedLink>
                <p>You will see fees, rules, and requirements before making a paid commitment.</p>
              </div>
            </aside>
          </div>

          {similar.length > 0 && (
            <section className={styles.similar}>
              <h2>Similar listings</h2>
              <div className="grid-3">{similar.map((item) => <SpaceCard key={item.id} space={item} />)}</div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
