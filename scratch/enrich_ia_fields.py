"""
Enrich mockProjects.json with:
- ucStatus: NOT_SUBMITTED / SUBMITTED / OVERDUE
  (OVERDUE if project status is 'Completed' or physicalProgress >= 100 and completion date was > 30 days ago without UC submission)
- utilizationCertificate: object (if submitted) or null
- evidenceArtifacts: list of evidence records with auto-tagged sourceTag "Received from Vendor: [vendorName]"
- progressUpdates: history list
"""

import json
from datetime import datetime, timezone
from pathlib import Path

DATA_DIR = Path("backend/app/data")
PROJECTS_FILE = DATA_DIR / "mockProjects.json"

projects = json.load(open(PROJECTS_FILE, "r", encoding="utf-8"))

for p in projects:
    is_completed = p.get("status") == "Completed" or (p.get("physicalProgress") or 0) >= 100
    vendor_name = p.get("vendorName") or "Assigned Contractor"
    
    # Existing or default evidence
    if "evidenceArtifacts" not in p or not p["evidenceArtifacts"]:
        p["evidenceArtifacts"] = [
            {
                "id": f"EVD-{p['id']}-01",
                "milestoneStage": "Foundation & Site Preparation",
                "description": f"Geo-tagged progress verification photographs for {p['name']}.",
                "photoUrl": "/assets/evidence/site_prep.jpg",
                "fileName": "site_inspection_stage1.jpg",
                "uploadedAt": "2024-06-20T10:30:00Z",
                "vendorName": vendor_name,
                "sourceTag": f"Received from Vendor: {vendor_name}"
            }
        ]
        if (p.get("physicalProgress") or 0) >= 50:
            p["evidenceArtifacts"].append({
                "id": f"EVD-{p['id']}-02",
                "milestoneStage": "Intermediate Civil Execution",
                "description": "Measurement book validation and structural concrete core test report.",
                "photoUrl": "/assets/evidence/intermediate_civil.jpg",
                "fileName": "mb_record_stage2.pdf",
                "uploadedAt": "2024-11-15T14:15:00Z",
                "vendorName": vendor_name,
                "sourceTag": f"Received from Vendor: {vendor_name}"
            })

    # Progress updates history
    if "progressUpdates" not in p or not p["progressUpdates"]:
        p["progressUpdates"] = [
            {
                "date": p.get("dateSpent") or "2024-06-15",
                "physicalProgress": min(40, p.get("physicalProgress") or 0),
                "financialProgress": min(40.0, p.get("financialProgress") or 0.0),
                "stage": "Foundation Level Completion",
                "remarks": "Initial civil layout and earthworks certified by site engineer.",
                "updatedBy": p.get("implementingAgency") or "Executing Division"
            }
        ]
        if (p.get("physicalProgress") or 0) > 40:
            p["progressUpdates"].append({
                "date": "2025-01-20",
                "physicalProgress": p.get("physicalProgress") or 0,
                "financialProgress": p.get("financialProgress") or 0.0,
                "stage": "Current Execution Stage",
                "remarks": "Measurement Book verification uploaded with vendor invoice details.",
                "updatedBy": p.get("implementingAgency") or "Executing Division"
            })

    # Determine UC status
    if is_completed:
        # Seed realistic mix of SUBMITTED and OVERDUE
        # If project id ends in even number or has explicit certificate -> SUBMITTED
        # If completed > 30 days ago (e.g. financialYear 2024-25) without submission -> OVERDUE
        if p.get("id") in ["PRJ-IND-KA-006", "PRJ-IND-MH-008", "PRJ-IND-3005"]:
            p["ucStatus"] = "SUBMITTED"
            p["utilizationCertificate"] = {
                "ucNumber": f"UC/MPLADS/{p.get('financialYear', '2024-25')}/{p['id']}",
                "submissionDate": "2025-01-15T09:30:00Z",
                "certifiedAmount": p.get("sanctionedAmount") or p.get("expenditure"),
                "status": "SUBMITTED",
                "remarks": "Final physical execution completed 100%. All vendor accounts cleared and audited."
            }
        else:
            # Overdue for completion older than 30 days
            p["ucStatus"] = "OVERDUE"
            p["utilizationCertificate"] = None
    else:
        p["ucStatus"] = "NOT_SUBMITTED"
        p["utilizationCertificate"] = None

with open(PROJECTS_FILE, "w", encoding="utf-8") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

print(f"Enriched {len(projects)} projects in {PROJECTS_FILE}")
uc_counts = {}
for p in projects:
    uc_counts[p['ucStatus']] = uc_counts.get(p['ucStatus'], 0) + 1
print("UC Status breakdown:", uc_counts)
