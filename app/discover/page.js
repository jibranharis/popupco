import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CalendarDays, MapPin, Store, Users } from 'lucide-react';

const paths = [
  {
    title: 'I want to sell at an event',
    copy: 'Browse vendor markets, booth opportunities, food pop-ups, and spaces currently accepting vendor interest.',
    href: '/browse',
    cta: 'Browse vendor opportunities',
    Icon: Store,
  },
  {
    title: 'I want to attend local pop-ups',
    copy: 'Find public markets, food events, brand pop-ups, and community experiences near you.',
    href: '/upcoming',
    cta: 'View upcoming events',
    Icon: CalendarDays,
  },
  {
    title: 'I want to host a pop-up',
    copy: 'Start an event request, recruit vendors, and tell PopUpCo whether you already have a venue or need one.',
    href: '/apply/host',
    cta: 'Start host request',
    Icon: Users,
  },
  {
    title: 'I have a venue or space',
    copy: 'Submit a storefront, hall, cafe, studio, lot, gallery, school, or community space for pop-up use.',
    href: '/apply/venue',
    cta: 'Submit a venue',
    Icon: MapPin,
  },
];

export const metadata = {
  title: 'Discover',
  description: 'Choose the right PopUpCo marketplace path for vendors, attendees, hosts, and venues.',
};

export default function DiscoverPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '132px 0 96px', background: 'var(--color-bg)', minHeight: '80vh' }}>
        <section>
          <div className="container">
            <span className="label">Discover</span>
            <h1 style={{ marginTop: '8px', maxWidth: '780px', fontSize: 'clamp(2.75rem, 4.4vw, 4.1rem)', lineHeight: 1.08, letterSpacing: '-0.04em' }}>What do you want to do on PopUpCo?</h1>
            <p className="text-muted" style={{ marginTop: '16px', maxWidth: '680px', fontSize: '1.08rem' }}>
              PopUpCo supports vendors, attendees, hosts, and venues. Choose the path that matches what you are trying to do.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid-4">
              {paths.map(({ title, copy, href, cta, Icon }) => (
                <Link key={title} href={href} className="card" style={{ padding: '24px', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Icon size={24} color="var(--color-accent)" />
                  <h2 style={{ fontSize: '1.2rem' }}>{title}</h2>
                  <p className="text-muted">{copy}</p>
                  <span style={{ marginTop: 'auto', color: 'var(--color-accent)', fontWeight: 850, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    {cta} <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
