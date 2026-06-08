'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, MapPin, Calendar, Clock, Inbox, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('vendors');
  const [data, setData] = useState({ vendors: [], venues: [], hosts: [], contacts: [] });
  const [refreshing, setRefreshing] = useState(false);

  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const isAuthed = localStorage.getItem('popupco_admin_auth') === 'true';
    if (isAuthed) {
      setAuth(true);
      fetchData();
    }
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
        localStorage.setItem('popupco_admin_auth', 'true');
        setAuth(true);
        fetchData(password);
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('popupco_admin_auth');
    setAuth(false);
    setData({ vendors: [], venues: [], hosts: [], contacts: [] });
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
      if (resData.success) {
        setData(resData.data);
      } else {
        if (resData.error === 'Unauthorized') handleLogout();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }

  function toggleRow(id) {
    setExpandedRow(expandedRow === id ? null : id);
  }

  if (!auth) {
    return (
      <div className={styles.loginWrap}>
        <div className={`card ${styles.loginCard}`}>
          <div className={styles.loginIcon}>🔒</div>
          <h1 className={styles.loginTitle}>Admin Access</h1>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              className="form-input"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </form>
          <Link href="/" className={styles.homeLink}>← Back to site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <Link href="/" className={styles.logo}>PopUpCo</Link>
          <span className="badge badge--neutral">Admin</span>
        </div>

        <nav className={styles.nav}>
          <button
            onClick={() => { setActiveTab('vendors'); setExpandedRow(null); }}
            className={`${styles.navBtn} ${activeTab === 'vendors' ? styles.navActive : ''}`}
          >
            <Inbox size={16} /> Vendor Applications
            <span className={styles.navCount}>{data.vendors.length}</span>
          </button>
          <button
            onClick={() => { setActiveTab('venues'); setExpandedRow(null); }}
            className={`${styles.navBtn} ${activeTab === 'venues' ? styles.navActive : ''}`}
          >
            <MapPin size={16} /> Venue Submissions
            <span className={styles.navCount}>{data.venues.length}</span>
          </button>
          <button
            onClick={() => { setActiveTab('hosts'); setExpandedRow(null); }}
            className={`${styles.navBtn} ${activeTab === 'hosts' ? styles.navActive : ''}`}
          >
            <Calendar size={16} /> Host Applications
            <span className={styles.navCount}>{data.hosts.length}</span>
          </button>
          <button
            onClick={() => { setActiveTab('contacts'); setExpandedRow(null); }}
            className={`${styles.navBtn} ${activeTab === 'contacts' ? styles.navActive : ''}`}
          >
            <AlertCircle size={16} /> Contact Messages
            <span className={styles.navCount}>{data.contacts.length}</span>
          </button>
        </nav>

        <div className={styles.sidebarBottom}>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>
            {activeTab === 'vendors' && 'Vendor Applications'}
            {activeTab === 'venues' && 'Venue Submissions'}
            {activeTab === 'hosts' && 'Host Applications'}
            {activeTab === 'contacts' && 'Contact Messages'}
          </h1>
          <button onClick={fetchData} className={`btn btn--secondary btn--sm ${styles.refreshBtn}`} disabled={refreshing}>
            <RefreshCw size={14} className={refreshing ? styles.spin : ''} />
            Refresh
          </button>
        </header>

        <div className={styles.content}>
          {activeTab === 'vendors' && (
            <div className={styles.tableWrap}>
              {data.vendors.length === 0 ? (
                <div className={styles.empty}>No vendor applications yet.</div>
              ) : (
                <div className={styles.table}>
                  <div className={styles.thead}>
                    <div className={styles.tr}>
                      <div className={styles.th}>Date</div>
                      <div className={styles.th}>Business</div>
                      <div className={styles.th}>Contact</div>
                      <div className={styles.th}>Event Pref</div>
                      <div className={styles.th}></div>
                    </div>
                  </div>
                  <div className={styles.tbody}>
                    {data.vendors.map((v) => (
                      <div key={v.id} className={styles.rowGroup}>
                        <div className={`${styles.tr} ${styles.trClickable}`} onClick={() => toggleRow(v.id)}>
                          <div className={styles.td}>{formatDate(v.created_at)}</div>
                          <div className={styles.td}>
                            <strong>{v.brand_name}</strong>
                            <div className={styles.tdSub}>{Array.isArray(v.categories) ? v.categories.join(', ') : v.categories}</div>
                          </div>
                          <div className={styles.td}>
                            {v.contact_name}
                            <div className={styles.tdSub}>{v.email}</div>
                          </div>
                          <div className={styles.td}>
                            {v.event_slug || 'Any'}
                          </div>
                          <div className={styles.tdRight}>
                            <ChevronRight size={16} className={`${styles.chevron} ${expandedRow === v.id ? styles.chevronOpen : ''}`} />
                          </div>
                        </div>
                        {expandedRow === v.id && (
                          <div className={styles.expandedContent}>
                            <div className={styles.detailGrid}>
                              <div className={styles.detailBlock}>
                                <h4>Brand Info</h4>
                                <p><strong>Name:</strong> {v.brand_name}</p>
                                <p><strong>Website:</strong> {v.website || '-'}</p>
                                <p><strong>Instagram:</strong> {v.instagram || '-'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Contact</h4>
                                <p><strong>Name:</strong> {v.contact_name}</p>
                                <p><strong>Email:</strong> {v.email}</p>
                                <p><strong>Phone:</strong> {v.phone || '-'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Products</h4>
                                <p><strong>Categories:</strong> {Array.isArray(v.categories) ? v.categories.join(', ') : v.categories}</p>
                                <p><strong>Desc:</strong> {v.description}</p>
                                <p><strong>Price range:</strong> {v.price_range}</p>
                                <p><strong>Previous events:</strong> {v.previous_events || '-'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Booth & Permits</h4>
                                <p><strong>Event:</strong> {v.event_slug || 'Any'}</p>
                                <p><strong>Booth needs:</strong> {v.booth_needs || '-'}</p>
                                <p><strong>Food permit:</strong> {v.food_permit || '-'}</p>
                              </div>
                            </div>
                            {v.message && (
                              <div className={styles.notesBlock}>
                                <h4>Message</h4>
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

          {activeTab === 'venues' && (
            <div className={styles.tableWrap}>
              {data.venues.length === 0 ? (
                <div className={styles.empty}>No venue submissions yet.</div>
              ) : (
                <div className={styles.table}>
                  <div className={styles.thead}>
                    <div className={styles.tr}>
                      <div className={styles.th}>Date</div>
                      <div className={styles.th}>Venue</div>
                      <div className={styles.th}>Location</div>
                      <div className={styles.th}>Capacity</div>
                      <div className={styles.th}></div>
                    </div>
                  </div>
                  <div className={styles.tbody}>
                    {data.venues.map((v) => (
                      <div key={v.id} className={styles.rowGroup}>
                        <div className={`${styles.tr} ${styles.trClickable}`} onClick={() => toggleRow(v.id)}>
                          <div className={styles.td}>{formatDate(v.created_at)}</div>
                          <div className={styles.td}>
                            <strong>{v.venue_name}</strong>
                            <div className={styles.tdSub}>{v.indoor_outdoor}</div>
                          </div>
                          <div className={styles.td}>
                            {v.city}
                            <div className={styles.tdSub}>{v.address}</div>
                          </div>
                          <div className={styles.td}>
                            {v.capacity}
                          </div>
                          <div className={styles.tdRight}>
                            <ChevronRight size={16} className={`${styles.chevron} ${expandedRow === v.id ? styles.chevronOpen : ''}`} />
                          </div>
                        </div>
                        {expandedRow === v.id && (
                          <div className={styles.expandedContent}>
                            <div className={styles.detailGrid}>
                              <div className={styles.detailBlock}>
                                <h4>Venue Info</h4>
                                <p><strong>Name:</strong> {v.venue_name}</p>
                                <p><strong>Address:</strong> {v.address}, {v.city}</p>
                                <p><strong>Indoor/Outdoor:</strong> {v.indoor_outdoor}</p>
                                <p><strong>Capacity:</strong> {v.capacity}</p>
                                <p><strong>Food allowed:</strong> {v.food_allowed ? 'Yes' : 'No'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Contact</h4>
                                <p><strong>Name:</strong> {v.contact_name}</p>
                                <p><strong>Email:</strong> {v.email}</p>
                                <p><strong>Phone:</strong> {v.phone || '-'}</p>
                                <p><strong>Website:</strong> {v.website || '-'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Amenities & Parking</h4>
                                <p><strong>Amenities:</strong> {Array.isArray(v.amenities) ? v.amenities.join(', ') : v.amenities}</p>
                                <p><strong>Parking:</strong> {v.parking || '-'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Pricing & Availability</h4>
                                <p><strong>Rental price:</strong> {v.rental_price || '-'}</p>
                                <p><strong>Availability:</strong> {v.availability || '-'}</p>
                              </div>
                            </div>
                            {v.description && (
                              <div className={styles.notesBlock}>
                                <h4>Description</h4>
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

          {activeTab === 'hosts' && (
            <div className={styles.tableWrap}>
              {data.hosts.length === 0 ? (
                <div className={styles.empty}>No host applications yet.</div>
              ) : (
                <div className={styles.table}>
                  <div className={styles.thead}>
                    <div className={styles.tr}>
                      <div className={styles.th}>Date</div>
                      <div className={styles.th}>Name / Org</div>
                      <div className={styles.th}>Event Concept</div>
                      <div className={styles.th}>Location</div>
                      <div className={styles.th}></div>
                    </div>
                  </div>
                  <div className={styles.tbody}>
                    {data.hosts.map((h) => (
                      <div key={h.id} className={styles.rowGroup}>
                        <div className={`${styles.tr} ${styles.trClickable}`} onClick={() => toggleRow(h.id)}>
                          <div className={styles.td}>{formatDate(h.created_at)}</div>
                          <div className={styles.td}>
                            <strong>{h.name}</strong>
                            <div className={styles.tdSub}>{h.org_name || h.email}</div>
                          </div>
                          <div className={styles.td}>{h.event_concept}</div>
                          <div className={styles.td}>{h.location || '-'}</div>
                          <div className={styles.tdRight}>
                            <ChevronRight size={16} className={`${styles.chevron} ${expandedRow === h.id ? styles.chevronOpen : ''}`} />
                          </div>
                        </div>
                        {expandedRow === h.id && (
                          <div className={styles.expandedContent}>
                            <div className={styles.detailGrid}>
                              <div className={styles.detailBlock}>
                                <h4>Contact</h4>
                                <p><strong>Name:</strong> {h.name}</p>
                                <p><strong>Email:</strong> {h.email}</p>
                                <p><strong>Phone:</strong> {h.phone || '-'}</p>
                                <p><strong>Org:</strong> {h.org_name || '-'}</p>
                                <p><strong>Role:</strong> {h.role || '-'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Event Details</h4>
                                <p><strong>Concept:</strong> {h.event_concept}</p>
                                <p><strong>Date:</strong> {h.event_date || '-'}</p>
                                <p><strong>Location:</strong> {h.location || '-'}</p>
                                <p><strong>Venue status:</strong> {h.venue_status || '-'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Scale & Budget</h4>
                                <p><strong>Expected vendors:</strong> {h.expected_vendors || '-'}</p>
                                <p><strong>Expected attendance:</strong> {h.expected_attendance || '-'}</p>
                                <p><strong>Budget:</strong> {h.budget || '-'}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Background</h4>
                                <p><strong>Experience:</strong> {h.experience || '-'}</p>
                                <p><strong>Goals:</strong> {h.goals || '-'}</p>
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

          {activeTab === 'contacts' && (
            <div className={styles.tableWrap}>
              {data.contacts.length === 0 ? (
                <div className={styles.empty}>No contact messages yet.</div>
              ) : (
                <div className={styles.table}>
                  <div className={styles.thead}>
                    <div className={styles.tr}>
                      <div className={styles.th}>Date</div>
                      <div className={styles.th}>Name / Email</div>
                      <div className={styles.th}>Type</div>
                      <div className={styles.th}>Message</div>
                    </div>
                  </div>
                  <div className={styles.tbody}>
                    {data.contacts.map((c) => (
                      <div key={c.id} className={styles.rowGroup}>
                        <div className={styles.tr}>
                          <div className={styles.td}>{formatDate(c.created_at)}</div>
                          <div className={styles.td}>
                            <strong>{c.name}</strong>
                            <div className={styles.tdSub}>{c.email}</div>
                          </div>
                          <div className={styles.td}>
                            <span className={`badge badge--neutral`}>{c.subject || '-'}</span>
                          </div>
                          <div className={`${styles.td} ${styles.tdMessage}`}>
                            {c.message}
                          </div>
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
