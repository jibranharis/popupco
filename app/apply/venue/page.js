'use client';
import { Suspense, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { loginHref } from '@/components/GatedLink';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const SECTIONS = [
  'Contact',
  'Space Details',
];

const SPACE_TYPES = [
  'Empty storefront',
  'Retail shop',
  'Cafe',
  'Gallery',
  'Studio',
  'Event space',
  'Community center',
  'Parking lot',
  'Warehouse',
  'School/community organization',
  'Other',
];

function VenueApplicationContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [section, setSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const topRef = useRef(null);

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', venue_name: '',
    city: '', space_types: [],
    additional_notes: '',
    consent: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      const query = searchParams.toString();
      router.replace(loginHref(`${pathname}${query ? `?${query}` : ''}`, 'venue'));
    }
  }, [loading, pathname, router, searchParams, user]);

  if (loading || !user) return null;

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function setField(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function toggleArray(key, val) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(val)
        ? prev[key].filter((v) => v !== val)
        : [...prev[key], val],
    }));
  }

  function nextSection() {
    setSection((s) => Math.min(s + 1, SECTIONS.length - 1));
    scrollTop();
  }

  function prevSection() {
    setSection((s) => Math.max(s - 1, 0));
    scrollTop();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.venue_name) {
      setError('Please complete the required contact and venue name fields before submitting.');
      return;
    }
    if (!form.consent) {
      setError('Please check the consent box before submitting.');
      return;
    }
    setSubmitting(true);
    setError('');
    const payload = { ...form, user_id: user?.id || null, submittedAt: new Date().toISOString() };
    try {
      const res = await fetch('/api/apply/venue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        scrollTop();
      } else {
        setError('Something went wrong. Please try again or email us.');
      }
    } catch {
      setError('Something went wrong. Please try again or email us.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={`container container--narrow ${styles.successWrap}`}>
            <div className={styles.successIcon}>✓</div>
            <h1 className={styles.successTitle}>Space submitted!</h1>
            <p className={styles.successDesc}>
              Thanks for submitting your space. We'll review location, capacity, amenities, availability, and event fit. We'll be in touch if it matches an upcoming pop-up concept.
            </p>
            <div className={styles.successActions}>
              <Link href="/dashboard" className="btn btn--primary">View dashboard</Link>
              <Link href="/dashboard/profile?role=venue" className="btn btn--secondary">Edit venue profile</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main} ref={topRef}>
        <div className={`container container--narrow`}>
          <div className={styles.pageHeader}>
            <h1 className={styles.headline}>Venue Partner Application</h1>
            <p className={styles.intro}>
              Have a storefront, venue, studio, parking lot, gallery, cafe, or community space that could host a pop-up? Tell us about it. For early access, just give us the basics—we can figure out specific permit or capacity details together later.
            </p>
          </div>

          <div className={styles.progress}>
            {SECTIONS.map((s, i) => (
              <div key={s} className={`${styles.progressStep} ${i === section ? styles.progressActive : ''} ${i < section ? styles.progressDone : ''}`}>
                <div className={styles.progressDot}>
                  {i < section ? <CheckCircle size={14} /> : <span>{i + 1}</span>}
                </div>
                <span className={styles.progressLabel}>{s}</span>
              </div>
            ))}
          </div>

          <div className={`card ${styles.formCard}`}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNum}>{section + 1}</span>
              {SECTIONS[section]}
            </h2>

            {/* ─ Section 0: Contact ─ */}
            {section === 0 && (
              <div className={styles.fields}>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">First name <span className="required">*</span></label>
                    <input className="form-input" required value={form.first_name} onChange={(e) => setField('first_name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last name <span className="required">*</span></label>
                    <input className="form-input" required value={form.last_name} onChange={(e) => setField('last_name', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email <span className="required">*</span></label>
                  <input className="form-input" type="email" required value={form.email} onChange={(e) => setField('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Venue name <span className="required">*</span></label>
                  <input className="form-input" required value={form.venue_name} onChange={(e) => setField('venue_name', e.target.value)} placeholder="Name of space or address if no name" />
                </div>
              </div>
            )}

            {/* ─ Section 1: Space Details ─ */}
            {section === 1 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input className="form-input" value={form.city} onChange={(e) => setField('city', e.target.value)} placeholder="e.g. San Francisco" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Type of space</label>
                  <div className="checkbox-grid">
                    {SPACE_TYPES.map((type) => (
                      <label key={type} className="checkbox-item">
                        <input type="checkbox" checked={form.space_types.includes(type)} onChange={() => toggleArray('space_types', type)} />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Anything else we should know?</label>
                  <textarea className="form-textarea" value={form.additional_notes} onChange={(e) => setField('additional_notes', e.target.value)} placeholder="Square footage, pricing, parking, amenities..." rows={4} />
                </div>

                <div className={styles.consentSection}>
                  <label className={styles.consentItem}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField('consent', e.target.checked)}
                    />
                    <span>Submitting your space does not commit you to hosting, and does not guarantee PopUpCo will host an event there.</span>
                  </label>
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="button" onClick={handleSubmit} className={`btn btn--primary btn--lg ${styles.submitBtn}`} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Venue'}
                </button>
              </div>
            )}

            <div className={styles.navBtns}>
              {section > 0 && (
                <button type="button" onClick={prevSection} className="btn btn--secondary">← Back</button>
              )}
              {section < SECTIONS.length - 1 && (
                <button type="button" onClick={nextSection} className={`btn btn--primary ${styles.nextBtn}`}>
                  Continue <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function VenueApplicationPage() {
  return (
    <Suspense fallback={null}>
      <VenueApplicationContent />
    </Suspense>
  );
}
