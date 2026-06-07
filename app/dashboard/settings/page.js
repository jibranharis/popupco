'use client';
import { useAuth } from '@/components/AuthContext';
import styles from '../dashboard.module.css';

export default function SettingsPage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage your account preferences and security.</p>
      </div>

      <div className={styles.grid} style={{ maxWidth: '800px' }}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle} style={{ marginBottom: '24px' }}>Account Settings</h2>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" defaultValue={user.email} disabled />
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>Contact support to change your email address.</p>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Change Password</label>
            <input type="password" className="form-input" placeholder="Current password" style={{ marginBottom: '10px' }} />
            <input type="password" className="form-input" placeholder="New password" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button className="btn btn--primary">Update Settings</button>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle} style={{ marginBottom: '24px' }}>Notifications</h2>
          
          <label className={styles.checklistItem} style={{ borderBottom: 'none', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ marginTop: '4px', accentColor: 'var(--color-accent)' }} />
            <div className={styles.checkContent}>
              <h4 style={{ fontSize: '1rem' }}>Email Notifications</h4>
              <p>Receive updates about your applications and new messages.</p>
            </div>
          </label>
          
          <label className={styles.checklistItem} style={{ borderBottom: 'none', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ marginTop: '4px', accentColor: 'var(--color-accent)' }} />
            <div className={styles.checkContent}>
              <h4 style={{ fontSize: '1rem' }}>Marketing & Recommendations</h4>
              <p>Receive weekly digests of new pop-up opportunities near you.</p>
            </div>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button className="btn btn--secondary btn--sm">Save Preferences</button>
          </div>
        </div>

        <div className={styles.card} style={{ borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.02)' }}>
          <h2 className={styles.cardTitle} style={{ color: '#ef4444', marginBottom: '16px' }}>Danger Zone</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={logout} className="btn btn--secondary">Log Out</button>
            <button className="btn btn--primary" style={{ background: '#ef4444', borderColor: '#ef4444' }}>Deactivate Account</button>
          </div>
        </div>
      </div>
    </>
  );
}
