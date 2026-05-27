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
    router.push(type === 'attendee' ? '/browse' : `/dashboard/${type}`);
  };

  return (
    <div className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>PopUpCo</Link>
      <div className={styles.authContainer}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className="text-muted mb-6">Log in to manage opportunities, messages, listings, and applications.</p>
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
              <Link href="#" className={styles.forgot}>Forgot password?</Link>
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--full mt-4">Log in</button>
        </form>
        <p className={styles.footer}>Don't have an account? <Link href="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}
