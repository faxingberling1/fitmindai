import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          {/* Placeholder for Donovan's image */}
          <div className={`${styles.imagePlaceholder} glass-panel`}>
             <span className={styles.placeholderText}>Donovan Barker</span>
          </div>
        </div>
        <div className={styles.textContent}>
          <h2 className="heading-lg">An Educational Hub & <span className="text-gradient">Trainer Platform</span></h2>
          <p className="text-lg">
            We believe in physical precision. FitMind AI is built for learners who want to master exactly how to execute exercises, optimize hypertrophy, and prevent injuries. Donovan Barker and his team of certified NASM trainers train and mentor individuals directly through the ecosystem, teaching correct kinetic form and form biomechanics.
          </p>
          <p className="text-lg">
            Simultaneously, we provide a premium hosting ground for personal coaches. FitMind AI delivers a secure, next-generation business platform where professional trainers can register to host training logs, network with their followers, and scale their coaching business.
          </p>
          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <h3 className={styles.statNumber}>10+</h3>
              <p className={styles.statLabel}>Years Experience</p>
            </div>
            <div className={styles.statBox}>
              <h3 className={styles.statNumber}>50k+</h3>
              <p className={styles.statLabel}>Lives Changed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
