import requests
import json

base_url = "http://127.0.0.1:8000"

test_logins = [
    ("MoSPI Apex (National)", "ADM-CNA-MOSPI-HQ-002", "CentralApex#Pass2026", 124),
    ("State Nodal (Tamil Nadu)", "ADM-SNA-TN-CHN-005", "StateNodal#Pass2026", 23),
    ("State Nodal (Karnataka)", "ADM-SNA-KA-BLR-006", "StateNodalKA#Pass2026", 12),
    ("State Nodal (Maharashtra)", "ADM-SNA-MH-PUN-007", "StateNodalMH#Pass2026", 13),
    ("District Authority (Chennai)", "ADM-DA-TN-CHN-001", "DistAdmin#Pass2026", 9),
    ("District Authority (Lucknow)", "ADM-DA-UP-LKO-012", "DistAdmin#Pass2026", 8),
    ("MP Office (Chennai Central)", "ADM-MP-TN-CHN-021", "MPOffice#Pass2026", 9),
]

print("=== VERIFYING AUTH & ROLE JURISDICTION SCOPING OVER LIVE HTTP ===")
for name, user, pwd, expected_count in test_logins:
    login_res = requests.post(f"{base_url}/auth/login", json={"username": user, "password": pwd})
    if login_res.status_code != 200:
        print(f"[FAIL] Login failed for {name} ({user}): {login_res.status_code} {login_res.text}")
        continue
    
    token = login_res.json()["token"]
    headers = {"Authorization": f"Bearer {token}"}
    proj_res = requests.get(f"{base_url}/projects", headers=headers)
    
    if proj_res.status_code != 200:
        print(f"[FAIL] Fetch projects failed for {name}: {proj_res.status_code}")
        continue
        
    projects = proj_res.json()
    count = len(projects)
    passed = count == expected_count
    status = "[PASS]" if passed else "[WARN]"
    print(f"{status} {name}: {count} projects (expected: {expected_count})")
