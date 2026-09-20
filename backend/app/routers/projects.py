"""
FastAPI Router for Projects Monitoring & Server-Side Scoping.

Enforces server-side role-based jurisdictional scoping per ROLES.md:
- District Authority sees only projects in their assigned district
- State Nodal Authority sees only projects in their assigned state
- MoSPI / Central Nodal / Auditor sees all projects nationwide
- Implementing Agency sees only projects assigned to their agency
- MP Office sees only projects in their constituency
"""

import json
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Path as PathParam, Query, status

from app.services.auth import (
    check_project_access,
    filter_projects_by_user_scope,
    get_optional_current_user,
)

logger = logging.getLogger("setu.projects.router")

router = APIRouter(
    prefix="/projects",
    tags=["Projects Management & RBAC Scoping"],
)

PROJECTS_FILE = Path(__file__).resolve().parent.parent / "data" / "mockProjects.json"


def load_projects_catalog() -> List[Dict[str, Any]]:
    """Loads all projects from mock dataset."""
    if not PROJECTS_FILE.exists():
        return []
    with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


@router.get(
    "",
    summary="List Projects with Server-Side Scope Filtering",
    description=(
        "Returns public works projects filtered server-side based on the authenticated user's JWT scope. "
        "District Authority sees their district only, State Nodal sees their state only, "
        "and MoSPI/Auditor sees all national projects."
    ),
)
def list_projects(
    state: Optional[str] = Query(None, description="Filter by state name"),
    district: Optional[str] = Query(None, description="Filter by district name"),
    category: Optional[str] = Query(None, description="Filter by category (e.g. Road, Health, Water)"),
    status_filter: Optional[str] = Query(None, alias="status", description="Filter by status (e.g. In Progress, Completed)"),
    limit: Optional[int] = Query(None, ge=1, description="Maximum records to return"),
    offset: int = Query(0, ge=0, description="Offset for pagination"),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[Dict[str, Any]]:
    """Returns project records scoped to the authenticated caller's jurisdiction."""
    all_projects = load_projects_catalog()

    # 1. Apply Server-Side Role Jurisdictional Scoping
    scoped_projects = filter_projects_by_user_scope(all_projects, current_user)

    # 2. Apply additional Query Filters
    results = scoped_projects
    if state:
        results = [p for p in results if p.get("state", "").strip().lower() == state.strip().lower()]
    if district:
        results = [p for p in results if p.get("district", "").strip().lower() == district.strip().lower()]
    if category:
        results = [p for p in results if p.get("category", "").strip().lower() == category.strip().lower()]
    if status_filter:
        results = [p for p in results if p.get("status", "").strip().lower() == status_filter.strip().lower()]

    if limit is not None:
        return results[offset : offset + limit]
    return results[offset:]


@router.get(
    "/{id}",
    summary="Get Single Project Detail with Jurisdiction Check",
    description=(
        "Returns detailed project data. Enforces RBAC: returns HTTP 403 Forbidden "
        "if an official attempts to inspect a project outside their assigned jurisdiction."
    ),
)
def get_project_detail(
    id: str = PathParam(..., description="Project ID (e.g. PRJ-IND-2001)", examples=["PRJ-IND-2001"]),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    """Returns project record if within the caller's authorized jurisdiction."""
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID '{id}' was not found in the platform registry.",
        )

    # Enforce jurisdictional access check if user is authenticated
    if current_user:
        check_project_access(project, current_user)

    return project
