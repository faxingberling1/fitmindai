import styles from './LogoTicker.module.css';

export default function LogoTicker() {
  const logos = [
    { name: "Apex Trainers", type: "text" },
    { name: "ProHealth", type: "text" },
    { name: "Elite Athletics", type: "text" },
    { name: "Iron Forge", type: "text" },
    { name: "VitaScience", type: "text" },
    { name: "Quantum Fit", type: "text" },
  ];

  return (
    <div className={styles.tickerSection}>
      <p className={styles.tickerTitle}>TRUSTED BY LEADING TRAINERS & ORGANIZATIONS</p>
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerTrack}>
          {/* Double the logos to create an infinite scrolling effect */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className={styles.tickerItem}>
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
