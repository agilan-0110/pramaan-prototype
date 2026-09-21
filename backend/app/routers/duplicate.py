"""
FastAPI Router for Duplicate Work Detection.

Exposes endpoints for detecting cross-year repetitions, spatial-proximity overlaps,
and fuzzy title matches across MPLADS projects:
- GET /projects/{id}/duplicates
- GET /projects/duplicates/summary
- GET /projects/duplicates/pairs

Enforces strict RBAC: Implementing Agency cannot access duplicate detection modules per ROLES.md.
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from pydantic import BaseModel, Field

from app.services.auth import get_optional_current_user
from app.services.duplicate import (
    find_project_duplicates,
    get_all_duplicate_pairs,
    get_duplicate_summary,
    load_projects,
)

router = APIRouter(
    prefix="/projects",
    tags=["Duplicate Detection"],
)


def enforce_duplicate_access(current_user: Optional[Dict[str, Any]]) -> None:
    """Blocks Implementing Agency and MP Office from accessing duplicate work detection engine per ROLES.md."""
    if not current_user:
        return
    import re
    role_id = current_user.get("roleId", "")
    role_name = (current_user.get("role") or "").lower()
    scope = current_user.get("accessScope", "")
    if scope == "agency_assigned_only" or "implementing" in role_id or "implementing" in role_name:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Duplicate scheme detection engine is restricted to statutory oversight authorities per ROLES.md.",
        )
    if scope in ["constituency_only", "nominated_mp_districts"] or role_id == "mp_office" or bool(re.search(r"\bmp\b", role_name)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cross-scheme duplicate tenders and spatial overlap detection are restricted to oversight authorities per ROLES.md.",
        )



class MatchedProjectDetail(BaseModel):
    id: str
    name: str
    financialYear: Optional[str] = "2025-26"
    sanctionedAmount: int
    expenditure: Optional[int] = 0
    status: Optional[str] = "In Progress"
    district: str
    state: Optional[str] = None
    category: Optional[str] = None
    vendorName: Optional[str] = None
    vendorId: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    physicalProgress: Optional[int] = 0


class DuplicateMatchItem(BaseModel):
    matchedProjectId: str
    matchedProject: MatchedProjectDetail
    similarityScore: float
    textSimilarity: float
    distanceMeters: Optional[float] = None
    sameVendor: bool
    sameCategory: bool
    sameDistrict: bool
    costDifferencePercentage: float
    matchType: str
    flaggedReasons: List[str]
    confidenceLevel: Optional[str] = "HIGH"


class ProjectDuplicatesResponse(BaseModel):
    projectId: str
    projectName: str
    totalMatchesFound: int
    highestSimilarityScore: float
    hasHighConfidenceDuplicate: bool
    matches: List[DuplicateMatchItem]
    evaluatedAt: str


class DuplicatePairItem(BaseModel):
    projectA: MatchedProjectDetail
    projectB: MatchedProjectDetail
    similarityScore: float
    textSimilarity: Optional[float] = None
    matchType: str
    distanceMeters: Optional[float] = None
    confidenceLevel: Optional[str] = "HIGH"
    flaggedReasons: Optional[List[str]] = Field(default_factory=list, alias="reasons")
    sameDistrict: bool
    sameState: Optional[bool] = True
    isCrossDistrict: Optional[bool] = False
    isCrossState: Optional[bool] = False
    vendorMatch: Optional[bool] = False
    adjudication: Optional[Dict[str, Any]] = None

    class Config:
        populate_by_name = True


class DuplicateSummaryResponse(BaseModel):
    totalFlaggedPairs: int
    crossYearDuplicates: int
    sameYearDuplicates: int
    vendorMatchedDuplicates: int
    sameDistrictDuplicates: int
    highestSimilarityScore: float
    generatedAt: str


class DuplicateAdjudicationRequest(BaseModel):
    projectAId: str = Field(..., description="Project A identifier")
    projectBId: str = Field(..., description="Project B identifier")
    legitimateProjectId: Optional[str] = Field(None, description="Project marked legitimate (if one is chosen)")
    action: str = Field(..., description="Adjudication decision: PROJECT_A_LEGITIMATE | PROJECT_B_LEGITIMATE | FLAG_BOTH_RECOVERY")
    notes: Optional[str] = Field(None, description="Official adjudication remarks")


@router.post(
    "/duplicates/adjudicate",
    summary="Adjudicate Duplicate Scheme Pair (State Nodal / MoSPI)",
    description="Records formal State Nodal / MoSPI adjudication on a flagged cross-district duplicate pair.",
)
def adjudicate_duplicate(
    payload: DuplicateAdjudicationRequest,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    from app.services.duplicate import adjudicate_duplicate_pair
    result = adjudicate_duplicate_pair(
        project_a_id=payload.projectAId,
        project_b_id=payload.projectBId,
        legitimate_id=payload.legitimateProjectId,
        action=payload.action,
        notes=payload.notes,
        user=current_user,
    )
    return {
        "success": True,
        "message": f"Duplicate pair adjudication recorded successfully: {payload.action}.",
        "adjudication": result,
    }


@router.get(
    "/duplicates/summary",
    response_model=DuplicateSummaryResponse,
    summary="Get Portfolio Duplicate Summary",
    description="Returns aggregate duplicate risk and repetition metrics across all registered projects.",
)
def get_summary(
    state: Optional[str] = Query(None, description="Optional state filter (e.g. 'Tamil Nadu')"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> DuplicateSummaryResponse:
    enforce_duplicate_access(current_user)
    effective_state = state or (current_user.get("state") if current_user and current_user.get("accessScope") == "state_rollup" else None)
    all_projects = load_projects()
    if effective_state:
        all_projects = [p for p in all_projects if (p.get("state") or "").strip().lower() == effective_state.strip().lower()]
    return DuplicateSummaryResponse(**get_duplicate_summary(all_projects=all_projects))


@router.get(
    "/duplicates/pairs",
    summary="List All Duplicate Project Pairs",
    description="Returns all flagged duplicate project pairs across the platform meeting the similarity threshold.",
)
def list_duplicate_pairs(
    threshold: float = Query(80.0, ge=0.0, le=100.0, description="Minimum similarity score threshold (default: 80.0)"),
    state: Optional[str] = Query(None, description="Optional state filter (e.g. 'Tamil Nadu')"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[Dict[str, Any]]:
    enforce_duplicate_access(current_user)
    effective_state = state or (current_user.get("state") if current_user and current_user.get("accessScope") == "state_rollup" else None)
    all_projects = load_projects()
    if effective_state:
        all_projects = [p for p in all_projects if (p.get("state") or "").strip().lower() == effective_state.strip().lower()]
    pairs = get_all_duplicate_pairs(threshold=threshold, all_projects=all_projects)
    return pairs


@router.get(
    "/{id}/duplicates",
    response_model=ProjectDuplicatesResponse,
    summary="Get Duplicate Matches for a Project",
    description="Evaluates fuzzy text similarity (RapidFuzz), geo-proximity, cost range, cross-year repetition, and vendor matching for a given project ID.",
)
def get_project_duplicates(
    id: str = Path(..., description="Unique project ID (e.g. PRJ-IND-2008)", examples=["PRJ-IND-2008"]),
    threshold: float = Query(80.0, ge=0.0, le=100.0, description="Minimum similarity score threshold (default: 80.0)"),
    same_district_only: bool = Query(False, description="Filter matches strictly within the same district"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> ProjectDuplicatesResponse:
    enforce_duplicate_access(current_user)
    result = find_project_duplicates(
        project_id=id,
        threshold=threshold,
        same_district_only=same_district_only,
    )
    if not result:
        raise HTTPException(
            status_code=404,
            detail=f"Project with ID '{id}' was not found in the platform registry."
        )
    return ProjectDuplicatesResponse(**result)

