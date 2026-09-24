import React, { useState } from 'react';
import { resolveSessionRole } from './Layout.js';
import './Layout.css';

/**
 * React JSX Layout Shell Component
 */
export default function Layout({
  children,
  projectName = 'PRAMAAN',
  subtitle = 'PM-GatiShakti & MPLADS Audit Platform',
  role = null,
  onLogout,
}) {
  const [activeNav, setActiveNav] = useState('projects');

  const displayRole = resolveSessionRole(role);
  const roleClean = displayRole.toLowerCase();
  const isMpRole = !roleClean.includes('implementing') && (/\bmp\b/i.test(roleClean) || roleClean.includes('member of parliament'));
  const groupTitle = isMpRole ? 'CONSTITUENCY MODULES' : 'AUDIT MODULES';

  const navItems = isMpRole ? [
    { label: 'My Projects', id: 'projects' },
    { label: 'Submit Proposal', id: 'submit-proposal' },
  ] : [
    { label: 'Projects Audit', id: 'projects' },
    { label: 'Risk Assessment & SHAP', id: 'risk' },
    { label: 'Compliance Flags', id: 'compliance' },
    { label: 'Duplicate Tracker', id: 'duplicates' },
    { label: 'Citizen Contradictions', id: 'citizen-reports' },
    { label: 'Audit Trail', id: 'audit-trail' },
    { label: 'System Alerts', id: 'alerts' },
  ];

  return (
    <div className="setu-shell">
      {/* Institutional Navy Header */}
      <header className="setu-header">
        <div className="setu-header-brand">
          <div className="setu-brand-logo">GOV</div>
          <span className="setu-brand-title">{projectName}</span>
          <span className="setu-brand-subtitle">{subtitle}</span>
        </div>
        <div className="setu-header-actions">
          <div className="setu-role-badge">
            <span className="setu-role-label">Role:</span>
            <span className="setu-role-name">{displayRole}</span>
          </div>
          <button type="button" className="setu-logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Workspace: Sidebar + Main Content */}
      <div className="setu-workspace">
        <aside className="setu-sidebar">
          <div className="setu-nav-group-title">{groupTitle}</div>
          <nav>
            <ul className="setu-nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="setu-nav-item">
                  <a
                    href={`#${item.id}`}
                    className={`setu-nav-link ${activeNav === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="setu-main">
          {activeNav === 'projects' ? (
            children
          ) : (
            <div className="setu-content-placeholder-container">
              <div className="setu-content-placeholder-text">Content goes here</div>
            </div>
          )}
        </main>
      </div>

      {/* Minimal Single-Line Disclaimer Footer */}
      <footer className="setu-footer">
        <span className="setu-footer-text">
          Official Government Audit Portal • Strictly for Authorized Personnel Only • Governed under MoSPI & CAG Audit Oversight Guidelines
        </span>
      </footer>
    </div>
  );
}
