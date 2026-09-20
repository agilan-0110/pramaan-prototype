"""
FastAPI Router for Duplicate Work Detection.

Exposes endpoints for auditing duplicate public schemes, reworded tenders,
and cross-year contractor duplication:
- GET /projects/{id}/duplicates
- GET /projects/duplicates/summary
- GET /projects/duplicates/pairs
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Path, Query
from pydantic import BaseModel, Field

from app.services.duplicate import (
    find_project_duplicates,
    get_all_duplicate_pairs,
    get_duplicate_summary,
)

router = APIRouter(
    prefix="/projects",
    tags=["Duplicate Detection"],
)


class DuplicateMatch(BaseModel):
    """Details of a detected duplicate or overlapping project match."""
    matchedProjectId: str = Field(..., description="Unique ID of the matched project")
    matchedProjectName: str = Field(..., description="Descriptive title of the matched project")
    matchedDistrict: Optional[str] = Field(None, description="Administrative district of matched project")
    matchedState: Optional[str] = Field(None, description="State of matched project")
    matchedFinancialYear: Optional[str] = Field(None, description="Fiscal year (e.g. '2024-25')")
    matchedVendorId: Optional[str] = Field(None, description="Assigned contractor ID of matched project")
    matchedVendorName: Optional[str] = Field(None, description="Assigned contractor name of matched project")
    matchedSanctionedAmount: Optional[int] = Field(None, description="Sanctioned budget of matched project")
    similarityScore: float = Field(..., description="Weighted composite duplicate confidence score (0-100)")
    textSimilarity: float = Field(..., description="RapidFuzz fuzzy token similarity percentage")
    matchType: str = Field(..., description="'same-year' or 'cross-year'")
    vendorMatch: bool = Field(..., description="Whether both projects share the same contractor/vendor")
    sameDistrict: bool = Field(..., description="Whether both projects are co-located in the same district")
    sameState: bool = Field(..., description="Whether both projects are located in the same state")
    similarCostRange: bool = Field(..., description="Whether project budgets fall within a 25% variance range")
    costVariancePercentage: float = Field(..., description="Percentage difference in sanctioned amounts")
    reasons: List[str] = Field(..., description="Itemized evidentiary audit rationale for match")


class ProjectDuplicatesResponse(BaseModel):
    """Full duplicate detection evaluation report for a project."""
    projectId: str = Field(..., description="Target project ID")
    projectName: str = Field(..., description="Target project name")
    category: Optional[str] = Field(None, description="Infrastructure category")
    district: Optional[str] = Field(None, description="Administrative district")
    state: Optional[str] = Field(None, description="State")
    financialYear: Optional[str] = Field(None, description="Fiscal year")
    vendorId: Optional[str] = Field(None, description="Assigned contractor ID")
    vendorName: Optional[str] = Field(None, description="Assigned contractor name")
    sanctionedAmount: Optional[int] = Field(None, description="Sanctioned amount in INR")
    hasDuplicates: bool = Field(..., description="True if any matches meet or exceed the similarity threshold")
    totalDuplicates: int = Field(..., description="Number of duplicate matches detected")
    highestSimilarityScore: float = Field(..., description="Top match confidence score")
    thresholdApplied: float = Field(..., description="Similarity score cutoff threshold applied")
    duplicates: List[DuplicateMatch] = Field(..., description="List of matched duplicate projects")
    evaluatedAt: str = Field(..., description="ISO 8601 UTC timestamp of evaluation")


class DuplicateSummaryResponse(BaseModel):
    """Portfolio-level duplicate detection statistics."""
    totalFlaggedPairs: int
    crossYearDuplicates: int
    sameYearDuplicates: int
    vendorMatchedDuplicates: int
    sameDistrictDuplicates: int
    highestSimilarityScore: float
    generatedAt: str


class DuplicatePairItem(BaseModel):
    """A pair of duplicate projects detected across the platform."""
    projectA: Dict[str, Any]
    projectB: Dict[str, Any]
    similarityScore: float
    textSimilarity: float
    matchType: str
    vendorMatch: bool
    sameDistrict: bool
    reasons: List[str]


@router.get(
    "/duplicates/summary",
    response_model=DuplicateSummaryResponse,
    summary="Get Portfolio Duplicate Summary",
    description="Returns aggregate duplicate risk and repetition metrics across all registered projects.",
)
def get_summary() -> DuplicateSummaryResponse:
    return DuplicateSummaryResponse(**get_duplicate_summary())


@router.get(
    "/duplicates/pairs",
    response_model=List[DuplicatePairItem],
    summary="List All Duplicate Project Pairs",
    description="Returns all flagged duplicate project pairs across the platform meeting the similarity threshold.",
)
def list_duplicate_pairs(
    threshold: float = Query(80.0, ge=0.0, le=100.0, description="Minimum similarity score threshold (default: 80.0)")
) -> List[DuplicatePairItem]:
    pairs = get_all_duplicate_pairs(threshold=threshold)
    return [DuplicatePairItem(**p) for p in pairs]


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
) -> ProjectDuplicatesResponse:
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
