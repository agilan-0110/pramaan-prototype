import React, { useState, useEffect } from 'react';
import './ProjectDetail.css';
import mockProjects from '../../../backend/app/data/mockProjects.json';
import mockComplaints from '../../../backend/app/data/mockComplaints.json';
import { getProjectDetailHtml, getRiskExplanation } from './projectDetailData.js';

export { getProjectDetailHtml, getRiskExplanation };

/**
 * SETU Project Detail Component
 * 
 * Opens when a user clicks a project row from the Dashboard table.
 * Implements a strict tabbed interface with 5 tabs:
 * 1. Overview: Basic geographic, administrative, and scheme info
 * 2. Financials: Sanction, expenditure, unspent balance, and plain-language risk explanation
 * 3. Compliance: Compliance engine flags (empty state when clean)
 * 4. Citizen Reports: Contradiction reports from mockComplaints.json
 * 5. Audit Trail: Chronological timeline of project milestones and events
 */
export default function ProjectDetail({ projectId }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [liveReports, setLiveReports] = useState(null);
  const [isLoadingReports, setIsLoadingReports] = useState(false);

  // Match project by ID or fallback to first record
  const project = mockProjects.find((p) => p.id === projectId) || mockProjects[0];
  const fallbackComplaints = mockComplaints.filter((c) => c.projectId === project?.id);
  const complaints = liveReports !== null ? liveReports : fallbackComplaints;

  useEffect(() => {
    let isSubscribed = true;
    async function fetchCitizenReports() {
      if (!project?.id) return;
      setIsLoadingReports(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/projects/${project.id}/citizen-reports`);
        if (res.ok) {
          const data = await res.json();
          if (isSubscribed && data.reports) {
            setLiveReports(data.reports);
          }
        } else {
          if (isSubscribed) setLiveReports(fallbackComplaints);
        }
      } catch (err) {
        if (isSubscribed) setLiveReports(fallbackComplaints);
      } finally {
        if (isSubscribed) setIsLoadingReports(false);
      }
    }

    fetchCitizenReports();
    return () => {
      isSubscribed = false;
    };
  }, [project?.id]);

  if (!project) {
    return (
      <div className="setu-detail-container">
        <div className="setu-empty-state">
          <h2 className="setu-empty-state-title">Project Not Found</h2>
          <p className="setu-empty-state-text">No project record matching ID could be found.</p>
          <a href="#/dashboard" className="setu-btn-primary" style={{ marginTop: '16px' }}>
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const isHighRisk = (project.riskScore != null && project.riskScore >= 60) || project.riskLevel === 'HIGH';
  const badgeClass = isHighRisk ? 'setu-badge-risk-high' : 'setu-badge-risk-neutral';
  const riskLevel = project.riskLevel || (project.riskScore >= 60 ? 'HIGH' : project.riskScore >= 40 ? 'MED' : 'LOW');

  // Count compliance flags
  const complianceCount =
    (project.costOverrun ? 1 : 0) +
    (project.duplicateRisk ? 1 : 0) +
    (project.paymentProgressMismatch ? 1 : 0) +
    (project.daysDelayed > 45 ? 1 : 0);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'financials', label: 'Financials' },
    { id: 'compliance', label: 'Compliance', badge: complianceCount, isAlert: complianceCount > 0 },
    { id: 'citizen-reports', label: 'Citizen Reports', badge: complaints.length, isAlert: complaints.some((c) => c.isContradiction) },
    { id: 'audit-trail', label: 'Audit Trail' },
  ];

  const sanctionedFormatted = `₹${Number(project.sanctionedAmount).toLocaleString('en-IN')}`;
  const expenditureFormatted = `₹${Number(project.expenditure).toLocaleString('en-IN')}`;
  const balance = Math.max(0, project.sanctionedAmount - project.expenditure);
  const balanceFormatted = `₹${Number(balance).toLocaleString('en-IN')}`;
  const finRate = project.financialProgress ? project.financialProgress.toFixed(1) : '0.0';

  return (
    <div className="setu-detail-container">
      {/* Top Bar with Breadcrumb / Back Link */}
      <div className="setu-detail-top-bar">
        <a href="#/dashboard" className="setu-back-to-dashboard" id="btn-back-dashboard">
          ← Return to Projects Audit Dashboard
        </a>
        <div style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
          MPLADS Institutional Project Record
        </div>
      </div>

      {/* Project Header Card */}
      <div className="setu-detail-header-card">
        <div className="setu-detail-meta-row">
          <span className="setu-detail-id-tag">{project.id}</span>
          <span className="setu-status-tag">{project.status}</span>
          <span className={`setu-badge ${badgeClass}`}>Risk {project.riskScore} ({riskLevel})</span>
          <span style={{ fontSize: 'var(--setu-font-size-small)', color: 'var(--setu-color-text-secondary)' }}>
            {project.district}, {project.state}
          </span>
        </div>
        <h1 className="setu-detail-title">{project.name}</h1>
      </div>

      {/* Tab Navigation Strip (Horizontal, non-accordion) */}
      <div className="setu-tab-wrapper">
        <nav className="setu-tab-nav" id="setu-detail-tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`setu-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`tab-btn-${tab.id}`}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`setu-tab-badge ${tab.isAlert ? 'setu-tab-badge-alert' : ''}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Tab Panel Content Area */}
        <div className="setu-tab-panel" id="setu-detail-tab-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="setu-info-grid">
              <div className="setu-info-card">
                <h3 className="setu-info-card-title">Geographic & Parliamentary Scope</h3>
                <div className="setu-kv-list">
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">State</span>
                    <span className="setu-kv-value">{project.state}</span>
                  </div>
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">District</span>
                    <span className="setu-kv-value">{project.district}</span>
                  </div>
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">Constituency</span>
                    <span className="setu-kv-value">{project.constituency}</span>
                  </div>
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">Member of Parliament</span>
                    <span className="setu-kv-value">{project.mpName}</span>
                  </div>
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">MP Code</span>
                    <span className="setu-kv-value" style={{ fontFamily: 'var(--setu-font-mono)' }}>
                      {project.mpId}
                    </span>
                  </div>
                </div>
              </div>

              <div className="setu-info-card">
                <h3 className="setu-info-card-title">Scheme Implementation Details</h3>
                <div className="setu-kv-list">
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">Scheme Category</span>
                    <span className="setu-kv-value">{project.category}</span>
                  </div>
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">Current Work Status</span>
                    <span className="setu-kv-value">
                      <span className="setu-status-tag">{project.status}</span>
                    </span>
                  </div>
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">Implementing Agency</span>
                    <span className="setu-kv-value">{project.implementingAgency}</span>
                  </div>
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">Executing Vendor</span>
                    <span className="setu-kv-value">{project.vendorName || 'Not Assigned'}</span>
                  </div>
                  <div className="setu-kv-row">
                    <span className="setu-kv-label">Physical Completion</span>
                    <span className="setu-kv-value">{project.physicalProgress}%</span>
                  </div>
                </div>
                <div className="setu-progress-container" style={{ marginTop: 'var(--setu-space-2)' }}>
                  <div className="setu-progress-track">
                    <div
                      className="setu-progress-bar"
                      style={{ width: `${project.physicalProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FINANCIALS */}
          {activeTab === 'financials' && (
            <div>
              <div className="setu-metric-grid">
                <div className="setu-metric-box">
                  <span className="setu-metric-label">Sanctioned Amount</span>
                  <span className="setu-metric-value">{sanctionedFormatted}</span>
                  <span className="setu-metric-meta">Statutory MPLADS Sanction</span>
                </div>
                <div className="setu-metric-box">
                  <span className="setu-metric-label">Total Expenditure</span>
                  <span className="setu-metric-value">{expenditureFormatted}</span>
                  <span className="setu-metric-meta">{finRate}% of Sanctioned Budget</span>
                </div>
                <div className="setu-metric-box">
                  <span className="setu-metric-label">Unspent Balance</span>
                  <span className="setu-metric-value">{balanceFormatted}</span>
                  <span className="setu-metric-meta">Remaining Project Funds</span>
                </div>
                <div className={`setu-metric-box ${isHighRisk ? 'setu-metric-box-alert' : ''}`}>
                  <span className="setu-metric-label">Risk Evaluation</span>
                  <span
                    className="setu-metric-value"
                    style={{ color: isHighRisk ? 'var(--setu-color-accent-dark)' : 'inherit' }}
                  >
                    {project.riskScore} <span style={{ fontSize: 'var(--setu-font-size-small)' }}>/ 100</span>
                  </span>
                  <span className="setu-metric-meta">{riskLevel} Risk Level</span>
                </div>
              </div>

              <div
                className="setu-card"
                style={{
                  marginTop: 'var(--setu-space-4)',
                  borderLeft: `3px solid ${isHighRisk ? 'var(--setu-color-accent-base)' : 'var(--setu-color-primary-base)'}`,
                }}
              >
                <span className="setu-card-label">Audit & Predictive Risk Analysis</span>
                <p style={{ fontSize: 'var(--setu-font-size-body)', lineHeight: 1.6, margin: 'var(--setu-space-2) 0 0 0' }}>
                  {getRiskExplanation(project)}
                </p>
              </div>

              <div className="setu-info-grid" style={{ marginTop: 'var(--setu-space-5)' }}>
                <div className="setu-info-card">
                  <h3 className="setu-info-card-title">Fund Absorption & Milestone Metrics</h3>
                  <div className="setu-kv-list">
                    <div className="setu-kv-row">
                      <span className="setu-kv-label">Physical Completion</span>
                      <span className="setu-kv-value">{project.physicalProgress}%</span>
                    </div>
                    <div className="setu-kv-row">
                      <span className="setu-kv-label">Financial Utilization</span>
                      <span className="setu-kv-value">{finRate}%</span>
                    </div>
                    <div className="setu-kv-row">
                      <span className="setu-kv-label">Progress Lead / Lag</span>
                      <span
                        className="setu-kv-value"
                        style={{
                          color: project.paymentProgressMismatch ? 'var(--setu-color-accent-dark)' : 'inherit',
                        }}
                      >
                        {project.paymentProgressMismatch ? 'Disbursement Exceeds Physical by > 25%' : 'Within Normal Thresholds'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="setu-info-card">
                  <h3 className="setu-info-card-title">Scheme Allocation Framework</h3>
                  <div className="setu-kv-list">
                    <div className="setu-kv-row">
                      <span className="setu-kv-label">MP Annual Entitlement</span>
                      <span className="setu-kv-value">₹5.00 Crore / Year</span>
                    </div>
                    <div className="setu-kv-row">
                      <span className="setu-kv-label">Tranche Structure</span>
                      <span className="setu-kv-value">Two ₹2.5 Crore Installments</span>
                    </div>
                    <div className="setu-kv-row">
                      <span className="setu-kv-label">Auditing Authority</span>
                      <span className="setu-kv-value">District Magistrate / CAG Audit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPLIANCE */}
          {activeTab === 'compliance' && (
            <div>
              {complianceCount > 0 ? (
                <div>
                  <div style={{ marginBottom: 'var(--setu-space-4)' }}>
                    <h3 style={{ fontSize: 'var(--setu-font-size-subheading)', color: 'var(--setu-color-accent-dark)', margin: 0 }}>
                      Active Compliance Engine Flags ({complianceCount})
                    </h3>
                    <span style={{ fontSize: 'var(--setu-font-size-small)', color: 'var(--setu-color-text-secondary)' }}>
                      Violations flagged for administrative review prior to next fund tranche release
                    </span>
                  </div>

                  {project.paymentProgressMismatch && (
                    <div className="setu-flag-card">
                      <div className="setu-flag-header">
                        <h4 className="setu-flag-title">Payment Progress Exceeds Certified Physical Stage</h4>
                        <span className="setu-detail-id-tag">COMP-PAY-01</span>
                      </div>
                      <p className="setu-flag-desc">
                        Disbursement rate ({project.financialProgress}%) exceeds physical progress ({project.physicalProgress}%) by more than the statutory threshold without a corresponding stage measurement certificate.
                      </p>
                    </div>
                  )}

                  {project.duplicateRisk && (
                    <div className="setu-flag-card">
                      <div className="setu-flag-header">
                        <h4 className="setu-flag-title">Potential Duplicate Asset Work Detected</h4>
                        <span className="setu-detail-id-tag">COMP-DUP-02</span>
                      </div>
                      <p className="setu-flag-desc">
                        Geospatial coordinate match indicates a similar civil asset was funded under municipal or state grant within 400m of this location in the prior financial year.
                      </p>
                    </div>
                  )}

                  {project.costOverrun && (
                    <div className="setu-flag-card">
                      <div className="setu-flag-header">
                        <h4 className="setu-flag-title">Budget Exhaustion Preceding Final Milestone</h4>
                        <span className="setu-detail-id-tag">COMP-OVR-03</span>
                      </div>
                      <p className="setu-flag-desc">
                        Expenditures have surpassed proportional completion stages. Additional escalation approval will be required from the State Nodal Authority.
                      </p>
                    </div>
                  )}

                  {project.daysDelayed > 45 && (
                    <div className="setu-flag-card">
                      <div className="setu-flag-header">
                        <h4 className="setu-flag-title">Milestone Execution Delayed Beyond 45 Days</h4>
                        <span className="setu-detail-id-tag">COMP-DEL-04</span>
                      </div>
                      <p className="setu-flag-desc">
                        Work execution has slipped by {project.daysDelayed} days against the approved administrative schedule without a formal extension submitted.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="setu-empty-state">
                  <h4 className="setu-empty-state-title">No Compliance Flags Detected</h4>
                  <p className="setu-empty-state-text">
                    This project conforms with MPLADS operational guidelines, statutory single-tender ceiling rules, and scheduled milestone pacing.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CITIZEN REPORTS */}
          {activeTab === 'citizen-reports' && (
            <div>
              {complaints.length > 0 ? (
                <div>
                  <div style={{ marginBottom: 'var(--setu-space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--setu-space-2)' }}>
                    <div>
                      <h3 style={{ fontSize: 'var(--setu-font-size-subheading)', margin: 0, color: 'var(--setu-color-text-primary)' }}>
                        Citizen Grievances & NLP Contradiction Reports ({complaints.length})
                      </h3>
                      <span style={{ fontSize: 'var(--setu-font-size-small)', color: 'var(--setu-color-text-secondary)' }}>
                        Real-time ground truth observations evaluated by sentence-transformers & negation detection engine
                      </span>
                    </div>
                    {isLoadingReports && (
                      <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)', fontStyle: 'italic' }}>
                        Updating live from Citizen NLP API...
                      </span>
                    )}
                  </div>

                  {complaints.map((c) => {
                    const rawScore = c.contradictionScore != null ? c.contradictionScore : 0;
                    const score = Math.round(rawScore <= 1.0 ? rawScore * 100 : rawScore);
                    const isHighContradiction = score >= 60 || c.isContradiction;
                    const isMedContradiction = score >= 30 && score < 60;
                    
                    const badgeClass = isHighContradiction
                      ? 'setu-badge-contradiction-high'
                      : isMedContradiction
                      ? 'setu-badge-contradiction-med'
                      : 'setu-badge-contradiction-low';

                    const badgeText = isHighContradiction
                      ? `Contradiction Flagged (${score}/100)`
                      : isMedContradiction
                      ? `Moderate Discrepancy (${score}/100)`
                      : `Corroborated (${score}/100)`;

                    const cardModifier = isHighContradiction
                      ? 'setu-complaint-card-contradiction'
                      : 'setu-complaint-card-corroborated';

                    const matchedClaim = c.matchedOfficialClaim || c.officialClaim;
                    const explanation = c.plainLanguageExplanation || c.citizenSummary;

                    return (
                      <div
                        key={c.id || Math.random()}
                        className={`setu-complaint-card ${cardModifier}`}
                      >
                        <div className="setu-complaint-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--setu-space-2)', flexWrap: 'wrap' }}>
                            <span className="setu-card-label" style={{ fontFamily: 'var(--setu-font-mono)' }}>{c.id}</span>
                            <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
                              • Submitted: {c.submittedAt ? c.submittedAt.split('T')[0] : '2026-08'}
                            </span>
                            {c.status && (
                              <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-neutral-600)', backgroundColor: 'var(--setu-color-bg-subtle)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--setu-color-border-subtle)' }}>
                                {c.status}
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--setu-space-2)', flexWrap: 'wrap' }}>
                            {c.geoMatchDistance != null && (
                              <span className={`setu-geo-badge ${c.geoMatchDistance <= 2.0 ? 'setu-geo-near' : 'setu-geo-far'}`}>
                                {c.geoMatchDistance <= 2.0
                                  ? `📍 Reported near-site (${Number(c.geoMatchDistance).toFixed(1)}km away)`
                                  : `⚠ Reported far from registered site (${Number(c.geoMatchDistance).toFixed(1)}km away)`}
                              </span>
                            )}
                            {/* Colored contradictionScore badge — high score in accent/warning color */}
                            <span className={`setu-badge ${badgeClass}`}>
                              {badgeText}
                            </span>
                          </div>
                        </div>

                        {/* 1. Citizen Complaint Text */}
                        <div className="setu-complaint-text-box">
                          <span className="setu-complaint-label">
                            Citizen Ground-Truth Observation:
                          </span>
                          <p className="setu-complaint-text">
                            "{c.complaintText}"
                          </p>
                        </div>

                        {/* 2. Matched Official Claim */}
                        {matchedClaim && (
                          <div className="setu-claim-box">
                            <span className="setu-claim-label">
                              Matched Official Portal Claim / Milestone:
                            </span>
                            <div className="setu-claim-text">
                              {matchedClaim}
                            </div>
                          </div>
                        )}

                        {/* 3. Plain Language Explanation */}
                        {explanation && (
                          <div className={isHighContradiction ? 'setu-explanation-box' : 'setu-claim-box'}>
                            <span className={isHighContradiction ? 'setu-explanation-label' : 'setu-claim-label'}>
                              {isHighContradiction ? '⚠ Audit Contradiction Analysis:' : 'Audit Verification Summary:'}
                            </span>
                            <div className={isHighContradiction ? 'setu-explanation-text' : 'setu-claim-text'}>
                              {explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="setu-empty-state">
                  <h4 className="setu-empty-state-title">No Citizen Grievances Recorded</h4>
                  <p className="setu-empty-state-text">
                    No public contradictions or grievances have been filed for this project. Citizens can submit ground verification reports via the public Citizen Portal.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: AUDIT TRAIL */}
          {activeTab === 'audit-trail' && (
            <div>
              <div style={{ marginBottom: 'var(--setu-space-4)' }}>
                <h3 style={{ fontSize: 'var(--setu-font-size-subheading)', margin: 0 }}>
                  Project Chronology & Audit Events
                </h3>
                <span style={{ fontSize: 'var(--setu-font-size-small)', color: 'var(--setu-color-text-secondary)' }}>
                  Tamper-evident administrative timeline recorded by District Authority and Implementing Agency
                </span>
              </div>

              <div className="setu-timeline">
                <div className="setu-timeline-item">
                  <div className="setu-timeline-dot" />
                  <span className="setu-timeline-date">2025-08-14 • 10:30 AM</span>
                  <span className="setu-timeline-action">Work Proposal Submitted</span>
                  <span className="setu-timeline-actor">Initiated by {project.mpName} ({project.constituency})</span>
                </div>

                <div className="setu-timeline-item">
                  <div className="setu-timeline-dot" />
                  <span className="setu-timeline-date">2025-09-22 • 03:15 PM</span>
                  <span className="setu-timeline-action">Technical Feasibility & Cost Estimation Sanctioned</span>
                  <span className="setu-timeline-actor">Verified by Executive Engineer, {project.implementingAgency}</span>
                </div>

                <div className="setu-timeline-item">
                  <div className="setu-timeline-dot" />
                  <span className="setu-timeline-date">2025-10-18 • 11:45 AM</span>
                  <span className="setu-timeline-action">Administrative Sanction Order Issued ({sanctionedFormatted})</span>
                  <span className="setu-timeline-actor">Authorized by District Magistrate / Collectorate, {project.district}</span>
                </div>

                <div className="setu-timeline-item">
                  <div className="setu-timeline-dot" />
                  <span className="setu-timeline-date">2026-02-10 • 02:00 PM</span>
                  <span className="setu-timeline-action">Milestone-1 Physical Progress Recorded ({project.physicalProgress}%)</span>
                  <span className="setu-timeline-actor">Inspected by Junior Technical Engineer, {project.implementingAgency}</span>
                </div>

                <div className="setu-timeline-item">
                  <div className={`setu-timeline-dot ${isHighRisk ? 'setu-timeline-dot-flagged' : ''}`} />
                  <span className="setu-timeline-date">2026-06-30 • 09:00 AM</span>
                  <span className="setu-timeline-action">
                    {isHighRisk ? `Risk Engine Flag Generated (Score: ${project.riskScore})` : 'Routine Compliance Verification Completed'}
                  </span>
                  <span className="setu-timeline-actor">Evaluated by SETU National Monitoring Engine</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
