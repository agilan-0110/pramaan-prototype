"""
FastAPI Router for Project Compliance Evaluation.

Exposes endpoints for auditing statutory MPLADS compliance rules:
- GET /projects/{id}/compliance
- GET /projects/compliance/summary
- GET /projects/compliance/violations
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Path, Query
from pydantic import BaseModel, Field

from app.services.compliance import (
    evaluate_project_compliance,
    get_all_compliance_evaluations,
    get_compliance_summary,
)

router = APIRouter(
    prefix="/projects",
    tags=["Compliance"],
)


class ComplianceFlag(BaseModel):
    """Details of an individual compliance rule evaluation."""
    ruleId: str = Field(..., description="Unique code for the evaluated rule")
    ruleName: str = Field(..., description="Human-readable rule title")
    passed: bool = Field(..., description="Whether the project satisfied this compliance requirement")
    status: str = Field(..., description="'PASSED' or 'FLAGGED'")
    severity: str = Field(..., description="Risk severity rating: CRITICAL, HIGH, MEDIUM, LOW, or NONE")
    message: str = Field(..., description="Plain-language audit explanation of the result")
    threshold: Optional[Any] = Field(None, description="Statutory limit or threshold evaluated against")
    actualValue: Optional[Any] = Field(None, description="Observed project value")
    expectedAgency: Optional[str] = Field(None, description="Expected executing agency (Rule 3)")
    actualAgency: Optional[str] = Field(None, description="Observed executing agency (Rule 3)")
    details: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Contextual rule metadata")


class ProjectComplianceResponse(BaseModel):
    """Full statutory compliance evaluation audit for a single project."""
    projectId: str = Field(..., description="Unique project identifier (e.g. PRJ-IND-2001)")
    projectName: str = Field(..., description="Full descriptive title of the project")
    state: Optional[str] = Field(None, description="Indian State")
    district: Optional[str] = Field(None, description="District")
    constituency: Optional[str] = Field(None, description="Parliamentary Constituency")
    mpName: Optional[str] = Field(None, description="Fictional MP attribution")
    category: Optional[str] = Field(None, description="Work category: Road, Health, Education, Water, Civic")
    implementingAgency: Optional[str] = Field(None, description="Government executing agency")
    vendorId: Optional[str] = Field(None, description="Assigned vendor ID")
    vendorName: Optional[str] = Field(None, description="Assigned vendor name")
    sanctionedAmount: Optional[int] = Field(None, description="Total sanctioned funding in INR")
    complianceScore: int = Field(..., description="Aggregate compliance health score (0-100)")
    overallStatus: str = Field(..., description="'COMPLIANT' or 'FLAGGED'")
    totalViolations: int = Field(..., description="Count of breached compliance rules")
    rulesEvaluated: int = Field(..., description="Total number of evaluated rules")
    rulesPassed: int = Field(..., description="Count of satisfied rules")
    rulesFailed: int = Field(..., description="Count of violated rules")
    flags: List[ComplianceFlag] = Field(..., description="Detailed evaluation for each compliance rule")
    evaluatedAt: str = Field(..., description="ISO 8601 UTC timestamp of evaluation")


class ComplianceSummaryResponse(BaseModel):
    """Portfolio-wide compliance metrics and violation breakdown."""
    totalProjects: int
    compliantProjects: int
    flaggedProjects: int
    averageComplianceScore: float
    violationsByRule: Dict[str, int]
    generatedAt: str


@router.get(
    "/compliance/summary",
    response_model=ComplianceSummaryResponse,
    summary="Get Portfolio-wide Compliance Summary",
    description="Returns aggregate compliance statistics across all monitored MPLADS projects.",
)
def get_summary() -> ComplianceSummaryResponse:
    return ComplianceSummaryResponse(**get_compliance_summary())


@router.get(
    "/compliance/violations",
    response_model=List[ProjectComplianceResponse],
    summary="List All Projects with Compliance Violations",
    description="Returns all projects currently flagged for one or more statutory compliance breaches.",
)
def list_flagged_projects(
    min_violations: int = Query(1, ge=1, description="Minimum number of violations to filter by")
) -> List[ProjectComplianceResponse]:
    all_evals = get_all_compliance_evaluations()
    flagged = [e for e in all_evals if e["totalViolations"] >= min_violations]
    return [ProjectComplianceResponse(**e) for e in flagged]


@router.get(
    "/{id}/compliance",
    response_model=ProjectComplianceResponse,
    summary="Evaluate Project Compliance",
    description="Evaluates all 4 statutory compliance rules (Ceiling, Deadline, Category Mismatch, Fund Splitting) for a given project ID.",
)
def get_project_compliance(
    id: str = Path(..., description="The unique project ID (e.g. PRJ-IND-2001)", examples=["PRJ-IND-2001"])
) -> ProjectComplianceResponse:
    result = evaluate_project_compliance(id)
    if not result:
        raise HTTPException(
            status_code=404,
            detail=f"Project with ID '{id}' was not found in the platform registry."
        )
    return ProjectComplianceResponse(**result)
