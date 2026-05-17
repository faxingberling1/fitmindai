import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../legal.module.css';

export default function RefundPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.legalContent}>
          <span className={styles.badge}>Sales Agreement</span>
          <h1>Refund <span className="text-gradient">Policy</span></h1>
          <span className={styles.lastUpdated}>Last Updated: May 17, 2026</span>

          <div className={styles.section}>
            <h2>1. Performance Apparel Returns</h2>
            <p>
              We stand by our uncompromising design standards. Physical products purchased from our Performance Shop (e.g. premium 400GSM hoodies, garments) are fully eligible for return or exchange within **30 days** of delivery.
            </p>
            <ul>
              <li>Apparel items must remain completely unworn, unwashed, and in original brand packaging with all tags attached.</li>
              <li>Exchanges for custom size modifications are completed with complimentary return shipping protocols.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>2. Digital Services & Training Plans</h2>
            <p>
              Due to the immediate distribution and infinite lifecycle of digital information products, all purchases concerning professional coaching guides, hypertrophic blueprints, and mobile network coach registrations are **non-refundable**. If you require technical assistance, contact our system support desk at:
            </p>
            <p style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>
              support@fitmind.ai
            </p>
          </div>

          <div className={styles.section}>
            <h2>3. Laboratory Research Peptides</h2>
            <p>
              Peptide orders designated for clinical laboratory trials, high-purity chemical testing, and scientific research are explicitly subject to absolute security regulations. 
            </p>
            <ul>
              <li>Due to sterile integrity safeguards, laboratory peptide compounds are **non-returnable** once shipped.</li>
              <li>In the rare event of shipment structural damage or certified HPLC purity discrepancies, email our research dispatch team with diagnostic reports for an immediate complimentary synthesis replacement.</li>
            </ul>
          </div>

          <div className={styles.backRow}>
            <Link href="/" className="btn-secondary">
              ← Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
