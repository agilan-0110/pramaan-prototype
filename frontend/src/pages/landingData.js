/**
 * Landing Page HTML Generator for client SPA rendering
 * Full replacement with Tailwind layout from reference design.
 */

export function getLandingHtml() {
  return `
    <div class="bg-background font-body-md text-body-md text-on-surface antialiased">
      <header class="fixed top-0 w-full z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <!-- Top Masthead Utility Bar -->
        <div class="w-full bg-primary text-on-primary">
          <div class="max-w-7xl mx-auto px-margin lg:px-margin-desktop h-7 flex items-center justify-between text-label-sm font-label-sm">
            <div class="flex items-center gap-space-xs truncate">
              <span class="material-symbols-outlined text-[14px]">school</span>
              <span class="truncate font-medium">SMART INDIA HACKATHON 2026 · PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102</span>
            </div>
            <div class="flex items-center gap-space-md">
              <div class="flex items-center gap-space-xs">
                <button class="hover:text-primary-fixed transition-colors px-1" type="button" onclick="document.body.style.fontSize='12px'">A-</button>
                <button class="hover:text-primary-fixed transition-colors px-1 font-bold" type="button" onclick="document.body.style.fontSize='14px'">A</button>
                <button class="hover:text-primary-fixed transition-colors px-1" type="button" onclick="document.body.style.fontSize='16px'">A+</button>
              </div>
              <span class="text-outline">|</span>
              <button class="flex items-center gap-1 hover:text-primary-fixed transition-colors" type="button">
                <span class="material-symbols-outlined text-[13px]">record_voice_over</span>Screen Reader
              </button>
              <span class="text-outline">|</span>
              <div class="flex items-center gap-1">
                <span class="text-on-primary font-semibold">English</span>
                <span class="text-outline">/</span>
                <button class="hover:text-primary-fixed transition-colors" type="button">हिन्दी</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Branding & Search Header -->
        <div class="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-space-sm flex items-center justify-between gap-space-md">
          <div class="flex items-center gap-space-md">
            <div class="flex items-center justify-center w-9 h-9 rounded bg-primary text-on-primary font-bold text-sm tracking-wider shadow-sm">
              SETU
            </div>
            <div class="flex flex-col">
              <div class="font-headline-md text-headline-md text-primary tracking-tight font-bold">SETU: Public Audit &amp; Monitoring Platform</div>
              <div class="font-body-sm text-body-sm text-on-surface-variant font-medium">MPLADS Fund Oversight &amp; Anomaly Surveillance</div>
            </div>
          </div>

          <div class="flex items-center gap-space-md">
            <!-- Header Search Bar -->
            <form class="hidden md:flex items-center" onsubmit="event.preventDefault(); const val=document.getElementById('setu-header-search-input').value.trim(); if(val){ if(val.toUpperCase().startsWith('PRJ-')) { window.location.hash='#/project/'+encodeURIComponent(val); } else { window.location.hash='#/citizen-portal?q='+encodeURIComponent(val); } }">
              <div class="relative flex items-center">
                <span class="material-symbols-outlined absolute left-2.5 text-outline text-[16px]">search</span>
                <input id="setu-header-search-input" class="w-64 lg:w-72 h-8 pl-8 pr-3 font-body-sm text-body-sm bg-surface-container-low text-on-surface placeholder:text-outline rounded-l border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Track Sanction / Work ID / Complaint #" type="text">
              </div>
              <button class="h-8 px-3 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-r transition-colors flex items-center gap-1" type="submit">
                <span>Track</span>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </form>

            <!-- Officer Login Button -->
            <a class="inline-flex items-center gap-1 px-2.5 py-1 text-label-sm font-label-sm text-primary hover:bg-surface-container border border-outline-variant rounded transition-colors" id="btn-official-login" href="#/login">
              <span class="material-symbols-outlined text-[15px]">badge</span>
              <span>Officer Login</span>
            </a>
          </div>
        </div>

        <!-- Sub-Navigation Bar -->
        <div class="w-full bg-primary-container text-on-primary">
          <div class="max-w-7xl mx-auto px-margin lg:px-margin-desktop flex items-center justify-between">
            <nav class="flex items-center gap-1 overflow-x-auto">
              <a aria-current="page" class="px-space-md py-2 transition-colors whitespace-nowrap bg-surface-container-lowest text-primary font-bold text-label-md" data-path="home" href="#/">Home</a>
              <a class="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" data-path="compliance-guidelines" href="#/" onclick="event.preventDefault()">Compliance Guidelines</a>
              <a class="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" data-path="fund-allocation" href="#/" onclick="event.preventDefault()">Fund Allocation</a>
              <a class="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" data-path="duplicate-registry" href="#/" onclick="event.preventDefault()">Duplicate Registry</a>
              <a class="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" data-path="citizen-oversight" href="#/citizen-portal">Citizen Oversight</a>
              <a class="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" data-path="public-notices" href="#/" onclick="event.preventDefault()">Public Notices</a>
              <a class="px-space-md py-2 text-label-md font-label-md text-surface-container hover:text-white transition-colors whitespace-nowrap" data-path="contact-helpdesk" href="#/" onclick="event.preventDefault()">Contact Helpdesk</a>
            </nav>
          </div>
        </div>
      </header>

      <main class="w-full pt-[124px] bg-background min-h-screen">
        <div class="flex flex-col w-full">
          <!-- 1. PUBLIC NOTICE STRIP -->
          <aside aria-label="Official Circular Banner" class="w-full bg-surface-container-low border-b border-outline-variant">
            <div class="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-1 flex items-center justify-between gap-space-sm">
              <div class="flex items-center gap-2 truncate">
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 bg-secondary-container text-on-secondary-fixed text-label-sm font-label-sm font-bold uppercase rounded-DEFAULT whitespace-nowrap">
                  <span class="material-symbols-outlined text-[13px]">campaign</span>ALERT
                </span>
                <span class="text-body-sm font-body-sm text-on-surface truncate">
                  Mandatory geotagging and cross-scheme duplication screening active for FY 2025-26 works.
                </span>
              </div>
              <a class="hidden sm:inline-flex items-center gap-1 text-primary hover:underline font-label-sm text-label-sm font-semibold whitespace-nowrap" href="#/" onclick="event.preventDefault()">
                <span>View Gazette</span>
                <span class="material-symbols-outlined text-[13px]">arrow_outward</span>
              </a>
            </div>
          </aside>

          <!-- 2. CITIZEN-PRIMARY HERO SECTION -->
          <section class="w-full bg-surface py-space-lg">
            <div class="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
              <div class="bg-surface-container-lowest p-space-lg shadow-sm rounded border border-outline-variant flex flex-col gap-space-md">
                <div class="flex flex-col gap-1">
                  <div class="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm font-bold tracking-wider uppercase">
                    <span class="material-symbols-outlined text-[16px]">verified_user</span>
                    <span>MPLADS AUDIT &amp; ANTI-DUPLICATION</span>
                  </div>
                  <h1 class="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">Automated Anomaly Detection &amp; Scheme Oversight</h1>
                  <p class="font-body-md text-body-md text-on-surface-variant">Cross-verifying public works and fund utilization through citizen ground-truth reports.</p>
                </div>

                <!-- Citizen Actions & Capabilities -->
                <div class="pt-space-xs flex flex-col gap-space-md">
                  <div class="p-space-md bg-surface-container-low rounded border border-outline-variant border-l-4 border-secondary flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-sm">
                    <div class="flex flex-col gap-0.5">
                      <div class="inline-flex items-center gap-1.5 text-primary font-label-md text-label-md font-bold">
                        <span class="material-symbols-outlined text-[18px] text-secondary">public</span>
                        <span>Citizen Ground-Truth Gateway</span>
                      </div>
                      <p class="font-body-sm text-body-sm text-on-surface-variant">No login required — report ground-truth issues, discrepancies, and work status directly.</p>
                    </div>
                    <div class="flex items-center gap-space-sm">
                      <a class="h-10 px-space-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold rounded shadow transition-colors flex items-center gap-2 whitespace-nowrap" id="btn-citizen-portal" href="#/citizen-portal">
                        <span class="material-symbols-outlined text-[18px]">campaign</span>
                        <span>Citizen Portal — Report an Issue</span>
                        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>

                  <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-sm pt-1 border-t border-outline-variant">
                    <div class="flex items-center gap-space-sm">
                      <span class="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">Public Utilities:</span>
                      <a class="h-8 px-2.5 inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:bg-surface-container rounded border border-outline-variant font-semibold transition-colors" id="btn-search-public-works" href="#/citizen-portal">
                        <span class="material-symbols-outlined text-[15px]">travel_explore</span>
                        <span>Search Public Works</span>
                      </a>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full lg:w-auto">
                      <div class="px-2 py-1 bg-surface-container-lowest rounded border border-outline-variant flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-outline text-[15px]">photo_camera</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Geo-Tagged Photos</span>
                      </div>
                      <div class="px-2 py-1 bg-surface-container-lowest rounded border border-outline-variant flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-outline text-[15px]">sync</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Live Status Tracking</span>
                      </div>
                      <div class="px-2 py-1 bg-surface-container-lowest rounded border border-outline-variant flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-outline text-[15px]">lock</span>
                        <span class="font-label-sm text-label-sm text-on-surface-variant">Anonymous Filing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 3. COMPACT 3-STAT KPI ROW -->
          <section aria-label="National Verification Statistics" class="w-full bg-surface-container-low py-space-md">
            <div class="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <!-- Screened Works (Real computed stats from mockOverview.json) -->
                <div class="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-1">
                  <div class="flex items-center justify-between">
                    <span class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold">Screened Works</span>
                    <span class="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
                  </div>
                  <div class="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">₹88.5 Cr</div>
                  <div class="pt-1 border-t border-outline-variant font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">check</span>
                    <span>124 Works Verified Across 20 States</span>
                  </div>
                </div>

                <!-- Duplicates Flagged -->
                <div class="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-1">
                  <div class="flex items-center justify-between">
                    <span class="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Duplicates Flagged</span>
                    <span class="material-symbols-outlined text-secondary text-[20px]">warning_amber</span>
                  </div>
                  <div class="font-headline-xl text-headline-xl text-secondary font-bold tracking-tight">5</div>
                  <div class="pt-1 border-t border-outline-variant font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">savings</span>
                    <span>Cross-Scheme Anti-Duplication Active</span>
                  </div>
                </div>

                <!-- Citizen Reports -->
                <div class="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-1">
                  <div class="flex items-center justify-between">
                    <span class="font-label-md text-label-md uppercase tracking-wider text-tertiary-container font-bold">Citizen Reports</span>
                    <span class="material-symbols-outlined text-tertiary-container text-[20px]">groups</span>
                  </div>
                  <div class="font-headline-xl text-headline-xl text-tertiary-container font-bold tracking-tight">15+</div>
                  <div class="pt-1 border-t border-outline-variant font-label-sm text-label-sm text-tertiary-container font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">task_alt</span>
                    <span>100% Routed for District Scrutiny</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. CORE VERIFICATION PILLARS -->
          <section aria-label="Core Verification Pillars" class="w-full bg-surface py-space-lg">
            <div class="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
              <div class="mb-space-md">
                <h2 class="font-headline-md text-headline-md text-primary font-bold">Core Verification Pillars</h2>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                <div class="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-space-xs">
                  <div class="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-[18px]">radar</span>
                  </div>
                  <div>
                    <h3 class="font-label-lg text-label-lg text-primary font-bold">Duplicate Work Detection</h3>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Flags overlapping and duplicate project claims.</p>
                  </div>
                </div>

                <div class="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-space-xs">
                  <div class="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-[18px]">translate</span>
                  </div>
                  <div>
                    <h3 class="font-label-lg text-label-lg text-primary font-bold">Citizen Contradiction Engine</h3>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Compares citizen reports against official status.</p>
                  </div>
                </div>

                <div class="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-space-xs">
                  <div class="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-[18px]">add_a_photo</span>
                  </div>
                  <div>
                    <h3 class="font-label-lg text-label-lg text-primary font-bold">Ground Truth Engine</h3>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Verifies GPS, cell towers, and photos.</p>
                  </div>
                </div>

                <div class="bg-surface-container-lowest p-space-md shadow-sm rounded border border-outline-variant flex flex-col justify-between gap-space-xs">
                  <div class="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                  </div>
                  <div>
                    <h3 class="font-label-lg text-label-lg text-primary font-bold">Audit Trail</h3>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Logs fund milestones into audit records.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <!-- Institutional Footer with Honest Disclaimer -->
      <footer class="w-full bg-surface-container-low border-t border-outline-variant text-on-surface">
        <div class="max-w-7xl mx-auto px-margin lg:px-margin-desktop py-space-lg">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-md">
            <div class="flex flex-col gap-1">
              <div class="font-headline-md text-headline-md text-primary font-bold tracking-tight">SETU Platform</div>
              <p class="font-body-sm text-body-sm text-on-surface-variant">Automated anomaly surveillance and public fund verification system for MPLADS.</p>
            </div>
            <div class="flex flex-col gap-1">
              <div class="font-label-md text-label-md text-primary uppercase tracking-wide font-bold">Quick Links</div>
              <ul class="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
                <li><a class="hover:text-primary transition-colors" href="#/login">National Dashboard</a></li>
                <li><a class="hover:text-primary transition-colors" href="#/login">Duplicate Registry</a></li>
                <li><a class="hover:text-primary transition-colors" href="#/" onclick="event.preventDefault()">Geotag Protocols</a></li>
                <li><a class="hover:text-primary transition-colors" href="#/citizen-portal">File Complaint</a></li>
              </ul>
            </div>
            <div class="flex flex-col gap-1">
              <div class="font-label-md text-label-md text-primary uppercase tracking-wide font-bold">Directives</div>
              <ul class="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
                <li><a class="hover:text-primary transition-colors" href="#/" onclick="event.preventDefault()">Revised MPLADS Guidelines</a></li>
                <li><a class="hover:text-primary transition-colors" href="#/" onclick="event.preventDefault()">Anti-Duplication Standard</a></li>
                <li><a class="hover:text-primary transition-colors" href="#/" onclick="event.preventDefault()">Citizen Charter</a></li>
                <li><a class="hover:text-primary transition-colors" href="#/" onclick="event.preventDefault()">Audit Rules</a></li>
              </ul>
            </div>
          </div>

          <div class="p-space-sm bg-surface-container-highest rounded border-l-4 border-secondary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-on-surface">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[20px]">info</span>
              <div class="font-body-sm text-body-sm">
                <span class="font-bold">Academic Prototype for Smart India Hackathon 2026 (Problem Statement SIH26102).</span> Not an official Government of India portal.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}
