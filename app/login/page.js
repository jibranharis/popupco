'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarDays, Map, Store, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

const intentCopy = {
  apply: 'Log in or create an account to apply for this opportunity.',
  save: 'Log in or create an account to save this opportunity.',
  message: 'Log in or create an account to message this host.',
  venue: 'Log in or create an account to submit your venue.',
  host: 'Log in or create an account to host a pop-up.',
  dashboard: 'Log in to manage your PopUpCo dashboard.',
  continue: 'Log in to continue.',
};

const quickLinks = [
  { label: 'Apply as a vendor', href: '/login?redirect=/apply/vendor&intent=apply', icon: Store },
  { label: 'Submit a venue', href: '/login?redirect=/apply/venue&intent=venue', icon: Map },
  { label: 'Host an event', href: '/login?redirect=/apply/host&intent=host', icon: Users },
  { label: 'Browse opportunities', href: '/vendors', icon: CalendarDays },
];

function LoginContent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState('/dashboard');
  const [intent, setIntent] = useState('continue');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirect(params.get('redirect') || '/dashboard');
    setIntent(params.get('intent') || '');
    setMessage(params.get('message') || '');
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirect || '/dashboard');
  };

  const signupHref = `/signup?redirect=${encodeURIComponent(redirect || '/dashboard')}${intent ? `&intent=${encodeURIComponent(intent)}` : ''}`;

  return (
    <main className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>
        <img src="/images/popupco-logo-mark.png" alt="" />
        <span>PopUpCo</span>
      </Link>

      <section className={styles.authContainer}>
        {message ? (
          <div className={styles.intentNotice}>{message}</div>
        ) : intent ? (
          <div className={styles.intentNotice}>{intentCopy[intent] || intentCopy.continue}</div>
        ) : null}
        
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to manage your applications, saved opportunities, messages, and profile.</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="hello@brand.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div className={styles.labelRow}>
              <label className="form-label">Password</label>
              <Link href="/forgot-password" className={styles.forgot}>Forgot password?</Link>
            </div>
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Signing in...' : 'Log in'}
          </button>
        </form>

        <p className={styles.footer}>Don&apos;t have an account? <Link href={signupHref}>Sign up</Link></p>
      </section>

      <section className={styles.quickSection}>
        <h2>Looking for something else?</h2>
        <div className={styles.quickGrid}>
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} className={styles.quickCard}>
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
