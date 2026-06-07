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

function Sidebar({ user, section, savedCount, logout, profilePct }) {
  return (
    <aside className={styles.sidebar}>
      <div className={`card ${styles.profileCard}`}>
        <div className={styles.avatarLarge}>{user.name?.charAt(0)?.toUpperCase() || 'P'}</div>
        <h3>{user.name || 'PopUpCo User'}</h3>
        <p>{user.email}</p>
        <div className={styles.progressBlock}>
          <div className={styles.progressText}>
            <span>Profile completion</span>
            <span>{profilePct}%</span>
          </div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${profilePct}%` }} /></div>
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

const profileFieldConfig = {
  vendor: [
    { label: 'Business name', key: 'business_name' },
    { label: 'Vendor category', key: 'category' },
    { label: 'Business description', key: 'bio', multiline: true },
    { label: 'Website / Instagram', key: 'website' },
    { label: 'City', key: 'city' },
    { label: 'Setup needs', key: 'setup_needs' },
    { label: 'Food permit status', key: 'food_permit' },
  ],
  venue: [
    { label: 'Venue name', key: 'venue_name' },
    { label: 'Space type', key: 'space_type' },
    { label: 'Address / city', key: 'address' },
    { label: 'Capacity', key: 'capacity' },
    { label: 'Amenities', key: 'amenities' },
    { label: 'Rules', key: 'rules', multiline: true },
    { label: 'Availability', key: 'availability' },
    { label: 'Pricing', key: 'pricing' },
  ],
  host: [
    { label: 'Organization name', key: 'org_name' },
    { label: 'Event types hosted', key: 'event_types' },
    { label: 'Typical vendor count', key: 'vendor_count' },
    { label: 'Preferred cities', key: 'preferred_cities' },
    { label: 'Promotion channels', key: 'promo_channels' },
    { label: 'Past events', key: 'past_events', multiline: true },
    { label: 'Contact info', key: 'contact_info' },
  ],
  attendee: [
    { label: 'Name', key: 'display_name' },
    { label: 'Home city', key: 'city' },
    { label: 'Event interests', key: 'interests' },
    { label: 'Weekend availability', key: 'availability' },
  ],
};

function Profile({ user, profilePct, onSaved }) {
  const role = user.type || 'vendor';
  const fieldConfig = profileFieldConfig[role] || [];
  const [fields, setFields] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      const meta = authUser?.user_metadata || {};
      const initial = {};
      fieldConfig.forEach(({ key }) => { initial[key] = meta[key] || ''; });
      setFields(initial);
      setProfileLoading(false);
    });
  }, []);

  const handleChange = (key, value) => setFields((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setSaveError('');
    const { error } = await supabase.auth.updateUser({ data: fields });
    setSaving(false);
    if (error) { setSaveError(error.message); setSaving(false); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    const filled = fieldConfig.filter(({ key }) => fields[key] && String(fields[key]).trim()).length;
    onSaved(Math.round((filled / fieldConfig.length) * 100));
  };

  const displayName = fields.business_name || fields.venue_name || fields.org_name || fields.display_name || user.name || 'Your profile';

  return (
    <section className={styles.profileGrid}>
      <div className={styles.formSections}>
        <div className={styles.pageIntro}>
          <h1>Profile</h1>
          <p>Help hosts, venues, and vendors understand who you are before reviewing applications or requests.</p>
        </div>
        {profileLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSave} className={styles.fieldGrid}>
            {fieldConfig.map(({ label, key, multiline }) => (
              <label key={key} className={styles.fakeField}>
                <span>{label}</span>
                {multiline ? (
                  <textarea
                    placeholder={`Add ${label.toLowerCase()}`}
                    value={fields[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <input
                    placeholder={`Add ${label.toLowerCase()}`}
                    value={fields[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
              </label>
            ))}
            {saveError && <p className="form-error">{saveError}</p>}
            {saved && <p style={{ color: 'var(--color-sage)', fontSize: '0.875rem' }}>Profile saved.</p>}
            <button type="submit" className="btn btn--primary" disabled={saving} style={{ marginTop: 'var(--sp-4)' }}>
              {saving ? 'Saving...' : 'Save profile'}
            </button>
          </form>
        )}
      </div>
      <aside className={styles.previewCard}>
        <span>Profile preview</span>
        <h2>{displayName}</h2>
        <p>{roleCopy[role]}</p>
        <div className={styles.previewTags}>
          <span>{role}</span>
          {(fields.city || fields.preferred_cities || fields.address) && (
            <span>{fields.city || fields.preferred_cities || fields.address}</span>
          )}
          <span>{profilePct}% complete</span>
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
  const [profilePct, setProfilePct] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.replace(loginHref(pathname, 'dashboard'));
  }, [loading, pathname, router, user]);

  useEffect(() => {
    if (!user) return;

    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      const meta = authUser?.user_metadata || {};

      // Merge localStorage saves with Supabase metadata (cross-device sync)
      const metaSaved = meta.saved_space_ids || [];
      const localSaved = JSON.parse(localStorage.getItem(`saved_spaces_${user.id}`) || '[]');
      const merged = [...new Set([...metaSaved, ...localSaved])];
      if (merged.length !== localSaved.length) {
        localStorage.setItem(`saved_spaces_${user.id}`, JSON.stringify(merged));
      }
      setSavedIds(merged);

      // Compute real profile completion
      const fields = profileFieldConfig[user.type] || profileFieldConfig.vendor;
      const filled = fields.filter(({ key }) => meta[key] && String(meta[key]).trim()).length;
      setProfilePct(Math.round((filled / fields.length) * 100));
    });

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
    profile: <Profile user={user} profilePct={profilePct} onSaved={setProfilePct} />,
    applications: <Applications submissions={submissions} />,
    saved: <Saved savedSpaces={savedSpaces} />,
    messages: <Messages />,
    settings: <SettingsPage user={user} />,
  }[section] || <Overview user={user} savedSpaces={savedSpaces} submissionCount={submissionCount} />;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={`container ${styles.grid}`}>
          <Sidebar user={user} section={section} savedCount={savedSpaces.length} logout={logout} profilePct={profilePct} />
          <div className={styles.content}>{content}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
