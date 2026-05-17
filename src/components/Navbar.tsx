import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logoContainer}>
        {/* We will use text for logo until image is provided */}
        <Link href="/" className={styles.logoText}>
          FitMind <span className="text-gradient">AI</span>
        </Link>
      </div>
      <nav className={styles.navLinks}>
        <Link href="#training" className={styles.link}>Training</Link>
        <Link href="#about" className={styles.link}>About</Link>
        <Link href="#videos" className={styles.link}>Videos</Link>
      </nav>
      <div className={styles.ctaContainer}>
        <Link href="#download" className="btn-primary">
          Get App
        </Link>
      </div>
    </header>
  );
}
