import json

with open('backend/app/data/mockProjects.json', 'r', encoding='utf-8') as f:
    prjs = json.load(f)

nom_prjs = [p for p in prjs if p.get('mpId') == 'MP-NOM-IND-001' or 'Swaminathan' in p.get('mpName', '')]
print(f"Projects explicitly tagged to MP-NOM-IND-001: {len(nom_prjs)}")
for p in nom_prjs:
    print(f"  - [{p['id']}] {p['name'][:50]} (Dist: {p.get('district')}, State: {p.get('state')})")

chn_c_prjs = [p for p in prjs if p.get('constituency') == 'Chennai Central']
print(f"\nProjects in Chennai Central: {len(chn_c_prjs)}")
for p in chn_c_prjs:
    print(f"  - [{p['id']}] {p['name'][:50]} (MP: {p.get('mpName')})")

chn_total = [p for p in prjs if p.get('district') == 'Chennai']
print(f"\nTotal projects in Chennai District (DA view): {len(chn_total)}")
