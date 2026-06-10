import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceCard from '@/components/SpaceCard';
import { getAllOpportunities } from '@/lib/spaces';
import styles from './page.module.css';

export const metadata = {
  title: 'Browse opportunities',
  description: 'Browse vendor markets, booth opportunities, and retail spaces accepting applications across the Bay Area.',
};

export default async function BrowsePage() {
  const opportunities = await getAllOpportunities();

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className="badge badge--accent">Browse opportunities</div>
            <h1 className={styles.headline}>Find your next pop-up opportunity</h1>
            <p className={styles.sub}>
              Vendor markets, booth opportunities, and retail spaces accepting applications across the Bay Area.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid-3">
              {opportunities.map((space) => <SpaceCard key={space.id} space={space} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
