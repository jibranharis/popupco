'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User, X } from 'lucide-react';
import { useAuth } from './AuthContext';
import styles from './Header.module.css';

const publicNav = [
  { label: 'Discover', href: '/browse' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Vendors', href: '/vendors' },
  { label: 'For Venues', href: '/venues' },
  { label: 'For Hosts', href: '/hosts' },
];

const roleNav = {
  vendor: [
    { label: 'Opportunities', href: '/browse' },
    { label: 'Applications', href: '/dashboard/vendor#applications' },
    { label: 'Saved', href: '/dashboard/vendor#saved' },
    { label: 'Messages', href: '/dashboard/vendor#messages' },
    { label: 'Dashboard', href: '/dashboard/vendor' },
    { label: 'Profile', href: '/dashboard/vendor#profile' },
  ],
  venue: [
    { label: 'Listings', href: '/dashboard/venue#listings' },
    { label: 'Requests', href: '/dashboard/venue#requests' },
    { label: 'Calendar', href: '/dashboard/venue#calendar' },
    { label: 'Messages', href: '/dashboard/venue#messages' },
    { label: 'Dashboard', href: '/dashboard/venue' },
    { label: 'Profile', href: '/dashboard/venue#profile' },
  ],
  host: [
    { label: 'My Events', href: '/dashboard/host#events' },
    { label: 'Vendor Applications', href: '/dashboard/host#applications' },
    { label: 'Spaces', href: '/browse' },
    { label: 'Messages', href: '/dashboard/host#messages' },
    { label: 'Dashboard', href: '/dashboard/host' },
    { label: 'Profile', href: '/dashboard/host#profile' },
  ],
  attendee: [
    { label: 'Discover', href: '/browse' },
    { label: 'Saved Events', href: '/dashboard/attendee#saved' },
    { label: 'Messages', href: '/dashboard/attendee#messages' },
    { label: 'Profile', href: '/dashboard/attendee#profile' },
  ],
};

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const nav = user ? roleNav[user.type] || roleNav.vendor : publicNav;
  const dashboardHref = user ? `/dashboard/${user.type}` : '/signup';

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <img className={styles.logoImage} src="/images/popupco-logo.png" alt="PopUpCo" />
          <span className={styles.logoText}>PopUpCo</span>
        </Link>

        <nav className={styles.navCenter} aria-label="Primary">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.activeNavLink : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.navRight}>
          {!user ? (
            <>
              <Link href="/login" className={styles.navLink}>Log in</Link>
              <Link href="/signup" className={styles.navLink}>Sign up</Link>
              <Link href="/browse" className="btn btn--primary btn--sm">Get Started</Link>
            </>
          ) : (
            <div className={styles.profileMenuContainer}>
              <button className={styles.profileBtn} onClick={() => setProfileOpen(!profileOpen)} aria-label="Open profile menu">
                <div className={styles.avatar}>{user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}</div>
              </button>
              {profileOpen && (
                <div className={styles.profileDropdown}>
                  <div className={styles.profileHeader}>
                    <p className={styles.profileName}>{user.name}</p>
                    <p className={styles.profileEmail}>{user.email}</p>
                  </div>
                  <div className={styles.dropdownLinks}>
                    <Link href={dashboardHref} onClick={() => setProfileOpen(false)}>Dashboard</Link>
                    <Link href={`${dashboardHref}#profile`} onClick={() => setProfileOpen(false)}>Profile</Link>
                    <button onClick={() => { logout(); setProfileOpen(false); }}>Log out</button>
                  </div>
                </div>
              )}
            </div>
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
            <button className={styles.mobileNavLink} onClick={() => { logout(); setMenuOpen(false); }}>Log out</button>
          )}
        </nav>
        {!user && (
          <div className={styles.mobileCtas}>
            <Link href="/browse" className="btn btn--primary btn--full" onClick={() => setMenuOpen(false)}>Get Started</Link>
          </div>
        )}
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
