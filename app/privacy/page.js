import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sections = [
  ['Information we collect', 'PopUpCo may collect name, email, phone, account role, business details, venue details, host request details, application responses, uploaded photo links, social links, event preferences, setup needs, permit notes, and usage data.'],
  ['How we use information', 'We use information to review applications, match vendors, hosts, and venues, contact users, coordinate event operations, improve the platform, and provide support.'],
  ['Marketplace sharing', 'Vendor application details may be shared with relevant hosts or event reviewers. Venue and host details may be shared as needed to coordinate logistics, fit, and follow-up.'],
  ['Service providers', 'We may use service providers for hosting, analytics, form handling, communication, storage, and related operations. These providers may process information for PopUpCo.'],
  ['Cookies and analytics', 'The site may use basic cookies, local storage, or analytics-style usage data to support demo login, saved items, application state, site performance, and product improvements.'],
  ['Data retention', 'We keep information as long as needed for marketplace review, user support, legal obligations, event operations, and product development, unless deletion is requested and retention is no longer required.'],
  ['User choices', 'You can contact PopUpCo to update, correct, or request deletion of submitted information. Some records may need to be retained for operational, legal, or safety reasons.'],
  ['Beta notice', 'PopUpCo is currently developing its marketplace experience. Some features may be in beta, and certain marketplace actions may require direct follow-up from the PopUpCo team.'],
  ['Contact', 'Questions about privacy can be sent through the contact page.'],
];

export const metadata = {
  title: 'Privacy',
  description: 'How PopUpCo handles vendor, venue, host, attendee, and application information.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '130px 0 96px', background: 'var(--color-bg)', minHeight: '70vh' }}>
        <div className="container container--narrow">
          <span className="label">Legal</span>
          <h1 style={{ marginTop: '8px' }}>Privacy</h1>
          <p className="text-muted" style={{ marginTop: '16px' }}>
            This privacy page explains what PopUpCo may collect and how it may be used while the marketplace is in beta.
          </p>
          <div style={{ display: 'grid', gap: '24px', marginTop: '44px' }}>
            {sections.map(([title, copy]) => (
              <section key={title} className="card" style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{title}</h2>
                <p className="text-muted">{copy}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
