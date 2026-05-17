"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import styles from './page.module.css';

export default function ShopListingPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'peptides' | 'apparel' | 'accessories' | 'equipment' | 'nutrition' | 'recovery' | 'training'>('all');

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab);

  const tabs: { key: typeof activeTab; label: string; icon: string }[] = [
    { key: 'all',         label: 'All Products',   icon: '🏪' },
    { key: 'equipment',   label: 'Equipment',       icon: '🏋️' },
    { key: 'training',    label: 'Training Gear',   icon: '🥊' },
    { key: 'recovery',    label: 'Recovery',        icon: '⚡' },
    { key: 'nutrition',   label: 'Nutrition',       icon: '🧬' },
    { key: 'apparel',     label: 'Apparel',         icon: '👕' },
    { key: 'accessories', label: 'Accessories',     icon: '🎒' },
    { key: 'peptides',    label: 'Peptides',        icon: '🔬' },
  ];

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        {/* Glow Effects */}
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>

        <div className={styles.shopWrapper}>
          {/* Header */}
          <div className={styles.shopHeader}>
            <div className={styles.badge}>FitMind AI Laboratory &amp; Gear</div>
            <h1 className="heading-xl">
              Performance <span className="text-gradient">Shop</span>
            </h1>
            <p className="text-lg text-gray" style={{ maxWidth: '700px', margin: '1rem auto 2.5rem' }}>
              Premium gym equipment, training gear, recovery tools, nutrition essentials, and clinical-grade bio-hacking peptides — all engineered with scientific precision.
            </p>

            {/* Filter Tabs */}
            <div className={styles.tabs}>
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  className={`${styles.tab} ${activeTab === tab.key ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className={styles.tabIcon}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                {product.badge && <span className={styles.cardBadge}>{product.badge}</span>}
                
                <div className={styles.imageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.productImage}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.exploreLabel}>Explore Specifications</span>
                  </div>
                </div>

                <div className={styles.productMeta}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
                    <Link href={`/shop/${product.id}`} className={styles.detailsBtn}>
                      View Details ↗
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
