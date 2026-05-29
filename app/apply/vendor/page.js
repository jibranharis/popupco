'use client';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PLACEHOLDER_EVENTS, getPublicEventBySlug } from '@/lib/data';
import { SPACES_DATA, getOpportunityBySlug } from '@/lib/spaces';
import { ChevronRight, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

const SECTIONS = [
  'Contact Info',
  'Business Info',
  'Product Category',
  'Product Details',
  'Event Preferences',
  'Setup Needs',
  'Permits & Budget',
  'Final',
];

const CATEGORIES = [
  'Clothing / streetwear',
  'Vintage / resale',
  'Jewelry / accessories',
  'Art / prints',
  'Candles / home goods',
  'Beauty / skincare',
  'Sneakers / collectibles',
  'Packaged food',
  'Beverage',
  'Food truck',
  'Nonprofit / community',
  'Other',
];

const LOCATIONS = [
  'San Ramon / Tri-Valley',
  'East Bay',
  'San Francisco',
  'Oakland',
  'Berkeley',
  'Walnut Creek',
  'San Jose / South Bay',
  'Peninsula',
  'Anywhere in the Bay Area',
];

const FOOD_CATEGORIES = ['Packaged food', 'Beverage', 'Food truck'];

function VendorApplicationForm() {
  const [section, setSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventWarning, setEventWarning] = useState('');
  const topRef = useRef(null);

  const [form, setForm] = useState({
    // Section 1
    first_name: '', last_name: '', email: '', phone: '', city: '', preferred_contact: '',
    // Section 2
    business_name: '', website: '', instagram: '', tiktok: '', other_social: '',
    registered_business: '', is_nonprofit: '', nonprofit_description: '',
    // Section 3
    categories: [],
    // Section 4
    product_description: '', avg_price_range: '', photo_links: '', sold_before: '', sold_before_where: '', brand_fit: '',
    // Section 5
    event_preference: '', selected_event_title: '', selected_event_source: '', preferred_locations: [], available_dates: '', events_per_month: '',
    // Section 6
    needs_table: '', needs_chairs: '', needs_tent: '', needs_electricity: '', booth_size: '', own_setup: '', special_setup: '',
    // Food conditional
    food_type: '', food_prepackaged: '', health_permit: '', food_certification: '', permitted_facility: '', food_utilities: '', permit_links: '',
    // Section 7
    sellers_permit: '', liability_insurance: '', willing_to_provide_docs: '',
    budget_comfort: '', featured_interest: '', nonprofit_pricing: '', nonprofit_pricing_reason: '',
    // Section 8
    additional_notes: '',
    consent_no_guarantee: false,
    consent_permits: false,
  });

  const isFoodVendor = form.categories.some((c) => FOOD_CATEGORIES.includes(c));

  useEffect(() => {
    const eventSlug = new URLSearchParams(window.location.search).get('event');
    if (!eventSlug) return;

    const publicEvent = getPublicEventBySlug(eventSlug);
    const opportunity = getOpportunityBySlug(eventSlug);

    if (publicEvent) {
      setSelectedEvent({ slug: publicEvent.slug, title: publicEvent.event_name, source: 'public event' });
      setEventPreference(publicEvent.slug);
      return;
    }

    if (opportunity) {
      setSelectedEvent({ slug: opportunity.slug, title: opportunity.name, source: 'vendor opportunity' });
      setEventPreference(opportunity.slug);
      return;
    }

    setEventWarning("We couldn't find that event, but you can still apply as a vendor.");
  }, []);

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function setField(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function setEventPreference(slug) {
    const publicEvent = getPublicEventBySlug(slug);
    const opportunity = getOpportunityBySlug(slug);

    setForm((prev) => ({
      ...prev,
      event_preference: slug,
      selected_event_title: publicEvent?.event_name || opportunity?.name || '',
      selected_event_source: publicEvent ? 'public event' : opportunity ? 'vendor opportunity' : '',
    }));
  }

  function toggleCategory(cat) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  }

  function toggleLocation(loc) {
    setForm((prev) => ({
      ...prev,
      preferred_locations: prev.preferred_locations.includes(loc)
        ? prev.preferred_locations.filter((l) => l !== loc)
        : [...prev.preferred_locations, loc],
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
    if (!form.first_name || !form.last_name || !form.email || !form.business_name || form.categories.length === 0 || !form.product_description) {
      setError('Please complete required contact, business, category, and product details before submitting.');
      return;
    }
    if (!form.consent_no_guarantee || !form.consent_permits) {
      setError('Please check both consent boxes before submitting.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/apply/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        scrollTop();
      } else {
        setError('Something went wrong. Please try again or email us at hello@popupco.com');
      }
    } catch {
      setError('Something went wrong. Please try again or email us at hello@popupco.com');
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
            <h1 className={styles.successTitle}>Application submitted!</h1>
            <p className={styles.successDesc}>
              Your application has been submitted. We'll review your brand, event fit, and setup needs. If accepted, we will reach out with the next steps according to the event terms.
            </p>
            <p className={styles.successDisclaimer}>
              Submitting an application does not guarantee acceptance.
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
          {/* Header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.headline}>Vendor Application</h1>
            <p className={styles.intro}>
              Apply to sell at an upcoming PopUpCo opportunity. We review applications based on event fit, category mix, setup needs, and availability.
            </p>
            {selectedEvent && (
              <div className="notice notice--info" style={{ margin: '18px auto 0', maxWidth: '620px', textAlign: 'left' }}>
                <strong>You are applying for: {selectedEvent.title}</strong><br />
                This event will be included with your application.
              </div>
            )}
            {eventWarning && (
              <div className="notice notice--warning" style={{ margin: '18px auto 0', maxWidth: '620px', textAlign: 'left' }}>
                {eventWarning}
              </div>
            )}
          </div>

          {/* Progress */}
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

          {/* Form sections */}
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
                    <label className="form-label" htmlFor="v-first">First name <span className="required">*</span></label>
                    <input id="v-first" className="form-input" required value={form.first_name} onChange={(e) => setField('first_name', e.target.value)} placeholder="First name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="v-last">Last name <span className="required">*</span></label>
                    <input id="v-last" className="form-input" required value={form.last_name} onChange={(e) => setField('last_name', e.target.value)} placeholder="Last name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-email">Email <span className="required">*</span></label>
                  <input id="v-email" className="form-input" type="email" required value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-phone">Phone number</label>
                  <input id="v-phone" className="form-input" type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="(555) 000-0000" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-city">City</label>
                  <input id="v-city" className="form-input" value={form.city} onChange={(e) => setField('city', e.target.value)} placeholder="Your city" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-contact">Preferred contact method</label>
                  <select id="v-contact" className="form-select" value={form.preferred_contact} onChange={(e) => setField('preferred_contact', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="text">Text</option>
                  </select>
                </div>
              </div>
            )}

            {/* ─ Section 1: Business ─ */}
            {section === 1 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-biz">Business / brand name <span className="required">*</span></label>
                  <input id="v-biz" className="form-input" required value={form.business_name} onChange={(e) => setField('business_name', e.target.value)} placeholder="Your brand name" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-web">Website</label>
                  <input id="v-web" className="form-input" type="url" value={form.website} onChange={(e) => setField('website', e.target.value)} placeholder="https://yourbrand.com" />
                </div>
                <div className={styles.twoCol}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="v-ig">Instagram</label>
                    <input id="v-ig" className="form-input" value={form.instagram} onChange={(e) => setField('instagram', e.target.value)} placeholder="@yourbrand" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="v-tt">TikTok</label>
                    <input id="v-tt" className="form-input" value={form.tiktok} onChange={(e) => setField('tiktok', e.target.value)} placeholder="@yourbrand" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-other-social">Other social link</label>
                  <input id="v-other-social" className="form-input" value={form.other_social} onChange={(e) => setField('other_social', e.target.value)} placeholder="Twitter, Facebook, etc." />
                </div>
                <div className="form-group">
                  <label className="form-label">Are you a registered business?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Not yet'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="registered_business" value={opt} checked={form.registered_business === opt} onChange={() => setField('registered_business', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Are you a nonprofit or community organization?</label>
                  <div className="radio-group">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="is_nonprofit" value={opt} checked={form.is_nonprofit === opt} onChange={() => setField('is_nonprofit', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                {form.is_nonprofit === 'Yes' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="v-np-desc">Describe your organization</label>
                    <textarea id="v-np-desc" className="form-textarea" value={form.nonprofit_description} onChange={(e) => setField('nonprofit_description', e.target.value)} placeholder="Tell us about your nonprofit or community organization..." rows={3} />
                  </div>
                )}
              </div>
            )}

            {/* ─ Section 2: Categories ─ */}
            {section === 2 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">What do you sell? <span className="required">*</span></label>
                  <p className="form-hint">Select all that apply.</p>
                  <div className={`checkbox-grid ${styles.catGrid}`}>
                    {CATEGORIES.map((cat) => (
                      <label key={cat} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={form.categories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {isFoodVendor && (
                  <div className={`notice notice--warning`}>
                    Food, beverage, and food truck vendors may require additional permits and approval. You'll be asked for more details in a later section.
                  </div>
                )}
              </div>
            )}

            {/* ─ Section 3: Product Details ─ */}
            {section === 3 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-prod-desc">Describe what you sell <span className="required">*</span></label>
                  <textarea id="v-prod-desc" className="form-textarea" required value={form.product_description} onChange={(e) => setField('product_description', e.target.value)} placeholder="Tell us about your products, collection, or what you'd bring to the market." rows={4} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-price-range">Average product price range</label>
                  <input id="v-price-range" className="form-input" value={form.avg_price_range} onChange={(e) => setField('avg_price_range', e.target.value)} placeholder="e.g. $15–$80" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-photos">Product photo links</label>
                  <input id="v-photos" className="form-input" value={form.photo_links} onChange={(e) => setField('photo_links', e.target.value)} placeholder="Instagram, Google Drive, website URL, etc." />
                </div>
                <div className="form-group">
                  <label className="form-label">Have you sold at events before?</label>
                  <div className="radio-group">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="sold_before" value={opt} checked={form.sold_before === opt} onChange={() => setField('sold_before', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                {form.sold_before === 'Yes' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="v-sold-where">Where have you sold?</label>
                    <input id="v-sold-where" className="form-input" value={form.sold_before_where} onChange={(e) => setField('sold_before_where', e.target.value)} placeholder="Markets, events, pop-ups, etc." />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label" htmlFor="v-fit">What makes your brand a good fit for a pop-up?</label>
                  <textarea id="v-fit" className="form-textarea" value={form.brand_fit} onChange={(e) => setField('brand_fit', e.target.value)} placeholder="Tell us what you'd bring to the event..." rows={3} />
                </div>
              </div>
            )}

            {/* ─ Section 4: Event Preferences ─ */}
            {section === 4 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-event-pref">Which upcoming event are you applying for?</label>
                  <select id="v-event-pref" className="form-select" value={form.event_preference} onChange={(e) => setEventPreference(e.target.value)}>
                    <option value="">All / open to any upcoming event</option>
                    <optgroup label="Public upcoming events">
                      {PLACEHOLDER_EVENTS.map((event) => (
                        <option key={event.slug} value={event.slug}>{event.event_name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Vendor opportunities">
                      {SPACES_DATA.map((opportunity) => (
                        <option key={opportunity.slug} value={opportunity.slug}>{opportunity.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Bay Area locations</label>
                  <div className="checkbox-grid">
                    {LOCATIONS.map((loc) => (
                      <label key={loc} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={form.preferred_locations.includes(loc)}
                          onChange={() => toggleLocation(loc)}
                        />
                        <span>{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-dates">Available dates or time preferences</label>
                  <input id="v-dates" className="form-input" value={form.available_dates} onChange={(e) => setField('available_dates', e.target.value)} placeholder="Weekends, specific months, etc." />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-freq">How many events per month would you be interested in?</label>
                  <select id="v-freq" className="form-select" value={form.events_per_month} onChange={(e) => setField('events_per_month', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="1">1 event</option>
                    <option value="2">2 events</option>
                    <option value="3+">3 or more</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
            )}

            {/* ─ Section 5: Setup ─ */}
            {section === 5 && (
              <div className={styles.fields}>
                <div className={`notice notice--info`} style={{marginBottom: '20px'}}>
                  Vendors are expected to bring their own setup. Tables, tents, and chairs may be available for an additional fee depending on the event.
                </div>

                <div className="form-group">
                  <label className="form-label">Do you need a table?</label>
                  <div className="radio-group">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="needs_table" value={opt} checked={form.needs_table === opt} onChange={() => setField('needs_table', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Do you need chairs?</label>
                  <div className="radio-group">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="needs_chairs" value={opt} checked={form.needs_chairs === opt} onChange={() => setField('needs_chairs', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Do you need a tent or canopy?</label>
                  <div className="radio-group">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="needs_tent" value={opt} checked={form.needs_tent === opt} onChange={() => setField('needs_tent', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Do you need electricity?</label>
                  <div className="radio-group">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="needs_elec" value={opt} checked={form.needs_electricity === opt} onChange={() => setField('needs_electricity', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-booth-size">Approximate booth size needed</label>
                  <input id="v-booth-size" className="form-input" value={form.booth_size} onChange={(e) => setField('booth_size', e.target.value)} placeholder="e.g. 10x10, 6ft table, etc." />
                </div>
                <div className="form-group">
                  <label className="form-label">Will you bring your own setup?</label>
                  <div className="radio-group">
                    {['Yes', 'No', 'Partially'].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="own_setup" value={opt} checked={form.own_setup === opt} onChange={() => setField('own_setup', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-special-setup">Any special setup requirements?</label>
                  <textarea id="v-special-setup" className="form-textarea" value={form.special_setup} onChange={(e) => setField('special_setup', e.target.value)} placeholder="Describe any special needs..." rows={3} />
                </div>

                {/* Food conditional */}
                {isFoodVendor && (
                  <div className={styles.foodSection}>
                    <h3 className={styles.foodTitle}>Food & Beverage Details</h3>
                    <div className={`notice notice--warning`} style={{marginBottom: '16px'}}>
                      Food, beverage, and food truck vendors may require additional permits and approval.
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="v-food-type">What type of food/beverage do you sell?</label>
                      <input id="v-food-type" className="form-input" value={form.food_type} onChange={(e) => setField('food_type', e.target.value)} placeholder="e.g. tacos, boba, packaged hot sauce..." />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Are items pre-packaged or prepared on site?</label>
                      <div className="radio-group">
                        {['Pre-packaged', 'Prepared on site', 'Both'].map((opt) => (
                          <label key={opt} className="radio-item">
                            <input type="radio" name="food_prep" value={opt} checked={form.food_prepackaged === opt} onChange={() => setField('food_prepackaged', opt)} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Do you have a current health permit?</label>
                      <div className="radio-group">
                        {['Yes', 'No', 'In progress'].map((opt) => (
                          <label key={opt} className="radio-item">
                            <input type="radio" name="health_permit" value={opt} checked={form.health_permit === opt} onChange={() => setField('health_permit', opt)} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Do you have a food handler certification if required?</label>
                      <div className="radio-group">
                        {['Yes', 'No', 'In progress'].map((opt) => (
                          <label key={opt} className="radio-item">
                            <input type="radio" name="food_cert" value={opt} checked={form.food_certification === opt} onChange={() => setField('food_certification', opt)} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Do you operate from a permitted kitchen, truck, or facility?</label>
                      <div className="radio-group">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="radio-item">
                            <input type="radio" name="permitted_facility" value={opt} checked={form.permitted_facility === opt} onChange={() => setField('permitted_facility', opt)} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="v-permit-links">Upload or link permits (if available)</label>
                      <input id="v-permit-links" className="form-input" value={form.permit_links} onChange={(e) => setField('permit_links', e.target.value)} placeholder="Link to permits or documents..." />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─ Section 6: Permits & Budget ─ */}
            {section === 6 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label">Do you have a seller's permit?</label>
                  <div className="radio-group">
                    {["Yes", "No", "In progress", "Not sure"].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="sellers_permit" value={opt} checked={form.sellers_permit === opt} onChange={() => setField('sellers_permit', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Do you have general liability insurance?</label>
                  <div className="radio-group">
                    {["Yes", "No", "In progress", "Not sure"].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="liability_insurance" value={opt} checked={form.liability_insurance === opt} onChange={() => setField('liability_insurance', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Are you willing to provide required documents if accepted?</label>
                  <div className="radio-group">
                    {["Yes", "No"].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="willing_docs" value={opt} checked={form.willing_to_provide_docs === opt} onChange={() => setField('willing_to_provide_docs', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className="form-group">
                  <label className="form-label">Are you comfortable reviewing event-specific booth fees before confirming participation?</label>
                  <div className="radio-group">
                    {["Yes", "No", "Depends"].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="budget_comfort" value={opt} checked={form.budget_comfort === opt} onChange={() => setField('budget_comfort', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Are you interested in featured vendor placement?</label>
                  <div className="radio-group">
                    {["Yes", "No", "Maybe"].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="featured_interest" value={opt} checked={form.featured_interest === opt} onChange={() => setField('featured_interest', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Do you need discounted nonprofit/community pricing?</label>
                  <div className="radio-group">
                    {["Yes", "No"].map((opt) => (
                      <label key={opt} className="radio-item">
                        <input type="radio" name="nonprofit_pricing" value={opt} checked={form.nonprofit_pricing === opt} onChange={() => setField('nonprofit_pricing', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                {form.nonprofit_pricing === 'Yes' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="v-np-reason">Tell us more about your organization</label>
                    <textarea id="v-np-reason" className="form-textarea" value={form.nonprofit_pricing_reason} onChange={(e) => setField('nonprofit_pricing_reason', e.target.value)} placeholder="Describe your org and why you're applying for discounted pricing..." rows={3} />
                  </div>
                )}
              </div>
            )}

            {/* ─ Section 7: Final ─ */}
            {section === 7 && (
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label" htmlFor="v-notes">Anything else we should know?</label>
                  <textarea id="v-notes" className="form-textarea" value={form.additional_notes} onChange={(e) => setField('additional_notes', e.target.value)} placeholder="Any other info about your brand, needs, or questions..." rows={4} />
                </div>

                <div className={styles.consentSection}>
                  <label className={styles.consentItem}>
                    <input
                      type="checkbox"
                      checked={form.consent_no_guarantee}
                      onChange={(e) => setField('consent_no_guarantee', e.target.checked)}
                    />
                    <span>I understand that submitting an application does not guarantee acceptance.</span>
                  </label>
                  <label className={styles.consentItem}>
                    <input
                      type="checkbox"
                      checked={form.consent_permits}
                      onChange={(e) => setField('consent_permits', e.target.checked)}
                    />
                    <span>I understand that permits, licenses, insurance, and approvals may be required depending on what I sell and where the event is held.</span>
                  </label>
                </div>

                <div className={`notice notice--info`}>
                  Applying to PopUpCo is free unless a specific event clearly lists an application or booth fee. Any required fee will be shown before a vendor confirms participation.
                </div>

                {error && <p className="form-error">{error}</p>}

                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`btn btn--primary btn--lg ${styles.submitBtn}`}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Vendor Application'}
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className={styles.navBtns}>
              {section > 0 && (
                <button type="button" onClick={prevSection} className="btn btn--secondary">
                  ← Back
                </button>
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

export default function VendorApplicationPage() {
  return <VendorApplicationForm />;
}
