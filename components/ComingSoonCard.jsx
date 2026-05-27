import styles from './ComingSoonCard.module.css';

export default function ComingSoonCard({ title, description }) {
  return (
    <div className={`listing-card ${styles.card}`}>
      <div className={styles.imageWrap}>
        <div className={styles.imageFallback}>
          <span>Coming Soon</span>
        </div>
        <div className={styles.badge}>New Location</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title || 'Secret Spot'}</h3>
        <p className={styles.description}>
          {description || 'We are working on bringing you a new amazing space. Check back soon!'}
        </p>
        <button className={styles.notifyBtn}>Get notified</button>
      </div>
    </div>
  );
}
