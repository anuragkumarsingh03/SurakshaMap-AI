import React from 'react';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Home, 
  ShieldAlert, 
  TrendingUp,
  Flame
} from 'lucide-react';

export function ExecutiveKpis({ statistics }) {
  const {
    totalHabitations,
    redZonesCount,
    orangeZonesCount,
    yellowZonesCount,
    greenZonesCount,
    totalPopulationAtRisk,
    criticalRelocationCount,
    totalAvailableShelterCapacity,
    totalCapacityDeficit
  } = statistics;

  return (
    <div className="kpi-ribbon">
      {/* Total Habitations */}
      <div className="kpi-card blue-info" id="kpi-monitored-habitations">
        <div className="kpi-card-header">
          <span>Habitations Monitored</span>
          <MapPin size={15} color="#38BDF8" />
        </div>
        <div className="kpi-card-value">
          {totalHabitations}
          <span className="kpi-subtext">clusters</span>
        </div>
        <div className="kpi-subtext">Dhemaji - Majuli Sector</div>
      </div>

      {/* Red Zones */}
      <div className="kpi-card red-alert" id="kpi-red-zones">
        <div className="kpi-card-header">
          <span style={{ color: '#F87171' }}>Red Zones (Critical)</span>
          <Flame size={16} color="#EF4444" />
        </div>
        <div className="kpi-card-value" style={{ color: '#F87171' }}>
          {redZonesCount}
          <span className="kpi-subtext" style={{ color: '#FCA5A5' }}>
            ({Math.round((redZonesCount / (totalHabitations || 1)) * 100)}%)
          </span>
        </div>
        <div className="kpi-subtext" style={{ color: '#F87171' }}>
          Immediate authority focus
        </div>
      </div>

      {/* Orange Zones */}
      <div className="kpi-card orange-alert" id="kpi-orange-zones">
        <div className="kpi-card-header">
          <span style={{ color: '#FB923C' }}>Orange Zones (High)</span>
          <AlertTriangle size={15} color="#F97316" />
        </div>
        <div className="kpi-card-value" style={{ color: '#FB923C' }}>
          {orangeZonesCount}
          <span className="kpi-subtext">pre-evac</span>
        </div>
        <div className="kpi-subtext">Prepare logistics</div>
      </div>

      {/* Population at Risk */}
      <div className="kpi-card blue-info" id="kpi-pop-at-risk">
        <div className="kpi-card-header">
          <span>Population at Risk</span>
          <Users size={15} color="#38BDF8" />
        </div>
        <div className="kpi-card-value">
          {totalPopulationAtRisk.toLocaleString()}
          <span className="kpi-subtext">residents</span>
        </div>
        <div className="kpi-subtext">Direct hazard footprint</div>
      </div>

      {/* Critical Relocation Cases */}
      <div className="kpi-card red-alert" id="kpi-critical-relocations">
        <div className="kpi-card-header">
          <span style={{ color: '#F87171' }}>Critical Relocations</span>
          <ShieldAlert size={15} color="#EF4444" />
        </div>
        <div className="kpi-card-value" style={{ color: '#F87171' }}>
          {criticalRelocationCount}
          <span className="kpi-subtext">villages</span>
        </div>
        <div className="kpi-subtext">Evacuation priority</div>
      </div>

      {/* Shelter Capacity vs Deficit */}
      <div className="kpi-card purple-capacity" id="kpi-shelter-deficit">
        <div className="kpi-card-header">
          <span style={{ color: '#C084FC' }}>Shelter Deficit</span>
          <Home size={15} color="#A855F7" />
        </div>
        <div className="kpi-card-value" style={{ color: totalCapacityDeficit > 0 ? '#F87171' : '#34D399' }}>
          {totalCapacityDeficit.toLocaleString()}
          <span className="kpi-subtext">unmet</span>
        </div>
        <div className="kpi-subtext">
          Available capacity: {totalAvailableShelterCapacity.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
