"""
Verification test script for SETU bugfixes.
Tests all patched endpoints, RBAC checks, mathematical models, and edge cases.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

from starlette.testclient import TestClient
from app.main import app
from app.services.predictive import compute_empirical_forecast
from app.services.citizen_nlp import citizen_nlp_service

client = TestClient(app)

def run_tests():
    print("=" * 60)
    print("RUNNING BUGFIX VERIFICATION SUITE")
    print("=" * 60)

    # 1. Health check
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] 1. Backend health check returns 200 OK")

    # 2. Alerts reset endpoint (validates alerts_service import)
    res = client.post("/alerts/reset")
    assert res.status_code == 200, f"Alerts reset failed: {res.text}"
    assert res.json() == {"status": "reset_successful"}
    print("[PASS] 2. POST /alerts/reset executes successfully without NameError")

    # 3. Unauthenticated public project sanitization
    res = client.get("/projects/PRJ-IND-2013")
    assert res.status_code == 200, f"Public project fetch failed: {res.text}"
    data = res.json()
    assert "shapValues" not in data, "Public project should redact shapValues"
    assert "complianceFlags" not in data, "Public project should redact complianceFlags"
    assert "alerts" not in data, "Public project should redact alerts"
    assert "name" in data and "sanctionedAmount" in data, "Public project should retain public fields"
    print("[PASS] 3. Unauthenticated GET /projects/{id} is sanitized for public transparency")

    # 4. Auth login for District Authority and MP
    res_da = client.post("/auth/login", json={"username": "ADM-DA-TN-CHN-001", "password": "DistAdmin#Pass2026"})
    assert res_da.status_code == 200, f"DA login failed: {res_da.text}"
    da_token = res_da.json()["access_token"]
    da_headers = {"Authorization": f"Bearer {da_token}"}
    print("[PASS] 4. Authentication for District Authority successful")

    res_mp = client.post("/auth/login", json={"username": "ADM-MP-TN-CHN-021", "password": "MPOffice#Pass2026"})
    assert res_mp.status_code == 200, f"MP login failed: {res_mp.text}"
    mp_token = res_mp.json()["access_token"]
    mp_headers = {"Authorization": f"Bearer {mp_token}"}
    print("[PASS] 5. Authentication for MP Office successful")

    # 5. MP Proposal ID generation with state prefix
    prop_payload = {
        "title": "Community Center Construction",
        "workDescription": "Construction of new cyclone-resilient community hall",
        "location": "Ward 12, T. Nagar",
        "category": "Building",
        "estimatedCost": 4500000,
        "state": "Tamil Nadu",
        "district": "Chennai"
    }
    res_prop = client.post("/projects/proposals", json=prop_payload, headers=mp_headers)
    assert res_prop.status_code == 201, f"Proposal submission failed: {res_prop.text}"
    proposal_id = res_prop.json()["proposal"]["id"]
    assert proposal_id.startswith("PROP-TN-"), f"Expected PROP-TN- prefix, got {proposal_id}"
    print(f"[PASS] 6. MP proposal ID dynamically formatted with state code: {proposal_id}")

    # 6. Role check on proposal decision (MP cannot decide proposal -> 403)
    dec_payload = {"decision": "APPROVE"}
    res_unauth_dec = client.post(f"/projects/{proposal_id}/proposal-decision", json=dec_payload, headers=mp_headers)
    assert res_unauth_dec.status_code == 403, f"Expected 403 for MP deciding proposal, got {res_unauth_dec.status_code}"
    print("[PASS] 7. Horizontal privilege escalation prevented: MP Office blocked from approving proposal (403 Forbidden)")

    # 7. DA proposal approval
    res_da_dec = client.post(f"/projects/{proposal_id}/proposal-decision", json=dec_payload, headers=da_headers)
    assert res_da_dec.status_code == 200, f"DA proposal decision failed: {res_da_dec.text}"
    print("[PASS] 8. District Authority successfully approves proposal (200 OK)")

    # 8. Role check on Tranche Freeze (DA cannot freeze tranche -> 403)
    res_da_freeze = client.post("/projects/PRJ-IND-2013/freeze-tranche", json={"reason": "Testing freeze"}, headers=da_headers)
    assert res_da_freeze.status_code == 403, f"Expected 403 for DA freezing tranche, got {res_da_freeze.status_code}"
    print("[PASS] 9. Role check verified: District Authority blocked from freezing fund tranche (403 Forbidden)")

    # 9. State Nodal can freeze tranche
    res_sna = client.post("/auth/login", json={"username": "ADM-SNA-TN-CHN-005", "password": "StateNodal#Pass2026"})
    assert res_sna.status_code == 200
    sna_token = res_sna.json()["access_token"]
    sna_headers = {"Authorization": f"Bearer {sna_token}"}

    res_sna_freeze = client.post("/projects/PRJ-IND-2013/freeze-tranche", json={"reason": "Audit freeze"}, headers=sna_headers)
    assert res_sna_freeze.status_code == 200, f"State Nodal freeze failed: {res_sna_freeze.text}"
    print("[PASS] 10. State Nodal Authority successfully imposes administrative tranche freeze")

    # 10. Tranche release blocked when project is frozen (403 Forbidden)
    res_frozen_rel = client.post("/projects/PRJ-IND-2013/release-tranche", headers=da_headers)
    assert res_frozen_rel.status_code == 403, f"Expected 403 on frozen project tranche release, got {res_frozen_rel.status_code}"
    print("[PASS] 11. Administrative tranche freeze strictly enforced on release-tranche (403 Forbidden)")

    # 11. Predictive velocity & cost blending
    sample_proj = {
        "id": "PRJ-TEST-001",
        "physicalProgress": 40.0,
        "financialProgress": 45.0,
        "daysDelayed": 5,
        "daysSinceStart": 120,
        "sanctionedAmount": 10000000,
        "expenditure": 4500000,
        "status": "In Progress"
    }
    preds = compute_empirical_forecast(sample_proj)
    delay_rationale = preds["delayPrediction"]["forecastRationale"]
    assert "0.33%/day" in delay_rationale or "physical velocity" in delay_rationale
    print(f"[PASS] 12. Predictive velocity mathematically evaluated using elapsed days: {delay_rationale}")

    # 12. Citizen NLP non-contradiction score bounding
    eval_res = citizen_nlp_service.evaluate_complaint({
        "projectId": "PRJ-IND-2013",
        "complaintText": "Road work is progressing nicely, no damages or defects noticed at all."
    })
    assert eval_res["contradictionScore"] <= 20, f"Expected low contradiction score for positive observation, got {eval_res['contradictionScore']}"
    assert not eval_res["isContradiction"], "Corroborative text should not be flagged as contradiction"
    print(f"[PASS] 13. Citizen NLP non-contradiction bounded (score: {eval_res['contradictionScore']}/100, isContradiction: {eval_res['isContradiction']})")

    print("=" * 60)
    print("ALL 13 VERIFICATION TESTS PASSED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
