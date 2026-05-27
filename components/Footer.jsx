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
        <div className={styles.topContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>◻</span>
            <span className={styles.logoText}>Pop Up Co.</span>
          </Link>
        </div>

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
            <h4 className={styles.linkTitle}>Host</h4>
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

        {/* Disclaimer / Notice */}
        <div className={styles.disclaimer}>
          <p>
            Pop Up Co. connects vendors, events, and spaces. Users are responsible for confirming all required permits and documents.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.copyright}>© {new Date().getFullYear()} Pop Up Co.</span>
            <div className={styles.legalLinks}>
              <Link href="#">Terms</Link>
              <Link href="#">Privacy</Link>
            </div>
          </div>
          
          <div className={styles.bottomRight}>
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
