"""
Statutory Audit & Override Service for Auditor / CAG.

Implements the independent, cross-cutting statutory audit capabilities per ROLES.md:
1. Formal Audit Observations: Severity-tagged formal observations attached to any project at any time.
2. Audit Override Engine: HIGH/CRITICAL observations can reopen previously resolved flags
   (reverting status to OPEN, reassigning ownership to specified tier, and recording permanent override logs).
3. Resolution History & Status Trail: Full audit trail of flag ownership, state durations, and timeout findings.
4. Unresolved on Completion: Surfaces completed projects with lingering open/unresolved compliance flags.
"""

from datetime import datetime, timezone
import json
from pathlib import Path
from typing import Any, Dict, List, Optional
import uuid

from app.services.alerts import alerts_service


class AuditService:
    def __init__(self):
        self._observations: List[Dict[str, Any]] = []
        self._override_log: List[Dict[str, Any]] = []
        self._is_initialized: bool = False

    def _load_projects(self) -> List[Dict[str, Any]]:
        """Loads all projects from mockProjects.json."""
        projects_file = Path(__file__).resolve().parent.parent / "data" / "mockProjects.json"
        if projects_file.exists():
            try:
                with open(projects_file, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
        return []

    def initialize(self):
        """Pre-seeds initial formal observations and override log for statutory audit demonstration."""
        now_iso = datetime.now(timezone.utc).isoformat()
        
        self._observations = [
            {
                "id": "OBS-2026-001",
                "projectId": "PRJ-IND-TN-103",
                "projectName": "Establishment of Advanced Pediatric Critical Care Wing at Government Hospital, Chennai",
                "state": "Tamil Nadu",
                "district": "Chennai",
                "severity": "HIGH",
                "observationText": "Statutory inspection reveals project marked 100% physically completed but final payment reconciliation displays ₹14.50 Lakh expenditure above statutory ceiling without post-facto sanction.",
                "targetAlertId": "ALT-2026-015",
                "targetFlagTitle": "Category Expenditure Ceiling Breach - Health",
                "reopenedFlag": False,
                "reassignedTo": "District Authority",
                "auditorName": "Principal Accountant General (Audit), Statutory Field Office",
                "auditorWing": "Auditor / CAG Central Audit Wing",
                "createdAt": "2026-08-14T10:30:00Z",
            },
            {
                "id": "OBS-2026-002",
                "projectId": "PRJ-IND-KA-003",
                "projectName": "Construction of Precast Reinforced Concrete Stormwater Box Culvert System, Bengaluru Urban",
                "state": "Karnataka",
                "district": "Bengaluru Urban",
                "severity": "CRITICAL",
                "observationText": "Cross-state procurement analysis confirms contractor entity Deccan Apex Infrastructure Ltd (VND-NAT-002) identical to Pune box culvert scheme. Recommended for joint CAG central forensic audit.",
                "targetAlertId": "ALT-2026-003",
                "targetFlagTitle": "Inter-State Duplicate Scheme Match: Maharashtra vs Karnataka",
                "reopenedFlag": False,
                "reassignedTo": "Central Nodal Agency (MoSPI)",
                "auditorName": "Principal Accountant General (Audit), Statutory Field Office",
                "auditorWing": "Special Forensic Audit Cell (MPLADS)",
                "createdAt": "2026-08-16T15:45:00Z",
            },
        ]

        self._override_log = [
            {
                "id": "OVR-2026-001",
                "observationId": "OBS-2026-000",
                "projectId": "PRJ-IND-MH-003",
                "projectName": "Construction of Precast Reinforced Concrete Stormwater Drainage Box Culvert, Pune",
                "state": "Maharashtra",
                "district": "Pune",
                "alertId": "ALT-2026-002",
                "alertTitle": "Contractor Duplicate Billing Signal",
                "previousStatus": "RESOLVED_FALSE_POSITIVE",
                "newStatus": "OPEN",
                "previousOwner": "District Authority (Pune)",
                "reassignedOwner": "State Nodal Authority (Maharashtra)",
                "reassignedRoleId": "state_nodal",
                "justification": "District Authority erroneously dismissed contractor match without reviewing inter-state vendor tax returns. Reopened and reassigned to State Nodal Authority.",
                "overriddenBy": "Principal Accountant General (Audit), Statutory Field Office",
                "timestamp": "2026-08-10T11:15:00Z",
            }
        ]
        self._is_initialized = True

    def get_formal_observations(self, project_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """Returns all formal audit observations, optionally filtered by projectId."""
        if not self._is_initialized:
            self.initialize()
        if project_id:
            pid_clean = project_id.strip().upper()
            return [o for o in self._observations if o.get("projectId", "").upper() == pid_clean]
        return list(reversed(self._observations))

    def get_audit_override_log(self, project_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """Returns all audit override events where a resolved flag was reopened."""
        if not self._is_initialized:
            self.initialize()
        if project_id:
            pid_clean = project_id.strip().upper()
            return [o for o in self._override_log if o.get("projectId", "").upper() == pid_clean]
        return list(reversed(self._override_log))

    def attach_observation(
        self,
        project_id: str,
        severity: str,
        observation_text: str,
        target_alert_id: Optional[str] = None,
        reopen_flag: bool = False,
        reassign_to_role: Optional[str] = "district_authority",
        auditor_wing: Optional[str] = "Auditor / CAG Central Audit Wing",
        user: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Attaches a severity-tagged formal audit observation to a project.
        If reopen_flag is True and severity in ('HIGH', 'CRITICAL'), executes a statutory override
        that reopens the targeted flag to 'OPEN' and reassigns ownership to the requested administrative tier.
        """
        if not self._is_initialized:
            self.initialize()

        now = datetime.now(timezone.utc)
        now_iso = now.isoformat()
        sev_clean = severity.strip().upper()
        if sev_clean not in ("LOW", "MEDIUM", "HIGH", "CRITICAL"):
            sev_clean = "HIGH"

        # Lookup project metadata
        all_projects = self._load_projects()
        target_project = next((p for p in all_projects if p.get("id") == project_id), None)
        project_name = target_project.get("name", project_id) if target_project else project_id
        state = target_project.get("state", "National") if target_project else "National"
        district = target_project.get("district", "General") if target_project else "General"

        obs_id = f"OBS-2026-{len(self._observations) + 101:03d}"
        auditor_name = (user.get("officialName") if user else "Principal Accountant General (Audit), Statutory Field Office") or "Principal Accountant General (Audit), Statutory Field Office"

        target_flag_title = None
        override_entry = None
        reopened = False

        role_name_map = {
            "district_authority": "District Authority",
            "state_nodal": "State Nodal Authority",
            "mospi_officer": "Central Nodal Agency (MoSPI)",
        }
        reassigned_role_name = role_name_map.get(reassign_to_role, "District Authority")

        # Handle Statutory Flag Reopening if requested for HIGH/CRITICAL severity
        if reopen_flag and sev_clean in ("HIGH", "CRITICAL"):
            alert = None
            if target_alert_id:
                alert = alerts_service.get_alert_by_id(target_alert_id)
            
            # If no targetAlertId or alert not found, locate a flag on this project
            if not alert:
                all_alerts = alerts_service.get_all_alerts()
                matching_alerts = [a for a in all_alerts if a.get("projectId") == project_id]
                # Prefer resolved flags
                resolved_matches = [a for a in matching_alerts if a.get("status") in ("RESOLVED_CONFIRMED", "RESOLVED_FALSE_POSITIVE", "ESCALATED")]
                if resolved_matches:
                    alert = resolved_matches[0]
                elif matching_alerts:
                    alert = matching_alerts[0]

            if alert:
                target_alert_id = alert.get("id")
                target_flag_title = alert.get("title")
                prev_status = alert.get("status", "RESOLVED_FALSE_POSITIVE")
                prev_owner = alert.get("ownerRole", "District Authority")

                # Perform live status update in alerts service
                updated_alert = alerts_service.reopen_alert_by_auditor(
                    alert_id=target_alert_id,
                    user=user,
                    notes=observation_text,
                    severity=sev_clean,
                    reassign_to_role=reassign_to_role or "district_authority",
                )

                reopened = True
                override_id = f"OVR-2026-{len(self._override_log) + 101:03d}"
                override_entry = {
                    "id": override_id,
                    "observationId": obs_id,
                    "projectId": project_id,
                    "projectName": project_name,
                    "state": state,
                    "district": district,
                    "alertId": target_alert_id,
                    "alertTitle": target_flag_title or "Statutory Compliance / Financial Risk Signal",
                    "previousStatus": prev_status,
                    "newStatus": "OPEN",
                    "previousOwner": prev_owner,
                    "reassignedOwner": reassigned_role_name,
                    "reassignedRoleId": reassign_to_role or "district_authority",
                    "justification": observation_text,
                    "overriddenBy": auditor_name,
                    "timestamp": now_iso,
                }
                self._override_log.append(override_entry)

        observation_record = {
            "id": obs_id,
            "projectId": project_id,
            "projectName": project_name,
            "state": state,
            "district": district,
            "severity": sev_clean,
            "observationText": observation_text,
            "targetAlertId": target_alert_id,
            "targetFlagTitle": target_flag_title,
            "reopenedFlag": reopened,
            "reassignedTo": reassigned_role_name if reopened else None,
            "auditorName": auditor_name,
            "auditorWing": auditor_wing or "Auditor / CAG Central Audit Wing",
            "createdAt": now_iso,
            "overrideLog": override_entry,
        }

        self._observations.append(observation_record)
        return observation_record

    def get_unresolved_on_completion(self) -> List[Dict[str, Any]]:
        """
        Returns all COMPLETED projects (status == 'Completed' or physicalProgress == 100)
        that have lingering OPEN, INSPECTION_ORDERED, or ESCALATED flags per ROLES.md rule 12.
        """
        all_projects = self._load_projects()
        all_alerts = alerts_service.get_all_alerts()

        completed_projects = [
            p for p in all_projects
            if p.get("status") == "Completed" or p.get("physicalProgress") == 100
        ]

        result = []
        for p in completed_projects:
            pid = p.get("id")
            proj_alerts = [
                a for a in all_alerts
                if a.get("projectId") == pid and a.get("status") in ("OPEN", "INSPECTION_ORDERED", "ESCALATED")
            ]
            if proj_alerts:
                result.append({
                    "project": p,
                    "unresolvedAlerts": proj_alerts,
                    "unresolvedCount": len(proj_alerts),
                    "highestSeverity": "CRITICAL" if any(a.get("severity") == "CRITICAL" for a in proj_alerts) else "HIGH",
                })

        return result

    def get_resolution_history(self, project_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Returns the comprehensive resolution history and status trail across all projects and flags,
        explicitly highlighting inaction-timeouts as standalone audit findings.
        """
        all_alerts = alerts_service.get_all_alerts()
        if project_id:
            pid_clean = project_id.strip().upper()
            all_alerts = [a for a in all_alerts if a.get("projectId", "").upper() == pid_clean]

        history_records = []
        for a in all_alerts:
            status_history = a.get("statusHistory", [])
            has_timeout = a.get("escalationReason") == "Inaction Timeout" or any(
                "inaction timeout" in (h.get("notes", "")).lower() or "inaction timeout" in (h.get("changedBy", "")).lower()
                for h in status_history
            )
            history_records.append({
                "alertId": a.get("id"),
                "projectId": a.get("projectId"),
                "projectName": a.get("projectName"),
                "state": a.get("state"),
                "district": a.get("district"),
                "alertType": a.get("alertType"),
                "severity": a.get("severity"),
                "currentStatus": a.get("status"),
                "currentOwner": a.get("ownerRole"),
                "ownerRoleId": a.get("ownerRoleId"),
                "daysOpen": a.get("daysOpen", 0),
                "isTimeoutFinding": has_timeout,
                "escalationReason": a.get("escalationReason"),
                "statusHistory": status_history,
                "isReopenedByAuditor": a.get("isReopenedByAuditor", False),
            })

        return history_records


audit_service = AuditService()
