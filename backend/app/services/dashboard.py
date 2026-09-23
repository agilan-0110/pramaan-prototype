"""
SETU Role-Scoped Dashboard Statistics Aggregator Service.

Consolidates portfolio metrics, alert severities, flag lifecycle distributions,
time-series trends, and category fund utilization per statutory role and jurisdiction:
- District Authority: Own district operational view.
- State Nodal Authority: State-wide rollup with severity tiering.
- Central Nodal Agency (MoSPI): Pan-India apex command.
- Auditor / CAG: Full statutory audit view including resolved & reopened flags.
- Implementing Agency: Strict zero-oversight view (execution & fund progress only).
- MP Office: Constituency / chosen nominated districts view with passive flag counts.
"""

from collections import defaultdict
from datetime import datetime, timezone
import re
from typing import Any, Dict, List, Optional

from app.services.alerts import alerts_service, resolve_role_tier
from app.services.auth import filter_projects_by_user_scope
from app.routers.projects import load_projects_catalog


def compute_utilization_by_category(projects: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Aggregates allocated funds and actual expenditures grouped by project category."""
    cat_map: Dict[str, Dict[str, float]] = defaultdict(lambda: {"utilized": 0.0, "allocated": 0.0})

    for p in projects:
        cat = (p.get("category") or "Other").strip().title()
        sanc = float(p.get("sanctionedAmount", 0.0) or 0.0)
        exp = float(p.get("expenditure", 0.0) or 0.0)
        cat_map[cat]["allocated"] += sanc
        cat_map[cat]["utilized"] += exp

    result = [
        {
            "category": cat,
            "utilized": round(vals["utilized"], 2),
            "allocated": round(vals["allocated"], 2),
        }
        for cat, vals in cat_map.items()
    ]
    result.sort(key=lambda x: x["allocated"], reverse=True)
    return result


def compute_trend_over_time(alerts: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Computes chronological monthly trend of flags raised vs flags resolved.
    Uses ISO timestamps from alert generation and statusHistory records.
    """
    month_data: Dict[str, Dict[str, int]] = defaultdict(lambda: {"flagsRaised": 0, "flagsResolved": 0})

    for a in alerts:
        # 1. Flags raised timestamp
        ts = a.get("timestamp")
        if ts:
            try:
                month_key = ts[:7]  # 'YYYY-MM'
                if re.match(r"^\d{4}-\d{2}$", month_key):
                    month_data[month_key]["flagsRaised"] += 1
            except Exception:
                pass

        # 2. Flags resolved timestamp
        resolved_at = a.get("resolvedAt")
        if resolved_at:
            try:
                res_key = resolved_at[:7]
                if re.match(r"^\d{4}-\d{2}$", res_key):
                    month_data[res_key]["flagsResolved"] += 1
            except Exception:
                pass
        else:
            # Check statusHistory for resolved records
            for h in a.get("statusHistory", []):
                if h.get("status") in ("RESOLVED_CONFIRMED", "RESOLVED_FALSE_POSITIVE"):
                    h_ts = h.get("timestamp")
                    if h_ts:
                        try:
                            res_key = h_ts[:7]
                            if re.match(r"^\d{4}-\d{2}$", res_key):
                                month_data[res_key]["flagsResolved"] += 1
                                break
                        except Exception:
                            pass

    sorted_months = sorted(month_data.keys())
    return [
        {
            "month": m,
            "flagsRaised": month_data[m]["flagsRaised"],
            "flagsResolved": month_data[m]["flagsResolved"],
        }
        for m in sorted_months
    ]


def compute_flags_by_status(alerts: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Groups alerts by lifecycle resolution status."""
    status_counts: Dict[str, int] = defaultdict(int)
    for a in alerts:
        st = a.get("status", "OPEN").strip().upper()
        status_counts[st] += 1

    preferred_order = [
        "OPEN",
        "INSPECTION_ORDERED",
        "RESOLVED_CONFIRMED",
        "RESOLVED_FALSE_POSITIVE",
        "ESCALATED",
    ]
    result = []
    for st in preferred_order:
        if st in status_counts:
            result.append({"name": st, "value": status_counts[st]})
    for st, count in status_counts.items():
        if st not in preferred_order:
            result.append({"name": st, "value": count})

    return result


def compute_alerts_by_severity(alerts: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Groups alerts by severity tier."""
    sev_counts: Dict[str, int] = defaultdict(int)
    for a in alerts:
        sev = (a.get("severity") or "LOW").strip().upper()
        sev_counts[sev] += 1

    preferred_order = ["CRITICAL", "HIGH", "WARNING", "MEDIUM", "LOW"]
    result = []
    for sev in preferred_order:
        if sev in sev_counts:
            result.append({"name": sev, "value": sev_counts[sev]})
    for sev, count in sev_counts.items():
        if sev not in preferred_order:
            result.append({"name": sev, "value": count})

    return result


def get_district_authority_dashboard_stats(user: Dict[str, Any]) -> Dict[str, Any]:
    """
    Computes dashboard statistics for District Authority role.
    Scoped strictly to user's assigned district.
    """
    all_projects = load_projects_catalog()
    scoped_projects = filter_projects_by_user_scope(all_projects, user)

    total_projects = len(scoped_projects)
    total_sanctioned = sum(float(p.get("sanctionedAmount", 0) or 0) for p in scoped_projects)
    total_expenditure = sum(float(p.get("expenditure", 0) or 0) for p in scoped_projects)
    util_pct = round((total_expenditure / total_sanctioned) * 100, 1) if total_sanctioned > 0 else 0.0

    alerts, _ = alerts_service.get_scoped_alerts(user=user)
    # Exclude CHRONIC_NON_UTILIZATION per ROLES.md for District Authority
    district_alerts = [a for a in alerts if a.get("alertType") != "CHRONIC_NON_UTILIZATION"]

    active_alerts = len(district_alerts)
    critical_alerts = sum(1 for a in district_alerts if a.get("severity") == "CRITICAL")

    return {
        "summary": {
            "totalProjects": total_projects,
            "activeAlerts": active_alerts,
            "criticalAlerts": critical_alerts,
            "fundsUtilizedPct": util_pct,
        },
        "alertsBySeverity": compute_alerts_by_severity(district_alerts),
        "flagsByStatus": compute_flags_by_status(district_alerts),
        "trendOverTime": compute_trend_over_time(district_alerts),
        "utilizationByCategory": compute_utilization_by_category(scoped_projects),
        "isSimulated": True,
    }


def get_state_nodal_dashboard_stats(user: Dict[str, Any]) -> Dict[str, Any]:
    """
    Computes dashboard statistics for State Nodal Authority role.
    Scoped strictly to user's assigned state. Includes CHRONIC_NON_UTILIZATION.
    """
    all_projects = load_projects_catalog()
    scoped_projects = filter_projects_by_user_scope(all_projects, user)

    total_projects = len(scoped_projects)
    total_sanctioned = sum(float(p.get("sanctionedAmount", 0) or 0) for p in scoped_projects)
    total_expenditure = sum(float(p.get("expenditure", 0) or 0) for p in scoped_projects)
    util_pct = round((total_expenditure / total_sanctioned) * 100, 1) if total_sanctioned > 0 else 0.0

    alerts, _ = alerts_service.get_scoped_alerts(user=user)
    active_alerts = len(alerts)
    critical_alerts = sum(1 for a in alerts if a.get("severity") == "CRITICAL")

    return {
        "summary": {
            "totalProjects": total_projects,
            "activeAlerts": active_alerts,
            "criticalAlerts": critical_alerts,
            "fundsUtilizedPct": util_pct,
        },
        "alertsBySeverity": compute_alerts_by_severity(alerts),
        "flagsByStatus": compute_flags_by_status(alerts),
        "trendOverTime": compute_trend_over_time(alerts),
        "utilizationByCategory": compute_utilization_by_category(scoped_projects),
        "isSimulated": True,
    }


def get_central_nodal_dashboard_stats(user: Dict[str, Any]) -> Dict[str, Any]:
    """
    Computes dashboard statistics for Central Nodal Agency (MoSPI).
    Unrestricted national scope across all 124 projects.
    """
    all_projects = load_projects_catalog()
    scoped_projects = filter_projects_by_user_scope(all_projects, user)

    total_projects = len(scoped_projects)
    total_sanctioned = sum(float(p.get("sanctionedAmount", 0) or 0) for p in scoped_projects)
    total_expenditure = sum(float(p.get("expenditure", 0) or 0) for p in scoped_projects)
    util_pct = round((total_expenditure / total_sanctioned) * 100, 1) if total_sanctioned > 0 else 0.0

    alerts, _ = alerts_service.get_scoped_alerts(user=user)
    active_alerts = len(alerts)
    critical_alerts = sum(1 for a in alerts if a.get("severity") == "CRITICAL")

    return {
        "summary": {
            "totalProjects": total_projects,
            "activeAlerts": active_alerts,
            "criticalAlerts": critical_alerts,
            "fundsUtilizedPct": util_pct,
        },
        "alertsBySeverity": compute_alerts_by_severity(alerts),
        "flagsByStatus": compute_flags_by_status(alerts),
        "trendOverTime": compute_trend_over_time(alerts),
        "utilizationByCategory": compute_utilization_by_category(scoped_projects),
        "isSimulated": True,
    }


def get_auditor_cag_dashboard_stats(user: Dict[str, Any]) -> Dict[str, Any]:
    """
    Computes dashboard statistics for Auditor / CAG role.
    Must include all flags, including resolved and reopened flags across all 124 works.
    """
    all_projects = load_projects_catalog()
    scoped_projects = filter_projects_by_user_scope(all_projects, user)

    total_projects = len(scoped_projects)
    total_sanctioned = sum(float(p.get("sanctionedAmount", 0) or 0) for p in scoped_projects)
    total_expenditure = sum(float(p.get("expenditure", 0) or 0) for p in scoped_projects)
    util_pct = round((total_expenditure / total_sanctioned) * 100, 1) if total_sanctioned > 0 else 0.0

    # Auditor sees everything regardless of status
    alerts, _ = alerts_service.get_scoped_alerts(user=user)
    active_alerts = len(alerts)
    critical_alerts = sum(1 for a in alerts if a.get("severity") == "CRITICAL")

    return {
        "summary": {
            "totalProjects": total_projects,
            "activeAlerts": active_alerts,
            "criticalAlerts": critical_alerts,
            "fundsUtilizedPct": util_pct,
        },
        "alertsBySeverity": compute_alerts_by_severity(alerts),
        "flagsByStatus": compute_flags_by_status(alerts),
        "trendOverTime": compute_trend_over_time(alerts),
        "utilizationByCategory": compute_utilization_by_category(scoped_projects),
        "isSimulated": True,
    }


def get_implementing_agency_dashboard_stats(user: Dict[str, Any]) -> Dict[str, Any]:
    """
    Computes dashboard statistics for Implementing Agency role.
    Strict zero oversight visibility: NEVER calls Alerts, Compliance, or Risk engines.
    Oversight keys (activeAlerts, criticalAlerts, alertsBySeverity, flagsByStatus, trendOverTime)
    are strictly omitted from the response.
    """
    all_projects = load_projects_catalog()
    scoped_projects = filter_projects_by_user_scope(all_projects, user)

    total_projects = len(scoped_projects)
    total_sanctioned = sum(float(p.get("sanctionedAmount", 0) or 0) for p in scoped_projects)
    total_expenditure = sum(float(p.get("expenditure", 0) or 0) for p in scoped_projects)
    util_pct = round((total_expenditure / total_sanctioned) * 100, 1) if total_sanctioned > 0 else 0.0

    return {
        "summary": {
            "totalProjects": total_projects,
            "fundsUtilizedPct": util_pct,
        },
        "utilizationByCategory": compute_utilization_by_category(scoped_projects),
        "isSimulated": True,
    }


def get_mp_office_dashboard_stats(user: Dict[str, Any]) -> Dict[str, Any]:
    """
    Computes dashboard statistics for MP Office role (Constituency MP and Nominated MP).
    Per ROLES.md, MP Office has passive oversight visibility:
    Sees project count, fund utilization, and high-level flag presence without granular alert severity drilldown.
    """
    all_projects = load_projects_catalog()
    scoped_projects = filter_projects_by_user_scope(all_projects, user)

    total_projects = len(scoped_projects)
    total_sanctioned = sum(float(p.get("sanctionedAmount", 0) or 0) for p in scoped_projects)
    total_expenditure = sum(float(p.get("expenditure", 0) or 0) for p in scoped_projects)
    util_pct = round((total_expenditure / total_sanctioned) * 100, 1) if total_sanctioned > 0 else 0.0

    # Passive flag detection across MP's scoped projects
    authorized_pids = {p["id"] for p in scoped_projects}
    raw_alerts = alerts_service.get_all_alerts()
    mp_alerts = [a for a in raw_alerts if a.get("projectId") in authorized_pids]

    active_alerts = len(mp_alerts)
    critical_alerts = sum(1 for a in mp_alerts if a.get("severity") == "CRITICAL")

    # Passive status breakdown: Flag Present vs Clear
    flagged_pids = {a.get("projectId") for a in mp_alerts}
    flag_present_count = len(flagged_pids)
    clear_count = max(0, total_projects - flag_present_count)

    flags_status = [
        {"name": "Flag Present", "value": flag_present_count},
        {"name": "Clear", "value": clear_count},
    ]

    return {
        "summary": {
            "totalProjects": total_projects,
            "activeAlerts": active_alerts,
            "criticalAlerts": critical_alerts,
            "fundsUtilizedPct": util_pct,
        },
        "flagsByStatus": flags_status,
        "trendOverTime": compute_trend_over_time(mp_alerts),
        "utilizationByCategory": compute_utilization_by_category(scoped_projects),
        "isSimulated": True,
    }
