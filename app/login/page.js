'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [type, setType] = useState('vendor');

  const handleLogin = (e) => {
    e.preventDefault();
    login(type, { email, name: email.split('@')[0] });
    router.push(`/dashboard/${type}`);
  };

  return (
    <div className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>
        <span className={styles.logoMark}>◻</span> Pop Up Co.
      </Link>
      
      <div className={styles.authContainer}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className="text-muted mb-6">Log in to manage your spaces and applications.</p>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Account Type</label>
            <div className="radio-group" style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
              <label className="radio-item" style={{flex: 1}}>
                <input type="radio" checked={type === 'vendor'} onChange={() => setType('vendor')} />
                Brand / Vendor
              </label>
              <label className="radio-item" style={{flex: 1}}>
                <input type="radio" checked={type === 'venue'} onChange={() => setType('venue')} />
                Venue Host
              </label>
            </div>
          </div>

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
            <input type="password" className="form-input" placeholder="••••••••" required />
            <div className="text-right mt-1">
              <Link href="#" className={styles.forgot}>Forgot password?</Link>
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--full mt-4">
            Log In
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <button className={`btn btn--secondary btn--full ${styles.googleBtn}`}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />
          Google
        </button>

        <p className={styles.footer}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
