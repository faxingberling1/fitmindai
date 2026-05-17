import styles from './TrainingSection.module.css';

const programs = [
  {
    title: 'Hypertrophy Masterclass',
    description: 'Build lean muscle mass with scientifically backed rep ranges and progressive overload techniques.',
    icon: '💪'
  },
  {
    title: 'Endurance Protocol',
    description: 'Enhance your cardiovascular capacity and stamina for high-intensity performance.',
    icon: '🏃'
  },
  {
    title: 'Mind-Muscle Connection',
    description: 'A dedicated course on neurological adaptation and maximizing contraction efficiency.',
    icon: '🧠'
  }
];

export default function TrainingSection() {
  return (
    <section id="training" className={styles.training}>
      <div className={styles.header}>
        <h2 className="heading-lg">Educational <span className="text-gradient">Training</span></h2>
        <p className="text-lg">Discover our premium, science-based educational programs designed to elevate your understanding of fitness.</p>
      </div>
      
      <div className={styles.grid}>
        {programs.map((program, index) => (
          <div key={index} className={`${styles.card} glass-panel`}>
            <div className={styles.icon}>{program.icon}</div>
            <h3 className={styles.cardTitle}>{program.title}</h3>
            <p className={styles.cardDesc}>{program.description}</p>
            <button className={styles.learnMore}>Learn More →</button>
          </div>
        ))}
      </div>
    </section>
  );
}
