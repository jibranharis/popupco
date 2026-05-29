'use client';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, ChevronRight } from 'lucide-react';
import styles from '../venue/page.module.css';

const SECTIONS = [
  'Organizer Info',
  'Event Concept',
  'Venue Status',
  'Date and Timing',
  'Vendors Needed',
  'Event Support',
  'Final Review',
];

const HOST_ROLES = ['Individual organizer', 'Business', 'Nonprofit', 'School', 'Community group', 'Brand', 'Other'];
const EVENT_TYPES = ['Maker market', 'Food pop-up', 'Art show', 'Retail pop-up', 'Community event', 'School event', 'Brand activation', 'Other'];
const VENDOR_CATEGORIES = ['Food', 'Drinks', 'Apparel', 'Jewelry', 'Art', 'Beauty', 'Home goods', 'Vintage', 'Services', 'Nonprofits', 'Other'];
const SUPPORT_OPTIONS = [
  'Need help finding vendors',
  'Need help finding venue',
  'Need help promoting event',
  'Need help managing applications',
  'Need help collecting vendor payments',
  'Need help with permits/logistics',
  'Other',
];

export default function HostApplicationPage() {
  const [section, setSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const topRef = useRef(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', organization: '', host_role: '',
    event_name: '', event_type: '', event_description: '', target_audience: '', estimated_attendance: '', public_event: '',
    venue_status: '', venue_name: '', venue_address: '', venue_indoor_outdoor: '', venue_capacity: '', venue_restrictions: '',
    preferred_city: '', venue_preference: '', expected_size: '', date_flexibility: '', budget_range: '',
    preferred_date: '', alternate_dates: '', event_start: '', event_end: '', setup_time: '', breakdown_time: '', flexible_date: '',
    vendor_spots: '', vendor_categories: [], booth_fee_charged: '', booth_fee_amount: '', curated_vendors: '',
    support_needed: [], additional_notes: '', consent: false,
  });

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggleArray = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value],
    }));
  };

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
    if (!form.name || !form.email || !form.event_name || !form.event_type || !form.venue_status) {
      setError('Please complete organizer info, event concept, and venue status before submitting.');
      return;
    }
    if (!form.consent) {
      setError('Please confirm that PopUpCo may review and follow up about this host request.');
      return;
    }

    setSubmitting(true);
    setError('');
    const payload = { ...form, submittedAt: new Date().toISOString() };

    try {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('popupco_host_submissions') || '[]');
        localStorage.setItem('popupco_host_submissions', JSON.stringify([...stored, payload]));
      }

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
              Tell us about the event you want to create, whether you already have a venue, and what kind of vendors you need.
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
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Organization or business name</label>
                    <input className="form-input" value={form.organization} onChange={(e) => setField('organization', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="form-select" value={form.host_role} onChange={(e) => setField('host_role', e.target.value)}>
                    <option value="">Select...</option>
                    {HOST_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                  </select>
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
                  <label className="form-label">Short event description</label>
                  <textarea className="form-textarea" rows={4} value={form.event_description} onChange={(e) => setField('event_description', e.target.value)} />
                </div>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Target audience</label>
                    <input className="form-input" value={form.target_audience} onChange={(e) => setField('target_audience', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estimated attendance</label>
                    <input className="form-input" value={form.estimated_attendance} onChange={(e) => setField('estimated_attendance', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Is this event open to the public?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Not sure'].map((option) => (
                      <label key={option} className="radio-item">
                        <input type="radio" checked={form.public_event === option} onChange={() => setField('public_event', option)} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section === 2 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Venue status <span className="required">*</span></label>
                  <div className="radio-group">
                    {['I already have a venue', 'I need help finding a venue', 'I am still deciding'].map((option) => (
                      <label key={option} className="radio-item">
                        <input type="radio" checked={form.venue_status === option} onChange={() => setField('venue_status', option)} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {form.venue_status === 'I already have a venue' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Venue name</label>
                      <input className="form-input" value={form.venue_name} onChange={(e) => setField('venue_name', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Venue address</label>
                      <input className="form-input" value={form.venue_address} onChange={(e) => setField('venue_address', e.target.value)} />
                    </div>
                    <div className={styles.twoCol}>
                      <div className="form-group">
                        <label className="form-label">Indoor/outdoor/both</label>
                        <input className="form-input" value={form.venue_indoor_outdoor} onChange={(e) => setField('venue_indoor_outdoor', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Capacity</label>
                        <input className="form-input" value={form.venue_capacity} onChange={(e) => setField('venue_capacity', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Any restrictions?</label>
                      <textarea className="form-textarea" rows={3} value={form.venue_restrictions} onChange={(e) => setField('venue_restrictions', e.target.value)} />
                    </div>
                  </>
                )}

                {form.venue_status !== 'I already have a venue' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Preferred city/neighborhood</label>
                      <input className="form-input" value={form.preferred_city} onChange={(e) => setField('preferred_city', e.target.value)} />
                    </div>
                    <div className={styles.twoCol}>
                      <div className="form-group">
                        <label className="form-label">Indoor/outdoor preference</label>
                        <input className="form-input" value={form.venue_preference} onChange={(e) => setField('venue_preference', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Expected size</label>
                        <input className="form-input" value={form.expected_size} onChange={(e) => setField('expected_size', e.target.value)} />
                      </div>
                    </div>
                    <div className={styles.twoCol}>
                      <div className="form-group">
                        <label className="form-label">Date flexibility</label>
                        <input className="form-input" value={form.date_flexibility} onChange={(e) => setField('date_flexibility', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Budget range if relevant</label>
                        <input className="form-input" value={form.budget_range} onChange={(e) => setField('budget_range', e.target.value)} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {section === 3 && (
              <div className={styles.fields}>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Preferred date</label>
                    <input className="form-input" value={form.preferred_date} onChange={(e) => setField('preferred_date', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alternate dates</label>
                    <input className="form-input" value={form.alternate_dates} onChange={(e) => setField('alternate_dates', e.target.value)} />
                  </div>
                </div>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Event start time</label>
                    <input className="form-input" value={form.event_start} onChange={(e) => setField('event_start', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event end time</label>
                    <input className="form-input" value={form.event_end} onChange={(e) => setField('event_end', e.target.value)} />
                  </div>
                </div>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Vendor setup time</label>
                    <input className="form-input" value={form.setup_time} onChange={(e) => setField('setup_time', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Vendor breakdown time</label>
                    <input className="form-input" value={form.breakdown_time} onChange={(e) => setField('breakdown_time', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Is the date flexible?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Somewhat'].map((option) => (
                      <label key={option} className="radio-item">
                        <input type="radio" checked={form.flexible_date === option} onChange={() => setField('flexible_date', option)} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section === 4 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Number of vendor spots</label>
                  <input className="form-input" value={form.vendor_spots} onChange={(e) => setField('vendor_spots', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Vendor categories wanted</label>
                  <div className="checkbox-grid">
                    {VENDOR_CATEGORIES.map((category) => (
                      <label key={category} className="checkbox-item">
                        <input type="checkbox" checked={form.vendor_categories.includes(category)} onChange={() => toggleArray('vendor_categories', category)} />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Are vendors charged a booth fee?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Not sure'].map((option) => (
                      <label key={option} className="radio-item">
                        <input type="radio" checked={form.booth_fee_charged === option} onChange={() => setField('booth_fee_charged', option)} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Booth fee amount or range</label>
                    <input className="form-input" value={form.booth_fee_amount} onChange={(e) => setField('booth_fee_amount', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Are vendors curated/approved?</label>
                    <input className="form-input" value={form.curated_vendors} onChange={(e) => setField('curated_vendors', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {section === 5 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Event support needed</label>
                  <div className="checkbox-grid">
                    {SUPPORT_OPTIONS.map((support) => (
                      <label key={support} className="checkbox-item">
                        <input type="checkbox" checked={form.support_needed.includes(support)} onChange={() => toggleArray('support_needed', support)} />
                        <span>{support}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Additional notes</label>
                  <textarea className="form-textarea" rows={4} value={form.additional_notes} onChange={(e) => setField('additional_notes', e.target.value)} />
                </div>
              </div>
            )}

            {section === 6 && (
              <div className={styles.fields}>
                <div className="notice notice--info">
                  Review your event request, then submit it for PopUpCo follow-up. You can still edit details after we contact you.
                </div>
                <div className="form-group">
                  <label className="form-label">Event summary</label>
                  <div className="notice notice--info">
                    <strong>{form.event_name || 'Untitled event'}</strong><br />
                    {form.event_type || 'Event type not selected'} · {form.venue_status || 'Venue status not selected'}<br />
                    Vendors needed: {form.vendor_spots || 'Not specified'}
                  </div>
                </div>
                <div className={styles.consentSection}>
                  <label className={styles.consentItem}>
                    <input type="checkbox" checked={form.consent} onChange={(e) => setField('consent', e.target.checked)} />
                    <span>I understand this is a request for PopUpCo review and does not guarantee event approval, vendor participation, venue booking, attendance, or sales.</span>
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
                <button type="button" onClick={prevSection} className="btn btn--secondary">Back</button>
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
