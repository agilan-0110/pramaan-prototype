import React, { useState } from 'react';
import { officialRoles, authenticateOfficial } from './loginData.js';
import './Login.css';

/**
 * Two-Step Official Login Component
 * 
 * Step 1: Role Selection (6 statutory/administrative roles per ROLES.md)
 * Step 2: Credential Form with demo Tamil Nadu credentials & simulated POST /auth/login
 */
export default function Login({ onLoginSuccess, onNavigateHome }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle selecting a role card (advances to Step 2)
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setUsername(role.demoId);
    setPassword(role.demoPassword);
    setError('');
  };

  // Handle returning to role selection (Step 1)
  const handleBackToRoles = () => {
    setSelectedRole(null);
    setUsername('');
    setPassword('');
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authenticateOfficial({
        username,
        password,
        roleId: selectedRole ? selectedRole.id : '',
      });

      if (result.success) {
        // Store session token and role
        sessionStorage.setItem('setu_auth_token', result.token);
        sessionStorage.setItem('setu_auth_role', result.role);

        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(result.role);
        } else {
          window.location.hash = '#/dashboard';
        }
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('An error occurred during authentication. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setu-login-page">
      {/* Institutional Masthead Row */}
      <div className="setu-masthead">
        <span className="setu-masthead-gov">
          SMART INDIA HACKATHON 2026 • PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102
        </span>
        <span className="setu-masthead-locale">Official Authentication Portal</span>
      </div>

      {/* Header Branding Row */}
      <header className="setu-landing-header">
        <div className="setu-landing-header-inner">
          <div className="setu-landing-logo-badge">GOV</div>
          <span className="setu-landing-title">SETU</span>
          <span className="setu-landing-tagline">National Public Audit & Monitoring Platform</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="setu-login-container">
        {/* Navigation & Section Title */}
        <div className="setu-login-header-section">
          <div className="setu-login-top-nav">
            <a
              href="#/"
              className="setu-back-link"
              onClick={(e) => {
                if (typeof onNavigateHome === 'function') {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
            >
              ← Return to Public Landing Page
            </a>

            {selectedRole && (
              <button
                type="button"
                className="setu-back-link"
                onClick={handleBackToRoles}
              >
                ← Back to Role Selection
              </button>
            )}
          </div>

          <h1 className="setu-login-title">
            {selectedRole
              ? `Official Authentication: ${selectedRole.name}`
              : 'Select Your Official Role'}
          </h1>
          <p className="setu-login-subtitle">
            {selectedRole
              ? `Enter your assigned institutional credentials for ${selectedRole.jurisdiction}.`
              : 'Authorized personnel must select their statutory role to proceed.'}
          </p>
        </div>

        {/* STEP 1: Role Selection Grid */}
        {!selectedRole && (
          <div className="setu-role-grid">
            {officialRoles.map((role) => (
              <div
                key={role.id}
                className="setu-role-card"
                onClick={() => handleSelectRole(role)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectRole(role)}
              >
                <div className="setu-role-card-top">
                  <span className="setu-role-level-tag">{role.level}</span>
                </div>
                <h2 className="setu-role-name">{role.name}</h2>
                <p className="setu-role-desc">{role.description}</p>
                <div className="setu-role-action-text">Proceed to Login →</div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2: Credential Form */}
        {selectedRole && (
          <div className="setu-form-wrapper">
            <form className="setu-auth-card" onSubmit={handleSubmit}>
              <div className="setu-auth-role-banner">
                <span className="setu-auth-role-title">Selected: {selectedRole.name}</span>
                <span className="setu-role-level-tag">{selectedRole.level}</span>
              </div>

              {error && <div className="setu-form-error">{error}</div>}

              <div className="setu-form-group">
                <label className="setu-form-label" htmlFor="official-id">
                  Official ID / Username
                </label>
                <input
                  id="official-id"
                  type="text"
                  className="setu-form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. DIST-MDU-001"
                  required
                />
              </div>

              <div className="setu-form-group">
                <label className="setu-form-label" htmlFor="official-password">
                  Password
                </label>
                <input
                  id="official-password"
                  type="password"
                  className="setu-form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="setu-btn-primary"
                disabled={loading}
                style={{ width: '100%', marginTop: 'var(--setu-space-2)' }}
              >
                {loading ? 'Authenticating...' : 'Authenticate & Access Portal'}
              </button>

              {/* Demo Credentials Helper Box */}
              <div className="setu-demo-box">
                <div className="setu-demo-header">
                  <span className="setu-card-label">Demo Credentials</span>
                  <span className="setu-demo-badge">Simulated</span>
                </div>
                <div className="setu-demo-credentials">
                  <span>Demo ID: <strong>{selectedRole.demoId}</strong></span>
                  <span>Password: <strong>{selectedRole.demoPassword}</strong></span>
                  <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
                    Jurisdiction: {selectedRole.jurisdiction}
                  </span>
                </div>
                <button
                  type="button"
                  className="setu-autofill-btn"
                  onClick={() => {
                    setUsername(selectedRole.demoId);
                    setPassword(selectedRole.demoPassword);
                  }}
                >
                  Auto-fill Demo Credentials
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Minimal Government Disclaimer Footer */}
      <footer className="setu-landing-footer">
        <span className="setu-landing-footer-text">
          Official Government Audit Portal • Governed under MoSPI & CAG Audit Oversight Guidelines
        </span>
      </footer>
    </div>
  );
}
