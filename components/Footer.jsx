import Link from 'next/link';
import { Instagram, Twitter, Linkedin, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const footerLinks = {
  discover: [
    { label: 'Browse Spaces', href: '/browse' },
    { label: 'Upcoming Pop-Ups', href: '/upcoming' },
    { label: 'For Vendors', href: '/apply/vendor' },
  ],
  host: [
    { label: 'List Your Space', href: '/apply/venue' },
    { label: 'Host Guidelines', href: '#' },
    { label: 'Community Standards', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Top Content */}
        <div className={styles.topGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>◻</span>
              <span className={styles.logoText}>Pop Up Co.</span>
            </Link>
            <p className={styles.tagline}>
              Find space for your next pop-up.<br />
              Launching in the Bay Area.
            </p>
            <a href="mailto:hello@popupco.com" className={styles.email}>
              hello@popupco.com
            </a>
          </div>

          {/* Links Columns */}
          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Discover</h4>
              {footerLinks.discover.map((link) => (
                <Link key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Hosting</h4>
              {footerLinks.host.map((link) => (
                <Link key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Company</h4>
              {footerLinks.company.map((link) => (
                <Link key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer / Notice */}
        <div className={styles.disclaimer}>
          <p>
            Pop Up Co. helps connect vendors, events, and spaces. Food, beverage, and food truck vendors may require additional permits and approval. Vendors and venues are responsible for confirming and maintaining any permits, licenses, insurance, approvals, or documents required for their products, services, city, venue, and event type.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.copyright}>© {new Date().getFullYear()} Pop Up Co.</span>
            <div className={styles.legalLinks}>
              <Link href="#">Terms</Link>
              <Link href="#">Privacy</Link>
              <Link href="#">Sitemap</Link>
            </div>
          </div>
          
          <div className={styles.bottomRight}>
            <div className={styles.region}>
              <MapPin size={16} />
              <span>United States (EN)</span>
            </div>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
