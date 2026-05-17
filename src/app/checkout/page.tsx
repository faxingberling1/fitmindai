"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

// ─── Discount Codes ───────────────────────────────────────────
const DISCOUNT_CODES: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  'FITMIND10':  { type: 'percent', value: 10, label: '10% off' },
  'WELCOME20':  { type: 'percent', value: 20, label: '20% off' },
  'ELITE15':    { type: 'percent', value: 15, label: '15% off' },
  'FREESHIP':   { type: 'fixed',   value: 0,  label: 'Free Shipping' },
  'SAVE25':     { type: 'fixed',   value: 25, label: '$25 off' },
};

const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'Standard Shipping',    eta: '5–7 Business Days', price: 9.99 },
  { id: 'express',  label: 'Express Shipping',     eta: '2–3 Business Days', price: 19.99 },
  { id: 'overnight',label: 'Overnight Delivery',   eta: 'Next Business Day',  price: 39.99 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isPlacing, setIsPlacing] = useState(false);

  // ─── Discount ───
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<null | { code: string; type: 'percent' | 'fixed'; value: number; label: string }>(null);
  const [discountError, setDiscountError] = useState('');

  // ─── Shipping ───
  const [selectedShipping, setSelectedShipping] = useState('standard');

  // ─── Contact ───
  const [contact, setContact] = useState({ email: '', phone: '' });

  // ─── Shipping Info ───
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', address: '', apt: '',
    city: '', state: '', zip: '', country: 'United States',
  });

  // ─── Payment ───
  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const [orderNotes, setOrderNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('fitmind_cart');
      if (raw) {
        try { setCart(JSON.parse(raw)); } catch { setCart([]); }
      }
      setIsLoaded(true);
    }
  }, []);

  // ── Pricing calculations ──────────────────────────────────
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingOption = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)!;

  let shippingCost = shippingOption?.price ?? 9.99;
  // Free shipping over $150 (unless overridden by code)
  if (subtotal > 150 && selectedShipping === 'standard') shippingCost = 0;

  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.code === 'FREESHIP') {
      shippingCost = 0;
    } else if (appliedDiscount.type === 'percent') {
      discountAmount = subtotal * (appliedDiscount.value / 100);
    } else {
      discountAmount = Math.min(appliedDiscount.value, subtotal);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.08;
  const total = taxableAmount + shippingCost + tax;

  // ── Discount code logic ───────────────────────────────────
  const applyDiscount = () => {
    setDiscountError('');
    const code = discountCode.trim().toUpperCase();
    if (!code) { setDiscountError('Please enter a discount code.'); return; }
    const found = DISCOUNT_CODES[code];
    if (!found) { setDiscountError('Invalid discount code. Please try again.'); return; }
    if (appliedDiscount?.code === code) { setDiscountError('This code is already applied.'); return; }
    setAppliedDiscount({ code, ...found });
    setDiscountCode('');
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountError('');
  };

  // ── Validation ────────────────────────────────────────────
  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!contact.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!shipping.firstName.trim()) e.firstName = 'First name required';
    if (!shipping.lastName.trim()) e.lastName = 'Last name required';
    if (!shipping.address.trim()) e.address = 'Address required';
    if (!shipping.city.trim()) e.city = 'City required';
    if (!shipping.state.trim()) e.state = 'State required';
    if (!shipping.zip.match(/^\d{5}(-\d{4})?$/)) e.zip = 'Valid ZIP code required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!payment.cardName.trim()) e.cardName = 'Cardholder name required';
    if (!payment.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) e.cardNumber = 'Valid 16-digit card number required';
    if (!payment.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) e.expiry = 'Format: MM/YY';
    if (!payment.cvv.match(/^\d{3,4}$/)) e.cvv = '3–4 digit CVV required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  // ── Place Order ───────────────────────────────────────────
  const placeOrder = async () => {
    if (!validateStep3()) return;
    setIsPlacing(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 2000));
    const orderId = `FM-${Date.now().toString(36).toUpperCase()}`;
    localStorage.removeItem('fitmind_cart');
    window.dispatchEvent(new Event('cartUpdate'));
    router.push(`/order-confirmation?orderId=${orderId}&total=${total.toFixed(2)}&email=${encodeURIComponent(contact.email)}`);
  };

  if (!isLoaded) return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.loading}><div className={styles.spinner} /><p>Loading secure checkout...</p></div>
      </main>
      <Footer />
    </div>
  );

  if (cart.length === 0) return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p className="text-gray">Add some gear before checking out.</p>
          <Link href="/shop" className="btn-primary">Browse Performance Shop</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <Link href="/cart" className={styles.backLink}>← Back to Cart</Link>
          <h1 className="heading-lg">Secure <span className="text-gradient">Checkout</span></h1>
          <div className={styles.securityBadge}>🔒 256-bit SSL Encryption</div>
        </div>

        {/* ── Progress Steps ── */}
        <div className={styles.steps}>
          {['Contact & Shipping', 'Shipping Method', 'Payment'].map((label, i) => {
            const stepNum = (i + 1) as 1 | 2 | 3;
            return (
              <div key={label} className={`${styles.stepItem} ${step === stepNum ? styles.stepActive : ''} ${step > stepNum ? styles.stepDone : ''}`}>
                <div className={styles.stepCircle}>{step > stepNum ? '✓' : stepNum}</div>
                <span className={styles.stepLabel}>{label}</span>
                {i < 2 && <div className={styles.stepLine} />}
              </div>
            );
          })}
        </div>

        <div className={styles.layout}>
          {/* ══ LEFT: Form Steps ══ */}
          <div className={styles.formCol}>

            {/* ── STEP 1: Contact + Shipping Address ── */}
            {step === 1 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>📦 Contact & Shipping</h2>

                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Contact Information</h3>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Email Address *</label>
                      <input
                        id="checkout-email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        type="email"
                        placeholder="you@example.com"
                        value={contact.email}
                        onChange={e => setContact({ ...contact, email: e.target.value })}
                      />
                      {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Phone (optional)</label>
                      <input
                        id="checkout-phone"
                        className={styles.input}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={contact.phone}
                        onChange={e => setContact({ ...contact, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Shipping Address</h3>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>First Name *</label>
                      <input
                        id="checkout-firstname"
                        className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                        placeholder="John"
                        value={shipping.firstName}
                        onChange={e => setShipping({ ...shipping, firstName: e.target.value })}
                      />
                      {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Last Name *</label>
                      <input
                        id="checkout-lastname"
                        className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                        placeholder="Doe"
                        value={shipping.lastName}
                        onChange={e => setShipping({ ...shipping, lastName: e.target.value })}
                      />
                      {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Street Address *</label>
                    <input
                      id="checkout-address"
                      className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                      placeholder="123 Main Street"
                      value={shipping.address}
                      onChange={e => setShipping({ ...shipping, address: e.target.value })}
                    />
                    {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Apartment / Suite (optional)</label>
                    <input
                      id="checkout-apt"
                      className={styles.input}
                      placeholder="Apt 4B"
                      value={shipping.apt}
                      onChange={e => setShipping({ ...shipping, apt: e.target.value })}
                    />
                  </div>

                  <div className={styles.fieldRow3}>
                    <div className={styles.field}>
                      <label className={styles.label}>City *</label>
                      <input
                        id="checkout-city"
                        className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                        placeholder="New York"
                        value={shipping.city}
                        onChange={e => setShipping({ ...shipping, city: e.target.value })}
                      />
                      {errors.city && <span className={styles.errorMsg}>{errors.city}</span>}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>State *</label>
                      <input
                        id="checkout-state"
                        className={`${styles.input} ${errors.state ? styles.inputError : ''}`}
                        placeholder="NY"
                        value={shipping.state}
                        onChange={e => setShipping({ ...shipping, state: e.target.value })}
                      />
                      {errors.state && <span className={styles.errorMsg}>{errors.state}</span>}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>ZIP Code *</label>
                      <input
                        id="checkout-zip"
                        className={`${styles.input} ${errors.zip ? styles.inputError : ''}`}
                        placeholder="10001"
                        value={shipping.zip}
                        onChange={e => setShipping({ ...shipping, zip: e.target.value })}
                      />
                      {errors.zip && <span className={styles.errorMsg}>{errors.zip}</span>}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Country</label>
                    <select
                      id="checkout-country"
                      className={styles.select}
                      value={shipping.country}
                      onChange={e => setShipping({ ...shipping, country: e.target.value })}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Order Notes (optional)</label>
                    <textarea
                      id="checkout-notes"
                      className={styles.textarea}
                      placeholder="Special instructions for your order..."
                      rows={3}
                      value={orderNotes}
                      onChange={e => setOrderNotes(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  id="checkout-step1-next"
                  className={styles.nextBtn}
                  onClick={() => { if (validateStep1()) setStep(2); }}
                >
                  Continue to Shipping →
                </button>
              </div>
            )}

            {/* ── STEP 2: Shipping Method ── */}
            {step === 2 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>🚚 Shipping Method</h2>
                <div className={styles.shippingOptions}>
                  {SHIPPING_OPTIONS.map(opt => {
                    const isFreeStd = opt.id === 'standard' && subtotal > 150;
                    const displayPrice = isFreeStd ? 'Free' : `$${opt.price.toFixed(2)}`;
                    return (
                      <label
                        key={opt.id}
                        className={`${styles.shippingOption} ${selectedShipping === opt.id ? styles.shippingSelected : ''}`}
                        htmlFor={`ship-${opt.id}`}
                      >
                        <input
                          id={`ship-${opt.id}`}
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={selectedShipping === opt.id}
                          onChange={() => setSelectedShipping(opt.id)}
                          className={styles.radioInput}
                        />
                        <div className={styles.shippingInfo}>
                          <span className={styles.shippingLabel}>{opt.label}</span>
                          <span className={styles.shippingEta}>{opt.eta}</span>
                        </div>
                        <span className={`${styles.shippingPrice} ${isFreeStd ? styles.freePrice : ''}`}>{displayPrice}</span>
                      </label>
                    );
                  })}
                </div>

                {subtotal > 150 && (
                  <div className={styles.freeShipNote}>
                    🎉 You qualify for free standard shipping on orders over $150!
                  </div>
                )}

                <div className={styles.stepButtons}>
                  <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                  <button id="checkout-step2-next" className={styles.nextBtn} onClick={() => setStep(3)}>Continue to Payment →</button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Payment ── */}
            {step === 3 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>💳 Payment Information</h2>
                <div className={styles.paymentNote}>
                  🔒 Your card details are encrypted and never stored on our servers.
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Cardholder Name *</label>
                  <input
                    id="checkout-card-name"
                    className={`${styles.input} ${errors.cardName ? styles.inputError : ''}`}
                    placeholder="John Doe"
                    value={payment.cardName}
                    onChange={e => setPayment({ ...payment, cardName: e.target.value })}
                  />
                  {errors.cardName && <span className={styles.errorMsg}>{errors.cardName}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Card Number *</label>
                  <div className={styles.cardInputWrapper}>
                    <input
                      id="checkout-card-number"
                      className={`${styles.input} ${errors.cardNumber ? styles.inputError : ''}`}
                      placeholder="1234 5678 9012 3456"
                      value={payment.cardNumber}
                      onChange={e => setPayment({ ...payment, cardNumber: formatCard(e.target.value) })}
                      maxLength={19}
                    />
                    <div className={styles.cardIcons}>
                      <span className={styles.cardChip}>VISA</span>
                      <span className={styles.cardChip}>MC</span>
                      <span className={styles.cardChip}>AMEX</span>
                    </div>
                  </div>
                  {errors.cardNumber && <span className={styles.errorMsg}>{errors.cardNumber}</span>}
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Expiry Date *</label>
                    <input
                      id="checkout-expiry"
                      className={`${styles.input} ${errors.expiry ? styles.inputError : ''}`}
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={e => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                      maxLength={5}
                    />
                    {errors.expiry && <span className={styles.errorMsg}>{errors.expiry}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>CVV *</label>
                    <input
                      id="checkout-cvv"
                      className={`${styles.input} ${errors.cvv ? styles.inputError : ''}`}
                      placeholder="123"
                      value={payment.cvv}
                      onChange={e => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      maxLength={4}
                      type="password"
                    />
                    {errors.cvv && <span className={styles.errorMsg}>{errors.cvv}</span>}
                  </div>
                </div>

                <div className={styles.stepButtons}>
                  <button className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                  <button
                    id="checkout-place-order"
                    className={`${styles.placeOrderBtn} ${isPlacing ? styles.placing : ''}`}
                    onClick={placeOrder}
                    disabled={isPlacing}
                  >
                    {isPlacing ? (
                      <><span className={styles.btnSpinner} /> Processing Order...</>
                    ) : (
                      <>🔒 Place Order — ${total.toFixed(2)}</>
                    )}
                  </button>
                </div>

                <p className={styles.termsNote}>
                  By placing your order you agree to FitMind AI&apos;s{' '}
                  <Link href="/terms" className={styles.termsLink}>Terms & Conditions</Link> and{' '}
                  <Link href="/privacy" className={styles.termsLink}>Privacy Policy</Link>.
                </p>
              </div>
            )}
          </div>

          {/* ══ RIGHT: Order Summary ══ */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              {/* Cart Items */}
              <div className={styles.summaryItems}>
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className={styles.summaryItem}>
                    <div className={styles.summaryItemImg}>
                      <Image
                        src={item.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=80'}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <span className={styles.qtyBadge}>{item.quantity}</span>
                    </div>
                    <div className={styles.summaryItemInfo}>
                      <span className={styles.summaryItemName}>{item.name}</span>
                      {item.size && <span className={styles.summaryItemSize}>Size: {item.size}</span>}
                    </div>
                    <span className={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className={styles.discountSection}>
                <label className={styles.discountLabel}>Discount Code</label>
                {appliedDiscount ? (
                  <div className={styles.appliedDiscount}>
                    <div className={styles.appliedBadge}>
                      <span>🏷️ {appliedDiscount.code}</span>
                      <span className={styles.appliedSavings}>{appliedDiscount.label}</span>
                    </div>
                    <button className={styles.removeDiscount} onClick={removeDiscount}>✕ Remove</button>
                  </div>
                ) : (
                  <div className={styles.discountRow}>
                    <input
                      id="checkout-discount-code"
                      className={styles.discountInput}
                      placeholder="Enter code (e.g. FITMIND10)"
                      value={discountCode}
                      onChange={e => { setDiscountCode(e.target.value.toUpperCase()); setDiscountError(''); }}
                      onKeyDown={e => e.key === 'Enter' && applyDiscount()}
                    />
                    <button id="checkout-apply-discount" className={styles.applyBtn} onClick={applyDiscount}>Apply</button>
                  </div>
                )}
                {discountError && <p className={styles.discountError}>{discountError}</p>}
              </div>

              {/* Pricing Breakdown */}
              <div className={styles.pricingRows}>
                <div className={styles.pricingRow}>
                  <span>Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className={`${styles.pricingRow} ${styles.discountRow2}`}>
                    <span>Discount ({appliedDiscount?.code})</span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {appliedDiscount?.code === 'FREESHIP' && (
                  <div className={`${styles.pricingRow} ${styles.discountRow2}`}>
                    <span>Shipping Discount</span>
                    <span>−${shippingOption?.price.toFixed(2)}</span>
                  </div>
                )}
                <div className={styles.pricingRow}>
                  <span>Shipping ({shippingOption?.label})</span>
                  <span>{shippingCost === 0 ? <span className={styles.freeLabel}>Free</span> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className={styles.pricingRow}>
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.divider} />
                <div className={`${styles.pricingRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Accepted Payments */}
              <div className={styles.acceptedPayments}>
                <span className={styles.payChip}>VISA</span>
                <span className={styles.payChip}>MC</span>
                <span className={styles.payChip}>AMEX</span>
                <span className={styles.payChip}>PayPal</span>
              </div>
            </div>

            {/* Available Discount Hint */}
            <div className={styles.hintCard}>
              <p className={styles.hintTitle}>🏷️ Available Codes</p>
              <div className={styles.hintCodes}>
                {Object.entries(DISCOUNT_CODES).map(([code, info]) => (
                  <div 
                    key={code} 
                    className={styles.hintCode} 
                    onClick={() => {
                      setDiscountCode(code);
                      setDiscountError('');
                      if (appliedDiscount?.code === code) return;
                      setAppliedDiscount({ code, ...info });
                    }} 
                    style={{ cursor: 'pointer' }}
                  >
                    <strong>{code}</strong>
                    <span>{info.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
