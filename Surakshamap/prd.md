Product Requirements Document (PRD)
1. Product Title

Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations

Proposed Product Name

SurakshaMap AI

Product Type

AI + GIS-based Disaster Risk Assessment and Decision Support Platform

2. Problem Statement

Vulnerable habitations are often located in areas exposed to multiple hazards such as floods, landslides, earthquakes, river erosion, extreme rainfall, cyclones, and other environmental risks.

Disaster management authorities need to answer three critical questions quickly:

Which habitations are currently in high-risk or â€œred-zoneâ€ areas?
Can the affected habitation and nearby infrastructure safely support its population during a disaster?
Which people need immediate relocation, and where can they be relocated safely?

Currently, risk information may be distributed across maps, weather observations, population data, infrastructure records, and field reports. This makes rapid assessment difficult, particularly during an emergency.

The proposed system will combine geospatial data, hazard indicators, population vulnerability, infrastructure capacity, and real-time/near-real-time information to generate an AI-assisted risk assessment and relocation-priority map.

3. Product Vision

Build a centralized intelligent platform that transforms complex hazard and demographic data into a simple operational dashboard showing:

Risk â†’ Impact â†’ Capacity â†’ Relocation Priority â†’ Safe Alternatives

The system should help authorities move from reactive disaster response toward data-driven preventive action.

4. Goals
Primary Goals
Identify hazard-prone habitation clusters.
Generate dynamic hazard-based red, orange, yellow, and safe zones.
Assess population and infrastructure vulnerability.
Calculate the carrying capacity of shelters and safer nearby locations.
Identify habitation-level immediate relocation requirements.
Recommend potential relocation destinations.
Provide authorities with an actionable dashboard.
Support prioritization when resources and evacuation capacity are limited.
Provide explainable risk scores rather than relying on a black-box AI prediction.
Secondary Goals
Monitor changes in risk over time.
Compare multiple hazards simultaneously.
Support field teams through mobile data collection.
Generate alerts and downloadable reports.
Maintain historical risk information for planning and mitigation.
5. Non-Goals

The initial product will not:

Automatically order or execute forced evacuation.
Replace trained disaster-management officials.
Guarantee that a location is completely safe.
Physically relocate residents.
Perform detailed structural engineering certification of buildings.
Make autonomous life-or-death decisions without human review.

The system is a decision-support tool, with final operational decisions remaining with authorized authorities.

6. Target Users
Primary Users
District Disaster Management Authority

Needs district-level risk visualization and relocation priorities.

State Disaster Management Authority

Needs monitoring and comparison across districts and regions.

Local Administration

Needs habitation-level information and evacuation planning.

Emergency Response Teams

Need current risk, affected population, shelter availability, and access routes.

Municipal/Panchayat Authorities

Need local vulnerability and infrastructure information.

Secondary Users
NGOs and relief organizations
Search and rescue teams
Public health teams
Infrastructure planners
Researchers
Community volunteers
7. Core User Journey

The primary workflow should be:

Data Collection â†’ Hazard Analysis â†’ Vulnerability Analysis â†’ Risk Scoring â†’ Capacity Assessment â†’ Relocation Assessment â†’ Authority Action

Example:

Heavy rainfall increases flood risk around a village.

The system detects:

Rising rainfall intensity
Increasing river/water level
Low-lying terrain
High population density
Poor road connectivity
Limited shelter capacity
Significant elderly/child population

The system therefore changes the village risk status:

Orange â†’ Red

It then calculates:

Population at Risk = 2,840

Available Shelter Capacity = 1,750

Capacity Deficit = 1,090

The system flags:

Immediate Relocation Required

and displays suitable nearby shelters/relocation zones with their available capacities.

8. Product Architecture

The proposed platform will contain six major layers:

1. Data Layer

Collects geographic, demographic, environmental, infrastructure, and hazard data.

2. Processing Layer

Cleans, standardizes, and combines data.

3. AI/Risk Engine

Calculates hazard, vulnerability, exposure, and risk.

4. Capacity Engine

Calculates available capacity of shelters and safe locations.

5. Decision Engine

Determines relocation priority and recommends alternatives.

6. Visualization Layer

Displays the results through an interactive GIS dashboard.

9. Key Product Features
9.1 Interactive Risk Map

The central feature of the platform.

Authorities can view a map containing:

Habitation boundaries
Population distribution
Hazard zones
Red/Orange/Yellow/Green classifications
Roads and bridges
Schools and hospitals
Shelters
Rivers and drainage networks
Critical infrastructure
Evacuation routes
Current relocation requirements
Map Controls

Users should be able to filter by:

Hazard type
District
Block
Village/habitation
Population
Vulnerability
Risk level
Shelter availability
Relocation priority
10. Hazard Detection Engine

The system should support multiple hazard categories.

Initial MVP Hazards
Flood
Landslide
Extreme rainfall
River erosion
Future Hazards
Earthquake
Cyclone
Wildfire
Extreme heat
Drought
Coastal inundation
11. Multi-Hazard Risk Assessment

A habitation may face more than one hazard.

For example:

Village A

Flood Risk: High
Landslide Risk: Medium
Erosion Risk: High

Instead of analyzing these independently, the system generates a combined Multi-Hazard Risk Score.

Proposed Risk Model

Risk = Hazard Ã— Exposure Ã— Vulnerability

Where:

Hazard

Probability/intensity of the hazard.

Exposure

People, homes, roads, schools, hospitals, and infrastructure located within the hazard area.

Vulnerability

How susceptible the population/infrastructure is to damage.

12. Risk Score

Each habitation receives a score between 0â€“100.

Example classification:

Score	Zone	Meaning
0â€“25	Green	Relatively lower assessed risk
26â€“50	Yellow	Moderate risk
51â€“75	Orange	High risk
76â€“100	Red	Very high assessed risk

These thresholds should be configurable by the responsible authority rather than treated as universally valid standards.

13. Vulnerability Score

The system should consider demographic and infrastructure characteristics.

Possible Inputs
Total population
Population density
Children
Elderly residents
Persons with disabilities
Low-income households
Housing condition
Distance to hospital
Distance to shelter
Road accessibility
Availability of drinking water
Electricity availability
Communication connectivity
Previous disaster impact
Example

A habitation with moderate hazard exposure but extremely poor evacuation access may receive a higher overall vulnerability score.

14. Carrying Capacity Assessment

This is one of the most important differentiating features.

The system should determine whether a habitation or designated safe facility has enough capacity to accommodate people during a disaster.

Capacity Variables

For each shelter:

Maximum occupancy
Current occupancy
Usable floor area
Drinking water capacity
Toilet capacity
Food availability
Medical facilities
Electricity
Emergency supplies
Accessibility
Distance from hazard zone
Example Calculation

Available Capacity = Maximum Safe Capacity âˆ’ Current Occupancy

Suppose:

Maximum capacity = 2,000 people

Current occupancy = 600

Available capacity = 1,400 people

If:

Population requiring relocation = 2,100

Then:

Capacity deficit = 700

The system marks the area:

Shelter Capacity Insufficient

15. Habitational Carrying Capacity

The system can also assess the carrying capacity of a potential relocation area.

It should consider:

Population Capacity = Housing Capacity + Shelter Capacity + Essential Service Capacity

Essential services may include:

Water
Food
Sanitation
Medical care
Electricity
Transportation
Communication

This prevents the system from recommending a location that technically has physical space but cannot support the incoming population.

16. Immediate Relocation Assessment

Each habitation receives a Relocation Priority Score.

Suggested model:

Relocation Priority = Risk Ã— Population Exposure Ã— Vulnerability Ã— Capacity Deficit Ã— Accessibility Factor

The factors should be normalized so the resulting score is interpretable.

Possible Priority Levels
Priority	Meaning
Critical	Immediate authority intervention required
High	Relocation/evacuation planning should be initiated
Medium	Prepare and monitor
Low	Continue monitoring

The interface should clearly show why a location received a particular priority.

Example:

Critical â€” Village X

Flood probability: High
Population exposed: 3,200
Vulnerability: High
Shelter deficit: 1,100
Road accessibility: Poor

17. Safe Relocation Recommendation

The system should identify potential safer destinations.

For each destination it should display:

Distance
Available capacity
Current occupancy
Travel time
Road accessibility
Hazard exposure
Medical support
Water availability
Sanitation capacity
Food/resource availability
Example
Destination	Distance	Available Capacity	Risk	Travel Time
Shelter A	3.2 km	1,200	Low	12 min
Shelter B	5.1 km	850	Low	18 min
Shelter C	2.5 km	400	Moderate	10 min

The system should provide these as options for authorized officials, not as autonomous evacuation orders.

18. Evacuation Route Analysis

The system should identify suitable routes between:

Risk Zone â†’ Safe Shelter

Route assessment should consider:

Road connectivity
Bridges
Flood-prone roads
Landslide-prone sections
Road width, where data is available
Travel distance
Estimated travel time
Alternate routes

If the primary route becomes hazardous, the system should display alternative routes.

19. Real-Time Risk Updating

The risk map should be capable of receiving updated data.

Possible inputs:

Rainfall
River/water levels
Weather information
Satellite observations
Remote sensing products
IoT sensors
Government field reports
Crowd/field reports

When new information changes the risk level, the system recalculates affected areas.

Example:

10:00 AM â†’ Orange

12:00 PM â†’ Red

The dashboard should show:

Risk escalated due to increased rainfall and water level.

20. AI Component

AI should be used to assist with:

Risk Prediction

Estimate potential hazard impact using historical and current indicators.

Hotspot Detection

Identify clusters of vulnerable habitations.

Population Impact Estimation

Estimate the number of people potentially affected.

Anomaly Detection

Detect unusual changes in rainfall, water levels, or other sensor data.

Relocation Prioritization

Identify which areas require attention based on multiple factors.

Explainable AI

Every AI-generated recommendation should include contributing factors.

Instead of:

â€œRelocate Village A.â€

The system should display:

High relocation priority because:
Flood risk: High
Population exposed: 4,230
Vulnerability: High
Shelter deficit: 1,400
Road accessibility: Poor

21. Dashboard
Executive Dashboard

The homepage should show:

Total Habitations Monitored
Red Zones
Population at Risk
Critical Relocation Cases
Available Shelter Capacity
Capacity Deficit

Example
--------------------------------------------------
       DISASTER RISK INTELLIGENCE DASHBOARD
--------------------------------------------------

Red Zones              27
Orange Zones            61
Population at Risk   48,620
Critical Cases          9
Available Capacity  31,450
Capacity Deficit     8,720

--------------------------------------------------
                    LIVE MAP
--------------------------------------------------
22. Habitation Detail Page

Selecting a habitation should open:

Basic Information
Name
Population
Area
Administrative location
Risk Information
Overall risk score
Flood risk
Landslide risk
Erosion risk
Other applicable hazards
Vulnerability
Demographic indicators
Infrastructure status
Accessibility
Capacity
Current safe capacity
Shelter capacity
Capacity deficit
Recommended Action
Monitor
Prepare
Evacuate/relocate assessment
Critical intervention
Evidence

The platform should show the data/factors that produced the assessment.

23. Alert System

The platform should generate alerts when:

A habitation changes risk category.
Population exposure exceeds a configurable threshold.
Shelter capacity becomes insufficient.
A critical route becomes unavailable.
Hazard indicators cross predefined thresholds.
New field reports indicate worsening conditions.
Example Alert

RED-ZONE ALERT
Village: ABC
Hazard: Flood
Population exposed: 2,450
Shelter deficit: 620
Recommended action: Immediate authority review

24. Field Officer Mobile Interface

A lightweight mobile application should allow authorized field personnel to:

Report hazards
Upload photographs
Record affected population
Report road blockage
Update shelter occupancy
Verify habitation information
Submit GPS-tagged observations

The submitted information should appear on the central dashboard after validation/workflow checks.

25. Data Requirements

The system may use multiple data layers.

Geographic Data
Administrative boundaries
Habitation locations
Roads
Rivers
Drainage
Elevation
Land use
Hazard Data
Flood extent
Rainfall
River levels
Landslide susceptibility
Erosion zones
Historical disaster records
Population Data
Population
Population density
Vulnerable demographic groups
Housing information
Infrastructure Data
Schools
Hospitals
Shelters
Roads
Bridges
Water facilities
Electricity infrastructure
Real-Time Data
Sensors
Weather observations
Field reports
Satellite-derived observations where available
26. Data Pipeline
DATA SOURCES
     |
     v
Data Collection
     |
     v
Data Cleaning & Validation
     |
     v
GIS Processing
     |
     v
Feature Engineering
     |
     +----------------------+
     |                      |
     v                      v
Hazard Model          Vulnerability Model
     |                      |
     +----------+-----------+
                |
                v
        Risk Assessment
                |
                v
      Carrying Capacity
          Assessment
                |
                v
    Relocation Priority
                |
                v
        GIS Dashboard
                |
                v
      Authority Decision
27. Functional Requirements
FR-01 â€” Map Visualization

The system must display hazard and habitation information on an interactive GIS map.

FR-02 â€” Risk Classification

The system must assign each monitored habitation a configurable risk category.

FR-03 â€” Multi-Hazard Analysis

The system must combine multiple applicable hazards into a habitation-level risk assessment.

FR-04 â€” Population Exposure

The system must estimate the population exposed to identified hazards.

FR-05 â€” Vulnerability Analysis

The system must calculate vulnerability using demographic, infrastructure, and accessibility indicators.

FR-06 â€” Capacity Assessment

The system must calculate shelter and relocation-area capacity.

FR-07 â€” Capacity Deficit

The system must identify areas where expected displaced population exceeds available capacity.

FR-08 â€” Relocation Priority

The system must calculate and display relocation priority.

FR-09 â€” Safe Destination Identification

The system must identify candidate safer locations with sufficient capacity.

FR-10 â€” Route Analysis

The system must display feasible evacuation/relocation routes when route data is available.

FR-11 â€” Alerts

The system must generate configurable alerts for critical changes.

FR-12 â€” Field Reports

Authorized field officers must be able to submit location-based reports.

FR-13 â€” Explainability

The system must show the major factors contributing to its risk and priority assessments.

FR-14 â€” Reports

Users must be able to generate/download assessment reports.

28. Non-Functional Requirements
Performance

The dashboard should load standard map views quickly under normal network conditions.

Scalability

The platform should support expansion from a pilot area to district/state level.

Availability

The platform should remain operational during high-demand emergency situations as far as infrastructure permits.

Security

Sensitive administrative and population information must be protected through role-based access control.

Reliability

Data sources and model outputs should carry timestamps and validation status.

Explainability

AI decisions must be understandable to non-technical officials.

Accessibility

The interface should support desktop and mobile use and be usable by personnel with limited technical expertise.

29. User Roles
Administrator

Manage users, data sources, thresholds, and system configuration.

Disaster Management Officer

View assessments, manage incidents, inspect relocation priorities, and generate reports.

Field Officer

Submit and verify field information.

Analyst

Analyze historical and spatial risk information.

Read-Only User

View approved maps and reports.

30. Technology Stack

A possible implementation stack:

Frontend
React.js / Next.js
Tailwind CSS
Mapbox GL / Leaflet
Backend
Python FastAPI / Node.js
REST APIs
Database
PostgreSQL
PostGIS for geospatial data
AI/ML
Python
Pandas
Scikit-learn
XGBoost/LightGBM
PyTorch/TensorFlow where deep learning is justified
GIS & Processing
GeoPandas
Rasterio
GDAL
PostGIS
Infrastructure
Cloud deployment
Object storage for geospatial/raster files
Containerized services
31. MVP Scope

For the first working prototype, avoid trying to solve every disaster type.

MVP should focus on:

One geographical region + 2â€“3 hazards + habitation-level risk + shelter capacity + relocation priority.

MVP Features
Interactive GIS map
Habitation database
Flood/landslide risk layer
Population exposure calculation
Vulnerability score
Risk score
Shelter capacity calculation
Capacity deficit
Relocation priority
Candidate safe shelters
Basic route visualization
Authority dashboard
32. Example MVP Scenario

Consider five villages:

Village A â†’ Risk: 82 â†’ Critical
Village B â†’ Risk: 74 â†’ High
Village C â†’ Risk: 48 â†’ Moderate
Village D â†’ Risk: 31 â†’ Moderate
Village E â†’ Risk: 16 â†’ Lower

Village A:

Population                  4,000
Population exposed          3,500
Vulnerability                 High
Available shelter capacity  2,100
Capacity deficit             1,400
Route accessibility           Poor

The system generates:

Critical relocation priority

Possible relocation sites:

Shelter 1 â†’ Capacity: 1,200
Shelter 2 â†’ Capacity: 900
Shelter 3 â†’ Capacity: 700

The authority can then assess how to distribute the affected population across these locations.

33. Success Metrics

The project should measure:

Risk Identification

Percentage of known high-risk locations correctly identified during validation.

Population Assessment

Difference between estimated and verified exposed population.

Capacity Accuracy

Difference between recorded and actual usable shelter capacity.

Decision Support

Time required for an officer to identify:

Affected habitation â†’ population â†’ shelter â†’ capacity deficit â†’ potential destination

System Performance

Map/API response time and system availability.

Field Verification

Percentage of AI/system-generated assessments verified by authorized personnel.

34. Key Risks
Data Quality

Incorrect or outdated population, infrastructure, or hazard data can produce misleading results.

False Positives

The system may classify an area as high-risk when actual conditions are less severe.

False Negatives

An area may be missed despite having significant risk.

Real-Time Data Limitations

Sensor or satellite data may be unavailable, delayed, or incomplete.

Capacity Misreporting

Recorded shelter capacity may not represent actual usable capacity during an emergency.

Over-Automation

Officials may incorrectly treat an AI recommendation as an automatic decision.

Mitigation

The platform should therefore display:

Risk Score + Confidence/Validation Status + Evidence + Timestamp + Human Review

rather than presenting AI predictions as absolute truth.

35. Privacy and Security

Population-level information should be used wherever possible instead of unnecessarily exposing individual identities.

The system should implement:

Role-based access control
Authentication
Encryption
Audit logs
Data validation
Secure APIs
Access restrictions for sensitive information
Backup and recovery mechanisms
36. Future Enhancements
Predictive Disaster Simulation

Allow officials to simulate:

â€œWhat happens if rainfall increases by X?â€

and estimate changes in:

affected area
exposed population
shelter demand
capacity deficit
evacuation routes
Digital Twin

Create a continuously updated digital representation of the monitored region.

IoT Integration

Connect:

Water-level sensors
Rain gauges
Soil sensors
Weather stations
Structural sensors
Computer Vision

Analyze satellite/drone imagery to detect:

Flood expansion
Damaged roads
Landslides
Building damage
Blocked routes
Community Reporting

Allow verified residents/community workers to report:

Flooding
Road blockage
Damaged buildings
Shelter conditions
Missing resources
Disaster Resource Optimization

Future versions could also optimize allocation of:

Rescue teams
Ambulances
Food
Water
Medical supplies
37. Example System Output

The final platform should produce an easy-to-understand result such as:

=================================================
             HABITATION RISK REPORT
=================================================

Location       : Village ABC
District       : XYZ
Population     : 4,280

-------------------------------------------------
RISK ASSESSMENT
-------------------------------------------------

Flood Risk                HIGH
Landslide Risk            LOW
Erosion Risk              HIGH
Overall Risk Score        84/100
Zone                      RED

-------------------------------------------------
VULNERABILITY
-------------------------------------------------

Population Exposure       3,750
Vulnerability             HIGH
Road Accessibility        POOR
Medical Access            LIMITED

-------------------------------------------------
CAPACITY
-------------------------------------------------

Population Requiring
Relocation                3,750

Available Capacity        2,300

Capacity Deficit          1,450

-------------------------------------------------
RELOCATION PRIORITY
-------------------------------------------------

Priority                  CRITICAL

-------------------------------------------------
POTENTIAL DESTINATIONS
-------------------------------------------------

Shelter A                 1,100 capacity
Shelter B                   900 capacity
Shelter C                   600 capacity

-------------------------------------------------
KEY REASONS
-------------------------------------------------

âœ“ High flood exposure
âœ“ High vulnerable population
âœ“ Insufficient shelter capacity
âœ“ Poor evacuation accessibility
âœ“ Multiple hazards detected

-------------------------------------------------
STATUS

Human authority review required
=================================================
38. Product Differentiator

The main differentiator is that the platform does not stop at hazard mapping.

Traditional hazard mapping answers:

â€œWhere is the danger?â€

This system additionally answers:

â€œWho is affected?â€

â€œCan the available facilities accommodate them?â€

â€œWhere is capacity available?â€

â€œWhich cases require the most urgent attention?â€

This creates a complete decision-support chain:

Hazard Detection â†’ Vulnerability â†’ Exposure â†’ Risk â†’ Capacity â†’ Relocation Need â†’ Safe Destination

39. One-Line Value Proposition

â€œAn AI-powered geospatial decision-support platform that identifies vulnerable habitations, measures disaster risk and carrying capacity, and helps authorities prioritize immediate relocation needs.â€

40. Recommended MVP Development Roadmap
Phase 1 â€” Data & GIS

Create habitation, population, roads, rivers, hazard, and shelter layers.

Phase 2 â€” Risk Engine

Implement hazard, exposure, vulnerability, and combined risk scoring.

Phase 3 â€” Capacity Engine

Add shelter occupancy, usable capacity, and capacity-deficit calculations.

Phase 4 â€” Relocation Engine

Identify relocation-priority cases and candidate safer destinations.

Phase 5 â€” Dashboard

Build the interactive authority dashboard and habitation detail pages.

Phase 6 â€” AI Enhancement

Add predictive models, anomaly detection, and explainable AI.

Phase 7 â€” Field Validation

Add mobile reporting and compare system results with field observations.

41. Final Product Concept

The complete product can be summarized as:

              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â”‚   DATA SOURCES      â”‚
              â”‚ Weather | GIS | IoT â”‚
              â”‚ Population | Field â”‚
              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â†“
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â”‚   AI + GIS ENGINE   â”‚
              â”‚ Hazard + Exposure   â”‚
              â”‚ Vulnerability       â”‚
              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â†“
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â”‚   RISK ASSESSMENT   â”‚
              â”‚ Green/Yellow/Orange â”‚
              â”‚        /Red         â”‚
              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â†“
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â”‚ CARRYING CAPACITY   â”‚
              â”‚ Shelter + Services  â”‚
              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â†“
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â”‚ RELOCATION ENGINE   â”‚
              â”‚ Priority + Options  â”‚
              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â†“
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â”‚ AUTHORITY DASHBOARD â”‚
              â”‚ Map + Alerts + Data â”‚
              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

Core output:
â€œRisk à¤•à¤¹à¤¾à¤ à¤¹à¥ˆ â†’ à¤•à¤¿à¤¤à¤¨à¥‡ à¤²à¥‹à¤— à¤ªà¥à¤°à¤­à¤¾à¤µà¤¿à¤¤ à¤¹à¥ˆà¤‚ â†’ capacity à¤•à¤¿à¤¤à¤¨à¥€ à¤¹à¥ˆ â†’ deficit à¤•à¤¿à¤¤à¤¨à¤¾ à¤¹à¥ˆ â†’ à¤•à¤¿à¤¸ habitation à¤•à¥‹ à¤ªà¤¹à¤²à¥‡ attention à¤šà¤¾à¤¹à¤¿à¤ â†’ à¤¸à¤‚à¤­à¤¾à¤µà¤¿à¤¤ safer destinations à¤•à¥Œà¤¨ à¤¸à¥‡ à¤¹à¥ˆà¤‚.â€
