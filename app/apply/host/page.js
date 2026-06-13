'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { loginHref } from '@/components/GatedLink';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const SECTIONS = [
  'Organizer Info',
  'Event Concept',
];

const EVENT_TYPES = ['Maker market', 'Food pop-up', 'Art show', 'Retail pop-up', 'Community event', 'School event', 'Brand activation', 'Other'];

function HostApplicationContent() {
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
    name: '', email: '', organization: '',
    event_name: '', event_type: '', target_city: '',
    additional_notes: '', consent: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      const query = searchParams.toString();
      router.replace(loginHref(`${pathname}${query ? `?${query}` : ''}`, 'host'));
    }
  }, [loading, pathname, router, searchParams, user]);

  if (loading || !user) return null;

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth' });
  const nextSection = () => {
    setSection((current) => Math.min(current + 1, SECTIONS.length - 1));
    scrollTop();
  };
  const prevSection = () => {
    setSection((current) => Math.max(current - 1, 0));
    scrollTop();
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.email || !form.event_name || !form.event_type) {
      setError('Please complete the required fields before submitting.');
      return;
    }
    if (!form.consent) {
      setError('Please confirm that PopUpCo may review and follow up about this host request.');
      return;
    }

    setSubmitting(true);
    setError('');
    const payload = { ...form, submittedAt: new Date().toISOString(), user_id: user?.id || null };

    try {
      const res = await fetch('/api/apply/host', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error('Host submission failed');
      setSubmitted(true);
      scrollTop();
    } catch {
      setError('Something went wrong while submitting. Please try again or contact PopUpCo.');
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
            <div className={styles.successIcon}>&#10003;</div>
            <h1 className={styles.successTitle}>Host request submitted.</h1>
            <p className={styles.successDesc}>
              Your host request has been submitted. PopUpCo will review your event concept, venue needs, and vendor mix, then follow up with next steps.
            </p>
            <div className={styles.successActions}>
              <Link href="/dashboard/applications" className="btn btn--primary">View dashboard</Link>
              <Link href="/dashboard/profile?role=host" className="btn btn--secondary">Edit host profile</Link>
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
        <div className="container container--narrow">
          <div className={styles.pageHeader}>
            <h1 className={styles.headline}>Host a Pop-Up</h1>
            <p className={styles.intro}>
              Tell us about the event you want to create. For early access, skip any sections you aren't sure about yet—we can help you figure out the details later.
            </p>
          </div>

          <div className={styles.progress}>
            {SECTIONS.map((step, index) => (
              <div key={step} className={`${styles.progressStep} ${index === section ? styles.progressActive : ''} ${index < section ? styles.progressDone : ''}`}>
                <div className={styles.progressDot}>
                  {index < section ? <CheckCircle size={14} /> : <span>{index + 1}</span>}
                </div>
                <span className={styles.progressLabel}>{step}</span>
              </div>
            ))}
          </div>

          <div className={`card ${styles.formCard}`}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNum}>{section + 1}</span>
              {SECTIONS[section]}
            </h2>

            {section === 0 && (
              <div className={styles.fields}>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Name <span className="required">*</span></label>
                    <input className="form-input" required value={form.name} onChange={(e) => setField('name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email <span className="required">*</span></label>
                    <input className="form-input" type="email" required value={form.email} onChange={(e) => setField('email', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Organization or business name</label>
                  <input className="form-input" value={form.organization} onChange={(e) => setField('organization', e.target.value)} />
                </div>
              </div>
            )}

            {section === 1 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Event name <span className="required">*</span></label>
                  <input className="form-input" required value={form.event_name} onChange={(e) => setField('event_name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Event type <span className="required">*</span></label>
                  <select className="form-select" required value={form.event_type} onChange={(e) => setField('event_type', e.target.value)}>
                    <option value="">Select...</option>
                    {EVENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Target City</label>
                  <input className="form-input" value={form.target_city} onChange={(e) => setField('target_city', e.target.value)} placeholder="e.g. San Francisco" />
                </div>
                <div className="form-group">
                  <label className="form-label">Anything else we should know?</label>
                  <textarea className="form-textarea" rows={4} value={form.additional_notes} onChange={(e) => setField('additional_notes', e.target.value)} placeholder="Estimated attendance, venue needs, target audience..." />
                </div>

                <div className={styles.consentSection}>
                  <label className={styles.consentItem}>
                    <input type="checkbox" checked={form.consent} onChange={(e) => setField('consent', e.target.checked)} />
                    <span>I understand PopUpCo is in early access, and submitting this request does not guarantee my event will be listed.</span>
                  </label>
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="button" onClick={handleSubmit} className={`btn btn--primary btn--lg ${styles.submitBtn}`} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Host Request'}
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

export default function HostApplicationPage() {
  return (
    <Suspense fallback={null}>
      <HostApplicationContent />
    </Suspense>
  );
}
