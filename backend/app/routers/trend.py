"""
FastAPI Router for Trend Analysis and Seasonal Fund-Dumping Detection.

Exposes endpoints for macro financial trend analysis and fiscal year-end
March Rush fund-dumping monitoring:
- GET /trends/expenditure/yearly
- GET /trends/expenditure/by-state
- GET /trends/expenditure/by-district
- GET /trends/expenditure/quarterly
- GET /trends/fund-dumping
- GET /projects/{id}/spending-trend
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Path, Query
from pydantic import BaseModel, Field

from app.services.trend import (
    get_expenditure_by_district,
    get_expenditure_by_state,
    get_expenditure_by_year,
    get_project_spending_trend,
    get_quarterly_trend,
    get_seasonal_fund_dumping_report,
)

router = APIRouter(
    prefix="/trends",
    tags=["Trend Analysis"],
)


@router.get(
    "/expenditure/yearly",
    summary="Get Yearly Expenditure Rollup",
    description="Aggregates sanctioned funds, actual expenditure, utilization rate, and project completion metrics by fiscal year.",
)
def get_yearly_rollup() -> List[Dict[str, Any]]:
    return get_expenditure_by_year()


@router.get(
    "/expenditure/by-state",
    summary="Get State-level Expenditure Trends",
    description="Returns expenditure, sanctioned budget, and utilization rates grouped by Indian State.",
)
def get_state_trends(
    year: Optional[str] = Query(None, description="Optional fiscal year filter (e.g. '2025-26')")
) -> List[Dict[str, Any]]:
    return get_expenditure_by_state(year)


@router.get(
    "/expenditure/by-district",
    summary="Get District-level Expenditure Trends",
    description="Returns expenditure and fund utilization metrics grouped by district.",
)
def get_district_trends(
    state: Optional[str] = Query(None, description="Optional state filter"),
    year: Optional[str] = Query(None, description="Optional fiscal year filter"),
) -> List[Dict[str, Any]]:
    return get_expenditure_by_district(state, year)


@router.get(
    "/expenditure/quarterly",
    summary="Get Quarterly Expenditure Pacing & March Rush Metrics",
    description="Time-series breakdown across fiscal quarters (Q1-Q4) highlighting the final 6 weeks spending concentration.",
)
def get_quarterly_pacing(
    year: Optional[str] = Query(None, description="Optional fiscal year filter (e.g. '2025-26')")
) -> Dict[str, Any]:
    return get_quarterly_trend(year)


@router.get(
    "/fund-dumping",
    summary="Get Seasonal Fund-Dumping Report",
    description="Identifies all projects where disbursements cluster heavily in the final 6 weeks of the fiscal year (Feb 15 - Mar 31).",
)
def get_fund_dumping() -> Dict[str, Any]:
    return get_seasonal_fund_dumping_report()


@router.get(
    "/projects/{id}/spending-trend",
    summary="Get Project Spending Pacing Audit",
    description="Returns detailed disbursement timeline tranches and seasonal rush audit findings for a single project.",
)
def get_project_trend(
    id: str = Path(..., description="Project ID (e.g. PRJ-IND-2003)", examples=["PRJ-IND-2003"])
) -> Dict[str, Any]:
    result = get_project_spending_trend(id)
    if not result:
        raise HTTPException(status_code=404, detail=f"Project with ID '{id}' was not found.")
    return result
