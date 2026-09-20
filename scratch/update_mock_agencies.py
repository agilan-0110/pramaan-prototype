import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "backend" / "app" / "data"
PROJECTS_FILE = DATA_DIR / "mockProjects.json"

with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
    projects = json.load(f)

print(f"Loaded {len(projects)} projects from {PROJECTS_FILE}")

for p in projects:
    district = p.get("district", "").strip()
    agency = p.get("implementingAgency", "").strip()
    category = p.get("category", "").strip()
    pid = p.get("id")

    # Specific district agency assignments for test accounts
    if pid == "PRJ-IND-2020":
        # Bengaluru Urban PWD assignment
        p["implementingAgency"] = f"Public Works Department (PWD) — {district}"
        p["category"] = "Road"
        p["name"] = "Upgradation and Bituminous Surfacing of Main Rural Feeder Road, Bengaluru Urban"
    elif pid == "PRJ-IND-2028":
        # Howrah Municipal Corporation assignment
        p["implementingAgency"] = f"Municipal Corporation & Urban Development Authority — {district}"
        p["category"] = "Civic"
    else:
        # If agency doesn't already have district suffix, add " — {district}"
        if " — " not in agency and " - " not in agency:
            p["implementingAgency"] = f"{agency} — {district}"

with open(PROJECTS_FILE, "w", encoding="utf-8") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

print("Successfully updated mockProjects.json with district-specific implementingAgency values.")

# Verify unique agencies
agencies = set(p["implementingAgency"] for p in projects)
print(f"Total unique agency-location strings: {len(agencies)}")
sample = list(agencies)[:10]
for s in sample:
    print(f"  - {s}")
