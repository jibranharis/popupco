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
  const [data, setData] = useState({ vendors: [], venues: [], contacts: [] });
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
        fetchData();
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
    setData({ vendors: [], venues: [], contacts: [] });
  }

  async function fetchData() {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'fetch' }),
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
                            <strong>{v.business_name}</strong>
                            <div className={styles.tdSub}>{v.categories}</div>
                          </div>
                          <div className={styles.td}>
                            {v.first_name} {v.last_name}
                            <div className={styles.tdSub}>{v.email}</div>
                          </div>
                          <div className={styles.td}>
                            {v.event_preference || 'Any'}
                          </div>
                          <div className={styles.tdRight}>
                            <ChevronRight size={16} className={`${styles.chevron} ${expandedRow === v.id ? styles.chevronOpen : ''}`} />
                          </div>
                        </div>
                        {expandedRow === v.id && (
                          <div className={styles.expandedContent}>
                            <div className={styles.detailGrid}>
                              <div className={styles.detailBlock}>
                                <h4>Business Info</h4>
                                <p><strong>Name:</strong> {v.business_name}</p>
                                <p><strong>Website:</strong> {v.website || '-'}</p>
                                <p><strong>Instagram:</strong> {v.instagram || '-'}</p>
                                <p><strong>Registered:</strong> {v.registered_business}</p>
                                <p><strong>Nonprofit:</strong> {v.is_nonprofit}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Contact Info</h4>
                                <p><strong>Name:</strong> {v.first_name} {v.last_name}</p>
                                <p><strong>Email:</strong> {v.email}</p>
                                <p><strong>Phone:</strong> {v.phone}</p>
                                <p><strong>City:</strong> {v.city}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Products</h4>
                                <p><strong>Categories:</strong> {v.categories}</p>
                                <p><strong>Desc:</strong> {v.product_description}</p>
                                <p><strong>Price range:</strong> {v.avg_price_range}</p>
                                <p><strong>Sold before:</strong> {v.sold_before}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Event Preferences</h4>
                                <p><strong>Event:</strong> {v.event_preference}</p>
                                <p><strong>Locations:</strong> {v.preferred_locations}</p>
                                <p><strong>Freq:</strong> {v.events_per_month}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Setup Needs</h4>
                                <p><strong>Table/Chair/Tent:</strong> {v.needs_table}/{v.needs_chairs}/{v.needs_tent}</p>
                                <p><strong>Electricity:</strong> {v.needs_electricity}</p>
                                <p><strong>Booth size:</strong> {v.booth_size}</p>
                                <p><strong>Special:</strong> {v.special_setup}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Food & Permits</h4>
                                <p><strong>Food type:</strong> {v.food_type}</p>
                                <p><strong>Health Permit:</strong> {v.health_permit}</p>
                                <p><strong>Seller's Permit:</strong> {v.sellers_permit}</p>
                                <p><strong>Insurance:</strong> {v.liability_insurance}</p>
                              </div>
                            </div>
                            {v.additional_notes && (
                              <div className={styles.notesBlock}>
                                <h4>Additional Notes</h4>
                                <p>{v.additional_notes}</p>
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
                            <div className={styles.tdSub}>{v.space_types}</div>
                          </div>
                          <div className={styles.td}>
                            {v.city}
                            <div className={styles.tdSub}>{v.neighborhood}</div>
                          </div>
                          <div className={styles.td}>
                            {v.capacity}
                            <div className={styles.tdSub}>{v.square_footage} sq ft</div>
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
                                <p><strong>Types:</strong> {v.space_types}</p>
                                <p><strong>Address:</strong> {v.address}, {v.city} ({v.neighborhood})</p>
                                <p><strong>Indoor/Outdoor:</strong> {v.indoor_outdoor}</p>
                                <p><strong>Operating/Vacant:</strong> {v.is_operating} / {v.is_vacant}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Contact Info</h4>
                                <p><strong>Name:</strong> {v.first_name} {v.last_name}</p>
                                <p><strong>Role:</strong> {v.role}</p>
                                <p><strong>Email:</strong> {v.email}</p>
                                <p><strong>Phone:</strong> {v.phone}</p>
                                <p><strong>Business:</strong> {v.business_name}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Event Fit & Amenities</h4>
                                <p><strong>Events:</strong> {v.event_types}</p>
                                <p><strong>Amenities:</strong> {v.amenities}</p>
                                <p><strong>Food/Music:</strong> Trucks: {v.food_trucks_allowed}, Music: {v.music_allowed}</p>
                                <p><strong>Restrictions:</strong> {v.restrictions}</p>
                              </div>
                              <div className={styles.detailBlock}>
                                <h4>Pricing & Availability</h4>
                                <p><strong>Model:</strong> {v.pricing_model}</p>
                                <p><strong>Rate:</strong> {v.desired_rate}</p>
                                <p><strong>Days:</strong> {v.preferred_days}</p>
                                <p><strong>Frequency:</strong> {v.hosting_frequency}</p>
                              </div>
                            </div>
                            {v.additional_notes && (
                              <div className={styles.notesBlock}>
                                <h4>Additional Notes</h4>
                                <p>{v.additional_notes}</p>
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
                            <span className={`badge badge--neutral`}>{c.type || 'other'}</span>
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
