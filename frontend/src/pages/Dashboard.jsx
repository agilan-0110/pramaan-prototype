import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import mockOverview from '../../../backend/app/data/mockOverview.json';
import mockProjects from '../../../backend/app/data/mockProjects.json';
import { PRIORITY_ALERTS, getDashboardHtml } from './dashboardData.js';

export { getDashboardHtml };

// Compute real aggregated stat values from mockProjects
const totalProjectsCount = mockProjects.length;
const highRiskCount = mockProjects.filter(
  (p) => (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH'
).length;
const complianceViolationsCount = mockProjects.filter(
  (p) => p.costOverrun || p.duplicateRisk || p.paymentProgressMismatch || (p.complianceFlags && p.complianceFlags.length > 0)
).length;
const pendingAlertsCount = mockOverview?.summary?.totalActiveAlerts != null 
  ? mockOverview.summary.totalActiveAlerts 
  : 18;

/**
 * Top 4 Stat Cards computed from mockProjects.json & mockOverview.json:
 * Total Projects, High Risk Count, Compliance Violations, Pending Alerts
 */
export const summaryStats = [
  {
    label: 'Total Projects',
    value: String(totalProjectsCount),
    meta: 'All active jurisdictions',
    isAccent: false,
  },
  {
    label: 'High Risk Count',
    value: String(highRiskCount),
    meta: 'Immediate audit review required',
    isAccent: true,
  },
  {
    label: 'Compliance Violations',
    value: String(complianceViolationsCount),
    meta: 'Fund-splitting & anomaly flags',
    isAccent: false,
  },
  {
    label: 'Pending Alerts',
    value: String(pendingAlertsCount),
    meta: 'Awaiting authority response',
    isAccent: false,
  },
];

// Aliases for compatibility
export const dummyProjects = mockProjects;
export const projects = mockProjects;

// Sort projects with high risk first for auditor review workflow
const sortedProjects = [...mockProjects].sort((a, b) => b.riskScore - a.riskScore);

/**
 * React JSX Dashboard Component with RBAC Jurisdictional Scoping.
 */
export default function Dashboard() {
  const [liveAlerts, setLiveAlerts] = useState(null);
  const [alertFilter, setAlertFilter] = useState('ALL');
  const [projectsList, setProjectsList] = useState(mockProjects);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let active = true;
    const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('setu_auth_token') : null;
    const rawUser = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('setu_auth_user') : null;
    if (rawUser) {
      try {
        setCurrentUser(JSON.parse(rawUser));
      } catch {}
    }

    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // 1. Fetch server-side scoped projects
    async function loadProjects() {
      try {
        const res = await fetch('http://127.0.0.1:8000/projects', { headers });
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data)) {
            setProjectsList(data);
          }
        }
      } catch (err) {
        // Fallback to client-side scope filter if server is offline
        if (rawUser) {
          try {
            const user = JSON.parse(rawUser);
            if (user.accessScope === 'district_all' || user.district) {
              setProjectsList(mockProjects.filter(p => p.district?.toLowerCase() === (user.district || '').toLowerCase()));
            } else if (user.accessScope === 'state_rollup' || user.state) {
              setProjectsList(mockProjects.filter(p => p.state?.toLowerCase() === (user.state || '').toLowerCase()));
            } else if (user.accessScope === 'agency_assigned_only' || user.roleId?.includes('agency')) {
              setProjectsList(mockProjects.filter(p => {
                if (user.district && p.district?.toLowerCase() !== user.district.toLowerCase()) return false;
                if (user.agency) {
                  const uAgency = user.agency.toLowerCase();
                  const pAgency = (p.implementingAgency || '').toLowerCase();
                  if (pAgency.includes(uAgency) || uAgency.includes(pAgency)) return true;
                  const baseU = uAgency.split('—')[0].split('-')[0].trim();
                  const baseP = pAgency.split('—')[0].split('-')[0].trim();
                  if (baseU && baseP.includes(baseU)) return true;
                }
                return false;
              }));
            }
          } catch {}
        }
      }
    }

    // 2. Fetch scoped alerts
    async function loadAlerts() {
      try {
        const res = await fetch('http://127.0.0.1:8000/alerts?limit=25', { headers });
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data)) {
            setLiveAlerts(data);
          }
        }
      } catch (err) {
        // Fallback to embedded alerts
      }
    }

    loadProjects();
    loadAlerts();

    return () => {
      active = false;
    };
  }, []);

  const allowedProjectIds = new Set(projectsList.map((p) => p.id));
  const rawAlerts = liveAlerts || PRIORITY_ALERTS;
  const alerts = rawAlerts.filter((a) => !a.projectId || allowedProjectIds.has(a.projectId));
  const filteredAlerts = alertFilter === 'ALL'
    ? alerts
    : alerts.filter((a) => a.alertType === alertFilter);

  // Dynamically compute scoped stats from current projectsList
  const dynamicTotal = projectsList.length;
  const dynamicHighRisk = projectsList.filter(
    (p) => (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH'
  ).length;
  const dynamicCompliance = projectsList.filter(
    (p) => p.costOverrun || p.duplicateRisk || p.paymentProgressMismatch || (p.complianceFlags && p.complianceFlags.length > 0)
  ).length;
  const dynamicAlertsCount = filteredAlerts.length;

  const currentStats = [
    {
      label: 'Scoped Projects',
      value: String(dynamicTotal),
      meta: currentUser ? (currentUser.district || currentUser.state || 'National Portfolio') : 'All active jurisdictions',
      isAccent: false,
    },
    {
      label: 'High Risk Count',
      value: String(dynamicHighRisk),
      meta: 'Immediate audit review required',
      isAccent: true,
    },
    {
      label: 'Compliance Violations',
      value: String(dynamicCompliance),
      meta: 'Fund-splitting & anomaly flags',
      isAccent: false,
    },
    {
      label: 'Active Alerts',
      value: String(dynamicAlertsCount),
      meta: 'Awaiting authority response',
      isAccent: false,
    },
  ];

  const sortedCurrentProjects = [...projectsList].sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));

  return (
    <div className="setu-dashboard">
      {/* Page Header */}
      <div className="setu-page-header">
        <h1 className="setu-page-title">Projects Audit Dashboard</h1>
        <p className="setu-page-desc">
          {currentUser
            ? `Logged in: ${currentUser.role || 'Official'} — Scope: ${currentUser.jurisdiction || currentUser.district || 'National Oversight'}`
            : 'National Monitoring & Risk Engine Overview'}
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="setu-stat-grid">
        {currentStats.map((stat) => (
          <div key={stat.label} className="setu-card">
            <span className="setu-card-label">{stat.label}</span>
            <span className={`setu-card-value ${stat.isAccent ? 'setu-card-value-accent' : ''}`}>
              {stat.value}
            </span>
            <span className="setu-card-meta">{stat.meta}</span>
          </div>
        ))}
      </div>

      {/* System Alerts Feed (Surfacing CITIZEN_CONTRADICTION) */}
      <div className="setu-alert-section">
        <div className="setu-alert-section-header">
          <div>
            <h2 className="setu-table-title">High-Priority Audit Alerts & Discrepancies ({filteredAlerts.length})</h2>
            <span className="setu-table-subtitle">Surfacing ground-truth citizen contradictions, duplicate tenders, and high-risk anomalies</span>
          </div>
          <div className="setu-alert-filter-group">
            <button
              type="button"
              className={`setu-filter-pill ${alertFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setAlertFilter('ALL')}
            >
              All Alerts
            </button>
            <button
              type="button"
              className={`setu-filter-pill ${alertFilter === 'CITIZEN_CONTRADICTION' ? 'active' : ''}`}
              onClick={() => setAlertFilter('CITIZEN_CONTRADICTION')}
            >
              Citizen Contradictions
            </button>
            <button
              type="button"
              className={`setu-filter-pill ${alertFilter === 'DUPLICATE_WORK' ? 'active' : ''}`}
              onClick={() => setAlertFilter('DUPLICATE_WORK')}
            >
              Duplicate Work
            </button>
            <button
              type="button"
              className={`setu-filter-pill ${alertFilter === 'FINANCIAL_RISK' ? 'active' : ''}`}
              onClick={() => setAlertFilter('FINANCIAL_RISK')}
            >
              Financial Risk
            </button>
          </div>
        </div>

        <div className="setu-alert-list">
          {filteredAlerts.slice(0, 5).map((a) => {
            const isCitizen = a.alertType === 'CITIZEN_CONTRADICTION';
            const isDuplicate = a.alertType === 'DUPLICATE_WORK';
            const isFinancial = a.alertType === 'FINANCIAL_RISK' || a.alertType === 'PAYMENT_MISMATCH';
            const isCompliance = a.alertType === 'COMPLIANCE_VIOLATION' || a.alertType === 'COST_OVERRUN' || a.alertType === 'CHRONIC_DELAY';
            const isSeasonal = a.alertType === 'SEASONAL_ANOMALY';

            const cardModifier = isCitizen
              ? 'setu-alert-card-citizen'
              : isDuplicate
              ? 'setu-alert-card-duplicate'
              : isFinancial
              ? 'setu-alert-card-financial'
              : isCompliance
              ? 'setu-alert-card-compliance'
              : isSeasonal
              ? 'setu-alert-card-seasonal'
              : '';

            const typeClass = isCitizen
              ? 'setu-type-citizen'
              : isDuplicate
              ? 'setu-type-duplicate'
              : isFinancial
              ? 'setu-type-financial'
              : isCompliance
              ? 'setu-type-compliance'
              : 'setu-type-seasonal';

            const typeLabel = isCitizen
              ? 'Citizen Contradiction'
              : isDuplicate
              ? 'Duplicate Work'
              : isFinancial
              ? 'Financial Risk'
              : isCompliance
              ? 'Compliance Violation'
              : 'Seasonal Anomaly';

            const sevLower = (a.severity || 'WARNING').toLowerCase();
            const sevClass = sevLower === 'critical'
              ? 'setu-severity-critical'
              : sevLower === 'high'
              ? 'setu-severity-high'
              : sevLower === 'warning'
              ? 'setu-severity-warning'
              : 'setu-severity-low';

            const sourceLabel = a.sourceModule === 'citizen'
              ? 'Citizen Ground Truth NLP Engine'
              : a.sourceModule === 'duplicate'
              ? 'Duplicate Work Detection Engine'
              : a.sourceModule === 'risk'
              ? 'Financial Risk & SHAP Engine'
              : a.sourceModule === 'compliance'
              ? 'Statutory Compliance Rule Engine'
              : 'Trend & March-Rush Analysis Engine';

            return (
              <div key={a.id} className={`setu-alert-card ${cardModifier}`}>
                <div className="setu-alert-header">
                  <div className="setu-alert-badges">
                    <span className={sevClass}>{a.severity || 'WARNING'}</span>
                    <span className={`setu-type-badge ${typeClass}`}>{typeLabel}</span>
                    <span style={{ fontFamily: 'var(--setu-font-mono)', fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
                      {a.id}
                    </span>
                  </div>
                  <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
                    {a.timestamp ? a.timestamp.split('T')[0] : '2026-08'}
                  </span>
                </div>

                <h3 className="setu-alert-title">{a.title}</h3>

                <a href={`#/project/${a.projectId}`} className="setu-alert-project-ref">
                  <strong>{a.projectName}</strong> ({a.projectId}) • {a.district}, {a.state} →
                </a>

                <p className="setu-alert-desc">
                  {a.description}
                </p>

                {a.recommendedAction && (
                  <div className="setu-alert-action-box">
                    <strong>Recommended Auditor Action:</strong> {a.recommendedAction}
                  </div>
                )}

                <div className="setu-alert-footer">
                  <span className="setu-alert-source">Source: {sourceLabel}</span>
                  <a
                    href={`#/project/${a.projectId}`}
                    className="setu-btn-primary"
                    style={{ padding: '2px 10px', fontSize: 'var(--setu-font-size-caption)' }}
                  >
                    Inspect Project Record
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Projects Audit Table */}
      <div className="setu-table-card">
        <div className="setu-table-card-header">
          <div>
            <h2 className="setu-table-title">Audited Projects ({sortedCurrentProjects.length})</h2>
            <span className="setu-table-subtitle">
              {currentUser && currentUser.district
                ? `Displaying only works within ${currentUser.district} District Authority jurisdiction`
                : currentUser && currentUser.state
                ? `Displaying only works within ${currentUser.state} State Nodal jurisdiction`
                : 'Recent priority projects flagged by Risk & Contradiction engines'}
            </span>
          </div>
        </div>

        <div className="setu-table-container">
          <table className="setu-table">
            <thead>
              <tr>
                <th>Project Name & ID</th>
                <th>District</th>
                <th>Category</th>
                <th>Status</th>
                <th>Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedCurrentProjects.map((p) => {
                const isHighRisk = (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH';
                const badgeClass = isHighRisk ? 'setu-badge-risk-high' : 'setu-badge-risk-neutral';
                const riskLevel = p.riskLevel || (p.riskScore >= 60 ? 'HIGH' : p.riskScore >= 40 ? 'MED' : 'LOW');

                return (
                  <tr
                    key={p.id}
                    className="setu-clickable-row"
                    data-project-id={p.id}
                    onClick={() => { window.location.hash = `#/project/${p.id}`; }}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <a href={`#/project/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="setu-project-name">{p.name}</div>
                        <div className="setu-project-id">{p.id}</div>
                      </a>
                    </td>
                    <td>{p.district}</td>
                    <td>{p.category}</td>
                    <td>
                      <span className="setu-status-tag">{p.status}</span>
                    </td>
                    <td>
                      <span className={`setu-badge ${badgeClass}`}>
                        {p.riskScore} ({riskLevel})
                      </span>
                    </td>
                  </tr>
                );
              })}
              {sortedCurrentProjects.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--setu-color-text-secondary)' }}>
                    No projects found within your authorized jurisdiction.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
