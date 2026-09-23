"""
SETU Backend API Application.

Main entry point for the SETU Institutional Monitoring & Contradiction Detection API.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.compliance import router as compliance_router
from app.routers.duplicate import router as duplicate_router
from app.routers.risk import router as risk_router
from app.routers.trend import router as trend_router
from app.routers.predictive import router as predictive_router
from app.routers.alerts import router as alerts_router
from app.routers.citizen_nlp import router as citizen_nlp_router
from app.routers.auth import router as auth_router
from app.routers.projects import router as projects_router
from app.routers.audit import router as audit_router
from app.routers.dashboard import router as dashboard_router

app = FastAPI(
    title="SETU Compliance & Contradiction Detection Platform API",
    description="Statutory Compliance Rule Engine, Trend Analysis, and Predictive Monitoring for MPLADS Public Works.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router)
app.include_router(compliance_router)
app.include_router(duplicate_router)
app.include_router(risk_router)
app.include_router(trend_router)
app.include_router(predictive_router)
app.include_router(alerts_router)
app.include_router(citizen_nlp_router)
app.include_router(projects_router)
app.include_router(audit_router)
app.include_router(dashboard_router)


@app.get("/", tags=["General"])
def root():
    return {
        "service": "SETU Compliance & Contradiction Detection API",
        "status": "online",
        "version": "1.0.0",
        "endpoints": {
            "alerts": "/alerts",
            "alertsSummary": "/alerts/summary",
            "alertDetail": "/alerts/{id}",
            "projectCompliance": "/projects/{id}/compliance",
            "complianceSummary": "/projects/compliance/summary",
            "flaggedProjects": "/projects/compliance/violations",
            "projectDuplicates": "/projects/{id}/duplicates",
            "duplicatesSummary": "/projects/duplicates/summary",
            "duplicatePairs": "/projects/duplicates/pairs",
            "projectRisk": "/projects/{id}/risk",
            "riskSummary": "/projects/risk/summary",
            "highRiskProjects": "/projects/risk/high-risk",
            "trendYearly": "/trends/expenditure/yearly",
            "trendState": "/trends/expenditure/by-state",
            "trendDistrict": "/trends/expenditure/by-district",
            "trendQuarterly": "/trends/expenditure/quarterly",
            "trendFundDumping": "/trends/fund-dumping",
            "projectForecast": "/projects/{id}/forecast",
            "predictiveSummary": "/predictive/portfolio-summary",
            "atRiskProjects": "/predictive/at-risk-projects",
            "projectCitizenReports": "/projects/{id}/citizen-reports",
            "submitCitizenReport": "POST /projects/{id}/citizen-reports",
            "allCitizenReports": "/projects/citizen-reports/all",
            "documentation": "/docs",
        },
    }


@app.get("/health", tags=["General"])
def health_check():
    return {"status": "healthy", "service": "setu-backend"}
