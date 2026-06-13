'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GoogleAnalytics } from '@next/third-parties/google';
import styles from './CookieBanner.module.css';

const CONSENT_KEY = 'popupco_cookie_consent';

export default function CookieBanner({ gaId }) {
  const [consent, setConsent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Check if user has already answered
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent) {
      setConsent(savedConsent);
    } else {
      // Show banner after a tiny delay
      setIsRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setConsent('granted');
    closeBanner();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setConsent('denied');
    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 400); // wait for fade out
  };

  return (
    <>
      {/* If consent is granted AND we have a GA ID, load Google Analytics */}
      {consent === 'granted' && gaId && (
        <GoogleAnalytics gaId={gaId} />
      )}

      {/* The Banner UI */}
      {isRendered && (
        <div className={`${styles.bannerWrap} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.banner}>
            <div className={styles.content}>
              <h3 className={styles.title}>We value your privacy</h3>
              <p className={styles.text}>
                We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read more in our <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </div>
            <div className={styles.actions}>
              <button onClick={handleDecline} className={styles.btnDecline}>
                Decline
              </button>
              <button onClick={handleAccept} className={styles.btnAccept}>
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
