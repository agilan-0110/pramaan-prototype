/**
 * SETU Layout Shell Component
 * 
 * Implements the government audit dashboard layout:
 * - Navy institutional header with project title/logo, role indicator, and logout.
 * - Light sidebar with plain-text navigation links and thin separation border.
 * - Minimal, single-line institutional disclaimer footer.
 * - Main content area with white background and dense padding.
 * 
 * Strictly utilizes tokens from /frontend/src/theme/tokens.js and tokens.css.
 */

import tokens from '../theme/tokens.js';
import {
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
  getStateScopedContext,
  getStateOverviewHtml,
  getStateEscalatedFlagsHtml,
  getStateComplianceFlagsHtml,
  getStateDuplicateTrackerHtml,
  getStateTrendUtilizationHtml,
  getStateSystemAlertsHtml,
  wireStateNodalModals,
  getMospiScopedContext,
  getMospiCommandOverviewHtml,
  getMospiEscalationsAndDirectivesHtml,
  getMospiStatutoryComplianceHtml,
  getMospiInterstateDuplicatesHtml,
  getMospiCitizenIntelligenceHtml,
  getMospiNationalTrendHtml,
  getMospiNationalAlertCommandHtml,
  wireMospiModals,
  getAuditorScopedContext,
  getAuditorStatutoryRegisterHtml,
  getAuditorResolutionHistoryHtml,
  getAuditorUnresolvedOnCompletionHtml,
  getAuditorFormalObservationsHtml,
  getAuditorOverrideLogHtml,
  wireAuditorModals,
} from '../pages/dashboardData.js';

/**
 * Role-Based Sidebar Navigation Visibility Matrix (per ROLES.md)
 */
export const ROLE_NAV_PERMISSIONS = {
  'Central Nodal Agency (MoSPI)': ['projects', 'escalations', 'compliance', 'duplicates', 'citizen-reports', 'trend', 'alerts'],
  'mospi_officer': ['projects', 'escalations', 'compliance', 'duplicates', 'citizen-reports', 'trend', 'alerts'],
  'Auditor / CAG': ['projects', 'status-trail', 'unresolved-completion', 'observations', 'override-log'],
  'auditor_cag': ['projects', 'status-trail', 'unresolved-completion', 'observations', 'override-log'],
  'State Nodal Authority': ['projects', 'escalations', 'compliance', 'duplicates', 'trend', 'alerts'],
  'state_nodal': ['projects', 'escalations', 'compliance', 'duplicates', 'trend', 'alerts'],
  'District Authority': ['projects', 'evidence-tranche', 'risk', 'compliance', 'citizen-reports', 'audit-trail', 'alerts'],
  'district_authority': ['projects', 'evidence-tranche', 'risk', 'compliance', 'citizen-reports', 'audit-trail', 'alerts'],
  'Implementing Agency': ['projects', 'evidence', 'invoices', 'utilization-certificates', 'audit-trail'],
  'implementing_agency': ['projects', 'evidence', 'invoices', 'utilization-certificates', 'audit-trail'],
  'MP Office': ['projects', 'submit-proposal'],
  'mp_office': ['projects', 'submit-proposal'],
};

/**
 * Universal Header Role Resolver
 * Reads role directly from the authenticated session (JWT token or user object)
 * and normalizes it to official statutory role names per ROLES.md.
 */
export function normalizeRoleName(raw) {
  if (!raw) return 'Authorized Official';
  const clean = String(raw).trim();
  const lower = clean.toLowerCase();

  if (lower === 'state_nodal' || lower.includes('state nodal') || (lower.includes('state') && !lower.includes('district'))) {
    return 'State Nodal Authority';
  }
  if (lower === 'mospi_officer' || lower.includes('mospi') || lower.includes('cna') || lower.includes('central nodal')) {
    return 'Central Nodal Agency (MoSPI)';
  }
  if (lower === 'auditor_cag' || lower.includes('cag') || lower.includes('auditor')) {
    return 'Auditor / CAG';
  }
  if (lower === 'mp_office' || lower.includes('mp office') || lower === 'mp' || lower.includes('member of parliament')) {
    return 'MP Office';
  }
  if (lower.includes('implementing') || lower.includes('pwd') || lower.includes('twad') || lower === 'implementing_agency') {
    return 'Implementing Agency';
  }
  if (lower === 'district_authority' || lower.includes('district')) {
    return 'District Authority';
  }
  return clean;
}

export function resolveSessionRole(explicitRole = null) {
  let candidate = (explicitRole || '').trim();

  if (typeof sessionStorage !== 'undefined') {
    // 1. JWT Token (cryptographically signed ground truth)
    const token = sessionStorage.getItem('setu_auth_token');
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length >= 2) {
          const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const jsonStr = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          const payload = JSON.parse(jsonStr);
          if (payload.role) return normalizeRoleName(payload.role);
          if (payload.roleName) return normalizeRoleName(payload.roleName);
          if (payload.roleId) return normalizeRoleName(payload.roleId);
        }
      } catch {}
    }

    // 2. Auth User session object
    const rawUser = sessionStorage.getItem('setu_auth_user');
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        if (u.role) return normalizeRoleName(u.role);
        if (u.roleName) return normalizeRoleName(u.roleName);
        if (u.roleId) return normalizeRoleName(u.roleId);
      } catch {}
    }

    // 3. Stored role string
    const storedRole = (sessionStorage.getItem('setu_auth_role') || '').trim();
    if (storedRole) {
      return normalizeRoleName(storedRole);
    }
  }

  // 4. Fallback to candidate if passed and not a placeholder
  if (candidate && candidate !== 'Authorized Official') {
    return normalizeRoleName(candidate);
  }

  return candidate || 'District Authority';
}

export function getLayoutHtml({
  projectName = 'SETU',
  subtitle = 'Audit & Monitoring Platform',
  role = null,
  navItems = [
    { label: 'Projects Audit', id: 'projects', active: true },
    { label: 'Evidence & Tranche Review', id: 'evidence-tranche' },
    { label: 'Risk Assessment', id: 'risk' },
    { label: 'Compliance Flags', id: 'compliance' },
    { label: 'Duplicate Tracker', id: 'duplicates' },
    { label: 'Citizen Contradictions', id: 'citizen-reports' },
    { label: 'Audit Trail', id: 'audit-trail' },
    { label: 'System Alerts', id: 'alerts' },
  ],
  content = null,
  disclaimer = 'Official Government Audit Portal • Strictly for Authorized Personnel Only • Governed under MoSPI & CAG Audit Oversight Guidelines',
} = {}) {
  // Universal role resolution — reads directly from JWT token/sessionStorage
  const displayRole = resolveSessionRole(role);
  const roleKey = displayRole;
  const roleClean = roleKey.toLowerCase();
  
  let rawUserObj = null;
  if (typeof sessionStorage !== 'undefined') {
    const rawU = sessionStorage.getItem('setu_auth_user');
    if (rawU) {
      try { rawUserObj = JSON.parse(rawU); } catch {}
    }
  }

  const userScope = rawUserObj?.accessScope || '';
  const isAuditorRole = userScope === 'statutory_audit_all' ||
    roleClean === 'auditor / cag' ||
    roleClean === 'auditor_cag' ||
    roleClean.includes('cag') ||
    roleClean.includes('auditor');
  const isMospiRole = !isAuditorRole && (
    userScope === 'national_all' ||
    roleClean === 'central nodal agency (mospi)' ||
    roleClean === 'mospi_officer' ||
    roleClean.includes('mospi') ||
    roleClean.includes('central nodal')
  );
  const isAgencyRole = !isAuditorRole && !isMospiRole && (
    userScope === 'agency_assigned_only' ||
    roleClean === 'implementing agency' ||
    roleClean === 'implementing_agency' ||
    roleClean.includes('implementing') ||
    roleClean.includes('pwd') ||
    roleClean.includes('twad') ||
    (roleClean.includes('agency') && !roleClean.includes('central') && !roleClean.includes('mospi'))
  );
  const isMpRole = !isAuditorRole && !isMospiRole && !isAgencyRole && (userScope === 'constituency_only' || userScope === 'nominated_mp_districts' || /\bmp\b/i.test(roleClean) || roleClean.includes('member of parliament'));
  const isStateRole = !isAuditorRole && !isMospiRole && !isAgencyRole && !isMpRole && (
    userScope === 'state_only' ||
    userScope === 'state_rollup' ||
    roleClean === 'state nodal authority' ||
    roleClean === 'state_nodal' ||
    (roleClean.includes('state') && !roleClean.includes('district') && !roleClean.includes('central') && !roleClean.includes('mospi'))
  );
  
  const groupTitle = isAuditorRole ? 'STATUTORY AUDIT & CAG COMMAND' : isMospiRole ? 'NATIONAL APEX COMMAND' : isMpRole ? 'CONSTITUENCY MODULES' : isAgencyRole ? 'EXECUTION MODULES' : isStateRole ? 'STATE OVERSIGHT MODULES' : 'AUDIT MODULES';

  const defaultContent = content !== null ? content : (
    isAuditorRole ? getAuditorStatutoryRegisterHtml()
    : isMospiRole ? getMospiCommandOverviewHtml()
    : isStateRole ? getStateOverviewHtml()
    : isMpRole ? getDashboardHtml({ role: roleKey, roleId: 'mp_office', accessScope: 'constituency_only', constituency: 'Chennai Central' })
    : isAgencyRole ? getDashboardHtml({ role: roleKey, roleId: 'implementing_agency', accessScope: 'agency_assigned_only', agency: rawUserObj?.agency || 'Public Works Department (PWD)' })
    : getDashboardHtml()
  );

  let filteredNavItems = [];
  if (isAuditorRole) {
    filteredNavItems = [
      { label: 'Statutory Audit Register', id: 'projects', active: true },
      { label: 'Resolution History & Status Trail', id: 'status-trail' },
      { label: 'Unresolved on Completion', id: 'unresolved-completion' },
      { label: 'Formal Observations', id: 'observations' },
      { label: 'Audit Override Log', id: 'override-log' },
    ];
  } else if (isMospiRole) {
    filteredNavItems = [
      { label: 'National Command Overview', id: 'projects', active: true },
      { label: 'Escalation & Directives', id: 'escalations' },
      { label: 'Statutory Compliance Register', id: 'compliance' },
      { label: 'Inter-State Duplicate Registry', id: 'duplicates' },
      { label: 'Citizen Ground Truth Intelligence', id: 'citizen-reports' },
      { label: 'National Trend & Forecasting', id: 'trend' },
      { label: 'National Alert Command', id: 'alerts' },
    ];
  } else if (isStateRole) {
    filteredNavItems = [
      { label: 'State Overview', id: 'projects', active: true },
      { label: 'Escalated Flags', id: 'escalations' },
      { label: 'Compliance Flags', id: 'compliance' },
      { label: 'Duplicate Tracker', id: 'duplicates' },
      { label: 'Trend & Utilization', id: 'trend' },
      { label: 'System Alerts', id: 'alerts' },
    ];
  } else if (isMpRole) {
    filteredNavItems = [
      { label: 'My Projects', id: 'projects', active: true },
      { label: 'Submit Proposal', id: 'submit-proposal' },
    ];
  } else if (isAgencyRole) {
    filteredNavItems = [
      { label: 'Assigned Works', id: 'projects', active: true },
      { label: 'Milestone Evidence', id: 'evidence' },
      { label: 'Invoices & Bills', id: 'invoices' },
      { label: 'Utilization Certificates', id: 'utilization-certificates' },
      { label: 'Execution Logs', id: 'audit-trail' },
    ];
  } else {
    const allowedNavIds = ROLE_NAV_PERMISSIONS[roleKey] || (
      roleKey.toLowerCase().includes('mospi')
        ? ['projects', 'escalations', 'compliance', 'duplicates', 'citizen-reports', 'trend', 'alerts']
        : ['projects', 'risk', 'compliance', 'citizen-reports', 'audit-trail', 'alerts']
    );
    filteredNavItems = navItems.filter((item) => allowedNavIds.includes(item.id));
  }

  const navHtml = filteredNavItems
    .map(
      (item) => `
      <li class="setu-nav-item">
        <a href="#${item.id}" class="setu-nav-link ${item.active ? 'active' : ''}" data-nav-id="${item.id}">
          ${item.label}
        </a>
      </li>`
    )
    .join('');

  return `
    <div class="setu-shell">
      <!-- Institutional Navy Header -->
      <header class="setu-header">
        <div class="setu-header-brand">
          <div class="setu-brand-logo">GOV</div>
          <span class="setu-brand-title">${projectName}</span>
          <span class="setu-brand-subtitle">${subtitle}</span>
        </div>
        <div class="setu-header-actions">
          <div class="setu-role-badge">
            <span class="setu-role-label">Role:</span>
            <span class="setu-role-name">${displayRole}</span>
          </div>
          <button type="button" class="setu-logout-btn" id="setu-logout-button">Logout</button>
        </div>
      </header>

      <!-- Workspace: Sidebar + Main Content -->
      <div class="setu-workspace">
        <aside class="setu-sidebar">
          <div class="setu-nav-group-title">${groupTitle}</div>
          <nav>
            <ul class="setu-nav-list">
              ${navHtml}
            </ul>
          </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="setu-main" id="setu-main-content">
          ${defaultContent}
        </main>
      </div>

      <!-- Minimal Single-Line Disclaimer Footer -->
      <footer class="setu-footer">
        <span class="setu-footer-text">${disclaimer}</span>
      </footer>
    </div>
  `;
}

/**
 * Mounts the layout shell into a DOM element.
 * 
 * @param {HTMLElement} mountEl Target DOM element
 * @param {Object} options Configuration options
 */
export function mountLayout(mountEl, options = {}) {
  if (!mountEl) {
    throw new Error('mountLayout requires a valid DOM element.');
  }
  mountEl.innerHTML = getLayoutHtml(options);

  const displayRole = resolveSessionRole(options.role);
  const roleClean = displayRole.toLowerCase();
  let rawUserObj = null;
  if (typeof sessionStorage !== 'undefined') {
    const rawU = sessionStorage.getItem('setu_auth_user');
    if (rawU) {
      try { rawUserObj = JSON.parse(rawU); } catch {}
    }
  }
  const userScope = rawUserObj?.accessScope || '';
  const isAuditorRole = userScope === 'statutory_audit_all' ||
    roleClean === 'auditor / cag' ||
    roleClean === 'auditor_cag' ||
    roleClean.includes('cag') ||
    roleClean.includes('auditor');
  const isMospiRole = !isAuditorRole && (
    userScope === 'national_all' ||
    roleClean === 'central nodal agency (mospi)' ||
    roleClean === 'mospi_officer' ||
    roleClean.includes('mospi') ||
    roleClean.includes('central nodal')
  );
  const isAgencyRole = !isAuditorRole && !isMospiRole && (
    userScope === 'agency_assigned_only' ||
    roleClean === 'implementing agency' ||
    roleClean === 'implementing_agency' ||
    roleClean.includes('implementing') ||
    roleClean.includes('pwd') ||
    roleClean.includes('twad') ||
    (roleClean.includes('agency') && !roleClean.includes('central') && !roleClean.includes('mospi'))
  );
  const isMpRole = !isAuditorRole && !isMospiRole && !isAgencyRole && (userScope === 'constituency_only' || userScope === 'nominated_mp_districts' || /\bmp\b/i.test(roleClean) || roleClean.includes('member of parliament'));
  const isStateRole = !isAuditorRole && !isMospiRole && !isAgencyRole && !isMpRole && (
    userScope === 'state_only' ||
    userScope === 'state_rollup' ||
    roleClean === 'state nodal authority' ||
    roleClean === 'state_nodal' ||
    (roleClean.includes('state') && !roleClean.includes('district') && !roleClean.includes('central') && !roleClean.includes('mospi'))
  );

  // Setup click listeners for plain text navigation items
  const navLinks = mountEl.querySelectorAll('.setu-nav-link');
  const mainContentEl = mountEl.querySelector('#setu-main-content');

  // Initial dashboard interactions wiring
  if (mainContentEl) {
    if (isAuditorRole) {
      wireAuditorModals(mainContentEl);
    } else if (isMospiRole) {
      wireMospiModals(mainContentEl);
    } else if (isStateRole) {
      wireStateNodalModals(mainContentEl);
    } else if (isAgencyRole) {
      wireDashboardInteractions(mainContentEl);
      wireAgencyModals(mainContentEl);
    } else {
      wireDashboardInteractions(mainContentEl);
      wireDistrictModals(mainContentEl);
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');

      const navId = link.getAttribute('data-nav-id');
      if (mainContentEl) {
        if (isAuditorRole) {
          if (navId === 'projects') {
            mainContentEl.innerHTML = getAuditorStatutoryRegisterHtml();
            wireAuditorModals(mainContentEl);
          } else if (navId === 'status-trail') {
            mainContentEl.innerHTML = getAuditorResolutionHistoryHtml();
            wireAuditorModals(mainContentEl);
          } else if (navId === 'unresolved-completion') {
            mainContentEl.innerHTML = getAuditorUnresolvedOnCompletionHtml();
            wireAuditorModals(mainContentEl);
          } else if (navId === 'observations') {
            mainContentEl.innerHTML = getAuditorFormalObservationsHtml();
            wireAuditorModals(mainContentEl);
          } else if (navId === 'override-log') {
            mainContentEl.innerHTML = getAuditorOverrideLogHtml();
            wireAuditorModals(mainContentEl);
          } else {
            mainContentEl.innerHTML = getAuditorStatutoryRegisterHtml();
            wireAuditorModals(mainContentEl);
          }
        } else if (isMospiRole) {
          if (navId === 'projects') {
            mainContentEl.innerHTML = getMospiCommandOverviewHtml();
            wireMospiModals(mainContentEl);
          } else if (navId === 'escalations') {
            mainContentEl.innerHTML = getMospiEscalationsAndDirectivesHtml();
            wireMospiModals(mainContentEl);
          } else if (navId === 'compliance') {
            mainContentEl.innerHTML = getMospiStatutoryComplianceHtml();
            wireMospiModals(mainContentEl);
          } else if (navId === 'duplicates') {
            mainContentEl.innerHTML = getMospiInterstateDuplicatesHtml();
            wireMospiModals(mainContentEl);
          } else if (navId === 'citizen-reports') {
            mainContentEl.innerHTML = getMospiCitizenIntelligenceHtml();
            wireMospiModals(mainContentEl);
          } else if (navId === 'trend') {
            mainContentEl.innerHTML = getMospiNationalTrendHtml();
            wireMospiModals(mainContentEl);
          } else if (navId === 'alerts') {
            mainContentEl.innerHTML = getMospiNationalAlertCommandHtml();
            wireMospiModals(mainContentEl);
          } else {
            mainContentEl.innerHTML = getMospiCommandOverviewHtml();
            wireMospiModals(mainContentEl);
          }
        } else if (isStateRole) {
          if (navId === 'projects') {
            mainContentEl.innerHTML = getStateOverviewHtml();
            wireStateNodalModals(mainContentEl);
          } else if (navId === 'escalations') {
            mainContentEl.innerHTML = getStateEscalatedFlagsHtml();
            wireStateNodalModals(mainContentEl);
          } else if (navId === 'compliance') {
            mainContentEl.innerHTML = getStateComplianceFlagsHtml();
            wireStateNodalModals(mainContentEl);
          } else if (navId === 'duplicates') {
            mainContentEl.innerHTML = getStateDuplicateTrackerHtml();
            wireStateNodalModals(mainContentEl);
          } else if (navId === 'trend') {
            mainContentEl.innerHTML = getStateTrendUtilizationHtml();
            wireStateNodalModals(mainContentEl);
          } else if (navId === 'alerts') {
            mainContentEl.innerHTML = getStateSystemAlertsHtml();
            wireStateNodalModals(mainContentEl);
          } else {
            mainContentEl.innerHTML = getStateOverviewHtml();
            wireStateNodalModals(mainContentEl);
          }
        } else if (isMpRole) {
          if (navId === 'projects') {
            mainContentEl.innerHTML = getDashboardHtml();
            wireDashboardInteractions(mainContentEl);
          } else if (navId === 'submit-proposal') {
            mainContentEl.innerHTML = getProposalFormHtml();
            wireProposalForm(mainContentEl);
          }
        } else if (isAgencyRole) {
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
          }
        } else {
          if (navId === 'projects') {
            mainContentEl.innerHTML = getDashboardHtml();
            wireDashboardInteractions(mainContentEl);
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
          } else if (navId === 'duplicates') {
            mainContentEl.innerHTML = getSharedAlertsViewHtml('DUPLICATE_WORK');
            wireDistrictModals(mainContentEl);
          } else if (navId === 'citizen-reports') {
            mainContentEl.innerHTML = getSharedAlertsViewHtml('CITIZEN_CONTRADICTION');
            wireDistrictModals(mainContentEl);
          } else if (navId === 'audit-trail') {
            mainContentEl.innerHTML = getDistrictAuditTrailViewHtml();
            wireDistrictModals(mainContentEl);
          } else if (navId === 'alerts') {
            mainContentEl.innerHTML = getSharedAlertsViewHtml('ALL');
            wireDistrictModals(mainContentEl);
          } else {
            mainContentEl.innerHTML = `
              <div class="setu-content-placeholder-container">
                <div class="setu-content-placeholder-text">Module content loaded.</div>
              </div>
            `;
          }
        }
      }

      if (typeof options.onNavChange === 'function') {
        options.onNavChange(navId);
      }
    });
  });

  // Setup logout listener
  const logoutBtn = mountEl.querySelector('#setu-logout-button');
  if (logoutBtn && typeof options.onLogout === 'function') {
    logoutBtn.addEventListener('click', options.onLogout);
  }
}

export default {
  getLayoutHtml,
  mountLayout,
  tokens,
};
