import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Sliders, 
  Send, 
  Bell, 
  Layers, 
  Clock, 
  Droplets,
  Building2,
  ListOrdered,
  History,
  AlertOctagon,
  Database
} from 'lucide-react';

export function Header({ 
  regionMetadata, 
  alertsCount, 
  actionQueueCount,
  onOpenSimulator, 
  onOpenFieldTerminal, 
  onOpenAlerts, 
  onOpenShelters,
  onOpenActionQueue,
  onOpenAuditTrail,
  currentRole, 
  setCurrentRole,
  incidentMode,
  setIncidentMode,
  isSimulating
}) {
  const currentTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Incident mode styling
  const modeColors = {
    NORMAL: '#10B981',
    WATCH: '#EAB308',
    WARNING: '#F97316',
    EMERGENCY: '#EF4444',
    CRITICAL: '#A855F7'
  };

  return (
    <header className="header-bar">
      <div className="brand-section">
        <div className="brand-logo-badge">
          <ShieldAlert size={22} color="#FFFFFF" />
        </div>
        <div>
          <div className="brand-title">
            SurakshaMap <span style={{ color: '#38BDF8', fontWeight: 800 }}>AI</span>
            <span className="brand-tag">EOC v2.0</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            AI-Assisted Risk Assessment & Carrying Capacity Decision Platform
          </div>
        </div>
      </div>

      {/* Center Telemetry & Incident Mode (PRD V2 Item 6 & 7) */}
      <div className="header-center-telemetry">
        {/* Data Provenance Badge */}
        <div className="telemetry-chip" style={{ background: isSimulating ? 'rgba(239, 68, 68, 0.12)' : 'rgba(56, 189, 248, 0.08)' }}>
          <Database size={13} color={isSimulating ? '#F87171' : '#38BDF8'} />
          <span style={{ fontSize: '0.72rem' }}>
            DATA MODE: <strong style={{ color: isSimulating ? '#EF4444' : '#38BDF8' }}>{isSimulating ? 'SIMULATION' : 'LIVE TELEMETRY'}</strong>
          </span>
        </div>

        {/* 5-Stage Incident Mode Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Incident Stage:
          </span>
          <select 
            id="select-incident-mode"
            className="role-badge-select"
            style={{ 
              color: modeColors[incidentMode] || '#FFFFFF',
              borderColor: modeColors[incidentMode] || 'var(--border-subtle)',
              fontWeight: 700,
              padding: '0.3rem 0.6rem'
            }}
            value={incidentMode}
            onChange={(e) => setIncidentMode(e.target.value)}
            title="Switch National EOC Incident Response Stage"
          >
            <option value="NORMAL">STAGE 1: NORMAL (Preparedness)</option>
            <option value="WATCH">STAGE 2: WATCH (Monitor Risk)</option>
            <option value="WARNING">STAGE 3: WARNING (Resource Standby)</option>
            <option value="EMERGENCY">STAGE 4: EMERGENCY (Evacuation)</option>
            <option value="CRITICAL">STAGE 5: CRITICAL (Life Safety Ops)</option>
          </select>
        </div>

        {/* River Hydrologic Gauge */}
        <div className="telemetry-chip">
          <Droplets size={14} color="#38BDF8" />
          <span>River Gauge: <strong style={{ color: '#F87171' }}>{regionMetadata.currentWaterLevelMeters}m</strong> (Danger: {regionMetadata.dangerWaterLevelMeters}m)</span>
        </div>
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Priority Action Queue */}
        <button 
          id="btn-action-queue"
          className="btn btn-secondary"
          onClick={onOpenActionQueue}
          title="Open Priority Action Queue"
          style={{ position: 'relative' }}
        >
          <ListOrdered size={16} color="#38BDF8" />
          <span>Action Queue</span>
          {actionQueueCount > 0 && (
            <span style={{
              background: '#0284C7',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: 700,
              borderRadius: '999px',
              padding: '0.1rem 0.35rem',
              marginLeft: '0.2rem'
            }}>
              {actionQueueCount}
            </span>
          )}
        </button>

        {/* Audit Trail */}
        <button 
          id="btn-audit-trail"
          className="btn btn-secondary"
          onClick={onOpenAuditTrail}
          title="Inspect EOC Chronological Decision Audit Trail"
        >
          <History size={16} color="#94A3B8" />
          <span>Audit Trail</span>
        </button>

        {/* Shelter Master Matrix */}
        <button 
          id="btn-shelter-overview"
          className="btn btn-secondary" 
          onClick={onOpenShelters}
          title="Inspect All Relief Shelters & Bottleneck Capacities"
        >
          <Building2 size={16} />
          <span>Shelters</span>
        </button>

        {/* Field Reporting */}
        <button 
          id="btn-field-terminal"
          className="btn btn-secondary" 
          onClick={onOpenFieldTerminal}
          title="Open Field Officer Mobile Reporting Terminal"
        >
          <Send size={16} color="#34D399" />
          <span>Field Report</span>
        </button>

        {/* What-If Simulator */}
        <button 
          id="btn-what-if-sim"
          className={`btn ${isSimulating ? 'btn-danger' : 'btn-sim'}`} 
          onClick={onOpenSimulator}
          title="Predictive Disaster Simulation Sandbox"
        >
          <Sliders size={16} />
          <span>{isSimulating ? 'Active Sim' : 'What-If Sim'}</span>
        </button>

        {/* Alerts Bell */}
        <button 
          id="btn-alerts-panel"
          className="btn btn-secondary" 
          style={{ position: 'relative', padding: '0.5rem 0.75rem' }}
          onClick={onOpenAlerts}
          title="View Active Disaster Alerts"
        >
          <Bell size={17} />
          {alertsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#EF4444',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: 700,
              borderRadius: '999px',
              padding: '0.1rem 0.4rem',
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)'
            }}>
              {alertsCount}
            </span>
          )}
        </button>

        {/* User Role Switcher */}
        <select 
          id="select-user-role"
          className="role-badge-select"
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
          title="Switch User Role Perspective"
        >
          <option value="ddma">DDMA Incident Commander</option>
          <option value="field">Field Officer (Mobile Mode)</option>
          <option value="analyst">Geospatial Risk Analyst</option>
          <option value="admin">Platform Administrator</option>
        </select>
      </div>
    </header>
  );
}
