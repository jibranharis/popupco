import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';
import styles from '../hosts/page.module.css';

const features = [
  'Search opportunities by location, date, category, and budget',
  'Understand booth fees, rules, setup needs, and deadlines before applying',
  'Save spaces and markets you like',
  'Track applications in one dashboard',
  'Message hosts directly',
  'Build a vendor profile that makes your business look credible',
];

export default function VendorsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className="label">For vendors</span>
            <h1>Find places to sell, grow, and get discovered.</h1>
            <p>No more chasing Instagram posts, random Google Forms, and scattered DMs. PopUpCo brings pop-up opportunities, booth details, applications, messages, and saved listings into one place.</p>
            <div className={styles.ctas}>
              <Link href="/browse" className="btn btn--primary btn--lg">Find opportunities</Link>
              <Link href="/apply/vendor" className="btn btn--secondary btn--lg">Create your vendor profile</Link>
            </div>
          </div>
        </section>
        <section className="section">
          <div className={`container ${styles.grid}`}>
            <div className={styles.copy}>
              <h2>Everything vendors need before they commit.</h2>
              <ul>{features.map((feature) => <li key={feature}><CheckCircle2 size={18} /> {feature}</li>)}</ul>
            </div>
            <div className={styles.panel}>
              {['3 applications pending', '5 saved opportunities', '2 new markets near you', 'Profile 70% complete'].map((item) => (
                <div key={item}><CheckCircle2 size={20} /><strong>{item}</strong><span>Organized in your vendor dashboard.</span></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
