import React from 'react';
import { 
  ListOrdered, 
  CheckCircle, 
  AlertCircle, 
  Truck, 
  ShieldAlert, 
  ArrowRight,
  Clock,
  Check
} from 'lucide-react';

export function ActionQueue({ 
  queueItems, 
  onExecuteAction, 
  onSelectHabitation, 
  onClose 
}) {
  return (
    <div className="modal-overlay" id="action-queue-modal">
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #0284C7, #0369A1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ListOrdered size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>EOC Priority Action Queue</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                PRD V2 Section 8: Mission-Critical Task Triage & Operational Directives
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Action Queue">
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <div style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontSize: '0.78rem',
            color: '#BAE6FD',
            lineHeight: 1.45
          }}>
            Real-time operational directives generated from multi-hazard scores, shelter bottleneck deficits, and impassable evacuation corridors.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {queueItems.map((item, index) => {
              const isDone = item.status === 'Completed';
              return (
                <div 
                  key={item.id}
                  style={{
                    background: isDone ? 'rgba(16, 185, 129, 0.08)' : item.priority === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-card)',
                    border: `1px solid ${isDone ? 'rgba(16, 185, 129, 0.3)' : item.priority === 'Critical' ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    opacity: isDone ? 0.7 : 1
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.08)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: 4,
                        fontWeight: 700
                      }}>
                        #{index + 1}
                      </span>
                      <strong style={{ fontSize: '0.9rem', color: '#F8FAFC' }}>
                        {item.habitationName}
                      </strong>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.4rem',
                        borderRadius: 4,
                        background: item.priority === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(249, 115, 22, 0.2)',
                        color: item.priority === 'Critical' ? '#F87171' : '#FB923C'
                      }}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.72rem', color: isDone ? '#34D399' : 'var(--text-muted)' }}>
                      {item.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                    {item.directive}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.35rem',
                    paddingTop: '0.4rem',
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Target Action: <strong style={{ color: '#38BDF8' }}>{item.actionType}</strong>
                    </span>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {item.habitationId && (
                        <button 
                          className="btn btn-secondary"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
                          onClick={() => {
                            onSelectHabitation(item.habitationId);
                            onClose();
                          }}
                        >
                          <span>Map Focus</span>
                          <ArrowRight size={12} />
                        </button>
                      )}

                      {!isDone && (
                        <button 
                          className="btn btn-primary"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem', background: '#0284C7' }}
                          onClick={() => onExecuteAction(item.id)}
                        >
                          <Check size={12} />
                          <span>Authorize Directive</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close Queue
          </button>
        </div>
      </div>
    </div>
  );
}
