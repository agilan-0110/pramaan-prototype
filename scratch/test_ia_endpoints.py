import requests
import json

BASE_URL = "http://127.0.0.1:8000"

# 1. Login as Implementing Agency (Chennai PWD)
login_res = requests.post(f"{BASE_URL}/auth/login", json={
    "username": "ADM-IA-PWD-TN-CHN-008",
    "password": "PWDWorks#Pass2026"
})
assert login_res.status_code == 200, f"Login failed: {login_res.text}"
token = login_res.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# 2. Get Scoped Projects
proj_res = requests.get(f"{BASE_URL}/projects", headers=headers)
assert proj_res.status_code == 200, f"Get projects failed: {proj_res.text}"
projects = proj_res.json()
print(f"Logged in as ADM-IA-PWD-TN-CHN-008. Retrieved {len(projects)} assigned projects.")
assert len(projects) == 5, f"Expected 5 projects, got {len(projects)}"

target_proj = projects[0]
target_id = target_proj["id"]
vendor_name = target_proj.get("vendorName")
print(f"Testing execution on Project '{target_id}' ({target_proj.get('name')[:40]}...)")
print(f"Registered Vendor: '{vendor_name}'")
assert vendor_name is not None and len(vendor_name) > 0, "Missing vendorName!"

# 3. Action 1: Submit Progress Update
print("\n--- ACTION 1: Submit Progress Update ---")
prog_res = requests.post(
    f"{BASE_URL}/projects/{target_id}/progress",
    headers=headers,
    json={
        "physicalProgress": 85,
        "financialProgress": 80.0,
        "stage": "Sub-base bituminous layer completed and rolled",
        "remarks": "Site inspection conducted with vendor engineer. Bituminous compaction satisfied statutory standards."
    }
)
assert prog_res.status_code == 200, f"Submit progress failed: {prog_res.text}"
prog_data = prog_res.json()
print("Progress update response:", prog_data["message"])
assert prog_data["project"]["physicalProgress"] == 85

# 4. Action 2: Upload Evidence (auto-tagged with vendor)
print("\n--- ACTION 2: Upload Evidence ---")
ev_res = requests.post(
    f"{BASE_URL}/projects/{target_id}/evidence",
    headers=headers,
    json={
        "milestoneStage": "Bituminous Layer Compaction",
        "description": "Core test specimen extracted and photographed under site engineer supervision.",
        "fileName": "core_test_layer2.jpg"
    }
)
assert ev_res.status_code == 201, f"Upload evidence failed: {ev_res.text}"
ev_data = ev_res.json()
print("Evidence response:", ev_data["message"])
source_tag = ev_data["evidence"]["sourceTag"]
print(f"Evidence Source Tag: '{source_tag}'")
expected_tag = f"Received from Vendor: {vendor_name}"
assert source_tag == expected_tag, f"Expected sourceTag '{expected_tag}', got '{source_tag}'"

# 5. Action 3: Complete Project and Submit UC
print("\n--- ACTION 3: Complete Project & Submit Utilization Certificate ---")
# First advance to 100%
prog_res_100 = requests.post(
    f"{BASE_URL}/projects/{target_id}/progress",
    headers=headers,
    json={
        "physicalProgress": 100,
        "financialProgress": 100.0,
        "stage": "Final Wearing Course Completed",
        "remarks": "Physical execution 100% completed. Handover inspection completed."
    }
)
assert prog_res_100.status_code == 200
print("Project reached 100% completion.")

uc_res = requests.post(
    f"{BASE_URL}/projects/{target_id}/utilization-certificate",
    headers=headers,
    json={
        "ucNumber": f"UC/MPLADS/2026/TN-CHN-001",
        "certifiedAmount": 12500000,
        "remarks": "Final measurement book accounts closed. UC submitted per Rule 12(1) MPLADS guidelines.",
        "auditCertificateRef": "VCH/2026/PWD/089"
    }
)
assert uc_res.status_code == 200, f"Submit UC failed: {uc_res.text}"
uc_data = uc_res.json()
print("UC submission response:", uc_data["message"])
assert uc_data["ucStatus"] == "SUBMITTED"
assert uc_data["utilizationCertificate"]["status"] == "SUBMITTED"

# 6. Verify RBAC Lockouts on Restricted Endpoints
print("\n--- RBAC LOCKOUT VERIFICATION ---")
risk_res = requests.get(f"{BASE_URL}/projects/{target_id}/risk", headers=headers)
print(f"GET /projects/{target_id}/risk -> Status: {risk_res.status_code}")
assert risk_res.status_code == 403, f"Expected 403 Forbidden for Risk, got {risk_res.status_code}"

comp_res = requests.get(f"{BASE_URL}/projects/{target_id}/compliance", headers=headers)
print(f"GET /projects/{target_id}/compliance -> Status: {comp_res.status_code}")
assert comp_res.status_code == 403, f"Expected 403 Forbidden for Compliance, got {comp_res.status_code}"

dup_res = requests.get(f"{BASE_URL}/projects/{target_id}/duplicates", headers=headers)
print(f"GET /projects/{target_id}/duplicates -> Status: {dup_res.status_code}")
assert dup_res.status_code == 403, f"Expected 403 Forbidden for Duplicates, got {dup_res.status_code}"

cit_res = requests.get(f"{BASE_URL}/projects/{target_id}/citizen-reports", headers=headers)
print(f"GET /projects/{target_id}/citizen-reports -> Status: {cit_res.status_code}")
assert cit_res.status_code == 403, f"Expected 403 Forbidden for Citizen Reports, got {cit_res.status_code}"

# 7. Verify Out-of-Jurisdiction Single Project Access (e.g. Bangalore project)
out_proj_id = "PRJ-IND-KA-002"
out_res = requests.get(f"{BASE_URL}/projects/{out_proj_id}", headers=headers)
print(f"GET /projects/{out_proj_id} (Out of District) -> Status: {out_res.status_code}")
assert out_res.status_code == 403, f"Expected 403 Forbidden for out-of-district project, got {out_res.status_code}"

print("\nALL LIVE API ENDPOINT VERIFICATIONS PASSED 100%!")
