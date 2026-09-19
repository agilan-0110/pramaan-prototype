import React from 'react';
import './Landing.css';

/**
 * Public Landing Page Component
 * 
 * Government-style public entry portal for SETU MPLADS platform.
 * Provides two visually distinct entry points:
 * 1. Official Login (Administrative / Audit access)
 * 2. Citizen Portal (Public grievance and issue reporting)
 */
export default function Landing({ onNavigate }) {
  const handleNav = (route) => (e) => {
    if (typeof onNavigate === 'function') {
      e.preventDefault();
      onNavigate(route);
    }
  };

  return (
    <div className="setu-landing">
      {/* Masthead Header: Government branding row */}
      <div className="setu-masthead">
        <span className="setu-masthead-gov">
          SMART INDIA HACKATHON 2026 • PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102
        </span>
        <span className="setu-masthead-locale">National Audit & Oversight Framework</span>
      </div>

      {/* Header Branding Row */}
      <header className="setu-landing-header">
        <div className="setu-landing-header-inner">
          <div className="setu-landing-logo-badge">GOV</div>
          <span className="setu-landing-title">SETU</span>
          <span className="setu-landing-tagline">National Public Audit & Monitoring Platform</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="setu-landing-main">
        {/* Hero Section */}
        <section className="setu-hero">
          <h1 className="setu-hero-headline">MPLADS Scheme Audit & Public Transparency Platform</h1>
          <p className="setu-hero-sentence">
            An institutional monitoring and contradiction-detection platform designed to detect anomalies, flag compliance violations including fund-splitting patterns, and support accountability through independent citizen verification — across MPLADS infrastructure projects in India.
          </p>
        </section>

        {/* Two Visually Distinct Entry Points */}
        <section className="setu-portals">
          {/* 1. Official Login */}
          <div className="setu-portal-card">
            <div className="setu-portal-header">
              <span className="setu-portal-tag setu-portal-tag-official">Administrative & Statutory Access</span>
              <h2 className="setu-portal-title">Official Portal</h2>
              <p className="setu-portal-desc">
                Secure access for authorized administrative authorities, nodal departments, and audit institutions.
              </p>
            </div>
            <div className="setu-portal-meta">
              Restricted to MP Offices, District Authorities, State Nodal Officers, MoSPI & CAG Auditors.
            </div>
            <a
              href="#/login"
              className="setu-btn-primary"
              id="btn-official-login"
              onClick={handleNav('#/login')}
            >
              Official Login
            </a>
          </div>

          {/* 2. Citizen Portal / Report an Issue */}
          <div className="setu-portal-card">
            <div className="setu-portal-header">
              <span className="setu-portal-tag setu-portal-tag-citizen">Public Participation & Grievance</span>
              <h2 className="setu-portal-title">Citizen Portal</h2>
              <p className="setu-portal-desc">
                Submit on-ground infrastructure complaints or verify local project status.
              </p>
            </div>
            <div className="setu-portal-meta">
              Public access — no login required. Monitored directly under Citizen NLP oversight.
            </div>
            <a
              href="#/citizen-portal"
              className="setu-btn-secondary"
              id="btn-citizen-portal"
              onClick={handleNav('#/citizen-portal')}
            >
              Report an Issue / Citizen Portal
            </a>
          </div>
        </section>
      </main>

      {/* Minimal Disclaimer Footer (Reused from dashboard shell style) */}
      <footer className="setu-landing-footer">
        <span className="setu-landing-footer-text">
          Official Government Audit Portal • Strictly for Authorized Administrative & Public Grievance Processes • Governed under MoSPI & CAG Audit Oversight Guidelines
        </span>
      </footer>
    </div>
  );
}
