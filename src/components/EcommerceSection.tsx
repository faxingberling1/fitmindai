"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './EcommerceSection.module.css';

const products = [
  {
    id: 1,
    name: 'BPC-157 Recovery Matrix',
    category: 'peptides',
    price: '$89.99',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com'
  },
  {
    id: 2,
    name: 'FitMind Pro Hoodie',
    category: 'apparel',
    price: '$65.00',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=300&auto=format&fit=crop',
    isAffiliate: false
  },
  {
    id: 3,
    name: 'TB-500 Performance Blend',
    category: 'peptides',
    price: '$95.00',
    badge: '',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop',
    isAffiliate: true,
    affiliateLink: 'https://example-affiliate-partner.com'
  },
  {
    id: 4,
    name: 'Tactical Gym Duffel',
    category: 'accessories',
    price: '$45.00',
    badge: '',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300&auto=format&fit=crop',
    isAffiliate: false
  }
];

export default function EcommerceSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section className={styles.ecommerceSection} id="shop">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="heading-lg">
            Performance <span className="text-gradient">Shop</span>
          </h2>
          <p className="text-md text-gray" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Elevate your training with clinical-grade peptides and premium athletic wear engineered for peak performance.
          </p>
          
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Gear
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'peptides' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('peptides')}
            >
              Peptides
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'apparel' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('apparel')}
            >
              Apparel
            </button>
          </div>
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
              
              <Link href={`/shop/${product.id}`} className={styles.imageLink}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.productImage}
                  />
                </div>
              </Link>
              
              <div className={styles.productInfo}>
                <Link href={`/shop/${product.id}`} className={styles.titleLink}>
                  <h3 className={styles.productName}>{product.name}</h3>
                </Link>
                <p className={styles.productPrice}>{product.price}</p>
                
                <Link 
                  href={`/shop/${product.id}`}
                  className={styles.addToCartBtn}
                  style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}
                >
                  View Product Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
