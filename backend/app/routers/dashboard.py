"""
FastAPI Router for Role-Scoped Dashboard Statistics Endpoints.

Exposes dedicated dashboard statistics endpoints for all 6 statutory roles:
- GET /dashboard/district-authority
- GET /dashboard/state-nodal
- GET /dashboard/central-nodal-agency
- GET /dashboard/auditor-cag
- GET /dashboard/implementing-agency
- GET /dashboard/mp-office
- GET /dashboard/me (contextual auto-routing based on JWT claims)
"""

import logging
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.services.auth import (
    find_user_by_identifier,
    get_optional_current_user,
    get_current_user,
)
from app.services.dashboard import (
    get_district_authority_dashboard_stats,
    get_state_nodal_dashboard_stats,
    get_central_nodal_dashboard_stats,
    get_auditor_cag_dashboard_stats,
    get_implementing_agency_dashboard_stats,
    get_mp_office_dashboard_stats,
)

logger = logging.getLogger("setu.dashboard.router")

router = APIRouter(
    prefix="/dashboard",
    tags=["Role-Scoped Dashboard Statistics"],
)

# Canonical demo fallback users for unauthenticated frontend demo sessions
DEFAULT_DEMO_USERS = {
    "district_authority": "ADM-DA-TN-CHN-001",
    "state_nodal": "ADM-SNA-TN-CHN-005",
    "mospi_officer": "ADM-CNA-MOSPI-HQ-002",
    "auditor_cag": "ADM-CAG-AUD-TN-CHN-003",
    "implementing_agency": "ADM-IA-PWD-TN-CHN-008",
    "mp_office": "ADM-MP-TN-CHN-021",
}


def resolve_effective_user(
    current_user: Optional[Dict[str, Any]],
    target_role_id: str,
) -> Dict[str, Any]:
    """
    Returns the authenticated user or canonical fallback demo official for the target role.
    If authenticated as an incompatible role (and not an apex auditor/mospi reviewer), raises HTTP 403.
    """
    if current_user:
        user_role_id = current_user.get("roleId", "")
        # MoSPI and Auditor have national jurisdiction and can inspect any role's statistics
        if user_role_id in ("mospi_officer", "auditor_cag"):
            return current_user

        # Match target role family
        if target_role_id == "district_authority" and ("district" in user_role_id or "district" in (current_user.get("role") or "").lower()):
            return current_user
        if target_role_id == "state_nodal" and ("state" in user_role_id or "state" in (current_user.get("role") or "").lower()):
            return current_user
        if target_role_id == "implementing_agency" and ("agency" in user_role_id or "implementing" in user_role_id or "implementing" in (current_user.get("role") or "").lower()):
            return current_user
        if target_role_id == "mp_office" and ("mp" in user_role_id or "mp" in (current_user.get("role") or "").lower()):
            return current_user
        if user_role_id == target_role_id:
            return current_user

        # Horizontal privilege escalation blocked
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied: Your account role '{current_user.get('role')}' is not authorized to access the {target_role_id} dashboard endpoint.",
        )

    # Fallback to default demo official
    demo_id = DEFAULT_DEMO_USERS.get(target_role_id)
    user = find_user_by_identifier(demo_id) if demo_id else None
    if not user:
        raise HTTPException(status_code=500, detail=f"Default official profile for '{target_role_id}' not configured.")
    return user


@router.get(
    "/district-authority",
    summary="Get District Authority Dashboard Statistics",
    description="Returns operational dashboard statistics scoped strictly to the caller's assigned district.",
)
def get_district_dashboard(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    effective_user = resolve_effective_user(current_user, "district_authority")
    return get_district_authority_dashboard_stats(effective_user)


@router.get(
    "/state-nodal",
    summary="Get State Nodal Authority Dashboard Statistics",
    description="Returns state-wide rollup statistics with severity tiering and chronic non-utilization signals.",
)
def get_state_nodal_dashboard(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    effective_user = resolve_effective_user(current_user, "state_nodal")
    return get_state_nodal_dashboard_stats(effective_user)


@router.get(
    "/central-nodal-agency",
    summary="Get Central Nodal Agency (MoSPI) Dashboard Statistics",
    description="Returns unrestricted pan-India dashboard statistics across all 124 works and 20 States/UTs.",
)
def get_central_nodal_dashboard(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    effective_user = resolve_effective_user(current_user, "mospi_officer")
    return get_central_nodal_dashboard_stats(effective_user)


@router.get(
    "/auditor-cag",
    summary="Get Auditor / CAG Dashboard Statistics",
    description="Returns statutory audit statistics nationwide including all open, resolved, and reopened flags.",
)
def get_auditor_dashboard(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    effective_user = resolve_effective_user(current_user, "auditor_cag")
    return get_auditor_cag_dashboard_stats(effective_user)


@router.get(
    "/implementing-agency",
    summary="Get Implementing Agency Dashboard Statistics",
    description="Returns execution metrics only. Walled off entirely from alerts, compliance, and risk oversight.",
)
def get_implementing_agency_dashboard(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    effective_user = resolve_effective_user(current_user, "implementing_agency")
    return get_implementing_agency_dashboard_stats(effective_user)


@router.get(
    "/mp-office",
    summary="Get MP Office Dashboard Statistics",
    description="Returns constituency/nominated district statistics with passive flag presence indicator.",
)
def get_mp_office_dashboard(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    effective_user = resolve_effective_user(current_user, "mp_office")
    return get_mp_office_dashboard_stats(effective_user)


@router.get(
    "/me",
    summary="Get Current User's Role-Scoped Dashboard Statistics",
    description="Automatically detects the authenticated official's role and delegates to the appropriate role dashboard.",
)
def get_my_dashboard(
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> Dict[str, Any]:
    role_id = current_user.get("roleId", "")
    role_name = (current_user.get("role") or "").lower()

    if "implementing" in role_id or "agency" in role_id or "implementing" in role_name:
        return get_implementing_agency_dashboard_stats(current_user)
    elif "mp" in role_id or "mp" in role_name:
        return get_mp_office_dashboard_stats(current_user)
    elif "state" in role_id or "state" in role_name:
        return get_state_nodal_dashboard_stats(current_user)
    elif "mospi" in role_id or "cna" in role_id or "mospi" in role_name or "central" in role_name:
        return get_central_nodal_dashboard_stats(current_user)
    elif "auditor" in role_id or "cag" in role_id or "auditor" in role_name:
        return get_auditor_cag_dashboard_stats(current_user)
    else:
        # Default operational tier is District Authority
        return get_district_authority_dashboard_stats(current_user)
