import React from 'react';
import { 
  X, 
  Bell, 
  AlertTriangle, 
  Flame, 
  ShieldAlert, 
  Check, 
  ArrowRight 
} from 'lucide-react';

export function AlertsPanel({ 
  alerts, 
  onDismissAlert, 
  onSelectHabitationById, 
  onClose 
}) {
  return (
    <div className="modal-overlay" id="alerts-panel-modal">
      <div className="modal-content" style={{ maxWidth: '580px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Bell size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>EOC Active Alerts Feed</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                PRD Section 23: Dynamic Hazard, Capacity & Route Alerts
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Alerts">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              No critical active alerts at this moment. System within stable thresholds.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {alerts.map(alert => (
                <div 
                  key={alert.id}
                  style={{
                    background: alert.severity === 'critical' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(249, 115, 22, 0.12)',
                    border: `1px solid ${alert.severity === 'critical' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(249, 115, 22, 0.4)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: alert.severity === 'critical' ? '#F87171' : '#FB923C'
                    }}>
                      {alert.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {alert.timestamp}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>
                    {alert.title}
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                    {alert.message}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                    {alert.habitationId && (
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', gap: '0.3rem' }}
                        onClick={() => {
                          onSelectHabitationById(alert.habitationId);
                          onClose();
                        }}
                      >
                        <span>Inspect on Map</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                    <button 
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', marginLeft: 'auto' }}
                      onClick={() => onDismissAlert(alert.id)}
                    >
                      <Check size={13} />
                      <span>Acknowledge</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
