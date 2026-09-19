import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sliders, 
  Play, 
  RotateCcw, 
  CloudRain, 
  Droplets, 
  Mountain, 
  AlertTriangle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export function WhatIfSimulator({ 
  currentOffsets, 
  onApplySimulation, 
  onResetSimulation, 
  onClose,
  baselineStats,
  habitations,
  shelters,
  calculateSimulatedStats
}) {
  const [rainfallPercent, setRainfallPercent] = useState(currentOffsets.rainfallPercent || 0);
  const [riverSurgeMeters, setRiverSurgeMeters] = useState(currentOffsets.riverSurgeMeters || 0);
  const [triggerLandslide, setTriggerLandslide] = useState(currentOffsets.triggerLandslide || false);

  // Compute live simulated projection dynamically inside the modal
  const simulatedStats = useMemo(() => {
    if (!calculateSimulatedStats) return baselineStats;
    return calculateSimulatedStats({
      rainfallPercent: Number(rainfallPercent),
      riverSurgeMeters: Number(riverSurgeMeters),
      triggerLandslide
    });
  }, [rainfallPercent, riverSurgeMeters, triggerLandslide, calculateSimulatedStats, baselineStats]);

  const handleApply = () => {
    onApplySimulation({
      rainfallPercent: Number(rainfallPercent),
      riverSurgeMeters: Number(riverSurgeMeters),
      triggerLandslide
    });
  };

  const handleReset = () => {
    setRainfallPercent(0);
    setRiverSurgeMeters(0);
    setTriggerLandslide(false);
    onResetSimulation();
  };

  const deltaRed = simulatedStats.redZonesCount - baselineStats.redZonesCount;
  const pctRed = baselineStats.redZonesCount > 0 ? Math.round((deltaRed / baselineStats.redZonesCount) * 100) : 0;

  const deltaPop = simulatedStats.totalPopulationAtRisk - baselineStats.totalPopulationAtRisk;
  const pctPop = baselineStats.totalPopulationAtRisk > 0 ? Math.round((deltaPop / baselineStats.totalPopulationAtRisk) * 100) : 0;

  const deltaDeficit = simulatedStats.totalCapacityDeficit - baselineStats.totalCapacityDeficit;
  const pctDeficit = baselineStats.totalCapacityDeficit > 0 ? Math.round((deltaDeficit / baselineStats.totalCapacityDeficit) * 100) : 0;

  return (
    <div className="modal-overlay" id="what-if-simulator-modal">
      <div className="modal-content" style={{ maxWidth: '680px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Sliders size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>What-If Disaster Simulation Sandbox</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                PRD V2 Improvement 12: Predictive Scenario Modeling & Before vs. After Analytics
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Simulator">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Slider Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Rainfall Slider */}
            <div className="sim-control-group">
              <div className="sim-label-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CloudRain size={16} color="#38BDF8" /> Extreme Rainfall Surge
                </span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>
                  +{rainfallPercent}% ({Math.round(185 * (1 + rainfallPercent / 100))} mm/24h)
                </strong>
              </div>
              <input 
                type="range"
                className="sim-slider"
                min="0"
                max="150"
                step="10"
                value={rainfallPercent}
                onChange={e => setRainfallPercent(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <span>Baseline (185mm)</span>
                <span>+50% (+92mm)</span>
                <span>+100% (+185mm)</span>
                <span>+150% Cloudburst</span>
              </div>
            </div>

            {/* River Gauge Surge */}
            <div className="sim-control-group">
              <div className="sim-label-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Droplets size={16} color="#06B6D4" /> River Water Level Rise
                </span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#06B6D4' }}>
                  +{(Number(riverSurgeMeters)).toFixed(1)} m (Level: {(104.2 + Number(riverSurgeMeters)).toFixed(1)}m)
                </strong>
              </div>
              <input 
                type="range"
                className="sim-slider"
                min="0"
                max="4"
                step="0.2"
                value={riverSurgeMeters}
                onChange={e => setRiverSurgeMeters(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <span>Current (104.2m)</span>
                <span>+1.0m Overspill</span>
                <span>+2.0m Embankment Breach</span>
                <span>+4.0m Catastrophic</span>
              </div>
            </div>

            {/* Landslide Cloudburst Trigger */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-card)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mountain size={16} color="#F59E0B" /> Trigger Geotechnical Slope Failures
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Simulates saturated soil slippage across Gogamukh & Bordoloni hill sections
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox"
                  checked={triggerLandslide}
                  onChange={e => setTriggerLandslide(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* BEFORE VS AFTER ANALYTICS (PRD V2 Improvement 12) */}
          <div style={{
            background: '#0B0F19',
            border: '1px solid #334155',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <div style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#38BDF8',
              fontWeight: 700,
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <TrendingUp size={14} /> Before vs. After Impact Comparison Matrix
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {/* Red Zones Metric */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 6,
                padding: '0.75rem'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#F87171', fontWeight: 600 }}>Red Zones</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{baselineStats.redZonesCount}</span>
                  <ArrowRight size={12} color="#EF4444" />
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: '#EF4444' }}>
                    {simulatedStats.redZonesCount}
                  </strong>
                </div>
                {deltaRed > 0 && (
                  <div style={{ fontSize: '0.7rem', color: '#F87171', fontWeight: 700, marginTop: '0.15rem' }}>
                    +{deltaRed} (↑{pctRed}%)
                  </div>
                )}
              </div>

              {/* Exposed Population Metric */}
              <div style={{
                background: 'rgba(249, 115, 22, 0.08)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: 6,
                padding: '0.75rem'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#FB923C', fontWeight: 600 }}>Population at Risk</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {baselineStats.totalPopulationAtRisk.toLocaleString()}
                  </span>
                  <ArrowRight size={12} color="#F97316" />
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: '#F97316' }}>
                    {simulatedStats.totalPopulationAtRisk.toLocaleString()}
                  </strong>
                </div>
                {deltaPop > 0 && (
                  <div style={{ fontSize: '0.7rem', color: '#FB923C', fontWeight: 700, marginTop: '0.15rem' }}>
                    +{deltaPop.toLocaleString()} (↑{pctPop}%)
                  </div>
                )}
              </div>

              {/* Shelter Deficit Metric */}
              <div style={{
                background: 'rgba(168, 85, 247, 0.08)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: 6,
                padding: '0.75rem'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#C084FC', fontWeight: 600 }}>Shelter Deficit</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {baselineStats.totalCapacityDeficit.toLocaleString()}
                  </span>
                  <ArrowRight size={12} color="#A855F7" />
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: '#A855F7' }}>
                    {simulatedStats.totalCapacityDeficit.toLocaleString()}
                  </strong>
                </div>
                {deltaDeficit > 0 && (
                  <div style={{ fontSize: '0.7rem', color: '#C084FC', fontWeight: 700, marginTop: '0.15rem' }}>
                    +{deltaDeficit.toLocaleString()} (↑{pctDeficit}%)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleReset}>
            <RotateCcw size={15} />
            <span>Reset Baseline</span>
          </button>
          <button id="btn-apply-sim" className="btn btn-sim" onClick={handleApply}>
            <Play size={15} />
            <span>Apply Simulation to Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}
