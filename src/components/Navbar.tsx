import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image 
            src="/assets/fitmindai.png" 
            alt="FitMind AI Logo" 
            width={220} 
            height={60} 
            style={{ height: 'auto' }}
            className={styles.logoImage}
            priority
          />
        </Link>
      </div>
      <header className={styles.navbar}>
        <nav className={styles.navLinks}>
          <Link href="/#training" className={styles.link}>Training</Link>
          <Link href="/#about" className={styles.link}>About</Link>
          <Link href="/#videos" className={styles.link}>Videos</Link>
          <Link href="/#shop" className={styles.link}>Shop</Link>
        </nav>
      </header>
      <div className={styles.ctaContainer}>
        <Link href="/cart" className={styles.iconLink} aria-label="Shopping Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          <span className={styles.cartBadge}>3</span>
        </Link>
        <Link href="/#download" className="btn-primary">
          Get App
        </Link>
      </div>
    </div>
  );
}
