'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from '../login/page.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>
        <img src="/images/popupco-logo-mark.png" alt="" />
        <span>PopUpCo</span>
      </Link>

      <section className={styles.authContainer}>
        <h1 className={styles.title}>Reset password</h1>
        
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p style={{ color: 'var(--color-text)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              If an account exists for <strong>{email}</strong>, we’ll send password reset instructions.
            </p>
            <Link href="/login" className="btn btn--primary btn--full" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Return to log in
            </Link>
          </div>
        ) : (
          <>
            <p className={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit} className={styles.form}>
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

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>

            <p className={styles.footer}><Link href="/login">Back to log in</Link></p>
          </>
        )}
      </section>
    </main>
  );
}
