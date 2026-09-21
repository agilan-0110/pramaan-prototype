import React, { useState } from 'react';
import { officialRoles, authenticateOfficial } from './loginData.js';
import './Login.css';

/**
 * Official Login Component (Two-Step Flow)
 * 
 * Step 1: Role Selection Grid with 4-Tier Administrative Hierarchy,
 *         Non-Hierarchical Entities (Auditor/CAG & Implementing Agency),
 *         Help Box, and Institutional SIH Prototype Footer.
 * Step 2: Real Credential Form with JWT auth & demo auto-fill.
 */
export default function Login({ onLoginSuccess, onNavigateHome }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Role resolution helper
  const getRoleById = (roleId) => officialRoles.find((r) => r.id === roleId);

  // Handle selecting a role card (advances to Step 2)
  const handleSelectRole = (roleId) => {
    const role = getRoleById(roleId);
    if (!role) return;
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

  // Handle form submission calling real JWT authentication
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

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Top Masthead Utility Bar */}
        <div className="w-full bg-primary text-on-primary">
          <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop h-7 flex items-center justify-between text-label-sm font-label-sm">
            <div className="flex items-center gap-space-xs truncate">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span className="truncate font-medium">SMART INDIA HACKATHON 2026 · PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102</span>
            </div>
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs">
                <button className="hover:text-primary-fixed transition-colors px-1" type="button" onClick={() => { document.body.style.fontSize = '12px'; }}>A-</button>
                <button className="hover:text-primary-fixed transition-colors px-1 font-bold" type="button" onClick={() => { document.body.style.fontSize = '14px'; }}>A</button>
                <button className="hover:text-primary-fixed transition-colors px-1" type="button" onClick={() => { document.body.style.fontSize = '16px'; }}>A+</button>
              </div>
              <span className="text-outline">|</span>
              <button className="flex items-center gap-1 hover:text-primary-fixed transition-colors" type="button">
                <span className="material-symbols-outlined text-[13px]">record_voice_over</span>
                Screen Reader
              </button>
              <span className="text-outline">|</span>
              <div className="flex items-center gap-1">
                <span className="text-on-primary font-semibold">English</span>
                <span className="text-outline">/</span>
                <button className="hover:text-primary-fixed transition-colors" type="button">हिन्दी</button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Branding & Search Header */}
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-space-sm flex items-center justify-between gap-space-lg">
          <a href="#/" className="flex items-center gap-space-md no-underline text-inherit" onClick={handleNavHome}>
            <div className="flex items-center justify-center w-9 h-9 rounded bg-primary text-on-primary font-bold text-sm tracking-wider shadow-sm">
              SETU
            </div>
            <div className="flex flex-col">
              <div className="font-headline-md text-headline-md text-primary tracking-tight font-bold">SETU: National Public Audit &amp; Monitoring Platform</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant font-medium">MPLADS Fund Oversight &amp; Anomaly Surveillance</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-space-lg">
            <div className="flex flex-col items-end gap-space-xs">
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-2.5 text-outline text-[16px]">search</span>
                  <input
                    className="w-80 h-9 pl-8 pr-3 font-body-sm text-body-sm bg-surface-container-low text-on-surface placeholder:text-outline rounded-l border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Track Sanction / Work ID / Complaint #"
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = e.target.value.trim();
                        if (val) {
                          if (val.toUpperCase().startsWith('PRJ-')) {
                            window.location.hash = `#/project/${encodeURIComponent(val)}`;
                          } else {
                            window.location.hash = `#/citizen-portal?q=${encodeURIComponent(val)}`;
                          }
                        }
                      }
                    }}
                  />
                </div>
                <button
                  className="h-9 px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-r transition-colors flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span>Track</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary text-[14px]">support_agent</span>
                Toll-Free Helpline: <span className="font-semibold text-primary">1800-11-2026</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="w-full bg-primary-container text-on-primary">
          <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop flex items-center justify-between">
            <nav className="flex items-center gap-1 overflow-x-auto">
              <a className="px-space-md py-2.5 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" href="#/" onClick={handleNavHome}>Home</a>
              <a className="px-space-md py-2.5 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" href="#/" onClick={(e) => e.preventDefault()}>Compliance Guidelines</a>
              <a className="px-space-md py-2.5 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" href="#/" onClick={(e) => e.preventDefault()}>Fund Allocation</a>
              <a className="px-space-md py-2.5 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" href="#/" onClick={(e) => e.preventDefault()}>Duplicate Registry</a>
              <a className="px-space-md py-2.5 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" href="#/citizen-portal">Citizen Oversight</a>
              <a className="px-space-md py-2.5 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" href="#/" onClick={(e) => e.preventDefault()}>Public Notices</a>
              <a className="px-space-md py-2.5 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" href="#/" onClick={(e) => e.preventDefault()}>Contact Helpdesk</a>
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full pt-[132px] bg-background min-h-screen flex-1">
        {/* Breadcrumb and Return Banner */}
        <div className="w-full border-b border-outline-variant bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-md">
              <a
                className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:underline group cursor-pointer"
                href="#/"
                onClick={handleNavHome}
              >
                <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                <span>Return to Public Landing Page</span>
              </a>

              {selectedRole && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline cursor-pointer bg-transparent border-none p-0"
                  onClick={handleBackToRoles}
                >
                  <span>• Back to Role Selection</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <span className="text-on-surface-variant">Home</span>
              <span className="text-outline">/</span>
              <span className="text-on-surface-variant">Authorized Officer Portal</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-semibold">
                {selectedRole ? selectedRole.name : 'Select Role'}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-space-lg w-full flex flex-col gap-space-xl">
          {/* STEP 1: ROLE SELECTION */}
          {!selectedRole && (
            <>
              {/* Page Header */}
              <div className="flex flex-col gap-space-xs border-b border-outline-variant pb-space-lg">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-primary text-primary font-label-sm text-label-sm bg-surface-container-low tracking-wide uppercase font-bold">
                    <span className="material-symbols-outlined text-[13px]">shield_person</span>
                    OFFICER ACCESS GATEWAY
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-outline-variant text-on-surface-variant font-label-sm text-label-sm bg-surface-container-lowest">
                    <span className="material-symbols-outlined text-[13px] text-tertiary-container">lock</span>
                    Secure Login
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight mt-1 font-bold">Select Your Official Role</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Authenticate according to your administrative jurisdiction or oversight mandate.</p>
              </div>

              {/* SECTION A: Administrative Hierarchy */}
              <section className="flex flex-col gap-space-md">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs border-l-4 border-primary pl-space-sm">
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">Administrative Hierarchy</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Tiered escalation &amp; sanction review chain: Constituency → National</p>
                  </div>
                  <div className="hidden lg:flex items-center gap-space-xs text-label-sm font-label-sm text-on-surface-variant bg-surface-container px-space-sm py-1 border border-outline-variant">
                    <span className="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                    Ascending Verification &amp; Clearance Protocol
                  </div>
                </div>

                {/* Connecting Stepper Flow Visualization */}
                <div className="hidden md:grid grid-cols-4 gap-gutter-desktop px-space-xs -mb-2">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-label-sm font-label-sm flex items-center justify-center font-bold">1</span>
                    <div className="h-0.5 flex-1 bg-outline-variant"></div>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-label-sm font-label-sm flex items-center justify-center font-bold">2</span>
                    <div className="h-0.5 flex-1 bg-outline-variant"></div>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-label-sm font-label-sm flex items-center justify-center font-bold">3</span>
                    <div className="h-0.5 flex-1 bg-outline-variant"></div>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-label-sm font-label-sm flex items-center justify-center font-bold">4</span>
                    <div className="h-0.5 flex-1 bg-outline-variant"></div>
                  </div>
                </div>

                {/* 4 Role Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
                  {/* Card 1: MP Office */}
                  <div className="bg-surface-container-lowest border border-outline-variant p-space-md flex flex-col justify-between hover:border-primary transition-colors h-full shadow-sm rounded">
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-primary font-semibold bg-surface-container px-2 py-0.5 border border-outline-variant">
                          TIER 1 · CONSTITUENCY
                        </span>
                        <span className="material-symbols-outlined text-outline text-[18px]">how_to_vote</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mt-1 font-bold">MP Office</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant min-h-[32px]">Recommend works and monitor constituency sanctions.</p>
                      <div className="mt-2 pt-2 border-t border-outline-variant">
                        <span className="font-label-sm text-label-sm text-outline">e.g., Lok Sabha / Rajya Sabha MP Staff</span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-xs">
                      <button
                        className="w-full h-9 bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-primary-container transition-colors cursor-pointer rounded"
                        type="button"
                        onClick={() => handleSelectRole('mp_office')}
                      >
                        <span>Proceed to Login</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 2: District Authority */}
                  <div className="bg-surface-container-lowest border border-outline-variant p-space-md flex flex-col justify-between hover:border-primary transition-colors h-full shadow-sm rounded">
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-primary font-semibold bg-surface-container px-2 py-0.5 border border-outline-variant">
                          TIER 2 · DISTRICT
                        </span>
                        <span className="material-symbols-outlined text-outline text-[18px]">domain</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mt-1 font-bold">District Authority (DM / DC)</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant min-h-[32px]">Sanction approvals, fund releases, and contractor allocation.</p>
                      <div className="mt-2 pt-2 border-t border-outline-variant">
                        <span className="font-label-sm text-label-sm text-outline">e.g., District Collector / DPO</span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-xs">
                      <button
                        className="w-full h-9 bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-primary-container transition-colors cursor-pointer rounded"
                        type="button"
                        onClick={() => handleSelectRole('district_authority')}
                      >
                        <span>Proceed to Login</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 3: State Nodal Authority */}
                  <div className="bg-surface-container-lowest border border-outline-variant p-space-md flex flex-col justify-between hover:border-primary transition-colors h-full shadow-sm rounded">
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-primary font-semibold bg-surface-container px-2 py-0.5 border border-outline-variant">
                          TIER 3 · STATE
                        </span>
                        <span className="material-symbols-outlined text-outline text-[18px]">account_balance</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mt-1 font-bold">State Nodal Authority</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant min-h-[32px]">Inter-district monitoring and state utilization reviews.</p>
                      <div className="mt-2 pt-2 border-t border-outline-variant">
                        <span className="font-label-sm text-label-sm text-outline">e.g., State Planning Dept.</span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-xs">
                      <button
                        className="w-full h-9 bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-primary-container transition-colors cursor-pointer rounded"
                        type="button"
                        onClick={() => handleSelectRole('state_nodal')}
                      >
                        <span>Proceed to Login</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 4: Central Nodal Agency */}
                  <div className="bg-surface-container-lowest border border-outline-variant p-space-md flex flex-col justify-between hover:border-primary transition-colors h-full shadow-sm rounded">
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-primary font-semibold bg-surface-container px-2 py-0.5 border border-outline-variant">
                          TIER 4 · NATIONAL
                        </span>
                        <span className="material-symbols-outlined text-outline text-[18px]">hub</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mt-1 font-bold">Central Nodal Agency (MoSPI)</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant min-h-[32px]">National surveillance, anomaly triggers, and policy compliance.</p>
                      <div className="mt-2 pt-2 border-t border-outline-variant">
                        <span className="font-label-sm text-label-sm text-outline">e.g., MoSPI Technical Directorate</span>
                      </div>
                    </div>
                    <div className="mt-space-md pt-space-xs">
                      <button
                        className="w-full h-9 bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-primary-container transition-colors cursor-pointer rounded"
                        type="button"
                        onClick={() => handleSelectRole('mospi_officer')}
                      >
                        <span>Proceed to Login</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Visual Structural Separator */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink mx-4 font-label-sm text-label-sm uppercase tracking-wider text-outline px-3 py-1 bg-surface-container-low border border-outline-variant font-semibold">
                  Independent &amp; Functional Entities (Non-Hierarchical)
                </span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>

              {/* SECTIONS B & C: Distinct Separated Blocks Side-by-Side */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
                {/* Block 1: Independent Statutory Audit */}
                <div className="bg-surface-container-low border border-outline-variant p-space-lg flex flex-col justify-between border-l-4 border-l-secondary rounded shadow-sm">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-primary font-bold">Independent Statutory Audit</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">External constitutional oversight and post-disbursement audit.</p>
                      </div>
                      <span className="material-symbols-outlined text-secondary text-[26px]">fact_check</span>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant p-space-md mt-space-sm rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wide uppercase">
                          EXTERNAL OVERSIGHT
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">Statutory Mandate</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Auditor / CAG</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Independent, cross-cutting financial and performance audits.</p>
                      <div className="mt-space-md pt-space-xs border-t border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                        <div className="inline-flex items-center gap-1 font-label-sm text-label-sm text-outline">
                          <span className="material-symbols-outlined text-[14px]">history_edu</span>
                          Read-only ledger &amp; discrepancy logs
                        </div>
                        <button
                          className="h-9 px-space-md border border-primary text-primary font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center gap-1 cursor-pointer rounded font-semibold"
                          type="button"
                          onClick={() => handleSelectRole('auditor_cag')}
                        >
                          <span>Proceed to Audit Login</span>
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-space-md p-space-xs bg-surface-container border border-outline-variant flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant rounded">
                    <span className="material-symbols-outlined text-[15px] text-outline">policy</span>
                    Operates independently of the administrative approval chain
                  </div>
                </div>

                {/* Block 2: Execution & Field Reporting */}
                <div className="bg-surface-container-low border border-outline-variant p-space-lg flex flex-col justify-between border-l-4 border-l-primary rounded shadow-sm">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-primary font-bold">Execution &amp; Field Reporting</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">On-ground work execution and milestone telemetry.</p>
                      </div>
                      <span className="material-symbols-outlined text-primary text-[26px]">engineering</span>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant p-space-md mt-space-sm rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm text-primary font-bold tracking-wide uppercase">
                          IMPLEMENTATION AGENCY
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">Ground Operations</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Implementing Agency</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Upload geo-tagged milestones, measurements, and invoices.</p>
                      <div className="mt-space-md pt-space-xs border-t border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                        <div className="inline-flex items-center gap-1 font-label-sm text-label-sm text-outline">
                          <span className="material-symbols-outlined text-[14px]">corporate_fare</span>
                          e.g., CPWD, PWD, Municipal Corporations
                        </div>
                        <button
                          className="h-9 px-space-md bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center justify-center gap-1 cursor-pointer rounded font-semibold"
                          type="button"
                          onClick={() => handleSelectRole('implementing_agency')}
                        >
                          <span>Proceed to Vendor / IA Login</span>
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-space-md p-space-xs bg-surface-container border border-outline-variant flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant rounded">
                    <span className="material-symbols-outlined text-[15px] text-outline">my_location</span>
                    Subject to automated geographic polygon checks and duplicate cross-audits.
                  </div>
                </div>
              </section>

              {/* Help & Security Notice Box */}
              <section className="border border-outline-variant bg-surface-container-lowest p-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md rounded shadow-sm">
                <div className="flex items-start gap-space-sm max-w-3xl">
                  <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">contact_support</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-primary font-bold">Need credential assistance?</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Contact District Nodal Helpdesk or submit verification token via the authorized technical liaison. Contact your administrator for login assistance.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs self-stretch md:self-auto">
                  <button
                    className="w-full md:w-auto h-9 px-space-md border border-outline-variant font-label-md text-label-md text-primary bg-surface-container-lowest hover:bg-surface-container transition-colors flex items-center justify-center gap-1 cursor-pointer rounded font-semibold"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[15px]">headset_mic</span>
                    <span>Nodal Helpdesk</span>
                  </button>
                </div>
              </section>
            </>
          )}

          {/* STEP 2: REAL CREDENTIAL FORM */}
          {selectedRole && (
            <div className="max-w-xl mx-auto w-full py-space-md">
              <div className="bg-surface-container-lowest border border-outline-variant p-space-lg shadow-sm rounded flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
                    <div>
                      <h2 className="font-headline-md text-headline-md text-primary font-bold">
                        Official Authentication: {selectedRole.name}
                      </h2>
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        {selectedRole.level}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="px-2.5 py-1 text-label-sm font-label-sm text-primary hover:bg-surface-container border border-outline-variant rounded transition-colors"
                    onClick={handleBackToRoles}
                  >
                    ← Change Role
                  </button>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Enter your assigned institutional credentials for <strong>{selectedRole.jurisdiction}</strong>.
                </p>

                {error && (
                  <div className="p-space-sm bg-error-container text-on-error-container border border-error text-body-sm rounded font-medium">
                    {error}
                  </div>
                )}

                <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="official-id">
                      Official ID / Username <span className="text-error">*</span>
                    </label>
                    <input
                      id="official-id"
                      type="text"
                      className="w-full h-10 px-3 border border-outline-variant font-body-sm bg-surface-container-lowest focus:outline-none focus:border-primary text-on-surface rounded"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={`e.g. ${selectedRole.demoId}`}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="official-password">
                      Password <span className="text-error">*</span>
                    </label>
                    <input
                      id="official-password"
                      type="password"
                      className="w-full h-10 px-3 border border-outline-variant font-body-sm bg-surface-container-lowest focus:outline-none focus:border-primary text-on-surface rounded"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-10 bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors font-bold rounded cursor-pointer shadow-sm mt-1"
                    disabled={loading}
                    id="btn-submit-auth"
                  >
                    {loading ? 'Authenticating...' : 'Authenticate & Access Portal'}
                  </button>
                </form>

                {/* Demo Credentials Box */}
                <div className="p-space-md bg-surface-container-low border border-outline-variant border-dashed rounded flex flex-col gap-space-xs mt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary font-bold uppercase">Demo Credentials</span>
                    <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container-high text-primary font-label-sm text-[10px] font-bold uppercase rounded">Simulated</span>
                  </div>

                  {selectedRole.id === 'mp_office' ? (
                    <>
                      <div className="pb-2 border-b border-outline-variant/60 font-body-sm text-body-sm text-on-surface-variant flex flex-col gap-0.5">
                        <div className="font-semibold text-on-surface">1. Elected Constituency MP:</div>
                        <div>ID: <strong>{selectedRole.demoId}</strong> • Pass: <strong>{selectedRole.demoPassword}</strong></div>
                        <div className="text-[11px] text-outline">Constituency: Chennai Central (Tamil Nadu)</div>
                        <button
                          type="button"
                          className="mt-1 self-start px-2 py-0.5 bg-primary text-on-primary text-[11px] font-semibold rounded cursor-pointer hover:bg-primary-container"
                          onClick={() => {
                            setUsername(selectedRole.demoId);
                            setPassword(selectedRole.demoPassword);
                          }}
                        >
                          Auto-fill Constituency MP
                        </button>
                      </div>

                      <div className="pt-2 font-body-sm text-body-sm text-on-surface-variant flex flex-col gap-0.5">
                        <div className="font-semibold text-on-surface">2. Nominated Rajya Sabha MP:</div>
                        <div>ID: <strong>{selectedRole.demoIdNominated || 'ADM-MP-NOM-IND-022'}</strong> • Pass: <strong>{selectedRole.demoPasswordNominated || 'MPOffice#Pass2026'}</strong></div>
                        <div className="text-[11px] text-outline">Multi-State Portfolio: Chennai, Bengaluru Urban, Pune</div>
                        <button
                          type="button"
                          className="mt-1 self-start px-2 py-0.5 bg-secondary text-on-secondary text-[11px] font-semibold rounded cursor-pointer hover:bg-secondary/90"
                          onClick={() => {
                            setUsername(selectedRole.demoIdNominated || 'ADM-MP-NOM-IND-022');
                            setPassword(selectedRole.demoPasswordNominated || 'MPOffice#Pass2026');
                          }}
                        >
                          Auto-fill Nominated MP
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="font-body-sm text-body-sm text-on-surface-variant flex flex-col gap-0.5">
                      <div>Official ID: <strong>{selectedRole.demoId}</strong> • Pass: <strong>{selectedRole.demoPassword}</strong></div>
                      <div className="text-[11px] text-outline">Scope: {selectedRole.jurisdiction}</div>
                      <button
                        type="button"
                        className="mt-1 self-start px-2 py-0.5 bg-primary text-on-primary text-[11px] font-semibold rounded cursor-pointer hover:bg-primary-container"
                        onClick={() => {
                          setUsername(selectedRole.demoId);
                          setPassword(selectedRole.demoPassword);
                        }}
                      >
                        Auto-fill Demo Credentials
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant text-on-surface">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop mb-space-xl">
            <div className="flex flex-col gap-space-sm">
              <div className="font-headline-md text-headline-md text-primary font-bold tracking-tight">SETU PORTAL</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Systemic Electronic Tracking &amp; Unification framework for transparent monitoring, expenditure verifications, and anomaly surveillance across all parliamentary MPLADS accounts.
              </p>
              <div className="font-label-sm text-label-sm text-primary font-semibold mt-2">MoSPI Institutional Audit Engine</div>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="font-label-lg text-label-lg text-primary uppercase tracking-wide font-bold">Quick Links</div>
              <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#/login">National Dashboard Summary</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/login">District Sanctions Explorer</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/login">High-Risk Works Audit Trail</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Geotag Verification Protocols</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/citizen-portal">Public Grievance Escalations</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="font-label-lg text-label-lg text-primary uppercase tracking-wide font-bold">Legal &amp; Directives</div>
              <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Revised MPLADS Guidelines 2023</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Public Audit Standard Regulations</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>RTI &amp; Citizen Disclosure Charter</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Anti-Duplication Enforcement Rule</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Terms of Data Verification</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="font-label-lg text-label-lg text-primary uppercase tracking-wide font-bold">SIH 2026 Submission</div>
              <div className="p-space-sm bg-surface-container-lowest rounded border border-outline-variant flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-secondary font-bold">PROBLEM STATEMENT: SIH26102</span>
                <span className="font-body-sm text-body-sm text-on-surface">MoSPI Anomaly Surveillance &amp; Fund Auditing</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Smart India Hackathon 2026 Innovation Initiative</span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                <span className="font-semibold text-on-surface">Nodal Agency:</span> Ministry of Statistics &amp; Programme Implementation (MoSPI)
              </div>
            </div>
          </div>

          <div className="p-space-md bg-surface-container-highest rounded border-l-4 border-secondary flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md text-on-surface">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[24px]">warning</span>
              <div className="font-body-sm text-body-sm">
                <span className="font-bold text-on-surface">Academic &amp; Research Prototype:</span> This interface is engineered exclusively for Smart India Hackathon 2026 evaluating MoSPI Problem Statement SIH26102. Not an official Government of India portal.
              </div>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">SIH26102 · Version 1.0.4 Prototype</div>
          </div>

          <div className="mt-space-lg pt-space-md border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
            <div>© 2026 SETU MoSPI Surveillance Platform · SIH 2026 Research Initiative</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
