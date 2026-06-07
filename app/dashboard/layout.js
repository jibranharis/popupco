'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, FileText, Heart, Mail, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import styles from './dashboard.module.css';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/applications', label: 'Applications', icon: FileText },
  { href: '/dashboard/saved', label: 'Saved', icon: Heart },
  { href: '/dashboard/messages', label: 'Messages', icon: Mail },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (!user) return null; // AuthGuard will handle redirect

  const completionPercent = user.type === 'vendor' ? 60 : 85;

  return (
    <AuthGuard>
      <div className={styles.dashboardContainer}>
        {/* Mobile toggle */}
        <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          <span>Dashboard Menu</span>
        </button>

        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.profileCard}>
            <div className={styles.avatarLarge}>
              {user.name ? user.name.charAt(0).toUpperCase() : <User size={32} />}
            </div>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
            <div className={styles.progressContainer}>
              <div className={styles.progressHeader}>
                <span>Profile completion</span>
                <span>{completionPercent}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${completionPercent}%` }}></div>
              </div>
            </div>
            <Link href="/dashboard/profile" className={`btn btn--secondary btn--full ${styles.editProfileBtn}`}>
              Edit Profile
            </Link>
          </div>

          <nav className={styles.sidebarNav}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button onClick={logout} className={styles.navItem} style={{ width: '100%', textAlign: 'left' }}>
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {children}
        </main>
        
        {/* Mobile overlay */}
        {mobileOpen && <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}></div>}
      </div>
    </AuthGuard>
  );
}
