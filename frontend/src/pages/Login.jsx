import React, { useState } from 'react';
import { officialRoles, authenticateOfficial } from './loginData.js';
import './Login.css';

const officialRoleCards = [
  { id: 'mp_office', name: 'MP Office', icon: 'person' },
  { id: 'district_authority', name: 'District Authority', icon: 'account_balance' },
  { id: 'state_nodal', name: 'State Nodal Authority', icon: 'location_city' },
  { id: 'mospi_officer', name: 'MoSPI / Central Authority', icon: 'assured_workload' },
  { id: 'auditor_cag', name: 'Auditor / CAG', icon: 'fact_check' },
  { id: 'implementing_agency', name: 'Implementing Agency', icon: 'engineering' },
];

export default function Login({ onLoginSuccess, onNavigateHome }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectRole = (roleId) => {
    const role = officialRoles.find((r) => r.id === roleId);
    if (!role) return;
    setSelectedRole(role);
    setUsername(role.demoId);
    setPassword(role.demoPassword);
    setError('');
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setUsername('');
    setPassword('');
    setError('');
  };

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

  const handleNavHome = (e) => {
    if (e) e.preventDefault();
    if (typeof onNavigateHome === 'function') {
      onNavigateHome();
    } else {
      window.location.hash = '#/';
    }
  };

  const roleDisplayName = selectedRole
    ? selectedRole.name === 'Central Nodal Agency (MoSPI)'
      ? 'MoSPI / Central Authority'
      : selectedRole.name
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* TWO-LEVEL GOVERNMENT HEADER */}
      <header className="w-full select-none">
        {/* TOP BAR: Dark navy background */}
        <div className="w-full bg-[#0a192f] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.08 8.84-7 9.95-3.92-1.11-7-5.41-7-9.95V6.3l7-3.12zM12 6a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z"/>
              </svg>
              <span className="font-medium tracking-wide">Government of India</span>
            </div>
            <div className="text-slate-300 text-xs tracking-wide">
              Ministry of Statistics &amp; Programme Implementation
            </div>
          </div>
        </div>

        {/* MAIN HEADER: White background, thin border/shadow separating from page */}
        <div className="w-full bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="#/" className="flex flex-col no-underline text-inherit group" onClick={handleNavHome}>
              <span className="text-xl font-bold tracking-tight text-[#0a192f] font-sans">PRAMAAN</span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">MPLADS Audit &amp; Monitoring System</span>
            </a>

            <div className="flex items-center gap-6 text-sm font-medium">
              <a href="#/" className="text-slate-600 hover:text-[#0a192f] transition-colors no-underline" onClick={handleNavHome}>Home</a>
              <a href="#/citizen-portal" className="text-slate-600 hover:text-[#0a192f] transition-colors no-underline flex items-center gap-1">
                <span>Back to Public Portal</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {!selectedRole ? (
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-6xl w-full flex flex-col items-center text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">OFFICIAL LOGIN</span>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Select Your Role</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full justify-center">
              {officialRoleCards.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-slate-200 rounded p-5 flex flex-col items-center justify-between text-center h-52 hover:border-[#0f2b5c] transition-colors shadow-sm"
                >
                  <div className="flex flex-col items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0f2b5c]">
                      <span className="material-symbols-outlined text-[22px]">{r.icon}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800 leading-snug">
                      {r.name}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 px-3 bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white text-xs font-semibold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    data-role-id={r.id}
                    onClick={() => handleSelectRole(r.id)}
                  >
                    <span>Continue</span>
                    <span>→</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>🔒</span>
              <span>Authorized access only</span>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <button
                type="button"
                id="btn-back-to-roles"
                className="text-xs font-semibold text-slate-600 hover:text-[#0f2b5c] flex items-center gap-1 bg-transparent border-none cursor-pointer p-0"
                onClick={handleBackToRoles}
              >
                <span>←</span>
                <span>Back to Role Selection</span>
              </button>
              <span className="inline-flex items-center px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold rounded">
                Simulated Demo
              </span>
            </div>

            <div className="text-center pt-1">
              <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">OFFICIAL LOGIN</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">{roleDisplayName}</h2>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 text-xs rounded font-medium">
                {error}
              </div>
            )}

            <form id="official-login-form" className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-left">
                <label htmlFor="official-id" className="text-xs font-semibold text-slate-700">Official ID</label>
                <input
                  id="official-id"
                  type="text"
                  className="w-full h-9 px-3 border border-slate-300 rounded text-xs text-slate-800 bg-white focus:outline-none focus:border-[#0f2b5c]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter official ID"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label htmlFor="official-password" className="text-xs font-semibold text-slate-700">Password</label>
                <input
                  id="official-password"
                  type="password"
                  className="w-full h-9 px-3 border border-slate-300 rounded text-xs text-slate-800 bg-white focus:outline-none focus:border-[#0f2b5c]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                id="btn-submit-auth"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white text-xs font-semibold rounded transition-colors cursor-pointer mt-1"
              >
                {loading ? 'Authenticating...' : 'Login →'}
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-left">
              <div className="text-[11px] text-slate-500 font-medium">Demo Credentials:</div>
              {selectedRole.id === 'mp_office' ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    id="btn-autofill"
                    className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded border border-slate-200 cursor-pointer text-center"
                    onClick={() => {
                      setUsername(selectedRole.demoId);
                      setPassword(selectedRole.demoPassword);
                    }}
                  >
                    Autofill Elected MP
                  </button>
                  <button
                    type="button"
                    id="btn-autofill-nominated"
                    className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded border border-slate-200 cursor-pointer text-center"
                    onClick={() => {
                      setUsername(selectedRole.demoIdNominated || 'ADM-MP-NOM-IND-022');
                      setPassword(selectedRole.demoPasswordNominated || 'MPOffice#Pass2026');
                    }}
                  >
                    Autofill Nominated MP
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  id="btn-autofill"
                  className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded border border-slate-200 cursor-pointer text-center"
                  onClick={() => {
                    setUsername(selectedRole.demoId);
                    setPassword(selectedRole.demoPassword);
                  }}
                >
                  Autofill Demo Credentials
                </button>
              )}
            </div>

            <div className="text-center text-[11px] text-slate-400 mt-1">
              🔒 Authorized access only
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-1">
          <div className="font-bold text-slate-800 text-sm tracking-tight">PRAMAAN</div>
          <div className="text-slate-600 font-medium">MPLADS Audit &amp; Monitoring System</div>
          <div className="text-slate-400 mt-1">Government of India | Ministry of Statistics &amp; Programme Implementation</div>
        </div>
      </footer>
    </div>
  );
}
