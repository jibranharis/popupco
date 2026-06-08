'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarDays, Building2, Store, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import styles from '../login/page.module.css';

const roles = [
  ['vendor', "I'm a vendor", 'Find pop-up opportunities, apply to markets, and manage your profile.', Store],
  ['venue', 'I have a venue', 'List a space, review requests, and bring pop-ups to your location.', Building2],
  ['host', "I'm a host", 'Create events, recruit vendors, and manage applications.', Users],
  ['attendee', "I'm exploring events", 'Discover local pop-ups, markets, food events, and community experiences.', CalendarDays],
];

const roleStartPaths = {
  vendor: '/dashboard/profile?role=vendor',
  venue: '/dashboard/profile?role=venue',
  host: '/dashboard/profile?role=host',
  attendee: '/dashboard/saved',
};

function SignupContent() {
  const router = useRouter();
  const [type, setType] = useState('vendor');
  const [redirect, setRedirect] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirect(params.get('redirect') || '');
  }, []);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords must match.');
      return;
    }
    if (!form.terms) {
      setError('Please agree to the Terms and Privacy Policy before creating an account.');
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name, role: type } },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirect || roleStartPaths[type] || '/dashboard');
  };

  return (
    <main className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>
        <img src="/images/popupco-logo-mark.png" alt="" />
        <span>PopUpCo</span>
      </Link>

      <section className={`${styles.authContainer} ${styles.signupWide}`}>
        <h1 className={styles.title}>Create your PopUpCo account</h1>
        <p className={styles.subtitle}>Choose how you&apos;ll use PopUpCo so we can personalize your dashboard.</p>

        <form onSubmit={handleSignup} className={styles.form}>
          <div className={styles.twoCol}>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input className="form-input" required value={form.name} onChange={(event) => setField('name', event.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" required value={form.email} onChange={(event) => setField('email', event.target.value)} />
            </div>
          </div>

          <div className={styles.twoCol}>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" required minLength={6} value={form.password} onChange={(event) => setField('password', event.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm password</label>
              <input type="password" className="form-input" required minLength={6} value={form.confirmPassword} onChange={(event) => setField('confirmPassword', event.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">How will you use PopUpCo?</label>
            <div className={styles.roleCards}>
              {roles.map(([value, title, copy, Icon]) => (
                <label key={value} className={`${styles.typeCard} ${type === value ? styles.typeActive : ''}`}>
                  <input type="radio" checked={type === value} onChange={() => setType(value)} />
                  <span className={styles.typeIcon}><Icon size={18} /></span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <label className={styles.termsRow}>
            <input type="checkbox" checked={form.terms} onChange={(event) => setField('terms', event.target.checked)} />
            <span>I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.</span>
          </label>

          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className={styles.footer}>Already have an account? <Link href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}>Log in</Link></p>
      </section>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
