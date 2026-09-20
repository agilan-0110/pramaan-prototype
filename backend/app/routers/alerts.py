"""
FastAPI Router for Unified Institutional Alerts Aggregator.

Pulls signals from all analytical engines (Financial Risk, Compliance Rule Engine,
Duplicate Work Detection, Trend Analysis) and exposes them through a ranked,
role-scoped alert feed matching API_CONTRACT.md:
- GET /alerts
- GET /alerts/summary
- GET /alerts/{id}
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Path, Query
from pydantic import BaseModel, Field

from app.services.alerts import (
    get_alert_by_id,
    get_alerts,
    get_alerts_summary,
)
from app.services.auth import get_optional_current_user

router = APIRouter(
    prefix="/alerts",
    tags=["Institutional Alerts"],
)


class AlertItem(BaseModel):
    """Unified institutional alert schema matching API_CONTRACT.md GET /alerts."""
    id: str = Field(..., description="Unique alert identifier (e.g. ALT-2026-001)", examples=["ALT-2026-001"])
    projectId: str = Field(..., description="Associated MPLADS project identifier", examples=["PRJ-IND-2003"])
    projectName: str = Field(..., description="Descriptive public work name")
    state: str = Field(..., description="Administrative State", examples=["Maharashtra"])
    district: str = Field(..., description="Administrative District", examples=["Pune"])
    alertType: str = Field(
        ...,
        description="Alert category: FINANCIAL_RISK | COMPLIANCE_VIOLATION | DUPLICATE_WORK | SEASONAL_ANOMALY",
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
        description="Analytical engine generating the signal: risk | compliance | duplicate | trend",
        examples=["risk"],
    )


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
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[AlertItem]:
    """Retrieves ranked, role-scoped institutional alerts."""
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
        elif user_scope == "constituency_only" or "mp" in (current_user.get("role") or "").lower():
            if not effective_district:
                effective_district = current_user.get("district")
            if not effective_region:
                effective_region = effective_district
        elif user_scope == "agency_assigned_only" or "implementing" in (current_user.get("role") or "").lower():
            if not effective_district:
                effective_district = current_user.get("district")
            if not effective_state:
                effective_state = current_user.get("state")
            if not effective_region:
                effective_region = effective_district or effective_state

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
        elif user_scope == "constituency_only" or "mp" in (current_user.get("role") or "").lower():
            if not effective_district:
                effective_district = current_user.get("district")
            if not effective_region:
                effective_region = effective_district
        elif user_scope == "agency_assigned_only" or "implementing" in (current_user.get("role") or "").lower():
            if not effective_district:
                effective_district = current_user.get("district")
            if not effective_state:
                effective_state = current_user.get("state")
            if not effective_region:
                effective_region = effective_district or effective_state

    summary_data = get_alerts_summary(
        role=effective_role,
        region=effective_region,
        state=effective_state,
        district=effective_district,
        user=current_user,
    )
    return AlertsSummaryResponse(**summary_data)


@router.get(
    "/{id}",
    response_model=AlertItem,
    summary="Get Alert by Identifier",
    description="Retrieves a single alert item by its unique ID (e.g. ALT-2026-001).",
)
def get_alert(
    id: str = Path(..., description="Unique alert identifier (e.g. ALT-2026-001)", examples=["ALT-2026-001"]),
) -> AlertItem:
    """Retrieves an alert by its ID."""
    alert = get_alert_by_id(id)
    if not alert:
        raise HTTPException(
            status_code=404,
            detail=f"Alert with identifier '{id}' was not found in the platform registry.",
        )
    return AlertItem(**alert)
