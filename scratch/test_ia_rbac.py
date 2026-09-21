import json
from app.services.auth import (
    find_user_by_identifier,
    create_access_token,
    decode_access_token,
    filter_projects_by_user_scope,
    sanitize_project_for_user,
    check_project_access,
)
from app.routers.projects import load_projects_catalog
from app.services.alerts import alerts_service

projects = load_projects_catalog()
print(f"Total catalog projects: {len(projects)}")

accounts = [
    "ADM-IA-PWD-TN-CHN-008",
    "ADM-IA-TWAD-TN-CHN-009",
    "ADM-IA-PWD-KA-BLR-028",
    "ADM-IA-UP-LKO-015"
]

project_id_sets = {}

for acc_id in accounts:
    user = find_user_by_identifier(acc_id)
    assert user is not None, f"User {acc_id} not found!"
    token = create_access_token(user)
    claims = decode_access_token(token)
    
    scoped_projects = filter_projects_by_user_scope(projects, claims)
    sanitized = [sanitize_project_for_user(p, claims) for p in scoped_projects]
    pids = [p["id"] for p in sanitized]
    project_id_sets[acc_id] = set(pids)
    
    print(f"\n--- Account: {acc_id} ({claims.get('agency')}) ---")
    print(f"Jurisdiction: District={claims.get('district')}, State={claims.get('state')}")
    print(f"Projects Count: {len(sanitized)}")
    for p in sanitized:
        print(f"  * [{p['id']}] {p['name'][:50]} | Cat: {p.get('category')} | Vendor: {p.get('vendorName')} | UC: {p.get('ucStatus')}")
        # Verify strict redactions
        for forbidden in [
            "riskScore", "riskLevel", "plainLanguageExplanation", "shapValues",
            "complianceFlags", "costOverrun", "paymentProgressMismatch", "duplicateRisk",
            "hasCitizenReport", "citizenReports", "citizenReportSummary", "alerts", "fundDumpingFlag"
        ]:
            assert forbidden not in p, f"LEAK DETECTED: field '{forbidden}' found in sanitized project {p['id']} for {acc_id}!"
            
    # Verify alert feed is 0
    alerts, count = alerts_service.get_scoped_alerts(user=claims)
    summary = alerts_service.get_summary(user=claims)
    print(f"Alerts feed count: {len(alerts)} (Total: {count}) | Summary totalAlerts: {summary['totalAlerts']}")
    assert len(alerts) == 0, f"Implementing Agency {acc_id} saw alerts!"
    assert summary['totalAlerts'] == 0, f"Implementing Agency summary saw alerts!"

# Verify zero overlap between all pairs of accounts
print("\n--- ZERO OVERLAP VERIFICATION ---")
acc_list = list(project_id_sets.keys())
for i in range(len(acc_list)):
    for j in range(i + 1, len(acc_list)):
        a1, a2 = acc_list[i], acc_list[j]
        s1, s2 = project_id_sets[a1], project_id_sets[a2]
        overlap = s1.intersection(s2)
        print(f"Overlap between {a1} and {a2}: {len(overlap)} projects {list(overlap)}")
        assert len(overlap) == 0, f"Data overlap detected between {a1} and {a2}: {overlap}"

print("\nSUCCESS: All Implementing Agency RBAC, data scoping, zero-overlap, and strict redaction assertions PASSED!")
