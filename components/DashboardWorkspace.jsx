'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  Bookmark,
  CheckCircle,
  FileText,
  Heart,
  Inbox,
  LogOut,
  MessageSquare,
  Settings,
  Store,
  User,
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SpaceCard from './SpaceCard';
import { useAuth } from './AuthContext';
import { loginHref } from './GatedLink';
import { supabase } from '@/lib/supabase';
import { SPACES_DATA } from '@/lib/spaces';
import styles from '@/app/dashboard/page.module.css';

const navItems = [
  ['overview', '/dashboard', 'Overview', FileText],
  ['profile', '/dashboard/profile', 'Profile', User],
  ['applications', '/dashboard/applications', 'Applications', Bookmark],
  ['saved', '/dashboard/saved', 'Saved', Heart],
  ['messages', '/dashboard/messages', 'Messages', MessageSquare],
  ['settings', '/dashboard/settings', 'Settings', Settings],
];

const roleCopy = {
  vendor: 'Manage your vendor profile, applications, saved opportunities, and messages from hosts.',
  venue: 'Manage venue details, requests, availability, messages, and PopUpCo follow-up.',
  host: 'Manage event requests, saved venues, vendor interest, and host messages.',
  attendee: 'Track saved events, local pop-ups, and updates from PopUpCo.',
};


function EmptyState({ icon: Icon, title, copy, href, cta }) {
  return (
    <div className={styles.emptyState}>
      <Icon size={32} />
      <h4>{title}</h4>
      <p>{copy}</p>
      {href && <Link href={href} className="btn btn--secondary btn--sm">{cta}</Link>}
    </div>
  );
}

function Sidebar({ user, section, savedCount, logout }) {
  return (
    <aside className={styles.sidebar}>
      <div className={`card ${styles.profileCard}`}>
        <div className={styles.avatarLarge}>{user.name?.charAt(0)?.toUpperCase() || 'P'}</div>
        <h3>{user.name || 'PopUpCo User'}</h3>
        <p>{user.email}</p>
        <div className={styles.progressBlock}>
          <div className={styles.progressText}>
            <span>Profile completion</span>
            <span>70%</span>
          </div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '70%' }} /></div>
        </div>
        <Link href="/dashboard/profile" className="btn btn--secondary btn--full btn--sm mt-4">Edit Profile</Link>
      </div>

      <nav className={styles.sideNav} aria-label="Dashboard">
        {navItems.map(([id, href, label, Icon]) => (
          <Link key={id} href={href} className={section === id ? styles.navItemActive : styles.navItem}>
            <Icon size={18} /> {label}{id === 'saved' && savedCount ? ` (${savedCount})` : ''}
          </Link>
        ))}
        <button className={styles.navItem} onClick={logout}><LogOut size={18} /> Log out</button>
      </nav>
    </aside>
  );
}

function Overview({ user, savedSpaces, submissionCount }) {
  const nextSteps = [
    'Complete your profile',
    user.type === 'vendor' ? 'Add product photos' : user.type === 'venue' ? 'Add space photos' : 'Add event details',
    user.type === 'vendor' ? 'Apply to an opportunity' : user.type === 'venue' ? 'Submit venue availability' : 'Start a host request',
    'Save an opportunity you like',
    'Check messages from PopUpCo',
  ];

  return (
    <>
      <section className={styles.heroPanel}>
        <div>
          <h1>Welcome back, {user.name || 'there'}.</h1>
          <p>{roleCopy[user.type] || roleCopy.vendor}</p>
        </div>
        <Link href={user.type === 'venue' ? '/apply/venue' : user.type === 'host' ? '/apply/host' : '/browse'} className="btn btn--primary">
          {user.type === 'venue' ? 'Submit venue' : user.type === 'host' ? 'Host an event' : 'Browse opportunities'}
        </Link>
      </section>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}><FileText size={20} /><strong>{submissionCount}</strong><span>Active applications</span></div>
        <div className={styles.statCard}><Heart size={20} /><strong>{savedSpaces.length}</strong><span>Saved opportunities</span></div>
        <div className={styles.statCard}><MessageSquare size={20} /><strong>0</strong><span>Unread messages</span></div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Next steps</h2>
        <div className={styles.checklist}>
          {nextSteps.map((step, index) => (
            <div key={step} className={styles.checkItem}>
              <CheckCircle size={18} />
              <span>{step}</span>
              <em>{index === 0 ? 'Recommended' : 'Optional'}</em>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recommended opportunities</h2>
        <div className="grid-2">
          {SPACES_DATA.slice(0, 2).map((space) => <SpaceCard key={space.id} space={space} />)}
        </div>
      </section>
    </>
  );
}

function Profile({ user }) {
  const role = user.type || 'vendor';
  const profileFields = {
    vendor: ['Business name', 'Vendor category', 'Business description', 'Website / Instagram', 'City', 'Setup needs', 'Food permit status', 'Product photos'],
    venue: ['Venue name', 'Space type', 'Address / city', 'Capacity', 'Amenities', 'Rules', 'Availability', 'Pricing'],
    host: ['Organization name', 'Event types hosted', 'Typical vendor count', 'Preferred cities', 'Promotion channels', 'Past events', 'Contact info'],
    attendee: ['Name', 'Email', 'Home city', 'Event interests', 'Saved event preferences', 'Weekend availability'],
  }[role];

  return (
    <section className={styles.profileGrid}>
      <div className={styles.formSections}>
        <div className={styles.pageIntro}>
          <h1>Profile</h1>
          <p>Help hosts, venues, and vendors understand who you are before reviewing applications or requests.</p>
        </div>
        <div className={styles.fieldGrid}>
          {profileFields.map((field) => (
            <label key={field} className={styles.fakeField}>
              <span>{field}</span>
              <input placeholder={`Add ${field.toLowerCase()}`} />
            </label>
          ))}
        </div>
      </div>
      <aside className={styles.previewCard}>
        <span>Profile preview</span>
        <h2>{user.name || 'Your profile'}</h2>
        <p>{roleCopy[role]}</p>
        <div className={styles.previewTags}>
          <span>{role}</span>
          <span>Bay Area</span>
          <span>70% complete</span>
        </div>
      </aside>
    </section>
  );
}

function Applications({ submissions }) {
  const items = [
    ...submissions.vendor.map((item) => ({
      title: item.brand_name || 'Vendor application',
      status: item.status || 'Submitted',
      date: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recently',
      next: 'PopUpCo review in progress',
    })),
    ...submissions.venue.map((item) => ({
      title: item.venue_name || 'Venue submission',
      status: item.status || 'Submitted',
      date: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recently',
      next: 'Venue fit review',
    })),
    ...submissions.host.map((item) => ({
      title: item.org_name || 'Host request',
      status: item.status || 'Submitted',
      date: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recently',
      next: 'Event concept review',
    })),
  ];

  return (
    <section className={styles.section}>
      <div className={styles.pageIntro}>
        <h1>Applications</h1>
        <p>Track active, draft, and past applications in one place.</p>
      </div>
      <div className={styles.applicationTabs}>
        <span>Active applications</span>
        <span>Draft applications</span>
        <span>Past applications</span>
      </div>
      {items.length === 0 ? (
        <EmptyState icon={Bookmark} title="No applications yet" copy="Apply to an opportunity and it will appear here." href="/browse" cta="Browse opportunities" />
      ) : (
        <div className={styles.applicationList}>
          {items.map((item, i) => (
            <div key={`${item.title}-${i}`} className={styles.appRow}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.date} - {item.next}</p>
              </div>
              <span className={styles.statusPill}>{item.status}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Saved({ savedSpaces }) {
  if (!savedSpaces.length) {
    return <EmptyState icon={Heart} title="No saved opportunities yet" copy="Click the heart icon on any listing to save it here." href="/browse" cta="Browse opportunities" />;
  }
  return (
    <section className={styles.section}>
      <div className={styles.pageIntro}>
        <h1>Saved</h1>
        <p>Saved opportunities and events you want to revisit.</p>
      </div>
      <div className="grid-2">{savedSpaces.map((space) => <SpaceCard key={space.id} space={space} />)}</div>
    </section>
  );
}

function Messages() {
  return (
    <section className={styles.section}>
      <div className={styles.pageIntro}>
        <h1>Messages</h1>
        <p>Messages from hosts, venues, and PopUpCo will appear here.</p>
      </div>
      <div className={styles.inboxLayout}>
        <div className={styles.inboxList}>
          <button className={styles.inboxActive}>PopUpCo Welcome <span>New</span></button>
        </div>
        <div className={styles.messagePane}>
          <div className={styles.welcomeMessage}>
            <div className={styles.messageAvatar}>P</div>
            <div>
              <div className={styles.messageTop}><strong>PopUpCo</strong><span className={styles.unreadPill}>New</span></div>
              <p>Welcome to PopUpCo. Application updates, host replies, setup notes, and marketplace messages will show up here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SettingsPage({ user }) {
  return (
    <section className={styles.section}>
      <div className={styles.pageIntro}>
        <h1>Settings</h1>
        <p>Manage your account, notifications, role, and password options.</p>
      </div>
      <div className={styles.settingsGrid}>
        <div className={styles.settingCard}><Bell size={20} /><strong>Notification preferences</strong><p>Email me about applications, messages, and saved opportunities.</p></div>
        <div className={styles.settingCard}><User size={20} /><strong>Account email</strong><p>{user.email}</p></div>
        <div className={styles.settingCard}><Settings size={20} /><strong>Role/account type</strong><p>{user.type}</p></div>
        <div className={styles.settingCard}><LogOut size={20} /><strong>Deactivate account</strong><p>Account deletion is available by contacting PopUpCo during beta.</p></div>
      </div>
    </section>
  );
}

export default function DashboardWorkspace({ section = 'overview' }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [savedIds, setSavedIds] = useState([]);
  const [submissions, setSubmissions] = useState({ vendor: [], venue: [], host: [] });

  useEffect(() => {
    if (!loading && !user) router.replace(loginHref(pathname, 'dashboard'));
  }, [loading, pathname, router, user]);

  useEffect(() => {
    if (!user) return;
    setSavedIds(JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]'));

    const fetchApplications = async () => {
      const [vendorRes, venueRes, hostRes] = await Promise.all([
        supabase.from('vendor_applications').select('brand_name, event_slug, created_at, status').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('venue_applications').select('venue_name, created_at, status').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('host_applications').select('org_name, event_concept, created_at, status').eq('user_id', user.id).order('created_at', { ascending: false }),
      ]);
      setSubmissions({
        vendor: vendorRes.data || [],
        venue: venueRes.data || [],
        host: hostRes.data || [],
      });
    };
    fetchApplications();
  }, [user]);

  const savedSpaces = useMemo(() => SPACES_DATA.filter((space) => savedIds.includes(space.id)), [savedIds]);

  if (loading || !user) return null;

  const submissionCount = submissions.vendor.length + submissions.venue.length + submissions.host.length;

  const content = {
    overview: <Overview user={user} savedSpaces={savedSpaces} submissionCount={submissionCount} />,
    profile: <Profile user={user} />,
    applications: <Applications submissions={submissions} />,
    saved: <Saved savedSpaces={savedSpaces} />,
    messages: <Messages />,
    settings: <SettingsPage user={user} />,
  }[section] || <Overview user={user} savedSpaces={savedSpaces} />;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={`container ${styles.grid}`}>
          <Sidebar user={user} section={section} savedCount={savedSpaces.length} logout={logout} />
          <div className={styles.content}>{content}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
