'use client';
import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { OPPORTUNITY_TABS, SPACES_DATA } from '@/lib/spaces';
import { Search, SlidersHorizontal } from 'lucide-react';
import styles from './page.module.css';

const PRICE_RANGES = [
  { value: 'all', label: 'Any vendor fee' },
  { value: 'under-100', label: 'Under $100' },
  { value: '100-150', label: '$100 – $150' },
  { value: 'request', label: 'Request pricing' },
];

const INDOOR_OUTDOOR_OPTIONS = ['All', 'Indoor', 'Outdoor', 'Indoor/outdoor'];

function parsePrice(price) {
  const match = price.match(/\$(\d+)/);
  return match ? Number(match[1]) : null;
}

function parseAttendance(text) {
  const match = text.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function parseDeadline(deadline) {
  const parsed = new Date(deadline);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

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

const LOCATIONS = ['All', ...new Set(SPACES_DATA.map((space) => space.location))];

export default function VendorsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [query, setQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [location, setLocation] = useState('All');
  const [appliedBy, setAppliedBy] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [indoorOutdoor, setIndoorOutdoor] = useState('All');
  const [sort, setSort] = useState('recommended');

  const opportunities = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const appliedByDate = appliedBy ? new Date(appliedBy) : null;

    const filtered = SPACES_DATA.filter((space) => {
      const tabMatch = matchesTab(space, activeTab);
      const queryMatch = !needle || `${space.name} ${space.location} ${space.type} ${space.category}`.toLowerCase().includes(needle);
      const locationMatch = location === 'All' || space.location === location;
      const indoorMatch = indoorOutdoor === 'All' || space.indoorOutdoor === indoorOutdoor;

      const price = parsePrice(space.price);
      let priceMatch = true;
      if (priceRange === 'under-100') priceMatch = price !== null && price < 100;
      else if (priceRange === '100-150') priceMatch = price !== null && price >= 100 && price <= 150;
      else if (priceRange === 'request') priceMatch = price === null;

      const deadline = parseDeadline(space.deadline);
      const dateMatch = !appliedByDate || deadline === null || deadline <= appliedByDate;

      return tabMatch && queryMatch && locationMatch && indoorMatch && priceMatch && dateMatch;
    });

    if (sort === 'recommended') return filtered;

    return [...filtered].sort((a, b) => {
      if (sort === 'deadline') {
        const dateA = parseDeadline(a.deadline);
        const dateB = parseDeadline(b.deadline);
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateA - dateB;
      }
      if (sort === 'fee-low') {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;
        return priceA - priceB;
      }
      if (sort === 'attendance') {
        return parseAttendance(b.expectedAttendance) - parseAttendance(a.expectedAttendance);
      }
      return 0;
    });
  }, [activeTab, query, location, appliedBy, priceRange, indoorOutdoor, sort]);

  const clearFilters = () => {
    setActiveTab('All');
    setQuery('');
    setLocation('All');
    setAppliedBy('');
    setPriceRange('all');
    setIndoorOutdoor('All');
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroCopy}>
              <span className="label">Vendor opportunities</span>
              <h1>Find your next pop-up opportunity</h1>
              <p>Browse markets, booth opportunities, retail spaces, and local events currently accepting vendor applications.</p>
            </div>
            <div className={styles.statsCard}>
              <strong>{SPACES_DATA.length} active opportunities</strong>
              <span>4 Bay Area cities</span>
              <span>Applications open now</span>
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
            <select className={styles.sortSelect} value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Filter by location">
              {LOCATIONS.map((loc) => <option key={loc} value={loc}>{loc === 'All' ? 'Any location' : loc}</option>)}
            </select>
            <input
              type="date"
              className={styles.sortSelect}
              value={appliedBy}
              onChange={(event) => setAppliedBy(event.target.value)}
              aria-label="Show opportunities with applications due by this date"
            />
            <select className={styles.sortSelect} value={priceRange} onChange={(event) => setPriceRange(event.target.value)} aria-label="Filter by vendor fee">
              {PRICE_RANGES.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}
            </select>
            <select className={styles.sortSelect} value={indoorOutdoor} onChange={(event) => setIndoorOutdoor(event.target.value)} aria-label="Filter by indoor or outdoor">
              {INDOOR_OUTDOOR_OPTIONS.map((option) => <option key={option} value={option}>{option === 'All' ? 'Indoor or outdoor' : option}</option>)}
            </select>
          </div>

          <div className={styles.resultsHeader}>
            <div>
              <h2>{opportunities.length} vendor opportunities</h2>
              <p>Clear fees, deadlines, host details, and setup notes before you apply.</p>
            </div>
            <select className={styles.sortSelect} value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort opportunities">
              <option value="recommended">Recommended</option>
              <option value="deadline">Application deadline</option>
              <option value="fee-low">Lowest vendor fee</option>
              <option value="attendance">Expected attendance</option>
            </select>
          </div>

          {opportunities.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No matches yet.</h2>
              <p>Try changing your filters or check back soon.</p>
              <button type="button" onClick={clearFilters} className="btn btn--secondary">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {opportunities.map((space) => <SpaceCard key={space.id} space={space} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
