import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = {
  vendors: [
    { label: 'Vendors', href: '/vendors' },
    { label: 'Apply as a Vendor', href: '/apply/vendor' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Upcoming Pop-Ups', href: '/upcoming' },
  ],
  venues: [
    { label: 'Venues', href: '/venues' },
    { label: 'List Your Space', href: '/apply/venue' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Top row */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>◻</span>
              <span className={styles.logoText}>Pop Up Co.</span>
            </Link>
            <p className={styles.tagline}>
              Launching in the Bay Area.<br />
              More cities coming soon.
            </p>
            <div className={styles.social}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pop Up Co. on Instagram"
                className={styles.socialLink}
              >
                IG
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pop Up Co. on TikTok"
                className={styles.socialLink}
              >
                TK
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pop Up Co. on LinkedIn"
                className={styles.socialLink}
              >
                LI
              </a>
            </div>
            <a href="mailto:hello@popupco.com" className={styles.email}>
              hello@popupco.com
            </a>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <p className={styles.linkGroupTitle}>For Vendors</p>
              {footerLinks.vendors.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <p className={styles.linkGroupTitle}>For Venues</p>
              {footerLinks.venues.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <p className={styles.linkGroupTitle}>Company</p>
              {footerLinks.company.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={styles.disclaimer}>
          <p>
            Pop Up Co. helps connect vendors, events, and spaces. Food, beverage, and food truck vendors may require additional permits and approval. Pop Up Co. does not provide legal, tax, insurance, or permitting advice. Vendors and venues are responsible for confirming and maintaining any permits, licenses, insurance, approvals, or documents required for their products, services, city, venue, and event type.
          </p>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Pop Up Co. All rights reserved.
          </p>
          <p className={styles.legal}>
            Submitting an application does not guarantee acceptance.
          </p>
        </div>
      </div>
    </footer>
  );
}
