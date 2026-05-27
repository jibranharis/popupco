'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import styles from '../login/page.module.css';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [type, setType] = useState('vendor');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    login(type, { email, name });
    router.push(`/dashboard/${type}`);
  };

  return (
    <div className={styles.authLayout}>
      <Link href="/" className={styles.backHome} style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
        Pop Up Co.
      </Link>
      
      <div className={styles.authContainer}>
        {step === 1 ? (
          <>
            <h1 className={styles.title}>Create an account</h1>
            <p className="text-muted mb-6">Join the Pop Up Co. community to find space or host brands.</p>
            
            <form onSubmit={handleNext} className={styles.form}>
              <div className="form-group">
                <label className="form-label">How will you use Pop Up Co.?</label>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px'}}>
                  <label className={`${styles.typeCard} ${type === 'vendor' ? styles.typeActive : ''}`}>
                    <input type="radio" checked={type === 'vendor'} onChange={() => setType('vendor')} />
                    <div>
                      <strong>Vendor</strong>
                      <p className="text-muted text-sm mt-1">I want to find pop-up spaces and apply to markets.</p>
                    </div>
                  </label>
                  <label className={`${styles.typeCard} ${type === 'venue' ? styles.typeActive : ''}`}>
                    <input type="radio" checked={type === 'venue'} onChange={() => setType('venue')} />
                    <div>
                      <strong>Venue/Host</strong>
                      <p className="text-muted text-sm mt-1">I have a space and want to host brands and pop-ups.</p>
                    </div>
                  </label>
                  <label className={`${styles.typeCard} ${type === 'organizer' ? styles.typeActive : ''}`}>
                    <input type="radio" checked={type === 'organizer'} onChange={() => setType('organizer')} />
                    <div>
                      <strong>Event Organizer</strong>
                      <p className="text-muted text-sm mt-1">I plan and coordinate markets and pop-up events.</p>
                    </div>
                  </label>
                  <label className={`${styles.typeCard} ${type === 'nonprofit' ? styles.typeActive : ''}`}>
                    <input type="radio" checked={type === 'nonprofit'} onChange={() => setType('nonprofit')} />
                    <div>
                      <strong>Community/Nonprofit</strong>
                      <p className="text-muted text-sm mt-1">I represent a community organization or nonprofit.</p>
                    </div>
                  </label>
                  <label className={`${styles.typeCard} ${type === 'visitor' ? styles.typeActive : ''}`}>
                    <input type="radio" checked={type === 'visitor'} onChange={() => setType('visitor')} />
                    <div>
                      <strong>Visitor</strong>
                      <p className="text-muted text-sm mt-1">I want to discover and attend local pop-up events.</p>
                    </div>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn--primary btn--full mt-4">
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Almost done</h1>
            <p className="text-muted mb-6">Tell us a bit about yourself.</p>
            
            <form onSubmit={handleSignup} className={styles.form}>
              <div className="form-group">
                <label className="form-label">{type === 'vendor' ? 'Brand Name' : 'Company Name'}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-input" required />
              </div>
              <button type="submit" className="btn btn--primary btn--full mt-4">
                Create Account
              </button>
              <button type="button" onClick={() => setStep(1)} className="btn btn--ghost btn--full mt-2">
                Back
              </button>
            </form>
          </>
        )}

        {step === 1 && (
          <p className={styles.footer}>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        )}
      </div>
    </div>
  );
}
