"use client";

import { useState } from 'react';
import styles from './TrainingSection.module.css';

const programs = [
  {
    title: 'Hypertrophy Masterclass',
    description: 'Build lean muscle mass with scientifically backed rep ranges, biomechanical precision, and advanced progressive overload techniques.',
    icon: '💪',
    duration: '8 Weeks',
    lessons: '24 Modules',
    level: 'Intermediate - Advanced',
    accreditation: 'FitMind Academy Certified',
    audience: 'Individuals looking to maximize athletic physique & Coaches seeking movement mechanics excellence.',
    modules: [
      {
        num: '01',
        name: 'Sarcoplasmic vs Myofibrillar Science',
        topics: ['Protein synthesis triggers', 'Pathways of mechanical tension', 'Metabolic stress markers']
      },
      {
        num: '02',
        name: 'Biomechanical Line of Pull',
        topics: ['Customizing movement profiles', 'Joint stress reduction', 'Leverage optimization']
      },
      {
        num: '03',
        name: 'Advanced Periodization Protocols',
        topics: ['Microcycle wave loading', 'Intelligent deload planning', 'Auto-regulation strategies']
      }
    ]
  },
  {
    title: 'Metabolic & Endurance Protocol',
    description: 'Master cellular energetics, enhance VO2 max efficiency, and implement personalized nutritional timing strategies.',
    icon: '🏃',
    duration: '6 Weeks',
    lessons: '18 Modules',
    level: 'All Levels',
    accreditation: 'NSCA / NASM Approved CEUs',
    audience: 'Endurance athletes aiming for optimal race-day pacing & Trainers creating metabolic conditioning schemes.',
    modules: [
      {
        num: '01',
        name: 'Energy Systems Mastery',
        topics: ['Glycolytic vs Oxidative pathways', 'Lactate threshold buffering', 'Mitochondrial biogenesis']
      },
      {
        num: '02',
        name: 'Intra-Workout Fueling Science',
        topics: ['Glycogen depletion rates', 'Electrolyte balancing protocols', 'Exogenous ketone application']
      },
      {
        num: '03',
        name: 'Heart Rate Zone Periodization',
        topics: ['Aerobic base building (Zone 2)', 'HIIT intervals scheduling', 'Heart Rate Variability (HRV) metrics']
      }
    ]
  },
  {
    title: 'Neurological Adaptation Hub',
    description: 'Explore the mind-muscle connection through motor unit recruitment, neural drive training, and mental fortitude exercises.',
    icon: '🧠',
    duration: '10 Weeks',
    lessons: '30 Modules',
    level: 'Advanced',
    accreditation: 'FitMind Neuro-Science Cert',
    audience: 'Elite lifters breaking strength plateaus & Mentors aiming to boost client neurological endurance.',
    modules: [
      {
        num: '01',
        name: 'Motor Unit Recruitment Science',
        topics: ['Henneman Size Principle', 'Rate coding dynamics', 'Post-activation potentiation']
      },
      {
        num: '02',
        name: 'Central Nervous System Recovery',
        topics: ['Neurotransmitter depletion markers', 'Sleep architecture for CNS', 'Sympathovagal balancing']
      },
      {
        num: '03',
        name: 'Proprioception & Sensory Integration',
        topics: ['Vestibular system calibration', 'Kinesthetic feedback loops', 'Elite motor pattern mastery']
      }
    ]
  }
];

export default function TrainingSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeProgram = programs[selectedIdx];

  return (
    <section id="training" className={styles.training}>
      <div className={styles.header}>
        <div className={styles.badge}>INSTITUTIONAL CURRICULUM</div>
        <h2 className="heading-lg">Educational <span className="text-gradient">Training Academy</span></h2>
        <p className="text-md text-gray">
          Bridge the gap between complex physiological concepts and elite practical application. Select a path below to view full curriculum details.
        </p>
      </div>

      <div className={styles.tabsContainer}>
        {programs.map((program, index) => (
          <button 
            key={index} 
            className={`${styles.tabBtn} ${selectedIdx === index ? styles.activeTab : ''}`}
            onClick={() => setSelectedIdx(index)}
          >
            <span className={styles.tabIcon}>{program.icon}</span>
            <div className={styles.tabText}>
              <h4 className={styles.tabTitle}>{program.title}</h4>
              <span className={styles.tabMeta}>{program.duration} • {program.level}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className={`${styles.detailPanel} glass-panel`}>
        <div className={styles.panelHeader}>
          <div className={styles.panelMetaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Duration</span>
              <span className={styles.metaValue}>{activeProgram.duration}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Curriculum Size</span>
              <span className={styles.metaValue}>{activeProgram.lessons}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Target Level</span>
              <span className={styles.metaValue}>{activeProgram.level}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Accreditation</span>
              <span className={styles.metaValue} style={{ color: 'var(--primary-blue)' }}>{activeProgram.accreditation}</span>
            </div>
          </div>

          <h3 className={styles.panelTitle}>{activeProgram.title}</h3>
          <p className={styles.panelDesc}>{activeProgram.description}</p>
          
          <div className={styles.targetAudience}>
            <strong>Optimal Audience:</strong> {activeProgram.audience}
          </div>
        </div>

        <div className={styles.modulesSection}>
          <h4 className={styles.modulesHeading}>Curriculum Modules Overview</h4>
          <div className={styles.modulesGrid}>
            {activeProgram.modules.map((module, i) => (
              <div key={i} className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleNum}>{module.num}</span>
                  <h5 className={styles.moduleName}>{module.name}</h5>
                </div>
                <ul className={styles.topicList}>
                  {module.topics.map((topic, k) => (
                    <li key={k} className={styles.topicItem}>
                      <span className={styles.bullet}></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
