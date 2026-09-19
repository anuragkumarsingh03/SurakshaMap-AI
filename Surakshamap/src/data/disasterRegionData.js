// Disaster Region GeoJSON and Analytical Spatial Dataset
// Regional Focus: Brahmaputra - Subansiri Floodplain & Foothills Risk Corridor

export const REGION_METADATA = {
  regionName: "Subansiri - Brahmaputra Disaster Risk Sector",
  state: "Assam",
  district: "Dhemaji - Majuli Monitored Zone",
  centerCoords: [27.28, 94.45],
  zoomLevel: 11,
  lastSatellitePass: "2026-09-19 09:30 UTC",
  totalHabitations: 12,
  riverBasin: "Brahmaputra Riverine System",
  dangerWaterLevelMeters: 103.5,
  currentWaterLevelMeters: 104.2,
  averageRainfallMm24h: 185
};

export const INITIAL_HABITATIONS = [
  {
    id: "hab-01",
    name: "Majuli Char Village",
    block: "Majuli North",
    district: "Majuli",
    coordinates: [27.215, 94.380],
    population: 4280,
    exposedPopulation: 3750,
    demographics: {
      children: 890,
      elderly: 620,
      pwd: 145,
      lowIncomePercent: 78,
      kachhaHousingPercent: 82
    },
    infrastructure: {
      hospitalDistanceKm: 16.2,
      nearestShelterDistanceKm: 4.2,
      roadAccessibility: "Poor (Submerged Culvert)",
      roadConditionScore: 0.25, // 0 to 1
      drinkingWaterAvailable: false,
      electricityStatus: "Off (Flood Precaution)",
      communicationConnectivity: "Weak (1 Tower Active)",
      hasBridgeAccess: false
    },
    baselineHazards: {
      floodProbability: 0.94,
      landslideProbability: 0.05,
      riverErosionProbability: 0.88,
      rainfallIntensityMm: 210,
      elevationMeters: 45,
      distanceToRiverMeters: 120
    },
    localShelterCapacity: 600,
    localShelterOccupied: 580,
    historicalDisasterRecord: "Breached embankment in 2022 & 2024; isolated for 11 days"
  },
  {
    id: "hab-02",
    name: "Subansiri Lowland Basti",
    block: "Dhakuakhana",
    district: "Dhemaji",
    coordinates: [27.320, 94.425],
    population: 3650,
    exposedPopulation: 3100,
    demographics: {
      children: 710,
      elderly: 490,
      pwd: 110,
      lowIncomePercent: 72,
      kachhaHousingPercent: 75
    },
    infrastructure: {
      hospitalDistanceKm: 12.5,
      nearestShelterDistanceKm: 3.1,
      roadAccessibility: "Very Poor (Erosion on Shoulder)",
      roadConditionScore: 0.3,
      drinkingWaterAvailable: false,
      electricityStatus: "Intermittent",
      communicationConnectivity: "Moderate",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.91,
      landslideProbability: 0.12,
      riverErosionProbability: 0.92,
      rainfallIntensityMm: 225,
      elevationMeters: 48,
      distanceToRiverMeters: 90
    },
    localShelterCapacity: 900,
    localShelterOccupied: 850,
    historicalDisasterRecord: "High river bank slumping; 14 homes lost in recent monsoons"
  },
  {
    id: "hab-03",
    name: "Rongpur Foothill Settlement",
    block: "Gogamukh",
    district: "Dhemaji",
    coordinates: [27.395, 94.510],
    population: 2900,
    exposedPopulation: 2200,
    demographics: {
      children: 520,
      elderly: 380,
      pwd: 75,
      lowIncomePercent: 64,
      kachhaHousingPercent: 68
    },
    infrastructure: {
      hospitalDistanceKm: 8.4,
      nearestShelterDistanceKm: 2.5,
      roadAccessibility: "Moderate (Debris risk)",
      roadConditionScore: 0.55,
      drinkingWaterAvailable: true,
      electricityStatus: "Active",
      communicationConnectivity: "Good",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.35,
      landslideProbability: 0.82,
      riverErosionProbability: 0.20,
      rainfallIntensityMm: 240,
      elevationMeters: 140,
      distanceToRiverMeters: 1200
    },
    localShelterCapacity: 1100,
    localShelterOccupied: 400,
    historicalDisasterRecord: "Slope instability triggered during high-intensity flash cloudbursts"
  },
  {
    id: "hab-04",
    name: "Koliabor River Ward",
    block: "Majuli South",
    district: "Majuli",
    coordinates: [27.180, 94.490],
    population: 4100,
    exposedPopulation: 3400,
    demographics: {
      children: 820,
      elderly: 560,
      pwd: 120,
      lowIncomePercent: 69,
      kachhaHousingPercent: 71
    },
    infrastructure: {
      hospitalDistanceKm: 14.0,
      nearestShelterDistanceKm: 5.0,
      roadAccessibility: "Poor (Waterlogged track)",
      roadConditionScore: 0.35,
      drinkingWaterAvailable: false,
      electricityStatus: "Off",
      communicationConnectivity: "Weak",
      hasBridgeAccess: false
    },
    baselineHazards: {
      floodProbability: 0.88,
      landslideProbability: 0.04,
      riverErosionProbability: 0.79,
      rainfallIntensityMm: 195,
      elevationMeters: 46,
      distanceToRiverMeters: 210
    },
    localShelterCapacity: 1200,
    localShelterOccupied: 950,
    historicalDisasterRecord: "Inundated for 8 days in 2023; primary tube-wells contaminated"
  },
  {
    id: "hab-05",
    name: "Kamrup Embankment Cluster",
    block: "Dhakuakhana",
    district: "Dhemaji",
    coordinates: [27.280, 94.340],
    population: 2600,
    exposedPopulation: 1950,
    demographics: {
      children: 490,
      elderly: 330,
      pwd: 65,
      lowIncomePercent: 81,
      kachhaHousingPercent: 85
    },
    infrastructure: {
      hospitalDistanceKm: 18.0,
      nearestShelterDistanceKm: 4.8,
      roadAccessibility: "Impassable for Heavy Vehicles",
      roadConditionScore: 0.2,
      drinkingWaterAvailable: false,
      electricityStatus: "Off",
      communicationConnectivity: "Intermittent",
      hasBridgeAccess: false
    },
    baselineHazards: {
      floodProbability: 0.95,
      landslideProbability: 0.02,
      riverErosionProbability: 0.90,
      rainfallIntensityMm: 215,
      elevationMeters: 43,
      distanceToRiverMeters: 60
    },
    localShelterCapacity: 500,
    localShelterOccupied: 480,
    historicalDisasterRecord: "Directly located on fragile ring embankment"
  },
  {
    id: "hab-06",
    name: "Brahmaputra Bank Hamlet",
    block: "Majuli East",
    district: "Majuli",
    coordinates: [27.240, 94.550],
    population: 3150,
    exposedPopulation: 2500,
    demographics: {
      children: 600,
      elderly: 410,
      pwd: 85,
      lowIncomePercent: 65,
      kachhaHousingPercent: 62
    },
    infrastructure: {
      hospitalDistanceKm: 9.5,
      nearestShelterDistanceKm: 3.5,
      roadAccessibility: "Fair (Paved with potholed sections)",
      roadConditionScore: 0.6,
      drinkingWaterAvailable: true,
      electricityStatus: "Active",
      communicationConnectivity: "Good",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.72,
      landslideProbability: 0.08,
      riverErosionProbability: 0.65,
      rainfallIntensityMm: 175,
      elevationMeters: 52,
      distanceToRiverMeters: 380
    },
    localShelterCapacity: 1400,
    localShelterOccupied: 620,
    historicalDisasterRecord: "Water reached outer perimeter in 2024"
  },
  {
    id: "hab-07",
    name: "Gogamukh Ridge Hamlet",
    block: "Gogamukh",
    district: "Dhemaji",
    coordinates: [27.420, 94.460],
    population: 1850,
    exposedPopulation: 950,
    demographics: {
      children: 310,
      elderly: 240,
      pwd: 40,
      lowIncomePercent: 45,
      kachhaHousingPercent: 40
    },
    infrastructure: {
      hospitalDistanceKm: 5.2,
      nearestShelterDistanceKm: 1.8,
      roadAccessibility: "Good (All-Weather Asphalt)",
      roadConditionScore: 0.85,
      drinkingWaterAvailable: true,
      electricityStatus: "Active",
      communicationConnectivity: "Strong",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.18,
      landslideProbability: 0.45,
      riverErosionProbability: 0.10,
      rainfallIntensityMm: 210,
      elevationMeters: 165,
      distanceToRiverMeters: 2800
    },
    localShelterCapacity: 1500,
    localShelterOccupied: 300,
    historicalDisasterRecord: "High natural ground; historically sheltered neighboring flood victims"
  },
  {
    id: "hab-08",
    name: "Dhemaji Central Township Edge",
    block: "Dhemaji Sadar",
    district: "Dhemaji",
    coordinates: [27.350, 94.580],
    population: 5200,
    exposedPopulation: 2100,
    demographics: {
      children: 920,
      elderly: 680,
      pwd: 105,
      lowIncomePercent: 38,
      kachhaHousingPercent: 35
    },
    infrastructure: {
      hospitalDistanceKm: 2.1,
      nearestShelterDistanceKm: 1.2,
      roadAccessibility: "Excellent (Four-lane Arterial)",
      roadConditionScore: 0.95,
      drinkingWaterAvailable: true,
      electricityStatus: "Active",
      communicationConnectivity: "Full 5G",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.28,
      landslideProbability: 0.05,
      riverErosionProbability: 0.12,
      rainfallIntensityMm: 160,
      elevationMeters: 74,
      distanceToRiverMeters: 3200
    },
    localShelterCapacity: 3200,
    localShelterOccupied: 800,
    historicalDisasterRecord: "Safe urban fringe with major supply staging depot"
  },
  {
    id: "hab-09",
    name: "Jengraimukh Tribal Enclave",
    block: "Majuli North",
    district: "Majuli",
    coordinates: [27.260, 94.480],
    population: 2350,
    exposedPopulation: 1980,
    demographics: {
      children: 480,
      elderly: 310,
      pwd: 60,
      lowIncomePercent: 76,
      kachhaHousingPercent: 80
    },
    infrastructure: {
      hospitalDistanceKm: 13.8,
      nearestShelterDistanceKm: 3.8,
      roadAccessibility: "Poor (Timber Bridge Weight Restriction)",
      roadConditionScore: 0.4,
      drinkingWaterAvailable: false,
      electricityStatus: "Intermittent",
      communicationConnectivity: "Weak",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.84,
      landslideProbability: 0.03,
      riverErosionProbability: 0.81,
      rainfallIntensityMm: 190,
      elevationMeters: 47,
      distanceToRiverMeters: 250
    },
    localShelterCapacity: 750,
    localShelterOccupied: 650,
    historicalDisasterRecord: "Frequent water logging; bamboo stilt houses vulnerable to debris"
  },
  {
    id: "hab-10",
    name: "Bordoloni Wet Slopes",
    block: "Bordoloni",
    district: "Dhemaji",
    coordinates: [27.380, 94.360],
    population: 3400,
    exposedPopulation: 2600,
    demographics: {
      children: 680,
      elderly: 440,
      pwd: 90,
      lowIncomePercent: 62,
      kachhaHousingPercent: 65
    },
    infrastructure: {
      hospitalDistanceKm: 11.0,
      nearestShelterDistanceKm: 3.2,
      roadAccessibility: "Fair (Secondary District Road)",
      roadConditionScore: 0.58,
      drinkingWaterAvailable: true,
      electricityStatus: "Active",
      communicationConnectivity: "Moderate",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.65,
      landslideProbability: 0.60,
      riverErosionProbability: 0.40,
      rainfallIntensityMm: 230,
      elevationMeters: 92,
      distanceToRiverMeters: 1400
    },
    localShelterCapacity: 1300,
    localShelterOccupied: 720,
    historicalDisasterRecord: "Combined flash flood and soil slippage in 2021"
  },
  {
    id: "hab-11",
    name: "Dhakuakhana East Ward",
    block: "Dhakuakhana",
    district: "Dhemaji",
    coordinates: [27.275, 94.430],
    population: 4600,
    exposedPopulation: 2800,
    demographics: {
      children: 890,
      elderly: 590,
      pwd: 100,
      lowIncomePercent: 54,
      kachhaHousingPercent: 50
    },
    infrastructure: {
      hospitalDistanceKm: 4.8,
      nearestShelterDistanceKm: 2.0,
      roadAccessibility: "Good (Paved Road Network)",
      roadConditionScore: 0.78,
      drinkingWaterAvailable: true,
      electricityStatus: "Active",
      communicationConnectivity: "Good",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.58,
      landslideProbability: 0.06,
      riverErosionProbability: 0.45,
      rainfallIntensityMm: 180,
      elevationMeters: 58,
      distanceToRiverMeters: 850
    },
    localShelterCapacity: 2100,
    localShelterOccupied: 980,
    historicalDisasterRecord: "Outer fields submerged; administrative center stayed dry"
  },
  {
    id: "hab-12",
    name: "Silapathar Highway Junction",
    block: "Sissiborgaon",
    district: "Dhemaji",
    coordinates: [27.440, 94.620],
    population: 6100,
    exposedPopulation: 1400,
    demographics: {
      children: 1100,
      elderly: 750,
      pwd: 115,
      lowIncomePercent: 32,
      kachhaHousingPercent: 28
    },
    infrastructure: {
      hospitalDistanceKm: 1.5,
      nearestShelterDistanceKm: 0.8,
      roadAccessibility: "Excellent (National Highway NH-515)",
      roadConditionScore: 0.98,
      drinkingWaterAvailable: true,
      electricityStatus: "Active (Grid Stable)",
      communicationConnectivity: "Full Fiber & 5G",
      hasBridgeAccess: true
    },
    baselineHazards: {
      floodProbability: 0.12,
      landslideProbability: 0.02,
      riverErosionProbability: 0.05,
      rainfallIntensityMm: 150,
      elevationMeters: 88,
      distanceToRiverMeters: 4800
    },
    localShelterCapacity: 4500,
    localShelterOccupied: 650,
    historicalDisasterRecord: "Designated multi-purpose emergency logistics and staging hub"
  }
];

export const INITIAL_SHELTERS = [
  {
    id: "sh-01",
    name: "Silapathar District Multipurpose Cyclone & Flood Shelter",
    coordinates: [27.442, 94.618],
    maxCapacity: 4500,
    currentOccupancy: 650,
    amenities: {
      usableFloorAreaSqm: 3800,
      drinkingWaterHoursReserve: 120,
      toiletUnits: 54,
      medicalTriage: "Civil Hospital Sub-center & 2 Ambulances",
      electricityBackup: "Dedicated 120kVA Generator + Rooftop Solar",
      foodStockDays: 14,
      disabledFriendlyRamps: true
    },
    accessibility: "Direct National Highway NH-515 Access",
    elevationMeters: 88,
    hazardExposure: "Low",
    officerInCharge: "Dr. B. K. Sarma (Mobile: +91 94350-XXXXX)"
  },
  {
    id: "sh-02",
    name: "Dhemaji Government College Emergency Camp",
    coordinates: [27.352, 94.578],
    maxCapacity: 3200,
    currentOccupancy: 800,
    amenities: {
      usableFloorAreaSqm: 2700,
      drinkingWaterHoursReserve: 96,
      toiletUnits: 38,
      medicalTriage: "District Health Mission Medical Tent",
      electricityBackup: "60kVA Generator",
      foodStockDays: 10,
      disabledFriendlyRamps: true
    },
    accessibility: "State Highway 22 - Clear",
    elevationMeters: 74,
    hazardExposure: "Low",
    officerInCharge: "Inspector P. Dutta (Mobile: +91 98540-XXXXX)"
  },
  {
    id: "sh-03",
    name: "Gogamukh Higher Secondary School Shelter",
    coordinates: [27.418, 94.465],
    maxCapacity: 1500,
    currentOccupancy: 300,
    amenities: {
      usableFloorAreaSqm: 1400,
      drinkingWaterHoursReserve: 72,
      toiletUnits: 22,
      medicalTriage: "Primary Health Center EMT Staff",
      electricityBackup: "30kVA Generator",
      foodStockDays: 7,
      disabledFriendlyRamps: true
    },
    accessibility: "All-weather Pucca Road",
    elevationMeters: 165,
    hazardExposure: "Low-Moderate (High ground, check drainage)",
    officerInCharge: "M. Kalita, Block Dev Officer"
  },
  {
    id: "sh-04",
    name: "Dhakuakhana Public Relief Stadium",
    coordinates: [27.272, 94.435],
    maxCapacity: 2100,
    currentOccupancy: 980,
    amenities: {
      usableFloorAreaSqm: 2000,
      drinkingWaterHoursReserve: 60,
      toiletUnits: 28,
      medicalTriage: "Mobile Health Unit stationed",
      electricityBackup: "45kVA Generator",
      foodStockDays: 6,
      disabledFriendlyRamps: false
    },
    accessibility: "Paved municipal corridor",
    elevationMeters: 58,
    hazardExposure: "Moderate",
    officerInCharge: "Sub-Divisional Officer A. Saikia"
  },
  {
    id: "sh-05",
    name: "Bordoloni Model High School",
    coordinates: [27.382, 94.364],
    maxCapacity: 1300,
    currentOccupancy: 720,
    amenities: {
      usableFloorAreaSqm: 1150,
      drinkingWaterHoursReserve: 48,
      toiletUnits: 16,
      medicalTriage: "Paramedic Kit & First-Aid Post",
      electricityBackup: "20kVA Generator",
      foodStockDays: 5,
      disabledFriendlyRamps: true
    },
    accessibility: "Secondary Paved Road - Monitor slumping",
    elevationMeters: 92,
    hazardExposure: "Moderate",
    officerInCharge: "Headmaster R. Gogoi"
  },
  {
    id: "sh-06",
    name: "Brahmaputra Bank Poly-Clinic Safe Zone",
    coordinates: [27.242, 94.548],
    maxCapacity: 1400,
    currentOccupancy: 620,
    amenities: {
      usableFloorAreaSqm: 1200,
      drinkingWaterHoursReserve: 50,
      toiletUnits: 18,
      medicalTriage: "Active Clinic & Oxygen Concentrators",
      electricityBackup: "Inverter + 25kVA Genset",
      foodStockDays: 5,
      disabledFriendlyRamps: true
    },
    accessibility: "Paved road with 2 culverts monitored",
    elevationMeters: 52,
    hazardExposure: "Moderate (River 380m)",
    officerInCharge: "Dr. N. Borah"
  },
  {
    id: "sh-07",
    name: "Subansiri Embankment Relief Camp (Forward Post)",
    coordinates: [27.318, 94.428],
    maxCapacity: 900,
    currentOccupancy: 850,
    amenities: {
      usableFloorAreaSqm: 750,
      drinkingWaterHoursReserve: 18,
      toiletUnits: 10,
      medicalTriage: "Field First Aid Only",
      electricityBackup: "Small portable generator",
      foodStockDays: 2,
      disabledFriendlyRamps: false
    },
    accessibility: "Restricted - Light 4x4 vehicles only",
    elevationMeters: 48,
    hazardExposure: "High (At Capacity Deficit)",
    officerInCharge: "Village Headman T. Pegu"
  },
  {
    id: "sh-08",
    name: "Majuli North Ashram Safe Ground",
    coordinates: [27.218, 94.385],
    maxCapacity: 600,
    currentOccupancy: 580,
    amenities: {
      usableFloorAreaSqm: 550,
      drinkingWaterHoursReserve: 12,
      toiletUnits: 8,
      medicalTriage: "Basic Nurse Aid",
      electricityBackup: "None (Battery lamps)",
      foodStockDays: 1,
      disabledFriendlyRamps: false
    },
    accessibility: "Cut off for 4-wheelers; boat access only",
    elevationMeters: 45,
    hazardExposure: "Extreme (Overwhelmed)",
    officerInCharge: "Camp Volunteer H. Das"
  }
];

// River Path Coordinates (Subansiri and Brahmaputra segments)
export const RIVER_NETWORKS = [
  {
    name: "Subansiri River Channel",
    status: "RISING RAPIDLY",
    waterLevel: "104.2m (Danger: 103.5m)",
    flowRate: "8,400 m³/s",
    path: [
      [27.450, 94.350],
      [27.380, 94.390],
      [27.320, 94.420],
      [27.270, 94.410],
      [27.210, 94.370]
    ]
  },
  {
    name: "Brahmaputra Main Reach",
    status: "ABOVE HIGH FLOOD LEVEL",
    waterLevel: "105.8m (Danger: 105.0m)",
    flowRate: "28,200 m³/s",
    path: [
      [27.150, 94.320],
      [27.180, 94.420],
      [27.210, 94.500],
      [27.240, 94.580],
      [27.290, 94.680]
    ]
  }
];

// Major Evacuation Corridors & Road Segments
export const ROAD_CORRIDORS = [
  {
    id: "route-nh515",
    name: "NH-515 Arterial Evacuation Spine",
    status: "PASSABLE",
    riskLevel: "Low",
    path: [
      [27.350, 94.580],
      [27.400, 94.600],
      [27.440, 94.620]
    ]
  },
  {
    id: "route-majuli-dhakuakhana",
    name: "Dhakuakhana - Majuli Connecting Corridor",
    status: "WATERLOGGED (Restricted to Heavy Trucks & Boats)",
    riskLevel: "High",
    path: [
      [27.215, 94.380],
      [27.275, 94.430]
    ]
  },
  {
    id: "route-gogamukh-ridge",
    name: "Gogamukh - Bordoloni Hill Access Road",
    status: "LANDSLIDE WARNING (Single Lane Cleared)",
    riskLevel: "Moderate",
    path: [
      [27.395, 94.510],
      [27.420, 94.460],
      [27.380, 94.360]
    ]
  },
  {
    id: "route-dhakuakhana-dhemaji",
    name: "Dhakuakhana to Dhemaji Safe Link",
    status: "CLEAR & MONITORED",
    riskLevel: "Low",
    path: [
      [27.275, 94.430],
      [27.350, 94.580]
    ]
  }
];

// Flood Inundation Zones (Choropleth Polygons)
export const HAZARD_ZONES = [
  {
    id: "hazard-flood-active-red",
    type: "flood",
    severity: "Critical Inundation",
    polygon: [
      [27.200, 94.350],
      [27.240, 94.360],
      [27.290, 94.410],
      [27.330, 94.415],
      [27.310, 94.450],
      [27.250, 94.440],
      [27.190, 94.400]
    ]
  },
  {
    id: "hazard-landslide-slip-zone",
    type: "landslide",
    severity: "High Slip Susceptibility",
    polygon: [
      [27.385, 94.490],
      [27.430, 94.530],
      [27.410, 94.550],
      [27.375, 94.505]
    ]
  }
];
