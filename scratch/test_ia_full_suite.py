"""
SETU Implementing Agency Comprehensive Verification Suite
Tests all requirements per ROLES.md:
1. Multi-account login across different districts and agency types
2. Scoping strictly to assigned projects (district + agency match)
3. Vendor name visible on each assigned project
4. Zero data overlap across all agency accounts
5. Complete redaction of sensitive fields (risk, compliance, citizen contradictions, alerts)
6. HTTP 403 Forbidden on out-of-jurisdiction project access & analytical endpoints
7. Zero alerts returned for Implementing Agency role
8. Physical progress update submission
9. Photo evidence upload with vendor provenance auto-tagging ("Received from Vendor: [vendorName]") and simulated verification badge
10. Contractor invoice & GST bill upload with simulated GSTIN format and budget ceiling checks (both valid and invalid cases)
11. Utilization Certificate (UC) lifecycle enforcement (blocked if incomplete, accepted if complete)
"""

import requests
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:8000"

DEMO_ACCOUNTS = [
    {
        "id": "ADM-IA-PWD-TN-CHN-008",
        "name": "Executive Engineer (Buildings & Roads), PWD Chennai Division",
        "district": "Chennai",
        "state": "Tamil Nadu",
        "agency": "Public Works Department (PWD) — Chennai",
        "password": "PWDWorks#Pass2026",
    },
    {
        "id": "ADM-IA-PWD-KA-BLR-028",
        "name": "Executive Engineer, PWD Bengaluru Urban Division",
        "district": "Bengaluru Urban",
        "state": "Karnataka",
        "agency": "Public Works Department (PWD) — Bengaluru Urban",
        "password": "PWDWorks#Pass2026",
    },
    {
        "id": "ADM-IA-TWAD-TN-CHN-009",
        "name": "Executive Engineer (Water Works), TWAD Board Chennai",
        "district": "Chennai",
        "state": "Tamil Nadu",
        "agency": "Rural Water Supply & Sanitation Board — Chennai",
        "password": "TWADWorks#Pass2026",
    },
    {
        "id": "ADM-IA-UP-LKO-015",
        "name": "District Basic Education Officer (BSA), Lucknow Division",
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "agency": "Department of Public Instruction — Lucknow",
        "password": "Education#Pass2026",
    }
]

SENSITIVE_FIELDS = [
    "riskScore",
    "riskLevel",
    "plainLanguageExplanation",
    "shapValues",
    "complianceFlags",
    "costOverrun",
    "duplicateRisk",
    "paymentProgressMismatch",
    "hasCitizenReport",
    "citizenReports",
    "citizenReportSummary",
    "fundDumpingFlag",
    "alerts"
]

def main():
    print("=" * 80)
    print("SETU IMPLEMENTING AGENCY COMPREHENSIVE VERIFICATION SUITE")
    print("=" * 80)

    tokens = {}
    projects_by_account = {}

    # STEP 1: Authenticate all 4 IA accounts
    print("\n[STEP 1] AUTHENTICATION & LOGIN")
    for acc in DEMO_ACCOUNTS:
        res = requests.post(f"{BASE_URL}/auth/login", json={
            "username": acc["id"],
            "password": acc["password"]
        })
        if res.status_code != 200:
            print(f"FAILED to login as {acc['id']}: {res.status_code} {res.text}")
            sys.exit(1)
        data = res.json()
        token = data.get("token")
        tokens[acc["id"]] = token
        print(f"  [OK] Logged in as {acc['id']}")
        print(f"       Official: {data.get('officialName')}")
        print(f"       Role: {data.get('role')} | Jurisdiction: {data.get('district')}, {data.get('state')} | Scope: {data.get('accessScope')}")

    # STEP 2: Scoped Projects Retrieval & Vendor Field Verification
    print("\n[STEP 2] JURISDICTIONAL SCOPING & VENDOR PROVENANCE VERIFICATION")
    for acc in DEMO_ACCOUNTS:
        token = tokens[acc["id"]]
        res = requests.get(f"{BASE_URL}/projects", headers={"Authorization": f"Bearer {token}"})
        assert res.status_code == 200, f"Failed to get projects for {acc['id']}: {res.text}"
        prjs = res.json()
        projects_by_account[acc["id"]] = prjs
        print(f"  [OK] {acc['id']} ({acc['agency']}) retrieved {len(prjs)} scoped projects:")
        assert len(prjs) > 0, f"Expected at least 1 project for {acc['id']}"
        for p in prjs:
            print(f"       • [{p['id']}] {p['name'][:40]}... (Dist: {p.get('district')}, Vendor: {p.get('vendorName')}, UC: {p.get('ucStatus')})")
            assert p.get('district') == acc['district'], f"District mismatch: {p.get('district')} != {acc['district']}"
            assert p.get('vendorName') is not None and len(p.get('vendorName')) > 0, f"Missing vendorName on project {p['id']}"
            assert p.get('ucStatus') in ["NOT_SUBMITTED", "SUBMITTED", "OVERDUE"], f"Invalid ucStatus on {p['id']}: {p.get('ucStatus')}"

    # STEP 3: Confirm Zero Data Overlap Across All Pairs
    print("\n[STEP 3] ZERO DATA OVERLAP ACROSS ALL AGENCY PAIRS")
    for i in range(len(DEMO_ACCOUNTS)):
        for j in range(i + 1, len(DEMO_ACCOUNTS)):
            a1 = DEMO_ACCOUNTS[i]
            a2 = DEMO_ACCOUNTS[j]
            set1 = {p["id"] for p in projects_by_account[a1["id"]]}
            set2 = {p["id"] for p in projects_by_account[a2["id"]]}
            overlap = set1.intersection(set2)
            print(f"  [OK] Overlap [{a1['id']}] vs [{a2['id']}]: {len(overlap)} projects (Zero Overlap Verified)")
            assert len(overlap) == 0, f"VIOLATION: Overlap detected between {a1['id']} and {a2['id']}: {overlap}"

    # STEP 4: Strict Sensitive Field Redaction Check
    print("\n[STEP 4] SENSITIVE FIELD REDACTION (ZERO RISK/COMPLIANCE/CITIZEN LEAKAGE)")
    for acc in DEMO_ACCOUNTS:
        prjs = projects_by_account[acc["id"]]
        for p in prjs:
            for field in SENSITIVE_FIELDS:
                assert field not in p, f"VIOLATION: Sensitive field '{field}' leaked in project {p['id']} for {acc['id']}!"
        print(f"  [OK] 100% of sensitive fields redacted for {acc['id']} across all {len(prjs)} records.")

    # STEP 5: Analytical Endpoints Lockout (HTTP 403 Forbidden)
    print("\n[STEP 5] ANALYTICAL & OVERSIGHT ENDPOINTS RBAC LOCKOUT (HTTP 403 FORBIDDEN)")
    pwd_token = tokens["ADM-IA-PWD-TN-CHN-008"]
    p_id = projects_by_account["ADM-IA-PWD-TN-CHN-008"][0]["id"]
    restricted_endpoints = [
        f"/projects/{p_id}/risk",
        f"/projects/{p_id}/compliance",
        f"/projects/{p_id}/duplicates",
        f"/projects/{p_id}/citizen-reports"
    ]
    for ep in restricted_endpoints:
        res = requests.get(f"{BASE_URL}{ep}", headers={"Authorization": f"Bearer {pwd_token}"})
        print(f"  [OK] Direct call GET {ep} -> HTTP {res.status_code} Forbidden")
        assert res.status_code == 403, f"Expected 403 Forbidden on {ep}, got {res.status_code}"

    # STEP 6: Out-of-Jurisdiction Direct Project Access Lockout (HTTP 403 Forbidden)
    print("\n[STEP 6] OUT-OF-JURISDICTION DIRECT ACCESS LOCKOUT (HTTP 403 FORBIDDEN)")
    blr_p_id = projects_by_account["ADM-IA-PWD-KA-BLR-028"][0]["id"]
    res_cross = requests.get(f"{BASE_URL}/projects/{blr_p_id}", headers={"Authorization": f"Bearer {pwd_token}"})
    print(f"  [OK] Chennai PWD attempting to inspect Bengaluru project {blr_p_id} -> HTTP {res_cross.status_code} Forbidden")
    assert res_cross.status_code == 403, f"Expected 403 Forbidden for cross-district project access, got {res_cross.status_code}"

    # STEP 7: Alerts Suppression (0 Alerts)
    print("\n[STEP 7] ALERTS SUPPRESSION")
    res_alerts = requests.get(f"{BASE_URL}/alerts", headers={"Authorization": f"Bearer {pwd_token}"})
    assert res_alerts.status_code == 200
    alerts_data = res_alerts.json()
    print(f"  [OK] GET /alerts -> {len(alerts_data)} alerts returned (Expected: 0)")
    assert len(alerts_data) == 0, "Implementing Agency must see 0 alerts!"

    res_sum = requests.get(f"{BASE_URL}/alerts/summary", headers={"Authorization": f"Bearer {pwd_token}"})
    assert res_sum.status_code == 200
    summary_data = res_sum.json()
    print(f"  [OK] GET /alerts/summary -> Total Alerts: {summary_data.get('totalAlerts', 0)} (Expected: 0)")
    assert summary_data.get("totalAlerts", 0) == 0, "Alerts summary total must be 0 for Implementing Agency!"

    # STEP 8: Progress Update Workflow
    print("\n[STEP 8] PHYSICAL PROGRESS UPDATE WORKFLOW")
    res_prog = requests.post(
        f"{BASE_URL}/projects/{p_id}/progress",
        headers={"Authorization": f"Bearer {pwd_token}"},
        json={
            "physicalProgress": 75,
            "financialProgress": 70.0,
            "stage": "Bituminous Surface Layer Compaction",
            "remarks": "Field compaction density test passed (98.6%)."
        }
    )
    print(f"  [OK] POST /projects/{p_id}/progress -> HTTP {res_prog.status_code}: {res_prog.json().get('message')}")
    assert res_prog.status_code == 200

    # STEP 9: Photo Evidence Upload with Auto-Tagging
    print("\n[STEP 9] PHOTO EVIDENCE UPLOAD WITH VENDOR PROVENANCE AUTO-TAGGING")
    res_ev = requests.post(
        f"{BASE_URL}/projects/{p_id}/evidence",
        headers={"Authorization": f"Bearer {pwd_token}"},
        json={
            "milestoneStage": "Bituminous Core Sampling",
            "milestoneRef": "Stage-2 Core Testing",
            "description": "Core cutter sample extracted and verified by Executive Engineer.",
            "fileName": "core_sample_test_chn_008.jpg"
        }
    )
    print(f"  [OK] POST /projects/{p_id}/evidence -> HTTP {res_ev.status_code}")
    assert res_ev.status_code in [200, 201]
    ev_data = res_ev.json().get("evidence", {})
    print(f"       Evidence Tag: '{ev_data.get('sourceTag')}'")
    print(f"       Verification Badge: '{ev_data.get('verificationBadge')}'")
    print(f"       Simulated: {ev_data.get('isSimulated')}")
    assert "Received from Vendor:" in ev_data.get("sourceTag", ""), "Evidence must include 'Received from Vendor:' tag"
    assert ev_data.get("isSimulated") is True, "Evidence must have isSimulated: True"

    # STEP 10: Contractor Invoice & GST Verification (Mocked: Valid & Invalid Cases)
    print("\n[STEP 10] CONTRACTOR INVOICE & GST BILL UPLOAD WORKFLOW (SIMULATED)")
    
    # 10a: Valid Invoice (Valid 15-char GSTIN & valid amount)
    res_inv_valid = requests.post(
        f"{BASE_URL}/projects/{p_id}/invoice",
        headers={"Authorization": f"Bearer {pwd_token}"},
        json={
            "invoiceNumber": "INV-2026-PWD-CHN-001",
            "claimedAmount": 450000.0,
            "gstin": "33AABCT1332L1Z4",
            "milestoneRef": "Stage-2 Surface Laying",
            "fileName": "contractor_tax_invoice_001.pdf",
            "notes": "Stage-2 civil work measurement book extract attached."
        }
    )
    print(f"  [OK] Valid Invoice Submission -> HTTP {res_inv_valid.status_code}")
    assert res_inv_valid.status_code == 201
    inv_valid_data = res_inv_valid.json().get("invoice", {})
    print(f"       Status: {inv_valid_data.get('status')} | Summary: {inv_valid_data.get('verificationSummary')}")
    assert inv_valid_data.get("status") == "Verified"
    assert inv_valid_data.get("gstinValid") is True
    assert inv_valid_data.get("isSimulated") is True

    # 10b: Invalid GSTIN Invoice (Malformed regex)
    res_inv_invalid_gst = requests.post(
        f"{BASE_URL}/projects/{p_id}/invoice",
        headers={"Authorization": f"Bearer {pwd_token}"},
        json={
            "invoiceNumber": "INV-2026-PWD-CHN-002",
            "claimedAmount": 200000.0,
            "gstin": "INVALID_GST_123",
            "milestoneRef": "Stage-2 Testing",
            "fileName": "invalid_gstin_bill.pdf"
        }
    )
    print(f"  [OK] Invalid GSTIN Submission -> HTTP {res_inv_invalid_gst.status_code}")
    assert res_inv_invalid_gst.status_code == 201
    inv_invalid_data = res_inv_invalid_gst.json().get("invoice", {})
    print(f"       Status: {inv_invalid_data.get('status')} | Summary: {inv_invalid_data.get('verificationSummary')}")
    assert inv_invalid_data.get("status") == "Under Review"
    assert inv_invalid_data.get("gstinValid") is False

    # 10c: Over-budget Claimed Amount
    res_inv_over = requests.post(
        f"{BASE_URL}/projects/{p_id}/invoice",
        headers={"Authorization": f"Bearer {pwd_token}"},
        json={
            "invoiceNumber": "INV-2026-PWD-CHN-003",
            "claimedAmount": 999999999.0,
            "gstin": "33AABCT1332L1Z4",
            "milestoneRef": "Over-ceiling Claim",
            "fileName": "over_budget_bill.pdf"
        }
    )
    print(f"  [OK] Over-Ceiling Invoice Submission -> HTTP {res_inv_over.status_code}")
    assert res_inv_over.status_code == 201
    inv_over_data = res_inv_over.json().get("invoice", {})
    print(f"       Status: {inv_over_data.get('status')} | Summary: {inv_over_data.get('verificationSummary')}")
    assert inv_over_data.get("status") == "Under Review"
    assert inv_over_data.get("amountWithinRange") is False

    # STEP 11: Utilization Certificate (UC) Lifecycle Workflow
    print("\n[STEP 11] UTILIZATION CERTIFICATE (UC) LIFECYCLE ENFORCEMENT")
    incomplete_prj = next(p for p in projects_by_account["ADM-IA-PWD-TN-CHN-008"] if p["physicalProgress"] < 100)
    
    # 11a: Attempt UC on incomplete project (Must return 400 Bad Request)
    res_uc_fail = requests.post(
        f"{BASE_URL}/projects/{incomplete_prj['id']}/utilization-certificate",
        headers={"Authorization": f"Bearer {pwd_token}"},
        json={
            "ucNumber": f"UC/TEST/{incomplete_prj['id']}",
            "certifiedAmount": 5000000,
            "remarks": "Premature UC submission test"
        }
    )
    print(f"  [OK] UC submission on incomplete project ({incomplete_prj['id']} @ {incomplete_prj['physicalProgress']}%) -> HTTP {res_uc_fail.status_code} (Expected 400)")
    assert res_uc_fail.status_code == 400

    # 11b: Complete the project (100%) and submit UC
    requests.post(
        f"{BASE_URL}/projects/{incomplete_prj['id']}/progress",
        headers={"Authorization": f"Bearer {pwd_token}"},
        json={"physicalProgress": 100, "stage": "Final Handover", "remarks": "100% completion"}
    )
    res_uc_ok = requests.post(
        f"{BASE_URL}/projects/{incomplete_prj['id']}/utilization-certificate",
        headers={"Authorization": f"Bearer {pwd_token}"},
        json={
            "ucNumber": f"UC/MPLADS/2026/{incomplete_prj['id']}",
            "certifiedAmount": incomplete_prj.get("expenditure", 5000000),
            "remarks": "Final Form GFR-12A certified and signed."
        }
    )
    print(f"  [OK] UC submission on completed project ({incomplete_prj['id']} @ 100%) -> HTTP {res_uc_ok.status_code}: {res_uc_ok.json().get('message')}")
    assert res_uc_ok.status_code == 200

    # 11c: Check updated project ucStatus
    res_p_check = requests.get(f"{BASE_URL}/projects/{incomplete_prj['id']}", headers={"Authorization": f"Bearer {pwd_token}"})
    updated_p = res_p_check.json()
    print(f"       Updated Project UC Status: {updated_p.get('ucStatus')} (Expected: SUBMITTED)")
    assert updated_p.get("ucStatus") == "SUBMITTED"

    print("\n" + "=" * 80)
    print("ALL 11 VERIFICATION PHASES PASSED WITH ZERO ERRORS!")
    print("Implementing Agency Role is 100% compliant with ROLES.md and AGENTS.md.")
    print("=" * 80)

if __name__ == "__main__":
    main()
