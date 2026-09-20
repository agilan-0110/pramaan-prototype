"""
FastAPI Router for Predictive Insights.

Exposes endpoints for transparent, honestly-labeled predictive projections
for project delays, cost overruns, and milestone risk forecasts:
- GET /projects/{id}/forecast
- GET /predictive/portfolio-summary
- GET /predictive/at-risk-projects
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Path, Query
from pydantic import BaseModel, Field

from app.services.predictive import (
    get_at_risk_projects,
    get_portfolio_predictive_summary,
    get_project_forecast,
)

router = APIRouter(
    tags=["Predictive Insights"],
)


@router.get(
    "/predictive/portfolio-summary",
    summary="Get Portfolio Predictive Risk Rollup",
    description="Rollup of projects at risk of milestone slippage, budget overruns, and aggregate projected cost escalation across all monitored projects.",
)
def get_portfolio_summary() -> Dict[str, Any]:
    return get_portfolio_predictive_summary()


@router.get(
    "/predictive/at-risk-projects",
    summary="List Projects with High Delay or Cost Overrun Risk",
    description="Returns all projects where delay or cost overrun probability meets or exceeds the threshold.",
)
def list_at_risk(
    min_probability: float = Query(0.50, ge=0.0, le=1.0, description="Minimum risk probability cutoff (default: 0.50)")
) -> List[Dict[str, Any]]:
    return get_at_risk_projects(min_probability)


@router.get(
    "/projects/{id}/forecast",
    summary="Get Project Predictive Delay and Cost Forecast",
    description="Generates an empirical forecast for delay probability, additional delay days, cost overrun probability, and projected budget escalation.",
)
def get_forecast(
    id: str = Path(..., description="Project ID (e.g. PRJ-IND-2003)", examples=["PRJ-IND-2003"])
) -> Dict[str, Any]:
    result = get_project_forecast(id)
    if not result:
        raise HTTPException(status_code=404, detail=f"Project with ID '{id}' was not found.")
    return result


@router.get(
    "/projects/{id}/predictive",
    summary="Alias for /projects/{id}/forecast",
    description="Alias endpoint for project predictive forecast.",
    include_in_schema=False,
)
def get_predictive_alias(id: str = Path(..., examples=["PRJ-IND-2003"])) -> Dict[str, Any]:
    return get_forecast(id)
