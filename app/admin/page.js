'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  RefreshCw, MapPin, Calendar, Inbox, ChevronRight,
  AlertCircle, Users, ShieldCheck, LogOut, Store,
  Search, TrendingUp, UserCheck, UserX, Clock,
  Mail, Phone, Globe, Instagram, Tag, ChevronDown,
  Activity, BarChart2, MessageSquare, Building2
} from 'lucide-react';
import styles from './page.module.css';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function timeSince(dateStr) {
  if (!dateStr) return '—';
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function getInitials(user) {
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name;
  if (name) {
    const parts = name.split(' ');
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];
  }
  return (user?.email || '?')[0].toUpperCase();
}

const AVATAR_COLORS = [
  '#C4622D', '#7A9E7E', '#5B7FA6', '#9B6B9B', '#C4A72D', '#2DA87A'
];

function avatarColor(email) {
  let hash = 0;
  for (let i = 0; i < (email || '').length; i++) hash = (hash + email.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[hash];
}

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState({ vendors: [], venues: [], hosts: [], contacts: [], users: [] });
  const [refreshing, setRefreshing] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [userSearch, setUserSearch] = useState('');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });
      const resData = await res.json();
      if (resData.success) {
        setAuth(true);
        fetchData(password);
      } else {
        setError('Invalid password. Access denied.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setAuth(false);
    setPassword('');
    setData({ vendors: [], venues: [], hosts: [], contacts: [], users: [] });
  }

  async function fetchData(adminPassword = password) {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'fetch', password: adminPassword }),
      });
      const resData = await res.json();
      if (resData.success) setData(resData.data);
      else if (resData.error === 'Unauthorized') handleLogout();
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }

  function toggleRow(id) {
    setExpandedRow(expandedRow === id ? null : id);
  }

  const filteredUsers = (data.users || []).filter((u) => {
    if (!userSearch) return true;
    const q = userSearch.toLowerCase();
    return (
      (u.email || '').toLowerCase().includes(q) ||
      (u.user_metadata?.full_name || '').toLowerCase().includes(q) ||
      (u.user_metadata?.name || '').toLowerCase().includes(q)
    );
  });

  const usersThisWeek = (data.users || []).filter(u => (now - new Date(u.created_at)) < 7 * 86400000).length;
  const activeToday = (data.users || []).filter(u => u.last_sign_in_at && (now - new Date(u.last_sign_in_at)) < 86400000).length;
  const verifiedCount = (data.users || []).filter(u => u.email_confirmed_at).length;
  const totalSubmissions = data.vendors.length + data.venues.length + data.hosts.length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'users', label: 'All Accounts', icon: Users, count: data.users?.length },
    { id: 'vendors', label: 'Vendor Apps', icon: Store, count: data.vendors.length },
    { id: 'venues', label: 'Venues', icon: Building2, count: data.venues.length },
    { id: 'hosts', label: 'Hosts', icon: Calendar, count: data.hosts.length },
    { id: 'contacts', label: 'Messages', icon: MessageSquare, count: data.contacts.length },
  ];

  /* ──────────────────────────────── LOGIN SCREEN ──────────────────────────── */
  if (!auth) {
    return (
      <div className={styles.loginScreen}>
        <div className={styles.loginBg} />
        <div className={styles.loginCard}>
          <div className={styles.loginLogo}>
            <ShieldCheck size={28} />
          </div>
          <div className={styles.loginBrand}>PopUpCo</div>
          <h1 className={styles.loginTitle}>Admin Portal</h1>
          <p className={styles.loginSubtitle}>Restricted access — administrators only</p>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputWrap}>
              <ShieldCheck size={16} className={styles.inputIcon} />
              <input
                type="password"
                className={styles.loginInput}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
            {error && <p className={styles.loginError}>{error}</p>}
            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? (
                <><RefreshCw size={15} className={styles.spin} /> Verifying...</>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <Link href="/" className={styles.loginBack}>← Return to site</Link>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────── DASHBOARD ─────────────────────────────── */
  return (
    <div className={styles.shell}>

      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHead}>
          <div className={styles.sidebarLogo}>
            <span className={styles.sidebarLogoMark}>P</span>
            <span className={styles.sidebarLogoText}>PopUpCo</span>
          </div>
          <span className={styles.adminBadge}>Admin</span>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setExpandedRow(null); }}
              className={`${styles.navItem} ${activeTab === id ? styles.navItemActive : ''}`}
            >
              <Icon size={16} className={styles.navIcon} />
              <span className={styles.navLabel}>{label}</span>
              {count !== undefined && (
                <span className={`${styles.navBadge} ${activeTab === id ? styles.navBadgeActive : ''}`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFoot}>
          <div className={styles.sidebarStatus}>
            <span className={styles.statusDot} />
            <span>Live</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.main}>

        {/* TOP BAR */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <h2 className={styles.topbarTitle}>
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h2>
            <span className={styles.topbarTime}>
              {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
          </div>
          <button
            onClick={fetchData}
            className={`${styles.refreshBtn} ${refreshing ? styles.refreshing : ''}`}
            disabled={refreshing}
          >
            <RefreshCw size={14} className={refreshing ? styles.spin : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </header>

        <div className={styles.content}>

          {/* ─── OVERVIEW ─── */}
          {activeTab === 'overview' && (
            <div className={styles.overviewWrap}>
              <div className={styles.kpiGrid}>
                <div className={styles.kpiCard} onClick={() => setActiveTab('users')} style={{ cursor: 'pointer' }}>
                  <div className={styles.kpiTop}>
                    <span className={styles.kpiLabel}>Total Accounts</span>
                    <div className={`${styles.kpiIcon} ${styles.kpiIconBlue}`}><Users size={18} /></div>
                  </div>
                  <div className={styles.kpiValue}>{data.users?.length || 0}</div>
                  <div className={styles.kpiSub}>+{usersThisWeek} this week</div>
                </div>

                <div className={styles.kpiCard} onClick={() => setActiveTab('users')} style={{ cursor: 'pointer' }}>
                  <div className={styles.kpiTop}>
                    <span className={styles.kpiLabel}>Active Today</span>
                    <div className={`${styles.kpiIcon} ${styles.kpiIconGreen}`}><Activity size={18} /></div>
                  </div>
                  <div className={styles.kpiValue}>{activeToday}</div>
                  <div className={styles.kpiSub}>Signed in last 24h</div>
                </div>

                <div className={styles.kpiCard}>
                  <div className={styles.kpiTop}>
                    <span className={styles.kpiLabel}>Applications</span>
                    <div className={`${styles.kpiIcon} ${styles.kpiIconOrange}`}><Inbox size={18} /></div>
                  </div>
                  <div className={styles.kpiValue}>{totalSubmissions}</div>
                  <div className={styles.kpiSub}>Vendors · Venues · Hosts</div>
                </div>

                <div className={styles.kpiCard}>
                  <div className={styles.kpiTop}>
                    <span className={styles.kpiLabel}>Messages</span>
                    <div className={`${styles.kpiIcon} ${styles.kpiIconPurple}`}><MessageSquare size={18} /></div>
                  </div>
                  <div className={styles.kpiValue}>{data.contacts.length}</div>
                  <div className={styles.kpiSub}>Contact form submissions</div>
                </div>
              </div>

              {/* Recent signups */}
              <div className={styles.recentSection}>
                <div className={styles.recentHeader}>
                  <h3 className={styles.recentTitle}>Recent Signups</h3>
                  <button className={styles.viewAllBtn} onClick={() => setActiveTab('users')}>
                    View all <ChevronRight size={13} />
                  </button>
                </div>
                <div className={styles.recentList}>
                  {(data.users || []).slice(0, 8).map(u => (
                    <div key={u.id} className={styles.recentRow}>
                      <div
                        className={styles.recentAvatar}
                        style={{ background: avatarColor(u.email) }}
                      >
                        {getInitials(u)}
                      </div>
                      <div className={styles.recentInfo}>
                        <div className={styles.recentName}>
                          {u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0]}
                        </div>
                        <div className={styles.recentEmail}>{u.email}</div>
                      </div>
                      <div className={styles.recentMeta}>
                        <div className={styles.recentTime}>{timeSince(u.created_at)}</div>
                        {u.email_confirmed_at
                          ? <span className={styles.verifiedDot} title="Verified" />
                          : <span className={styles.unverifiedDot} title="Unverified" />}
                      </div>
                    </div>
                  ))}
                  {(data.users || []).length === 0 && (
                    <div className={styles.emptyState}>No accounts yet.</div>
                  )}
                </div>
              </div>

              {/* Breakdown row */}
              <div className={styles.breakdownGrid}>
                <div className={styles.breakdownCard} onClick={() => setActiveTab('vendors')} style={{ cursor: 'pointer' }}>
                  <Store size={20} className={styles.bdIcon} />
                  <div className={styles.bdNum}>{data.vendors.length}</div>
                  <div className={styles.bdLabel}>Vendor Apps</div>
                </div>
                <div className={styles.breakdownCard} onClick={() => setActiveTab('venues')} style={{ cursor: 'pointer' }}>
                  <Building2 size={20} className={styles.bdIcon} />
                  <div className={styles.bdNum}>{data.venues.length}</div>
                  <div className={styles.bdLabel}>Venue Submissions</div>
                </div>
                <div className={styles.breakdownCard} onClick={() => setActiveTab('hosts')} style={{ cursor: 'pointer' }}>
                  <Calendar size={20} className={styles.bdIcon} />
                  <div className={styles.bdNum}>{data.hosts.length}</div>
                  <div className={styles.bdLabel}>Host Applications</div>
                </div>
                <div className={styles.breakdownCard} onClick={() => setActiveTab('contacts')} style={{ cursor: 'pointer' }}>
                  <MessageSquare size={20} className={styles.bdIcon} />
                  <div className={styles.bdNum}>{data.contacts.length}</div>
                  <div className={styles.bdLabel}>Contact Messages</div>
                </div>
              </div>
            </div>
          )}

          {/* ─── ALL USERS ─── */}
          {activeTab === 'users' && (
            <div className={styles.tabWrap}>
              <div className={styles.userStatRow}>
                <div className={styles.userStat}>
                  <div className={styles.userStatVal}>{data.users?.length || 0}</div>
                  <div className={styles.userStatLabel}>Total</div>
                </div>
                <div className={styles.userStatDivider} />
                <div className={styles.userStat}>
                  <div className={styles.userStatVal}>{usersThisWeek}</div>
                  <div className={styles.userStatLabel}>This week</div>
                </div>
                <div className={styles.userStatDivider} />
                <div className={styles.userStat}>
                  <div className={styles.userStatVal}>{activeToday}</div>
                  <div className={styles.userStatLabel}>Active today</div>
                </div>
                <div className={styles.userStatDivider} />
                <div className={styles.userStat}>
                  <div className={styles.userStatVal}>{verifiedCount}</div>
                  <div className={styles.userStatLabel}>Verified</div>
                </div>
              </div>

              <div className={styles.searchRow}>
                <div className={styles.searchBox}>
                  <Search size={15} className={styles.searchIcon} />
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search accounts by name or email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                  {userSearch && (
                    <button className={styles.searchClear} onClick={() => setUserSearch('')}>✕</button>
                  )}
                </div>
                <span className={styles.searchCount}>
                  {filteredUsers.length} of {data.users?.length || 0}
                </span>
              </div>

              <div className={styles.dataTable}>
                <div className={styles.tableHead}>
                  <div className={`${styles.tableRow} ${styles.userRow}`}>
                    <div className={styles.th}>Account</div>
                    <div className={styles.th}>Joined</div>
                    <div className={styles.th}>Last Login</div>
                    <div className={styles.th}>Status</div>
                    <div className={styles.th}>Provider</div>
                    <div className={styles.th}>ID</div>
                  </div>
                </div>
                <div className={styles.tableBody}>
                  {filteredUsers.length === 0 ? (
                    <div className={styles.emptyState}>
                      {userSearch ? `No accounts match "${userSearch}"` : 'No accounts yet.'}
                    </div>
                  ) : filteredUsers.map((u) => (
                    <div key={u.id} className={`${styles.tableRow} ${styles.userRow} ${styles.tableRowHover}`}>
                      <div className={styles.td}>
                        <div
                          className={styles.avatar}
                          style={{ background: avatarColor(u.email) }}
                        >
                          {getInitials(u)}
                        </div>
                        <div className={styles.accountInfo}>
                          <div className={styles.accountName}>
                            {u.user_metadata?.full_name || u.user_metadata?.name || (
                              <span className={styles.dimmed}>No name set</span>
                            )}
                          </div>
                          <div className={styles.accountEmail}>{u.email}</div>
                        </div>
                      </div>
                      <div className={styles.td}>
                        <div>
                          <div className={styles.tdMain}>{formatDateShort(u.created_at)}</div>
                          <div className={styles.tdSub}>{timeSince(u.created_at)}</div>
                        </div>
                      </div>
                      <div className={styles.td}>
                        {u.last_sign_in_at ? (
                          <div>
                            <div className={styles.tdMain}>{formatDateShort(u.last_sign_in_at)}</div>
                            <div className={styles.tdSub}>{timeSince(u.last_sign_in_at)}</div>
                          </div>
                        ) : <span className={styles.dimmed}>Never</span>}
                      </div>
                      <div className={styles.td}>
                        {u.email_confirmed_at ? (
                          <span className={styles.pill + ' ' + styles.pillGreen}>
                            <UserCheck size={11} /> Verified
                          </span>
                        ) : (
                          <span className={styles.pill + ' ' + styles.pillGray}>
                            <UserX size={11} /> Unverified
                          </span>
                        )}
                      </div>
                      <div className={styles.td}>
                        <span className={styles.providerChip}>
                          {u.app_metadata?.provider || 'email'}
                        </span>
                      </div>
                      <div className={styles.td}>
                        <span className={styles.userId} title={u.id}>{u.id.slice(0, 8)}…</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── VENDORS ─── */}
          {activeTab === 'vendors' && (
            <div className={styles.tabWrap}>
              {data.vendors.length === 0 ? (
                <div className={styles.emptyState}>No vendor applications yet.</div>
              ) : (
                <div className={styles.dataTable}>
                  <div className={styles.tableHead}>
                    <div className={`${styles.tableRow} ${styles.vendorRow}`}>
                      <div className={styles.th}>Business</div>
                      <div className={styles.th}>Contact</div>
                      <div className={styles.th}>Category</div>
                      <div className={styles.th}>Event Pref</div>
                      <div className={styles.th}>Submitted</div>
                      <div className={styles.th}></div>
                    </div>
                  </div>
                  <div className={styles.tableBody}>
                    {data.vendors.map((v) => (
                      <div key={v.id} className={styles.rowGroup}>
                        <div
                          className={`${styles.tableRow} ${styles.vendorRow} ${styles.tableRowHover}`}
                          onClick={() => toggleRow(v.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className={styles.td}>
                            <div className={styles.entityAvatar} style={{ background: '#C4622D22', color: '#C4622D' }}>
                              <Store size={14} />
                            </div>
                            <div>
                              <div className={styles.tdMain}>{v.brand_name}</div>
                              {v.website && <div className={styles.tdSub}>{v.website}</div>}
                            </div>
                          </div>
                          <div className={styles.td}>
                            <div>
                              <div className={styles.tdMain}>{v.contact_name}</div>
                              <div className={styles.tdSub}>{v.email}</div>
                            </div>
                          </div>
                          <div className={styles.td}>
                            <span className={styles.categoryChip}>
                              {Array.isArray(v.categories) ? v.categories[0] : v.categories}
                              {Array.isArray(v.categories) && v.categories.length > 1 && ` +${v.categories.length - 1}`}
                            </span>
                          </div>
                          <div className={styles.td}>
                            <span className={styles.dimmed}>{v.event_slug || 'Any'}</span>
                          </div>
                          <div className={styles.td}>
                            <div className={styles.tdSub}>{timeSince(v.created_at)}</div>
                          </div>
                          <div className={styles.td}>
                            <ChevronDown
                              size={15}
                              className={`${styles.expandChevron} ${expandedRow === v.id ? styles.expandChevronOpen : ''}`}
                            />
                          </div>
                        </div>
                        {expandedRow === v.id && (
                          <div className={styles.expandPanel}>
                            <div className={styles.expandGrid}>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Brand</div>
                                <div className={styles.expandField}><Globe size={12} />{v.website || '—'}</div>
                                <div className={styles.expandField}><Instagram size={12} />{v.instagram || '—'}</div>
                                <div className={styles.expandField}><Tag size={12} />{v.price_range || '—'}</div>
                              </div>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Contact</div>
                                <div className={styles.expandField}><Mail size={12} />{v.email}</div>
                                <div className={styles.expandField}><Phone size={12} />{v.phone || '—'}</div>
                              </div>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Categories</div>
                                <div className={styles.chipWrap}>
                                  {(Array.isArray(v.categories) ? v.categories : [v.categories]).map(c => (
                                    <span key={c} className={styles.chip}>{c}</span>
                                  ))}
                                </div>
                              </div>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Booth & Permits</div>
                                <div className={styles.expandRow}><span>Booth needs</span><span>{v.booth_needs || '—'}</span></div>
                                <div className={styles.expandRow}><span>Food permit</span><span>{v.food_permit || '—'}</span></div>
                                <div className={styles.expandRow}><span>Prev events</span><span>{v.previous_events || '—'}</span></div>
                              </div>
                            </div>
                            {v.description && (
                              <div className={styles.expandNote}>
                                <div className={styles.expandBlockTitle}>Description</div>
                                <p>{v.description}</p>
                              </div>
                            )}
                            {v.message && (
                              <div className={styles.expandNote}>
                                <div className={styles.expandBlockTitle}>Message</div>
                                <p>{v.message}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── VENUES ─── */}
          {activeTab === 'venues' && (
            <div className={styles.tabWrap}>
              {data.venues.length === 0 ? (
                <div className={styles.emptyState}>No venue submissions yet.</div>
              ) : (
                <div className={styles.dataTable}>
                  <div className={styles.tableHead}>
                    <div className={`${styles.tableRow} ${styles.venueRow}`}>
                      <div className={styles.th}>Venue</div>
                      <div className={styles.th}>Location</div>
                      <div className={styles.th}>Type</div>
                      <div className={styles.th}>Capacity</div>
                      <div className={styles.th}>Contact</div>
                      <div className={styles.th}></div>
                    </div>
                  </div>
                  <div className={styles.tableBody}>
                    {data.venues.map((v) => (
                      <div key={v.id} className={styles.rowGroup}>
                        <div
                          className={`${styles.tableRow} ${styles.venueRow} ${styles.tableRowHover}`}
                          onClick={() => toggleRow(v.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className={styles.td}>
                            <div className={styles.entityAvatar} style={{ background: '#7A9E7E22', color: '#4A7A4E' }}>
                              <Building2 size={14} />
                            </div>
                            <div className={styles.tdMain}>{v.venue_name}</div>
                          </div>
                          <div className={styles.td}>
                            <div>
                              <div className={styles.tdMain}>{v.city}</div>
                              <div className={styles.tdSub}>{v.address}</div>
                            </div>
                          </div>
                          <div className={styles.td}>
                            <span className={styles.chip}>{v.indoor_outdoor}</span>
                          </div>
                          <div className={styles.td}>
                            <span className={styles.tdMain}>{v.capacity}</span>
                          </div>
                          <div className={styles.td}>
                            <div>
                              <div className={styles.tdMain}>{v.contact_name}</div>
                              <div className={styles.tdSub}>{v.email}</div>
                            </div>
                          </div>
                          <div className={styles.td}>
                            <ChevronDown size={15} className={`${styles.expandChevron} ${expandedRow === v.id ? styles.expandChevronOpen : ''}`} />
                          </div>
                        </div>
                        {expandedRow === v.id && (
                          <div className={styles.expandPanel}>
                            <div className={styles.expandGrid}>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Venue Details</div>
                                <div className={styles.expandRow}><span>Food allowed</span><span>{v.food_allowed ? 'Yes' : 'No'}</span></div>
                                <div className={styles.expandRow}><span>Parking</span><span>{v.parking || '—'}</span></div>
                                <div className={styles.expandRow}><span>Amenities</span><span>{Array.isArray(v.amenities) ? v.amenities.join(', ') : (v.amenities || '—')}</span></div>
                              </div>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Contact</div>
                                <div className={styles.expandField}><Mail size={12} />{v.email}</div>
                                <div className={styles.expandField}><Phone size={12} />{v.phone || '—'}</div>
                                <div className={styles.expandField}><Globe size={12} />{v.website || '—'}</div>
                              </div>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Pricing & Availability</div>
                                <div className={styles.expandRow}><span>Rental price</span><span>{v.rental_price || '—'}</span></div>
                                <div className={styles.expandRow}><span>Availability</span><span>{v.availability || '—'}</span></div>
                              </div>
                            </div>
                            {v.description && (
                              <div className={styles.expandNote}>
                                <div className={styles.expandBlockTitle}>Description</div>
                                <p>{v.description}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── HOSTS ─── */}
          {activeTab === 'hosts' && (
            <div className={styles.tabWrap}>
              {data.hosts.length === 0 ? (
                <div className={styles.emptyState}>No host applications yet.</div>
              ) : (
                <div className={styles.dataTable}>
                  <div className={styles.tableHead}>
                    <div className={`${styles.tableRow} ${styles.hostRow}`}>
                      <div className={styles.th}>Name / Org</div>
                      <div className={styles.th}>Event Concept</div>
                      <div className={styles.th}>Location</div>
                      <div className={styles.th}>Budget</div>
                      <div className={styles.th}>Submitted</div>
                      <div className={styles.th}></div>
                    </div>
                  </div>
                  <div className={styles.tableBody}>
                    {data.hosts.map((h) => (
                      <div key={h.id} className={styles.rowGroup}>
                        <div
                          className={`${styles.tableRow} ${styles.hostRow} ${styles.tableRowHover}`}
                          onClick={() => toggleRow(h.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className={styles.td}>
                            <div className={styles.entityAvatar} style={{ background: '#5B7FA622', color: '#5B7FA6' }}>
                              <Calendar size={14} />
                            </div>
                            <div>
                              <div className={styles.tdMain}>{h.name}</div>
                              <div className={styles.tdSub}>{h.org_name || h.email}</div>
                            </div>
                          </div>
                          <div className={styles.td}><span className={styles.tdMain}>{h.event_concept}</span></div>
                          <div className={styles.td}><span className={styles.dimmed}>{h.location || '—'}</span></div>
                          <div className={styles.td}><span className={styles.tdMain}>{h.budget || '—'}</span></div>
                          <div className={styles.td}><div className={styles.tdSub}>{timeSince(h.created_at)}</div></div>
                          <div className={styles.td}>
                            <ChevronDown size={15} className={`${styles.expandChevron} ${expandedRow === h.id ? styles.expandChevronOpen : ''}`} />
                          </div>
                        </div>
                        {expandedRow === h.id && (
                          <div className={styles.expandPanel}>
                            <div className={styles.expandGrid}>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Contact</div>
                                <div className={styles.expandField}><Mail size={12} />{h.email}</div>
                                <div className={styles.expandField}><Phone size={12} />{h.phone || '—'}</div>
                                <div className={styles.expandRow}><span>Role</span><span>{h.role || '—'}</span></div>
                              </div>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Event Details</div>
                                <div className={styles.expandRow}><span>Date</span><span>{h.event_date || '—'}</span></div>
                                <div className={styles.expandRow}><span>Venue status</span><span>{h.venue_status || '—'}</span></div>
                                <div className={styles.expandRow}><span>Expected vendors</span><span>{h.expected_vendors || '—'}</span></div>
                                <div className={styles.expandRow}><span>Expected attendance</span><span>{h.expected_attendance || '—'}</span></div>
                              </div>
                              <div className={styles.expandBlock}>
                                <div className={styles.expandBlockTitle}>Background</div>
                                <div className={styles.expandRow}><span>Experience</span><span>{h.experience || '—'}</span></div>
                                <div className={styles.expandRow}><span>Goals</span><span>{h.goals || '—'}</span></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── CONTACTS ─── */}
          {activeTab === 'contacts' && (
            <div className={styles.tabWrap}>
              {data.contacts.length === 0 ? (
                <div className={styles.emptyState}>No contact messages yet.</div>
              ) : (
                <div className={styles.dataTable}>
                  <div className={styles.tableHead}>
                    <div className={`${styles.tableRow} ${styles.contactRow}`}>
                      <div className={styles.th}>From</div>
                      <div className={styles.th}>Type</div>
                      <div className={styles.th}>Message</div>
                      <div className={styles.th}>Received</div>
                    </div>
                  </div>
                  <div className={styles.tableBody}>
                    {data.contacts.map((c) => (
                      <div key={c.id} className={`${styles.tableRow} ${styles.contactRow} ${styles.tableRowHover}`}>
                        <div className={styles.td}>
                          <div className={styles.entityAvatar} style={{ background: '#9B6B9B22', color: '#9B6B9B' }}>
                            <Mail size={14} />
                          </div>
                          <div>
                            <div className={styles.tdMain}>{c.name}</div>
                            <div className={styles.tdSub}>{c.email}</div>
                          </div>
                        </div>
                        <div className={styles.td}>
                          <span className={styles.categoryChip}>{c.subject || 'General'}</span>
                        </div>
                        <div className={styles.td + ' ' + styles.tdMessage}>{c.message}</div>
                        <div className={styles.td}>
                          <div className={styles.tdSub}>{timeSince(c.created_at)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
