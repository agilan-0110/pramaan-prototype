import json
from pathlib import Path
import bcrypt

DATA_DIR = Path(__file__).resolve().parent.parent / "backend" / "app" / "data"
CREDENTIALS_FILE = DATA_DIR / "mockCredentials.json"
PROJECTS_FILE = DATA_DIR / "mockProjects.json"

# 1. Add PRJ-IND-TN-107 to mockProjects.json (Building in Chennai for PWD)
with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
    projects = json.load(f)

existing_pids = {p["id"] for p in projects}

new_proj = {
    "id": "PRJ-IND-TN-107",
    "name": "Construction of Composite Revenue & Administrative Sub-Divisional Complex, Central Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai Central",
    "mpName": "Thiru Dayanidhi Maran (Fictional)",
    "mpId": "MP-LS-TN-01",
    "category": "Building",
    "implementingAgency": "Public Works Department (PWD) — Chennai",
    "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
    "sanctionedAmount": 28000000,
    "expenditure": 21000000,
    "physicalProgress": 72,
    "financialProgress": 75.0,
    "status": "In Progress",
    "riskScore": 48,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": False,
    "duplicateRisk": False,
    "paymentProgressMismatch": False,
    "vendorId": "VND-TN-001",
    "financialYear": "2025-26",
    "dateSpent": "2025-11-28",
    "quarterSpent": "Q3",
    "fundDumpingFlag": False,
    "disbursements": [
        {"tranche": "T1", "date": "2025-06-15", "amount": 10500000, "percentage": 50.0, "quarter": "Q1"},
        {"tranche": "T2", "date": "2025-11-28", "amount": 10500000, "percentage": 50.0, "quarter": "Q3"}
    ],
    "siteCoordinates": {"latitude": 13.0845, "longitude": 80.2810},
    "latitude": 13.0845,
    "longitude": 80.2810
}

if new_proj["id"] not in existing_pids:
    projects.append(new_proj)
    with open(PROJECTS_FILE, "w", encoding="utf-8") as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)
    print("Added PRJ-IND-TN-107. Total projects:", len(projects))
else:
    print("PRJ-IND-TN-107 already exists.")

# 2. Build mockCredentials.json with Tamil Nadu reset per Task 2 requirements
demo_fallback_hash = bcrypt.hashpw(b"demo123", bcrypt.gensalt()).decode("utf-8")

def make_hash(pw: str) -> str:
    return bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

credentials = [
    # 1. District Authority — Chennai (Tamil Nadu) [PRIMARY DEMO]
    {
        "roleId": "district_authority",
        "roleName": "District Authority",
        "level": "District Level",
        "description": "Approve project proposals, issue administrative sanctions, record physical milestones, and verify measurements in Chennai.",
        "loginId": "ADM-DA-TN-CHN-001",
        "jurisdiction": "District Collectorate, Rajaji Salai, Chennai (Tamil Nadu)",
        "officialName": "District Collector & District Magistrate, Chennai (Fictional)",
        "accessScope": "district_all",
        "passwordHash": make_hash("DistAdmin#Pass2026"),
        "demoPasswordHash": demo_fallback_hash,
        "district": "Chennai",
        "state": "Tamil Nadu",
        "aliases": [
            "DIST-CHN-001",
            "DIST-TN-CHN-001",
            "DIST-MDU-001"
        ]
    },
    # 2. Central Nodal Agency (MoSPI) — National Scope (Apex Authority) [Unrestricted National]
    {
        "roleId": "mospi_officer",
        "roleName": "Central Nodal Agency (MoSPI)",
        "level": "National Oversight",
        "description": "Apex fund-flow authority under MPLADS — monitors national implementation, reviews predictive risk insights, and issues directives across states.",
        "loginId": "ADM-CNA-MOSPI-HQ-002",
        "jurisdiction": "Ministry of Statistics & Programme Implementation, Sardar Patel Bhawan, New Delhi",
        "officialName": "Joint Secretary & National Director - MPLADS (Fictional)",
        "accessScope": "national_all",
        "passwordHash": make_hash("CentralApex#Pass2026"),
        "demoPasswordHash": demo_fallback_hash,
        "aliases": [
            "MOSPI-SZ-CHN",
            "CNA-MOSPI-HQ-002"
        ]
    },
    # 3. State Nodal Authority — Tamil Nadu (State-Level)
    {
        "roleId": "state_nodal",
        "roleName": "State Nodal Authority",
        "level": "State Level",
        "description": "Review cross-district financial rollups, supervise state duplicate asset matching, and transmit compliance reports for Tamil Nadu.",
        "loginId": "ADM-SNA-TN-CHN-005",
        "jurisdiction": "Planning, Development and Special Initiatives Department, Fort St. George, Chennai (Tamil Nadu)",
        "officialName": "State Nodal Officer - MPLADS Wing, Tamil Nadu (Fictional)",
        "accessScope": "state_rollup",
        "passwordHash": make_hash("StateNodal#Pass2026"),
        "demoPasswordHash": demo_fallback_hash,
        "state": "Tamil Nadu",
        "aliases": [
            "SNA-TN-04",
            "SNA-TN-CHN-005"
        ]
    },
    # 4. Auditor / CAG — Chennai Office Designation [Cross-regional Statutory Scope]
    {
        "roleId": "auditor_cag",
        "roleName": "Auditor / CAG",
        "level": "Statutory Audit",
        "description": "Perform statutory compliance audits, flag fund-splitting patterns, inspect voucher records, and attach audit observations nationwide.",
        "loginId": "ADM-CAG-AUD-TN-CHN-003",
        "jurisdiction": "Office of the Principal Accountant General (Audit-I), Lekha Pariksha Bhavan, Teynampet, Chennai (Tamil Nadu)",
        "officialName": "Principal Accountant General (Audit-I), Tamil Nadu (Fictional)",
        "accessScope": "statutory_audit_all",
        "passwordHash": make_hash("CAGAudit#Pass2026"),
        "demoPasswordHash": demo_fallback_hash,
        "aliases": [
            "CAG-SZ-TRICHY",
            "CAG-TN-CHN-003",
            "ADM-CAG-AUD-RJ-JPR-007"
        ]
    },
    # 5. Implementing Agency (PWD) — Chennai (Tamil Nadu)
    {
        "roleId": "implementing_agency_pwd",
        "roleName": "Implementing Agency (PWD)",
        "level": "Execution Agency",
        "description": "Upload contractor work measurement sheets, record physical progress percentages, and submit completion reports for Chennai PWD works.",
        "loginId": "ADM-IA-PWD-TN-CHN-008",
        "jurisdiction": "Public Works Department, Buildings & Roads Division, Chepauk, Chennai (Tamil Nadu)",
        "officialName": "Executive Engineer - Civil Works, PWD Chennai (Fictional)",
        "accessScope": "agency_assigned_only",
        "passwordHash": make_hash("PWDWorks#Pass2026"),
        "demoPasswordHash": demo_fallback_hash,
        "agency": "Public Works Department (PWD) — Chennai",
        "state": "Tamil Nadu",
        "district": "Chennai",
        "aliases": [
            "PWD-CHN-DIV1",
            "PWD-TN-CHN-008",
            "PWD-BLR-DIV1"
        ]
    },
    # 6. MP Office — Chennai Central (Tamil Nadu)
    {
        "roleId": "mp_office",
        "roleName": "MP Office",
        "level": "Constituency Level",
        "description": "Submit project recommendations, track nodal sanction status, and monitor constituency-level work progress in Chennai Central.",
        "loginId": "ADM-MP-TN-CHN-021",
        "jurisdiction": "Chennai Central Parliamentary Constituency (Tamil Nadu)",
        "officialName": "Secretariat to Thiru Dayanidhi Maran, MP (Fictional)",
        "accessScope": "constituency_only",
        "passwordHash": make_hash("MPOffice#Pass2026"),
        "demoPasswordHash": demo_fallback_hash,
        "constituency": "Chennai Central",
        "district": "Chennai",
        "state": "Tamil Nadu",
        "aliases": [
            "MP-TN-CHN-021",
            "MP-CHE-SOUTH",
            "MP-CHE-CENTRAL"
        ]
    },
    # 7. Preserved: District Authority — Lucknow (Uttar Pradesh) [Required for Lucknow verification test]
    {
        "roleId": "district_authority_lucknow",
        "roleName": "District Authority",
        "level": "District Level",
        "description": "Approve project proposals, issue administrative sanctions, record physical milestones in Lucknow district.",
        "loginId": "ADM-DA-UP-LKO-012",
        "jurisdiction": "District Collectorate & District Magistrate Office, Lucknow (Uttar Pradesh)",
        "officialName": "District Planning Officer, Lucknow (Fictional)",
        "accessScope": "district_all",
        "passwordHash": make_hash("DistAdmin#Pass2026"),
        "demoPasswordHash": demo_fallback_hash,
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "aliases": [
            "DIST-LKO-012"
        ]
    },
    # 8. Preserved: Implementing Agency — Bengaluru Urban (Karnataka) [Cross-jurisdiction isolation test]
    {
        "roleId": "implementing_agency_pwd_blr",
        "roleName": "Implementing Agency (PWD)",
        "level": "Execution Agency",
        "description": "Upload contractor work measurement sheets, record physical progress percentages for Bengaluru Urban works.",
        "loginId": "ADM-IA-PWD-KA-BLR-028",
        "jurisdiction": "Public Works Department, Executive Division-I, Bengaluru (Karnataka)",
        "officialName": "Executive Engineer - Civil Works, Bengaluru (Fictional)",
        "accessScope": "agency_assigned_only",
        "passwordHash": make_hash("PWDWorks#Pass2026"),
        "demoPasswordHash": demo_fallback_hash,
        "agency": "Public Works Department (PWD) — Bengaluru Urban",
        "state": "Karnataka",
        "district": "Bengaluru Urban",
        "aliases": [
            "PWD-BLR-DIV1"
        ]
    }
]

with open(CREDENTIALS_FILE, "w", encoding="utf-8") as f:
    json.dump(credentials, f, indent=2, ensure_ascii=False)

print(f"Wrote {len(credentials)} credentials to {CREDENTIALS_FILE}")
