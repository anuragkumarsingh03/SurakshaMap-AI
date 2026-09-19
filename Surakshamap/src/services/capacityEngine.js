// Carrying Capacity Assessment Engine
// Implements PRD Section 14 & 15 with Resource Bottleneck Principle:
// Effective Capacity = MIN(Physical, Water, Sanitation, Medical, Power)

/**
 * Calculates shelter resource capacities and identifies the critical bottleneck resource
 */
export function evaluateShelterCapacity(shelter) {
  const physicalCapacity = shelter.maxCapacity;
  const currentOccupancy = shelter.currentOccupancy;

  // 1. Water Capacity (Sphere standard: min 15L/day; normalized around 72h reserve)
  const waterHours = shelter.amenities.drinkingWaterHoursReserve || 24;
  const waterCapacity = Math.round((waterHours / 60) * physicalCapacity);

  // 2. Sanitation Capacity (Sphere Humanitarian standard: 1 toilet per 50 evacuees)
  const toiletUnits = shelter.amenities.toiletUnits || 10;
  const sanitationCapacity = toiletUnits * 50;

  // 3. Medical Triage Throughput Capacity
  let medicalMultiplier = 1.0;
  const medText = shelter.amenities.medicalTriage || '';
  if (medText.includes('Civil Hospital') || medText.includes('Ambulances')) {
    medicalMultiplier = 1.25;
  } else if (medText.includes('Mobile Health') || medText.includes('Primary Health')) {
    medicalMultiplier = 0.90;
  } else if (medText.includes('Paramedic') || medText.includes('Clinic')) {
    medicalMultiplier = 0.70;
  } else {
    medicalMultiplier = 0.45; // basic field first aid / nurse aid only
  }
  const medicalCapacity = Math.round(physicalCapacity * medicalMultiplier);

  // 4. Power & Energy Stability Capacity
  let powerMultiplier = 1.0;
  const powerText = shelter.amenities.electricityBackup || '';
  if (powerText.includes('Solar') && powerText.includes('Generator')) {
    powerMultiplier = 1.25;
  } else if (powerText.includes('Generator') && !powerText.includes('Small')) {
    powerMultiplier = 1.0;
  } else if (powerText.includes('Small') || powerText.includes('Inverter')) {
    powerMultiplier = 0.60;
  } else {
    powerMultiplier = 0.35; // no generator / battery lamps
  }
  const powerCapacity = Math.round(physicalCapacity * powerMultiplier);

  // Bottleneck Principle: True Effective Capacity is constrained by the weakest vital resource
  const resourceMatrix = [
    { resource: 'Physical Space', capacity: physicalCapacity },
    { resource: 'Drinking Water Reserve', capacity: waterCapacity },
    { resource: 'Sanitation Facilities', capacity: sanitationCapacity },
    { resource: 'Medical Support', capacity: medicalCapacity },
    { resource: 'Emergency Power', capacity: powerCapacity }
  ];

  // Find minimum capacity and identify bottleneck
  resourceMatrix.sort((a, b) => a.capacity - b.capacity);
  const bottleneck = resourceMatrix[0];
  const effectiveSafeCapacity = bottleneck.capacity;

  const availableCapacity = Math.max(0, physicalCapacity - currentOccupancy);
  const availableEffectiveCapacity = Math.max(0, effectiveSafeCapacity - currentOccupancy);
  const utilizationPercent = Math.round((currentOccupancy / effectiveSafeCapacity) * 100);

  let status = 'Optimal';
  let statusColor = 'var(--color-green)';
  if (utilizationPercent >= 100) {
    status = 'Deficit / Overcrowded';
    statusColor = 'var(--color-red)';
  } else if (utilizationPercent >= 80) {
    status = 'Near Capacity';
    statusColor = 'var(--color-orange)';
  } else if (utilizationPercent >= 50) {
    status = 'Moderate Load';
    statusColor = 'var(--color-yellow)';
  }

  return {
    maxCapacity: physicalCapacity,
    currentOccupancy,
    availableCapacity,
    effectiveSafeCapacity,
    availableEffectiveCapacity,
    utilizationPercent,
    bottleneckResource: bottleneck.resource,
    bottleneckCapacity: bottleneck.capacity,
    resourceMatrix: {
      physical: physicalCapacity,
      water: waterCapacity,
      sanitation: sanitationCapacity,
      medical: medicalCapacity,
      power: powerCapacity
    },
    status,
    statusColor
  };
}

/**
 * Calculates habitation shelter capacity deficit using effective carrying capacity
 */
export function calculateHabitationDeficit(habitation, riskAssessment) {
  const exposedPop = habitation.exposedPopulation;
  
  // High risk habitations require higher percentage of exposed population to be relocated immediately
  let relocationFactor = 0.5;
  if (riskAssessment.zone === 'Red') relocationFactor = 0.95;
  else if (riskAssessment.zone === 'Orange') relocationFactor = 0.70;
  else if (riskAssessment.zone === 'Yellow') relocationFactor = 0.35;
  else relocationFactor = 0.10;

  const populationRequiringRelocation = Math.round(exposedPop * relocationFactor);
  
  // Local shelter capacity evaluated under bottleneck limits
  const localPhysical = habitation.localShelterCapacity || 0;
  const localOccupied = habitation.localShelterOccupied || 0;
  
  // Constrained by local drinking water & power availability
  let localFactor = 1.0;
  if (!habitation.infrastructure.drinkingWaterAvailable) localFactor *= 0.65;
  if (habitation.infrastructure.electricityStatus?.includes('Off')) localFactor *= 0.75;
  
  const localEffectiveCapacity = Math.round(localPhysical * localFactor);
  const localAvailable = Math.max(0, localEffectiveCapacity - localOccupied);

  const deficit = Math.max(0, populationRequiringRelocation - localAvailable);
  const isSufficient = deficit === 0;

  return {
    populationRequiringRelocation,
    localPhysicalCapacity: localPhysical,
    localEffectiveCapacity,
    localAvailable,
    deficit,
    isSufficient,
    deficitSeverity: deficit > 1500 ? 'Severe Deficit' : deficit > 500 ? 'Significant Deficit' : deficit > 0 ? 'Minor Deficit' : 'Capacity Met'
  };
}
