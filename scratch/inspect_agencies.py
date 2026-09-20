import json

with open('backend/app/data/mockProjects.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

print('Total projects:', len(projects))
agencies = set(p.get('implementingAgency', '') for p in projects)
print('Unique implementingAgency values:')
for a in sorted(agencies):
    print(' -', repr(a))

districts = set(p.get('district', '') for p in projects)
print('\nUnique districts:', sorted(districts))

print('\nSample projects in Bengaluru Urban:')
blr = [p for p in projects if p.get('district') == 'Bengaluru Urban']
print(f'Count in Bengaluru Urban: {len(blr)}')
for p in blr:
    print(f"  ID: {p['id']}, Agency: {p.get('implementingAgency')}, Category: {p.get('category')}, Name: {p.get('name')[:50]}")

print('\nSample projects in Howrah:')
how = [p for p in projects if p.get('district') == 'Howrah']
print(f'Count in Howrah: {len(how)}')
for p in how:
    print(f"  ID: {p['id']}, Agency: {p.get('implementingAgency')}, Category: {p.get('category')}, Name: {p.get('name')[:50]}")
