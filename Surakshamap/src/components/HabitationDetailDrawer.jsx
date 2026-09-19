import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Users, 
  MapPin, 
  Home, 
  FileText, 
  Navigation, 
  CheckCircle2, 
  AlertTriangle,
  HeartPulse,
  Truck,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { generateExplanation } from '../services/explainableAi.js';
import { rankCandidateDestinations, optimizeRelocationDistribution } from '../services/relocationEngine.js';
import { predictRelocationProbability } from '../services/mlPredictor.js';

export function HabitationDetailDrawer({ 
  habitation, 
  assessment, 
  shelters, 
  onClose, 
  onOpenReportModal,
  onHighlightDestination,
  onVerifyAssessment,
  onDisputeAssessment,
  simulationOffsets
}) {
  if (!habitation || !assessment) return null;

  const { risk, capacity, relocation } = assessment;
  const explanation = generateExplanation(habitation, risk, capacity, relocation);
  const candidateDestinations = rankCandidateDestinations(habitation, shelters);
  const distribution = optimizeRelocationDistribution(capacity.deficit, candidateDestinations);
  const mlPrediction = predictRelocationProbability(habitation, simulationOffsets);

  const [activeTab, setActiveTab] = useState('overview'); // overview, ml-forecast, destinations

  return (
    <div className="drawer-container" id="habitation-detail-drawer">
      {/* Drawer Header */}
      <div className="drawer-header">
        <div className="drawer-title-group">
          <h2>{habitation.name}</h2>
          <div className="drawer-subtitle">
            <MapPin size={13} />
            <span>Block: <strong>{habitation.block}</strong> | District: <strong>{habitation.district}</strong></span>
          </div>
        </div>
        <button id="btn-close-drawer" className="close-btn" onClick={onClose} title="Close Panel">
          <X size={18} />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(10, 15, 26, 0.6)'
      }}>
        {[
          { id: 'overview', label: 'Risk & Evidence' },
          { id: 'ml-forecast', label: 'ML Time-to-Evac' },
          { id: 'destinations', label: 'Relocation Options' }
        ].map(tab => (
          <button
            key={tab.id}
            id={`drawer-tab-${tab.id}`}
            style={{
              flex: 1,
              padding: '0.65rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #38BDF8' : '2px solid transparent',
              color: activeTab === tab.id ? '#38BDF8' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="drawer-body">
        {/* Data Provenance & Freshness Bar (PRD V2 Item 3 & 6) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '0.4rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.72rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={12} color="#94A3B8" />
            <span style={{ color: 'var(--text-muted)' }}>Updated: <strong>{risk.dataFreshness}</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Confidence:</span>
            <strong style={{
              fontFamily: 'var(--font-mono)',
              color: risk.confidenceScore > 85 ? '#34D399' : '#FBBF24'
            }}>
              {risk.confidenceScore}%
            </strong>
            {risk.isHumanVerified && (
              <span style={{
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34D399',
                padding: '0.1rem 0.35rem',
                borderRadius: 4,
                fontSize: '0.65rem',
                fontWeight: 700
              }}>
                VERIFIED
              </span>
            )}
          </div>
        </div>

        {/* Risk Summary Banner */}
        <div className={`risk-summary-banner ${risk.zone.toLowerCase()}`}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              {risk.zone} Zone Assessed
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: '0.2rem', color: risk.zoneColor }}>
              {relocation.priorityLevel.toUpperCase()} RELOCATION PRIORITY
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {relocation.priorityAction}
            </div>
          </div>
          <div className="risk-score-display">
            <div className="score-number" style={{ color: risk.zoneColor }}>
              {risk.riskScore}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Risk Score / 100
            </div>
          </div>
        </div>

        {/* Human-in-the-Loop Decision Layer (PRD V2 Item 11) */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} /> Human-in-the-Loop Protocol
            </span>
            <span style={{ fontSize: '0.68rem', color: risk.isHumanVerified ? '#34D399' : '#FBBF24' }}>
              {risk.isHumanVerified ? `Verified by ${risk.verifiedBy}` : 'Pending Officer Sign-off'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.2rem' }}>
            <button 
              id="btn-verify-assessment"
              className="btn btn-primary"
              style={{ padding: '0.4rem', fontSize: '0.75rem', background: '#059669' }}
              onClick={() => onVerifyAssessment(habitation.id)}
            >
              <CheckCircle2 size={13} />
              <span>Verify Assessment</span>
            </button>
            <button 
              id="btn-dispute-assessment"
              className="btn btn-secondary"
              style={{ padding: '0.4rem', fontSize: '0.75rem' }}
              onClick={() => onDisputeAssessment(habitation.id)}
            >
              <AlertTriangle size={13} />
              <span>Dispute / Override</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & WHY RED BREAKDOWN */}
        {activeTab === 'overview' && (
          <>
            {/* Why Red / Risk Drivers Breakdown (PRD V2 Item 10) */}
            <div className="detail-section">
              <div className="section-label">
                <BarChart3 size={14} color="#EF4444" />
                <span>Why Red? Driver Attribution</span>
              </div>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {[
                  { label: 'Flood Hazard Exposure', val: risk.drivers.hazardExposure, color: '#06B6D4' },
                  { label: 'Population Exposure', val: risk.drivers.populationExposure, color: '#EF4444' },
                  { label: 'Infrastructure Fragility', val: risk.drivers.infrastructureVulnerability, color: '#F97316' },
                  { label: 'Route Cutoff / Access Risk', val: risk.drivers.accessibilityCutoffRisk, color: '#EAB308' },
                  { label: 'Demographic Fragility (Dependents)', val: risk.drivers.demographicFragility, color: '#A855F7' }
                ].map((driver, i) => (
                  <div key={i} className="factor-bar-row">
                    <div className="factor-bar-header">
                      <span>{driver.label}</span>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>{driver.val}%</strong>
                    </div>
                    <div className="factor-progress-track">
                      <div 
                        className="factor-progress-fill"
                        style={{ width: `${driver.val}%`, background: driver.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Population & Vulnerability Profile */}
            <div className="detail-section">
              <div className="section-label">
                <Users size={14} color="#38BDF8" />
                <span>Demographic & Infrastructure Profile</span>
              </div>
              <div className="info-metric-grid">
                <div className="metric-box">
                  <div className="metric-box-title">Total Residents</div>
                  <div className="metric-box-val">{habitation.population.toLocaleString()}</div>
                </div>
                <div className="metric-box" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                  <div className="metric-box-title" style={{ color: '#F87171' }}>Exposed Population</div>
                  <div className="metric-box-val" style={{ color: '#F87171' }}>
                    {habitation.exposedPopulation.toLocaleString()}
                  </div>
                </div>
                <div className="metric-box">
                  <div className="metric-box-title">Children & Elderly</div>
                  <div className="metric-box-val">
                    {(habitation.demographics.children + habitation.demographics.elderly).toLocaleString()}
                  </div>
                </div>
                <div className="metric-box">
                  <div className="metric-box-title">Persons with Disability</div>
                  <div className="metric-box-val">{habitation.demographics.pwd}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-box-title">Kachha Housing</div>
                  <div className="metric-box-val">{habitation.demographics.kachhaHousingPercent}%</div>
                </div>
                <div className="metric-box">
                  <div className="metric-box-title">Hospital Transit</div>
                  <div className="metric-box-val">{habitation.infrastructure.hospitalDistanceKm} km</div>
                </div>
              </div>
            </div>

            {/* Carrying Capacity Bottleneck Meter */}
            <div className="detail-section">
              <div className="section-label">
                <Home size={14} color="#A855F7" />
                <span>Carrying Capacity Bottleneck Analysis</span>
              </div>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span>Population Requiring Relocation:</span>
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>{capacity.populationRequiringRelocation.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span>Local Usable Capacity (Bottlenecked):</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', color: '#34D399' }}>{capacity.localAvailable.toLocaleString()}</strong>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.4rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ color: capacity.deficit > 0 ? '#F87171' : '#34D399', fontWeight: 600 }}>
                    Immediate Shelter Deficit:
                  </span>
                  <strong style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.15rem',
                    color: capacity.deficit > 0 ? '#EF4444' : '#10B981'
                  }}>
                    {capacity.deficit.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: ML TIME-TO-EVACUATE FORECAST */}
        {activeTab === 'ml-forecast' && (
          <div className="detail-section">
            <div className="section-label">
              <Sparkles size={14} color="#C084FC" />
              <span>ML Relocation Probability Forecaster</span>
            </div>

            <div style={{
              background: 'rgba(124, 58, 237, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#DDD6FE', marginBottom: '0.75rem' }}>
                Probability that {habitation.name} will require mandatory evacuation across time windows:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.6rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Within 6 Hours</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: mlPrediction.probability6h > 70 ? '#EF4444' : '#F97316' }}>
                    {mlPrediction.probability6h}%
                  </div>
                </div>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.6rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Within 12 Hours</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: mlPrediction.probability12h > 70 ? '#EF4444' : '#F97316' }}>
                    {mlPrediction.probability12h}%
                  </div>
                </div>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.6rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Within 24 Hours</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: '#EF4444' }}>
                    {mlPrediction.probability24h}%
                  </div>
                </div>
              </div>

              {/* SHAP Feature Contributions */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  SHAP Feature Contributions
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {mlPrediction.shapContributions.map((s, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.72rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '0.3rem 0.5rem',
                      borderRadius: 4
                    }}>
                      <span style={{ color: 'var(--text-primary)' }}>{s.feature} ({s.value})</span>
                      <strong style={{
                        fontFamily: 'var(--font-mono)',
                        color: s.isProtective ? '#34D399' : '#F87171'
                      }}>
                        {s.isProtective ? `-${s.impact}% (Protective)` : `+${s.impact}%`}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RELOCATION OPTIONS */}
        {activeTab === 'destinations' && (
          <div className="detail-section">
            <div className="section-label">
              <Navigation size={14} color="#34D399" />
              <span>Candidate Lower-Risk Destinations (PRD V2)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {candidateDestinations.slice(0, 3).map((dest, i) => (
                <div key={dest.shelterId} className="shelter-card">
                  <div className="shelter-card-top">
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase' }}>
                        Option {i + 1} • {dest.designation}
                      </span>
                      <div className="shelter-name">{dest.name}</div>
                    </div>
                    <span className="shelter-distance-badge">{dest.distanceKm} km ({dest.travelTimeMinutes}m)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <span>Effective Usable Space: <strong style={{ color: '#34D399' }}>{dest.availableCapacity.toLocaleString()}</strong></span>
                    <span>Constraint: <strong style={{ color: '#FBBF24' }}>{dest.bottleneckResource}</strong></span>
                  </div>

                  <div className="shelter-capacity-bar">
                    <div 
                      className={`shelter-capacity-fill ${dest.utilizationPercent > 85 ? 'overload' : ''}`}
                      style={{ width: `${Math.min(100, dest.utilizationPercent)}%` }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {dest.authorityVerificationStatus}
                    </span>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                      onClick={() => onHighlightDestination(dest)}
                    >
                      Highlight Route
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Distribution Preview */}
            {distribution.allocations.length > 0 && (
              <div style={{
                background: 'rgba(30, 41, 59, 0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem',
                marginTop: '0.5rem'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FB923C' }}>
                  Target Population Distribution:
                </div>
                {distribution.allocations.map((alloc, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>➔ {alloc.name}:</span>
                    <strong style={{ fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>
                      {alloc.allocatedHeadcount.toLocaleString()} evacuees
                    </strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Generate Dossier Button */}
        <button 
          id="btn-open-dossier"
          className="btn btn-primary"
          style={{ width: '100%', gap: '0.6rem', marginTop: '0.5rem' }}
          onClick={onOpenReportModal}
        >
          <FileText size={16} />
          <span>Generate Official Relocation Dossier</span>
        </button>
      </div>
    </div>
  );
}
