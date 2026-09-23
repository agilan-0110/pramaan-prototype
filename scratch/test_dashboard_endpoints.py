"""
Verification test for SETU Role-Scoped Dashboard Statistics Endpoints.
Tests each endpoint against response schema, RBAC rules, and data scoping.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

from starlette.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_district_authority_endpoint():
    print("\n--- Testing District Authority Dashboard ---")
    # 1. Login as District Authority
    res_login = client.post("/auth/login", json={"username": "ADM-DA-TN-CHN-001", "password": "DistAdmin#Pass2026"})
    assert res_login.status_code == 200, f"DA Login failed: {res_login.text}"
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Call GET /dashboard/district-authority
    res = client.get("/dashboard/district-authority", headers=headers)
    assert res.status_code == 200, f"DA Dashboard failed: {res.text}"
    data = res.json()
    print("DA Response keys:", list(data.keys()))
    print("DA Summary:", data["summary"])

    # Verify response schema
    assert "summary" in data
    assert "totalProjects" in data["summary"]
    assert "activeAlerts" in data["summary"]
    assert "criticalAlerts" in data["summary"]
    assert "fundsUtilizedPct" in data["summary"]
    assert "alertsBySeverity" in data
    assert "flagsByStatus" in data
    assert "trendOverTime" in data
    assert "utilizationByCategory" in data
    assert data.get("isSimulated") is True

    # District Authority must have district scoped projects (Chennai has 23 projects in TN tier)
    assert data["summary"]["totalProjects"] > 0
    print(f"[PASS] District Authority Dashboard: {data['summary']['totalProjects']} projects, {data['summary']['activeAlerts']} active alerts, {data['summary']['fundsUtilizedPct']}% utilized.")

def test_state_nodal_endpoint():
    print("\n--- Testing State Nodal Authority Dashboard ---")
    res_login = client.post("/auth/login", json={"username": "ADM-SNA-TN-CHN-005", "password": "StateNodal#Pass2026"})
    assert res_login.status_code == 200, f"SNA Login failed: {res_login.text}"
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/dashboard/state-nodal", headers=headers)
    assert res.status_code == 200, f"SNA Dashboard failed: {res.text}"
    data = res.json()
    print("SNA Response keys:", list(data.keys()))
    print("SNA Summary:", data["summary"])

    assert "summary" in data
    assert "totalProjects" in data["summary"]
    assert "activeAlerts" in data["summary"]
    assert "criticalAlerts" in data["summary"]
    assert "fundsUtilizedPct" in data["summary"]
    assert "alertsBySeverity" in data
    assert "flagsByStatus" in data
    assert "trendOverTime" in data
    assert "utilizationByCategory" in data
    assert data.get("isSimulated") is True

    # State Nodal has statewide projects (Tamil Nadu has 23 projects)
    assert data["summary"]["totalProjects"] >= 23
    print(f"[PASS] State Nodal Dashboard: {data['summary']['totalProjects']} projects, {data['summary']['activeAlerts']} alerts, {data['summary']['fundsUtilizedPct']}% utilized.")

def test_central_nodal_endpoint():
    print("\n--- Testing Central Nodal Agency (MoSPI) Dashboard ---")
    res_login = client.post("/auth/login", json={"username": "ADM-CNA-MOSPI-HQ-002", "password": "CentralApex#Pass2026"})
    assert res_login.status_code == 200, f"MoSPI Login failed: {res_login.text}"
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/dashboard/central-nodal-agency", headers=headers)
    assert res.status_code == 200, f"MoSPI Dashboard failed: {res.text}"
    data = res.json()
    print("MoSPI Response keys:", list(data.keys()))
    print("MoSPI Summary:", data["summary"])

    assert "summary" in data
    assert "totalProjects" in data["summary"]
    assert "activeAlerts" in data["summary"]
    assert "criticalAlerts" in data["summary"]
    assert "fundsUtilizedPct" in data["summary"]
    assert "alertsBySeverity" in data
    assert "flagsByStatus" in data
    assert "trendOverTime" in data
    assert "utilizationByCategory" in data
    assert data.get("isSimulated") is True

    # MoSPI sees all 124 projects nationally
    assert data["summary"]["totalProjects"] == 124
    print(f"[PASS] Central Nodal Agency Dashboard: {data['summary']['totalProjects']} projects (all-India), {data['summary']['activeAlerts']} alerts, {data['summary']['fundsUtilizedPct']}% utilized.")

def test_auditor_cag_endpoint():
    print("\n--- Testing Auditor / CAG Dashboard ---")
    res_login = client.post("/auth/login", json={"username": "ADM-CAG-AUD-TN-CHN-003", "password": "CAGAudit#Pass2026"})
    assert res_login.status_code == 200, f"CAG Login failed: {res_login.text}"
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/dashboard/auditor-cag", headers=headers)
    assert res.status_code == 200, f"CAG Dashboard failed: {res.text}"
    data = res.json()
    print("CAG Response keys:", list(data.keys()))
    print("CAG Summary:", data["summary"])

    assert "summary" in data
    assert "totalProjects" in data["summary"]
    assert "activeAlerts" in data["summary"]
    assert "criticalAlerts" in data["summary"]
    assert "fundsUtilizedPct" in data["summary"]
    assert "alertsBySeverity" in data
    assert "flagsByStatus" in data
    assert "trendOverTime" in data
    assert "utilizationByCategory" in data
    assert data.get("isSimulated") is True

    # Auditor sees all 124 projects nationally
    assert data["summary"]["totalProjects"] == 124
    # Auditor must see flags across statuses (including resolved / open)
    status_names = [s["name"] for s in data["flagsByStatus"]]
    print("CAG Flags by status:", status_names)
    assert len(status_names) > 0
    print(f"[PASS] Auditor / CAG Dashboard: {data['summary']['totalProjects']} projects (national), {data['summary']['activeAlerts']} alerts, {data['summary']['fundsUtilizedPct']}% utilized.")

def test_implementing_agency_endpoint():
    print("\n--- Testing Implementing Agency Dashboard ---")
    res_login = client.post("/auth/login", json={"username": "ADM-IA-PWD-TN-CHN-008", "password": "PWDWorks#Pass2026"})
    assert res_login.status_code == 200, f"IA Login failed: {res_login.text}"
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/dashboard/implementing-agency", headers=headers)
    assert res.status_code == 200, f"IA Dashboard failed: {res.text}"
    data = res.json()
    print("IA Response keys:", list(data.keys()))
    print("IA Summary:", data["summary"])

    # Strict zero-oversight visibility verification: MUST NOT contain any risk, compliance, or alert fields
    assert "activeAlerts" not in data["summary"], "Implementing Agency must not see activeAlerts"
    assert "criticalAlerts" not in data["summary"], "Implementing Agency must not see criticalAlerts"
    assert "alertsBySeverity" not in data, "Implementing Agency must not see alertsBySeverity"
    assert "flagsByStatus" not in data, "Implementing Agency must not see flagsByStatus"
    assert "trendOverTime" not in data, "Implementing Agency must not see trendOverTime"
    assert "riskScore" not in data, "Implementing Agency must not see riskScore"
    assert "complianceFlags" not in data, "Implementing Agency must not see complianceFlags"

    # Execution fields MUST be present
    assert "totalProjects" in data["summary"]
    assert "fundsUtilizedPct" in data["summary"]
    assert "utilizationByCategory" in data
    assert data.get("isSimulated") is True

    print(f"[PASS] Implementing Agency Dashboard: {data['summary']['totalProjects']} assigned works, {data['summary']['fundsUtilizedPct']}% utilized. Zero oversight leakage confirmed.")

def test_mp_office_endpoint():
    print("\n--- Testing MP Office Dashboard ---")
    # 1. Constituency MP
    res_login = client.post("/auth/login", json={"username": "ADM-MP-TN-CHN-021", "password": "MPOffice#Pass2026"})
    assert res_login.status_code == 200, f"MP Login failed: {res_login.text}"
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/dashboard/mp-office", headers=headers)
    assert res.status_code == 200, f"MP Dashboard failed: {res.text}"
    data = res.json()
    print("Constituency MP Response keys:", list(data.keys()))
    print("Constituency MP Summary:", data["summary"])
    print("Constituency MP Flags by Status:", data["flagsByStatus"])

    assert "summary" in data
    assert "totalProjects" in data["summary"]
    assert "activeAlerts" in data["summary"]
    assert "criticalAlerts" in data["summary"]
    assert "fundsUtilizedPct" in data["summary"]
    assert "alertsBySeverity" not in data, "MP Office should have passive view without alertsBySeverity"
    assert "flagsByStatus" in data
    assert "trendOverTime" in data
    assert "utilizationByCategory" in data
    assert data.get("isSimulated") is True
    print(f"[PASS] Constituency MP Dashboard: {data['summary']['totalProjects']} constituency works, {data['summary']['fundsUtilizedPct']}% utilized.")

    # 2. Nominated MP
    res_nom_login = client.post("/auth/login", json={"username": "ADM-MP-NOM-IND-022", "password": "MPOffice#Pass2026"})
    assert res_nom_login.status_code == 200
    nom_token = res_nom_login.json()["access_token"]
    nom_headers = {"Authorization": f"Bearer {nom_token}"}

    res_nom = client.get("/dashboard/mp-office", headers=nom_headers)
    assert res_nom.status_code == 200
    nom_data = res_nom.json()
    print("Nominated MP Summary:", nom_data["summary"])
    assert nom_data["summary"]["totalProjects"] > 0
    print(f"[PASS] Nominated MP Dashboard: {nom_data['summary']['totalProjects']} multi-district works.")

    # 3. Contextual routing /dashboard/me
    res_me = client.get("/dashboard/me", headers=headers)
    assert res_me.status_code == 200
    assert res_me.json()["summary"]["totalProjects"] == data["summary"]["totalProjects"]
    print("[PASS] Contextual /dashboard/me successfully routed for MP Office.")

    # 4. Privilege escalation check: MP attempting to access District Authority dashboard
    res_esc = client.get("/dashboard/district-authority", headers=headers)
    assert res_esc.status_code == 403, f"Expected 403 Forbidden on horizontal privilege escalation, got {res_esc.status_code}"
    print("[PASS] Horizontal privilege escalation prevented (MP accessing District Authority -> 403 Forbidden).")

if __name__ == "__main__":
    test_district_authority_endpoint()
    test_state_nodal_endpoint()
    test_central_nodal_endpoint()
    test_auditor_cag_endpoint()
    test_implementing_agency_endpoint()
    test_mp_office_endpoint()
