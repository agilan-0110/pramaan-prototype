import json

PROJECTS_PATH = 'backend/app/data/mockProjects.json'

with open(PROJECTS_PATH, 'r', encoding='utf-8') as f:
    projects = json.load(f)

print(f"Loaded {len(projects)} projects.")

for p in projects:
    status = p.get('status', '')
    phys = p.get('physicalProgress', 0)
    current_uc = p.get('ucStatus')
    
    if current_uc not in ['SUBMITTED', 'OVERDUE', 'NOT_SUBMITTED']:
        if status == 'Completed' or phys >= 100:
            p['ucStatus'] = 'NOT_SUBMITTED'
        else:
            p['ucStatus'] = 'NOT_SUBMITTED'

# Completed projects with SUBMITTED UC
submitted_pids = ['PRJ-IND-2018', 'PRJ-IND-2023', 'PRJ-IND-2027', 'PRJ-IND-2029', 'PRJ-IND-2030', 'PRJ-IND-TN-103']
for p in projects:
    if p['id'] in submitted_pids:
        p['ucStatus'] = 'SUBMITTED'
        p['utilizationCertificate'] = {
            'ucNumber': f"UC/MPLADS/2026/{p['id'].replace('PRJ-IND-', '')}",
            'certifiedAmount': p.get('sanctionedAmount', 5000000),
            'submissionDate': '2026-02-15T10:00:00Z',
            'status': 'SUBMITTED',
            'remarks': 'Final accounts verified and statutory UC submitted to District Authority.',
            'auditCertificateRef': f"VCH/202602/{p['id']}",
            'submittedBy': p.get('implementingAgency', 'Executing Division')
        }

# Completed projects with OVERDUE UC (> 30 days after completion without UC)
overdue_pids = [
    'PRJ-IND-2006', 'PRJ-IND-2009', 'PRJ-IND-2011', 'PRJ-IND-2017',
    'PRJ-IND-TN-101', 'PRJ-IND-KA-101', 'PRJ-IND-MH-101', 'PRJ-IND-UP-101',
    'PRJ-IND-WB-101', 'PRJ-IND-KL-101', 'PRJ-IND-RJ-101', 'PRJ-IND-PB-101'
]
for p in projects:
    if p['id'] in overdue_pids or (p.get('status') == 'Completed' and p.get('ucStatus') != 'SUBMITTED'):
        p['ucStatus'] = 'OVERDUE'

# Ensure evidenceArtifacts and progressUpdates on all projects
for p in projects:
    vname = p.get('vendorName') or 'Assigned Line Contractor'
    if not p.get('evidenceArtifacts'):
        p['evidenceArtifacts'] = [
            {
                'id': f"EVD-{p['id']}-01",
                'projectId': p['id'],
                'milestoneStage': 'Foundation & Earthwork Inspection',
                'description': f"Site verification photos and core sample test reports for {p.get('name', 'Public Work')}.",
                'photoUrl': '/assets/evidence/site_progress.jpg',
                'fileName': 'milestone_inspection_photo_01.jpg',
                'uploadedAt': '2026-01-15T11:30:00Z',
                'vendorName': vname,
                'sourceTag': f"Received from Vendor: {vname}",
                'uploadedBy': p.get('implementingAgency', 'Line Agency Division')
            }
        ]
    else:
        # Ensure sourceTag is properly formatted with vendorName
        for ev in p['evidenceArtifacts']:
            ev_vname = ev.get('vendorName') or vname
            ev['vendorName'] = ev_vname
            ev['sourceTag'] = f"Received from Vendor: {ev_vname}"

    if not p.get('progressUpdates'):
        p['progressUpdates'] = [
            {
                'date': p.get('dateSpent') or '2026-02-10',
                'timestamp': '2026-02-10T14:00:00Z',
                'physicalProgress': p.get('physicalProgress', 0),
                'financialProgress': p.get('financialProgress', 0.0),
                'stage': f"Stage Execution ({p.get('physicalProgress', 0)}%)",
                'remarks': f"Site work ongoing per statutory milestone schedule by {vname}.",
                'updatedBy': p.get('implementingAgency', 'Line Agency Division')
            }
        ]

with open(PROJECTS_PATH, 'w', encoding='utf-8') as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

uc_counts = {}
for p in projects:
    s = p.get('ucStatus')
    uc_counts[s] = uc_counts.get(s, 0) + 1
print('Successfully updated mockProjects.json!')
print('UC Counts across all projects:', uc_counts)
