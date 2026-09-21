"""
FastAPI Router for Official Authentication & JWT Token Issuance.

Exposes endpoints for credential validation against bcrypt password hashes in mockCredentials.json:
- POST /auth/login
- GET /auth/me
"""

import logging
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.services.auth import (
    create_access_token,
    find_user_by_identifier,
    get_current_user,
    verify_password,
)

logger = logging.getLogger("setu.auth.router")

router = APIRouter(
    prefix="/auth",
    tags=["Authentication & RBAC"],
)


class LoginRequest(BaseModel):
    """Credentials submitted by authorized official."""
    username: str = Field(..., description="Official Login ID or administrative alias (e.g. ADM-DA-UP-LKO-012)", examples=["ADM-DA-UP-LKO-012"])
    password: str = Field(..., description="Secret authentication password", examples=["DistAdmin#Pass2026"])
    role: Optional[str] = Field(None, description="Optional role name for contextual resolution", examples=["District Authority"])


class LoginResponse(BaseModel):
    """JWT Bearer authentication token and user jurisdiction scope."""
    access_token: str = Field(..., description="Signed RS256/HS256 JWT access token")
    token_type: str = Field("bearer", description="Token type")
    token: str = Field(..., description="Duplicate token field for frontend compatibility")
    role: str = Field(..., description="Statutory role name (e.g. District Authority)")
    roleId: str = Field(..., description="Unique role identifier (e.g. district_authority)")
    level: str = Field(..., description="Administrative tier")
    accessScope: str = Field(..., description="Jurisdictional access scope code")
    district: Optional[str] = Field(None, description="Assigned district jurisdiction")
    state: Optional[str] = Field(None, description="Assigned state jurisdiction")
    constituency: Optional[str] = Field(None, description="Assigned parliamentary constituency")
    agency: Optional[str] = Field(None, description="Assigned execution agency")
    mpType: Optional[str] = Field(None, description="MP classification: CONSTITUENCY_MP or NOMINATED_MP")
    mpId: Optional[str] = Field(None, description="MP code")
    chosenDistricts: Optional[List[str]] = Field(None, description="Chosen districts for Nominated MP")
    jurisdiction: str = Field(..., description="Human-readable jurisdictional description")
    officialName: str = Field(..., description="Designated official title")


class UserProfileResponse(BaseModel):
    """Current authenticated user profile and jurisdictional scope."""
    loginId: str
    officialName: str
    role: str
    roleId: str
    level: str
    accessScope: str
    district: Optional[str] = None
    state: Optional[str] = None
    constituency: Optional[str] = None
    agency: Optional[str] = None
    mpType: Optional[str] = None
    mpId: Optional[str] = None
    chosenDistricts: Optional[List[str]] = None
    jurisdiction: str


@router.post(
    "/login",
    response_model=LoginResponse,
    summary="Authenticate Official & Issue JWT",
    description=(
        "Validates official credentials using bcrypt password hashing against mockCredentials.json. "
        "Upon successful verification, returns a signed JWT containing role and jurisdictional scope claims."
    ),
)
def login(request: LoginRequest) -> LoginResponse:
    """Authenticates official credentials and returns JWT bearer token."""
    user = find_user_by_identifier(request.username)

    # Fallback lookup by role if username is generic or not directly found
    if not user and request.role:
        user = find_user_by_identifier(request.role)

    if not user:
        logger.warning("Authentication failed: User ID '%s' not found.", request.username)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials: User identifier was not recognized.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Validate password against bcrypt passwordHash (or demoPasswordHash)
    password_valid = False
    if "passwordHash" in user:
        password_valid = verify_password(request.password, user["passwordHash"])
    
    if not password_valid and "demoPasswordHash" in user:
        password_valid = verify_password(request.password, user["demoPasswordHash"])

    if not password_valid:
        logger.warning("Authentication failed: Incorrect password for user '%s'.", request.username)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials: Password verification failed.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Generate JWT token with role and scope claims
    token = create_access_token(user)
    logger.info("Official '%s' authenticated successfully as '%s'.", user.get("loginId"), user.get("roleName"))

    return LoginResponse(
        access_token=token,
        token_type="bearer",
        token=token,
        role=user.get("roleName", "Official"),
        roleId=user.get("roleId", "official"),
        level=user.get("level", "Administrative Level"),
        accessScope=user.get("accessScope", "restricted"),
        district=user.get("district"),
        state=user.get("state"),
        constituency=user.get("constituency"),
        agency=user.get("agency"),
        mpType=user.get("mpType"),
        mpId=user.get("mpId"),
        chosenDistricts=user.get("chosenDistricts"),
        jurisdiction=user.get("jurisdiction", "National Oversight"),
        officialName=user.get("officialName", "Authorized Official"),
    )



@router.get(
    "/me",
    response_model=UserProfileResponse,
    summary="Get Current Authenticated User Profile",
    description="Returns verified user profile and jurisdictional scope extracted from JWT bearer token.",
)
def get_profile(current_user: Dict[str, Any] = Depends(get_current_user)) -> UserProfileResponse:
    """Returns profile information for the authenticated official."""
    return UserProfileResponse(
        loginId=current_user.get("loginId") or current_user.get("sub", "Unknown"),
        officialName=current_user.get("officialName", "Authorized Official"),
        role=current_user.get("role", "Official"),
        roleId=current_user.get("roleId", "official"),
        level=current_user.get("level", "Administrative Level"),
        accessScope=current_user.get("accessScope", "restricted"),
        district=current_user.get("district"),
        state=current_user.get("state"),
        constituency=current_user.get("constituency"),
        agency=current_user.get("agency"),
        jurisdiction=current_user.get("jurisdiction", "Assigned Jurisdiction"),
    )
