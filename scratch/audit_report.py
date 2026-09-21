import json
from collections import defaultdict

projects = json.load(open('backend/app/data/mockProjects.json', encoding='utf-8'))
mps = json.load(open('backend/app/data/mockMPs.json', encoding='utf-8'))
creds = json.load(open('backend/app/data/mockCredentials.json', encoding='utf-8'))

print("=== 1, 2, 3. STATE-BY-STATE PROJECT AND FLAG BREAKDOWN ===")
state_proj = defaultdict(list)
for p in projects:
    state_proj[p.get('state', 'Unknown')].append(p)

for state, p_list in sorted(state_proj.items(), key=lambda x: -len(x[1])):
    districts = sorted(list(set(p.get('district', 'Unknown') for p in p_list)))
    crit_count = sum(1 for p in p_list if p.get('riskLevel') == 'CRITICAL' or (p.get('riskScore') or 0) >= 80)
    comp_count = sum(1 for p in p_list if p.get('costOverrun') or p.get('paymentProgressMismatch') or (p.get('complianceFlags') and len(p.get('complianceFlags')) > 0))
    dup_count = sum(1 for p in p_list if p.get('duplicateRisk'))
    cit_count = sum(1 for p in p_list if p.get('hasCitizenReport'))
    print(f"{state}: {len(p_list)} projects | Districts ({len(districts)}): {districts} | CRITICAL: {crit_count}, Compliance: {comp_count}, Duplicate: {dup_count}, Citizen: {cit_count}")

print("\n=== 4. DUPLICATE WORK PAIRS (CROSS-DISTRICT / CROSS-STATE) ===")
for p in projects:
    if p.get('duplicateRisk') or p.get('duplicateMatchedProjectId'):
        print(f"  Project {p['id']} ({p['state']} - {p['district']}) -> match: {p.get('duplicateMatchedProjectId')} | vendor: {p.get('vendorName')}")

print("\n=== 5. NOMINATED MPs (mpType field) ===")
for m in mps:
    if m.get('mpType') == 'NOMINATED_MP' or 'nominated' in (m.get('house') or '').lower() or 'nominated' in (m.get('constituency') or '').lower():
        print(f"  ID: {m['id']} | Name: {m['name']} | House: {m.get('house')} | mpType: {m.get('mpType')} | Chosen: {m.get('chosenDistricts')}")

print("\n=== 6. STATE NODAL DEMO LOGINS IN mockCredentials.json ===")
for c in creds:
    role = (c.get('officialRole') or c.get('role') or '').lower()
    scope = (c.get('accessScope') or '').lower()
    if 'state' in role or scope == 'state_rollup' or c.get('roleId') == 'state_nodal':
        print(f"  Login: {c.get('loginId')} | Role: {c.get('officialRole') or c.get('role')} | State: {c.get('state')} | Scope: {c.get('accessScope')}")
