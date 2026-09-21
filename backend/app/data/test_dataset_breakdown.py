import json
from collections import Counter

projects = json.load(open("backend/app/data/mockProjects.json", encoding="utf-8"))
mps = json.load(open("backend/app/data/mockMPs.json", encoding="utf-8"))
creds = json.load(open("backend/app/data/mockCredentials.json", encoding="utf-8"))

print("=== NATIONAL DATASET BREAKDOWN BY TIER ===")
print(f"Total Projects: {len(projects)}")
print(f"Total States/UTs: {len(set(p['state'] for p in projects))}")
print(f"Total MPs: {len(mps)}")
print(f"Total Logins in mockCredentials: {len(creds)}")

state_counts = Counter(p["state"] for p in projects)
print("\n[Tier 1 - Primary Deep State]")
print(f"  - Tamil Nadu: {state_counts['Tamil Nadu']} projects")

print("\n[Tier 2 - Secondary Demo States (Demo-Ready Depth)]")
for s in ["Karnataka", "Maharashtra", "Uttar Pradesh"]:
    districts = set(p["district"] for p in projects if p["state"] == s)
    crit = sum(1 for p in projects if p["state"] == s and p.get("riskLevel") == "CRITICAL")
    cit = sum(1 for p in projects if p["state"] == s and p.get("hasCitizenReport"))
    dup = sum(1 for p in projects if p["state"] == s and p.get("duplicateRisk"))
    print(f"  - {s}: {state_counts[s]} projects across {len(districts)} districts {list(districts)} | CRITICAL: {crit}, Citizen: {cit}, Duplicate: {dup}")

print("\n[Tier 3 - Remaining States/UTs (Light Presence for Realism)]")
tier3 = [s for s in state_counts if s not in ["Tamil Nadu", "Karnataka", "Maharashtra", "Uttar Pradesh"]]
print(f"Total Tier 3 States/UTs: {len(tier3)}")
for s in sorted(tier3):
    print(f"  - {s}: {state_counts[s]} projects ({list(set(p['district'] for p in projects if p['state'] == s))})")

print("\n[Cross-State Duplicate Pair Check]")
ka_dup = next(p for p in projects if p["id"] == "PRJ-IND-KA-003")
mh_dup = next(p for p in projects if p["id"] == "PRJ-IND-MH-003")
print(f"  KA: {ka_dup['id']} ({ka_dup['state']} - {ka_dup['district']}) | Vendor: {ka_dup['vendorName']}")
print(f"  MH: {mh_dup['id']} ({mh_dup['state']} - {mh_dup['district']}) | Vendor: {mh_dup['vendorName']}")

print("\n[Nominated MP Check]")
nom = next(m for m in mps if m.get("mpType") == "NOMINATED_MP")
print(f"  ID: {nom['id']} | Name: {nom['name']} | Type: {nom['mpType']} | Chosen: {nom['chosenDistricts']}")

print("\n[Credentials Check]")
for c in creds:
    print(f"  - {c.get('officialRole')}: {c.get('loginId')} | Scope: {c.get('accessScope')} | State: {c.get('state')}")
