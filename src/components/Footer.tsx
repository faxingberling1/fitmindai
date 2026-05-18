import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <Link href="/">
            <Image 
              src="/assets/fitmindai.png" 
              alt="FitMind AI Logo" 
              width={200} 
              height={58} 
              className={styles.logoImage}
            />
          </Link>
          <p className={styles.description}>
            The ultimate ecosystem for fitness professionals and individuals. Train, connect, and elevate life.
          </p>
        </div>
        
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Platform</h4>
          <Link href="/training" className={styles.link}>Training Programs</Link>
          <Link href="/#videos" className={styles.link}>Educational Videos</Link>
          <Link href="/#download" className={styles.link}>Download App</Link>
          <Link href="/shop" className={styles.link}>Performance Shop</Link>
        </div>
        
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Company</h4>
          <Link href="/about" className={styles.link}>About Donovan</Link>
          <Link href="/#progress" className={styles.link}>App Roadmap</Link>
          <Link href="/contact" className={styles.link}>Contact Us</Link>
          <Link href="#" className={styles.link}>Careers</Link>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Legal</h4>
          <Link href="/terms" className={styles.link}>Terms & Conditions</Link>
          <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
          <Link href="/refund" className={styles.link}>Refund Policy</Link>
          <Link href="/disclaimer" className={styles.link}>Medical Disclaimer</Link>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} FitMind AI. All rights reserved.</p>
        </div>
        <div className={styles.paymentMethods}>
          {/* Visa SVG Premium Dark */}
          <svg 
            className={styles.paymentIcon} 
            viewBox="0 0 38 24" 
            xmlns="http://www.w3.org/2000/svg" 
            role="img" 
            style={{ height: '24px', width: '38px', flexShrink: 0 }}
            aria-labelledby="pi-visa"
          >
            <title id="pi-visa">Visa</title>
            <rect width="36" height="22" x="1" y="1" rx="3" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
            <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontStyle="italic" fontFamily="'Inter', system-ui, -apple-system, sans-serif" letterSpacing="0.2">VISA</text>
          </svg>
          {/* Mastercard SVG Premium Dark */}
          <svg 
            className={styles.paymentIcon} 
            viewBox="0 0 38 24" 
            xmlns="http://www.w3.org/2000/svg" 
            role="img" 
            style={{ height: '24px', width: '38px', flexShrink: 0 }}
            aria-labelledby="pi-master"
          >
            <title id="pi-master">Mastercard</title>
            <rect width="36" height="22" x="1" y="1" rx="3" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
            <circle fill="#EB001B" cx="15" cy="12" r="5.5"></circle>
            <circle fill="#F79E1B" cx="23" cy="12" r="5.5" opacity="0.95"></circle>
            <path fill="#FF5F00" d="M 19 7.2 A 5.5 5.5 0 0 1 23 12 A 5.5 5.5 0 0 1 19 16.8 A 5.5 5.5 0 0 1 15 12 A 5.5 5.5 0 0 1 19 7.2 Z"></path>
          </svg>
          {/* Amex SVG Premium Dark */}
          <svg 
            className={styles.paymentIcon} 
            viewBox="0 0 38 24" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ height: '24px', width: '38px', flexShrink: 0 }}
            role="img" 
            aria-labelledby="pi-amex"
          >
            <title id="pi-amex">American Express</title>
            <rect width="36" height="22" x="1" y="1" rx="3" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
            <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="900" fontFamily="'Inter', system-ui, -apple-system, sans-serif" letterSpacing="0.8">AMEX</text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
