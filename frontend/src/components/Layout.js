/**
 * PRAMAAN Layout Shell Component
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
  'District Authority': ['projects', 'evidence-tranche', 'risk', 'compliance', 'duplicates', 'citizen-reports', 'audit-trail', 'alerts'],
  'district_authority': ['projects', 'evidence-tranche', 'risk', 'compliance', 'duplicates', 'citizen-reports', 'audit-trail', 'alerts'],
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
  projectName = 'PRAMAAN',
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
        : ['projects', 'evidence-tranche', 'risk', 'compliance', 'duplicates', 'citizen-reports', 'audit-trail', 'alerts']
    );
    filteredNavItems = navItems.filter((item) => allowedNavIds.includes(item.id));
  }

  // Icon mapping for navigation items
  const NAV_ICONS = {
    'projects': 'dashboard',
    'evidence-tranche': 'fact_check',
    'evidence': 'pin_drop',
    'invoices': 'receipt_long',
    'utilization-certificates': 'verified',
    'risk': 'psychology',
    'compliance': 'security',
    'duplicates': 'difference',
    'citizen-reports': 'campaign',
    'trend': 'trending_up',
    'audit-trail': 'history',
    'alerts': 'notifications',
    'status-trail': 'history_edu',
    'unresolved-completion': 'warning',
    'observations': 'rule_folder',
    'override-log': 'published_with_changes',
    'escalations': 'report_problem',
    'submit-proposal': 'post_add',
  };

  // Officer Profile mapping
  const officerProfile = isAuditorRole ? {
    name: 'Rajesh Verma, IA&AS',
    title: 'Pr. Director of Audit (MoSPI)',
    roleBadge: 'Constitutional CAG Quorum',
    tag: 'CAG Article 149'
  } : isMospiRole ? {
    name: 'Dr. A. K. Sen, IES',
    title: 'Joint Secretary (Central Nodal Desk)',
    roleBadge: 'National Apex Desk',
    tag: 'MoSPI Central'
  } : isStateRole ? {
    name: 'K. S. Narayanan, IAS',
    title: 'Principal Secretary (Planning & Nodal TN)',
    roleBadge: 'State Nodal Cell',
    tag: 'Tamil Nadu SNA'
  } : isAgencyRole ? {
    name: 'Er. M. Shanmugam',
    title: 'Superintending Engineer (PWD Buildings)',
    roleBadge: 'Execution Quorum',
    tag: 'PWD Building Div'
  } : isMpRole ? {
    name: 'Shri Dayanidhi Maran',
    title: 'Member of Parliament (Lok Sabha)',
    roleBadge: 'Constituency MP',
    tag: 'Chennai Central (LS)'
  } : {
    name: 'Dr. R. K. Verma, IAS',
    title: 'District Magistrate & Nodal Officer',
    roleBadge: 'District Collectorate',
    tag: 'Chennai District (TN)'
  };

  const navHtml = filteredNavItems
    .map((item) => {
      const icon = NAV_ICONS[item.id] || 'circle';
      const isActive = item.active;
      return `
        <a
          href="#${item.id}"
          class="setu-nav-link flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors ${
            isActive
              ? 'bg-primary-container text-on-primary font-semibold'
              : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }"
          data-nav-id="${item.id}"
        >
          <span class="material-symbols-outlined text-[20px]">${icon}</span>
          <span class="font-label-lg text-label-lg">${item.label}</span>
        </a>
      `;
    })
    .join('');

  return `
    <div class="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <!-- Fixed Institutional Navy Top Header -->
      <header class="fixed top-0 left-0 right-0 z-50 bg-primary text-on-primary select-none">
        <div class="h-16 w-full px-margin-desktop flex items-center justify-between border-b border-primary-container">
          <div class="flex items-center gap-space-lg">
            <div class="flex items-center gap-space-md">
              <div class="h-9 w-auto px-2 bg-primary-container text-on-primary rounded flex items-center justify-center font-bold text-xs tracking-wider shadow-sm border border-primary-container">
                PRAMAAN
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-space-sm">
                  <span class="font-headline-md text-headline-md tracking-tight uppercase text-on-primary font-bold">PRAMAAN</span>
                </div>
                <span class="font-label-sm text-label-sm text-primary-fixed opacity-90 hidden sm:inline-block">MoSPI &amp; CAG National Audit &amp; Monitoring Grid</span>
              </div>
            </div>

            <div class="h-6 w-[1px] bg-primary-container hidden md:block"></div>

            <div class="hidden lg:flex items-center gap-space-sm font-label-sm text-label-sm text-primary-fixed">
              <span class="material-symbols-outlined text-[16px]">shield</span>
              <span>${officerProfile.roleBadge}</span>
              <span class="text-primary-fixed-dim">/</span>
              <span class="text-on-primary font-medium">${displayRole}</span>
            </div>
          </div>

          <div class="hidden xl:flex items-center gap-space-md px-space-md py-1 bg-primary-container/80 rounded border border-primary-container text-primary-fixed font-label-sm text-label-sm">
            <span class="inline-block w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
            <span class="text-on-primary font-semibold">AUDIT RUNTIME:</span>
            <span>₹4,821.50 Cr Tracked</span>
            <span class="text-primary-fixed-dim">|</span>
            <span>98.4% Geo-Tagged</span>
          </div>

          <div class="flex items-center gap-space-md">
            <div class="hidden md:flex items-center text-xs font-mono bg-primary-container px-2.5 py-1 rounded text-primary-fixed">
              TTL: 42:10
            </div>

            <div class="h-6 w-[1px] bg-primary-container"></div>

            <div class="flex items-center gap-space-sm">
              <div class="text-right hidden sm:block">
                <div class="font-label-md text-label-md text-on-primary leading-tight">${officerProfile.name}</div>
                <div class="font-label-sm text-label-sm text-primary-fixed-dim">${officerProfile.title}</div>
              </div>
              <div class="w-8 h-8 rounded-full bg-primary-container border border-primary-fixed-dim flex items-center justify-center text-on-primary">
                <span class="material-symbols-outlined text-[18px]">person</span>
              </div>
            </div>

            <button
              type="button"
              class="px-3 py-1 bg-primary-container hover:bg-error-container hover:text-on-error-container text-primary-fixed text-xs font-semibold rounded border border-primary-container transition-colors cursor-pointer"
              id="setu-logout-button"
              title="Logout of session"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <!-- Fixed Left Sidebar -->
      <aside class="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest border-r border-outline-variant z-40 flex flex-col justify-between overflow-y-auto">
        <div class="py-space-md">
          <div class="px-space-md pb-space-sm border-b border-outline-variant mb-space-sm">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              ${groupTitle}
            </span>
          </div>

          <nav class="space-y-1 px-space-xs">
            ${navHtml}
          </nav>
        </div>

        <!-- Sidebar Bottom: Secured Node Status -->
        <div class="p-space-md border-t border-outline-variant bg-surface-container-low">
          <div class="flex items-start gap-space-sm">
            <span class="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">encrypted</span>
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm font-semibold text-on-surface">NIC Gateway Active</span>
              <span class="font-label-sm text-label-sm text-on-surface-variant">Secured 256-bit GovNet Node · ${officerProfile.tag}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content Area Offset by Sidebar and Header -->
      <div class="pl-64">
        <main class="relative pt-16 min-h-screen bg-surface w-full px-margin-desktop py-space-lg" id="setu-main-content">
          ${defaultContent}
        </main>

        <footer class="w-full bg-surface-container-lowest border-t border-outline-variant py-space-md px-margin-desktop">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
            <div>Government of India • Ministry of Statistics and Programme Implementation (MoSPI) • CAG India</div>
            <div class="flex items-center gap-space-md">
              <span>National Informatics Centre (NIC) Cloud</span>
              <span>Version 4.2.1-SEC</span>
            </div>
          </div>
        </footer>
      </div>
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
      navLinks.forEach((l) => {
        l.classList.remove('bg-primary-container', 'text-on-primary', 'font-semibold');
        l.classList.add('text-on-surface-variant');
      });
      link.classList.remove('text-on-surface-variant');
      link.classList.add('bg-primary-container', 'text-on-primary', 'font-semibold');

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
