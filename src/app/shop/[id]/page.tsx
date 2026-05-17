"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, Product } from '@/data/products';
import styles from './page.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = params.id as string;
  const productId = parseInt(idStr, 10);

  const product = products.find(p => p.id === productId);

  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'compliance'>('overview');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  // If product not found
  if (!product) {
    return (
      <div className={styles.notFoundContainer}>
        <Navbar />
        <div className={styles.notFoundContent}>
          <span className={styles.notFoundIcon}>⚠️</span>
          <h2>Product Not Found</h2>
          <p>The clinical research formula or gear spec you are looking for does not exist in our catalog.</p>
          <Link href="/shop" className="btn-primary">
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (product.isAffiliate) return;

    // Load active cart
    const activeCartRaw = localStorage.getItem('fitmind_cart');
    let activeCart = [];
    if (activeCartRaw) {
      try {
        activeCart = JSON.parse(activeCartRaw);
      } catch (e) {
        activeCart = [];
      }
    }

    // Format new item
    const cartItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: quantity,
      size: product.category === 'apparel' ? selectedSize : undefined,
      image: product.image,
      imageType: product.category === 'apparel' ? 'apparel' : 'accessories'
    };

    // Check if item exists (with same size)
    const existingIndex = activeCart.findIndex((item: any) => 
      item.id === product.id && (product.category !== 'apparel' || item.size === selectedSize)
    );

    if (existingIndex > -1) {
      activeCart[existingIndex].quantity += quantity;
    } else {
      activeCart.push(cartItem);
    }

    // Save cart
    localStorage.setItem('fitmind_cart', JSON.stringify(activeCart));
    
    // Dispatch event to update Navbar count
    window.dispatchEvent(new Event('cartUpdate'));

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 4000);
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        {/* Glow Decors */}
        <div className={styles.glow1}></div>
        
        <div className={styles.breadcrumb}>
          <Link href="/shop" className={styles.breadLink}>Shop</Link>
          <span className={styles.breadDivider}>/</span>
          <span className={styles.breadCurrent}>{product.name}</span>
        </div>

        <div className={styles.productLayout}>
          {/* Left Column: Visuals */}
          <div className={styles.visualCol}>
            <div className={styles.imageCard}>
              {product.badge && <span className={styles.badgeTag}>{product.badge}</span>}
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.mainImg}
                  priority
                />
              </div>
            </div>

            {/* Quick specifications grid */}
            <div className={styles.quickSpecs}>
              <h4 className={styles.quickSpecsTitle}>Product Specifications</h4>
              <div className={styles.specsList}>
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className={styles.specsRow}>
                    <span className={styles.specsKey}>{key}</span>
                    <span className={styles.specsVal}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Details */}
          <div className={styles.actionCol}>
            <div className={styles.productHeader}>
              <span className={styles.categoryLabel}>{product.category}</span>
              <h1 className={styles.productName}>{product.name}</h1>
              <div className={styles.priceContainer}>
                <span className={styles.priceValue}>${product.price.toFixed(2)}</span>
                {product.isAffiliate && <span className={styles.affiliateBadge}>Affiliate Partner</span>}
              </div>
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Config Panel */}
            <div className={styles.configPanel}>
              {/* Sizing (Only for Apparel) */}
              {product.category === 'apparel' && (
                <div className={styles.configItem}>
                  <label className={styles.configLabel}>Select Size</label>
                  <div className={styles.sizeGroup}>
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Warning (Only for Peptides) */}
              {product.category === 'peptides' && (
                <div className={styles.researchWarning}>
                  <span className={styles.warningTitle}>⚠️ RESEARCH LABORATORY COMPLIANCE</span>
                  <p className={styles.warningText}>
                    This peptide is provided strictly for academic and laboratory research applications. By proceeding, you acknowledge compliance with chemical laboratory regulatory standards.
                  </p>
                </div>
              )}

              {/* Quantity Selection (Non-Affiliates) */}
              {!product.isAffiliate && (
                <div className={styles.configItem}>
                  <label className={styles.configLabel}>Quantity</label>
                  <div className={styles.qtyContainer}>
                    <button className={styles.qtyBtn} onClick={() => handleQuantity(-1)}>-</button>
                    <span className={styles.qtyVal}>{quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => handleQuantity(1)}>+</button>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className={styles.ctaGroup}>
              {product.isAffiliate ? (
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}
                >
                  Buy from Partner ↗
                </a>
              ) : (
                <button className="btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              )}
              <Link href="/shop" className="btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                Back to Catalog
              </Link>
            </div>

            {/* Added to Cart Feedback banner */}
            {addedToCart && (
              <div className={styles.cartFeedback}>
                <div className={styles.feedbackLeft}>
                  <span className={styles.checkIcon}>✓</span>
                  <div>
                    <span className={styles.feedbackTitle}>Added to Cart</span>
                    <span className={styles.feedbackSubtitle}>{product.name} (Size {selectedSize}, Qty {quantity})</span>
                  </div>
                </div>
                <Link href="/cart" className={styles.viewCartLink}>View Cart</Link>
              </div>
            )}
          </div>
        </div>

        {/* Tabbed Info Panel underneath */}
        <div className={styles.tabbedPanel}>
          <div className={styles.tabHeaders}>
            <button
              className={`${styles.tabHeader} ${activeTab === 'overview' ? styles.activeTabHeader : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Scientific Overview
            </button>
            <button
              className={`${styles.tabHeader} ${activeTab === 'specs' ? styles.activeTabHeader : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Detailed Specifications
            </button>
            <button
              className={`${styles.tabHeader} ${activeTab === 'compliance' ? styles.activeTabHeader : ''}`}
              onClick={() => setActiveTab('compliance')}
            >
              Institutional Standards
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'overview' && (
              <div className={styles.overviewTab}>
                <h3 className={styles.tabTitle}>Product Utility & Application</h3>
                <p>{product.description}</p>
                
                <h4 className={styles.subTitle}>Core Benefits & Actions:</h4>
                <ul className={styles.bulletList}>
                  {product.details.map((detail, idx) => (
                    <li key={idx} className={styles.bulletItem}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className={styles.specsTab}>
                <h3 className={styles.tabTitle}>HPLC Chemical & Material Specifications</h3>
                <div className={styles.fullSpecsGrid}>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className={styles.fullSpecsRow}>
                      <span className={styles.fullSpecsKey}>{key}</span>
                      <span className={styles.fullSpecsVal}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className={styles.complianceTab}>
                <h3 className={styles.tabTitle}>FitMind AI Network Regulatory Compliance</h3>
                
                {product.category === 'peptides' ? (
                  <div className={styles.regulatoryMatrix}>
                    <div className={styles.matrixItem}>
                      <span className={styles.matrixIcon}>🧪</span>
                      <div>
                        <h5>Third-Party HPLC Certified</h5>
                        <p>Our affiliate partner laboratories guarantee a chemical purity benchmark exceeding 99.0% verified through high-performance liquid chromatography.</p>
                      </div>
                    </div>
                    <div className={styles.matrixItem}>
                      <span className={styles.matrixIcon}>🔬</span>
                      <div>
                        <h5>For Laboratory Research Only</h5>
                        <p>All peptide distribution is audited and restricted strictly to in-vitro chemical studies or academic medical assays. FitMind AI advocates for evidence-based science.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.regulatoryMatrix}>
                    <div className={styles.matrixItem}>
                      <span className={styles.matrixIcon}>🛡️</span>
                      <div>
                        <h5>High-Strain Construction</h5>
                        <p>Materials undergo rigorous high-friction physical strain validation in clinical athletic environments before catalog approval.</p>
                      </div>
                    </div>
                    <div className={styles.matrixItem}>
                      <span className={styles.matrixIcon}>🌿</span>
                      <div>
                        <h5>Ecologically Certified Factories</h5>
                        <p>Apparel and textile production loops operate entirely within Portuguese eco-compliant structures, reducing industrial waste.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
