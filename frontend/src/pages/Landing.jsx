import React, { useState } from 'react';
import './Landing.css';

/**
 * Real Statistical Overview Data (computed from mockOverview.json & mockProjects.json)
 */
const OVERVIEW_METRICS = {
  totalSanctionedFormatted: '₹88.5 Cr',
  totalProjects: 124,
  statesCount: 20,
  duplicateFlagsCount: '5',
  citizenReportsCount: '15+',
  utilizationRate: '77.6%',
};

/**
 * Public Landing Page Component
 * 
 * Full replacement matching reference Tailwind layout and real dataset metrics.
 */
export default function Landing({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNav = (route) => (e) => {
    if (e) e.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate(route);
    } else {
      window.location.hash = route;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    if (query.toUpperCase().startsWith('PRJ-')) {
      handleNav(`#/project/${encodeURIComponent(query)}`)();
    } else {
      handleNav(`#/citizen-portal?q=${encodeURIComponent(query)}`)();
    }
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
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
                <button
                  className="hover:text-primary-fixed transition-colors px-1"
                  type="button"
                  onClick={() => { document.body.style.fontSize = '12px'; }}
                >
                  A-
                </button>
                <button
                  className="hover:text-primary-fixed transition-colors px-1 font-bold"
                  type="button"
                  onClick={() => { document.body.style.fontSize = '14px'; }}
                >
                  A
                </button>
                <button
                  className="hover:text-primary-fixed transition-colors px-1"
                  type="button"
                  onClick={() => { document.body.style.fontSize = '16px'; }}
                >
                  A+
                </button>
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
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-space-sm flex items-center justify-between gap-space-md">
          <a href="#/" className="flex items-center gap-space-md no-underline text-inherit" onClick={handleNav('#/')}>
            <div className="flex items-center justify-center w-9 h-9 rounded bg-primary text-on-primary font-bold text-sm tracking-wider shadow-sm">
              SETU
            </div>
            <div className="flex flex-col">
              <div className="font-headline-md text-headline-md text-primary tracking-tight font-bold">SETU: Public Audit &amp; Monitoring Platform</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant font-medium">MPLADS Fund Oversight &amp; Anomaly Surveillance</div>
            </div>
          </a>

          <div className="flex items-center gap-space-md">
            {/* Header Search Bar */}
            <form className="hidden md:flex items-center" onSubmit={handleSearch}>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-2.5 text-outline text-[16px]">search</span>
                <input
                  id="setu-header-search-input"
                  className="w-64 lg:w-72 h-8 pl-8 pr-3 font-body-sm text-body-sm bg-surface-container-low text-on-surface placeholder:text-outline rounded-l border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Track Sanction / Work ID / Complaint #"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Track Sanction or Work ID"
                />
              </div>
              <button
                className="h-8 px-3 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-r transition-colors flex items-center gap-1 cursor-pointer"
                type="submit"
              >
                <span>Track</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </form>

            {/* Officer Login Button */}
            <a
              className="inline-flex items-center gap-1 px-2.5 py-1 text-label-sm font-label-sm text-primary hover:bg-surface-container border border-outline-variant rounded transition-colors"
              id="btn-official-login"
              href="#/login"
              onClick={handleNav('#/login')}
            >
              <span className="material-symbols-outlined text-[15px]">badge</span>
              <span>Officer Login</span>
            </a>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="w-full bg-primary-container text-on-primary">
          <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop flex items-center justify-between">
            <nav className="flex items-center gap-1 overflow-x-auto">
              <a
                aria-current="page"
                className="px-space-md py-2 transition-colors whitespace-nowrap bg-surface-container-lowest text-primary font-bold text-label-md"
                data-path="home"
                href="#/"
                onClick={handleNav('#/')}
              >
                Home
              </a>
              <a
                className="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap"
                data-path="compliance-guidelines"
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                Compliance Guidelines
              </a>
              <a
                className="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap"
                data-path="fund-allocation"
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                Fund Allocation
              </a>
              <a
                className="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap"
                data-path="duplicate-registry"
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                Duplicate Registry
              </a>
              <a
                className="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap"
                data-path="citizen-oversight"
                href="#/citizen-portal"
                onClick={handleNav('#/citizen-portal')}
              >
                Citizen Oversight
              </a>
              <a
                className="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap"
                data-path="public-notices"
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                Public Notices
              </a>
              <a
                className="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap"
                data-path="contact-helpdesk"
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                Contact Helpdesk
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="w-full pt-[124px] bg-background min-h-screen flex-1">
        <div className="flex flex-col w-full">
          {/* 1. PUBLIC NOTICE STRIP */}
          <aside aria-label="Official Circular Banner" className="w-full bg-surface-container-low border-b border-outline-variant">
            <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-1 flex items-center justify-between gap-space-sm">
              <div className="flex items-center gap-2 truncate">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-secondary-container text-on-secondary-fixed text-label-sm font-label-sm font-bold uppercase rounded-DEFAULT whitespace-nowrap">
                  <span className="material-symbols-outlined text-[13px]">campaign</span>
                  ALERT
                </span>
                <span className="text-body-sm font-body-sm text-on-surface truncate">
                  Mandatory geotagging and cross-scheme duplication screening active for FY 2025-26 works.
                </span>
              </div>
              <a
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:underline font-label-sm text-label-sm font-semibold whitespace-nowrap"
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <span>View Gazette</span>
                <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
              </a>
            </div>
          </aside>

          {/* 2. CITIZEN-PRIMARY HERO SECTION */}
          <section className="w-full bg-surface py-space-lg">
            <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
              <div className="bg-surface-container-lowest p-space-lg shadow-sm rounded border border-outline-variant flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm font-bold tracking-wider uppercase">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    <span>MPLADS AUDIT &amp; ANTI-DUPLICATION</span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">Automated Anomaly Detection &amp; Scheme Oversight</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">Cross-verifying public works and fund utilization through citizen ground-truth reports.</p>
                </div>

                {/* Citizen Actions & Capabilities */}
                <div className="pt-space-xs flex flex-col gap-space-md">
                  <div className="p-space-md bg-surface-container-low rounded border border-outline-variant border-l-4 border-secondary flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-sm">
                    <div className="flex flex-col gap-0.5">
                      <div className="inline-flex items-center gap-1.5 text-primary font-label-md text-label-md font-bold">
                        <span className="material-symbols-outlined text-[18px] text-secondary">public</span>
                        <span>Citizen Ground-Truth Gateway</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">No login required — report ground-truth issues, discrepancies, and work status directly.</p>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <a
                        className="h-10 px-space-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold rounded shadow transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                        id="btn-citizen-portal"
                        href="#/citizen-portal"
                        onClick={handleNav('#/citizen-portal')}
                      >
                        <span className="material-symbols-outlined text-[18px]">campaign</span>
                        <span>Citizen Portal — Report an Issue</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-sm pt-1 border-t border-outline-variant">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">Public Utilities:</span>
                      <a
                        className="h-8 px-2.5 inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:bg-surface-container rounded border border-outline-variant font-semibold transition-colors"
                        id="btn-search-public-works"
                        href="#/citizen-portal"
                        onClick={handleNav('#/citizen-portal')}
                      >
                        <span className="material-symbols-outlined text-[15px]">travel_explore</span>
                        <span>Search Public Works</span>
                      </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full lg:w-auto">
                      <div className="px-2 py-1 bg-surface-container-lowest rounded border border-outline-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-outline text-[15px]">photo_camera</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Geo-Tagged Photos</span>
                      </div>
                      <div className="px-2 py-1 bg-surface-container-lowest rounded border border-outline-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-outline text-[15px]">sync</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Live Status Tracking</span>
                      </div>
                      <div className="px-2 py-1 bg-surface-container-lowest rounded border border-outline-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-outline text-[15px]">lock</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Anonymous Filing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. COMPACT 3-STAT KPI ROW */}
          <section aria-label="National Verification Statistics" className="w-full bg-surface-container-low py-space-md">
            <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                {/* Screened Works (Real computed stats from mockOverview.json) */}
                <div className="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold">Screened Works</span>
                    <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
                  </div>
                  <div className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">{OVERVIEW_METRICS.totalSanctionedFormatted}</div>
                  <div className="pt-1 border-t border-outline-variant font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">check</span>
                    <span>{OVERVIEW_METRICS.totalProjects} Works Verified Across {OVERVIEW_METRICS.statesCount} States</span>
                  </div>
                </div>

                {/* Duplicates Flagged */}
                <div className="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Duplicates Flagged</span>
                    <span className="material-symbols-outlined text-secondary text-[20px]">warning_amber</span>
                  </div>
                  <div className="font-headline-xl text-headline-xl text-secondary font-bold tracking-tight">{OVERVIEW_METRICS.duplicateFlagsCount}</div>
                  <div className="pt-1 border-t border-outline-variant font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">savings</span>
                    <span>Cross-Scheme Anti-Duplication Active</span>
                  </div>
                </div>

                {/* Citizen Reports */}
                <div className="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-tertiary-container font-bold">Citizen Reports</span>
                    <span className="material-symbols-outlined text-tertiary-container text-[20px]">groups</span>
                  </div>
                  <div className="font-headline-xl text-headline-xl text-tertiary-container font-bold tracking-tight">{OVERVIEW_METRICS.citizenReportsCount}</div>
                  <div className="pt-1 border-t border-outline-variant font-label-sm text-label-sm text-tertiary-container font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">task_alt</span>
                    <span>100% Routed for District Scrutiny</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. CORE VERIFICATION PILLARS */}
          <section aria-label="Core Verification Pillars" className="w-full bg-surface py-space-lg">
            <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
              <div className="mb-space-md">
                <h2 className="font-headline-md text-headline-md text-primary font-bold">Core Verification Pillars</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                <div className="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-space-xs">
                  <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">radar</span>
                  </div>
                  <div>
                    <h3 className="font-label-lg text-label-lg text-primary font-bold">Duplicate Work Detection</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Flags overlapping and duplicate project claims.</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-space-xs">
                  <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">translate</span>
                  </div>
                  <div>
                    <h3 className="font-label-lg text-label-lg text-primary font-bold">Citizen Contradiction Engine</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Compares citizen reports against official status.</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-space-xs">
                  <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                  </div>
                  <div>
                    <h3 className="font-label-lg text-label-lg text-primary font-bold">Ground Truth Engine</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Verifies GPS, cell towers, and photos.</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-space-xs">
                  <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  </div>
                  <div>
                    <h3 className="font-label-lg text-label-lg text-primary font-bold">Audit Trail</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Logs fund milestones into audit records.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Institutional Footer with Honest Disclaimer */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant text-on-surface">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-md">
            <div className="flex flex-col gap-1">
              <div className="font-headline-md text-headline-md text-primary font-bold tracking-tight">SETU Platform</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Automated anomaly surveillance and public fund verification system for MPLADS.</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-label-md text-label-md text-primary uppercase tracking-wide font-bold">Quick Links</div>
              <ul className="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#/login" onClick={handleNav('#/login')}>National Dashboard</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/login" onClick={handleNav('#/login')}>Duplicate Registry</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Geotag Protocols</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/citizen-portal" onClick={handleNav('#/citizen-portal')}>File Complaint</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-label-md text-label-md text-primary uppercase tracking-wide font-bold">Directives</div>
              <ul className="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Revised MPLADS Guidelines</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Anti-Duplication Standard</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Citizen Charter</a></li>
                <li><a className="hover:text-primary transition-colors" href="#/" onClick={(e) => e.preventDefault()}>Audit Rules</a></li>
              </ul>
            </div>
          </div>

          <div className="p-space-sm bg-surface-container-highest rounded border-l-4 border-secondary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-on-surface">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
              <div className="font-body-sm text-body-sm">
                <span className="font-bold">Academic Prototype for Smart India Hackathon 2026 (Problem Statement SIH26102).</span> Not an official Government of India portal.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
