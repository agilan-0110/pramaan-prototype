"""
Financial Risk Engine Service for PRAMAAN.

Detects anomalous expenditure pacing, disbursement-to-milestone gaps,
and project schedule slippage using:
1. scikit-learn IsolationForest anomaly detection model.
2. Anomaly score mapping to 0-100 riskScore and riskLevel buckets (LOW, MEDIUM, HIGH, CRITICAL).
3. SHAP (KernelExplainer) explainability for feature contribution attribution.
4. Plain-language audit explanation synthesis.
5. In-memory caching for sub-millisecond demo performance.
"""

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import numpy as np
from sklearn.ensemble import IsolationForest
import shap

# Path to mock data store
DATA_DIR = Path(__file__).resolve().parent.parent / "data"
PROJECTS_FILE = DATA_DIR / "mockProjects.json"

# Feature configuration
FEATURE_DEFINITIONS = [
    {
        "key": "sanctionedAmount",
        "displayName": "Sanctioned Budget",
        "unit": "INR",
        "description": "Total sanctioned project outlay",
    },
    {
        "key": "expenditure",
        "displayName": "Cumulative Expenditure",
        "unit": "INR",
        "description": "Total cumulative fund outflow to date",
    },
    {
        "key": "physicalProgress",
        "displayName": "Physical Milestone Progress",
        "unit": "%",
        "description": "Certified physical completion percentage",
    },
    {
        "key": "financialProgress",
        "displayName": "Financial Disbursement Progress",
        "unit": "%",
        "description": "Cumulative fund release percentage against sanctioned outlay",
    },
    {
        "key": "progressMismatch",
        "displayName": "Disbursement-to-Progress Gap",
        "unit": "%",
        "description": "Disbursement percentage minus physical completion percentage",
    },
    {
        "key": "daysDelayed",
        "displayName": "Milestone Schedule Delay",
        "unit": "days",
        "description": "Days delayed beyond approved administrative timeline",
    },
]

FEATURE_KEYS = [f["key"] for f in FEATURE_DEFINITIONS]


def extract_features_from_project(project: Dict[str, Any]) -> List[float]:
    """Extracts the 6 numeric features from a project record."""
    fin = float(project.get("financialProgress", 0.0) or 0.0)
    phys = float(project.get("physicalProgress", 0.0) or 0.0)
    mismatch = fin - phys
    sanc = float(project.get("sanctionedAmount", 0.0) or 0.0)
    exp = float(project.get("expenditure", 0.0) or 0.0)
    delay = float(project.get("daysDelayed", 0.0) or 0.0)

    return [sanc, exp, phys, fin, mismatch, delay]


def determine_risk_level(risk_score: int) -> str:
    """
    Classifies risk score into statutory oversight tiers:
    - LOW: < 31
    - MEDIUM: 31 - 60
    - HIGH: 61 - 80
    - CRITICAL: 81+
    """
    if risk_score < 31:
        return "LOW"
    elif risk_score <= 60:
        return "MEDIUM"
    elif risk_score <= 80:
        return "HIGH"
    else:
        return "CRITICAL"


def synthesize_plain_explanation(
    features: Dict[str, float],
    shap_dict: Dict[str, float],
    risk_level: str,
) -> str:
    """
    Generates an institutional plain-language audit explanation
    derived from the top SHAP-contributing anomaly features.
    """
    mismatch = features.get("progressMismatch", 0.0)
    delay = int(features.get("daysDelayed", 0))
    phys = features.get("physicalProgress", 0.0)
    fin = features.get("financialProgress", 0.0)
    exp = int(features.get("expenditure", 0))
    sanc = int(features.get("sanctionedAmount", 0))

    if risk_level == "LOW":
        return "Project execution metrics conform to standard financial pacing and milestone schedules."

    # Identify features with positive SHAP contribution (pushed toward anomaly)
    pos_features = sorted(
        [(k, v) for k, v in shap_dict.items() if v > 0],
        key=lambda item: item[1],
        reverse=True,
    )
    top_keys = [k for k, _ in pos_features[:2]]

    reasons: List[str] = []

    if "progressMismatch" in top_keys and mismatch > 10.0:
        reasons.append(
            f"a {mismatch:.1f}% gap between financial disbursement ({fin:.1f}%) and certified physical progress ({phys:.1f}%)"
        )
    elif "physicalProgress" in top_keys and phys < 25.0 and fin > 40.0:
        reasons.append(
            f"severely lagging physical completion ({phys:.1f}%) despite substantial fund utilization ({fin:.1f}%)"
        )

    if "daysDelayed" in top_keys and delay > 30:
        reasons.append(f"a milestone execution delay of {delay} days")

    if "expenditure" in top_keys and exp > (sanc * 0.75) and phys < 50.0:
        reasons.append(
            f"accelerated budget exhaustion (₹{exp:,} spent with only {phys:.1f}% physical completion)"
        )

    if reasons:
        return "Flagged due to " + " alongside ".join(reasons) + "."

    # Fallback to secondary metric thresholds
    if delay > 45:
        return f"Elevated risk driven by a recorded project milestone delay of {delay} days."
    elif mismatch > 15.0:
        return f"Elevated risk driven by a {mismatch:.1f}% fund disbursement lead over physical progress."
    else:
        return "Moderate statistical anomaly detected across expenditure pacing and milestone delivery."


class FinancialRiskEngine:
    """
    Singleton engine managing IsolationForest model, SHAP KernelExplainer,
    and pre-computed audit cache for all projects.
    """

    def __init__(self):
        self.is_initialized = False
        self.model: Optional[IsolationForest] = None
        self.explainer: Optional[shap.KernelExplainer] = None
        self.background_data: Optional[np.ndarray] = None
        self.min_raw_score: float = -0.15
        self.max_raw_score: float = 0.15
        self.cache: Dict[str, Dict[str, Any]] = {}
        self.projects: List[Dict[str, Any]] = []

    def initialize(self) -> None:
        """Loads data, trains IsolationForest, initializes SHAP explainer, and pre-caches evaluations."""
        if not PROJECTS_FILE.exists():
            return

        with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
            self.projects = json.load(f)

        if not self.projects:
            return

        # Build feature matrix
        matrix = [extract_features_from_project(p) for p in self.projects]
        X = np.array(matrix, dtype=np.float64)

        # Train IsolationForest model once at startup
        self.model = IsolationForest(
            n_estimators=150,
            contamination=0.20,
            random_state=42,
        )
        self.model.fit(X)

        raw_scores = self.model.decision_function(X)
        self.min_raw_score = float(raw_scores.min())
        self.max_raw_score = float(raw_scores.max())

        # Select background dataset for SHAP KernelExplainer
        bg_size = min(20, len(X))
        self.background_data = shap.sample(X, bg_size, random_state=42)

        def anomaly_predict_fn(data: np.ndarray) -> np.ndarray:
            # Negative decision_function: higher value = more anomalous
            return -self.model.decision_function(data)

        self.explainer = shap.KernelExplainer(anomaly_predict_fn, self.background_data)

        # Pre-evaluate and cache all projects for instant response
        for i, project in enumerate(self.projects):
            eval_result = self._evaluate_project_internal(project, X[i:i+1], raw_scores[i])
            self.cache[project["id"]] = eval_result

        self.is_initialized = True

    def _evaluate_project_internal(
        self,
        project: Dict[str, Any],
        x_row: np.ndarray,
        raw_score: float,
    ) -> Dict[str, Any]:
        """Internal computation of risk score, SHAP values, and plain explanation."""
        # Normalize raw score: lower decision score = more anomalous
        span = max(self.max_raw_score - self.min_raw_score, 1e-6)
        norm_score = (self.max_raw_score - raw_score) / span
        anomaly_score = round(float(np.clip(norm_score, 0.0, 1.0)), 3)

        # Map to 0-100 risk score
        risk_score = int(round(10.0 + norm_score * 85.0))
        risk_score = max(0, min(100, risk_score))

        risk_level = determine_risk_level(risk_score)

        # Extract features dictionary
        feat_vals = extract_features_from_project(project)
        features_dict = dict(zip(FEATURE_KEYS, feat_vals))

        # Compute SHAP values via KernelExplainer
        shap_values_array = self.explainer.shap_values(x_row, nsamples=50, silent=True)[0]
        shap_dict = {
            k: round(float(v), 4)
            for k, v in zip(FEATURE_KEYS, shap_values_array)
        }

        # Calculate impact percentages and ranked contributions
        total_abs_shap = sum(abs(v) for v in shap_values_array) or 1e-6
        contributions = []
        for feat_def in FEATURE_DEFINITIONS:
            key = feat_def["key"]
            val = features_dict[key]
            sv = shap_dict[key]
            impact_pct = round((abs(sv) / total_abs_shap) * 100.0, 1)
            direction = "INCREASES_RISK" if sv > 0 else "DECREASES_RISK"

            contributions.append({
                "feature": key,
                "displayName": feat_def["displayName"],
                "value": val,
                "unit": feat_def["unit"],
                "shapValue": sv,
                "contributionDirection": direction,
                "impactPercentage": impact_pct,
            })

        # Sort contributions: positive SHAP (increasing anomaly) first
        contributions.sort(key=lambda c: c["shapValue"], reverse=True)

        plain_explanation = synthesize_plain_explanation(
            features=features_dict,
            shap_dict=shap_dict,
            risk_level=risk_level,
        )

        return {
            "projectId": project.get("id"),
            "projectName": project.get("name"),
            "category": project.get("category"),
            "state": project.get("state"),
            "district": project.get("district"),
            "constituency": project.get("constituency"),
            "mpName": project.get("mpName"),
            "riskScore": risk_score,
            "riskLevel": risk_level,
            "anomalyScore": anomaly_score,
            "rawModelScore": round(float(raw_score), 4),
            "modelType": "IsolationForest",
            "explainabilityMethod": "SHAP (KernelExplainer)",
            "features": features_dict,
            "shapValues": shap_dict,
            "topContributingFeatures": contributions,
            "plainLanguageExplanation": plain_explanation,
            "evaluatedAt": datetime.now(timezone.utc).isoformat(),
        }

    def evaluate_project(self, project_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves project risk evaluation from cache or evaluates on the fly."""
        if not self.is_initialized:
            self.initialize()

        # Check cache
        if project_id in self.cache:
            return self.cache[project_id]

        # If not in cache, find project and evaluate dynamically
        for p in self.projects:
            if p.get("id") == project_id:
                x_row = np.array([extract_features_from_project(p)], dtype=np.float64)
                raw_score = float(self.model.decision_function(x_row)[0])
                result = self._evaluate_project_internal(p, x_row, raw_score)
                self.cache[project_id] = result
                return result

        return None

    def get_summary(self) -> Dict[str, Any]:
        """Provides portfolio-level risk statistics across all monitored projects."""
        if not self.is_initialized:
            self.initialize()

        evals = list(self.cache.values())
        total = len(evals)

        low_count = sum(1 for e in evals if e["riskLevel"] == "LOW")
        med_count = sum(1 for e in evals if e["riskLevel"] == "MEDIUM")
        high_count = sum(1 for e in evals if e["riskLevel"] == "HIGH")
        crit_count = sum(1 for e in evals if e["riskLevel"] == "CRITICAL")

        avg_score = round(sum(e["riskScore"] for e in evals) / total, 1) if total > 0 else 0.0

        return {
            "totalProjectsMonitored": total,
            "averageRiskScore": avg_score,
            "distributionByLevel": {
                "LOW": low_count,
                "MEDIUM": med_count,
                "HIGH": high_count,
                "CRITICAL": crit_count,
            },
            "modelMetadata": {
                "algorithm": "IsolationForest",
                "estimatorCount": 150,
                "contamination": 0.20,
                "explainabilityMethod": "SHAP (KernelExplainer)",
                "featuresUsed": FEATURE_KEYS,
            },
            "generatedAt": datetime.now(timezone.utc).isoformat(),
        }

    def get_high_risk_projects(self, min_score: int = 61) -> List[Dict[str, Any]]:
        """Returns all projects with riskScore >= min_score (HIGH and CRITICAL)."""
        if not self.is_initialized:
            self.initialize()

        filtered = [e for e in self.cache.values() if e["riskScore"] >= min_score]
        filtered.sort(key=lambda e: e["riskScore"], reverse=True)
        return filtered


# Global singleton instance initialized at module load
risk_engine = FinancialRiskEngine()
risk_engine.initialize()


def get_project_risk(project_id: str) -> Optional[Dict[str, Any]]:
    """Convenience accessor for project risk evaluation."""
    return risk_engine.evaluate_project(project_id)


def get_risk_summary() -> Dict[str, Any]:
    """Convenience accessor for portfolio risk summary."""
    return risk_engine.get_summary()


def get_high_risk_projects(min_score: int = 61) -> List[Dict[str, Any]]:
    """Convenience accessor for high risk project list."""
    return risk_engine.get_high_risk_projects(min_score)
