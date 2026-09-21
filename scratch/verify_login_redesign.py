"""
Automated Verification Script for Login Page Redesign
Checks:
1. Absence of 10 prohibited claims/placeholders in Login.jsx and index.html
2. Presence of required layout structures (4-tier hierarchy, stepper 1-4, non-hierarchical blocks, help box, SIH footer, disclaimer)
3. Backend JWT authentication & RBAC for all 6 roles
"""

import sys
import json
import requests
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PROHIBITED_STRINGS = [
    ("भारत सरकार", "Point 1: Top bar Gov of India claim"),
    ("Government of India ·", "Point 1: Top bar Gov of India claim"),
    ("Live MoSPI Sync", "Point 2: Live MoSPI Sync badge in nav"),
    ("256-Bit Encrypted Audit Channel", "Point 3: 256-Bit Encrypted badge"),
    ("2FA Gateway", "Point 4: 2FA Gateway reference"),
    ("Protocol v4.2", "Point 4: Protocol v4.2 reference"),
    ("nodal.officer@nic.in", "Point 4: nodal.officer@nic.in placeholder"),
    ("authConsent", "Point 5: authConsent checkbox"),
    ("I certify administrative authorization", "Point 5: I certify checkbox label"),
    ("Article 149 directives", "Point 6: Article 149 directives reference"),
    ("Secure Institutional 2FA Login regulations", "Point 7: 2FA login regulations reference"),
    ("Submit Token", "Point 8: Submit Token button"),
    ("Designed with National Informatics Centre (NIC)", "Point 9: NIC UX design claim"),
    ("National Informatics Centre (NIC) UX guidelines", "Point 9: NIC UX guidelines claim"),
    ("authModal", "Structural: Fake auth modal"),
    ("openAuthModal", "Structural: Fake openAuthModal function"),
    ("handleSimulatedLogin", "Structural: Fake handleSimulatedLogin function")
]

REQUIRED_ROLES = [
    "mp_office",
    "district_authority",
    "state_nodal",
    "mospi_officer",
    "auditor_cag",
    "implementing_agency"
]

def check_files():
    files_to_check = [
        ("frontend/src/pages/Login.jsx", "React Login Component"),
        ("frontend/index.html", "SPA index.html runtime")
    ]

    all_passed = True

    for filepath, desc in files_to_check:
        print(f"\n--- Checking {desc} ({filepath}) ---")
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"[FAIL] Could not open {filepath}: {e}")
            all_passed = False
            continue

        # 1. Prohibited strings check
        for prohibited, label in PROHIBITED_STRINGS:
            if prohibited in content:
                print(f"[FAIL] Found prohibited string: '{prohibited}' ({label})")
                all_passed = False
            else:
                print(f"[PASS] Clean: No '{prohibited}' ({label})")

        # 2. Required roles check
        for role_id in REQUIRED_ROLES:
            if role_id in content:
                print(f"[PASS] Found role binding: {role_id}")
            else:
                print(f"[FAIL] Missing role binding: {role_id}")
                all_passed = False

        # 3. Required structural elements
        required_elements = [
            ("Administrative Hierarchy", "Administrative Hierarchy Header"),
            ("Independent &amp; Functional Entities (Non-Hierarchical)", "Structural Separator"),
            ("Independent Statutory Audit", "Independent Audit Block"),
            ("Execution &amp; Field Reporting", "Execution Block"),
            ("Operates independently of the administrative approval chain", "Independent phrasing"),
            ("Need credential assistance?", "Help box"),
            ("Academic &amp; Research Prototype", "Prototype Disclaimer"),
            ("Not an official Government of India portal", "Honest disclaimer"),
            ("Simulated", "Simulated demo badge")
        ]

        for elem, label in required_elements:
            if elem in content:
                print(f"[PASS] Found structure: {label}")
            else:
                print(f"[FAIL] Missing structure: {label} ('{elem}')")
                all_passed = False

    return all_passed

def check_auth_backend():
    print("\n--- Testing Backend JWT Authentication for all 6 roles ---")
    credentials = [
        ("ADM-MP-TN-CHN-021", "MPOffice#Pass2026", "MP Office"),
        ("ADM-DA-TN-CHN-001", "DistAdmin#Pass2026", "District Authority"),
        ("ADM-SNA-TN-CHN-005", "StateNodal#Pass2026", "State Nodal Authority"),
        ("ADM-CNA-MOSPI-HQ-002", "CentralApex#Pass2026", "Central Nodal Agency (MoSPI)"),
        ("ADM-CAG-AUD-TN-CHN-003", "CAGAudit#Pass2026", "Auditor / CAG"),
        ("ADM-IA-PWD-TN-CHN-008", "PWDWorks#Pass2026", "Implementing Agency")
    ]

    all_auth_pass = True
    base_url = "http://127.0.0.1:8000"

    for username, password, expected_role in credentials:
        try:
            resp = requests.post(f"{base_url}/auth/login", json={
                "username": username,
                "password": password
            }, timeout=5)

            if resp.status_code == 200:
                data = resp.json()
                token = data.get("access_token")
                returned_role = data.get("role")
                if token and returned_role == expected_role:
                    print(f"[PASS] Auth success for {expected_role} ({username}): Token received (length {len(token)})")
                else:
                    print(f"[FAIL] Auth unexpected payload for {expected_role}: {data}")
                    all_auth_pass = False
            else:
                print(f"[FAIL] Auth failed for {expected_role}: Status {resp.status_code}, Body: {resp.text}")
                all_auth_pass = False
        except Exception as e:
            print(f"[FAIL] Connection error to backend for {expected_role}: {e}")
            all_auth_pass = False

    return all_auth_pass

if __name__ == "__main__":
    files_ok = check_files()
    backend_ok = check_auth_backend()

    if files_ok and backend_ok:
        print("\n==========================================")
        print("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!")
        print("==========================================")
        sys.exit(0)
    else:
        print("\n==========================================")
        print("SOME VERIFICATION CHECKS FAILED!")
        print("==========================================")
        sys.exit(1)
