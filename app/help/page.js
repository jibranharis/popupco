import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HelpPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '130px 0 96px', background: 'var(--color-bg)', minHeight: '70vh' }}>
        <div className="container container--narrow">
          <span className="label">Help Center</span>
          <h1 style={{ marginTop: '8px' }}>Help Center</h1>
          <p className="text-muted" style={{ marginTop: '16px' }}>
            Guides for vendors, venues, hosts, and attendees are being organized here. For now, send questions through the contact page and PopUpCo will route them to the right place.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
