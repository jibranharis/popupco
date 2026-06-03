'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!supabase) {
      setError('Auth is not configured.');
      setLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const role = data.user?.user_metadata?.role || 'vendor';
    router.push(role === 'attendee' ? '/upcoming' : `/dashboard/${role}`);
  };

  return (
    <div className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>PopUpCo</Link>
      <div className={styles.authContainer}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className="text-muted mb-6">Sign in to your PopUpCo account.</p>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="hello@brand.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.textRight}>
              <Link href="/contact?subject=Forgot%20password" className={styles.forgot}>Forgot password?</Link>
            </div>
          </div>
          {error && <p style={{ color: 'var(--color-error, #e53e3e)', fontSize: '0.875rem' }}>{error}</p>}
          <button type="submit" className="btn btn--primary btn--full mt-4" disabled={loading}>
            {loading ? 'Signing in…' : 'Log in'}
          </button>
        </form>
        <div className={styles.onboardingPreview} style={{ marginTop: '20px' }}>
          <Link href="/apply/vendor">Apply as vendor</Link>
          <Link href="/apply/venue">Submit venue</Link>
          <Link href="/apply/host">Host an event</Link>
          <Link href="/upcoming">Browse events</Link>
        </div>
        <p className={styles.footer}>Don't have an account? <Link href="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}
