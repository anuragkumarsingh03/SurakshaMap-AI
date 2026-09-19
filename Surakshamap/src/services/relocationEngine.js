// Immediate Relocation Engine & Candidate Lower-Risk Destination Recommender
// Implements PRD Section 16, 17, 18 & PRD V2 Calibrated Priority Formula:
// Relocation Priority = 0.40*Risk + 0.20*RelocPopNorm + 0.20*DeficitNorm + 0.10*RouteRiskNorm + 0.10*UncertaintyNorm

import { evaluateShelterCapacity } from './capacityEngine.js';

/**
 * Haversine formula to calculate distance in kilometers
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

/**
 * Calculates Calibrated Relocation Priority (PRD V2 Improvement 1)
 * Eliminates double-counting of Exposure and Vulnerability.
 * Formula: 0.40*Risk + 0.20*PopReloc + 0.20*Deficit + 0.10*RouteRisk + 0.10*(100 - Confidence)
 */
export function calculateRelocationPriority(habitation, riskAssessment, capacityAssessment) {
  // 1. Normalized Risk (0 - 100)
  const normRisk = Math.min(100, Math.max(0, riskAssessment.riskScore));

  // 2. Normalized Population Requiring Relocation (normalized against 4,000 baseline)
  const popReloc = capacityAssessment.populationRequiringRelocation || 0;
  const normPop = Math.min(100, Math.max(0, Math.round((popReloc / 4000) * 100)));

  // 3. Normalized Shelter Capacity Deficit (normalized against 3,500 baseline)
  const deficit = capacityAssessment.deficit || 0;
  const normDeficit = Math.min(100, Math.max(0, Math.round((deficit / 3500) * 100)));

  // 4. Normalized Route Risk (Road cutoff / damaged accessibility)
  const roadScore = habitation.infrastructure.roadConditionScore ?? 0.5;
  const normRouteRisk = Math.round((1 - roadScore) * 100);

  // 5. Data Uncertainty / Confidence Factor (Uncertainty = 100 - Confidence)
  const uncertainty = Math.max(0, 100 - (riskAssessment.confidenceScore || 85));

  // Calibrated Priority Calculation (0 to 100)
  const priorityScore = Math.min(100, Math.max(1, Math.round(
    0.40 * normRisk +
    0.20 * normPop +
    0.20 * normDeficit +
    0.10 * normRouteRisk +
    0.10 * uncertainty
  )));

  let priorityLevel = 'Low';
  let priorityColor = 'var(--color-green)';
  let priorityBg = 'var(--color-green-bg)';
  let priorityAction = 'Continue active monitoring; maintain readiness';

  if (priorityScore >= 75 || (riskAssessment.zone === 'Red' && deficit > 400)) {
    priorityLevel = 'Critical';
    priorityColor = 'var(--color-red)';
    priorityBg = 'var(--color-red-bg)';
    priorityAction = 'Authority intervention required: initiate immediate evacuation orders and dispatch transit';
  } else if (priorityScore >= 52 || riskAssessment.zone === 'Orange') {
    priorityLevel = 'High';
    priorityColor = 'var(--color-orange)';
    priorityBg = 'var(--color-orange-bg)';
    priorityAction = 'Evacuation standby: stage transport and verify candidate relocation sites';
  } else if (priorityScore >= 32 || riskAssessment.zone === 'Yellow') {
    priorityLevel = 'Medium';
    priorityColor = 'var(--color-yellow)';
    priorityBg = 'var(--color-yellow-bg)';
    priorityAction = 'Prepare local supplies and notify community volunteer wardens';
  }

  return {
    priorityScore,
    priorityLevel,
    priorityColor,
    priorityBg,
    priorityAction,
    factorBreakdown: {
      riskContribution: Math.round(0.40 * normRisk),
      popContribution: Math.round(0.20 * normPop),
      deficitContribution: Math.round(0.20 * normDeficit),
      routeContribution: Math.round(0.10 * normRouteRisk),
      uncertaintyContribution: Math.round(0.10 * uncertainty)
    }
  };
}

/**
 * Recommends Candidate Lower-Risk Destinations (PRD V2 Improvement 4 & 5)
 * Factoring effective bottleneck capacity, travel times, and authority verification requirements.
 */
export function rankCandidateDestinations(habitation, shelters) {
  const [hLat, hLng] = habitation.coordinates;
  const roadQuality = habitation.infrastructure.roadConditionScore ?? 0.5;

  const ranked = shelters.map(shelter => {
    const [sLat, sLng] = shelter.coordinates;
    const distanceKm = calculateDistanceKm(hLat, hLng, sLat, sLng);
    const capacityInfo = evaluateShelterCapacity(shelter);

    // Speed estimation factoring road damage
    const effectiveSpeedKmh = Math.max(10, 45 * roadQuality);
    const travelTimeMinutes = Math.round((distanceKm / effectiveSpeedKmh) * 60) + 5;

    // Use Available Effective Capacity (bottlenecked)
    const availableCapacity = capacityInfo.availableEffectiveCapacity;
    const capacityScore = Math.min(1, availableCapacity / 1000);
    const distancePenalty = Math.min(1, distanceKm / 25);
    const hazardPenalty = shelter.hazardExposure === 'Extreme' ? 0.9 :
                          shelter.hazardExposure === 'High' ? 0.6 :
                          shelter.hazardExposure === 'Moderate' ? 0.3 : 0.05;

    const suitability = (capacityScore * 0.40) + ((1 - distancePenalty) * 0.35) + ((1 - hazardPenalty) * 0.25);

    return {
      shelterId: shelter.id,
      name: shelter.name,
      designation: 'Candidate Lower-Risk Destination',
      coordinates: shelter.coordinates,
      distanceKm,
      travelTimeMinutes,
      physicalCapacity: capacityInfo.maxCapacity,
      effectiveSafeCapacity: capacityInfo.effectiveSafeCapacity,
      availableCapacity: capacityInfo.availableEffectiveCapacity, // true usable space
      currentOccupancy: shelter.currentOccupancy,
      bottleneckResource: capacityInfo.bottleneckResource,
      utilizationPercent: capacityInfo.utilizationPercent,
      hazardExposure: shelter.hazardExposure,
      accessibility: shelter.accessibility,
      medicalTriage: shelter.amenities.medicalTriage,
      waterHours: shelter.amenities.drinkingWaterHoursReserve,
      officerInCharge: shelter.officerInCharge,
      authorityVerificationStatus: 'Subject to Authority Confirmation',
      suitabilityScore: Number(suitability.toFixed(2))
    };
  });

  return ranked.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

/**
 * Optimizes distribution of deficit population across candidate lower-risk destinations
 */
export function optimizeRelocationDistribution(deficitPopulation, candidateDestinations) {
  let remainingToRelocate = deficitPopulation;
  const allocations = [];

  for (const candidate of candidateDestinations) {
    if (remainingToRelocate <= 0) break;
    if (candidate.availableCapacity <= 0) continue;

    const allocated = Math.min(remainingToRelocate, candidate.availableCapacity);
    allocations.push({
      shelterId: candidate.shelterId,
      name: candidate.name,
      allocatedHeadcount: allocated,
      distanceKm: candidate.distanceKm,
      travelTimeMinutes: candidate.travelTimeMinutes,
      bottleneckResource: candidate.bottleneckResource
    });

    remainingToRelocate -= allocated;
  }

  return {
    allocations,
    unallocatedDeficit: Math.max(0, remainingToRelocate),
    isFullyAbsorbed: remainingToRelocate <= 0
  };
}
