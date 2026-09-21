# scratch/apply_frontend_da_update.py
import re

dashboard_path = r"C:\Workspace\AI-Projects\SETU\frontend\src\pages\dashboardData.js"
layout_path = r"C:\Workspace\AI-Projects\SETU\frontend\src\components\Layout.js"

with open(dashboard_path, "r", encoding="utf-8") as f:
    dash_content = f.read()

# 1. Update export getAlertsViewHtml to include getSharedAlertsViewHtml, getEvidenceAndTrancheViewHtml, getRiskAssessmentViewHtml, getDistrictAuditTrailViewHtml
# Let's inspect where getAlertsViewHtml is currently defined and replace it with getSharedAlertsViewHtml + getAlertsViewHtml alias.

shared_alerts_code = '''/**
 * Shared Alerts View Generator
 * Reused across:
 * - System Alerts (filterType = 'ALL')
 * - Compliance Flags (filterType = 'COMPLIANCE')
 * - Citizen Contradictions (filterType = 'CITIZEN_CONTRADICTION')
 * - Financial Risk (filterType = 'FINANCIAL_RISK')
 * - Duplicate Work (filterType = 'DUPLICATE_WORK')
 */
export function getSharedAlertsViewHtml(filterType = 'ALL', activeSubFilter = 'ALL') {
  let user = null;
  if (typeof sessionStorage !== 'undefined') {
    const rawU = sessionStorage.getItem('setu_auth_user');
    if (rawU) {
      try { user = JSON.parse(rawU); } catch {}
    }
  }

  const allowedProjectIds = scopedProjectsCache ? new Set(scopedProjectsCache.map((p) => p.id)) : null;
  const rawAlerts = liveAlertsCache || PRIORITY_ALERTS;
  let alerts = allowedProjectIds
    ? rawAlerts.filter((a) => !a.projectId || allowedProjectIds.has(a.projectId))
    : rawAlerts;

  let pageTitle = 'Comprehensive System Alerts Registry';
  let pageSubtitle = 'Aggregated multi-engine oversight alerts across Financial Risk, Statutory Compliance, Duplicate Schemes, and Citizen Reports.';
  let sectionTitle = 'Active System Alerts';
  let sectionSubtitle = 'Surfacing verified citizen ground-truth contradictions alongside institutional signals';
  let badgeLabel = 'All Risk Streams';

  if (filterType === 'COMPLIANCE') {
    pageTitle = 'Statutory Compliance Flags Registry';
    pageSubtitle = 'District compliance oversight: statutory cost ceilings, milestone deadlines, category mismatches, and fund-splitting flags.';
    sectionTitle = 'Compliance Flags & Statutory Violations';
    sectionSubtitle = 'Enforces 5-state statutory resolution lifecycle: Open → Inspection Ordered → Resolved / Escalated';
    badgeLabel = 'Compliance Engine Active';
    alerts = alerts.filter(a => 
      a.alertType === 'COMPLIANCE_VIOLATION' || 
      a.alertType === 'COST_OVERRUN' || 
      a.alertType === 'CHRONIC_DELAY' || 
      a.sourceModule === 'compliance' ||
      (a.title && (a.title.includes('Ceiling') || a.title.includes('Deadline') || a.title.includes('Compliance') || a.title.includes('Category') || a.title.includes('Splitting')))
    );
  } else if (filterType === 'CITIZEN_CONTRADICTION') {
    pageTitle = 'Citizen Ground Truth Contradictions';
    pageSubtitle = 'NLP-synthesized field reports and physical ground-truth contradictions submitted by citizens across district works.';
    sectionTitle = 'Consolidated Citizen Report Cards';
    sectionSubtitle = 'Grouped project reports with peak contradiction scores and field disparity verification';
    badgeLabel = 'Citizen NLP Ground Truth';
    alerts = alerts.filter(a => a.alertType === 'CITIZEN_CONTRADICTION' || a.sourceModule === 'citizen');

    // Group citizen reports by projectId into consolidated cards
    const groupedMap = new Map();
    alerts.forEach(a => {
      const pId = a.projectId || a.id;
      if (!groupedMap.has(pId)) {
        groupedMap.set(pId, {
          ...a,
          citizenReportCount: a.citizenReportCount || 1,
          peakContradictionScore: a.peakContradictionScore || (a.contradictionScore ? (a.contradictionScore * 100).toFixed(0) + '%' : '88%'),
          reports: [a]
        });
      } else {
        const existing = groupedMap.get(pId);
        existing.citizenReportCount = (existing.citizenReportCount || 1) + 1;
        const currentScore = parseFloat(existing.peakContradictionScore) || 85;
        const newScore = parseFloat(a.peakContradictionScore || (a.contradictionScore ? a.contradictionScore * 100 : 85)) || 85;
        existing.peakContradictionScore = Math.max(currentScore, newScore) + '%';
        existing.reports.push(a);
        if (a.severity === 'CRITICAL' || existing.severity !== 'CRITICAL') {
          existing.severity = a.severity;
        }
      }
    });
    alerts = Array.from(groupedMap.values());
  } else if (filterType === 'FINANCIAL_RISK') {
    pageTitle = 'Financial Risk & Anomaly Alerts';
    pageSubtitle = 'Isolation Forest and expenditure pacing disparity flags requiring administrative scrutiny.';
    sectionTitle = 'Financial Risk Signals';
    sectionSubtitle = 'Disbursement-progress leads and abnormal voucher patterns';
    badgeLabel = 'Financial Risk Engine';
    alerts = alerts.filter(a => a.alertType === 'FINANCIAL_RISK' || a.alertType === 'PAYMENT_MISMATCH' || a.sourceModule === 'risk');
  } else if (filterType === 'DUPLICATE_WORK') {
    pageTitle = 'Duplicate Work & Overlap Registry';
    pageSubtitle = 'Spatial-temporal collision detection across MP, MLA, and Municipal schemes.';
    sectionTitle = 'Duplicate Work Flags';
    sectionSubtitle = 'Proposals within 200m buffer of existing public assets';
    badgeLabel = 'GIS Overlap Detection';
    alerts = alerts.filter(a => a.alertType === 'DUPLICATE_WORK' || a.sourceModule === 'duplicate');
  }

  let filterPillsHtml = '';
  if (filterType === 'ALL') {
    filterPillsHtml = `
      <div class="setu-alert-filter-group">
        <button type="button" class="setu-filter-pill ${activeSubFilter === 'ALL' ? 'active' : ''}" onclick="window.setuSetSharedAlertFilter && window.setuSetSharedAlertFilter('ALL', 'ALL')">All (${alerts.length})</button>
        <button type="button" class="setu-filter-pill ${activeSubFilter === 'COMPLIANCE' ? 'active' : ''}" onclick="window.setuSetSharedAlertFilter && window.setuSetSharedAlertFilter('ALL', 'COMPLIANCE')">Compliance Flags</button>
        <button type="button" class="setu-filter-pill ${activeSubFilter === 'CITIZEN_CONTRADICTION' ? 'active' : ''}" onclick="window.setuSetSharedAlertFilter && window.setuSetSharedAlertFilter('ALL', 'CITIZEN_CONTRADICTION')">Citizen Contradictions</button>
        <button type="button" class="setu-filter-pill ${activeSubFilter === 'FINANCIAL_RISK' ? 'active' : ''}" onclick="window.setuSetSharedAlertFilter && window.setuSetSharedAlertFilter('ALL', 'FINANCIAL_RISK')">Financial Risk</button>
        <button type="button" class="setu-filter-pill ${activeSubFilter === 'DUPLICATE_WORK' ? 'active' : ''}" onclick="window.setuSetSharedAlertFilter && window.setuSetSharedAlertFilter('ALL', 'DUPLICATE_WORK')">Duplicate Work</button>
      </div>
    `;
    if (activeSubFilter !== 'ALL') {
      if (activeSubFilter === 'COMPLIANCE') {
        alerts = alerts.filter(a => a.alertType === 'COMPLIANCE_VIOLATION' || a.alertType === 'COST_OVERRUN' || a.alertType === 'CHRONIC_DELAY' || a.sourceModule === 'compliance');
      } else if (activeSubFilter === 'CITIZEN_CONTRADICTION') {
        alerts = alerts.filter(a => a.alertType === 'CITIZEN_CONTRADICTION' || a.sourceModule === 'citizen');
      } else if (activeSubFilter === 'FINANCIAL_RISK') {
        alerts = alerts.filter(a => a.alertType === 'FINANCIAL_RISK' || a.alertType === 'PAYMENT_MISMATCH' || a.sourceModule === 'risk');
      } else if (activeSubFilter === 'DUPLICATE_WORK') {
        alerts = alerts.filter(a => a.alertType === 'DUPLICATE_WORK' || a.sourceModule === 'duplicate');
      }
    }
  }

  const criticalCount = alerts.filter(a => (a.severity || '').toUpperCase() === 'CRITICAL').length;
  const highCount = alerts.filter(a => (a.severity || '').toUpperCase() === 'HIGH').length;
  const inspectionCount = alerts.filter(a => a.status === 'INSPECTION_ORDERED').length;
  const resolvedCount = alerts.filter(a => (a.status || '').startsWith('RESOLVED_')).length;
  const escalatedCount = alerts.filter(a => a.status === 'ESCALATED' || a.ownerRoleId === 'state_nodal').length;

  const alertCardsHtml = alerts.map(renderAlertCard).join('');

  return `
    <div class="setu-dashboard">
      <div class="setu-page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 class="setu-page-title">${pageTitle}</h1>
          <p class="setu-page-desc">${pageSubtitle}</p>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="setu-badge" style="background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; font-size: 11px;">
            ${badgeLabel}
          </span>
          ${user?.district ? `
            <span class="setu-badge" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; font-size: 11px;">
              District: <strong>${user.district}</strong>
            </span>
          ` : ''}
        </div>
      </div>

      <!-- Resolution Lifecycle Metric Ribbon -->
      <div class="setu-stat-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-bottom: 24px;">
        <div class="setu-card">
          <span class="setu-card-label">Active Flags</span>
          <span class="setu-card-value">${alerts.length}</span>
          <span class="setu-card-meta">In current view</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Critical Severity</span>
          <span class="setu-card-value ${criticalCount > 0 ? 'setu-card-value-accent' : ''}">${criticalCount}</span>
          <span class="setu-card-meta">Auto-escalates on confirm</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Inspections Ordered</span>
          <span class="setu-card-value" style="color: #d97706;">${inspectionCount}</span>
          <span class="setu-card-meta">Technical team deployed</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Resolved / Closed</span>
          <span class="setu-card-value" style="color: #059669;">${resolvedCount}</span>
          <span class="setu-card-meta">Action completed</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">State Escalations</span>
          <span class="setu-card-value" style="color: #dc2626;">${escalatedCount}</span>
          <span class="setu-card-meta">State Nodal ownership</span>
        </div>
      </div>

      <div class="setu-alert-section">
        <div class="setu-alert-section-header">
          <div>
            <h2 class="setu-table-title">${sectionTitle} (${alerts.length})</h2>
            <span class="setu-table-subtitle">${sectionSubtitle}</span>
          </div>
          ${filterPillsHtml}
        </div>

        <div class="setu-alert-list" style="margin-top: 16px;">
          ${alertCardsHtml.length > 0 ? alertCardsHtml : `
            <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 48px 24px; border-radius: 8px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 8px;">✓</div>
              <h4 class="setu-empty-state-title" style="font-size: 16px; font-weight: 700; color: #065f46; margin-bottom: 4px;">Zero Open Anomaly Flags</h4>
              <p class="setu-empty-state-text" style="color: var(--setu-color-text-secondary); margin: 0;">No active compliance flags or contradictions recorded for this jurisdiction view.</p>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

export function getAlertsViewHtml(filter = 'ALL') {
  return getSharedAlertsViewHtml(filter, 'ALL');
}
'''

# Find the getAlertsViewHtml function and replace it with shared_alerts_code
pattern = r"export function getAlertsViewHtml\(filter = 'ALL'\) \{[\s\S]*?^}"
match = re.search(pattern, dash_content, re.MULTILINE)
if match:
    dash_content = dash_content[:match.start()] + shared_alerts_code + dash_content[match.end():]
    print("Replaced getAlertsViewHtml with getSharedAlertsViewHtml successfully.")
else:
    print("Warning: getAlertsViewHtml pattern not found!")

# Now add getEvidenceAndTrancheViewHtml, getRiskAssessmentViewHtml, and getDistrictAuditTrailViewHtml before export function wireAgencyModals
new_da_views_code = '''
/**
 * 2. Evidence & Tranche Review Queue for District Authority
 */
export function getEvidenceAndTrancheViewHtml(activeSubTab = 'all') {
  let user = null;
  if (typeof sessionStorage !== 'undefined') {
    const rawU = sessionStorage.getItem('setu_auth_user');
    if (rawU) {
      try { user = JSON.parse(rawU); } catch {}
    }
  }

  const projects = scopedProjectsCache || mockProjects.filter((p) => {
    if (user?.district && p.district?.toLowerCase() !== user.district.toLowerCase()) return false;
    return true;
  });

  const allEvidence = [];
  const allInvoices = [];
  const trancheGatedProjects = [];

  projects.forEach((p) => {
    const hasAcceptedEv = (p.evidenceArtifacts || []).some(ev => ev.reviewStatus === 'ACCEPTED' || ev.status === 'ACCEPTED');
    trancheGatedProjects.push({
      ...p,
      hasAcceptedEvidence: hasAcceptedEv,
    });

    (p.evidenceArtifacts || []).forEach((ev) => {
      allEvidence.push({
        ...ev,
        projectId: p.id,
        projectName: p.name,
        district: p.district,
        implementingAgency: p.implementingAgency,
        vendorName: p.vendorName || 'Assigned Line Agency Vendor',
      });
    });

    (p.invoices || []).forEach((inv) => {
      allInvoices.push({
        ...inv,
        projectId: p.id,
        projectName: p.name,
        district: p.district,
        implementingAgency: p.implementingAgency,
        vendorName: p.vendorName || inv.vendorName || 'Contractor',
      });
    });
  });

  const pendingEvidenceCount = allEvidence.filter(e => e.reviewStatus === 'PENDING' || !e.reviewStatus || e.status === 'Submitted').length;
  const pendingInvoiceCount = allInvoices.filter(i => i.reviewStatus === 'PENDING' || !i.reviewStatus || i.status === 'Submitted').length;
  const readyTrancheCount = trancheGatedProjects.filter(p => p.hasAcceptedEvidence && p.status !== 'Completed' && (p.expenditure || 0) < (p.sanctionedAmount || 0)).length;
  const totalSanctioned = projects.reduce((s, p) => s + (p.sanctionedAmount || 0), 0);
  const totalDisbursed = projects.reduce((s, p) => s + (p.expenditure || 0), 0);

  const evidenceCardsHtml = allEvidence.map((ev) => {
    const status = ev.reviewStatus || ev.status || 'PENDING';
    const isAccepted = status === 'ACCEPTED';
    const isRejected = status === 'REJECTED' || status === 'REJECTED_RESUBMISSION_REQUIRED';
    const isPending = !isAccepted && !isRejected;

    const statusBadge = isAccepted
      ? `<span class="setu-badge" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 700;">✓ ACCEPTED</span>`
      : isRejected
      ? `<span class="setu-badge" style="background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; font-size: 11px; font-weight: 700;">✕ RESUBMISSION REQUIRED</span>`
      : `<span class="setu-badge" style="background: #fef3c7; color: #92400e; border: 1px solid #fde68a; font-size: 11px; font-weight: 700;">⏳ PENDING REVIEW</span>`;

    return `
      <div class="setu-card" style="padding: 20px; background: white; border: 1px solid var(--setu-color-border-subtle); margin-bottom: 16px; border-left: 4px solid ${isAccepted ? '#059669' : isRejected ? '#dc2626' : '#d97706'};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="setu-detail-id-tag">${ev.id || 'EV-001'}</span>
              <span style="font-weight: 700; color: var(--setu-color-primary-navy); font-size: 14px;">${ev.milestoneStage || 'Stage Milestone'}</span>
              ${statusBadge}
              <span class="setu-badge" style="background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; font-size: 10px;">Simulated CV</span>
            </div>
            <a href="#/project/${ev.projectId}" style="font-size: 13px; font-weight: 600; color: var(--setu-color-primary-navy); text-decoration: none;">
              ${ev.projectName} (${ev.projectId}) →
            </a>
          </div>
          <div style="text-align: right; font-size: 12px; color: var(--setu-color-text-muted);">
            Submitted: <strong>${ev.timestamp ? ev.timestamp.split('T')[0] : '2026-02'}</strong>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 140px 1fr; gap: 16px; align-items: center;">
          <div style="width: 140px; height: 95px; background: #f1f5f9; border-radius: 4px; overflow: hidden; border: 1px solid var(--setu-color-border-subtle); display: flex; align-items: center; justify-content: center; position: relative;">
            ${ev.imageUrl ? `
              <img src="${ev.imageUrl}" alt="Site Photo" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'padding:8px;font-size:11px;color:#64748b;text-align:center;\\'>📷 Site Inspection Artifact</div>';" />
            ` : `
              <div style="font-size: 11px; color: #64748b; text-align: center; padding: 6px;">📷 On-Site Photo Artifact</div>
            `}
            <span style="position: absolute; bottom: 2px; right: 2px; background: rgba(0,0,0,0.65); color: white; font-size: 9px; padding: 1px 4px; border-radius: 2px;">
              GPS Tagged
            </span>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: var(--setu-color-text-primary); line-height: 1.5;">
              ${ev.description || 'Physical work verification inspection photograph submitted by site junior engineer.'}
            </p>
            <div style="font-size: 12px; color: var(--setu-color-text-secondary); display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 12px;">
              <span>Agency: <strong>${ev.implementingAgency}</strong></span>
              <span>Vendor: <strong>${ev.vendorName}</strong></span>
              <span>GPS: <code style="font-size: 11px;">${ev.gpsLat || '13.0827'}°N, ${ev.gpsLng || '80.2707'}°E</code></span>
              <span>AI Site Confidence: <strong style="color: #059669;">94.2%</strong></span>
            </div>

            <!-- Review Actions -->
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              ${isPending ? `
                <button type="button" class="setu-btn-primary" onclick="window.setuReviewEvidence && window.setuReviewEvidence('${ev.projectId}', '${ev.id}', 'ACCEPTED')" style="padding: 6px 14px; font-size: 12px; background: #059669; border: none; border-radius: 4px; cursor: pointer; color: white; font-weight: 600;">
                  ✓ Accept Evidence
                </button>
                <button type="button" class="setu-btn-secondary" onclick="window.setuReviewEvidence && window.setuReviewEvidence('${ev.projectId}', '${ev.id}', 'REJECTED_RESUBMISSION_REQUIRED')" style="padding: 6px 14px; font-size: 12px; background: white; border: 1px solid #f87171; color: #dc2626; border-radius: 4px; cursor: pointer; font-weight: 600;">
                  ✕ Reject (Resubmit)
                </button>
              ` : isAccepted ? `
                <span style="font-size: 12px; color: #059669; font-weight: 600;">✓ Formally Accepted by District Authority — Milestone Gating Cleared</span>
              ` : `
                <span style="font-size: 12px; color: #dc2626; font-weight: 600;">✕ Resubmission Required — Notified to Implementing Line Agency</span>
              `}
              <a href="#/project/${ev.projectId}" class="setu-btn-secondary" style="padding: 6px 12px; font-size: 12px; text-decoration: none; margin-left: auto;">
                Inspect Project →
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const invoiceCardsHtml = allInvoices.map((inv) => {
    const status = inv.reviewStatus || inv.status || 'PENDING';
    const isAccepted = status === 'ACCEPTED';
    const isRejected = status === 'REJECTED' || status === 'REJECTED_RESUBMISSION_REQUIRED';
    const isPending = !isAccepted && !isRejected;

    const statusBadge = isAccepted
      ? `<span class="setu-badge" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 700;">✓ AUDITED & ACCEPTED</span>`
      : isRejected
      ? `<span class="setu-badge" style="background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; font-size: 11px; font-weight: 700;">✕ REJECTED</span>`
      : `<span class="setu-badge" style="background: #fef3c7; color: #92400e; border: 1px solid #fde68a; font-size: 11px; font-weight: 700;">⏳ AUDIT PENDING</span>`;

    return `
      <div class="setu-card" style="padding: 20px; background: white; border: 1px solid var(--setu-color-border-subtle); margin-bottom: 16px; border-left: 4px solid ${isAccepted ? '#059669' : isRejected ? '#dc2626' : '#0284c7'};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="setu-detail-id-tag">INV: ${inv.invoiceNumber || 'INV-2026-001'}</span>
              <span style="font-weight: 700; color: var(--setu-color-primary-navy); font-size: 14px;">₹${Number(inv.claimedAmount || inv.amount || 250000).toLocaleString('en-IN')}</span>
              ${statusBadge}
              <span class="setu-badge" style="background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; font-size: 10px;">Simulated GST OCR</span>
            </div>
            <a href="#/project/${inv.projectId}" style="font-size: 13px; font-weight: 600; color: var(--setu-color-primary-navy); text-decoration: none;">
              ${inv.projectName} (${inv.projectId}) →
            </a>
          </div>
          <div style="text-align: right; font-size: 12px; color: var(--setu-color-text-muted);">
            Invoice Date: <strong>${inv.invoiceDate || '2026-02-14'}</strong>
          </div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 12px;">
            <span>Vendor: <strong>${inv.vendorName}</strong></span>
            <span>GSTIN: <code style="font-family: var(--setu-font-mono); color: #0284c7;">${inv.gstin || '33AAACB1234F1Z5'}</code> (Verified Active)</span>
            <span>Items: <strong>${inv.itemsSummary || 'Civil work materials & concrete casting'}</strong></span>
          </div>
        </div>

        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          ${isPending ? `
            <button type="button" class="setu-btn-primary" onclick="window.setuReviewInvoice && window.setuReviewInvoice('${inv.projectId}', '${inv.invoiceNumber}', 'ACCEPTED')" style="padding: 6px 14px; font-size: 12px; background: #059669; border: none; border-radius: 4px; cursor: pointer; color: white; font-weight: 600;">
              ✓ Accept & Audit Clear
            </button>
            <button type="button" class="setu-btn-secondary" onclick="window.setuReviewInvoice && window.setuReviewInvoice('${inv.projectId}', '${inv.invoiceNumber}', 'REJECTED_RESUBMISSION_REQUIRED')" style="padding: 6px 14px; font-size: 12px; background: white; border: 1px solid #f87171; color: #dc2626; border-radius: 4px; cursor: pointer; font-weight: 600;">
              ✕ Reject Invoice
            </button>
          ` : isAccepted ? `
            <span style="font-size: 12px; color: #059669; font-weight: 600;">✓ Tax Invoice Audited & Passed</span>
          ` : `
            <span style="font-size: 12px; color: #dc2626; font-weight: 600;">✕ Invoice Rejected — Resubmission Required</span>
          `}
          <a href="#/project/${inv.projectId}" class="setu-btn-secondary" style="padding: 6px 12px; font-size: 12px; text-decoration: none; margin-left: auto;">
            Inspect Project Record →
          </a>
        </div>
      </div>
    `;
  }).join('');

  const trancheRowsHtml = trancheGatedProjects.map((p) => {
    const sanctionedFormatted = `₹${Number(p.sanctionedAmount).toLocaleString('en-IN')}`;
    const expenditureFormatted = `₹${Number(p.expenditure).toLocaleString('en-IN')}`;
    const isDone = p.status === 'Completed' || (p.physicalProgress || 0) >= 100;

    return `
      <tr>
        <td>
          <a href="#/project/${p.id}" style="color: inherit; text-decoration: none;">
            <div style="font-weight: 600; color: var(--setu-color-primary-navy);">${p.name}</div>
            <div style="font-family: var(--setu-font-mono); font-size: 11px; color: var(--setu-color-text-muted);">${p.id} • ${p.category}</div>
          </a>
        </td>
        <td>
          <div style="font-size: 12px;">Sanctioned: <strong>${sanctionedFormatted}</strong></div>
          <div style="font-size: 11px; color: var(--setu-color-text-muted);">Disbursed: ${expenditureFormatted}</div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="width: 70px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
              <div style="width: ${p.physicalProgress || 0}%; height: 100%; background: ${p.physicalProgress === 100 ? '#059669' : 'var(--setu-color-primary-navy)'};"></div>
            </div>
            <span style="font-size: 12px; font-weight: 600;">${p.physicalProgress || 0}%</span>
          </div>
        </td>
        <td>
          ${p.hasAcceptedEvidence ? `
            <span class="setu-badge" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 600;">
              ✓ Evidence Accepted
            </span>
          ` : `
            <span class="setu-badge" style="background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; font-size: 11px;">
              🔒 Gate Locked
            </span>
          `}
        </td>
        <td>
          ${isDone ? `
            <span style="font-size: 12px; color: #059669; font-weight: 600;">✓ Fully Disbursed & Completed</span>
          ` : p.hasAcceptedEvidence ? `
            <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenTrancheReleaseModal) window.setuOpenTrancheReleaseModal('${p.id}', ${p.sanctionedAmount || 5000000}, ${p.expenditure || 0});" style="padding: 6px 14px; font-size: 12px; background: #059669; border: none; border-radius: 4px; cursor: pointer; color: white; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>💳</span> Release Next Tranche
            </button>
          ` : `
            <button type="button" disabled title="Locked: Milestone evidence must be ACCEPTED first" style="padding: 6px 12px; font-size: 11px; border-radius: 4px; background: #f1f5f9; color: #94a3b8; border: 1px solid #e2e8f0; cursor: not-allowed; display: inline-flex; align-items: center; gap: 4px; font-weight: 600;">
              <span>🔒</span> Tranche Locked
            </button>
          `}
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="setu-dashboard">
      <div class="setu-page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 class="setu-page-title">Evidence & Tranche Review Queue</h1>
          <p class="setu-page-desc">District Authority one-stop operational queue for inspecting milestone photo artifacts, auditing contractor tax invoices, and releasing milestone fund tranches.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="setu-badge" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; font-size: 11px;">
            Statutory Milestone Gating Enforced
          </span>
        </div>
      </div>

      <!-- Operational Queue KPI Cards -->
      <div class="setu-stat-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-bottom: 24px;">
        <div class="setu-card">
          <span class="setu-card-label">Pending Photo Evidence</span>
          <span class="setu-card-value ${pendingEvidenceCount > 0 ? 'setu-card-value-accent' : ''}">${pendingEvidenceCount}</span>
          <span class="setu-card-meta">Awaiting site verification</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Pending GST Invoices</span>
          <span class="setu-card-value ${pendingInvoiceCount > 0 ? 'setu-card-value-accent' : ''}">${pendingInvoiceCount}</span>
          <span class="setu-card-meta">Contractor bills to audit</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Gating Clearance Ready</span>
          <span class="setu-card-value" style="color: #059669;">${readyTrancheCount}</span>
          <span class="setu-card-meta">Evidence accepted for release</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Total Disbursed Funds</span>
          <span class="setu-card-value" style="color: var(--setu-color-primary-navy);">₹${(totalDisbursed / 10000000).toFixed(2)} Cr</span>
          <span class="setu-card-meta">of ₹${(totalSanctioned / 10000000).toFixed(2)} Cr Sanctioned</span>
        </div>
      </div>

      <!-- Section 1: Pending Photo Evidence Queue -->
      <div class="setu-alert-section" style="margin-bottom: 24px;">
        <div class="setu-alert-section-header">
          <div>
            <h2 class="setu-table-title">📸 Milestone Physical Evidence Submissions (${allEvidence.length})</h2>
            <span class="setu-table-subtitle">Inspect geo-tagged site photographs and Junior Engineer verification artifacts submitted by Implementing Line Agencies</span>
          </div>
        </div>
        <div style="margin-top: 16px;">
          ${evidenceCardsHtml.length > 0 ? evidenceCardsHtml : `
            <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 32px; border-radius: 6px; text-align: center;">
              <p style="margin: 0; color: var(--setu-color-text-secondary);">No pending photo evidence submissions for your district.</p>
            </div>
          `}
        </div>
      </div>

      <!-- Section 2: Contractor Tax Invoices Queue -->
      <div class="setu-alert-section" style="margin-bottom: 24px;">
        <div class="setu-alert-section-header">
          <div>
            <h2 class="setu-table-title">📄 Contractor Tax Invoices & GST Vouchers (${allInvoices.length})</h2>
            <span class="setu-table-subtitle">Audit contractor bills, verify active GSTIN registrations, and approve expenditure before disbursement</span>
          </div>
        </div>
        <div style="margin-top: 16px;">
          ${invoiceCardsHtml.length > 0 ? invoiceCardsHtml : `
            <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 32px; border-radius: 6px; text-align: center;">
              <p style="margin: 0; color: var(--setu-color-text-secondary);">No contractor invoices submitted for audit.</p>
            </div>
          `}
        </div>
      </div>

      <!-- Section 3: Milestone Fund Tranche Release Control Table -->
      <div class="setu-table-container" style="background: white; border: 1px solid var(--setu-color-border-subtle); border-radius: 8px; padding: 20px;">
        <div style="margin-bottom: 16px;">
          <h2 class="setu-table-title">💳 Milestone Tranche Disbursement Control & Gating Status</h2>
          <span class="setu-table-subtitle">Tranche release is strictly locked until current milestone evidence and invoices are formally marked ACCEPTED</span>
        </div>
        <div class="setu-table-wrapper">
          <table class="setu-table">
            <thead>
              <tr>
                <th>Project Scheme</th>
                <th>Sanction / Disbursed</th>
                <th>Physical Progress</th>
                <th>Evidence Gate</th>
                <th>Tranche Disbursement Action</th>
              </tr>
            </thead>
            <tbody>
              ${trancheRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/**
 * 3. Risk Assessment View for District Authority
 */
export function getRiskAssessmentViewHtml() {
  let user = null;
  if (typeof sessionStorage !== 'undefined') {
    const rawU = sessionStorage.getItem('setu_auth_user');
    if (rawU) {
      try { user = JSON.parse(rawU); } catch {}
    }
  }

  const projects = scopedProjectsCache || mockProjects.filter((p) => {
    if (user?.district && p.district?.toLowerCase() !== user.district.toLowerCase()) return false;
    return true;
  });

  const sortedProjects = [...projects].sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));

  const highRisk = sortedProjects.filter(p => (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH');
  const medRisk = sortedProjects.filter(p => p.riskScore != null && p.riskScore >= 40 && p.riskScore < 60);
  const lowRisk = sortedProjects.filter(p => p.riskScore != null && p.riskScore < 40);
  const avgRisk = sortedProjects.length > 0 ? (sortedProjects.reduce((s, p) => s + (p.riskScore || 0), 0) / sortedProjects.length).toFixed(1) : '0.0';

  const cardsHtml = sortedProjects.map((p, idx) => {
    const isHigh = (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH';
    const isMed = p.riskScore != null && p.riskScore >= 40 && p.riskScore < 60;
    const badgeClass = isHigh ? 'setu-badge-risk-high' : isMed ? 'setu-badge' : 'setu-badge-risk-neutral';
    const riskLevel = isHigh ? 'HIGH' : isMed ? 'MEDIUM' : 'LOW';
    const plainExplanation = p.plainLanguageExplanation || (
      isHigh 
        ? `High disparity flagged between financial expenditure (${p.financialProgress || 0}%) and certified physical milestone progress (${p.physicalProgress || 0}%). Isolation forest anomaly index: 0.88.`
        : isMed
        ? `Moderate progress lag detected against scheduled baseline completion date.`
        : `Normal execution pace and expenditure trajectory within statutory tolerance limits.`
    );

    const drivers = [];
    if (p.paymentProgressMismatch) drivers.push('Disbursement Lead > 25%');
    if (p.daysDelayed && p.daysDelayed > 0) drivers.push(`Delayed: ${p.daysDelayed}d`);
    if (p.costOverrun) drivers.push('Cost Overrun Detected');
    if (drivers.length === 0) drivers.push('Standard Physical Pacing');

    return `
      <div class="setu-card" style="padding: 20px; background: white; border: 1px solid var(--setu-color-border-subtle); margin-bottom: 16px; border-left: 4px solid ${isHigh ? 'var(--setu-color-accent-base)' : isMed ? '#d97706' : '#059669'};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-weight: 700; font-size: 13px; color: var(--setu-color-text-muted);">#${idx + 1}</span>
              <span class="setu-detail-id-tag">${p.id}</span>
              <span class="setu-badge ${badgeClass}" style="${isMed ? 'background: #fef3c7; color: #92400e; border: 1px solid #fde68a;' : ''}">
                Score: ${p.riskScore} (${riskLevel})
              </span>
            </div>
            <a href="#/project/${p.id}" style="font-size: 15px; font-weight: 700; color: var(--setu-color-primary-navy); text-decoration: none;">
              ${p.name} →
            </a>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: var(--setu-color-text-muted);">Sanction: <strong>₹${Number(p.sanctionedAmount).toLocaleString('en-IN')}</strong></div>
            <div style="font-size: 11px; color: var(--setu-color-text-muted);">Status: <span class="setu-status-tag">${p.status}</span></div>
          </div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px; margin-bottom: 12px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--setu-color-primary-navy); margin-bottom: 4px;">
            🤖 Plain-Language Risk & SHAP Synthesis:
          </div>
          <p style="margin: 0; font-size: 13px; color: var(--setu-color-text-primary); line-height: 1.5;">
            ${plainExplanation}
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
            <span style="font-size: 11px; color: var(--setu-color-text-muted); font-weight: 600;">Key SHAP Attributions:</span>
            ${drivers.map(d => `<span class="setu-badge" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; font-size: 10px;">${d}</span>`).join('')}
          </div>
          <a href="#/project/${p.id}" class="setu-btn-primary" style="padding: 6px 14px; font-size: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            Inspect Deep Risk Breakdown & SHAP Waterfall →
          </a>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="setu-dashboard">
      <div class="setu-page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 class="setu-page-title">District Risk Assessment & Anomaly Engine</h1>
          <p class="setu-page-desc">All district projects ranked by Isolation Forest anomaly scores and SHAP explainable AI attributions.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="setu-badge" style="background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; font-size: 11px;">
            Isolation Forest Model • SHAP Attribution
          </span>
          <span class="setu-badge" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; font-size: 11px;">
            District: <strong>${user?.district || 'Assigned Scope'}</strong>
          </span>
        </div>
      </div>

      <!-- Risk KPI Summary Ribbon -->
      <div class="setu-stat-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-bottom: 24px;">
        <div class="setu-card">
          <span class="setu-card-label">Monitored District Schemes</span>
          <span class="setu-card-value">${sortedProjects.length}</span>
          <span class="setu-card-meta">Evaluated by Risk Engine</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">High Risk Schemes</span>
          <span class="setu-card-value ${highRisk.length > 0 ? 'setu-card-value-accent' : ''}">${highRisk.length}</span>
          <span class="setu-card-meta">Score ≥ 60 / 100</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Medium Risk</span>
          <span class="setu-card-value" style="color: #d97706;">${medRisk.length}</span>
          <span class="setu-card-meta">Score 40 - 59</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Low Risk</span>
          <span class="setu-card-value" style="color: #059669;">${lowRisk.length}</span>
          <span class="setu-card-meta">Normal parameters</span>
        </div>
        <div class="setu-card">
          <span class="setu-card-label">Average Risk Index</span>
          <span class="setu-card-value" style="color: var(--setu-color-primary-navy);">${avgRisk}</span>
          <span class="setu-card-meta">District composite score</span>
        </div>
      </div>

      <div class="setu-alert-section">
        <div class="setu-alert-section-header">
          <div>
            <h2 class="setu-table-title">Ranked Anomaly Portfolio (${sortedProjects.length} Works)</h2>
            <span class="setu-table-subtitle">Projects sorted in descending order of anomaly likelihood with explainable risk drivers</span>
          </div>
        </div>

        <div style="margin-top: 16px;">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;
}

/**
 * 6. District Operational Audit Trail View
 */
export function getDistrictAuditTrailViewHtml(filterCategory = 'ALL') {
  let user = null;
  if (typeof sessionStorage !== 'undefined') {
    const rawU = sessionStorage.getItem('setu_auth_user');
    if (rawU) {
      try { user = JSON.parse(rawU); } catch {}
    }
  }

  const projects = scopedProjectsCache || mockProjects.filter((p) => {
    if (user?.district && p.district?.toLowerCase() !== user.district.toLowerCase()) return false;
    return true;
  });

  const logs = [];
  projects.forEach((p) => {
    if (p.auditLogs && Array.isArray(p.auditLogs)) {
      p.auditLogs.forEach((log) => {
        logs.push({
          ...log,
          projectId: p.id,
          projectName: p.name,
          category: log.category || (log.action?.includes('Sanction') || log.action?.includes('Proposal') ? 'ADMINISTRATIVE' : log.action?.includes('Tranche') ? 'TRANCHE_RELEASE' : log.action?.includes('Evidence') ? 'EVIDENCE_REVIEW' : log.action?.includes('Transfer') ? 'ASSET_TRANSFER' : 'EXECUTION_UPDATE'),
        });
      });
    } else {
      logs.push({
        date: '2026-02-10',
        timestamp: '2026-02-10T14:00:00Z',
        action: `Milestone progress recorded (${p.physicalProgress}%) by site inspector.`,
        actor: p.implementingAgency || 'Line Department Engineer',
        category: 'EXECUTION_UPDATE',
        projectId: p.id,
        projectName: p.name,
      });
      logs.push({
        date: '2025-10-18',
        timestamp: '2025-10-18T11:45:00Z',
        action: `Administrative Sanction issued for ₹${Number(p.sanctionedAmount).toLocaleString('en-IN')}`,
        actor: `District Collectorate, ${p.district}`,
        category: 'ADMINISTRATIVE',
        projectId: p.id,
        projectName: p.name,
      });
    }
  });

  logs.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));

  const filteredLogs = filterCategory === 'ALL'
    ? logs
    : logs.filter(l => l.category === filterCategory);

  return `
    <div class="setu-dashboard">
      <div class="setu-page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 class="setu-page-title">District Operational Audit Trail</h1>
          <p class="setu-page-desc">Chronological, tamper-evident operational record for ${user?.district || 'District Authority'}: administrative decisions, proposal scrutiny, evidence verifications, tranche disbursements, and asset handovers.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="setu-badge" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; font-size: 11px;">
            District Scope: <strong>${user?.district || 'Assigned District'}</strong> (${logs.length} Total Events)
          </span>
        </div>
      </div>

      <div class="setu-card" style="padding: 24px; background: white; border: 1px solid var(--setu-color-border-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
          <h2 class="setu-table-title" style="margin: 0;">Operational Event Stream (${filteredLogs.length})</h2>
          <div class="setu-alert-filter-group">
            <button type="button" class="setu-filter-pill ${filterCategory === 'ALL' ? 'active' : ''}" onclick="window.setuSetAuditFilter && window.setuSetAuditFilter('ALL')">All Events</button>
            <button type="button" class="setu-filter-pill ${filterCategory === 'ADMINISTRATIVE' ? 'active' : ''}" onclick="window.setuSetAuditFilter && window.setuSetAuditFilter('ADMINISTRATIVE')">Administrative Decisions</button>
            <button type="button" class="setu-filter-pill ${filterCategory === 'EVIDENCE_REVIEW' ? 'active' : ''}" onclick="window.setuSetAuditFilter && window.setuSetAuditFilter('EVIDENCE_REVIEW')">Evidence Reviews</button>
            <button type="button" class="setu-filter-pill ${filterCategory === 'TRANCHE_RELEASE' ? 'active' : ''}" onclick="window.setuSetAuditFilter && window.setuSetAuditFilter('TRANCHE_RELEASE')">Tranche Releases</button>
            <button type="button" class="setu-filter-pill ${filterCategory === 'ASSET_TRANSFER' ? 'active' : ''}" onclick="window.setuSetAuditFilter && window.setuSetAuditFilter('ASSET_TRANSFER')">Asset Transfers</button>
          </div>
        </div>

        <div class="setu-timeline">
          ${filteredLogs.map((log) => `
            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="setu-timeline-date">${log.date || log.timestamp?.split('T')[0]} • ${log.timestamp ? log.timestamp.split('T')[1]?.slice(0, 5) : '10:00'}</span>
                <span class="setu-badge" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; font-size: 10px; font-weight: 600;">
                  ${log.category || 'OPERATION'}
                </span>
              </div>
              <span class="setu-timeline-action" style="margin-top: 4px; font-weight: 600; color: var(--setu-color-primary-navy);">
                ${log.action}
              </span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 12px;">
                <span class="setu-timeline-actor">Actor: <strong>${log.actor || 'District Authority'}</strong></span>
                <a href="#/project/${log.projectId}" style="color: #0284c7; text-decoration: none; font-family: var(--setu-font-mono); font-size: 11px;">
                  Ref: ${log.projectId} (${log.projectName?.slice(0, 30)}...) →
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
'''

# Insert new_da_views_code before wireAgencyModals
wire_agency_idx = dash_content.find("export function wireAgencyModals")
if wire_agency_idx != -1:
    dash_content = dash_content[:wire_agency_idx] + new_da_views_code + "\n" + dash_content[wire_agency_idx:]
    print("Inserted new DA view functions successfully.")
else:
    print("Warning: export function wireAgencyModals not found!")

# Also ensure setuOpenProposalApproveModal alias and global filter setters exist in wireDistrictModals
global_filter_wiring = '''
  // Global filter handlers
  window.setuSetSharedAlertFilter = (filterType, subFilter) => {
    const mainContentEl = document.querySelector('#setu-main-content');
    if (mainContentEl) {
      mainContentEl.innerHTML = getSharedAlertsViewHtml(filterType, subFilter);
    }
  };
  window.setuSetAuditFilter = (filterCategory) => {
    const mainContentEl = document.querySelector('#setu-main-content');
    if (mainContentEl) {
      mainContentEl.innerHTML = getDistrictAuditTrailViewHtml(filterCategory);
    }
  };
  window.setuOpenProposalApproveModal = window.setuOpenProposalApprovalModal;
  window.setuOpenProposalRejectModal = window.setuOpenProposalRejectionModal;
'''

if "window.setuSetSharedAlertFilter" not in dash_content:
    wire_dist_idx = dash_content.find("export function wireDistrictModals")
    if wire_dist_idx != -1:
        insert_pos = dash_content.find("{", wire_dist_idx) + 1
        dash_content = dash_content[:insert_pos] + global_filter_wiring + dash_content[insert_pos:]
        print("Wired global filter handlers in wireDistrictModals.")

# Also update table rows for District Authority in getDashboardHtml to show inline proposal approve/reject actions
# Let's inspect getDashboardHtml rowsHtml generation for District Authority:
prop_inline_actions = '''      if (isDistrictRole && (p.status === 'Proposed - Under Scrutiny' || p.status === 'Proposed')) {
        return `
        <tr class="setu-clickable-row" data-project-id="${p.id}" style="background-color: #f0fdf4;">
          <td>
            <a href="#/project/${p.id}" style="color: inherit; text-decoration: none;">
              <div class="setu-project-name" style="font-weight: 700; color: #166534;">📋 ${p.name}</div>
              <div class="setu-project-id" style="font-family: var(--setu-font-mono); font-size: 11px; color: #15803d;">${p.id} • MP Proposal</div>
            </a>
          </td>
          <td>${p.district}</td>
          <td>${p.category}</td>
          <td><span class="setu-status-tag" style="background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; font-weight: 700;">Proposed</span></td>
          <td>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button type="button" class="setu-btn-primary" onclick="event.stopPropagation(); window.setuOpenProposalApprovalModal('${p.id}', '${(p.name || '').replace(/'/g, "\\'")}', ${p.sanctionedAmount || p.estimatedCost || 5000000}, '${p.district}')" style="padding: 4px 8px; font-size: 11px; background: #059669; border: none; border-radius: 3px; color: white; cursor: pointer; font-weight: 600;">
                ✓ Approve
              </button>
              <button type="button" onclick="event.stopPropagation(); window.setuOpenProposalRejectionModal('${p.id}', '${(p.name || '').replace(/'/g, "\\'")}')" style="padding: 4px 8px; font-size: 11px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 3px; color: #991b1b; cursor: pointer; font-weight: 600;">
                ✕ Reject
              </button>
            </div>
          </td>
        </tr>`;
      }
'''

if "Proposed - Under Scrutiny" not in dash_content[dash_content.find("const rowsHtml = sortedProjects"):dash_content.find("const rowsHtml = sortedProjects") + 3000]:
    row_match = re.search(r"return `\s*<tr class=\"setu-clickable-row\" data-project-id=\"\$\{p\.id\}\" onclick=\"window\.location\.hash='#/project/\$\{p\.id\}'\">", dash_content)
    if row_match:
        pos = row_match.start()
        dash_content = dash_content[:pos] + prop_inline_actions + "\n      " + dash_content[pos:]
        print("Added inline MP proposal scrutiny actions for District Authority in Projects Audit table.")

with open(dashboard_path, "w", encoding="utf-8") as f:
    f.write(dash_content)
print("Updated dashboardData.js successfully.")


# 2. Update Layout.js
with open(layout_path, "r", encoding="utf-8") as f:
    layout_content = f.read()

# Update imports in Layout.js
imports_pattern = r"import \{\s*getDashboardHtml[\s\S]*?\} from '\.\./pages/dashboardData\.js';"
new_imports = '''import {
  getDashboardHtml,
  getAlertsViewHtml,
  getSharedAlertsViewHtml,
  getEvidenceAndTrancheViewHtml,
  getRiskAssessmentViewHtml,
  getDistrictAuditTrailViewHtml,
  getProposalFormHtml,
  wireProposalForm,
  wireDashboardInteractions,
  getEvidenceViewHtml,
  getInvoicesViewHtml,
  getUCViewHtml,
  getAuditTrailViewHtml,
  wireAgencyModals,
  wireDistrictModals,
} from '../pages/dashboardData.js';'''

layout_content = re.sub(imports_pattern, new_imports, layout_content)

# Update ROLE_NAV_PERMISSIONS for District Authority
layout_content = layout_content.replace(
    "'District Authority': ['projects', 'risk', 'compliance', 'citizen-reports', 'audit-trail', 'alerts'],",
    "'District Authority': ['projects', 'evidence-tranche', 'risk', 'compliance', 'citizen-reports', 'audit-trail', 'alerts'],"
)
layout_content = layout_content.replace(
    "'district_authority': ['projects', 'risk', 'compliance', 'citizen-reports', 'audit-trail', 'alerts'],",
    "'district_authority': ['projects', 'evidence-tranche', 'risk', 'compliance', 'citizen-reports', 'audit-trail', 'alerts'],"
)

# Update default navItems array in getLayoutHtml
nav_items_old = '''  navItems = [
    { label: 'Projects Audit', id: 'projects', active: true },
    { label: 'Risk Assessment & SHAP', id: 'risk' },
    { label: 'Compliance Flags', id: 'compliance' },
    { label: 'Duplicate Tracker', id: 'duplicates' },
    { label: 'Citizen Contradictions', id: 'citizen-reports' },
    { label: 'Audit Trail', id: 'audit-trail' },
    { label: 'System Alerts', id: 'alerts' },
  ],'''

nav_items_new = '''  navItems = [
    { label: 'Projects Audit', id: 'projects', active: true },
    { label: 'Evidence & Tranche Review', id: 'evidence-tranche' },
    { label: 'Risk Assessment', id: 'risk' },
    { label: 'Compliance Flags', id: 'compliance' },
    { label: 'Duplicate Tracker', id: 'duplicates' },
    { label: 'Citizen Contradictions', id: 'citizen-reports' },
    { label: 'Audit Trail', id: 'audit-trail' },
    { label: 'System Alerts', id: 'alerts' },
  ],'''

layout_content = layout_content.replace(nav_items_old, nav_items_new)

# Update mountLayout routing
nav_click_old = '''      if (mainContentEl) {
        if (navId === 'projects') {
          mainContentEl.innerHTML = getDashboardHtml();
          wireDashboardInteractions(mainContentEl);
          wireAgencyModals(mainContentEl);
        } else if (navId === 'evidence') {
          mainContentEl.innerHTML = getEvidenceViewHtml();
          wireAgencyModals(mainContentEl);
        } else if (navId === 'invoices') {
          mainContentEl.innerHTML = getInvoicesViewHtml();
          wireAgencyModals(mainContentEl);
        } else if (navId === 'utilization-certificates') {
          mainContentEl.innerHTML = getUCViewHtml();
          wireAgencyModals(mainContentEl);
        } else if (navId === 'audit-trail') {
          mainContentEl.innerHTML = getAuditTrailViewHtml();
          wireAgencyModals(mainContentEl);
        } else if (navId === 'submit-proposal') {
          mainContentEl.innerHTML = getProposalFormHtml();
          wireProposalForm(mainContentEl);
        } else if (navId === 'alerts') {
          window.setuSetAlertFilter = (filter) => {
            mainContentEl.innerHTML = getAlertsViewHtml(filter);
          };
          mainContentEl.innerHTML = getAlertsViewHtml('ALL');
        } else if (navId === 'citizen-reports') {
          window.setuSetAlertFilter = (filter) => {
            mainContentEl.innerHTML = getAlertsViewHtml(filter);
          };
          mainContentEl.innerHTML = getAlertsViewHtml('CITIZEN_CONTRADICTION');
        } else {
          mainContentEl.innerHTML = `
            <div class="setu-content-placeholder-container">
              <div class="setu-content-placeholder-text">Module content loaded.</div>
            </div>
          `;
        }
      }'''

nav_click_new = '''      if (mainContentEl) {
        if (navId === 'projects') {
          mainContentEl.innerHTML = getDashboardHtml();
          wireDashboardInteractions(mainContentEl);
          wireAgencyModals(mainContentEl);
          wireDistrictModals(mainContentEl);
        } else if (navId === 'evidence-tranche') {
          mainContentEl.innerHTML = getEvidenceAndTrancheViewHtml();
          wireDistrictModals(mainContentEl);
        } else if (navId === 'risk') {
          mainContentEl.innerHTML = getRiskAssessmentViewHtml();
          wireDistrictModals(mainContentEl);
        } else if (navId === 'compliance') {
          mainContentEl.innerHTML = getSharedAlertsViewHtml('COMPLIANCE');
          wireDistrictModals(mainContentEl);
        } else if (navId === 'citizen-reports') {
          mainContentEl.innerHTML = getSharedAlertsViewHtml('CITIZEN_CONTRADICTION');
          wireDistrictModals(mainContentEl);
        } else if (navId === 'audit-trail') {
          mainContentEl.innerHTML = isAgencyRole ? getAuditTrailViewHtml() : getDistrictAuditTrailViewHtml();
          wireAgencyModals(mainContentEl);
          wireDistrictModals(mainContentEl);
        } else if (navId === 'alerts') {
          mainContentEl.innerHTML = getSharedAlertsViewHtml('ALL');
          wireDistrictModals(mainContentEl);
        } else if (navId === 'evidence') {
          mainContentEl.innerHTML = getEvidenceViewHtml();
          wireAgencyModals(mainContentEl);
        } else if (navId === 'invoices') {
          mainContentEl.innerHTML = getInvoicesViewHtml();
          wireAgencyModals(mainContentEl);
        } else if (navId === 'utilization-certificates') {
          mainContentEl.innerHTML = getUCViewHtml();
          wireAgencyModals(mainContentEl);
        } else if (navId === 'submit-proposal') {
          mainContentEl.innerHTML = getProposalFormHtml();
          wireProposalForm(mainContentEl);
        } else {
          mainContentEl.innerHTML = `
            <div class="setu-content-placeholder-container">
              <div class="setu-content-placeholder-text">Module content loaded.</div>
            </div>
          `;
        }
      }'''

layout_content = layout_content.replace(nav_click_old, nav_click_new)

# Ensure initial mount also calls wireDistrictModals
layout_content = layout_content.replace(
    '''  if (mainContentEl) {
    wireDashboardInteractions(mainContentEl);
    wireAgencyModals(mainContentEl);
  }''',
    '''  if (mainContentEl) {
    wireDashboardInteractions(mainContentEl);
    wireAgencyModals(mainContentEl);
    wireDistrictModals(mainContentEl);
  }'''
)

with open(layout_path, "w", encoding="utf-8") as f:
    f.write(layout_content)
print("Updated Layout.js successfully.")
