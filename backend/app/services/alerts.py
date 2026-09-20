"""
Alerts Aggregator Service for SETU.

Combines, enriches, and prioritizes oversight signals across all four analytical modules:
1. Financial Risk Engine (risk.py) — HIGH and CRITICAL risk score anomalies with SHAP explanations.
2. Compliance Rule Engine (compliance.py) — Statutory category ceiling, deadline, mismatch, and split-tender violations.
3. Duplicate Work Detection (duplicate.py) — High-confidence cross-year and geospatial duplicate scheme matches.
4. Trend Analysis (trend.py) — Fiscal year-end seasonal fund-dumping ("March Rush") outlays.

Provides:
- Strict schema conformance to API_CONTRACT.md GET /alerts.
- Descending priority ranking by severity (CRITICAL > HIGH > WARNING > LOW) and riskScore.
- Deterministic alert identifiers (ALT-2026-001, ALT-2026-002, ...).
- Role-scoping for District Authority (district-level), State Nodal (state-level), and MoSPI (national).
- In-memory caching for sub-millisecond retrieval.
"""

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from app.services.compliance import get_all_compliance_evaluations
from app.services.duplicate import get_all_duplicate_pairs, load_projects as load_all_projects
from app.services.risk import get_high_risk_projects
from app.services.trend import get_seasonal_fund_dumping_report
from app.services.auth import filter_projects_by_user_scope

# Canonical Alert Types
ALERT_TYPE_FINANCIAL = "FINANCIAL_RISK"
ALERT_TYPE_COMPLIANCE = "COMPLIANCE_VIOLATION"
ALERT_TYPE_DUPLICATE = "DUPLICATE_WORK"
ALERT_TYPE_SEASONAL = "SEASONAL_ANOMALY"
ALERT_TYPE_CITIZEN = "CITIZEN_CONTRADICTION"

# Severity Rank Weights (Higher integer = Higher priority)
SEVERITY_WEIGHTS: Dict[str, int] = {
    "CRITICAL": 4,
    "HIGH": 3,
    "WARNING": 2,
    "MEDIUM": 2,
    "LOW": 1,
}

# Source Modules
SOURCE_RISK = "risk"
SOURCE_COMPLIANCE = "compliance"
SOURCE_DUPLICATE = "duplicate"
SOURCE_TREND = "trend"
SOURCE_CITIZEN = "citizen"


class AlertsAggregatorService:
    """
    Singleton aggregator service pulling signals from all analytical engines,
    ranking alerts by severity and risk score, and filtering by jurisdictional role.
    """

    def __init__(self):
        self.is_initialized: bool = False
        self._all_alerts: List[Dict[str, Any]] = []
        self._alerts_by_id: Dict[str, Dict[str, Any]] = {}
        self._generated_at: str = ""

    def initialize(self, force_refresh: bool = False) -> None:
        """Collects signals from all 4 modules and builds the master ranked alert registry."""
        if self.is_initialized and not force_refresh:
            return

        projects = load_all_projects()
        project_map = {p["id"]: p for p in projects}

        raw_alerts: List[Dict[str, Any]] = []

        # 1. Financial Risk Engine Signals (risk.py)
        raw_alerts.extend(self._collect_financial_risk_alerts())

        # 2. Compliance Rule Engine Signals (compliance.py)
        raw_alerts.extend(self._collect_compliance_alerts())

        # 3. Duplicate Work Detection Signals (duplicate.py)
        raw_alerts.extend(self._collect_duplicate_alerts(project_map))

        # 4. Trend Analysis Seasonal Anomaly Signals (trend.py)
        raw_alerts.extend(self._collect_seasonal_trend_alerts())

        # 5. Citizen Ground Truth Discrepancies (citizen_nlp.py)
        raw_alerts.extend(self._collect_citizen_contradiction_alerts())

        # Rank raw alerts: Primary sort = severity weight descending, Secondary = riskScore descending
        raw_alerts.sort(
            key=lambda a: (
                -SEVERITY_WEIGHTS.get(a["severity"], 1),
                -a["riskScore"],
                a["projectId"],
                a["alertType"],
            )
        )

        # Assign clean, deterministic sequential IDs
        final_alerts: List[Dict[str, Any]] = []
        alerts_by_id: Dict[str, Dict[str, Any]] = {}

        for idx, alert in enumerate(raw_alerts, start=1):
            alert_id = f"ALT-2026-{idx:03d}"
            alert_copy = dict(alert)
            alert_copy["id"] = alert_id
            final_alerts.append(alert_copy)
            alerts_by_id[alert_id] = alert_copy

        self._all_alerts = final_alerts
        self._alerts_by_id = alerts_by_id
        self._generated_at = datetime.now(timezone.utc).isoformat()
        self.is_initialized = True

    def _collect_financial_risk_alerts(self) -> List[Dict[str, Any]]:
        """Extracts high and critical anomalies from the Financial Risk Engine."""
        alerts: List[Dict[str, Any]] = []
        high_risk_projects = get_high_risk_projects(min_score=61)

        for item in high_risk_projects:
            risk_level = item.get("riskLevel", "HIGH")
            risk_score = int(item.get("riskScore", 70))
            district = item.get("district", "Unknown")
            project_id = item.get("projectId")
            project_name = item.get("projectName", "Public Infrastructure Work")

            # Determine institutional recommended action
            if risk_level == "CRITICAL":
                recommended_action = (
                    "Freeze subsequent tranche disbursement pending physical verification audit "
                    "by District Collectorate."
                )
            else:
                recommended_action = (
                    "Request detailed bill-of-quantities audit and physical milestone stage "
                    "certification from independent technical auditor."
                )

            # Plain-language explanation generated by SHAP KernelExplainer
            explanation = item.get(
                "plainLanguageExplanation",
                "Severe expenditure pacing mismatch and execution schedule delay detected.",
            )

            alerts.append({
                "projectId": project_id,
                "projectName": project_name,
                "state": item.get("state", "Unknown"),
                "district": district,
                "alertType": ALERT_TYPE_FINANCIAL,
                "severity": risk_level,
                "riskScore": risk_score,
                "title": f"Financial Risk Anomaly: {risk_level.title()} Risk ({risk_score}/100) - {district}",
                "description": explanation,
                "timestamp": item.get("evaluatedAt") or "2026-08-01T12:00:00Z",
                "recommendedAction": recommended_action,
                "sourceModule": SOURCE_RISK,
            })

        return alerts

    def _collect_compliance_alerts(self) -> List[Dict[str, Any]]:
        """Extracts statutory rule breaches from the Compliance Rule Engine."""
        alerts: List[Dict[str, Any]] = []
        evaluations = get_all_compliance_evaluations()

        for audit in evaluations:
            if audit.get("totalViolations", 0) <= 0:
                continue

            project_id = audit.get("projectId")
            project_name = audit.get("projectName", "Infrastructure Scheme")
            district = audit.get("district", "Unknown")
            state = audit.get("state", "Unknown")
            compliance_score = audit.get("complianceScore", 70)

            # Process each failed compliance flag
            for flag in audit.get("flags", []):
                if flag.get("passed", True):
                    continue

                rule_id = flag.get("ruleId", "")
                rule_name = flag.get("ruleName", "Statutory Rule Breach")
                severity = flag.get("severity", "HIGH")
                if severity not in SEVERITY_WEIGHTS:
                    severity = "HIGH"

                # Calibrate risk score derived from rule severity and compliance score
                if severity == "CRITICAL":
                    derived_score = max(80, min(95, 100 - compliance_score + 15))
                else:
                    derived_score = max(62, min(79, 100 - compliance_score))

                # Recommended remedial action tailored to the specific rule
                if rule_id == "RULE_CEILING_BREACH":
                    action = (
                        "Submit revised administrative sanction proposal with Cabinet / "
                        "State Nodal Department justification."
                    )
                elif rule_id == "RULE_DEADLINE_BREACH":
                    action = (
                        "Issue statutory show-cause notice to implementing agency and initiate "
                        "liquidated damages assessment."
                    )
                elif rule_id == "RULE_CATEGORY_MISMATCH":
                    action = (
                        "Reassign scheme execution to designated nodal line department per statutory "
                        "departmental allocation."
                    )
                elif rule_id == "RULE_FUND_SPLITTING":
                    action = (
                        "Refer composite work sanctions to State Vigilance & Statutory Audit cell "
                        "for anti-slicing tender review."
                    )
                else:
                    action = (
                        "Issue statutory show-cause notice to executing agency and request formal "
                        "compliance justification."
                    )

                alerts.append({
                    "projectId": project_id,
                    "projectName": project_name,
                    "state": state,
                    "district": district,
                    "alertType": ALERT_TYPE_COMPLIANCE,
                    "severity": severity,
                    "riskScore": derived_score,
                    "title": f"Statutory Compliance Breach: {rule_name} - {district}",
                    "description": flag.get("message", "Statutory guidelines violation recorded."),
                    "timestamp": audit.get("evaluatedAt") or "2026-08-05T10:00:00Z",
                    "recommendedAction": action,
                    "sourceModule": SOURCE_COMPLIANCE,
                })

        return alerts

    def _collect_duplicate_alerts(
        self,
        project_map: Dict[str, Dict[str, Any]],
    ) -> List[Dict[str, Any]]:
        """Extracts high-confidence duplicate asset matches from Duplicate Work Detection."""
        alerts: List[Dict[str, Any]] = []
        duplicate_pairs = get_all_duplicate_pairs(threshold=80.0)

        for pair in duplicate_pairs:
            p_a = pair.get("projectA", {})
            p_b = pair.get("projectB", {})
            sim_score = pair.get("similarityScore", 80.0)
            vendor_match = pair.get("vendorMatch", False)
            match_type = pair.get("matchType", "cross-year")

            # Determine severity
            if sim_score >= 90.0 or vendor_match:
                severity = "CRITICAL"
                risk_score = min(98, max(85, int(round(sim_score))))
            else:
                severity = "HIGH"
                risk_score = min(84, max(65, int(round(sim_score))))

            # Retrieve state and full metadata
            proj_data = project_map.get(p_a.get("id"), {})
            state = proj_data.get("state", "Unknown")
            district = p_a.get("district") or proj_data.get("district", "Unknown")

            # Construct concise institutional description
            reasons = pair.get("reasons", [])
            primary_reason = reasons[0] if reasons else "High fuzzy text similarity and geospatial proximity."
            secondary_reason = reasons[1] if len(reasons) > 1 else ""
            desc = (
                f"Potential {match_type} duplicate asset tender matching {p_b.get('name')} "
                f"(ID: {p_b.get('id')}). {primary_reason} {secondary_reason}"
            ).strip()

            alerts.append({
                "projectId": p_a.get("id"),
                "projectName": p_a.get("name"),
                "state": state,
                "district": district,
                "alertType": ALERT_TYPE_DUPLICATE,
                "severity": severity,
                "riskScore": risk_score,
                "title": f"Duplicate Work Scheme Detected ({int(round(sim_score))}% Match) - {district}",
                "description": desc,
                "timestamp": "2026-08-08T14:30:00Z",
                "recommendedAction": (
                    "Initiate cross-departmental GPS verification survey and physical site inspection "
                    "to ensure non-duplication of municipal asset funds."
                ),
                "sourceModule": SOURCE_DUPLICATE,
            })

        return alerts

    def _collect_seasonal_trend_alerts(self) -> List[Dict[str, Any]]:
        """Extracts fiscal year-end March Rush fund-dumping flags from Trend Analysis."""
        alerts: List[Dict[str, Any]] = []
        dumping_report = get_seasonal_fund_dumping_report()

        for item in dumping_report.get("flaggedProjects", []):
            phys_prog = float(item.get("physicalProgress", 0.0))
            district = item.get("district", "Unknown")
            date_spent = item.get("dateSpent", "2026-03-15")
            fy = item.get("financialYear", "2025-26")

            # Severe anomaly if fund was dumped while physical progress remains very low
            if phys_prog < 40.0:
                severity = "CRITICAL"
                risk_score = min(92, max(81, int(round(75 + (40.0 - phys_prog) * 0.4))))
            elif phys_prog < 60.0:
                severity = "HIGH"
                risk_score = min(80, max(65, int(round(65 + (60.0 - phys_prog) * 0.3))))
            else:
                severity = "WARNING"
                risk_score = 58

            alerts.append({
                "projectId": item.get("projectId"),
                "projectName": item.get("projectName"),
                "state": item.get("state", "Unknown"),
                "district": district,
                "alertType": ALERT_TYPE_SEASONAL,
                "severity": severity,
                "riskScore": risk_score,
                "title": f"Fiscal Year-End Spending Surge ('March Rush') - {district}",
                "description": item.get(
                    "auditWarning",
                    f"Disbursement released on {date_spent} in the final 6 weeks of FY {fy} "
                    f"with {phys_prog}% certified physical completion.",
                ),
                "timestamp": f"{date_spent}T16:00:00Z" if len(date_spent) == 10 else "2026-03-20T16:00:00Z",
                "recommendedAction": (
                    "Audit third-party measurement books and voucher release certificates "
                    "for year-end tranche acceleration."
                ),
                "sourceModule": SOURCE_TREND,
            })

        return alerts

    def _collect_citizen_contradiction_alerts(self) -> List[Dict[str, Any]]:
        """Extracts citizen complaints with contradictionScore >= 60."""
        alerts: List[Dict[str, Any]] = []
        try:
            from app.services.citizen_nlp import get_high_contradiction_complaints
            flagged_complaints = get_high_contradiction_complaints(threshold=60)

            for item in flagged_complaints:
                contra_score = item.get("contradictionScore", 70)
                severity = "CRITICAL" if contra_score >= 85 else "HIGH"
                district = item.get("district", "Unknown")
                project_id = item.get("projectId")
                project_name = item.get("projectName", "Infrastructure Scheme")

                alerts.append({
                    "projectId": project_id,
                    "projectName": project_name,
                    "state": item.get("state", "Unknown"),
                    "district": district,
                    "alertType": ALERT_TYPE_CITIZEN,
                    "severity": severity,
                    "riskScore": contra_score,
                    "title": f"Citizen Ground Truth Contradiction ({contra_score}/100) - {district}",
                    "description": item.get(
                        "plainLanguageExplanation",
                        "Citizen ground truth inspection contradicts official progress claims.",
                    ),
                    "timestamp": item.get("submittedAt") or "2026-08-10T12:00:00Z",
                    "recommendedAction": (
                        "Deploy District Technical Quality Inspector for physical site inspection "
                        "and GPS geotag verification."
                    ),
                    "sourceModule": SOURCE_CITIZEN,
                })
        except Exception as e:
            import logging
            logging.getLogger("setu.alerts").error("Error collecting citizen contradiction alerts: %s", e)

        return alerts

    def get_all_alerts(self) -> List[Dict[str, Any]]:
        """Returns the full master list of ranked alerts."""
        if not self.is_initialized:
            self.initialize()
        return self._all_alerts

    def get_alert_by_id(self, alert_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves an alert by its unique identifier (e.g. ALT-2026-001)."""
        if not self.is_initialized:
            self.initialize()
        return self._alerts_by_id.get(alert_id)

    def get_scoped_alerts(
        self,
        role: Optional[str] = None,
        region: Optional[str] = None,
        state: Optional[str] = None,
        district: Optional[str] = None,
        alert_type: Optional[str] = None,
        severity: Optional[str] = None,
        source_module: Optional[str] = None,
        min_risk_score: Optional[int] = None,
        limit: Optional[int] = None,
        offset: int = 0,
        user: Optional[Dict[str, Any]] = None,
    ) -> Tuple[List[Dict[str, Any]], int]:
        """
        Filters and scopes the ranked alerts according to jurisdictional role
        and query parameters, ensuring underlying projectId is validated against
        the user's authorized projects list (identical to Scoped Projects table).
        """
        if not self.is_initialized:
            self.initialize()

        filtered = list(self._all_alerts)

        # 1. Project-Scoping Resolution: Exact match with Scoped Projects table
        effective_user = user
        if not effective_user and (role or region or state or district):
            role_str = (role or "").strip()
            role_clean = role_str.lower()
            effective_user = {
                "role": role_str,
                "roleId": role_clean.replace(" ", "_"),
                "state": state or (region if "state" in role_clean else None),
                "district": district or (region if any(k in role_clean for k in ("district", "agency", "implementing", "mp")) else None),
                "constituency": region if "mp" in role_clean else None,
                "agency": region if ("agency" in role_clean or "implementing" in role_clean) else None,
                "accessScope": (
                    "district_all" if "district" in role_clean
                    else "state_rollup" if "state" in role_clean
                    else "agency_assigned_only" if ("agency" in role_clean or "implementing" in role_clean)
                    else "constituency_only" if "mp" in role_clean
                    else "national_all"
                ),
            }

        if effective_user:
            all_projects = load_all_projects()
            scoped_projects = filter_projects_by_user_scope(all_projects, effective_user)
            if district:
                scoped_projects = [p for p in scoped_projects if (p.get("district") or "").strip().lower() == district.strip().lower()]
            if state:
                scoped_projects = [p for p in scoped_projects if (p.get("state") or "").strip().lower() == state.strip().lower()]
            authorized_pids = {p["id"] for p in scoped_projects}
            filtered = [a for a in filtered if a.get("projectId") in authorized_pids]
        elif district or state:
            all_projects = load_all_projects()
            scoped_projects = all_projects
            if district:
                scoped_projects = [p for p in scoped_projects if (p.get("district") or "").strip().lower() == district.strip().lower()]
            if state:
                scoped_projects = [p for p in scoped_projects if (p.get("state") or "").strip().lower() == state.strip().lower()]
            authorized_pids = {p["id"] for p in scoped_projects}
            filtered = [a for a in filtered if a.get("projectId") in authorized_pids]

        # 2. Alert Type Filter (Case-insensitive)
        if alert_type:
            at_clean = alert_type.strip().upper()
            filtered = [a for a in filtered if a.get("alertType", "").upper() == at_clean]

        # 3. Severity Filter (Case-insensitive)
        if severity:
            sev_clean = severity.strip().upper()
            filtered = [a for a in filtered if a.get("severity", "").upper() == sev_clean]

        # 4. Source Module Filter (Case-insensitive)
        if source_module:
            mod_clean = source_module.strip().lower()
            filtered = [a for a in filtered if a.get("sourceModule", "").lower() == mod_clean]

        # 5. Minimum Risk Score Filter
        if min_risk_score is not None:
            filtered = [a for a in filtered if a.get("riskScore", 0) >= min_risk_score]

        total_count = len(filtered)

        # 6. Pagination Slice
        if offset > 0:
            filtered = filtered[offset:]
        if limit is not None and limit > 0:
            filtered = filtered[:limit]

        return filtered, total_count

    def get_summary(
        self,
        role: Optional[str] = None,
        region: Optional[str] = None,
        state: Optional[str] = None,
        district: Optional[str] = None,
        user: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Provides portfolio and role-scoped alert breakdown statistics."""
        scoped_alerts, total_count = self.get_scoped_alerts(
            role=role,
            region=region,
            state=state,
            district=district,
            user=user,
        )

        critical_count = sum(1 for a in scoped_alerts if a.get("severity") == "CRITICAL")
        high_count = sum(1 for a in scoped_alerts if a.get("severity") == "HIGH")
        warning_count = sum(1 for a in scoped_alerts if a.get("severity") in ("WARNING", "MEDIUM"))
        low_count = sum(1 for a in scoped_alerts if a.get("severity") == "LOW")

        by_type: Dict[str, int] = {
            ALERT_TYPE_FINANCIAL: 0,
            ALERT_TYPE_COMPLIANCE: 0,
            ALERT_TYPE_DUPLICATE: 0,
            ALERT_TYPE_SEASONAL: 0,
            ALERT_TYPE_CITIZEN: 0,
        }
        for a in scoped_alerts:
            at = a.get("alertType")
            if at in by_type:
                by_type[at] += 1

        by_module: Dict[str, int] = {
            SOURCE_RISK: 0,
            SOURCE_COMPLIANCE: 0,
            SOURCE_DUPLICATE: 0,
            SOURCE_TREND: 0,
            SOURCE_CITIZEN: 0,
        }
        for a in scoped_alerts:
            sm = a.get("sourceModule")
            if sm in by_module:
                by_module[sm] += 1

        avg_score = (
            round(sum(a.get("riskScore", 0) for a in scoped_alerts) / total_count, 1)
            if total_count > 0 else 0.0
        )

        return {
            "totalAlerts": total_count,
            "criticalCount": critical_count,
            "highCount": high_count,
            "warningCount": warning_count,
            "lowCount": low_count,
            "averageRiskScore": avg_score,
            "byType": by_type,
            "bySourceModule": by_module,
            "roleScoped": bool(role or region or state or district or user),
            "roleApplied": role or (user.get("role") if user else None),
            "regionApplied": region,
            "stateApplied": state or (user.get("state") if user else None),
            "districtApplied": district or (user.get("district") if user else None),
            "generatedAt": self._generated_at or datetime.now(timezone.utc).isoformat(),
        }


# Global singleton instance
alerts_service = AlertsAggregatorService()
alerts_service.initialize()


def get_alerts(
    role: Optional[str] = None,
    region: Optional[str] = None,
    state: Optional[str] = None,
    district: Optional[str] = None,
    alert_type: Optional[str] = None,
    severity: Optional[str] = None,
    source_module: Optional[str] = None,
    min_risk_score: Optional[int] = None,
    limit: Optional[int] = None,
    offset: int = 0,
    user: Optional[Dict[str, Any]] = None,
) -> Tuple[List[Dict[str, Any]], int]:
    """Convenience accessor for filtered, role-scoped alerts."""
    return alerts_service.get_scoped_alerts(
        role=role,
        region=region,
        state=state,
        district=district,
        alert_type=alert_type,
        severity=severity,
        source_module=source_module,
        min_risk_score=min_risk_score,
        limit=limit,
        offset=offset,
        user=user,
    )


def get_alert_by_id(alert_id: str) -> Optional[Dict[str, Any]]:
    """Convenience accessor for single alert lookup."""
    return alerts_service.get_alert_by_id(alert_id)


def get_alerts_summary(
    role: Optional[str] = None,
    region: Optional[str] = None,
    state: Optional[str] = None,
    district: Optional[str] = None,
    user: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """Convenience accessor for alert summary metrics."""
    return alerts_service.get_summary(
        role=role,
        region=region,
        state=state,
        district=district,
        user=user,
    )
