import os, sys, json
sys.path.insert(0, os.path.abspath('backend'))

from app.services import auth, alerts, audit, citizen_nlp, compliance, duplicate, predictive, risk, trend

all_alerts = alerts.get_alerts(limit=500)
print(f"Total computed alerts: {len(all_alerts)}")

test_users = [
    {"role": "MP Office", "roleId": "mp_office", "mpType": "CONSTITUENCY_MP", "constituency": "Chennai Central", "state": "Tamil Nadu", "district": "Chennai", "accessScope": "constituency_only"},
    {"role": "MP Office", "roleId": "mp_office", "mpType": "NOMINATED_MP", "chosenDistricts": ["Chennai", "Bengaluru Urban", "Pune"], "accessScope": "nominated_mp_districts"},
    {"role": "District Authority", "roleId": "district_authority", "district": "Chennai", "state": "Tamil Nadu", "accessScope": "district_all"},
    {"role": "Implementing Agency", "roleId": "implementing_agency", "district": "Chennai", "agency": "Public Works Department (PWD)", "accessScope": "agency_assigned_only"},
    {"role": "State Nodal Authority", "roleId": "state_nodal", "state": "Tamil Nadu", "accessScope": "state_rollup"},
    {"role": "Central Nodal Agency (MoSPI)", "roleId": "mospi_officer", "accessScope": "national_all"},
    {"role": "Auditor / CAG", "roleId": "auditor_cag", "accessScope": "statutory_audit_all"}
]

print("\n--- Testing Alerts Scoping per Role ---")
for u in test_users:
    res, count = alerts.get_alerts_aggregator().get_scoped_alerts(user=u, limit=500)
    desc = u.get("mpType") or u.get("district") or u.get("state") or "National"
    print(f"Role: {u['role']:<30} Scope: {desc:<20} Alerts visible in queue: {len(res)} (count={count})")

print("\n--- Testing Projects Scoping per Role ---")
all_projects = duplicate.load_projects()
for u in test_users:
    scoped_p = auth.filter_projects_by_user_scope(all_projects, u)
    desc = u.get("mpType") or u.get("district") or u.get("state") or "National"
    print(f"Role: {u['role']:<30} Scope: {desc:<20} Projects visible: {len(scoped_p)}")
