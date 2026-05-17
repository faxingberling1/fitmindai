import styles from './AppProgressSection.module.css';

export default function AppProgressSection() {
  const roadmapItems = [
    {
      id: 1,
      phase: 'Phase 1',
      title: 'Core Architecture',
      status: 'completed',
      features: ['User Authentication', 'Database Schema', 'Video Streaming Infrastructure']
    },
    {
      id: 2,
      phase: 'Phase 2',
      title: 'AI Coaching Engine',
      status: 'in-progress',
      features: ['Workout Generation Algorithm', 'Form Correction Models', 'Progress Tracking']
    },
    {
      id: 3,
      phase: 'Phase 3',
      title: 'Trainer Networking Space',
      status: 'upcoming',
      features: ['Trainer Profiles', 'Client Management Dashboard', 'In-App Messaging']
    },
    {
      id: 4,
      phase: 'Phase 4',
      title: 'E-commerce Integration',
      status: 'upcoming',
      features: ['Affiliate Link System', 'Merch Storefront', 'Secure Checkout']
    }
  ];

  return (
    <section className={styles.progressSection} id="progress">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Platform Roadmap</div>
          <h2 className="heading-lg">Building the <span className="text-gradient">Future of Fitness</span></h2>
          <p className="text-md text-gray" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            We are actively developing the FitMind AI mobile application. Follow our progress as we build the ultimate ecosystem for trainers and individuals.
          </p>
        </div>

        <div className={styles.timeline}>
          {roadmapItems.map((item) => (
            <div key={item.id} className={`${styles.timelineItem} ${styles[item.status]}`}>
              <div className={styles.timelineMarker}>
                <div className={styles.markerDot}></div>
                <div className={styles.markerLine}></div>
              </div>
              
              <div className={styles.timelineContent}>
                <div className={styles.statusBadge}>
                  {item.status === 'completed' && '✓ Completed'}
                  {item.status === 'in-progress' && '⚡ In Progress'}
                  {item.status === 'upcoming' && '🕒 Upcoming'}
                </div>
                <h3 className={styles.phaseTitle}>{item.phase}: {item.title}</h3>
                <ul className={styles.featureList}>
                  {item.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.bullet}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
