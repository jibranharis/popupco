'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import styles from './page.module.css';

const roles = [
  ['vendor', 'Vendor'],
  ['venue', 'Venue'],
  ['host', 'Host'],
  ['attendee', 'Attendee'],
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [type, setType] = useState('vendor');

  const handleLogin = (event) => {
    event.preventDefault();
    login(type, { email, name: email.split('@')[0] });
    router.push(type === 'attendee' ? '/upcoming' : `/dashboard/${type}`);
  };

  return (
    <div className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>PopUpCo</Link>
      <div className={styles.authContainer}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className="text-muted mb-6">Account login is in beta. You can use this demo login, or go directly to the marketplace flows below.</p>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Account type</label>
            <div className={styles.segmented}>
              {roles.map(([value, label]) => (
                <button key={value} type="button" className={type === value ? styles.segmentActive : ''} onClick={() => setType(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="hello@brand.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="Password" required />
            <div className={styles.textRight}>
              <Link href="/contact?subject=Forgot%20password" className={styles.forgot}>Forgot password?</Link>
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--full mt-4">Log in</button>
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
