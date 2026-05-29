import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OpportunityNotFound() {
  return (
    <>
      <Header />
      <main style={{ padding: '140px 0 96px', background: 'var(--color-bg)', minHeight: '70vh' }}>
        <div className="container container--narrow">
          <span className="label">Opportunity not found</span>
          <h1 style={{ marginTop: '8px' }}>We could not find that opportunity.</h1>
          <p className="text-muted" style={{ margin: '16px 0 28px' }}>
            Browse all vendor opportunities instead, or contact PopUpCo if you were looking for a specific listing.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/browse" className="btn btn--primary">Browse opportunities</Link>
            <Link href="/contact" className="btn btn--secondary">Contact PopUpCo</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
