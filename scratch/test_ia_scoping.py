import sys
sys.path.insert(0, 'backend')
import json
from app.services.auth import filter_projects_by_user_scope

projects = json.load(open('backend/app/data/mockProjects.json', encoding='utf-8'))

ia_accounts = [
    {
        "loginId": "ADM-IA-PWD-TN-CHN-008",
        "role": "Implementing Agency",
        "roleId": "implementing_agency",
        "state": "Tamil Nadu",
        "district": "Chennai",
        "agency": "Public Works Department (PWD) — Chennai",
        "accessScope": "agency_assigned_only"
    },
    {
        "loginId": "ADM-IA-TWAD-TN-CHN-009",
        "role": "Implementing Agency",
        "roleId": "implementing_agency",
        "state": "Tamil Nadu",
        "district": "Chennai",
        "agency": "Tamil Nadu Water Supply & Drainage Board (TWAD) — Chennai",
        "accessScope": "agency_assigned_only"
    },
    {
        "loginId": "ADM-IA-PWD-KA-BLR-028",
        "role": "Implementing Agency",
        "roleId": "implementing_agency",
        "state": "Karnataka",
        "district": "Bengaluru Urban",
        "agency": "Public Works Department (PWD) — Bengaluru Urban",
        "accessScope": "agency_assigned_only"
    },
    {
        "loginId": "ADM-IA-UP-LKO-015",
        "role": "Implementing Agency",
        "roleId": "implementing_agency",
        "state": "Uttar Pradesh",
        "district": "Lucknow",
        "agency": "Uttar Pradesh Basic Shiksha Parishad — Lucknow",
        "accessScope": "agency_assigned_only"
    }
]

for ia in ia_accounts:
    scoped = filter_projects_by_user_scope(projects, ia)
    print(f"\nAccount: {ia['loginId']} ({ia['district']} - {ia['agency']}): {len(scoped)} projects")
    for p in scoped:
        print(f"  - [{p['id']}] ({p['category']}) {p['name'][:50]} | Agency: {p.get('implementingAgency')} | Vendor: {p.get('vendorName')}")
