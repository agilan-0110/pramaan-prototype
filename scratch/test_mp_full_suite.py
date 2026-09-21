import requests
import json
import sys

BASE_URL = "http://127.0.0.1:8000"

def run_tests():
    print("=================================================================")
    print("SETU MP OFFICE (CONSTITUENCY & NOMINATED) COMPREHENSIVE TEST SUITE")
    print("=================================================================\n")

    # 1. Authenticate Constituency MP (Chennai Central)
    print("Step 1: Authenticating Constituency MP (ADM-MP-TN-CHN-021)...")
    resp = requests.post(f"{BASE_URL}/auth/login", json={
        "username": "ADM-MP-TN-CHN-021",
        "password": "MPOffice#Pass2026",
        "role": "MP Office"
    })
    assert resp.status_code == 200, f"Constituency MP Login failed: {resp.status_code} {resp.text}"
    const_mp_data = resp.json()
    const_mp_token = const_mp_data["access_token"]
    assert const_mp_data["role"] == "MP Office"
    assert const_mp_data.get("mpType") == "CONSTITUENCY_MP"
    assert const_mp_data.get("constituency") == "Chennai Central"
    print(f"  [PASS] Constituency MP login successful. Official: {const_mp_data.get('officialName')}, Scope: {const_mp_data.get('constituency')}\n")

    # 2. Authenticate Nominated MP (Multi-State Chosen Districts)
    print("Step 2: Authenticating Nominated MP (ADM-MP-NOM-IND-022)...")
    resp = requests.post(f"{BASE_URL}/auth/login", json={
        "username": "ADM-MP-NOM-IND-022",
        "password": "MPOffice#Pass2026",
        "role": "MP Office"
    })
    assert resp.status_code == 200, f"Nominated MP Login failed: {resp.status_code} {resp.text}"
    nom_mp_data = resp.json()
    nom_mp_token = nom_mp_data["access_token"]
    assert nom_mp_data["role"] == "MP Office"
    assert nom_mp_data.get("mpType") == "NOMINATED_MP"
    chosen_districts = nom_mp_data.get("chosenDistricts", [])
    assert len(chosen_districts) >= 3, f"Expected at least 3 chosen districts, got {chosen_districts}"
    print(f"  [PASS] Nominated MP login successful. Official: {nom_mp_data.get('officialName')}, mpType: {nom_mp_data.get('mpType')}, Chosen: {chosen_districts}\n")

    # 3. Authenticate District Authority (Chennai) for scoping comparison
    print("Step 3: Authenticating District Authority (ADM-DA-TN-CHN-001)...")
    resp = requests.post(f"{BASE_URL}/auth/login", json={
        "username": "ADM-DA-TN-CHN-001",
        "password": "DistAdmin#Pass2026",
        "role": "District Authority"
    })
    assert resp.status_code == 200, f"District Authority Login failed: {resp.status_code} {resp.text}"
    da_token = resp.json()["access_token"]
    da_projects = requests.get(f"{BASE_URL}/projects", headers={"Authorization": f"Bearer {da_token}"}).json()
    da_count = len(da_projects)
    print(f"  [PASS] District Authority sees {da_count} total works in Chennai district.\n")

    # 4. Verify Constituency MP Scoping (FEWER than District Authority)
    print("Step 4: Verifying Constituency MP Narrower Scoping...")
    const_headers = {"Authorization": f"Bearer {const_mp_token}"}
    resp = requests.get(f"{BASE_URL}/projects", headers=const_headers)
    assert resp.status_code == 200
    const_projects = resp.json()
    const_count = len(const_projects)
    print(f"  Constituency MP sees {const_count} works in Chennai Central constituency.")
    assert const_count < da_count, f"Constituency MP count ({const_count}) must be strictly narrower than District Authority total ({da_count})"
    for p in const_projects:
        assert p.get("constituency") == "Chennai Central" or p.get("mpId") == "MP-LS-TN-CHN-C", f"Project {p['id']} outside Chennai Central!"
    print("  [PASS] Constituency MP scoping strictly confirmed: all projects scoped to own constituency, narrower than full district.\n")

    # 5. Verify Nominated MP Scoping (Across Multiple States)
    print("Step 5: Verifying Nominated MP Multi-State Scoping...")
    nom_headers = {"Authorization": f"Bearer {nom_mp_token}"}
    resp = requests.get(f"{BASE_URL}/projects", headers=nom_headers)
    assert resp.status_code == 200
    nom_projects = resp.json()
    nom_count = len(nom_projects)
    states_covered = set(p.get("state") for p in nom_projects)
    districts_covered = set(p.get("district") for p in nom_projects)
    print(f"  Nominated MP sees {nom_count} works across states: {states_covered} and districts: {districts_covered}")
    assert len(states_covered) >= 2, f"Nominated MP should span multiple states, got {states_covered}"
    for p in nom_projects:
        assert p.get("district") in chosen_districts or p.get("mpId") == nom_mp_data.get("mpId"), f"Project {p['id']} ({p.get('district')}) outside chosen districts {chosen_districts}"
    print("  [PASS] Nominated MP multi-state scoping strictly confirmed.\n")

    # 6. Verify Data Sanitization & Passive Flag Badges
    print("Step 6: Verifying Data Sanitization & Passive Flag Badges...")
    sample_proj = const_projects[0]
    assert "shapValues" not in sample_proj, "shapValues must be redacted for MP Office!"
    assert "complianceFlags" not in sample_proj, "complianceFlags must be redacted for MP Office!"
    assert "citizenReports" not in sample_proj, "citizenReports must be redacted for MP Office!"
    assert "alerts" not in sample_proj, "alerts must be redacted for MP Office!"
    assert "flagPresent" in sample_proj, "flagPresent field must be present!"
    assert isinstance(sample_proj["flagPresent"], bool), "flagPresent must be a boolean!"
    assert "flagStatus" in sample_proj, "flagStatus field must be present!"
    print(f"  Sample project {sample_proj['id']}: riskScore={sample_proj.get('riskScore')}, flagPresent={sample_proj.get('flagPresent')}, flagStatus={sample_proj.get('flagStatus')}")
    print(f"  Plain language explanation: '{sample_proj.get('plainLanguageExplanation')}'")
    print("  [PASS] Sanitization confirmed: zero raw SHAP/alert details, plain language explanation and passive flag badge preserved.\n")

    # 7. Verify RBAC 403 Forbidden Access Controls
    print("Step 7: Verifying RBAC Access Controls & 403 Forbidden Enforcement...")
    
    # 7a. Constituency MP accessing out-of-constituency project (e.g. Bengaluru work PRJ-IND-KA-001)
    resp = requests.get(f"{BASE_URL}/projects/PRJ-IND-KA-001", headers=const_headers)
    print(f"  Constituency MP -> GET /projects/PRJ-IND-KA-001: Status {resp.status_code}")
    assert resp.status_code == 403, f"Expected 403 Forbidden for out-of-constituency project, got {resp.status_code}"

    # 7b. Nominated MP accessing out-of-chosen-district project (e.g. Madurai work PRJ-IND-2015)
    resp = requests.get(f"{BASE_URL}/projects/PRJ-IND-2015", headers=nom_headers)
    print(f"  Nominated MP -> GET /projects/PRJ-IND-2015: Status {resp.status_code}")
    assert resp.status_code == 403, f"Expected 403 Forbidden for out-of-chosen-district project, got {resp.status_code}"

    # 7c. MP Office accessing raw alert details
    resp = requests.get(f"{BASE_URL}/alerts/ALT-2026-001", headers=const_headers)
    print(f"  MP Office -> GET /alerts/ALT-2026-001: Status {resp.status_code}")
    assert resp.status_code == 403, f"Expected 403 Forbidden for alert detail, got {resp.status_code}"

    # 7d. MP Office accessing analytical engines
    resp = requests.get(f"{BASE_URL}/projects/risk/summary", headers=const_headers)
    print(f"  MP Office -> GET /projects/risk/summary: Status {resp.status_code}")
    assert resp.status_code == 403, f"Expected 403 Forbidden for risk summary, got {resp.status_code}"

    resp = requests.get(f"{BASE_URL}/projects/compliance/violations", headers=const_headers)
    print(f"  MP Office -> GET /projects/compliance/violations: Status {resp.status_code}")
    assert resp.status_code == 403, f"Expected 403 Forbidden for compliance violations, got {resp.status_code}"

    resp = requests.get(f"{BASE_URL}/projects/duplicates/pairs", headers=const_headers)
    print(f"  MP Office -> GET /projects/duplicates/pairs: Status {resp.status_code}")
    assert resp.status_code == 403, f"Expected 403 Forbidden for duplicate pairs, got {resp.status_code}"

    resp = requests.get(f"{BASE_URL}/projects/citizen-reports/all", headers=const_headers)
    print(f"  MP Office -> GET /projects/citizen-reports/all: Status {resp.status_code}")
    assert resp.status_code == 403, f"Expected 403 Forbidden for citizen contradiction queue, got {resp.status_code}"

    # 7e. MP Office alerts list returns 0 alerts
    resp = requests.get(f"{BASE_URL}/alerts", headers=const_headers)
    assert resp.status_code == 200
    assert len(resp.json()) == 0, f"MP Office /alerts must return 0 items, got {len(resp.json())}"
    print("  MP Office -> GET /alerts: returned 0 alerts (strictly excluded from live audit feed)")
    print("  [PASS] All RBAC 403 Forbidden barriers verified successfully.\n")

    # 8. Verify Project Proposal Submission Workflow
    print("Step 8: Verifying Project Proposal Submission Workflow...")
    
    # 8a. Constituency MP submits proposal
    prop_payload_const = {
        "title": "Modern Primary Health Diagnostic Wing, Triplicane",
        "workDescription": "Establishment of digital diagnostic wing and pathology equipment for maternal healthcare.",
        "category": "Health",
        "estimatedCost": 3500000.0,
        "location": "Ward 116, Triplicane, Chennai Central"
    }
    resp = requests.post(f"{BASE_URL}/projects/proposals", json=prop_payload_const, headers=const_headers)
    assert resp.status_code == 201, f"Proposal submission failed: {resp.status_code} {resp.text}"
    const_prop_res = resp.json()
    const_prop_id = const_prop_res["project"]["id"]
    print(f"  [PASS] Constituency MP submitted proposal '{const_prop_id}' in {const_prop_res['project']['constituency']}")
    assert const_prop_res["project"]["status"] == "Proposed - Under Scrutiny"
    assert const_prop_res["project"]["constituency"] == "Chennai Central"

    # 8b. Nominated MP submits proposal in another district (Pune)
    prop_payload_nom = {
        "title": "Community Fluoride Water Treatment Facility",
        "workDescription": "Installation of high-capacity reverse osmosis filtration system for peri-urban clusters.",
        "category": "Water",
        "estimatedCost": 4200000.0,
        "location": "Sector 14, Haveli, Pune",
        "district": "Pune",
        "state": "Maharashtra"
    }
    resp = requests.post(f"{BASE_URL}/projects/proposals", json=prop_payload_nom, headers=nom_headers)
    assert resp.status_code == 201, f"Nominated MP proposal submission failed: {resp.status_code} {resp.text}"
    nom_prop_res = resp.json()
    nom_prop_id = nom_prop_res["project"]["id"]
    print(f"  [PASS] Nominated MP submitted proposal '{nom_prop_id}' in {nom_prop_res['project']['district']}, {nom_prop_res['project']['state']}")
    assert nom_prop_res["project"]["district"] == "Pune"
    assert nom_prop_res["project"]["state"] == "Maharashtra"
    assert nom_prop_res["project"]["status"] == "Proposed - Under Scrutiny"

    # 8c. Verify District Authority sees the newly submitted proposal
    da_projects_after = requests.get(f"{BASE_URL}/projects", headers={"Authorization": f"Bearer {da_token}"}).json()
    found_in_da = any(p["id"] == const_prop_id for p in da_projects_after)
    assert found_in_da, f"Proposal {const_prop_id} not visible to District Authority!"
    print(f"  [PASS] Proposal {const_prop_id} successfully queued for District Authority administrative scrutiny.\n")

    print("=================================================================")
    print("ALL MP OFFICE TESTS (CONSTITUENCY & NOMINATED) PASSED PERFECTLY!")
    print("=================================================================")

if __name__ == "__main__":
    run_tests()
