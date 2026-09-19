// Explainable AI (XAI) Engine for Decision Support
// Implements PRD Section 20 (Explainable AI) & Section 37 (Evidence and Factor Attribution)

export function generateExplanation(habitation, riskAssessment, capacityAssessment, relocationPriority) {
  const factors = [];

  // 1. Hazard Factor
  const floodP = Math.round(riskAssessment.hazardDetails.floodProbability * 100);
  const landP = Math.round(riskAssessment.hazardDetails.landslideProbability * 100);
  const erosionP = Math.round(riskAssessment.hazardDetails.riverErosionProbability * 100);

  let primaryHazard = "Flood Exposure";
  if (landP > floodP && landP > erosionP) primaryHazard = "Landslide Susceptibility";
  else if (erosionP > floodP) primaryHazard = "River Bank Erosion";

  factors.push({
    title: "Hazard Exposure Intensity",
    weight: Math.round(riskAssessment.hazardDetails.combinedHazard * 100),
    description: `Severe ${primaryHazard} detected (Flood: ${floodP}%, Landslide: ${landP}%, Bank Erosion: ${erosionP}%). River distance: ${habitation.baselineHazards.distanceToRiverMeters}m.`,
    severity: riskAssessment.hazardDetails.combinedHazard > 0.75 ? "critical" : riskAssessment.hazardDetails.combinedHazard > 0.5 ? "high" : "moderate"
  });

  // 2. Demographic Vulnerability Factor
  const vulnerableCount = habitation.demographics.children + habitation.demographics.elderly + habitation.demographics.pwd;
  const vulnerablePercent = Math.round((vulnerableCount / habitation.population) * 100);
  
  factors.push({
    title: "Demographic Vulnerability",
    weight: Math.round(riskAssessment.demoVuln * 100),
    description: `${vulnerableCount.toLocaleString()} high-risk dependents (${vulnerablePercent}% of population): ${habitation.demographics.children} children, ${habitation.demographics.elderly} elderly, ${habitation.demographics.pwd} persons with disabilities.`,
    severity: vulnerablePercent > 35 ? "critical" : vulnerablePercent > 20 ? "high" : "moderate"
  });

  // 3. Shelter Capacity Deficit Factor
  const deficit = capacityAssessment.deficit;
  factors.push({
    title: "Shelter Carrying Capacity Deficit",
    weight: Math.min(100, Math.round((deficit / (capacityAssessment.populationRequiringRelocation || 1)) * 100)),
    description: `Local shelter capacity is ${capacityAssessment.isSufficient ? 'adequate' : 'severely overwhelmed'}. Net immediate deficit: ${deficit.toLocaleString()} displaced persons require inter-zone relocation.`,
    severity: deficit > 1000 ? "critical" : deficit > 300 ? "high" : "moderate"
  });

  // 4. Infrastructure & Evacuation Route Accessibility
  const roadScore = Math.round((habitation.infrastructure.roadConditionScore ?? 0.5) * 100);
  const roadPenalty = 100 - roadScore;
  factors.push({
    title: "Evacuation Route Cut-off Risk",
    weight: roadPenalty,
    description: `Current road status: "${habitation.infrastructure.roadAccessibility}". Hospital transit: ${habitation.infrastructure.hospitalDistanceKm}km. ${habitation.infrastructure.hasBridgeAccess ? 'Bridge pass monitored.' : 'No bridge access - ferry/boat dependency.'}`,
    severity: roadScore < 35 ? "critical" : roadScore < 60 ? "high" : "moderate"
  });

  // Build Comprehensive Natural Language Narrative (PRD Section 37)
  const keyPoints = [];
  if (floodP > 70) keyPoints.push(`high flood risk (${floodP}%)`);
  if (landP > 60) keyPoints.push(`steep slope landslide susceptibility (${landP}%)`);
  if (erosionP > 70) keyPoints.push(`active river embankment erosion (${erosionP}%)`);
  if (vulnerablePercent > 30) keyPoints.push(`high concentration of vulnerable dependents (${vulnerableCount.toLocaleString()})`);
  if (deficit > 500) keyPoints.push(`local shelter deficit of ${deficit.toLocaleString()} individuals`);
  if (roadScore < 40) keyPoints.push(`fragile evacuation route access ("${habitation.infrastructure.roadAccessibility}")`);

  const narrative = `${relocationPriority.priorityLevel.toUpperCase()} relocation priority assigned to ${habitation.name} because of ${keyPoints.join(', ')}.`;

  return {
    factors,
    narrative,
    keyBulletPoints: [
      `Hazard: ${primaryHazard} combined probability ${Math.round(riskAssessment.hazardDetails.combinedHazard * 100)}%`,
      `Exposed Population: ${habitation.exposedPopulation.toLocaleString()} of ${habitation.population.toLocaleString()}`,
      `Capacity Deficit: ${deficit.toLocaleString()} persons lacking local shelter`,
      `Evacuation Transit: ${habitation.infrastructure.roadAccessibility}`,
      `Historical Precedent: ${habitation.historicalDisasterRecord}`
    ]
  };
}
