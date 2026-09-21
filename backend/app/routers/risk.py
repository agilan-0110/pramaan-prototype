"""
FastAPI Router for Project Financial Risk Evaluation.

Exposes endpoints for auditing predictive expenditure risks, disbursement anomalies,
and SHAP-based feature attribution:
- GET /projects/{id}/risk
- GET /projects/risk/summary
- GET /projects/risk/high-risk

Enforces strict RBAC: Implementing Agency cannot access financial risk scores or SHAP evaluations per ROLES.md.
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from pydantic import BaseModel, Field

from app.services.auth import get_optional_current_user
from app.services.risk import (
    get_high_risk_projects,
    get_project_risk,
    get_risk_summary,
)

router = APIRouter(
    prefix="/projects",
    tags=["Financial Risk"],
)


def enforce_risk_access(current_user: Optional[Dict[str, Any]]) -> None:
    """Blocks Implementing Agency and MP Office from accessing raw financial risk models and SHAP attributions per ROLES.md."""
    if not current_user:
        return
    import re
    role_id = current_user.get("roleId", "")
    role_name = (current_user.get("role") or "").lower()
    scope = current_user.get("accessScope", "")
    if scope == "agency_assigned_only" or "implementing" in role_id or "implementing" in role_name:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Financial risk evaluations and SHAP predictive models are restricted to statutory oversight authorities per ROLES.md.",
        )
    if scope in ["constituency_only", "nominated_mp_districts"] or role_id == "mp_office" or bool(re.search(r"\bmp\b", role_name)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Raw predictive risk models and SHAP attribution metrics are restricted. MP Office access is provided via plain-language explanations on project records per ROLES.md.",
        )



class FeatureContribution(BaseModel):
    """Detailed attribution for an individual model feature."""
    feature: str = Field(..., description="Feature key")
    displayName: str = Field(..., description="Institutional human-readable metric name")
    value: float = Field(..., description="Observed project value")
    unit: str = Field(..., description="Unit of measurement (INR, %, days)")
    shapValue: float = Field(..., description="SHAP marginal contribution to anomaly score")
    contributionDirection: str = Field(..., description="'INCREASES_RISK' or 'DECREASES_RISK'")
    impactPercentage: float = Field(..., description="Relative percentage contribution among all evaluated features")


class ProjectRiskResponse(BaseModel):
    """Full predictive financial risk audit for a single project."""
    projectId: str = Field(..., description="Unique project ID (e.g. PRJ-IND-2003)")
    projectName: str = Field(..., description="Full descriptive project title")
    category: Optional[str] = Field(None, description="Infrastructure work category")
    state: Optional[str] = Field(None, description="State")
    district: Optional[str] = Field(None, description="District")
    constituency: Optional[str] = Field(None, description="Parliamentary Constituency")
    mpName: Optional[str] = Field(None, description="Fictional MP attribution")
    riskScore: int = Field(..., description="0-100 anomaly-based risk score (higher = more anomalous)")
    riskLevel: str = Field(..., description="'LOW' (< 31), 'MEDIUM' (31-60), 'HIGH' (61-80), 'CRITICAL' (81+)")
    anomalyScore: float = Field(..., description="Normalized IsolationForest anomaly metric (0.0 to 1.0)")
    rawModelScore: float = Field(..., description="Raw decision_function score from IsolationForest")
    modelType: str = Field("IsolationForest", description="Machine learning anomaly detection algorithm")
    explainabilityMethod: str = Field("SHAP (KernelExplainer)", description="Method used to attribute feature contributions")
    features: Dict[str, float] = Field(..., description="Evaluated feature metrics")
    shapValues: Dict[str, float] = Field(..., description="SHAP feature attribution values")
    topContributingFeatures: List[FeatureContribution] = Field(..., description="Ranked feature contributions")
    plainLanguageExplanation: str = Field(..., description="Human-readable plain language audit explanation")
    evaluatedAt: str = Field(..., description="ISO 8601 UTC timestamp of evaluation")


class RiskSummaryResponse(BaseModel):
    """Portfolio-wide financial risk metrics and level distribution."""
    totalProjectsMonitored: int
    averageRiskScore: float
    distributionByLevel: Dict[str, int]
    modelMetadata: Dict[str, Any]
    generatedAt: str


@router.get(
    "/risk/summary",
    response_model=RiskSummaryResponse,
    summary="Get Portfolio Financial Risk Summary",
    description="Returns aggregate risk score distribution and model metadata across all monitored MPLADS projects.",
)
def get_summary(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user)
) -> RiskSummaryResponse:
    enforce_risk_access(current_user)
    return RiskSummaryResponse(**get_risk_summary())


@router.get(
    "/risk/high-risk",
    response_model=List[ProjectRiskResponse],
    summary="List High and Critical Risk Projects",
    description="Returns all projects categorized under HIGH (61-80) or CRITICAL (81+) risk levels.",
)
def list_high_risk_projects(
    min_score: int = Query(61, ge=0, le=100, description="Minimum risk score threshold (default: 61)"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[ProjectRiskResponse]:
    enforce_risk_access(current_user)
    projects = get_high_risk_projects(min_score)
    return [ProjectRiskResponse(**p) for p in projects]


@router.get(
    "/{id}/risk",
    response_model=ProjectRiskResponse,
    summary="Get Project Financial Risk and SHAP Attribution",
    description="Evaluates expenditure anomaly pacing using IsolationForest and extracts feature contributions via SHAP KernelExplainer.",
)
def get_risk(
    id: str = Path(..., description="Unique project ID (e.g. PRJ-IND-2003)", examples=["PRJ-IND-2003"]),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> ProjectRiskResponse:
    enforce_risk_access(current_user)
    result = get_project_risk(id)
    if not result:
        raise HTTPException(
            status_code=404,
            detail=f"Project with ID '{id}' was not found in the platform registry."
        )
    return ProjectRiskResponse(**result)
