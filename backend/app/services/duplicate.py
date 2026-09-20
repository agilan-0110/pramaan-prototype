"""
Duplicate Work Detection Service for SETU.

Detects duplicate infrastructure schemes, reworded cross-year tenders,
and fraudulent double-billing across MPLADS public works:
1. RapidFuzz fuzzy text matching on project names/descriptions.
2. Geo-proximity check (same district + similar cost range).
3. Cross-year duplicate check (same/similar work description reworded in later fiscal year).
4. Vendor-match weighting (shared vendorId elevates similarity and fraud probability).
"""

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

from rapidfuzz import fuzz

# Path to mock data store
DATA_DIR = Path(__file__).resolve().parent.parent / "data"
PROJECTS_FILE = DATA_DIR / "mockProjects.json"

# Default detection parameters
DEFAULT_SIMILARITY_THRESHOLD = 80.0
BASE_TEXT_FILTER_THRESHOLD = 70.0
MAX_COST_VARIANCE_SIMILAR = 0.25  # 25% cost variance considered similar range


def load_projects() -> List[Dict[str, Any]]:
    """Loads all projects from the mock projects data store."""
    if not PROJECTS_FILE.exists():
        return []
    with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def get_project_by_id(project_id: str, all_projects: Optional[List[Dict[str, Any]]] = None) -> Optional[Dict[str, Any]]:
    """Finds a project by its unique ID."""
    projects = all_projects if all_projects is not None else load_projects()
    for proj in projects:
        if proj.get("id") == project_id:
            return proj
    return None


def clean_text_for_matching(text: str) -> str:
    """Normalizes text for fuzzy token set comparison."""
    if not text:
        return ""
    # Lowercase and strip common boilerplate punctuation
    text = text.lower()
    text = re.sub(r"[,\-\_\/\(\)\.\:]+", " ", text)
    # Collapse multiple whitespaces
    return " ".join(text.split())


def compute_pair_similarity(
    p1: Dict[str, Any],
    p2: Dict[str, Any],
) -> Dict[str, Any]:
    """
    Computes weighted duplicate similarity metrics between two projects:
    1. Fuzzy text matching via RapidFuzz.
    2. Geo-proximity check (same district, same state).
    3. Similar cost range evaluation.
    4. Vendor match weighting.
    5. Cross-year vs same-year categorization.
    """
    name1 = clean_text_for_matching(p1.get("name", ""))
    name2 = clean_text_for_matching(p2.get("name", ""))

    # 1. Fuzzy Text Similarity
    token_set_sim = fuzz.token_set_ratio(name1, name2)
    token_sort_sim = fuzz.token_sort_ratio(name1, name2)
    # Blend token set (handles word reorderings and insertions) and token sort
    text_similarity = round(token_set_sim * 0.70 + token_sort_sim * 0.30, 2)

    # 2. Geo-proximity Check
    dist1 = (p1.get("district") or "").strip().lower()
    dist2 = (p2.get("district") or "").strip().lower()
    state1 = (p1.get("state") or "").strip().lower()
    state2 = (p2.get("state") or "").strip().lower()

    same_district = bool(dist1 and dist2 and dist1 == dist2)
    same_state = bool(state1 and state2 and state1 == state2)

    # 3. Cost Range Evaluation
    amt1 = p1.get("sanctionedAmount", 0)
    amt2 = p2.get("sanctionedAmount", 0)
    max_amt = max(amt1, amt2, 1)
    cost_diff = abs(amt1 - amt2)
    cost_diff_pct = round((cost_diff / max_amt) * 100, 1)
    similar_cost = (cost_diff / max_amt) <= MAX_COST_VARIANCE_SIMILAR

    # 4. Vendor Match Weighting
    v_id1 = p1.get("vendorId")
    v_id2 = p2.get("vendorId")
    v_name1 = (p1.get("vendorName") or "").strip().lower()
    v_name2 = (p2.get("vendorName") or "").strip().lower()

    vendor_match = bool(
        (v_id1 and v_id2 and v_id1 == v_id2) or
        (v_name1 and v_name2 and v_name1 == v_name2)
    )

    # 5. Cross-Year vs Same-Year Check
    fy1 = p1.get("financialYear")
    fy2 = p2.get("financialYear")
    is_cross_year = bool(fy1 and fy2 and fy1 != fy2)
    match_type = "cross-year" if is_cross_year else "same-year"

    # Composite Confidence Scoring
    # Start with base text similarity
    score = text_similarity * 0.72

    reasons: List[str] = [
        f"Fuzzy text description similarity of {text_similarity}% evaluated via token analysis."
    ]

    # Geo proximity weighting
    if same_district:
        score += 12.0
        reasons.append(f"Geographic co-location: both projects situated in {p1.get('district')} district.")
    elif same_state:
        score += 3.0
    else:
        # Cross-state matching for standard departmental descriptions has much lower local duplicate risk
        score -= 12.0
        reasons.append("Cross-state scope: projects located in different administrative states.")

    # Vendor weighting
    if vendor_match:
        score += 15.0
        v_label = p1.get("vendorName") or p1.get("vendorId") or "Unknown"
        reasons.append(f"Contractor entity match: same vendor '{v_label}' awarded both project packages.")

    # Cost range weighting
    if similar_cost:
        score += 8.0
        reasons.append(f"Similar financial scale: sanctioned amounts within {cost_diff_pct}% variance.")
    else:
        reasons.append(f"Significant cost variance ({cost_diff_pct}%) between projects.")

    # Cross-year repetition pattern
    if is_cross_year and same_district:
        score += 5.0
        reasons.append(f"Cross-fiscal year repetition: work originally sanctioned in {fy2} re-tendered in {fy1}.")
    elif not is_cross_year:
        reasons.append(f"Concurrent execution: both works registered under fiscal year {fy1 or fy2}.")

    final_score = round(min(100.0, max(0.0, score)), 1)

    return {
        "matchedProjectId": p2.get("id"),
        "matchedProjectName": p2.get("name"),
        "matchedDistrict": p2.get("district"),
        "matchedState": p2.get("state"),
        "matchedFinancialYear": p2.get("financialYear"),
        "matchedVendorId": p2.get("vendorId"),
        "matchedVendorName": p2.get("vendorName"),
        "matchedSanctionedAmount": p2.get("sanctionedAmount"),
        "similarityScore": final_score,
        "textSimilarity": text_similarity,
        "matchType": match_type,
        "vendorMatch": vendor_match,
        "sameDistrict": same_district,
        "sameState": same_state,
        "similarCostRange": similar_cost,
        "costVariancePercentage": cost_diff_pct,
        "reasons": reasons,
    }


def find_project_duplicates(
    project_id: str,
    threshold: float = DEFAULT_SIMILARITY_THRESHOLD,
    same_district_only: bool = False,
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> Optional[Dict[str, Any]]:
    """
    Identifies all duplicate or suspicious overlapping works for a given project ID.
    Returns structured audit object matching API_CONTRACT.md.
    """
    projects = all_projects if all_projects is not None else load_projects()
    target_project = get_project_by_id(project_id, projects)

    if not target_project:
        return None

    duplicates = []

    for other in projects:
        if other.get("id") == project_id:
            continue

        if same_district_only:
            target_dist = (target_project.get("district") or "").strip().lower()
            other_dist = (other.get("district") or "").strip().lower()
            if target_dist != other_dist:
                continue

        # Fast pre-filter: check raw token set ratio before full evaluation
        raw_text_sim = fuzz.token_set_ratio(
            clean_text_for_matching(target_project.get("name", "")),
            clean_text_for_matching(other.get("name", "")),
        )
        if raw_text_sim < BASE_TEXT_FILTER_THRESHOLD:
            continue

        match_result = compute_pair_similarity(target_project, other)

        # Flag if composite score or pure text similarity in same district meets threshold
        if match_result["similarityScore"] >= threshold or (
            match_result["sameDistrict"] and match_result["textSimilarity"] >= threshold
        ):
            duplicates.append(match_result)

    # Sort duplicates by similarityScore descending
    duplicates.sort(key=lambda d: d["similarityScore"], reverse=True)

    has_duplicates = len(duplicates) > 0
    highest_score = duplicates[0]["similarityScore"] if has_duplicates else 0.0

    return {
        "projectId": target_project.get("id"),
        "projectName": target_project.get("name"),
        "category": target_project.get("category"),
        "district": target_project.get("district"),
        "state": target_project.get("state"),
        "financialYear": target_project.get("financialYear"),
        "vendorId": target_project.get("vendorId"),
        "vendorName": target_project.get("vendorName"),
        "sanctionedAmount": target_project.get("sanctionedAmount"),
        "hasDuplicates": has_duplicates,
        "totalDuplicates": len(duplicates),
        "highestSimilarityScore": highest_score,
        "thresholdApplied": threshold,
        "duplicates": duplicates,
        "evaluatedAt": datetime.now(timezone.utc).isoformat(),
    }


def get_all_duplicate_pairs(
    threshold: float = DEFAULT_SIMILARITY_THRESHOLD,
    all_projects: Optional[List[Dict[str, Any]]] = None,
) -> List[Dict[str, Any]]:
    """
    Finds all unique duplicate pairs across the entire project registry.
    """
    projects = all_projects if all_projects is not None else load_projects()
    pairs = []
    seen = set()

    for i, p1 in enumerate(projects):
        for j, p2 in enumerate(projects):
            if i >= j:
                continue

            pair_key = tuple(sorted([p1["id"], p2["id"]]))
            if pair_key in seen:
                continue

            raw_text_sim = fuzz.token_set_ratio(
                clean_text_for_matching(p1.get("name", "")),
                clean_text_for_matching(p2.get("name", "")),
            )
            if raw_text_sim < BASE_TEXT_FILTER_THRESHOLD:
                continue

            match = compute_pair_similarity(p1, p2)
            if match["similarityScore"] >= threshold or (
                match["sameDistrict"] and match["textSimilarity"] >= threshold
            ):
                seen.add(pair_key)
                pairs.append({
                    "projectA": {
                        "id": p1["id"],
                        "name": p1["name"],
                        "district": p1.get("district"),
                        "financialYear": p1.get("financialYear"),
                        "vendorId": p1.get("vendorId"),
                        "sanctionedAmount": p1.get("sanctionedAmount"),
                    },
                    "projectB": {
                        "id": p2["id"],
                        "name": p2["name"],
                        "district": p2.get("district"),
                        "financialYear": p2.get("financialYear"),
                        "vendorId": p2.get("vendorId"),
                        "sanctionedAmount": p2.get("sanctionedAmount"),
                    },
                    "similarityScore": match["similarityScore"],
                    "textSimilarity": match["textSimilarity"],
                    "matchType": match["matchType"],
                    "vendorMatch": match["vendorMatch"],
                    "sameDistrict": match["sameDistrict"],
                    "reasons": match["reasons"],
                })

    pairs.sort(key=lambda x: x["similarityScore"], reverse=True)
    return pairs


def get_duplicate_summary(all_projects: Optional[List[Dict[str, Any]]] = None) -> Dict[str, Any]:
    """Generates an executive summary of duplicate risks across the portfolio."""
    pairs = get_all_duplicate_pairs(all_projects=all_projects)
    cross_year_count = sum(1 for p in pairs if p["matchType"] == "cross-year")
    same_year_count = sum(1 for p in pairs if p["matchType"] == "same-year")
    vendor_matched_count = sum(1 for p in pairs if p["vendorMatch"])
    same_district_count = sum(1 for p in pairs if p["sameDistrict"])

    return {
        "totalFlaggedPairs": len(pairs),
        "crossYearDuplicates": cross_year_count,
        "sameYearDuplicates": same_year_count,
        "vendorMatchedDuplicates": vendor_matched_count,
        "sameDistrictDuplicates": same_district_count,
        "highestSimilarityScore": pairs[0]["similarityScore"] if pairs else 0.0,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }
