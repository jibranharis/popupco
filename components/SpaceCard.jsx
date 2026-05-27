import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import styles from './SpaceCard.module.css';

export default function SpaceCard({ space }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Load saved state from local storage based on space id
  useEffect(() => {
    if (user) {
      const savedSpaces = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
      setIsSaved(savedSpaces.includes(space.id));
    } else {
      setIsSaved(false);
    }
  }, [user, space.id]);

  const toggleSave = (e) => {
    e.preventDefault(); // Prevent navigating to the space detail page
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

  return (
    <Link href={`/spaces/${space.slug}`} className={`listing-card ${styles.card}`}>
      <div className={styles.imageWrap}>
        {imgError || !space.image ? (
          <div className={styles.imageFallback}>
            <span>No Image</span>
          </div>
        ) : (
          <Image
            src={space.image}
            alt={space.name}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        
        {space.availability && (
          <div className={styles.badge}>{space.availability}</div>
        )}
        <button
          onClick={toggleSave}
          className={`heart-btn ${isSaved ? 'saved' : ''}`}
          aria-label={isSaved ? "Remove from saved" : "Save this space"}
        >
          <Heart size={18} strokeWidth={isSaved ? 0 : 2} />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.location}>{space.location}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.type}>{space.type}</span>
        </div>
        <h3 className={styles.title}>{space.name}</h3>
        <p className={styles.price}>{space.price}</p>
      </div>
    </Link>
  );
}
