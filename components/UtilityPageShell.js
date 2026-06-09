import Header from './Header';
import Footer from './Footer';
import styles from './UtilityPageShell.module.css';

export default function UtilityPageShell({ label, headline, subtext, children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            {label && <span className={styles.label}>{label}</span>}
            {headline && <h1 className={styles.headline}>{headline}</h1>}
            {subtext && <p className={styles.subtext}>{subtext}</p>}
          </div>
        </section>
        
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
