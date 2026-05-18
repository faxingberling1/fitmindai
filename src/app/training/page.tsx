"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

// ----------------------------------------------------
// Mock Data for Advanced Academy Curriculum
// ----------------------------------------------------
type Lecture = {
  id: string;
  title: string;
  duration: string;
  durationSec: number;
  plan: "FREE" | "PRO";
  videoUrl: string;
  description: string;
  difficulty: string;
  accreditation: string;
  checkpoints: string[];
  resources: { name: string; size: string; type: string }[];
  notes: string;
  initialComments: { user: string; role?: string; time: string; text: string }[];
};

type Module = {
  moduleName: string;
  lectures: Lecture[];
};

type CurriculumPath = {
  title: string;
  icon: string;
  duration: string;
  level: string;
  modules: Module[];
};

const curriculumData: Record<string, CurriculumPath> = {
  hypertrophy: {
    title: "Hypertrophy Masterclass",
    icon: "💪",
    duration: "8 Weeks",
    level: "Intermediate - Advanced",
    modules: [
      {
        moduleName: "Module 01: Biomechanical Mechanics",
        lectures: [
          {
            id: "hyp-1-1",
            title: "Sarcoplasmic vs Myofibrillar Science",
            duration: "12:40",
            durationSec: 760,
            plan: "FREE",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-performing-a-kettlebell-swing-training-40277-large.mp4",
            description: "Deep dive into the cellular triggers of muscular hypertrophy. Learn how sarcoplasmic expansion differs from myofibrillar density, the exact loading ranges required for both, and how mechanical tension stimulates ribosomal biogenesis to bypass genetic plateaus.",
            difficulty: "Intermediate",
            accreditation: "FitMind Academy Certified • 1.5 CEUs",
            checkpoints: [
              "Understanding ribosome accumulation and translational capacity",
              "Sarcoplasmic vs myofibrillar protein synthesis triggers",
              "Optimal time-under-tension profiles for selective hypertrophy",
            ],
            resources: [
              { name: "Myofibrillar Hypertrophy Loading Chart.pdf", size: "2.4 MB", type: "PDF Document" },
              { name: "Ribosomal Biogenesis Reading List.docx", size: "840 KB", type: "Word Resource" }
            ],
            notes: "Keep your eccentric phase strictly at 3-4 seconds. Sarcoplasmic volume is heavily influenced by total metabolic stress—focus on short rest (45-60s) with 60-70% 1RM on accessory movements.",
            initialComments: [
              { user: "Dr. Ethan Wright", role: "Physiologist", time: "2 hours ago", text: "Exceptional explanation of ribosomal biogenesis! This is exactly how we break plateaus." },
              { user: "Coach Marcus", role: "Trainer", time: "1 day ago", text: "Implementing the eccentric tempo cues with my athletes today. Phenomenal breakdown." }
            ]
          },
          {
            id: "hyp-1-2",
            title: "Pathways of Mechanical Tension",
            duration: "18:15",
            durationSec: 1095,
            plan: "PRO",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-gym-member-doing-kettlebell-swings-40348-large.mp4",
            description: "Discover the exact signaling pathways (mTORC1, MAPK) stimulated by mechanical load. We analyze force vectors, passive tension from titin stretching, and how to program mechanical load for injury-free structural gains.",
            difficulty: "Advanced",
            accreditation: "NSCA / NASM Approved CEUs",
            checkpoints: [
              "Mechanosensors: How muscle spindles decode tension",
              "mTORC1 pathway activation dynamics",
              "Designing overload protocols utilizing descending drop sets",
            ],
            resources: [
              { name: "mTORC1 Tension Mechanics Spreadsheet.xlsx", size: "4.8 MB", type: "Excel Tracker" },
              { name: "Titin Passive Stretch Mechanics.pdf", size: "1.9 MB", type: "PDF Guide" }
            ],
            notes: "Do not rush into massive weights. The target muscle must experience high active tension throughout the entire contractile cycle. Keep structural stability absolute.",
            initialComments: [
              { user: "Sarah Jenkins", role: "NASM Coach", time: "3 days ago", text: "The slide on Titin alignment makes total sense of why deep-stretch exercises build dense muscle." }
            ]
          }
        ]
      },
      {
        moduleName: "Module 02: Biomechanical Line of Pull",
        lectures: [
          {
            id: "hyp-2-1",
            title: "Customizing Joint Profiles",
            duration: "15:20",
            durationSec: 920,
            plan: "FREE",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-performing-a-kettlebell-swing-training-40277-large.mp4",
            description: "No two skeletons are the same. Learn how clavicle width, femur length, and hip socket depth alter individual lines of pull. Master the art of tailoring popular exercises to leverage your personal leverage ratios.",
            difficulty: "Intermediate",
            accreditation: "FitMind Academy Certified",
            checkpoints: [
              "Assessing individual skeletal anatomy and joint mechanics",
              "Adjusting stance and grip parameters for joint longevity",
              "Identifying leverage constraints in press and squat variants",
            ],
            resources: [
              { name: "Anatomical Leverage Diagnostics.pdf", size: "3.2 MB", type: "PDF Guide" }
            ],
            notes: "If your femur is long relative to your torso, traditional squats will load your lower back heavily. Swap to heels-elevated safety bar squats or leg presses to target the quadriceps properly.",
            initialComments: [
              { user: "Alex Mercer", time: "5 days ago", text: "This literally saved my knees. Elevated heels changed everything for my squats!" }
            ]
          }
        ]
      }
    ]
  },
  metabolic: {
    title: "Metabolic & Endurance Protocol",
    icon: "🏃",
    duration: "6 Weeks",
    level: "All Levels",
    modules: [
      {
        moduleName: "Module 01: Cellular Energetics",
        lectures: [
          {
            id: "met-1-1",
            title: "Energy Systems Mastery",
            duration: "14:10",
            durationSec: 850,
            plan: "FREE",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-gym-member-doing-kettlebell-swings-40348-large.mp4",
            description: "Unlock ATP production mechanics. Understand the precise interplay between phosphagen, glycolytic, and oxidative energy systems during varied athletic stressors, and how to program recovery metrics for cardiovascular scaling.",
            difficulty: "All Levels",
            accreditation: "NSCA Approved 0.2 CEUs",
            checkpoints: [
              "Adenosine Triphosphate (ATP) re-synthesis mechanisms",
              "Lactate threshold vs accumulation curves",
              "Phosphocreatine buffer recovery dynamics",
            ],
            resources: [
              { name: "Energy Pathways Diagnostics Sheet.pdf", size: "1.7 MB", type: "PDF Guide" }
            ],
            notes: "Interval training must respect cellular kinetics. Resting too early during anaerobic conditioning blunts glycolytic adaptation. Keep recovery intervals strictly controlled.",
            initialComments: [
              { user: "Kyle Reese", role: "Athlete", time: "1 week ago", text: "The diagram mapping out the oxidative crossover point is pure gold." }
            ]
          },
          {
            id: "met-1-2",
            title: "Mitochondrial Biogenesis Protocols",
            duration: "19:35",
            durationSec: 1175,
            plan: "PRO",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-performing-a-kettlebell-swing-training-40277-large.mp4",
            description: "How to trigger the growth of new mitochondria through specific, low-intensity aerobic pathways (Zone 2). Discover the cellular messengers (PGC-1alpha) that orchestrate metabolic remodeling and VO2 max efficiency.",
            difficulty: "Advanced",
            accreditation: "FitMind Neuro-Science Certified",
            checkpoints: [
              "PGC-1alpha signaling cascades during aerobic exercise",
              "Zone 2 heart rate calculations and validation",
              "Nutritional strategies to maximize mitochondrial density",
            ],
            resources: [
              { name: "Zone 2 Cardiovascular Calculator.xlsx", size: "1.2 MB", type: "Excel Tracker" },
              { name: "Mitochondrial Pathways Paper.pdf", size: "4.1 MB", type: "PDF Document" }
            ],
            notes: "Mitochondrial gains are slow and steady. Zone 2 training must be kept strict—if you pass the lactate threshold even briefly, you blunt the oxidative pathways. Stay patient.",
            initialComments: [
              { user: "Dr. Lisa Vance", role: "Cardiologist", time: "6 days ago", text: "Beautifully accurate scientific explanation of Zone 2's effect on cellular respiration." }
            ]
          }
        ]
      }
    ]
  },
  neuro: {
    title: "Neurological Adaptation Hub",
    icon: "🧠",
    duration: "10 Weeks",
    level: "Advanced",
    modules: [
      {
        moduleName: "Module 01: Motor Unit Mechanics",
        lectures: [
          {
            id: "neu-1-1",
            title: "Henneman Size Principle",
            duration: "16:50",
            durationSec: 1010,
            plan: "FREE",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-performing-a-kettlebell-swing-training-40277-large.mp4",
            description: "Unlock the neurological pathway of muscular recruitment. We detail Henneman's Size Principle—explaining how the central nervous system recruits motor units sequentially, and how to intentionally force high-threshold motor unit recruitment for explosive power.",
            difficulty: "Advanced",
            accreditation: "FitMind Neuro-Science Certified",
            checkpoints: [
              "Low vs High-threshold motor unit dynamics",
              "Neural frequency and rate coding properties",
              "Post-activation potentiation (PAP) protocols",
            ],
            resources: [
              { name: "Henneman Sequence Recruitment Guide.pdf", size: "3.5 MB", type: "PDF Guide" },
              { name: "Neurological Overload Program.docx", size: "900 KB", type: "Word Document" }
            ],
            notes: "To recruit high-threshold motor units early in a set, force must be exerted with maximum intent. Move the concentric phase as fast as possible, regardless of the load on the bar.",
            initialComments: [
              { user: "Tyler Durden", time: "2 weeks ago", text: "Explosive intent transformed my deadlift. Broke through a 6-month plateau!" }
            ]
          },
          {
            id: "neu-1-2",
            title: "Central Nervous System Fatigue",
            duration: "22:10",
            durationSec: 1330,
            plan: "PRO",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-gym-member-doing-kettlebell-swings-40348-large.mp4",
            description: "Muscle fatigue is only half the battle. Study neurotransmitter depletion, autonomic system stress, and how systemic nervous system drain (CNS fatigue) impacts biomechanical safety and force capacity.",
            difficulty: "Elite",
            accreditation: "FitMind Neuro-Science • 2.5 CEUs",
            checkpoints: [
              "Neurotransmitter (Acetylcholine, Dopamine) depletion markers",
              "Sympathovagal balance and Heart Rate Variability (HRV) metrics",
              "CNS recovery cycles and sleep architecture optimization",
            ],
            resources: [
              { name: "CNS Fatigue Diagnostic Checklist.xlsx", size: "2.1 MB", type: "Excel Tool" },
              { name: "HRV Tracking & Auto-regulation Guide.pdf", size: "2.8 MB", type: "PDF Guide" }
            ],
            notes: "If your grip strength drops by more than 10% in the morning, your CNS is fatigued. Deload immediately to protect spinal cord integrity and motor output.",
            initialComments: [
              { user: "Coach Marcus", role: "Trainer", time: "1 week ago", text: "This fatigue tracker is a life saver for coaching clients under heavy lifting phases." }
            ]
          }
        ]
      }
    ]
  }
};

export default function TrainingPage() {
  // ----------------------------------------------------
  // States
  // ----------------------------------------------------
  const [activePathKey, setActivePathKey] = useState<string>("hypertrophy");
  const activePath = curriculumData[activePathKey];

  // Active Lecture (Default to first lecture of first module)
  const [activeLecture, setActiveLecture] = useState<Lecture>(activePath.modules[0].lectures[0]);

  // Tabbed Player Details (about, resources, notes, discussion)
  const [activeTab, setActiveTab] = useState<string>("about");

  // Video Playing State Simulation
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Toast notifications for mock downloads
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Discussion state (Local In-Memory additions)
  const [commentFeed, setCommentFeed] = useState<Lecture["initialComments"]>(activeLecture.initialComments);
  const [newCommentText, setNewCommentText] = useState<string>("");

  // Biomechanics Diagnostic Quiz Wizard States
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState({
    goal: "",
    bottleneck: "",
    level: ""
  });
  const [quizAnalyzing, setQuizAnalyzing] = useState<boolean>(false);
  const [quizRecommendation, setQuizRecommendation] = useState<{
    path: string;
    description: string;
    accreditation: string;
    coach: string;
    coachTitle: string;
    avatar: string;
    metrics: { label: string; val: string }[];
  } | null>(null);

  // ----------------------------------------------------
  // Effects
  // ----------------------------------------------------
  // Sync lecture comments when lecture changes
  useEffect(() => {
    setCommentFeed(activeLecture.initialComments);
    // Reset video states
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [activeLecture]);

  // Change default lecture when path changes
  useEffect(() => {
    const defaultLec = activePath.modules[0].lectures[0];
    setActiveLecture(defaultLec);
  }, [activePathKey]);

  // Simulation timer for video progress bar
  useEffect(() => {
    let interval: any;
    if (isPlaying && videoRef.current) {
      interval = setInterval(() => {
        if (videoRef.current) {
          setCurrentTime(Math.floor(videoRef.current.currentTime));
          // If video completed
          if (videoRef.current.ended) {
            setIsPlaying(false);
            setCurrentTime(0);
          }
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // ----------------------------------------------------
  // Action Handlers
  // ----------------------------------------------------
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoadingVideo(true);
        // Play with delayed spinner for premium tech loading simulation
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setIsLoadingVideo(false);
              })
              .catch((err) => {
                setIsPlaying(false);
                setIsLoadingVideo(false);
                console.error("Video play failed: ", err);
              });
          }
        }, 600);
      }
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const pct = clickX / width;
      const targetSec = pct * activeLecture.durationSec;
      videoRef.current.currentTime = targetSec;
      setCurrentTime(Math.floor(targetSec));
    }
  };

  const triggerDownload = (fileName: string) => {
    setToastMessage(`Downloading: ${fileName}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      user: "You (FitMind Learner)",
      time: "Just now",
      text: newCommentText.trim()
    };

    setCommentFeed(prev => [...prev, newComment]);
    setNewCommentText("");
  };

  // Diagnostic Quiz Helpers
  const selectOption = (field: "goal" | "bottleneck" | "level", val: string) => {
    setQuizAnswers(prev => ({ ...prev, [field]: val }));
  };

  const nextStep = () => {
    if (quizStep < 3) {
      setQuizStep(prev => prev + 1);
    } else {
      // Analyze results!
      setQuizAnalyzing(true);
      setTimeout(() => {
        calculateQuizRecommendation();
        setQuizAnalyzing(false);
        setQuizStep(4); // Results step
      }, 1500);
    }
  };

  const prevStep = () => {
    if (quizStep > 1) {
      setQuizStep(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({ goal: "", bottleneck: "", level: "" });
    setQuizRecommendation(null);
  };

  const calculateQuizRecommendation = () => {
    const { goal, bottleneck, level } = quizAnswers;

    // Custom recommendations algorithm
    if (goal === "hypertrophy" || bottleneck === "plateau") {
      setQuizRecommendation({
        path: "Hypertrophy Masterclass",
        description: "Focus on maximizing active mechanical tension and structural sarcomere growth. Donovan Barker's advanced periodization will break your strength plateau without joint strain.",
        accreditation: "FitMind Academy Certified • 8-Week Blueprint",
        coach: "Donovan Barker",
        coachTitle: "NASM CPT • Kinetic Specialist",
        avatar: "👑",
        metrics: [
          { label: "Optimal Mechanical Load", val: "72% - 85% 1RM" },
          { label: "Recommended Frequency", val: "4 Sessions / Wk" },
          { label: "Mechanical Tension Focus", val: "94% Index" }
        ]
      });
    } else if (goal === "energetics" || bottleneck === "fatigue") {
      setQuizRecommendation({
        path: "Metabolic & Endurance Protocol",
        description: "Focus on mitochondrial biogenesis, lactate threshold buffering, and Zone 2 heart rate periodization overseen by Sarah Jenkins to combat metabolic fatigue.",
        accreditation: "NSCA Approved CEUs • 6-Week Protocol",
        coach: "Sarah Jenkins",
        coachTitle: "NASM CPT • Precision Nutrition L2",
        avatar: "💪",
        metrics: [
          { label: "Aerobic Capacity Crossover", val: "138-144 BPM" },
          { label: "Mitochondrial Density Target", val: "+22% Scaling" },
          { label: "Rest Interval Coefficient", val: "1:1 Ratio" }
        ]
      });
    } else {
      setQuizRecommendation({
        path: "Neurological Adaptation Hub",
        description: "Focus on motor unit recruitment frequency, rate coding mechanics, and post-activation potentiation to correct structural imbalances and neural drive bottlenecks.",
        accreditation: "FitMind Neuro-Science Certified • 10-Week Hub",
        coach: "Marcus Thorne",
        coachTitle: "NASM PES • Corrective Spec.",
        avatar: "⚡",
        metrics: [
          { label: "CNS Recalibration Cycle", val: "72 Hours" },
          { label: "Motor Unit Neural Frequency", val: "48 Hz Peak" },
          { label: "Active Proprioceptive Load", val: "High Focus" }
        ]
      });
    }
  };

  const pctPlayed = (currentTime / activeLecture.durationSec) * 100;

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Decorative Glows */}
      <div className={styles.glow}></div>
      <div className={styles.glowSecond}></div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <span className={styles.badge}>FitMind AI Video Academy</span>
        <h1 className="heading-xl title">
          Educational <span className="text-gradient">Training Academy</span>
        </h1>
        <p className={styles.subtitle}>
          Elevate your physical and kinetic intelligence. Dive into clinical exercise mechanics, advanced periodization schemas, and neurological adapters designed directly by accredited NASM coaches.
        </p>

        {/* Stats Ribbon */}
        <div className={styles.statsRibbon}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>50+ Hours</span>
            <span className={styles.statLabel}>Video Curriculum</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>NASM Accredited</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>12,400+</span>
            <span className={styles.statLabel}>Athletes Enrolled</span>
          </div>
        </div>
      </section>

      {/* Main Academy Dashboard Grid */}
      <section className={styles.academyGrid}>
        
        {/* Left Side: Interactive Video Player Console */}
        <div className={styles.playerConsole}>
          <div className={styles.playerContainer}>
            {/* Real HTML5 video tag using royalty free high quality workout preview loops */}
            <video
              ref={videoRef}
              className={styles.videoElement}
              src={activeLecture.videoUrl}
              loop
              playsInline
              onClick={handlePlayPause}
            />

            {/* Poster Overlay when not playing/started */}
            {!isPlaying && currentTime === 0 && (
              <div className={styles.videoPosterOverlay}>
                <div className={styles.badge}>{activeLecture.plan} LESSON</div>
                <h3 className={styles.posterTitle}>{activeLecture.title}</h3>
                <p className={styles.posterDesc}>
                  Difficulty: <strong style={{ color: "#fff" }}>{activeLecture.difficulty}</strong> • Length: <strong style={{ color: "#fff" }}>{activeLecture.duration}</strong>
                </p>
                <button className={styles.playBigBtn} onClick={handlePlayPause} aria-label="Play Lesson video">
                  <svg width="30" height="30" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}

            {/* Simulated Loading Spinner */}
            {isLoadingVideo && (
              <div className={styles.loadingSpinner}></div>
            )}

            {/* Custom Interactive Player Controls */}
            <div className={styles.controlsOverlay}>
              {/* Scrubber */}
              <div className={styles.scrubberContainer}>
                <div className={styles.progressTrack} onClick={handleScrub}>
                  <div className={styles.progressBar} style={{ width: `${pctPlayed}%` }}></div>
                </div>
                <span className={styles.timeLabel}>
                  {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")} / {activeLecture.duration}
                </span>
              </div>

              {/* Action Rows */}
              <div className={styles.controlsRow}>
                <div className={styles.leftControls}>
                  <button className={styles.controlBtn} onClick={handlePlayPause} aria-label={isPlaying ? "Pause video" : "Play video"}>
                    {isPlaying ? (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className={styles.volumeContainer}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                    </svg>
                    <div className={styles.volumeTrack}>
                      <div className={styles.volumeBar}></div>
                    </div>
                  </div>
                </div>

                <div className={styles.rightControls}>
                  <span className={styles.badgeLive}>SIMULATION STREAM</span>
                  
                  <select 
                    className={styles.speedSelector} 
                    value={playbackRate} 
                    onChange={handleSpeedChange}
                    aria-label="Playback speed"
                  >
                    <option value="0.75">0.75x</option>
                    <option value="1">1.0x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2.0x</option>
                  </select>

                  <button className={styles.controlBtn} aria-label="Fullscreen">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Panel */}
          <div className={styles.dashboardPanel}>
            <div className={styles.tabsHeader}>
              <button 
                className={`${styles.dashTab} ${activeTab === "about" ? styles.activeDashTab : ""}`}
                onClick={() => setActiveTab("about")}
              >
                About Lesson
              </button>
              <button 
                className={`${styles.dashTab} ${activeTab === "resources" ? styles.activeDashTab : ""}`}
                onClick={() => setActiveTab("resources")}
              >
                Resources ({activeLecture.resources.length})
              </button>
              <button 
                className={`${styles.dashTab} ${activeTab === "notes" ? styles.activeDashTab : ""}`}
                onClick={() => setActiveTab("notes")}
              >
                Donovan's Notes
              </button>
              <button 
                className={`${styles.dashTab} ${activeTab === "discussion" ? styles.activeDashTab : ""}`}
                onClick={() => setActiveTab("discussion")}
              >
                Discussion ({commentFeed.length})
              </button>
            </div>

            {/* Tab content displays */}
            <div className={styles.tabContent}>
              {activeTab === "about" && (
                <div className={styles.aboutContainer}>
                  <div className={styles.lessonMetaRow}>
                    <div className={styles.lessonMeta}>
                      <span className={styles.lessonMetaLbl}>Target Difficulty</span>
                      <span className={styles.lessonMetaVal}>{activeLecture.difficulty}</span>
                    </div>
                    <div className={styles.lessonMeta}>
                      <span className={styles.lessonMetaLbl}>Accreditation</span>
                      <span className={styles.lessonMetaVal} style={{ color: "var(--color-accent)" }}>{activeLecture.accreditation}</span>
                    </div>
                    <div className={styles.lessonMeta}>
                      <span className={styles.lessonMetaLbl}>Access Level</span>
                      <span className={styles.lessonMetaVal}>{activeLecture.plan}</span>
                    </div>
                  </div>
                  <p className={styles.aboutDesc}>{activeLecture.description}</p>
                  
                  <div style={{ marginTop: "1rem" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.8rem", color: "#fff" }}>Key Learning Checkpoints:</h4>
                    <div className={styles.checklist}>
                      {activeLecture.checkpoints.map((pt, i) => (
                        <div key={i} className={styles.checklistItem}>
                          <span className={styles.checkBullet}>✓</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div className={styles.resourcesList}>
                  {activeLecture.resources.map((res, i) => (
                    <div key={i} className={styles.resourceCard}>
                      <div className={styles.resourceInfo}>
                        <span className={styles.resourceTitle}>{res.name}</span>
                        <span className={styles.resourceMeta}>{res.type} • {res.size}</span>
                      </div>
                      <button 
                        className={styles.downloadBtn} 
                        onClick={() => triggerDownload(res.name)}
                        aria-label={`Download ${res.name}`}
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "notes" && (
                <div className={styles.notesPanel}>
                  <div className={styles.notesHeader}>
                    <span className={styles.notesIcon}>👑</span>
                    <span className={styles.notesTitle}>Trainer Advice Block</span>
                  </div>
                  <p className={styles.notesText}>"{activeLecture.notes}"</p>
                  <div className={styles.notesSignature}>— Donovan Barker, FitMind AI Founder</div>
                </div>
              )}

              {activeTab === "discussion" && (
                <div className={styles.discussionBoard}>
                  <div className={styles.commentsFeed}>
                    {commentFeed.map((comment, i) => (
                      <div key={i} className={styles.commentCard}>
                        <div className={styles.commentHeader}>
                          <span className={styles.commentUser}>
                            {comment.user}
                            {comment.role && <span className={styles.commentRole}>{comment.role}</span>}
                          </span>
                          <span className={styles.commentTime}>{comment.time}</span>
                        </div>
                        <p className={styles.commentText}>{comment.text}</p>
                      </div>
                    ))}
                  </div>

                  <form className={styles.commentForm} onSubmit={handleSubmitComment}>
                    <label htmlFor="comment-input" className={styles.formLabel}>Join the Discussion</label>
                    <textarea 
                      id="comment-input"
                      className={styles.commentInput} 
                      placeholder="Ask a physiological or execution question..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <button type="submit" className={styles.commentSubmitBtn}>Submit Comment</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Standalone Academy Curriculum Selector */}
        <div className={`${styles.curriculumBrowser} glass-panel`} style={{ padding: "2rem", height: "fit-content" }}>
          <h3 className={styles.cardTitle}>Academy Path</h3>
          <p className={styles.cardDesc}>Select a curated athletic path below to unlock structured physiological modules.</p>

          <div className={styles.pathSelector}>
            {Object.entries(curriculumData).map(([key, value]) => (
              <button
                key={key}
                className={`${styles.pathBtn} ${activePathKey === key ? styles.activePathBtn : ""}`}
                onClick={() => setActivePathKey(key)}
              >
                <span className={styles.pathIcon}>{value.icon}</span>
                <div className={styles.pathText}>
                  <span className={styles.pathTitle}>{value.title}</span>
                  <span className={styles.pathMeta}>{value.duration} • {value.level}</span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.modulesContainer}>
            {activePath.modules.map((mod, modIdx) => (
              <div key={modIdx} className={styles.moduleWrapper}>
                <h4 className={styles.moduleTitle}>{mod.moduleName}</h4>
                <div className={styles.lecturesList}>
                  {mod.lectures.map((lec) => (
                    <button
                      key={lec.id}
                      className={`${styles.lectureItem} ${activeLecture.id === lec.id ? styles.activeLectureItem : ""}`}
                      onClick={() => setActiveLecture(lec)}
                    >
                      <div className={styles.lectureTitleBlock}>
                        <span className={styles.lectureName}>{lec.title}</span>
                        <span className={styles.lectureDuration}>{lec.duration} • Video Lesson</span>
                      </div>
                      <div className={styles.statusIndicator}>
                        {activeLecture.id === lec.id ? (
                          <span className={styles.playIconMini}>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                            </svg>
                          </span>
                        ) : lec.plan === "FREE" ? (
                          <span className={styles.freeBadge}>FREE</span>
                        ) : (
                          <span className={styles.proBadge}>PRO</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <Link href="/programs" className="btn-primary" style={{ display: "block", textAlign: "center", fontSize: "0.9rem", padding: "10px 15px" }}>
              Unlock All Pro Lectures
            </Link>
          </div>
        </div>

      </section>

      {/* Interactive Biomechanics Diagnostic Quiz */}
      <section className={styles.quizSection} id="diagnostic">
        <div className={styles.quizHeader}>
          <div className={styles.badge}>A.I. DIAGNOSTIC INTERFACE</div>
          <h2 className="heading-lg" style={{ marginBottom: "0.5rem" }}>Biomechanics Path Finder</h2>
          <p className="text-md text-gray" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Analyze your physical structure and training bottlenecks. Our diagnostic calculator recommends your optimal FitMind path in seconds.
          </p>
        </div>

        <div className={`${styles.quizPanel} glass-panel`}>
          {quizStep <= 3 && (
            <div>
              {/* Progress dots */}
              <div className={styles.progressContainer}>
                <div className={styles.progressLine}></div>
                <div className={styles.progressFill} style={{ width: `${((quizStep - 1) / 2) * 100}%` }}></div>
                <div className={`${styles.progressDot} ${quizStep >= 1 ? styles.activeDot : ""} ${quizStep > 1 ? styles.completedDot : ""}`}>1</div>
                <div className={`${styles.progressDot} ${quizStep >= 2 ? styles.activeDot : ""} ${quizStep > 2 ? styles.completedDot : ""}`}>2</div>
                <div className={`${styles.progressDot} ${quizStep >= 3 ? styles.activeDot : ""}`}>3</div>
              </div>

              {/* Step content */}
              {quizStep === 1 && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <h3 className={styles.stepTitle}>Select Your Primary Training Goal</h3>
                  <div className={styles.optionsGrid}>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.goal === "hypertrophy" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("goal", "hypertrophy")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.goal === "hypertrophy" ? styles.activeOptionName : ""}`}>Max Hypertrophy</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>Build structural contractile proteins, maximize sarcoplasmic density, and enhance pure athletic size.</p>
                    </button>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.goal === "energetics" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("goal", "energetics")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.goal === "energetics" ? styles.activeOptionName : ""}`}>Metabolic Efficiency</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>Optimize ATP generation pathways, push VO2 max limits, and build elite fat-burning respiratory endurance.</p>
                    </button>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.goal === "neural" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("goal", "neural")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.goal === "neural" ? styles.activeOptionName : ""}`}>Neurological Force</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>Maximize rate coding dynamics, sequential motor unit recruitment, and CNS explosive force production.</p>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <h3 className={styles.stepTitle}>Identify Your Primary Kinetic Bottleneck</h3>
                  <div className={styles.optionsGrid}>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.bottleneck === "plateau" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("bottleneck", "plateau")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.bottleneck === "plateau" ? styles.activeOptionName : ""}`}>Strength Plateau</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>Stuck at the same lift weights for over 6 weeks. Muscle recruitment feels sluggish or capped.</p>
                    </button>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.bottleneck === "fatigue" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("bottleneck", "fatigue")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.bottleneck === "fatigue" ? styles.activeOptionName : ""}`}>Metabolic Burnout</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>Lacking systemic energy mid-workout. Breathing cap hits quickly, leaving sets unfinished.</p>
                    </button>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.bottleneck === "discomfort" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("bottleneck", "discomfort")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.bottleneck === "discomfort" ? styles.activeOptionName : ""}`}>Joint Discomfort</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>Experiencing nagging elbow, knee, or lumbar compression. Stiff tissues blocking range of motion.</p>
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <h3 className={styles.stepTitle}>Specify Your Athletic Experience</h3>
                  <div className={styles.optionsGrid}>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.level === "beginner" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("level", "beginner")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.level === "beginner" ? styles.activeOptionName : ""}`}>Beginner / Novice</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>0 - 1 years of consistent weight lifting. Still learning standard movement coordinates and form.</p>
                    </button>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.level === "intermediate" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("level", "intermediate")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.level === "intermediate" ? styles.activeOptionName : ""}`}>Intermediate Lifter</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>1 - 4 years of structured lifting. Familiar with linear periodization, progressive overloading, and form basics.</p>
                    </button>
                    <button 
                      className={`${styles.optionCard} ${quizAnswers.level === "advanced" ? styles.selectedOptionCard : ""}`}
                      onClick={() => selectOption("level", "advanced")}
                    >
                      <div className={styles.optionHeader}>
                        <span className={`${styles.optionName} ${quizAnswers.level === "advanced" ? styles.activeOptionName : ""}`}>Advanced Athlete</span>
                        <div className={styles.optionCircle}></div>
                      </div>
                      <p className={styles.optionDesc}>4+ years of dedicated coaching, heavy lifting, or competition. High baseline load tolerance and neural output.</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className={styles.quizNav}>
                {quizStep > 1 && (
                  <button className={styles.quizBackBtn} onClick={prevStep}>Back</button>
                )}
                <button 
                  className={styles.quizNextBtn} 
                  disabled={
                    (quizStep === 1 && !quizAnswers.goal) || 
                    (quizStep === 2 && !quizAnswers.bottleneck) || 
                    (quizStep === 3 && !quizAnswers.level)
                  }
                  onClick={nextStep}
                  style={{
                    opacity: ((quizStep === 1 && !quizAnswers.goal) || (quizStep === 2 && !quizAnswers.bottleneck) || (quizStep === 3 && !quizAnswers.level)) ? 0.5 : 1
                  }}
                >
                  {quizStep === 3 ? "Run Diagnostic Analysis" : "Continue"}
                </button>
              </div>
            </div>
          )}

          {/* Loading state for quiz results */}
          {quizAnalyzing && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 0", gap: "1.5rem" }}>
              <div className={styles.loadingSpinner} style={{ position: "relative" }}></div>
              <p className="text-md text-gray" style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Calculating Biomechanical Kinematics...
              </p>
            </div>
          )}

          {/* Results Step */}
          {quizStep === 4 && quizRecommendation && (
            <div className={styles.resultCard}>
              <div className={styles.recBadge}>RECOMMENDED PATHWAY</div>
              <h3 className={styles.resultTitle}>Your Biomechanics Recommendation</h3>
              <p className={styles.resultSubtitle}>Based on goals, neuromuscular bottlenecks, and metabolic loading limits.</p>

              <div className={styles.resultBox}>
                <h4 className={styles.recPathName}>{quizRecommendation.path}</h4>
                <p className="text-md text-gray" style={{ maxWidth: "580px", margin: "0 auto 1.5rem", lineHeight: "1.6" }}>
                  {quizRecommendation.description}
                </p>
                <span className="text-sm" style={{ color: "var(--color-primary)", fontWeight: 600, display: "block", marginBottom: "2rem" }}>
                  {quizRecommendation.accreditation}
                </span>

                <div className={styles.recStats}>
                  {quizRecommendation.metrics.map((met, index) => (
                    <div key={index} className={styles.recStat}>
                      <span className={styles.recStatLbl}>{met.label}</span>
                      <span className={styles.recStatVal}>{met.val}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.recCoachCard}>
                  <div className={styles.coachAvatar}>{quizRecommendation.avatar}</div>
                  <div className={styles.coachInfo}>
                    <span className={styles.coachName}>{quizRecommendation.coach}</span>
                    <span className={styles.coachRole}>{quizRecommendation.coachTitle}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <button className={styles.quizResetBtn} onClick={resetQuiz}>Restart Quiz</button>
                <Link href="/programs" className="btn-primary">
                  Enroll in Recommended Path
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sync Section with Mobile App */}
      <section className={styles.appSyncSection}>
        <div className={styles.appSyncContainer}>
          <div className={styles.appText}>
            <div className={styles.badge}>MOBILE INTEGRATION</div>
            <h2 className="heading-lg appTitle">
              Academy Sync with <span className="text-gradient">FitMind Mobile App</span>
            </h2>
            <p className={styles.appDesc}>
              Do not leave your knowledge at your desk. Seamlessly synchronize completed video lessons, dynamic anatomical trackers, and biometric metrics directly with the FitMind AI mobile suite.
            </p>

            <div className={styles.appFeatureList}>
              <div className={styles.appFeature}>
                <div className={styles.appFeatureIcon}>1</div>
                <div>
                  <h4 className={styles.appFeatureTitle}>Offline Video Lectures</h4>
                  <p className={styles.appFeatureDesc}>Download all accredited curriculum modules directly to your phone for offline gym reference.</p>
                </div>
              </div>
              <div className={styles.appFeature}>
                <div className={styles.appFeatureIcon}>2</div>
                <div>
                  <h4 className={styles.appFeatureTitle}>Live Biometric Logging</h4>
                  <p className={styles.appFeatureDesc}>Auto-log set parameters, rest intervals, and cardiovascular zones based on your calculated quiz profiles.</p>
                </div>
              </div>
              <div className={styles.appFeature}>
                <div className={styles.appFeatureIcon}>3</div>
                <div>
                  <h4 className={styles.appFeatureTitle}>Direct Form Uploads</h4>
                  <p className={styles.appFeatureDesc}>Record your kinetic lift paths in the app. Submit videos directly to NASM coaches for form review.</p>
                </div>
              </div>
            </div>

            <div className={styles.storeButtons}>
              <button className={styles.storeBtn} aria-label="Download on the App Store">
                <span className={styles.storeIcon}></span>
                <div className={styles.storeLabel}>
                  <span className={styles.storeSub}>Download on the</span>
                  <span className={styles.storeMain}>App Store</span>
                </div>
              </button>
              <button className={styles.storeBtn} aria-label="Get it on Google Play">
                <span className={styles.storeIcon}>▶</span>
                <div className={styles.storeLabel}>
                  <span className={styles.storeSub}>GET IT ON</span>
                  <span className={styles.storeMain}>Google Play</span>
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Phone Mockup Graphic */}
          <div className={styles.mockupContainer}>
            <div className={styles.phoneGlow}></div>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneContent}>
                <div className={styles.phoneHeader}>
                  <span>9:41</span>
                  <span>100% [🔋]</span>
                </div>
                <div className={styles.phoneBody}>
                  <div className={styles.appMockIcon}>🧠</div>
                  <div>
                    <h3 className={styles.phoneName}>FitMind AI</h3>
                    <span className={styles.phoneBadge}>Accredited Core</span>
                  </div>
                  <p className={styles.phoneDesc}>
                    Synchronizing training academy logs and loading custom biomechanical parameters...
                  </p>
                  <div className={styles.phoneLoading}>
                    <div className={styles.phoneLoadingFill}></div>
                  </div>
                </div>
                <div className={styles.phoneFooter}>
                  <span>SECURED CONNECTION ESTABLISHED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating toast notification */}
      {toastMessage && (
        <div className={styles.toast} role="alert">
          <div className={styles.toastCheck}>✓</div>
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
