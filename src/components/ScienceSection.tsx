"use client";

import { useState } from 'react';
import styles from './ScienceSection.module.css';

interface PeptideDetail {
  id: string;
  name: string;
  chemicalName: string;
  structure: string;
  weight: string;
  halfLife: string;
  actionMechanism: string;
  description: string;
  keyBenefits: string[];
}

const PEPTIDES_DATA: Record<string, PeptideDetail> = {
  bpc157: {
    id: 'bpc157',
    name: 'BPC-157',
    chemicalName: 'Body Protection Compound 157 (Pentadecapeptide)',
    structure: 'L-Val-L-Pro-L-Pro-L-Pro-L-Gly-L-Lys-L-Pro-L-Ala-L-Asp-L-Asp-L-Ala-L-Gly-L-Leu-L-Val',
    weight: '1419.56 g/mol',
    halfLife: '4.5 hours (systemic)',
    actionMechanism: 'Angiogenesis Activation (VEGF Upregulation)',
    description: 'BPC-157 is an extremely stable pentadecapeptide representing a fragment of a human gastric defense protein. It coordinates high-fidelity vascular growth factors to accelerate the recovery of structural joints, tendons, muscles, ligaments, and gastrointestinal tissue.',
    keyBenefits: [
      'Triggers neo-angiogenesis (growth of fresh blood vessels) to nutrient-depleted joint tissue.',
      'Slashes connective tissue recovery timelines by up to 60%.',
      'Protects mucosal gut linings and suppresses localized inflammatory profiles.'
    ]
  },
  tb500: {
    id: 'tb500',
    name: 'TB-500',
    chemicalName: 'Thymosin Beta-4 Active Fragment (Ac-SDKPD)',
    structure: 'Acetyl-Ser-Asp-Lys-Pro-Asp (Active oligopeptide fragment)',
    weight: '4963.50 g/mol (full peptide) / 496 g/mol (fragment)',
    halfLife: '7.5 days (slow systemic clearance)',
    actionMechanism: 'Actin Upregulation & Cellular Migration Control',
    description: 'TB-500 is a synthetic version of the naturally occurring active fragment of Thymosin Beta-4. Its primary scientific action is the upregulation of actin, a vital structural protein essential for cellular mobility, wound recovery, and dynamic structural tissue repair.',
    keyBenefits: [
      'Upregulates cellular migration of fibroblasts and keratinocytes to wounded tissues.',
      'Reduces persistent collagen scarring, restoring tissue elasticity and range of motion.',
      'Dampens severe acute inflammation in deep muscle and tendon layers.'
    ]
  },
  cjcIpam: {
    id: 'cjcIpam',
    name: 'CJC-1295 + Ipamorelin',
    chemicalName: 'Growth Hormone Secretagogue Receptor (GHSR) Synergistic Blend',
    structure: 'D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2 (Ipamorelin component)',
    weight: '711.90 g/mol (Ipamorelin) / 3367.90 g/mol (CJC-1295)',
    halfLife: '2 hours (Ipamorelin) / 5.8 days (CJC-1295 DAC)',
    actionMechanism: 'Pulsatile Growth Hormone Release (No Cortisol Elevation)',
    description: 'A cutting-edge synergistic blend combining a GHRH analog (CJC-1295) with a highly selective GH secretagogue (Ipamorelin). Together, they stimulate the anterior pituitary gland to release pulsatile waves of natural Growth Hormone without elevating cortisol or prolactin levels.',
    keyBenefits: [
      'Accelerates deep slow-wave sleep cycles, triggering absolute nocturnal tissue repair.',
      'Amplifies lean tissue hypertrophy by enhancing dynamic nitrogen retention.',
      'Promotes hyper-efficient fatty acid mobilization and lipid metabolism.'
    ]
  }
};

export default function ScienceSection() {
  const [activeTab, setActiveTab] = useState<string>('bpc157');
  const [showReport, setShowReport] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  const selectedPeptide = PEPTIDES_DATA[activeTab];

  const handleVerifyPurity = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setShowReport(true);
    }, 1200);
  };

  return (
    <section className={styles.scienceSection} id="science">
      <div className={styles.glowOverlay}></div>
      <div className={styles.gridLines}></div>

      <div className={styles.container}>
        
        {/* Section Title */}
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>The Peptide Lab</span>
          <h2 className="heading-lg">Clinical-Grade <span className="text-gradient">Peptide Science</span></h2>
          <p className="text-lg text-gray" style={{ maxWidth: '650px', marginTop: '0.5rem' }}>
            Explore the cellular biomechanics and biochemical actions of elite research peptides. Absolute verification, zero compromises.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className={styles.tabWrapper}>
          {Object.values(PEPTIDES_DATA).map((pep) => (
            <button
              key={pep.id}
              className={`${styles.tabBtn} ${activeTab === pep.id ? styles.activeTab : ''}`}
              onClick={() => {
                setActiveTab(pep.id);
                setShowReport(false); // Reset report when tab changes
              }}
            >
              {pep.name}
            </button>
          ))}
        </div>

        {/* Console Content split */}
        <div className={styles.consoleGrid}>
          
          {/* Scientific Info Column */}
          <div className={`${styles.consoleCard} glass-panel`}>
            <div className={styles.cardHeader}>
              <span className={styles.structureBadge}>Pathways Configured</span>
              <h3>{selectedPeptide.name}</h3>
              <p className={styles.chemLabel}>{selectedPeptide.chemicalName}</p>
            </div>

            <div className={styles.specsList}>
              <div className={styles.specRow}>
                <span className={styles.specName}>Sequence / Structure:</span>
                <span className={styles.specVal} style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {selectedPeptide.structure}
                </span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Molecular Weight:</span>
                <span className={styles.specVal}>{selectedPeptide.weight}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Clearance Half-Life:</span>
                <span className={styles.specVal}>{selectedPeptide.halfLife}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Action Pathway:</span>
                <span className={styles.specVal} style={{ color: 'var(--primary-blue)', fontWeight: '700' }}>
                  {selectedPeptide.actionMechanism}
                </span>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.descriptionBox}>
              <h4>Biochemical Mechanics</h4>
              <p className={styles.descriptionText}>{selectedPeptide.description}</p>
            </div>

            <div className={styles.benefitsBox}>
              <h4>Primary Physiological Actions</h4>
              <ul>
                {selectedPeptide.keyBenefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* HPLC Purity Visual Column */}
          <div className={`${styles.purityCard} glass-panel`}>
            
            {/* HPLC Curve Screen */}
            <div className={styles.hplcDisplay}>
              <div className={styles.hplcHeader}>
                <span className={styles.liveStatus}>● ONLINE SCAN</span>
                <h4>HPLC Chromatography Analytics</h4>
              </div>
              
              <div className={styles.graphContainer}>
                {/* Simulated SVG Waveform Graph */}
                <svg viewBox="0 0 400 160" className={styles.graphSvg}>
                  <path 
                    d="M 10 140 L 80 140 Q 110 140 130 90 L 150 20 L 170 135 L 180 140 L 220 140 Q 240 140 250 120 L 260 100 L 270 140 L 390 140" 
                    fill="none" 
                    stroke="var(--primary-blue)" 
                    strokeWidth="3"
                    className={styles.graphLine}
                  />
                  {/* Grid markings */}
                  <line x1="10" y1="20" x2="390" y2="20" stroke="rgba(255,255,255,0.03)" strokeDasharray="3,3" />
                  <line x1="10" y1="80" x2="390" y2="80" stroke="rgba(255,255,255,0.03)" strokeDasharray="3,3" />
                  <line x1="10" y1="140" x2="390" y2="140" stroke="rgba(255,255,255,0.1)" />
                  <line x1="150" y1="10" x2="150" y2="150" stroke="rgba(0,112,243,0.15)" strokeDasharray="4,4" />
                </svg>
                
                <span className={styles.purityLabel}>99.82% Purity Peak Detected</span>
              </div>
              
              <div className={styles.hplcFooter}>
                <span>Sample ID: FM-{selectedPeptide.id.toUpperCase()}-2026</span>
                <span>Synthesized via Solid Phase</span>
              </div>
            </div>

            {/* Verification Actions */}
            <div className={styles.verificationActions}>
              {!showReport ? (
                <div style={{ textAlign: 'center' }}>
                  <p className="text-sm text-gray" style={{ marginBottom: '1.25rem' }}>
                    Verify high-performance liquid chromatography and chemical mass spectrometry verification reports.
                  </p>
                  <button 
                    onClick={handleVerifyPurity} 
                    className="btn-primary" 
                    style={{ width: '100%' }}
                    disabled={verifying}
                  >
                    {verifying ? 'Running HPLC Sequence...' : 'Verify Analytical Report'}
                  </button>
                </div>
              ) : (
                <div className={styles.reportPanel}>
                  <div className={styles.reportSuccessHeader}>
                    <span className={styles.successIcon}>✓</span>
                    <div>
                      <h5>HPLC Purity Verified</h5>
                      <p>Certificate #FM-PEPV-7719</p>
                    </div>
                  </div>
                  <div className={styles.reportDetails}>
                    <div className={styles.reportRow}>
                      <span>Mass Spec Index:</span>
                      <span className={styles.verifiedText}>CONFORMANT (100% MATCH)</span>
                    </div>
                    <div className={styles.reportRow}>
                      <span>In-vitro Sterility:</span>
                      <span className={styles.verifiedText}>99.99% SECURE / STABILIZED</span>
                    </div>
                    <div className={styles.reportRow}>
                      <span>Endotoxin Assay:</span>
                      <span className={styles.verifiedText}>&lt; 0.05 EU/mg (COMPLIANT)</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowReport(false)} 
                    className="btn-secondary"
                    style={{ width: '100%', padding: '8px 15px', fontSize: '0.85rem' }}
                  >
                    Close Report
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
