"""
Verification Script for Compliance Rule Engine Category Mismatch Alert Formatting.
Tests:
1. Category 'Building' with mismatched agency produces non-empty standard executing authority.
2. Category 'Building' with aligned PWD agency passes alignment check.
3. All statutory categories (Road, Building, Bridge, Health, Education, Water, Civic) format cleanly.
4. HTTP API GET /projects/{id}/compliance validates compliance evaluation output.
5. Zero occurrences of '(standard executing authority: ).' across all projects and evaluations.
"""

import json
import requests
from app.services.compliance import (
    evaluate_category_mismatch,
    get_all_compliance_evaluations,
    load_projects,
)

BASE_URL = "http://127.0.0.1:8000"

def test_category_mismatch_formatting():
    print("=" * 80)
    print("TESTING COMPLIANCE RULE ENGINE CATEGORY MISMATCH FORMATTING")
    print("=" * 80)

    # 1. Test Category 'Building' with Mismatched Agency
    test_building_mismatch = {
        "id": "TEST-BLD-001",
        "category": "Building",
        "implementingAgency": "District Health Mission — Lucknow"
    }
    res = evaluate_category_mismatch(test_building_mismatch)
    print(f"\n1. Test 'Building' with Mismatched Agency:")
    print(f"   Passed: {res['passed']}")
    print(f"   Expected Agency: {res['expectedAgency']}")
    print(f"   Message: {res['message']}")
    assert not res["passed"], "Mismatched building agency should fail alignment!"
    assert "(standard executing authority: )." not in res["message"], "Empty standard executing authority bug detected!"
    assert "(standard executing authority: Public Works Department (PWD))." in res["message"], "Missing Public Works Department in message!"
    print("   [OK] Verified 'Building' mismatch message correctly includes Public Works Department (PWD)")

    # 2. Test Category 'Building' with Aligned Agency
    test_building_aligned = {
        "id": "PRJ-IND-TN-107",
        "category": "Building",
        "implementingAgency": "Public Works Department (PWD) — Chennai"
    }
    res_aligned = evaluate_category_mismatch(test_building_aligned)
    print(f"\n2. Test 'Building' with Aligned Agency:")
    print(f"   Passed: {res_aligned['passed']}")
    print(f"   Message: {res_aligned['message']}")
    assert res_aligned["passed"], "PWD should be authorized for Building category!"
    print("   [OK] Verified 'Building' with PWD passes alignment check")

    # 3. Test All Categories with Mismatched Agencies
    print(f"\n3. Testing All Categories for Non-Empty Standard Executing Authority:")
    categories_to_test = [
        ("Road", "Public Works Department (PWD)"),
        ("Building", "Public Works Department (PWD)"),
        ("Bridge", "Public Works Department (PWD)"),
        ("Health", "District Health Mission / Health Department"),
        ("Education", "Department of Public Instruction / Education Department"),
        ("Water", "Rural Water Supply & Sanitation Board"),
        ("Civic", "Municipal Corporation & Urban Development Authority"),
        ("Custom/Other", "Designated Institutional Line Department"),
    ]

    for cat, expected_auth in categories_to_test:
        dummy_proj = {"category": cat, "implementingAgency": "Incompatible Foreign Agency"}
        eval_res = evaluate_category_mismatch(dummy_proj)
        msg = eval_res["message"]
        print(f"   [{cat}] -> {msg}")
        assert "(standard executing authority: )." not in msg, f"Empty authority found for {cat}!"
        assert f"(standard executing authority: {expected_auth})." in msg, f"Mismatch in expected authority for {cat}!"
    print("   [OK] All categories verified: non-empty, institutional authority displayed")

    # 4. Check All Projects in Catalog for Zero Empty Authority Strings
    print(f"\n4. Checking All Catalog Evaluations for Empty Authority Regressions:")
    all_projects = load_projects()
    all_evals = get_all_compliance_evaluations()
    
    empty_strings_found = []
    category_mismatch_count = 0

    for eval_item in all_evals:
        for flag in eval_item.get("flags", []):
            if flag.get("ruleId") == "RULE_CATEGORY_MISMATCH":
                if not flag.get("passed"):
                    category_mismatch_count += 1
                    msg = flag.get("message", "")
                    if "(standard executing authority: )." in msg or "(standard executing authority: )" in msg:
                        empty_strings_found.append((eval_item["projectId"], msg))

    print(f"   Total flagged category mismatches in catalog: {category_mismatch_count}")
    if empty_strings_found:
        print(f"   [FAIL] Found {len(empty_strings_found)} occurrences of empty authority string!")
        for pid, m in empty_strings_found:
            print(f"     - {pid}: {m}")
        assert False
    else:
        print("   [OK] ZERO occurrences of empty authority string across all catalog evaluations!")

    # 5. Test Live HTTP API Endpoint GET /projects/{id}/compliance
    print(f"\n5. Testing Live API Endpoint GET /projects/PRJ-IND-TN-107/compliance:")
    api_resp = requests.get(f"{BASE_URL}/projects/PRJ-IND-TN-107/compliance")
    assert api_resp.status_code == 200, f"API returned {api_resp.status_code}"
    audit_data = api_resp.json()
    cat_flag = next((f for f in audit_data["flags"] if f["ruleId"] == "RULE_CATEGORY_MISMATCH"), None)
    assert cat_flag is not None, "RULE_CATEGORY_MISMATCH flag missing in API response!"
    print(f"   API Status: {api_resp.status_code}")
    print(f"   RULE_CATEGORY_MISMATCH passed: {cat_flag['passed']}")
    print(f"   RULE_CATEGORY_MISMATCH message: {cat_flag['message']}")
    assert "(standard executing authority: )." not in cat_flag["message"]
    print("   [OK] API endpoint verifies clean formatting")

    print("\n" + "=" * 80)
    print("ALL COMPLIANCE FORMATTING TESTS PASSED (100% SUCCESS)")
    print("=" * 80)

if __name__ == "__main__":
    test_category_mismatch_formatting()
