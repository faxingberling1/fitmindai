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
          <h2 className="heading-lg">Meet <span className="text-gradient">Donovan Barker</span></h2>
          <p className="text-lg">
            Donovan Barker is the visionary behind FitMind AI. With years of experience in elite fitness training and sports science, Donovan created this platform to bridge the gap between complex physiological concepts and everyday fitness goals.
          </p>
          <p className="text-lg">
            His methodology combines mental fortitude with physical endurance, ensuring that every individual who follows the FitMind AI program isn't just training their body, but strengthening their mind.
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
