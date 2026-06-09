import Link from 'next/link';
import UtilityPageShell from '@/components/UtilityPageShell';
import { Users, Sun, Flag } from 'lucide-react';
import shellStyles from '@/components/UtilityPageShell.module.css';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us | PopUpCo',
  description: 'Two founders. One mission. We’re on a mission to make pop-up opportunities more accessible, organized, and impactful for everyone.',
};

const founders = [
  {
    name: "Your Name",
    role: "Co-founder & CEO",
    bio: "I’m passionate about empowering local vendors and helping communities grow through real connections.",
    // Placeholder image
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Partner Name",
    role: "Co-founder & CTO",
    bio: "I love building technology that solves real problems and creates seamless marketplace experiences.",
    // Placeholder image
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const values = [
  {
    title: 'Why We Started',
    Icon: Users,
    text: 'We saw incredible local talent and amazing spaces — but no easy way to bring them together.'
  },
  {
    title: 'What We Believe',
    Icon: Sun,
    text: 'Pop-ups bring people together. They spark local economies and create lasting impact.'
  },
  {
    title: 'Where We’re Going',
    Icon: Flag,
    text: 'We’re just getting started. The best pop-ups — and the best communities — are ahead.'
  }
];

export default function AboutPage() {
  return (
    <UtilityPageShell
      label="ABOUT US"
      headline="Two founders. One mission."
      subtext="We’re on a mission to make pop-up opportunities more accessible, organized, and impactful for everyone."
    >
      
      {/* ── Founder Row ── */}
      <div className={styles.founderRow}>
        
        {/* Left Founder */}
        <div className={`${styles.founderCard} ${styles.founderLeft}`}>
          <div className={styles.founderText}>
            <h2 className={styles.founderName}>{founders[0].name}</h2>
            <div className={styles.founderRole}>{founders[0].role}</div>
            <p className={styles.founderBio}>{founders[0].bio}</p>
          </div>
          <div className={styles.founderImageWrapper}>
            <img src={founders[0].image} alt={founders[0].name} className={styles.founderImg} />
          </div>
        </div>

        {/* Center Connector */}
        <div className={styles.connectorWrapper}>
          <div className={styles.connectorLine}></div>
          <div className={styles.connectorBadge}>
            <img src="/images/popupco-logo-mark.png" alt="PopUpCo Mark" />
          </div>
        </div>

        {/* Right Founder */}
        <div className={`${styles.founderCard} ${styles.founderRight}`}>
          <div className={styles.founderText}>
            <h2 className={styles.founderName}>{founders[1].name}</h2>
            <div className={styles.founderRole}>{founders[1].role}</div>
            <p className={styles.founderBio}>{founders[1].bio}</p>
          </div>
          <div className={styles.founderImageWrapper}>
            <img src={founders[1].image} alt={founders[1].name} className={styles.founderImg} />
          </div>
        </div>
        
      </div>

      {/* ── Values Cards ── */}
      <div className={`${shellStyles.card} ${styles.valuesContainer}`}>
        {values.map((val) => (
          <div key={val.title} className={styles.valueCard}>
            <div className={styles.valueHeader}>
              <val.Icon size={24} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>{val.title}</h3>
            </div>
            <p className={styles.valueText}>{val.text}</p>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className={styles.ctaContainer}>
        <Link href="/contact" className={`btn btn--primary ${styles.ctaBtn}`}>
          Let&apos;s build the future together &rarr;
        </Link>
      </div>

    </UtilityPageShell>
  );
}
