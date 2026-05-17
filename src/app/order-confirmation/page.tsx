"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const orderId = searchParams.get('orderId') || 'FM-UNKNOWN';
  const total = searchParams.get('total') || '0.00';
  const email = searchParams.get('email') || 'your email';

  if (!isMounted) return null; // Avoid hydration mismatch on useSearchParams

  return (
    <div className={styles.successCard}>
      <div className={styles.iconWrapper}>
        <div className={styles.checkIcon}>✓</div>
      </div>
      
      <h1 className="heading-lg" style={{ marginBottom: '1rem' }}>
        Order <span className="text-gradient">Confirmed</span>
      </h1>
      
      <p className={styles.message}>
        Thank you for your order! We've received it and are currently processing it. 
        A confirmation has been sent to <strong>{email}</strong>.
      </p>

      <div className={styles.orderDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Order Number</span>
          <span className={styles.detailValue}>{orderId}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Total Amount</span>
          <span className={styles.detailValue}>${total}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Status</span>
          <span className={styles.statusBadge}>Processing</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
        <Link href="/" className={styles.secondaryBtn}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-gray)' }}>Loading order details...</div>}>
          <OrderConfirmationContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
