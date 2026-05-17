import styles from './MediaSection.module.css';

export default function MediaSection() {
  return (
    <section id="videos" className={styles.media}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="heading-lg">Educational <span className="text-gradient">Library</span></h2>
          <p className="text-lg">Deep dive into mechanics, nutrition, and mentality on our YouTube channel.</p>
        </div>
        
        <div className={styles.videoWrapper}>
          <div className={`${styles.videoPlaceholder} glass-panel`}>
             {/* When ready, replace this placeholder with an actual iframe */}
             <div className={styles.playButton}>▶</div>
             <p className={styles.placeholderText}>Featured Video: The FitMind Blueprint</p>
          </div>
        </div>
        
        <div className={styles.subscribeContainer}>
          <a href="#" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
             <span style={{ color: '#ff0000', fontSize: '1.2rem' }}>▶</span> Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
