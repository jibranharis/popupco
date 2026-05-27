import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

const footerLinks = [
  {
    title: 'Discover',
    links: [
      ['Browse Opportunities', '/browse'],
      ['Upcoming Pop-Ups', '/upcoming'],
      ['Vendor Markets', '/browse'],
      ['Retail Spaces', '/browse'],
      ['Food Pop-Ups', '/browse'],
    ],
  },
  {
    title: 'For Users',
    links: [
      ['For Vendors', '/vendors'],
      ['For Venues', '/venues'],
      ['For Hosts', '/hosts'],
      ['For Attendees', '/browse'],
    ],
  },
  {
    title: 'Hosting',
    links: [
      ['List Your Space', '/apply/venue'],
      ['Host an Event', '/hosts'],
      ['Host Guidelines', '/faq'],
      ['Community Standards', '/faq'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Us', '/about'],
      ['FAQ', '/faq'],
      ['Pricing', '/pricing'],
      ['Contact', '/contact'],
      ['Help Center', '/help'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms', '/terms'],
      ['Privacy', '/privacy'],
      ['Sitemap', '/sitemap.xml'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.topContent}>
          <Link href="/" className={styles.logo}>
            <img className={styles.logoImage} src="/images/popupco-logo-mark.png" alt="PopUpCo" />
            <span className={styles.logoText}>PopUpCo</span>
          </Link>
          <p>PopUpCo brings local vendors, venues, and hosts together to create better pop-up experiences.</p>
        </div>

        <div className={styles.linksGrid}>
          {footerLinks.map((group) => (
            <div key={group.title} className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>{group.title}</h4>
              {group.links.map(([label, href]) => (
                <Link key={label} href={href} className={styles.link}>{label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.disclaimer}>
          <p>
            PopUpCo helps organize discovery, applications, requests, and communication. Vendors, hosts, and venues are responsible for confirming permits, insurance, and local requirements.
          </p>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.copyright}>© {new Date().getFullYear()} PopUpCo</span>
          </div>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
