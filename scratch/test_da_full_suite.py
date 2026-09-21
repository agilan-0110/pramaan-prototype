"""
Comprehensive End-to-End Test Suite for District Authority Login & Workflows.
Tests:
1. District Scoping (Chennai and Lucknow)
2. MP Proposal Approval & Rejection (with mandatory rejectionReason)
3. Flag Resolution Lifecycle (OPEN -> INSPECTION_ORDERED -> RESOLVED_FALSE_POSITIVE)
4. Confirmed-Critical Auto-Escalation (CRITICAL + RESOLVED_CONFIRMED -> ESCALATED + State Nodal ownership + DA 403 Read-Only)
5. 14-day Inaction Timeout Auto-Escalation
6. Evidence & Invoice Review + Milestone Gated Tranche Release (400 blocked -> 200 released)
7. Completed Project Asset Transfer (PENDING_TRANSFER -> TRANSFERRED)
8. Grouped Citizen Contradiction Reports
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))
import io
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace", line_buffering=True)
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace", line_buffering=True)
import json
import requests

BASE_URL = "http://127.0.0.1:8000"

# Credentials
DA_CHENNAI = ("ADM-DA-TN-CHN-001", "DistAdmin#Pass2026")
DA_LUCKNOW = ("ADM-DA-UP-LKO-012", "DistAdmin#Pass2026")
SNA_TN = ("ADM-SNA-TN-CHN-005", "StateNodal#Pass2026")
MP_CHN = ("ADM-MP-TN-CHN-021", "MPOffice#Pass2026")

def login(official_id, password):
    resp = requests.post(f"{BASE_URL}/auth/login", json={"username": official_id, "password": password})
    assert resp.status_code == 200, f"Login failed for {official_id}: {resp.text}"
    data = resp.json()
    return data["token"], data

def run_tests():
    # Reset in-memory alert state
    try:
        requests.post(f"{BASE_URL}/alerts/reset")
    except Exception:
        pass

    print("\n--- 1. Authenticating Users ---")
    token_da_chn, user_da_chn = login(*DA_CHENNAI)
    token_da_lko, user_da_lko = login(*DA_LUCKNOW)
    token_sna_tn, user_sna_tn = login(*SNA_TN)
    token_mp_chn, user_mp_chn = login(*MP_CHN)

    headers_da_chn = {"Authorization": f"Bearer {token_da_chn}"}
    headers_da_lko = {"Authorization": f"Bearer {token_da_lko}"}
    headers_sna_tn = {"Authorization": f"Bearer {token_sna_tn}"}
    headers_mp_chn = {"Authorization": f"Bearer {token_mp_chn}"}

    print(f"Authenticated DA Chennai: {user_da_chn['officialName']} ({user_da_chn['district']})")
    print(f"Authenticated DA Lucknow: {user_da_lko['officialName']} ({user_da_lko['district']})")
    print(f"Authenticated State Nodal: {user_sna_tn['officialName']} ({user_sna_tn['state']})")
    print(f"Authenticated MP Office: {user_mp_chn['officialName']} ({user_mp_chn['constituency']})")

    print("\n--- 2. Verifying District Scoping (No Regression) ---")
    # Chennai DA projects
    resp = requests.get(f"{BASE_URL}/projects", headers=headers_da_chn)
    assert resp.status_code == 200
    chn_projects = resp.json()
    assert len(chn_projects) > 0
    for p in chn_projects:
        assert p["district"].lower() == "chennai", f"Non-Chennai project found for Chennai DA: {p['district']}"
    print(f"PASS: Chennai DA sees {len(chn_projects)} projects, all strictly in Chennai.")

    # Lucknow DA projects
    resp = requests.get(f"{BASE_URL}/projects", headers=headers_da_lko)
    assert resp.status_code == 200
    lko_projects = resp.json()
    assert len(lko_projects) > 0
    for p in lko_projects:
        assert p["district"].lower() == "lucknow", f"Non-Lucknow project found for Lucknow DA: {p['district']}"
    print(f"PASS: Lucknow DA sees {len(lko_projects)} projects, all strictly in Lucknow.")

    # Cross-district project access check (Lucknow DA cannot access Chennai project)
    test_chn_pid = chn_projects[0]["id"]
    resp = requests.get(f"{BASE_URL}/projects/{test_chn_pid}", headers=headers_da_lko)
    assert resp.status_code == 403, f"Expected 403 for Lucknow DA accessing Chennai project, got {resp.status_code}"
    print(f"PASS: Lucknow DA correctly receives 403 Forbidden on Chennai project {test_chn_pid}.")

    print("\n--- 3. MP Proposal Scrutiny & Rejection Reason Workflow ---")
    # Step 3a: MP submits proposal 1 (to be rejected)
    proposal_payload_1 = {
        "title": "Community Borewell & RO Plant Ward 112",
        "workDescription": "Installation of deep borewell and 1000 LPH reverse osmosis plant in congested residential sector.",
        "estimatedCost": 2200000.0,
        "category": "Water",
        "location": "Triplicane High Road, Ward 112, Chennai",
        "district": "Chennai",
        "state": "Tamil Nadu"
    }
    resp = requests.post(f"{BASE_URL}/projects/proposals", headers=headers_mp_chn, json=proposal_payload_1)
    assert resp.status_code == 201
    prop_1_data = resp.json().get("proposal") or resp.json().get("project")
    prop_1_id = prop_1_data["id"]
    print(f"Created Proposal 1: {prop_1_id} (Status: {prop_1_data['status']})")

    # Step 3b: DA rejects without reason -> should fail with 400
    resp = requests.post(f"{BASE_URL}/projects/{prop_1_id}/proposal-decision", headers=headers_da_chn, json={
        "decision": "REJECT",
        "rejectionReason": ""
    })
    assert resp.status_code == 400, f"Expected 400 for empty rejection reason, got {resp.status_code}"
    print("PASS: Empty rejection reason rejected with HTTP 400 Bad Request.")

    # Step 3c: DA rejects with mandatory reason
    rejection_msg = "Overlaps with Chennai Metrowater Phase II piped water supply scheme scheduled for Q4."
    resp = requests.post(f"{BASE_URL}/projects/{prop_1_id}/proposal-decision", headers=headers_da_chn, json={
        "decision": "REJECT",
        "rejectionReason": rejection_msg
    })
    assert resp.status_code == 200
    assert resp.json()["project"]["status"] == "Rejected"
    assert resp.json()["project"]["rejectionReason"] == rejection_msg
    print(f"PASS: Proposal {prop_1_id} rejected with reason stored.")

    # Step 3d: MP Office views the rejected proposal and verifies rejection reason is visible
    resp = requests.get(f"{BASE_URL}/projects/{prop_1_id}", headers=headers_mp_chn)
    assert resp.status_code == 200
    mp_view_prop = resp.json()
    assert mp_view_prop["status"] == "Rejected"
    assert mp_view_prop["rejectionReason"] == rejection_msg
    print(f"PASS: MP Office can see rejection reason: '{mp_view_prop['rejectionReason']}'.")

    # Step 3e: MP submits proposal 2 (to be approved)
    proposal_payload_2 = {
        "title": "Smart Anganwadi Center Model Renovation",
        "workDescription": "Child-friendly smart learning aids, flooring, kitchen modernization and solar rooftop for Anganwadi center.",
        "estimatedCost": 1850000.0,
        "category": "Education",
        "location": "Mylapore Tank Area, Chennai",
        "district": "Chennai",
        "state": "Tamil Nadu"
    }
    resp = requests.post(f"{BASE_URL}/projects/proposals", headers=headers_mp_chn, json=proposal_payload_2)
    assert resp.status_code == 201
    prop_2_data = resp.json().get("proposal") or resp.json().get("project")
    prop_2_id = prop_2_data["id"]

    # DA approves proposal 2
    resp = requests.post(f"{BASE_URL}/projects/{prop_2_id}/proposal-decision", headers=headers_da_chn, json={
        "decision": "APPROVE",
        "remarks": "Statutory feasibility confirmed. Administrative sanction AS/2026/TN/CHN/044 granted.",
        "assignedAgency": "Greater Chennai Corporation (Works Dept)"
    })
    assert resp.status_code == 200
    assert resp.json()["project"]["status"] == "Approved - Work Not Started"
    print(f"PASS: Proposal {prop_2_id} successfully approved to 'Approved - Work Not Started'.")

    print("\n--- 4. Flag Ownership & Resolution Lifecycle ---")
    # Fetch alerts for Chennai DA
    resp = requests.get(f"{BASE_URL}/alerts", headers=headers_da_chn)
    assert resp.status_code == 200
    chn_alerts = resp.json()
    assert len(chn_alerts) > 0
    print(f"Chennai DA has {len(chn_alerts)} alerts in jurisdiction.")

    # Pick a district-owned alert for lifecycle testing
    non_crit_alert = next((a for a in chn_alerts if a.get("ownerRoleId") == "district_authority" and a.get("status") in ("OPEN", "INSPECTION_ORDERED")), None)
    if not non_crit_alert:
        non_crit_alert = next((a for a in chn_alerts if a.get("status") in ("OPEN", "INSPECTION_ORDERED")), chn_alerts[0])
    alert_id = non_crit_alert["id"]
    print(f"Testing lifecycle on alert {alert_id} (Severity: {non_crit_alert['severity']}, Current Status: {non_crit_alert['status']})")

    # Step 4a: Transition OPEN -> INSPECTION_ORDERED
    resp = requests.patch(f"{BASE_URL}/alerts/{alert_id}/status", headers=headers_da_chn, json={
        "status": "INSPECTION_ORDERED",
        "notes": "Joint inspection team deployed with District Technical Examiner.",
        "inspectionOfficer": "Er. R. Sundaram (SE Vigilance)"
    })
    assert resp.status_code == 200, f"PATCH /alerts/{alert_id}/status failed: {resp.status_code} - {resp.text}"
    updated_alert = resp.json()
    assert updated_alert["status"] == "INSPECTION_ORDERED"
    print(f"PASS: Alert {alert_id} transitioned to INSPECTION_ORDERED.")

    # Step 4b: Transition INSPECTION_ORDERED -> RESOLVED_FALSE_POSITIVE
    resp = requests.patch(f"{BASE_URL}/alerts/{alert_id}/status", headers=headers_da_chn, json={
        "status": "RESOLVED_FALSE_POSITIVE",
        "notes": "Field inspection verified physical milestone and valid expenditure documentation."
    })
    assert resp.status_code == 200
    updated_alert = resp.json()
    assert updated_alert["status"] == "RESOLVED_FALSE_POSITIVE"
    print(f"PASS: Alert {alert_id} transitioned to RESOLVED_FALSE_POSITIVE.")

    print("\n--- 5. Confirmed-Critical Auto-Escalation & Single Ownership ---")
    # Find or pick an ownable CRITICAL alert
    crit_alert = next((a for a in chn_alerts if a["severity"] == "CRITICAL" and a.get("ownerRoleId") == "district_authority" and a.get("status") in ("OPEN", "INSPECTION_ORDERED")), None)
    if not crit_alert:
        # If all critical alerts are already escalated, pick the first CRITICAL alert and verify it's read-only
        crit_alert = next((a for a in chn_alerts if a["severity"] == "CRITICAL"), None)
    assert crit_alert is not None, "CRITICAL alert not found in Chennai dataset"
    crit_id = crit_alert["id"]
    print(f"Testing CRITICAL confirmed auto-escalation on {crit_id} (Severity: {crit_alert['severity']}, Status: {crit_alert['status']})")

    # Step 5a: DA marks CRITICAL alert as RESOLVED_CONFIRMED
    resp = requests.patch(f"{BASE_URL}/alerts/{crit_id}/status", headers=headers_da_chn, json={
        "status": "RESOLVED_CONFIRMED",
        "notes": "Severe billing irregularity and physical site delay confirmed upon on-site audit."
    })
    if resp.status_code == 200:
        escalated_alert = resp.json()
        assert escalated_alert["status"] == "ESCALATED", f"Expected ESCALATED, got {escalated_alert['status']}"
        assert escalated_alert["ownerRole"] == "State Nodal", f"Expected State Nodal owner, got {escalated_alert['ownerRole']}"
        assert escalated_alert["ownerRoleId"] == "state_nodal"
        assert escalated_alert["escalationReason"] == "Confirmed Critical Anomaly"
        print(f"PASS: CRITICAL alert {crit_id} auto-escalated to status='ESCALATED', ownerRole='State Nodal'.")
    else:
        # If already escalated, verify that 403 Forbidden is returned for DA
        assert resp.status_code == 403
        print(f"PASS: CRITICAL alert {crit_id} is already escalated to State Nodal and read-only for DA.")

    # Step 5b: Verify District Authority view is now READ-ONLY (403 on further PATCH)
    resp = requests.patch(f"{BASE_URL}/alerts/{crit_id}/status", headers=headers_da_chn, json={
        "status": "RESOLVED_FALSE_POSITIVE",
        "notes": "Attempting unauthorized status rollback."
    })
    assert resp.status_code == 403, f"Expected 403 Forbidden for DA editing escalated alert, got {resp.status_code}"
    print(f"PASS: District Authority receives 403 Forbidden attempting to edit escalated alert (Read-Only enforced).")

    # Step 5c: Verify State Nodal can view and own the escalated alert
    resp = requests.get(f"{BASE_URL}/alerts/{crit_id}", headers=headers_sna_tn)
    assert resp.status_code == 200
    sna_view_alert = resp.json()
    assert sna_view_alert["ownerRole"] == "State Nodal"
    assert sna_view_alert["status"] == "ESCALATED"
    print(f"PASS: State Nodal can see and own the escalated flag {crit_id}.")

    print("\n--- 6. 14-Day Inaction Timeout Logic ---")
    # Simulate an alert with timestamp backdated >14 days
    from app.services.alerts import alerts_service
    test_timeout_id = "ALT-2026-999"
    alerts_service._alerts_by_id[test_timeout_id] = {
        "id": test_timeout_id,
        "projectId": chn_projects[0]["id"],
        "projectName": chn_projects[0]["name"],
        "state": "Tamil Nadu",
        "district": "Chennai",
        "alertType": "COMPLIANCE_VIOLATION",
        "severity": "HIGH",
        "riskScore": 75,
        "title": "Stale Compliance Flag (Test)",
        "description": "Unresolved statutory discrepancy pending DA review.",
        "timestamp": "2026-07-01T10:00:00Z",
        "updatedAt": "2026-07-01T10:00:00Z",
        "recommendedAction": "Expedite inspection.",
        "sourceModule": "compliance",
        "status": "OPEN",
        "ownerRole": "District Authority",
        "ownerRoleId": "district_authority",
        "daysOpen": 0,
        "statusHistory": []
    }
    alerts_service._all_alerts.append(alerts_service._alerts_by_id[test_timeout_id])

    # Fetching alert triggers _apply_inaction_timeouts()
    timeout_alert = alerts_service.get_alert_by_id(test_timeout_id)
    assert timeout_alert is not None
    assert timeout_alert["status"] == "ESCALATED", f"Expected ESCALATED due to timeout, got {timeout_alert['status']}"
    assert timeout_alert["ownerRole"] == "State Nodal"
    assert timeout_alert["escalationReason"] == "Inaction Timeout"
    assert timeout_alert["daysOpen"] > 14
    print(f"PASS: Alert {test_timeout_id} open >14 days auto-escalated to State Nodal with 'Inaction Timeout'.")

    print("\n--- 7. Evidence & Invoice Review + Milestone Gated Tranche Release ---")
    # Target project in Chennai
    proj_target = chn_projects[0]["id"]

    # Step 7a: Attempt tranche release BEFORE evidence is accepted -> Must fail with 400
    resp = requests.post(f"{BASE_URL}/projects/{proj_target}/release-tranche", headers=headers_da_chn, json={
        "trancheLabel": "T2",
        "amount": 500000.0
    })
    assert resp.status_code == 400, f"Expected 400 for unapproved evidence tranche release, got {resp.status_code}"
    print(f"PASS: Tranche release blocked (HTTP 400) when evidence is pending / unapproved.")

    # Step 7b: Implementing Agency uploads evidence
    ev_upload_resp = requests.post(f"{BASE_URL}/projects/{proj_target}/evidence", headers=headers_da_chn, json={
        "milestoneRef": "M2",
        "milestoneStage": "Foundation & Superstructure",
        "description": "Completed column casting and stage 2 reinforcement inspection report.",
        "photoUrl": "https://setu.gov.in/evidence/chn_101_m2.jpg",
        "fileName": "site_photo_stage2.jpg"
    })
    assert ev_upload_resp.status_code == 201
    ev_item = ev_upload_resp.json()["evidence"]
    ev_id = ev_item["id"]
    print(f"Uploaded Evidence: {ev_id} (Status: {ev_item['reviewStatus']})")

    # Step 7c: DA Rejects evidence with resubmission required
    resp = requests.post(f"{BASE_URL}/projects/{proj_target}/evidence/{ev_id}/review", headers=headers_da_chn, json={
        "status": "REJECTED_RESUBMISSION_REQUIRED",
        "remarks": "Geotag watermark missing from uploaded column photos. Please resubmit with GPS coordinates."
    })
    assert resp.status_code == 200
    assert resp.json()["evidence"]["reviewStatus"] == "REJECTED_RESUBMISSION_REQUIRED"
    print(f"PASS: Evidence {ev_id} rejected with 'REJECTED_RESUBMISSION_REQUIRED'.")

    # Tranche release still blocked after rejection
    resp = requests.post(f"{BASE_URL}/projects/{proj_target}/release-tranche", headers=headers_da_chn)
    assert resp.status_code == 400
    print("PASS: Tranche release still blocked after evidence rejection.")

    # Step 7d: DA Formally Accepts evidence
    resp = requests.post(f"{BASE_URL}/projects/{proj_target}/evidence/{ev_id}/review", headers=headers_da_chn, json={
        "status": "ACCEPTED",
        "remarks": "GPS coordinates verified (13.0827° N, 80.2707° E). Concrete test cube strength certified."
    })
    assert resp.status_code == 200
    assert resp.json()["evidence"]["reviewStatus"] == "ACCEPTED"
    print(f"PASS: Evidence {ev_id} formally ACCEPTED by District Authority.")

    # Step 7e: Now Tranche Release succeeds
    resp = requests.post(f"{BASE_URL}/projects/{proj_target}/release-tranche", headers=headers_da_chn, json={
        "trancheLabel": "T2",
        "amount": 750000.0,
        "remarks": "Stage 2 milestone tranche disbursement cleared."
    })
    assert resp.status_code == 200
    release_res = resp.json()
    assert release_res["success"] is True
    print(f"PASS: Milestone-gated fund release succeeded: {release_res['message']}")

    print("\n--- 8. Asset Transfer Tracking on Completed Projects ---")
    # Step 8a: Attempt asset transfer on non-completed project -> Must fail with 400
    resp = requests.post(f"{BASE_URL}/projects/{proj_target}/asset-transfer", headers=headers_da_chn, json={
        "status": "TRANSFERRED",
        "userAgency": "Greater Chennai Corporation Ward 116"
    })
    # If project is not completed, it must return 400
    proj_status = chn_projects[0].get("status")
    proj_phys = chn_projects[0].get("physicalProgress", 0)
    if proj_status != "Completed" and proj_phys < 100:
        assert resp.status_code == 400, f"Expected 400 for non-completed project asset transfer, got {resp.status_code}"
        print("PASS: Asset transfer blocked with HTTP 400 on non-completed project.")

    # Step 8b: Find or complete a project via API
    completed_proj = next((p for p in chn_projects if p.get("status") == "Completed" or (p.get("physicalProgress") or 0) >= 100), None)
    if not completed_proj:
        # Update progress to 100% via progress update API
        prog_resp = requests.post(f"{BASE_URL}/projects/{proj_target}/progress", headers=headers_da_chn, json={
            "physicalProgress": 100,
            "financialProgress": 100.0,
            "stage": "Project Execution 100% Completed",
            "remarks": "Final construction milestone completed, ready for public handover."
        })
        assert prog_resp.status_code == 200
        completed_proj_id = proj_target
    else:
        completed_proj_id = completed_proj["id"]

    resp = requests.post(f"{BASE_URL}/projects/{completed_proj_id}/asset-transfer", headers=headers_da_chn, json={
        "status": "TRANSFERRED",
        "userAgency": "Greater Chennai Corporation (Parks & Playgrounds Division)",
        "handoverRef": "HO/CHN/2026/089",
        "remarks": "Facility commissioned and handed over to local body for public use."
    })
    assert resp.status_code == 200
    transfer_res = resp.json()
    assert transfer_res["success"] is True
    assert transfer_res["assetTransferDetails"]["status"] == "TRANSFERRED"
    assert transfer_res["project"]["assetTransferStatus"] == "TRANSFERRED"
    print(f"PASS: Asset transfer successfully recorded: {transfer_res['message']}")

    print("\n--- 9. Grouped Citizen Contradiction Reports ---")
    resp = requests.get(f"{BASE_URL}/alerts", headers=headers_da_chn)
    assert resp.status_code == 200
    alerts_feed = resp.json()
    citizen_alerts = [a for a in alerts_feed if a.get("alertType") == "CITIZEN_CONTRADICTION"]
    print(f"Found {len(citizen_alerts)} citizen contradiction alert items for Chennai DA.")
    # Check that each citizen alert represents a distinct project
    project_ids = [a["projectId"] for a in citizen_alerts]
    assert len(project_ids) == len(set(project_ids)), "Duplicate citizen alerts found for same project - grouping failed!"
    print("PASS: Citizen contradiction alerts are strictly grouped per project without duplicates.")

    print("\n=======================================================")
    print("ALL DISTRICT AUTHORITY BACKEND TEST SCENARIOS PASSED 100%!")
    print("=======================================================\n")

if __name__ == "__main__":
    run_tests()
