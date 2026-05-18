"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [cartCount, setCartCount] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const calculateCount = () => {
    if (typeof window !== 'undefined') {
      const activeCartRaw = localStorage.getItem('fitmind_cart');
      if (activeCartRaw) {
        try {
          const activeCart = JSON.parse(activeCartRaw);
          const totalQty = activeCart.reduce((acc: number, item: any) => acc + item.quantity, 0);
          setCartCount(totalQty);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    }
  };

  useEffect(() => {
    calculateCount();
    window.addEventListener('cartUpdate', calculateCount);
    window.addEventListener('storage', calculateCount);
    return () => {
      window.removeEventListener('cartUpdate', calculateCount);
      window.removeEventListener('storage', calculateCount);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Fixed Logo */}
      <div className={styles.logoContainer}>
        <Link href="/" onClick={closeMenu}>
          <Image 
            src="/assets/fitmindai.png" 
            alt="FitMind AI Logo" 
            width={110} 
            height={30} 
            style={{ height: 'auto' }}
            className={styles.logoImage}
            priority
          />
        </Link>
      </div>

      {/* Desktop pill navbar */}
      <div className={styles.navbarWrapper}>
        <header className={styles.navbar}>
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/training" className={styles.link}>Training</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/programs" className={styles.link}>Programs</Link>
            <Link href="/#videos" className={styles.link}>Videos</Link>
            <Link href="/shop" className={styles.link}>Shop</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </nav>
        </header>
      </div>

      {/* Desktop CTA + Hamburger button */}
      <div className={styles.ctaContainer}>
        <Link href="/cart" className={styles.iconLink} aria-label="Shopping Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </Link>
        <Link href="/#download" className={`btn-primary ${styles.desktopCta}`}>
          Get App
        </Link>

        {/* Hamburger button — mobile only */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile slide-in drawer */}
      <nav className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-label="Mobile navigation">
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileLinks}>
            <Link href="/" className={styles.mobileLink} onClick={closeMenu}>Home</Link>
            <Link href="/training" className={styles.mobileLink} onClick={closeMenu}>Training</Link>
            <Link href="/about" className={styles.mobileLink} onClick={closeMenu}>About</Link>
            <Link href="/programs" className={styles.mobileLink} onClick={closeMenu}>Programs</Link>
            <Link href="/#videos" className={styles.mobileLink} onClick={closeMenu}>Videos</Link>
            <Link href="/shop" className={styles.mobileLink} onClick={closeMenu}>Shop</Link>
            <Link href="/contact" className={styles.mobileLink} onClick={closeMenu}>Contact</Link>
          </div>
          <div className={styles.mobileCtas}>
            <Link href="/cart" className={styles.mobileIconRow} onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              Cart {cartCount > 0 && <span className={styles.mobileBadge}>{cartCount}</span>}
            </Link>
            <Link href="/#download" className="btn-primary" onClick={closeMenu}>
              Get App
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
