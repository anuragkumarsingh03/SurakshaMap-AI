import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Filter, 
  Layers, 
  Eye, 
  Navigation, 
  ShieldCheck, 
  AlertOctagon,
  RefreshCw
} from 'lucide-react';
import { 
  HAZARD_ZONES, 
  RIVER_NETWORKS, 
  ROAD_CORRIDORS 
} from '../data/disasterRegionData.js';

export function RiskMap({ 
  habitationsWithAssessments, 
  shelters, 
  selectedHabitation, 
  onSelectHabitation,
  highlightedDestination
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupsRef = useRef({
    habitations: null,
    shelters: null,
    hazards: null,
    rivers: null,
    roads: null,
    evacVector: null
  });

  // Layer toggle states
  const [activeLayers, setActiveLayers] = useState({
    floodZones: true,
    landslideZones: true,
    shelters: true,
    evacRoutes: true,
    rivers: true
  });

  // Filter states
  const [filterZone, setFilterZone] = useState('ALL');
  const [filterHazard, setFilterHazard] = useState('ALL');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [27.31, 94.48],
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom control at top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dark theme CartoDB basemap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      // Layer groups
      layerGroupsRef.current.hazards = L.layerGroup().addTo(map);
      layerGroupsRef.current.rivers = L.layerGroup().addTo(map);
      layerGroupsRef.current.roads = L.layerGroup().addTo(map);
      layerGroupsRef.current.shelters = L.layerGroup().addTo(map);
      layerGroupsRef.current.habitations = L.layerGroup().addTo(map);
      layerGroupsRef.current.evacVector = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map persistent across component re-renders
    };
  }, []);

  // Update Hazard Overlays (Rivers, Roads, Polygons)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // 1. Hazards Polygons
    const hazardGroup = layerGroupsRef.current.hazards;
    hazardGroup.clearLayers();

    if (activeLayers.floodZones) {
      const floodZone = HAZARD_ZONES.find(h => h.type === 'flood');
      if (floodZone) {
        L.polygon(floodZone.polygon, {
          color: '#06B6D4',
          fillColor: '#0891B2',
          fillOpacity: 0.22,
          weight: 2,
          dashArray: '4, 6'
        }).bindTooltip(`<strong>Active Inundation Sector</strong><br/>Subansiri River Basin Surge`, {
          className: 'custom-map-tooltip'
        }).addTo(hazardGroup);
      }
    }

    if (activeLayers.landslideZones) {
      const landZone = HAZARD_ZONES.find(h => h.type === 'landslide');
      if (landZone) {
        L.polygon(landZone.polygon, {
          color: '#F59E0B',
          fillColor: '#D97706',
          fillOpacity: 0.25,
          weight: 2
        }).bindTooltip(`<strong>Landslide Slip Area</strong><br/>Foothill Slope Instability`, {
          className: 'custom-map-tooltip'
        }).addTo(hazardGroup);
      }
    }

    // 2. Rivers
    const riverGroup = layerGroupsRef.current.rivers;
    riverGroup.clearLayers();
    if (activeLayers.rivers) {
      RIVER_NETWORKS.forEach(river => {
        L.polyline(river.path, {
          color: '#38BDF8',
          weight: 5,
          opacity: 0.85
        }).bindTooltip(`<strong>${river.name}</strong><br/>Level: ${river.waterLevel}`, {
          sticky: true
        }).addTo(riverGroup);
      });
    }

    // 3. Road Networks
    const roadGroup = layerGroupsRef.current.roads;
    roadGroup.clearLayers();
    if (activeLayers.evacRoutes) {
      ROAD_CORRIDORS.forEach(road => {
        const roadColor = road.riskLevel === 'High' ? '#EF4444' : road.riskLevel === 'Moderate' ? '#F97316' : '#10B981';
        L.polyline(road.path, {
          color: roadColor,
          weight: 4,
          opacity: 0.8,
          dashArray: road.riskLevel === 'High' ? '6, 6' : undefined
        }).bindTooltip(`<strong>${road.name}</strong><br/>Status: ${road.status}`, {
          sticky: true
        }).addTo(roadGroup);
      });
    }
  }, [activeLayers]);

  // Update Shelters
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const shelterGroup = layerGroupsRef.current.shelters;
    shelterGroup.clearLayers();

    if (!activeLayers.shelters) return;

    shelters.forEach(shelter => {
      const avail = Math.max(0, shelter.maxCapacity - shelter.currentOccupancy);
      const isCritical = shelter.hazardExposure === 'Extreme' || avail < 100;

      const shelterIcon = L.divIcon({
        className: 'shelter-div-marker',
        html: `
          <div style="
            background: ${isCritical ? '#DC2626' : '#0284C7'};
            width: 32px; height: 32px;
            border-radius: 8px;
            border: 2px solid #FFFFFF;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 14px ${isCritical ? 'rgba(239, 68, 68, 0.7)' : 'rgba(14, 165, 233, 0.7)'};
            color: white; font-weight: bold; font-size: 11px;
            cursor: pointer;
          ">
            SH
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(shelter.coordinates, { icon: shelterIcon });
      marker.bindPopup(`
        <div style="font-family: var(--font-main); color: #0F172A; min-width: 200px;">
          <h4 style="margin: 0 0 4px; font-size: 0.9rem; color: #0284C7;">${shelter.name}</h4>
          <div style="font-size: 0.75rem; color: #64748B;">Capacity: <strong>${shelter.maxCapacity}</strong></div>
          <div style="font-size: 0.75rem; color: #64748B;">Current Occupancy: <strong>${shelter.currentOccupancy}</strong></div>
          <div style="font-size: 0.75rem; color: ${avail > 0 ? '#10B981' : '#EF4444'}; font-weight: bold;">
            Available Space: ${avail}
          </div>
          <div style="font-size: 0.7rem; margin-top: 4px; color: #334155;">
            Medical: ${shelter.amenities.medicalTriage}
          </div>
        </div>
      `);
      marker.addTo(shelterGroup);
    });
  }, [shelters, activeLayers.shelters]);

  // Update Habitations & Risk Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const habGroup = layerGroupsRef.current.habitations;
    habGroup.clearLayers();

    habitationsWithAssessments.forEach(item => {
      const { habitation, risk, capacity, relocation } = item;

      // Filter check
      if (filterZone !== 'ALL' && risk.zone.toUpperCase() !== filterZone) return;
      if (filterHazard === 'FLOOD' && risk.hazardDetails.floodProbability < 0.6) return;
      if (filterHazard === 'LANDSLIDE' && risk.hazardDetails.landslideProbability < 0.5) return;
      if (filterHazard === 'EROSION' && risk.hazardDetails.riverErosionProbability < 0.6) return;

      const isSelected = selectedHabitation?.id === habitation.id;
      const isRed = risk.zone === 'Red';
      const markerSize = Math.max(34, Math.min(50, Math.round(habitation.population / 100)));

      const markerHtml = `
        <div class="custom-map-marker" style="
          width: ${markerSize}px;
          height: ${markerSize}px;
          background: ${risk.zoneColor};
          border: ${isSelected ? '3px solid #38BDF8' : '2px solid #FFFFFF'};
          transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          z-index: ${isSelected ? 999 : 100};
        ">
          ${isRed ? `<div class="pulse-ring" style="border: 2px solid #EF4444;"></div>` : ''}
          <div style="display: flex; flex-direction: column; align-items: center; line-height: 1;">
            <span style="font-size: 12px; font-weight: 800;">${risk.riskScore}</span>
            <span style="font-size: 8px; opacity: 0.85; text-transform: uppercase;">${risk.zone[0]}</span>
          </div>
        </div>
      `;

      const markerIcon = L.divIcon({
        className: 'habitation-div-marker',
        html: markerHtml,
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize / 2]
      });

      const marker = L.marker(habitation.coordinates, { icon: markerIcon });
      
      marker.on('click', () => {
        onSelectHabitation(habitation);
      });

      marker.bindTooltip(`
        <strong>${habitation.name}</strong> (${risk.zone} Zone)<br/>
        Risk Score: <strong>${risk.riskScore}/100</strong><br/>
        Population at Risk: <strong>${habitation.exposedPopulation.toLocaleString()}</strong><br/>
        Relocation Priority: <strong>${relocation.priorityLevel}</strong>
      `, {
        direction: 'top',
        offset: [0, -markerSize / 2]
      });

      marker.addTo(habGroup);
    });
  }, [habitationsWithAssessments, selectedHabitation, filterZone, filterHazard]);

  // Evacuation Vector Visualization when a habitation is selected
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const vectorGroup = layerGroupsRef.current.evacVector;
    vectorGroup.clearLayers();

    if (selectedHabitation) {
      const [hLat, hLng] = selectedHabitation.coordinates;

      // Draw dashed vector line to highlighted destination (or nearest top shelter)
      const targetCoords = highlightedDestination?.coordinates || shelters[0]?.coordinates;
      if (targetCoords) {
        L.polyline([[hLat, hLng], targetCoords], {
          color: '#38BDF8',
          weight: 3,
          dashArray: '8, 8',
          opacity: 0.9
        }).addTo(vectorGroup);
      }
    }
  }, [selectedHabitation, highlightedDestination, shelters]);

  return (
    <div className="map-viewport">
      {/* Leaflet DOM Root */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Floating Map Filter & Layer Controls */}
      <div className="map-floating-panel">
        <div className="map-control-card">
          <div className="control-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={14} color="#38BDF8" /> Zone Filter
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>PRD FR-02</span>
          </div>
          <div className="filter-chips-grid">
            {['ALL', 'RED', 'ORANGE', 'YELLOW', 'GREEN'].map(zone => (
              <button
                key={zone}
                id={`filter-zone-${zone.toLowerCase()}`}
                className={`filter-chip ${filterZone === zone ? 'active' : ''} ${zone.toLowerCase()}`}
                onClick={() => setFilterZone(zone)}
              >
                {zone === 'ALL' ? 'All Zones' : `${zone} Zone`}
              </button>
            ))}
          </div>

          <div className="control-title" style={{ marginTop: '0.85rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertOctagon size={14} color="#F97316" /> Hazard Type
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>PRD FR-03</span>
          </div>
          <div className="filter-chips-grid">
            {[
              { id: 'ALL', label: 'All Hazards' },
              { id: 'FLOOD', label: 'Floods' },
              { id: 'LANDSLIDE', label: 'Landslides' },
              { id: 'EROSION', label: 'River Erosion' }
            ].map(hazard => (
              <button
                key={hazard.id}
                id={`filter-hazard-${hazard.id.toLowerCase()}`}
                className={`filter-chip ${filterHazard === hazard.id ? 'active' : ''}`}
                onClick={() => setFilterHazard(hazard.id)}
              >
                {hazard.label}
              </button>
            ))}
          </div>

          <div className="control-title" style={{ marginTop: '0.85rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={14} color="#34D399" /> GIS Layer Controls
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div className="layer-toggle-row">
              <span>Flood Inundation Contour</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={activeLayers.floodZones}
                  onChange={e => setActiveLayers({ ...activeLayers, floodZones: e.target.checked })} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="layer-toggle-row">
              <span>Landslide Slip Sectors</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={activeLayers.landslideZones}
                  onChange={e => setActiveLayers({ ...activeLayers, landslideZones: e.target.checked })} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="layer-toggle-row">
              <span>Relief Shelters (Capacity)</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={activeLayers.shelters}
                  onChange={e => setActiveLayers({ ...activeLayers, shelters: e.target.checked })} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="layer-toggle-row">
              <span>Evacuation Corridors & Roads</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={activeLayers.evacRoutes}
                  onChange={e => setActiveLayers({ ...activeLayers, evacRoutes: e.target.checked })} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Map Legend (Bottom-Left) */}
      <div className="map-legend">
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
          GIS Risk Legend (Score 0-100)
        </div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-swatch" style={{ background: '#EF4444' }}></div>
            <span>Red (76-100)</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch" style={{ background: '#F97316' }}></div>
            <span>Orange (51-75)</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch" style={{ background: '#EAB308' }}></div>
            <span>Yellow (26-50)</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch" style={{ background: '#10B981' }}></div>
            <span>Green (0-25)</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch" style={{ background: '#0284C7' }}></div>
            <span>Shelter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
