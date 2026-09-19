/**
 * Landing Page HTML Generator for vanilla client rendering
 */

export function getLandingHtml() {
  return `
    <div class="setu-landing">
      <!-- Masthead Header: Government branding row -->
      <div class="setu-masthead">
        <span class="setu-masthead-gov">SMART INDIA HACKATHON 2026 • PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102</span>
        <span class="setu-masthead-locale">National Audit & Oversight Framework</span>
      </div>

      <!-- Header Branding Row -->
      <header class="setu-landing-header">
        <div class="setu-landing-header-inner">
          <div class="setu-landing-logo-badge">GOV</div>
          <span class="setu-landing-title">SETU</span>
          <span class="setu-landing-tagline">National Public Audit & Monitoring Platform</span>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="setu-landing-main">
        <!-- Hero Section -->
        <section class="setu-hero">
          <h1 class="setu-hero-headline">MPLADS Scheme Audit & Public Transparency Platform</h1>
          <p class="setu-hero-sentence">
            An institutional monitoring and contradiction-detection platform designed to detect anomalies, flag compliance violations including fund-splitting patterns, and support accountability through independent citizen verification — across MPLADS infrastructure projects in India.
          </p>
        </section>

        <!-- Two Visually Distinct Entry Points -->
        <section class="setu-portals">
          <!-- 1. Official Login -->
          <div class="setu-portal-card">
            <div class="setu-portal-header">
              <span class="setu-portal-tag setu-portal-tag-official">Administrative & Statutory Access</span>
              <h2 class="setu-portal-title">Official Portal</h2>
              <p class="setu-portal-desc">
                Secure access for authorized administrative authorities, nodal departments, and audit institutions.
              </p>
            </div>
            <div class="setu-portal-meta">
              Restricted to MP Offices, District Authorities, State Nodal Officers, MoSPI & CAG Auditors.
            </div>
            <a href="#/login" class="setu-btn-primary" id="btn-official-login">Official Login</a>
          </div>

          <!-- 2. Citizen Portal / Report an Issue -->
          <div class="setu-portal-card">
            <div class="setu-portal-header">
              <span class="setu-portal-tag setu-portal-tag-citizen">Public Participation & Grievance</span>
              <h2 class="setu-portal-title">Citizen Portal</h2>
              <p class="setu-portal-desc">
                Submit on-ground infrastructure complaints or verify local project status.
              </p>
            </div>
            <div class="setu-portal-meta">
              Public access — no login required. Monitored directly under Citizen NLP oversight.
            </div>
            <a href="#/citizen-portal" class="setu-btn-secondary" id="btn-citizen-portal">Report an Issue / Citizen Portal</a>
          </div>
        </section>
      </main>

      <!-- Minimal Disclaimer Footer (reused from shell convention) -->
      <footer class="setu-landing-footer">
        <span class="setu-landing-footer-text">
          Official Government Audit Portal • Strictly for Authorized Administrative & Public Grievance Processes • Governed under MoSPI & CAG Audit Oversight Guidelines
        </span>
      </footer>
    </div>
  `;
}
