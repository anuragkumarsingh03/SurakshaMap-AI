import React, { useState, useMemo, useCallback } from 'react';
import { 
  REGION_METADATA, 
  INITIAL_HABITATIONS, 
  INITIAL_SHELTERS 
} from './data/disasterRegionData.js';
import { assessHabitationRisk } from './services/riskEngine.js';
import { calculateHabitationDeficit } from './services/capacityEngine.js';
import { calculateRelocationPriority } from './services/relocationEngine.js';

import { Header } from './components/Header.jsx';
import { ExecutiveKpis } from './components/ExecutiveKpis.jsx';
import { RiskMap } from './components/RiskMap.jsx';
import { HabitationDetailDrawer } from './components/HabitationDetailDrawer.jsx';
import { WhatIfSimulator } from './components/WhatIfSimulator.jsx';
import { FieldOfficerTerminal } from './components/FieldOfficerTerminal.jsx';
import { OfficialReportModal } from './components/OfficialReportModal.jsx';
import { AlertsPanel } from './components/AlertsPanel.jsx';
import { ShelterCapacityModal } from './components/ShelterCapacityModal.jsx';
import { ActionQueue } from './components/ActionQueue.jsx';
import { AuditTrailModal } from './components/AuditTrailModal.jsx';

export default function App() {
  // Region & Entities
  const [habitations, setHabitations] = useState(INITIAL_HABITATIONS);
  const [shelters, setShelters] = useState(INITIAL_SHELTERS);

  // Selected State
  const [selectedHabitationId, setSelectedHabitationId] = useState(INITIAL_HABITATIONS[0].id);
  const [highlightedDestination, setHighlightedDestination] = useState(null);

  // Human Verification States Map: { [habId]: { isVerified: boolean, verifiedBy: string, verifiedAt: string } }
  const [verifications, setVerifications] = useState({
    'hab-01': { isVerified: true, verifiedBy: 'DDMA Commander Borah', verifiedAt: '14:02 IST' }
  });

  // User Role & 5-Stage Incident Mode (PRD V2 Item 7)
  const [currentRole, setCurrentRole] = useState('ddma');
  const [incidentMode, setIncidentMode] = useState('EMERGENCY');

  // Simulation Offsets
  const [simulationOffsets, setSimulationOffsets] = useState({
    rainfallPercent: 0,
    riverSurgeMeters: 0,
    triggerLandslide: false
  });

  // Modals
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isFieldTerminalOpen, setIsFieldTerminalOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isShelterModalOpen, setIsShelterModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isActionQueueOpen, setIsActionQueueOpen] = useState(false);
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);

  // EOC Audit Trail Log (PRD V2 Item 9)
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'log-01',
      timestamp: '14:00 IST',
      category: 'SYSTEM STARTUP',
      severity: 'normal',
      description: 'SurakshaMap AI EOC operational engine initialized. Basemap, sensor telemetry and 12 habitations loaded.',
      initiator: 'System Daemon',
      status: 'SUCCESS'
    },
    {
      id: 'log-02',
      timestamp: '14:02 IST',
      category: 'HUMAN VERIFICATION',
      severity: 'verified',
      description: 'DDMA Commander Borah signed off and verified risk assessment for Majuli Char Village.',
      initiator: 'DDMA Commander Borah',
      status: 'VERIFIED'
    },
    {
      id: 'log-03',
      timestamp: '14:05 IST',
      category: 'TELEMETRY UPDATE',
      severity: 'critical',
      description: 'Subansiri river gauge reported water level rise to 104.2m (+0.7m above high danger mark).',
      initiator: 'CWC Hydrologic Sensor #SB-04',
      status: 'RECORDED'
    },
    {
      id: 'log-04',
      timestamp: '14:07 IST',
      category: 'ZONE ESCALATION',
      severity: 'critical',
      description: 'Subansiri Lowland Basti risk escalated 71 -> 86. Zone transitioned ORANGE -> RED.',
      initiator: 'Risk Engine Rule Evaluator',
      status: 'ESCALATED'
    }
  ]);

  const logAuditEvent = useCallback((category, description, severity = 'normal', status = 'LOGGED') => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      category,
      severity,
      description,
      initiator: currentRole === 'ddma' ? 'DDMA Incident Commander' : currentRole === 'field' ? 'Field Officer (Mobile)' : 'EOC Operator',
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, [currentRole]);

  // Initial System Alerts
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-01',
      category: 'RED-ZONE ESCALATION',
      severity: 'critical',
      title: 'Majuli Char Village: Red-Zone Critical Relocation Triggered',
      message: 'Active Subansiri river gauge 104.2m overtopping local ring bund. Available shelter deficit: 3,543 heads. Immediate evacuation directive required.',
      habitationId: 'hab-01',
      timestamp: '09:42 IST'
    },
    {
      id: 'alt-02',
      category: 'ROUTE COMPROMISED',
      severity: 'high',
      title: 'Dhakuakhana - Majuli Connecting Corridor Submerged',
      message: 'Water depth exceeds 1.2 meters over eastern culvert. Heavy evacuation vehicles rerouted to northern bypass.',
      habitationId: 'hab-02',
      timestamp: '09:15 IST'
    },
    {
      id: 'alt-03',
      category: 'CAPACITY ALERT',
      severity: 'critical',
      title: 'Subansiri Forward Camp Overcrowded',
      message: 'Facility operating at 94% occupancy. Essential drinking water reserve down to 18 hours. Rerouting new evacuees to Dhakuakhana Stadium.',
      habitationId: 'hab-05',
      timestamp: '08:50 IST'
    }
  ]);

  // Priority Action Queue (PRD V2 Item 8)
  const [actionQueue, setActionQueue] = useState([
    {
      id: 'act-01',
      habitationId: 'hab-01',
      habitationName: 'Majuli Char Village',
      priority: 'Critical',
      actionType: 'Authority Evacuation Directive',
      directive: 'Sign and transmit mandatory evacuation order for 3,560 vulnerable residents to Dhakuakhana Stadium.',
      status: 'Pending'
    },
    {
      id: 'act-02',
      habitationId: 'hab-02',
      habitationName: 'Subansiri Lowland Basti',
      priority: 'Critical',
      actionType: 'Verify Route & Mobilize Trucks',
      directive: 'Culvert submerged. Dispatch 4x4 high-clearance military trucks and engineer reconnaissance team.',
      status: 'Pending'
    },
    {
      id: 'act-03',
      habitationId: 'hab-03',
      habitationName: 'Rongpur Foothill Settlement',
      priority: 'High',
      actionType: 'Slope Failure Pre-Warning',
      directive: 'Gao Burah (Village Head) alerted regarding saturated hillside cracks. Prepare community shelter.',
      status: 'Pending'
    }
  ]);

  // Compute live assessments for all habitations
  const habitationsWithAssessments = useMemo(() => {
    return habitations.map(habitation => {
      const vState = verifications[habitation.id] || {};
      const risk = assessHabitationRisk(habitation, simulationOffsets, undefined, vState);
      const capacity = calculateHabitationDeficit(habitation, risk);
      const relocation = calculateRelocationPriority(habitation, risk, capacity);

      return {
        habitation,
        risk,
        capacity,
        relocation
      };
    });
  }, [habitations, simulationOffsets, verifications]);

  // Selected assessment item
  const selectedAssessmentItem = useMemo(() => {
    return habitationsWithAssessments.find(item => item.habitation.id === selectedHabitationId) || habitationsWithAssessments[0];
  }, [habitationsWithAssessments, selectedHabitationId]);

  // Compute Overall Executive KPIs
  const statistics = useMemo(() => {
    let red = 0, orange = 0, yellow = 0, green = 0;
    let totalRiskPop = 0;
    let criticalReloc = 0;
    let totalDeficit = 0;

    habitationsWithAssessments.forEach(item => {
      const { risk, capacity, relocation } = item;
      if (risk.zone === 'Red') red++;
      else if (risk.zone === 'Orange') orange++;
      else if (risk.zone === 'Yellow') yellow++;
      else green++;

      if (risk.zone === 'Red' || risk.zone === 'Orange') {
        totalRiskPop += item.habitation.exposedPopulation;
      }

      if (relocation.priorityLevel === 'Critical') {
        criticalReloc++;
      }

      totalDeficit += capacity.deficit;
    });

    const totalAvailableShelter = shelters.reduce((acc, sh) => acc + Math.max(0, sh.maxCapacity - sh.currentOccupancy), 0);

    return {
      totalHabitations: habitations.length,
      redZonesCount: red,
      orangeZonesCount: orange,
      yellowZonesCount: yellow,
      greenZonesCount: green,
      totalPopulationAtRisk: totalRiskPop,
      criticalRelocationCount: criticalReloc,
      totalAvailableShelterCapacity: totalAvailableShelter,
      totalCapacityDeficit: totalDeficit
    };
  }, [habitationsWithAssessments, habitations.length, shelters]);

  // Simulated Stats Calculation Helper for What-If Before vs After Modal
  const calculateSimulatedStats = useCallback((offsets) => {
    let red = 0, pop = 0, deficit = 0;
    habitations.forEach(hab => {
      const risk = assessHabitationRisk(hab, offsets);
      const cap = calculateHabitationDeficit(hab, risk);
      if (risk.zone === 'Red') red++;
      if (risk.zone === 'Red' || risk.zone === 'Orange') pop += hab.exposedPopulation;
      deficit += cap.deficit;
    });
    return {
      redZonesCount: red,
      totalPopulationAtRisk: pop,
      totalCapacityDeficit: deficit
    };
  }, [habitations]);

  // Handlers
  const handleSelectHabitation = (hab) => {
    setSelectedHabitationId(hab.id);
  };

  const handleSelectHabitationById = (habId) => {
    setSelectedHabitationId(habId);
  };

  const handleVerifyAssessment = (habId) => {
    const officerName = currentRole === 'ddma' ? 'DDMA Incident Commander' : 'Field Inspector';
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    setVerifications(prev => ({
      ...prev,
      [habId]: { isVerified: true, verifiedBy: officerName, verifiedAt: timeStr }
    }));
    const targetHab = habitations.find(h => h.id === habId);
    logAuditEvent(
      'HUMAN VERIFICATION', 
      `Assessment for "${targetHab?.name || habId}" formally verified and approved by ${officerName}.`, 
      'verified', 
      'VERIFIED'
    );
  };

  const handleDisputeAssessment = (habId) => {
    const targetHab = habitations.find(h => h.id === habId);
    logAuditEvent(
      'ASSESSMENT DISPUTE', 
      `Officer flagged dispute on automated model output for "${targetHab?.name || habId}". Field recount ordered.`, 
      'dispute', 
      'FLAGGED FOR RE-AUDIT'
    );
    alert(`Dispute recorded for ${targetHab?.name || habId}. Audit trail updated; engineering recount flagged.`);
  };

  const handleExecuteAction = (actionId) => {
    setActionQueue(prev => prev.map(a => {
      if (a.id === actionId) {
        logAuditEvent(
          'OPERATIONAL DIRECTIVE', 
          `Directive Authorized: "${a.directive}" for ${a.habitationName}.`, 
          'verified', 
          'EXECUTED'
        );
        return { ...a, status: 'Completed' };
      }
      return a;
    }));
  };

  const handleApplySimulation = (offsets) => {
    setSimulationOffsets(offsets);
    setIsSimulatorOpen(false);

    logAuditEvent(
      'SIMULATION APPLIED',
      `What-If Stress Scenario Applied: +${offsets.rainfallPercent}% Rainfall, +${offsets.riverSurgeMeters}m River Surge. Landslide: ${offsets.triggerLandslide ? 'TRIGGERED' : 'OFF'}.`,
      'critical',
      'SIMULATING'
    );

    const simAlert = {
      id: `sim-${Date.now()}`,
      category: 'WHAT-IF STRESS DRILL',
      severity: 'critical',
      title: `Simulation Active: +${offsets.rainfallPercent}% Rain, +${offsets.riverSurgeMeters}m River`,
      message: `System dynamically recalculated risk surfaces. Red zones escalated to ${statistics.redZonesCount}.`,
      timestamp: new Date().toLocaleTimeString()
    };
    setAlerts(prev => [simAlert, ...prev]);
  };

  const handleResetSimulation = () => {
    setSimulationOffsets({
      rainfallPercent: 0,
      riverSurgeMeters: 0,
      triggerLandslide: false
    });
    setIsSimulatorOpen(false);
    logAuditEvent('SIMULATION RESET', 'What-If Simulation cleared. Returned to live telemetry baseline.', 'normal', 'BASELINE');
  };

  const handleSubmitFieldReport = (report) => {
    setHabitations(prev => prev.map(hab => {
      if (hab.id === report.habitationId) {
        return {
          ...hab,
          exposedPopulation: hab.exposedPopulation + report.affectedCount,
          infrastructure: {
            ...hab.infrastructure,
            roadAccessibility: report.roadStatus,
            roadConditionScore: Math.max(0.1, (hab.infrastructure.roadConditionScore ?? 0.5) - 0.2)
          }
        };
      }
      return hab;
    }));

    if (report.shelterOccupancyDelta > 0) {
      setShelters(prev => {
        const firstAvail = prev[0];
        if (!firstAvail) return prev;
        return prev.map(sh => {
          if (sh.id === firstAvail.id) {
            return {
              ...sh,
              currentOccupancy: Math.min(sh.maxCapacity, sh.currentOccupancy + report.shelterOccupancyDelta)
            };
          }
          return sh;
        });
      });
    }

    logAuditEvent(
      'FIELD INCIDENT REPORT',
      `${report.habitationName}: ${report.hazardType} submitted by ${report.officer}. Notes: "${report.fieldNotes}"`,
      'critical',
      'VERIFIED'
    );

    const newAlert = {
      id: report.id,
      category: 'GROUND FIELD REPORT',
      severity: 'critical',
      title: `${report.habitationName}: ${report.hazardType}`,
      message: `${report.officer} verified: ${report.affectedCount} newly affected residents. Notes: "${report.fieldNotes}"`,
      habitationId: report.habitationId,
      timestamp: report.timestamp
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleUpdateShelterOccupancy = (shelterId, delta) => {
    setShelters(prev => prev.map(sh => {
      if (sh.id === shelterId) {
        const updated = Math.max(0, Math.min(sh.maxCapacity, sh.currentOccupancy + delta));
        logAuditEvent(
          'CAPACITY MODIFIED',
          `Shelter "${sh.name}" occupancy changed by ${delta > 0 ? `+${delta}` : delta} (New: ${updated}/${sh.maxCapacity}).`,
          'normal',
          'UPDATED'
        );
        return { ...sh, currentOccupancy: updated };
      }
      return sh;
    }));
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const isSimulating = simulationOffsets.rainfallPercent > 0 || simulationOffsets.riverSurgeMeters > 0 || simulationOffsets.triggerLandslide;

  return (
    <div className="app-container">
      {/* Top Application Bar */}
      <Header 
        regionMetadata={REGION_METADATA}
        alertsCount={alerts.length}
        actionQueueCount={actionQueue.filter(a => a.status !== 'Completed').length}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenFieldTerminal={() => setIsFieldTerminalOpen(true)}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        onOpenShelters={() => setIsShelterModalOpen(true)}
        onOpenActionQueue={() => setIsActionQueueOpen(true)}
        onOpenAuditTrail={() => setIsAuditTrailOpen(true)}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        incidentMode={incidentMode}
        setIncidentMode={setIncidentMode}
        isSimulating={isSimulating}
      />

      {/* KPI Ribbon */}
      <ExecutiveKpis statistics={statistics} />

      {/* Main Workspace (Map + Inspection Drawer) */}
      <div className="workspace-grid">
        <RiskMap 
          habitationsWithAssessments={habitationsWithAssessments}
          shelters={shelters}
          selectedHabitation={selectedAssessmentItem?.habitation}
          onSelectHabitation={handleSelectHabitation}
          highlightedDestination={highlightedDestination}
        />

        {selectedAssessmentItem && (
          <HabitationDetailDrawer 
            habitation={selectedAssessmentItem.habitation}
            assessment={selectedAssessmentItem}
            shelters={shelters}
            onClose={() => setSelectedHabitationId(null)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onHighlightDestination={(dest) => setHighlightedDestination(dest)}
            onVerifyAssessment={handleVerifyAssessment}
            onDisputeAssessment={handleDisputeAssessment}
            simulationOffsets={simulationOffsets}
          />
        )}
      </div>

      {/* What-If Simulator Modal (Before vs After) */}
      {isSimulatorOpen && (
        <WhatIfSimulator 
          currentOffsets={simulationOffsets}
          onApplySimulation={handleApplySimulation}
          onResetSimulation={handleResetSimulation}
          onClose={() => setIsSimulatorOpen(false)}
          baselineStats={statistics}
          habitations={habitations}
          shelters={shelters}
          calculateSimulatedStats={calculateSimulatedStats}
        />
      )}

      {/* Priority Action Queue Modal */}
      {isActionQueueOpen && (
        <ActionQueue 
          queueItems={actionQueue}
          onExecuteAction={handleExecuteAction}
          onSelectHabitation={handleSelectHabitationById}
          onClose={() => setIsActionQueueOpen(false)}
        />
      )}

      {/* EOC Audit Trail Modal */}
      {isAuditTrailOpen && (
        <AuditTrailModal 
          auditLogs={auditLogs}
          onClose={() => setIsAuditTrailOpen(false)}
        />
      )}

      {/* Field Officer Terminal Modal */}
      {isFieldTerminalOpen && (
        <FieldOfficerTerminal 
          habitations={habitations}
          onSubmitReport={handleSubmitFieldReport}
          onClose={() => setIsFieldTerminalOpen(false)}
        />
      )}

      {/* Official Government Dossier Modal */}
      {isReportModalOpen && selectedAssessmentItem && (
        <OfficialReportModal 
          habitation={selectedAssessmentItem.habitation}
          assessment={selectedAssessmentItem}
          shelters={shelters}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}

      {/* Alerts Feed Drawer Modal */}
      {isAlertsOpen && (
        <AlertsPanel 
          alerts={alerts}
          onDismissAlert={handleDismissAlert}
          onSelectHabitationById={handleSelectHabitationById}
          onClose={() => setIsAlertsOpen(false)}
        />
      )}

      {/* Master Relief Shelter Capacity Modal */}
      {isShelterModalOpen && (
        <ShelterCapacityModal 
          shelters={shelters}
          onUpdateOccupancy={handleUpdateShelterOccupancy}
          onClose={() => setIsShelterModalOpen(false)}
        />
      )}
    </div>
  );
}
