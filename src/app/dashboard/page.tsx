"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// --- Interfaces ---
interface TrainerApplication {
  id: string;
  name: string;
  specialization: string;
  certId: string;
  document: string;
}

interface ClientProfile {
  id: string;
  name: string;
  goal: string;
  compliance: number;
  status: string;
  notes: string;
}

export default function DashboardPage() {
  const [role, setRole] = useState<"learner" | "trainer" | "admin" | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "academy" | "settings">("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings State
  const [settings, setSettings] = useState({ emailAlerts: true, smsAlerts: false, autoPlay: true });

  // Notifications State
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 1, title: 'Order Shipped: FM-X9K', time: '10m ago', icon: '📦', read: false },
    { id: 2, title: 'New Module Available', time: '1h ago', icon: '🎓', read: false },
    { id: 3, title: 'Coach Donovan left a note', time: '2h ago', icon: '📝', read: false }
  ]);
  const unreadCount = notifs.filter(n => !n.read).length;

  // Learner states
  const [activeLesson, setActiveLesson] = useState<{ title: string; course: string; duration: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Trainer Hub states
  const [clients, setClients] = useState<ClientProfile[]>([
    { id: "1", name: "Sarah Jenkins", goal: "Hypertrophy & Neural adaptation", compliance: 94, status: "Active", notes: "Excelling in leg-drive tension adjustments. Power output up 8%." },
    { id: "2", name: "Marcus Thorne", goal: "Neural Force Adaptations", compliance: 88, status: "Active", notes: "Focusing on eccentric hamstring loading tempos." },
    { id: "3", name: "Alex Rivers", goal: "Cardiovascular VO2 Elite Training", compliance: 72, status: "Needs Review", notes: "Missed two cardiorespiratory baseline checks this week." }
  ]);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [clientNoteText, setClientNoteText] = useState("");

  // Admin Command Center states
  const [applications, setApplications] = useState<TrainerApplication[]>([
    { id: "app-1", name: "Dr. Sarah Jenkins", specialization: "Corrective Kinetics & Biomechanics", certId: "NASM-PES-88102", document: "nasm_specialist_degree.pdf" },
    { id: "app-2", name: "Marcus Thorne", specialization: "Kinetic Energetics & Lactate Conditioning", certId: "NSCA-CSCS-77112", document: "nsca_cscs_verified.pdf" },
    { id: "app-3", name: "Dr. Aaron Chen", specialization: "Neural recruitment and motor recruitment", certId: "ACSM-CEP-44910", document: "acsm_clinical_cert.pdf" }
  ]);

  // Mock Data for new features
  const [storeOrders, setStoreOrders] = useState([
    { id: "ORD-9912", date: "2026-05-18", item: "FitMind Pro Lifting Belt", total: "$89.99", status: "Shipped" },
    { id: "ORD-9843", date: "2026-05-15", item: "Performance T-Shirt (M)", total: "$34.50", status: "Delivered" }
  ]);

  const [liveSessions, setLiveSessions] = useState([
    { id: "s1", client: "Sarah Jenkins", time: "Today, 14:00 (EST)", type: "Biomechanics Audit" },
    { id: "s2", client: "Marcus Thorne", time: "Tomorrow, 09:00 (EST)", type: "Neural Force Review" }
  ]);

  const [globalStoreOrders, setGlobalStoreOrders] = useState([
    { id: "ORD-9912", user: "Alex Rivers", item: "FitMind Pro Lifting Belt", status: "Shipped" },
    { id: "ORD-9913", user: "Jamie Cole", item: "Neural Pre-Workout", status: "Processing" },
    { id: "ORD-9914", user: "Samira Vance", item: "Performance T-Shirt (S)", status: "Processing" }
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get("role");
      if (roleParam === "learner" || roleParam === "trainer" || roleParam === "admin") {
        setRole(roleParam as "learner" | "trainer" | "admin");
      } else {
        // Fallback
        window.location.href = "/login";
      }

      // -- NEW: Load dynamic orders from localStorage --
      const savedOrders = localStorage.getItem('fitmind_orders');
      if (savedOrders) {
        try {
          const parsed = JSON.parse(savedOrders);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStoreOrders(prev => [...parsed, ...prev]);
          }
        } catch(e) { console.error("Error loading orders", e); }
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            triggerToast("Lesson completed! Academy progress updated.");
            return 100;
          }
          return prev + 2;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;
    setClients(prev => prev.map(c => (c.id === selectedClient.id ? { ...c, notes: clientNoteText } : c)));
    triggerToast(`Diagnostic note logged for ${selectedClient.name}!`);
    setSelectedClient(null);
    setClientNoteText("");
  };

  const handleApprove = (id: string, name: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    triggerToast(`Coach ${name} credentials fully VERIFIED!`);
  };

  const handleReject = (id: string, name: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    triggerToast(`Trainer application from ${name} rejected.`);
  };

  if (!role) {
    return <div className={styles.shell} style={{ alignItems: "center", justifyContent: "center" }}>Initializing secure terminal...</div>;
  }

  return (
    <div className={styles.shell}>
      {/* Background Ambient Glows */}
      <div className={styles.glow}></div>
      <div className={styles.glowSecond}></div>

      {/* --- SIDEBAR --- */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoMark}>FM</div>
          <div>
            <div className={styles.logoText}>FitMind AI</div>
            <div className={styles.logoSub}>Control Center</div>
          </div>
        </div>
        
        <div className={styles.sidebarNav}>
          <div className={styles.navSection}>Main Menu</div>
          <button 
            className={`${styles.navItem} ${activeTab === 'overview' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className={styles.navIcon}>
              {role === "learner" ? "🎓" : role === "trainer" ? "👑" : "⚙️"}
            </span>
            <span>Dashboard</span>
          </button>
          
          {role === "learner" && (
            <>
              <button 
                className={`${styles.navItem} ${activeTab === 'academy' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('academy')}
              >
                <span className={styles.navIcon}>📚</span>
                <span>My Academy</span>
              </button>
              
              <button 
                className={`${styles.navItem} ${activeTab === 'orders' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <span className={styles.navIcon}>📦</span>
                <span>My Orders</span>
              </button>
            </>
          )}
          
          {role === "trainer" && (
            <button className={styles.navItem}>
              <span className={styles.navIcon}>👥</span>
              <span>Client Roster</span>
            </button>
          )}
          
          {role === "admin" && (
            <button className={styles.navItem}>
              <span className={styles.navIcon}>📋</span>
              <span>Verifications</span>
            </button>
          )}
          
          <button 
            className={`${styles.navItem} ${activeTab === 'settings' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className={styles.navIcon}>🔧</span>
            <span>Settings</span>
          </button>
        </div>

        <div className={styles.sidebarFooter}>
          <Link href="/login" className={styles.signOutBtn}>
            <span className={styles.navIcon}>🚪</span>
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className={styles.main}>
        {/* TOP HEADER */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <h2 className={styles.headerTitle}>
              {role === "learner" && "Learner Portal"}
              {role === "trainer" && "Trainer Hub"}
              {role === "admin" && "Admin Command Center"}
            </h2>
            <div className={styles.headerSub}>Platform access established securely.</div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notifContainer}>
              <button className={styles.notifBtn} onClick={() => setShowNotifs(!showNotifs)}>
                🔔
                {unreadCount > 0 && <span className={styles.notifBadge}>{unreadCount}</span>}
              </button>
              
              {showNotifs && (
                <div className={styles.notifDropdown}>
                  <div className={styles.notifHeader}>
                    <h3>Notifications</h3>
                    <button className={styles.notifClearBtn} onClick={() => setNotifs(notifs.map(n => ({...n, read: true})))}>Mark all read</button>
                  </div>
                  <div className={styles.notifList}>
                    {notifs.map(n => (
                      <div key={n.id} className={styles.notifItem} style={{ opacity: n.read ? 0.5 : 1 }}>
                        <span className={styles.notifItemIcon}>{n.icon}</span>
                        <div className={styles.notifItemContent}>
                          <span className={styles.notifItemTitle}>{n.title}</span>
                          <span className={styles.notifItemTime}>{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.userChip}>
              <div className={styles.userAvatar}>
                {role === "admin" ? "AD" : role === "trainer" ? "TR" : "LR"}
              </div>
              <div className={styles.userName}>
                {role === "admin" ? "System Admin" : role === "trainer" ? "Head Coach" : "Athlete"}
              </div>
              <div className={`${styles.roleBadge} ${role === "learner" ? styles.roleLearner : role === "trainer" ? styles.roleTrainer : styles.roleAdmin}`}>
                {role}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className={styles.content}>
          {activeTab === 'overview' ? (
            <>
              <h1 className={styles.pageHeading}>Overview</h1>
              <p className={styles.pageDesc}>Here is your daily summary and platform telemetry.</p>

              {/* LEARNER VIEW */}
              {role === "learner" && (
                <div className={styles.gridFade}>
              <div className={styles.metricsRow}>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Workouts</span>
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>+12%</span>
                  </div>
                  <div className={styles.metricValue}>24</div>
                  <div className={styles.metricFooter}>Total sessions locked</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Streak</span>
                    <span className={`${styles.badge} ${styles.badgeOrange}`}>Fire</span>
                  </div>
                  <div className={styles.metricValue}>5 Days</div>
                  <div className={styles.metricFooter}>Consecutive logs</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Load Index</span>
                    <span className={`${styles.badge} ${styles.badgeBlue}`}>Elite</span>
                  </div>
                  <div className={styles.metricValue}>92%</div>
                  <div className={styles.metricFooter}>Motor adaptations</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>VO2 Max</span>
                    <span className={`${styles.badge} ${styles.badgePurple}`}>Top 2%</span>
                  </div>
                  <div className={styles.metricValue}>54.2</div>
                  <div className={styles.metricFooter}>ml/kg/min baseline</div>
                </div>
              </div>

              <div className={styles.split}>
                {/* Enrolled Programs moved to My Academy tab */}

                <div className={styles.panel} style={{ flex: 1 }}>
                  <h3 className={styles.panelTitle}>🧬 Intake Profile</h3>
                  <p className={styles.panelDesc}>Current adaptation goals</p>
                  
                  <div className={styles.infoGroup}>
                    <div className={styles.infoLabel}>Priority:</div>
                    <div className={styles.infoValue}>Hypertrophy & Neural Recruitment</div>
                  </div>
                  <div className={styles.infoGroup}>
                    <div className={styles.infoLabel}>Status:</div>
                    <div className={`${styles.statusPill} ${styles.statusActive}`}>Evaluated</div>
                  </div>

                  <div className={styles.coachCard}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div className={styles.coachAvatar}>DB</div>
                      <div>
                        <div className={styles.coachName}>Donovan Barker</div>
                        <div className={styles.coachRole}>Performance Coach</div>
                      </div>
                    </div>
                    <p className={styles.coachQuote}>"Our focus tomorrow is auditing force leaking during transitions. Get ready."</p>
                  </div>
                </div>
              </div>

              <div className={styles.split} style={{ marginTop: "1.5rem" }}>
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>💳 Subscription Management</h3>
                  <p className={styles.panelDesc}>Manage your active platform access tier.</p>
                  
                  <div className={`${styles.subCard} ${styles.subCardActive}`}>
                    <div className={styles.subHeader}>
                      <div className={styles.subTitle}>Pro Athlete Tier</div>
                      <div className={styles.statusPill} style={{ background: "rgba(0,255,102,0.1)", color: "#00ff66", border: "1px solid rgba(0,255,102,0.2)" }}>Active</div>
                    </div>
                    <div className={styles.subPrice}>$49<span className={styles.subPeriod}>/mo</span></div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>Renews on June 18, 2026</div>
                    
                    <ul className={styles.subFeatures}>
                      <li>Full Academy Access</li>
                      <li>Basic Biomechanics Audits</li>
                      <li>Community Access</li>
                    </ul>
                  </div>

                  <h4 style={{ fontSize: "0.9rem", marginTop: "1.5rem", marginBottom: "0.75rem" }}>Available Upgrades</h4>
                  <div className={styles.subCard}>
                    <div className={styles.subHeader}>
                      <div className={styles.subTitle}>Elite Mentorship</div>
                    </div>
                    <div className={styles.subPrice}>$199<span className={styles.subPeriod}>/mo</span></div>
                    <ul className={styles.subFeatures} style={{ marginTop: "0.5rem" }}>
                      <li>Weekly 1-on-1 Coach Calls</li>
                      <li>Custom Neural Programs</li>
                    </ul>
                    <button className={styles.btnUpgrade} onClick={() => triggerToast("Redirecting to checkout...")}>Upgrade Plan</button>
                  </div>
                </div>

                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>🛍️ Order History</h3>
                  <p className={styles.panelDesc}>Your recent purchases from the FitMind shop.</p>
                  
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Item</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {storeOrders.map(order => (
                          <tr key={order.id}>
                            <td><span className={styles.monoCode}>{order.id}</span></td>
                            <td>{order.item}</td>
                            <td>
                              <span className={`${styles.labelPill} ${order.status === 'Shipped' ? styles.statusShipped : order.status === 'Processing' ? styles.statusProcessing : styles.statusDelivered}`}>{order.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TRAINER VIEW */}
          {role === "trainer" && (
            <div className={styles.gridFade}>
              <div className={styles.metricsRow}>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Active Clients</span>
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>Stable</span>
                  </div>
                  <div className={styles.metricValue}>12</div>
                  <div className={styles.metricFooter}>Direct tracking</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Hours Logged</span>
                    <span className={`${styles.badge} ${styles.badgeBlue}`}>Active</span>
                  </div>
                  <div className={styles.metricValue}>142</div>
                  <div className={styles.metricFooter}>Assessments done</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Avg Compliance</span>
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>Target Met</span>
                  </div>
                  <div className={styles.metricValue}>84.6%</div>
                  <div className={styles.metricFooter}>Weekly workouts</div>
                </div>
              </div>

              <div className={styles.split}>
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>👥 Performance Roster</h3>
                  <p className={styles.panelDesc}>Select a client to audit diagnostic history.</p>

                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Client</th>
                          <th>Goal</th>
                          <th>Compliance</th>
                          <th>Status</th>
                          <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map(c => (
                          <tr key={c.id}>
                            <td>
                              <div className={styles.clientCell}>
                                <div className={styles.clientAvatar}>{c.name.substring(0, 2)}</div>
                                <span>{c.name}</span>
                              </div>
                            </td>
                            <td>{c.goal}</td>
                            <td>
                              <div className={styles.miniBar}>
                                <div className={styles.miniBarFill} style={{ width: `${c.compliance}%`, background: c.compliance >= 90 ? "#00ff66" : c.compliance > 75 ? "#3399ff" : "#ff3366" }}></div>
                              </div>
                              <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{c.compliance}%</span>
                            </td>
                            <td>
                              <span className={`${styles.labelPill} ${c.status === "Active" ? styles.labelGreen : styles.labelRed}`}>{c.status}</span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <button className={styles.btnNote} onClick={() => { setSelectedClient(c); setClientNoteText(c.notes); }}>Add Note</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>👑 Credentials</h3>
                  <p className={styles.panelDesc}>Your verified accreditations.</p>
                  
                  <div className={styles.credBox}>
                    <div className={styles.credVerifiedRow}>
                      <span>VERIFIED HEAD COACH</span>
                      <div className={styles.greenDot}></div>
                    </div>
                    <div className={styles.credRow}>
                      <div className={styles.credLabel}>Specialization</div>
                      <div className={styles.credValue}>Cellular Energetics</div>
                    </div>
                    <div className={styles.credRow}>
                      <div className={styles.credLabel}>Accreditation ID</div>
                      <div className={styles.credValue}>NSCA-CSCS-12345</div>
                    </div>
                    <div className={styles.credRow}>
                      <div className={styles.credLabel}>Status</div>
                      <div className={`${styles.statusPill} ${styles.statusActive}`}>ACTIVE</div>
                    </div>
                  </div>

                  <div className={styles.alertBox}>
                    <h5>⚠️ Compliance Alert</h5>
                    <p>Alex Rivers compliance has slipped below the 80% limit. Review schedule.</p>
                  </div>
                </div>
              </div>

              <div className={styles.split} style={{ marginTop: "1.5rem" }}>
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>📅 Upcoming Live Sessions</h3>
                  <p className={styles.panelDesc}>Your scheduled 1-on-1 diagnostic reviews.</p>
                  
                  <div className={styles.sessionList}>
                    {liveSessions.map(session => (
                      <div key={session.id} className={styles.sessionItem}>
                        <div className={styles.sessionInfo}>
                          <span className={styles.sessionTime}>{session.time}</span>
                          <span className={styles.sessionClient}>{session.client}</span>
                          <span className={styles.sessionType}>{session.type}</span>
                        </div>
                        <button className={styles.btnJoin} onClick={() => triggerToast(`Opening live meeting room for ${session.client}...`)}>Join Call</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>💰 Revenue & Payouts</h3>
                  <p className={styles.panelDesc}>Your coaching distributions.</p>
                  
                  <div className={styles.revenueBlock}>
                    <div>
                      <div className={styles.revLabel}>Current Balance</div>
                      <div className={styles.revAmount}>$3,450</div>
                    </div>
                    <div>
                      <button className={styles.btnNote} onClick={() => triggerToast("Payout requested.")}>Request</button>
                    </div>
                  </div>
                  
                  <div className={styles.infoGroup}>
                    <div className={styles.infoLabel}>Next Automatic Payout:</div>
                    <div className={styles.infoValue}>June 1, 2026</div>
                  </div>
                  <div className={styles.infoGroup}>
                    <div className={styles.infoLabel}>YTD Earnings:</div>
                    <div className={styles.infoValue}>$18,920.00</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN VIEW */}
          {role === "admin" && (
            <div className={styles.gridFade}>
              <div className={styles.metricsRow}>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Platform Users</span>
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>+18%</span>
                  </div>
                  <div className={styles.metricValue}>1,280</div>
                  <div className={styles.metricFooter}>Total active athletes</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Active Coaches</span>
                    <span className={`${styles.badge} ${styles.badgeBlue}`}>Accredited</span>
                  </div>
                  <div className={styles.metricValue}>48</div>
                  <div className={styles.metricFooter}>NSCA / NASM verified</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricTitle}>Pending Queue</span>
                    <span className={`${styles.badge} ${applications.length > 0 ? styles.badgeAccent : styles.badgeGreen}`}>{applications.length > 0 ? "Needs Review" : "Clear"}</span>
                  </div>
                  <div className={styles.metricValue}>{applications.length}</div>
                  <div className={styles.metricFooter}>Applications awaiting audit</div>
                </div>
              </div>

              <div className={styles.splitFull}>
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>⚙️ Verification Queue</h3>
                  <p className={styles.panelDesc}>Audit coach applications and review uploaded credentials.</p>

                  {applications.length > 0 ? (
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Applicant</th>
                            <th>Specialization</th>
                            <th>License ID</th>
                            <th>Document</th>
                            <th style={{ textAlign: "right" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map(app => (
                            <tr key={app.id}>
                              <td>
                                <div className={styles.clientCell}>
                                  <div className={styles.clientAvatar}>{app.name.substring(0, 2)}</div>
                                  <span>{app.name}</span>
                                </div>
                              </td>
                              <td>{app.specialization}</td>
                              <td><span className={styles.monoCode}>{app.certId}</span></td>
                              <td><span className={styles.docLink}>📄 {app.document}</span></td>
                              <td>
                                <div className={styles.actionGroup}>
                                  <button className={styles.btnApprove} onClick={() => handleApprove(app.id, app.name)}>Approve</button>
                                  <button className={styles.btnReject} onClick={() => handleReject(app.id, app.name)}>Reject</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className={styles.queueEmpty}>
                      <div className={styles.queueEmptyCheck}>✓</div>
                      <div>
                        <h4>Queue is Empty</h4>
                        <p>All platform coaches are verified.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.split} style={{ marginTop: "1.5rem" }}>
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>📦 Store Fulfillment</h3>
                  <p className={styles.panelDesc}>Recent merchandise orders needing processing.</p>
                  
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Item</th>
                          <th>Status</th>
                          <th style={{ textAlign: "right" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {globalStoreOrders.map(order => (
                          <tr key={order.id}>
                            <td><span className={styles.monoCode}>{order.id}</span></td>
                            <td>{order.user}</td>
                            <td>{order.item}</td>
                            <td>
                              <span className={`${styles.labelPill} ${order.status === 'Processing' ? styles.statusProcessing : styles.statusShipped}`}>{order.status}</span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                               {order.status === 'Processing' ? (
                                 <button className={styles.btnApprove} onClick={() => {
                                   setGlobalStoreOrders(prev => prev.map(o => o.id === order.id ? {...o, status: 'Shipped'} : o));
                                   triggerToast(`Order ${order.id} marked as Shipped!`);
                                 }}>Ship</button>
                               ) : (
                                 <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Done</span>
                               )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>📈 Platform Revenue</h3>
                  <p className={styles.panelDesc}>Overview of incoming cashflows.</p>
                  
                  <div className={styles.revenueBlock}>
                    <div>
                      <div className={styles.revLabel}>Total Revenue (30d)</div>
                      <div className={styles.revAmount}>$42,150</div>
                    </div>
                  </div>
                  
                  <div className={styles.infoGroup} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                    <div className={styles.infoLabel}>Subscriptions:</div>
                    <div className={styles.infoValue} style={{ color: "#3399ff" }}>$34,500</div>
                  </div>
                  <div className={styles.infoGroup} style={{ paddingTop: "0.5rem" }}>
                    <div className={styles.infoLabel}>Shop Merchandise:</div>
                    <div className={styles.infoValue} style={{ color: "#00ff66" }}>$7,650</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </>
          ) : activeTab === 'orders' ? (
            <div className={styles.gridFade}>
              <h1 className={styles.pageHeading}>My Orders</h1>
              <p className={styles.pageDesc}>Track your past and active shipments.</p>
              
              <div className={styles.panel} style={{ marginTop: '2rem' }}>
                <h3 className={styles.panelTitle}>🛍️ Full Order History</h3>
                <p className={styles.panelDesc}>Every purchase made through the FitMind AI platform.</p>
                
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storeOrders.length > 0 ? storeOrders.map(order => (
                        <tr key={order.id}>
                          <td><span className={styles.monoCode}>{order.id}</span></td>
                          <td>{order.date || 'N/A'}</td>
                          <td>{order.item}</td>
                          <td>{order.total || 'N/A'}</td>
                          <td>
                            <span className={`${styles.labelPill} ${order.status === 'Shipped' ? styles.statusShipped : order.status === 'Processing' ? styles.statusProcessing : styles.statusDelivered}`}>{order.status}</span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.4)' }}>
                            No orders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeTab === 'academy' ? (
            <div className={styles.gridFade}>
              <h1 className={styles.pageHeading}>My Academy</h1>
              <p className={styles.pageDesc}>Your biomechanics library and enrolled programs.</p>
              
              <div className={styles.panel} style={{ marginTop: '2rem' }}>
                <h3 className={styles.panelTitle}>📚 Enrolled Programs</h3>
                <p className={styles.panelDesc}>Complete modules to refine form leverage.</p>

                <div className={styles.courseCard}>
                  <div className={styles.courseMeta}>
                    <span className={styles.courseCategory}>BIOMECHANICS</span>
                    <span className={styles.courseLevel}>Intermediate</span>
                  </div>
                  <h4 className={styles.courseTitle}>Deep Squat Torque Optimization</h4>
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBarBg}>
                      <div className={styles.progressBar} style={{ width: "64%" }}></div>
                    </div>
                    <div className={styles.progressLabel}>64% Complete</div>
                  </div>
                  <div>
                    <div className={`${styles.lessonItem} ${styles.lessonDone}`}>
                      <span>✓ Lesson 1: Femur to Torso Ratio</span>
                      <span className={styles.lessonDur}>8 min</span>
                    </div>
                    <div 
                      className={`${styles.lessonItem} ${styles.lessonActive}`}
                      onClick={() => setActiveLesson({ title: "Ankle Dorsiflexion Mechanics", course: "Deep Squat Torque", duration: "12 min" })}
                    >
                      <span>▶ Lesson 2: Ankle Dorsiflexion</span>
                      <span className={styles.lessonDur}>12 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            <div className={styles.gridFade}>
              <h1 className={styles.pageHeading}>Settings</h1>
              <p className={styles.pageDesc}>Manage your profile, preferences, and security.</p>
              
              <div className={styles.settingsGrid}>
                {/* Profile Section */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.settingsTitle}>👤 Profile Details</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name</label>
                    <input type="text" className={styles.formInput} defaultValue={role === "admin" ? "System Admin" : role === "trainer" ? "Donovan Barker" : "Alex Johnson"} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <input type="email" className={styles.formInput} defaultValue={role === "admin" ? "admin@fitmind.ai" : "athlete@example.com"} />
                  </div>
                  <button className={styles.settingsSaveBtn} onClick={() => triggerToast("Profile updated successfully!")}>Save Profile</button>
                </div>

                {/* Preferences Section */}
                <div className={styles.settingsSection}>
                  <h3 className={styles.settingsTitle}>⚙️ Preferences</h3>
                  
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <span className={styles.toggleLabel}>Email Notifications</span>
                      <span className={styles.toggleDesc}>Receive daily metric summaries.</span>
                    </div>
                    <div className={`${styles.toggleSwitch} ${settings.emailAlerts ? styles.active : ''}`} onClick={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})}>
                      <div className={styles.toggleSwitchKnob}></div>
                    </div>
                  </div>
                  
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <span className={styles.toggleLabel}>SMS Alerts</span>
                      <span className={styles.toggleDesc}>Text messages for live sessions.</span>
                    </div>
                    <div className={`${styles.toggleSwitch} ${settings.smsAlerts ? styles.active : ''}`} onClick={() => setSettings({...settings, smsAlerts: !settings.smsAlerts})}>
                      <div className={styles.toggleSwitchKnob}></div>
                    </div>
                  </div>

                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <span className={styles.toggleLabel}>Auto-Play Videos</span>
                      <span className={styles.toggleDesc}>Start academy videos automatically.</span>
                    </div>
                    <div className={`${styles.toggleSwitch} ${settings.autoPlay ? styles.active : ''}`} onClick={() => setSettings({...settings, autoPlay: !settings.autoPlay})}>
                      <div className={styles.toggleSwitchKnob}></div>
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className={styles.settingsSection} style={{ gridColumn: "1 / -1" }}>
                  <h3 className={styles.settingsTitle}>🔒 Security</h3>
                  <div className={styles.formGroup} style={{ maxWidth: '400px' }}>
                    <label className={styles.formLabel}>New Password</label>
                    <input type="password" className={styles.formInput} placeholder="••••••••" />
                  </div>
                  <div className={styles.formGroup} style={{ maxWidth: '400px' }}>
                    <label className={styles.formLabel}>Confirm Password</label>
                    <input type="password" className={styles.formInput} placeholder="••••••••" />
                  </div>
                  <button className={styles.settingsSaveBtn} onClick={() => triggerToast("Password securely changed!")}>Update Password</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      {/* --- MODALS --- */}
      {/* Learner Video Modal */}
      {activeLesson && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalMeta}>{activeLesson.course}</div>
                <div className={styles.modalTitle}>{activeLesson.title}</div>
              </div>
              <button className={styles.closeBtn} onClick={() => { setActiveLesson(null); setIsPlaying(false); setVideoProgress(0); }}>✕</button>
            </div>
            
            <div className={styles.videoBox}>
              <div className={styles.telemetry}>
                <span className={styles.telRow}>LOAD ADAPTATION: ACTIVE</span>
                <span className={styles.telRow}>TORQUE: 42 Nm</span>
              </div>
              
              {!isPlaying && videoProgress === 0 && (
                <div className={styles.playBtn} onClick={() => setIsPlaying(true)}>▶</div>
              )}
              {isPlaying && (
                <div style={{ textAlign: "center" }}>
                  <div className={styles.scanLine}></div>
                  <div className={styles.playingText}>📹 Streaming...</div>
                  <div className={styles.playingSubtext}>{Math.round(videoProgress * 0.1)}s / {activeLesson.duration}</div>
                </div>
              )}
              {!isPlaying && videoProgress > 0 && videoProgress < 100 && (
                <div className={styles.playBtn} onClick={() => setIsPlaying(true)}>▶</div>
              )}
            </div>

            <div className={styles.controlsRow}>
              <button className={styles.pauseBtn} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "⏸ Pause" : "▶ Resume"}
              </button>
              <div className={styles.scrubBg}>
                <div className={styles.scrubFill} style={{ width: `${videoProgress}%` }}></div>
              </div>
              <span className={styles.scrubPct}>{Math.round(videoProgress)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Trainer Note Modal */}
      {selectedClient && (
        <div className={styles.modalOverlay}>
          <form className={styles.modalCard} onSubmit={handleSaveNote}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalMeta}>CLIENT NOTES</div>
                <div className={styles.modalTitle}>Update Notes: {selectedClient.name}</div>
              </div>
              <button type="button" className={styles.closeBtn} onClick={() => setSelectedClient(null)}>✕</button>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label className={styles.formLabel}>Diagnostic Notes</label>
              <textarea 
                className={styles.textarea}
                value={clientNoteText}
                onChange={e => setClientNoteText(e.target.value)}
                placeholder="Log torque leakage, mobility..."
                required
              />
            </div>
            <div className={styles.modalActions}>
              <button type="button" className={styles.btnSecondary} onClick={() => setSelectedClient(null)}>Cancel</button>
              <button type="submit" className={styles.btnPrimary}>Save Log</button>
            </div>
          </form>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className={styles.toast}>
          <div className={styles.toastCheck}>✓</div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
