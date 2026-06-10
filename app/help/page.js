import Link from 'next/link';
import UtilityPageShell from '@/components/UtilityPageShell';
import { Store, Building2, CalendarDays, Ticket, HelpCircle } from 'lucide-react';
import shellStyles from '@/components/UtilityPageShell.module.css';
import styles from './page.module.css';

export const metadata = {
  title: 'Help',
  description: 'Get help with vendor applications, venue listings, hosting events, and tickets.',
};

const helpCategories = [
  {
    title: 'For Vendors',
    Icon: Store,
    desc: 'Find opportunities, apply to events, and grow your business.',
    links: [
      'How do I apply to sell?',
      'What happens after I apply?',
      'Can food vendors apply?'
    ],
    cta: 'Get vendor help \u2192',
    href: '/contact'
  },
  {
    title: 'For Venues',
    Icon: Building2,
    desc: 'List your space and connect with hosts and the PopUpCo community.',
    links: [
      'How do I submit a space?',
      'Does submitting guarantee an event?',
      'What details should I include?'
    ],
    cta: 'Get venue help \u2192',
    href: '/contact'
  },
  {
    title: 'For Hosts',
    Icon: CalendarDays,
    desc: 'Plan events, find vendors, and bring your vision to life.',
    links: [
      'How do I create an event?',
      'Can PopUpCo help find vendors?',
      'Can PopUpCo help find a venue?'
    ],
    cta: 'Get host help \u2192',
    href: '/contact'
  },
  {
    title: 'For Attendees',
    Icon: Ticket,
    desc: 'Discover events, explore pop-ups, and support local communities.',
    links: [
      'How do I find events?',
      'Are events free?',
      'Where can I see event details?'
    ],
    cta: 'Get attendee help \u2192',
    href: '/contact'
  }
];

export default function HelpPage() {
  return (
    <UtilityPageShell
      label="HELP CENTER"
      headline="Help for every side of the marketplace."
      subtext="Quick guidance for vendors, venues, hosts, and attendees while PopUpCo builds out the full marketplace experience."
    >
      <div className={styles.helpGrid}>
        {helpCategories.map((cat) => (
          <div key={cat.title} className={`${shellStyles.card} ${styles.helpCard}`}>
            <div className={styles.iconWrapper}>
              <cat.Icon size={24} />
            </div>
            <h2>{cat.title}</h2>
            <p className={styles.helpDesc}>{cat.desc}</p>
            <ul className={styles.helpLinks}>
              {cat.links.map(link => <li key={link}>{link}</li>)}
            </ul>
            <Link href={cat.href} className={styles.helpLinkBtn}>{cat.cta}</Link>
          </div>
        ))}
      </div>

      <div className={shellStyles.supportCallout}>
        <div className={shellStyles.supportLeft}>
          <HelpCircle size={32} color="#c85f2c" style={{ marginBottom: '12px' }} />
          <h3>Need help with something specific?</h3>
          <p>Our support team is here to help you get the answers you need.</p>
        </div>
        <Link href="/contact" className="btn btn--primary btn--lg">Contact support</Link>
      </div>
    </UtilityPageShell>
  );
}
