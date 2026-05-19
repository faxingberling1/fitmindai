'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { unlockPlatform } from './actions';

export default function AccessGate() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await unlockPlatform(formData);
    
    // If the server action returns an error object, show it.
    // If it succeeds, the server action will trigger a redirect().
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glow}></div>
      
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoMark}>FM</div>
          <div className={styles.logoText}>FitMind AI</div>
        </div>
        
        <h1 className={styles.title}>Secured Environment</h1>
        <p className={styles.subtitle}>Please enter your master credentials to access the staging platform.</p>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className={styles.input} 
              required 
              autoComplete="username"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Master Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className={styles.input} 
              required 
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Verifying..." : "Unlock Platform"}
          </button>
        </form>
      </div>
    </div>
  );
}
