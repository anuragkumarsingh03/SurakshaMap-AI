import React from 'react';
import { 
  History, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  UserCheck, 
  Activity,
  Shield,
  Download
} from 'lucide-react';

export function AuditTrailModal({ 
  auditLogs, 
  onClose 
}) {
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Timestamp,Category,Event Description,Initiator,Status"]
      .concat(auditLogs.map(l => `"${l.timestamp}","${l.category}","${l.description}","${l.initiator}","${l.status}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `surakshamap_eoc_audit_trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" id="audit-trail-modal">
      <div className="modal-content" style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #475569, #334155)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <History size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>EOC Decision Audit Trail</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                PRD V2 Section 9: Immutable Chronological Operational & Verification Log
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Audit Trail">
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {auditLogs.map((log) => (
              <div 
                key={log.id}
                style={{
                  background: 'var(--bg-card)',
                  borderLeft: `3px solid ${
                    log.severity === 'critical' ? '#EF4444' : 
                    log.severity === 'verified' ? '#10B981' : 
                    log.severity === 'dispute' ? '#F59E0B' : '#38BDF8'
                  }`,
                  borderTop: '1px solid var(--border-subtle)',
                  borderRight: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)'
                    }}>
                      {log.timestamp}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: '#E2E8F0'
                    }}>
                      {log.category}
                    </span>
                  </div>

                  <span style={{
                    fontSize: '0.7rem',
                    color: log.severity === 'verified' ? '#34D399' : '#94A3B8'
                  }}>
                    {log.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.825rem', color: '#F1F5F9', lineHeight: 1.4 }}>
                  {log.description}
                </div>

                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Logged by: <strong>{log.initiator}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={14} />
            <span>Export CSV Audit Log</span>
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
