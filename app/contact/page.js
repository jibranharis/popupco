'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const CONTACT_TYPES = [
  { id: 'vendor', icon: '🛍️', label: "I'm a vendor", desc: 'Apply to sell at a pop-up or ask about upcoming events.' },
  { id: 'venue', icon: '🏪', label: 'I have a venue', desc: 'List your space or ask about hosting a pop-up.' },
  { id: 'partner', icon: '🤝', label: 'I want to partner', desc: 'Sponsorships, nonprofits, community organizations, and other collaborations.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.headline}>Get in touch.</h1>
            <p className={styles.sub}>
              Whether you're a vendor, venue owner, or potential partner — we'd love to hear from you.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className={styles.layout}>
              {/* Left */}
              <div className={styles.left}>
                {/* Paths */}
                <div className={styles.paths}>
                  {CONTACT_TYPES.map((type) => (
                    <Link key={type.id} href={type.id === 'vendor' ? '/apply/vendor' : type.id === 'venue' ? '/apply/venue' : '#contact-form'} className={`card ${styles.pathCard}`}>
                      <span className={styles.pathIcon}>{type.icon}</span>
                      <div>
                        <p className={styles.pathLabel}>{type.label}</p>
                        <p className={styles.pathDesc}>{type.desc}</p>
                      </div>
                      <ArrowRight size={18} className={styles.pathArrow} />
                    </Link>
                  ))}
                </div>

                {/* Info */}
                <div className={styles.contactInfo}>
                  <div className={styles.infoItem}>
                    <Mail size={18} className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoLabel}>Email</p>
                      <a href="mailto:hello@popupco.com" className={styles.infoVal}>hello@popupco.com</a>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIconText}>📍</span>
                    <div>
                      <p className={styles.infoLabel}>Based in</p>
                      <p className={styles.infoVal}>Bay Area, California</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className={styles.formWrap} id="contact-form">
                {submitted ? (
                  <div className={styles.success}>
                    <div className={styles.successIcon}>✓</div>
                    <h2 className={styles.successTitle}>Message sent!</h2>
                    <p className={styles.successDesc}>We'll get back to you as soon as we can.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.formTitle}>Send us a message</h2>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Name <span className="required">*</span></label>
                      <input
                        id="contact-name"
                        className="form-input"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email <span className="required">*</span></label>
                      <input
                        id="contact-email"
                        className="form-input"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-type">I am a</label>
                      <select
                        id="contact-type"
                        className="form-select"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                      >
                        <option value="">Select one...</option>
                        <option value="vendor">Vendor</option>
                        <option value="venue">Venue owner</option>
                        <option value="brand">Brand</option>
                        <option value="nonprofit">Nonprofit / community organization</option>
                        <option value="partner">Potential partner</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-message">Message <span className="required">*</span></label>
                      <textarea
                        id="contact-message"
                        className="form-textarea"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="What can we help with?"
                        rows={5}
                      />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <button type="submit" className="btn btn--primary" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
