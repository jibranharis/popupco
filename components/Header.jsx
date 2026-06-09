'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Mail, Menu, User, X } from 'lucide-react';
import { useAuth } from './AuthContext';
import styles from './Header.module.css';

const publicNav = [
  { label: 'About', href: '/about' },
  { label: 'Discover', href: '/discover' },
  { label: 'For Vendors', href: '/vendors' },
  { label: 'For Venues', href: '/venues' },
  { label: 'For Hosts', href: '/hosts' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    let frame = null;
    const updateScrolled = () => {
      // On homepage, stay transparent until the overContent section scrolls up to touch the navbar
      if (pathname === '/') {
        // Hero is sticky, overContent scrolls over it — trigger when user has scrolled ~80% of hero height
        const heroEl = document.querySelector('main > div:first-child');
        const threshold = heroEl ? heroEl.offsetHeight * 0.65 : window.innerHeight * 0.65;
        setScrolled(window.scrollY > threshold);
      } else {
        setScrolled(true);
      }
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      frame = window.requestAnimationFrame(() => {
        updateScrolled();
        ticking.current = false;
      });
    };
    updateScrolled();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      ticking.current = false;
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!profileOpen) return undefined;

    const onMouseDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setProfileOpen(false);
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [profileOpen]);

  const nav = publicNav;
  const isActiveNav = (href) => {
    if (href === '/discover') return pathname === '/discover' || pathname.startsWith('/upcoming');
    return pathname === href;
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={handleLogoClick}>
          <img className={styles.logoImage} src="/images/popupco-logo-mark.png" alt="PopUpCo" />
          <span className={styles.logoText}>PopUpCo</span>
        </Link>

        <nav className={styles.navCenter} aria-label="Primary">
          {nav.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${styles.navLink} ${isActiveNav(link.href) ? styles.activeNavLink : ''}`}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown size={14} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' }} />}
            </Link>
          ))}
        </nav>

        <div className={styles.navRight}>
          {!user ? (
            <>
              <Link href="/login" className={`${styles.navLink} ${styles.loginLink}`}>Log in</Link>
              <Link href="/signup" className={`${styles.navLink} ${styles.signupLink}`}>Sign up</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/messages" className={styles.messageBtn} aria-label="Messages">
                <Mail size={18} />
              </Link>
              <div className={styles.profileMenuContainer} ref={profileRef}>
                <button
                  className={styles.profileBtn}
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                >
                  <div className={styles.avatar}>{user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}</div>
                </button>
                {profileOpen && (
                  <div className={styles.profileDropdown}>
                    <div className={styles.profileHeader}>
                      <p className={styles.profileName}>{user.name}</p>
                      <p className={styles.profileEmail}>{user.email}</p>
                    </div>
                    <div className={styles.dropdownLinks}>
                      <Link href="/dashboard" onClick={() => setProfileOpen(false)}>Dashboard</Link>
                      <Link href="/dashboard/profile" onClick={() => setProfileOpen(false)}>Profile</Link>
                      <Link href="/dashboard/applications" onClick={() => setProfileOpen(false)}>Applications</Link>
                      <Link href="/dashboard/saved" onClick={() => setProfileOpen(false)}>Saved</Link>
                      <Link href="/dashboard/messages" onClick={() => setProfileOpen(false)}>Messages</Link>
                      <Link href="/dashboard/settings" onClick={() => setProfileOpen(false)}>Settings</Link>
                      <button onClick={() => { logout(); setProfileOpen(false); }}>Log out</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav} aria-label="Mobile primary">
          {nav.map((link) => (
            <Link key={link.href} href={link.href} className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <hr className={styles.mobileDivider} />
          {!user ? (
            <>
              <Link href="/login" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link href="/signup" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Sign up</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/messages" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Messages</Link>
              <Link href="/dashboard" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link href="/dashboard/profile" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Profile</Link>
              <Link href="/dashboard/applications" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Applications</Link>
              <Link href="/dashboard/saved" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Saved</Link>
              <Link href="/dashboard/settings" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Settings</Link>
              <button className={styles.mobileNavLink} onClick={() => { logout(); setMenuOpen(false); }}>Log out</button>
            </>
          )}
        </nav>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
