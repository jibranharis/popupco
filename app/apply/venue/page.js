'use client';
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

const SECTIONS = [
  'Contact',
  'Space Details',
  'Amenities',
  'Event Fit',
  'Availability',
  'Pricing',
  'Photos',
  'Final',
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

const AMENITIES = [
  'Restrooms',
  'Electricity',
  'Water access',
  'Wi-Fi',
  'Parking',
  'Loading area',
  'Tables/chairs available',
  'Outdoor area',
  'ADA accessible',
  'Security',
  'Storage',
  'Other',
];

const EVENT_TYPES = [
  'Retail pop-up',
  'Local maker market',
  'Food truck event',
  'Art event',
  'Clothing/vintage market',
  'Nonprofit/community event',
  'Brand launch',
  'Other',
];

const PRICING_MODELS = [
  'Flat rental fee',
  'Revenue share',
  'Vendor fee share',
  'Open to discussion',
];

export default function VenueApplicationPage() {
  const [section, setSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const topRef = useRef(null);

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', role: '', business_name: '',
    venue_name: '', address: '', city: '', neighborhood: '',
    space_types: [], indoor_outdoor: '', square_footage: '', capacity: '', is_operating: '', is_vacant: '',
    amenities: [],
    event_types: [], food_trucks_allowed: '', food_vendors_allowed: '', music_allowed: '', restrictions: '',
    preferred_days: '', recurring: '', earliest_date: '', hosting_frequency: '',
    pricing_model: [], desired_rate: '',
    photo_links: '', layout_notes: '',
    additional_notes: '',
    consent: false,
  });

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
    try {
      const res = await fetch('/api/apply/venue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
              Have a storefront, venue, studio, parking lot, gallery, cafe, or community space that could host a pop-up? Tell us about it.
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
                  <label className="form-label">Phone number</label>
                  <input className="form-input" type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                </div>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Role/title</label>
                    <input className="form-input" value={form.role} onChange={(e) => setField('role', e.target.value)} placeholder="Owner, Manager, etc." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business or holding company name</label>
                    <input className="form-input" value={form.business_name} onChange={(e) => setField('business_name', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* ─ Section 1: Space Details ─ */}
            {section === 1 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Venue name <span className="required">*</span></label>
                  <input className="form-input" required value={form.venue_name} onChange={(e) => setField('venue_name', e.target.value)} placeholder="Name of space or address if no name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input className="form-input" value={form.address} onChange={(e) => setField('address', e.target.value)} />
                </div>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input className="form-input" value={form.city} onChange={(e) => setField('city', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Neighborhood</label>
                    <input className="form-input" value={form.neighborhood} onChange={(e) => setField('neighborhood', e.target.value)} />
                  </div>
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
                  <label className="form-label">Indoor, outdoor, or both?</label>
                  <div className="radio-group">
                    {['Indoor', 'Outdoor', 'Both'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" checked={form.indoor_outdoor === opt} onChange={() => setField('indoor_outdoor', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label">Approximate square footage</label>
                    <input className="form-input" value={form.square_footage} onChange={(e) => setField('square_footage', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estimated capacity</label>
                    <input className="form-input" value={form.capacity} onChange={(e) => setField('capacity', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Is the space currently operating as a business?</label>
                  <div className="radio-group">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" checked={form.is_operating === opt} onChange={() => setField('is_operating', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Is the space vacant or underused?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Partially'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" checked={form.is_vacant === opt} onChange={() => setField('is_vacant', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─ Section 2: Amenities ─ */}
            {section === 2 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Amenities available</label>
                  <div className="checkbox-grid">
                    {AMENITIES.map((item) => (
                      <label key={item} className="checkbox-item">
                        <input type="checkbox" checked={form.amenities.includes(item)} onChange={() => toggleArray('amenities', item)} />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─ Section 3: Event Fit ─ */}
            {section === 3 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">What types of events are you open to?</label>
                  <div className="checkbox-grid">
                    {EVENT_TYPES.map((type) => (
                      <label key={type} className="checkbox-item">
                        <input type="checkbox" checked={form.event_types.includes(type)} onChange={() => toggleArray('event_types', type)} />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Are food trucks allowed?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Maybe'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" checked={form.food_trucks_allowed === opt} onChange={() => setField('food_trucks_allowed', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Are food vendors allowed?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Maybe'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" checked={form.food_vendors_allowed === opt} onChange={() => setField('food_vendors_allowed', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Are amplified music/DJs allowed?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Maybe'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" checked={form.music_allowed === opt} onChange={() => setField('music_allowed', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Are there any restrictions?</label>
                  <textarea className="form-textarea" value={form.restrictions} onChange={(e) => setField('restrictions', e.target.value)} placeholder="Noise limits, alcohol restrictions, hours, etc." rows={3} />
                </div>
              </div>
            )}

            {/* ─ Section 4: Availability ─ */}
            {section === 4 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Preferred days/times</label>
                  <input className="form-input" value={form.preferred_days} onChange={(e) => setField('preferred_days', e.target.value)} placeholder="e.g. Weekends only, anytime, evenings..." />
                </div>
                <div className="form-group">
                  <label className="form-label">One-time events or recurring?</label>
                  <div className="radio-group">
                    {['One-time', 'Recurring', 'Open to both'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" checked={form.recurring === opt} onChange={() => setField('recurring', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Earliest available date</label>
                  <input className="form-input" value={form.earliest_date} onChange={(e) => setField('earliest_date', e.target.value)} placeholder="When could you host?" />
                </div>
                <div className="form-group">
                  <label className="form-label">How often would you consider hosting?</label>
                  <input className="form-input" value={form.hosting_frequency} onChange={(e) => setField('hosting_frequency', e.target.value)} placeholder="e.g. Once a month, a few times a year..." />
                </div>
              </div>
            )}

            {/* ─ Section 5: Pricing ─ */}
            {section === 5 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Preferred pricing model</label>
                  <div className="checkbox-grid">
                    {PRICING_MODELS.map((model) => (
                      <label key={model} className="checkbox-item">
                        <input type="checkbox" checked={form.pricing_model.includes(model)} onChange={() => toggleArray('pricing_model', model)} />
                        <span>{model}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Desired rental range (if known)</label>
                  <input className="form-input" value={form.desired_rate} onChange={(e) => setField('desired_rate', e.target.value)} placeholder="e.g. $500/day, $1000/weekend, negotiable..." />
                </div>
              </div>
            )}

            {/* ─ Section 6: Photos ─ */}
            {section === 6 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Upload photos or provide links</label>
                  <input className="form-input" value={form.photo_links} onChange={(e) => setField('photo_links', e.target.value)} placeholder="Link to Google Drive, website, or Instagram..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Add notes about layout</label>
                  <textarea className="form-textarea" value={form.layout_notes} onChange={(e) => setField('layout_notes', e.target.value)} placeholder="Description of the space layout..." rows={3} />
                </div>
              </div>
            )}

            {/* ─ Section 7: Final ─ */}
            {section === 7 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Anything else we should know?</label>
                  <textarea className="form-textarea" value={form.additional_notes} onChange={(e) => setField('additional_notes', e.target.value)} rows={4} />
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
