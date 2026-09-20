/**
 * SETU Citizen Portal Vanilla HTML & Event Layer
 * 
 * Provides interactive client-side rendering for the public Citizen Portal
 * at hash route #/citizen-portal.
 * 
 * Location-First Flow:
 * - Automatically requests browser geolocation via navigator.geolocation.getCurrentPosition()
 * - Auto-suggests nearest State and District from mock catalog with full manual override
 * - Suggests projects in that district so citizens never need a project ID
 * - POSTs report with reportedLocation (if captured) to /projects/{id}/citizen-reports
 * - Displays official confirmation receipt (without revealing internal contradiction scores or distances)
 */

import { allProjects } from './projectDetailData.js';

// Haversine formula to compute great-circle distance in kilometers
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find nearest project to given coordinates
function findNearestProject(lat, lon, projects) {
  let nearest = null;
  let minDistance = Infinity;

  for (const p of projects) {
    const pLat = p.siteCoordinates?.latitude ?? p.latitude;
    const pLon = p.siteCoordinates?.longitude ?? p.longitude;
    if (pLat != null && pLon != null) {
      const dist = calculateHaversineDistance(lat, lon, pLat, pLon);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = { project: p, distance: dist };
      }
    }
  }
  return nearest ? nearest.project : null;
}

// Unique states and districts helper
const allStates = Array.from(new Set(allProjects.map((p) => p.state))).sort();

function getDistrictsForState(state) {
  return Array.from(
    new Set(allProjects.filter((p) => p.state === state).map((p) => p.district))
  ).sort();
}

// Global portal module state
let portalState = {
  geoStatus: 'init', // 'init' | 'detecting' | 'granted' | 'denied' | 'unavailable'
  reportedLocation: null, // { latitude, longitude } | null
  selectedState: 'Maharashtra',
  selectedDistrict: 'Pune',
  selectedProjectId: 'PRJ-IND-2003',
  complaintText: '',
  citizenName: '',
  phone: '',
  submissionConfirmation: null,
  submitErrorMessage: '',
  isSubmitting: false,
};

let hasAutoRequestedGeo = false;

export function getCitizenPortalHtml() {
  const {
    geoStatus,
    reportedLocation,
    selectedState,
    selectedDistrict,
    selectedProjectId,
    submissionConfirmation,
    submitErrorMessage,
    complaintText,
    citizenName,
    phone,
    isSubmitting,
  } = portalState;

  if (submissionConfirmation) {
    return `
      <div class="setu-portal-page">
        <div class="setu-masthead">
          <span class="setu-masthead-gov">SMART INDIA HACKATHON 2026 • PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102</span>
          <span class="setu-masthead-locale">Public Grievance & Transparency Portal</span>
        </div>

        <header class="setu-landing-header">
          <div class="setu-landing-header-inner">
            <div class="setu-landing-logo-badge">GOV</div>
            <span class="setu-landing-title">SETU</span>
            <span class="setu-landing-tagline">Citizen Ground Truth & Infrastructure Verification</span>
          </div>
        </header>

        <main class="setu-portal-container">
          <div class="setu-portal-header-section">
            <div class="setu-portal-top-nav">
              <a href="#/" class="setu-back-link">← Return to Public Home</a>
              <span style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted);">
                Public Interface • Verification Acknowledgment
              </span>
            </div>
            <h1 class="setu-portal-title">Grievance Submission Recorded</h1>
            <p class="setu-portal-subtitle">
              Your on-the-ground observation has been assigned an official tracking identifier.
            </p>
          </div>

          <div class="setu-confirmation-receipt">
            <div class="setu-receipt-banner">
              <span class="setu-receipt-icon">✓</span>
              <div>
                <h3 class="setu-receipt-headline">Grievance Successfully Registered</h3>
                <p class="setu-receipt-sub">
                  Your ground observation has been logged in the national audit registry.
                </p>
              </div>
            </div>

            <div class="setu-receipt-grid">
              <div class="setu-receipt-item">
                <span class="setu-receipt-label">Grievance Tracking ID</span>
                <span class="setu-receipt-id">${submissionConfirmation.id}</span>
              </div>
              <div class="setu-receipt-item">
                <span class="setu-receipt-label">Filing Timestamp</span>
                <span class="setu-receipt-value">
                  ${submissionConfirmation.submittedAt ? submissionConfirmation.submittedAt.replace('T', ' ').substring(0, 19) : 'Just Now'}
                </span>
              </div>
              <div class="setu-receipt-item" style="grid-column: span 2;">
                <span class="setu-receipt-label">Associated MPLADS Project</span>
                <span class="setu-receipt-value">
                  ${submissionConfirmation.projectName} (${submissionConfirmation.projectId})
                </span>
              </div>
              <div class="setu-receipt-item">
                <span class="setu-receipt-label">Jurisdiction</span>
                <span class="setu-receipt-value">
                  ${submissionConfirmation.district}, ${submissionConfirmation.state}
                </span>
              </div>
              <div class="setu-receipt-item">
                <span class="setu-receipt-label">Current Audit Status</span>
                <span class="setu-receipt-value" style="color: var(--setu-color-primary-base);">
                  ${submissionConfirmation.status}
                </span>
              </div>
            </div>

            <div class="setu-receipt-notice">
              <strong>Statutory Acknowledgment:</strong> Under Section 12 of the Public Audit & Grievance Guidelines,
              your ground-truth observation has been transmitted to the District Authority Collectorate and Central
              Audit Inspection cell. Physical verification and contractor stage reconciliation will be scheduled accordingly.
            </div>

            <div class="setu-receipt-actions">
              <button type="button" class="setu-btn-primary" id="btn-submit-another">
                Submit Another Report
              </button>
              <a href="#/" class="setu-btn-secondary">
                Return to Home Page
              </a>
            </div>
          </div>
        </main>

        <footer class="setu-landing-footer">
          <span class="setu-landing-footer-text">
            Official Government Audit Portal • Public Grievance Intake Framework • Governed under MoSPI & CAG Audit Guidelines
          </span>
        </footer>
      </div>
    `;
  }

  // Filter projects by selected state and district
  const availableDistricts = getDistrictsForState(selectedState);
  const filteredProjects = allProjects.filter(
    (p) => p.state === selectedState && p.district === selectedDistrict
  );

  const stateOptionsHtml = allStates
    .map(
      (st) => `<option value="${st}" ${st === selectedState ? 'selected' : ''}>${st}</option>`
    )
    .join('');

  const districtOptionsHtml = availableDistricts
    .map(
      (dist) => `<option value="${dist}" ${dist === selectedDistrict ? 'selected' : ''}>${dist}</option>`
    )
    .join('');

  const projectCardsHtml = filteredProjects
    .map((p) => {
      const isSelected = p.id === selectedProjectId;
      const shortDesc = `${p.category} civil works executed by ${p.implementingAgency} (${p.status} • Certified Physical: ${p.physicalProgress}%)`;

      return `
        <div class="setu-project-card ${isSelected ? 'selected' : ''}" data-project-id="${p.id}">
          <input
            type="radio"
            name="project-select-radio"
            class="setu-project-radio"
            value="${p.id}"
            ${isSelected ? 'checked' : ''}
          />
          <div class="setu-project-card-body">
            <div class="setu-project-card-title">${p.name}</div>
            <div class="setu-project-card-desc">${shortDesc}</div>
            <div class="setu-project-card-tags">
              <span class="setu-tag-pill">${p.category}</span>
              <span class="setu-tag-pill">${p.constituency} Constituency</span>
              <span class="setu-tag-pill">Sanction: ₹${(p.sanctionedAmount / 100000).toFixed(1)} Lakhs</span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="setu-portal-page">
      <div class="setu-masthead">
        <span class="setu-masthead-gov">SMART INDIA HACKATHON 2026 • PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102</span>
        <span class="setu-masthead-locale">Public Grievance & Transparency Portal</span>
      </div>

      <header class="setu-landing-header">
        <div class="setu-landing-header-inner">
          <div class="setu-landing-logo-badge">GOV</div>
          <span class="setu-landing-title">SETU</span>
          <span class="setu-landing-tagline">Citizen Ground Truth & Infrastructure Verification</span>
        </div>
      </header>

      <main class="setu-portal-container">
        <div class="setu-portal-header-section">
          <div class="setu-portal-top-nav">
            <a href="#/" class="setu-back-link">← Return to Public Home</a>
            <span style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted);">
              Public Access • No Login Required
            </span>
          </div>
          <h1 class="setu-portal-title">Report an Infrastructure Issue or Ground Observation</h1>
          <p class="setu-portal-subtitle">
            Submit direct on-the-ground observations regarding MPLADS civil works in your constituency.
            Using your device's location, we automatically present active projects in your area.
          </p>
        </div>

        <form class="setu-grievance-form-card" id="citizen-complaint-form">
          <div class="setu-guidance-box">
            <span class="setu-guidance-title">Citizen Grievance Instructions:</span>
            Please report factual civil works observations (e.g. stalled machinery, incomplete masonry without roof slabs, dry water taps, unpaved road shoulders). Geolocation helps verify that observations are submitted near registered works.
          </div>

          ${submitErrorMessage ? `<div class="setu-form-error">${submitErrorMessage}</div>` : ''}

          <!-- STEP 1: Location & Jurisdiction -->
          <div class="setu-form-group">
            <label class="setu-form-label">
              <span class="setu-step-badge">1</span>
              Location & Jurisdiction
            </label>

            <!-- Geolocation Status Banner -->
            <div class="setu-geo-status-banner ${geoStatus}" id="setu-geo-banner">
              <div class="setu-geo-content">
                <span class="setu-geo-icon">
                  ${geoStatus === 'detecting' ? '⌛' : geoStatus === 'granted' ? '📍' : '🌐'}
                </span>
                <div>
                  ${
                    geoStatus === 'detecting'
                      ? '<span>Detecting your location via browser GPS to suggest nearby civil works...</span>'
                      : geoStatus === 'granted' && reportedLocation
                      ? `<span><strong>Location detected:</strong> Auto-suggested <strong>${selectedDistrict}, ${selectedState}</strong> based on device coordinates (${reportedLocation.latitude.toFixed(4)}°N, ${reportedLocation.longitude.toFixed(4)}°E). You can override below.</span>`
                      : '<span>Device geolocation unavailable or skipped. Please select your State and District manually below.</span>'
                  }
                </div>
              </div>

              <button type="button" class="setu-geo-retry-btn" id="btn-detect-geo">
                ${geoStatus === 'granted' ? 'Update GPS' : 'Detect Location'}
              </button>
            </div>

            <!-- State and District Dropdowns -->
            <div class="setu-location-grid">
              <div>
                <label class="setu-form-label" for="citizen-state-select" style="font-size: var(--setu-font-size-caption);">
                  State / Union Territory
                </label>
                <select id="citizen-state-select" class="setu-select-dropdown" style="width: 100%;">
                  ${stateOptionsHtml}
                </select>
              </div>

              <div>
                <label class="setu-form-label" for="citizen-district-select" style="font-size: var(--setu-font-size-caption);">
                  District
                </label>
                <select id="citizen-district-select" class="setu-select-dropdown" style="width: 100%;">
                  ${districtOptionsHtml}
                </select>
              </div>
            </div>
          </div>

          <!-- STEP 2: Project Suggestion -->
          <div class="setu-form-group">
            <label class="setu-form-label">
              <span class="setu-step-badge">2</span>
              Select Relevant Civil Project in ${selectedDistrict}, ${selectedState} *
            </label>
            <span style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-secondary); display: block; margin-top: -4px;">
              Select the work you are reporting on from the list below. No formal project ID is required.
            </span>

            <div class="setu-project-list" id="citizen-project-cards-container">
              ${projectCardsHtml}
              ${
                filteredProjects.length === 0
                  ? `<div class="setu-empty-state" style="padding: var(--setu-space-4);">
                      <p class="setu-empty-state-text">
                        No active MPLADS projects recorded for ${selectedDistrict}. Please select another district in ${selectedState}.
                      </p>
                    </div>`
                  : ''
              }
            </div>
          </div>

          <!-- STEP 3: Grievance Observation Textarea -->
          <div class="setu-form-group">
            <label class="setu-form-label" for="citizen-complaint-textarea">
              <span class="setu-step-badge">3</span>
              On-the-Ground Observation / Defect Details *
            </label>
            <textarea
              id="citizen-complaint-textarea"
              class="setu-textarea"
              rows="5"
              placeholder="Describe exactly what you observed on site. Example: 'The contractor claimed the reading room is 90% complete, but on the ground only bare brick walls stand without a roof slab, windows, or electrical fittings. No workers have been present for 2 months.'"
              required
            >${complaintText}</textarea>
            <span style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted);">
              Minimum 10 characters. Please specify structural status, missing fixtures, or stalled equipment.
            </span>
          </div>

          <!-- Optional Citizen Contact Info -->
          <div class="setu-form-row">
            <div class="setu-form-group">
              <label class="setu-form-label" for="citizen-name-input">
                Your Full Name (Optional)
              </label>
              <input
                id="citizen-name-input"
                type="text"
                class="setu-form-input"
                placeholder="e.g. Rajesh Patil"
                value="${citizenName}"
              />
            </div>

            <div class="setu-form-group">
              <label class="setu-form-label" for="citizen-phone-input">
                Mobile Number (Optional — for SMS Tracking)
              </label>
              <input
                id="citizen-phone-input"
                type="tel"
                class="setu-form-input"
                placeholder="e.g. 9876543210"
                value="${phone}"
              />
            </div>
          </div>

          <!-- STEP 4: Submit & Location Metadata Indicator -->
          <div class="setu-geo-attached-note">
            ${
              reportedLocation
                ? `<span>📍</span>
                   <span>
                     Device coordinates (${reportedLocation.latitude.toFixed(4)}°N, ${reportedLocation.longitude.toFixed(4)}°E) will be attached for on-site proximity verification.
                   </span>`
                : `<span>🌐</span>
                   <span>
                     No device coordinates attached. Grievance will be filed under district-level jurisdiction.
                   </span>`
            }
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: var(--setu-space-2); flex-wrap: wrap; gap: var(--setu-space-2);">
            <span style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted);">
              By submitting, you certify that this ground observation is submitted in good faith.
            </span>
            <button
              type="submit"
              class="setu-btn-primary"
              id="btn-submit-citizen-report"
              ${isSubmitting ? 'disabled' : ''}
              style="padding: var(--setu-space-2) var(--setu-space-6); min-width: 180px;"
            >
              ${isSubmitting ? 'Submitting Report...' : 'Submit Grievance Report'}
            </button>
          </div>
        </form>
      </main>

      <footer class="setu-landing-footer">
        <span class="setu-landing-footer-text">
          Official Government Audit Portal • Public Grievance Intake Framework • Governed under MoSPI & CAG Audit Guidelines
        </span>
      </footer>
    </div>
  `;
}

/**
 * Triggers geolocation request and updates portalState
 */
function triggerGeolocation(appEl) {
  if (!navigator.geolocation) {
    portalState.geoStatus = 'unavailable';
    portalState.reportedLocation = null;
    mountCitizenPortal(appEl);
    return;
  }

  portalState.geoStatus = 'detecting';
  mountCitizenPortal(appEl);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      portalState.reportedLocation = { latitude, longitude };
      portalState.geoStatus = 'granted';

      const nearest = findNearestProject(latitude, longitude, allProjects);
      if (nearest) {
        portalState.selectedState = nearest.state;
        portalState.selectedDistrict = nearest.district;
        portalState.selectedProjectId = nearest.id;
      }
      mountCitizenPortal(appEl);
    },
    (err) => {
      portalState.geoStatus = 'denied';
      portalState.reportedLocation = null;
      mountCitizenPortal(appEl);
    },
    { timeout: 8000, enableHighAccuracy: false }
  );
}

/**
 * Mounts the Citizen Portal view and attaches interactive DOM event handlers.
 */
export function mountCitizenPortal(appEl) {
  if (!appEl) return;
  appEl.innerHTML = getCitizenPortalHtml();

  // On first mount, auto-request browser location
  if (!hasAutoRequestedGeo) {
    hasAutoRequestedGeo = true;
    triggerGeolocation(appEl);
    return;
  }

  // If in confirmation view, wire "Submit Another Report"
  if (portalState.submissionConfirmation) {
    const anotherBtn = appEl.querySelector('#btn-submit-another');
    if (anotherBtn) {
      anotherBtn.addEventListener('click', () => {
        portalState.submissionConfirmation = null;
        portalState.submitErrorMessage = '';
        portalState.complaintText = '';
        portalState.citizenName = '';
        portalState.phone = '';
        portalState.isSubmitting = false;
        mountCitizenPortal(appEl);
      });
    }
    return;
  }

  // Detect location button
  const detectBtn = appEl.querySelector('#btn-detect-geo');
  if (detectBtn) {
    detectBtn.addEventListener('click', () => {
      triggerGeolocation(appEl);
    });
  }

  // State selection change
  const stateSelect = appEl.querySelector('#citizen-state-select');
  if (stateSelect) {
    stateSelect.addEventListener('change', (e) => {
      const newState = e.target.value;
      portalState.selectedState = newState;
      const districts = getDistrictsForState(newState);
      portalState.selectedDistrict = districts[0] || '';

      const matching = allProjects.filter(
        (p) => p.state === newState && p.district === portalState.selectedDistrict
      );
      portalState.selectedProjectId = matching[0]?.id || '';

      mountCitizenPortal(appEl);
    });
  }

  // District selection change
  const districtSelect = appEl.querySelector('#citizen-district-select');
  if (districtSelect) {
    districtSelect.addEventListener('change', (e) => {
      const newDistrict = e.target.value;
      portalState.selectedDistrict = newDistrict;

      const matching = allProjects.filter(
        (p) => p.state === portalState.selectedState && p.district === newDistrict
      );
      portalState.selectedProjectId = matching[0]?.id || '';

      mountCitizenPortal(appEl);
    });
  }

  // Project card selection clicks
  const projectCards = appEl.querySelectorAll('.setu-project-card');
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      if (projId && projId !== portalState.selectedProjectId) {
        portalState.selectedProjectId = projId;

        // Update active class and radio selection without full re-render
        projectCards.forEach((c) => {
          const isTarget = c.getAttribute('data-project-id') === projId;
          c.classList.toggle('selected', isTarget);
          const radio = c.querySelector('input[type="radio"]');
          if (radio) radio.checked = isTarget;
        });
      }
    });
  });

  // Track textarea, name, and phone input values
  const textarea = appEl.querySelector('#citizen-complaint-textarea');
  if (textarea) {
    textarea.addEventListener('input', (e) => {
      portalState.complaintText = e.target.value;
    });
  }

  const nameInput = appEl.querySelector('#citizen-name-input');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      portalState.citizenName = e.target.value;
    });
  }

  const phoneInput = appEl.querySelector('#citizen-phone-input');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      portalState.phone = e.target.value;
    });
  }

  // Form submission
  const form = appEl.querySelector('#citizen-complaint-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      portalState.submitErrorMessage = '';

      const complaintText = textarea ? textarea.value.trim() : portalState.complaintText.trim();
      const citizenName = nameInput ? nameInput.value.trim() : portalState.citizenName.trim();
      const phone = phoneInput ? phoneInput.value.trim() : portalState.phone.trim();

      if (!portalState.selectedProjectId) {
        portalState.submitErrorMessage = 'Please select an active MPLADS civil project.';
        mountCitizenPortal(appEl);
        return;
      }

      if (complaintText.length < 10) {
        portalState.submitErrorMessage = 'Please provide an observation of at least 10 characters.';
        mountCitizenPortal(appEl);
        return;
      }

      portalState.isSubmitting = true;
      mountCitizenPortal(appEl);

      const selectedProj =
        allProjects.find((p) => p.id === portalState.selectedProjectId) || allProjects[0];

      const payload = {
        complaintText,
        citizenName: citizenName || undefined,
        phone: phone || undefined,
        district: selectedProj?.district || portalState.selectedDistrict,
        state: selectedProj?.state || portalState.selectedState,
        reportedLocation: portalState.reportedLocation
          ? {
              latitude: portalState.reportedLocation.latitude,
              longitude: portalState.reportedLocation.longitude,
            }
          : undefined,
      };

      try {
        const res = await fetch(`http://127.0.0.1:8000/projects/${portalState.selectedProjectId}/citizen-reports`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          // Official receipt: strictly omit contradictionScore and geoMatchDistance
          portalState.submissionConfirmation = {
            id: data.id || `CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
            projectId: data.projectId || portalState.selectedProjectId,
            projectName: data.projectName || selectedProj?.name,
            district: selectedProj?.district || portalState.selectedDistrict,
            state: selectedProj?.state || portalState.selectedState,
            submittedAt: data.submittedAt || new Date().toISOString(),
            status: 'Registered for Field Verification',
          };
        } else {
          const errData = await res.json().catch(() => ({}));
          portalState.submitErrorMessage = errData.detail || 'Submission failed. Please try again.';
        }
      } catch (err) {
        // Offline / dev fallback
        portalState.submissionConfirmation = {
          id: `CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
          projectId: portalState.selectedProjectId,
          projectName: selectedProj?.name,
          district: selectedProj?.district || portalState.selectedDistrict,
          state: selectedProj?.state || portalState.selectedState,
          submittedAt: new Date().toISOString(),
          status: 'Registered for Field Verification',
        };
      } finally {
        portalState.isSubmitting = false;
        mountCitizenPortal(appEl);
      }
    });
  }
}
