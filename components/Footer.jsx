import Link from 'next/link';
import { MapPin, ShieldCheck, Store } from 'lucide-react';
import styles from './Footer.module.css';

const footerLinks = [
  {
    title: 'Marketplace',
    links: [
      ['Discover', '/discover'],
      ['For Vendors', '/vendors'],
      ['For Venues', '/venues'],
      ['For Hosts', '/hosts'],
    ],
  },
  {
    title: 'Support',
    links: [
      ['Pricing', '/pricing'],
      ['FAQ', '/faq'],
      ['Help', '/help'],
      ['Contact', '/contact'],
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
        <div className={styles.footerHero}>
          <div className={styles.brandBlock}>
            <Link href="/" className={styles.logo}>
              <img className={styles.logoImage} src="/images/popupco-logo-mark.png" alt="PopUpCo" />
              <span className={styles.logoText}>PopUpCo</span>
            </Link>
            <p>PopUpCo brings local vendors, venues, and hosts together to create better pop-up experiences.</p>
            <div className={styles.trustRow}>
              <span><Store size={15} /> Local markets</span>
              <span><ShieldCheck size={15} /> Verified hosts</span>
              <span><MapPin size={15} /> Bay Area first</span>
            </div>
          </div>

          <div className={styles.ctaCard}>
            <span className={styles.ctaEyebrow}>Start with what you need</span>
            <strong>Find a booth, list a space, or host a pop-up.</strong>
            <div className={styles.ctaActions}>
              <Link href="/vendors">Find opportunities</Link>
              <Link href="/apply/venue">List your space</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerNav}>
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
        </div>

        <div className={styles.bottomBar}>
          <p>
            PopUpCo helps organize discovery, applications, requests, and communication. Vendors, hosts, and venues are responsible for confirming permits, insurance, and local requirements.
          </p>
          <span className={styles.copyright}>&copy; {new Date().getFullYear()} PopUpCo</span>
        </div>
      </div>
    </footer>
  );
}
