import requests
import json
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_URL = "http://127.0.0.1:8000"

def log(msg, ok=True):
    prefix = "[PASS]" if ok else "[FAIL]"
    print(f"{prefix} {msg}")

def run_tests():
    print("=== STARTING STATE NODAL AUTHORITY TEST SUITE ===")
    
    # 1. Login as Tamil Nadu State Nodal
    login_payload_tn = {
        "username": "ADM-SNA-TN-CHN-005",
        "password": "StateNodal#Pass2026"
    }
    r = requests.post(f"{BASE_URL}/auth/login", json=login_payload_tn)
    if r.status_code != 200:
        log(f"Login TN failed: {r.status_code} {r.text}", False)
        sys.exit(1)
    tn_data = r.json()
    tn_token = tn_data.get("token") or tn_data.get("access_token")
    log(f"Logged in as TN State Nodal: {tn_data.get('officialName')} (Scope: {tn_data.get('accessScope')}, State: {tn_data.get('state')})")
    
    # 2. Login as Karnataka State Nodal
    login_payload_ka = {
        "username": "ADM-SNA-KA-BLR-006",
        "password": "StateNodal#Pass2026"
    }
    r = requests.post(f"{BASE_URL}/auth/login", json=login_payload_ka)
    if r.status_code != 200:
        log(f"Login Karnataka failed: {r.status_code} {r.text}", False)
        sys.exit(1)
    ka_data = r.json()
    ka_token = ka_data.get("token") or ka_data.get("access_token")
    log(f"Logged in as KA State Nodal: {ka_data.get('officialName')} (Scope: {ka_data.get('accessScope')}, State: {ka_data.get('state')})")

    # 3. Verify Scoping for TN (Expected 23 projects, all Tamil Nadu)
    headers_tn = {"Authorization": f"Bearer {tn_token}"}
    r = requests.get(f"{BASE_URL}/projects", headers=headers_tn)
    if r.status_code != 200:
        log(f"GET /projects (TN) failed: {r.status_code}", False)
        sys.exit(1)
    tn_projects = r.json()
    if isinstance(tn_projects, dict):
        tn_projects = tn_projects.get("projects", [])
    
    log(f"TN State Nodal fetched {len(tn_projects)} projects (Expected: 23)")
    assert len(tn_projects) == 23, f"Expected 23 TN projects, got {len(tn_projects)}"
    assert all((p.get("state") or "").lower() == "tamil nadu" for p in tn_projects), "Cross-state leakage in TN!"
    tn_districts = set(p.get("district") for p in tn_projects)
    log(f"TN districts present: {tn_districts} (Expected: Chennai, Coimbatore, Madurai)")
    assert "Chennai" in tn_districts and "Coimbatore" in tn_districts and "Madurai" in tn_districts

    # 4. Verify Scoping for KA (Expected 12 projects, all Karnataka)
    headers_ka = {"Authorization": f"Bearer {ka_token}"}
    r = requests.get(f"{BASE_URL}/projects", headers=headers_ka)
    if r.status_code != 200:
        log(f"GET /projects (KA) failed: {r.status_code}", False)
        sys.exit(1)
    ka_projects = r.json()
    if isinstance(ka_projects, dict):
        ka_projects = ka_projects.get("projects", [])
    
    log(f"KA State Nodal fetched {len(ka_projects)} projects (Expected: 12)")
    assert len(ka_projects) == 12, f"Expected 12 KA projects, got {len(ka_projects)}"
    assert all((p.get("state") or "").lower() == "karnataka" for p in ka_projects), "Cross-state leakage in KA!"
    ka_districts = set(p.get("district") for p in ka_projects)
    log(f"KA districts present: {ka_districts} (Expected: Bengaluru Urban, Mysuru)")

    # 5. Verify Cross-State Jurisdiction Blocking (403 Forbidden)
    real_ka_id = ka_projects[0]["id"]
    real_tn_id = tn_projects[0]["id"]

    r_leak = requests.get(f"{BASE_URL}/projects/{real_ka_id}", headers=headers_tn)
    log(f"TN token accessing Karnataka project ({real_ka_id}): status={r_leak.status_code} (Expected: 403 Forbidden)")
    assert r_leak.status_code == 403, f"Expected 403, got {r_leak.status_code}"

    r_leak_ka = requests.get(f"{BASE_URL}/projects/{real_tn_id}", headers=headers_ka)
    log(f"KA token accessing TN project ({real_tn_id}): status={r_leak_ka.status_code} (Expected: 403 Forbidden)")
    assert r_leak_ka.status_code == 403, f"Expected 403, got {r_leak_ka.status_code}"

    # 6. Verify Chronic Non-Utilization endpoint
    r = requests.get(f"{BASE_URL}/trends/chronic-non-utilization", headers=headers_tn)
    if r.status_code != 200:
        log(f"GET /trends/chronic-non-utilization (TN) failed: {r.status_code}", False)
    else:
        c_data = r.json()
        items = c_data.get("flaggedProjects", [])
        log(f"TN Chronic Non-Utilization signals: {len(items)} (Total Unspent: ₹{c_data.get('totalCarriedForwardUnspent', 0):,})")
        assert len(items) >= 2, "Expected chronic signals in TN"
        assert all(item.get("skippedDistrictAuthority") is True for item in items)
        log("All chronic signals marked skippedDistrictAuthority=True per ROLES.md")

    # 7. Test Duplicate Adjudication
    adj_payload = {
        "projectAId": "PRJ-IND-TN-104",
        "projectBId": "PRJ-IND-TN-204",
        "legitimateProjectId": "PRJ-IND-TN-104",
        "action": "PROJECT_A_LEGITIMATE",
        "notes": "State Nodal formal review confirms Scheme A is valid tender."
    }
    r = requests.post(f"{BASE_URL}/projects/duplicates/adjudicate", headers=headers_tn, json=adj_payload)
    log(f"POST /projects/duplicates/adjudicate: status={r.status_code}")
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"

    # 8. Test Administrative Actions: Freeze Tranche
    freeze_payload = {
        "reason": "Single-Approval Split Tender Breach",
        "remarks": "Immediate freeze ordered by State Nodal pending CAG audit observation."
    }
    r = requests.post(f"{BASE_URL}/projects/PRJ-IND-TN-104/freeze-tranche", headers=headers_tn, json=freeze_payload)
    log(f"POST /projects/PRJ-IND-TN-104/freeze-tranche: status={r.status_code}")
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"

    # 9. Test Administrative Actions: Issue Formal Query
    query_payload = {
        "queryText": "Explain 18-month execution delay and non-submission of Stage-II UC.",
        "deadlineDays": 7,
        "targetRole": "District Authority (Chennai)"
    }
    r = requests.post(f"{BASE_URL}/projects/PRJ-IND-TN-104/issue-query", headers=headers_tn, json=query_payload)
    log(f"POST /projects/PRJ-IND-TN-104/issue-query: status={r.status_code}")
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"

    # 10. Test Administrative Actions: Flag District for Review
    flag_payload = {
        "district": "Chennai",
        "reason": "Repeated Inaction-Timeouts on Flagged Schemes",
        "directiveNotes": "District Collectorate summoned for quarterly state performance hearing."
    }
    r = requests.post(f"{BASE_URL}/projects/districts/Chennai/flag-review", headers=headers_tn, json=flag_payload)
    log(f"POST /projects/districts/Chennai/flag-review: status={r.status_code}")
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"

    # 11. Test Administrative Actions: Forward Dossier to MoSPI
    fwd_payload = {
        "summary": "State-wide summary of recurring fund stagnation and cross-district duplicate tenders.",
        "recommendedSanction": "Direct formal CAG / Auditor audit observation"
    }
    r = requests.post(f"{BASE_URL}/projects/PRJ-IND-TN-104/forward-mospi", headers=headers_tn, json=fwd_payload)
    log(f"POST /projects/PRJ-IND-TN-104/forward-mospi: status={r.status_code}")
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"

    # 12. Test State Nodal Alert Escalation / Resolution
    # Get state alerts
    r = requests.get(f"{BASE_URL}/alerts", headers=headers_tn)
    alerts = r.json()
    if isinstance(alerts, dict):
        alerts = alerts.get("alerts", [])
    state_alerts = [a for a in alerts if (a.get("state") or "").lower() == "tamil nadu"]
    log(f"TN Alerts Count: {len(state_alerts)}")
    
    if state_alerts:
        first_alert = state_alerts[0]
        alert_id = first_alert.get("id")
        res_payload = {
            "status": "RESOLVED_CONFIRMED",
            "notes": "Resolved by State Nodal Authority following administrative recovery order."
        }
        r = requests.post(f"{BASE_URL}/alerts/{alert_id}/resolution", headers=headers_tn, json=res_payload)
        log(f"POST /alerts/{alert_id}/resolution (RESOLVED_CONFIRMED): status={r.status_code}")
        assert r.status_code == 200

    print("=== ALL STATE NODAL BACKEND TESTS PASSED SUCCESSFULLY! ===")

if __name__ == "__main__":
    run_tests()
