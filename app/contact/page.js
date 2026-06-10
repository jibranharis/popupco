import Link from 'next/link';
import UtilityPageShell from '@/components/UtilityPageShell';
import { Store, Building2, CalendarDays, HelpCircle, Mail, MapPin } from 'lucide-react';
import shellStyles from '@/components/UtilityPageShell.module.css';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <UtilityPageShell
      label="CONTACT"
      headline="Tell us what you are trying to build."
      subtext="Whether you sell products, own a space, organize events, or want to partner with PopUpCo, send the details and we’ll route you to the right next step."
    >
      <div className={styles.contactGrid}>
        
        <div className={styles.leftCol}>
          <div className={styles.intents}>
            <div className={styles.intentCard}>
              <div className={styles.intentIcon}><Store size={24} /></div>
              <div className={styles.intentContent}>
                <h3>Vendor or small business</h3>
                <p>Ask about opportunities, booth fees, applications, setup needs, or your vendor profile.</p>
                <Link href="/apply/vendor" className={styles.intentLink}>Start vendor application &rarr;</Link>
              </div>
            </div>
            
            <div className={styles.intentCard}>
              <div className={styles.intentIcon}><Building2 size={24} /></div>
              <div className={styles.intentContent}>
                <h3>Venue or space owner</h3>
                <p>Tell us about a storefront, cafe, hall, studio, school, lot, gallery, or community space.</p>
                <Link href="/apply/venue" className={styles.intentLink}>List your space &rarr;</Link>
              </div>
            </div>
            
            <div className={styles.intentCard}>
              <div className={styles.intentIcon}><CalendarDays size={24} /></div>
              <div className={styles.intentContent}>
                <h3>Host or organizer</h3>
                <p>Plan a vendor market, school fundraiser, boutique takeover, food pop-up, or local event.</p>
                <Link href="/apply/host" className={styles.intentLink}>Host a pop-up &rarr;</Link>
              </div>
            </div>
          </div>

          <div className={styles.helperCard}>
            <HelpCircle size={24} color="#c85f2c" style={{ flexShrink: 0 }} />
            <div>
              <h4>Good details help us respond faster.</h4>
              <p>Include your city, what you sell or what kind of space/event you have, timing, budget range, and any setup requirements.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.rightCol}>
          <div className={`${shellStyles.card} ${styles.formContainer}`}>
            <h2>Contact PopUpCo</h2>
            <form className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" className={styles.formInput} placeholder="Your name" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" className={styles.formInput} placeholder="you@example.com" required />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone <span>(optional)</span></label>
                  <input type="tel" id="phone" className={styles.formInput} placeholder="(555) 000-0000" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="intent">What are you working on? *</label>
                  <select id="intent" className={`${styles.formInput} ${styles.formSelect}`} defaultValue="" required>
                    <option value="" disabled>Select an option</option>
                    <option value="vendor">I am a vendor</option>
                    <option value="venue">I own a venue or space</option>
                    <option value="host">I want to host an event</option>
                    <option value="attendee">I am attending an event</option>
                    <option value="other">Partnership / other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea id="message" className={`${styles.formInput} ${styles.formTextarea}`} placeholder="What are you planning or looking for?" required></textarea>
              </div>

              <button type="button" className="btn btn--primary btn--full btn--lg">Send message</button>
              <p className={styles.submitNote}>We typically respond within 1–2 business days.</p>
            </form>
          </div>
        </div>

      </div>

      <div className={styles.bottomStrip}>
        <div className={styles.contactInfo}>
          <Mail size={16} />
          <a href="mailto:hello@popupco.com">hello@popupco.com</a>
        </div>
        <div className={styles.contactInfo}>
          <MapPin size={16} />
          <span>Based in: Bay Area, California</span>
        </div>
      </div>
    </UtilityPageShell>
  );
}
