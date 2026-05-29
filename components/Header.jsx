'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Menu, User, X } from 'lucide-react';
import { useAuth } from './AuthContext';
import styles from './Header.module.css';

const publicNav = [
  { label: 'Discover', href: '/discover' },
  { label: 'For Vendors', href: '/vendors' },
  { label: 'For Venues', href: '/venues' },
  { label: 'For Hosts', href: '/hosts' },
];

const roleNav = {
  vendor: publicNav,
  venue: publicNav,
  host: publicNav,
  attendee: publicNav,
};

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(pathname !== '/' || window.scrollY > 64);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const nav = user ? roleNav[user.type] || roleNav.vendor : publicNav;
  const dashboardHref = user ? `/dashboard/${user.type}` : '/signup';
  const isActiveNav = (href) => {
    if (href === '/discover') return pathname === '/discover' || pathname === '/browse' || pathname.startsWith('/upcoming');
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
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActiveNav(link.href) ? styles.activeNavLink : ''}`}
            >
              {link.label}
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
              <Link href={`${dashboardHref}#messages`} className={styles.messageBtn} aria-label="Messages">
                <Mail size={18} />
                <span>1</span>
              </Link>
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
              <Link href={`${dashboardHref}#messages`} className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Messages (1)</Link>
              <Link href={dashboardHref} className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button className={styles.mobileNavLink} onClick={() => { logout(); setMenuOpen(false); }}>Log out</button>
            </>
          )}
        </nav>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
