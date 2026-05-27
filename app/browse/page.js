'use client';
import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { OPPORTUNITY_TABS, SPACES_DATA } from '@/lib/spaces';
import { Search, SlidersHorizontal } from 'lucide-react';
import styles from './page.module.css';

const filterChips = [
  'Location',
  'Date',
  'Price / vendor fee',
  'Space rental price',
  'Event type',
  'Indoor/outdoor',
  'Category',
  'Capacity',
  'Expected attendance',
  'Application deadline',
  'Amenities',
  'Parking',
  'Food allowed',
  'Electricity',
  'Tables/chairs included',
  'Kid-friendly',
  'Pet-friendly',
  'Weekend availability',
  'Verified hosts',
  'Accepting applications',
];

function matchesTab(space, tab) {
  if (tab === 'All') return true;
  const text = `${space.type} ${space.category} ${space.status}`.toLowerCase();
  if (tab === 'Vendor Markets') return text.includes('market');
  if (tab === 'Booth Opportunities') return text.includes('booth');
  if (tab === 'Retail Spaces') return text.includes('retail');
  if (tab === 'Food Pop-Ups') return text.includes('food');
  if (tab === 'Community Events') return text.includes('community') || text.includes('nonprofit');
  if (tab === 'Event Venues') return text.includes('venue') || text.includes('space');
  if (tab === 'Upcoming Pop-Ups') return true;
  return true;
}

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState('All');
  const [query, setQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const opportunities = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return SPACES_DATA.filter((space) => {
      const tabMatch = matchesTab(space, activeTab);
      const queryMatch = !needle || `${space.name} ${space.location} ${space.type} ${space.category}`.toLowerCase().includes(needle);
      return tabMatch && queryMatch;
    });
  }, [activeTab, query]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroCopy}>
              <span className="label">Discover</span>
              <h1>Discover pop-up opportunities near you.</h1>
              <p>Browse pop-up opportunities, vendor markets, event spaces, and local selling experiences near you.</p>
            </div>
            <div className={styles.searchPanel}>
              <div className={styles.searchBox}>
                <Search size={18} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by city, category, market, or space" />
              </div>
              <button className={styles.filterToggle} onClick={() => setShowMobileFilters(!showMobileFilters)}>
                <SlidersHorizontal size={17} /> Filters
              </button>
            </div>
          </div>
        </section>

        <div className="container">
          <div className={styles.tabs} aria-label="Opportunity types">
            {OPPORTUNITY_TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? styles.active : ''}>
                {tab}
              </button>
            ))}
          </div>

          <div className={`${styles.filterRail} ${showMobileFilters ? styles.filterRailOpen : ''}`}>
            {filterChips.map((chip) => <button key={chip}>{chip}</button>)}
          </div>

          <div className={styles.resultsHeader}>
            <div>
              <h2>{opportunities.length} opportunities</h2>
              <p>Clear fees, deadlines, host details, and setup notes before you apply.</p>
            </div>
            <select className={styles.sortSelect} defaultValue="recommended" aria-label="Sort opportunities">
              <option value="recommended">Recommended</option>
              <option value="deadline">Application deadline</option>
              <option value="fee-low">Lowest vendor fee</option>
              <option value="attendance">Expected attendance</option>
            </select>
          </div>

          <div className="grid-3">
            {opportunities.map((space) => <SpaceCard key={space.id} space={space} />)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
