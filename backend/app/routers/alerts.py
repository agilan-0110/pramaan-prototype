"""
FastAPI Router for Unified Institutional Alerts Aggregator.

Pulls signals from all analytical engines (Financial Risk, Compliance Rule Engine,
Duplicate Work Detection, Trend Analysis) and exposes them through a ranked,
role-scoped alert feed matching API_CONTRACT.md:
- GET /alerts
- GET /alerts/summary
- GET /alerts/{id}
"""

import re
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from pydantic import BaseModel, Field

from app.services.alerts import (
    get_alert_by_id,
    get_alerts,
    get_alerts_summary,
    resolve_alert,
    resolve_role_tier,
)
from app.services.auth import get_optional_current_user

router = APIRouter(
    prefix="/alerts",
    tags=["Institutional Alerts"],
)


class AlertItem(BaseModel):
    """Unified institutional alert schema matching API_CONTRACT.md GET /alerts with resolution lifecycle."""
    id: str = Field(..., description="Unique alert identifier (e.g. ALT-2026-001)", examples=["ALT-2026-001"])
    projectId: str = Field(..., description="Associated MPLADS project identifier", examples=["PRJ-IND-2003"])
    projectName: str = Field(..., description="Descriptive public work name")
    state: str = Field(..., description="Administrative State", examples=["Maharashtra"])
    district: str = Field(..., description="Administrative District", examples=["Pune"])
    alertType: str = Field(
        ...,
        description="Alert category: FINANCIAL_RISK | COMPLIANCE_VIOLATION | DUPLICATE_WORK | SEASONAL_ANOMALY | CITIZEN_CONTRADICTION",
        examples=["FINANCIAL_RISK"],
    )
    severity: str = Field(
        ...,
        description="Risk severity tier: CRITICAL | HIGH | WARNING | MEDIUM | LOW",
        examples=["CRITICAL"],
    )
    riskScore: int = Field(
        ...,
        description="Calibrated 0-100 anomaly or violation risk score",
        examples=[95],
        ge=0,
        le=100,
    )
    title: str = Field(..., description="Concise human-readable alert title")
    description: str = Field(..., description="Plain-language institutional explanation synthesized from source module")
    timestamp: str = Field(..., description="ISO 8601 UTC timestamp of signal generation")
    recommendedAction: str = Field(..., description="Concrete suggested next administrative or audit step")
    sourceModule: str = Field(
        ...,
        description="Analytical engine generating the signal: risk | compliance | duplicate | trend | citizen",
        examples=["risk"],
    )
    status: str = Field("OPEN", description="Resolution lifecycle status: OPEN | INSPECTION_ORDERED | RESOLVED_CONFIRMED | RESOLVED_FALSE_POSITIVE | ESCALATED", examples=["OPEN"])
    ownerRole: str = Field("District Authority", description="Single administrative role currently owning resolution (District Authority | State Nodal | Central Nodal Agency (MoSPI))")
    ownerRoleId: str = Field("district_authority", description="Machine identifier of owning role (district_authority | state_nodal | mospi_officer)")
    escalationReason: Optional[str] = Field(None, description="Reason for escalation if ownership transferred (e.g. Confirmed Critical Anomaly | Inaction Timeout)")
    updatedAt: Optional[str] = Field(None, description="ISO timestamp of last status change")
    daysOpen: Optional[int] = Field(0, description="Elapsed days in open/investigation status")
    statusHistory: Optional[List[Dict[str, Any]]] = Field(None, description="Chronological audit history of resolution status changes")


class AlertResolutionRequest(BaseModel):
    """Schema for updating flag resolution status by owning authority."""
    status: str = Field(..., description="Target status: INSPECTION_ORDERED | RESOLVED_CONFIRMED | RESOLVED_FALSE_POSITIVE | ESCALATED", examples=["INSPECTION_ORDERED"])
    notes: Optional[str] = Field(None, description="Administrative order remarks or justification", examples=["Quality inspector deployed for on-site core sampling."])
    inspectionOfficer: Optional[str] = Field(None, description="Designated inspection officer or agency", examples=["Executive Engineer (Vigilance)"])



class AlertsSummaryResponse(BaseModel):
    """Institutional alert counters, severity breakdown, and jurisdictional scope."""
    totalAlerts: int = Field(..., description="Total count of active alerts matching scope")
    criticalCount: int = Field(..., description="Total count of CRITICAL severity alerts")
    highCount: int = Field(..., description="Total count of HIGH severity alerts")
    warningCount: int = Field(..., description="Total count of WARNING / MEDIUM severity alerts")
    lowCount: int = Field(..., description="Total count of LOW severity alerts")
    averageRiskScore: float = Field(..., description="Average risk score across scoped alerts")
    byType: Dict[str, int] = Field(..., description="Alert breakdown by alertType")
    bySourceModule: Dict[str, int] = Field(..., description="Alert breakdown by source module engine")
    roleScoped: bool = Field(..., description="Whether role-based jurisdictional filtering was applied")
    roleApplied: Optional[str] = Field(None, description="User role applied for filtering")
    regionApplied: Optional[str] = Field(None, description="Region applied for filtering")
    stateApplied: Optional[str] = Field(None, description="State filter applied")
    districtApplied: Optional[str] = Field(None, description="District filter applied")
    generatedAt: str = Field(..., description="ISO 8601 UTC timestamp of summary generation")


@router.get(
    "",
    response_model=List[AlertItem],
    summary="Get Aggregated and Ranked Institutional Alerts",
    description=(
        "Returns unified alerts aggregated from the Financial Risk Engine, Compliance Rule Engine, "
        "Duplicate Work Detection, and Trend Analysis ('March Rush'). "
        "Alerts are ranked in descending order by severity (CRITICAL > HIGH > WARNING > LOW) and riskScore. "
        "Role-scoping applies per ROLES.md: District Authority sees only their district, "
        "State Nodal sees their state, and MoSPI views national alerts."
    ),
)
def list_alerts(
    role: Optional[str] = Query(
        None,
        description="User administrative role (e.g. 'District Authority', 'State Nodal', 'Central Nodal Agency (MoSPI)')",
        examples=["District Authority"],
    ),
    region: Optional[str] = Query(
        None,
        description="Jurisdictional territory name matching role (e.g. 'Pune' for District Authority, 'Maharashtra' for State Nodal)",
        examples=["Pune"],
    ),
    state: Optional[str] = Query(
        None,
        description="Filter alerts directly by state name (e.g. 'Maharashtra')",
        examples=["Maharashtra"],
    ),
    district: Optional[str] = Query(
        None,
        description="Filter alerts directly by district name (e.g. 'Pune')",
        examples=["Pune"],
    ),
    alertType: Optional[str] = Query(
        None,
        alias="alert_type",
        description="Filter by alert type: FINANCIAL_RISK | COMPLIANCE_VIOLATION | DUPLICATE_WORK | SEASONAL_ANOMALY",
    ),
    severity: Optional[str] = Query(
        None,
        description="Filter by severity level: CRITICAL | HIGH | WARNING | LOW",
    ),
    sourceModule: Optional[str] = Query(
        None,
        alias="source_module",
        description="Filter by originating analytical engine: risk | compliance | duplicate | trend",
    ),
    minRiskScore: Optional[int] = Query(
        None,
        alias="min_risk_score",
        ge=0,
        le=100,
        description="Minimum risk score threshold (0-100)",
    ),
    limit: Optional[int] = Query(
        None,
        ge=1,
        le=500,
        description="Maximum number of alerts to return (pagination)",
    ),
    offset: int = Query(
        0,
        ge=0,
        description="Pagination offset",
    ),
    projectId: Optional[str] = Query(
        None,
        alias="project_id",
        description="Filter alerts by specific project ID or drilldown into case details",
    ),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[AlertItem]:
    """Retrieves ranked, role-scoped institutional alerts with statutory severity-based routing."""
    effective_role = role
    effective_region = region
    effective_state = state
    effective_district = district

    if current_user:
        if not effective_role:
            effective_role = current_user.get("role")
        user_scope = current_user.get("accessScope", "")
        if user_scope == "district_all" or "district" in (current_user.get("role") or "").lower():
            if not effective_district:
                effective_district = current_user.get("district")
            if not effective_region:
                effective_region = effective_district
        elif user_scope == "state_rollup" or "state" in (current_user.get("role") or "").lower():
            if not effective_state:
                effective_state = current_user.get("state")
            if not effective_region:
                effective_region = effective_state
        elif user_scope == "agency_assigned_only" or "implementing" in (current_user.get("role") or "").lower() or "agency" in (current_user.get("roleId") or "").lower():
            if not effective_district:
                effective_district = current_user.get("district")
            if not effective_state:
                effective_state = current_user.get("state")
            if not effective_region:
                effective_region = effective_district or effective_state
        elif user_scope == "constituency_only" or bool(re.search(r"\bmp\b", (current_user.get("role") or "").lower())):
            if not effective_region:
                effective_region = current_user.get("constituency")

    alerts, _ = get_alerts(
        role=effective_role,
        region=effective_region,
        state=effective_state,
        district=effective_district,
        alert_type=alertType,
        severity=severity,
        source_module=sourceModule,
        min_risk_score=minRiskScore,
        limit=limit,
        offset=offset,
        user=current_user,
        project_id=projectId,
    )
    return [AlertItem(**a) for a in alerts]


@router.get(
    "/summary",
    response_model=AlertsSummaryResponse,
    summary="Get Alerts Summary and Jurisdiction Counters",
    description="Returns aggregate counts, severity breakdown, and type distribution with role-scoping support.",
)
def get_summary(
    role: Optional[str] = Query(None, description="User administrative role"),
    region: Optional[str] = Query(None, description="Jurisdictional territory name"),
    state: Optional[str] = Query(None, description="Filter by state"),
    district: Optional[str] = Query(None, description="Filter by district"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> AlertsSummaryResponse:
    """Provides high-level counters for active institutional alerts."""
    effective_role = role
    effective_region = region
    effective_state = state
    effective_district = district

    if current_user:
        if not effective_role:
            effective_role = current_user.get("role")
        user_scope = current_user.get("accessScope", "")
        if user_scope == "district_all" or "district" in (current_user.get("role") or "").lower():
            if not effective_district:
                effective_district = current_user.get("district")
            if not effective_region:
                effective_region = effective_district
        elif user_scope == "state_rollup" or "state" in (current_user.get("role") or "").lower():
            if not effective_state:
                effective_state = current_user.get("state")
            if not effective_region:
                effective_region = effective_state
        elif user_scope == "agency_assigned_only" or "implementing" in (current_user.get("role") or "").lower() or "agency" in (current_user.get("roleId") or "").lower():
            if not effective_district:
                effective_district = current_user.get("district")
            if not effective_state:
                effective_state = current_user.get("state")
            if not effective_region:
                effective_region = effective_district or effective_state
        elif user_scope == "constituency_only" or bool(re.search(r"\bmp\b", (current_user.get("role") or "").lower())):
            if not effective_region:
                effective_region = current_user.get("constituency")

    summary_data = get_alerts_summary(
        role=effective_role,
        region=effective_region,
        state=effective_state,
        district=effective_district,
        user=current_user,
    )
    return AlertsSummaryResponse(**summary_data)


@router.post(
    "/reset",
    summary="Reset Alerts In-Memory State for Testing",
)
def reset_alerts_data():
    alerts_service.initialize()
    return {"status": "reset_successful"}


@router.get(
    "/{id}",
    response_model=AlertItem,
    summary="Get Alert by Identifier",
    description="Retrieves a single alert item by its unique ID (e.g. ALT-2026-001).",
)
def get_alert(
    id: str = Path(..., description="Unique alert identifier (e.g. ALT-2026-001)", examples=["ALT-2026-001"]),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> AlertItem:
    """Retrieves an alert by its ID, enforcing role-based access control."""
    if current_user:
        role_tier = resolve_role_tier(current_user)
        if role_tier in ("implementing_agency", "mp_office"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied: Detailed alert records and recommended audit interventions are restricted to statutory oversight authorities per ROLES.md.",
            )

    alert = get_alert_by_id(id)
    if not alert:
        raise HTTPException(
            status_code=404,
            detail=f"Alert with identifier '{id}' was not found in the platform registry.",
        )
    return AlertItem(**alert)


@router.patch(
    "/{id}/status",
    response_model=AlertItem,
    summary="Update Alert Resolution Status (District Authority / Owning Role)",
    description=(
        "Transitions the resolution status of an alert flag (OPEN -> INSPECTION_ORDERED -> RESOLVED_CONFIRMED / RESOLVED_FALSE_POSITIVE). "
        "Enforces single-ownership RBAC per ROLES.md: if a CRITICAL alert is CONFIRMED, it auto-escalates to State Nodal and becomes read-only for District Authority."
    ),
)
@router.post(
    "/{id}/resolution",
    response_model=AlertItem,
    summary="Submit Resolution Action on Alert",
    description="Submits administrative action or inspection order on an active flag.",
)
def update_alert_resolution_status(
    id: str = Path(..., description="Target alert identifier", examples=["ALT-2026-001"]),
    payload: AlertResolutionRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> AlertItem:
    """Updates alert resolution lifecycle state with single-owner RBAC enforcement."""
    try:
        updated_alert = resolve_alert(
            alert_id=id,
            new_status=payload.status,
            user=current_user,
            notes=payload.notes,
            inspection_officer=payload.inspectionOfficer,
        )
        return AlertItem(**updated_alert)
    except KeyError:
        raise HTTPException(status_code=404, detail=f"Alert '{id}' not found.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



