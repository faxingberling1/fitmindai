"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const activeCartRaw = localStorage.getItem('fitmind_cart');
      if (activeCartRaw) {
        try {
          setCart(JSON.parse(activeCartRaw));
        } catch (e) {
          setCart([]);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const updateQuantity = (id: number, delta: number, size?: string) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.size === size) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('fitmind_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const removeItem = (id: number, size?: string) => {
    const updatedCart = cart.filter(item => !(item.id === id && item.size === size));
    setCart(updatedCart);
    localStorage.setItem('fitmind_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isLoaded) {
    return (
      <div className={styles.container}>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Accessing Secure Cart Telemetry...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.cartWrapper}>
          
          <div className={styles.cartHeader}>
            <h1 className="heading-lg">Your <span className="text-gradient">Cart</span></h1>
            <Link href="/shop" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <h2>Your cart is empty</h2>
              <p className="text-gray">Looks like you haven't added any gear yet.</p>
              <Link href="/shop" className="btn-primary">
                Shop Performance Gear
              </Link>
            </div>
          ) : (
            <div className={styles.cartLayout}>
              
              {/* Left Column: Cart Items */}
              <div className={styles.itemsColumn}>
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size || 'no-size'}-${idx}`} className={styles.cartItem}>
                    
                    <div className={styles.itemImageContainer}>
                      <Image 
                        src={item.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=150'}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <div className={styles.metaRow}>
                        <span className={styles.itemCategory}>{item.category}</span>
                        {item.size && <span className={styles.itemSizeBadge}>Size: {item.size}</span>}
                      </div>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.itemQuantity}>
                      <button onClick={() => updateQuantity(item.id, -1, item.size)} className={styles.qtyBtn}>-</button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1, item.size)} className={styles.qtyBtn}>+</button>
                    </div>

                    <div className={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary */}
              <div className={styles.summaryColumn}>
                <div className={styles.summaryCard}>
                  <h2 className={styles.summaryTitle}>Order Summary</h2>
                  
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span>Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className={styles.divider}></div>
                  
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Link href="/checkout" className={styles.checkoutBtn} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                    Secure Checkout
                  </Link>

                  <div className={styles.secureBadge}>
                    <span>🔒</span> 256-bit Secure Encryption
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
