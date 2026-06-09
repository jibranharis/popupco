'use client';

import { useEffect, useRef, useState } from 'react';
import { Lock } from 'lucide-react';
import styles from './ConversationSection.module.css';

/* ─── Conversation data ─────────────────────────────────── */
const STEPS = [
  {
    id: 1,
    title: 'Event details',
    description: 'Confirm key info like dates, booth fee, and what's included.',
    messages: [
      { sender: 'V', role: 'vendor', text: 'Is the booth fee fixed, or does it depend on category?', time: '10:28 AM' },
      { sender: 'H', role: 'host',   text: 'Booths start at $75. Food vendors need a permit, but handmade goods are ready to apply.', time: '10:30 AM' },
      { sender: 'V', role: 'vendor', text: 'What does the booth fee include?', time: '10:32 AM' },
      { sender: 'H', role: 'host',   text: 'It includes a 10×10 space, event listing, basic setup notes, and host support before the market.', time: '10:34 AM' },
      { sender: 'V', role: 'vendor', text: 'Perfect. That helps me compare options.', time: '10:35 AM' },
    ],
  },
  {
    id: 2,
    title: 'Attendance',
    description: 'Understand expected foot traffic and your target audience.',
    messages: [
      { sender: 'V', role: 'vendor', text: 'How many people usually attend?', time: '10:36 AM' },
      { sender: 'H', role: 'host',   text: 'We expect 400–600 visitors based on last month\'s market.', time: '10:38 AM' },
      { sender: 'V', role: 'vendor', text: 'What time is usually the busiest?', time: '10:40 AM' },
      { sender: 'H', role: 'host',   text: 'Peak foot traffic is usually between 11 AM and 3 PM.', time: '10:42 AM' },
      { sender: 'V', role: 'vendor', text: 'Great. That works well for my products.', time: '10:43 AM' },
    ],
  },
  {
    id: 3,
    title: 'Permits',
    description: 'Learn what's required and who handles the paperwork.',
    messages: [
      { sender: 'V', role: 'vendor', text: 'Do I need a permit to sell food at this event?', time: '10:44 AM' },
      { sender: 'H', role: 'host',   text: 'Yes, food vendors need a temporary food permit before the market.', time: '10:46 AM' },
      { sender: 'V', role: 'vendor', text: 'Do you provide instructions for that?', time: '10:48 AM' },
      { sender: 'H', role: 'host',   text: 'Yes. We send the permit checklist, deadline, and local contact after approval.', time: '10:50 AM' },
      { sender: 'V', role: 'vendor', text: 'That makes it much easier. Thank you.', time: '10:51 AM' },
    ],
  },
  {
    id: 4,
    title: 'Confirm fit',
    description: 'Review everything and confirm it\'s the right match.',
    messages: [
      { sender: 'V', role: 'vendor', text: 'Can I apply for the Saturday slot?', time: '10:52 AM' },
      { sender: 'H', role: 'host',   text: 'Yes, applications are open until Friday.', time: '10:54 AM' },
      { sender: 'V', role: 'vendor', text: 'Is this a good fit for handmade skincare?', time: '10:55 AM' },
      { sender: 'H', role: 'host',   text: 'Yes. Beauty and handmade goods performed well at the last market.', time: '10:57 AM' },
      { sender: 'V', role: 'vendor', text: 'Perfect. I\'m ready to apply.', time: '10:58 AM' },
    ],
  },
];

const TOTAL_STEPS = STEPS.length;

/* ─── Single message bubble ─────────────────────────────── */
function Bubble({ msg, visible, reducedMotion }) {
  const isVendor = msg.role === 'vendor';
  return (
    <div
      className={`${styles.bubble} ${isVendor ? styles.bubbleVendor : styles.bubbleHost} ${visible ? styles.bubbleVisible : ''} ${reducedMotion ? styles.noMotion : ''}`}
    >
      {isVendor && <div className={styles.avatar} data-vendor>V</div>}
      <div className={styles.bubbleInner}>
        <span className={styles.bubbleLabel}>{isVendor ? 'VENDOR' : 'HOST'}</span>
        <p>{msg.text}</p>
        <span className={styles.bubbleTime}>{msg.time}</span>
      </div>
      {!isVendor && <div className={styles.avatar} data-host>H</div>}
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────── */
export default function ConversationSection() {
  const sectionRef  = useRef(null);
  const prefersReducedMotion = useRef(false);

  // progress: 0–1 through the full sticky scroll range
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    prefersReducedMotion.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionH = el.offsetHeight;
      const viewH    = window.innerHeight;

      // scrolled distance into the section (px past the top)
      // When rect.top === 0 → user just entered; when rect.top === -(sectionH - viewH) → end
      const scrolled = -rect.top;                        // 0 at entry, grows as user scrolls
      const total    = sectionH - viewH;                 // total scrollable px in this section

      if (scrolled <= 0 || total <= 0) { setProgress(0); return; }
      if (scrolled >= total)           { setProgress(1); return; }

      setProgress(scrolled / total);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Derive active step (0-indexed) and how many bubbles to show in that step
  const stepSize = 1 / TOTAL_STEPS; // 0.25 each
  const activeStep   = Math.min(Math.floor(progress / stepSize), TOTAL_STEPS - 1);
  const stepProgress = (progress - activeStep * stepSize) / stepSize; // 0–1 within the step

  // Bubbles reveal: 5 bubbles across 0–0.8 of the step's range (last 0.2 lets line fill)
  const bubblesVisible = Math.floor(stepProgress / 0.18) + 1; // reveals at 0%, 18%, 36%, 54%, 72%

  // Progress line fill between steps
  // Line between step i and i+1 fills during the LAST 30% of step i's range
  const lineProgress = (stepIdx) => {
    // stepIdx: which connecting line (0 = between step 0 and 1, etc.)
    if (activeStep > stepIdx)  return 1;   // fully filled (past this step)
    if (activeStep < stepIdx)  return 0;   // not yet reached
    // currently in this step → map last 30% of stepProgress to 0–1
    return Math.min(1, Math.max(0, (stepProgress - 0.7) / 0.3));
  };

  const reducedMotion = prefersReducedMotion.current;

  return (
    /* Outer section: 400vh gives the scrollable "story" range */
    <section ref={sectionRef} className={styles.outer} id="clear-conversations">
      {/* Sticky inner: stays fixed while user scrolls through the 400vh */}
      <div className={styles.sticky}>
        <div className={styles.container}>

          {/* ── LEFT COLUMN ── */}
          <div className={styles.left}>
            <span className={styles.sectionLabel}>CLEAR CONVERSATIONS</span>
            <h2 className={styles.headline}>
              Get the details<br />
              before you commit<span className={styles.headlineDot}>.</span>
            </h2>
            <p className={styles.subtext}>
              Ask the right questions, get real answers,<br />
              and move forward with confidence.
            </p>

            {/* Progress tracker */}
            <ol className={styles.tracker}>
              {STEPS.map((step, i) => {
                const isActive    = i === activeStep;
                const isCompleted = i < activeStep;
                const showLine    = i < STEPS.length - 1;
                return (
                  <li key={step.id} className={`${styles.trackerStep} ${isActive ? styles.stepActive : ''} ${isCompleted ? styles.stepDone : ''}`}>
                    <div className={styles.stepLeft}>
                      {/* Circle */}
                      <div className={styles.stepCircle}>
                        <span>{step.id}</span>
                      </div>
                      {/* Connector line */}
                      {showLine && (
                        <div className={styles.stepLine}>
                          <div
                            className={styles.stepLineFill}
                            style={{ height: `${lineProgress(i) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className={styles.stepRight}>
                      <strong className={styles.stepTitle}>{step.title}</strong>
                      <p className={styles.stepDesc}>{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ── RIGHT COLUMN: Conversation panel ── */}
          <div className={styles.right}>
            <div className={styles.panel}>
              <div className={styles.panelMessages}>
                {STEPS[activeStep].messages.map((msg, i) => (
                  <Bubble
                    key={`${activeStep}-${i}`}
                    msg={msg}
                    visible={i < bubblesVisible}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
              <div className={styles.panelFooter}>
                <Lock size={13} strokeWidth={2} />
                <span>Private between you and the host. No commitment until you apply.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
