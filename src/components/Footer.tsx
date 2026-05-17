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
              width={140} 
              height={40} 
              className={styles.logoImage}
            />
          </Link>
          <p className={styles.description}>
            The ultimate ecosystem for fitness professionals and individuals. Train, connect, and elevate life.
          </p>
        </div>
        
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Platform</h4>
          <Link href="/#training" className={styles.link}>Training Programs</Link>
          <Link href="/#videos" className={styles.link}>Educational Videos</Link>
          <Link href="/#download" className={styles.link}>Download App</Link>
          <Link href="/#shop" className={styles.link}>Performance Shop</Link>
        </div>
        
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Company</h4>
          <Link href="/#about" className={styles.link}>About Donovan</Link>
          <Link href="/#progress" className={styles.link}>App Roadmap</Link>
          <Link href="#" className={styles.link}>Contact Us</Link>
          <Link href="#" className={styles.link}>Careers</Link>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Legal</h4>
          <Link href="#" className={styles.link}>Terms & Conditions</Link>
          <Link href="#" className={styles.link}>Privacy Policy</Link>
          <Link href="#" className={styles.link}>Refund Policy</Link>
          <Link href="#" className={styles.link}>Medical Disclaimer</Link>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} FitMind AI. All rights reserved.</p>
        </div>
        <div className={styles.paymentMethods}>
          {/* Visa SVG Placeholder */}
          <svg className={styles.paymentIcon} viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1c-.2-.1-1-.4-2.5-.4-2.6 0-4.5 1.4-4.5 3.3 0 1.4 1.3 2.2 2.3 2.7.9.5 1.3.8 1.3 1.2 0 .6-.7.9-1.4.9-1.6 0-2.4-.2-3.2-.6l-.4-.2-.5 3c.8.3 2.1.6 3.6.6 2.8 0 4.6-1.4 4.6-3.5 0-1.1-.7-1.9-2.2-2.6-.9-.4-1.4-.7-1.4-1.1 0-.5.5-.9 1.5-.9.9 0 1.7.2 2.3.5l.3.1.5-3m-15.5 8l1.6-10.4h2.5l-1.6 10.4h-2.5m10.1-10.6l-2.6 7-1-4.7s-.1-.6-.5-.9L14.7 7.7h2.6l1.5 5 1.4-5h2.5l-2.5 10.4h-2.5M7.6 18.1h-2.6L7.1 9.4c0-.4.3-.6.6-.7L12 7.6v.1c-1.4.3-2.9.8-3.3 1.3l-.9 3.5-.2-2z" fill="#1434CB"></path></svg>
          {/* Mastercard SVG Placeholder */}
          <svg className={styles.paymentIcon} viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
          {/* Amex SVG Placeholder */}
          <svg className={styles.paymentIcon} viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-amex"><title id="pi-amex">American Express</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M4 8.2v7.7h3.6V8.2H4zm5 0v7.7h1.4v-4.5l1.6 4.5h1.1l1.6-4.5v4.5h1.4V8.2h-2L12.5 12l-1.5-3.8H9zm8.5 0v7.7h5v-1.4h-3.6v-1.8h3.4v-1.3h-3.4v-1.8h3.6V8.2h-5zm6 0v7.7h1.4v-3h1.8l1.4 3h1.5l-1.6-3.2c.8-.2 1.4-.9 1.4-1.8 0-1.3-1-2.7-2.7-2.7h-3.2zm1.4 1.3h1.6c.8 0 1.3.6 1.3 1.3 0 .7-.5 1.3-1.3 1.3h-1.6v-2.6zm6 5v1.4h4.8V8.2h-4.8v1.4h3.4v1.3h-3.2v1.3h3.2v1.3h-3.4z" fill="#006FCF"></path><path d="M4.6 14.5l1.2-3.3 1.2 3.3H4.6z" fill="#fff"></path></svg>
        </div>
      </div>
    </footer>
  );
}
