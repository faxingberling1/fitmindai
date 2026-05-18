import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'Programs | FitMind AI',
  description: 'Elite NASM Certified 1-on-1 Coaching Programs by FitMind AI.',
};

export default function ProgramsPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.glow}></div>
          <div className={styles.heroContent}>
            <span className={styles.badge}>FitMind AI Coaching Ecosystem</span>
            <h1 className="heading-xl">
              Elite <span className="text-gradient">NASM Certified</span> Coaching
            </h1>
            <p className={styles.subtitle}>
              Unlock the ultimate training vault. Work directly with NASM Certified experts to master form, optimize your programming, and transform your biomechanics. Select your tier below.
            </p>
          </div>
        </section>

        {/* Pricing Tiers Section */}
        <section className={styles.pricingSection}>
          <div className={styles.pricingGrid}>
            
            {/* Tier 1 */}
            <div className={styles.pricingCard}>
              <h3 className={styles.tierName}>Hypertrophy Blueprint</h3>
              <p className={styles.tierDesc}>Self-guided NASM programming to master your form and maximize muscle growth.</p>
              
              <div className={styles.price}>
                <span className={styles.currency}>$</span>
                <span>49</span>
                <span className={styles.interval}>/mo</span>
              </div>
              
              <div className={styles.divider}></div>
              
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Full access to the FitMind AI exercise library</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Form & Biomechanics mastery guides</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Pre-built Hypertrophy workout templates</span>
                </li>
              </ul>
              
              <Link href="/intake?plan=hypertrophy" className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
                Unlock Access
              </Link>
            </div>

            {/* Tier 2 (Popular) */}
            <div className={`${styles.pricingCard} ${styles.popularCard}`}>
              <div className={styles.popularBadge}>Most Popular</div>
              <h3 className={styles.tierName}>Performance Elite</h3>
              <p className={styles.tierDesc}>Direct 1-on-1 coaching and customized weekly programming from our NASM experts.</p>
              
              <div className={styles.price}>
                <span className={styles.currency}>$</span>
                <span>149</span>
                <span className={styles.interval}>/mo</span>
              </div>
              
              <div className={styles.divider}></div>
              
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Everything in Hypertrophy Blueprint</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Customized weekly training routines</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Bi-weekly form check video reviews</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Direct 1-on-1 chat with your NASM Trainer</span>
                </li>
              </ul>
              
              <Link href="/intake?plan=elite" className={`${styles.actionBtn} ${styles.primaryBtn}`}>
                Select Elite Plan
              </Link>
            </div>

            {/* Tier 3 */}
            <div className={styles.pricingCard}>
              <h3 className={styles.tierName}>FitMind AI Masterclass</h3>
              <p className={styles.tierDesc}>The ultimate mentorship. Full nutritional profiling, live calls, and complete lifestyle scaling.</p>
              
              <div className={styles.price}>
                <span className={styles.currency}>$</span>
                <span>299</span>
                <span className={styles.interval}>/mo</span>
              </div>
              
              <div className={styles.divider}></div>
              
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Everything in Performance Elite</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Custom macro & nutritional profiling</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Monthly 1-on-1 live strategy video calls</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Priority 24/7 direct messaging</span>
                </li>
              </ul>
              
              <Link href="/intake?plan=masterclass" className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
                Apply for Masterclass
              </Link>
            </div>

          </div>
        </section>

        {/* NASM Certified Trainers Roster */}
        <section className={styles.trainersSection}>
          <div className={styles.trainersHeader}>
            <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Meet Your Coaches</h2>
            <p className={styles.subtitle}>
              Every FitMind AI program is overseen by elite, fully accredited professionals. 
              We don't do generic algorithms—we do verified expertise.
            </p>
          </div>

          <div className={styles.trainersGrid}>
            
            {/* Donovan Barker */}
            <div className={styles.trainerCard}>
              <div className={styles.trainerImageWrapper}>
                👑
              </div>
              <div className={styles.trainerInfo}>
                <h3 className={styles.trainerName}>Donovan Barker</h3>
                <div className={styles.trainerCreds}>NASM Certified Personal Trainer • Founder</div>
                <p className={styles.trainerBio}>
                  The architect of FitMind AI. Donovan specializes in elite kinetic execution, advanced hypertrophy mechanics, and building systems that scale professional coaching.
                </p>
                <Link href="/trainers/donovan-barker" className={styles.profileLink}>
                  View Profile & Specialties →
                </Link>
              </div>
            </div>

            {/* Sarah Jenkins */}
            <div className={styles.trainerCard}>
              <div className={styles.trainerImageWrapper}>
                💪
              </div>
              <div className={styles.trainerInfo}>
                <h3 className={styles.trainerName}>Sarah Jenkins</h3>
                <div className={styles.trainerCreds}>NASM CPT • Precision Nutrition L2</div>
                <p className={styles.trainerBio}>
                  With over 8,000 hours of 1-on-1 coaching experience, Sarah specializes in bridging the gap between clinical biomechanics and functional athletic performance.
                </p>
                <Link href="/trainers/sarah-jenkins" className={styles.profileLink}>
                  View Profile & Specialties →
                </Link>
              </div>
            </div>

            {/* Marcus Thorne */}
            <div className={styles.trainerCard}>
              <div className={styles.trainerImageWrapper}>
                ⚡
              </div>
              <div className={styles.trainerInfo}>
                <h3 className={styles.trainerName}>Marcus Thorne</h3>
                <div className={styles.trainerCreds}>NASM PES • Corrective Exercise Spec.</div>
                <p className={styles.trainerBio}>
                  Marcus is FitMind AI's lead specialist for injury prevention and corrective exercise, ensuring our clients build dense muscle without sacrificing joint longevity.
                </p>
                <Link href="/trainers/marcus-thorne" className={styles.profileLink}>
                  View Profile & Specialties →
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
