import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logoText}>
            FitMind <span className="text-gradient">AI</span>
          </Link>
          <p className={styles.description}>
            The premier educational platform for fitness professionals and enthusiasts.
          </p>
        </div>
        
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Platform</h4>
          <Link href="#training" className={styles.link}>Training Programs</Link>
          <Link href="#videos" className={styles.link}>Educational Videos</Link>
          <Link href="#download" className={styles.link}>Download App</Link>
        </div>
        
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Company</h4>
          <Link href="#about" className={styles.link}>About Donovan</Link>
          <Link href="#" className={styles.link}>Contact Us</Link>
          <Link href="#" className={styles.link}>Privacy Policy</Link>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} FitMind AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
