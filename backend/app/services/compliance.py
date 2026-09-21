"""
Compliance Rule Engine Service for SETU.

Evaluates statutory compliance and procedural integrity rules for MPLADS projects:
1. Category Expenditure Ceiling Breach
2. Statutory Completion Deadline Breach (548-day execution limit)
3. Implementing Agency & Category Mismatch
4. Single-Approval Fund-Splitting / Tender Slicing Detection
"""

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

# Path to mock data store
DATA_DIR = Path(__file__).resolve().parent.parent / "data"
PROJECTS_FILE = DATA_DIR / "mockProjects.json"

# --- Rule Configuration & Thresholds ---

# Statutory category expenditure ceilings in INR
CATEGORY_CEILINGS: Dict[str, int] = {
    "Road": 12_000_000,       # ₹1.20 Crore
    "Building": 25_000_000,   # ₹2.50 Crore
    "Bridge": 20_000_000,     # ₹2.00 Crore
    "Health": 12_000_000,     # ₹1.20 Crore
    "Education": 10_000_000,  # ₹1.00 Crore
    "Water": 12_000_000,      # ₹1.20 Crore
    "Civic": 10_000_000,      # ₹1.00 Crore
}
DEFAULT_CATEGORY_CEILING = 10_000_000  # ₹1.00 Crore default

# Statutory completion timeline (18 months / 548 days from administrative sanction)
STATUTORY_DEADLINE_DAYS = 548
BASELINE_SCHEDULED_DAYS = 365

# Standard institutional mapping for category to permitted implementing agencies
STANDARD_AGENCY_MAPPINGS: Dict[str, List[str]] = {
    "Road": [
        "Public Works Department (PWD)",
        "PWD",
        "Roads & Bridges",
        "Highways Department",
        "State PWD",
    ],
    "Building": [
        "Public Works Department (PWD)",
        "PWD",
        "Public Works Department (Buildings)",
        "Buildings & Roads",
        "State PWD",
    ],
    "Bridge": [
        "Public Works Department (PWD)",
        "PWD",
        "Roads & Bridges",
        "Highways Department",
        "State PWD",
    ],
    "Health": [
        "District Health Mission",
        "Health Department",
        "Department of Health & Family Welfare",
        "District Hospital Authority",
    ],
    "Education": [
        "Department of Public Instruction",
        "Education Department",
        "School Education Directorate",
        "Public Instruction",
    ],
    "Water": [
        "Rural Water Supply & Sanitation Board",
        "Water Supply & Sanitation Board",
        "Jal Board",
        "PHED",
        "Water Resources Department",
    ],
    "Civic": [
        "Municipal Corporation & Urban Development Authority",
        "Municipal Corporation",
        "Urban Development Authority",
        "Panchayati Raj Department",
        "Zilla Parishad",
        "Municipality",
    ],
}

# Canonical primary executing authorities for concise, professional alert messages
CANONICAL_STANDARD_AGENCIES: Dict[str, str] = {
    "Road": "Public Works Department (PWD)",
    "Building": "Public Works Department (PWD)",
    "Bridge": "Public Works Department (PWD)",
    "Health": "District Health Mission / Health Department",
    "Education": "Department of Public Instruction / Education Department",
    "Water": "Rural Water Supply & Sanitation Board",
    "Civic": "Municipal Corporation & Urban Development Authority",
}


def get_standard_agency_for_category(category: str) -> str:
    """Returns the primary canonical standard executing authority name for a given category."""
    cat_clean = (category or "").strip()
    if not cat_clean:
        return "Designated Institutional Line Department"
    if cat_clean in CANONICAL_STANDARD_AGENCIES:
        return CANONICAL_STANDARD_AGENCIES[cat_clean]
    for k, v in CANONICAL_STANDARD_AGENCIES.items():
        if k.lower() == cat_clean.lower():
            return v
    for k, v in STANDARD_AGENCY_MAPPINGS.items():
        if k.lower() == cat_clean.lower() and v:
            return v[0]
    cat_lower = cat_clean.lower()
    if any(term in cat_lower for term in ("road", "bridge", "building", "infra", "civil", "structure")):
        return CANONICAL_STANDARD_AGENCIES["Road"]
    if any(term in cat_lower for term in ("health", "hospital", "clinic", "medical")):
        return CANONICAL_STANDARD_AGENCIES["Health"]
    if any(term in cat_lower for term in ("edu", "school", "college", "instruction")):
        return CANONICAL_STANDARD_AGENCIES["Education"]
    if any(term in cat_lower for term in ("water", "drain", "sanitation", "jal")):
        return CANONICAL_STANDARD_AGENCIES["Water"]
    if any(term in cat_lower for term in ("civic", "urban", "municipal", "panchayat")):
        return CANONICAL_STANDARD_AGENCIES["Civic"]
    return "Designated Institutional Line Department"


def get_expected_agencies_for_category(category: str) -> List[str]:
    """Returns permitted implementing agency keywords/patterns for a category."""
    cat_clean = (category or "").strip()
    if cat_clean in STANDARD_AGENCY_MAPPINGS:
        return STANDARD_AGENCY_MAPPINGS[cat_clean]
    for k, v in STANDARD_AGENCY_MAPPINGS.items():
        if k.lower() == cat_clean.lower():
            return v
    cat_lower = cat_clean.lower()
    if any(term in cat_lower for term in ("road", "bridge", "building", "infra", "civil")):
        return STANDARD_AGENCY_MAPPINGS["Road"]
    if any(term in cat_lower for term in ("health", "hospital", "clinic")):
        return STANDARD_AGENCY_MAPPINGS["Health"]
    if any(term in cat_lower for term in ("edu", "school", "instruction")):
        return STANDARD_AGENCY_MAPPINGS["Education"]
    if any(term in cat_lower for term in ("water", "sanitation", "jal")):
        return STANDARD_AGENCY_MAPPINGS["Water"]
    if any(term in cat_lower for term in ("civic", "urban", "municipal")):
        return STANDARD_AGENCY_MAPPINGS["Civic"]
    return ["Public Works Department (PWD)"]

# Statutory open tender / single administrative approval ceiling in INR
SINGLE_APPROVAL_THRESHOLD = 10_000_000  # ₹1.00 Crore


def load_projects() -> List[Dict[str, Any]]:
    """Loads projects from the mock projects data store."""
    if not PROJECTS_FILE.exists():
        return []
    with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def get_project_by_id(project_id: str, all_projects: Optional[List[Dict[str, Any]]] = None) -> Optional[Dict[str, Any]]:
    """Finds a project by its unique ID."""
    projects = all_projects if all_projects is not None else load_projects()
    for proj in projects:
        if proj.get("id") == project_id:
            return proj
    return None


def evaluate_ceiling_breach(project: Dict[str, Any]) -> Dict[str, Any]:
    """
    Rule 1: Ceiling Breach
    Flags if sanctionedAmount exceeds category-appropriate statutory ceiling limits.
    """
    category = project.get("category", "General")
    sanctioned_amount = project.get("sanctionedAmount", 0)
    ceiling_limit = CATEGORY_CEILINGS.get(category, DEFAULT_CATEGORY_CEILING)

    is_breached = sanctioned_amount > ceiling_limit
    excess_amount = max(0, sanctioned_amount - ceiling_limit)
    excess_pct = round((excess_amount / ceiling_limit) * 100, 1) if ceiling_limit > 0 else 0

    severity = "CRITICAL" if excess_pct >= 25 else ("HIGH" if is_breached else "NONE")

    if is_breached:
        message = (
            f"Sanctioned amount ₹{sanctioned_amount:,} exceeds statutory ceiling limit of "
            f"₹{ceiling_limit:,} for category '{category}' by ₹{excess_amount:,} (+{excess_pct}%)."
        )
    else:
        message = (
            f"Sanctioned amount ₹{sanctioned_amount:,} is within approved statutory ceiling of "
            f"₹{ceiling_limit:,} for category '{category}'."
        )

    return {
        "ruleId": "RULE_CEILING_BREACH",
        "ruleName": "Category Expenditure Ceiling Breach",
        "passed": not is_breached,
        "status": "FLAGGED" if is_breached else "PASSED",
        "severity": severity,
        "message": message,
        "threshold": ceiling_limit,
        "actualValue": sanctioned_amount,
        "details": {
            "category": category,
            "ceilingLimit": ceiling_limit,
            "sanctionedAmount": sanctioned_amount,
            "excessAmount": excess_amount,
            "excessPercentage": excess_pct,
        },
    }


def evaluate_deadline_breach(
    project: Dict[str, Any],
    threshold_days: int = STATUTORY_DEADLINE_DAYS,
) -> Dict[str, Any]:
    """
    Rule 2: Deadline Breach
    Flags if project exceeds expected completion timeline (fixed threshold: 548 days from sanction/start).
    """
    days_delayed = project.get("daysDelayed", 0)

    # Compute execution timeline from daysSinceStart if provided, else baseline 365 + daysDelayed
    if "daysSinceStart" in project and project["daysSinceStart"] is not None:
        elapsed_days = int(project["daysSinceStart"])
    else:
        elapsed_days = BASELINE_SCHEDULED_DAYS + days_delayed

    is_breached = elapsed_days > threshold_days
    overdue_days = max(0, elapsed_days - threshold_days)

    severity = "CRITICAL" if overdue_days >= 30 else ("HIGH" if is_breached else "NONE")

    if is_breached:
        message = (
            f"Project execution timeline ({elapsed_days} days) breaches the statutory {threshold_days}-day "
            f"completion limit by {overdue_days} days (recorded milestone delay: {days_delayed} days)."
        )
    else:
        message = (
            f"Project execution timeline ({elapsed_days} days) conforms to statutory completion "
            f"schedule (threshold: {threshold_days} days)."
        )

    return {
        "ruleId": "RULE_DEADLINE_BREACH",
        "ruleName": "Statutory Completion Deadline Breach",
        "passed": not is_breached,
        "status": "FLAGGED" if is_breached else "PASSED",
        "severity": severity,
        "message": message,
        "threshold": threshold_days,
        "actualValue": elapsed_days,
        "details": {
            "elapsedTimelineDays": elapsed_days,
            "statutoryLimitDays": threshold_days,
            "daysDelayed": days_delayed,
            "overdueDays": overdue_days,
        },
    }


def evaluate_category_mismatch(project: Dict[str, Any]) -> Dict[str, Any]:
    """
    Rule 3: Category Mismatch
    Flags if category and implementingAgency do not align per the standard mapping.
    """
    category = (project.get("category") or "").strip()
    agency = (project.get("implementingAgency") or "").strip()

    expected_agencies = get_expected_agencies_for_category(category)
    standard_agency_name = get_standard_agency_for_category(category)

    # Check if any valid agency identifier or keyword matches the assigned agency
    is_aligned = any(
        exp.lower() in agency.lower() or agency.lower() in exp.lower()
        for exp in expected_agencies
    )

    is_mismatched = not is_aligned
    severity = "CRITICAL" if is_mismatched else "NONE"

    if is_mismatched:
        message = (
            f"Implementing agency '{agency}' does not conform to institutional jurisdiction for "
            f"category '{category}' (standard executing authority: {standard_agency_name})."
        )
    else:
        message = (
            f"Implementing agency '{agency}' is administratively authorized for category '{category}'."
        )

    return {
        "ruleId": "RULE_CATEGORY_MISMATCH",
        "ruleName": "Implementing Agency Alignment",
        "passed": not is_mismatched,
        "status": "FLAGGED" if is_mismatched else "PASSED",
        "severity": severity,
        "message": message,
        "expectedAgency": standard_agency_name,
        "actualAgency": agency,
        "details": {
            "category": category,
            "assignedAgency": agency,
            "standardExecutingAuthority": standard_agency_name,
            "permittedAgencyTypes": expected_agencies,
        },
    }


def evaluate_fund_splitting(
    project: Dict[str, Any],
    all_projects: List[Dict[str, Any]],
    threshold: int = SINGLE_APPROVAL_THRESHOLD,
) -> Dict[str, Any]:
    """
    Rule 4: Fund-Splitting Detection
    Flags when the same vendor has multiple sanctioned projects whose combined amount
    exceeds a single-approval threshold, but each individual project falls below it.
    """
    vendor_id = project.get("vendorId")
    vendor_name = project.get("vendorName")
    current_proj_id = project.get("id")

    if not vendor_name and not vendor_id:
        return {
            "ruleId": "RULE_FUND_SPLITTING",
            "ruleName": "Single-Approval Split Tender Detection",
            "passed": True,
            "status": "PASSED",
            "severity": "NONE",
            "message": "No vendor identifier attached to project.",
            "threshold": threshold,
            "actualValue": 0,
            "details": {},
        }

    # Match all projects belonging to the same vendor
    vendor_projects = [
        p for p in all_projects
        if (vendor_id and p.get("vendorId") == vendor_id) or
           (vendor_name and p.get("vendorName") == vendor_name)
    ]

    # Filter projects whose individual sanctioned amount falls below the single-approval threshold
    sub_threshold_projects = [
        p for p in vendor_projects
        if p.get("sanctionedAmount", 0) < threshold
    ]

    combined_sub_amount = sum(p.get("sanctionedAmount", 0) for p in sub_threshold_projects)
    sub_count = len(sub_threshold_projects)

    # Flag if:
    # 1. Vendor has multiple (>= 2) sub-threshold works
    # 2. Combined total of these sub-threshold works exceeds the single-approval threshold
    # 3. Current project is part of these sub-threshold packages
    current_is_sub_threshold = any(p.get("id") == current_proj_id for p in sub_threshold_projects)
    is_fund_splitting = (sub_count >= 2) and (combined_sub_amount > threshold) and current_is_sub_threshold

    severity = "CRITICAL" if is_fund_splitting else "NONE"
    split_ids = [p.get("id") for p in sub_threshold_projects]
    split_names = [p.get("name") for p in sub_threshold_projects]

    if is_fund_splitting:
        vendor_label = vendor_name or vendor_id
        message = (
            f"Vendor '{vendor_label}' has {sub_count} sanctioned works individually below ₹{threshold:,} "
            f"whose combined value of ₹{combined_sub_amount:,} exceeds the single-approval ceiling "
            f"(statutory tender-slicing / fund-splitting pattern detected)."
        )
    else:
        vendor_label = vendor_name or vendor_id or "Assigned Vendor"
        message = (
            f"Vendor '{vendor_label}' works conform to statutory procurement ceilings without "
            f"sub-threshold aggregation patterns."
        )

    return {
        "ruleId": "RULE_FUND_SPLITTING",
        "ruleName": "Single-Approval Split Tender Detection",
        "passed": not is_fund_splitting,
        "status": "FLAGGED" if is_fund_splitting else "PASSED",
        "severity": severity,
        "message": message,
        "threshold": threshold,
        "actualValue": combined_sub_amount if is_fund_splitting else project.get("sanctionedAmount", 0),
        "details": {
            "vendorId": vendor_id,
            "vendorName": vendor_name,
            "singleApprovalThreshold": threshold,
            "subThresholdProjectCount": sub_count,
            "combinedSanctionedAmount": combined_sub_amount,
            "splitProjectIds": split_ids if is_fund_splitting else [],
            "splitProjectNames": split_names if is_fund_splitting else [],
        },
    }


def evaluate_project_compliance(
    project_id: str,
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> Optional[Dict[str, Any]]:
    """
    Evaluates all 4 statutory compliance rules for a project by its unique ID.
    Returns the structured compliance audit payload conforming to API_CONTRACT.md.
    """
    projects = all_projects if all_projects is not None else load_projects()
    project = get_project_by_id(project_id, projects)

    if not project:
        return None

    # Evaluate all 4 rules
    flag_ceiling = evaluate_ceiling_breach(project)
    flag_deadline = evaluate_deadline_breach(project)
    flag_category = evaluate_category_mismatch(project)
    flag_fund_split = evaluate_fund_splitting(project, projects)

    all_flags = [flag_ceiling, flag_deadline, flag_category, flag_fund_split]

    failed_flags = [f for f in all_flags if not f["passed"]]
    total_violations = len(failed_flags)

    # Calculate compliance score (base 100 with deductions per violation severity)
    severity_penalties = {
        "CRITICAL": 35,
        "HIGH": 25,
        "MEDIUM": 15,
        "LOW": 10,
        "NONE": 0,
    }
    deduction = sum(severity_penalties.get(f["severity"], 20) for f in failed_flags)
    compliance_score = max(0, 100 - deduction)

    overall_status = "FLAGGED" if total_violations > 0 else "COMPLIANT"

    evaluated_at = datetime.now(timezone.utc).isoformat()

    return {
        "projectId": project.get("id"),
        "projectName": project.get("name"),
        "state": project.get("state"),
        "district": project.get("district"),
        "constituency": project.get("constituency"),
        "mpName": project.get("mpName"),
        "category": project.get("category"),
        "implementingAgency": project.get("implementingAgency"),
        "vendorId": project.get("vendorId"),
        "vendorName": project.get("vendorName"),
        "sanctionedAmount": project.get("sanctionedAmount"),
        "complianceScore": compliance_score,
        "overallStatus": overall_status,
        "totalViolations": total_violations,
        "rulesEvaluated": len(all_flags),
        "rulesPassed": len(all_flags) - total_violations,
        "rulesFailed": total_violations,
        "flags": all_flags,
        "evaluatedAt": evaluated_at,
    }


def get_all_compliance_evaluations(all_projects: Optional[List[Dict[str, Any]]] = None) -> List[Dict[str, Any]]:
    """Evaluates compliance across all projects in the data store."""
    projects = all_projects if all_projects is not None else load_projects()
    results = []
    for proj in projects:
        audit = evaluate_project_compliance(proj["id"], projects)
        if audit:
            results.append(audit)
    return results


def get_compliance_summary(all_projects: Optional[List[Dict[str, Any]]] = None) -> Dict[str, Any]:
    """Provides high-level system-wide metrics across all evaluated projects."""
    evaluations = get_all_compliance_evaluations(all_projects)
    total_projects = len(evaluations)
    compliant_count = sum(1 for e in evaluations if e["overallStatus"] == "COMPLIANT")
    flagged_count = sum(1 for e in evaluations if e["overallStatus"] == "FLAGGED")

    ceiling_breaches = 0
    deadline_breaches = 0
    agency_mismatches = 0
    fund_splitting_flags = 0

    for e in evaluations:
        for f in e["flags"]:
            if not f["passed"]:
                if f["ruleId"] == "RULE_CEILING_BREACH":
                    ceiling_breaches += 1
                elif f["ruleId"] == "RULE_DEADLINE_BREACH":
                    deadline_breaches += 1
                elif f["ruleId"] == "RULE_CATEGORY_MISMATCH":
                    agency_mismatches += 1
                elif f["ruleId"] == "RULE_FUND_SPLITTING":
                    fund_splitting_flags += 1

    avg_score = (
        round(sum(e["complianceScore"] for e in evaluations) / total_projects, 1)
        if total_projects > 0 else 100.0
    )

    return {
        "totalProjects": total_projects,
        "compliantProjects": compliant_count,
        "flaggedProjects": flagged_count,
        "averageComplianceScore": avg_score,
        "violationsByRule": {
            "RULE_CEILING_BREACH": ceiling_breaches,
            "RULE_DEADLINE_BREACH": deadline_breaches,
            "RULE_CATEGORY_MISMATCH": agency_mismatches,
            "RULE_FUND_SPLITTING": fund_splitting_flags,
        },
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }
