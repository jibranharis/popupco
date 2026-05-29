import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sections = [
  ['Overview', 'PopUpCo is a beta-stage marketplace experience for vendors, venues, hosts, and local pop-up discovery. Some marketplace actions may require direct follow-up from the PopUpCo team.'],
  ['Accounts and submissions', 'You are responsible for the accuracy of account details, vendor applications, host requests, venue submissions, event information, photos, and contact information you provide.'],
  ['Vendor applications', 'Submitting a vendor application does not guarantee acceptance, placement, attendance, revenue, exclusivity, or future opportunities. Hosts and PopUpCo may review category fit, setup needs, permits, availability, and event capacity.'],
  ['Venue submissions', 'Submitting a venue does not guarantee bookings, events, vendors, attendees, or revenue. Venue owners are responsible for accurate capacity, rules, restrictions, availability, pricing, permits, and ownership or authorization details.'],
  ['Host submissions', 'Host requests are reviewed for event fit, venue status, vendor needs, logistics, and community safety. Submitting a host request does not guarantee approval, vendor participation, venue booking, attendance, or sales.'],
  ['Fees and payments', 'Applying to PopUpCo is free unless a specific event clearly lists an application or booth fee. Any required fee should be shown before a vendor confirms participation. Payment processing is not fully implemented in this beta unless explicitly stated for a specific event.'],
  ['Cancellations and refunds', 'Cancellation and refund terms may vary by event, host, venue, and payment method. Any event-specific policy should be confirmed before a paid commitment.'],
  ['Permits, licenses, and insurance', 'Vendors, hosts, and venues are responsible for required permits, licenses, insurance, approvals, food vendor requirements, tax obligations, and local compliance. PopUpCo does not provide legal, tax, insurance, or permitting advice.'],
  ['Content and photos', 'By submitting photos, descriptions, logos, or other content, you confirm you have permission to use it and allow PopUpCo to use it for marketplace review, listings, event pages, and related communications.'],
  ['Prohibited conduct', 'Do not submit false information, unsafe events, illegal products, discriminatory content, harassment, spam, malware, or content that violates another person or business rights.'],
  ['No guarantees', 'PopUpCo does not guarantee acceptance, bookings, attendance, sales, vendor performance, host performance, venue suitability, or event outcomes.'],
  ['Limitation of liability', 'PopUpCo is provided in beta and on an as-available basis. To the fullest extent allowed by law, PopUpCo is not liable for indirect, incidental, special, consequential, or lost-profit damages from use of the platform or participation in events.'],
  ['Contact', 'Questions about these terms can be sent through the contact page.'],
];

export const metadata = {
  title: 'Terms',
  description: 'PopUpCo beta marketplace terms for vendors, venues, hosts, and attendees.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '130px 0 96px', background: 'var(--color-bg)', minHeight: '70vh' }}>
        <div className="container container--narrow">
          <span className="label">Legal</span>
          <h1 style={{ marginTop: '8px' }}>Terms</h1>
          <p className="text-muted" style={{ marginTop: '16px' }}>
            These beta-stage terms explain how PopUpCo handles marketplace submissions, applications, event information, and user responsibilities.
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
