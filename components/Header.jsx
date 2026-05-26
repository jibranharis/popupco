'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from './AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Logged-out Nav
  const publicNavCenter = [
    { label: 'Browse Spaces', href: '/browse' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'List Your Space', href: '/apply/venue' },
  ];
  const publicNavRight = [
    { label: 'Log In', href: '/login' },
    { label: 'Sign Up', href: '/signup' },
  ];

  // Vendor Nav
  const vendorNav = [
    { label: 'Browse Spaces', href: '/browse' },
    { label: 'Dashboard', href: '/dashboard/vendor' },
    { label: 'Saved Spaces', href: '/dashboard/vendor#saved' },
    { label: 'Messages', href: '/dashboard/vendor#messages' },
  ];

  // Venue Nav
  const venueNav = [
    { label: 'Dashboard', href: '/dashboard/venue' },
    { label: 'My Spaces', href: '/dashboard/venue#spaces' },
    { label: 'Booking Requests', href: '/dashboard/venue#requests' },
    { label: 'Messages', href: '/dashboard/venue#messages' },
  ];

  const currentNav = !user ? publicNavCenter : (user.type === 'vendor' ? vendorNav : venueNav);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo (Left) */}
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoMark}>◻</span>
          <span className={styles.logoText}>Pop Up Co.</span>
        </Link>

        {/* Center Nav */}
        <nav className={styles.navCenter}>
          {currentNav.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Area */}
        <div className={styles.navRight}>
          {!user ? (
            <>
              {publicNavRight.map((link) => (
                <Link key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              ))}
              <Link href="/browse" className="btn btn--primary btn--sm">
                Find a Space
              </Link>
            </>
          ) : (
            <div className={styles.profileMenuContainer}>
              <button 
                className={styles.profileBtn}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className={styles.avatar}>
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                </div>
              </button>
              
              {profileOpen && (
                <div className={styles.profileDropdown}>
                  <div className={styles.profileHeader}>
                    <p className={styles.profileName}>{user.name}</p>
                    <p className={styles.profileEmail}>{user.email}</p>
                  </div>
                  <div className={styles.dropdownLinks}>
                    <Link href={`/dashboard/${user.type}`} onClick={() => setProfileOpen(false)}>Dashboard</Link>
                    <Link href="#" onClick={() => setProfileOpen(false)}>Settings</Link>
                    <button onClick={() => { logout(); setProfileOpen(false); }}>Log Out</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {currentNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {!user && <hr className={styles.mobileDivider} />}
          
          {!user ? (
            publicNavRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))
          ) : (
            <>
              <hr className={styles.mobileDivider} />
              <button 
                className={styles.mobileNavLink} 
                style={{textAlign: 'left', width: '100%'}}
                onClick={() => { logout(); setMenuOpen(false); }}
              >
                Log Out
              </button>
            </>
          )}
        </nav>
        
        {!user && (
          <div className={styles.mobileCtas}>
            <Link href="/browse" className="btn btn--primary btn--full" onClick={() => setMenuOpen(false)}>
              Find a Space
            </Link>
          </div>
        )}
      </div>

      {/* Mobile overlay */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
