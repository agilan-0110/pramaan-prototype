"""
Comprehensive E2E Test for Auditor / CAG Backend Services.

Tests:
1. Authentication with Auditor/CAG credentials (ADM-CAG-AUD-TN-CHN-003).
2. Unrestricted national scope (124 projects, all states).
3. Resolution History & Status Trail with inaction-timeouts flagged.
4. Unresolved on Completion view surfacing completed projects with open flags.
5. Formal Observations & Audit Override Mechanism:
   - Reopens a RESOLVED_FALSE_POSITIVE flag with CRITICAL observation.
   - Cross-role verification: District Authority logs in and sees reopened flag in their queue.
   - Audit Override Log records permanent before/after status trail.
"""

import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def run_tests():
    print("--- 1. AUTHENTICATING AS AUDITOR / CAG ---")
    login_resp = requests.post(f"{BASE_URL}/auth/login", json={
        "username": "ADM-CAG-AUD-TN-CHN-003",
        "password": "CAGAudit#Pass2026",
    })
    assert login_resp.status_code == 200, f"Auditor login failed: {login_resp.text}"
    aud_token = login_resp.json()["access_token"]
    aud_headers = {"Authorization": f"Bearer {aud_token}", "Content-Type": "application/json"}
    print(f"Logged in as: {login_resp.json().get('officialName')}, role: {login_resp.json().get('role')}, scope: {login_resp.json().get('accessScope')}")

    print("\n--- 2. VERIFYING UNRESTRICTED NATIONAL SCOPE ---")
    projects_resp = requests.get(f"{BASE_URL}/projects", headers=aud_headers)
    assert projects_resp.status_code == 200
    projects = projects_resp.json()
    print(f"National projects count: {len(projects)}")
    assert len(projects) == 124, f"Expected 124 national projects, found {len(projects)}"
    states = set(p["state"] for p in projects)
    print(f"States represented ({len(states)} States/UTs): {states}")
    assert len(states) >= 15, f"Expected multi-state national scope, found {len(states)} states"

    print("\n--- 3. VERIFYING UNRESOLVED ON COMPLETION ---")
    unresolved_resp = requests.get(f"{BASE_URL}/audit/unresolved-on-completion", headers=aud_headers)
    assert unresolved_resp.status_code == 200
    unresolved_data = unresolved_resp.json()
    print(f"Unresolved on completion records: {len(unresolved_data)}")
    assert len(unresolved_data) > 0, "Must find completed projects with unresolved flags"
    for item in unresolved_data:
        p = item["project"]
        print(f"  - Completed Project: {p['id']} ({p['name'][:40]}...) in {p['district']}, {p['state']} -> {item['unresolvedCount']} open flags (Highest: {item['highestSeverity']})")

    print("\n--- 4. VERIFYING RESOLUTION HISTORY & INACTION TIMEOUT TRAIL ---")
    history_resp = requests.get(f"{BASE_URL}/audit/resolution-history", headers=aud_headers)
    assert history_resp.status_code == 200
    history_data = history_resp.json()
    print(f"Total history entries: {len(history_data)}")
    timeout_findings = [h for h in history_data if h["isTimeoutFinding"]]
    print(f"Inaction-timeout findings: {len(timeout_findings)}")
    assert len(timeout_findings) > 0, "Must find inaction-timeout findings"
    for tf in timeout_findings[:2]:
        print(f"  - Timeout finding on {tf['alertId']} ({tf['projectId']} in {tf['district']}): {tf['daysOpen']} days open, escalation: {tf['escalationReason']}")

    print("\n--- 5. TESTING AUDIT OVERRIDE: REOPEN RESOLVED_FALSE_POSITIVE FLAG ---")
    # Check ALT-2026-008 initial status
    alert_resp = requests.get(f"{BASE_URL}/alerts/ALT-2026-008", headers=aud_headers)
    assert alert_resp.status_code == 200
    initial_alert = alert_resp.json()
    print(f"Initial alert ALT-2026-008 status: {initial_alert['status']}, owner: {initial_alert['ownerRole']}")
    assert initial_alert["status"] == "RESOLVED_FALSE_POSITIVE", f"Expected RESOLVED_FALSE_POSITIVE, got {initial_alert['status']}"

    # Attach CRITICAL observation with Reopen Flag
    obs_payload = {
        "projectId": "PRJ-IND-2013",
        "severity": "CRITICAL",
        "observationText": "Statutory audit field sample contradicts District Authority closure: physical Measurement Book entry #44 indicates uncertified expenditure variance of ₹8.4L. Reopened and remanded to District Authority for formal re-audit.",
        "targetAlertId": "ALT-2026-008",
        "reopenFlag": True,
        "reassignToRole": "district_authority",
        "auditorWing": "Auditor / CAG Central Audit Wing",
    }
    obs_resp = requests.post(f"{BASE_URL}/audit/observations", headers=aud_headers, json=obs_payload)
    assert obs_resp.status_code == 200, f"Failed to attach observation: {obs_resp.text}"
    obs_data = obs_resp.json()
    print(f"Attached Observation: {obs_data['id']}, reopenedFlag: {obs_data['reopenedFlag']}, reassignedTo: {obs_data['reassignedTo']}")
    assert obs_data["reopenedFlag"] is True

    # Verify live alert status in alerts service
    reopened_alert_resp = requests.get(f"{BASE_URL}/alerts/ALT-2026-008", headers=aud_headers)
    reopened_alert = reopened_alert_resp.json()
    print(f"Reopened alert ALT-2026-008 status: {reopened_alert['status']}, owner: {reopened_alert['ownerRole']}")
    assert reopened_alert["status"] == "OPEN", f"Expected OPEN, got {reopened_alert['status']}"
    assert reopened_alert["ownerRoleId"] == "district_authority"

    print("\n--- 6. CROSS-ROLE VERIFICATION: DISTRICT AUTHORITY SEES REOPENED FLAG ---")
    da_login = requests.post(f"{BASE_URL}/auth/login", json={
        "username": "ADM-DA-TN-CHN-001",
        "password": "DistAdmin#Pass2026",
    })
    assert da_login.status_code == 200
    da_token = da_login.json()["access_token"]
    da_headers = {"Authorization": f"Bearer {da_token}", "Content-Type": "application/json"}

    da_alerts_resp = requests.get(f"{BASE_URL}/alerts?district=Chennai", headers=da_headers)
    assert da_alerts_resp.status_code == 200
    da_alerts = da_alerts_resp.json()
    reopened_in_da = next((a for a in da_alerts if a["id"] == "ALT-2026-008"), None)
    assert reopened_in_da is not None, "Reopened alert must be visible in District Authority queue!"
    print(f"District Authority Queue contains reopened alert ALT-2026-008! Status: {reopened_in_da['status']}, owner: {reopened_in_da['ownerRole']}")
    assert reopened_in_da["status"] == "OPEN"

    print("\n--- 7. VERIFYING AUDIT OVERRIDE LOG ---")
    override_resp = requests.get(f"{BASE_URL}/audit/override-log", headers=aud_headers)
    assert override_resp.status_code == 200
    override_log = override_resp.json()
    print(f"Total override log entries: {len(override_log)}")
    assert len(override_log) >= 2
    latest_override = override_log[0]
    print(f"Latest Override: {latest_override['id']} on {latest_override['alertId']}: {latest_override['previousStatus']} -> {latest_override['newStatus']}, reassigned to {latest_override['reassignedOwner']}")
    assert latest_override["alertId"] == "ALT-2026-008"
    assert latest_override["previousStatus"] == "RESOLVED_FALSE_POSITIVE"
    assert latest_override["newStatus"] == "OPEN"

    print("\n=== ALL AUDITOR / CAG BACKEND TESTS PASSED 100% ===")

if __name__ == "__main__":
    run_tests()
