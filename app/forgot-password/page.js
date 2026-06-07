'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from '../login/page.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <main className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>
        <img src="/images/popupco-logo-mark.png" alt="" />
        <span>PopUpCo</span>
      </Link>

      <section className={styles.authContainer}>
        <h1 className={styles.title}>Reset your password</h1>
        <p className={styles.subtitle}>Enter your email and we&apos;ll send password reset instructions if an account exists.</p>

        {sent ? (
          <>
            <div className={styles.intentNotice}>
              If an account exists for this email, we&apos;ll send password reset instructions.
            </div>
            <Link href="/login" className="btn btn--primary btn--full">Back to login</Link>
          </>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="hello@brand.com" required />
            </div>
            <button type="submit" className="btn btn--primary btn--full" disabled={loading}>{loading ? 'Sending...' : 'Send reset link'}</button>
            <p className={styles.footer}><Link href="/login">Back to login</Link></p>
          </form>
        )}
      </section>
    </main>
  );
}
