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
import { getDashboardHtml } from '../pages/dashboardData.js';

/**
 * Generates the HTML string for the SETU Layout Shell.
 * 
 * @param {Object} options Configuration options
 * @param {string} [options.projectName='SETU'] Title of the platform
 * @param {string} [options.subtitle='Audit & Monitoring Platform'] Subtitle
 * @param {string} [options.role='District Authority'] Current authenticated role
 * @param {Array<{label: string, id: string, active?: boolean}>} [options.navItems] Navigation items
 * @param {string} [options.content] Inner HTML for main area
 * @param {string} [options.disclaimer] Government disclaimer text
 * @returns {string} HTML string of layout shell
 */
export function getLayoutHtml({
  projectName = 'SETU',
  subtitle = 'Audit & Monitoring Platform',
  role = 'District Authority',
  navItems = [
    { label: 'Projects Audit', id: 'projects', active: true },
    { label: 'Risk Assessment & SHAP', id: 'risk' },
    { label: 'Compliance Flags', id: 'compliance' },
    { label: 'Duplicate Tracker', id: 'duplicates' },
    { label: 'Citizen Contradictions', id: 'citizen-reports' },
    { label: 'Audit Trail', id: 'audit-trail' },
    { label: 'System Alerts', id: 'alerts' },
  ],
  content = getDashboardHtml(),
  disclaimer = 'Official Government Audit Portal • Strictly for Authorized Personnel Only • Governed under MoSPI & CAG Audit Oversight Guidelines',
} = {}) {
  const navHtml = navItems
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
            <span class="setu-role-name">${role}</span>
          </div>
          <button type="button" class="setu-logout-btn" id="setu-logout-button">Logout</button>
        </div>
      </header>

      <!-- Workspace: Sidebar + Main Content -->
      <div class="setu-workspace">
        <aside class="setu-sidebar">
          <div class="setu-nav-group-title">AUDIT MODULES</div>
          <nav>
            <ul class="setu-nav-list">
              ${navHtml}
            </ul>
          </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="setu-main" id="setu-main-content">
          ${content}
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

  // Setup click listeners for plain text navigation items
  const navLinks = mountEl.querySelectorAll('.setu-nav-link');
  const mainContentEl = mountEl.querySelector('#setu-main-content');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');

      const navId = link.getAttribute('data-nav-id');
      if (mainContentEl) {
        if (navId === 'projects') {
          mainContentEl.innerHTML = getDashboardHtml();
        } else {
          mainContentEl.innerHTML = `
            <div class="setu-content-placeholder-container">
              <div class="setu-content-placeholder-text">Content goes here</div>
            </div>
          `;
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
