'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

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

function VendorInterestForm() {
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get('event');

  const [form, setForm] = useState({
    name: '',
    email: '',
    business_name: '',
    category: '',
    city: '',
    description: '',
    instagram: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.business_name.trim()) newErrors.business_name = 'Business name is required.';
    if (!form.category) newErrors.category = 'Please select a category.';
    if (!form.city.trim()) newErrors.city = 'Please enter your city or general area.';
    if (!form.description.trim()) newErrors.description = 'Please briefly describe what you sell.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error as user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      // Send to the same backend, just mapping fields to what it expects
      // Or we can just log it for now and simulate success since this is a private beta
      const payload = {
        first_name: form.name.split(' ')[0] || form.name,
        last_name: form.name.split(' ').slice(1).join(' ') || '.',
        email: form.email,
        business_name: form.business_name,
        categories: [form.category],
        city: form.city,
        product_description: form.description,
        instagram: form.instagram,
        is_early_interest: true,
        event_preference: eventSlug,
        submittedAt: new Date().toISOString()
      };

      const res = await fetch('/api/apply/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.headline}>Join early vendor access</h1>
          <p className={styles.intro}>
            We're currently onboarding early vendors. Tell us a bit about your business, and we'll reach out when we have a strong-fit opportunity for you. Start with the basics. We’ll only ask for detailed setup or permit information when it is relevant to a specific opportunity.
          </p>
        </div>

        <div className={styles.formCard}>
          {submitted ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <CheckCircle size={32} />
              </div>
              <h2 className={styles.successTitle}>You're on the list!</h2>
              <p className={styles.successText}>
                Thanks — we’ll review your info and reach out when there’s a strong-fit opportunity in your area.
              </p>
              
              <div className={styles.successActions}>
                <Link href="/" className="btn btn--secondary">
                  Back to Homepage
                </Link>
                <span style={{ fontSize: '0.85rem', color: '#a39e96', marginTop: '16px' }}>or</span>
                <Link href={eventSlug ? `/apply/vendor?event=${eventSlug}` : "/apply/vendor"} className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Complete Full Application <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {submitError && (
                <div className={styles.formError}>
                  {submitError}
                </div>
              )}

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="name" className={styles.label}>Full Name</label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Jane Doe"
                    disabled={submitting}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className={styles.input}
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="jane@example.com"
                    disabled={submitting}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="business_name" className={styles.label}>Business Name</label>
                  <input
                    id="business_name"
                    type="text"
                    className={styles.input}
                    value={form.business_name}
                    onChange={(e) => setField('business_name', e.target.value)}
                    placeholder="Your brand name"
                    disabled={submitting}
                  />
                  {errors.business_name && <span className={styles.errorText}>{errors.business_name}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="category" className={styles.label}>Business Category</label>
                  <select
                    id="category"
                    className={styles.select}
                    value={form.category}
                    onChange={(e) => setField('category', e.target.value)}
                    disabled={submitting}
                  >
                    <option value="">Select a category...</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="city" className={styles.label}>City / Area</label>
                  <input
                    id="city"
                    type="text"
                    className={styles.input}
                    value={form.city}
                    onChange={(e) => setField('city', e.target.value)}
                    placeholder="e.g. Oakland, CA"
                    disabled={submitting}
                  />
                  {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="description" className={styles.label}>What do you sell?</label>
                  <textarea
                    id="description"
                    className={styles.textarea}
                    value={form.description}
                    onChange={(e) => setField('description', e.target.value)}
                    placeholder="Briefly describe your products..."
                    disabled={submitting}
                  />
                  {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="instagram" className={styles.label}>
                    Instagram or Website <span className={styles.optional}>(Optional)</span>
                  </label>
                  <input
                    id="instagram"
                    type="text"
                    className={styles.input}
                    value={form.instagram}
                    onChange={(e) => setField('instagram', e.target.value)}
                    placeholder="@yourbrand or yourwebsite.com"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className="btn btn--primary"
                  style={{ minWidth: '200px' }}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Join Early Access'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function VendorInterestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VendorInterestForm />
    </Suspense>
  );
}
