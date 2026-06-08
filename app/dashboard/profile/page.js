'use client';
import { useAuth } from '@/components/AuthContext';
import styles from '../dashboard.module.css';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Profile</h1>
        <p className={styles.pageSubtitle}>Help hosts and venues understand who you are before reviewing your applications.</p>
      </div>

      <div className={styles.grid} style={{ gridTemplateColumns: '1fr 320px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Basic Information</h2>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" defaultValue={user.name} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" defaultValue={user.email} />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Business Details</h2>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Business Name</label>
              <input type="text" className="form-input" placeholder="e.g. The Vintage Collective" />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Short Description</label>
              <textarea className="form-input" rows="3" placeholder="What do you sell or do?"></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Website or Instagram</label>
              <input type="text" className="form-input" placeholder="instagram.com/yourhandle" />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Photos & Media</h2>
            <div style={{ border: '2px dashed var(--color-border)', padding: '32px', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>Upload photos of your products, booth setup, or venue.</p>
              <button className="btn btn--secondary btn--sm">Browse Files</button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button className="btn btn--primary">Save Profile</button>
          </div>
        </div>

        <div className={styles.card} style={{ position: 'sticky', top: '100px' }}>
          <h2 className={styles.cardTitle} style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--color-text-muted)' }}>Profile Preview</h2>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-bg-alt)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: 'var(--color-accent)' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>{user.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>{user.type === 'vendor' ? 'Vendor' : user.type === 'venue' ? 'Venue Partner' : 'Host'}</p>
            <div style={{ padding: '12px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Fill out your business details to see how your profile appears to others.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
