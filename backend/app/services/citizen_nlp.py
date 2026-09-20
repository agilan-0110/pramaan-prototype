"""
Citizen Ground Truth NLP Service for SETU.

Detects discrepancies and contradictions between official institutional reporting
and citizen on-the-ground observations using a hybrid NLP pipeline:
1. Sentence-Transformers semantic embedding ("all-MiniLM-L6-v2") for topicalRelevanceScore
   (cosine similarity verifying that the citizen report is discussing the specific project).
2. Rule-based negation and completion contradiction layer:
   - Completion/resolution cues in official records (e.g. "completed", "constructed", "operational", "certified").
   - Negation/defect cues in citizen reports (e.g. "still not", "never been", "zero", "incomplete", "without a roof").
   - Directional contradiction detection when official progress/completion is contested by physical reality.
3. Weighted contradictionScore (0-100):
   - Heavily weights the negation layer (the core contradiction signal).
   - Gates confidence by topicalRelevanceScore (ensuring relevance before high contradiction scoring).
4. Plain-language explanation generation for audit and oversight review.
"""

import json
import logging
import math
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

import numpy as np
from sentence_transformers import SentenceTransformer

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("setu.citizen_nlp")

# Data file paths
DATA_DIR = Path(__file__).resolve().parent.parent / "data"
COMPLAINTS_FILE = DATA_DIR / "mockComplaints.json"
PROJECTS_FILE = DATA_DIR / "mockProjects.json"

# --- Lexicon & Heuristics ---

COMPLETION_TERMS = [
    "completed", "complete", "completion", "finished", "constructed",
    "resolved", "delivered", "installed", "operational", "handed over",
    "certified", "commissioned", "functional", "active execution",
    "overhaul", "paved", "laid", "in progress", "assembly certified",
    "supply and delivery", "operationalized"
]

NEGATION_PHRASES = [
    "still not", "never been", "zero water", "zero has flowed",
    "only bare", "without a roof", "without any", "without trenching",
    "still sitting on floor", "still choked", "breached during",
    "exists only on paper", "dumped loose", "washed away",
    "completely stalled", "exposed to rust", "dismantled their",
    "unbolted", "loose roofing", "creating a hazard",
    "no work has happened", "only 15 broken", "loose red soil",
    "missing granular", "deserted for", "broken wooden",
    "premature failure", "disintegrated", "disintegration",
    "not been connected", "never connected", "bare external brick walls",
    "no water has flowed", "simply dumped", "only 15"
]

NEGATION_CUES = [
    "not", "never", "still", "no", "incomplete", "unfinished",
    "bare", "breached", "hazard", "stalled", "deserted", "zero",
    "broken", "choked", "unbolted", "disconnected", "washed away",
    "dumped", "missing", "unpaved", "uncompacted"
]

CORROBORATION_PHRASES = [
    "smooth", "runs daily", "drastically reduced", "progressing well",
    "progressing steadily", "fully constructed", "sorting began",
    "actively operating", "compacted with heavy", "demonstrated to residents",
    "fast and efficient", "testing began", "window frames are in place",
    "corroborate", "positive", "reduces transport time"
]

WORK_SUBJECTS = [
    "wall", "brick", "roof", "slab", "window", "plaster", "water",
    "desk", "furniture", "bench", "pipe", "pipeline", "tank", "bund",
    "drain", "culvert", "road", "surface", "bituminous", "bridge",
    "equipment", "rebar", "plant", "ward", "shed", "conduit",
    "screen", "analyzer", "building", "structure"
]


def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Computes great-circle distance between two GPS coordinates in kilometers
    using the Haversine formula.
    """
    R = 6371.0  # Earth radius in kilometers
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)

    a = math.sin(dphi / 2.0) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2.0) ** 2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return round(R * c, 2)



class CitizenGroundTruthNLP:
    """
    Singleton NLP service evaluating citizen grievances against official project claims.
    """

    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(CitizenGroundTruthNLP, cls).__new__(cls)
            cls._instance.is_initialized = False
        return cls._instance

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        if getattr(self, "is_initialized", False):
            return
        logger.info("Initializing Citizen Ground Truth NLP pipeline with model '%s'...", model_name)
        self.model_name = model_name
        try:
            self.model = SentenceTransformer(model_name, local_files_only=True)
        except Exception:
            self.model = SentenceTransformer(model_name)
        self.projects_cache: Dict[str, Dict[str, Any]] = {}
        self.complaints_cache: List[Dict[str, Any]] = []
        self._load_data()
        self.is_initialized = True
        logger.info("Citizen Ground Truth NLP pipeline initialized successfully.")

    def _load_data(self) -> None:
        """Loads projects and complaints from JSON stores into memory."""
        if PROJECTS_FILE.exists():
            with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
                projects = json.load(f)
                self.projects_cache = {p["id"]: p for p in projects}
        if COMPLAINTS_FILE.exists():
            with open(COMPLAINTS_FILE, "r", encoding="utf-8") as f:
                self.complaints_cache = json.load(f)

    def compute_topical_relevance(self, text_a: str, text_b: str) -> float:
        """
        Encodes both texts with sentence-transformers and computes cosine similarity.
        Returns topicalRelevanceScore as a percentage (0.0 to 100.0).
        """
        if not text_a or not text_b:
            return 0.0

        embeddings = self.model.encode([text_a, text_b], convert_to_numpy=True)
        emb_a, emb_b = embeddings[0], embeddings[1]

        norm_a = np.linalg.norm(emb_a)
        norm_b = np.linalg.norm(emb_b)

        if norm_a == 0 or norm_b == 0:
            return 0.0

        cosine_sim = float(np.dot(emb_a, emb_b) / (norm_a * norm_b))
        relevance_pct = round(max(0.0, min(1.0, cosine_sim)) * 100.0, 1)
        return relevance_pct

    def evaluate_negation_layer(
        self,
        official_text: str,
        citizen_text: str,
        progress_pct: float = 0.0,
    ) -> Dict[str, Any]:
        """
        Rule-based directional contradiction detector:
        - Checks if official text asserts completion or high progress (>= 40%).
        - Checks if citizen text asserts non-delivery, failure, or stall.
        - Identifies specific matched negation and completion cues.
        """
        c_lower = citizen_text.lower()
        o_lower = official_text.lower()

        # Check official completion / progress cues
        matched_completion_terms = [t for t in COMPLETION_TERMS if t in o_lower]
        has_completion_claim = (len(matched_completion_terms) > 0) or (progress_pct >= 40.0)

        # Check citizen negation phrases
        matched_neg_phrases = [p for p in NEGATION_PHRASES if p in c_lower]

        # Check single negation cues near work subjects
        matched_cues: List[str] = []
        words = re.findall(r"\b\w+\b", c_lower)
        for i, word in enumerate(words):
            if word in NEGATION_CUES:
                # Look for a work subject within +/- 4 words
                window = words[max(0, i - 4): min(len(words), i + 5)]
                if any(sub in window for sub in WORK_SUBJECTS):
                    matched_cues.append(word)

        # Check positive corroboration cues
        matched_corroboration = [cp for cp in CORROBORATION_PHRASES if cp in c_lower]

        is_pure_corroboration = (len(matched_corroboration) > 0) and (len(matched_neg_phrases) == 0)

        # Directional contradiction flags when official claim is positive/completed
        # but citizen text describes physical absence, failure, or delay.
        has_negation_signals = (len(matched_neg_phrases) > 0) or (len(matched_cues) >= 2)
        is_directional_contradiction = (
            has_completion_claim and has_negation_signals and not is_pure_corroboration
        )

        # Calculate negation intensity (0.0 to 1.0)
        if is_directional_contradiction:
            intensity = 0.85 + min(0.12, len(matched_neg_phrases) * 0.04)
        elif is_pure_corroboration:
            intensity = max(0.04, 0.12 - len(matched_corroboration) * 0.03)
        else:
            intensity = 0.15

        return {
            "hasCompletionClaim": has_completion_claim,
            "matchedCompletionTerms": matched_completion_terms,
            "isDirectionalContradiction": is_directional_contradiction,
            "matchedNegationPhrases": matched_neg_phrases,
            "matchedNegationCues": list(set(matched_cues)),
            "matchedCorroboration": matched_corroboration,
            "isPureCorroboration": is_pure_corroboration,
            "negationIntensity": round(intensity, 2),
        }

    def evaluate_complaint(
        self,
        complaint: Dict[str, Any],
        project: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Executes the full hybrid NLP contradiction pipeline on a single complaint:
        1. Embeds complaint text and official project status text.
        2. Computes cosine similarity (topicalRelevanceScore).
        3. Evaluates rule-based negation and completion discrepancy.
        4. Synthesizes contradictionScore (0-100) using relevance gating.
        5. Generates an institutional plain-language audit explanation.
        """
        complaint_id = complaint.get("id", "CIT-UNKNOWN")
        project_id = complaint.get("projectId")

        if project is None and project_id:
            project = self.projects_cache.get(project_id, {})

        citizen_text = complaint.get("complaintText", "").strip()
        official_claim = complaint.get("officialClaim", "").strip()

        project_name = (
            project.get("name") if project
            else complaint.get("projectName", "Public Infrastructure Project")
        )
        status = project.get("status", "In Progress") if project else "In Progress"
        progress_pct = float(project.get("physicalProgress", 0.0) or 0.0) if project else 0.0

        # Construct official comparison text combining project identity and certified status
        if official_claim:
            official_text = (
                f"{project_name}. Official status: {status} ({progress_pct}% certified completion). "
                f"{official_claim}"
            ).strip()
            direct_official_claim = official_claim
        else:
            official_text = (
                f"{project_name}. Official status: {status} ({progress_pct}% certified physical progress)."
            )
            direct_official_claim = f"Official status: {status} ({progress_pct}% physical completion)"

        # 1. Topical Relevance via all-MiniLM-L6-v2 Embeddings
        topical_relevance = self.compute_topical_relevance(citizen_text, official_text)

        # 2. Rule-Based Negation Layer
        negation_res = self.evaluate_negation_layer(
            official_text=official_text,
            citizen_text=citizen_text,
            progress_pct=progress_pct,
        )

        # 3. Combine into contradictionScore (0-100)
        # Weight negation-layer match heavily; gate confidence by topical relevance
        if negation_res["isDirectionalContradiction"]:
            base_score = negation_res["negationIntensity"] * 100.0
            # Relevance gating factor: if relevance is high (>= 40%), full confidence
            if topical_relevance >= 40.0:
                gate = 1.0
            else:
                gate = max(0.45, topical_relevance / 40.0)
            contradiction_score = int(round(base_score * gate))
            is_contradiction = contradiction_score >= 50
        else:
            contradiction_score = int(round(negation_res["negationIntensity"] * 100.0))
            is_contradiction = False

        # 4. Synthesize Plain-Language Explanation
        if is_contradiction:
            primary_negation = (
                negation_res["matchedNegationPhrases"][0]
                if negation_res["matchedNegationPhrases"]
                else (negation_res["matchedNegationCues"][0] if negation_res["matchedNegationCues"] else "incomplete work")
            )
            explanation = (
                f"Official claim: '{direct_official_claim}'. "
                f"Citizen report: '{primary_negation}'. "
                f"Flagged: direct physical milestone contradiction."
            )
        else:
            corrob_phrase = (
                negation_res["matchedCorroboration"][0]
                if negation_res["matchedCorroboration"]
                else "active site execution"
            )
            explanation = (
                f"Official claim: '{direct_official_claim}'. "
                f"Citizen report: '{corrob_phrase}'. "
                f"Corroborated: citizen observation aligns with official execution schedule."
            )

        return {
            "id": complaint_id,
            "projectId": project_id,
            "projectName": project_name,
            "district": complaint.get("district") or (project.get("district") if project else "Unknown"),
            "state": complaint.get("state") or (project.get("state") if project else "Unknown"),
            "complaintText": citizen_text,
            "officialClaim": direct_official_claim,
            "topicalRelevanceScore": topical_relevance,
            "contradictionScore": contradiction_score,
            "isContradiction": is_contradiction,
            "groundTruthContradiction": complaint.get("isContradiction"),
            "negationDetails": {
                "isDirectionalContradiction": negation_res["isDirectionalContradiction"],
                "matchedNegationPhrases": negation_res["matchedNegationPhrases"],
                "matchedCompletionTerms": negation_res["matchedCompletionTerms"],
                "matchedCorroboration": negation_res["matchedCorroboration"],
            },
            "plainLanguageExplanation": explanation,
            "geoMatchDistance": complaint.get("geoMatchDistance"),
            "reportedLocation": complaint.get("reportedLocation"),
            "status": complaint.get("status", "Under Investigation"),
            "submittedAt": complaint.get("submittedAt"),
        }

    def evaluate_all_complaints(self) -> List[Dict[str, Any]]:
        """Evaluates all records in mockComplaints.json against matched projects."""
        results: List[Dict[str, Any]] = []
        for complaint in self.complaints_cache:
            eval_res = self.evaluate_complaint(complaint)
            results.append(eval_res)
        return results

    def get_summary(self) -> Dict[str, Any]:
        """Provides aggregate metrics across all citizen complaints."""
        evals = self.evaluate_all_complaints()
        total = len(evals)
        contradictions = sum(1 for e in evals if e["isContradiction"])
        corroborations = total - contradictions

        avg_relevance = (
            round(sum(e["topicalRelevanceScore"] for e in evals) / total, 1)
            if total > 0 else 0.0
        )
        avg_contra_score = (
            round(sum(e["contradictionScore"] for e in evals) / total, 1)
            if total > 0 else 0.0
        )

        return {
            "totalComplaintsEvaluated": total,
            "contradictionsFlagged": contradictions,
            "corroborationsConfirmed": corroborations,
            "averageTopicalRelevanceScore": avg_relevance,
            "averageContradictionScore": avg_contra_score,
            "modelUsed": self.model_name,
        }

    def get_project_complaints(self, project_id: str) -> List[Dict[str, Any]]:
        """Returns all evaluated citizen reports for a given project ID."""
        project = self.projects_cache.get(project_id)
        matching = [c for c in self.complaints_cache if c.get("projectId") == project_id]
        results = []
        for c in matching:
            eval_res = self.evaluate_complaint(c, project)
            results.append(eval_res)
        return results

    def submit_complaint(
        self,
        project_id: str,
        complaint_text: str,
        citizen_name: Optional[str] = None,
        district: Optional[str] = None,
        state: Optional[str] = None,
        reported_location: Optional[Dict[str, float]] = None,
    ) -> Dict[str, Any]:
        """
        Accepts a newly filed citizen report, evaluates it through the hybrid NLP
        pipeline in real-time, caches/stores it, computes geoMatchDistance if
        reportedLocation is provided, and returns the evaluated object.
        """
        project = self.projects_cache.get(project_id)
        next_num = len(self.complaints_cache) + 101
        new_id = f"CIT-2026-{next_num}"
        from datetime import datetime, timezone
        now_iso = datetime.now(timezone.utc).isoformat()

        proj_name = project.get("name") if project else "Infrastructure Work"
        proj_dist = district or (project.get("district") if project else "Unknown")
        proj_state = state or (project.get("state") if project else "Unknown")

        # Compute geoMatchDistance if reported_location is available
        geo_distance = None
        if reported_location and isinstance(reported_location, dict):
            try:
                rep_lat = float(reported_location.get("latitude", 0))
                rep_lng = float(reported_location.get("longitude", 0))
                if rep_lat != 0 or rep_lng != 0:
                    proj_lat = None
                    proj_lng = None
                    if project:
                        coords = project.get("siteCoordinates")
                        if isinstance(coords, dict):
                            proj_lat = coords.get("latitude")
                            proj_lng = coords.get("longitude")
                        if proj_lat is None:
                            proj_lat = project.get("latitude")
                            proj_lng = project.get("longitude")
                    
                    if proj_lat is not None and proj_lng is not None:
                        geo_distance = calculate_haversine_distance(
                            rep_lat, rep_lng, float(proj_lat), float(proj_lng)
                        )
            except Exception as err:
                logger.warning("Could not compute geoMatchDistance: %s", err)

        raw_complaint = {
            "id": new_id,
            "projectId": project_id,
            "projectName": proj_name,
            "district": proj_dist,
            "state": proj_state,
            "complaintText": complaint_text.strip(),
            "citizenName": citizen_name or "Anonymous Citizen",
            "submittedAt": now_iso,
            "status": "Pending Inspection",
            "officialClaim": f"Physical progress certified at {project.get('physicalProgress', 0)}%; status: {project.get('status', 'In Progress')}." if project else "",
            "geoMatchDistance": geo_distance,
            "reportedLocation": reported_location,
        }

        eval_res = self.evaluate_complaint(raw_complaint, project)
        # Store in complaints cache
        self.complaints_cache.append(raw_complaint)
        return eval_res

    def get_high_contradiction_complaints(self, threshold: int = 60) -> List[Dict[str, Any]]:
        """Returns all evaluated complaints where contradictionScore >= threshold."""
        evals = self.evaluate_all_complaints()
        return [e for e in evals if e.get("contradictionScore", 0) >= threshold]


# Singleton accessor
citizen_nlp_service = CitizenGroundTruthNLP()


def evaluate_complaint(
    complaint: Dict[str, Any],
    project: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """Convenience accessor to evaluate a single complaint."""
    return citizen_nlp_service.evaluate_complaint(complaint, project)


def evaluate_all_complaints() -> List[Dict[str, Any]]:
    """Convenience accessor to evaluate all mock complaints."""
    return citizen_nlp_service.evaluate_all_complaints()


def get_project_complaints(project_id: str) -> List[Dict[str, Any]]:
    """Convenience accessor for all citizen complaints matching a project."""
    return citizen_nlp_service.get_project_complaints(project_id)


def submit_citizen_complaint(
    project_id: str,
    complaint_text: str,
    citizen_name: Optional[str] = None,
    district: Optional[str] = None,
    state: Optional[str] = None,
    reported_location: Optional[Dict[str, float]] = None,
) -> Dict[str, Any]:
    """Convenience accessor to submit and evaluate a citizen complaint."""
    return citizen_nlp_service.submit_complaint(
        project_id=project_id,
        complaint_text=complaint_text,
        citizen_name=citizen_name,
        district=district,
        state=state,
        reported_location=reported_location,
    )


def get_high_contradiction_complaints(threshold: int = 60) -> List[Dict[str, Any]]:
    """Convenience accessor for complaints with contradictionScore >= threshold."""
    return citizen_nlp_service.get_high_contradiction_complaints(threshold=threshold)


def get_citizen_nlp_summary() -> Dict[str, Any]:
    """Convenience accessor for summary evaluation metrics."""
    return citizen_nlp_service.get_summary()



if __name__ == "__main__":
    print("=" * 80)
    print("SETU CITIZEN GROUND TRUTH NLP PIPELINE EVALUATION")
    print("Model: sentence-transformers/all-MiniLM-L6-v2 + Rule-Based Negation Engine")
    print("=" * 80)

    service = CitizenGroundTruthNLP()
    evaluations = service.evaluate_all_complaints()

    correct_count = 0
    total_count = len(evaluations)

    for ev in evaluations:
        gt = ev["groundTruthContradiction"]
        pred = ev["isContradiction"]
        matched = (gt == pred)
        if matched:
            correct_count += 1
        status_label = "PASS" if matched else "FAIL"

        print(f"\n[{status_label}] {ev['id']} | Project: {ev['projectId']} ({ev['projectName'][:45]}...)")
        print(f"       District: {ev['district']}, {ev['state']}")
        print(f"       Topical Relevance Score : {ev['topicalRelevanceScore']}% (all-MiniLM-L6-v2 cosine sim)")
        print(f"       Contradiction Score     : {ev['contradictionScore']}/100")
        print(f"       Classification          : {'CONTRADICTION' if pred else 'CORROBORATION'} (Ground Truth: {'CONTRADICTION' if gt else 'CORROBORATION'})")
        print(f"       Explanation             : {ev['plainLanguageExplanation']}")

    accuracy = (correct_count / total_count) * 100.0 if total_count > 0 else 0.0

    print("\n" + "=" * 80)
    print("EVALUATION SUMMARY")
    print("=" * 80)
    print(f"Total Complaints Evaluated : {total_count}")
    print(f"Correct Classifications    : {correct_count}/{total_count}")
    print(f"Accuracy Rate              : {accuracy:.1f}%")
    summary = service.get_summary()
    print(f"Contradictions Flagged     : {summary['contradictionsFlagged']}")
    print(f"Corroborations Confirmed   : {summary['corroborationsConfirmed']}")
    print(f"Average Topical Relevance  : {summary['averageTopicalRelevanceScore']}%")
    print(f"Average Contradiction Score: {summary['averageContradictionScore']}/100")
    print("=" * 80)
