"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import styles from './EcommerceSection.module.css';

type TabKey = 'all' | 'equipment' | 'training' | 'recovery' | 'nutrition' | 'apparel' | 'accessories' | 'peptides';

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'all',         label: 'All Gear',      icon: '🏪' },
  { key: 'equipment',   label: 'Equipment',     icon: '🏋️' },
  { key: 'training',    label: 'Training',      icon: '🥊' },
  { key: 'recovery',    label: 'Recovery',      icon: '⚡' },
  { key: 'nutrition',   label: 'Nutrition',     icon: '🧬' },
  { key: 'apparel',     label: 'Apparel',       icon: '👕' },
  { key: 'accessories', label: 'Accessories',   icon: '🎒' },
  { key: 'peptides',    label: 'Peptides',      icon: '🔬' },
];

const PREVIEW_COUNT = 6;

export default function EcommerceSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const filtered = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab);

  // Show up to PREVIEW_COUNT items on homepage
  const preview = filtered.slice(0, PREVIEW_COUNT);
  const hasMore = filtered.length > PREVIEW_COUNT;

  return (
    <section className={styles.ecommerceSection} id="shop">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="heading-lg">
            Performance <span className="text-gradient">Shop</span>
          </h2>
          <p className="text-md text-gray" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Premium gym equipment, training gear, recovery tools, nutrition, apparel and clinical-grade peptides — all in one place.
          </p>

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

        <div className={styles.productGrid}>
          {preview.map((product) => (
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
                <span className={styles.productCategory}>{product.category}</span>
                <Link href={`/shop/${product.id}`} className={styles.titleLink}>
                  <h3 className={styles.productName}>{product.name}</h3>
                </Link>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>

                <Link
                  href={`/shop/${product.id}`}
                  className={styles.addToCartBtn}
                  style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}
                >
                  View Details ↗
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to full shop */}
        <div className={styles.shopCta}>
          {hasMore && (
            <p className={styles.moreCount}>
              +{filtered.length - PREVIEW_COUNT} more {activeTab === 'all' ? 'products' : activeTab} in the full shop
            </p>
          )}
          <Link href="/shop" className="btn-primary">
            Browse Full Shop →
          </Link>
        </div>
      </div>
    </section>
  );
}
