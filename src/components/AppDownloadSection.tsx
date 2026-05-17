import styles from './AppDownloadSection.module.css';

export default function AppDownloadSection() {
  return (
    <section id="download" className={styles.download}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className="heading-lg">Train Anywhere, Anytime</h2>
          <p className="text-lg">
            Take FitMind AI with you. Access exclusive educational content, track your progress, and stay connected with the community directly from your mobile device.
          </p>
          
          <div className={styles.storeButtons}>
            <a href="#" className={styles.storeButton}>
               <div className={styles.storeIcon}>🍎</div>
               <div className={styles.storeText}>
                 <span className={styles.storeLabel}>Download on the</span>
                 <span className={styles.storeName}>App Store</span>
               </div>
            </a>
            <a href="#" className={styles.storeButton}>
               <div className={styles.storeIcon}>▶️</div>
               <div className={styles.storeText}>
                 <span className={styles.storeLabel}>GET IT ON</span>
                 <span className={styles.storeName}>Google Play</span>
               </div>
            </a>
          </div>
        </div>
        
        <div className={styles.phoneMockup}>
          <div className={styles.phoneFrame}>
             <div className={styles.phoneScreen}>
               <div className={styles.mockupHeader}>
                 <span className={styles.mockupLogo}>FitMind AI</span>
               </div>
               <div className={styles.mockupBody}>
                  <div className={styles.skeletonBlock}></div>
                  <div className={styles.skeletonBlock}></div>
                  <div className={styles.skeletonBlock}></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
