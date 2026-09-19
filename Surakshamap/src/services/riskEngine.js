// Multi-Hazard Risk Engine
// Implements PRD Sections 10, 11, 12, 13 & PRD V2 Decision Support Updates:
// Risk = Hazard x Exposure x Vulnerability (0-100)
// With Decision Confidence Scores, Data Freshness & "Why Red?" Driver Attribution

export const DEFAULT_THRESHOLDS = {
  red: 76,
  orange: 51,
  yellow: 26
};

/**
 * Calculates demographic vulnerability (0 to 1)
 */
export function calculateDemographicVulnerability(demographics, totalPopulation) {
  if (!demographics || !totalPopulation) return 0.5;

  const childRatio = demographics.children / totalPopulation;
  const elderlyRatio = demographics.elderly / totalPopulation;
  const pwdRatio = (demographics.pwd / totalPopulation) * 5;
  const lowIncomeRatio = (demographics.lowIncomePercent || 50) / 100;
  const kachhaRatio = (demographics.kachhaHousingPercent || 50) / 100;

  const score = (
    childRatio * 0.25 +
    elderlyRatio * 0.25 +
    Math.min(1, pwdRatio) * 0.20 +
    lowIncomeRatio * 0.15 +
    kachhaRatio * 0.15
  );

  return Math.min(1, Math.max(0.1, score * 2.2));
}

/**
 * Calculates infrastructure vulnerability (0 to 1)
 */
export function calculateInfrastructureVulnerability(infra) {
  if (!infra) return 0.5;

  const roadPenalty = 1 - (infra.roadConditionScore ?? 0.5);
  const hospitalPenalty = Math.min(1, (infra.hospitalDistanceKm || 5) / 20);
  const waterPenalty = infra.drinkingWaterAvailable ? 0.1 : 0.9;
  const commPenalty = infra.communicationConnectivity === 'Weak' ? 0.9 : 
                      infra.communicationConnectivity === 'Moderate' ? 0.5 : 0.1;

  const score = (
    roadPenalty * 0.35 +
    hospitalPenalty * 0.25 +
    waterPenalty * 0.20 +
    commPenalty * 0.20
  );

  return Math.min(1, Math.max(0.1, score));
}

/**
 * Combines multi-hazards into single probability: 1 - product(1 - p_i)
 */
export function calculateCombinedHazard(baselineHazards, simulationOffsets = {}) {
  const rainOffset = simulationOffsets.rainfallPercent || 0;
  const riverOffset = simulationOffsets.riverSurgeMeters || 0;
  const landslideTrigger = simulationOffsets.triggerLandslide || false;

  let floodP = baselineHazards.floodProbability * (1 + rainOffset / 100);
  if (riverOffset > 0) floodP += riverOffset * 0.08;
  floodP = Math.min(0.99, Math.max(0.01, floodP));

  let landP = baselineHazards.landslideProbability * (1 + (rainOffset / 100) * 1.3);
  if (landslideTrigger) landP = Math.max(0.88, landP + 0.35);
  landP = Math.min(0.99, Math.max(0.01, landP));

  let erosionP = baselineHazards.riverErosionProbability * (1 + (riverOffset * 0.12));
  erosionP = Math.min(0.99, Math.max(0.01, erosionP));

  const combined = 1 - ((1 - floodP) * (1 - landP) * (1 - erosionP));

  return {
    combinedHazard: Math.min(0.99, combined),
    floodProbability: floodP,
    landslideProbability: landP,
    riverErosionProbability: erosionP
  };
}

/**
 * Evaluates Decision Confidence & Freshness (PRD V2 Item 3)
 */
export function calculateDecisionConfidence(habitation, verificationState = {}) {
  let confidence = 94;
  const deductions = [];

  // Connectivity latency
  if (habitation.infrastructure.communicationConnectivity === 'Weak') {
    confidence -= 7;
    deductions.push('Telemetry latency: Local cellular & telemetry connectivity is weak');
  }

  // Route certainty
  if (!habitation.infrastructure.hasBridgeAccess) {
    confidence -= 4;
    deductions.push('River ferry dependency introduces transit variance');
  }

  // Data freshness
  const lastUpdatedMinutesAgo = habitation.lastDataSyncMinutes || 4;
  if (lastUpdatedMinutesAgo > 15) {
    confidence -= 6;
    deductions.push(`Sensor observations are ${lastUpdatedMinutesAgo} minutes old`);
  }

  // Human verification boost
  if (verificationState.isVerified) {
    confidence = Math.min(98, confidence + 8);
  } else {
    deductions.push('Pending final on-site field verification by Incident Commander');
  }

  return {
    confidenceScore: Math.max(65, Math.min(98, confidence)),
    dataFreshness: `${lastUpdatedMinutesAgo} min ago`,
    deductions,
    isHumanVerified: Boolean(verificationState.isVerified),
    verifiedBy: verificationState.verifiedBy || null,
    verifiedAt: verificationState.verifiedAt || null
  };
}

/**
 * Full Habitation Risk Assessment Evaluation
 */
export function assessHabitationRisk(habitation, simulationOffsets = {}, thresholds = DEFAULT_THRESHOLDS, verificationState = {}) {
  const hazardDetails = calculateCombinedHazard(habitation.baselineHazards, simulationOffsets);
  const demoVuln = calculateDemographicVulnerability(habitation.demographics, habitation.population);
  const infraVuln = calculateInfrastructureVulnerability(habitation.infrastructure);

  // Composite Vulnerability
  const vulnerabilityIndex = (demoVuln * 0.52) + (infraVuln * 0.48);

  // Exposure Factor
  const exposureRatio = Math.min(1, habitation.exposedPopulation / habitation.population);
  const exposureFactor = 0.65 + (exposureRatio * 0.35);

  // Risk = Hazard x Exposure x Vulnerability (0 to 100)
  const rawRisk = hazardDetails.combinedHazard * exposureFactor * vulnerabilityIndex * 125;
  const riskScore = Math.min(100, Math.max(1, Math.round(rawRisk)));

  // Risk Zone Classification
  let zone = 'Green';
  let zoneColor = 'var(--color-green)';
  let zoneBg = 'var(--color-green-bg)';

  if (riskScore >= thresholds.red) {
    zone = 'Red';
    zoneColor = 'var(--color-red)';
    zoneBg = 'var(--color-red-bg)';
  } else if (riskScore >= thresholds.orange) {
    zone = 'Orange';
    zoneColor = 'var(--color-orange)';
    zoneBg = 'var(--color-orange-bg)';
  } else if (riskScore >= thresholds.yellow) {
    zone = 'Yellow';
    zoneColor = 'var(--color-yellow)';
    zoneBg = 'var(--color-yellow-bg)';
  }

  // Confidence & Freshness
  const confidenceData = calculateDecisionConfidence(habitation, verificationState);

  // "Why Red / Risk Drivers" breakdown (PRD V2)
  const drivers = {
    hazardExposure: Math.round(hazardDetails.combinedHazard * 100),
    populationExposure: Math.round(exposureRatio * 100),
    infrastructureVulnerability: Math.round(infraVuln * 100),
    accessibilityCutoffRisk: Math.round((1 - (habitation.infrastructure.roadConditionScore ?? 0.5)) * 100),
    demographicFragility: Math.round(demoVuln * 100)
  };

  return {
    riskScore,
    zone,
    zoneColor,
    zoneBg,
    hazardDetails,
    vulnerabilityIndex: Number(vulnerabilityIndex.toFixed(2)),
    demoVuln: Number(demoVuln.toFixed(2)),
    infraVuln: Number(infraVuln.toFixed(2)),
    exposureFactor: Number(exposureFactor.toFixed(2)),
    drivers,
    ...confidenceData
  };
}
