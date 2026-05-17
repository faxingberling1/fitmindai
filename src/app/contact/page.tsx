"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function ContactPage() {
  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // CAPTCHA state
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Status states
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Generate CAPTCHA values on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 9) + 2; // 2 to 10
    const n2 = Math.floor(Math.random() * 9) + 2; // 2 to 10
    setNum1(n1);
    setNum2(n2);
    setUserCaptcha('');
    setCaptchaError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify CAPTCHA calculation
    const correctAnswer = num1 + num2;
    if (parseInt(userCaptcha) !== correctAnswer) {
      setCaptchaError(true);
      setErrorMsg('Incorrect security check answer. Please try again.');
      generateCaptcha(); // Regenerate for security
      return;
    }

    // Success state
    setCaptchaError(false);
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        
        {/* Page Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Get in Touch</span>
            <h1 className="heading-lg">Contact <span className="text-gradient">Our Team</span></h1>
            <p className="text-lg text-gray" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
              Have questions regarding our hypertrophic programs, research peptide disclaimers, or coaching credentials? Drop us a line.
            </p>
          </div>
        </section>

        {/* Contact Split Columns */}
        <section className={styles.splitSection}>
          <div className={styles.splitGrid}>
            
            {/* Form Column */}
            <div className={`${styles.formCard} glass-panel`}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      required
                      placeholder="Specify enquiry topic"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>Message</label>
                    <textarea 
                      id="message"
                      rows={5}
                      required
                      placeholder="Detail your requirements here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={styles.textField}
                    />
                  </div>

                  {/* Math CAPTCHA Panel */}
                  <div className={`${styles.captchaPanel} glass-panel`}>
                    <div className={styles.captchaHeader}>
                      <span className={styles.captchaLock}>🔒</span>
                      <div>
                        <h4 className={styles.captchaTitle}>Security Verification</h4>
                        <p className={styles.captchaLabel}>Solve this simple math question to submit</p>
                      </div>
                    </div>
                    
                    <div className={styles.captchaRow}>
                      <div className={styles.captchaEquation}>
                        {num1} + {num2} =
                      </div>
                      <input 
                        type="number"
                        placeholder="?"
                        required
                        value={userCaptcha}
                        onChange={(e) => {
                          setUserCaptcha(e.target.value);
                          if (captchaError) setCaptchaError(false);
                        }}
                        className={`${styles.captchaInput} ${captchaError ? styles.captchaInputError : ''}`}
                      />
                      <button 
                        type="button" 
                        onClick={generateCaptcha} 
                        className={styles.refreshBtn}
                        title="Regenerate calculation"
                      >
                        🔄
                      </button>
                    </div>
                  </div>

                  {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                    Send Message
                  </button>

                </form>
              ) : (
                <div className={styles.successWrapper}>
                  <div className={styles.successIcon}>✓</div>
                  <h2 className="heading-md">Message <span className="text-gradient">Dispatched</span></h2>
                  <p className="text-md text-gray" style={{ margin: '1rem 0 2rem', lineHeight: '1.6' }}>
                    Thank you, **{name}**. Your query concerning **"{subject}"** has been securely submitted. A FitMind AI support representative or Coach Donovan Barker will respond to you within 24 hours at **{email}**.
                  </p>
                  <button onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    generateCaptcha();
                  }} className="btn-secondary">
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Info Bento Column */}
            <div className={styles.infoColumn}>
              <div className={`${styles.infoCard} glass-panel`}>
                <div className={styles.infoIcon}>✉️</div>
                <h3>Direct Inquiries</h3>
                <p className="text-sm text-gray">For institutional partnerships, corporate licensing, or coaching network applications:</p>
                <a href="mailto:support@fitmind.ai" className={styles.infoLink}>support@fitmind.ai</a>
              </div>

              <div className={`${styles.infoCard} glass-panel`}>
                <div className={styles.infoIcon}>⏱️</div>
                <h3>Operating Hours</h3>
                <p className="text-sm text-gray">Our athletic analysis desk and coaching telemetry support operate:</p>
                <p className={styles.infoValue}>Monday – Friday: 08:00 – 18:00 UTC</p>
                <p className={styles.infoValue}>Saturday – Sunday: 10:00 – 16:00 UTC</p>
              </div>

              <div className={`${styles.infoCard} glass-panel`}>
                <div className={styles.infoIcon}>📋</div>
                <h3>Coaching Credentials</h3>
                <p className="text-sm text-gray">FitMind AI enforces absolute scientific verification. Explore Coach Donovan Barker's certifications on our About page.</p>
                <a href="/about" className={styles.infoLink}>View Credentials ↗</a>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
