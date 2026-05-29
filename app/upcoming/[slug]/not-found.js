import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UpcomingEventNotFound() {
  return (
    <>
      <Header />
      <main style={{ padding: '140px 0 96px', background: 'var(--color-bg)', minHeight: '70vh' }}>
        <div className="container container--narrow">
          <span className="label">Event not found</span>
          <h1 style={{ marginTop: '8px' }}>We could not find that event.</h1>
          <p className="text-muted" style={{ margin: '16px 0 28px' }}>
            You can still browse upcoming pop-ups or apply as a general vendor.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/upcoming" className="btn btn--primary">Browse upcoming events</Link>
            <Link href="/apply/vendor" className="btn btn--secondary">Apply as a vendor</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
