import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sections = [
  {
    title: 'For Vendors',
    items: [
      ['How do I apply to sell?', 'Browse vendor opportunities, open a listing, and use Apply to Sell. You can also apply generally from the vendor application page.'],
      ['What happens after I apply?', 'PopUpCo reviews fit, category mix, setup needs, and availability before following up.'],
      ['Are booth fees required?', 'Only if a specific event clearly lists a fee. Any required fee should be shown before confirmation.'],
      ['What permits do I need?', 'Permit needs depend on city, venue, product, and event type. Food vendors often need extra approvals.'],
      ['Can food vendors apply?', 'Yes, but prepared food, beverages, and trucks may require health permits, insurance, and venue approval.'],
    ],
  },
  {
    title: 'For Venues',
    items: [
      ['How do I submit a space?', 'Use the venue application and include location, capacity, amenities, rules, availability, and pricing preferences.'],
      ['Does submitting guarantee an event?', 'No. Submission helps PopUpCo review fit and does not guarantee bookings or revenue.'],
      ['Can I choose what types of pop-ups I host?', 'Yes. The venue form asks about event fit, restrictions, food, music, and availability.'],
      ['How are pricing and availability handled?', 'You can share preferred pricing and availability. Final details are confirmed before any event moves forward.'],
    ],
  },
  {
    title: 'For Hosts',
    items: [
      ['How do I create an event?', 'Use the host request flow to describe your concept, date, venue status, vendor needs, and support needs.'],
      ['Can PopUpCo help find vendors?', 'Yes. Hosts can request help recruiting vendors and managing interest.'],
      ['Can PopUpCo help find a venue?', 'Yes. The host flow supports organizers who need venue help.'],
      ['How are applications managed?', 'PopUpCo is building marketplace tools for applications, messages, and event coordination. Some beta actions may require direct follow-up.'],
    ],
  },
  {
    title: 'For Attendees',
    items: [
      ['How do I find events?', 'Use Upcoming Pop-Ups to browse public markets, food events, community pop-ups, and brand events.'],
      ['Are events free?', 'Some are free, some may be ticketed or RSVP-based, and some are still in planning. Event pages show access type.'],
      ['Where can I see event details?', 'Open an upcoming event card to view date, time, location status, organizer, food, parking, and accessibility notes.'],
    ],
  },
];

export const metadata = {
  title: 'Help',
  description: 'Help for PopUpCo vendors, venues, hosts, and attendees.',
};

export default function HelpPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '130px 0 96px', background: 'var(--color-bg)', minHeight: '70vh' }}>
        <div className="container">
          <span className="label">Help Center</span>
          <h1 style={{ marginTop: '8px', maxWidth: '760px' }}>Help for every side of the marketplace.</h1>
          <p className="text-muted" style={{ marginTop: '16px', maxWidth: '680px' }}>
            Quick guidance for vendors, venues, hosts, and attendees while PopUpCo builds out the full marketplace experience.
          </p>

          <div className="grid-2" style={{ marginTop: '56px' }}>
            {sections.map((section) => (
              <article key={section.title} className="card" style={{ padding: '28px' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '18px' }}>{section.title}</h2>
                <div style={{ display: 'grid', gap: '18px' }}>
                  {section.items.map(([question, answer]) => (
                    <div key={question}>
                      <strong>{question}</strong>
                      <p className="text-muted" style={{ marginTop: '4px' }}>{answer}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="card" style={{ marginTop: '32px', padding: '28px', display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>Need help with something specific?</h2>
              <p className="text-muted" style={{ marginTop: '6px' }}>Send a message and include your role, city, timing, and what you are trying to do.</p>
            </div>
            <Link href="/contact" className="btn btn--primary">Contact support</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
