'use client';
import { useAuth } from '@/components/AuthContext';
import { Mail } from 'lucide-react';
import styles from '../dashboard.module.css';

export default function MessagesPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Messages</h1>
        <p className={styles.pageSubtitle}>Communicate with hosts, venues, and vendors.</p>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: '600px' }}>
          
          {/* Inbox List */}
          <div style={{ borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-alt)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)' }}>
              <input 
                type="text" 
                placeholder="Search messages..." 
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
              />
            </div>
            
            <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', background: '#fff', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>PopUpCo Team</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Just now</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Welcome to PopUpCo! We're excited to have you...
              </p>
            </div>
          </div>

          {/* Message Content */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', background: '#fff' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Welcome to PopUpCo!</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>From: PopUpCo Team</p>
            </div>
            
            <div style={{ flexGrow: 1, padding: '32px', background: 'var(--color-bg)' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                  P
                </div>
                <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '0 16px 16px 16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
                  <p style={{ marginBottom: '12px', lineHeight: '1.5' }}>Hi {user.name.split(' ')[0]},</p>
                  <p style={{ marginBottom: '12px', lineHeight: '1.5' }}>Welcome to PopUpCo! We're thrilled to have you join our marketplace community.</p>
                  <p style={{ marginBottom: '12px', lineHeight: '1.5' }}>To get started, we recommend completing your profile and browsing through our open opportunities. If you have any questions, you can reply directly to this message.</p>
                  <p style={{ lineHeight: '1.5' }}>Best,<br/>The PopUpCo Team</p>
                </div>
              </div>
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)', background: '#fff' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  style={{ flexGrow: 1, padding: '12px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}
                />
                <button className="btn btn--primary" style={{ borderRadius: 'var(--radius-full)', padding: '0 24px' }}>Send</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
