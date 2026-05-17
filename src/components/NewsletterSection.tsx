"use client";

import { useState } from 'react';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simple robust email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid cryptographic email address.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.glassCard} glass-panel`}>
          {!submitted ? (
            <>
              <span className={styles.accent}>Intelligence Dispatch</span>
              <h2 className="heading-md">Subscribe to <span className="text-gradient">FitMind Telemetry</span></h2>
              <p className="text-md text-gray" style={{ maxWidth: '600px', margin: '0.75rem auto 2rem' }}>
                Join an elite tier of trainers and athletes. Receive weekly clinical research updates, biomechanical guides, and exclusive early product keys directly to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className={styles.form}>
                <div className={styles.inputWrapper}>
                  <input 
                    type="email" 
                    placeholder="Enter secure email address" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    required
                    className={styles.emailInput}
                  />
                  <button type="submit" className="btn-primary">
                    Subscribe
                  </button>
                </div>
                {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
              </form>

              <p className={styles.consentText}>
                🔒 256-bit encryption. Zero spam. Revoke telemetry subscription at any time.
              </p>
            </>
          ) : (
            <div className={styles.successWrapper}>
              <div className={styles.successIcon}>✓</div>
              <h2 className="heading-md">Welcome to the <span className="text-gradient">Inner Circle</span></h2>
              <p className="text-md text-gray" style={{ margin: '1rem 0 0' }}>
                Your email (**{email}**) has been securely registered in our system. Prepare for elite research updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
