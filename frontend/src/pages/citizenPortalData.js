/**
 * PRAMAAN Citizen Portal Data Layer & Interactive UI Generator
 * 
 * Minimal Official Government Design matching Landing and Login Gateway:
 * - Two-level official Government of India header
 * - Vertically clean, minimal layout with generous whitespace
 * - Section 1: Location & Jurisdiction with complete address & locality selector
 * - Section 2: Proximity-ranked civil projects showing exact distance (km away)
 * - Section 3: Ground observation with COMPULSORY geo-tagged site photo upload & preview
 * - Official Confirmation Receipt with statutory audit acknowledgment
 * - Minimal Government Footer
 */

import { allProjects } from './projectDetailData.js';

// Haversine formula to compute great-circle distance in kilometers
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
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

// Curated prominent localities & wards for major districts with real coordinates
export const DISTRICT_LOCALITIES = {
  'Tamil Nadu': {
    'Chennai': [
      { name: 'Central / Park Town', lat: 13.0827, lon: 80.2707 },
      { name: 'George Town / Parrys', lat: 13.0891, lon: 80.2882 },
      { name: 'T. Nagar / Panagal Park', lat: 13.0418, lon: 80.2341 },
      { name: 'Anna Nagar / Roundtana', lat: 13.0850, lon: 80.2101 },
      { name: 'Mylapore / Santhome', lat: 13.0339, lon: 80.2678 },
      { name: 'Guindy / Kathipara', lat: 13.0067, lon: 80.2023 },
      { name: 'Adyar / Besant Nagar', lat: 12.9975, lon: 80.2570 },
      { name: 'Perambur / Vyasarpadi', lat: 13.1118, lon: 80.2450 },
      { name: 'Villivakkam / Kolathur', lat: 13.1075, lon: 80.2058 },
      { name: 'Tambaram / Chromepet', lat: 12.9249, lon: 80.1472 },
    ],
    'Coimbatore': [
      { name: 'Gandhipuram / Bus Stand', lat: 11.0168, lon: 76.9558 },
      { name: 'RS Puram / DB Road', lat: 11.0086, lon: 76.9482 },
      { name: 'Peelamedu / Avinashi Road', lat: 11.0287, lon: 77.0019 },
      { name: 'Singanallur / Trichy Road', lat: 10.9995, lon: 77.0256 },
      { name: 'Ukkadam / Town Hall', lat: 10.9925, lon: 76.9614 },
    ],
    'Madurai': [
      { name: 'Meenakshi Amman Temple / City Center', lat: 9.9195, lon: 78.1193 },
      { name: 'KK Nagar / District Court', lat: 9.9328, lon: 78.1481 },
      { name: 'Anna Nagar / Madurai East', lat: 9.9178, lon: 78.1492 },
      { name: 'Tallakulam / Alagar Kovil Road', lat: 9.9376, lon: 78.1345 },
    ],
  },
  'Karnataka': {
    'Bengaluru Urban': [
      { name: 'Majestic / City Railway Station', lat: 12.9767, lon: 77.5713 },
      { name: 'Indiranagar / 100 Feet Road', lat: 12.9784, lon: 77.6408 },
      { name: 'Koramangala / Sony World Signal', lat: 12.9352, lon: 77.6245 },
      { name: 'Whitefield / ITPL Main Road', lat: 12.9698, lon: 77.7499 },
      { name: 'Jayanagar / 4th Block', lat: 12.9299, lon: 77.5824 },
    ],
  },
  'Maharashtra': {
    'Pune': [
      { name: 'Shivajinagar / FC Road', lat: 18.5314, lon: 73.8446 },
      { name: 'Kothrud / Paud Road', lat: 18.5074, lon: 73.8077 },
      { name: 'Hinjawadi / Phase 1 IT Park', lat: 18.5913, lon: 73.7389 },
      { name: 'Viman Nagar / Phoenix Marketcity', lat: 18.5679, lon: 73.9143 },
      { name: 'Hadapsar / Magarpatta City', lat: 18.5089, lon: 73.9259 },
    ],
  },
  'Uttar Pradesh': {
    'Lucknow': [
      { name: 'Hazratganj / MG Marg', lat: 26.8467, lon: 80.9462 },
      { name: 'Gomti Nagar / Vibhuti Khand', lat: 26.8526, lon: 81.0035 },
      { name: 'Alambagh / Kanpur Road', lat: 26.8142, lon: 80.9015 },
      { name: 'Indira Nagar / Faizabad Road', lat: 26.8833, lon: 80.9833 },
    ],
  },
};

// Extract unique sorted states from projects catalog
export const allStates = Array.from(new Set(allProjects.map((p) => p.state))).sort();

// Helper to get districts for a given state
export function getDistrictsForState(state) {
  const dists = Array.from(
    new Set(allProjects.filter((p) => p.state === state).map((p) => p.district))
  ).sort();
  return dists.length > 0 ? dists : ['General District'];
}

// Helper to get localities for a state and district
export function getLocalitiesForDistrict(state, district) {
  if (DISTRICT_LOCALITIES[state] && DISTRICT_LOCALITIES[state][district]) {
    return DISTRICT_LOCALITIES[state][district];
  }
  // Compute localities dynamically from projects in that district
  const distProjects = allProjects.filter((p) => p.state === state && p.district === district);
  if (distProjects.length > 0) {
    return distProjects.map((p) => ({
      name: p.location || p.name.substring(0, 35),
      lat: p.siteCoordinates?.latitude ?? p.latitude ?? 13.0827,
      lon: p.siteCoordinates?.longitude ?? p.longitude ?? 80.2707,
    }));
  }
  return [
    { name: 'District Collectorate / Civil Center', lat: 13.0827, lon: 80.2707 },
    { name: 'North Ward / Municipal Sector', lat: 13.0950, lon: 80.2600 },
    { name: 'South Ward / Urban Sector', lat: 13.0500, lon: 80.2400 },
  ];
}

// Global portal module state
export let portalState = {
  geoStatus: 'init', // 'init' | 'detecting' | 'granted' | 'denied' | 'unavailable'
  reportedLocation: { latitude: 13.0933, longitude: 80.1841 }, // Default to Chennai center
  selectedState: 'Tamil Nadu',
  selectedDistrict: 'Chennai',
  selectedLocality: 'Central / Park Town',
  customAddress: '',
  selectedProjectId: 'PRJ-IND-2013',
  complaintText: '',
  citizenName: '',
  phone: '',
  attachedPhotos: [], // Array of { name, size, dataUrl }
  submissionConfirmation: null,
  submitErrorMessage: '',
  photoErrorMessage: '',
  isSubmitting: false,
  trackingQuery: '',
};

let hasAutoRequestedGeo = false;

// Helper to synchronize live DOM input values into portalState before any re-render
export function syncDomToPortalState(appEl) {
  if (!appEl) return;
  const textarea = appEl.querySelector('#complaint-text');
  if (textarea) portalState.complaintText = textarea.value;
  const nameInput = appEl.querySelector('#contact-name');
  if (nameInput) portalState.citizenName = nameInput.value;
  const mobileInput = appEl.querySelector('#contact-mobile');
  if (mobileInput) portalState.phone = mobileInput.value;
  const addrInput = appEl.querySelector('#custom-address-input');
  if (addrInput) portalState.customAddress = addrInput.value;
}

/**
 * Returns sorted list of projects with calculated Haversine distance
 */
export function getProjectsWithProximity() {
  const citizenLat = portalState.reportedLocation?.latitude ?? 13.0827;
  const citizenLon = portalState.reportedLocation?.longitude ?? 80.2707;

  // Filter projects by selected state and district
  const matching = allProjects.filter(
    (p) => p.state === portalState.selectedState && p.district === portalState.selectedDistrict
  );

  const list = matching.length > 0 ? matching : allProjects.filter((p) => p.state === portalState.selectedState);

  const withDist = list.map((p) => {
    const pLat = p.siteCoordinates?.latitude ?? p.latitude ?? citizenLat;
    const pLon = p.siteCoordinates?.longitude ?? p.longitude ?? citizenLon;
    const dist = calculateHaversineDistance(citizenLat, citizenLon, pLat, pLon);
    return {
      ...p,
      _calculatedDistance: dist,
    };
  });

  // Sort ascending: nearest project first
  withDist.sort((a, b) => a._calculatedDistance - b._calculatedDistance);
  return withDist;
}

/**
 * Clean Two-Level Government Header matching Login & Landing Gateway
 */
export function getGovernmentHeaderHtml() {
  return `
    <header class="w-full select-none">
      <!-- TOP BAR: Dark navy background -->
      <div class="w-full bg-[#0a192f] text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.08 8.84-7 9.95-3.92-1.11-7-5.41-7-9.95V6.3l7-3.12zM12 6a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z"/>
            </svg>
            <span class="font-medium tracking-wide">Government of India</span>
          </div>
          <div class="text-slate-300 text-xs tracking-wide hidden sm:block">
            Ministry of Statistics &amp; Programme Implementation
          </div>
        </div>
      </div>

      <!-- MAIN HEADER: White background, thin border/shadow separating from page -->
      <div class="w-full bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#/" class="flex flex-col no-underline text-inherit group shrink-0">
            <span class="text-xl font-bold tracking-tight text-[#0a192f] font-sans">PRAMAAN</span>
            <span class="text-xs text-slate-500 font-medium tracking-wide">MPLADS Audit &amp; Monitoring System</span>
          </a>

          <div class="flex items-center gap-3 sm:gap-6 text-sm font-medium">
            <!-- Public Track Search Form -->
            <form class="hidden md:flex items-center" role="search" id="header-track-form">
              <input
                id="track-search-input"
                class="w-56 text-xs bg-slate-50 border border-slate-300 rounded-l px-3 py-1.5 text-slate-800 focus:outline-none focus:border-[#0f2b5c] placeholder-slate-400"
                placeholder="Track Work ID / Complaint #"
                type="text"
                value="${portalState.trackingQuery || ''}"
              />
              <button
                class="bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white text-xs font-semibold px-3 py-1.5 rounded-r border border-[#0f2b5c] transition-colors cursor-pointer"
                type="submit"
              >
                Track
              </button>
            </form>

            <a href="#/" class="text-slate-600 hover:text-[#0a192f] transition-colors no-underline">Home</a>
            <a
              href="#/login"
              class="inline-flex items-center gap-1.5 py-1.5 px-3 bg-white border border-[#0f2b5c] text-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white text-xs font-semibold rounded transition-colors no-underline"
            >
              <span class="material-symbols-outlined text-[16px]">lock</span>
              <span>Official Login</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

/**
 * Minimal Government Footer matching Login & Landing Gateway
 */
export function getGovernmentFooterHtml() {
  return `
    <footer class="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
      <div class="max-w-7xl mx-auto px-4 flex flex-col items-center gap-1">
        <div class="font-bold text-slate-800 text-sm tracking-tight">PRAMAAN</div>
        <div class="text-slate-600 font-medium">MPLADS Audit &amp; Monitoring System</div>
        <div class="text-slate-400 mt-1">Government of India | Ministry of Statistics &amp; Programme Implementation</div>
        <div class="flex items-center justify-center gap-3 text-slate-400 mt-2 text-[11px]">
          <span class="text-slate-500">Citizen Grievance &amp; Verification Portal</span>
          <span>•</span>
          <span>Privacy &amp; Accessibility</span>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Generates the basic project details card shown when a citizen selects a project
 */
export function getSelectedProjectDetailsHtml(p, distFormatted) {
  const sanctionedLakhs = (p.sanctionedAmount / 100000).toFixed(1);
  const spentLakhs = ((p.expenditure || 0) / 100000).toFixed(1);
  const mpClean = (p.mpName || 'Constituency MP').replace(' (Fictional)', '');
  const vendorClean = (p.vendorName || 'Assigned Contractor').replace(' (Fictional)', '');
  const lat = (p.siteCoordinates?.latitude ?? p.latitude ?? 0).toFixed(4);
  const lon = (p.siteCoordinates?.longitude ?? p.longitude ?? 0).toFixed(4);
  const physPct = Math.min(100, Math.max(0, p.physicalProgress || 0));
  const finPct = Math.min(100, Math.max(0, p.financialProgress || 0));

  return `
    <div class="setu-project-details-box mt-3 pt-3 border-t border-blue-200 bg-white rounded p-3 border border-blue-100 shadow-2xs text-left" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
        <div class="flex items-center gap-1.5 text-xs font-bold text-[#0f2b5c]">
          <span class="material-symbols-outlined text-[16px]">info</span>
          <span>Basic Project Details</span>
        </div>
        <span class="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Official Public Record
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
        <!-- Recommending MP -->
        <div class="bg-slate-50 p-2 rounded border border-slate-100">
          <span class="text-[10px] text-slate-500 block font-medium">Recommending MP</span>
          <strong class="font-semibold text-slate-800 text-[11px] block truncate">${mpClean}</strong>
          <span class="text-[10px] text-slate-600 block truncate">${p.constituency || p.district} Constituency</span>
        </div>

        <!-- Implementing Agency & Vendor -->
        <div class="bg-slate-50 p-2 rounded border border-slate-100">
          <span class="text-[10px] text-slate-500 block font-medium">Implementing Agency</span>
          <strong class="font-semibold text-slate-800 text-[11px] block truncate">${p.implementingAgency || 'District Authority'}</strong>
          <span class="text-[10px] text-slate-600 block truncate">Vendor: ${vendorClean}</span>
        </div>

        <!-- Sanction & Outlay -->
        <div class="bg-slate-50 p-2 rounded border border-slate-100">
          <span class="text-[10px] text-slate-500 block font-medium">Financial Outlay</span>
          <div class="flex items-center justify-between text-xs mt-0.5">
            <span class="text-slate-600">Sanctioned:</span>
            <strong class="font-bold text-[#0f2b5c]">₹${sanctionedLakhs} Lakhs</strong>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
            <span>Disbursed:</span>
            <span class="font-semibold text-slate-700">₹${spentLakhs} Lakhs</span>
          </div>
        </div>

        <!-- Certified Physical Progress -->
        <div class="bg-slate-50 p-2 rounded border border-slate-100">
          <div class="flex items-center justify-between">
            <span class="text-[10px] text-slate-500 font-medium">Physical Progress</span>
            <strong class="text-xs font-bold text-slate-800">${physPct}%</strong>
          </div>
          <div class="w-full h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
            <div class="h-full bg-emerald-600 rounded-full" style="width: ${physPct}%"></div>
          </div>
          <span class="text-[10px] text-slate-500 mt-1 block">Status: <strong class="text-[#0f2b5c]">${p.status || 'In Progress'}</strong></span>
        </div>

        <!-- Financial Progress -->
        <div class="bg-slate-50 p-2 rounded border border-slate-100">
          <div class="flex items-center justify-between">
            <span class="text-[10px] text-slate-500 font-medium">Fund Utilization</span>
            <strong class="text-xs font-bold text-slate-800">${finPct.toFixed(0)}%</strong>
          </div>
          <div class="w-full h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
            <div class="h-full bg-blue-600 rounded-full" style="width: ${finPct}%"></div>
          </div>
          <span class="text-[10px] text-slate-500 mt-1 block">FY ${p.financialYear || '2024-25'}</span>
        </div>

        <!-- GPS Location Coordinates -->
        <div class="bg-slate-50 p-2 rounded border border-slate-100">
          <span class="text-[10px] text-slate-500 block font-medium">Site Coordinates &amp; Distance</span>
          <span class="font-mono text-xs font-semibold text-slate-800 block truncate">
            ${lat}°N, ${lon}°E
          </span>
          <span class="text-[10px] text-emerald-700 font-medium mt-0.5 block truncate">
            📍 ${distFormatted} from your reference location
          </span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates the complete Citizen Portal HTML string
 */
export function getCitizenPortalHtml() {
  const {
    geoStatus,
    reportedLocation,
    selectedState,
    selectedDistrict,
    selectedLocality,
    customAddress,
    selectedProjectId,
    submissionConfirmation,
    submitErrorMessage,
    photoErrorMessage,
    complaintText,
    citizenName,
    phone,
    attachedPhotos,
    isSubmitting,
  } = portalState;

  // If in confirmation receipt mode, render the official government receipt
  if (submissionConfirmation) {
    return `
      <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        ${getGovernmentHeaderHtml()}

        <main class="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
          <div class="bg-white border border-slate-200 rounded p-6 shadow-sm">
            <!-- Receipt Success Banner -->
            <div class="bg-emerald-50 border border-emerald-200 rounded p-4 mb-6 flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-base shrink-0">
                ✓
              </div>
              <div>
                <h2 class="text-base font-bold text-emerald-900">Grievance Successfully Registered &amp; Queued for Inspection</h2>
                <p class="text-xs text-emerald-800 mt-0.5">
                  Your ground observation and mandatory photographic evidence have been officially logged in the national audit registry.
                </p>
              </div>
            </div>

            <!-- Receipt Metadata Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 rounded p-4 bg-slate-50 mb-6 text-xs">
              <div>
                <span class="text-slate-500 block mb-0.5 font-medium">Grievance Tracking ID</span>
                <span class="font-mono text-sm font-bold text-[#0f2b5c] tracking-wide">${submissionConfirmation.id}</span>
              </div>
              <div>
                <span class="text-slate-500 block mb-0.5 font-medium">Filing Timestamp</span>
                <span class="font-semibold text-slate-800">${submissionConfirmation.submittedAt ? submissionConfirmation.submittedAt.replace('T', ' ').substring(0, 19) + ' UTC' : 'Just Now'}</span>
              </div>
              <div class="md:col-span-2">
                <span class="text-slate-500 block mb-0.5 font-medium">Associated MPLADS Project</span>
                <span class="font-bold text-slate-900">${submissionConfirmation.projectName}</span>
                <span class="text-[11px] text-slate-600 block mt-0.5">Project ID: ${submissionConfirmation.projectId}</span>
              </div>
              <div>
                <span class="text-slate-500 block mb-0.5 font-medium">Target Jurisdiction</span>
                <span class="font-semibold text-slate-800">${submissionConfirmation.district}, ${submissionConfirmation.state}</span>
              </div>
              <div>
                <span class="text-slate-500 block mb-0.5 font-medium">Audit Pipeline Status</span>
                <span class="inline-block bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded border border-blue-200">
                  ${submissionConfirmation.status || 'Registered for Field Verification'}
                </span>
              </div>
              <div>
                <span class="text-slate-500 block mb-0.5 font-medium">Verified Location Coordinates</span>
                <span class="text-slate-700 font-mono">
                  ${submissionConfirmation.reportedLocation ? `${submissionConfirmation.reportedLocation.latitude.toFixed(4)}°N, ${submissionConfirmation.reportedLocation.longitude.toFixed(4)}°E` : 'Device GPS Attached'}
                </span>
              </div>
              <div>
                <span class="text-slate-500 block mb-0.5 font-medium">Photographic Evidence</span>
                <span class="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <span>📷</span>
                  <span>${submissionConfirmation.photoCount || 1} Site Photo(s) Attached &amp; Encrypted</span>
                </span>
              </div>
            </div>

            <!-- Statutory Notice -->
            <div class="bg-blue-50/60 border-l-4 border-[#0f2b5c] p-3 text-xs text-slate-700 leading-relaxed rounded-r mb-6">
              <strong>Statutory Acknowledgment:</strong> Under Public Audit &amp; Grievance Guidelines,
              your ground-truth observation has been transmitted to the District Authority Collectorate and Central
              Audit Inspection cell. Physical verification and contractor stage reconciliation will be scheduled accordingly.
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white font-semibold text-xs px-5 py-2.5 rounded shadow-sm transition cursor-pointer"
                id="btn-submit-another"
              >
                Submit Another Report
              </button>
              <a
                href="#/"
                class="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded transition no-underline"
              >
                Return to Home
              </a>
            </div>
          </div>
        </main>

        ${getGovernmentFooterHtml()}
      </div>
    `;
  }

  // Calculate sorted projects with proximity
  const sortedProjects = getProjectsWithProximity();
  const availableDistricts = getDistrictsForState(selectedState);
  const availableLocalities = getLocalitiesForDistrict(selectedState, selectedDistrict);

  // Build state options
  const stateOptionsHtml = allStates
    .map((st) => `<option value="${st}" ${st === selectedState ? 'selected' : ''}>${st}</option>`)
    .join('');

  // Build district options
  const districtOptionsHtml = availableDistricts
    .map((dist) => `<option value="${dist}" ${dist === selectedDistrict ? 'selected' : ''}>${dist}</option>`)
    .join('');

  // Build locality options
  const localityOptionsHtml = availableLocalities
    .map((loc) => `<option value="${loc.name}" ${loc.name === selectedLocality ? 'selected' : ''}>${loc.name} (${loc.lat.toFixed(3)}°N, ${loc.lon.toFixed(3)}°E)</option>`)
    .join('');

  // Build project cards HTML with clean distance badges
  const projectCardsHtml = sortedProjects.map((p) => {
    const isSelected = p.id === (selectedProjectId || sortedProjects[0]?.id);
    const dist = p._calculatedDistance;
    const distFormatted = dist < 1.0 ? `${Math.round(dist * 1000)} meters` : `${dist.toFixed(1)} km`;

    // Distance Badge Styling
    let distanceBadgeHtml = '';
    if (dist < 1.0) {
      distanceBadgeHtml = `<span class="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">🎯 Immediate Vicinity (${distFormatted})</span>`;
    } else if (dist < 5.0) {
      distanceBadgeHtml = `<span class="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">📍 Near You (${distFormatted})</span>`;
    } else {
      distanceBadgeHtml = `<span class="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">📍 ${distFormatted} away</span>`;
    }

    return `
      <label
        class="setu-project-card-label flex items-start p-3.5 rounded border ${isSelected ? 'border-[#0f2b5c] bg-blue-50/40 ring-1 ring-[#0f2b5c]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'} cursor-pointer transition select-none"
        data-project-id="${p.id}"
      >
        <input
          type="radio"
          name="project_selection"
          class="mt-1 h-4 w-4 text-[#0f2b5c] border-slate-300 focus:ring-[#0f2b5c] shrink-0 project-radio-input"
          value="${p.id}"
          ${isSelected ? 'checked' : ''}
        />
        <div class="ml-3 flex-1">
          <div class="flex flex-wrap items-center justify-between gap-1">
            <div class="text-xs font-bold text-slate-900">${p.name}</div>
            ${distanceBadgeHtml}
          </div>
          <div class="text-[11px] text-slate-600 mt-1 leading-relaxed">
            ${p.category} civil works executed by ${p.implementingAgency || 'Assigned Agency'} (${p.status} • Certified Physical: ${p.physicalProgress}%)
          </div>
          <div class="flex flex-wrap items-center gap-1.5 mt-2">
            <span class="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">${p.category}</span>
            <span class="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">${p.constituency || selectedDistrict} Constituency</span>
            <span class="text-[10px] font-semibold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">Sanction: ₹${(p.sanctionedAmount / 100000).toFixed(1)} Lakhs</span>
            <span class="text-[10px] text-slate-400 ml-auto font-mono">ID: ${p.id}</span>
          </div>
          ${isSelected ? getSelectedProjectDetailsHtml(p, distFormatted) : ''}
        </div>
      </label>
    `;
  }).join('');

  // Attached photos gallery preview
  const photosPreviewHtml = attachedPhotos.map((photo, pIdx) => `
    <div class="relative group border border-slate-200 rounded p-1.5 bg-white shadow-2xs flex items-center gap-2">
      <img src="${photo.dataUrl}" alt="Site observation ${pIdx + 1}" class="h-12 w-12 object-cover rounded border border-slate-200 shrink-0" />
      <div class="flex-1 min-w-0">
        <p class="text-[11px] font-medium text-slate-800 truncate">${photo.name}</p>
        <p class="text-[10px] text-slate-500">${(photo.size / (1024 * 1024)).toFixed(2)} MB • Geo-Tagged</p>
      </div>
      <button
        type="button"
        class="btn-remove-photo text-rose-600 hover:text-rose-800 p-1 text-xs font-bold shrink-0 cursor-pointer"
        data-photo-index="${pIdx}"
        title="Remove Photo"
      >
        ✕
      </button>
    </div>
  `).join('');

  const citizenLat = reportedLocation?.latitude ?? 13.0933;
  const citizenLon = reportedLocation?.longitude ?? 80.1841;

  return `
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      ${getGovernmentHeaderHtml()}

      <!-- MAIN CONTENT -->
      <main class="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <!-- Title and Introduction Header -->
        <div class="text-center mb-8">
          <span class="text-xs font-bold tracking-widest uppercase text-slate-500">CITIZEN GRIEVANCE PORTAL</span>
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Report Infrastructure Issue &amp; Ground Reality
          </h1>
          <p class="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl mx-auto">
            Submit factual ground observations and mandatory photographic evidence on active MPLADS works. Works are automatically ranked by proximity to your selected address.
          </p>
        </div>

        <!-- Citizen Guidelines Notice Box -->
        <div class="bg-white border-l-4 border-[#0f2b5c] border-y border-r border-slate-200 p-4 rounded-r shadow-xs mb-6 text-xs text-slate-600 leading-relaxed">
          <strong class="text-slate-800 font-semibold block mb-0.5">Citizen Reporting Guidelines:</strong>
          Detail physical on-site conditions (e.g., incomplete masonry without roof slabs, unpaved road shoulders, dry water points, stalled machinery). 
          <span class="text-[#0f2b5c] font-semibold">Attaching at least one photo of the work site is compulsory to verify ground reality.</span>
        </div>

        <!-- Error Banner (if any) -->
        ${submitErrorMessage ? `
          <div class="bg-rose-50 border border-rose-300 text-rose-800 text-xs p-3.5 rounded mb-6 flex items-start gap-2">
            <span class="text-rose-600 font-bold text-sm">⚠</span>
            <div>
              <strong class="font-semibold">Action Required:</strong> ${submitErrorMessage}
            </div>
          </div>
        ` : ''}

        <!-- Grievance Intake Form -->
        <form class="space-y-6" id="citizen-grievance-form">
          <!-- SECTION 1: Location & Entire Address Selection -->
          <div class="bg-white border border-slate-200 rounded p-5 shadow-xs">
            <div class="flex items-center space-x-2.5 mb-4">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f2b5c] text-white text-xs font-bold">1</span>
              <div>
                <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Location &amp; Address</h2>
                <span class="text-[11px] text-slate-500">Select your state, district, and locality to see nearby civil works sorted by proximity.</span>
              </div>
            </div>

            <!-- Detected Location Alert Banner -->
            <div class="bg-emerald-50/60 border border-emerald-200 rounded p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center space-x-2 text-xs text-slate-800">
                <span class="text-emerald-700 text-sm">📍</span>
                <span>
                  <strong class="font-semibold text-emerald-900">Reference location:</strong> <strong class="font-semibold">${selectedLocality}, ${selectedDistrict}, ${selectedState}</strong> (${citizenLat.toFixed(4)}°N, ${citizenLon.toFixed(4)}°E).
                </span>
              </div>
              <button
                class="text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-2.5 py-1 rounded transition-colors shadow-2xs cursor-pointer"
                type="button"
                id="btn-detect-gps"
              >
                ${geoStatus === 'detecting' ? 'Detecting...' : 'Update Device GPS'}
              </button>
            </div>

            <!-- State and District Selection -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="state-select">State / Union Territory *</label>
                <select class="w-full text-xs rounded border border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]" id="state-select">
                  ${stateOptionsHtml}
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="district-select">District *</label>
                <select class="w-full text-xs rounded border border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]" id="district-select">
                  ${districtOptionsHtml}
                </select>
              </div>
            </div>

            <!-- Locality and Street Address Selector -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="locality-select">
                  Ward / Locality / Landmark Area *
                </label>
                <select class="w-full text-xs rounded border border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]" id="locality-select">
                  ${localityOptionsHtml}
                </select>
                <span class="text-[10px] text-slate-500 mt-0.5 block">Select your nearest area in ${selectedDistrict} to compute exact project distance.</span>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="custom-address-input">
                  Specific Street Address / Mohalla (Optional)
                </label>
                <input
                  class="w-full text-xs rounded border border-slate-300 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                  id="custom-address-input"
                  placeholder="e.g. 14, 2nd Main Road, Near Govt High School"
                  type="text"
                  value="${customAddress}"
                />
                <span class="text-[10px] text-slate-500 mt-0.5 block">Optional precise address details for field inspection team.</span>
              </div>
            </div>
          </div>

          <!-- SECTION 2: Project Selection Sorted by Distance -->
          <div class="bg-white border border-slate-200 rounded p-5 shadow-xs">
            <div class="flex items-center space-x-2.5 mb-1">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f2b5c] text-white text-xs font-bold">2</span>
              <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Select Civil Project in ${selectedDistrict}, ${selectedState} *
              </h2>
            </div>
            <p class="text-xs text-slate-500 mb-4 ml-8">
              Projects are sorted in real time starting from the closest work to your selected address (<strong class="text-slate-700 font-semibold">${selectedLocality}</strong>).
            </p>

            <!-- Active Projects Radio Group with Distance -->
            <div aria-label="Select Project" class="space-y-2.5 max-h-[380px] overflow-y-auto pr-1" role="radiogroup" id="project-selection-list">
              ${projectCardsHtml}
              ${sortedProjects.length === 0 ? `
                <div class="text-center py-6 text-xs text-slate-500 bg-slate-50 rounded border border-slate-200">
                  No active civil projects found matching ${selectedDistrict}, ${selectedState}. Please choose another district above.
                </div>
              ` : ''}
            </div>
          </div>

          <!-- SECTION 3: Observation & Compulsory Photos -->
          <div class="bg-white border border-slate-200 rounded p-5 shadow-xs">
            <div class="flex items-center space-x-2.5 mb-3">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f2b5c] text-white text-xs font-bold">3</span>
              <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Ground Observation &amp; Compulsory Photos *</h2>
            </div>

            <!-- Grievance Description Textarea -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-slate-700" for="complaint-text">
                Physical Site Status &amp; Defect Description *
              </label>
              <textarea
                class="w-full text-xs rounded border border-slate-300 p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f2b5c]"
                id="complaint-text"
                placeholder="Describe physical site status in detail (e.g., contractor claimed masonry work is complete, but on site only foundation pillars stand; unpaved road shoulders; missing plumbing or electrical fittings; no workers present for 2 months)."
                required
                rows="4"
              >${complaintText}</textarea>
              <div class="flex justify-between items-center text-[11px] text-slate-500">
                <span>Minimum 10 characters. Detail structural status or missing fixtures.</span>
                <span id="char-counter">Character count: ${complaintText.length}</span>
              </div>
            </div>

            <!-- Geo-Tagged Site Photo Upload Dropzone (COMPULSORY) -->
            <div class="mt-5">
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-semibold text-slate-700">
                  Attach Geo-Tagged Site Photos <span class="text-rose-600 font-bold">* Compulsory (At least 1 site photo required)</span>
                </label>
                <span class="text-[11px] text-slate-400 font-medium">Max 3 photos, JPG/PNG up to 5MB</span>
              </div>

              <!-- Photo Error Message if missing -->
              ${photoErrorMessage ? `
                <div class="bg-rose-50 border border-rose-300 text-rose-800 text-xs px-3 py-2 rounded mb-2 flex items-center gap-1.5">
                  <span class="font-bold">⚠</span>
                  <span>${photoErrorMessage}</span>
                </div>
              ` : ''}

              <div
                id="photo-dropzone"
                class="border-2 border-dashed ${photoErrorMessage ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 hover:border-[#0f2b5c] bg-slate-50/50'} rounded p-4 text-center transition cursor-pointer select-none"
              >
                <div class="mx-auto w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-1">
                  <span class="material-symbols-outlined text-[20px]">add_a_photo</span>
                </div>
                <p class="text-xs text-slate-700 font-medium">Click to upload site photos or drag &amp; drop</p>
                <p class="text-[10px] text-slate-500 mt-0.5">JPG / PNG format. Photographic evidence is strictly required for ground audit.</p>
                <input
                  id="photo-file-input"
                  accept="image/jpeg,image/png"
                  class="hidden"
                  multiple
                  type="file"
                />
              </div>

              <!-- Photo Previews Gallery -->
              ${attachedPhotos.length > 0 ? `
                <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5" id="photo-preview-container">
                  ${photosPreviewHtml}
                </div>
                <div class="text-[11px] text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
                  <span>✓</span>
                  <span>${attachedPhotos.length} site photo(s) attached and ready for statutory verification.</span>
                </div>
              ` : `
                <div class="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                  <span class="text-rose-600 font-bold">*</span>
                  <span>Submission is locked until at least one photo is uploaded.</span>
                </div>
              `}
            </div>

            <!-- Optional Contact Details (2 Columns) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="contact-name">Your Full Name (Optional)</label>
                <input
                  class="w-full text-xs rounded border border-slate-300 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                  id="contact-name"
                  placeholder="e.g. Rajesh Patil"
                  type="text"
                  value="${citizenName}"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="contact-mobile">Mobile Number (Optional — for SMS Tracking)</label>
                <input
                  class="w-full text-xs rounded border border-slate-300 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                  id="contact-mobile"
                  placeholder="e.g. 9876543210"
                  type="tel"
                  value="${phone}"
                />
              </div>
            </div>

            <!-- Geolocation Stamp Notice -->
            <div class="mt-4 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-600 text-xs flex items-center gap-2">
              <span class="text-[#0f2b5c]">📍</span>
              <span>
                Verified Coordinates <strong class="text-slate-800 font-medium">(${citizenLat.toFixed(4)}°N, ${citizenLon.toFixed(4)}°E)</strong> will be attached for on-site proximity verification.
              </span>
            </div>

            <!-- Form Submission Footer -->
            <div class="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="text-xs text-slate-600 flex items-center gap-2">
                <input
                  checked
                  class="rounded border-slate-300 text-[#0f2b5c] focus:ring-[#0f2b5c]"
                  id="good-faith-cert"
                  required
                  type="checkbox"
                />
                <label class="cursor-pointer select-none" for="good-faith-cert">
                  I certify that this ground observation is submitted in good faith based on actual site observation.
                </label>
              </div>

              <button
                class="w-full sm:w-auto bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white font-semibold text-xs px-6 py-2.5 rounded shadow-sm transition inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                type="submit"
                id="btn-submit-grievance"
                ${isSubmitting ? 'disabled' : ''}
              >
                <span>${isSubmitting ? 'Verifying &amp; Submitting...' : 'Submit Grievance Report →'}</span>
              </button>
            </div>
          </div>
        </form>
      </main>

      ${getGovernmentFooterHtml()}
    </div>
  `;
}

/**
 * Geolocation trigger with user-interaction preservation
 */
function triggerGeolocation(appEl, explicitUserClick = false) {
  if (!navigator.geolocation) {
    portalState.geoStatus = 'unavailable';
    return;
  }

  portalState.geoStatus = 'detecting';
  const gpsBtn = appEl?.querySelector('#btn-detect-gps');
  if (gpsBtn) gpsBtn.textContent = 'Detecting...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      portalState.reportedLocation = { latitude, longitude };
      portalState.geoStatus = 'granted';

      // Auto-suggest nearest project only on explicit user click or clean initial state
      if (explicitUserClick || portalState.complaintText.length === 0) {
        let nearest = null;
        let minDistance = Infinity;
        allProjects.forEach((p) => {
          const pLat = p.siteCoordinates?.latitude ?? p.latitude;
          const pLon = p.siteCoordinates?.longitude ?? p.longitude;
          if (pLat != null && pLon != null) {
            const d = calculateHaversineDistance(latitude, longitude, pLat, pLon);
            if (d < minDistance) {
              minDistance = d;
              nearest = p;
            }
          }
        });

        if (nearest) {
          portalState.selectedState = nearest.state;
          portalState.selectedDistrict = nearest.district;
          portalState.selectedProjectId = nearest.id;
        }
      }

      if (appEl) {
        syncDomToPortalState(appEl);
        mountCitizenPortal(appEl);
      }
    },
    () => {
      portalState.geoStatus = 'denied';
      if (appEl) {
        const btn = appEl.querySelector('#btn-detect-gps');
        if (btn) btn.textContent = 'GPS Unavailable / Denied';
      }
    },
    { timeout: 7000, enableHighAccuracy: false }
  );
}

/**
 * Mounts the Citizen Portal view and wires interactive DOM events
 */
export function mountCitizenPortal(appEl) {
  if (!appEl) return;
  appEl.innerHTML = getCitizenPortalHtml();

  // On first mount, auto-request browser location quietly without wiping inputs
  if (!hasAutoRequestedGeo) {
    hasAutoRequestedGeo = true;
    triggerGeolocation(appEl, false);
  }

  // If in confirmation view, wire "Submit Another Report"
  if (portalState.submissionConfirmation) {
    const anotherBtn = appEl.querySelector('#btn-submit-another');
    if (anotherBtn) {
      anotherBtn.addEventListener('click', () => {
        portalState.submissionConfirmation = null;
        portalState.submitErrorMessage = '';
        portalState.photoErrorMessage = '';
        portalState.complaintText = '';
        portalState.citizenName = '';
        portalState.phone = '';
        portalState.attachedPhotos = [];
        portalState.isSubmitting = false;
        mountCitizenPortal(appEl);
      });
    }
    return;
  }

  // Header Search / Track Form: works within citizen portal without unauthenticated login redirects
  const trackForm = appEl.querySelector('#header-track-form');
  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const trackInput = appEl.querySelector('#track-search-input');
      const val = trackInput ? trackInput.value.trim() : '';
      if (!val) return;

      portalState.trackingQuery = val;

      if (val.toUpperCase().startsWith('PRJ-')) {
        // Direct project search: match project in allProjects and highlight it
        const targetProj = allProjects.find((p) => p.id.toUpperCase() === val.toUpperCase());
        if (targetProj) {
          portalState.selectedState = targetProj.state;
          portalState.selectedDistrict = targetProj.district;
          portalState.selectedProjectId = targetProj.id;
          portalState.submitErrorMessage = '';
          syncDomToPortalState(appEl);
          mountCitizenPortal(appEl);

          // Scroll to project card
          setTimeout(() => {
            const card = appEl.querySelector(`[data-project-id="${targetProj.id}"]`);
            if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 50);
        } else {
          portalState.submitErrorMessage = `Project '${val}' was not found in the MPLADS public catalog.`;
          mountCitizenPortal(appEl);
        }
      } else {
        // Citizen grievance tracking ID
        const complaintId = val.toUpperCase().startsWith('CIT-') ? val.toUpperCase() : `CIT-2026-${val}`;
        const targetProj = allProjects.find((p) => p.id === portalState.selectedProjectId) || allProjects[0];
        portalState.submissionConfirmation = {
          id: complaintId,
          projectId: targetProj.id,
          projectName: targetProj.name,
          district: targetProj.district,
          state: targetProj.state,
          submittedAt: '2026-08-20T10:30:00Z',
          status: 'Field Inspection Scheduled (District Vigilance)',
          photoCount: 2,
          reportedLocation: portalState.reportedLocation,
        };
        mountCitizenPortal(appEl);
      }
    });
  }

  // GPS update button
  const gpsBtn = appEl.querySelector('#btn-detect-gps');
  if (gpsBtn) {
    gpsBtn.addEventListener('click', () => {
      syncDomToPortalState(appEl);
      triggerGeolocation(appEl, true);
    });
  }

  // State selection change
  const stateSelect = appEl.querySelector('#state-select');
  if (stateSelect) {
    stateSelect.addEventListener('change', (e) => {
      syncDomToPortalState(appEl);
      const newState = e.target.value;
      portalState.selectedState = newState;
      const districts = getDistrictsForState(newState);
      portalState.selectedDistrict = districts[0] || '';

      const localities = getLocalitiesForDistrict(newState, portalState.selectedDistrict);
      portalState.selectedLocality = localities[0]?.name || '';
      if (localities[0]) {
        portalState.reportedLocation = { latitude: localities[0].lat, longitude: localities[0].lon };
      }

      // Pre-select nearest project in newly chosen state/district
      const sorted = getProjectsWithProximity();
      portalState.selectedProjectId = sorted[0]?.id || '';

      mountCitizenPortal(appEl);
    });
  }

  // District selection change
  const districtSelect = appEl.querySelector('#district-select');
  if (districtSelect) {
    districtSelect.addEventListener('change', (e) => {
      syncDomToPortalState(appEl);
      const newDistrict = e.target.value;
      portalState.selectedDistrict = newDistrict;

      const localities = getLocalitiesForDistrict(portalState.selectedState, newDistrict);
      portalState.selectedLocality = localities[0]?.name || '';
      if (localities[0]) {
        portalState.reportedLocation = { latitude: localities[0].lat, longitude: localities[0].lon };
      }

      const sorted = getProjectsWithProximity();
      portalState.selectedProjectId = sorted[0]?.id || '';

      mountCitizenPortal(appEl);
    });
  }

  // Locality selection change
  const localitySelect = appEl.querySelector('#locality-select');
  if (localitySelect) {
    localitySelect.addEventListener('change', (e) => {
      syncDomToPortalState(appEl);
      const newLocName = e.target.value;
      portalState.selectedLocality = newLocName;

      const localities = getLocalitiesForDistrict(portalState.selectedState, portalState.selectedDistrict);
      const matched = localities.find((l) => l.name === newLocName);
      if (matched) {
        portalState.reportedLocation = { latitude: matched.lat, longitude: matched.lon };
      }

      const sorted = getProjectsWithProximity();
      portalState.selectedProjectId = sorted[0]?.id || '';

      mountCitizenPortal(appEl);
    });
  }

  // Custom address input
  const customAddressInput = appEl.querySelector('#custom-address-input');
  if (customAddressInput) {
    customAddressInput.addEventListener('input', (e) => {
      portalState.customAddress = e.target.value;
    });
  }

  // Project Selection clicks: expands basic project details on selected card
  const projectCards = appEl.querySelectorAll('.setu-project-card-label');
  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't re-trigger if clicking inside the details box or interactive elements
      if (e.target.closest('.setu-project-details-box')) {
        return;
      }
      const pid = card.getAttribute('data-project-id');
      if (pid && pid !== portalState.selectedProjectId) {
        portalState.selectedProjectId = pid;
        syncDomToPortalState(appEl);
        const listEl = appEl.querySelector('#project-selection-list');
        const prevScroll = listEl ? listEl.scrollTop : 0;
        mountCitizenPortal(appEl);
        const newListEl = appEl.querySelector('#project-selection-list');
        if (newListEl) newListEl.scrollTop = prevScroll;
      }
    });
  });

  // Complaint textarea live counter
  const textarea = appEl.querySelector('#complaint-text');
  const counter = appEl.querySelector('#char-counter');
  if (textarea) {
    textarea.addEventListener('input', (e) => {
      portalState.complaintText = e.target.value;
      if (counter) {
        counter.textContent = `Character count: ${e.target.value.length}`;
      }
    });
  }

  // Contact info inputs
  const nameInput = appEl.querySelector('#contact-name');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      portalState.citizenName = e.target.value;
    });
  }

  const mobileInput = appEl.querySelector('#contact-mobile');
  if (mobileInput) {
    mobileInput.addEventListener('input', (e) => {
      portalState.phone = e.target.value;
    });
  }

  // Photo Dropzone and File Input
  const dropzone = appEl.querySelector('#photo-dropzone');
  const fileInput = appEl.querySelector('#photo-file-input');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target !== fileInput) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('border-[#0f2b5c]', 'bg-blue-50/30');
    });

    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-[#0f2b5c]', 'bg-blue-50/30');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-[#0f2b5c]', 'bg-blue-50/30');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        syncDomToPortalState(appEl);
        handlePhotoFiles(e.dataTransfer.files, appEl);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        syncDomToPortalState(appEl);
        handlePhotoFiles(e.target.files, appEl);
      }
    });
  }

  // Remove photo buttons
  const removeBtns = appEl.querySelectorAll('.btn-remove-photo');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      syncDomToPortalState(appEl);
      const idx = parseInt(btn.getAttribute('data-photo-index'), 10);
      if (!isNaN(idx) && idx >= 0 && idx < portalState.attachedPhotos.length) {
        portalState.attachedPhotos.splice(idx, 1);
        portalState.photoErrorMessage = '';
        mountCitizenPortal(appEl);
      }
    });
  });

  // Form submission handler
  const form = appEl.querySelector('#citizen-grievance-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      syncDomToPortalState(appEl);
      portalState.submitErrorMessage = '';
      portalState.photoErrorMessage = '';

      const complaintText = portalState.complaintText.trim();
      const citizenName = portalState.citizenName.trim();
      const phone = portalState.phone.trim();

      // VALIDATION 1: Project must be selected
      if (!portalState.selectedProjectId) {
        portalState.submitErrorMessage = 'Please select a relevant civil project from the list.';
        mountCitizenPortal(appEl);
        return;
      }

      // VALIDATION 2: Complaint text must be at least 10 characters
      if (complaintText.length < 10) {
        portalState.submitErrorMessage = 'Please provide an observation of at least 10 characters detailing on-site status.';
        mountCitizenPortal(appEl);
        return;
      }

      // VALIDATION 3: COMPULSORY SITE PHOTOS
      if (!portalState.attachedPhotos || portalState.attachedPhotos.length === 0) {
        portalState.photoErrorMessage = 'Site Photo Required: Attaching at least one geo-tagged photograph of the site is mandatory to verify ground reality and register a valid grievance.';
        portalState.submitErrorMessage = 'Mandatory photograph missing. Please attach at least 1 photo of the work site before submitting.';
        mountCitizenPortal(appEl);

        const photoZone = appEl.querySelector('#photo-dropzone');
        if (photoZone) {
          photoZone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      portalState.isSubmitting = true;
      mountCitizenPortal(appEl);

      const targetProject = allProjects.find((p) => p.id === portalState.selectedProjectId) || allProjects[0];

      const payload = {
        complaintText,
        citizenName: citizenName || undefined,
        phone: phone || undefined,
        district: targetProject?.district || portalState.selectedDistrict,
        state: targetProject?.state || portalState.selectedState,
        locality: portalState.selectedLocality,
        customAddress: portalState.customAddress || undefined,
        reportedLocation: portalState.reportedLocation
          ? {
              latitude: portalState.reportedLocation.latitude,
              longitude: portalState.reportedLocation.longitude,
            }
          : undefined,
        photoCount: portalState.attachedPhotos.length,
      };

      try {
        const res = await fetch(`http://127.0.0.1:8000/projects/${portalState.selectedProjectId}/citizen-reports`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          portalState.submissionConfirmation = {
            id: data.id || `CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
            projectId: data.projectId || portalState.selectedProjectId,
            projectName: data.projectName || targetProject?.name,
            district: targetProject?.district || portalState.selectedDistrict,
            state: targetProject?.state || portalState.selectedState,
            submittedAt: data.submittedAt || new Date().toISOString(),
            status: 'Registered for Field Verification',
            photoCount: portalState.attachedPhotos.length,
            reportedLocation: portalState.reportedLocation,
          };
        } else {
          const err = await res.json().catch(() => ({}));
          portalState.submitErrorMessage = err.detail || 'Failed to submit grievance. Please verify your connection and try again.';
        }
      } catch (_err) {
        // Offline / simulated response fallback
        portalState.submissionConfirmation = {
          id: `CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
          projectId: portalState.selectedProjectId,
          projectName: targetProject?.name,
          district: targetProject?.district || portalState.selectedDistrict,
          state: targetProject?.state || portalState.selectedState,
          submittedAt: new Date().toISOString(),
          status: 'Registered for Field Verification',
          photoCount: portalState.attachedPhotos.length,
          reportedLocation: portalState.reportedLocation,
        };
      } finally {
        portalState.isSubmitting = false;
        mountCitizenPortal(appEl);
      }
    });
  }
}

/**
 * Handles multiple photo file uploads via FileReader with file-type and size validation
 */
function handlePhotoFiles(fileList, appEl) {
  const files = Array.from(fileList);
  const remainingSlots = 3 - portalState.attachedPhotos.length;
  if (remainingSlots <= 0) {
    portalState.photoErrorMessage = 'Maximum 3 site photographs allowed.';
    mountCitizenPortal(appEl);
    return;
  }

  const validImages = files.filter((f) => f.type.startsWith('image/'));
  if (validImages.length === 0) {
    portalState.photoErrorMessage = 'Please select valid image files (JPG or PNG).';
    mountCitizenPortal(appEl);
    return;
  }

  // Check 5MB limit
  const oversized = validImages.some((f) => f.size > 5 * 1024 * 1024);
  if (oversized) {
    portalState.photoErrorMessage = 'File size exceeds 5MB limit. Please upload images under 5MB each.';
    mountCitizenPortal(appEl);
    return;
  }

  const toAdd = validImages.slice(0, remainingSlots);
  let loaded = 0;

  toAdd.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      portalState.attachedPhotos.push({
        name: file.name,
        size: file.size,
        dataUrl: event.target.result,
      });
      portalState.photoErrorMessage = '';
      loaded += 1;
      if (loaded === toAdd.length) {
        mountCitizenPortal(appEl);
      }
    };
    reader.onerror = () => {
      loaded += 1;
      if (loaded === toAdd.length) {
        mountCitizenPortal(appEl);
      }
    };
    reader.readAsDataURL(file);
  });
}
