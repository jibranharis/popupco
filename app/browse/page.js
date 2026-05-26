'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { SPACES_DATA } from '@/lib/spaces';
import { SlidersHorizontal } from 'lucide-react';
import styles from './page.module.css';

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSpaces = SPACES_DATA.filter((space) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'retail' && space.type.toLowerCase().includes('retail')) return true;
    if (activeFilter === 'market' && space.type.toLowerCase().includes('market')) return true;
    if (activeFilter === 'shared' && space.type.toLowerCase().includes('shared')) return true;
    return false;
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <h1>Browse Spaces</h1>
            <p className="text-muted">Find the perfect location for your brand's next pop-up.</p>
          </div>

          <div className={styles.filters}>
            <div className={styles.filterBtns}>
              <button 
                className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Spaces
              </button>
              <button 
                className={`${styles.filterBtn} ${activeFilter === 'market' ? styles.active : ''}`}
                onClick={() => setActiveFilter('market')}
              >
                Vendor Markets
              </button>
              <button 
                className={`${styles.filterBtn} ${activeFilter === 'retail' ? styles.active : ''}`}
                onClick={() => setActiveFilter('retail')}
              >
                Retail Storefronts
              </button>
              <button 
                className={`${styles.filterBtn} ${activeFilter === 'shared' ? styles.active : ''}`}
                onClick={() => setActiveFilter('shared')}
              >
                Shared Spaces
              </button>
            </div>
            <button className={`btn btn--secondary btn--sm ${styles.advancedBtn}`}>
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          <div className="grid-3" style={{ marginBottom: 'var(--sp-24)' }}>
            {filteredSpaces.map(space => (
              <SpaceCard key={space.id} space={space} />
            ))}
            {/* Duplicating spaces just to fill out the grid visually for the prototype */}
            {filteredSpaces.map(space => (
              <SpaceCard key={`${space.id}-dup`} space={{...space, id: `${space.id}-dup`}} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
