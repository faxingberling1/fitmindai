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
          <h2 className="heading-lg">A Safe Space for <span className="text-gradient">Growth</span></h2>
          <p className="text-lg">
            FitMind AI was built with a dual purpose: to teach individuals how to train, exercise, and improve their lifestyle, while providing a dedicated, safe platform for trainers to network and coach their followers.
          </p>
          <p className="text-lg">
            Through the power of community networking and our value-added AI services, we bridge the gap between expert guidance and personal achievement. This isn't just an app; it's an ecosystem for health.
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
