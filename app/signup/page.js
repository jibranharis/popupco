'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from '../login/page.module.css';

const roles = [
  ['vendor', "I'm a vendor", 'Find pop-up opportunities, apply to markets, save spaces, and manage applications.'],
  ['venue', 'I have a venue', 'List a space, receive requests, and bring vendors or events into your location.'],
  ['host', "I'm a host", 'Create pop-up events, recruit vendors, manage applications, and find venues.'],
  ['attendee', "I'm exploring events", 'Discover local pop-ups, markets, food events, and community experiences.'],
];

const roleStartPaths = {
  vendor: '/dashboard/vendor',
  venue: '/dashboard/venue',
  host: '/dashboard/host',
  attendee: '/upcoming',
};

const onboarding = {
  vendor: ['Business name', 'Category', 'Products sold', 'Location', 'Photos', 'Social links', 'Bio', 'Opportunities wanted', 'Budget', 'Availability', 'Setup needs'],
  venue: ['Space name', 'Location', 'Capacity', 'Space type', 'Photos', 'Amenities', 'Rules', 'Pricing', 'Availability', 'Indoor/outdoor', 'Food allowed'],
  host: ['Organization name', 'Event types', 'Vendor categories needed', 'Preferred locations', 'Past event experience', 'Expected attendance', 'Dates', 'Venue needed'],
  attendee: ['Location', 'Event interests', 'Saved event preferences', 'Weekend availability'],
};

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [type, setType] = useState('vendor');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fields = useMemo(() => onboarding[type] || onboarding.vendor, [type]);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!supabase) {
      setError('Auth is not configured.');
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role: type } },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(roleStartPaths[type] || '/discover');
  };

  return (
    <div className={styles.authLayout}>
      <Link href="/" className={styles.backHome}>PopUpCo</Link>
      <div className={`${styles.authContainer} ${styles.signupWide}`}>
        {step === 1 ? (
          <>
            <h1 className={styles.title}>How will you use PopUpCo?</h1>
            <p className="text-muted mb-6">Choose a role so your account starts with the right tools.</p>
            <div className={styles.roleCards}>
              {roles.map(([value, title, copy]) => (
                <label key={value} className={`${styles.typeCard} ${type === value ? styles.typeActive : ''}`}>
                  <input type="radio" checked={type === value} onChange={() => setType(value)} />
                  <div>
                    <strong>{title}</strong>
                    <p className="text-muted text-sm mt-1">{copy}</p>
                  </div>
                </label>
              ))}
            </div>
            <button type="button" onClick={() => setStep(2)} className="btn btn--primary btn--full mt-4">Continue</button>
            <p className={styles.footer}>Already have an account? <Link href="/login">Log in</Link></p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Create your account</h1>
            <p className="text-muted mb-6">We will ask for more details as your profile grows.</p>
            <div className={styles.onboardingPreview}>
              {fields.map((field) => <span key={field}>{field}</span>)}
            </div>
            <form onSubmit={handleSignup} className={styles.form}>
              <div className="form-group">
                <label className="form-label">
                  {type === 'vendor' ? 'Business name' : type === 'venue' ? 'Space or venue name' : type === 'host' ? 'Organization name' : 'Name'}
                </label>
                <input className="form-input" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-input" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p style={{ color: 'var(--color-error, #e53e3e)', fontSize: '0.875rem' }}>{error}</p>}
              <button type="submit" className="btn btn--primary btn--full mt-4" disabled={loading}>
                {loading ? 'Creating account…' : 'Create account'}
              </button>
              <button type="button" onClick={() => setStep(1)} className="btn btn--ghost btn--full mt-2">Back</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
