"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [cartCount, setCartCount] = useState<number>(0);

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

  return (
    <>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image 
            src="/assets/fitmindai.png" 
            alt="FitMind AI Logo" 
            width={160} 
            height={44} 
            style={{ height: 'auto' }}
            className={styles.logoImage}
            priority
          />
        </Link>
      </div>

      <div className={styles.navbarWrapper}>
        <header className={styles.navbar}>
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/#training" className={styles.link}>Training</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/#videos" className={styles.link}>Videos</Link>
            <Link href="/shop" className={styles.link}>Shop</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </nav>
        </header>
      </div>

      <div className={styles.ctaContainer}>
        <Link href="/cart" className={styles.iconLink} aria-label="Shopping Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </Link>
        <Link href="/#download" className="btn-primary">
          Get App
        </Link>
      </div>
    </>
  );
}
