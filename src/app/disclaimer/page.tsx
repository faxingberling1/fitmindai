import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../legal.module.css';

export default function DisclaimerPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.legalContent}>
          <span className={styles.badge}>Medical Disclosure</span>
          <h1>Medical <span className="text-gradient">Disclaimer</span></h1>
          <span className={styles.lastUpdated}>Last Updated: May 17, 2026</span>

          <div className={styles.section}>
            <h2>1. Not Professional Clinical Advice</h2>
            <p>
              The structural training programs, behavioral guides, metabolic formulas, nutritional blueprints, and AI coaching models rendered on this platform are for **educational and information purposes only**. They do not represent medical, cardiovascular, or physical therapy diagnoses, and are not a substitute for professional medical consultation.
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. Physical Exercise Hazards</h2>
            <p>
              Engaging in hypertrophic load training, high-intensity anaerobic conditioning, and athletic movement sequences carries inherent physical risk. You assume full personal responsibility for injury risks associated with your training. We strongly recommend consulting a board-certified physician before initiating advanced physical training programs.
            </p>
          </div>

          <div className={styles.section}>
            <h2>3. Peptide Laboratory Compliance</h2>
            <p>
              Peptides detailed within our educational library or referenced for purchase channels (such as BPC-157, TB-500, Melanotan, etc.) are explicitly classified for **laboratory research, chemical synthesis, and in-vitro clinical analysis only**.
            </p>
            <ul>
              <li>These chemical reagents are **not approved by the FDA** for human administration, veterinary consumption, or clinical use.</li>
              <li>Any information regarding dosing, reconstitution, or metabolic pathways represents clinical theory from in-vitro and animal trials, compiled strictly for scientific discovery.</li>
              <li>Users assume absolute regulatory liability for complying with local state and federal rules regarding laboratory research chemical operations.</li>
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
