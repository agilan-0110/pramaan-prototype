# SETU API Contract Documentation

## Overview
This document specifies the REST API contract for the SETU Institutional Monitoring & Contradiction Detection Platform.

---

## 1. Compliance Rule Engine API

### 1.1 Evaluate Project Compliance
Audits a single project against statutory MPLADS rules:
1. **Rule 1: Ceiling Breach (`RULE_CEILING_BREACH`)**: Checks if `sanctionedAmount` exceeds statutory category expenditure limits.
2. **Rule 2: Deadline Breach (`RULE_DEADLINE_BREACH`)**: Checks if execution duration exceeds the 548-day (18-month) statutory completion deadline.
3. **Rule 3: Category Mismatch (`RULE_CATEGORY_MISMATCH`)**: Checks if `implementingAgency` aligns with `category` (Road $\rightarrow$ PWD, Health $\rightarrow$ Health Mission, etc.).
4. **Rule 4: Fund-Splitting Detection (`RULE_FUND_SPLITTING`)**: Detects artificial contract slicing / tender splitting where a vendor has multiple works individually below the single-approval ceiling (₹1.00 Cr) whose aggregate sum exceeds the threshold.

- **Endpoint**: `GET /projects/{id}/compliance`
- **Path Parameters**:
  - `id` (string, required): Project identifier (e.g. `PRJ-IND-2001`)
- **Headers**:
  - `Accept: application/json`

#### Response: `200 OK`
```json
{
  "projectId": "PRJ-IND-2001",
  "projectName": "Upgradation and Bituminous Surfacing of Main Rural Feeder Road, Pune",
  "state": "Maharashtra",
  "district": "Pune",
  "constituency": "Baramati",
  "mpName": "Shri Aloknath Deshpande (Fictional)",
  "category": "Road",
  "implementingAgency": "Public Works Department (PWD)",
  "vendorId": "VND-016",
  "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
  "sanctionedAmount": 12900000,
  "complianceScore": 75,
  "overallStatus": "FLAGGED",
  "totalViolations": 1,
  "rulesEvaluated": 4,
  "rulesPassed": 3,
  "rulesFailed": 1,
  "flags": [
    {
      "ruleId": "RULE_CEILING_BREACH",
      "ruleName": "Category Expenditure Ceiling Breach",
      "passed": false,
      "status": "FLAGGED",
      "severity": "HIGH",
      "message": "Sanctioned amount ₹12,900,000 exceeds statutory ceiling limit of ₹12,000,000 for category 'Road' by ₹900,000 (+7.5%).",
      "threshold": 12000000,
      "actualValue": 12900000,
      "expectedAgency": null,
      "actualAgency": null,
      "details": {
        "category": "Road",
        "ceilingLimit": 12000000,
        "sanctionedAmount": 12900000,
        "excessAmount": 900000,
        "excessPercentage": 7.5
      }
    },
    {
      "ruleId": "RULE_DEADLINE_BREACH",
      "ruleName": "Statutory Completion Deadline Breach",
      "passed": true,
      "status": "PASSED",
      "severity": "NONE",
      "message": "Project execution timeline (365 days) conforms to statutory completion schedule (threshold: 548 days).",
      "threshold": 548,
      "actualValue": 365,
      "expectedAgency": null,
      "actualAgency": null,
      "details": {
        "elapsedTimelineDays": 365,
        "statutoryLimitDays": 548,
        "daysDelayed": 0,
        "overdueDays": 0
      }
    },
    {
      "ruleId": "RULE_CATEGORY_MISMATCH",
      "ruleName": "Implementing Agency Alignment",
      "passed": true,
      "status": "PASSED",
      "severity": "NONE",
      "message": "Implementing agency 'Public Works Department (PWD)' is administratively authorized for category 'Road'.",
      "threshold": null,
      "actualValue": null,
      "expectedAgency": "Public Works Department (PWD)",
      "actualAgency": "Public Works Department (PWD)",
      "details": {
        "category": "Road",
        "assignedAgency": "Public Works Department (PWD)",
        "permittedAgencyTypes": [
          "Public Works Department (PWD)",
          "PWD",
          "Roads & Bridges",
          "Highways Department",
          "State PWD"
        ]
      }
    },
    {
      "ruleId": "RULE_FUND_SPLITTING",
      "ruleName": "Single-Approval Split Tender Detection",
      "passed": true,
      "status": "PASSED",
      "severity": "NONE",
      "message": "Vendor 'Sahyadri Heavy Earthmovers (Fictional)' works conform to statutory procurement ceilings without sub-threshold aggregation patterns.",
      "threshold": 10000000,
      "actualValue": 12900000,
      "expectedAgency": null,
      "actualAgency": null,
      "details": {
        "vendorId": "VND-016",
        "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
        "singleApprovalThreshold": 10000000,
        "subThresholdProjectCount": 2,
        "combinedSanctionedAmount": 16600000,
        "splitProjectIds": [],
        "splitProjectNames": []
      }
    }
  ],
  "evaluatedAt": "2026-09-19T22:40:00.000Z"
}
```

#### Response: `404 Not Found`
```json
{
  "detail": "Project with ID 'PRJ-INVALID' was not found in the platform registry."
}
```

---

### 1.2 Portfolio Compliance Summary
- **Endpoint**: `GET /projects/compliance/summary`
- **Response**: `200 OK`
```json
{
  "totalProjects": 90,
  "compliantProjects": 10,
  "flaggedProjects": 80,
  "averageComplianceScore": 67.8,
  "violationsByRule": {
    "RULE_CEILING_BREACH": 19,
    "RULE_DEADLINE_BREACH": 6,
    "RULE_CATEGORY_MISMATCH": 2,
    "RULE_FUND_SPLITTING": 60
  },
  "generatedAt": "2026-09-19T22:40:00.000Z"
}
```

---

### 1.3 List Flagged Projects
- **Endpoint**: `GET /projects/compliance/violations?min_violations=1`
- **Query Parameters**:
  - `min_violations` (integer, optional, default: 1): Minimum number of violated rules.
- **Response**: `200 OK` (Array of ProjectComplianceResponse objects)

---

## 2. Duplicate Work Detection API

### 2.1 Get Duplicate Matches for a Project
Identifies overlapping infrastructure schemes, reworded cross-year proposals, and double-billed works:
1. **Fuzzy Text Matching (RapidFuzz)**: Token set ratio comparing work descriptions.
2. **Geo-Proximity Check**: Co-location within the same district increases confidence (+12 points); cross-state matches are penalized (-12 points) to filter out unrelated standard template works.
3. **Cost Range Similarity**: Evaluates budget variance (`<= 25%` boosts confidence by +8 points).
4. **Cross-Year vs Same-Year Categorization**: Compares project fiscal years (`"cross-year"` vs `"same-year"`).
5. **Vendor-Match Weighting**: Matching contractor identity (`vendorId` or `vendorName`) adds significant confidence (+15 points, `vendorMatch: true`).

- **Endpoint**: `GET /projects/{id}/duplicates`
- **Path Parameters**:
  - `id` (string, required): Project identifier (e.g. `PRJ-IND-2008`)
- **Query Parameters**:
  - `threshold` (float, optional, default: 80.0): Cutoff score threshold (0.0 - 100.0)
  - `same_district_only` (bool, optional, default: false): Restrict matches strictly to the same district

#### Response: `200 OK`
```json
{
  "projectId": "PRJ-IND-2008",
  "projectName": "Provision of Modern Dual-Desk Ergonomic Furniture for 12 Classrooms, Lucknow",
  "category": "Education",
  "district": "Lucknow",
  "state": "Uttar Pradesh",
  "financialYear": "2025-26",
  "vendorId": "VND-022",
  "vendorName": "Vindhya Power & Pumping Solutions (Fictional)",
  "sanctionedAmount": 5700000,
  "hasDuplicates": true,
  "totalDuplicates": 1,
  "highestSimilarityScore": 100.0,
  "thresholdApplied": 80.0,
  "duplicates": [
    {
      "matchedProjectId": "PRJ-IND-2091",
      "matchedProjectName": "Supply and Fabrication of Dual-Desk Ergonomic Furniture for 12 School Classrooms, Lucknow",
      "matchedDistrict": "Lucknow",
      "matchedState": "Uttar Pradesh",
      "matchedFinancialYear": "2024-25",
      "matchedVendorId": "VND-022",
      "matchedVendorName": "Vindhya Power & Pumping Solutions (Fictional)",
      "matchedSanctionedAmount": 5600000,
      "similarityScore": 100.0,
      "textSimilarity": 83.51,
      "matchType": "cross-year",
      "vendorMatch": true,
      "sameDistrict": true,
      "sameState": true,
      "similarCostRange": true,
      "costVariancePercentage": 1.8,
      "reasons": [
        "Fuzzy text description similarity of 83.51% evaluated via token analysis.",
        "Geographic co-location: both projects situated in Lucknow district.",
        "Contractor entity match: same vendor 'Vindhya Power & Pumping Solutions (Fictional)' awarded both project packages.",
        "Similar financial scale: sanctioned amounts within 1.8% variance.",
        "Cross-fiscal year repetition: work originally sanctioned in 2024-25 re-tendered in 2025-26."
      ]
    }
  ],
  "evaluatedAt": "2026-09-19T22:50:00.000Z"
}
```

#### Response: `404 Not Found`
```json
{
  "detail": "Project with ID 'PRJ-INVALID-XYZ' was not found in the platform registry."
}
```

---

### 2.2 Portfolio Duplicate Summary
- **Endpoint**: `GET /projects/duplicates/summary`
- **Response**: `200 OK`
```json
{
  "totalFlaggedPairs": 5,
  "crossYearDuplicates": 4,
  "sameYearDuplicates": 1,
  "vendorMatchedDuplicates": 4,
  "sameDistrictDuplicates": 5,
  "highestSimilarityScore": 100.0,
  "generatedAt": "2026-09-19T22:50:00.000Z"
}
```

---

### 2.3 List All Flagged Duplicate Pairs
- **Endpoint**: `GET /projects/duplicates/pairs?threshold=80.0`
- **Query Parameters**:
  - `threshold` (float, optional, default: 80.0): Cutoff score threshold.
- **Response**: `200 OK` (Array of DuplicatePairItem objects)

---

## 3. Financial Risk Engine API

### 3.1 Get Project Financial Risk & SHAP Attribution
Evaluates predictive financial and implementation anomalies using a trained scikit-learn `IsolationForest` model with `SHAP (KernelExplainer)` feature attribution:
1. **Features Evaluated**: `sanctionedAmount`, `expenditure`, `physicalProgress`, `financialProgress`, `progressMismatch` (`financialProgress - physicalProgress`), `daysDelayed`.
2. **Anomaly to Risk Score**: Maps raw model scores to a calibrated 0-100 `riskScore` (higher = more anomalous).
3. **Risk Level Buckets**:
   - `LOW`: riskScore < 31
   - `MEDIUM`: 31 - 60
   - `HIGH`: 61 - 80
   - `CRITICAL`: 81+
4. **SHAP Explainability**: Attributes marginal contribution of each feature to the anomaly score, calculating impact percentages and risk directions (`INCREASES_RISK` vs `DECREASES_RISK`).
5. **Plain-Language Synthesis**: Synthesizes a human-readable oversight audit explanation from top contributing features.
6. **Cached Execution**: Model is trained at startup and evaluations are pre-cached for sub-millisecond query performance.

- **Endpoint**: `GET /projects/{id}/risk`
- **Path Parameters**:
  - `id` (string, required): Project identifier (e.g. `PRJ-IND-2003`)
- **Headers**:
  - `Accept: application/json`

#### Response: `200 OK`
```json
{
  "projectId": "PRJ-IND-2003",
  "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
  "category": "Education",
  "state": "Maharashtra",
  "district": "Pune",
  "constituency": "Shirur",
  "mpName": "Smt. Priyamvada Acharya (Fictional)",
  "riskScore": 95,
  "riskLevel": "CRITICAL",
  "anomalyScore": 1.0,
  "rawModelScore": -0.0908,
  "modelType": "IsolationForest",
  "explainabilityMethod": "SHAP (KernelExplainer)",
  "features": {
    "sanctionedAmount": 4800000.0,
    "expenditure": 2448000.0,
    "physicalProgress": 17.0,
    "financialProgress": 51.0,
    "progressMismatch": 34.0,
    "daysDelayed": 153.0
  },
  "shapValues": {
    "sanctionedAmount": 0.0058,
    "expenditure": 0.0076,
    "physicalProgress": 0.0402,
    "financialProgress": 0.0144,
    "progressMismatch": 0.0339,
    "daysDelayed": 0.04
  },
  "topContributingFeatures": [
    {
      "feature": "physicalProgress",
      "displayName": "Physical Milestone Progress",
      "value": 17.0,
      "unit": "%",
      "shapValue": 0.0402,
      "contributionDirection": "INCREASES_RISK",
      "impactPercentage": 28.3
    },
    {
      "feature": "daysDelayed",
      "displayName": "Milestone Schedule Delay",
      "value": 153.0,
      "unit": "days",
      "shapValue": 0.04,
      "contributionDirection": "INCREASES_RISK",
      "impactPercentage": 28.2
    },
    {
      "feature": "progressMismatch",
      "displayName": "Disbursement-to-Progress Gap",
      "value": 34.0,
      "unit": "%",
      "shapValue": 0.0339,
      "contributionDirection": "INCREASES_RISK",
      "impactPercentage": 23.9
    },
    {
      "feature": "financialProgress",
      "displayName": "Financial Disbursement Progress",
      "value": 51.0,
      "unit": "%",
      "shapValue": 0.0144,
      "contributionDirection": "INCREASES_RISK",
      "impactPercentage": 10.1
    },
    {
      "feature": "expenditure",
      "displayName": "Cumulative Expenditure",
      "value": 2448000.0,
      "unit": "INR",
      "shapValue": 0.0076,
      "contributionDirection": "INCREASES_RISK",
      "impactPercentage": 5.4
    },
    {
      "feature": "sanctionedAmount",
      "displayName": "Sanctioned Budget",
      "value": 4800000.0,
      "unit": "INR",
      "shapValue": 0.0058,
      "contributionDirection": "INCREASES_RISK",
      "impactPercentage": 4.1
    }
  ],
  "plainLanguageExplanation": "Flagged due to severely lagging physical completion (17.0%) despite substantial fund utilization (51.0%) alongside a milestone execution delay of 153 days.",
  "evaluatedAt": "2026-09-19T23:05:00.000Z"
}
```

#### Response: `404 Not Found`
```json
{
  "detail": "Project with ID 'PRJ-NONEXISTENT' was not found in the platform registry."
}
```

---

### 3.2 Portfolio Financial Risk Summary
- **Endpoint**: `GET /projects/risk/summary`
- **Response**: `200 OK`
```json
{
  "totalProjectsMonitored": 95,
  "averageRiskScore": 40.5,
  "distributionByLevel": {
    "LOW": 33,
    "MEDIUM": 48,
    "HIGH": 11,
    "CRITICAL": 3
  },
  "modelMetadata": {
    "algorithm": "IsolationForest",
    "estimatorCount": 150,
    "contamination": 0.2,
    "explainabilityMethod": "SHAP (KernelExplainer)",
    "featuresUsed": [
      "sanctionedAmount",
      "expenditure",
      "physicalProgress",
      "financialProgress",
      "progressMismatch",
      "daysDelayed"
    ]
  },
  "generatedAt": "2026-09-19T23:05:00.000Z"
}
```

---

### 3.3 List High Risk Projects
- **Endpoint**: `GET /projects/risk/high-risk?min_score=61`
- **Query Parameters**:
  - `min_score` (integer, optional, default: 61): Minimum risk score threshold.
- **Response**: `200 OK` (Array of ProjectRiskResponse objects in HIGH and CRITICAL risk tiers)

---

## 4. Trend Analysis & Seasonal Fund-Dumping API

### 4.1 Yearly Expenditure Trends
- **Endpoint**: `GET /trends/expenditure/yearly`
- **Response**: `200 OK`
```json
[
  {
    "financialYear": "2024-25",
    "totalSanctioned": 290300000,
    "totalExpenditure": 210264000,
    "projectCount": 35,
    "completedCount": 35,
    "inProgressCount": 0,
    "fundDumpingCount": 16,
    "fundDumpingAmount": 96250000,
    "utilizationRate": 72.4,
    "averagePhysicalProgress": 100.0,
    "averageFinancialProgress": 72.4,
    "fundDumpingPercentage": 45.7
  },
  {
    "financialYear": "2025-26",
    "totalSanctioned": 522100000,
    "totalExpenditure": 354787999,
    "projectCount": 60,
    "completedCount": 0,
    "inProgressCount": 60,
    "fundDumpingCount": 22,
    "fundDumpingAmount": 199846000,
    "utilizationRate": 68.0,
    "averagePhysicalProgress": 42.1,
    "averageFinancialProgress": 68.0,
    "fundDumpingPercentage": 36.7
  }
]
```

---

### 4.2 State-level Expenditure Trends
- **Endpoint**: `GET /trends/expenditure/by-state`
- **Query Parameters**: `year` (optional)
- **Response**: `200 OK` (Array of StateExpenditure objects)

---

### 4.3 District-level Expenditure Trends
- **Endpoint**: `GET /trends/expenditure/by-district`
- **Query Parameters**: `state` (optional), `year` (optional)
- **Response**: `200 OK` (Array of DistrictExpenditure objects)

---

### 4.4 Quarterly Trends & March Rush Metrics
- **Endpoint**: `GET /trends/expenditure/quarterly`
- **Query Parameters**: `year` (optional)
- **Response**: `200 OK`
```json
{
  "financialYearFilter": "All Active Fiscal Years",
  "totalAnnualExpenditure": 565051999,
  "quarterlyBreakdown": [
    { "quarter": "Q1", "months": "Apr - Jun", "expenditure": 84757800, "percentageOfAnnualTotal": 15.0 },
    { "quarter": "Q2", "months": "Jul - Sep", "expenditure": 113010399, "percentageOfAnnualTotal": 20.0 },
    { "quarter": "Q3", "months": "Oct - Dec", "expenditure": 129961960, "percentageOfAnnualTotal": 23.0 },
    { "quarter": "Q4", "months": "Jan - Mar", "expenditure": 237321840, "percentageOfAnnualTotal": 42.0, "isRush": true }
  ],
  "marchRushMetrics": {
    "finalSixWeeksExpenditure": 237523079,
    "finalSixWeeksPercentage": 42.0,
    "rushDisbursementCount": 38,
    "auditObservation": "42.0% of annual expenditure concentrated in the final 6 weeks (Feb 15 - Mar 31), characteristic of statutory budget exhaustion pressure ('March Rush')."
  }
}
```

---

### 4.5 Seasonal Fund-Dumping Audit Report
- **Endpoint**: `GET /trends/fund-dumping`
- **Response**: `200 OK`
```json
{
  "totalProjectsAudited": 95,
  "fundDumpingProjectsCount": 38,
  "totalDumpedExpenditure": 296096000,
  "percentageOfTotalExpenditure": 52.4,
  "definition": "Disbursements released in the final 6 weeks of the fiscal year (Feb 15 - Mar 31) to exhaust lapsing grants.",
  "flaggedProjects": [...]
}
```

---

### 4.6 Project Spending Pacing Audit
- **Endpoint**: `GET /trends/projects/{id}/spending-trend`
- **Path Parameters**: `id` (string, required)
- **Response**: `200 OK`
```json
{
  "projectId": "PRJ-IND-2003",
  "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
  "state": "Maharashtra",
  "district": "Pune",
  "financialYear": "2025-26",
  "sanctionedAmount": 4800000,
  "expenditure": 2448000,
  "dateSpent": "2026-02-26",
  "quarterSpent": "Q4",
  "pacingStatus": "SEASONAL_MARCH_RUSH_DUMP",
  "isSeasonalFundDumping": true,
  "finalSixWeeksExpenditure": 1958400,
  "finalSixWeeksPercentage": 80.0,
  "disbursements": [
    { "tranche": "T1", "date": "2025-08-12", "amount": 489600, "percentage": 20.0, "quarter": "Q2" },
    { "tranche": "T2", "date": "2026-02-26", "amount": 1958400, "percentage": 80.0, "quarter": "Q4", "isFinalSixWeeks": true }
  ],
  "auditFinding": "Voucher outlays heavily cluster in the final 6 weeks of FY 2025-26 (date: 2026-02-26), indicating rapid end-of-year grant exhaustion prior to physical stage certification."
}
```

---

## 5. Predictive Insights API

### 5.1 Project Milestone & Budget Forecast
- **Endpoint**: `GET /projects/{id}/forecast` (or `/projects/{id}/predictive`)
- **Path Parameters**: `id` (string, required)
- **Response**: `200 OK`
```json
{
  "projectId": "PRJ-IND-2003",
  "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
  "category": "Education",
  "district": "Pune",
  "state": "Maharashtra",
  "status": "In Progress",
  "currentMetrics": {
    "physicalProgress": 17.0,
    "financialProgress": 51.0,
    "progressMismatchGap": 34.0,
    "currentDelayDays": 153,
    "sanctionedAmount": 4800000,
    "currentExpenditure": 2448000
  },
  "delayPrediction": {
    "delayProbability": 0.71,
    "currentDelayDays": 153,
    "predictedAdditionalDelayDays": 198,
    "totalProjectedDelayDays": 351,
    "riskTier": "HIGH",
    "forecastRationale": "Existing schedule slippage of 153 days and physical velocity of 0.11%/day indicate high probability of an additional 198 days delay before civil milestone handover."
  },
  "costOverrunPrediction": {
    "costOverrunProbability": 0.75,
    "sanctionedAmount": 4800000,
    "projectedFinalCost": 14400000,
    "projectedCostOverrunAmount": 9600000,
    "projectedCostOverrunPercentage": 200.0,
    "riskTier": "HIGH",
    "forecastRationale": "Expenditure burn-rate outpaces certified physical completion by 34.0%, projecting an estimated budget deficit of ₹9,600,000 upon completion."
  },
  "plainLanguageForecast": "Forecast: Severe delivery and budget risk. Project is projected to slip by an additional 198 days with an 75% probability of cost overrun requiring an estimated ₹9,600,000 escalation.",
  "methodologyTransparency": {
    "algorithmType": "Empirical Progress Velocity & Disbursement Burn-Rate Linear Extrapolation",
    "modelDisclaimer": "Honestly Labeled: This forecast uses an empirical statistical heuristic based on observed progress rate and disbursement-to-milestone gaps. It is NOT generated by a deep neural network.",
    "confidenceRange": "+/- 15% based on district historical milestone variance",
    "featuresEvaluated": ["physicalProgress", "financialProgress", "progressMismatch", "daysDelayed", "expenditureBurnRate"]
  },
  "evaluatedAt": "2026-09-19T23:15:00.000Z"
}
```

---

### 5.2 Portfolio Predictive Risk Rollup
- **Endpoint**: `GET /predictive/portfolio-summary`
- **Response**: `200 OK`
```json
{
  "totalProjectsAudited": 95,
  "activeProjects": 60,
  "projectsAtHighDelayRisk": 34,
  "projectsAtHighCostOverrunRisk": 23,
  "aggregateProjectedCostEscalation": 171498258,
  "averageProjectedAdditionalDelayDays": 129.5,
  "methodology": "Empirical Progress Velocity & Disbursement Burn-Rate Linear Extrapolation (Honestly Labeled)",
  "generatedAt": "2026-09-19T23:15:00.000Z"
}
```

---

### 5.3 List Projects at Predictive Risk
- **Endpoint**: `GET /predictive/at-risk-projects?min_probability=0.50`
- **Query Parameters**:
  - `min_probability` (float, optional, default: 0.50): Minimum delay or cost risk probability cutoff.
- **Response**: `200 OK` (Array of project forecast objects)

---

## 6. Institutional Alerts Aggregator API

### 6.1 Get Ranked & Role-Scoped Alerts
Aggregates, weights, and ranks oversight signals across all four analytical engines:
1. **Financial Risk Engine (`risk.py`)**: High & Critical score anomalies with SHAP feature attribution (`FINANCIAL_RISK`).
2. **Compliance Rule Engine (`compliance.py`)**: Statutory rule breaches across category ceilings, execution deadlines, departmental alignments, and tender-splitting patterns (`COMPLIANCE_VIOLATION`).
3. **Duplicate Work Detection (`duplicate.py`)**: High-confidence cross-year and geospatial duplicate tenders (`DUPLICATE_WORK`).
4. **Trend Analysis (`trend.py`)**: Year-end seasonal spending surges ("March Rush") without certified physical progress (`SEASONAL_ANOMALY`).

- **Ranking**: Sorted descending by `severity` (`CRITICAL` > `HIGH` > `WARNING` > `LOW`) and `riskScore`.
- **Role-Scoping (`ROLES.md`)**:
  - `role="District Authority"&region="<District>"`: Restricts strictly to the officer's assigned district.
  - `role="State Nodal"&region="<State>"`: Restricts strictly to works within the nodal state.
  - `role="Central Nodal Agency (MoSPI)"` (or Auditor/Admin): Full national oversight across all states and districts.

- **Endpoint**: `GET /alerts`
- **Query Parameters**:
  - `role` (string, optional): User administrative role (e.g. `"District Authority"`, `"State Nodal"`, `"Central Nodal Agency (MoSPI)"`)
  - `region` (string, optional): Regional territory name (e.g. `"Pune"`, `"Maharashtra"`)
  - `state` (string, optional): Filter directly by state
  - `district` (string, optional): Filter directly by district
  - `alert_type` (string, optional): Filter by `FINANCIAL_RISK` | `COMPLIANCE_VIOLATION` | `DUPLICATE_WORK` | `SEASONAL_ANOMALY`
  - `severity` (string, optional): Filter by `CRITICAL` | `HIGH` | `WARNING` | `LOW`
  - `source_module` (string, optional): Filter by originating engine (`risk` | `compliance` | `duplicate` | `trend`)
  - `min_risk_score` (integer, optional): Cutoff score threshold (0-100)
  - `limit` (integer, optional): Maximum items to return
  - `offset` (integer, optional): Pagination offset (default: 0)

#### Response: `200 OK`
```json
[
  {
    "id": "ALT-2026-001",
    "projectId": "PRJ-IND-2008",
    "projectName": "Provision of Modern Dual-Desk Ergonomic Furniture for 12 Classrooms, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "alertType": "DUPLICATE_WORK",
    "severity": "CRITICAL",
    "riskScore": 98,
    "title": "Duplicate Work Scheme Detected (100% Match) - Lucknow",
    "description": "Potential cross-year duplicate asset tender matching Supply and Fabrication of Dual-Desk Ergonomic Furniture for 12 School Classrooms, Lucknow (ID: PRJ-IND-2091). Fuzzy text description similarity of 83.51% evaluated via token analysis. Geographic co-location: both projects situated in Lucknow district.",
    "timestamp": "2026-08-08T14:30:00Z",
    "recommendedAction": "Initiate cross-departmental GPS verification survey and physical site inspection to ensure non-duplication of municipal asset funds.",
    "sourceModule": "duplicate"
  },
  {
    "id": "ALT-2026-005",
    "projectId": "PRJ-IND-2003",
    "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "alertType": "FINANCIAL_RISK",
    "severity": "CRITICAL",
    "riskScore": 95,
    "title": "Financial Risk Anomaly: Critical Risk (95/100) - Pune",
    "description": "Flagged due to severely lagging physical completion (17.0%) despite substantial fund utilization (51.0%) alongside a milestone execution delay of 153 days.",
    "timestamp": "2026-09-19T23:05:00Z",
    "recommendedAction": "Freeze subsequent tranche disbursement pending physical verification audit by District Collectorate.",
    "sourceModule": "risk"
  }
]
```

---

### 6.2 Get Alerts Summary & Jurisdictional Counters
- **Endpoint**: `GET /alerts/summary`
- **Query Parameters**: `role` (optional), `region` (optional), `state` (optional), `district` (optional)
- **Response**: `200 OK`
```json
{
  "totalAlerts": 148,
  "criticalCount": 90,
  "highCount": 45,
  "warningCount": 13,
  "lowCount": 0,
  "averageRiskScore": 74.9,
  "byType": {
    "FINANCIAL_RISK": 14,
    "COMPLIANCE_VIOLATION": 91,
    "DUPLICATE_WORK": 5,
    "SEASONAL_ANOMALY": 38
  },
  "byType": {
    "FINANCIAL_RISK": 14,
    "COMPLIANCE_VIOLATION": 91,
    "DUPLICATE_WORK": 5,
    "SEASONAL_ANOMALY": 38,
    "CITIZEN_CONTRADICTION": 8
  },
  "bySourceModule": {
    "risk": 14,
    "compliance": 91,
    "duplicate": 5,
    "trend": 38,
    "citizen": 8
  },
  "roleScoped": false,
  "roleApplied": null,
  "regionApplied": null,
  "stateApplied": null,
  "districtApplied": null,
  "generatedAt": "2026-09-19T23:30:00Z"
}
```

---

### 6.3 Get Alert by Unique Identifier
- **Endpoint**: `GET /alerts/{id}`
- **Path Parameters**: `id` (string, required, e.g. `ALT-2026-001`)
- **Response**: `200 OK` (AlertItem object)
- **Response**: `404 Not Found` if alert ID is not present in registry.

---

## 7. Citizen Ground Truth NLP API

### 7.1 Get Project Citizen Reports
Returns all evaluated citizen grievance reports for a project, showing cosine semantic relevance, rule-based contradiction score, and plain-language explanation:
- **Endpoint**: `GET /projects/{id}/citizen-reports`
- **Path Parameters**:
  - `id` (string, required): Project identifier (e.g. `PRJ-IND-2003`)
- **Response**: `200 OK`
```json
{
  "projectId": "PRJ-IND-2003",
  "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
  "totalReports": 1,
  "contradictionsCount": 1,
  "corroborationsCount": 0,
  "highestContradictionScore": 97,
  "reports": [
    {
      "id": "CIT-2026-101",
      "projectId": "PRJ-IND-2003",
      "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
      "district": "Pune",
      "state": "Maharashtra",
      "complaintText": "The contractor claimed 90% of the digital library and reading hall civil work is finished, but on the ground only the bare external brick walls stand without a roof slab, windows, or plastering. Heavy monsoon water has accumulated inside and no work has happened for two months.",
      "matchedOfficialClaim": "Physical progress certified at 85%; digital library civil structure and composite hall nearing completion.",
      "topicalRelevanceScore": 49.6,
      "contradictionScore": 97,
      "isContradiction": true,
      "plainLanguageExplanation": "Official claim: 'Physical progress certified at 85%; digital library civil structure and composite hall nearing completion.'. Citizen report: 'without a roof'. Flagged: direct physical milestone contradiction.",
      "status": "Under Investigation",
      "submittedAt": "2026-07-18T11:20:00Z"
    }
  ]
}
```
- **Response**: `404 Not Found` if project is not registered.

---

### 7.2 Submit Public Citizen Grievance Report
Accepts public submissions from citizens reporting on-the-ground observations. Evaluates the report in real time using the `all-MiniLM-L6-v2` embedding and negation detection pipeline. If `contradictionScore >= 60`, automatically triggers a `CITIZEN_CONTRADICTION` institutional alert:
- **Endpoint**: `POST /projects/{id}/citizen-reports`
- **Path Parameters**: `id` (string, required)
- **Request Body**:
```json
{
  "complaintText": "On ground inspection today shows the reading room is completely unfinished and only loose red mud is dumped outside with no roof.",
  "citizenName": "Kavita Rao",
  "phone": "9876543210",
  "district": "Pune",
  "state": "Maharashtra"
}
```
- **Response**: `201 Created`
```json
{
  "id": "CIT-2026-115",
  "projectId": "PRJ-IND-2003",
  "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
  "complaintText": "On ground inspection today shows the reading room is completely unfinished and only loose red mud is dumped outside with no roof.",
  "matchedOfficialClaim": "Physical progress certified at 17%; status: In Progress.",
  "topicalRelevanceScore": 32.4,
  "contradictionScore": 69,
  "isContradiction": true,
  "plainLanguageExplanation": "Official claim: 'Physical progress certified at 17%; status: In Progress.'. Citizen report: 'dumped'. Flagged: direct physical milestone contradiction.",
  "alertTriggered": true,
  "status": "Pending Inspection",
  "submittedAt": "2026-09-19T23:50:00.000Z"
}
```

---

### 7.3 List All Platform Citizen Reports
- **Endpoint**: `GET /projects/citizen-reports/all`
- **Response**: `200 OK` (Array of CitizenComplaintItem objects)





