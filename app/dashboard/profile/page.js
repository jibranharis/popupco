'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/lib/supabase';
import { Camera } from 'lucide-react';
import styles from '../dashboard.module.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      const meta = authUser?.user_metadata || {};
      setName(meta.name || user.name || '');
      setBusinessName(meta.business_name || '');
      setBio(meta.bio || '');
      setWebsite(meta.website || '');
    });
  }, [user]);

  if (!user) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setError('');

    const { error: updateError } = await supabase.auth.updateUser({
      data: { name, business_name: businessName, bio, website },
    });

    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Profile</h1>
        <p className={styles.pageSubtitle}>Help hosts and venues understand who you are before reviewing your applications.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.grid} style={{ gridTemplateColumns: '1fr 320px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div className={styles.card}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Basic Information</h2>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" defaultValue={user.email} disabled />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Business Details</h2>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Business Name</label>
              <input type="text" className="form-input" placeholder="e.g. The Vintage Collective" value={businessName} onChange={(event) => setBusinessName(event.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Short Description</label>
              <textarea className="form-input" rows="3" placeholder="What do you sell or do?" value={bio} onChange={(event) => setBio(event.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Website or Instagram</label>
              <input type="text" className="form-input" placeholder="instagram.com/yourhandle" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Photos & Media</h2>
            <div style={{ border: '2px dashed var(--color-border)', padding: '32px', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>Upload photos of your products, booth setup, or venue.</p>
              <button type="button" className="btn btn--secondary btn--sm">Browse Files</button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', marginTop: '8px' }}>
            {error && <p className="form-error" style={{ margin: 0 }}>{error}</p>}
            {saved && <p style={{ color: 'var(--color-sage)', fontSize: '0.875rem', margin: 0 }}>Profile saved.</p>}
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        <div className={styles.card} style={{ position: 'sticky', top: '100px' }}>
          <h2 className={styles.cardTitle} style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--color-text-muted)' }}>Profile Preview</h2>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 16px' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                {(name || user.name).charAt(0).toUpperCase()}
              </div>
              <button 
                type="button"
                onClick={() => alert('Change profile picture functionality coming soon!')}
                style={{ position: 'absolute', bottom: '0', right: '0', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-charcoal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', cursor: 'pointer', padding: 0 }}
                title="Change Profile Picture"
              >
                <Camera size={14} />
              </button>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>{name || user.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>{user.type === 'vendor' ? 'Vendor' : user.type === 'venue' ? 'Venue Partner' : 'Host'}</p>
            <div style={{ padding: '12px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {businessName || bio ? `${businessName}${businessName && bio ? ' — ' : ''}${bio}` : 'Fill out your business details to see how your profile appears to others.'}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
