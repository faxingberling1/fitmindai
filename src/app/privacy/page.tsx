import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../legal.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.legalContent}>
          <span className={styles.badge}>Compliance Document</span>
          <h1>Privacy <span className="text-gradient">Policy</span></h1>
          <span className={styles.lastUpdated}>Last Updated: May 17, 2026</span>

          <div className={styles.section}>
            <h2>1. Data We Process</h2>
            <p>
              At FitMind AI, we enforce absolute, high-fidelity standards concerning user data privacy. We collect the following information to facilitate your training experience:
            </p>
            <ul>
              <li>**Identity Parameters:** Full Name, secure email coordinates, and coaching registration keys.</li>
              <li>**Biometric Telemetry:** Muscle mass records, body fat configurations, height, weight, and cardiovascular levels entered directly into the mobile application.</li>
              <li>**E-Commerce transactions:** Billing details, cart lists, and shipping coordinates processed via verified cryptographic checkout channels.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>2. Telemetry and Analytics</h2>
            <p>
              The FitMind AI mobile application collects anonymized diagnostic logs and performance metrics to optimize operational speeds. This telemetry is transmitted under SSL 256-bit encryption pipelines and is strictly utilized for structural debugging and hyper-performance improvements. We do not sell nor rent personal biographical parameters to secondary advertising networks.
            </p>
          </div>

          <div className={styles.section}>
            <h2>3. Secure Local Storage</h2>
            <p>
              All coaching plans, workout regimes, and peptide laboratory logs are cached securely using localized device encryption schemes. When using our online web console, active cookies are stored strictly to retain secure token sessions and local shopping cart persistence.
            </p>
          </div>

          <div className={styles.section}>
            <h2>4. Your Rights</h2>
            <p>
              Under international privacy frameworks (including GDPR and CCPA), you reserve full authority to demand the absolute deletion of your personal account records. To trigger secure database erasure, contact our compliance officer at:
            </p>
            <p style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>
              privacy@fitmind.ai
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
