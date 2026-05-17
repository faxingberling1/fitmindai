import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowEffect}></div>
      <div className={styles.content}>
        <h1 className="heading-xl">
          Elevate Your Training With <br />
          <span className="text-gradient">FitMind AI</span>
        </h1>
        <p className="text-lg" style={{ marginTop: '1.5rem', marginBottom: '2.5rem', maxWidth: '600px', marginInline: 'auto' }}>
          Join Donovan Barker's premier educational platform. Master advanced exercises, understand your body, and achieve peak performance.
        </p>
        <div className={styles.buttonGroup}>
          <Link href="#download" className="btn-primary">
            Download App
          </Link>
          <Link href="#videos" className="btn-secondary">
            Watch Tutorials
          </Link>
        </div>
      </div>
    </section>
  );
}
