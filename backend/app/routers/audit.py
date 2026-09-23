"""
FastAPI Router for Auditor / CAG Statutory Oversight & Override Capabilities.

Provides endpoints for:
- GET /audit/observations
- POST /audit/observations & POST /projects/{id}/observations
- GET /audit/override-log
- GET /audit/unresolved-on-completion
- GET /audit/resolution-history
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from pydantic import BaseModel, Field

from app.services.audit import audit_service
from app.services.auth import get_optional_current_user

router = APIRouter(
    prefix="/audit",
    tags=["Statutory Audit & Override"],
)


class AttachObservationRequest(BaseModel):
    """Schema for Auditor/CAG attaching a formal observation and optionally overriding/reopening a flag."""
    projectId: str = Field(..., description="Target project identifier", examples=["PRJ-IND-2013"])
    severity: str = Field("HIGH", description="Observation severity: LOW | MEDIUM | HIGH | CRITICAL", examples=["CRITICAL"])
    observationText: str = Field(..., description="Detailed formal audit findings and justification text")
    targetAlertId: Optional[str] = Field(None, description="Target flag identifier if reopening a flag (e.g. ALT-2026-008)")
    reopenFlag: bool = Field(False, description="Whether to execute statutory override to reopen flag (HIGH/CRITICAL observations only)")
    reassignToRole: Optional[str] = Field("district_authority", description="Target role to reassign ownership: district_authority | state_nodal | mospi_officer")
    auditorWing: Optional[str] = Field("Auditor / CAG Central Audit Wing", description="Statutory audit branch or cell")


class FormalObservationItem(BaseModel):
    """Schema for a formal audit observation record."""
    id: str
    projectId: str
    projectName: str
    state: str
    district: str
    severity: str
    observationText: str
    targetAlertId: Optional[str] = None
    targetFlagTitle: Optional[str] = None
    reopenedFlag: bool
    reassignedTo: Optional[str] = None
    auditorName: str
    auditorWing: str
    createdAt: str
    overrideLog: Optional[Dict[str, Any]] = None


class AuditOverrideLogItem(BaseModel):
    """Schema for a permanent audit override log record."""
    id: str
    observationId: str
    projectId: str
    projectName: str
    state: str
    district: str
    alertId: str
    alertTitle: str
    previousStatus: str
    newStatus: str
    previousOwner: str
    reassignedOwner: str
    reassignedRoleId: str
    justification: str
    overriddenBy: str
    timestamp: str


@router.get(
    "/observations",
    response_model=List[FormalObservationItem],
    summary="List Formal Audit Observations",
    description="Returns all severity-tagged formal audit observations attached across projects.",
)
def list_formal_observations(
    projectId: Optional[str] = Query(None, alias="project_id", description="Filter by project identifier"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[FormalObservationItem]:
    observations = audit_service.get_formal_observations(project_id=projectId)
    return [FormalObservationItem(**o) for o in observations]


@router.post(
    "/observations",
    response_model=FormalObservationItem,
    summary="Attach Formal Audit Observation & Optional Override",
    description="Attaches a formal audit observation. If severity is HIGH/CRITICAL and reopenFlag is True, executes statutory override reverting flag to OPEN.",
)
def attach_formal_observation(
    payload: AttachObservationRequest,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> FormalObservationItem:
    if current_user:
        role_id = current_user.get("roleId", "")
        role_name = (current_user.get("role") or "").lower()
        if "auditor" not in role_id and "cag" not in role_id and "auditor" not in role_name and "cag" not in role_name:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied: Only Auditor / CAG is authorized to attach formal statutory audit observations per ROLES.md.",
            )

    try:
        obs = audit_service.attach_observation(
            project_id=payload.projectId,
            severity=payload.severity,
            observation_text=payload.observationText,
            target_alert_id=payload.targetAlertId,
            reopen_flag=payload.reopenFlag,
            reassign_to_role=payload.reassignToRole,
            auditor_wing=payload.auditorWing,
            user=current_user,
        )
        return FormalObservationItem(**obs)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get(
    "/override-log",
    response_model=List[AuditOverrideLogItem],
    summary="Get Permanent Audit Override Log",
    description="Returns permanent log of every instance where an Auditor/CAG observation reopened a previously resolved flag.",
)
def get_override_log(
    projectId: Optional[str] = Query(None, alias="project_id", description="Filter by project identifier"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[AuditOverrideLogItem]:
    logs = audit_service.get_audit_override_log(project_id=projectId)
    return [AuditOverrideLogItem(**l) for l in logs]


@router.get(
    "/unresolved-on-completion",
    summary="List Completed Projects with Unresolved Flags",
    description="Surfaces completed works (status == 'Completed' or physicalProgress == 100) that still have OPEN or unresolved flags per ROLES.md rule 12.",
)
def get_unresolved_on_completion(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[Dict[str, Any]]:
    return audit_service.get_unresolved_on_completion()


@router.get(
    "/resolution-history",
    summary="Get Comprehensive Resolution History & Inaction Timeout Trail",
    description="Returns the full status-change history for all projects/flags, with inaction-timeouts flagged distinctly as audit findings.",
)
def get_resolution_history(
    projectId: Optional[str] = Query(None, alias="project_id", description="Filter by project identifier"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[Dict[str, Any]]:
    return audit_service.get_resolution_history(project_id=projectId)
