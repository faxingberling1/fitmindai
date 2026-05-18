"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

export default function LoginPage() {
  // ----------------------------------------------------
  // States
  // ----------------------------------------------------
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Form Field States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Dynamic Role-based Authentication paths
  const [regAccountType, setRegAccountType] = useState<"learner" | "trainer">("learner");
  const [learnerGoal, setLearnerGoal] = useState("");
  const [trainerSpecialization, setTrainerSpecialization] = useState("");
  const [trainerCertId, setTrainerCertId] = useState("");
  const [trainerFileName, setTrainerFileName] = useState("");

  // Forgot Password Flow
  const [isForgotFlow, setIsForgotFlow] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  // Submitting, Error & Success States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMode, setSuccessMode] = useState<"login" | "register">("login");
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ----------------------------------------------------
  // Effects
  // ----------------------------------------------------
  // Trigger redirect when success is confirmed
  useEffect(() => {
    let timer: any;
    if (isSuccess && redirectCountdown > 0) {
      timer = setInterval(() => {
        setRedirectCountdown(prev => prev - 1);
      }, 1000);
    } else if (isSuccess && redirectCountdown === 0) {
      window.location.href = "/";
    }
    return () => clearInterval(timer);
  }, [isSuccess, redirectCountdown]);

  // Clean error triggers on input adjustments
  useEffect(() => {
    setErrors({});
    setGlobalError(null);
  }, [
    loginEmail, loginPassword, 
    registerName, registerEmail, registerPassword, registerConfirmPassword, 
    agreeTerms, forgotEmail, activeTab, isForgotFlow,
    regAccountType, learnerGoal, trainerSpecialization, trainerCertId, trainerFileName
  ]);

  // ----------------------------------------------------
  // Action Handlers
  // ----------------------------------------------------
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);

    const tempErrors: Record<string, string> = {};
    if (!loginEmail.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!loginPassword) {
      tempErrors.password = "Password is required";
    } else if (loginPassword.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API authorization call
    setTimeout(() => {
      setIsSubmitting(false);
      // Hardcode a validation bypass for demonstration
      if (loginEmail.toLowerCase() === "error@fitmind.ai") {
        setGlobalError("Invalid email or password combination. Please try again.");
      } else {
        setSuccessMode("login");
        setIsSuccess(true);
      }
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);

    const tempErrors: Record<string, string> = {};
    if (!registerName.trim()) {
      tempErrors.name = "Full Name is required";
    }

    if (!registerEmail.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      tempErrors.email = "Please enter a valid email address";
    }

    // Dynamic path validations
    if (regAccountType === "learner") {
      if (!learnerGoal) {
        tempErrors.learnerGoal = "Please select your primary training goal";
      }
    } else {
      if (!trainerSpecialization) {
        tempErrors.trainerSpecialization = "Please select your coaching specialization";
      }
      if (!trainerCertId.trim()) {
        tempErrors.trainerCertId = "Certification ID is required for coaches";
      }
      if (!trainerFileName) {
        tempErrors.trainerFile = "Certification documentation is required for trainers";
      }
    }

    if (!registerPassword) {
      tempErrors.password = "Password is required";
    } else if (registerPassword.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    if (registerPassword !== registerConfirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      tempErrors.terms = "You must agree to the Terms & Conditions";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API registration call
    setTimeout(() => {
      setIsSubmitting(false);
      if (registerEmail.toLowerCase() === "taken@fitmind.ai") {
        setGlobalError("This email address is already registered.");
      } else {
        setSuccessMode("register");
        setIsSuccess(true);
      }
    }, 1500);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!forgotEmail.trim()) {
      setErrors({ forgotEmail: "Email is required" });
      return;
    } else if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      setErrors({ forgotEmail: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage(`A password reset link was dispatched to: ${forgotEmail}`);
      setForgotEmail("");
      setIsForgotFlow(false);
      // Automatically close toast after 4s
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }, 1200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, trainerFile: "File size exceeds 5MB limit" }));
        return;
      }
      setTrainerFileName(file.name);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTrainerFileName("");
  };

  return (
    <div className={styles.page}>
      <Navbar />
      {/* Dynamic Glowing Grids */}
      <div className={styles.glow}></div>
      <div className={styles.glowSecond}></div>

      <div className={styles.container}>
        {/* Logo Branding */}
        <div className={styles.logoWrapper}>
          <Link href="/">
            <Image 
              src="/assets/fitmindai.png" 
              alt="FitMind AI Logo" 
              width={160} 
              height={44} 
              style={{ height: 'auto' }}
              priority
            />
          </Link>
        </div>

        {/* Central Card */}
        <div className={`${styles.glassCard}`}>
          
          {/* Confetti Successful Authenticated View */}
          {isSuccess && (
            <div className={styles.successOverlay}>
              <div className={styles.successCard}>
                <div className={styles.checkCircle}>
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>
                  {successMode === "login" 
                    ? "Welcome Back!" 
                    : regAccountType === "trainer" 
                      ? "Coaching Account Created!" 
                      : "Learner Account Created!"}
                </h3>
                <p className={styles.successText}>
                  {successMode === "login" 
                    ? "Login successful. Synchronizing your FitMind parameters..." 
                    : regAccountType === "trainer"
                      ? "Welcome to the FitMind Coaching Network! Setting up your client roster and dashboard..."
                      : "Welcome to FitMind Academy! Setting up your educational curriculum and dashboard..."}
                </p>
                <div className={styles.countdownTrack}>
                  <div className={styles.countdownFill}></div>
                </div>
                <span className={styles.countdownText}>
                  Redirecting in {redirectCountdown}...
                </span>
              </div>
            </div>
          )}

          {/* 1. FORGOT PASSWORD INTERFACE */}
          {isForgotFlow ? (
            <div className={styles.formWrapper}>
              <h2 className={styles.formTitle}>Reset Password</h2>
              <p className={styles.formDesc}>
                Enter the email address registered to your FitMind AI profile to dispatch a secure recovery token.
              </p>

              <form onSubmit={handleForgotSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="forgot-email" className={styles.formLabel}>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input 
                      id="forgot-email"
                      type="email" 
                      className={styles.inputField} 
                      placeholder="e.g. yourname@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.forgotEmail && (
                    <span className={styles.errorMsg}>
                      ⚠️ {errors.forgotEmail}
                    </span>
                  )}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? "Dispatching..." : "Send Reset Link"}
                </button>

                <button 
                  type="button" 
                  className={styles.submitBtn} 
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "none", marginTop: "-0.5rem" }}
                  onClick={() => setIsForgotFlow(false)}
                  disabled={isSubmitting}
                >
                  Return to Sign In
                </button>
              </form>
            </div>
          ) : (
            // 2. UNIFIED LOGIN / REGISTER INTERFACE
            <div className={styles.formWrapper}>
              
              {/* Tab Selector pills */}
              <div className={styles.toggleContainer}>
                <div className={`${styles.slidingPill} ${activeTab === "register" ? styles.slidingRegister : ""}`}></div>
                <button 
                  className={`${styles.tabBtn} ${activeTab === "login" ? styles.activeTabBtn : ""}`}
                  onClick={() => setActiveTab("login")}
                >
                  Sign In
                </button>
                <button 
                  className={`${styles.tabBtn} ${activeTab === "register" ? styles.activeTabBtn : ""}`}
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </button>
              </div>

              {/* Global Error Banner */}
              {globalError && (
                <div className={styles.globalError}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{globalError}</span>
                </div>
              )}

              {/* ACTIVE TAB: LOGIN */}
              {activeTab === "login" ? (
                <form onSubmit={handleLoginSubmit} style={{ animation: "fadeIn 0.3s ease" }}>
                  <h2 className={styles.formTitle}>Welcome back</h2>
                  <p className={styles.formDesc}>Sign in to lock in your metrics and coordinate your coaching plans.</p>

                  <div className={styles.formGroup}>
                    <label htmlFor="login-email" className={styles.formLabel}>Email Address</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <input 
                        id="login-email"
                        type="email" 
                        className={styles.inputField} 
                        placeholder="yourname@gmail.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && <span className={styles.errorMsg}>⚠️ {errors.email}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="login-password" className={styles.formLabel}>Password</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input 
                        id="login-password"
                        type={showPassword ? "text" : "password"} 
                        className={styles.inputField} 
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <button 
                        type="button" 
                        className={styles.eyeToggle} 
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <span className={styles.errorMsg}>⚠️ {errors.password}</span>}
                  </div>

                  <div className={styles.helperRow}>
                    <label className={styles.rememberMe}>
                      <input 
                        type="checkbox" 
                        className={styles.checkboxInput}
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span>Remember me</span>
                    </label>
                    <button 
                      type="button" 
                      className={styles.forgotLink}
                      onClick={() => setIsForgotFlow(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className={styles.countdownText} style={{ color: "#fff" }}>Validating credentials...</span>
                    ) : (
                      <>
                        <span>Secure Sign In</span>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                // ACTIVE TAB: REGISTER
                <form onSubmit={handleRegisterSubmit} style={{ animation: "fadeIn 0.3s ease" }}>
                  <h2 className={styles.formTitle}>Join FitMind AI</h2>
                  <p className={styles.formDesc}>Get dynamic form checks, accredited curricula, and athletic metrics.</p>

                  {/* Account Type Path Selector */}
                  <div className={styles.toggleContainer} style={{ marginBottom: "1.5rem", background: "rgba(255, 255, 255, 0.02)" }}>
                    <div 
                      className={`${styles.slidingPill} ${regAccountType === "trainer" ? styles.slidingRegister : ""}`} 
                      style={{ background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)" }}
                    ></div>
                    <button 
                      type="button"
                      className={`${styles.tabBtn} ${regAccountType === "learner" ? styles.activeTabBtn : ""}`}
                      onClick={() => setRegAccountType("learner")}
                    >
                      🎓 Join as Learner
                    </button>
                    <button 
                      type="button"
                      className={`${styles.tabBtn} ${regAccountType === "trainer" ? styles.activeTabBtn : ""}`}
                      onClick={() => setRegAccountType("trainer")}
                    >
                      👑 Join as Trainer
                    </button>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="reg-name" className={styles.formLabel}>Full Name</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input 
                        id="reg-name"
                        type="text" 
                        className={styles.inputField} 
                        placeholder="Donovan Barker"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.name && <span className={styles.errorMsg}>⚠️ {errors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="reg-email" className={styles.formLabel}>Email Address</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <input 
                        id="reg-email"
                        type="email" 
                        className={styles.inputField} 
                        placeholder="yourname@domain.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && <span className={styles.errorMsg}>⚠️ {errors.email}</span>}
                  </div>

                  {/* Dynamic Learner Goal Path */}
                  {regAccountType === "learner" && (
                    <div className={styles.formGroup}>
                      <label htmlFor="reg-goal" className={styles.formLabel}>Primary Training Goal</label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </span>
                        <select 
                          id="reg-goal"
                          className={styles.inputField} 
                          value={learnerGoal}
                          onChange={(e) => setLearnerGoal(e.target.value)}
                          disabled={isSubmitting}
                          style={{ appearance: "none", WebkitAppearance: "none", paddingRight: "40px" }}
                        >
                          <option value="" style={{ background: "#0a0a0a" }}>Select primary priority...</option>
                          <option value="hypertrophy" style={{ background: "#0a0a0a" }}>Sarcoplasmic & Myofibrillar Hypertrophy</option>
                          <option value="metabolic" style={{ background: "#0a0a0a" }}>Cellular Energetics & VO2 Max Endurance</option>
                          <option value="neurological" style={{ background: "#0a0a0a" }}>Motor Unit Recruitment & Neural Force</option>
                        </select>
                        <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", pointerEvents: "none" }}>▼</span>
                      </div>
                      {errors.learnerGoal && <span className={styles.errorMsg}>⚠️ {errors.learnerGoal}</span>}
                    </div>
                  )}

                  {/* Dynamic Trainer Certification Path */}
                  {regAccountType === "trainer" && (
                    <>
                      <div className={styles.formGroup}>
                        <label htmlFor="reg-specialization" className={styles.formLabel}>Coaching Specialization</label>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                            </svg>
                          </span>
                          <select 
                            id="reg-specialization"
                            className={styles.inputField} 
                            value={trainerSpecialization}
                            onChange={(e) => setTrainerSpecialization(e.target.value)}
                            disabled={isSubmitting}
                            style={{ appearance: "none", WebkitAppearance: "none", paddingRight: "40px" }}
                          >
                            <option value="" style={{ background: "#0a0a0a" }}>Select expert domain...</option>
                            <option value="biomechanics" style={{ background: "#0a0a0a" }}>Exercise Biomechanics & Leverage Analysis</option>
                            <option value="energetics" style={{ background: "#0a0a0a" }}>Cellular Energetics & Metabolic Periodization</option>
                            <option value="neurology" style={{ background: "#0a0a0a" }}>Neuro-Force & Corrective Kinetics</option>
                          </select>
                          <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", pointerEvents: "none" }}>▼</span>
                        </div>
                        {errors.trainerSpecialization && <span className={styles.errorMsg}>⚠️ {errors.trainerSpecialization}</span>}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="reg-cert" className={styles.formLabel}>NASM / NSCA Certification ID</label>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </span>
                          <input 
                            id="reg-cert"
                            type="text" 
                            className={styles.inputField} 
                            placeholder="e.g. NASM-CPT-123456"
                            value={trainerCertId}
                            onChange={(e) => setTrainerCertId(e.target.value)}
                            disabled={isSubmitting}
                          />
                        </div>
                        {errors.trainerCertId && <span className={styles.errorMsg}>⚠️ {errors.trainerCertId}</span>}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Certification Documentation</label>
                        {trainerFileName ? (
                          <div className={styles.fileBadge}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span>📄</span>
                              <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "230px" }}>
                                {trainerFileName}
                              </span>
                            </div>
                            <button 
                              type="button" 
                              className={styles.removeFileBtn} 
                              onClick={handleRemoveFile}
                              aria-label="Remove certification file"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label className={styles.uploadArea}>
                            <input 
                              type="file" 
                              style={{ display: "none" }} 
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={handleFileChange}
                              disabled={isSubmitting}
                            />
                            <div className={styles.uploadIcon}>
                              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </div>
                            <span className={styles.uploadTitle}>Upload Credentials Document</span>
                            <span className={styles.uploadDesc}>Select PDF, PNG, or JPG (Max 5MB)</span>
                          </label>
                        )}
                        {errors.trainerFile && <span className={styles.errorMsg}>⚠️ {errors.trainerFile}</span>}
                      </div>
                    </>
                  )}

                  <div className={styles.formGroup}>
                    <label htmlFor="reg-password" className={styles.formLabel}>Create Password</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input 
                        id="reg-password"
                        type={showPassword ? "text" : "password"} 
                        className={styles.inputField} 
                        placeholder="At least 6 characters"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <button 
                        type="button" 
                        className={styles.eyeToggle} 
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <span className={styles.errorMsg}>⚠️ {errors.password}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="reg-confirm-password" className={styles.formLabel}>Confirm Password</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input 
                        id="reg-confirm-password"
                        type={showConfirmPassword ? "text" : "password"} 
                        className={styles.inputField} 
                        placeholder="Repeat password"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <button 
                        type="button" 
                        className={styles.eyeToggle} 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className={styles.errorMsg}>⚠️ {errors.confirmPassword}</span>}
                  </div>

                  <label className={styles.termsRow}>
                    <input 
                      type="checkbox" 
                      className={styles.checkboxInput}
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      style={{ marginTop: '2px' }}
                    />
                    <span>
                      I verify my physical integrity and agree to the {" "}
                      <Link href="/terms" target="_blank" onClick={(e) => e.stopPropagation()}>Terms & Conditions</Link> 
                      {" "} & {" "}
                      <Link href="/privacy" target="_blank" onClick={(e) => e.stopPropagation()}>Privacy Policies</Link>.
                    </span>
                  </label>
                  {errors.terms && <span className={styles.errorMsg} style={{ marginTop: "-1rem", marginBottom: "1rem" }}>⚠️ {errors.terms}</span>}

                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className={styles.countdownText} style={{ color: "#fff" }}>Creating credentials...</span>
                    ) : (
                      <>
                        <span>Verify & Create Account</span>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Social Login Dividers */}
              <div className={styles.socialDivider}>OR AUTHENTICATE SECURELY WITH</div>

              {/* Social Buttons */}
              <div className={styles.socialRow}>
                <button 
                  className={styles.socialBtn} 
                  onClick={() => {
                    setSuccessMode("login");
                    setIsSuccess(true);
                  }}
                  aria-label="Continue with Google"
                >
                  <span className={styles.socialIcon}>
                    {/* Google SVG Vector Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.137 4.114-3.41 0-6.19-2.77-6.19-6.19 0-3.418 2.78-6.19 6.19-6.19 1.487 0 2.848.533 3.91 1.424l3.078-3.078C18.91 1.95 15.823 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.894 0 10.963-4.247 10.963-11.24 0-.693-.075-1.378-.216-1.955H12.24z"/>
                    </svg>
                  </span>
                  <span>Google SSO</span>
                </button>
                
                <button 
                  className={styles.socialBtn}
                  onClick={() => {
                    setSuccessMode("login");
                    setIsSuccess(true);
                  }}
                  aria-label="Continue with Apple"
                >
                  <span className={styles.socialIcon}>
                    {/* Apple SVG Vector Icon */}
                    <svg width="14" height="16" viewBox="0 0 170 200" fill="currentColor">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.38.13-9.13-1.84-14.24-5.92-3.16-2.5-7.07-7.21-11.75-14.13-9.97-14.86-17.06-31.95-21.28-51.27-4.21-19.32-3.32-36.75 2.68-52.29 5.4-14.01 14.13-21.57 26.22-22.68 5.79-.53 12.1 1.48 18.9 6.03 6.8 4.54 11.66 6.02 14.58 4.47 2.92-1.55 8.07-3.9 15.48-7.07 7.4-3.17 13.79-4.37 19.16-3.6 15.66 1.76 27.23 8.35 34.73 19.76-14.75 8.98-21.93 21.57-21.53 37.78.4 12.22 5.09 22.45 14.07 30.68 8.98 8.23 19.32 12.78 30.98 13.67 2.37 5.71 4.7 11.27 6.94 16.66zM119.22 29.35c0-7.39 2.58-14.24 7.74-20.57 5.17-6.33 11.66-10.23 19.49-11.7 1.05 8.01-1.37 15.49-7.27 22.45-5.9 6.95-12.87 11.02-20.9 12.2-.42-1.07-.63-1.85-.63-2.38z"/>
                    </svg>
                  </span>
                  <span>Apple ID</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Dynamic Toast popup notifications */}
      {toastMessage && (
        <div className={styles.toast} role="alert">
          <div className={styles.toastCheck}>✓</div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
