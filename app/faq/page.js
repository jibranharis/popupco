'use client';

import { useState } from 'react';
import Link from 'next/link';
import UtilityPageShell from '@/components/UtilityPageShell';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';
import shellStyles from '@/components/UtilityPageShell.module.css';
import styles from './page.module.css';

const faqs = [
  {
    q: 'What is PopUpCo?',
    a: 'PopUpCo is a marketplace that connects vendors, space owners, and event organizers. We make it easy to find booth opportunities, discover unique pop-ups, and organize local events without chasing down details.'
  },
  {
    q: 'How do vendors apply?',
    a: 'Vendors can browse opportunities and apply directly through the platform. Simply create a profile with your business details, and you can submit it to multiple events with one click. Hosts will review your application and message you if it’s a fit.'
  },
  {
    q: 'Can venues approve event types?',
    a: 'Yes. Venue owners have full control over what types of events, pop-ups, or markets take place in their space. You set your rules, availability, and pricing.'
  },
  {
    q: 'How do hosts create an event?',
    a: 'Hosts can create an event page, outline their requirements, set booth pricing, and start accepting vendor applications. You can also message vendors directly to ask questions before confirming them.'
  },
  {
    q: 'Can PopUpCo help hosts find vendors?',
    a: 'Yes! Hosts can publish open calls for vendors. Vendors looking for opportunities will see your event and apply, bringing the options directly to you.'
  },
  {
    q: 'Can PopUpCo help hosts find a venue?',
    a: 'Absolutely. You can browse our directory of available spaces, filter by capacity and location, and message the venue owners directly to request dates.'
  },
  {
    q: 'How do attendees find events?',
    a: 'Attendees can browse upcoming events, RSVP, and see which of their favorite vendors will be setting up. It’s the easiest way to support local commerce.'
  },
  {
    q: 'Are events free?',
    a: 'Public attendance is often free, but it depends entirely on the event host. Some curated markets or special pop-ups may require a ticket or RSVP. Vendor booth fees also vary by event.'
  },
  {
    q: 'Where is PopUpCo launching?',
    a: 'PopUpCo is currently focused on the San Francisco Bay Area and surrounding regions. We plan to expand to other cities soon as our community grows.'
  }
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className={styles.accordion}>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
            <button className={styles.faqHeader} onClick={() => toggle(i)}>
              {faq.q}
              <ChevronDown size={20} className={styles.chevron} />
            </button>
            {isOpen && (
              <div className={styles.faqBody}>
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  return (
    <UtilityPageShell
      label="FAQ"
      headline="Questions vendors, hosts, venues, and attendees ask."
      subtext="Answers to common questions about PopUpCo applications, public events, venue submissions, host requests, pricing, and marketplace responsibilities."
    >
      <div className={styles.faqLayout}>
        <div className={styles.leftCol}>
          <FAQAccordion />
        </div>
        
        <div className={styles.rightCol}>
          <div className={`${shellStyles.card} ${styles.supportCard}`}>
            <HelpCircle size={40} strokeWidth={1.5} className={styles.supportIcon} />
            <h3>Still have questions?</h3>
            <p>We’re here to help with anything else you need.</p>
            <Link href="/contact" className="btn btn--primary btn--full">Contact support</Link>
          </div>
        </div>
      </div>

      <div className={styles.legalCallout}>
        <ShieldAlert size={20} className={styles.legalIcon} />
        <div>
          PopUpCo does not provide legal, tax, insurance, or permitting advice. Vendors, hosts, and venues are responsible for confirming and maintaining required permits, licenses, insurance, approvals, or documents.
        </div>
      </div>
    </UtilityPageShell>
  );
}
