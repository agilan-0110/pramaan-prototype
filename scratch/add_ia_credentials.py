import json
import bcrypt

CREDS_PATH = 'backend/app/data/mockCredentials.json'

with open(CREDS_PATH, 'r', encoding='utf-8') as f:
    creds = json.load(f)

# Existing IDs
existing_ids = {c['loginId'] for c in creds}

def make_hash(pw: str) -> str:
    return bcrypt.hashpw(pw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

new_ia_accounts = [
    {
        "loginId": "ADM-IA-TWAD-TN-CHN-009",
        "passwordHash": make_hash("TWADWorks#Pass2026"),
        "officialRole": "Implementing Agency",
        "role": "Implementing Agency",
        "roleName": "Implementing Agency",
        "roleId": "implementing_agency",
        "officialName": "Executive Engineer (Water Works), TWAD Board Chennai",
        "jurisdiction": "Tamil Nadu Water Supply & Drainage Board (TWAD) — Chennai",
        "level": "Execution Agency",
        "accessScope": "agency_assigned_only",
        "state": "Tamil Nadu",
        "district": "Chennai",
        "constituency": None,
        "agency": "Rural Water Supply & Sanitation Board — Chennai",
        "aliases": [
            "twad_chennai",
            "water_agency_tn",
            "ia_water_chn"
        ]
    },
    {
        "loginId": "ADM-IA-UP-LKO-015",
        "passwordHash": make_hash("Education#Pass2026"),
        "officialRole": "Implementing Agency",
        "role": "Implementing Agency",
        "roleName": "Implementing Agency",
        "roleId": "implementing_agency",
        "officialName": "District Basic Education Officer (BSA), Lucknow Division",
        "jurisdiction": "Department of Public Instruction — Lucknow (Uttar Pradesh)",
        "level": "Execution Agency",
        "accessScope": "agency_assigned_only",
        "state": "Uttar Pradesh",
        "district": "Lucknow",
        "constituency": None,
        "agency": "Department of Public Instruction — Lucknow",
        "aliases": [
            "bsa_lucknow",
            "education_agency_up",
            "ia_edu_lko"
        ]
    }
]

for acc in new_ia_accounts:
    if acc['loginId'] not in existing_ids:
        creds.append(acc)
        print(f"Added {acc['loginId']}")

with open(CREDS_PATH, 'w', encoding='utf-8') as f:
    json.dump(creds, f, indent=2, ensure_ascii=False)

print("Updated mockCredentials.json successfully.")
