"""
Trend Analysis Service for SETU.

Provides time-series aggregations and fiscal year-end seasonal fund-dumping
("March Rush") detection across MPLADS infrastructure projects:
1. Time-series aggregation of expenditure by Year, State, District, and Quarter.
2. Seasonal fund-dumping audit: detects when disbursement vouchers heavily cluster
   in the final 6 weeks of the fiscal year (February 15 - March 31).
3. Project-level expenditure pacing audit.
"""

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

# Path to mock data store
DATA_DIR = Path(__file__).resolve().parent.parent / "data"
PROJECTS_FILE = DATA_DIR / "mockProjects.json"


def load_projects() -> List[Dict[str, Any]]:
    """Loads projects from the mock projects data store."""
    if not PROJECTS_FILE.exists():
        return []
    with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def is_in_final_six_weeks(date_str: Optional[str], financial_year: Optional[str]) -> bool:
    """
    Checks if a disbursement date falls within the final 6 weeks of the Indian fiscal year.
    Indian Fiscal Year: April 1 (Year T) to March 31 (Year T+1).
    Final 6 weeks window: February 15 to March 31 of Year T+1.
    """
    if not date_str:
        return False

    try:
        dt = datetime.strptime(date_str.strip()[:10], "%Y-%m-%d").date()
    except Exception:
        return False

    # Extract target FY end year
    if financial_year and "-" in financial_year:
        try:
            start_yr = int(financial_year.split("-")[0])
            end_yr = start_yr + 1
            # Final 6 weeks range
            window_start = datetime(end_yr, 2, 15).date()
            window_end = datetime(end_yr, 3, 31).date()
            return window_start <= dt <= window_end
        except Exception:
            pass

    # Generic check if FY not explicitly provided: check if month is Feb (>=15) or March
    return (dt.month == 2 and dt.day >= 15) or (dt.month == 3)


def get_expenditure_by_year(all_projects: Optional[List[Dict[str, Any]]] = None) -> List[Dict[str, Any]]:
    """Time-series aggregation of expenditure grouped by financial year."""
    projects = all_projects if all_projects is not None else load_projects()

    years_map: Dict[str, Dict[str, Any]] = {}

    for p in projects:
        fy = p.get("financialYear") or "2025-26"
        sanc = p.get("sanctionedAmount", 0)
        exp = p.get("expenditure", 0)
        phys = p.get("physicalProgress", 0)
        fin = p.get("financialProgress", 0)
        status = p.get("status", "")
        is_dumping = bool(p.get("fundDumpingFlag", False))

        if fy not in years_map:
            years_map[fy] = {
                "financialYear": fy,
                "totalSanctioned": 0,
                "totalExpenditure": 0,
                "projectCount": 0,
                "completedCount": 0,
                "inProgressCount": 0,
                "fundDumpingCount": 0,
                "fundDumpingAmount": 0,
                "totalPhysicalProgress": 0.0,
                "totalFinancialProgress": 0.0,
            }

        rec = years_map[fy]
        rec["totalSanctioned"] += sanc
        rec["totalExpenditure"] += exp
        rec["projectCount"] += 1
        rec["totalPhysicalProgress"] += phys
        rec["totalFinancialProgress"] += fin

        if status == "Completed":
            rec["completedCount"] += 1
        elif "In Progress" in status:
            rec["inProgressCount"] += 1

        if is_dumping:
            rec["fundDumpingCount"] += 1
            rec["fundDumpingAmount"] += exp

    result = []
    for fy in sorted(years_map.keys()):
        item = years_map[fy]
        count = max(item["projectCount"], 1)
        sanc = max(item["totalSanctioned"], 1)
        item["utilizationRate"] = round((item["totalExpenditure"] / sanc) * 100, 1)
        item["averagePhysicalProgress"] = round(item["totalPhysicalProgress"] / count, 1)
        item["averageFinancialProgress"] = round(item["totalFinancialProgress"] / count, 1)
        item["fundDumpingPercentage"] = round((item["fundDumpingCount"] / count) * 100, 1)
        # Clean up internal accumulators
        del item["totalPhysicalProgress"]
        del item["totalFinancialProgress"]
        result.append(item)

    return result


def get_expenditure_by_state(
    year: Optional[str] = None,
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> List[Dict[str, Any]]:
    """Aggregation of sanctioned funds and expenditure by Indian State."""
    projects = all_projects if all_projects is not None else load_projects()

    if year:
        projects = [p for p in projects if p.get("financialYear") == year]

    states_map: Dict[str, Dict[str, Any]] = {}

    for p in projects:
        st = p.get("state") or "Unknown"
        sanc = p.get("sanctionedAmount", 0)
        exp = p.get("expenditure", 0)
        is_dumping = bool(p.get("fundDumpingFlag", False))

        if st not in states_map:
            states_map[st] = {
                "state": st,
                "totalSanctioned": 0,
                "totalExpenditure": 0,
                "projectCount": 0,
                "fundDumpingCount": 0,
                "fundDumpingAmount": 0,
                "districts": set(),
            }

        rec = states_map[st]
        rec["totalSanctioned"] += sanc
        rec["totalExpenditure"] += exp
        rec["projectCount"] += 1
        if p.get("district"):
            rec["districts"].add(p["district"])

        if is_dumping:
            rec["fundDumpingCount"] += 1
            rec["fundDumpingAmount"] += exp

    result = []
    for st, item in states_map.items():
        sanc = max(item["totalSanctioned"], 1)
        item["utilizationRate"] = round((item["totalExpenditure"] / sanc) * 100, 1)
        item["districtCount"] = len(item["districts"])
        item["districts"] = sorted(list(item["districts"]))
        result.append(item)

    # Sort by expenditure descending
    result.sort(key=lambda x: x["totalExpenditure"], reverse=True)
    return result


def get_expenditure_by_district(
    state: Optional[str] = None,
    year: Optional[str] = None,
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> List[Dict[str, Any]]:
    """Aggregation of sanctioned funds and expenditure by district."""
    projects = all_projects if all_projects is not None else load_projects()

    if state:
        projects = [p for p in projects if (p.get("state") or "").strip().lower() == state.strip().lower()]
    if year:
        projects = [p for p in projects if p.get("financialYear") == year]

    dist_map: Dict[str, Dict[str, Any]] = {}

    for p in projects:
        d = p.get("district") or "Unknown"
        st = p.get("state") or "Unknown"
        sanc = p.get("sanctionedAmount", 0)
        exp = p.get("expenditure", 0)
        is_dumping = bool(p.get("fundDumpingFlag", False))

        if d not in dist_map:
            dist_map[d] = {
                "district": d,
                "state": st,
                "totalSanctioned": 0,
                "totalExpenditure": 0,
                "projectCount": 0,
                "fundDumpingCount": 0,
                "fundDumpingAmount": 0,
            }

        rec = dist_map[d]
        rec["totalSanctioned"] += sanc
        rec["totalExpenditure"] += exp
        rec["projectCount"] += 1
        if is_dumping:
            rec["fundDumpingCount"] += 1
            rec["fundDumpingAmount"] += exp

    result = []
    for d, item in dist_map.items():
        sanc = max(item["totalSanctioned"], 1)
        item["utilizationRate"] = round((item["totalExpenditure"] / sanc) * 100, 1)
        result.append(item)

    result.sort(key=lambda x: x["totalExpenditure"], reverse=True)
    return result


def get_quarterly_trend(
    year: Optional[str] = None,
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> Dict[str, Any]:
    """
    Time-series expenditure pacing across fiscal quarters (Q1-Q4).
    Highlights the year-end March Rush / final 6 weeks spending concentration.
    """
    projects = all_projects if all_projects is not None else load_projects()

    if year:
        projects = [p for p in projects if p.get("financialYear") == year]

    quarters = {
        "Q1": {"quarter": "Q1", "months": "Apr - Jun", "expenditure": 0, "disbursementCount": 0, "isRush": False},
        "Q2": {"quarter": "Q2", "months": "Jul - Sep", "expenditure": 0, "disbursementCount": 0, "isRush": False},
        "Q3": {"quarter": "Q3", "months": "Oct - Dec", "expenditure": 0, "disbursementCount": 0, "isRush": False},
        "Q4": {"quarter": "Q4", "months": "Jan - Mar", "expenditure": 0, "disbursementCount": 0, "isRush": True},
    }

    final_six_weeks_expenditure = 0
    final_six_weeks_count = 0

    for p in projects:
        disbursements = p.get("disbursements", [])
        fy = p.get("financialYear")

        if disbursements:
            for t in disbursements:
                q = t.get("quarter", "Q2")
                if q in quarters:
                    quarters[q]["expenditure"] += t.get("amount", 0)
                    quarters[q]["disbursementCount"] += 1
                if t.get("isFinalSixWeeks") or is_in_final_six_weeks(t.get("date"), fy):
                    final_six_weeks_expenditure += t.get("amount", 0)
                    final_six_weeks_count += 1
        else:
            # Fallback to quarterSpent or dateSpent
            q = p.get("quarterSpent", "Q2")
            if q in quarters:
                quarters[q]["expenditure"] += p.get("expenditure", 0)
                quarters[q]["disbursementCount"] += 1
            if p.get("fundDumpingFlag") or is_in_final_six_weeks(p.get("dateSpent"), fy):
                final_six_weeks_expenditure += p.get("expenditure", 0)
                final_six_weeks_count += 1

    total_exp = sum(q["expenditure"] for q in quarters.values())
    safe_total = max(total_exp, 1)

    for q in quarters.values():
        q["percentageOfAnnualTotal"] = round((q["expenditure"] / safe_total) * 100, 1)

    rush_percentage = round((final_six_weeks_expenditure / safe_total) * 100, 1)

    return {
        "financialYearFilter": year or "All Active Fiscal Years",
        "totalAnnualExpenditure": total_exp,
        "quarterlyBreakdown": list(quarters.values()),
        "marchRushMetrics": {
            "finalSixWeeksExpenditure": final_six_weeks_expenditure,
            "finalSixWeeksPercentage": rush_percentage,
            "rushDisbursementCount": final_six_weeks_count,
            "auditObservation": (
                f"{rush_percentage}% of annual expenditure concentrated in the final 6 weeks (Feb 15 - Mar 31), "
                "characteristic of statutory budget exhaustion pressure ('March Rush')."
            ),
        },
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }


def get_seasonal_fund_dumping_report(
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> Dict[str, Any]:
    """
    Identifies all projects exhibiting seasonal year-end fund-dumping patterns.
    """
    projects = all_projects if all_projects is not None else load_projects()
    flagged = []
    total_dumped_funds = 0

    for p in projects:
        fy = p.get("financialYear")
        is_dump = bool(p.get("fundDumpingFlag")) or is_in_final_six_weeks(p.get("dateSpent"), fy)
        exp = p.get("expenditure", 0)

        if is_dump and exp > 0:
            total_dumped_funds += exp
            flagged.append({
                "projectId": p.get("id"),
                "projectName": p.get("name"),
                "category": p.get("category"),
                "district": p.get("district"),
                "state": p.get("state"),
                "financialYear": fy,
                "dateSpent": p.get("dateSpent"),
                "sanctionedAmount": p.get("sanctionedAmount"),
                "expenditure": exp,
                "financialProgress": p.get("financialProgress"),
                "physicalProgress": p.get("physicalProgress"),
                "disbursements": p.get("disbursements", []),
                "auditWarning": (
                    f"Disbursement released on {p.get('dateSpent')} in the final 6 weeks of FY {fy} "
                    f"with {p.get('physicalProgress')}% physical completion."
                ),
            })

    flagged.sort(key=lambda x: x["expenditure"], reverse=True)
    total_exp_all = sum(p.get("expenditure", 0) for p in projects)
    pct = round((total_dumped_funds / max(total_exp_all, 1)) * 100, 1)

    return {
        "totalProjectsAudited": len(projects),
        "fundDumpingProjectsCount": len(flagged),
        "totalDumpedExpenditure": total_dumped_funds,
        "percentageOfTotalExpenditure": pct,
        "definition": "Disbursements released in the final 6 weeks of the fiscal year (Feb 15 - Mar 31) to exhaust lapsing grants.",
        "flaggedProjects": flagged,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }


def get_project_spending_trend(
    project_id: str,
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> Optional[Dict[str, Any]]:
    """Project-level fund pacing audit, timeline tranches, and seasonal rush diagnosis."""
    projects = all_projects if all_projects is not None else load_projects()
    project = next((p for p in projects if p.get("id") == project_id), None)

    if not project:
        return None

    fy = project.get("financialYear", "2025-26")
    date_spent = project.get("dateSpent")
    is_dump = bool(project.get("fundDumpingFlag")) or is_in_final_six_weeks(date_spent, fy)
    disbursements = project.get("disbursements", [])

    rush_tranches = [
        t for t in disbursements
        if t.get("isFinalSixWeeks") or is_in_final_six_weeks(t.get("date"), fy)
    ]
    rush_amount = sum(t.get("amount", 0) for t in rush_tranches)
    exp = project.get("expenditure", 0)
    rush_pct = round((rush_amount / max(exp, 1)) * 100, 1) if exp > 0 else 0.0

    if is_dump:
        pacing_status = "SEASONAL_MARCH_RUSH_DUMP"
        finding = (
            f"Voucher outlays heavily cluster in the final 6 weeks of FY {fy} (date: {date_spent}), "
            "indicating rapid end-of-year grant exhaustion prior to physical stage certification."
        )
    else:
        pacing_status = "STANDARD_PACED_OUTFLOW"
        finding = "Expenditure pacing conforms with standard multi-quarter project milestone schedules."

    return {
        "projectId": project.get("id"),
        "projectName": project.get("name"),
        "state": project.get("state"),
        "district": project.get("district"),
        "financialYear": fy,
        "sanctionedAmount": project.get("sanctionedAmount"),
        "expenditure": exp,
        "dateSpent": date_spent,
        "quarterSpent": project.get("quarterSpent"),
        "pacingStatus": pacing_status,
        "isSeasonalFundDumping": is_dump,
        "finalSixWeeksExpenditure": rush_amount if disbursements else (exp if is_dump else 0),
        "finalSixWeeksPercentage": rush_pct if disbursements else (100.0 if is_dump else 0.0),
        "disbursements": disbursements,
        "auditFinding": finding,
        "evaluatedAt": datetime.now(timezone.utc).isoformat(),
    }


def get_chronic_non_utilization_report(
    state: Optional[str] = None,
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> Dict[str, Any]:
    """
    Identifies multi-year carried-forward unspent fund balances (CHRONIC_NON_UTILIZATION).
    Per ROLES.md, this signal skips District Authority and surfaces directly to State Nodal & MoSPI.
    """
    projects = all_projects if all_projects is not None else load_projects()
    if state:
        projects = [p for p in projects if (p.get("state") or "").strip().lower() == state.strip().lower()]

    flagged = []
    total_unspent = 0

    for p in projects:
        fy = p.get("financialYear", "2025-26")
        status = p.get("status", "")
        phys_prog = p.get("physicalProgress", 0)
        sanc = p.get("sanctionedAmount", 0)
        exp = p.get("expenditure", 0)
        unspent = max(0, sanc - exp)
        unspent_pct = round((unspent / max(sanc, 1)) * 100, 1)
        days_delayed = p.get("daysDelayed", 0)

        # Multi-year carried forward signal: FY 2024-25 or earlier, incomplete work, significant unspent balance
        is_multi_year = fy in ("2023-24", "2024-25") or "2024" in fy or "2023" in fy
        is_stagnant = (
            (is_multi_year and status != "Completed" and unspent >= 1500000 and unspent_pct >= 25.0) or
            (is_multi_year and days_delayed >= 60 and unspent >= 1000000) or
            (unspent_pct >= 40.0 and days_delayed >= 90 and status != "Completed")
        )

        if is_stagnant and unspent > 0:
            total_unspent += unspent
            stagnation_months = 24 if "2023" in fy else 18 if "2024" in fy else 14
            severity = "CRITICAL" if (unspent >= 3000000 or unspent_pct >= 50.0) else "HIGH"

            flagged.append({
                "projectId": p.get("id"),
                "projectName": p.get("name"),
                "state": p.get("state"),
                "district": p.get("district"),
                "category": p.get("category"),
                "financialYear": fy,
                "sanctionedAmount": sanc,
                "expenditure": exp,
                "unspentBalance": unspent,
                "unspentPercentage": unspent_pct,
                "physicalProgress": phys_prog,
                "financialProgress": p.get("financialProgress", 0.0),
                "status": status,
                "daysDelayed": days_delayed,
                "stagnationMonths": stagnation_months,
                "severity": severity,
                "skippedDistrictAuthority": True,
                "auditObservation": (
                    f"Stagnant unspent allocation of ₹{unspent:,.0f} ({unspent_pct}%) carried forward "
                    f"across {stagnation_months} months from FY {fy} with only {phys_prog}% physical completion. "
                    "Statutory State Nodal / MoSPI direct intervention signal."
                ),
            })

    flagged.sort(key=lambda x: x["unspentBalance"], reverse=True)

    return {
        "stateFilter": state or "All Registered States",
        "totalProjectsAudited": len(projects),
        "chronicNonUtilizationCount": len(flagged),
        "totalCarriedForwardUnspent": total_unspent,
        "criticalCount": sum(1 for x in flagged if x["severity"] == "CRITICAL"),
        "highCount": sum(1 for x in flagged if x["severity"] == "HIGH"),
        "definition": (
            "Non-lapsable multi-year unspent balances carried forward across fiscal years (>18 months) "
            "without completion, skipping District Authority operational tier per ROLES.md."
        ),
        "flaggedProjects": flagged,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }

