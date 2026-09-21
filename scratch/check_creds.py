import json

with open('backend/app/data/mockCredentials.json', 'r', encoding='utf-8') as f:
    creds = json.load(f)

print(f"Total credentials: {len(creds)}")
for c in creds:
    lid = c.get('loginId') or ''
    name = c.get('officialName') or ''
    role = c.get('roleName') or ''
    dist = c.get('district') or ''
    ag = c.get('agency') or ''
    print(f"ID: {lid:<25} | Name: {name:<45} | Role: {role:<25} | District: {dist:<15} | Agency: {ag}")
