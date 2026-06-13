'use client';
import { useState, useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Info } from 'lucide-react';
import styles from './CookieBanner.module.css';

const CONSENT_KEY = 'popupco_cookie_consent';

export default function CookieBanner({ gaId }) {
  const [consent, setConsent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // Toggle states
  const [toggles, setToggles] = useState({
    preferences: false,
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already answered
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
        setToggles({
          preferences: !!parsed.preferences,
          statistics: !!parsed.statistics,
          marketing: !!parsed.marketing,
        });
      } catch (e) {
        // Fallback for old string format if they accepted the old banner
        if (savedConsent === 'granted') {
          const allTrue = { preferences: true, statistics: true, marketing: true };
          setConsent(allTrue);
          setToggles(allTrue);
        }
      }
    }
  }, []);

  const openModal = () => {
    setIsRendered(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setIsRendered(false), 300);
  };

  const saveConsent = (newConsent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    closeModal();
  };

  const handleDeny = () => {
    const denied = { preferences: false, statistics: false, marketing: false };
    setToggles(denied);
    saveConsent(denied);
  };

  const handleAllowSelection = () => {
    saveConsent(toggles);
  };

  const handleAcceptAll = () => {
    const accepted = { preferences: true, statistics: true, marketing: true };
    setToggles(accepted);
    saveConsent(accepted);
  };

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Trigger Button - Floating Bottom Left */}
      <button 
        className={styles.floatingBtn} 
        onClick={openModal}
        aria-label="Cookie Preferences"
      >
        <Info size={22} />
      </button>

      {/* If consent for statistics is granted AND we have a GA ID, load Google Analytics */}
      {consent?.statistics === true && gaId && (
        <GoogleAnalytics gaId={gaId} />
      )}

      {/* The Modal UI */}
      {isRendered && (
        <div className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.title}>This website uses cookies</h3>
              <p className={styles.text}>
                We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you've provided to them or that they've collected from your use of their services.
              </p>
            </div>

            <div className={styles.togglesGrid}>
              <div className={styles.toggleItem}>
                <span className={styles.toggleLabel}>Necessary</span>
                <label className={styles.switch}>
                  <input type="checkbox" checked disabled />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.toggleItem}>
                <span className={styles.toggleLabel}>Preferences</span>
                <label className={styles.switch}>
                  <input 
                    type="checkbox" 
                    checked={toggles.preferences} 
                    onChange={() => handleToggle('preferences')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.toggleItem}>
                <span className={styles.toggleLabel}>Statistics</span>
                <label className={styles.switch}>
                  <input 
                    type="checkbox" 
                    checked={toggles.statistics} 
                    onChange={() => handleToggle('statistics')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.toggleItem}>
                <span className={styles.toggleLabel}>Marketing</span>
                <label className={styles.switch}>
                  <input 
                    type="checkbox" 
                    checked={toggles.marketing} 
                    onChange={() => handleToggle('marketing')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button onClick={handleDeny} className={`${styles.btn} ${styles.btnDeny}`}>
                DENY
              </button>
              <button onClick={handleAllowSelection} className={`${styles.btn} ${styles.btnAllow}`}>
                ALLOW SELECTION
              </button>
              <button onClick={handleAcceptAll} className={`${styles.btn} ${styles.btnAccept}`}>
                ACCEPT ALL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
