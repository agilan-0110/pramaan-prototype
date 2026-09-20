"""
Verification suite for Implementing Agency dual-condition scoping & multi-role integrity.
Tests:
1. PWD Bengaluru Urban: Sees ONLY Bengaluru Urban PWD projects (zero national / zero cross-district)
2. PWD Pune: Sees ONLY Pune PWD projects (zero overlap with Bengaluru or other states)
3. Municipal Corporation Howrah: Sees ONLY Howrah Municipal projects
4. Single-project endpoint 403 checks for out-of-jurisdiction and wrong-agency access
5. Alerts feed scoping for Implementing Agency
6. System-wide integrity: Re-verify District Authority, State Nodal, MP Office, and MoSPI
"""

import json
import urllib.request
import urllib.error

BASE_URL = "http://127.0.0.1:8000"


def http_request(url, method="GET", data=None, headers=None):
    if headers is None:
        headers = {}
    body = None
    if data is not None:
        body = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"

    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            res_body = res.read().decode("utf-8")
            return res.status, json.loads(res_body) if res_body else None
    except urllib.error.HTTPError as err:
        err_body = err.read().decode("utf-8")
        try:
            parsed = json.loads(err_body)
        except Exception:
            parsed = err_body
        return err.code, parsed


def run_tests():
    print("=" * 75)
    print("SETU IMPLEMENTING AGENCY SCOPING & RBAC REGRESSION VERIFICATION")
    print("=" * 75)

    # -------------------------------------------------------------
    # 1. PWD Bengaluru Urban Login & Scoping
    # -------------------------------------------------------------
    status, blr_login = http_request(
        f"{BASE_URL}/auth/login",
        method="POST",
        data={"username": "ADM-IA-PWD-KA-BLR-028", "password": "PWDWorks#Pass2026"},
    )
    assert status == 200, f"PWD Bengaluru login failed: {status} {blr_login}"
    blr_token = blr_login["access_token"]
    assert blr_login["district"] == "Bengaluru Urban"
    assert blr_login["state"] == "Karnataka"
    assert "PWD" in blr_login["agency"]
    print(f"[PASS] 1a. PWD Bengaluru Urban login succeeded ({blr_login['officialName']}).")

    status, blr_projects = http_request(
        f"{BASE_URL}/projects",
        headers={"Authorization": f"Bearer {blr_token}"},
    )
    assert status == 200, f"Failed to get PWD Bengaluru projects: {status}"
    assert len(blr_projects) > 0, "PWD Bengaluru should see at least 1 assigned project"
    for p in blr_projects:
        assert p["district"] == "Bengaluru Urban", f"Leaked cross-district project: {p['id']} ({p['district']})"
        assert p["state"] == "Karnataka", f"Leaked cross-state project: {p['id']} ({p['state']})"
        assert "pwd" in p.get("implementingAgency", "").lower() or "public works" in p.get("implementingAgency", "").lower(), \
            f"Non-PWD project returned: {p['id']} ({p.get('implementingAgency')})"
    print(f"[PASS] 1b. PWD Bengaluru Urban sees strictly {len(blr_projects)} projects in Bengaluru Urban (Zero cross-district leakage).")
    for p in blr_projects:
        print(f"     -> {p['id']}: {p['name'][:40]} | District: {p['district']} | Agency: {p['implementingAgency']}")

    # -------------------------------------------------------------
    # 2. PWD Pune Login & Scoping (Second Agency Login)
    # -------------------------------------------------------------
    status, pun_login = http_request(
        f"{BASE_URL}/auth/login",
        method="POST",
        data={"username": "ADM-IA-PWD-MH-PUN-014", "password": "PWDWorks#Pass2026"},
    )
    assert status == 200, f"PWD Pune login failed: {status} {pun_login}"
    pun_token = pun_login["access_token"]
    assert pun_login["district"] == "Pune"
    assert pun_login["state"] == "Maharashtra"
    print(f"[PASS] 2a. PWD Pune login succeeded ({pun_login['officialName']}).")

    status, pun_projects = http_request(
        f"{BASE_URL}/projects",
        headers={"Authorization": f"Bearer {pun_token}"},
    )
    assert status == 200, f"Failed to get PWD Pune projects: {status}"
    assert len(pun_projects) > 0, "PWD Pune should see at least 1 project"
    for p in pun_projects:
        assert p["district"] == "Pune", f"Leaked non-Pune project: {p['id']} ({p['district']})"
        assert p["state"] == "Maharashtra", f"Leaked non-Maharashtra project: {p['id']} ({p['state']})"
        assert "pwd" in p.get("implementingAgency", "").lower() or "public works" in p.get("implementingAgency", "").lower(), \
            f"Non-PWD project returned: {p['id']}"
    print(f"[PASS] 2b. PWD Pune sees strictly {len(pun_projects)} projects in Pune (Zero cross-district leakage).")
    for p in pun_projects:
        print(f"     -> {p['id']}: {p['name'][:40]} | District: {p['district']} | Agency: {p['implementingAgency']}")

    # Zero overlap check between PWD Bengaluru and PWD Pune
    blr_ids = set(p["id"] for p in blr_projects)
    pun_ids = set(p["id"] for p in pun_projects)
    overlap = blr_ids.intersection(pun_ids)
    assert len(overlap) == 0, f"Critical security failure: Overlap between agency jurisdictions! {overlap}"
    print("[PASS] 2c. Verified ZERO project overlap between PWD-Bengaluru and PWD-Pune.")

    # -------------------------------------------------------------
    # 3. Municipal Corporation Howrah Login & Scoping
    # -------------------------------------------------------------
    status, how_login = http_request(
        f"{BASE_URL}/auth/login",
        method="POST",
        data={"username": "ADM-IA-MUN-WB-HOW-019", "password": "demo123"},
    )
    assert status == 200, f"Municipal Howrah login failed: {status} {how_login}"
    how_token = how_login["access_token"]
    assert how_login["district"] == "Howrah"

    status, how_projects = http_request(
        f"{BASE_URL}/projects",
        headers={"Authorization": f"Bearer {how_token}"},
    )
    assert status == 200
    for p in how_projects:
        assert p["district"] == "Howrah", f"Leaked non-Howrah project: {p['id']}"
        assert "municipal" in p.get("implementingAgency", "").lower(), f"Non-Municipal project: {p['id']}"
    print(f"[PASS] 3. Municipal Corporation Howrah sees strictly {len(how_projects)} projects in Howrah.")

    # -------------------------------------------------------------
    # 4. Single-Project HTTP 403 Access Restrictions
    # -------------------------------------------------------------
    # In-jurisdiction PWD Bengaluru accessing PRJ-IND-2020 -> 200 OK
    status, _ = http_request(
        f"{BASE_URL}/projects/PRJ-IND-2020",
        headers={"Authorization": f"Bearer {blr_token}"},
    )
    assert status == 200, f"Expected 200 for in-jurisdiction project, got {status}"
    print("[PASS] 4a. PWD Bengaluru accessing own project PRJ-IND-2020: 200 OK.")

    # Cross-district access: PWD Bengaluru attempting to access Pune project PRJ-IND-2001 -> 403 Forbidden
    status, err_cross = http_request(
        f"{BASE_URL}/projects/PRJ-IND-2001",
        headers={"Authorization": f"Bearer {blr_token}"},
    )
    assert status == 403, f"Expected 403 for cross-district access, got {status}: {err_cross}"
    assert "outside your agency's authorized jurisdiction (Bengaluru Urban)" in err_cross.get("detail", "")
    print(f"[PASS] 4b. PWD Bengaluru accessing Pune project blocked: 403 Forbidden verified! Detail: '{err_cross['detail']}'")

    # Wrong agency in same district: PWD Bengaluru accessing Water Board project PRJ-IND-2019 in Bengaluru -> 403 Forbidden
    status, err_agency = http_request(
        f"{BASE_URL}/projects/PRJ-IND-2019",
        headers={"Authorization": f"Bearer {blr_token}"},
    )
    assert status == 403, f"Expected 403 for wrong agency project in same district, got {status}: {err_agency}"
    assert "not your agency" in err_agency.get("detail", "")
    print(f"[PASS] 4c. PWD Bengaluru accessing Water Board project in same district blocked: 403 Forbidden verified! Detail: '{err_agency['detail']}'")

    # -------------------------------------------------------------
    # 5. Alerts Scoping for Implementing Agency
    # -------------------------------------------------------------
    status, blr_alerts = http_request(
        f"{BASE_URL}/alerts",
        headers={"Authorization": f"Bearer {blr_token}"},
    )
    assert status == 200, f"Failed to get alerts for PWD Bengaluru: {status}"
    for a in blr_alerts:
        assert a["district"] == "Bengaluru Urban", f"Leaked cross-district alert: {a}"
    print(f"[PASS] 5a. PWD Bengaluru alerts feed strictly scoped to Bengaluru Urban ({len(blr_alerts)} alerts, zero national alerts).")

    status, pun_alerts = http_request(
        f"{BASE_URL}/alerts",
        headers={"Authorization": f"Bearer {pun_token}"},
    )
    assert status == 200, f"Failed to get alerts for PWD Pune: {status}"
    for a in pun_alerts:
        assert a["district"] == "Pune", f"Leaked cross-district alert: {a}"
    print(f"[PASS] 5b. PWD Pune alerts feed strictly scoped to Pune ({len(pun_alerts)} alerts, zero national alerts).")

    # -------------------------------------------------------------
    # 6. Re-Verify Other Roles (District Authority, State Nodal, MP Office, MoSPI)
    # -------------------------------------------------------------
    # 6a. District Authority (Lucknow)
    status, da_login = http_request(
        f"{BASE_URL}/auth/login",
        method="POST",
        data={"username": "ADM-DA-UP-LKO-012", "password": "DistAdmin#Pass2026"},
    )
    assert status == 200
    da_token = da_login["access_token"]
    status, da_projects = http_request(f"{BASE_URL}/projects", headers={"Authorization": f"Bearer {da_token}"})
    assert status == 200 and len(da_projects) == 3, f"Expected 3 Lucknow projects for DA, got {len(da_projects)}"
    print(f"[PASS] 6a. District Authority (Lucknow) still correctly sees strictly {len(da_projects)} Lucknow projects.")

    # 6b. State Nodal (Tamil Nadu)
    status, sna_login = http_request(
        f"{BASE_URL}/auth/login",
        method="POST",
        data={"username": "ADM-SNA-TN-CHN-005", "password": "StateNodal#Pass2026"},
    )
    assert status == 200
    sna_token = sna_login["access_token"]
    status, sna_projects = http_request(f"{BASE_URL}/projects", headers={"Authorization": f"Bearer {sna_token}"})
    assert status == 200 and len(sna_projects) == 8, f"Expected 8 TN projects for SNA, got {len(sna_projects)}"
    print(f"[PASS] 6b. State Nodal (Tamil Nadu) still correctly sees strictly {len(sna_projects)} Tamil Nadu projects.")

    # 6c. MP Office (Baramati)
    status, mp_login = http_request(
        f"{BASE_URL}/auth/login",
        method="POST",
        data={"username": "ADM-MP-MH-BRM-041", "password": "MPOffice#Pass2026"},
    )
    assert status == 200
    mp_token = mp_login["access_token"]
    status, mp_projects = http_request(f"{BASE_URL}/projects", headers={"Authorization": f"Bearer {mp_token}"})
    assert status == 200
    for p in mp_projects:
        assert p["constituency"] == "Baramati", f"Non-Baramati project returned for MP Office: {p['id']}"
    print(f"[PASS] 6c. MP Office (Baramati) still correctly sees strictly {len(mp_projects)} Baramati projects.")

    # 6d. MoSPI (National Oversight)
    status, mospi_login = http_request(
        f"{BASE_URL}/auth/login",
        method="POST",
        data={"username": "ADM-CNA-MOSPI-HQ-002", "password": "CentralApex#Pass2026"},
    )
    assert status == 200
    mospi_token = mospi_login["access_token"]
    status, mospi_projects = http_request(f"{BASE_URL}/projects", headers={"Authorization": f"Bearer {mospi_token}"})
    assert status == 200 and len(mospi_projects) == 95, f"Expected 95 national projects for MoSPI, got {len(mospi_projects)}"
    print(f"[PASS] 6d. MoSPI / Central Nodal still correctly sees all {len(mospi_projects)} national projects unrestricted.")

    print("\n" + "=" * 75)
    print("ALL IMPLEMENTING AGENCY AND RBAC REGRESSION TESTS PASSED CLEANLY!")
    print("=" * 75)


if __name__ == "__main__":
    run_tests()
