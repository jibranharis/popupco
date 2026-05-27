import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '130px 0 96px', background: 'var(--color-bg)', minHeight: '70vh' }}>
        <div className="container container--narrow">
          <span className="label">Legal</span>
          <h1 style={{ marginTop: '8px' }}>Privacy</h1>
          <p className="text-muted" style={{ marginTop: '16px' }}>PopUpCo privacy details will live here as account and marketplace features grow.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
