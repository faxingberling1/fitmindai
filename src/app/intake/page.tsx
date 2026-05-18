"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

function IntakeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'hypertrophy';
  
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Form State
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    heightFeet: '5',
    heightInches: '9',
    weight: '',
    goalWeight: '',
    goal: 'hypertrophy',
    experience: 'intermediate',
    injuries: '',
    sleep: '6-8',
    stress: 'moderate',
    equipment: 'full-gym'
  });

  const [bmi, setBmi] = useState<number | null>(null);

  // Auto-calculate BMI
  useEffect(() => {
    if (formData.weight && formData.heightFeet) {
      const weightLbs = parseFloat(formData.weight);
      const heightInInches = (parseInt(formData.heightFeet) * 12) + (parseInt(formData.heightInches) || 0);
      
      if (weightLbs > 0 && heightInInches > 0) {
        // BMI Formula (Imperial): (weight in pounds / (height in inches x height in inches)) x 703
        const calculatedBmi = (weightLbs / (heightInInches * heightInInches)) * 703;
        setBmi(parseFloat(calculatedBmi.toFixed(1)));
      } else {
        setBmi(null);
      }
    } else {
      setBmi(null);
    }
  }, [formData.weight, formData.heightFeet, formData.heightInches]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In the future: Save this to a database or send via email API
    // For now, save locally to pass to checkout
    localStorage.setItem('fitmind_intake', JSON.stringify(formData));
    
    // Redirect to checkout with the selected plan
    router.push(`/checkout?program=${plan}`);
  };

  const getBmiCategory = (bmiVal: number) => {
    if (bmiVal < 18.5) return 'Underweight (Focus: Mass Accrual)';
    if (bmiVal >= 18.5 && bmiVal < 24.9) return 'Normal Weight (Focus: Lean Hypertrophy)';
    if (bmiVal >= 25 && bmiVal < 29.9) return 'Overweight (Focus: Body Recomp)';
    return 'Obese (Focus: Fat Loss & Mobility)';
  };

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressTrack}></div>
        <div 
          className={styles.progressFill} 
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {[1, 2, 3].map((num) => (
          <div key={num} style={{ display: 'flex', alignItems: 'center', flexGrow: num === 3 ? 0 : 1 }}>
            <div className={`${styles.stepDot} ${step === num ? styles.stepDotActive : ''} ${step > num ? styles.stepDotCompleted : ''}`}>
              {step > num ? '✓' : num}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
        
        {/* STEP 1: BIOMETRICS */}
        {step === 1 && (
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Biometric Profiling</h2>
            <p className={styles.sectionSubtitle}>We need exact metrics to calculate your basal metabolic rate and mechanical load capacity.</p>

            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Age</label>
                  <input 
                    type="number" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleInputChange} 
                    className={styles.input} 
                    placeholder="e.g. 28" 
                    required 
                    min="16" 
                    max="100"
                  />
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Biological Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className={styles.input} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Height (Feet / Inches)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="number" name="heightFeet" value={formData.heightFeet} onChange={handleInputChange} className={styles.input} placeholder="Ft" required min="3" max="8" />
                    <input type="number" name="heightInches" value={formData.heightInches} onChange={handleInputChange} className={styles.input} placeholder="In" min="0" max="11" />
                  </div>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Current Weight (lbs)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} className={styles.input} placeholder="e.g. 185" required min="80" max="500" />
                </div>
              </div>
            </div>

            {bmi !== null && (
              <div className={styles.bmiBox}>
                <div>
                  <div className={styles.bmiLabel}>Auto-Calculated BMI</div>
                  <div className={styles.bmiCategory}>{getBmiCategory(bmi)}</div>
                </div>
                <div className={styles.bmiValue}>{bmi}</div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: GOALS & EXPERIENCE */}
        {step === 2 && (
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Training Directives</h2>
            <p className={styles.sectionSubtitle}>What are we trying to achieve with your physique?</p>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Primary Objective</label>
              <div className={styles.radioGrid}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="goal" value="hypertrophy" checked={formData.goal === 'hypertrophy'} onChange={handleInputChange} className={styles.radioInput} />
                  <div className={styles.radioContent}>
                    <div className={styles.radioTitle}>Hypertrophy</div>
                    <div className={styles.radioDesc}>Maximize muscle mass accrual and aesthetic proportions.</div>
                  </div>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="goal" value="fatloss" checked={formData.goal === 'fatloss'} onChange={handleInputChange} className={styles.radioInput} />
                  <div className={styles.radioContent}>
                    <div className={styles.radioTitle}>Fat Loss</div>
                    <div className={styles.radioDesc}>Aggressive body recomp while maintaining lean tissue.</div>
                  </div>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="goal" value="strength" checked={formData.goal === 'strength'} onChange={handleInputChange} className={styles.radioInput} />
                  <div className={styles.radioContent}>
                    <div className={styles.radioTitle}>Pure Strength</div>
                    <div className={styles.radioDesc}>Increase CNS output and 1-Rep Max numbers.</div>
                  </div>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="goal" value="longevity" checked={formData.goal === 'longevity'} onChange={handleInputChange} className={styles.radioInput} />
                  <div className={styles.radioContent}>
                    <div className={styles.radioTitle}>Longevity & Rehab</div>
                    <div className={styles.radioDesc}>Corrective exercise, joint health, and pain-free movement.</div>
                  </div>
                </label>
              </div>
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label className={styles.label}>Training Experience Level</label>
              <select name="experience" value={formData.experience} onChange={handleInputChange} className={styles.input}>
                <option value="beginner">Beginner (0 - 1 Years)</option>
                <option value="intermediate">Intermediate (1 - 3 Years)</option>
                <option value="advanced">Advanced (3+ Years)</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: LIFESTYLE & MEDICAL */}
        {step === 3 && (
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Lifestyle & Constraints</h2>
            <p className={styles.sectionSubtitle}>Final details so Coach Donovan Barker can tailor your protocol.</p>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Medical Limitations / Past Injuries</label>
              <textarea 
                name="injuries" 
                value={formData.injuries} 
                onChange={handleInputChange} 
                className={styles.input} 
                style={{ minHeight: '100px', resize: 'vertical' }}
                placeholder="List any torn ligaments, chronic pain, or surgeries... (Leave blank if none)"
              ></textarea>
            </div>

            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Average Daily Sleep</label>
                  <select name="sleep" value={formData.sleep} onChange={handleInputChange} className={styles.input}>
                    <option value="under-6">Under 6 Hours (Poor Recovery)</option>
                    <option value="6-8">6 - 8 Hours (Optimal)</option>
                    <option value="over-8">8+ Hours (Max Recovery)</option>
                  </select>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Equipment Access</label>
                  <select name="equipment" value={formData.equipment} onChange={handleInputChange} className={styles.input}>
                    <option value="full-gym">Full Commercial Gym</option>
                    <option value="home-gym">Home Gym (Dumbbells/Bench)</option>
                    <option value="bodyweight">Bodyweight Only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className={styles.actionRow}>
          {step > 1 ? (
            <button type="button" onClick={handleBack} className={styles.backBtn}>Back</button>
          ) : (
            <div></div> // Empty div to keep 'Next' aligned right
          )}
          
          <button type="submit" className={styles.nextBtn}>
            {step === totalSteps ? 'Proceed to Checkout' : 'Continue'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default function IntakePage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.glow}></div>
        <Suspense fallback={<div style={{ textAlign: 'center', color: '#fff', padding: '5rem' }}>Loading intake form...</div>}>
          <IntakeContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
