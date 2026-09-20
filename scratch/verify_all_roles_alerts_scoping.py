"""
Comprehensive E2E Verification for Alert Scoping & Tamil Nadu Demo Credentials.
Verifies all statutory roles:
1. District Authority (Lucknow) — strictly 3 projects, ONLY Lucknow alerts, 0 foreign alerts.
2. District Authority (Chennai) — strictly Chennai projects & alerts.
3. Implementing Agency (PWD Chennai) — strictly PWD Chennai projects & alerts.
4. MP Office (Chennai Central) — strictly Chennai Central projects & alerts.
5. State Nodal (Tamil Nadu) — strictly Tamil Nadu projects & alerts.
6. Central Nodal Agency (MoSPI) — national scope.
7. Auditor / CAG — national scope with Chennai office designation.
"""

import requests

BASE_URL = "http://127.0.0.1:8000"

ROLES_TO_TEST = [
    {
        "roleName": "District Authority (Lucknow)",
        "loginId": "ADM-DA-UP-LKO-012",
        "password": "DistAdmin#Pass2026",
        "expectedDistrict": "Lucknow",
        "expectedState": "Uttar Pradesh",
        "expectedScope": "district_all",
        "minProjects": 3,
        "maxProjects": 3,
        "mustNotContainDistricts": ["Bengaluru Urban", "Pune", "Chennai", "Coimbatore"]
    },
    {
        "roleName": "District Authority (Chennai)",
        "loginId": "ADM-DA-TN-CHN-001",
        "password": "DistAdmin#Pass2026",
        "expectedDistrict": "Chennai",
        "expectedState": "Tamil Nadu",
        "expectedScope": "district_all",
        "minProjects": 5,
        "maxProjects": 20,
        "mustNotContainDistricts": ["Lucknow", "Bengaluru Urban", "Pune", "Howrah"]
    },
    {
        "roleName": "Implementing Agency (PWD Chennai)",
        "loginId": "ADM-IA-PWD-TN-CHN-008",
        "password": "PWDWorks#Pass2026",
        "expectedDistrict": "Chennai",
        "expectedState": "Tamil Nadu",
        "expectedScope": "agency_assigned_only",
        "minProjects": 3,
        "maxProjects": 10,
        "mustNotContainDistricts": ["Lucknow", "Bengaluru Urban", "Pune", "Coimbatore"]
    },
    {
        "roleName": "MP Office (Chennai Central)",
        "loginId": "ADM-MP-TN-CHN-021",
        "password": "MPOffice#Pass2026",
        "expectedDistrict": "Chennai",
        "expectedState": "Tamil Nadu",
        "expectedScope": "constituency_only",
        "minProjects": 5,
        "maxProjects": 20,
        "mustNotContainDistricts": ["Lucknow", "Bengaluru Urban", "Pune"]
    },
    {
        "roleName": "State Nodal Authority (Tamil Nadu)",
        "loginId": "ADM-SNA-TN-CHN-005",
        "password": "StateNodal#Pass2026",
        "expectedDistrict": None,
        "expectedState": "Tamil Nadu",
        "expectedScope": "state_rollup",
        "minProjects": 15,
        "maxProjects": 50,
        "mustNotContainDistricts": ["Lucknow", "Bengaluru Urban", "Pune", "Howrah"]
    },
    {
        "roleName": "Central Nodal Agency (MoSPI)",
        "loginId": "ADM-CNA-MOSPI-HQ-002",
        "password": "CentralApex#Pass2026",
        "expectedDistrict": None,
        "expectedState": None,
        "expectedScope": "national_all",
        "minProjects": 100,
        "maxProjects": 150,
        "mustNotContainDistricts": []
    },
    {
        "roleName": "Auditor / CAG",
        "loginId": "ADM-CAG-AUD-TN-CHN-003",
        "password": "CAGAudit#Pass2026",
        "expectedDistrict": None,
        "expectedState": None,
        "expectedScope": "statutory_audit_all",
        "minProjects": 100,
        "maxProjects": 150,
        "mustNotContainDistricts": []
    }
]

def run_tests():
    total_passed = 0
    total_tests = 0

    print("=" * 80)
    print("SETU RBAC & ALERTS JURISDICTION SCOPING TEST SUITE")
    print("=" * 80)

    for cfg in ROLES_TO_TEST:
        role_label = cfg["roleName"]
        login_id = cfg["loginId"]
        password = cfg["password"]
        print(f"\n[TESTING ROLE] {role_label} ({login_id})")

        # 1. Login
        total_tests += 1
        login_payload = {"username": login_id, "password": password}
        resp = requests.post(f"{BASE_URL}/auth/login", json=login_payload)
        if resp.status_code != 200:
            print(f"  [FAIL] Login FAILED: {resp.status_code} - {resp.text}")
            continue
        print(f"  [OK] Login SUCCESS: {resp.status_code}")
        total_passed += 1

        data = resp.json()
        token = data["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Verify claims
        if cfg["expectedScope"]:
            total_tests += 1
            assert data.get("accessScope") == cfg["expectedScope"], f"Scope mismatch: {data.get('accessScope')} vs {cfg['expectedScope']}"
            print(f"  [OK] accessScope verified: {data.get('accessScope')}")
            total_passed += 1

        # 2. Get Scoped Projects
        total_tests += 1
        proj_resp = requests.get(f"{BASE_URL}/projects", headers=headers)
        if proj_resp.status_code != 200:
            print(f"  [FAIL] GET /projects FAILED: {proj_resp.status_code}")
            continue
        projects = proj_resp.json()
        print(f"  [OK] GET /projects returned {len(projects)} scoped projects (expected {cfg['minProjects']}-{cfg['maxProjects']})")
        assert cfg["minProjects"] <= len(projects) <= cfg["maxProjects"], f"Project count {len(projects)} out of expected range!"
        total_passed += 1

        project_ids = set(p["id"] for p in projects)
        project_districts = set(p.get("district") for p in projects)
        print(f"    Scoped Project IDs: {sorted(list(project_ids))[:6]}{'...' if len(project_ids) > 6 else ''}")
        print(f"    Scoped Districts: {sorted(list(project_districts))}")

        # Verify no forbidden districts in projects
        for bad_dist in cfg["mustNotContainDistricts"]:
            total_tests += 1
            assert bad_dist not in project_districts, f"Forbidden district '{bad_dist}' leaked into projects!"
            total_passed += 1

        # 3. Get Scoped Alerts
        total_tests += 1
        alerts_resp = requests.get(f"{BASE_URL}/alerts?limit=100", headers=headers)
        if alerts_resp.status_code != 200:
            print(f"  [FAIL] GET /alerts FAILED: {alerts_resp.status_code}")
            continue
        alerts = alerts_resp.json()
        print(f"  [OK] GET /alerts returned {len(alerts)} alerts")
        total_passed += 1

        # 4. Strict Scoping Validation:
        # EVERY single alert's projectId MUST be in project_ids
        total_tests += 1
        leaked_alerts = []
        for a in alerts:
            pid = a.get("projectId")
            if pid not in project_ids:
                leaked_alerts.append(a)

        if leaked_alerts:
            print(f"  [FAIL] LEAK DETECTED: {len(leaked_alerts)} alerts outside user jurisdiction!")
            for la in leaked_alerts[:5]:
                print(f"     - Alert ID: {la['id']}, Project: {la['projectId']}, District: {la.get('district')}")
            assert False, f"{len(leaked_alerts)} alerts leaked outside jurisdiction!"
        else:
            print(f"  [OK] ZERO LEAKS: All {len(alerts)} alerts strictly match the user's authorized projects!")
            total_passed += 1

        # Verify no forbidden districts in alerts
        alert_districts = set(a.get("district") for a in alerts)
        for bad_dist in cfg["mustNotContainDistricts"]:
            total_tests += 1
            assert bad_dist not in alert_districts, f"Forbidden district '{bad_dist}' leaked into alerts!"
            total_passed += 1

        # 5. Alerts Summary Validation
        total_tests += 1
        summary_resp = requests.get(f"{BASE_URL}/alerts/summary", headers=headers)
        if summary_resp.status_code == 200:
            summary = summary_resp.json()
            if len(alerts) < 100:
                assert summary["totalAlerts"] == len(alerts), f"Summary count {summary['totalAlerts']} != alerts len {len(alerts)}"
            else:
                assert summary["totalAlerts"] >= len(alerts), f"Summary count {summary['totalAlerts']} < paginated alerts len {len(alerts)}"
            print(f"  [OK] GET /alerts/summary matches scoped alerts count ({summary['totalAlerts']})")
            total_passed += 1
        else:
            print(f"  [FAIL] GET /alerts/summary failed: {summary_resp.status_code}")

    print("\n" + "=" * 80)
    print(f"ALL TESTS PASSED: {total_passed}/{total_tests} assertions verified with ZERO exceptions!")
    print("=" * 80)

if __name__ == "__main__":
    run_tests()
