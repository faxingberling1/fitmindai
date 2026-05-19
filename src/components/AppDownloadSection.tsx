import Image from 'next/image';
import styles from './AppDownloadSection.module.css';

export default function AppDownloadSection() {
  return (
    <section id="download" className={styles.download}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className="heading-lg">Train Anywhere - Anytime</h2>
          <p className="text-lg">
            Take FitMind AI with you. Access exclusive educational content, track your progress, and stay connected with the community directly from your mobile device.
          </p>
          
          <div className={styles.storeButtons}>
            <a href="#" className={styles.storeButton}>
               {/* Apple App Store SVG */}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={styles.storeIcon}>
                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.97.08 2.15-.52 2.81-1.33z"/>
               </svg>
               <div className={styles.storeText}>
                 <span className={styles.storeLabel}>Coming Soon</span>
                 <span className={styles.storeName}>App Store</span>
               </div>
            </a>
            <a href="#" className={styles.storeButton}>
               {/* Google Play Store SVG */}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={styles.storeIcon}>
                 <path d="M3 5.27v13.46c0 .82.68 1.41 1.47 1.27l10.98-6.38L3.25 4c-.16.27-.25.74-.25 1.27m13.06 6.73L5.08 6.27l11.51 6.67-.53-.94m-.94.94L3.6 18.25c.34-.1.86-.4 1.48-.76l10.98-6.38-.94.94m1.94-1.88L20.1 12l-2.98-1.72v3.44z"/>
               </svg>
               <div className={styles.storeText}>
                 <span className={styles.storeLabel}>Coming Soon</span>
                 <span className={styles.storeName}>Google Play</span>
               </div>
            </a>
          </div>
        </div>
        
        <div className={styles.phoneMockup}>
          <div className={styles.phoneFrame}>
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
               <div className={styles.mockupBody}>
                  <div className={styles.appLogoContainer}>
                    <Image 
                      src="/assets/fitmindai.png" 
                      alt="FitMind AI App Screen" 
                      width={160} 
                      height={45} 
                      style={{ height: 'auto' }}
                      className={styles.appLogo}
                    />
                    <div className={styles.appSpinner}></div>
                    <span className={styles.appVersion}>SECURE ACCESS VERIFIED</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
