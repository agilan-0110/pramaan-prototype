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
  const [dashboardStats, setDashboardStats] = useState(null);

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
            if (!user.role?.toLowerCase().includes('implementing') && (user.accessScope === 'constituency_only' || user.roleId === 'mp_office' || /\bmp\b/i.test(user.role || ''))) {
              const userConst = (user.constituency || '').toLowerCase();
              setProjectsList(mockProjects.filter(p => (p.constituency || '').toLowerCase() === userConst));
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
            } else if (user.accessScope === 'district_all' || (user.district && !user.accessScope?.includes('national'))) {
              setProjectsList(mockProjects.filter(p => p.district?.toLowerCase() === (user.district || '').toLowerCase()));
            } else if (user.accessScope === 'state_rollup' || user.state) {
              setProjectsList(mockProjects.filter(p => p.state?.toLowerCase() === (user.state || '').toLowerCase()));
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

    // 3. Fetch role-scoped live statistics
    async function loadStats() {
      try {
        const res = await fetch('http://127.0.0.1:8000/dashboard/me', { headers });
        if (res.ok) {
          const data = await res.json();
          if (active) {
            setDashboardStats(data);
          }
        }
      } catch (err) {
        // Offline fallback
      }
    }

    loadProjects();
    loadAlerts();
    loadStats();

    return () => {
      active = false;
    };
  }, []);

  const roleLower = (currentUser?.role || '').toLowerCase();
  const roleId = (currentUser?.roleId || '').toLowerCase();
  const accessScope = currentUser?.accessScope || '';

  const isAgencyRole = accessScope === 'agency_assigned_only' || roleId.includes('agency') || roleLower.includes('implementing');
  const isMpRole = !isAgencyRole && (accessScope === 'constituency_only' || roleId === 'mp_office' || /\bmp\b/i.test(roleLower) || roleLower.includes('member of parliament'));
  const isAuditorRole = accessScope === 'statutory_audit_all' || roleId === 'auditor_cag' || roleLower.includes('auditor') || roleLower.includes('cag');
  const isMospiRole = !isAuditorRole && (accessScope === 'national_all' || roleId === 'mospi_officer' || roleLower.includes('mospi') || roleLower.includes('cna'));
  const isStateRole = accessScope === 'state_rollup' || roleId === 'state_nodal' || (roleLower.includes('state') && !roleLower.includes('district'));
  const isDistrictRole = accessScope === 'district_all' || roleId.includes('district') || roleLower.includes('district');

  const allowedProjectIds = new Set(projectsList.map((p) => p.id));
  const rawAlerts = liveAlerts || PRIORITY_ALERTS;

  // Tiered alerts pool calculation per ROLES.md & Rule 1-3
  let tieredAlerts = [];
  let dynamicAlertsCount = 0;

  if (isAgencyRole || isMpRole) {
    tieredAlerts = [];
    dynamicAlertsCount = 0;
  } else if (isMospiRole) {
    // MoSPI sees only CRITICAL alerts nationwide (Rule 1 & Rule 5)
    tieredAlerts = rawAlerts.filter((a) => a.severity === 'CRITICAL');
    dynamicAlertsCount = tieredAlerts.length;
  } else if (isStateRole) {
    // State Nodal sees CRITICAL (full detail) + HIGH (aggregate district summaries)
    // LOW/MEDIUM excluded entirely
    tieredAlerts = rawAlerts.filter(
      (a) => (a.severity === 'CRITICAL' || a.severity === 'HIGH') &&
             (!currentUser?.state || !a.state || a.state.toLowerCase() === currentUser.state.toLowerCase())
    );
    dynamicAlertsCount = tieredAlerts.reduce((acc, a) => {
      if (a.id && a.id.startsWith('ALT-AGG-HIGH')) {
        const m = a.title?.match(/^(\d+)/);
        return acc + (m ? parseInt(m[1], 10) : 1);
      }
      return acc + 1;
    }, 0);
  } else if (isDistrictRole) {
    // District Authority sees all severities in their district
    tieredAlerts = rawAlerts.filter(
      (a) => !currentUser?.district || !a.district || a.district.toLowerCase() === currentUser.district.toLowerCase()
    );
    dynamicAlertsCount = tieredAlerts.length;
  } else {
    // Auditor / CAG sees all severities nationwide
    tieredAlerts = rawAlerts;
    dynamicAlertsCount = tieredAlerts.length;
  }

  const filteredAlerts = alertFilter === 'ALL'
    ? tieredAlerts
    : tieredAlerts.filter((a) => a.alertType === alertFilter);

  // Dynamically compute scoped stats from server dashboardStats and projectsList
  const serverSummary = dashboardStats?.summary;
  const dynamicTotal = serverSummary?.totalProjects ?? projectsList.length;
  const dynamicHighRisk = serverSummary?.criticalAlerts ?? projectsList.filter(
    (p) => (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH'
  ).length;
  const dynamicAlerts = serverSummary?.activeAlerts ?? dynamicAlertsCount;
  const effectiveUtilPct = serverSummary?.fundsUtilizedPct;

  let currentStats = [];

  if (isMpRole) {
    const activeWorksCount = projectsList.filter(
      (p) => p.status === 'In Progress' || p.status?.includes('Progress') || p.status?.includes('Approved') || p.status?.includes('Proposed')
    ).length;
    const completedWorksCount = projectsList.filter((p) => p.status === 'Completed').length;
    const underReviewCount = (dashboardStats?.flagsByStatus && dashboardStats.flagsByStatus.find(f => f.name === 'Flag Present'))
      ? dashboardStats.flagsByStatus.find(f => f.name === 'Flag Present').value
      : projectsList.filter((p) => p.flagPresent || p.hasOpenFlags || (p.riskScore && p.riskScore >= 60) || p.costOverrun).length;

    currentStats = [
      {
        label: 'Constituency Projects',
        value: String(dynamicTotal),
        meta: currentUser?.constituency ? `${currentUser.constituency} Works` : 'Constituency Portfolio',
        isAccent: false,
      },
      {
        label: 'Active Executions',
        value: String(activeWorksCount),
        meta: effectiveUtilPct != null ? `${effectiveUtilPct}% Fund Utilization` : 'Ongoing physical execution',
        isAccent: false,
      },
      {
        label: 'Completed Schemes',
        value: String(completedWorksCount),
        meta: 'Public utility assets delivered',
        isAccent: false,
      },
      {
        label: 'Under Audit Scrutiny',
        value: String(underReviewCount),
        meta: 'Flags under administrative review',
        isAccent: underReviewCount > 0,
      },
    ];
  } else if (isAgencyRole) {
    const avgPhysProg = Math.round(projectsList.reduce((s, p) => s + (p.physicalProgress || 0), 0) / (dynamicTotal || 1));
    const activeExecs = projectsList.filter((p) => p.status === 'In Progress' || p.status?.includes('Progress')).length;
    const pendingUCs = projectsList.filter((p) => p.ucStatus === 'OVERDUE' || (p.status === 'Completed' && p.ucStatus !== 'SUBMITTED')).length;

    currentStats = [
      {
        label: 'Assigned Works',
        value: String(dynamicTotal),
        meta: currentUser?.agency || 'Executing Division Scope',
        isAccent: false,
      },
      {
        label: 'Fund Utilization',
        value: effectiveUtilPct != null ? `${effectiveUtilPct}%` : `${avgPhysProg}%`,
        meta: effectiveUtilPct != null ? 'Cumulative outlay disbursed' : 'Physical site milestone pacing',
        isAccent: false,
      },
      {
        label: 'Active Executions',
        value: String(activeExecs),
        meta: 'Under active construction/works',
        isAccent: false,
      },
      {
        label: 'Pending UC Submissions',
        value: String(pendingUCs),
        meta: 'Statutory utilization certificates',
        isAccent: pendingUCs > 0,
      },
    ];
  } else {
    currentStats = [
      {
        label: 'Scoped Projects',
        value: String(dynamicTotal),
        meta: currentUser ? (currentUser.district || currentUser.state || 'National Portfolio') : 'All active jurisdictions',
        isAccent: false,
      },
      {
        label: 'Critical / High Flags',
        value: String(dynamicHighRisk),
        meta: 'Immediate audit review required',
        isAccent: dynamicHighRisk > 0,
      },
      {
        label: 'Fund Utilization',
        value: effectiveUtilPct != null ? `${effectiveUtilPct}%` : '77.6%',
        meta: 'Sanctioned vs expended outlay',
        isAccent: false,
      },
      {
        label: 'Active Alerts',
        value: String(dynamicAlerts),
        meta: isMospiRole ? 'Critical severity alerts (National)' : isStateRole ? 'High & Critical flags (State)' : 'Awaiting authority response',
        isAccent: false,
      },
    ];
  }

  const sortedCurrentProjects = [...projectsList].sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));

  return (
    <div className="setu-dashboard">
      {/* Page Header */}
      <div className="setu-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 className="setu-page-title" style={{ margin: 0 }}>
            {isMpRole ? 'Constituency Projects & Recommendations' : isAgencyRole ? 'Implementing Agency Execution Workspace' : 'Projects Audit Dashboard'}
          </h1>
          {dashboardStats?.isSimulated && (
            <span style={{ background: '#e2e8f0', color: '#475569', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', border: '1px solid #cbd5e1' }}>
              Simulated
            </span>
          )}
        </div>
        <p className="setu-page-desc">
          {currentUser
            ? `Logged in: ${currentUser.role || 'Official'} — Scope: ${currentUser.jurisdiction || currentUser.constituency || currentUser.district || 'National Oversight'}`
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

      {/* District Authority: MP Office Scheme Proposals Under Scrutiny Queue */}
      {isDistrictRole && (
        <div style={{ background: '#ffffff', border: '1px solid var(--setu-color-border-subtle)', borderLeft: '4px solid var(--setu-color-primary-navy)', padding: '20px 24px', marginBottom: '24px', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h2 className="setu-table-title" style={{ margin: 0, color: 'var(--setu-color-primary-navy)' }}>
                📋 MP Office Scheme Proposals Under Scrutiny ({projectsList.filter(p => p.status === 'Proposed - Under Scrutiny' || p.status?.includes('Proposed')).length})
              </h2>
              <span className="setu-table-subtitle" style={{ margin: 0 }}>
                Statutory sanction workflow: Review MP recommendations, verify guideline compliance, and issue Administrative Sanctions.
              </span>
            </div>
          </div>

          {projectsList.filter(p => p.status === 'Proposed - Under Scrutiny' || p.status?.includes('Proposed')).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {projectsList.filter(p => p.status === 'Proposed - Under Scrutiny' || p.status?.includes('Proposed')).map(prop => (
                <div key={prop.id} className="setu-card" style={{ padding: '16px', background: '#f8fafc', border: '1px solid var(--setu-color-border-subtle)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontFamily: 'var(--setu-font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--setu-color-primary-navy)' }}>{prop.id}</span>
                        <span className="setu-status-tag">{prop.status}</span>
                      </div>
                      <h4 style={{ margin: '4px 0 2px 0', fontSize: '14px', color: 'var(--setu-color-text-primary)' }}>{prop.name}</h4>
                      <div style={{ fontSize: '12px', color: 'var(--setu-color-text-secondary)' }}>
                        Recommended by: <strong>{prop.mpName}</strong> ({prop.constituency || prop.district}) • Category: <strong>{prop.category}</strong>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--setu-color-primary-navy)' }}>
                        ₹{Number(prop.sanctionedAmount || prop.estimatedCost || 0).toLocaleString('en-IN')}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--setu-color-text-muted)' }}>Estimated Cost</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                    <button
                      type="button"
                      className="setu-btn-primary"
                      onClick={() => {
                        if (window.setuOpenProposalApproveModal) {
                          window.setuOpenProposalApproveModal(prop.id, prop.name, prop.sanctionedAmount || prop.estimatedCost || 5000000, prop.district);
                        }
                      }}
                      style={{ padding: '6px 14px', fontSize: '12px', background: '#059669', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      ✓ Approve & Sanction
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.setuOpenProposalRejectModal) {
                          window.setuOpenProposalRejectModal(prop.id, prop.name);
                        }
                      }}
                      style={{ padding: '6px 14px', fontSize: '12px', background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      ✕ Reject Proposal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--setu-color-text-muted)', fontStyle: 'italic' }}>
              No scheme proposals currently awaiting administrative sanction in {currentUser?.district || 'this district'}.
            </p>
          )}
        </div>
      )}

      {/* System Alerts Feed or Role Space Notice */}
      {isMpRole ? (
        <div className="setu-alert-section" style={{ background: '#ffffff', border: '1px solid var(--setu-color-border-subtle)', borderLeft: '4px solid var(--setu-color-primary-navy)', padding: '20px 24px', marginBottom: '24px' }}>
          <h2 className="setu-table-title" style={{ color: 'var(--setu-color-primary-navy)', margin: '0 0 6px 0' }}>Constituency Scheme Recommendations & Tracking</h2>
          <p className="setu-table-subtitle" style={{ margin: 0 }}>
            Under MPLADS guidelines (ROLES.md), MP recommendations are routed to District Authority for scrutiny. Statutory audit queues are restricted to auditing bodies.
          </p>
        </div>
      ) : isAgencyRole ? (
        <div className="setu-alert-section" style={{ background: '#ffffff', border: '1px solid var(--setu-color-border-subtle)', borderLeft: '4px solid var(--setu-color-primary-navy)', padding: '20px 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '24px' }}>📋</div>
            <div>
              <h2 className="setu-table-title" style={{ margin: '0 0 6px 0', color: 'var(--setu-color-primary-navy)' }}>Line Agency Execution Space</h2>
              <p className="setu-table-subtitle" style={{ margin: 0 }}>
                Operational workspace for {currentUser?.agency || 'Assigned Execution Division'}. Risk scores, compliance flags, and citizen contradiction queues are restricted to statutory oversight authorities.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="setu-alert-section">
          <div className="setu-alert-section-header">
            <div>
              <h2 className="setu-table-title">
                {isMospiRole ? 'National Apex Critical Alerts & Interventions' : isStateRole ? 'State Oversight Alerts & District Aggregates' : `High-Priority Audit Alerts & Discrepancies (${filteredAlerts.length})`}
              </h2>
              <span className="setu-table-subtitle">
                {isMospiRole ? 'National feed of CRITICAL anomalies requiring Ministry intervention' : isStateRole ? 'Statewide CRITICAL alerts and aggregated district high-risk rollups' : 'Surfacing ground-truth citizen contradictions, duplicate tenders, and high-risk anomalies'}
              </span>
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
            {filteredAlerts.slice(0, 8).map((a) => {
              if (a.projectId === 'AGGREGATE') {
                return (
                  <div key={a.id} className="setu-alert-card setu-alert-card-financial" style={{ borderLeft: '4px solid var(--setu-color-primary-navy)' }}>
                    <div className="setu-alert-header">
                      <div className="setu-alert-badges">
                        <span className="setu-severity-high">HIGH</span>
                        <span className="setu-type-badge setu-type-financial">District Aggregate</span>
                        <span style={{ fontFamily: 'var(--setu-font-mono)', fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
                          {a.id}
                        </span>
                      </div>
                      <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
                        {a.timestamp ? a.timestamp.split('T')[0] : '2026-08'}
                      </span>
                    </div>
                    <h3 className="setu-alert-title">{a.title}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--setu-color-text-muted)', marginBottom: '8px' }}>
                      <strong>{a.projectName}</strong> • {a.district}, {a.state}
                    </div>
                    <p className="setu-alert-desc">{a.description}</p>
                    {a.recommendedAction && (
                      <div className="setu-alert-action-box">
                        <strong>Administrative Directive:</strong> {a.recommendedAction}
                      </div>
                    )}
                  </div>
                );
              }

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

              const alertStatus = a.status || 'OPEN';
              const isEscalated = alertStatus === 'ESCALATED' || (a.ownerRole && a.ownerRole !== 'District Authority' && isDistrictRole);
              const isResolved = alertStatus === 'RESOLVED_CONFIRMED' || alertStatus === 'RESOLVED_FALSE_POSITIVE';
              const isOwner = !a.ownerRole || a.ownerRole === 'District Authority';

              const statusBadgeStyle = alertStatus === 'OPEN'
                ? { background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }
                : alertStatus === 'INSPECTION_ORDERED'
                ? { background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }
                : alertStatus === 'RESOLVED_CONFIRMED'
                ? { background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' }
                : alertStatus === 'RESOLVED_FALSE_POSITIVE'
                ? { background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' }
                : { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' };

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
                    <div className="setu-alert-badges" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className={sevClass}>{a.severity || 'WARNING'}</span>
                      <span className={`setu-type-badge ${typeClass}`}>{typeLabel}</span>
                      <span className="setu-badge" style={{ ...statusBadgeStyle, fontSize: '10px', padding: '2px 6px', fontWeight: 600 }}>
                        {alertStatus}
                      </span>
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

                  {/* Read-Only Escalation Banner */}
                  {isEscalated && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '8px 12px', margin: '10px 0', fontSize: '12px', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🔒</span>
                      <span><strong>Escalated to State Nodal Authority</strong> — {a.escalationReason || 'Transferred under single ownership governance protocol'} (Read-Only)</span>
                    </div>
                  )}

                  {a.recommendedAction && !isEscalated && (
                    <div className="setu-alert-action-box">
                      <strong>Recommended Auditor Action:</strong> {a.recommendedAction}
                    </div>
                  )}

                  {/* District Authority Resolution Action Controls */}
                  {isDistrictRole && isOwner && !isEscalated && !isResolved && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '12px 0 6px 0', padding: '8px 12px', background: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--setu-color-primary-navy)' }}>
                        ⚡ Resolution Action:
                      </span>
                      {alertStatus === 'OPEN' && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.setuOpenAlertResolutionModal) {
                              window.setuOpenAlertResolutionModal(a.id, 'INSPECTION_ORDERED', a.severity);
                            }
                          }}
                          style={{ padding: '4px 10px', fontSize: '11px', background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          🔍 Order Inspection
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.setuOpenAlertResolutionModal) {
                            window.setuOpenAlertResolutionModal(a.id, 'RESOLVED_CONFIRMED', a.severity);
                          }
                        }}
                        style={{ padding: '4px 10px', fontSize: '11px', background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                      >
                        ✓ Confirm Anomaly
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.setuOpenAlertResolutionModal) {
                            window.setuOpenAlertResolutionModal(a.id, 'RESOLVED_FALSE_POSITIVE', a.severity);
                          }
                        }}
                        style={{ padding: '4px 10px', fontSize: '11px', background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                      >
                        ✕ Dismiss (False Positive)
                      </button>
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
      )}

      {/* Projects Audit Table */}
      <div className="setu-table-card">
        <div className="setu-table-card-header">
          <div>
            <h2 className="setu-table-title">
              {isMpRole ? `Constituency Public Works (${sortedCurrentProjects.length})` : isAgencyRole ? `Assigned Execution Works (${sortedCurrentProjects.length})` : `Audited Projects (${sortedCurrentProjects.length})`}
            </h2>
            <span className="setu-table-subtitle">
              {isMpRole
                ? `Displaying public works recommended and tracked for ${currentUser?.constituency || 'Constituency'}`
                : isAgencyRole
                ? `Execution works assigned to ${currentUser?.agency || 'Implementing Agency'}`
                : currentUser && currentUser.district
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
                <th>{isMpRole ? 'Constituency / Area' : 'District'}</th>
                <th>Category</th>
                <th>Status</th>
                <th>{isMpRole ? 'Risk Assessment (Read-Only)' : isAgencyRole ? 'Physical Milestone Progress' : 'Risk Score'}</th>
                {isMpRole && <th>Review Status</th>}
              </tr>
            </thead>
            <tbody>
              {sortedCurrentProjects.map((p) => {
                const isHighRisk = (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH';
                const badgeClass = isHighRisk ? 'setu-badge-risk-high' : 'setu-badge-risk-neutral';
                const riskLevel = p.riskLevel || (p.riskScore >= 60 ? 'HIGH' : p.riskScore >= 40 ? 'MED' : 'LOW');
                const hasFlag = p.id === 'PRJ-IND-TN-104' || p.id === 'PRJ-IND-TN-106' || p.id === 'PRJ-IND-TN-107' || p.id === 'PRJ-IND-2013' || p.hasCitizenReport || isHighRisk || p.costOverrun;

                if (isMpRole) {
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
                      <td>{p.location || `${p.district} • ${p.constituency || ''}`}</td>
                      <td>{p.category}</td>
                      <td>
                        <span className="setu-status-tag">{p.status}</span>
                      </td>
                      <td>
                        <span className={`setu-badge ${badgeClass}`}>
                          {p.riskScore}/100
                        </span>
                      </td>
                      <td>
                        {hasFlag ? (
                          <span className="setu-badge" style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', fontSize: '11px', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>
                            ⚠️ Under Review
                          </span>
                        ) : (
                          <span style={{ color: 'var(--setu-color-text-muted)', fontSize: '12px' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Normal Pacing
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }

                if (isAgencyRole) {
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--setu-color-bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${p.physicalProgress || 0}%`, height: '100%', backgroundColor: 'var(--setu-color-primary-navy)' }}></div>
                          </div>
                          <span style={{ fontFamily: 'var(--setu-font-mono)', fontSize: '12px', fontWeight: 600 }}>{p.physicalProgress || 0}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                }

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
                  <td colSpan={isMpRole ? 6 : 5} style={{ textAlign: 'center', padding: '24px', color: 'var(--setu-color-text-secondary)' }}>
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

