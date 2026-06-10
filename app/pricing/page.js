import Link from 'next/link';
import UtilityPageShell from '@/components/UtilityPageShell';
import { Check, ShieldCheck, MapPin, Users, Maximize, CloudSun, Clock, CalendarDays, Star } from 'lucide-react';
import shellStyles from '@/components/UtilityPageShell.module.css';
import styles from './page.module.css';

export const metadata = {
  title: 'Pricing',
  description: 'Simple pricing for pop-up opportunities.',
};

const plans = [
  {
    title: 'Vendor spots',
    price: 'Varies by event',
    description: 'Find markets, pop-ups, and events seeking vendors like you.',
    features: [
      'Apply to multiple events',
      'Booth details before applying',
      'Application review',
      'Setup instructions',
      'Notifications when accepted'
    ],
    cta: 'Find opportunities',
    href: '/vendors',
    isPrimary: false,
  },
  {
    badge: 'MOST POPULAR',
    title: 'Featured placement',
    price: 'Custom',
    description: 'Stand out with premium visibility and priority placement options.',
    features: [
      'Priority placement when available',
      'Featured listing in search',
      'Social and email highlights',
      'Category lift options',
      'Partner event consideration'
    ],
    cta: 'Get featured',
    href: '/contact',
    isPrimary: true,
  },
  {
    title: 'Brand pop-ups',
    price: 'Custom',
    description: 'Bring your brand to life with a dedicated pop-up experience.',
    features: [
      'Space matching support',
      'Launch planning guidance',
      'Dedicated event page',
      'Setup assist',
      'Optional event-day support'
    ],
    cta: 'Plan a pop-up',
    href: '/contact',
    isPrimary: false,
  }
];

const factors = [
  { label: 'Location', Icon: MapPin },
  { label: 'Expected attendance', Icon: Users },
  { label: 'Booth size', Icon: Maximize },
  { label: 'Indoor or outdoor', Icon: CloudSun },
  { label: 'Setup time', Icon: Clock },
  { label: 'Event type', Icon: CalendarDays },
  { label: 'Promotion level', Icon: Star },
];

export default function PricingPage() {
  return (
    <UtilityPageShell
      label="PRICING"
      headline="Simple pricing for pop-up opportunities."
      subtext="PopUpCo keeps things clear and fair. Prices may vary by location, category, and event type, but the goal is always value you can trust."
    >
      <div className={styles.planGrid}>
        {plans.map((plan) => (
          <div key={plan.title} className={`${shellStyles.card} ${styles.pricingCard} ${plan.isPrimary ? styles.featuredCard : ''}`}>
            {plan.badge && <span className={styles.featuredBadge}>{plan.badge}</span>}
            <h2 className={styles.planTitle}>{plan.title}</h2>
            <span className={styles.planPrice}>{plan.price}</span>
            <p className={styles.planDesc}>{plan.description}</p>
            <ul className={styles.featureList}>
              {plan.features.map(f => (
                <li key={f}><Check size={16} /> {f}</li>
              ))}
            </ul>
            <Link href={plan.href} className={`btn ${plan.isPrimary ? 'btn--primary' : 'btn--secondary'} btn--full`}>
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className={`${shellStyles.card} ${styles.feeCallout}`}>
        <ShieldCheck size={32} className={styles.feeCalloutIcon} />
        <div className={styles.feeCalloutText}>
          <h3>Application fees are not the default.</h3>
          <p>Many listings are free to browse and apply to. Some events may include a fee set by the host for special categories or featured placement. Any required fees will be shown before you apply.</p>
        </div>
      </div>

      <div className={styles.factorsSection}>
        <div className={styles.factorsLabel}>PRICING FACTORS</div>
        <div className={styles.factorsRow}>
          {factors.map((Factor) => (
            <span key={Factor.label} className={styles.factorPill}>
              <Factor.Icon size={14} /> {Factor.label}
            </span>
          ))}
        </div>
      </div>
    </UtilityPageShell>
  );
}
