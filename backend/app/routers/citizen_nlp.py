"""
FastAPI Router for Citizen Ground Truth NLP & Contradiction Detection.

Exposes endpoints for auditing citizen reports against official institutional claims,
supporting real-time citizen portal grievance submissions with automated NLP scoring:
- GET /projects/{id}/citizen-reports
- POST /projects/{id}/citizen-reports
- GET /projects/citizen-reports/all
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from pydantic import BaseModel, Field

from app.services.auth import get_optional_current_user
from app.services.citizen_nlp import (
    evaluate_all_complaints,
    get_citizen_nlp_summary,
    get_project_complaints,
    submit_citizen_complaint,
)
from app.services.compliance import get_project_by_id, load_projects
from app.services.alerts import alerts_service

router = APIRouter(
    prefix="/projects",
    tags=["Citizen Ground Truth NLP"],
)


def enforce_citizen_access(current_user: Optional[Dict[str, Any]]) -> None:
    """Blocks Implementing Agency and MP Office from inspecting citizen contradiction queues per ROLES.md."""
    if not current_user:
        return
    import re
    role_id = current_user.get("roleId", "")
    role_name = (current_user.get("role") or "").lower()
    scope = current_user.get("accessScope", "")
    if scope == "agency_assigned_only" or "implementing" in role_id or "implementing" in role_name:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Citizen ground truth contradiction audits are restricted to statutory oversight authorities per ROLES.md.",
        )
    if scope in ["constituency_only", "nominated_mp_districts"] or role_id == "mp_office" or bool(re.search(r"\bmp\b", role_name)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Citizen ground truth discrepancy reports and contradiction metrics are restricted to oversight authorities per ROLES.md.",
        )



class ReportedLocation(BaseModel):
    """Citizen device GPS location captured via browser geolocation API."""
    latitude: float = Field(..., description="GPS latitude coordinate", examples=[18.5204])
    longitude: float = Field(..., description="GPS longitude coordinate", examples=[73.8567])


class CitizenComplaintItem(BaseModel):
    """Detailed NLP contradiction evaluation for an individual citizen report."""
    id: str = Field(..., description="Unique grievance report identifier (e.g. CIT-2026-101)", examples=["CIT-2026-101"])
    projectId: str = Field(..., description="Target MPLADS project identifier", examples=["PRJ-IND-2003"])
    projectName: str = Field(..., description="Associated public infrastructure work name")
    district: str = Field(..., description="Administrative district")
    state: str = Field(..., description="Administrative state")
    complaintText: str = Field(..., description="Citizen on-the-ground observation text")
    matchedOfficialClaim: str = Field(..., description="Official progress claim or certified milestone status")
    topicalRelevanceScore: float = Field(
        ...,
        description="Sentence-transformers cosine similarity (0.0-100.0%) verifying complaint relates to project",
        examples=[49.6],
    )
    contradictionScore: int = Field(
        ...,
        description="0-100 composite contradiction score combining negation intensity and relevance gating",
        examples=[97],
    )
    isContradiction: bool = Field(
        ...,
        description="True if citizen report directionally contradicts certified official completion/progress",
        examples=[True],
    )
    plainLanguageExplanation: str = Field(
        ...,
        description="Plain-language audit explanation comparing official claim with citizen observation",
    )
    geoMatchDistance: Optional[float] = Field(
        None,
        description="Haversine distance in km between citizen reportedLocation and project site coordinates",
        examples=[0.3],
    )
    reportedLocation: Optional[ReportedLocation] = Field(
        None,
        description="Captured citizen geolocation coordinates",
    )
    status: str = Field(..., description="Grievance tracking status (e.g. 'Under Investigation', 'Pending Inspection')")
    submittedAt: Optional[str] = Field(None, description="ISO 8601 UTC submission timestamp")


class ProjectCitizenReportsResponse(BaseModel):
    """Collection of citizen grievance reports and contradiction statistics for a single project."""
    projectId: str = Field(..., description="Unique project ID")
    projectName: str = Field(..., description="Project title")
    totalReports: int = Field(..., description="Total citizen reports received for this project")
    contradictionsCount: int = Field(..., description="Count of confirmed status contradictions")
    corroborationsCount: int = Field(..., description="Count of positive progress corroborations")
    highestContradictionScore: int = Field(..., description="Maximum contradiction score among all reports (0-100)")
    reports: List[CitizenComplaintItem] = Field(..., description="List of evaluated citizen grievance reports")


class CitizenComplaintSubmissionRequest(BaseModel):
    """Citizen grievance submission payload from the public portal."""
    complaintText: str = Field(
        ...,
        min_length=10,
        description="Citizen ground-truth observation or defect report text",
        examples=["The contractor claimed civil work is 90% finished, but on the ground only bare brick walls stand without a roof."],
    )
    citizenName: Optional[str] = Field(None, description="Reporting citizen name (optional)", examples=["Sunita Deshmukh"])
    phone: Optional[str] = Field(None, description="Optional phone number for grievance updates", examples=["9876543210"])
    district: Optional[str] = Field(None, description="District where observation was made", examples=["Pune"])
    state: Optional[str] = Field(None, description="State where observation was made", examples=["Maharashtra"])
    reportedLocation: Optional[ReportedLocation] = Field(
        None,
        description="Captured citizen browser geolocation coordinates",
    )


class CitizenComplaintSubmissionResponse(BaseModel):
    """Real-time NLP evaluation response returned upon complaint submission."""
    id: str = Field(..., description="Assigned grievance tracking ID", examples=["CIT-2026-115"])
    projectId: str = Field(..., description="Target project ID", examples=["PRJ-IND-2003"])
    projectName: str = Field(..., description="Project title")
    complaintText: str = Field(..., description="Submitted complaint text")
    matchedOfficialClaim: str = Field(..., description="Official status text matched for comparison")
    topicalRelevanceScore: float = Field(..., description="Semantic cosine similarity percentage (0-100%)")
    contradictionScore: int = Field(..., description="Real-time contradiction score (0-100)")
    isContradiction: bool = Field(..., description="Flag indicating directional discrepancy")
    plainLanguageExplanation: str = Field(..., description="Synthesized institutional discrepancy explanation")
    geoMatchDistance: Optional[float] = Field(
        None,
        description="Haversine distance in km between citizen and project site coordinates if captured",
        examples=[0.3],
    )
    reportedLocation: Optional[ReportedLocation] = Field(None)
    alertTriggered: bool = Field(..., description="Whether a CITIZEN_CONTRADICTION institutional alert was activated")
    status: str = Field(..., description="Grievance workflow status")
    submittedAt: str = Field(..., description="ISO 8601 UTC submission timestamp")


@router.get(
    "/citizen-reports/all",
    response_model=List[CitizenComplaintItem],
    summary="List All Citizen Ground Truth Reports",
    description="Returns all citizen grievances across the platform evaluated by the hybrid NLP pipeline.",
)
def list_all_citizen_reports(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[CitizenComplaintItem]:
    """Retrieves all evaluated citizen complaints across all projects."""
    enforce_citizen_access(current_user)
    evals = evaluate_all_complaints()
    return [
        CitizenComplaintItem(
            id=e["id"],
            projectId=e["projectId"],
            projectName=e["projectName"],
            district=e["district"],
            state=e["state"],
            complaintText=e["complaintText"],
            matchedOfficialClaim=e["officialClaim"],
            topicalRelevanceScore=e["topicalRelevanceScore"],
            contradictionScore=e["contradictionScore"],
            isContradiction=e["isContradiction"],
            plainLanguageExplanation=e["plainLanguageExplanation"],
            geoMatchDistance=e.get("geoMatchDistance"),
            reportedLocation=e.get("reportedLocation"),
            status=e.get("status", "Under Investigation"),
            submittedAt=e.get("submittedAt"),
        )
        for e in evals
    ]


@router.get(
    "/{id}/citizen-reports",
    response_model=ProjectCitizenReportsResponse,
    summary="Get Project Citizen Ground Truth Reports",
    description=(
        "Returns all citizen reports filed for a specific project, including NLP semantic relevance "
        "and rule-based contradiction scores comparing citizen observations against official claims."
    ),
)
def get_project_citizen_reports(
    id: str = Path(..., description="Unique project identifier (e.g. PRJ-IND-2003)", examples=["PRJ-IND-2003"]),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> ProjectCitizenReportsResponse:
    """Retrieves evaluated citizen reports for a single project."""
    enforce_citizen_access(current_user)
    project = get_project_by_id(id)
    if not project:
        raise HTTPException(
            status_code=404,
            detail=f"Project with ID '{id}' was not found in the platform registry.",
        )

    reports = get_project_complaints(id)
    total_count = len(reports)
    contra_count = sum(1 for r in reports if r.get("isContradiction"))
    corrob_count = total_count - contra_count
    max_score = max((r.get("contradictionScore", 0) for r in reports), default=0)

    report_items = [
        CitizenComplaintItem(
            id=r["id"],
            projectId=r["projectId"],
            projectName=r["projectName"],
            district=r["district"],
            state=r["state"],
            complaintText=r["complaintText"],
            matchedOfficialClaim=r["officialClaim"],
            topicalRelevanceScore=r["topicalRelevanceScore"],
            contradictionScore=r["contradictionScore"],
            isContradiction=r["isContradiction"],
            plainLanguageExplanation=r["plainLanguageExplanation"],
            geoMatchDistance=r.get("geoMatchDistance"),
            reportedLocation=r.get("reportedLocation"),
            status=r.get("status", "Under Investigation"),
            submittedAt=r.get("submittedAt"),
        )
        for r in reports
    ]

    return ProjectCitizenReportsResponse(
        projectId=id,
        projectName=project.get("name", "Public Infrastructure Work"),
        totalReports=total_count,
        contradictionsCount=contra_count,
        corroborationsCount=corrob_count,
        highestContradictionScore=max_score,
        reports=report_items,
    )


@router.post(
    "/{id}/citizen-reports",
    response_model=CitizenComplaintSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Real-Time Citizen Report",
    description=(
        "Accepts a new public citizen observation report, runs it through the sentence-transformers "
        "embedding and negation detection pipeline in real-time, stores the evaluation, and activates "
        "an institutional alert if contradictionScore >= 60."
    ),
)
def create_citizen_report(
    id: str = Path(..., description="Target project identifier (e.g. PRJ-IND-2003)", examples=["PRJ-IND-2003"]),
    payload: CitizenComplaintSubmissionRequest = ...,
) -> CitizenComplaintSubmissionResponse:
    """Submits and evaluates a new citizen grievance report in real time."""
    project = get_project_by_id(id)
    if not project:
        raise HTTPException(
            status_code=404,
            detail=f"Project with ID '{id}' was not found in the platform registry.",
        )

    # Evaluate in real-time through pipeline
    rep_loc = payload.reportedLocation.dict() if payload.reportedLocation else None
    eval_res = submit_citizen_complaint(
        project_id=id,
        complaint_text=payload.complaintText,
        citizen_name=payload.citizenName,
        district=payload.district or project.get("district"),
        state=payload.state or project.get("state"),
        reported_location=rep_loc,
    )

    contra_score = eval_res.get("contradictionScore", 0)
    alert_triggered = contra_score >= 60

    # If contradiction threshold is met, refresh alerts registry so it appears in /alerts
    if alert_triggered:
        alerts_service.initialize(force_refresh=True)

    return CitizenComplaintSubmissionResponse(
        id=eval_res["id"],
        projectId=id,
        projectName=eval_res["projectName"],
        complaintText=eval_res["complaintText"],
        matchedOfficialClaim=eval_res["officialClaim"],
        topicalRelevanceScore=eval_res["topicalRelevanceScore"],
        contradictionScore=contra_score,
        isContradiction=eval_res["isContradiction"],
        plainLanguageExplanation=eval_res["plainLanguageExplanation"],
        geoMatchDistance=eval_res.get("geoMatchDistance"),
        reportedLocation=payload.reportedLocation,
        alertTriggered=alert_triggered,
        status=eval_res.get("status", "Pending Inspection"),
        submittedAt=eval_res.get("submittedAt", ""),
    )
