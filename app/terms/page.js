import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '130px 0 96px', background: 'var(--color-bg)', minHeight: '70vh' }}>
        <div className="container container--narrow">
          <span className="label">Legal</span>
          <h1 style={{ marginTop: '8px' }}>Terms</h1>
          <p className="text-muted" style={{ marginTop: '16px' }}>PopUpCo terms will live here as the marketplace moves toward launch.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
