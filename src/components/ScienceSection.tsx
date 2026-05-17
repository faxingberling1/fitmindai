import styles from './ScienceSection.module.css';

export default function ScienceSection() {
  return (
    <section className={styles.scienceSection} id="science">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>The Science</div>
          <h2 className="heading-lg">
            Clinical-Grade <span className="text-gradient">Performance</span>
          </h2>
          <p className="text-md text-gray" style={{ marginBottom: '2rem' }}>
            Our peptides and supplements are engineered with precision. Backed by science, formulated for the elite. 
            We don't do guesswork.
          </p>
          
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.iconContainer}>
                <div className={styles.moleculeIcon}></div>
              </div>
              <div>
                <h4 className={styles.featureTitle}>Accelerated Recovery</h4>
                <p className={styles.featureText}>Compounds like BPC-157 enhance angiogenesis, speeding up the healing of tendons, muscles, and nervous system.</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.iconContainer}>
                <div className={styles.dnaIcon}></div>
              </div>
              <div>
                <h4 className={styles.featureTitle}>Cellular Optimization</h4>
                <p className={styles.featureText}>Targeted aminos promote hyper-efficient protein synthesis and cellular regeneration at the DNA level.</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.iconContainer}>
                <div className={styles.brainIcon}></div>
              </div>
              <div>
                <h4 className={styles.featureTitle}>Cognitive Enhancers</h4>
                <p className={styles.featureText}>Nootropic blends designed to cut through brain fog and lock you into a flow state during intensive training.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.visual}>
          <div className={styles.dataContainer}>
            <div className={styles.glowingOrb}></div>
            
            {/* Abstract Tech Visual */}
            <div className={styles.techGraphic}>
              <div className={styles.techCircle1}></div>
              <div className={styles.techCircle2}></div>
              <div className={styles.techCircle3}></div>
              
              <div className={styles.dataNode} style={{ top: '20%', left: '20%' }}></div>
              <div className={styles.dataNode} style={{ top: '70%', left: '80%' }}></div>
              <div className={styles.dataNode} style={{ top: '50%', left: '10%' }}></div>
              <div className={styles.dataNode} style={{ top: '15%', left: '70%' }}></div>
              
              <div className={styles.centralCore}>
                <span>99.8%</span>
                <span className={styles.coreLabel}>Purity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
