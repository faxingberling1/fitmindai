"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

// Placeholder Cart Data
const initialCart = [
  {
    id: 1,
    name: 'BPC-157 Recovery Matrix',
    category: 'Peptides',
    price: 89.99,
    quantity: 1,
    imageType: 'bottle'
  },
  {
    id: 2,
    name: 'FitMind Pro Hoodie',
    category: 'Apparel',
    price: 65.00,
    quantity: 2,
    imageType: 'apparel'
  }
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15.00;
  const tax = subtotal * 0.08; // 8% placeholder tax
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.cartWrapper}>
          
          <div className={styles.cartHeader}>
            <h1 className="heading-lg">Your <span className="text-gradient">Cart</span></h1>
            <Link href="/#shop" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <h2>Your cart is empty</h2>
              <p className="text-gray">Looks like you haven't added any gear yet.</p>
              <Link href="/#shop" className="btn-primary" style={{ marginTop: '2rem' }}>
                Shop Performance Gear
              </Link>
            </div>
          ) : (
            <div className={styles.cartLayout}>
              
              {/* Left Column: Cart Items */}
              <div className={styles.itemsColumn}>
                {cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    
                    <div className={`${styles.itemImage} ${styles[item.imageType]}`}>
                      <span className={styles.imagePlaceholderText}>{item.category}</span>
                    </div>

                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemCategory}>{item.category}</p>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.itemQuantity}>
                      <button onClick={() => updateQuantity(item.id, -1)} className={styles.qtyBtn}>-</button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className={styles.qtyBtn}>+</button>
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

                  <button className={styles.checkoutBtn}>
                    Secure Checkout
                  </button>

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
