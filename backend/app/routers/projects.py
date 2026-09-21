"""
FastAPI Router for Projects Monitoring, Execution & Server-Side Scoping.

Enforces server-side role-based jurisdictional scoping per ROLES.md:
- District Authority sees only projects in their assigned district
- State Nodal Authority sees only projects in their assigned state
- MoSPI / Central Nodal / Auditor sees all projects nationwide
- Implementing Agency sees ONLY their assigned projects (district + agency match)
  - Sees vendor name on each project
  - Can submit progress updates
  - Can upload evidence (auto-tagged "Received from Vendor: [vendorName]")
  - Can submit Utilization Certificate (UC) once physical work reaches 100% / Completed
  - Cannot see risk scores, compliance flags, citizen contradictions, or alerts
- MP Office sees only projects in their constituency
"""

from datetime import datetime, timezone
import json
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Path as PathParam, Query, status
from pydantic import BaseModel, Field

from app.services.auth import (
    check_project_access,
    filter_projects_by_user_scope,
    get_optional_current_user,
    sanitize_project_for_user,
)

logger = logging.getLogger("setu.projects.router")

router = APIRouter(
    prefix="/projects",
    tags=["Projects Management & Execution"],
)

PROJECTS_FILE = Path(__file__).resolve().parent.parent / "data" / "mockProjects.json"

# In-memory store for newly submitted project proposals and runtime updates
IN_MEMORY_PROPOSALS: List[Dict[str, Any]] = []
IN_MEMORY_UPDATES: Dict[str, Dict[str, Any]] = {}


class ProjectProposalRequest(BaseModel):
    """Schema for new project proposals submitted by MP Office per ROLES.md."""
    workDescription: str = Field(..., description="Detailed description of proposed public work", min_length=5)
    estimatedCost: float = Field(..., gt=0, description="Estimated scheme cost in INR")
    category: str = Field(..., description="Infrastructure category (Road, Building, Health, Education, Water, Civic)")
    location: str = Field(..., description="Constituency location, ward, or neighborhood", min_length=2)
    title: Optional[str] = Field(None, description="Optional brief title")
    district: Optional[str] = Field(None, description="Optional target district (allowed for Nominated MPs)")
    state: Optional[str] = Field(None, description="Optional target state (allowed for Nominated MPs)")


import re

# Standard 15-character Indian Goods and Services Tax Identification Number (GSTIN) regex format
GSTIN_REGEX = re.compile(r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")


class ProgressUpdateRequest(BaseModel):
    """Schema for physical and financial milestone updates submitted by Implementing Agency."""
    physicalProgress: int = Field(..., ge=0, le=100, description="Updated physical execution percentage (0-100)")
    financialProgress: Optional[float] = Field(None, ge=0.0, le=100.0, description="Updated financial disbursement percentage")
    stage: Optional[str] = Field(None, description="Descriptive milestone stage (e.g. Sub-grade laying, Roof slab casting)")
    remarks: str = Field(..., min_length=3, description="Detailed site engineer / execution division remarks")


class EvidenceUploadRequest(BaseModel):
    """Schema for physical evidence / site inspection record uploads submitted by Implementing Agency."""
    milestoneRef: Optional[str] = Field(None, description="Milestone reference label")
    milestoneStage: Optional[str] = Field(None, description="Target milestone stage name")
    description: str = Field(..., min_length=3, description="Description of evidence / site inspection notes")
    photoUrl: Optional[str] = Field(None, description="Photo or document URL")
    fileName: Optional[str] = Field(None, description="Original uploaded file name")


class InvoiceSubmissionRequest(BaseModel):
    """Schema for contractor invoice and GST bill uploads submitted by Implementing Agency."""
    invoiceNumber: str = Field(..., min_length=2, description="Tax Invoice / Bill Number", examples=["INV-2026-PWD-089"])
    claimedAmount: float = Field(..., gt=0, description="Claimed disbursement amount in INR", examples=[450000.0])
    gstin: str = Field(..., min_length=15, max_length=15, description="15-character GST Identification Number", examples=["33AABCT1332L1Z4"])
    fileName: Optional[str] = Field(None, description="Uploaded invoice document / PDF file name")
    milestoneRef: Optional[str] = Field(None, description="Related milestone or stage reference")
    notes: Optional[str] = Field(None, description="Optional contractor / invoice remarks")


class UCSubmissionRequest(BaseModel):
    """Schema for Utilization Certificate (UC) submission submitted by Implementing Agency upon completion."""
    ucNumber: str = Field(..., min_length=3, description="Official statutory UC reference identifier (e.g. UC/MPLADS/2026/042)")
    certifiedAmount: float = Field(..., gt=0, description="Total verified final expenditure certified in INR")
    remarks: Optional[str] = Field(None, description="Final certification remarks and clearance notes")
    auditCertificateRef: Optional[str] = Field(None, description="Reference voucher / technical audit certificate number")


class ProposalDecisionRequest(BaseModel):
    """Schema for approving or rejecting an MP Office scheme proposal (District Authority)."""
    decision: str = Field(..., description="Decision action: APPROVE | REJECT", examples=["APPROVE"])
    rejectionReason: Optional[str] = Field(None, description="Mandatory text reason if decision is REJECT", examples=["Scheme overlaps with existing State Highways department road package."])
    remarks: Optional[str] = Field(None, description="Administrative sanction or technical verification remarks")
    assignedAgency: Optional[str] = Field(None, description="Optional custom implementing agency assignment")


class EvidenceReviewRequest(BaseModel):
    """Schema for formal review of line agency physical evidence / photo uploads."""
    status: str = Field(..., description="Review outcome: ACCEPTED | REJECTED_RESUBMISSION_REQUIRED", examples=["ACCEPTED"])
    remarks: Optional[str] = Field(None, description="Detailed engineer review notes or reasons for rejection")


class InvoiceReviewRequest(BaseModel):
    """Schema for review of contractor tax invoice / GST bill."""
    status: str = Field(..., description="Review outcome: ACCEPTED | REJECTED_RESUBMISSION_REQUIRED", examples=["ACCEPTED"])
    remarks: Optional[str] = Field(None, description="Voucher scrutiny and stage ceiling audit remarks")


class TrancheReleaseRequest(BaseModel):
    """Schema for releasing next milestone fund tranche by District Authority."""
    amount: Optional[float] = Field(None, gt=0, description="Optional tranche release amount in INR (auto-calculated if omitted)")
    trancheLabel: Optional[str] = Field(None, description="Tranche identifier (e.g. T2, T3)")
    remarks: Optional[str] = Field(None, description="Administrative sanction release notes")


class AssetTransferRequest(BaseModel):
    """Schema for tracking public asset transfer to user agency upon project completion."""
    status: str = Field("TRANSFERRED", description="Asset transfer state: TRANSFERRED | PENDING_TRANSFER | NOT_APPLICABLE", examples=["TRANSFERRED"])
    userAgency: str = Field(..., min_length=2, description="Designated recipient local/user agency (e.g. Greater Chennai Corporation)", examples=["Greater Chennai Corporation / Ward 116"])
    handoverRef: Optional[str] = Field(None, description="Statutory asset handover certificate reference (e.g. HO/MPLADS/2026/042)")
    remarks: Optional[str] = Field(None, description="Handover certification remarks")


def load_projects_catalog() -> List[Dict[str, Any]]:
    """Loads all projects from mock dataset merged with runtime proposals and progress overrides."""
    projects: List[Dict[str, Any]] = []
    if PROJECTS_FILE.exists():
        with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
            projects = json.load(f)
    
    # Merge base projects + proposals
    merged_list = IN_MEMORY_PROPOSALS + projects
    
    # Apply runtime overrides (progress, evidence, UC updates)
    final_list = []
    now = datetime.now(timezone.utc)
    for p in merged_list:
        pid = p.get("id")
        updated = dict(p)
        if pid in IN_MEMORY_UPDATES:
            updated.update(IN_MEMORY_UPDATES[pid])
            
        # Ensure valid ucStatus
        if not updated.get("ucStatus"):
            updated["ucStatus"] = "NOT_SUBMITTED"
                
        # Auto trigger OVERDUE if COMPLETED for > 30 days and still NOT_SUBMITTED
        if updated.get("status") == "Completed" and updated.get("ucStatus") == "NOT_SUBMITTED":
            date_str = updated.get("completionDate") or updated.get("dateSpent") or updated.get("submittedAt")
            if date_str:
                try:
                    c_date = datetime.fromisoformat(date_str.replace("Z", "+00:00")) if "T" in date_str else datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
                    if (now - c_date).days > 30:
                        updated["ucStatus"] = "OVERDUE"
                except Exception:
                    pass

        # Ensure valid assetTransferStatus
        is_completed = updated.get("status") == "Completed" or (updated.get("physicalProgress") or 0) >= 100
        if is_completed:
            if not updated.get("assetTransferStatus") or updated.get("assetTransferStatus") == "NOT_APPLICABLE":
                updated["assetTransferStatus"] = "PENDING_TRANSFER"
        else:
            if not updated.get("assetTransferStatus"):
                updated["assetTransferStatus"] = "NOT_APPLICABLE"

        # Ensure evidence and invoices have reviewStatus defaults
        if "evidenceArtifacts" in updated:
            for ev in updated["evidenceArtifacts"]:
                if "reviewStatus" not in ev:
                    ev["reviewStatus"] = "PENDING"
        if "invoices" in updated:
            for inv in updated["invoices"]:
                if "reviewStatus" not in inv:
                    inv["reviewStatus"] = "PENDING"
                    
        final_list.append(updated)
            
    return final_list


@router.get(
    "",
    summary="List Projects with Server-Side Scope Filtering",
    description=(
        "Returns public works projects filtered server-side based on the authenticated user's JWT scope. "
        "Implementing Agency sees only their assigned projects with vendor details, with risk/compliance stripped."
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
    """Returns project records scoped and sanitized to the authenticated caller's jurisdiction."""
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

    # 3. Apply Role-Based Data Sanitization (Redacts risk/compliance/citizen signals for Implementing Agency)
    sanitized_results = [sanitize_project_for_user(p, current_user) for p in results]

    if limit is not None:
        return sanitized_results[offset : offset + limit]
    return sanitized_results[offset:]


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
    """Returns project record if within the caller's authorized jurisdiction, with role sanitization."""
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

    # Sanitize data for Implementing Agency (no risk scores, compliance breaches, or citizen reports)
    return sanitize_project_for_user(project, current_user)


@router.post(
    "/{id}/progress",
    status_code=status.HTTP_200_OK,
    summary="Submit Progress Update (Implementing Agency / District Authority)",
    description=(
        "Updates physical progress, financial progress, and appends execution notes. "
        "Automatically marks project as 'Completed' if physical progress reaches 100%."
    ),
)
def submit_progress_update(
    id: str = PathParam(..., description="Target Project ID"),
    payload: ProgressUpdateRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    """Accepts physical progress updates from authorized executing agency."""
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)

    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))

    # Update physical and financial progress
    new_phys = payload.physicalProgress
    updated_fields["physicalProgress"] = new_phys
    
    if payload.financialProgress is not None:
        updated_fields["financialProgress"] = payload.financialProgress

    # Auto transition to Completed if 100%
    if new_phys >= 100:
        updated_fields["status"] = "Completed"
        if project.get("ucStatus") != "SUBMITTED":
            updated_fields["ucStatus"] = "NOT_SUBMITTED"

    # Append progress update history
    existing_updates = list(project.get("progressUpdates", []))
    agency_name = (current_user.get("agency") or current_user.get("officialName") or project.get("implementingAgency") or "Executing Division") if current_user else "Executing Division"
    
    new_update_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "physicalProgress": new_phys,
        "financialProgress": updated_fields.get("financialProgress", project.get("financialProgress", 0.0)),
        "stage": payload.stage or f"Milestone Progress ({new_phys}%)",
        "remarks": payload.remarks,
        "updatedBy": agency_name,
    }
    existing_updates.insert(0, new_update_entry)
    updated_fields["progressUpdates"] = existing_updates

    # Persist in runtime registry
    IN_MEMORY_UPDATES[id] = updated_fields
    logger.info("Project %s progress updated to %s%% by %s", id, new_phys, agency_name)

    # Return refreshed and sanitized project
    refreshed_project = dict(project)
    refreshed_project.update(updated_fields)

    return {
        "success": True,
        "message": f"Physical execution progress for '{project.get('name')}' updated to {new_phys}%.",
        "project": sanitize_project_for_user(refreshed_project, current_user),
    }


@router.post(
    "/{id}/evidence",
    status_code=status.HTTP_201_CREATED,
    summary="Upload Milestone Evidence (Implementing Agency)",
    description=(
        "Uploads photo / measurement book documentation auto-tagged with 'Received from Vendor: [vendorName]' "
        "derived directly from the project's registered vendorName. Includes simulated verification badge."
    ),
)
def upload_milestone_evidence(
    id: str = PathParam(..., description="Target Project ID"),
    payload: EvidenceUploadRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    """Uploads milestone verification evidence auto-tagged with registered vendor provenance."""
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)

    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    vendor_name = project.get("vendorName") or "Assigned Contractor"
    evidence_id = f"EVD-{id}-{now.strftime('%Y%m%d%H%M%S')}"
    milestone_label = payload.milestoneRef or payload.milestoneStage or "Milestone Stage Execution"

    new_evidence = {
        "id": evidence_id,
        "projectId": id,
        "milestoneStage": milestone_label,
        "milestoneRef": milestone_label,
        "description": payload.description,
        "photoUrl": payload.photoUrl or "/assets/evidence/site_progress.jpg",
        "fileName": payload.fileName or "vendor_milestone_evidence.jpg",
        "uploadedAt": now.isoformat(),
        "vendorName": vendor_name,
        "sourceTag": f"Received from Vendor: {vendor_name}",
        "uploadedBy": current_user.get("officialName") or "Implementing Agency Official" if current_user else "Implementing Agency Official",
        "verificationBadge": "Simulated Verification: Pending",
        "isSimulated": True,
        "reviewStatus": "PENDING",
        "status": "PENDING",
    }

    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    existing_evidence = list(project.get("evidenceArtifacts", []))
    existing_evidence.insert(0, new_evidence)
    updated_fields["evidenceArtifacts"] = existing_evidence

    # Append audit trail entry per ROLES.md
    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"Implementing Agency certified evidence from {vendor_name} for {project.get('name', 'Project')} on {now.strftime('%Y-%m-%d')}",
        "actor": current_user.get("officialName") or project.get("implementingAgency") or "Implementing Agency",
        "category": "EVIDENCE_UPLOAD",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields

    logger.info("New evidence %s attached to project %s with tag '%s'", evidence_id, id, new_evidence["sourceTag"])

    return {
        "success": True,
        "message": f"Milestone evidence attached successfully: {new_evidence['sourceTag']}",
        "evidence": new_evidence,
        "artifact": new_evidence,
    }


@router.post(
    "/{id}/invoice",
    status_code=status.HTTP_201_CREATED,
    summary="Submit Contractor Invoice & GST Bill (Implementing Agency)",
    description=(
        "Uploads contractor invoice and performs mocked verification: GSTIN format check via regex "
        "and claimed amount range check against project milestone allocation."
    ),
)
def submit_contractor_invoice(
    id: str = PathParam(..., description="Target Project ID"),
    payload: InvoiceSubmissionRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    """Accepts contractor invoice/bill and performs simulated GSTIN format and milestone amount verification."""
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)

    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    vendor_name = project.get("vendorName") or "Assigned Contractor"
    clean_gstin = payload.gstin.strip().upper()

    # 1. Mocked GSTIN Format Validation via Regex
    is_gstin_valid = bool(GSTIN_REGEX.match(clean_gstin))

    # 2. Mocked Claimed Amount Range Check against Project Budget
    sanctioned = float(project.get("sanctionedAmount", 0))
    claimed = float(payload.claimedAmount)
    # Expected milestone stage threshold: reasonable disbursement limit per stage
    is_amount_valid = (claimed > 0) and (claimed <= sanctioned) and (claimed <= max(sanctioned * 0.75, 100000))

    # Determine Verification Status & Human-Readable Explanation (Mocked / Simulated)
    if is_gstin_valid and is_amount_valid:
        verif_status = "Verified"
        verif_summary = "Simulated Format Check: Passed (Valid 15-char GSTIN structure & amount within milestone ceiling)"
    elif not is_gstin_valid:
        verif_status = "Under Review"
        verif_summary = "Simulated Format Check: Flagged (Invalid 15-char GSTIN structure)"
    else:
        verif_status = "Under Review"
        verif_summary = f"Simulated Format Check: Flagged (Claimed amount ₹{claimed:,.0f} exceeds milestone ceiling of ₹{sanctioned * 0.75:,.0f})"

    invoice_id = f"INV-{id}-{now.strftime('%Y%m%d%H%M%S')}"
    new_invoice = {
        "id": invoice_id,
        "projectId": id,
        "invoiceNumber": payload.invoiceNumber,
        "claimedAmount": payload.claimedAmount,
        "gstin": clean_gstin,
        "fileName": payload.fileName or f"contractor_invoice_{payload.invoiceNumber.lower()}.pdf",
        "milestoneRef": payload.milestoneRef or "Stage Billing Milestone",
        "notes": payload.notes or "Contractor stage billing invoice submitted for disbursement.",
        "vendorName": vendor_name,
        "sourceTag": f"Received from Vendor: {vendor_name}",
        "submittedAt": now.isoformat(),
        "submittedBy": current_user.get("officialName") or "Implementing Agency Official" if current_user else "Implementing Agency Official",
        "status": verif_status,
        "verificationStatus": verif_status,
        "verificationBadge": "Simulated Format Check",
        "verificationSummary": verif_summary,
        "isSimulated": True,
        "gstinValid": is_gstin_valid,
        "amountWithinRange": is_amount_valid,
        "reviewStatus": "PENDING",
    }

    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    existing_invoices = list(project.get("invoices", []))
    existing_invoices.insert(0, new_invoice)
    updated_fields["invoices"] = existing_invoices

    # Append audit trail entry per ROLES.md
    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"Implementing Agency recorded contractor invoice {payload.invoiceNumber} (₹{claimed:,.0f}) from {vendor_name} on {now.strftime('%Y-%m-%d')}",
        "actor": current_user.get("officialName") or project.get("implementingAgency") or "Implementing Agency",
        "category": "INVOICE_SUBMISSION",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields

    logger.info("New invoice %s attached to project %s with status %s", invoice_id, id, verif_status)

    return {
        "success": True,
        "message": f"Contractor invoice '{payload.invoiceNumber}' submitted successfully ({verif_status}).",
        "invoice": new_invoice,
    }


@router.post(
    "/{id}/utilization-certificate",
    status_code=status.HTTP_200_OK,
    summary="Submit Utilization Certificate (Implementing Agency)",
    description=(
        "Submits formal statutory Utilization Certificate (UC) once physical work reaches 100% completion. "
        "Transitions project UC status to 'SUBMITTED'."
    ),
)
def submit_utilization_certificate(
    id: str = PathParam(..., description="Target Project ID"),
    payload: UCSubmissionRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    """Submits formal statutory Utilization Certificate for completed work."""
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)

    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    # Check that work is completed or 100%
    phys_prog = project.get("physicalProgress", 0)
    proj_status = project.get("status", "")
    if phys_prog < 100 and proj_status != "Completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot submit Utilization Certificate: Physical execution is {phys_prog}%. Work must reach 100% completion before UC submission.",
        )

    now = datetime.now(timezone.utc)
    uc_record = {
        "ucNumber": payload.ucNumber,
        "certifiedAmount": payload.certifiedAmount,
        "submissionDate": now.isoformat(),
        "status": "SUBMITTED",
        "remarks": payload.remarks or "Physical work completed 100%. Final accounts verified and closed.",
        "auditCertificateRef": payload.auditCertificateRef or f"VCH/{now.strftime('%Y%m')}/{id}",
        "submittedBy": current_user.get("officialName") or "Implementing Agency Authority" if current_user else "Implementing Agency Authority",
    }

    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    updated_fields["ucStatus"] = "SUBMITTED"
    updated_fields["utilizationCertificate"] = uc_record
    IN_MEMORY_UPDATES[id] = updated_fields

    logger.info("Utilization certificate %s submitted for project %s", payload.ucNumber, id)

    return {
        "success": True,
        "message": f"Utilization Certificate '{payload.ucNumber}' submitted successfully. Status updated to SUBMITTED.",
        "utilizationCertificate": uc_record,
        "ucStatus": "SUBMITTED",
    }


@router.post(
    "/proposals",
    status_code=status.HTTP_201_CREATED,
    summary="Submit New Project Proposal (MP Office)",
    description=(
        "Accepts a new public work recommendation from MP Office per ROLES.md. "
        "Generates a formal proposal record, associates it with the MP's constituency, "
        "and injects it into the project catalog."
    ),
)
def submit_project_proposal(
    proposal: ProjectProposalRequest,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    """Creates a new project proposal record submitted by MP Office."""
    now = datetime.now(timezone.utc)
    proposal_id = f"PROP-TN-{now.strftime('%Y%m%d%H%M%S')}"

    # Determine constituency, district, and MP details from caller's token or defaults
    constituency = "Chennai Central"
    district = "Chennai"
    state = "Tamil Nadu"
    mp_name = "Thiru Dayanidhi Maran (Fictional)"
    mp_id = "MP-LS-TN-CHN-C"

    mp_type = "CONSTITUENCY_MP"
    if current_user:
        mp_type = current_user.get("mpType") or "CONSTITUENCY_MP"
        if current_user.get("constituency"):
            constituency = current_user.get("constituency")
        if current_user.get("district"):
            district = current_user.get("district")
        if current_user.get("state"):
            state = current_user.get("state")
        if current_user.get("officialName"):
            mp_name = current_user.get("officialName")
        if current_user.get("mpId"):
            mp_id = current_user.get("mpId")

    # If Nominated MP submits proposal, allow custom district & state nationally
    if mp_type == "NOMINATED_MP":
        if proposal.district:
            district = proposal.district
        if proposal.state:
            state = proposal.state
        constituency = "Nominated (Rajya Sabha)"
        proposal_id = f"PROP-NOM-{now.strftime('%Y%m%d%H%M%S')}"

    # Map category to standard executing agency
    cat_clean = proposal.category.strip().title()
    agency_map = {
        "Road": f"Public Works Department (PWD) — {district}",
        "Building": f"Public Works Department (PWD) — {district}",
        "Bridge": f"Public Works Department (PWD) — {district}",
        "Health": f"District Health Mission — {district}",
        "Education": f"Department of Public Instruction — {district}",
        "Water": f"Rural Water Supply & Sanitation Board — {district}",
        "Civic": f"Municipal Corporation & Urban Development Authority — {district}",
    }
    implementing_agency = agency_map.get(cat_clean, f"Public Works Department (PWD) — {district}")

    project_name = proposal.title or f"{cat_clean} Improvement at {proposal.location}"

    new_project_record = {
        "id": proposal_id,
        "name": project_name,
        "title": project_name,
        "workDescription": proposal.workDescription,
        "location": proposal.location,
        "category": cat_clean,
        "state": state,
        "district": district,
        "constituency": constituency,
        "mpName": mp_name,
        "mpId": mp_id,
        "mpType": mp_type,
        "recommendedBy": mp_name,
        "implementingAgency": implementing_agency,
        "sanctionedAmount": int(proposal.estimatedCost),
        "estimatedCost": int(proposal.estimatedCost),
        "expenditure": 0,
        "physicalProgress": 0,
        "financialProgress": 0.0,
        "status": "Proposed - Under Scrutiny",
        "ucStatus": "NOT_SUBMITTED",
        "riskScore": 12,
        "riskLevel": "LOW",
        "flagPresent": False,
        "hasOpenFlags": False,
        "flagStatus": "Clear",
        "submittedAt": now.isoformat(),
        "dateSpent": now.strftime("%Y-%m-%d"),
        "financialYear": "2025-26",
        "hasCitizenReport": False,
        "complianceFlags": [],
    }

    # Store in memory for active session
    IN_MEMORY_PROPOSALS.insert(0, new_project_record)
    logger.info("New project proposal %s created by %s for %s", proposal_id, mp_name, constituency)

    return {
        "success": True,
        "message": f"Project proposal '{project_name}' successfully submitted and routed for District Authority scrutiny.",
        "project": new_project_record,
        "proposal": new_project_record,
    }


@router.post(
    "/{id}/proposal-decision",
    summary="Approve or Reject MP Proposal (District Authority)",
    description="Administrative scrutiny decision on submitted MP proposal. If rejected, stores mandatory rejectionReason visible to MP Office.",
)
@router.post(
    "/proposals/{id}/decision",
    summary="Approve or Reject MP Proposal (Alias)",
)
def decide_project_proposal(
    id: str = PathParam(..., description="Target Proposal/Project ID"),
    payload: ProposalDecisionRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Proposal '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    decision = payload.decision.strip().upper()

    if decision == "APPROVE":
        updated_fields["status"] = "Approved - Work Not Started"
        updated_fields["rejectionReason"] = None
        if payload.assignedAgency:
            updated_fields["implementingAgency"] = payload.assignedAgency
        action_text = f"Administrative Sanction Approved by District Authority ({current_user.get('officialName') if current_user else 'District Collectorate'}). Scheme routed to {updated_fields.get('implementingAgency', project.get('implementingAgency'))}."
    elif decision == "REJECT":
        if not payload.rejectionReason or not payload.rejectionReason.strip():
            raise HTTPException(
                status_code=400,
                detail="Rejection reason is mandatory when rejecting an MP proposal per ROLES.md.",
            )
        updated_fields["status"] = "Rejected"
        updated_fields["rejectionReason"] = payload.rejectionReason.strip()
        action_text = f"Proposal Rejected by District Authority. Reason: {payload.rejectionReason.strip()}"
    else:
        raise HTTPException(status_code=400, detail=f"Invalid decision '{payload.decision}'. Must be 'APPROVE' or 'REJECT'.")

    # Record audit log
    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": action_text,
        "actor": (current_user.get("officialName") if current_user else "District Authority") or "District Authority",
        "category": "ADMINISTRATIVE_DECISION",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields

    refreshed = dict(project)
    refreshed.update(updated_fields)

    return {
        "success": True,
        "message": f"Proposal '{id}' decision recorded: {decision}.",
        "project": sanitize_project_for_user(refreshed, current_user),
    }


@router.post(
    "/{id}/evidence/{evidence_id}/review",
    summary="Review Physical Evidence Submission (District Authority)",
    description="Formally Accept or Reject-Resubmission-Required on uploaded photo/measurement book evidence.",
)
def review_project_evidence(
    id: str = PathParam(..., description="Target Project ID"),
    evidence_id: str = PathParam(..., description="Target Evidence ID"),
    payload: EvidenceReviewRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    evidence_list = [dict(ev) for ev in project.get("evidenceArtifacts", [])]

    target_ev = next((ev for ev in evidence_list if ev.get("id") == evidence_id), None)
    if not target_ev:
        raise HTTPException(status_code=404, detail=f"Evidence artifact '{evidence_id}' not found on project '{id}'.")

    st = payload.status.strip().upper()
    if st not in ("ACCEPTED", "REJECTED_RESUBMISSION_REQUIRED"):
        raise HTTPException(status_code=400, detail=f"Invalid review status '{payload.status}'. Must be 'ACCEPTED' or 'REJECTED_RESUBMISSION_REQUIRED'.")

    target_ev["reviewStatus"] = st
    target_ev["reviewedBy"] = (current_user.get("officialName") if current_user else "District Authority") or "District Authority"
    target_ev["reviewedAt"] = now.isoformat()
    if payload.remarks:
        target_ev["reviewRemarks"] = payload.remarks
    target_ev["verificationBadge"] = f"District Review: {st}"

    updated_fields["evidenceArtifacts"] = evidence_list

    # Append audit log
    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"District Authority marked evidence '{evidence_id}' ({target_ev.get('milestoneStage', 'Milestone')}) as {st}. Remarks: {payload.remarks or 'No remarks'}",
        "actor": target_ev["reviewedBy"],
        "category": "EVIDENCE_REVIEW",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields

    return {
        "success": True,
        "message": f"Evidence '{evidence_id}' review recorded as {st}.",
        "evidence": target_ev,
    }


@router.post(
    "/{id}/invoices/{invoice_number}/review",
    summary="Review Contractor Invoice (District Authority)",
    description="Accept or require resubmission on submitted contractor tax invoice.",
)
def review_project_invoice(
    id: str = PathParam(..., description="Target Project ID"),
    invoice_number: str = PathParam(..., description="Tax Invoice Number"),
    payload: InvoiceReviewRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    invoices_list = [dict(inv) for inv in project.get("invoices", [])]

    target_inv = next((inv for inv in invoices_list if inv.get("invoiceNumber") == invoice_number), None)
    if not target_inv:
        raise HTTPException(status_code=404, detail=f"Invoice '{invoice_number}' not found on project '{id}'.")

    st = payload.status.strip().upper()
    if st not in ("ACCEPTED", "REJECTED_RESUBMISSION_REQUIRED"):
        raise HTTPException(status_code=400, detail=f"Invalid review status '{payload.status}'.")

    target_inv["reviewStatus"] = st
    target_inv["reviewedBy"] = (current_user.get("officialName") if current_user else "District Authority") or "District Authority"
    target_inv["reviewedAt"] = now.isoformat()
    if payload.remarks:
        target_inv["reviewRemarks"] = payload.remarks

    updated_fields["invoices"] = invoices_list

    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"District Authority audited invoice '{invoice_number}' (₹{int(target_inv.get('claimedAmount', 0)):,}) - {st}.",
        "actor": target_inv["reviewedBy"],
        "category": "INVOICE_REVIEW",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields

    return {
        "success": True,
        "message": f"Invoice '{invoice_number}' review status updated to {st}.",
        "invoice": target_inv,
    }


@router.post(
    "/{id}/release-tranche",
    summary="Release Next Milestone Tranche (Milestone-Gated)",
    description="Releases next fund disbursement for a project. STRICTLY GATED: Requires current milestone evidence to be in ACCEPTED status.",
)
def release_milestone_tranche(
    id: str = PathParam(..., description="Target Project ID"),
    payload: Optional[TrancheReleaseRequest] = None,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    # MILESTONE GATING CHECK: Verify accepted evidence exists
    evidence_list = project.get("evidenceArtifacts", [])
    invoices_list = project.get("invoices", [])
    has_accepted_evidence = any(ev.get("reviewStatus") == "ACCEPTED" for ev in evidence_list)
    has_accepted_invoice = any(inv.get("reviewStatus") == "ACCEPTED" for inv in invoices_list)

    if not (has_accepted_evidence or has_accepted_invoice):
        raise HTTPException(
            status_code=400,
            detail="Milestone fund release locked: Current milestone evidence or contractor invoice must be formally ACCEPTED by District Authority before releasing subsequent fund tranche.",
        )

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    disbursements = list(project.get("disbursements", []))

    sanctioned = project.get("sanctionedAmount") or project.get("estimatedCost") or 5000000
    current_exp = updated_fields.get("expenditure", project.get("expenditure", 0))

    tranche_num = len(disbursements) + 1
    tranche_label = (payload.trancheLabel if payload and payload.trancheLabel else None) or f"T{tranche_num}"
    
    release_amt = (payload.amount if payload and payload.amount else None) or int(round(sanctioned * 0.25))
    new_exp = min(sanctioned, current_exp + release_amt)
    new_fin_prog = round((new_exp / sanctioned) * 100, 1)

    new_disbursement = {
        "tranche": tranche_label,
        "date": now.strftime("%Y-%m-%d"),
        "amount": release_amt,
        "percentage": round((release_amt / sanctioned) * 100, 1),
        "quarter": f"Q{(now.month - 1) // 3 + 1}",
        "releasedBy": (current_user.get("officialName") if current_user else "District Authority") or "District Authority",
    }
    disbursements.append(new_disbursement)
    updated_fields["disbursements"] = disbursements
    updated_fields["expenditure"] = new_exp
    updated_fields["financialProgress"] = new_fin_prog

    # Record in audit trail
    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"District Authority sanctioned {tranche_label} tranche disbursement of ₹{release_amt:,} following accepted milestone evidence verification.",
        "actor": (current_user.get("officialName") if current_user else "District Authority") or "District Authority",
        "category": "FUND_DISBURSEMENT",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields

    refreshed = dict(project)
    refreshed.update(updated_fields)

    return {
        "success": True,
        "message": f"Tranche {tranche_label} (₹{release_amt:,}) successfully disbursed. Updated expenditure: ₹{new_exp:,} ({new_fin_prog}%).",
        "disbursement": new_disbursement,
        "project": sanitize_project_for_user(refreshed, current_user),
    }


@router.post(
    "/{id}/asset-transfer",
    summary="Record Asset Transfer to User Agency (District Authority)",
    description="Marks public infrastructure asset as formally transferred to local user agency / panchayat upon physical work completion.",
)
def record_asset_transfer(
    id: str = PathParam(..., description="Target Project ID"),
    payload: AssetTransferRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    is_completed = project.get("status") == "Completed" or (project.get("physicalProgress") or 0) >= 100
    if not is_completed:
        raise HTTPException(
            status_code=400,
            detail=f"Asset transfer can only be executed on Completed projects (current status: '{project.get('status')}', progress: {project.get('physicalProgress')}%) per ROLES.md.",
        )

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))

    transfer_record = {
        "status": payload.status,
        "userAgency": payload.userAgency,
        "handoverRef": payload.handoverRef or f"HO/{project.get('district', 'DIST')[:3].upper()}/2026/{id.split('-')[-1]}",
        "transferredAt": now.isoformat(),
        "transferredBy": (current_user.get("officialName") if current_user else "District Authority") or "District Authority",
        "remarks": payload.remarks or "Public asset physically inspected and handed over for civic maintenance.",
    }

    updated_fields["assetTransferStatus"] = payload.status
    updated_fields["assetTransferDetails"] = transfer_record

    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"District Authority formally transferred asset '{project.get('name')}' to user agency '{payload.userAgency}' (Ref: {transfer_record['handoverRef']}).",
        "actor": transfer_record["transferredBy"],
        "category": "ASSET_TRANSFER",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields

    refreshed = dict(project)
    refreshed.update(updated_fields)

    return {
        "success": True,
        "message": f"Asset transfer to '{payload.userAgency}' recorded successfully. Status: {payload.status}.",
        "assetTransferDetails": transfer_record,
        "project": sanitize_project_for_user(refreshed, current_user),
    }


class FreezeTrancheRequest(BaseModel):
    """Schema for freezing subsequent tranche disbursement by State Nodal Authority."""
    reason: Optional[str] = Field(None, description="Administrative freeze reason / anomaly reference")
    remarks: Optional[str] = Field(None, description="Detailed freeze directive remarks")


class FormalQueryRequest(BaseModel):
    """Schema for issuing formal query to non-responsive District Authority."""
    queryText: str = Field(..., min_length=5, description="Formal query text / show-cause justification")
    targetRole: Optional[str] = Field("District Authority", description="Recipient authority role")
    deadlineDays: Optional[int] = Field(7, description="Statutory compliance response deadline in days")


class DistrictReviewRequest(BaseModel):
    """Schema for flagging a district for systemic review."""
    district: str = Field(..., description="Target district name")
    reason: str = Field(..., description="Systemic pattern (e.g. Repeated Inaction Timeouts, Chronic Fund Stagnation)")
    directiveNotes: Optional[str] = Field(None, description="Corrective action directive notes")


class ForwardMoSPIRequest(BaseModel):
    """Schema for forwarding consolidated case dossier to Central Nodal Agency (MoSPI)."""
    summary: str = Field(..., min_length=5, description="Executive escalation summary")
    recommendedSanction: Optional[str] = Field(None, description="Recommended central action or statutory audit tasking")


@router.post(
    "/{id}/freeze-tranche",
    summary="Freeze Subsequent Fund Tranche (State Nodal Administrative Action)",
    description="Imposes an administrative freeze on subsequent fund tranche release following critical anomaly or escalation.",
)
def freeze_project_tranche(
    id: str = PathParam(..., description="Target Project ID"),
    payload: Optional[FreezeTrancheRequest] = None,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    actor_name = (current_user.get("officialName") if current_user else "State Nodal Authority") or "State Nodal Authority"
    freeze_reason = (payload.reason if payload and payload.reason else "Administrative Freeze: Critical Anomaly / Escalated Issue")
    freeze_remarks = (payload.remarks if payload and payload.remarks else "Subsequent fund releases frozen pending administrative resolution.")

    updated_fields["trancheFrozen"] = True
    updated_fields["freezeReason"] = freeze_reason
    updated_fields["frozenAt"] = now.isoformat()
    updated_fields["frozenBy"] = actor_name

    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"State Nodal Authority imposed an administrative FREEZE on subsequent tranche releases for '{project.get('name')}'. Reason: {freeze_reason}. Directive: {freeze_remarks}",
        "actor": actor_name,
        "category": "ADMINISTRATIVE_FREEZE",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields
    refreshed = dict(project)
    refreshed.update(updated_fields)

    return {
        "success": True,
        "message": f"Administrative freeze imposed on project '{id}'. Next fund tranche release is locked.",
        "project": sanitize_project_for_user(refreshed, current_user),
    }


@router.post(
    "/{id}/issue-query",
    summary="Issue Formal Query to District Authority (State Nodal Administrative Action)",
    description="Issues a formal inquiry / show-cause notice to a non-responsive District Authority regarding project flags.",
)
def issue_formal_query(
    id: str = PathParam(..., description="Target Project ID"),
    payload: FormalQueryRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    actor_name = (current_user.get("officialName") if current_user else "State Nodal Authority") or "State Nodal Authority"

    query_record = {
        "queryId": f"QRY-{id}-{now.strftime('%Y%m%d%H%M')}",
        "queryText": payload.queryText,
        "targetRole": payload.targetRole or f"District Authority ({project.get('district')})",
        "issuedBy": actor_name,
        "issuedAt": now.isoformat(),
        "deadlineDays": payload.deadlineDays or 7,
        "status": "AWAITING_DISTRICT_RESPONSE",
    }

    existing_queries = list(project.get("formalQueries", []))
    existing_queries.insert(0, query_record)
    updated_fields["formalQueries"] = existing_queries

    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"State Nodal Authority issued formal inquiry to {payload.targetRole or 'District Authority'} for '{project.get('name')}'. Query: {payload.queryText} (Response required within {payload.deadlineDays or 7} days).",
        "actor": actor_name,
        "category": "FORMAL_QUERY",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields
    refreshed = dict(project)
    refreshed.update(updated_fields)

    return {
        "success": True,
        "message": f"Formal query transmitted to District Authority for project '{id}'.",
        "query": query_record,
        "project": sanitize_project_for_user(refreshed, current_user),
    }


DISTRICT_REVIEW_STORE: Dict[str, List[Dict[str, Any]]] = {}


@router.post(
    "/districts/{district}/flag-review",
    summary="Flag District for State Review (State Nodal Administrative Action)",
    description="Flags a district collectorate for systemic administrative review due to repeated inaction timeouts or fund stagnation.",
)
def flag_district_for_review(
    district: str = PathParam(..., description="District Name"),
    payload: DistrictReviewRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    now = datetime.now(timezone.utc)
    actor_name = (current_user.get("officialName") if current_user else "State Nodal Authority") or "State Nodal Authority"
    dist_clean = district.strip()

    review_record = {
        "reviewId": f"REV-{dist_clean.upper()[:3]}-{now.strftime('%Y%m%d%H%M')}",
        "district": dist_clean,
        "reason": payload.reason,
        "directiveNotes": payload.directiveNotes or "District collectorate flagged for corrective action review.",
        "flaggedBy": actor_name,
        "flaggedAt": now.isoformat(),
        "status": "UNDER_STATE_REVIEW",
    }

    DISTRICT_REVIEW_STORE.setdefault(dist_clean.lower(), []).insert(0, review_record)

    return {
        "success": True,
        "message": f"District '{dist_clean}' successfully flagged for State Administrative Review.",
        "review": review_record,
    }


@router.get(
    "/districts/reviews",
    summary="List Flagged District Reviews",
    description="Returns list of districts currently flagged for state performance review.",
)
def list_district_reviews(
    state: Optional[str] = Query(None),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[Dict[str, Any]]:
    all_reviews = []
    for dist_list in DISTRICT_REVIEW_STORE.values():
        all_reviews.extend(dist_list)
    return all_reviews


@router.post(
    "/{id}/forward-mospi",
    summary="Forward Case Report to MoSPI (State Nodal Administrative Action)",
    description="Transmits consolidated state audit report and recommendation to Central Nodal Agency (MoSPI).",
)
def forward_report_to_mospi(
    id: str = PathParam(..., description="Target Project ID"),
    payload: ForwardMoSPIRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    if current_user:
        check_project_access(project, current_user)

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    actor_name = (current_user.get("officialName") if current_user else "State Nodal Authority") or "State Nodal Authority"

    escalation_record = {
        "escalationId": f"ESC-MOSPI-{id}-{now.strftime('%Y%m%d%H%M')}",
        "summary": payload.summary,
        "recommendedSanction": payload.recommendedSanction or "Central directive or statutory CAG audit observation recommended.",
        "forwardedBy": actor_name,
        "forwardedAt": now.isoformat(),
        "status": "FORWARDED_TO_MOSPI",
    }

    updated_fields["forwardedToMoSPI"] = True
    updated_fields["mospiEscalationRecord"] = escalation_record

    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"State Nodal Authority forwarded consolidated case report for '{project.get('name')}' to Central Nodal Agency (MoSPI). Escalation Summary: {payload.summary}",
        "actor": actor_name,
        "category": "MOSPI_FORWARD",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields
    refreshed = dict(project)
    refreshed.update(updated_fields)

    return {
        "success": True,
        "message": f"Case dossier for project '{id}' successfully forwarded to Central Nodal Agency (MoSPI).",
        "escalation": escalation_record,
        "project": sanitize_project_for_user(refreshed, current_user),
    }


# ============================================================================
# Central Nodal Agency (MoSPI) Directive Actions (per ROLES.md)
# ============================================================================

MOSPI_DIRECTIVES_STORE: List[Dict[str, Any]] = []
STATE_PERFORMANCE_REVIEW_STORE: Dict[str, List[Dict[str, Any]]] = {}


class TaskAuditorRequest(BaseModel):
    """Schema for MoSPI tasking Auditor/CAG for formal audit inspection."""
    scopeNotes: str = Field(..., min_length=5, description="Audit scope / terms of reference", examples=["Conduct comprehensive forensic audit into repeated civil milestone delays and contractor billing anomalies."])
    auditorWing: Optional[str] = Field("Auditor / CAG Central Audit Wing", description="Designated statutory audit wing")
    priority: Optional[str] = Field("HIGH", description="Audit tasking priority: HIGH | CRITICAL", examples=["HIGH"])


class DirectStateActionRequest(BaseModel):
    """Schema for MoSPI issuing binding directive to State Nodal Department."""
    directiveText: str = Field(..., min_length=5, description="Binding central directive instructions", examples=["Direct State PWD to issue show-cause notice and freeze contractor bank guarantees within 14 days."])
    targetState: Optional[str] = Field(None, description="Target state jurisdiction")
    targetDepartment: Optional[str] = Field("State Nodal Department", description="Target line department")
    responseDeadlineDays: Optional[int] = Field(14, description="Statutory compliance response deadline in days")


class StatePerformanceReviewRequest(BaseModel):
    """Schema for MoSPI initiating systemic state performance review."""
    state: str = Field(..., min_length=2, description="Target State/UT name", examples=["Tamil Nadu"])
    reason: str = Field(..., min_length=5, description="Systemic pattern rationale (e.g. Chronic Multi-Year Fund Stagnation, Inaction-Timeout Clusters)")
    directiveNotes: Optional[str] = Field(None, description="Detailed review terms and statutory scrutiny notes")


@router.post(
    "/{id}/task-auditor",
    summary="Task Auditor for Formal Audit (MoSPI Institutional Action)",
    description="Assigns a project scheme or district package to Auditor / CAG's priority statutory audit queue per ROLES.md.",
)
def task_auditor_for_project(
    id: str = PathParam(..., description="Target Project ID"),
    payload: TaskAuditorRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    actor_name = (current_user.get("officialName") if current_user else "Central Nodal Agency (MoSPI)") or "Central Nodal Agency (MoSPI)"

    task_id = f"TSK-AUD-{id}-{now.strftime('%Y%m%d%H%M')}"
    audit_task_record = {
        "taskId": task_id,
        "projectId": id,
        "projectName": project.get("name"),
        "state": project.get("state"),
        "district": project.get("district"),
        "auditorWing": payload.auditorWing or "Auditor / CAG Central Audit Wing",
        "scopeNotes": payload.scopeNotes,
        "priority": payload.priority or "HIGH",
        "taskedBy": actor_name,
        "taskedAt": now.isoformat(),
        "status": "QUEUED_FOR_CAG_AUDIT",
        "isSimulated": True,
        "verificationBadge": "Simulated CAG Tasking",
    }

    updated_fields["auditTasked"] = True
    updated_fields["auditTaskDetails"] = audit_task_record

    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"Central Nodal Agency (MoSPI) tasked {payload.auditorWing or 'Auditor / CAG'} for formal audit on '{project.get('name')}'. Scope: {payload.scopeNotes} (Priority: {payload.priority or 'HIGH'}).",
        "actor": actor_name,
        "category": "MOSPI_DIRECTIVE",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields
    MOSPI_DIRECTIVES_STORE.insert(0, {
        "type": "TASK_AUDITOR",
        "id": task_id,
        "projectId": id,
        "projectName": project.get("name"),
        "state": project.get("state"),
        "district": project.get("district"),
        "details": audit_task_record,
        "issuedAt": now.isoformat(),
        "issuedBy": actor_name,
    })

    refreshed = dict(project)
    refreshed.update(updated_fields)

    return {
        "success": True,
        "message": f"Auditor / CAG tasked successfully for project '{id}' (Ref: {task_id}).",
        "task": audit_task_record,
        "project": sanitize_project_for_user(refreshed, current_user),
    }


@router.post(
    "/{id}/direct-state-action",
    summary="Direct State Corrective Action (MoSPI Institutional Action)",
    description="Issues a formal central corrective directive to a designated State Nodal Department regarding scheme execution.",
)
def direct_state_corrective_action(
    id: str = PathParam(..., description="Target Project ID"),
    payload: DirectStateActionRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    all_projects = load_projects_catalog()
    project = next((p for p in all_projects if p.get("id") == id), None)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{id}' not found.")

    now = datetime.now(timezone.utc)
    updated_fields = dict(IN_MEMORY_UPDATES.get(id, {}))
    actor_name = (current_user.get("officialName") if current_user else "Central Nodal Agency (MoSPI)") or "Central Nodal Agency (MoSPI)"
    target_state = payload.targetState or project.get("state", "State Nodal Department")

    directive_id = f"DIR-MOSPI-{id}-{now.strftime('%Y%m%d%H%M')}"
    directive_record = {
        "directiveId": directive_id,
        "projectId": id,
        "projectName": project.get("name"),
        "targetState": target_state,
        "targetDepartment": payload.targetDepartment or f"{target_state} State Nodal Authority",
        "directiveText": payload.directiveText,
        "responseDeadlineDays": payload.responseDeadlineDays or 14,
        "issuedBy": actor_name,
        "issuedAt": now.isoformat(),
        "status": "DIRECTIVE_TRANSMITTED_AWAITING_STATE_ACTION",
        "isSimulated": True,
        "verificationBadge": "Simulated State Directive",
    }

    updated_fields["stateDirectiveRecord"] = directive_record

    audit_entry = {
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": now.isoformat(),
        "action": f"Central Nodal Agency (MoSPI) issued binding corrective directive to {target_state} ({payload.targetDepartment or 'State Nodal Department'}) for '{project.get('name')}'. Directive: {payload.directiveText} (Compliance deadline: {payload.responseDeadlineDays or 14} days).",
        "actor": actor_name,
        "category": "MOSPI_DIRECTIVE",
    }
    existing_audit = list(project.get("auditLogs", []))
    existing_audit.insert(0, audit_entry)
    updated_fields["auditLogs"] = existing_audit

    IN_MEMORY_UPDATES[id] = updated_fields
    MOSPI_DIRECTIVES_STORE.insert(0, {
        "type": "DIRECT_STATE_ACTION",
        "id": directive_id,
        "projectId": id,
        "projectName": project.get("name"),
        "state": target_state,
        "details": directive_record,
        "issuedAt": now.isoformat(),
        "issuedBy": actor_name,
    })

    refreshed = dict(project)
    refreshed.update(updated_fields)

    return {
        "success": True,
        "message": f"Central directive '{directive_id}' transmitted to {target_state} State Nodal Authority.",
        "directive": directive_record,
        "project": sanitize_project_for_user(refreshed, current_user),
    }


@router.post(
    "/states/{state}/initiate-review",
    summary="Initiate State Performance Review (MoSPI Institutional Action)",
    description="Initiates a formal central performance and compliance review on a State Nodal Department for systemic delay or non-utilization patterns.",
)
def initiate_state_performance_review(
    state: str = PathParam(..., description="Target State Name"),
    payload: StatePerformanceReviewRequest = ...,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> Dict[str, Any]:
    now = datetime.now(timezone.utc)
    actor_name = (current_user.get("officialName") if current_user else "Central Nodal Agency (MoSPI)") or "Central Nodal Agency (MoSPI)"
    state_clean = state.strip()

    review_id = f"REV-MOSPI-{state_clean.upper()[:3]}-{now.strftime('%Y%m%d%H%M')}"
    review_record = {
        "reviewId": review_id,
        "state": state_clean,
        "reason": payload.reason,
        "directiveNotes": payload.directiveNotes or "Formal central institutional review initiated into state developmental performance.",
        "initiatedBy": actor_name,
        "initiatedAt": now.isoformat(),
        "status": "STATE_REVIEW_INITIATED",
        "isSimulated": True,
        "verificationBadge": "Simulated State Review",
    }

    STATE_PERFORMANCE_REVIEW_STORE.setdefault(state_clean.lower(), []).insert(0, review_record)
    MOSPI_DIRECTIVES_STORE.insert(0, {
        "type": "STATE_PERFORMANCE_REVIEW",
        "id": review_id,
        "state": state_clean,
        "details": review_record,
        "issuedAt": now.isoformat(),
        "issuedBy": actor_name,
    })

    return {
        "success": True,
        "message": f"State Performance Review '{review_id}' initiated for {state_clean}.",
        "review": review_record,
    }


@router.get(
    "/mospi/directives",
    summary="List All MoSPI Central Directives",
    description="Returns registry of all institutional directives, tasked audits, and state performance reviews issued by MoSPI.",
)
def list_mospi_directives(
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_current_user),
) -> List[Dict[str, Any]]:
    return MOSPI_DIRECTIVES_STORE



