import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        {/* Hero Segment */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Founder & Head Coach</span>
            <h1 className="heading-lg">Donovan <span className="text-gradient">Barker</span></h1>
            <p className="text-lg text-gray" style={{ maxWidth: '750px', margin: '1rem auto 0', lineHeight: '1.6' }}>
              Building the ultimate educational training ground and business ecosystem. Empowering learners to master perfect biomechanical form, while offering personal trainers next-gen hosting tools to scale.
            </p>
          </div>
        </section>

        {/* Bio & Authority Grid */}
        <section className={styles.bioSection}>
          <div className={styles.bioGrid}>
            <div className={styles.bioImageContainer}>
              <Image 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop"
                alt="Donovan Barker Head Coach"
                fill
                style={{ objectFit: 'cover' }}
                className={styles.bioImage}
              />
              <div className={styles.imageOverlayText}>
                <h4>Donovan Barker</h4>
                <p>FitMind AI Founder</p>
              </div>
            </div>

            <div className={styles.bioTextContent}>
              <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>The <span className="text-gradient">Dual-Force Vision</span></h2>
              <p className="text-md text-gray" style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
                For over a decade, my focus has been on bridging the division between clinical kinetic analysis and active athletic achievement. Fitness is not about guesswork—it is the integration of cell biochemistry, load lines of mechanical vectors, and mental habit consistency.
              </p>
              <p className="text-md text-gray" style={{ marginBottom: '2rem', lineHeight: '1.7' }}>
                FitMind AI represents a dual platform built on this science. First, it is an elite educational sandbox for learners who want to study correct exercise form, practice injury-free execution, and receive hands-on training from me. Second, it is a next-generation business platform where professional trainers can register, host custom workouts, and network with their followers to scale their coaching.
              </p>

              {/* Stats Box */}
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <h3>10+</h3>
                  <p>Years Experience</p>
                </div>
                <div className={styles.statBox}>
                  <h3>50K+</h3>
                  <p>Lives Impacted</p>
                </div>
                <div className={styles.statBox}>
                  <h3>12</h3>
                  <p>Coaching Certs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Certifications & Authority */}
        <section className={styles.certsSection}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-md">Coaching <span className="text-gradient">Accreditations</span></h2>
            <p className="text-md text-gray">Certified standards that ensure absolute safety and mechanical precision.</p>
          </div>

          <div className={styles.certsGrid}>
            <div className={`${styles.certCard} glass-panel`}>
              <div className={styles.certIcon}>🎓</div>
              <h3>NASM Master Trainer</h3>
              <p className="text-sm text-gray">Highest tier designation demonstrating mastery in corrective exercise, performance enhancement, and elite behavioral coaching.</p>
            </div>

            <div className={`${styles.certCard} glass-panel`}>
              <div className={styles.certIcon}>🏋️‍♂️</div>
              <h3>CSCS Certification</h3>
              <p className="text-sm text-gray">Certified Strength and Conditioning Specialist. Optimizing bioenergetics, biomechanics, and periodization frameworks for athletes.</p>
            </div>

            <div className={`${styles.certCard} glass-panel`}>
              <div className={styles.certIcon}>🍏</div>
              <h3>Precision Nutrition L2</h3>
              <p className="text-sm text-gray">Advanced metabolic analysis and sport-specific nutritional prescription for body composition alteration and athletic output.</p>
            </div>

            <div className={`${styles.certCard} glass-panel`}>
              <div className={styles.certIcon}>🧬</div>
              <h3>Corrective Exercise (CES)</h3>
              <p className="text-sm text-gray">Identifying structural imbalances, movement dysfunctions, and kinetic chain compensations to systematically prevent injuries.</p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaCard} glass-panel`}>
            <h2 className="heading-md">Ready to Train with Precision?</h2>
            <p className="text-md text-gray" style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
              Download the FitMind AI mobile app or explore our dedicated hypertrophic and strength training regimes in the store today.
            </p>
            <div className={styles.btnRow}>
              <Link href="/#download" className="btn-primary">
                Get the App
              </Link>
              <Link href="/shop" className="btn-secondary">
                Explore Shop
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
