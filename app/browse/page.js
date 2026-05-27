'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import ComingSoonCard from '@/components/ComingSoonCard';
import { SPACES_DATA } from '@/lib/spaces';
import { SlidersHorizontal, Info } from 'lucide-react';
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

  const exampleSpace = SPACES_DATA.find(space => space.title?.includes('Walnut Creek') || space.name?.includes('Walnut Creek')) || SPACES_DATA[0];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <h1>Browse Spaces</h1>
            <p className="text-muted">Find the perfect location for your brand's next pop-up.</p>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-alt, #f9fafb)', border: '1px solid var(--color-border)', color: 'var(--color-text)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
            <Info size={20} />
            <p style={{ margin: 0, fontWeight: 500 }}>Spaces and markets are being added. Be the first to list or get notified.</p>
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
            <ComingSoonCard title="SF Ferry Building Pop-Up" description="San Francisco • Dates TBD" />
            <ComingSoonCard title="Oakland First Fridays" description="Oakland • Monthly" />
            <ComingSoonCard title="Hayes Valley Storefront" description="San Francisco • Available Soon" />
            <ComingSoonCard title="Berkeley Artisans Market" description="Berkeley • Coming this Fall" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
