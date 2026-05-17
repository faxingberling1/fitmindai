import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowEffect}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>LEARN • TRAIN • NETWORK</div>
          <h1 className="heading-xl">
            Master Exercise Execution. <br />
            <span className="text-gradient">Scale Your Coaching.</span>
          </h1>
          <p className="text-lg" style={{ marginTop: '1.5rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
            FitMind AI is a dual-force ecosystem: a comprehensive educational training ground for individuals to learn perfect exercise form directly from Coach Donovan Barker, and a cutting-edge business suite empowering professional personal trainers to register, network, and seamlessly coach their followers.
          </p>
          <div className={styles.buttonGroup}>
            <Link href="/waitlist" className="btn-primary">
              Join the Waitlist!
            </Link>
            <Link href="#shop" className="btn-secondary">
              Explore Performance Shop
            </Link>
          </div>
          
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>Learners</span>
              <span className={styles.statLabel}>Learn Form & Hypertrophy</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>Trainers</span>
              <span className={styles.statLabel}>Host Workouts & Scale</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>FitMind AI</span>
              <span className={styles.statLabel}>Unifying Software Suite</span>
            </div>
          </div>
        </div>

        <div className={styles.visuals}>
          {/* We use CSS shapes and placeholders to create a premium feel without actual assets */}
          <div className={styles.phoneMockup}>
            <div className={styles.phoneScreen}>
              <div className={styles.statusBar}>
                <span>9:41</span>
                <div className={styles.statusIcons}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.79-1.79C9.09 19.64 10.5 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 5H7c-1.1 0-1.99.9-1.99 2L5 17c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
              </div>
              <div className={styles.appLogoContainer}>
                <Image 
                  src="/assets/fitmindai.png" 
                  alt="FitMind AI App Screen" 
                  width={140} 
                  height={38} 
                  style={{ height: 'auto' }}
                  className={styles.appLogo}
                />
                <div className={styles.appSpinner}></div>
                <span className={styles.appVersion}>SECURE ACCESS VERIFIED</span>
              </div>
            </div>
          </div>
          
          <div className={styles.productMockup1}>
            <div className={styles.bottleShape}>
              <div className={styles.bottleCap}></div>
              <div className={styles.bottleLabel}>BPC-157</div>
            </div>
          </div>
          
          <div className={styles.productMockup2}>
             <div className={styles.apparelShape}>
                <div className={styles.hoodieGraphic}>FitMind</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
