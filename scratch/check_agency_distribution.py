import json
from collections import defaultdict

with open('backend/app/data/mockProjects.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

agency_district_counts = defaultdict(lambda: defaultdict(list))
for p in projects:
    agency = p.get('implementingAgency', 'None')
    district = p.get('district', 'None')
    agency_district_counts[agency][district].append(p['id'])

print("Agencies and their districts:")
for agency, districts in sorted(agency_district_counts.items()):
    print(f"\n=== Agency: {agency} (Total projects: {sum(len(v) for v in districts.values())}) ===")
    for d, pids in sorted(districts.items()):
        print(f"  {d} ({len(pids)}): {', '.join(pids)}")
