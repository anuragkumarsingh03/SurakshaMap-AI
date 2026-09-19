import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  Upload, 
  ShieldCheck
} from 'lucide-react';

export function FieldOfficerTerminal({ 
  habitations, 
  onSubmitReport, 
  onClose 
}) {
  const [selectedHabId, setSelectedHabId] = useState(habitations[0]?.id || '');
  const [hazardType, setHazardType] = useState('Flood Water Influx');
  const [affectedCount, setAffectedCount] = useState('500');
  const [roadStatus, setRoadStatus] = useState('Submerged (Water > 1.2m)');
  const [shelterOccupancyDelta, setShelterOccupancyDelta] = useState('150');
  const [fieldNotes, setFieldNotes] = useState('Embankment seepage observed near eastern culvert; 3 stilt houses tilted.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetHabitation = habitations.find(h => h.id === selectedHabId);

    const report = {
      id: `rep-${Date.now()}`,
      habitationId: selectedHabId,
      habitationName: targetHabitation?.name || 'Field Sector',
      hazardType,
      affectedCount: Number(affectedCount) || 0,
      roadStatus,
      shelterOccupancyDelta: Number(shelterOccupancyDelta) || 0,
      fieldNotes,
      timestamp: new Date().toLocaleTimeString(),
      officer: 'Officer T. Saikia (Badge #AS-8842)',
      gpsCoords: targetHabitation?.coordinates || [27.25, 94.4]
    };

    onSubmitReport(report);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" id="field-officer-modal">
      <div className="modal-content" style={{ maxWidth: '560px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #059669, #10B981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Camera size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Field Officer Mobile Terminal</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                PRD Section 24: Real-time Ground Observation & Shelter Check-In
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Terminal">
            <X size={18} />
          </button>
        </div>

        {isSubmitted ? (
          <div style={{
            padding: '3rem 1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <CheckCircle2 size={54} color="#10B981" />
            <h3 style={{ fontSize: '1.25rem', color: '#10B981' }}>Report Verified & Transmitted!</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Risk scores and carrying capacity models have been synchronized in the central EOC dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Habitation Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Monitored Habitation / Sector:
                </label>
                <select 
                  className="role-badge-select"
                  style={{ width: '100%', padding: '0.6rem' }}
                  value={selectedHabId}
                  onChange={e => setSelectedHabId(e.target.value)}
                >
                  {habitations.map(h => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.block} Block)
                    </option>
                  ))}
                </select>
              </div>

              {/* Hazard Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Observed Hazard Incident:
                </label>
                <select 
                  className="role-badge-select"
                  style={{ width: '100%', padding: '0.6rem' }}
                  value={hazardType}
                  onChange={e => setHazardType(e.target.value)}
                >
                  <option value="Flood Water Influx">Flood Water Influx / Lowland Submersion</option>
                  <option value="Embankment Breach">Embankment Breach / Toe Erosion</option>
                  <option value="Road Inundation">Road Inundation / Bridge Structural Threat</option>
                  <option value="Landslide Debris">Landslide Debris / Hill Slit Collapse</option>
                  <option value="Shelter Overcrowding">Shelter Overcrowding / Supply Depletion</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Additional Affected Count */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Newly Displaced Residents:
                  </label>
                  <input 
                    type="number"
                    className="role-badge-select"
                    style={{ width: '100%', padding: '0.6rem' }}
                    value={affectedCount}
                    onChange={e => setAffectedCount(e.target.value)}
                  />
                </div>

                {/* Shelter Occupancy Delta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Shelter Intake Count (+):
                  </label>
                  <input 
                    type="number"
                    className="role-badge-select"
                    style={{ width: '100%', padding: '0.6rem' }}
                    value={shelterOccupancyDelta}
                    onChange={e => setShelterOccupancyDelta(e.target.value)}
                  />
                </div>
              </div>

              {/* Evacuation Road Condition */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Evacuation Route Passage Status:
                </label>
                <input 
                  type="text"
                  className="role-badge-select"
                  style={{ width: '100%', padding: '0.6rem' }}
                  value={roadStatus}
                  onChange={e => setRoadStatus(e.target.value)}
                />
              </div>

              {/* Notes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Field Verification Notes:
                </label>
                <textarea 
                  className="role-badge-select"
                  style={{ width: '100%', padding: '0.6rem', height: '70px', resize: 'vertical' }}
                  value={fieldNotes}
                  onChange={e => setFieldNotes(e.target.value)}
                />
              </div>

              {/* Simulated Geo-tag and Photo */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px dashed var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: 6,
                  background: '#1E293B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Camera size={22} color="#94A3B8" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    GPS Tag: 27.215° N, 94.380° E (Accuracy: ±3.2m)
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    High-resolution timestamped reconnaissance image attached
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button id="btn-submit-field-report" type="submit" className="btn btn-primary" style={{ background: '#059669' }}>
                <Send size={15} />
                <span>Submit to EOC Command</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
