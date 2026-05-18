import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface Trainer {
  slug: string;
  name: string;
  avatar: string;
  title: string;
  credentials: string[];
  specialties: string[];
  experience: string;
  bio: string;
  approach: string;
  philosophy: string;
  certifications: string[];
  successMetric: string;
  successDetail: string;
}

const trainersData: Record<string, Trainer> = {
  'donovan-barker': {
    slug: 'donovan-barker',
    name: 'Donovan Barker',
    avatar: '👑',
    title: 'Founder & Head Coach',
    credentials: ['NASM Certified Personal Trainer (CPT)', 'NASM Performance Enhancement Specialist (PES)'],
    specialties: ['Kinetic Form Masterclass', 'Elite Hypertrophy Mechanics', 'Custom Strength Systems'],
    experience: '12+ Years Professional Experience',
    bio: 'The chief architect of FitMind AI. Donovan founded FitMind AI with a singular vision: to bridge elite NASM biomechanical principles with hyper-scalable digital coaching technology. He has trained athletes, bodybuilding competitors, and high-performance executives, guiding them to perfect exercise form and structural safety.',
    approach: 'Kinetic safety first. True hypertrophy is achieved when tension is targeted directly on the intended muscle fibers, free of energy leaks or momentum cheating. Form is not a constraint; form is your ultimate leverage.',
    philosophy: 'Align the biomechanics, optimize the nervous system, and let intensity handle the growth.',
    certifications: [
      'NASM Certified Personal Trainer',
      'NASM Performance Enhancement Specialist',
      'FMS Level 2 Joint Mobility Coach',
      'Founder of FitMind AI Ecosystem'
    ],
    successMetric: '1,500+',
    successDetail: 'Kinetic Transformations Completed'
  },
  'sarah-jenkins': {
    slug: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    avatar: '💪',
    title: 'Lead Biomechanics & Nutrition Coach',
    credentials: ['NASM CPT', 'Precision Nutrition L2 Specialist'],
    specialties: ['Corrective Biomechanics', 'Functional Nutrition Design', 'Endocrine & Metabolic Reset'],
    experience: '8+ Years Elite Coaching',
    bio: 'Sarah combines cutting-edge clinical biomechanics with hyper-customized nutritional staging. She believes that elite physical potential is unlocked by matching exact fuel profiles to a client\'s metabolic blueprint, ensuring full joint health and recovery.',
    approach: 'Fuel the movement, protect the joints. By fixing small structural gaps in exercise execution and timing clean macronutrient payloads, we trigger aggressive body recomposition without compromising recovery or sleep hygiene.',
    philosophy: 'Nutrition is the software. Biomechanics is the hardware. Together, they form an unbreakable machine.',
    certifications: [
      'NASM CPT',
      'Precision Nutrition Level 2 Master Coach',
      'NASM Corrective Exercise Specialist (CES)',
      'BS in Kinesiology & Exercise Science'
    ],
    successMetric: '8,000+',
    successDetail: 'Hours of 1-on-1 Biomechanical Training'
  },
  'marcus-thorne': {
    slug: 'marcus-thorne',
    name: 'Marcus Thorne',
    avatar: '⚡',
    title: 'Strength & Conditioning Specialist',
    credentials: ['NASM Performance Enhancement Specialist (PES)', 'Corrective Exercise Specialist (CES)'],
    specialties: ['Athletic CNS Output Optimization', 'Injury Prevention & Joint Longevity', 'Power Development'],
    experience: '10+ Years Strength Coach',
    bio: 'Marcus has trained professional athletes, competitive powerlifters, and everyday lifters looking to maximize their Central Nervous System (CNS) output. He is FitMind AI\'s lead corrective exercise specialist, specializing in structural rehab and injury proofing.',
    approach: 'CNS optimization. Strength is a skill of the nervous system. By building perfect joint stabilization at every angle of a lift, we eliminate structural bottlenecks and allow your body to exert massive force safely.',
    philosophy: 'A strong joint is a safe joint. Eliminate kinetic leaks to unlock explosive strength.',
    certifications: [
      'NASM Performance Enhancement Specialist',
      'NASM Corrective Exercise Specialist',
      'USA Weightlifting L1 Coach',
      'Pre-Rehab Joint Specialist'
    ],
    successMetric: '100%',
    successDetail: 'Joint Health & Zero-Injury Performance Rate'
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'donovan-barker' },
    { slug: 'sarah-jenkins' },
    { slug: 'marcus-thorne' }
  ];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TrainerProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const trainer = trainersData[resolvedParams.slug];

  if (!trainer) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.glow}></div>

        <div className={styles.container}>
          {/* Back button */}
          <Link href="/programs" className={styles.backBtn}>
            ← Back to Programs
          </Link>

          {/* Profile Header Grid */}
          <div className={styles.profileGrid}>
            {/* Left Column: Avatar & Quick Stats */}
            <div className={styles.leftCol}>
              <div className={styles.avatarCard}>
                <div className={styles.avatarCircle}>{trainer.avatar}</div>
                <h1 className={styles.trainerName}>{trainer.name}</h1>
                <div className={styles.trainerTitle}>{trainer.title}</div>
                <span className={styles.experienceBadge}>{trainer.experience}</span>
              </div>

              {/* Success Metric Box */}
              <div className={styles.metricCard}>
                <div className={styles.metricVal}>{trainer.successMetric}</div>
                <div className={styles.metricLabel}>{trainer.successDetail}</div>
              </div>

              {/* Specialties */}
              <div className={styles.specialtiesCard}>
                <h4 className={styles.sectionTitleSmall}>Core Specialties</h4>
                <ul className={styles.specialtiesList}>
                  {trainer.specialties.map((spec, idx) => (
                    <li key={idx} className={styles.specialtyTag}>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: In-depth Bio & Approach */}
            <div className={styles.rightCol}>
              {/* Bio block */}
              <div className={styles.bioCard}>
                <h2 className={styles.sectionTitle}>Professional Roster Bio</h2>
                <p className={styles.paragraph}>{trainer.bio}</p>
              </div>

              {/* Training Approach */}
              <div className={styles.approachCard}>
                <h3 className={styles.sectionTitle}>The Biomechanical Approach</h3>
                <p className={styles.paragraph}>{trainer.approach}</p>
              </div>

              {/* Philosophy Quote Callout */}
              <div className={styles.philosophyCard}>
                <span className={styles.quoteMark}>“</span>
                <p className={styles.philosophyText}>{trainer.philosophy}</p>
              </div>

              {/* Certifications Checkbox List */}
              <div className={styles.certsCard}>
                <h3 className={styles.sectionTitle}>Accredited Certifications</h3>
                <ul className={styles.certsList}>
                  {trainer.certifications.map((cert, idx) => (
                    <li key={idx} className={styles.certItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action CTA Panel */}
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Ready to Train with {trainer.name}?</h3>
              <p className={styles.ctaDesc}>
                Secure your direct 1-on-1 personal coaching slot. Work with {trainer.name} through our Performance Elite tier to scale your biometrics, master exercise form, and prevent injury.
              </p>
            </div>
            <Link href="/intake?plan=elite" className={styles.ctaBtn}>
              Secure My Coaching Slot
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
