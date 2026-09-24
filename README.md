# PRAMAAN — Institutional Monitoring & Contradiction Detection Platform
### Smart India Hackathon 2026 | Problem Statement SIH26102 (MoSPI)
> **Statutory Compliance Rule Engine, Cross-Jurisdictional Duplicate Work Detection, Multi-Modal Citizen NLP Contradiction Scoring, and Predictive Risk Forecasting for MPLADS Works.**

---

## 1. Overview & Problem Context

The **Members of Parliament Local Area Development Scheme (MPLADS)** enables MPs to recommend developmental works in their constituencies with an emphasis on creating durable community assets. However, monitoring distributed public assets across hundreds of parliamentary constituencies presents severe operational and oversight challenges:

- **Statutory Non-Compliance**: Breaches of mandated category cost ceilings (e.g., 20% limit for community halls), sanction time limits (75 days from recommendation to sanction), and fund-splitting to bypass tender thresholds.
- **Duplicate & Ghost Asset Sanctions**: Identical or overlapping physical civil works sanctioned across financial years, across neighboring district borders, or across multiple funding streams (Panchayat / State / MPLADS).
- **Tranche Release Disconnect**: Lump-sum fund tranches disbursed without verified proof of milestone execution or physical asset existence.
- **Discrepancy Between Official Reporting & Ground Truth**: Divergence between contractor self-reported completion percentages and physical reality reported by citizens on the ground.
- **March Rush / Fiscal Fund Dumping**: Asymmetric end-of-fiscal-year expenditure spikes without corresponding physical progress.

**PRAMAAN** solves these challenges through an end-to-end statutory governance grid integrating automated compliance verification, geospatial duplicate matching, NLP-driven contradiction scoring, predictive risk modeling, and a strict 7-role single-ownership escalation architecture.

---

## 2. Tech Stack

All dependencies and versions are verified directly from `backend/requirements.txt` and the frontend source tree:

### Backend
- **Core Framework**: FastAPI `0.141.1`, Starlette `1.6.0`, Uvicorn `0.53.0`
- **Data Validation & Schemas**: Pydantic `2.13.5`, Pydantic Core `2.46.5`
- **Machine Learning & NLP**:
  - `sentence-transformers==6.1.0` (Semantic vector embeddings for citizen report contradiction detection)
  - `torch==2.14.0`, `transformers==5.17.0`, `tokenizers==0.23.2`
  - `scikit-learn==1.7.2` (Isolation Forest anomaly detection on financial velocities and execution timelines)
  - `shap==0.49.1` (SHAP explainability values for risk scoring factors)
  - `numpy==2.2.6`, `pandas==2.3.3`, `scipy==1.15.3`
- **Fuzzy Matching**: `RapidFuzz==3.14.5` (Levenshtein & token-ratio similarity for duplicate project detection)
- **Security & Cryptography**: `bcrypt==5.0.0`, `passlib==1.7.4`, `python-jose==3.5.0` (HMAC-SHA256 JWT tokens)
- **Data Persistence**: Python Standard Library `json` + `threading.Lock` across structured mock databases (`backend/app/data/`)

### Frontend
- **Architecture**: Zero-Build Native ES Modules (ESM) SPA — runs natively in modern browsers with **zero npm/Node.js dependencies or build steps**.
- **Styling**: Tailwind CSS via CDN (`https://cdn.tailwindcss.com?plugins=forms,container-queries`)
- **Typography & Icons**: Google Fonts (`Inter`, `Public Sans`, `JetBrains Mono`) and Google Material Symbols Outlined
- **Design Tokens**: Standardized institutional tokens in `frontend/src/theme/tokens.css` conforming to Indian government portal design standards (`#0f2b5c` GovNavy primary palette).

---

## 3. Setup & Installation Instructions

Follow these step-by-step instructions to set up and run PRAMAAN locally from a clean clone.

### Prerequisites
- **Python 3.10+** (Python 3.10, 3.11, or 3.12 recommended)
- A modern web browser (Chrome, Edge, Firefox)

### Step 1: Clone Repository
```powershell
git clone <repository-url>
cd SETU
```

### Step 2: Configure & Activate Backend Virtual Environment
```powershell
cd backend
python -m venv venv

# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# On Windows (Command Prompt):
.\venv\Scripts\activate.bat

# On Linux / macOS:
source venv/bin/activate

# Install exact pinned dependencies:
pip install -r requirements.txt
cd ..
```

### Step 3: Run the Application

#### Option A: One-Click Startup (Windows)
Double-click `start.bat` or run in PowerShell:
```powershell
.\start.ps1
```
This automatically launches the FastAPI backend on port `8000`, the frontend static server on port `3000`, and opens the Citizen Portal in your browser.

#### Option B: Manual Launch (Two Terminals)

**Terminal 1 — Backend API Server:**
```powershell
cd backend
.\venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8000
```
*Health Check*: Open `http://127.0.0.1:8000/docs` to view the interactive OpenAPI / Swagger specification.

**Terminal 2 — Frontend Static Server:**
```powershell
cd frontend
python -m http.server 3000
```
*Web Application*: Open `http://localhost:3000/#/citizen-portal` to view the platform.

---

## 4. Role-Based Access Control (RBAC) System

PRAMAAN implements a canonical 7-role governance model strictly governed by [ROLES.md](file:///C:/Workspace/AI-Projects/SETU/ROLES.md):

| Role Name | Authority Scope | Primary Functions | Strict Restrictions |
|---|---|---|---|
| **Citizen** | Public | Submits geo-tagged feedback, photos, and grievances; tracks public project progress. | Public data only; cannot view internal scores, audit tags, or official notes. |
| **MP Office** | Constituency or Chosen Districts | Recommends new works, tracks proposal approval/rejection status and high-level risk badges. | Read-only risk badges; cannot act on alerts, view other constituencies, or view internal audit observations. |
| **District Authority (DA)** | District Collectorate / DM | Operational core: approves/rejects proposals, verifies milestone evidence, approves gated fund tranches, resolves district-level flags. | Strictly scoped to own district; cannot upload evidence on behalf of vendors or view state rollups. |
| **Implementing Agency (IA)** | Assigned Division (e.g. PWD, TWAD) | Updates physical milestone percentages, submits invoice details, uploads vendor evidence. | **Deliberately blind to oversight**: zero visibility into compliance violations, risk scores, duplicate alerts, or citizen reports. |
| **State Nodal Authority (SNA)** | State Planning Department | State-wide rollups, adjudicates cross-district duplicates, monitors inaction timeouts, issues formal administrative queries. | Cannot execute works or edit milestone evidence directly. |
| **Central Nodal Agency (MoSPI)** | National Apex | Nationwide oversight, predictive portfolio insights, cross-state duplicate adjudication, tasks CAG for statutory audit. | Institutional/directive authority; does not execute or approve site-level tasks. |
| **Auditor / CAG** | Statutory National Audit | Unconditional visibility across all projects and flags; logs audit observations; **reopens** resolved flags upon audit findings. | Review, override, and re-open power only; cannot participate in live milestone approval workflows. |

### Architectural Guardrails
1. **Single Ownership at a Time**: Only one official role holds the action token on an active flag. All other permitted viewers see a read-only status.
2. **Milestone-Gated Tranches**: "Release Next Tranche" is programmatically locked on the backend until the corresponding milestone evidence status is officially `Accepted`.
3. **Escalation Transfers Ownership**: Upward escalation moves ownership (e.g., District $\to$ State Nodal $\to$ MoSPI) without duplication.
4. **Vendors Have No System Login**: Vendors/contractors exist only as metadata (`vendorName`) tied to project execution records.

---

## 5. Demo Access Credentials

The platform is pre-loaded with verified credentials configured in `frontend/src/pages/loginData.js` and `backend/app/data/mockCredentials.json`:

| Role | Official Login ID | Password | Jurisdiction / Scope |
|---|---|---|---|
| **District Authority** | `ADM-DA-TN-CHN-001` | `DistAdmin#Pass2026` | Chennai Collectorate (Tamil Nadu) |
| **District Authority (Cross-District Test)** | `ADM-DA-UP-LKO-012` | `DistAdmin#Pass2026` | Lucknow District (Uttar Pradesh) |
| **Central Nodal Agency (MoSPI)** | `ADM-CNA-MOSPI-HQ-002` | `CentralApex#Pass2026` | National Apex HQ (New Delhi) |
| **State Nodal Authority** | `ADM-SNA-TN-CHN-005` | `StateNodal#Pass2026` | Tamil Nadu State Planning Dept |
| **State Nodal Authority** | `ADM-SNA-KA-BLR-006` | `StateNodal#Pass2026` | Karnataka State Planning Dept |
| **State Nodal Authority** | `ADM-SNA-MH-PUN-007` | `StateNodal#Pass2026` | Maharashtra State Planning Dept |
| **Auditor / CAG** | `ADM-CAG-AUD-TN-CHN-003` | `CAGAudit#Pass2026` | Principal Accountant General (Audit) |
| **Implementing Agency (PWD)** | `ADM-IA-PWD-TN-CHN-008` | `PWDWorks#Pass2026` | PWD Chennai Division (Tamil Nadu) |
| **Implementing Agency (TWAD)** | `ADM-IA-TWAD-TN-CHN-009` | `PWDWorks#Pass2026` | Water Supply Board, Chennai |
| **MP Office (Constituency MP)** | `ADM-MP-TN-CHN-021` | `MPOffice#Pass2026` | Chennai Central Parliamentary Constituency |
| **MP Office (Nominated MP)** | `ADM-MP-NOM-IND-022` | `MPOffice#Pass2026` | Nominated Rajya Sabha (Chennai, BLR, Pune) |
| **Citizen (Public Access)** | *No Login Required* | *Public Portal* | Accessible at `http://localhost:3000/#/citizen-portal` |

---

## 6. Implemented Features & Endpoints

All features are implemented and backed by active FastAPI routers in `backend/app/routers/`:

### 1. Statutory Compliance Engine (`/projects/.../compliance`)
- Evaluates MPLADS statutory guidelines: 20% ceiling checks on specific asset categories, 75-day sanction deadlines, prohibited items, fund splitting across multiple works, and agency category alignment.
- Validates GST invoice structure and checks milestone invoice percentages against tranche limits.

### 2. Cross-Jurisdictional Duplicate Detection (`/projects/.../duplicates`)
- Multi-signal duplicate detection engine combining:
  - RapidFuzz token-sort similarity on project titles and descriptions.
  - Haversine geodistance matching between reported coordinates.
  - Temporal overlap analysis across financial years.
  - Vendor matching weighting.
- Flags cross-district duplicates (routed to State Nodal) and cross-state duplicates (routed directly to MoSPI).

### 3. Financial Anomaly & Risk Engine (`/projects/.../risk`)
- Multi-factor risk scoring incorporating expenditure pacing, milestone lag, cost revision ratios, and anomaly flags.
- Isolation Forest anomaly detection with SHAP explainability values detailing top risk factors.

### 4. Expenditure Trend & Fund-Dumping Analysis (`/trends`)
- Aggregates yearly, quarterly, state-level, and district-level expenditure trends.
- Flags "March Rush / Fund Dumping" patterns where excessive expenditure is booked in Q4 without commensurate physical milestone completion.
- Flags Chronic Non-Utilization where unspent funds stagnate beyond statutory limits.

### 5. Predictive Delay & Cost Forecasting (`/predictive`)
- Predicts expected completion dates, cost escalation probabilities, and milestone slippage risk.
- Provides portfolio-level at-risk summaries across all 20 covered States/UTs.

### 6. Citizen Ground-Truth NLP Contradiction Scoring (`/projects/{id}/citizen-reports`)
- Public portal allowing citizens to submit geo-tagged field observations, progress assessments, and photos.
- Evaluates citizen reports against official agency-reported progress using SentenceTransformer semantic similarity and sentiment discrepancy analysis to calculate a **Contradiction Score (0.0 to 1.0)**.
- High contradiction scores trigger automated alerts for District Authority on-site physical inspection.

### 7. Centralized Alert Grid & Escalation State Machine (`/alerts`)
- Full lifecycle flag management: `OPEN` $\to$ `INSPECTION_ORDERED` $\to$ `RESOLVED_CONFIRMED` / `RESOLVED_FALSE_POSITIVE` $\to$ `ESCALATED`.
- Single-ownership tracking with automated 14-day inaction timeout escalation.
- Strict role-based jurisdiction filtering preventing cross-district or cross-state data leakage.

### 8. Milestone Evidence Verification & Fund Release Controls (`/projects`)
- Two-step milestone evidence verification: Implementing Agency uploads evidence $\to$ District Authority reviews (`Accepted` or `Rejected`).
- Fund release gating: Tranche disbursement is programmatically locked until milestone evidence is officially marked `Accepted`.
- Tracking for Utilization Certificates (UC) and Asset Transfer to User Agency.

### 9. Auditor / CAG Statutory Review & Reopen Engine (`/audit`)
- Unconditional visibility into all project histories, audit logs, and resolution records.
- Ability to attach formal audit observations; HIGH/CRITICAL audit observations automatically **reopen** previously resolved flags.

### 10. Role-Specific Dashboards (`/dashboard`)
- Context-aware KPI cards, alert summaries, and project distributions filtered according to the logged-in user's role and jurisdiction.

---

## 7. Explicit Disclosures & Current Limitations (Simulated vs. Real)

In accordance with the project's architectural integrity guidelines, mocked or simulated components are explicitly disclosed:

| Component | Status | Implementation Details |
|---|---|---|
| **GSTIN & Invoice Verification** | **Simulated OCR / Regex** | The system verifies GSTIN structural regex formatting and invoice milestone ceiling percentages. It displays a visible `"Simulated Format Check"` badge in the UI and does not connect to the live Government of India GSTN API. |
| **Physical Evidence Verification** | **Simulated CV** | Evidence submissions undergo image format validation and EXIF/metadata checks. Automated physical structural verification displays a visible `"Simulated CV"` badge; production computer vision weights (CNN/YOLO) are not active in the prototype. |
| **Predictive Forecasting Fallback** | **Heuristic Fallback** | When dataset sizes are insufficient for neural/statistical fitting, the engine gracefully utilizes deterministic linear heuristics to compute completion forecasts. |
| **Data Persistence** | **In-Memory / JSON Cache** | Data is persisted in structured JSON files (`backend/app/data/`) with thread-safe file locking rather than a live PostgreSQL / PostGIS cluster. |
| **Dataset Scope** | **Synthetic Dataset** | 124 synthetic MPLADS projects across 20 States and Union Territories with simulated expenditure logs and milestone histories. |

---

## 8. Project Structure

```text
SETU/
├── AGENTS.md                  # Development guidelines, conventions, and rules
├── API_CONTRACT.md            # Canonical API contract specification
├── PROGRESS.md                # Task tracking and execution log
├── ROLES.md                   # Canonical 7-role access control & workflow spec
├── start.bat                  # Windows one-click dual-server launcher
├── start.ps1                  # PowerShell dual-server launcher
├── backend/
│   ├── requirements.txt       # Pinned Python dependencies
│   └── app/
│       ├── __init__.py
│       ├── main.py            # FastAPI entry point, CORS, and router registration
│       ├── data/              # JSON data persistence (projects, alerts, credentials)
│       ├── routers/           # FastAPI HTTP route handlers
│       │   ├── alerts.py      # Alert grid and lifecycle state machine
│       │   ├── audit.py       # Auditor/CAG observations & flag reopening
│       │   ├── auth.py        # Authentication & JWT issuance
│       │   ├── citizen_nlp.py # Citizen report submission & contradiction scoring
│       │   ├── compliance.py  # Statutory compliance rule verification
│       │   ├── dashboard.py   # Role-scoped KPI metrics and stats
│       │   ├── duplicate.py   # Fuzzy & geospatial duplicate detection
│       │   ├── predictive.py  # Delay and cost escalation forecasts
│       │   ├── projects.py    # Proposals, milestones, evidence, and tranche release
│       │   ├── risk.py        # Financial risk & Isolation Forest scoring
│       │   └── trend.py       # Expenditure trends & March rush detection
│       └── services/          # Core analytical, algorithmic, and business logic
└── frontend/
    ├── index.html             # Single-Page Application entry point
    └── src/
        ├── components/
        │   ├── Layout.js      # Global navigation, role badge, session controller
        │   └── Layout.css
        ├── pages/
        │   ├── CitizenPortal.jsx    # Public reporting and progress tracking
        │   ├── citizenPortalData.js # Citizen logic and state management
        │   ├── Dashboard.jsx        # Role-scoped operational dashboards
        │   ├── dashboardData.js     # Dashboard state and API wiring
        │   ├── Landing.jsx          # Public portal gateway landing page
        │   ├── landingData.js       # Gateway navigation logic
        │   ├── Login.jsx            # Official role-based authentication UI
        │   ├── loginData.js         # Client authentication and mock credentials
        │   ├── ProjectDetail.jsx    # Milestone evidence, audit trail & tranche gate
        │   └── projectDetailData.js # Project detail API integration
        └── theme/
            └── tokens.css     # Indian government design system color tokens
```

---

## 9. License

> **[LICENSE PLACEHOLDER]**  
> *No formal LICENSE file is currently present in the repository.* A standard open-source license (such as MIT, Apache 2.0, or Government Open Data License) should be specified prior to production distribution.

---

## 10. Authors & Acknowledgments

- **Development Team**: Smart India Hackathon 2026 Team (Problem Statement SIH26102)
- **Primary Contributor / Git Author**: Agilan T (`agilanthiyagarajan01@gmail.com`)
- **Institution / Ministry**: Ministry of Statistics and Programme Implementation (MoSPI), Government of India
