"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function WaitlistPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('individual');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.waitlistCard}>
          {!submitted ? (
            <>
              <h1 className="heading-lg">Join the <span className="text-gradient">Waitlist</span></h1>
              <p className="text-md text-gray" style={{ margin: '1rem 0 2rem' }}>
                Be the first to access the FitMind AI mobile application. Elevate your training or connect with your followers before everyone else.
              </p>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>I want to join as a:</label>
                  <div className={styles.radioGroup}>
                    <label className={`${styles.radioLabel} ${role === 'individual' ? styles.activeRadio : ''}`}>
                      <input 
                        type="radio" 
                        name="role" 
                        value="individual" 
                        checked={role === 'individual'} 
                        onChange={() => setRole('individual')}
                      />
                      Individual (Trainer/Enthusiast)
                    </label>
                    <label className={`${styles.radioLabel} ${role === 'trainer' ? styles.activeRadio : ''}`}>
                      <input 
                        type="radio" 
                        name="role" 
                        value="trainer" 
                        checked={role === 'trainer'} 
                        onChange={() => setRole('trainer')}
                      />
                      Professional Coach / Trainer
                    </label>
                  </div>
                </div>
                
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Secure My Spot
                </button>
              </form>
            </>
          ) : (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h2 className="heading-md">You're on the list, {name}!</h2>
              <p className="text-md text-gray" style={{ margin: '1rem 0 2rem' }}>
                Thanks for joining. We have secure your spot as an **{role}**. We will send updates and early access keys directly to **{email}**.
              </p>
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
