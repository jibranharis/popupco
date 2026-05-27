'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Building2, Mail, MapPin, MessageSquare, Store, Users } from 'lucide-react';
import styles from './page.module.css';

const paths = [
  {
    id: 'vendor',
    title: 'Vendor or small business',
    copy: 'Ask about opportunities, booth fees, applications, setup needs, or your vendor profile.',
    href: '/apply/vendor',
    cta: 'Start vendor application',
    icon: Store,
  },
  {
    id: 'venue',
    title: 'Venue or space owner',
    copy: 'Tell us about a storefront, cafe, hall, studio, school, lot, gallery, or community space.',
    href: '/apply/venue',
    cta: 'List your space',
    icon: Building2,
  },
  {
    id: 'host',
    title: 'Host or organizer',
    copy: 'Plan a vendor market, school fundraiser, boutique takeover, food pop-up, or local event.',
    href: '/hosts',
    cta: 'Host a pop-up',
    icon: Users,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setError('Something went wrong. Please try again or email us directly.');
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
          <div className={`container ${styles.heroGrid}`}>
            <div>
              <span className="label">Contact</span>
              <h1>Tell us what you are trying to build.</h1>
              <p>
                Whether you sell products, own a space, organize events, or want to partner with PopUpCo, send the details and we will route you to the right next step.
              </p>
            </div>
            <div className={styles.heroCard}>
              <Mail size={22} />
              <span>Email</span>
              <a href="mailto:hello@popupco.com">hello@popupco.com</a>
              <div />
              <MapPin size={22} />
              <span>Based in</span>
              <strong>Bay Area, California</strong>
            </div>
          </div>
        </section>

        <section className="section bg-alt">
          <div className="container">
            <div className={styles.pathGrid}>
              {paths.map(({ icon: Icon, title, copy, href, cta }) => (
                <Link key={title} href={href} className={styles.pathCard}>
                  <Icon size={24} />
                  <h2>{title}</h2>
                  <p>{copy}</p>
                  <span>{cta} <ArrowRight size={17} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className={`container ${styles.contactGrid}`}>
            <div className={styles.contactCopy}>
              <span className="label">Send a message</span>
              <h2>Good details help us respond faster.</h2>
              <p>
                Include your city, what you sell or what kind of space/event you have, timing, budget range, and any setup requirements. Food vendors should mention permit status if relevant.
              </p>
              <div className={styles.responseBox}>
                <MessageSquare size={20} />
                <div>
                  <strong>What happens next</strong>
                  <p>We read every message and use your role to send the most useful next step, not a generic reply.</p>
                </div>
              </div>
            </div>

            <div className={styles.formWrap} id="contact-form">
              {submitted ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✓</div>
                  <h2>Message sent.</h2>
                  <p>Thanks for reaching out. We will get back to you as soon as we can.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h2>Contact PopUpCo</h2>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Name <span className="req">*</span></label>
                    <input id="contact-name" className="form-input" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email <span className="req">*</span></label>
                    <input id="contact-email" className="form-input" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-type">I am a</label>
                    <select id="contact-type" className="form-select" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                      <option value="">Select one...</option>
                      <option value="vendor">Vendor</option>
                      <option value="venue">Venue owner</option>
                      <option value="host">Host or organizer</option>
                      <option value="attendee">Attendee or explorer</option>
                      <option value="nonprofit">Nonprofit or community organization</option>
                      <option value="partner">Potential partner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message <span className="req">*</span></label>
                    <textarea id="contact-message" className="form-textarea" required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="What are you trying to do?" rows={6} />
                  </div>

                  {error && <p className="form-error">{error}</p>}
                  <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>{submitting ? 'Sending...' : 'Send message'}</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
