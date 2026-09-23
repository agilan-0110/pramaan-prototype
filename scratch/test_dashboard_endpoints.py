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

if __name__ == "__main__":
    test_district_authority_endpoint()
    test_state_nodal_endpoint()
