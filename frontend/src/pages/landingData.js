/**
 * PRAMAAN Gateway / Entry Page HTML Generator
 * Extremely minimal official government web application entry page.
 */

export function getLandingHtml() {
  return `
    <div class="min-h-screen flex flex-col justify-between bg-white text-[#0f172a] antialiased">
      <!-- HEADER -->
      <header class="w-full bg-white border-b border-[#e2e8f0]">
        <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <span class="text-xl font-bold tracking-tight text-[#0B2545]">PRAMAAN</span>
            <span class="text-xs text-[#64748b] font-medium">MPLADS Audit &amp; Monitoring System</span>
          </div>
          <div class="text-xs sm:text-sm font-medium text-[#334155] tracking-wide">Government of India</div>
        </div>
      </header>

      <!-- CENTER CONTENT -->
      <main class="flex-1 flex flex-col justify-center items-center px-6 py-12 max-w-4xl mx-auto w-full">
        <!-- Center Titles -->
        <div class="text-center mb-10">
          <div class="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#64748b] mb-3">
            MPLADS MONITORING &amp; AUDIT
          </div>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-[#0B2545] tracking-tight mb-3">
            PRAMAAN
          </h1>
          <h2 class="text-lg sm:text-xl font-semibold text-[#1e293b] mb-2">
            AI-Powered MPLADS Audit &amp; Monitoring System
          </h2>
          <p class="text-sm sm:text-base text-[#475569] max-w-xl mx-auto">
            Transparent monitoring and evidence-based project oversight.
          </p>
        </div>

        <!-- TWO ENTRY OPTIONS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <!-- CARD 1: CITIZEN PORTAL -->
          <div class="bg-white border border-[#e2e8f0] rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-[#0B2545] hover:shadow-md transition-all duration-200">
            <div>
              <div class="w-12 h-12 rounded-md bg-[#f1f5f9] flex items-center justify-center text-[#0B2545] mb-5">
                <span class="material-symbols-outlined text-[26px]">public</span>
              </div>
              <h3 class="text-lg font-bold text-[#0B2545] tracking-tight">
                CITIZEN PORTAL
              </h3>
              <p class="text-sm text-[#475569] mt-2 mb-6">
                Access the public project information portal.
              </p>
            </div>
            <div>
              <a href="#/citizen-portal" class="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#0B2545] hover:bg-[#133D72] text-white text-sm font-semibold rounded transition-colors no-underline">
                <span>Enter Citizen Portal</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>

          <!-- CARD 2: OFFICIAL LOGIN -->
          <div class="bg-white border border-[#e2e8f0] rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-[#0B2545] hover:shadow-md transition-all duration-200">
            <div>
              <div class="w-12 h-12 rounded-md bg-[#f1f5f9] flex items-center justify-center text-[#0B2545] mb-5">
                <span class="material-symbols-outlined text-[26px]">shield</span>
              </div>
              <h3 class="text-lg font-bold text-[#0B2545] tracking-tight">
                OFFICIAL LOGIN
              </h3>
              <p class="text-sm text-[#475569] mt-2 mb-6">
                Authorized access for government officials.
              </p>
            </div>
            <div>
              <a href="#/login" class="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#0B2545] hover:bg-[#133D72] text-white text-sm font-semibold rounded transition-colors no-underline">
                <span>Official Login</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <!-- FOOTER -->
      <footer class="w-full bg-white border-t border-[#e2e8f0] py-4 text-xs text-[#64748b]">
        <div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <span class="font-medium text-[#334155]">Government of India</span>
            <span class="mx-2 text-[#cbd5e1] hidden sm:inline">•</span>
            <span class="block sm:inline">MPLADS Audit &amp; Monitoring System</span>
          </div>
          <div class="flex items-center gap-3">
            <a href="#/" onclick="event.preventDefault()" class="text-[#64748b] hover:text-[#0B2545] transition-colors no-underline">Privacy</a>
            <span class="text-[#cbd5e1]">|</span>
            <a href="#/" onclick="event.preventDefault()" class="text-[#64748b] hover:text-[#0B2545] transition-colors no-underline">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  `;
}
