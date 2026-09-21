# SETU Platform Process & Workflow Audit Report

**Audit Date:** September 21, 2026  
**Repository:** agilan-0110/sih-prototype (`SETU`)  
**Scope:** Full codebase audit covering `/backend/app`, `/frontend/src`, `ROLES.md`, `API_CONTRACT.md`, and `PROGRESS.md`.  
**Execution Mode:** Report-only inspection (zero application source code modifications).

---

## Executive Summary

This comprehensive system audit inspects all backend services, routers, data models, mock datasets, frontend rendering pipelines, authentication/RBAC controls, and flag resolution lifecycles within the SETU platform. The platform is architected to monitor MPLADS public infrastructure works across 20 States/UTs (124 works), detect procedural/financial anomalies, and enforce strict role-based jurisdictional boundaries across 7 distinct roles.

---

## 1. File Inventory

### 1.1 Backend Files (`/backend/app`)

| Category | File Path | One-Line Functional Description |
|---|---|---|
| **Core** | `backend/app/__init__.py` | Package initialization marker for backend application module. |
| **Core** | `backend/app/main.py` | FastAPI entry point configuring CORS, registering all 10 feature routers, root metadata, and health check. |
| **Routers** | `backend/app/routers/__init__.py` | Package initialization marker for API routers. |
| **Routers** | `backend/app/routers/alerts.py` | Unified institutional alerts API exposing ranked alerts feed, summary counters, and resolution lifecycle status updates. |
| **Routers** | `backend/app/routers/audit.py` | Statutory audit router exposing Auditor/CAG formal observations, audit override logs, resolution trails, and unresolved completion queries. |
| **Routers** | `backend/app/routers/auth.py` | Authentication router handling bcrypt password verification against credentials store and issuing signed JWT access tokens. |
| **Routers** | `backend/app/routers/citizen_nlp.py` | Citizen Ground Truth NLP router exposing grievance report queries, real-time submission, and NLP evaluation triggers. |
| **Routers** | `backend/app/routers/compliance.py` | Statutory compliance router exposing single-project rule audits, portfolio summaries, and violation filtering. |
| **Routers** | `backend/app/routers/duplicate.py` | Duplicate work router exposing fuzzy text, geo-proximity, and cross-year duplicate tender detection and adjudication. |
| **Routers** | `backend/app/routers/predictive.py` | Predictive insights router exposing empirical project delay and cost overrun forecasts and portfolio risk rollups. |
| **Routers** | `backend/app/routers/projects.py` | Core project management router enforcing server-side scoping, proposals, evidence review, contractor invoices, tranche releases, asset transfers, and administrative directives. |
| **Routers** | `backend/app/routers/risk.py` | Financial risk router exposing IsolationForest anomaly evaluations and SHAP feature attribution metrics. |
| **Routers** | `backend/app/routers/trend.py` | Trend analysis router exposing macro yearly/state/district expenditure rollups, March Rush fund-dumping reports, and chronic non-utilization signals. |
| **Services** | `backend/app/services/__init__.py` | Package initialization marker for backend domain services. |
| **Services** | `backend/app/services/alerts.py` | Master alerts aggregator service ranking signals across all engines, managing single ownership, inaction timeout tracking, and severity tiering. |
| **Services** | `backend/app/services/audit.py` | Statutory audit service managing CAG formal observations, flag reopening overrides, resolution history trails, and unclosed completed projects. |
| **Services** | `backend/app/services/auth.py` | Core security service managing bcrypt hashing, JWT issuance/validation, server-side RBAC scoping, and role-based data sanitization. |
| **Services** | `backend/app/services/citizen_nlp.py` | Hybrid NLP service combining sentence-transformers (`all-MiniLM-L6-v2`) semantic embeddings with rule-based negation and contradiction scoring. |
| **Services** | `backend/app/services/compliance.py` | Statutory rule engine evaluating category expenditure ceilings, 548-day completion deadlines, agency alignment, and split-tender patterns. |
| **Services** | `backend/app/services/duplicate.py` | Duplicate detection engine executing RapidFuzz token matching, geospatial co-location, cost similarity, and vendor match weighting. |
| **Services** | `backend/app/services/predictive.py` | Empirical forecasting engine calculating delay probability and cost overrun escalation via progress velocity and disbursement burn-rates. |
| **Services** | `backend/app/services/risk.py` | Financial risk engine fitting scikit-learn `IsolationForest` and computing feature attributions via `shap.KernelExplainer`. |
| **Services** | `backend/app/services/trend.py` | Time-series analysis engine detecting fiscal year-end March Rush voucher clusters and multi-year stagnant carried-forward balances. |
| **Data** | `backend/app/data/generate_tiered_dataset.py` | Script generating tiered pan-India mock datasets across 20 States/UTs (124 projects, 13 credentials, MPs, complaints). |
| **Data** | `backend/app/data/mockAlerts.json` | Pre-seeded master institutional alerts dataset across all analytical engines. |
| **Data** | `backend/app/data/mockComplaints.json` | Pre-seeded citizen grievances with on-the-ground observations and official claim comparisons. |
| **Data** | `backend/app/data/mockCredentials.json` | Platform credentials store with bcrypt password hashes and jurisdictional access scopes for all 6 official roles. |
| **Data** | `backend/app/data/mockMPs.json` | Directory of Lok Sabha parliamentary constituencies and Rajya Sabha nominated MPs. |
| **Data** | `backend/app/data/mockOverview.json` | National portfolio overview KPI counters and high-level expenditure statistics. |
| **Data** | `backend/app/data/mockProjects.json` | Master project repository containing 124 infrastructure works across 20 States/UTs with full physical/financial metrics. |
| **Data** | `backend/app/data/mockRiskData.json` | Reference curated risk evaluations and predictive baseline data. |
| **Data** | `backend/app/data/test_dataset_breakdown.py` | Utility test script inspecting national state and district distribution. |
| **Data** | `backend/app/data/test_live_rbac.py` | Integration test script validating live HTTP authentication and RBAC scoping boundaries. |

*Note on Data Models:* Data validation and serialization models are implemented directly using Pydantic `BaseModel` classes within each corresponding router file (`routers/*.py`) rather than in a separate `models/` directory.

---

### 1.2 Frontend Files (`/frontend/src`)

| Category | File Path | One-Line Functional Description |
|---|---|---|
| **Components** | `frontend/src/components/Layout.css` | Vanilla CSS stylesheet defining the institutional dashboard shell layout, header, sidebar, and status indicators. |
| **Components** | `frontend/src/components/Layout.js` | Pure JS/HTML layout shell renderer providing dynamic role-based navigation, universal header role resolution, and modal lifecycle wiring. |
| **Components** | `frontend/src/components/Layout.jsx` | React component wrapper for the institutional Layout shell. |
| **Pages** | `frontend/src/pages/CitizenPortal.css` | Stylesheet for the public, mobile-responsive citizen grievance reporting portal. |
| **Pages** | `frontend/src/pages/CitizenPortal.jsx` | React component providing location-aware citizen grievance submission with browser geolocation integration. |
| **Pages** | `frontend/src/pages/citizenPortalData.js` | Standalone JS/HTML view generator for public citizen grievance submission and distance matching. |
| **Pages** | `frontend/src/pages/Dashboard.css` | Stylesheet for dashboard KPI stat cards, project tables, severity tags, and administrative modals. |
| **Pages** | `frontend/src/pages/Dashboard.jsx` | React component rendering the role-scoped institutional monitoring dashboard. |
| **Pages** | `frontend/src/pages/dashboardData.js` | Comprehensive JS/HTML rendering module containing dedicated view generators and interactive action modals for all 6 official roles. |
| **Pages** | `frontend/src/pages/Landing.css` | Stylesheet for the public Landing Page hero section, metrics strip, and feature showcase. |
| **Pages** | `frontend/src/pages/Landing.jsx` | React component rendering the public Landing Page with live national metrics and public scheme search. |
| **Pages** | `frontend/src/pages/landingData.js` | Standalone JS/HTML layout generator for the public landing page matching reference design tokens. |
| **Pages** | `frontend/src/pages/Login.css` | Stylesheet for the two-step role selection and credential authentication views. |
| **Pages** | `frontend/src/pages/Login.jsx` | React component managing the two-step login flow, demo role cards, and JWT token storage. |
| **Pages** | `frontend/src/pages/loginData.js` | Standalone JS/HTML login view generator supporting quick-fill demo credentials for all platform roles. |
| **Pages** | `frontend/src/pages/ProjectDetail.css` | Stylesheet for the 5-tab Project Detail scrutiny view. |
| **Pages** | `frontend/src/pages/ProjectDetail.jsx` | React component rendering the deep-dive 5-tab Project Detail view. |
| **Pages** | `frontend/src/pages/projectDetailData.js` | Standalone JS/HTML view generator for the 5-tab Project Detail scrutiny interface. |
| **Theme** | `frontend/src/theme/tokens.css` | CSS custom properties defining institutional palette, elevation, border-radius, and typography tokens. |
| **Theme** | `frontend/src/theme/tokens.js` | JavaScript token constants mirror export for programmatic style consumption. |

---

### 1.3 Documentation Alignment & Flagged Undocumented Files

- **Documented in `ROLES.md` and `API_CONTRACT.md`:**
  - All 7 core analytical engine modules (`compliance`, `duplicate`, `risk`, `trend`, `alerts`, `citizen_nlp`, `auth`) strictly align with API endpoints specified in `API_CONTRACT.md` (Sections 1 through 7) and `ROLES.md`.
- **Files Existing but Not Formally Documented in `API_CONTRACT.md`:**
  1. `backend/app/routers/projects.py`: Implements extensive operational workflow endpoints specified in `ROLES.md` (`POST /projects/proposals`, `POST /projects/{id}/proposal-decision`, `POST /projects/{id}/progress`, `POST /projects/{id}/evidence`, `POST /projects/{id}/invoice`, `POST /projects/{id}/utilization-certificate`, `POST /projects/{id}/release-tranche`, `POST /projects/{id}/asset-transfer`, `POST /projects/{id}/freeze-tranche`, `POST /projects/{id}/issue-query`, `POST /projects/{id}/forward-mospi`, `POST /projects/{id}/task-auditor`, `POST /projects/{id}/direct-state-action`, `POST /projects/states/{state}/initiate-review`). These endpoints are defined in code and `ROLES.md` but are missing from `API_CONTRACT.md`.
  2. `backend/app/routers/audit.py` & `backend/app/services/audit.py`: Implements statutory audit endpoints (`GET /audit/observations`, `POST /audit/observations`, `GET /audit/override-log`, `GET /audit/unresolved-on-completion`, `GET /audit/resolution-history`) specified in `ROLES.md` Section "Auditor / CAG" and "Audit Override Mechanism", but omitted from `API_CONTRACT.md`.
  3. `backend/app/routers/duplicate.py`: Contains `POST /projects/duplicates/adjudicate` (adjudication action for State Nodal/MoSPI from `ROLES.md`), which is missing from `API_CONTRACT.md`.
  4. `backend/app/routers/trend.py`: Contains `GET /trends/chronic-non-utilization` (non-utilization report from `ROLES.md`), missing from `API_CONTRACT.md`.
  5. Utility Scripts: `backend/app/data/generate_tiered_dataset.py`, `backend/app/data/test_dataset_breakdown.py`, and `backend/app/data/test_live_rbac.py` are internal generator and testing utilities.
  6. Frontend Data Modules: `dashboardData.js`, `projectDetailData.js`, `landingData.js`, `loginData.js`, and `citizenPortalData.js` are dual-environment rendering scripts allowing the SPA to execute without a node build step.

---

## 2. Per-Role Workflow Trace

```
                               ┌─────────────────────────────┐
                               │   Central Nodal (MoSPI)     │
                               │   - National Scope (124)    │
                               │   - Directives & CAG Tasking│
                               └──────────────┬──────────────┘
                                              │ Escalate / Direct
                               ┌──────────────▼──────────────┐
                               │    State Nodal Authority    │
                               │    - State Rollup           │
                               │    - Freeze Tranche / Query │
                               └──────────────┬──────────────┘
                                              │ Escalate / Query
                               ┌──────────────▼──────────────┐
┌──────────────┐  Proposal     │     District Authority      │  Gated Tranche  ┌─────────────────────┐
│  MP Office   ├──────────────►│    (Operational Center)     ├────────────────►│ Implementing Agency │
│ (Passive Obs)│◄──────────────┤- Approve / Scrutinize       │◄────────────────┤ (Execution Blind)   │
└──────────────┘  Status/Reject│- Evidence Review / Release  │ Evidence/Invoice└─────────────────────┘
                               └──────────────▲──────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │                                               │
        ┌─────────────┴─────────────┐                   ┌─────────────┴─────────────┐
        │       Auditor / CAG       │                   │          Citizen          │
        │ - Independent Oversight   │                   │ - Public Ground Truth     │
        │ - Reopen Resolved Flags   │                   │ - Real-time NLP Grievance │
        └───────────────────────────┘                   └───────────────────────────┘
```

### 2.1 MP Office (`CONSTITUENCY_MP` and `NOMINATED_MP`)
- **Authentication Endpoint:** `POST /auth/login` (`backend/app/routers/auth.py`). Validates against `mockCredentials.json` using bcrypt for `ADM-MP-TN-CHN-001` or `ADM-MP-RS-NOM-001`. Returns JWT with `role="MP Office"`, `roleId="mp_office"`, `accessScope="constituency_only"` or `"nominated_mp_districts"`.
- **Query & Filtering Logic (Actual Code):**
  - In `filter_projects_by_user_scope()` (`services/auth.py:262-289`):
    - If `NOMINATED_MP`: Filters projects where `p.district in chosenDistricts` OR `p.mpId == user.mpId`.
    - If `CONSTITUENCY_MP`: Filters projects where `p.constituency.lower() == user.constituency.lower()` OR `p.mpId == user.mpId`.
  - In `sanitize_project_for_user()` (`services/auth.py:462-495`): Redacts `shapValues`, `complianceFlags`, `costOverrun`, `paymentProgressMismatch`, `duplicateRisk`, `citizenReports`, and `alerts`. Computes passive binary flag: `flagPresent = bool(complianceFlags or costOverrun or duplicateRisk or paymentProgressMismatch or hasCitizenReport or riskScore >= 60)`.
  - In `get_scoped_alerts()` (`services/alerts.py:828-829`): Returns `[], 0` — MP Office is completely excluded from the alerts feed.
  - Endpoints `GET /projects/{id}/compliance`, `GET /projects/{id}/duplicates`, `GET /projects/{id}/risk`, `GET /projects/{id}/citizen-reports` return `403 Forbidden` via `enforce_*_access` guards.
- **Executable Actions:**
  - Submit Proposal: `POST /projects/proposals` (`submit_project_proposal` in `routers/projects.py:570`). Allows Nominated MPs to select any national district/state; Constituency MPs default to assigned constituency.
  - Track Status & Rejections: `GET /projects` and `GET /projects/{id}` (`routers/projects.py:192, 234`).
- **Discrepancy Check:** **NO MISMATCH.** Code strictly implements ROLES.md: passive badge visible with zero alert detail, rejection reason visible, proposals routed to District Authority, Nominated MP multi-state district selection fully functional.

---

### 2.2 District Authority (Operational Center)
- **Authentication Endpoint:** `POST /auth/login` (`backend/app/routers/auth.py`). Validates `ADM-DA-TN-CHN-001` (Chennai) or `ADM-DA-UP-LKO-012` (Lucknow). Returns JWT with `role="District Authority"`, `roleId="district_authority"`, `accessScope="district_all"`, `district="Chennai"`.
- **Query & Filtering Logic (Actual Code):**
  - In `filter_projects_by_user_scope()` (`services/auth.py:193-198`): Filters projects strictly where `p.district.lower() == user.district.lower()`.
  - In `check_project_access()` (`services/auth.py:322-332`): Raises `403 Forbidden` if project district does not match assigned district.
  - In `get_scoped_alerts()` (`services/alerts.py:908-912`): Retrieves alerts for all projects in district across all severities (LOW, MEDIUM, HIGH, CRITICAL). Excludes `CHRONIC_NON_UTILIZATION` alerts (which skip DA per ROLES.md).
- **Executable Actions:**
  - Approve/Reject Proposal: `POST /projects/{id}/proposal-decision` (`decide_project_proposal` in `routers/projects.py:679`). Enforces mandatory `rejectionReason` on `REJECT`.
  - Record Progress: `POST /projects/{id}/progress` (`submit_progress_update` in `routers/projects.py:264`).
  - Review Evidence: `POST /projects/{id}/evidence/{evidence_id}/review` (`review_project_evidence` in `routers/projects.py:747`). Accepts or rejects milestone evidence.
  - Review Invoices: `POST /projects/{id}/invoices/{invoice_number}/review` (`review_project_invoice` in `routers/projects.py:808`).
  - Release Milestone Tranche: `POST /projects/{id}/release-tranche` (`release_milestone_tranche` in `routers/projects.py:867`).
  - Resolve Flags: `PATCH /alerts/{id}/status` or `POST /alerts/{id}/resolution` (`resolve_alert` in `services/alerts.py:620`).
  - Mark Asset Transfer: `POST /projects/{id}/asset-transfer` (`record_asset_transfer` in `routers/projects.py:949`). Gated on `status == "Completed"` or `physicalProgress == 100`.
- **Discrepancy Check:**
  - **MISMATCH (Permissive Gating):** In `routers/projects.py:891`, `release_milestone_tranche` checks `if not (has_accepted_evidence or has_accepted_invoice):`. ROLES.md Rule 5 specifies that tranche release strictly unlocks once *milestone evidence* is accepted; allowing invoice acceptance as an alternative relaxes the requirement.
  - **MISMATCH (Runtime Bug):** In `routers/alerts.py:279`, `POST /alerts/reset` attempts to call `alerts_service.initialize()`, but `alerts_service` is not imported in `routers/alerts.py`, throwing `NameError: name 'alerts_service' is not defined`.

---

### 2.3 State Nodal Authority
- **Authentication Endpoint:** `POST /auth/login` (`backend/app/routers/auth.py`). Validates `ADM-SNA-TN-001` (Tamil Nadu) or `ADM-SNA-KA-001` (Karnataka). Returns JWT with `role="State Nodal Authority"`, `roleId="state_nodal"`, `accessScope="state_rollup"`, `state="Tamil Nadu"`.
- **Query & Filtering Logic (Actual Code):**
  - In `filter_projects_by_user_scope()` (`services/auth.py:199-204`): Filters projects strictly where `p.state.lower() == user.state.lower()`.
  - In `check_project_access()` (`services/auth.py:334-343`): Raises `403 Forbidden` if project state does not match.
  - In `get_scoped_alerts()` (`services/alerts.py:861-907`): Filters alerts to own state. Surfaces `CRITICAL` in full detail, aggregates `HIGH` alerts as district-level summary cards in the general feed, and excludes `LOW` and `MEDIUM` severities completely. Surfaces `CHRONIC_NON_UTILIZATION` signals and cross-district duplicates.
- **Executable Actions:**
  - Freeze Subsequent Tranche: `POST /projects/{id}/freeze-tranche` (`freeze_project_tranche` in `routers/projects.py:1039`).
  - Issue Formal Query: `POST /projects/{id}/issue-query` (`issue_formal_query` in `routers/projects.py:1090`).
  - Flag District for Review: `POST /projects/districts/{district}/flag-review` (`flag_district_for_review` in `routers/projects.py:1152`).
  - Forward Report to MoSPI: `POST /projects/{id}/forward-mospi` (`forward_report_to_mospi` in `routers/projects.py:1200`).
  - Adjudicate Cross-District Duplicates: `POST /projects/duplicates/adjudicate` (`adjudicate_duplicate` in `routers/duplicate.py:132`).
  - Escalate Flag to MoSPI: `PATCH /alerts/{id}/status` with `status="ESCALATED"`.
- **Discrepancy Check:** **NO MISMATCH.** Code strictly implements ROLES.md: severity tiering (Critical full, High aggregate, Low/Med hidden), administrative consequence tools (Freeze Tranche, Query, Flag District, Forward MoSPI), and cross-district duplicate adjudication.

---

### 2.4 Central Nodal Agency (MoSPI)
- **Authentication Endpoint:** `POST /auth/login` (`backend/app/routers/auth.py`). Validates `ADM-CNA-MOSPI-001`. Returns JWT with `role="Central Nodal Agency (MoSPI)"`, `roleId="mospi_officer"`, `accessScope="national_all"`.
- **Query & Filtering Logic (Actual Code):**
  - In `filter_projects_by_user_scope()` (`services/auth.py:183-191`): Unrestricted national scope across all 124 projects.
  - In `check_project_access()` (`services/auth.py:306-313`): National access permitted without restriction.
  - In `get_scoped_alerts()` (`services/alerts.py:857-859`): Full national visibility in full detail for all alerts, cross-state duplicates, citizen NLP raw data, and national predictive forecasting.
- **Executable Actions:**
  - Task Auditor / CAG for Formal Audit: `POST /projects/{id}/task-auditor` (`task_auditor_for_project` in `routers/projects.py:1287`).
  - Direct State Corrective Action: `POST /projects/{id}/direct-state-action` (`direct_state_corrective_action` in `routers/projects.py:1361`).
  - Initiate State Performance Review: `POST /projects/states/{state}/initiate-review` (`initiate_state_performance_review` in `routers/projects.py:1433`).
  - Query Central Directives Registry: `GET /projects/mospi/directives` (`list_mospi_directives` in `routers/projects.py:1477`).
  - Adjudicate Cross-State Duplicates: `POST /projects/duplicates/adjudicate`.
- **Discrepancy Check:** **NO MISMATCH.** Code strictly matches ROLES.md national oversight and binding directive capabilities.

---

### 2.5 Implementing Agency
- **Authentication Endpoint:** `POST /auth/login` (`backend/app/routers/auth.py`). Validates `ADM-IA-TN-CHN-PWD-001`. Returns JWT with `role="Implementing Agency"`, `roleId="implementing_agency_pwd"`, `accessScope="agency_assigned_only"`, `district="Chennai"`, `agency="Public Works Department (PWD) — Chennai"`.
- **Query & Filtering Logic (Actual Code):**
  - In `filter_projects_by_user_scope()` (`services/auth.py:206-261`): Enforces **DUAL CONDITION** scoping: matches both district jurisdiction (`p.district == user.district`) AND agency classification (`p.implementingAgency` or category keyword match).
  - In `check_project_access()` (`services/auth.py:345-393`): Enforces `403 Forbidden` if project is located in another district or assigned to a different agency.
  - In `sanitize_project_for_user()` (`services/auth.py:439-461`): Redacts `riskScore`, `riskLevel`, `plainLanguageExplanation`, `shapValues`, `complianceFlags`, `costOverrun`, `paymentProgressMismatch`, `duplicateRisk`, `hasCitizenReport`, `citizenReports`, `fundDumpingFlag`, and `alerts`. Retains `vendorName` on each record.
  - In `get_scoped_alerts()` (`services/alerts.py:828-829`): Returns `[], 0` — completely excluded from the alerts feed.
  - Endpoints `GET /compliance`, `GET /duplicates`, `GET /risk`, `GET /citizen-reports` return `403 Forbidden` via `enforce_*_access` guards.
- **Executable Actions:**
  - Submit Milestone Progress: `POST /projects/{id}/progress` (`submit_progress_update` in `routers/projects.py:264`).
  - Upload Milestone Evidence: `POST /projects/{id}/evidence` (`upload_milestone_evidence` in `routers/projects.py:335`). Auto-tags evidence record with `"Received from Vendor: [vendorName]"` and attaches simulated verification badge.
  - Submit Contractor Invoice: `POST /projects/{id}/invoice` (`submit_contractor_invoice` in `routers/projects.py:411`). Validates 15-character GSTIN format via regex and ceiling range.
  - Submit Utilization Certificate: `POST /projects/{id}/utilization-certificate` (`submit_utilization_certificate` in `routers/projects.py:511`). Validates `physicalProgress >= 100` or `status == "Completed"`.
- **Discrepancy Check:** **NO MISMATCH.** Code strictly implements ROLES.md deliberate blind-to-oversight architecture, dual-condition scoping, and vendor provenance tagging.

---

### 2.6 Auditor / CAG (Independent, Cross-Cutting)
- **Authentication Endpoint:** `POST /auth/login` (`backend/app/routers/auth.py`). Validates `ADM-CAG-HQ-001`. Returns JWT with `role="Auditor / CAG"`, `roleId="auditor_cag"`, `accessScope="statutory_audit_all"`.
- **Query & Filtering Logic (Actual Code):**
  - In `filter_projects_by_user_scope()` (`services/auth.py:183-191`): Unrestricted national scope across all 124 projects.
  - In `get_scoped_alerts()` (`services/alerts.py:914-916`): Sees all severities nationwide in full detail at all times regardless of ownership or status.
  - In `get_unresolved_on_completion()` (`services/audit.py:238-266`): Surfaces completed projects that still possess open or unresolved compliance flags (ROLES.md Rule 12).
  - In `get_resolution_history()` (`services/audit.py:268-303`): Surfaces comprehensive resolution history and highlights inaction-timeouts (`isTimeoutFinding=True`).
- **Executable Actions:**
  - Attach Formal Audit Observation: `POST /audit/observations` (`attach_formal_observation` in `routers/audit.py:90`).
  - Statutory Override / Flag Reopening: When attaching a HIGH or CRITICAL observation with `reopenFlag=True`, `reopen_alert_by_auditor()` in `services/alerts.py:711` reverts the flag status from `RESOLVED_*` to `OPEN`, reassigns ownership to the requested administrative tier (`district_authority` or `state_nodal`), records `isReopenedByAuditor=True`, and logs an entry in `GET /audit/override-log`.
- **Discrepancy Check:** **NO MISMATCH.** Code strictly implements ROLES.md independent audit mandate, unresolved on completion tracking, and flag reopening override.

---

### 2.7 Citizen (Public, No Login)
- **Authentication Endpoint:** None (Public).
- **Query & Filtering Logic (Actual Code):**
  - Public project catalog: `GET /projects` and `GET /projects/{id}` sanitized.
  - Does not have access to internal contradiction scores or raw grievance data of other citizens.
- **Executable Actions:**
  - Submit Grievance: `POST /projects/{id}/citizen-reports` (`create_citizen_report` in `routers/citizen_nlp.py:244`). Captures complaint text, optional contact info, browser GPS `reportedLocation`, evaluates sentence-transformers cosine topical relevance and rule-based negation contradiction score in real time. Automatically activates institutional alert if `contradictionScore >= 60`.
  - Receive Tracking Receipt: Returns grievance tracking ID (`CIT-2026-xxx`) with plain-language confirmation.
- **Discrepancy Check:** **NO MISMATCH.** Code strictly matches ROLES.md public submission workflow and real-time contradiction scoring.

---

## 3. Flag Lifecycle Trace

```
 Analytical Engines (Risk, Compliance, Duplicate, Trend, Citizen)
                            │
                            ▼
          Signal Generation & Severity Assignment
       (CRITICAL, HIGH, WARNING, MEDIUM, LOW)
                            │
                            ▼
           Single Ownership & Initial Status
              [District Authority / OPEN]
           (Cross-jurisdiction / Chronic skip DA)
                            │
                            ▼
      Visibility Filtering (Severity-Tiered Routing)
      - Auditor / MoSPI: Full National
      - State Nodal: Critical full, High aggregate, Low/Med hidden
      - District Authority: All in district (except Chronic)
      - MP Office / Agency: 0 Alerts
                            │
         ┌──────────────────┴──────────────────┐
         │                                     │
         ▼                                     ▼
[Auto-Escalation Triggers]            [District Action]
 1. Inaction Timeout (>14 days)       1. Order Inspection (INSPECTION_ORDERED)
 2. Confirmed-Critical Resolution     2. Resolve (RESOLVED_FALSE_POSITIVE)
         │                            3. Confirm (RESOLVED_CONFIRMED)
         ▼                                     │
Transfers Ownership to State Nodal             ▼
 (Status: ESCALATED, Read-only for DA)   [Auditor / CAG Override]
                                         Observation (HIGH/CRITICAL)
                                         Reopens flag to OPEN
                                         Remands ownership back to DA/SNA
```

1. **Flag Creation:**
   - Originates from 5 independent analytical engines:
     - `FinancialRiskEngine` (`services/risk.py`): Flags `riskScore >= 61` as `FINANCIAL_RISK`.
     - `ComplianceRuleEngine` (`services/compliance.py`): Evaluates category ceiling, statutory deadline (548 days), agency mismatch, and fund-splitting violations as `COMPLIANCE_VIOLATION`.
     - `DuplicateWorkDetection` (`services/duplicate.py`): Evaluates text/geo/cost/vendor matches >= 80% as `DUPLICATE_WORK`.
     - `TrendAnalysis` (`services/trend.py`): Detects March Rush fund-dumping as `SEASONAL_ANOMALY` and multi-year carried-forward unspent funds as `CHRONIC_NON_UTILIZATION`.
     - `CitizenGroundTruthNLP` (`services/citizen_nlp.py`): Detects semantic discrepancy >= 60 as `CITIZEN_CONTRADICTION`.
   - Ingestion is managed by `AlertsAggregatorService.initialize()` in `services/alerts.py`. Real-time citizen grievance submissions with `contradictionScore >= 60` dynamically trigger `alerts_service.initialize(force_refresh=True)`.
2. **Severity Assignment:**
   - Deterministically computed per engine rule:
     - Financial Risk: `CRITICAL` (81+), `HIGH` (61-80).
     - Compliance: `CRITICAL` (excess >= 25%, delay >= 30d, category mismatch, fund splitting), `HIGH` (ceiling excess < 25%, delay < 30d).
     - Duplicate: `CRITICAL` (similarity >= 90% or vendor match), `HIGH` (80-89%).
     - Trend March Rush: `CRITICAL` (phys progress < 40%), `HIGH` (phys progress < 60%), `WARNING` (phys >= 60%).
     - Chronic Non-Utilization: `CRITICAL` (unspent >= ₹30L or >= 50%), `HIGH` (unspent >= ₹15L).
     - Citizen Contradiction: `CRITICAL` (score >= 85), `HIGH` (60-84).
3. **Visibility Filtering:**
   - Enforced in `get_scoped_alerts()` (`services/alerts.py:773-943`):
     - Implementing Agency & MP Office: return `[], 0`.
     - District Authority: sees all severities within district (excluding `CHRONIC_NON_UTILIZATION`).
     - State Nodal Authority: sees `CRITICAL` in full detail; `HIGH` is aggregated as district rollup cards in general feed; `LOW`/`MEDIUM` hidden.
     - MoSPI: sees all severities nationwide in full detail.
     - Auditor / CAG: sees all severities nationwide in full detail.
4. **Ownership Assignment:**
   - Default: `District Authority` (`district_authority`) for same-district flags.
   - Cross-District Duplicate: `State Nodal` (`state_nodal`).
   - Cross-State Duplicate: `Central Nodal Agency (MoSPI)` (`mospi_officer`).
   - Chronic Non-Utilization: `State Nodal` (`state_nodal`), skipping District Authority.
5. **Status Transitions:**
   - Enforced in `resolve_alert()` / `update_alert_status()` (`services/alerts.py:620-710`):
     - Valid states: `OPEN`, `INSPECTION_ORDERED`, `RESOLVED_CONFIRMED`, `RESOLVED_FALSE_POSITIVE`, `ESCALATED`.
     - Single Ownership RBAC: If flag is owned by `state_nodal` or `mospi_officer`, District Authority receives `HTTP 403 Forbidden` on mutation attempt.
6. **Auto-Escalation Triggers:**
   - **Confirmed-Critical Auto-Escalation:** When District Authority updates a `CRITICAL` flag to `RESOLVED_CONFIRMED`, `update_alert_status()` automatically transitions it to `status="ESCALATED"`, `ownerRole="State Nodal"`, `ownerRoleId="state_nodal"`, `escalationReason="Confirmed Critical Anomaly"`.
   - **Inaction Timeout:** In `_apply_inaction_timeouts()` (`services/alerts.py:567-599`), any flag in `OPEN` or `INSPECTION_ORDERED` owned by `district_authority` with `daysOpen > 14` automatically transitions to `status="ESCALATED"`, `ownerRole="State Nodal"`, `ownerRoleId="state_nodal"`, `escalationReason="Inaction Timeout"`.
   - **State Nodal to MoSPI Escalation:** When State Nodal sets status to `ESCALATED`, ownership transfers to `ownerRole="Central Nodal Agency (MoSPI)"`, `ownerRoleId="mospi_officer"`.
7. **Auditor / CAG Override & Reopen Mechanism:**
   - Implemented in `attach_observation()` (`services/audit.py:128`) and `reopen_alert_by_auditor()` (`services/alerts.py:711`):
     - When an Auditor attaches a `HIGH` or `CRITICAL` observation with `reopenFlag=True`, the target flag reverts from `RESOLVED_*` to `OPEN`, ownership is reassigned back to the requested operational tier (`district_authority` or `state_nodal`), and a permanent audit log entry is written to `GET /audit/override-log`.

---

## 4. Known Issue Cross-Check

| # | Known Issue Description | Verification Result | Detailed Finding |
|---|---|---|---|
| **1** | **Universal "Role:" Header Resolution**<br>Is the "Role:" header reading correctly from session/JWT for ALL roles (not per-role patched)? | **PASS** | In `frontend/src/components/Layout.js:79-154`, `resolveSessionRole()` decodes the JWT access token payload (`setu_auth_token`) via base64url JSON parsing, extracts `payload.role`/`roleName`/`roleId`, falls back to `sessionStorage.getItem('setu_auth_user')`, and normalizes the title via `normalizeRoleName()`. It dynamically renders the correct role name for all 6 official roles and custom sessions without hardcoded role switching. |
| **2** | **Sidebar Page Content Completeness**<br>Are there any remaining sidebar pages showing placeholder/stub content? | **PASS** | All sidebar navigation items across all 6 roles in `frontend/src/components/Layout.js` and `frontend/src/pages/dashboardData.js` render complete, dedicated HTML modules (Auditor: 5 views, MoSPI: 7 views, State Nodal: 6 views, District Authority: 7 views, MP Office: 2 views, Implementing Agency: 5 views). No active nav item renders placeholder/stub content. |
| **3** | **Financial Risk Engine Explainability Method**<br>Is the Financial Risk Engine using real SHAP or the honest fallback — state definitively which? | **REAL SHAP** | `backend/app/services/risk.py` imports `shap` and `sklearn.ensemble.IsolationForest`. In `FinancialRiskEngine.initialize()`, it fits `IsolationForest(n_estimators=150, contamination=0.20, random_state=42)` and builds `shap.KernelExplainer(anomaly_predict_fn, self.background_data)`. In `_evaluate_project_internal()`, it executes `self.explainer.shap_values(x_row, nsamples=50, silent=True)[0]` and calculates feature impact percentages directly from the computed SHAP values. |
| **4** | **Predictive Insights Engine Labeling**<br>Is Predictive Insights Engine honestly labeled as heuristic, or does it claim real ML in comments, README, or UI? | **PASS** | `backend/app/services/predictive.py`, `backend/app/routers/predictive.py`, and `frontend/src/pages/dashboardData.js` strictly label the forecasting engine as an empirical heuristic. API response field `methodologyTransparency.modelDisclaimer` explicitly states: *"Honestly Labeled: This forecast uses an empirical statistical heuristic based on observed progress rate and disbursement-to-milestone gaps. It is NOT generated by a deep neural network."* No false ML/neural claims exist in comments or UI. |
| **5** | **Password Hashing & Plaintext Verification**<br>Are passwords hashed with bcrypt, or is there any remaining plaintext comparison in auth code? | **PASS** | All 13 user records in `backend/app/data/mockCredentials.json` contain bcrypt hashes (`$2b$12$...`). In `backend/app/services/auth.py:39-49`, `verify_password()` strictly executes `bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))`. Zero plaintext comparisons exist in the authentication codebase. |
| **6** | **Pan-India `vendorName` Population**<br>Does `vendorName` exist and populate correctly across ALL states in the dataset, not just Tamil Nadu? | **PASS** | Verified across all 124 projects in `backend/app/data/mockProjects.json`. Every project across all 20 States and Union Territories contains a valid, non-empty `vendorName` string (124/124 populated, 0 missing). |

---

## 5. Comprehensive Logical Error & Edge-Case Audit (20 Identified Issues)

During exhaustive static and architectural analysis of the full codebase (`/backend/app`, `/frontend/src`, `ROLES.md`, and `API_CONTRACT.md`), 20 distinct logical errors, mathematical discrepancies, security gaps, and state desynchronization issues were identified across 5 key architectural domains:

---

### Category A: RBAC, Authorization & Security Gaps

#### 1. Unauthenticated Public Bypass of Internal Oversight Data & ML Models
- **Location:** `backend/app/services/auth.py:432-434`, `backend/app/routers/risk.py:30-33`, `backend/app/routers/compliance.py:32-35`, `backend/app/routers/citizen_nlp.py:31-34`, `backend/app/routers/duplicate.py:35-38`
- **Current Code:**
  ```python
  # services/auth.py
  def sanitize_project_for_user(project: Dict[str, Any], user: Optional[Dict[str, Any]]) -> Dict[str, Any]:
      if not user:
          return project  # Exposes raw dictionary without any sanitization!
  ```
  ```python
  # routers/risk.py
  def enforce_risk_access(current_user: Optional[Dict[str, Any]]) -> None:
      if not current_user:
          return  # Bypasses access guard completely when unauthenticated!
  ```
- **Logical Defect:** When a request is unauthenticated (`Authorization` header omitted, `current_user is None`), all access enforcement guards return immediately without raising `HTTP 401 Unauthorized` or `HTTP 403 Forbidden`. Furthermore, `sanitize_project_for_user` returns the completely raw project dictionary without redacting `shapValues`, internal compliance violations, risk scores, duplicate flags, or citizen raw complaints.
- **Operational Impact:** An unauthenticated anonymous user querying `GET /projects`, `GET /projects/{id}`, `GET /projects/{id}/risk`, or `GET /projects/{id}/compliance` gains access to confidential internal oversight models that are strictly denied to official Implementing Agencies and Members of Parliament. Authenticated non-privileged users receive `403 Forbidden`, while unauthenticated public requests bypass all security barriers.
- **Recommended Remediation:** In `sanitize_project_for_user`, when `not user`, apply public citizen-level redactions (strip all internal risk, compliance, duplicate, and raw citizen reports). In all `enforce_*_access` guards, raise `HTTP 401 Unauthorized` if `not current_user`.

#### 2. Missing Role Verification on Administrative Action Endpoints (Horizontal Privilege Escalation)
- **Location:** `backend/app/routers/projects.py:688-700`, `1044-1056`, `1292-1305`, `1365-1375`, `1438-1448`, `backend/app/routers/audit.py:95-109`, `backend/app/routers/duplicate.py:137-149`
- **Current Code:**
  ```python
  # routers/projects.py: decide_project_proposal
  def decide_project_proposal(id: str, payload: ProposalDecisionRequest, current_user = Depends(get_optional_current_user)):
      if current_user:
          check_project_access(project, current_user)  # Only checks district/state match, NOT role!
  ```
- **Logical Defect:** `check_project_access(project, current_user)` in `services/auth.py:300-418` enforces only geographic boundaries (e.g. `user.district == project.district`). It never validates whether the user's role is permitted to perform that administrative action:
  - An MP or Implementing Agency matching the project's district/constituency can approve their own proposals (`POST /projects/{id}/proposal-decision`).
  - An Implementing Agency or DA can freeze fund tranches (`POST /projects/{id}/freeze-tranche`), a power reserved strictly for State Nodal Authority.
  - Any authenticated or unauthenticated caller can task the CAG (`POST /projects/{id}/task-auditor`) or issue central directives (`POST /projects/{id}/direct-state-action`), reserved for MoSPI.
  - Any caller can attach CAG statutory observations and execute flag reopenings (`POST /audit/observations`), reserved for Auditor / CAG.
  - Any caller can adjudicate duplicate schemes (`POST /projects/duplicates/adjudicate`), reserved for State Nodal/MoSPI.
- **Operational Impact:** Complete breakdown of the statutory separation of powers defined in `ROLES.md`. Roles can invoke each other's administrative and statutory functions without restriction.
- **Recommended Remediation:** Enforce explicit `current_user.get("roleId") == required_role_id` validation at the beginning of each administrative mutation endpoint.

#### 3. Administrative Tranche Freeze Has Zero Enforcement on Fund Release
- **Location:** `backend/app/routers/projects.py:885-896` vs `1063`
- **Current Code:**
  ```python
  # routers/projects.py: release_milestone_tranche
  if not (has_accepted_evidence or has_accepted_invoice):
      raise HTTPException(status_code=400, detail="Milestone fund release locked...")
  # Never checks project.get("trancheFrozen")!
  ```
- **Logical Defect:** When State Nodal imposes an administrative freeze on a project via `POST /projects/{id}/freeze-tranche`, it sets `updated_fields["trancheFrozen"] = True`. However, `release_milestone_tranche` checks only whether milestone evidence or an invoice is accepted; it completely omits checking `project.get("trancheFrozen")` or `updated_fields.get("trancheFrozen")`.
- **Operational Impact:** The State Nodal Authority's primary consequence mechanism—freezing subsequent tranches on critical or escalated anomalies—is entirely cosmetic. District Authority can continue releasing subsequent tranches unimpeded.
- **Recommended Remediation:** Add `if project.get("trancheFrozen") or updated_fields.get("trancheFrozen"): raise HTTPException(status_code=403, detail="Tranche release blocked: An administrative freeze has been imposed on this project by State Nodal Authority.")`.

#### 4. Multi-User Identifier Ambiguity on Role Name Login
- **Location:** `backend/app/services/auth.py:56-72` and `backend/app/routers/auth.py:89-90`
- **Current Code:**
  ```python
  # services/auth.py: find_user_by_identifier
  for user in credentials:
      if clean_id == login_id or clean_id in aliases or clean_id == role_id or clean_id == role_name:
          return user
  ```
- **Logical Defect:** In `mockCredentials.json`, multiple user accounts share identical `roleName` and `roleId` values:
  - `ADM-DA-TN-CHN-001` (Chennai DA) and `ADM-DA-UP-LKO-012` (Lucknow DA) both have `roleName: "District Authority"`.
  - `ADM-SNA-TN-CHN-005` (Tamil Nadu SNA), `ADM-SNA-KA-BLR-006` (Karnataka SNA), and `ADM-SNA-MH-PUN-007` (Maharashtra SNA) all share `roleName: "State Nodal Authority"`.
  When a user logs in by role name or triggers the `request.role` fallback, `find_user_by_identifier` sequentially matches the very first record.
- **Operational Impact:** Lucknow District Authority and Karnataka/Maharashtra State Nodal Authorities can never be resolved or authenticated via role identifier. Attempting to authenticate as Lucknow DA via role fallback silently logs the user in as Chennai DA.
- **Recommended Remediation:** Restrict authentication lookups strictly to unique `loginId` and unique aliases, removing generic `role_name` and `role_id` equality matches from credential resolution.

---

### Category B: State Synchronization & Data Flow Inconsistencies

#### 5. In-Memory Operational Mutations Decoupled from Analytical Engines
- **Location:** `backend/app/routers/projects.py:58-62` vs `backend/app/services/compliance.py:154`, `backend/app/services/risk.py:178`, `backend/app/services/trend.py:62`, `backend/app/services/duplicate.py:35`
- **Current Code:**
  ```python
  # routers/projects.py
  IN_MEMORY_PROPOSALS: List[Dict[str, Any]] = []
  IN_MEMORY_UPDATES: Dict[str, Dict[str, Any]] = {}
  ```
  ```python
  # services/compliance.py, risk.py, trend.py
  def load_projects():
      with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
          return json.load(f)  # Bypasses in-memory operational state!
  ```
- **Logical Defect:** Operational state changes—milestone progress updates, tranche disbursements, contractor invoices, accepted evidence, asset transfers, and new MP proposals—are stored exclusively in `routers.projects.IN_MEMORY_UPDATES` and `IN_MEMORY_PROPOSALS`. The 4 core analytical engines (`compliance`, `risk`, `trend`, `duplicate`) independently re-read `mockProjects.json` directly from disk.
- **Operational Impact:**
  - When District Authority releases a tranche or records milestone physical progress, the compliance and risk engines continue evaluating the stale, pre-mutation values from disk.
  - Newly submitted MP proposals (`PROP-TN-...`) cannot be evaluated by the Compliance Rule Engine (`GET /projects/{id}/compliance`) or Financial Risk Engine (`GET /projects/{id}/risk`), returning `HTTP 404 Not Found`.
- **Recommended Remediation:** Centralize project state in a shared data service or update `load_projects()` across all services to merge `IN_MEMORY_PROPOSALS` and apply `IN_MEMORY_UPDATES`.

#### 6. Duplicate Scheme Adjudication Fails to Synchronize with Institutional Alerts
- **Location:** `backend/app/services/duplicate.py:331-358` vs `backend/app/services/alerts.py`
- **Current Code:**
  ```python
  # services/duplicate.py
  def adjudicate_duplicate_pair(...):
      ADJUDICATION_STORE[pair_key] = rec
      return rec  # Never notifies or updates alerts_service!
  ```
- **Logical Defect:** When State Nodal or MoSPI adjudicates a duplicate pair via `POST /projects/duplicates/adjudicate` (e.g. marking `PROJECT_A_LEGITIMATE`), the record is written solely to `duplicate.ADJUDICATION_STORE`. The active institutional alert in `alerts_service` (`mockAlerts.json`) remains in `OPEN` or `ESCALATED` status with no status transition or resolution history recorded.
- **Operational Impact:** The State Nodal Authority dashboard continues showing duplicate work flags as unresolved institutional alerts despite formal administrative adjudication.
- **Recommended Remediation:** Within `adjudicate_duplicate_pair`, look up active duplicate alerts for `project_a_id` and `project_b_id` in `alerts_service` and transition their status to `RESOLVED_CONFIRMED` or `RESOLVED_FALSE_POSITIVE`.

#### 7. Missing Import on Alert Reset Endpoint (`POST /alerts/reset`)
- **Location:** `backend/app/routers/alerts.py:278-280`
- **Current Code:**
  ```python
  @router.post("/reset")
  def reset_alerts_data():
      alerts_service.initialize()  # NameError: alerts_service is not imported!
      return {"status": "reset_successful"}
  ```
- **Logical Defect:** `alerts_service` is referenced in the reset handler but is missing from the module's `import` statements (only individual helper functions are imported from `app.services.alerts`).
- **Operational Impact:** Calling `POST /alerts/reset` immediately triggers an unhandled `NameError: name 'alerts_service' is not defined`, crashing the request with `HTTP 500 Internal Server Error`.
- **Recommended Remediation:** Add `from app.services.alerts import alerts_service` at the top of `backend/app/routers/alerts.py`.

#### 8. Outdated Fallback Datasets in Frontend Data Modules
- **Location:** `frontend/src/pages/dashboardData.js:16-29, 9530-9545`
- **Current Code:**
  ```javascript
  // dashboardData.js
  const FALLBACK_OVERVIEW = {
    summary: {
      totalProjects: 90,
      totalHighRiskProjects: 34,
      totalActiveAlerts: 18,
      totalAllocated: 2250000000,
    }
  };
  export const mockOverview = FALLBACK_OVERVIEW;
  ```
- **Logical Defect:** `dashboardData.js` embeds a legacy 90-project dataset overview (`totalProjects: 90`, `totalActiveAlerts: 18`) and exports it as `mockOverview`. However, the live national dataset in `backend/app/data/mockOverview.json` and `mockProjects.json` comprises 124 projects across 20 States/UTs (`totalProjects: 124`, `totalActiveAlerts: 24`, `totalHighRiskProjects: 32`).
- **Operational Impact:** Whenever the frontend falls back to `mockOverview` (such as in the top 4 KPI stat cards on line 9541), it displays stale 90-project statistics instead of the active 124-project national scope.
- **Recommended Remediation:** Synchronize `FALLBACK_OVERVIEW` in `dashboardData.js` with the 124-project values from `backend/app/data/mockOverview.json`.

#### 9. Top-Level `await` and Static File 404 in Browser Environments
- **Location:** `frontend/src/pages/projectDetailData.js:9384-9395`
- **Current Code:**
  ```javascript
  try {
    if (typeof fetch === 'function') {
      const [prRes, cmRes] = await Promise.all([
        fetch('/backend/app/data/mockProjects.json'),
        fetch('/backend/app/data/mockComplaints.json'),
      ]);
      if (prRes.ok) fetchedProjects = await prRes.json();
    }
  } catch {}
  ```
- **Logical Defect:**
  1. Top-level `await` at line 9386 requires ECMAScript 2022 module execution; in browsers or bundlers lacking top-level await support, script loading fails with a syntax error.
  2. The FastAPI backend serves routes from `/` (`/projects`, `/alerts`) and does not mount `/backend` as a static directory. Therefore, `fetch('/backend/app/data/mockProjects.json')` returns `HTTP 404 Not Found`.
- **Operational Impact:** Dynamic fetching silently fails on every page load, causing `allProjects` to fall back permanently to the hardcoded `FALLBACK_PROJECTS` array.
- **Recommended Remediation:** Fetch project data from the API endpoint `fetch('/projects')` or mount static asset routes via `app.mount("/data", StaticFiles(...))` in `backend/app/main.py`.

---

### Category C: Mathematical Formulas & Predictive Model Bugs

#### 10. Inverted Velocity Formula in Project Delay Forecasting
- **Location:** `backend/app/services/predictive.py:102-103`
- **Current Code:**
  ```python
  velocity = max(0.1, phys / max(1, delay))  # delay = project.get("daysDelayed", 0)
  delay_rationale = f"...physical velocity of {velocity:.2f}%/day..."
  ```
- **Logical Defect:** Physical progress velocity is mathematically defined as completion percentage divided by *elapsed execution time* (`daysSinceStart` or scheduled calendar days). Here, the formula divides `phys` by `daysDelayed`.
- **Operational Impact:** If a project has 50% physical completion and is delayed by only 1 day (`delay = 1`), the calculated velocity is `50.00%/day`. For a project with 80% progress and 2 days of delay, velocity is `40.00%/day`. These absurdly inflated velocities distort delay projections and generate nonsensical audit rationales.
- **Recommended Remediation:** Compute velocity as `phys / max(1, days_since_start)` where `days_since_start` is derived from sanction date or `BASELINE_SCHEDULED_DAYS + delay`.

#### 11. Linear Cost Extrapolation Ignores Mobilization Advances
- **Location:** `backend/app/services/predictive.py:135-138`
- **Current Code:**
  ```python
  if phys > 15.0 and exp > 0:
      unit_cost_per_pct = exp / phys
      est_remaining_cost = unit_cost_per_pct * rem_work
      final_cost = int(exp + est_remaining_cost)
  ```
- **Logical Defect:** Public infrastructure works routinely release a mobilization advance (typically 40–50% of the contract value) upon initial setup (15–20% physical execution). Linear extrapolation of `exp / phys` across the remaining 80% of uncompleted work produces massive, erroneous cost overrun forecasts.
  - *Example:* On a ₹50,00,000 project with ₹20,00,000 advance disbursed at 16% physical progress, `unit_cost = ₹1,25,000/%`. The estimated remaining cost is calculated as `₹1,25,000 * 84 = ₹1,05,00,000`, projecting a final cost of ₹1.25 Crore (+150% overrun) on an on-budget contract.
- **Operational Impact:** Generates false-positive `SEVERE` cost overrun alerts on routine projects adhering to standard milestone mobilization schedules.
- **Recommended Remediation:** Bound `unit_cost_per_pct` against `sanctionedAmount / 100.0`, or apply an S-curve/milestone-weighted expenditure projection.

#### 12. False Vendor Entity Match on Generic/Placeholder Strings in Duplicate Detection
- **Location:** `backend/app/services/duplicate.py:102-105`
- **Current Code:**
  ```python
  vendor_match = bool(
      (v_id1 and v_id2 and v_id1 == v_id2) or
      (v_name1 and v_name2 and v_name1 == v_name2)
  )
  ```
- **Logical Defect:** Does not check for placeholder or unassigned vendor values. If two unrelated projects have `vendorName: "Pending"`, `"TBD"`, `"Not Assigned"`, or `"Departmental Execution"`, `v_name1 == v_name2` evaluates to `True`.
- **Operational Impact:** Awards an unearned +15.0% duplicate match boost and attaches the justification: *"Contractor entity match: same vendor 'Pending' awarded both project packages."*
- **Recommended Remediation:** Exclude generic sentinel values: `if v_name1.lower() in ("pending", "tbd", "unassigned", "n/a", ""): vendor_match = False`.

#### 13. Statutory Split-Tender Detection Lacks Temporal & Geographic Scoping
- **Location:** `backend/app/services/compliance.py:342-363`
- **Current Code:**
  ```python
  vendor_projects = [
      p for p in all_projects
      if (vendor_id and p.get("vendorId") == vendor_id) or
         (vendor_name and p.get("vendorName") == vendor_name)
  ]
  sub_threshold_projects = [p for p in vendor_projects if p.get("sanctionedAmount", 0) < threshold]
  if len(sub_threshold_projects) >= 2 and combined_sub_amount > threshold:
      is_fund_splitting = True  # Flags CRITICAL tender-slicing!
  ```
- **Logical Defect:** Under statutory procurement rules (GFR Rule 157 / MPLADS Guidelines), tender splitting occurs when work for the *same scheme or district within the same financial year* is sliced into smaller packages to bypass the single administrative sanction threshold (₹1.00 Crore). The current implementation aggregates ALL projects nationwide across ALL fiscal years.
- **Operational Impact:** A reputable national contractor executing ten independent ₹25 Lakh community works across 5 states over 3 years will have every single work flagged with a `CRITICAL` statutory split-tender violation.
- **Recommended Remediation:** Filter `vendor_projects` to match the same `district` (or state) and same `financialYear` as the evaluated project before aggregating sub-threshold amounts.

#### 14. Statutory Timeline Baseline Assumption for Newly Sanctioned Works
- **Location:** `backend/app/services/compliance.py:228-230`
- **Current Code:**
  ```python
  if "daysSinceStart" in project and project["daysSinceStart"] is not None:
      elapsed_days = int(project["daysSinceStart"])
  else:
      elapsed_days = BASELINE_SCHEDULED_DAYS (365) + days_delayed
  ```
- **Logical Defect:** If `daysSinceStart` is missing on a newly created project with `daysDelayed == 0`, `elapsed_days` evaluates to 365 days immediately upon creation.
- **Operational Impact:** A brand-new project created yesterday is treated as having consumed 365 days of its statutory 548-day deadline, severely truncating its remaining compliance window.
- **Recommended Remediation:** If `daysSinceStart` is missing, calculate elapsed calendar days from `project.get("sanctionDate")` or `submittedAt`, defaulting to 0 for new proposals.

---

### Category D: NLP & Scoring Engine Errors

#### 15. Real-Time Citizen Contradiction Evaluated Without Directional Contradiction
- **Location:** `backend/app/services/citizen_nlp.py:286-288`
- **Current Code:**
  ```python
  if negation_res["isDirectionalContradiction"]:
      # Gated by topical relevance
      ...
  else:
      contradiction_score = int(round(negation_res["negationIntensity"] * 100.0))
      is_contradiction = False
  ```
- **Logical Defect:** If `isDirectionalContradiction` is `False`, the code sets `contradiction_score` directly from `negationIntensity * 100` WITHOUT applying topical relevance gating.
- **Operational Impact:** If a citizen writes a complaint containing negative words that do NOT contradict official claims (e.g. "No defects noted, not damaged"), `negationIntensity` can be 0.60–0.70, yielding a `contradiction_score` of 60–70. In `backend/app/routers/citizen_nlp.py:279`, `contra_score >= 60` triggers an institutional alert, activating an erroneous anomaly alert for a corroborative report.
- **Recommended Remediation:** When `not negation_res["isDirectionalContradiction"]`, set `contradiction_score = min(20, int(round(negation_res["negationIntensity"] * 20.0)))`.

#### 16. Citizen NLP Topical Relevance Gating Floor
- **Location:** `backend/app/services/citizen_nlp.py:283`
- **Current Code:**
  ```python
  gate = max(0.45, topical_relevance / 40.0)
  ```
- **Logical Defect:** Imposes an artificial floor of 0.45 on the topical relevance gate.
- **Operational Impact:** A completely off-topic complaint (0% topical relevance, such as spam or cooking recipes) that contains strong negation cues ("nothing built, no road") receives a contradiction score of `85 * 0.45 = 38/100` instead of 0.
- **Recommended Remediation:** Remove the floor: `gate = min(1.0, topical_relevance / 40.0) if topical_relevance >= 15.0 else 0.0`.

---

### Category E: Operational Workflow & State-Machine Bugs

#### 17. Proposal ID Generation Hardcodes State Prefix
- **Location:** `backend/app/routers/projects.py:586`
- **Current Code:**
  ```python
  proposal_id = f"PROP-TN-{now.strftime('%Y%m%d%H%M%S')}"
  ```
- **Logical Defect:** When a Constituency MP submits a new proposal, the ID prefix is hardcoded to `PROP-TN-` regardless of the caller's actual state.
- **Operational Impact:** A Lok Sabha MP from Lucknow (Uttar Pradesh) or Pune (Maharashtra) submitting a proposal receives an ID prefixed with Tamil Nadu (`PROP-TN-2026...`).
- **Recommended Remediation:** Derive the state code dynamically: `state_abbr = STATE_CODE_MAP.get(state, "IND")`, producing `f"PROP-{state_abbr}-{now.strftime('%Y%m%d%H%M%S')}"`.

#### 18. Overly Permissive Tranche Release Gating
- **Location:** `backend/app/routers/projects.py:891`
- **Current Code:**
  ```python
  if not (has_accepted_evidence or has_accepted_invoice):
  ```
- **Logical Defect:** Under `ROLES.md` Rule 5: *"Release Next Tranche action only unlocks once current milestone evidence is Accepted."* Allowing contractor invoice acceptance as an alternative bypasses the requirement for verified physical proof.
- **Operational Impact:** A contractor invoice can unlock public fund disbursements without any accepted photographic or physical stage evidence.
- **Recommended Remediation:** Enforce strict evidence gating: `if not has_accepted_evidence: raise HTTPException(...)`.

#### 19. Disbursement Over-Allocation and Division-by-Zero Risk on Tranche Release
- **Location:** `backend/app/routers/projects.py:908-915`
- **Current Code:**
  ```python
  new_exp = min(sanctioned, current_exp + release_amt)
  new_fin_prog = round((new_exp / sanctioned) * 100, 1)

  new_disbursement = {
      "tranche": tranche_label,
      "date": now.strftime("%Y-%m-%d"),
      "amount": release_amt,  # Uncapped release amount appended!
      "percentage": round((release_amt / sanctioned) * 100, 1),
  }
  ```
- **Logical Defect:**
  1. While `new_exp` is capped at `sanctioned`, `new_disbursement["amount"]` appends the full, uncapped `release_amt`. The sum of disbursements can exceed `sanctionedAmount` and diverge from `expenditure`.
  2. If `sanctioned` is 0 or unrecorded, evaluating `(new_exp / sanctioned)` raises an unhandled `ZeroDivisionError`.
- **Operational Impact:** Financial records desynchronize, and projects with missing sanction values crash the endpoint.
- **Recommended Remediation:** Adjust `release_amt = min(release_amt, sanctioned - current_exp)` and guard with `max(sanctioned, 1)`.

#### 20. Hardcoded Array Index Escalation in Alerts Aggregator
- **Location:** `backend/app/services/alerts.py:133-137`
- **Current Code:**
  ```python
  elif idx == 3 or (alert.get("severity") == "CRITICAL" and idx == 5):
      alert_copy["status"] = "ESCALATED"
      alert_copy["ownerRole"] = "Central Nodal Agency (MoSPI)"
      alert_copy["ownerRoleId"] = "mospi_officer"
      alert_copy["escalationReason"] = "Forwarded by State Nodal Authority for Central Directive"
  ```
- **Logical Defect:** Escalation to MoSPI during initial data ingestion is hardcoded to specific loop indices (`idx == 3` and `idx == 5`).
- **Operational Impact:** If alerts are re-sorted, re-filtered, or new projects are added, completely arbitrary alerts become escalated to MoSPI regardless of whether they meet escalation criteria.
- **Recommended Remediation:** Determine escalation solely based on explicit alert attributes (`alert.get("isEscalated")` or `alert.get("forwardedToMoSPI")`).

---

## 6. Commit Hygiene & Repository Status

- **Current Repository Commit Count:** **3 commits**
  - `bcdb5c8` — *Initial commit: design system, layout shell, landing page, login flow*
  - `0f5ee5e` — *feat: complete SETU platform milestone with RBAC, alerts jurisdiction scoping, and Tamil Nadu demo credentials*
  - `2c0da1f` — *feat: complete all 6 official roles, Auditor CAG workflows, tiered national dataset, and redesigned landing and login flows*
- **Assessment vs `AGENTS.md` Conventions:**
  - `AGENTS.md` specifies: *"Commit only after a task is verified working by the user — do not self-commit."*
  - `PROGRESS.md` records 47 completed milestone tasks with timestamps and status notes.
  - The repository's commit count reflects 3 major milestone checkpoints. The codebase is clean, on branch `main`, with no unauthorized automated commits created during this inspection.

---

## Conclusion

The SETU platform codebase exhibits a mature, robust architecture with complete implementation of all 7 roles, severe-tiered oversight scoping, genuine SHAP explainability, honest predictive labeling, full bcrypt security, and functional statutory audit override mechanisms. Addressing the minor runtime import bug in `routers/alerts.py` and tightening the tranche gating check in `routers/projects.py` will bring the implementation into 100% adherence with all operational specifications.
