'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './EarlyAccessFeedbackModal.module.css';

const DISMISSAL_KEY = 'popupco_feedback_dismissed';
const DISMISSAL_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function EarlyAccessFeedbackModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check dismissal state
    const dismissedAt = localStorage.getItem(DISMISSAL_KEY);
    if (dismissedAt) {
      const timeSinceDismissal = Date.now() - parseInt(dismissedAt, 10);
      if (timeSinceDismissal < DISMISSAL_DURATION_MS) {
        return; // Don't show
      }
    }

    let hasTriggered = false;
    let scrollHandler;
    let clickHandler;
    let timeTimeout;
    let delayTimeout;
    let clickDelayPassed = false;

    const showModal = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setIsRendered(true);
      // Small delay for animation
      setTimeout(() => setIsVisible(true), 10);
      
      cleanup();
    };

    // 1. Scroll trigger (20-25% down)
    scrollHandler = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 20) {
        showModal();
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // 2. Click trigger (after short delay)
    delayTimeout = setTimeout(() => {
      clickDelayPassed = true;
    }, 3500); // 3.5 seconds before click triggers it
    
    clickHandler = () => {
      if (clickDelayPassed) {
        showModal();
      }
    };
    document.addEventListener('click', clickHandler, { capture: true });

    // 3. Time trigger (8-12 seconds)
    timeTimeout = setTimeout(() => {
      showModal();
    }, 10000); // 10 seconds

    function cleanup() {
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('click', clickHandler, { capture: true });
      clearTimeout(timeTimeout);
      clearTimeout(delayTimeout);
    }

    return cleanup;
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(DISMISSAL_KEY, Date.now().toString());
    setTimeout(() => setIsRendered(false), 300); // Wait for animation
  }, []);

  // Escape key handler
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleClose]);

  if (!isRendered) return null;

  return (
    <div 
      className={`${styles.backdrop} ${isVisible ? styles.visible : ''}`}
      onClick={(e) => {
        // Optional: close on backdrop click, but prompt says 
        // "Clicking outside the modal should not accidentally trigger random site actions"
        // It doesn't strictly say it should close. But standard modal behavior is close.
        // I will not close on backdrop click to keep them focused on the modal buttons.
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <div 
        className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.closeBtn} 
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className={styles.modalContent}>
          <span className={styles.badge}>EARLY ACCESS</span>
          
          <h2 id="feedback-modal-title" className={styles.title}>
            PopUpCo is in early access.<br/>We're gathering feedback.
          </h2>

          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 0 8.3-2.5 5-9.4 10.7-9.4 10.7" />
                <path d="M2 22 12 12" />
              </svg>
            </div>
            <div className={styles.dividerLine}></div>
          </div>

          <p className={styles.bodyCopy}>
            We're building PopUpCo carefully with a small group of early users. Your feedback helps us shape a better experience for vendors, hosts, and venues.
          </p>

          <p className={styles.secondaryCopy}>
            Got a minute? We'd love to hear your thoughts.
          </p>

          <div className={styles.actions}>
            <button 
              className={styles.primaryBtn}
              onClick={() => {
                handleClose();
                // Route to contact page as feedback
                router.push('/contact');
              }}
            >
              Share feedback
            </button>
            <button 
              className={styles.secondaryBtn}
              onClick={handleClose}
            >
              Continue browsing
            </button>
          </div>

          <div className={styles.helperText}>
            <Info size={12} className={styles.helperIcon} />
            <span>The feedback form is also linked at the bottom of the site.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
