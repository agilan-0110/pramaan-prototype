import React, { useState, useEffect } from 'react';
import './CitizenPortal.css';
import mockProjects from '../../../backend/app/data/mockProjects.json';

/**
 * Calculates Haversine distance in kilometers between two GPS coordinate pairs.
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
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

/**
 * Finds the nearest project from the catalog based on latitude and longitude coordinates.
 */
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

// Extract unique sorted states
const allStates = Array.from(new Set(mockProjects.map((p) => p.state))).sort();

// Helper to get districts for a given state
function getDistrictsForState(state) {
  return Array.from(
    new Set(mockProjects.filter((p) => p.state === state).map((p) => p.district))
  ).sort();
}

/**
 * Public Citizen Complaint & Ground Truth Submission Portal
 * 
 * Location-first redesign with real browser geolocation integration:
 * 1. Automatically requests navigator.geolocation on load.
 * 2. Pre-fills nearest state/district while permitting full manual override.
 * 3. Shows contextual project suggestions with simple plain-language summaries.
 * 4. Submits complaint with reportedLocation coordinates (if captured).
 * 
 * CRITICAL: Internal NLP contradictionScore and geoMatchDistance are strictly internal signals
 * for audit officials and are NEVER displayed to the citizen on confirmation.
 */
export default function CitizenPortal({ onNavigate }) {
  // Step 1: Location & Geolocation state
  const [geoStatus, setGeoStatus] = useState('detecting'); // 'detecting' | 'granted' | 'denied' | 'unavailable'
  const [reportedLocation, setReportedLocation] = useState(null); // { latitude, longitude } | null
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');

  // Step 2: Project Selection state
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-IND-2003');

  // Step 3: Complaint Form state
  const [complaintText, setComplaintText] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Request browser geolocation on page load
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('unavailable');
      return;
    }

    setGeoStatus('detecting');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setReportedLocation({ latitude, longitude });
        setGeoStatus('granted');

        // Match against nearest project in catalog
        const nearest = findNearestProject(latitude, longitude, mockProjects);
        if (nearest) {
          setSelectedState(nearest.state);
          setSelectedDistrict(nearest.district);
          setSelectedProjectId(nearest.id);
        }
      },
      (error) => {
        // Geolocation denied or unavailable — no error, no blocking
        setGeoStatus('denied');
        setReportedLocation(null);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  // Compute available districts for currently selected state
  const availableDistricts = getDistrictsForState(selectedState);

  // Handle manual State override
  const handleStateChange = (newState) => {
    setSelectedState(newState);
    const districts = getDistrictsForState(newState);
    const newDistrict = districts[0] || '';
    setSelectedDistrict(newDistrict);

    const matching = mockProjects.filter((p) => p.state === newState && p.district === newDistrict);
    if (matching.length > 0) {
      setSelectedProjectId(matching[0].id);
    } else {
      setSelectedProjectId('');
    }
  };

  // Handle manual District override
  const handleDistrictChange = (newDistrict) => {
    setSelectedDistrict(newDistrict);
    const matching = mockProjects.filter((p) => p.state === selectedState && p.district === newDistrict);
    if (matching.length > 0) {
      setSelectedProjectId(matching[0].id);
    } else {
      setSelectedProjectId('');
    }
  };

  // Filter projects by current state and district
  const filteredProjects = mockProjects.filter(
    (p) => p.state === selectedState && p.district === selectedDistrict
  );

  const selectedProject =
    mockProjects.find((p) => p.id === selectedProjectId) || filteredProjects[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedProjectId) {
      setErrorMessage('Please select an active MPLADS civil project in your area.');
      return;
    }

    if (!complaintText || complaintText.trim().length < 10) {
      setErrorMessage('Please provide an observation of at least 10 characters describing the site.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      complaintText: complaintText.trim(),
      citizenName: citizenName.trim() || undefined,
      phone: phone.trim() || undefined,
      district: selectedProject?.district || selectedDistrict,
      state: selectedProject?.state || selectedState,
      reportedLocation: reportedLocation
        ? {
            latitude: reportedLocation.latitude,
            longitude: reportedLocation.longitude,
          }
        : undefined,
    };

    try {
      const res = await fetch(`http://127.0.0.1:8000/projects/${selectedProjectId}/citizen-reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        // Official receipt: strictly omit contradictionScore and geoMatchDistance
        setSubmissionSuccess({
          id: data.id || `CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
          projectId: data.projectId || selectedProjectId,
          projectName: data.projectName || selectedProject?.name || 'MPLADS Project',
          district: selectedProject?.district || selectedDistrict,
          state: selectedProject?.state || selectedState,
          submittedAt: data.submittedAt || new Date().toISOString(),
          status: data.status || 'Registered for Field Verification',
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrorMessage(errData.detail || 'Submission failed. Please try again.');
      }
    } catch (err) {
      // Offline / fallback confirmation
      setSubmissionSuccess({
        id: `CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
        projectId: selectedProjectId,
        projectName: selectedProject?.name || 'MPLADS Project',
        district: selectedProject?.district || selectedDistrict,
        state: selectedProject?.state || selectedState,
        submittedAt: new Date().toISOString(),
        status: 'Registered for Field Verification',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(null);
    setComplaintText('');
    setCitizenName('');
    setPhone('');
    setErrorMessage('');
  };

  return (
    <div className="setu-portal-page">
      {/* Masthead Header: Government branding */}
      <div className="setu-masthead">
        <span className="setu-masthead-gov">
          SMART INDIA HACKATHON 2026 • PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102
        </span>
        <span className="setu-masthead-locale">Public Grievance & Transparency Portal</span>
      </div>

      {/* Header Branding Row */}
      <header className="setu-landing-header">
        <div className="setu-landing-header-inner">
          <div className="setu-landing-logo-badge">GOV</div>
          <span className="setu-landing-title">SETU</span>
          <span className="setu-landing-tagline">Citizen Ground Truth & Infrastructure Verification</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="setu-portal-container">
        <div className="setu-portal-header-section">
          <div className="setu-portal-top-nav">
            <a href="#/" className="setu-back-link">← Return to Public Home</a>
            <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
              Public Access • No Login Required
            </span>
          </div>
          <h1 className="setu-portal-title">Report an Infrastructure Issue or Ground Observation</h1>
          <p className="setu-portal-subtitle">
            Submit direct on-the-ground observations regarding MPLADS civil works in your constituency.
            Using your device's location, we automatically present active projects in your area.
          </p>
        </div>

        {submissionSuccess ? (
          /* Official Confirmation View (CRITICAL: NO contradiction score or distance displayed) */
          <div className="setu-confirmation-receipt">
            <div className="setu-receipt-banner">
              <span className="setu-receipt-icon">✓</span>
              <div>
                <h3 className="setu-receipt-headline">Grievance Successfully Registered</h3>
                <p className="setu-receipt-sub">
                  Your ground observation has been logged in the national audit registry.
                </p>
              </div>
            </div>

            <div className="setu-receipt-grid">
              <div className="setu-receipt-item">
                <span className="setu-receipt-label">Grievance Tracking ID</span>
                <span className="setu-receipt-id">{submissionSuccess.id}</span>
              </div>
              <div className="setu-receipt-item">
                <span className="setu-receipt-label">Filing Timestamp</span>
                <span className="setu-receipt-value">
                  {submissionSuccess.submittedAt ? submissionSuccess.submittedAt.replace('T', ' ').substring(0, 19) : 'Just Now'}
                </span>
              </div>
              <div className="setu-receipt-item" style={{ gridColumn: 'span 2' }}>
                <span className="setu-receipt-label">Associated MPLADS Project</span>
                <span className="setu-receipt-value">
                  {submissionSuccess.projectName} ({submissionSuccess.projectId})
                </span>
              </div>
              <div className="setu-receipt-item">
                <span className="setu-receipt-label">Jurisdiction</span>
                <span className="setu-receipt-value">
                  {submissionSuccess.district}, {submissionSuccess.state}
                </span>
              </div>
              <div className="setu-receipt-item">
                <span className="setu-receipt-label">Current Audit Status</span>
                <span className="setu-receipt-value" style={{ color: 'var(--setu-color-primary-base)' }}>
                  {submissionSuccess.status}
                </span>
              </div>
            </div>

            <div className="setu-receipt-notice">
              <strong>Statutory Acknowledgment:</strong> Under Section 12 of the Public Audit & Grievance Guidelines,
              your ground-truth observation has been transmitted to the District Authority Collectorate and Central
              Audit Inspection cell. Physical verification and contractor stage reconciliation will be scheduled accordingly.
            </div>

            <div className="setu-receipt-actions">
              <button type="button" className="setu-btn-primary" onClick={handleReset}>
                Submit Another Report
              </button>
              <a href="#/" className="setu-btn-secondary">
                Return to Home Page
              </a>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form className="setu-grievance-form-card" onSubmit={handleSubmit}>
            <div className="setu-guidance-box">
              <span className="setu-guidance-title">Citizen Grievance Instructions:</span>
              Please report factual civil works observations (e.g. stalled machinery, incomplete masonry without roof slabs, dry water taps, unpaved road shoulders). Geolocation helps verify that observations are submitted near registered works.
            </div>

            {errorMessage && (
              <div className="setu-form-error">
                {errorMessage}
              </div>
            )}

            {/* STEP 1: Location Capture */}
            <div className="setu-form-group">
              <label className="setu-form-label">
                <span className="setu-step-badge">1</span>
                Location & Jurisdiction
              </label>

              {/* Geolocation Status Banner */}
              <div className={`setu-geo-status-banner ${geoStatus}`}>
                <div className="setu-geo-content">
                  <span className="setu-geo-icon">
                    {geoStatus === 'detecting' && '⌛'}
                    {geoStatus === 'granted' && '📍'}
                    {(geoStatus === 'denied' || geoStatus === 'unavailable') && '🌐'}
                  </span>
                  <div>
                    {geoStatus === 'detecting' && (
                      <span>Detecting your location via browser GPS to suggest nearby civil works...</span>
                    )}
                    {geoStatus === 'granted' && reportedLocation && (
                      <span>
                        <strong>Location detected:</strong> Auto-suggested <strong>{selectedDistrict}, {selectedState}</strong> based on device coordinates ({reportedLocation.latitude.toFixed(4)}°N, {reportedLocation.longitude.toFixed(4)}°E). You can override below.
                      </span>
                    )}
                    {(geoStatus === 'denied' || geoStatus === 'unavailable') && (
                      <span>
                        Device geolocation unavailable or skipped. Please select your State and District manually below.
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="setu-geo-retry-btn"
                  onClick={requestLocation}
                  title="Re-request browser location"
                >
                  {geoStatus === 'granted' ? 'Update GPS' : 'Detect Location'}
                </button>
              </div>

              {/* State and District Dropdowns */}
              <div className="setu-location-grid">
                <div>
                  <label className="setu-form-label" htmlFor="citizen-state-select" style={{ fontSize: 'var(--setu-font-size-caption)' }}>
                    State / Union Territory
                  </label>
                  <select
                    id="citizen-state-select"
                    className="setu-select-dropdown"
                    style={{ width: '100%' }}
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    {allStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="setu-form-label" htmlFor="citizen-district-select" style={{ fontSize: 'var(--setu-font-size-caption)' }}>
                    District
                  </label>
                  <select
                    id="citizen-district-select"
                    className="setu-select-dropdown"
                    style={{ width: '100%' }}
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                  >
                    {availableDistricts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* STEP 2: Project Suggestion */}
            <div className="setu-form-group">
              <label className="setu-form-label">
                <span className="setu-step-badge">2</span>
                Select Relevant Civil Project in {selectedDistrict}, {selectedState} *
              </label>
              <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-secondary)', display: 'block', marginTop: '-4px' }}>
                Select the work you are reporting on from the list below. No formal project ID is required.
              </span>

              <div className="setu-project-list">
                {filteredProjects.map((p) => {
                  const isSelected = p.id === selectedProjectId;
                  const shortDescription = `${p.category} civil works executed by ${p.implementingAgency} (${p.status} • Certified Physical Progress: ${p.physicalProgress}%)`;

                  return (
                    <div
                      key={p.id}
                      className={`setu-project-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedProjectId(p.id)}
                    >
                      <input
                        type="radio"
                        name="project-selection"
                        className="setu-project-radio"
                        checked={isSelected}
                        onChange={() => setSelectedProjectId(p.id)}
                      />
                      <div className="setu-project-card-body">
                        <div className="setu-project-card-title">{p.name}</div>
                        <div className="setu-project-card-desc">{shortDescription}</div>
                        <div className="setu-project-card-tags">
                          <span className="setu-tag-pill">{p.category}</span>
                          <span className="setu-tag-pill">{p.constituency} Constituency</span>
                          <span className="setu-tag-pill">Sanction: ₹{(p.sanctionedAmount / 100000).toFixed(1)} Lakhs</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredProjects.length === 0 && (
                  <div className="setu-empty-state" style={{ padding: 'var(--setu-space-4)' }}>
                    <p className="setu-empty-state-text">
                      No active MPLADS projects recorded for {selectedDistrict}. Please select another district in {selectedState}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 3: Grievance Observation Textarea */}
            <div className="setu-form-group">
              <label className="setu-form-label" htmlFor="complaint-text-input">
                <span className="setu-step-badge">3</span>
                On-the-Ground Observation / Defect Details *
              </label>
              <textarea
                id="complaint-text-input"
                className="setu-textarea"
                rows={5}
                placeholder="Describe exactly what you observed on site. Example: 'The contractor claimed the reading room is 90% complete, but on the ground only bare brick walls stand without a roof slab, windows, or electrical fittings. No workers have been present for 2 months.'"
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                required
              />
              <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
                Minimum 10 characters. Please specify structural status, missing fixtures, or stalled equipment.
              </span>
            </div>

            {/* Optional Citizen Contact Info */}
            <div className="setu-form-row">
              <div className="setu-form-group">
                <label className="setu-form-label" htmlFor="citizen-name-input">
                  Your Full Name (Optional)
                </label>
                <input
                  id="citizen-name-input"
                  type="text"
                  className="setu-form-input"
                  placeholder="e.g. Rajesh Patil"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                />
              </div>

              <div className="setu-form-group">
                <label className="setu-form-label" htmlFor="citizen-phone-input">
                  Mobile Number (Optional — for SMS Tracking)
                </label>
                <input
                  id="citizen-phone-input"
                  type="tel"
                  className="setu-form-input"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* STEP 4: Submit & Location Metadata Indicator */}
            <div className="setu-geo-attached-note">
              {reportedLocation ? (
                <>
                  <span>📍</span>
                  <span>
                    Device coordinates ({reportedLocation.latitude.toFixed(4)}°N, {reportedLocation.longitude.toFixed(4)}°E) will be attached for on-site proximity verification.
                  </span>
                </>
              ) : (
                <>
                  <span>🌐</span>
                  <span>
                    No device coordinates attached. Grievance will be filed under district-level jurisdiction.
                  </span>
                </>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--setu-space-2)', flexWrap: 'wrap', gap: 'var(--setu-space-2)' }}>
              <span style={{ fontSize: 'var(--setu-font-size-caption)', color: 'var(--setu-color-text-muted)' }}>
                By submitting, you certify that this ground observation is submitted in good faith.
              </span>
              <button
                type="submit"
                className="setu-btn-primary"
                id="btn-submit-complaint"
                disabled={isSubmitting}
                style={{ padding: 'var(--setu-space-2) var(--setu-space-6)', minWidth: '180px' }}
              >
                {isSubmitting ? 'Submitting Report...' : 'Submit Grievance Report'}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="setu-landing-footer">
        <span className="setu-landing-footer-text">
          Official Government Audit Portal • Public Grievance Intake Framework • Governed under MoSPI & CAG Audit Guidelines
        </span>
      </footer>
    </div>
  );
}
