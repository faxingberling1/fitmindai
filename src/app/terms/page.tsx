import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../legal.module.css';

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.legalContent}>
          <span className={styles.badge}>Platform Agreement</span>
          <h1>Terms & <span className="text-gradient">Conditions</span></h1>
          <span className={styles.lastUpdated}>Last Updated: May 17, 2026</span>

          <div className={styles.section}>
            <h2>1. Structural Framework</h2>
            <p>
              By accessing the FitMind AI web ecosystem and associated application suites, you enter a binding contractual agreement with FitMind AI. If you disagree with any specified kinetic, training, or metabolic disclaimers, you are prohibited from utilizing our coaching portals.
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. Coaching Networks & Registration</h2>
            <p>
              Professional fitness coaches seeking network registration must provide verified certifications and credentials. FitMind AI reserves absolute authority to suspend accounts containing fabricated accreditations, dynamic spam content, or unauthorized medical prescription behaviors.
            </p>
          </div>

          <div className={styles.section}>
            <h2>3. Intellect & Copywrite Control</h2>
            <p>
              The FitMind blueprint, source graphics, dynamic AI workout algorithms, mechanical tutorials, and performance apparel designs represent exclusive intellectual properties of FitMind AI. You are explicitly prohibited from duplicating, distributing, or licensing our training codebases without written executive authorization.
            </p>
          </div>

          <div className={styles.section}>
            <h2>4. Product Purchasing Boundaries</h2>
            <p>
              Purchases made within the FitMind Performance Shop (including professional garments, hoodies, and research peptide references) represent commercial contracts governed by local state e-commerce codes. All orders are processed using PCI-compliant cryptographic gateways.
            </p>
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
