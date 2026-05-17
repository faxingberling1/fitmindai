import Image from 'next/image';
import styles from './LogoTicker.module.css';

export default function LogoTicker() {
  const logos = [
    { name: "Apex Trainers" },
    { name: "ProHealth" },
    { name: "Elite Athletics" },
    { name: "Iron Forge" },
    { name: "VitaScience" },
    { name: "Quantum Fit" },
  ];

  // Build interleaved set: name → logo → name → logo → …
  const items: Array<{ type: 'text'; name: string } | { type: 'logo' }> = [];
  logos.forEach(logo => {
    items.push({ type: 'text', name: logo.name });
    items.push({ type: 'logo' });
  });

  return (
    <div className={styles.tickerSection}>
      <p className={styles.tickerTitle}>TRUSTED BY LEADING TRAINERS &amp; ORGANIZATIONS</p>
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerTrack}>
          {[...items, ...items, ...items].map((item, index) =>
            item.type === 'logo' ? (
              <div key={index} className={styles.tickerLogoItem}>
                <Image
                  src="/assets/fitmindai.png"
                  alt="FitMind AI"
                  width={80}
                  height={22}
                  style={{ objectFit: 'contain', opacity: 0.35, filter: 'brightness(0) invert(1)' }}
                />
              </div>
            ) : (
              <div key={index} className={styles.tickerItem}>
                {item.name}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
