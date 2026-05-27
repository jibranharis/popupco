'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CalendarDays, Heart, MapPin, ShieldCheck, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import styles from './SpaceCard.module.css';

export default function SpaceCard({ space }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsSaved(false);
      return;
    }
    const saved = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
    setIsSaved(saved.includes(space.id));
  }, [user, space.id]);

  const toggleSave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) {
      router.push('/login');
      return;
    }

    const saved = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
    const nextSaved = isSaved ? saved.filter((id) => id !== space.id) : [...saved, space.id];
    localStorage.setItem(`saved_spaces_${user.id}`, JSON.stringify(nextSaved));
    setIsSaved(!isSaved);
  };

  return (
    <Link href={`/spaces/${space.slug}`} className={`listing-card ${styles.card}`}>
      <div className={styles.imageWrap}>
        <Image
          src={space.image}
          alt={space.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <div className={styles.badge}>{space.type}</div>
        <button
          onClick={toggleSave}
          className={`heart-btn ${isSaved ? 'saved' : ''}`}
          aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
        >
          <Heart size={18} strokeWidth={isSaved ? 0 : 2} />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.topLine}>
          <span><MapPin size={14} /> {space.location}</span>
          <span className={styles.price}>{space.price}</span>
        </div>
        <h3 className={styles.title}>{space.name}</h3>
        <p className={styles.desc}>{space.description}</p>

        <div className={styles.details}>
          <span><CalendarDays size={14} /> {space.date}</span>
          <span><Users size={14} /> {space.expectedAttendance}</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.trust}><ShieldCheck size={14} /> {space.trust}</span>
          <span className={styles.deadline}>{space.deadline}</span>
        </div>

        <div className={styles.ctaRow}>
          <span>{space.category}</span>
          <strong>{space.cta}</strong>
        </div>
      </div>
    </Link>
  );
}
