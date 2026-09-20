import json

with open('backend/app/data/mockProjects.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

tn = [p for p in projects if p.get('state') == 'Tamil Nadu']
print('Total Tamil Nadu projects:', len(tn))
districts = {}
for p in tn:
    d = p.get('district')
    districts.setdefault(d, []).append(p)

for d, projs in sorted(districts.items()):
    print(f"\nDistrict: {d} ({len(projs)} projects)")
    for p in projs:
        print(f"  - {p['id']}: {p['name'][:40]} | Const: {p.get('constituency')} | Agency: {p.get('implementingAgency')}")
