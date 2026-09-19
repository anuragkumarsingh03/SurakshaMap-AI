import React from 'react';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  FileCheck 
} from 'lucide-react';
import { rankCandidateDestinations } from '../services/relocationEngine.js';
import { generateExplanation } from '../services/explainableAi.js';

export function OfficialReportModal({ 
  habitation, 
  assessment, 
  shelters, 
  onClose 
}) {
  if (!habitation || !assessment) return null;

  const { risk, capacity, relocation } = assessment;
  const candidates = rankCandidateDestinations(habitation, shelters);
  const explanation = generateExplanation(habitation, risk, capacity, relocation);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" id="official-report-modal">
      <div className="modal-content" style={{ maxWidth: '680px', background: '#0B0F19' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileCheck size={20} color="#38BDF8" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Official Habitation Risk Dossier</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Complies with NDMA / SDMA Decision Protocol (PRD Section 37 & V2 Guidelines)
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Dossier">
            ✕
          </button>
        </div>

        <div className="modal-body print-section" style={{
          fontFamily: 'var(--font-mono)',
          background: '#070A11',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          fontSize: '0.825rem',
          lineHeight: 1.6
        }}>
          <div style={{ textAlign: 'center', borderBottom: '1px solid #334155', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.08em', color: '#F8FAFC' }}>
              =================================================
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.1em' }}>
              DISTRICT DISASTER RISK & RELOCATION DOSSIER
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              SURAKSHAMAP AI DECISION SUPPORT SYSTEM
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.08em', color: '#F8FAFC' }}>
              =================================================
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div><strong>Location       :</strong> {habitation.name}</div>
            <div><strong>District       :</strong> {habitation.district} (Block: {habitation.block})</div>
            <div><strong>Population     :</strong> {habitation.population.toLocaleString()}</div>
            <div><strong>Confidence     :</strong> {risk.confidenceScore}% (Data Freshness: {risk.dataFreshness})</div>
            <div><strong>Verification   :</strong> {risk.isHumanVerified ? `VERIFIED by ${risk.verifiedBy}` : 'PENDING OFFICIAL SIGN-OFF'}</div>
          </div>

          <div style={{ borderTop: '1px dashed #334155', paddingTop: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ color: '#38BDF8', fontWeight: 700 }}>[ 1. RISK ASSESSMENT ]</div>
            <div>Flood Risk                : {risk.hazardDetails.floodProbability > 0.7 ? 'HIGH' : 'MODERATE'} ({Math.round(risk.hazardDetails.floodProbability * 100)}%)</div>
            <div>Landslide Risk            : {risk.hazardDetails.landslideProbability > 0.5 ? 'HIGH' : 'LOW'} ({Math.round(risk.hazardDetails.landslideProbability * 100)}%)</div>
            <div>Erosion Risk              : {risk.hazardDetails.riverErosionProbability > 0.6 ? 'HIGH' : 'LOW'} ({Math.round(risk.hazardDetails.riverErosionProbability * 100)}%)</div>
            <div>Overall Risk Score        : <strong style={{ color: risk.zoneColor }}>{risk.riskScore}/100</strong></div>
            <div>Zone                      : <strong style={{ color: risk.zoneColor }}>{risk.zone.toUpperCase()} ZONE</strong></div>
          </div>

          <div style={{ borderTop: '1px dashed #334155', paddingTop: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ color: '#38BDF8', fontWeight: 700 }}>[ 2. VULNERABILITY ]</div>
            <div>Population Exposure       : {habitation.exposedPopulation.toLocaleString()} ({Math.round((habitation.exposedPopulation / habitation.population) * 100)}%)</div>
            <div>Vulnerability Index       : {risk.vulnerabilityIndex > 0.6 ? 'HIGH' : 'MODERATE'} ({risk.vulnerabilityIndex})</div>
            <div>High-Risk Dependents      : {(habitation.demographics.children + habitation.demographics.elderly + habitation.demographics.pwd).toLocaleString()}</div>
            <div>Road Accessibility        : {habitation.infrastructure.roadAccessibility}</div>
            <div>Hospital Distance         : {habitation.infrastructure.hospitalDistanceKm} km</div>
          </div>

          <div style={{ borderTop: '1px dashed #334155', paddingTop: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ color: '#38BDF8', fontWeight: 700 }}>[ 3. CAPACITY (BOTTLENECK PRINCIPLE) ]</div>
            <div>Population Requiring Relocation : {capacity.populationRequiringRelocation.toLocaleString()}</div>
            <div>Effective Local Capacity         : {capacity.localAvailable.toLocaleString()}</div>
            <div>Capacity Deficit                 : <strong style={{ color: capacity.deficit > 0 ? '#EF4444' : '#10B981' }}>{capacity.deficit.toLocaleString()}</strong></div>
          </div>

          <div style={{ borderTop: '1px dashed #334155', paddingTop: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ color: '#38BDF8', fontWeight: 700 }}>[ 4. RELOCATION PRIORITY ]</div>
            <div>Priority Level                   : <strong style={{ color: relocation.priorityColor }}>{relocation.priorityLevel.toUpperCase()}</strong></div>
            <div>Authorized Directive             : {relocation.priorityAction}</div>
          </div>

          <div style={{ borderTop: '1px dashed #334155', paddingTop: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ color: '#38BDF8', fontWeight: 700 }}>[ 5. CANDIDATE LOWER-RISK DESTINATIONS ]</div>
            {candidates.slice(0, 3).map((dest, i) => (
              <div key={dest.shelterId}>
                Option {i + 1}: {dest.name.padEnd(36, ' ')} | {dest.distanceKm} km | Usable: {dest.availableCapacity} heads (Limit: {dest.bottleneckResource})
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px dashed #334155', paddingTop: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ color: '#38BDF8', fontWeight: 700 }}>[ 6. KEY REASONS (EVIDENCE) ]</div>
            {explanation.keyBulletPoints.map((pt, i) => (
              <div key={i}>✓ {pt}</div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #334155', paddingTop: '0.75rem', color: '#94A3B8', fontSize: '0.75rem' }}>
            <div>STATUS: Human Authority Review & Incident Commander Sign-off Required.</div>
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                ____________________________<br/>
                Field Verification Officer
              </div>
              <div style={{ textAlign: 'right' }}>
                ____________________________<br/>
                District Magistrate / DDMA
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button id="btn-print-dossier" className="btn btn-primary" onClick={handlePrint}>
            <Printer size={15} />
            <span>Print Official Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
