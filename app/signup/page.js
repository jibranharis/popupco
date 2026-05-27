'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import styles from '../login/page.module.css';

const roles = [
  ['vendor', "I'm a vendor", 'Find pop-up opportunities, apply to markets, save spaces, and manage applications.'],
  ['venue', "I'm a venue", 'List a space, receive requests, and bring vendors or events into your location.'],
  ['host', "I'm a host", 'Create pop-up events, recruit vendors, manage applications, and find venues.'],
  ['attendee', "I'm exploring events", 'Discover local pop-ups, markets, food events, and community experiences.'],
];

const onboarding = {
  vendor: ['Business name', 'Category', 'Products sold', 'Location', 'Photos', 'Social links', 'Bio', 'Opportunities wanted', 'Budget', 'Availability', 'Setup needs'],
  venue: ['Space name', 'Location', 'Capacity', 'Space type', 'Photos', 'Amenities', 'Rules', 'Pricing', 'Availability', 'Indoor/outdoor', 'Food allowed'],
  host: ['Organization name', 'Event types', 'Vendor categories needed', 'Preferred locations', 'Past event experience', 'Expected attendance', 'Dates', 'Venue needed'],
  attendee: ['Location', 'Event interests', 'Saved event preferences', 'Weekend availability'],
};

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [type, setType] = useState('vendor');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const fields = useMemo(() => onboarding[type] || onboarding.vendor, [type]);

  const handleSignup = (event) => {
    event.preventDefault();
    login(type, { email, name });
    router.push(type === 'attendee' ? '/browse' : `/dashboard/${type}`);
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
            <h1 className={styles.title}>Build your {type} account</h1>
            <p className="text-muted mb-6">We will ask for these details as your profile grows.</p>
            <div className={styles.onboardingPreview}>
              {fields.map((field) => <span key={field}>{field}</span>)}
            </div>
            <form onSubmit={handleSignup} className={styles.form}>
              <div className="form-group">
                <label className="form-label">{type === 'vendor' ? 'Business name' : type === 'venue' ? 'Space or venue name' : type === 'host' ? 'Organization name' : 'Name'}</label>
                <input className="form-input" required value={name} onChange={(event) => setName(event.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" required value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-input" required />
              </div>
              <button type="submit" className="btn btn--primary btn--full mt-4">Create account</button>
              <button type="button" onClick={() => setStep(1)} className="btn btn--ghost btn--full mt-2">Back</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
