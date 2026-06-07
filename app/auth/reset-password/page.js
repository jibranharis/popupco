'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from '../../login/page.module.css';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase puts type=recovery in the URL hash on password reset redirect
    const hash = window.location.hash;
    if (hash.includes('type=recovery') || hash.includes('access_token')) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
      else setError('Invalid or expired reset link. Request a new one.');
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError('');
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) { setError(updateError.message); setLoading(false); return; }
    setDone(true);
    setTimeout(() => router.push('/dashboard'), 2000);
  };

  return (
    <main className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>
        <img src="/images/popupco-logo-mark.png" alt="" />
        <span>PopUpCo</span>
      </Link>
      <section className={styles.authContainer}>
        {done ? (
          <>
            <h1 className={styles.title}>Password updated</h1>
            <p className={styles.subtitle}>Redirecting to your dashboard...</p>
          </>
        ) : !ready ? (
          <>
            <h1 className={styles.title}>Invalid link</h1>
            <p className={styles.subtitle}>{error || 'Checking reset link...'}</p>
            {error && <Link href="/forgot-password" className="btn btn--primary btn--full">Request a new link</Link>}
          </>
        ) : (
          <>
            <h1 className={styles.title}>Set new password</h1>
            <p className={styles.subtitle}>Enter and confirm your new password.</p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className="form-group">
                <label className="form-label">New password</label>
                <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" required minLength={6} />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm password</label>
                <input type="password" className="form-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm password" required minLength={6} />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="btn btn--primary btn--full" disabled={loading}>{loading ? 'Updating...' : 'Set password'}</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
