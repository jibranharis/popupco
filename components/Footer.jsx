import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = [
  {
    title: 'Marketplace',
    links: [
      ['Discover', '/discover'],
      ['For Vendors', '/vendors'],
      ['For Venues', '/venues'],
      ['For Hosts', '/hosts'],
      ['Upcoming Events', '/upcoming'],
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
            <span className={styles.copyright}>&copy; {new Date().getFullYear()} PopUpCo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
