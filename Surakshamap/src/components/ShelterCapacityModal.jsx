import React from 'react';
import { 
  X, 
  Building2, 
  Users, 
  Droplets, 
  Zap, 
  HeartPulse, 
  Plus, 
  Minus,
  AlertTriangle,
  Layers
} from 'lucide-react';
import { evaluateShelterCapacity } from '../services/capacityEngine.js';

export function ShelterCapacityModal({ 
  shelters, 
  onUpdateOccupancy, 
  onClose 
}) {
  return (
    <div className="modal-overlay" id="shelter-capacity-modal">
      <div className="modal-content" style={{ maxWidth: '860px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #0284C7, #0369A1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Building2 size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Shelter Effective Carrying Capacity & Bottlenecks</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                PRD V2 Improvement 4: Multi-Resource Bottleneck Evaluation: MIN(Physical, Water, Sanitation, Medical, Power)
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Modal">
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
          <div style={{
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontSize: '0.78rem',
            color: '#BAE6FD',
            lineHeight: 1.45,
            marginBottom: '0.5rem'
          }}>
            Emergency carrying capacity is not merely floor space. True safe capacity is strictly constrained by the minimum supportable resource (water reserves, latrine ratios, medical staff, or backup electricity).
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1rem' }}>
            {shelters.map(shelter => {
              const capInfo = evaluateShelterCapacity(shelter);
              return (
                <div 
                  key={shelter.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${capInfo.utilizationPercent >= 100 ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>{shelter.name}</h4>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        Officer: {shelter.officerInCharge}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      background: capInfo.statusColor === 'var(--color-red)' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: capInfo.statusColor,
                      border: `1px solid ${capInfo.statusColor}`
                    }}>
                      {capInfo.status}
                    </span>
                  </div>

                  {/* Bottleneck Warning Banner */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.35)',
                    padding: '0.45rem 0.65rem',
                    borderRadius: 4,
                    fontSize: '0.72rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>Limiting Bottleneck:</span>
                    <strong style={{ color: '#FBBF24' }}>
                      {capInfo.bottleneckResource} ({capInfo.bottleneckCapacity.toLocaleString()} max)
                    </strong>
                  </div>

                  {/* Capacity Bar based on Effective Safe Capacity */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        Occupied: <strong>{shelter.currentOccupancy}</strong> / {capInfo.effectiveSafeCapacity} effective (Physical: {shelter.maxCapacity})
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: capInfo.statusColor }}>
                        {capInfo.utilizationPercent}% Full
                      </span>
                    </div>
                    <div className="shelter-capacity-bar" style={{ height: '8px' }}>
                      <div 
                        className={`shelter-capacity-fill ${capInfo.utilizationPercent > 85 ? 'overload' : ''}`}
                        style={{ width: `${Math.min(100, capInfo.utilizationPercent)}%` }}
                      />
                    </div>
                  </div>

                  {/* Resource Matrix Breakdown */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.4rem',
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.7rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94A3B8' }}>
                      <Droplets size={12} color="#38BDF8" />
                      <span>Water Cap: <strong>{capInfo.resourceMatrix.water.toLocaleString()}</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94A3B8' }}>
                      <Zap size={12} color="#EAB308" />
                      <span>Power Cap: <strong>{capInfo.resourceMatrix.power.toLocaleString()}</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94A3B8' }}>
                      <HeartPulse size={12} color="#EF4444" />
                      <span>Medical Cap: <strong>{capInfo.resourceMatrix.medical.toLocaleString()}</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94A3B8' }}>
                      <Users size={12} color="#34D399" />
                      <span>Sanitation: <strong>{capInfo.resourceMatrix.sanitation.toLocaleString()}</strong></span>
                    </div>
                  </div>

                  {/* Headcount Adjuster */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.4rem',
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Available Usable: <strong style={{ color: '#34D399' }}>{capInfo.availableEffectiveCapacity.toLocaleString()}</strong>
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '0.2rem 0.5rem' }}
                        onClick={() => onUpdateOccupancy(shelter.id, -50)}
                        title="Deduct 50 evacuees"
                        disabled={shelter.currentOccupancy <= 0}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', minWidth: '40px', textAlign: 'center' }}>
                        {shelter.currentOccupancy}
                      </span>
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '0.2rem 0.5rem' }}
                        onClick={() => onUpdateOccupancy(shelter.id, 50)}
                        title="Add 50 evacuees"
                        disabled={shelter.currentOccupancy >= shelter.maxCapacity}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
