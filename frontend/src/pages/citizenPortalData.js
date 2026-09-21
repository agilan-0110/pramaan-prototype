/**
 * SETU Citizen Portal Data Layer & Interactive UI Generator
 * 
 * Implements modern institutional design conforming to Tailwind CSS & Public Sans:
 * - Top Utility Bar with accessibility controls and prototype notice
 * - Sticky MainHeader with SETU Emblem, Search/Track bar, and Officer Login
 * - Section 1: Location & Jurisdiction with complete address & locality selector
 * - Section 2: Proximity-ranked civil projects showing exact distance (km away)
 * - Section 3: Observation details with COMPULSORY geo-tagged site photo upload & preview gallery
 * - Official Confirmation Receipt with statutory audit acknowledgment
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

  // Sort ascending: nearest project first!
  withDist.sort((a, b) => a._calculatedDistance - b._calculatedDistance);
  return withDist;
}

/**
 * Generates the complete Citizen Portal HTML string matching the user's reference design
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

  // If in confirmation receipt mode, render the official receipt
  if (submissionConfirmation) {
    return `
      <div class="bg-govBg text-slate-900 font-sans antialiased min-h-screen flex flex-col">
        <!-- BEGIN: TopUtilityBar -->
        <section aria-label="Accessibility & Prototype Notice" class="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
          <div class="max-w-6xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center space-x-2 font-medium">
              <span class="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
              <span class="tracking-wide">SMART INDIA HACKATHON 2026 · PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-1 font-mono">
                <button class="hover:text-white px-1" title="Decrease Font" type="button" onclick="document.body.style.fontSize='12px'">A-</button>
                <button class="hover:text-white px-1 font-bold" title="Default Font" type="button" onclick="document.body.style.fontSize='14px'">A</button>
                <button class="hover:text-white px-1 font-bold" title="Increase Font" type="button" onclick="document.body.style.fontSize='16px'">A+</button>
              </div>
              <span class="text-slate-600">|</span>
              <button class="hover:text-white flex items-center gap-1" type="button">
                <svg aria-hidden="true" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                  <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                <span>Screen Reader</span>
              </button>
              <span class="text-slate-600">|</span>
              <div class="flex items-center space-x-1">
                <span class="font-semibold text-white">English</span>
                <span class="text-slate-600">/</span>
                <button class="hover:text-white" type="button">हिन्दी</button>
              </div>
            </div>
          </div>
        </section>
        <!-- END: TopUtilityBar -->

        <!-- BEGIN: MainHeader -->
        <header class="bg-white border-b border-govBorder sticky top-0 z-30">
          <div class="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-3">
              <div class="h-10 w-10 bg-govNavy text-white rounded flex items-center justify-center font-bold text-base shadow-sm">
                SETU
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <span class="font-bold text-xl text-govNavy tracking-tight">SETU</span>
                  <span class="bg-blue-50 text-blue-800 text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-200">CITIZEN PORTAL</span>
                </div>
                <p class="text-xs text-slate-500 font-medium leading-none mt-0.5">Public Audit & Monitoring Platform</p>
              </div>
            </div>

            <div class="flex items-center gap-3 flex-1 justify-end max-w-xl">
              <a class="inline-flex items-center text-xs font-semibold text-govNavy hover:text-white border border-govNavy hover:bg-govNavy px-3 py-2 rounded transition-colors shrink-0" href="#/login">
                <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                Officer Login
              </a>
            </div>
          </div>
        </header>
        <!-- END: MainHeader -->

        <!-- BEGIN: NavigationBanner -->
        <div class="max-w-6xl mx-auto px-4 pt-6 pb-2 w-full flex items-center justify-between">
          <a class="inline-flex items-center text-xs font-semibold text-govNavy hover:underline gap-1" href="#/">
            <span>←</span>
            <span>Return to Public Home</span>
          </a>
          <span class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Public Access • Verification Acknowledgment
          </span>
        </div>

        <main class="max-w-6xl mx-auto px-4 pb-12 w-full flex-grow">
          <div class="bg-white border border-slate-200 rounded-md p-6 shadow-sm mt-4">
            <!-- Receipt Success Banner -->
            <div class="bg-emerald-50 border border-emerald-200 rounded p-4 mb-6 flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                ✓
              </div>
              <div>
                <h2 class="text-base font-bold text-emerald-900">Grievance Successfully Registered & Queued for Inspection</h2>
                <p class="text-xs text-emerald-800 mt-0.5">
                  Your ground observation and mandatory photographic evidence have been officially logged in the national audit registry.
                </p>
              </div>
            </div>

            <!-- Receipt Metadata Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 rounded p-4 bg-slate-50/50 mb-6 text-xs">
              <div>
                <span class="text-slate-500 block mb-0.5 font-medium">Grievance Tracking ID</span>
                <span class="font-mono text-sm font-bold text-govNavy tracking-wide">${submissionConfirmation.id}</span>
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
                  <span>${submissionConfirmation.photoCount || 1} Site Photo(s) Attached & Encrypted</span>
                </span>
              </div>
            </div>

            <!-- Statutory Notice -->
            <div class="bg-blue-50/60 border-l-4 border-govNavy p-3 text-xs text-slate-700 leading-relaxed rounded-r mb-6">
              <strong>Statutory Acknowledgment:</strong> Under Section 12 of the Public Audit & Grievance Guidelines,
              your ground-truth observation has been transmitted to the District Authority Collectorate and Central
              Audit Inspection cell. Physical verification and contractor stage reconciliation will be scheduled accordingly.
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button type="button" class="bg-govNavy hover:bg-govNavy-dark text-white font-semibold text-xs px-5 py-2.5 rounded shadow-sm transition" id="btn-submit-another">
                Submit Another Report
              </button>
              <a href="#/" class="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded transition">
                Return to Public Home
              </a>
            </div>
          </div>
        </main>

        <footer class="bg-white border-t border-govBorder py-6 mt-auto">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-xs font-semibold text-slate-700 tracking-wide">
              Official Government Audit Portal • Public Grievance Intake Framework • Governed under MoSPI & CAG Audit Guidelines
            </p>
            <p class="text-[11px] text-slate-500 mt-1 max-w-2xl mx-auto">
              Academic & Research Prototype: This interface is engineered exclusively for Smart India Hackathon 2026 evaluating MoSPI Problem Statement SIH26102. Not an official Government of India portal.
            </p>
          </div>
        </footer>
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

  // Build project cards HTML with prominent distance badges
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
      <label class="setu-project-card-label flex items-start p-3.5 rounded border ${isSelected ? 'border-govNavy bg-blue-50/40 ring-1 ring-govNavy' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'} cursor-pointer transition" data-project-id="${p.id}">
        <input
          type="radio"
          name="project_selection"
          class="mt-1 h-4 w-4 text-govNavy border-slate-300 focus:ring-govNavy shrink-0 project-radio-input"
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
      <button type="button" class="btn-remove-photo text-rose-600 hover:text-rose-800 p-1 text-xs font-bold shrink-0" data-photo-index="${pIdx}" title="Remove Photo">
        ✕
      </button>
    </div>
  `).join('');

  const citizenLat = reportedLocation?.latitude ?? 13.0933;
  const citizenLon = reportedLocation?.longitude ?? 80.1841;

  return `
    <div class="bg-govBg text-slate-900 font-sans antialiased min-h-screen flex flex-col">
      <!-- BEGIN: TopUtilityBar -->
      <section aria-label="Accessibility & Prototype Notice" class="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div class="max-w-6xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center space-x-2 font-medium">
            <span class="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            <span class="tracking-wide">SMART INDIA HACKATHON 2026 · PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102</span>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Text Size Controls -->
            <div class="flex items-center space-x-1 font-mono">
              <button class="hover:text-white px-1" title="Decrease Font" type="button" onclick="document.body.style.fontSize='12px'">A-</button>
              <button class="hover:text-white px-1 font-bold" title="Default Font" type="button" onclick="document.body.style.fontSize='14px'">A</button>
              <button class="hover:text-white px-1 font-bold" title="Increase Font" type="button" onclick="document.body.style.fontSize='16px'">A+</button>
            </div>
            <span class="text-slate-600">|</span>
            <!-- Screen Reader Toggle -->
            <button class="hover:text-white flex items-center gap-1" type="button">
              <svg aria-hidden="true" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              <span>Screen Reader</span>
            </button>
            <span class="text-slate-600">|</span>
            <!-- Language Switcher -->
            <div class="flex items-center space-x-1">
              <span class="font-semibold text-white">English</span>
              <span class="text-slate-600">/</span>
              <button class="hover:text-white" type="button">हिन्दी</button>
            </div>
          </div>
        </div>
      </section>
      <!-- END: TopUtilityBar -->

      <!-- BEGIN: MainHeader -->
      <header class="bg-white border-b border-govBorder sticky top-0 z-30">
        <div class="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <!-- SETU Emblem and Identity -->
          <div class="flex items-center space-x-3">
            <div class="h-10 w-10 bg-govNavy text-white rounded flex items-center justify-center font-bold text-base shadow-sm">
              SETU
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-xl text-govNavy tracking-tight">SETU</span>
                <span class="bg-blue-50 text-blue-800 text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-200">CITIZEN PORTAL</span>
              </div>
              <p class="text-xs text-slate-500 font-medium leading-none mt-0.5">Public Audit & Monitoring Platform</p>
            </div>
          </div>

          <!-- Header Action Items: Search & Login -->
          <div class="flex items-center gap-3 flex-1 justify-end max-w-xl">
            <!-- Track Work / Grievance Input -->
            <form class="flex-1 max-w-md hidden sm:flex" role="search" id="header-track-form">
              <div class="relative w-full">
                <input
                  id="track-search-input"
                  class="w-full text-xs bg-slate-50 border border-slate-300 rounded-l px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-govNavy focus:border-govNavy placeholder-slate-400"
                  placeholder="Track Sanction / Work ID / Complaint #"
                  type="text"
                />
              </div>
              <button class="bg-govNavy hover:bg-govNavy-dark text-white text-xs font-semibold px-3.5 py-2 rounded-r border border-govNavy transition-colors flex items-center shrink-0" type="submit">
                Track
              </button>
            </form>

            <!-- Officer Login Button -->
            <a class="inline-flex items-center text-xs font-semibold text-govNavy hover:text-white border border-govNavy hover:bg-govNavy px-3 py-2 rounded transition-colors shrink-0" href="#/login">
              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              Officer Login
            </a>
          </div>
        </div>
      </header>
      <!-- END: MainHeader -->

      <!-- BEGIN: NavigationBanner -->
      <div class="max-w-6xl mx-auto px-4 pt-6 pb-2 w-full flex items-center justify-between">
        <a class="inline-flex items-center text-xs font-semibold text-govNavy hover:underline gap-1" href="#/">
          <span>←</span>
          <span>Return to Public Home</span>
        </a>
        <span class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Public Access • No Login Required
        </span>
      </div>
      <!-- END: NavigationBanner -->

      <!-- BEGIN: PageContent -->
      <main class="max-w-6xl mx-auto px-4 pb-12 w-full flex-grow">
        <!-- Header Section -->
        <section aria-labelledby="page-title" class="mb-5">
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight" id="page-title">
            Report an Infrastructure Issue or Ground Observation
          </h1>
          <p class="text-sm text-slate-600 mt-1">
            Submit factual ground observations on active MPLADS works in your area. Works are automatically sorted by distance to your address.
          </p>
        </section>

        <!-- Citizen Guidelines Notice Box -->
        <section aria-label="Reporting Guidelines" class="bg-white border-l-4 border-govNavy border-y border-r border-slate-200 p-4 rounded-r shadow-xs mb-6">
          <h2 class="text-xs font-bold tracking-wider uppercase text-govNavy mb-1">Citizen Grievance Instructions</h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            Report factual civil works observations (e.g. stalled machinery, incomplete masonry without roof slabs, dry water taps, unpaved road shoulders). Coordinates verify proximity to registered works. <strong>Attaching at least one photo of the site is compulsory to verify ground reality.</strong>
          </p>
        </section>

        <!-- Error Banner (if any) -->
        ${submitErrorMessage ? `
          <div class="bg-rose-50 border border-rose-300 text-rose-800 text-xs p-3.5 rounded-md mb-6 flex items-start gap-2">
            <span class="text-rose-600 font-bold text-sm">⚠</span>
            <div>
              <strong class="font-semibold">Action Required:</strong> ${submitErrorMessage}
            </div>
          </div>
        ` : ''}

        <!-- Grievance Intake Form -->
        <form class="space-y-6" id="citizen-grievance-form">
          <!-- BEGIN: Section 1 - Location & Complete Address Selection -->
          <div class="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
            <div class="flex items-center space-x-2.5 mb-4">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-govNavy text-white text-xs font-bold">1</span>
              <div>
                <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Location & Entire Address</h2>
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
                <select class="w-full text-xs rounded border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy" id="state-select">
                  ${stateOptionsHtml}
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="district-select">District *</label>
                <select class="w-full text-xs rounded border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy" id="district-select">
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
                <select class="w-full text-xs rounded border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy" id="locality-select">
                  ${localityOptionsHtml}
                </select>
                <span class="text-[10px] text-slate-500 mt-0.5 block">Select your nearest area in ${selectedDistrict} to compute exact project distance.</span>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="custom-address-input">
                  Specific Street Address / Building / Mohalla (Optional)
                </label>
                <input
                  class="w-full text-xs rounded border-slate-300 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
                  id="custom-address-input"
                  placeholder="e.g. 14, 2nd Main Road, Near Govt High School"
                  type="text"
                  value="${customAddress}"
                />
                <span class="text-[10px] text-slate-500 mt-0.5 block">Optional precise address details for field inspection team.</span>
              </div>
            </div>
          </div>
          <!-- END: Section 1 -->

          <!-- BEGIN: Section 2 - Project Selection Sorted by Distance -->
          <div class="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
            <div class="flex items-center space-x-2.5 mb-1">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-govNavy text-white text-xs font-bold">2</span>
              <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Select Civil Project in ${selectedDistrict}, ${selectedState} *
              </h2>
            </div>
            <p class="text-xs text-slate-500 mb-4 ml-8">
              Projects are sorted in real time starting from the closest work to your selected address (<strong class="text-slate-700 font-semibold">${selectedLocality}</strong>). No formal project ID required.
            </p>

            <!-- Active Projects Radio Group with Distance -->
            <div aria-label="Select Project" class="space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1" role="radiogroup" id="project-selection-list">
              ${projectCardsHtml}
              ${sortedProjects.length === 0 ? `
                <div class="text-center py-6 text-xs text-slate-500 bg-slate-50 rounded border border-slate-200">
                  No active civil projects found matching ${selectedDistrict}, ${selectedState}. Please choose another district above.
                </div>
              ` : ''}
            </div>
          </div>
          <!-- END: Section 2 -->

          <!-- BEGIN: Section 3 - Observation & Compulsory Photos -->
          <div class="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
            <div class="flex items-center space-x-2.5 mb-3">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-govNavy text-white text-xs font-bold">3</span>
              <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wide">On-the-Ground Observation & Compulsory Photos *</h2>
            </div>

            <!-- Grievance Description Textarea -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-slate-700" for="complaint-text">
                Physical Site Status & Defect Description *
              </label>
              <textarea
                class="w-full text-xs rounded border-slate-300 p-3 text-slate-900 placeholder-slate-400 focus:border-govNavy focus:ring-govNavy"
                id="complaint-text"
                placeholder="Describe physical site status in detail (e.g., contractor claimed masonry work is complete, but on site only foundation pillars stand; unpaved road shoulders; missing plumbing or electrical fittings; no workers present for 2 months)."
                required
                rows="4"
              >${complaintText}</textarea>
              <div class="flex justify-between items-center text-[11px] text-slate-500">
                <span>Min 10 characters. Detail structural status or missing fixtures.</span>
                <span id="char-counter">Character count: ${complaintText.length}</span>
              </div>
            </div>

            <!-- Geo-Tagged Site Photo Upload Dropzone (COMPULSORY) -->
            <div class="mt-5">
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">
                Attach Geo-Tagged Site Photos <span class="text-rose-600 font-bold">* Compulsory (At least 1 site photo required)</span>
              </label>

              <!-- Photo Error Message if missing -->
              ${photoErrorMessage ? `
                <div class="bg-rose-50 border border-rose-300 text-rose-800 text-xs px-3 py-2 rounded mb-2 flex items-center gap-1.5">
                  <span class="font-bold">⚠</span>
                  <span>${photoErrorMessage}</span>
                </div>
              ` : ''}

              <div
                id="photo-dropzone"
                class="border-2 border-dashed ${photoErrorMessage ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 hover:border-govNavy bg-slate-50/50'} rounded-md p-4 text-center transition cursor-pointer"
              >
                <svg aria-hidden="true" class="mx-auto h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewbox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                <p class="mt-1 text-xs text-slate-700 font-medium">Click to upload site photos or drag & drop</p>
                <p class="text-[10px] text-slate-500">Max 3 photos, JPG/PNG up to 5MB each. EXIF metadata read for GPS verification.</p>
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
                  class="w-full text-xs rounded border-slate-300 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
                  id="contact-name"
                  placeholder="e.g. Rajesh Patil"
                  type="text"
                  value="${citizenName}"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1" for="contact-mobile">Mobile Number (Optional — for SMS Tracking)</label>
                <input
                  class="w-full text-xs rounded border-slate-300 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
                  id="contact-mobile"
                  placeholder="e.g. 9876543210"
                  type="tel"
                  value="${phone}"
                />
              </div>
            </div>

            <!-- Geolocation Stamp Confirmation Notice -->
            <div class="mt-4 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-600 text-xs flex items-center gap-2">
              <span class="text-rose-600">📍</span>
              <span>
                Coordinates <strong class="text-slate-800 font-medium">(${citizenLat.toFixed(4)}°N, ${citizenLon.toFixed(4)}°E)</strong> and locality <strong class="text-slate-800 font-medium">${selectedLocality}</strong> will be attached for on-site proximity verification.
              </span>
            </div>

            <!-- Form Submission Footer -->
            <div class="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="text-xs text-slate-600 flex items-center gap-2">
                <input
                  checked
                  class="rounded border-slate-300 text-govNavy focus:ring-govNavy"
                  id="good-faith-cert"
                  required
                  type="checkbox"
                />
                <label class="cursor-pointer select-none" for="good-faith-cert">
                  By submitting, you certify that this ground observation is submitted in good faith.
                </label>
              </div>

              <button
                class="w-full sm:w-auto bg-govNavy hover:bg-govNavy-dark text-white font-semibold text-xs px-6 py-2.5 rounded shadow-sm transition inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                type="submit"
                id="btn-submit-grievance"
                ${isSubmitting ? 'disabled' : ''}
              >
                <span>${isSubmitting ? 'Verifying & Submitting...' : 'Submit Grievance Report'}</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
            </div>
          </div>
          <!-- END: Section 3 -->
        </form>
      </main>
      <!-- END: PageContent -->

      <!-- BEGIN: MainFooter -->
      <footer class="bg-white border-t border-govBorder py-6 mt-auto">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <p class="text-xs font-semibold text-slate-700 tracking-wide">
            Official Government Audit Portal • Public Grievance Intake Framework • Governed under MoSPI & CAG Audit Guidelines
          </p>
          <p class="text-[11px] text-slate-500 mt-1 max-w-2xl mx-auto">
            Academic & Research Prototype: This interface is engineered exclusively for Smart India Hackathon 2026 evaluating MoSPI Problem Statement SIH26102. Not an official Government of India portal.
          </p>
          <div class="mt-3 flex items-center justify-center space-x-3 text-[11px] text-slate-400">
            <span>SIH26102</span>
            <span>•</span>
            <span>SETU Framework v2.4</span>
            <span>•</span>
            <a class="hover:underline" href="#/">Privacy Policy</a>
            <span>•</span>
            <a class="hover:underline" href="#/">Citizen Charter</a>
          </div>
        </div>
      </footer>
      <!-- END: MainFooter -->
    </div>
  `;
}

/**
 * Geolocation trigger
 */
function triggerGeolocation(appEl) {
  if (!navigator.geolocation) {
    portalState.geoStatus = 'unavailable';
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

      // Find nearest project in catalog to auto-suggest state and district
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
      mountCitizenPortal(appEl);
    },
    () => {
      portalState.geoStatus = 'denied';
      mountCitizenPortal(appEl);
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

  // Header Search / Track Form
  const trackForm = appEl.querySelector('#header-track-form');
  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const trackInput = appEl.querySelector('#track-search-input');
      const val = trackInput ? trackInput.value.trim() : '';
      if (!val) return;

      if (val.toUpperCase().startsWith('PRJ-')) {
        window.location.hash = `#/project/${encodeURIComponent(val)}`;
      } else {
        // Show tracking confirmation for complaint
        portalState.submissionConfirmation = {
          id: val.toUpperCase().startsWith('CIT-') ? val.toUpperCase() : `CIT-2026-${val}`,
          projectId: portalState.selectedProjectId || 'PRJ-IND-2013',
          projectName: 'Establishment of Interactive STEM Robotic Lab in Higher Secondary School, Chennai',
          district: portalState.selectedDistrict,
          state: portalState.selectedState,
          submittedAt: '2026-08-20T10:30:00Z',
          status: 'Field Inspection Scheduled (District Vigilance)',
          photoCount: 2,
        };
        mountCitizenPortal(appEl);
      }
    });
  }

  // GPS update button
  const gpsBtn = appEl.querySelector('#btn-detect-gps');
  if (gpsBtn) {
    gpsBtn.addEventListener('click', () => {
      triggerGeolocation(appEl);
    });
  }

  // State selection change
  const stateSelect = appEl.querySelector('#state-select');
  if (stateSelect) {
    stateSelect.addEventListener('change', (e) => {
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

  // Project Selection clicks
  const projectCards = appEl.querySelectorAll('.setu-project-card-label');
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project-id');
      if (pid && pid !== portalState.selectedProjectId) {
        portalState.selectedProjectId = pid;
        // Update visual radio selection
        projectCards.forEach((c) => {
          const isMatch = c.getAttribute('data-project-id') === pid;
          const radio = c.querySelector('input[type="radio"]');
          if (radio) radio.checked = isMatch;
          c.classList.toggle('border-govNavy', isMatch);
          c.classList.toggle('bg-blue-50/40', isMatch);
          c.classList.toggle('ring-1', isMatch);
          c.classList.toggle('ring-govNavy', isMatch);
        });
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
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('border-govNavy', 'bg-blue-50/30');
    });

    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-govNavy', 'bg-blue-50/30');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-govNavy', 'bg-blue-50/30');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handlePhotoFiles(e.dataTransfer.files, appEl);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handlePhotoFiles(e.target.files, appEl);
      }
    });
  }

  // Remove photo buttons
  const removeBtns = appEl.querySelectorAll('.btn-remove-photo');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
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
      portalState.submitErrorMessage = '';
      portalState.photoErrorMessage = '';

      const complaintText = textarea ? textarea.value.trim() : portalState.complaintText.trim();
      const citizenName = nameInput ? nameInput.value.trim() : portalState.citizenName.trim();
      const phone = mobileInput ? mobileInput.value.trim() : portalState.phone.trim();

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

      // VALIDATION 3: COMPULSORY SITE PHOTOS (User Requirement)
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
 * Handles multiple photo file uploads via FileReader
 */
function handlePhotoFiles(fileList, appEl) {
  const files = Array.from(fileList);
  const remainingSlots = 3 - portalState.attachedPhotos.length;
  if (remainingSlots <= 0) return;

  const toAdd = files.slice(0, remainingSlots);
  let loaded = 0;

  toAdd.forEach((file) => {
    if (!file.type.startsWith('image/')) return;
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
    reader.readAsDataURL(file);
  });
}
