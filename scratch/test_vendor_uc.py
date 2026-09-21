import json

projects = json.load(open('backend/app/data/mockProjects.json', encoding='utf-8'))
print('Total projects:', len(projects))
vendors = set(p.get('vendorName') for p in projects)
print('Total unique vendors:', len(vendors))
completed = [p for p in projects if p.get('status') == 'Completed' or (p.get('physicalProgress') or 0) >= 100]
print('Completed projects:', len(completed))
for p in completed[:10]:
    print(f"  - {p['id']} ({p['state']} - {p['district']}): {p['name'][:40]} | vendor: {p.get('vendorName')}")
