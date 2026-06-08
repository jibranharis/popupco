'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/lib/supabase';
import styles from '../dashboard.module.css';

export default function SettingsPage() {
  const { user, logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingNotifications, setMarketingNotifications] = useState(true);
  const [prefsSaving, setPrefsSaving] = useState(false);
  const [prefsSaved, setPrefsSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      const meta = authUser?.user_metadata || {};
      setEmailNotifications(meta.email_notifications !== false);
      setMarketingNotifications(meta.marketing_notifications !== false);
    });
  }, [user]);

  if (!user) return null;

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    setPasswordError('');
    setPasswordSaved(false);

    if (!currentPassword || !newPassword) {
      setPasswordError('Enter your current and new password.');
      return;
    }

    setPasswordSaving(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      setPasswordSaving(false);
      setPasswordError('Current password is incorrect.');
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    setPasswordSaving(false);
    if (updateError) {
      setPasswordError(updateError.message);
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const handlePrefsSave = async () => {
    setPrefsSaving(true);
    setPrefsSaved(false);
    await supabase.auth.updateUser({
      data: { email_notifications: emailNotifications, marketing_notifications: marketingNotifications },
    });
    setPrefsSaving(false);
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 3000);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage your account preferences and security.</p>
      </div>

      <div className={styles.grid} style={{ maxWidth: '800px' }}>
        <form className={styles.card} onSubmit={handlePasswordUpdate}>
          <h2 className={styles.cardTitle} style={{ marginBottom: '24px' }}>Account Settings</h2>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" defaultValue={user.email} disabled />
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>Contact support to change your email address.</p>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Change Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Current password"
              style={{ marginBottom: '10px' }}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
            <input
              type="password"
              className="form-input"
              placeholder="New password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>

          {passwordError && <p className="form-error">{passwordError}</p>}
          {passwordSaved && <p style={{ color: 'var(--color-sage)', fontSize: '0.875rem' }}>Password updated.</p>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn btn--primary" disabled={passwordSaving}>
              {passwordSaving ? 'Updating...' : 'Update Settings'}
            </button>
          </div>
        </form>

        <div className={styles.card}>
          <h2 className={styles.cardTitle} style={{ marginBottom: '24px' }}>Notifications</h2>

          <label className={styles.checklistItem} style={{ borderBottom: 'none', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(event) => setEmailNotifications(event.target.checked)}
              style={{ marginTop: '4px', accentColor: 'var(--color-accent)' }}
            />
            <div className={styles.checkContent}>
              <h4 style={{ fontSize: '1rem' }}>Email Notifications</h4>
              <p>Receive updates about your applications and new messages.</p>
            </div>
          </label>

          <label className={styles.checklistItem} style={{ borderBottom: 'none', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={marketingNotifications}
              onChange={(event) => setMarketingNotifications(event.target.checked)}
              style={{ marginTop: '4px', accentColor: 'var(--color-accent)' }}
            />
            <div className={styles.checkContent}>
              <h4 style={{ fontSize: '1rem' }}>Marketing & Recommendations</h4>
              <p>Receive weekly digests of new pop-up opportunities near you.</p>
            </div>
          </label>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            {prefsSaved && <p style={{ color: 'var(--color-sage)', fontSize: '0.875rem', margin: 0 }}>Preferences saved.</p>}
            <button type="button" onClick={handlePrefsSave} className="btn btn--secondary btn--sm" disabled={prefsSaving}>
              {prefsSaving ? 'Saving...' : 'Save Preferences'}
            </button>
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
