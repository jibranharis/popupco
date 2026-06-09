'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Lock, MessageCircle } from 'lucide-react';
import styles from './ConversationSection.module.css';

/* ─── Data ──────────────────────────────────────────────── */
const STEPS = [
  {
    id: 1,
    title: 'Event details',
    description: "Confirm key info like dates, booth fee, and what's included.",
    messages: [
      { role: 'vendor', text: 'Is the booth fee fixed, or does it depend on category?', time: '10:28 AM' },
      { role: 'host',   text: 'Booths start at $75. Food vendors need a permit, but handmade goods are ready to apply.', time: '10:30 AM' },
      { role: 'vendor', text: 'What does the booth fee include?', time: '10:32 AM' },
      { role: 'host',   text: 'It includes a 10×10 space, event listing, basic setup notes, and host support before the market.', time: '10:34 AM' },
      { role: 'vendor', text: 'Perfect. That helps me compare options.', time: '10:35 AM' },
    ],
  },
  {
    id: 2,
    title: 'Attendance',
    description: 'Understand expected foot traffic and your target audience.',
    messages: [
      { role: 'vendor', text: 'How many people usually attend?', time: '10:36 AM' },
      { role: 'host',   text: "We expect 400–600 visitors based on last month's market.", time: '10:38 AM' },
      { role: 'vendor', text: 'What time is usually the busiest?', time: '10:40 AM' },
      { role: 'host',   text: 'Peak foot traffic is usually between 11 AM and 3 PM.', time: '10:42 AM' },
      { role: 'vendor', text: 'Great. That works well for my products.', time: '10:43 AM' },
    ],
  },
  {
    id: 3,
    title: 'Permits',
    description: "Learn what's required and who handles the paperwork.",
    messages: [
      { role: 'vendor', text: 'Do I need a permit to sell food at this event?', time: '10:44 AM' },
      { role: 'host',   text: 'Yes, food vendors need a temporary food permit before the market.', time: '10:46 AM' },
      { role: 'vendor', text: 'Do you provide instructions for that?', time: '10:48 AM' },
      { role: 'host',   text: 'Yes. We send the permit checklist, deadline, and local contact after approval.', time: '10:50 AM' },
      { role: 'vendor', text: 'That makes it much easier. Thank you.', time: '10:51 AM' },
    ],
  },
  {
    id: 4,
    title: 'Confirm fit',
    description: "Review everything and confirm it's the right match.",
    messages: [
      { role: 'vendor', text: 'Can I apply for the Saturday slot?', time: '10:52 AM' },
      { role: 'host',   text: 'Yes, applications are open until Friday.', time: '10:54 AM' },
      { role: 'vendor', text: 'Is this a good fit for handmade skincare?', time: '10:55 AM' },
      { role: 'host',   text: 'Yes. Beauty and handmade goods performed well at the last market.', time: '10:57 AM' },
      { role: 'vendor', text: "Perfect. I'm ready to apply.", time: '10:58 AM' },
    ],
  },
];

export default function ConversationSection() {
  const panelBodyRef   = useRef(null);
  const stepMarkerRefs = useRef({});   // stepIdx → DOM el

  const [activeStep, setActiveStep] = useState(0);

  /* ── Scroll listener: only updates left-side tracker based on which
     step marker has scrolled past the top of the visible panel area ── */
  const handlePanelScroll = useCallback(() => {
    const body = panelBodyRef.current;
    if (!body) return;

    const bodyTop = body.getBoundingClientRect().top;
    let current = 0;

    Object.entries(stepMarkerRefs.current).forEach(([idxStr, el]) => {
      if (!el) return;
      // Element's position relative to the panel's visible top
      const elVisibleTop = el.getBoundingClientRect().top - bodyTop;
      // If the marker has scrolled to within 60px of the top of the panel, it's "active"
      if (elVisibleTop <= 60) {
        current = Number(idxStr);
      }
    });

    setActiveStep(current);
  }, []);

  useEffect(() => {
    const body = panelBodyRef.current;
    if (!body) return;
    body.addEventListener('scroll', handlePanelScroll, { passive: true });
    return () => body.removeEventListener('scroll', handlePanelScroll);
  }, [handlePanelScroll]);

  return (
    <section className={styles.outer} id="clear-conversations">
      <div className={styles.inner}>

        {/* ── LEFT ── */}
        <div className={styles.left}>
          <span className={styles.sectionLabel}>CLEAR CONVERSATIONS</span>
          <h2 className={styles.headline}>
            Get the details<br />
            before you commit<span className={styles.headlineDot}>.</span>
          </h2>
          <p className={styles.subtext}>
            Ask the right questions, get real answers,
            and move forward with confidence.
          </p>

          <ol className={styles.tracker}>
            {STEPS.map((step, i) => {
              const isActive = i === activeStep;
              const isDone   = i < activeStep;
              return (
                <li
                  key={step.id}
                  className={[
                    styles.trackerStep,
                    isActive ? styles.stepActive : '',
                    isDone   ? styles.stepDone   : '',
                  ].join(' ')}
                >
                  <div className={styles.stepSpine}>
                    <div className={styles.stepCircle}>
                      <span>{step.id}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={styles.stepLine}>
                        <div
                          className={[
                            styles.stepLineFill,
                            isDone ? styles.lineFull : '',
                          ].join(' ')}
                        />
                      </div>
                    )}
                  </div>
                  <div className={styles.stepText}>
                    <strong className={styles.stepTitle}>{step.title}</strong>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── RIGHT ── */}
        <div className={styles.right}>
          <div className={styles.panel}>

            {/* Header — sits outside the scroll area so it never moves */}
            <div className={styles.panelHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.headerIcon}>
                  <MessageCircle size={14} strokeWidth={2} />
                </div>
                <div className={styles.headerText}>
                  <span className={styles.headerLabel}>Now discussing</span>
                  <span className={styles.headerTopic}>{STEPS[activeStep].title}</span>
                </div>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.headerStepCount}>
                  Step {activeStep + 1} of {STEPS.length}
                </span>
                <div className={styles.headerDots}>
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={[styles.dot, i <= activeStep ? styles.dotActive : ''].join(' ')}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable body — overscroll-behavior: contain keeps page scroll intact */}
            <div className={styles.panelBody} ref={panelBodyRef}>
              {STEPS.map((step, stepIdx) => (
                <div key={stepIdx} className={styles.stepGroup}>
                  {/* Invisible anchor for scroll-position detection */}
                  <div
                    ref={el => { stepMarkerRefs.current[stepIdx] = el; }}
                    className={styles.stepMarker}
                    aria-hidden="true"
                  />

                  {step.messages.map((msg, msgIdx) => {
                    const isVendor = msg.role === 'vendor';
                    return (
                      <div
                        key={`${stepIdx}-${msgIdx}`}
                        className={[
                          styles.bubble,
                          isVendor ? styles.bubbleVendor : styles.bubbleHost,
                        ].join(' ')}
                      >
                        {isVendor && (
                          <div className={styles.avatar} data-vendor="true">V</div>
                        )}
                        <div className={styles.bubbleCard}>
                          <span className={styles.bubbleLabel}>
                            {isVendor ? 'VENDOR' : 'HOST'}
                          </span>
                          <p className={styles.bubbleText}>{msg.text}</p>
                          <span className={styles.bubbleTime}>{msg.time}</span>
                        </div>
                        {!isVendor && (
                          <div className={styles.avatar} data-host="true">H</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className={styles.bodyPad} />
            </div>

            <div className={styles.panelFooter}>
              <Lock size={13} strokeWidth={2} />
              <span>Private between you and the host. No commitment until you apply.</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
