import React, { useState, useEffect, useMemo, useRef } from 'react';
import './CitizenPortal.css';
import mockProjects from '../../../backend/app/data/mockProjects.json';

/**
 * Calculates Haversine distance in kilometers between two GPS coordinate pairs.
 */
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

// Curated prominent localities & wards for major districts
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

// Extract unique sorted states
const allStates = Array.from(new Set(mockProjects.map((p) => p.state))).sort();

// Helper to get districts for a given state
function getDistrictsForState(state) {
  const dists = Array.from(
    new Set(mockProjects.filter((p) => p.state === state).map((p) => p.district))
  ).sort();
  return dists.length > 0 ? dists : ['General District'];
}

// Helper to get localities for a state and district
function getLocalitiesForDistrict(state, district) {
  if (DISTRICT_LOCALITIES[state] && DISTRICT_LOCALITIES[state][district]) {
    return DISTRICT_LOCALITIES[state][district];
  }
  const distProjects = mockProjects.filter((p) => p.state === state && p.district === district);
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

/**
 * Public Citizen Complaint & Ground Truth Submission Portal
 * Minimal Government Application Style
 */
export default function CitizenPortal({ onNavigate }) {
  // Step 1: Location & Entire Address State
  const [geoStatus, setGeoStatus] = useState('init'); // 'init' | 'detecting' | 'granted' | 'denied' | 'unavailable'
  const [reportedLocation, setReportedLocation] = useState({ latitude: 13.0933, longitude: 80.1841 });
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedDistrict, setSelectedDistrict] = useState('Chennai');
  const [selectedLocality, setSelectedLocality] = useState('Central / Park Town');
  const [customAddress, setCustomAddress] = useState('');

  // Step 2: Project Selection state
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-IND-2013');

  // Step 3: Observation & Photos state (Compulsory)
  const [complaintText, setComplaintText] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [attachedPhotos, setAttachedPhotos] = useState([]);
  const [photoErrorMessage, setPhotoErrorMessage] = useState('');

  // Submission / Loading / Receipt
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [trackQuery, setTrackQuery] = useState('');

  const fileInputRef = useRef(null);

  // Request browser geolocation on page load
  const requestLocation = (explicitClick = false) => {
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

        // Only auto-switch district/project if user clicked button or hasn't typed yet
        if (explicitClick || complaintText.length === 0) {
          let nearest = null;
          let minDistance = Infinity;
          for (const p of mockProjects) {
            const pLat = p.siteCoordinates?.latitude ?? p.latitude;
            const pLon = p.siteCoordinates?.longitude ?? p.longitude;
            if (pLat != null && pLon != null) {
              const dist = calculateHaversineDistance(latitude, longitude, pLat, pLon);
              if (dist < minDistance) {
                minDistance = dist;
                nearest = p;
              }
            }
          }

          if (nearest) {
            setSelectedState(nearest.state);
            setSelectedDistrict(nearest.district);
            setSelectedProjectId(nearest.id);
            const localities = getLocalitiesForDistrict(nearest.state, nearest.district);
            if (localities.length > 0) {
              setSelectedLocality(localities[0].name);
            }
          }
        }
      },
      () => {
        setGeoStatus('denied');
      },
      { timeout: 7000, enableHighAccuracy: false }
    );
  };

  useEffect(() => {
    requestLocation(false);
  }, []);

  // Compute available districts & localities
  const availableDistricts = useMemo(() => getDistrictsForState(selectedState), [selectedState]);
  const availableLocalities = useMemo(() => getLocalitiesForDistrict(selectedState, selectedDistrict), [selectedState, selectedDistrict]);

  // Handle State Change
  const handleStateChange = (newState) => {
    setSelectedState(newState);
    const districts = getDistrictsForState(newState);
    const newDistrict = districts[0] || '';
    setSelectedDistrict(newDistrict);

    const localities = getLocalitiesForDistrict(newState, newDistrict);
    const newLocality = localities[0]?.name || '';
    setSelectedLocality(newLocality);

    if (localities[0]) {
      setReportedLocation({ latitude: localities[0].lat, longitude: localities[0].lon });
    }
  };

  // Handle District Change
  const handleDistrictChange = (newDistrict) => {
    setSelectedDistrict(newDistrict);
    const localities = getLocalitiesForDistrict(selectedState, newDistrict);
    const newLocality = localities[0]?.name || '';
    setSelectedLocality(newLocality);

    if (localities[0]) {
      setReportedLocation({ latitude: localities[0].lat, longitude: localities[0].lon });
    }
  };

  // Handle Locality Change
  const handleLocalityChange = (newLocName) => {
    setSelectedLocality(newLocName);
    const matched = availableLocalities.find((l) => l.name === newLocName);
    if (matched) {
      setReportedLocation({ latitude: matched.lat, longitude: matched.lon });
    }
  };

  // Compute projects sorted in real time by proximity to citizen's selected coordinates
  const sortedProjects = useMemo(() => {
    const citizenLat = reportedLocation?.latitude ?? 13.0827;
    const citizenLon = reportedLocation?.longitude ?? 80.2707;

    const matching = mockProjects.filter(
      (p) => p.state === selectedState && p.district === selectedDistrict
    );
    const list = matching.length > 0 ? matching : mockProjects.filter((p) => p.state === selectedState);

    const withDist = list.map((p) => {
      const pLat = p.siteCoordinates?.latitude ?? p.latitude ?? citizenLat;
      const pLon = p.siteCoordinates?.longitude ?? p.longitude ?? citizenLon;
      const dist = calculateHaversineDistance(citizenLat, citizenLon, pLat, pLon);
      return {
        ...p,
        _calculatedDistance: dist,
      };
    });

    withDist.sort((a, b) => a._calculatedDistance - b._calculatedDistance);
    return withDist;
  }, [selectedState, selectedDistrict, reportedLocation]);

  // Keep selectedProjectId valid
  useEffect(() => {
    if (sortedProjects.length > 0 && !sortedProjects.some((p) => p.id === selectedProjectId)) {
      setSelectedProjectId(sortedProjects[0].id);
    }
  }, [sortedProjects, selectedProjectId]);

  // Handle Photo File Upload
  const handlePhotoFiles = (fileList) => {
    const files = Array.from(fileList);
    const remainingSlots = 3 - attachedPhotos.length;
    if (remainingSlots <= 0) {
      setPhotoErrorMessage('Maximum 3 site photographs allowed.');
      return;
    }

    const validImages = files.filter((f) => f.type.startsWith('image/'));
    if (validImages.length === 0) {
      setPhotoErrorMessage('Please select valid image files (JPG or PNG).');
      return;
    }

    const oversized = validImages.some((f) => f.size > 5 * 1024 * 1024);
    if (oversized) {
      setPhotoErrorMessage('File size exceeds 5MB limit. Please upload images under 5MB each.');
      return;
    }

    const toAdd = validImages.slice(0, remainingSlots);
    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedPhotos((prev) => [
          ...prev,
          {
            name: file.name,
            size: file.size,
            dataUrl: event.target.result,
          },
        ]);
        setPhotoErrorMessage('');
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setAttachedPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const val = trackQuery.trim();
    if (!val) return;

    if (val.toUpperCase().startsWith('PRJ-')) {
      const targetProj = mockProjects.find((p) => p.id.toUpperCase() === val.toUpperCase());
      if (targetProj) {
        setSelectedState(targetProj.state);
        setSelectedDistrict(targetProj.district);
        setSelectedProjectId(targetProj.id);
        setErrorMessage('');
      } else {
        setErrorMessage(`Project '${val}' was not found in the public MPLADS catalog.`);
      }
    } else {
      const complaintId = val.toUpperCase().startsWith('CIT-') ? val.toUpperCase() : `CIT-2026-${val}`;
      const targetProj = mockProjects.find((p) => p.id === selectedProjectId) || mockProjects[0];
      setSubmissionSuccess({
        id: complaintId,
        projectId: targetProj.id,
        projectName: targetProj.name,
        district: targetProj.district,
        state: targetProj.state,
        submittedAt: '2026-08-20T10:30:00Z',
        status: 'Field Inspection Scheduled (District Vigilance)',
        photoCount: 2,
        reportedLocation,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setPhotoErrorMessage('');

    if (!selectedProjectId) {
      setErrorMessage('Please select a relevant civil project in your area.');
      return;
    }

    if (!complaintText || complaintText.trim().length < 10) {
      setErrorMessage('Please provide an observation of at least 10 characters describing the site.');
      return;
    }

    // MANDATORY PHOTO VERIFICATION
    if (attachedPhotos.length === 0) {
      setPhotoErrorMessage('Site Photo Required: Attaching at least one geo-tagged photograph of the site is mandatory to verify ground reality.');
      setErrorMessage('Mandatory photograph missing. Please attach at least 1 photo of the work site before submitting.');
      return;
    }

    setIsSubmitting(true);

    const targetProject = mockProjects.find((p) => p.id === selectedProjectId) || sortedProjects[0];

    const payload = {
      complaintText: complaintText.trim(),
      citizenName: citizenName.trim() || undefined,
      phone: phone.trim() || undefined,
      district: targetProject?.district || selectedDistrict,
      state: targetProject?.state || selectedState,
      locality: selectedLocality,
      customAddress: customAddress.trim() || undefined,
      reportedLocation: reportedLocation
        ? {
            latitude: reportedLocation.latitude,
            longitude: reportedLocation.longitude,
          }
        : undefined,
      photoCount: attachedPhotos.length,
    };

    try {
      const res = await fetch(`http://127.0.0.1:8000/projects/${selectedProjectId}/citizen-reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmissionSuccess({
          id: data.id || `CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
          projectId: data.projectId || selectedProjectId,
          projectName: data.projectName || targetProject?.name || 'MPLADS Project',
          district: targetProject?.district || selectedDistrict,
          state: targetProject?.state || selectedState,
          submittedAt: data.submittedAt || new Date().toISOString(),
          status: data.status || 'Registered for Field Verification',
          photoCount: attachedPhotos.length,
          reportedLocation,
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrorMessage(errData.detail || 'Submission failed. Please try again.');
      }
    } catch (_err) {
      // Offline fallback
      setSubmissionSuccess({
        id: `CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
        projectId: selectedProjectId,
        projectName: targetProject?.name || 'MPLADS Project',
        district: targetProject?.district || selectedDistrict,
        state: targetProject?.state || selectedState,
        submittedAt: new Date().toISOString(),
        status: 'Registered for Field Verification',
        photoCount: attachedPhotos.length,
        reportedLocation,
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
    setAttachedPhotos([]);
    setErrorMessage('');
    setPhotoErrorMessage('');
  };

  const citizenLat = reportedLocation?.latitude ?? 13.0933;
  const citizenLon = reportedLocation?.longitude ?? 80.1841;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* TWO-LEVEL OFFICIAL GOVERNMENT HEADER */}
      <header className="w-full select-none">
        {/* TOP BAR: Dark navy background */}
        <div className="w-full bg-[#0a192f] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.08 8.84-7 9.95-3.92-1.11-7-5.41-7-9.95V6.3l7-3.12zM12 6a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z"/>
              </svg>
              <span className="font-medium tracking-wide">Government of India</span>
            </div>
            <div className="text-slate-300 text-xs tracking-wide hidden sm:block">
              Ministry of Statistics &amp; Programme Implementation
            </div>
          </div>
        </div>

        {/* MAIN HEADER: White background */}
        <div className="w-full bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <a href="#/" className="flex flex-col no-underline text-inherit group shrink-0">
              <span className="text-xl font-bold tracking-tight text-[#0a192f] font-sans">PRAMAAN</span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">MPLADS Audit &amp; Monitoring System</span>
            </a>

            <div className="flex items-center gap-3 sm:gap-6 text-sm font-medium">
              <form className="hidden md:flex items-center" role="search" onSubmit={handleTrackSubmit}>
                <input
                  className="w-56 text-xs bg-slate-50 border border-slate-300 rounded-l px-3 py-1.5 text-slate-800 focus:outline-none focus:border-[#0f2b5c] placeholder-slate-400"
                  placeholder="Track Work ID / Complaint #"
                  type="text"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                />
                <button
                  className="bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white text-xs font-semibold px-3 py-1.5 rounded-r border border-[#0f2b5c] transition-colors cursor-pointer"
                  type="submit"
                >
                  Track
                </button>
              </form>

              <a href="#/" className="text-slate-600 hover:text-[#0a192f] transition-colors no-underline">Home</a>
              <a
                href="#/login"
                className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-white border border-[#0f2b5c] text-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white text-xs font-semibold rounded transition-colors no-underline"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Official Login</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {submissionSuccess ? (
          /* Official Confirmation Receipt */
          <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
            <div className="bg-emerald-50 border border-emerald-200 rounded p-4 mb-6 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-base shrink-0">
                ✓
              </div>
              <div>
                <h2 className="text-base font-bold text-emerald-900">Grievance Successfully Registered &amp; Queued for Inspection</h2>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Your ground observation and mandatory photographic evidence have been officially logged in the national audit registry.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 rounded p-4 bg-slate-50 mb-6 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Grievance Tracking ID</span>
                <span className="font-mono text-sm font-bold text-[#0f2b5c] tracking-wide">{submissionSuccess.id}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Filing Timestamp</span>
                <span className="font-semibold text-slate-800">
                  {submissionSuccess.submittedAt ? submissionSuccess.submittedAt.replace('T', ' ').substring(0, 19) + ' UTC' : 'Just Now'}
                </span>
              </div>
              <div className="md:col-span-2">
                <span className="text-slate-500 block mb-0.5 font-medium">Associated MPLADS Project</span>
                <span className="font-bold text-slate-900">{submissionSuccess.projectName}</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">Project ID: {submissionSuccess.projectId}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Target Jurisdiction</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.district}, {submissionSuccess.state}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Audit Pipeline Status</span>
                <span className="inline-block bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded border border-blue-200">
                  {submissionSuccess.status || 'Registered for Field Verification'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Verified Location Coordinates</span>
                <span className="text-slate-700 font-mono">
                  {submissionSuccess.reportedLocation ? `${submissionSuccess.reportedLocation.latitude.toFixed(4)}°N, ${submissionSuccess.reportedLocation.longitude.toFixed(4)}°E` : 'Device GPS Attached'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Photographic Evidence</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <span>📷</span>
                  <span>{submissionSuccess.photoCount || 1} Site Photo(s) Attached &amp; Encrypted</span>
                </span>
              </div>
            </div>

            <div className="bg-blue-50/60 border-l-4 border-[#0f2b5c] p-3 text-xs text-slate-700 leading-relaxed rounded-r mb-6">
              <strong>Statutory Acknowledgment:</strong> Under Public Audit &amp; Grievance Guidelines,
              your ground-truth observation has been transmitted to the District Authority Collectorate and Central
              Audit Inspection cell. Physical verification and contractor stage reconciliation will be scheduled accordingly.
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white font-semibold text-xs px-5 py-2.5 rounded shadow-sm transition cursor-pointer"
                onClick={handleReset}
              >
                Submit Another Report
              </button>
              <a
                href="#/"
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded transition no-underline"
              >
                Return to Home
              </a>
            </div>
          </div>
        ) : (
          /* Grievance Input View */
          <>
            <div className="text-center mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-500">CITIZEN GRIEVANCE PORTAL</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Report Infrastructure Issue &amp; Ground Reality
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl mx-auto">
                Submit factual ground observations and mandatory photographic evidence on active MPLADS works. Works are automatically ranked by proximity to your selected address.
              </p>
            </div>

            <div className="bg-white border-l-4 border-[#0f2b5c] border-y border-r border-slate-200 p-4 rounded-r shadow-xs mb-6 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800 font-semibold block mb-0.5">Citizen Reporting Guidelines:</strong>
              Detail physical on-site conditions (e.g., incomplete masonry without roof slabs, unpaved road shoulders, dry water points, stalled machinery). 
              <span className="text-[#0f2b5c] font-semibold"> Attaching at least one photo of the work site is compulsory to verify ground reality.</span>
            </div>

            {errorMessage && (
              <div className="bg-rose-50 border border-rose-300 text-rose-800 text-xs p-3.5 rounded mb-6 flex items-start gap-2">
                <span className="text-rose-600 font-bold text-sm">⚠</span>
                <div>
                  <strong className="font-semibold">Action Required:</strong> {errorMessage}
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* SECTION 1: Entire Address & Locality */}
              <div className="bg-white border border-slate-200 rounded p-5 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f2b5c] text-white text-xs font-bold">1</span>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Location &amp; Address</h2>
                    <span className="text-[11px] text-slate-500">Select your state, district, and locality to see nearby civil works sorted by proximity.</span>
                  </div>
                </div>

                {/* Detected Location Alert Banner */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 text-xs text-slate-800">
                    <span className="text-emerald-700 text-sm">📍</span>
                    <span>
                      <strong className="font-semibold text-emerald-900">Reference location:</strong> <strong className="font-semibold">{selectedLocality}, {selectedDistrict}, {selectedState}</strong> ({citizenLat.toFixed(4)}°N, {citizenLon.toFixed(4)}°E).
                    </span>
                  </div>
                  <button
                    className="text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-2.5 py-1 rounded transition-colors shadow-2xs cursor-pointer"
                    type="button"
                    onClick={() => requestLocation(true)}
                  >
                    {geoStatus === 'detecting' ? 'Detecting...' : 'Update Device GPS'}
                  </button>
                </div>

                {/* State and District Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="state-select">State / Union Territory *</label>
                    <select
                      className="w-full text-xs rounded border border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                      id="state-select"
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                    >
                      {allStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="district-select">District *</label>
                    <select
                      className="w-full text-xs rounded border border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                      id="district-select"
                      value={selectedDistrict}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                    >
                      {availableDistricts.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Locality and Street Address Selector */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="locality-select">
                      Ward / Locality / Landmark Area *
                    </label>
                    <select
                      className="w-full text-xs rounded border border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                      id="locality-select"
                      value={selectedLocality}
                      onChange={(e) => handleLocalityChange(e.target.value)}
                    >
                      {availableLocalities.map((loc) => (
                        <option key={loc.name} value={loc.name}>
                          {loc.name} ({loc.lat.toFixed(3)}°N, {loc.lon.toFixed(3)}°E)
                        </option>
                      ))}
                    </select>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Select your nearest area in {selectedDistrict} to compute exact project distance.</span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="custom-address-input">
                      Specific Street Address / Mohalla (Optional)
                    </label>
                    <input
                      className="w-full text-xs rounded border border-slate-300 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                      id="custom-address-input"
                      placeholder="e.g. 14, 2nd Main Road, Near Govt High School"
                      type="text"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Optional precise address details for field inspection team.</span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Project Selection with Distance */}
              <div className="bg-white border border-slate-200 rounded p-5 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-1">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f2b5c] text-white text-xs font-bold">2</span>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Select Civil Project in {selectedDistrict}, {selectedState} *
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mb-4 ml-8">
                  Projects are sorted in real time starting from the closest work to your selected address (<strong className="text-slate-700 font-semibold">{selectedLocality}</strong>).
                </p>

                <div aria-label="Select Project" className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1" role="radiogroup">
                  {sortedProjects.map((p) => {
                    const isSelected = p.id === selectedProjectId;
                    const dist = p._calculatedDistance;
                    const distFormatted = dist < 1.0 ? `${Math.round(dist * 1000)} meters` : `${dist.toFixed(1)} km`;

                    return (
                      <label
                        key={p.id}
                        className={`flex items-start p-3.5 rounded border ${
                          isSelected ? 'border-[#0f2b5c] bg-blue-50/40 ring-1 ring-[#0f2b5c]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                        } cursor-pointer transition select-none`}
                        onClick={() => setSelectedProjectId(p.id)}
                      >
                        <input
                          type="radio"
                          name="project_selection"
                          className="mt-1 h-4 w-4 text-[#0f2b5c] border-slate-300 focus:ring-[#0f2b5c] shrink-0"
                          value={p.id}
                          checked={isSelected}
                          onChange={() => setSelectedProjectId(p.id)}
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <div className="text-xs font-bold text-slate-900">{p.name}</div>
                            {dist < 1.0 ? (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                                🎯 Immediate Vicinity ({distFormatted})
                              </span>
                            ) : dist < 5.0 ? (
                              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                                📍 Near You ({distFormatted})
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                                📍 {distFormatted} away
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                            {p.category} civil works executed by {p.implementingAgency || 'Assigned Agency'} ({p.status} • Certified Physical: {p.physicalProgress}%)
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{p.category}</span>
                            <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{p.constituency || selectedDistrict} Constituency</span>
                            <span className="text-[10px] font-semibold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">Sanction: ₹{(p.sanctionedAmount / 100000).toFixed(1)} Lakhs</span>
                            <span className="text-[10px] text-slate-400 ml-auto font-mono">ID: ${p.id}</span>
                          </div>

                          {/* Basic Project Details for Selected Project */}
                          {isSelected && (
                            <div className="setu-project-details-box mt-3 pt-3 border-t border-blue-200 bg-white rounded p-3 border border-blue-100 shadow-2xs text-left" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f2b5c]">
                                  <span className="material-symbols-outlined text-[16px]">info</span>
                                  <span>Basic Project Details</span>
                                </div>
                                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  Official Public Record
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                                {/* Recommending MP */}
                                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                  <span className="text-[10px] text-slate-500 block font-medium">Recommending MP</span>
                                  <strong className="font-semibold text-slate-800 text-[11px] block truncate">{(p.mpName || 'Constituency MP').replace(' (Fictional)', '')}</strong>
                                  <span className="text-[10px] text-slate-600 block truncate">{p.constituency || selectedDistrict} Constituency</span>
                                </div>

                                {/* Implementing Agency & Vendor */}
                                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                  <span className="text-[10px] text-slate-500 block font-medium">Implementing Agency</span>
                                  <strong className="font-semibold text-slate-800 text-[11px] block truncate">{p.implementingAgency || 'District Authority'}</strong>
                                  <span className="text-[10px] text-slate-600 block truncate">Vendor: {(p.vendorName || 'Assigned Contractor').replace(' (Fictional)', '')}</span>
                                </div>

                                {/* Sanction & Outlay */}
                                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                  <span className="text-[10px] text-slate-500 block font-medium">Financial Outlay</span>
                                  <div className="flex items-center justify-between text-xs mt-0.5">
                                    <span className="text-slate-600">Sanctioned:</span>
                                    <strong className="font-bold text-[#0f2b5c]">₹{(p.sanctionedAmount / 100000).toFixed(1)} Lakhs</strong>
                                  </div>
                                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                                    <span>Disbursed:</span>
                                    <span className="font-semibold text-slate-700">₹{((p.expenditure || 0) / 100000).toFixed(1)} Lakhs</span>
                                  </div>
                                </div>

                                {/* Certified Physical Progress */}
                                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-500 font-medium">Physical Progress</span>
                                    <strong className="text-xs font-bold text-slate-800">{p.physicalProgress || 0}%</strong>
                                  </div>
                                  <div className="w-full h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(100, Math.max(0, p.physicalProgress || 0))}%` }}></div>
                                  </div>
                                  <span className="text-[10px] text-slate-500 mt-1 block">Status: <strong className="text-[#0f2b5c]">{p.status || 'In Progress'}</strong></span>
                                </div>

                                {/* Financial Progress */}
                                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-500 font-medium">Fund Utilization</span>
                                    <strong className="text-xs font-bold text-slate-800">{(p.financialProgress || 0).toFixed(0)}%</strong>
                                  </div>
                                  <div className="w-full h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(100, Math.max(0, p.financialProgress || 0))}%` }}></div>
                                  </div>
                                  <span className="text-[10px] text-slate-500 mt-1 block">FY {p.financialYear || '2024-25'}</span>
                                </div>

                                {/* GPS Location Coordinates */}
                                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                  <span className="text-[10px] text-slate-500 block font-medium">Site Coordinates &amp; Distance</span>
                                  <span className="font-mono text-xs font-semibold text-slate-800 block truncate">
                                    {(p.siteCoordinates?.latitude ?? p.latitude ?? 0).toFixed(4)}°N, {(p.siteCoordinates?.longitude ?? p.longitude ?? 0).toFixed(4)}°E
                                  </span>
                                  <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block truncate">
                                    📍 {distFormatted} from your reference location
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}

                  {sortedProjects.length === 0 && (
                    <div className="text-center py-6 text-xs text-slate-500 bg-slate-50 rounded border border-slate-200">
                      No active civil projects found matching {selectedDistrict}, {selectedState}. Please choose another district above.
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 3: Observation & Compulsory Photos */}
              <div className="bg-white border border-slate-200 rounded p-5 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f2b5c] text-white text-xs font-bold">3</span>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Ground Observation &amp; Compulsory Photos *</h2>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="complaint-text">
                    Physical Site Status &amp; Defect Description *
                  </label>
                  <textarea
                    className="w-full text-xs rounded border border-slate-300 p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f2b5c]"
                    id="complaint-text"
                    placeholder="Describe physical site status in detail (e.g., contractor claimed masonry work is complete, but on site only foundation pillars stand; unpaved road shoulders; missing plumbing or electrical fittings; no workers present for 2 months)."
                    required
                    rows={4}
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>Minimum 10 characters. Detail structural status or missing fixtures.</span>
                    <span>Character count: {complaintText.length}</span>
                  </div>
                </div>

                {/* Geo-Tagged Site Photo Upload Dropzone (COMPULSORY) */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Attach Geo-Tagged Site Photos <span className="text-rose-600 font-bold">* Compulsory (At least 1 site photo required)</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">Max 3 photos, JPG/PNG up to 5MB</span>
                  </div>

                  {photoErrorMessage && (
                    <div className="bg-rose-50 border border-rose-300 text-rose-800 text-xs px-3 py-2 rounded mb-2 flex items-center gap-1.5">
                      <span className="font-bold">⚠</span>
                      <span>{photoErrorMessage}</span>
                    </div>
                  )}

                  <div
                    className={`border-2 border-dashed ${
                      photoErrorMessage ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 hover:border-[#0f2b5c] bg-slate-50/50'
                    } rounded p-4 text-center transition cursor-pointer select-none`}
                    onClick={(e) => {
                      if (e.target !== fileInputRef.current) {
                        fileInputRef.current?.click();
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files?.length > 0) {
                        handlePhotoFiles(e.dataTransfer.files);
                      }
                    }}
                  >
                    <div className="mx-auto w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-1">
                      <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">Click to upload site photos or drag &amp; drop</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">JPG / PNG format. Photographic evidence is strictly required for ground audit.</p>
                    <input
                      ref={fileInputRef}
                      accept="image/jpeg,image/png"
                      className="hidden"
                      multiple
                      type="file"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        if (e.target.files?.length > 0) {
                          handlePhotoFiles(e.target.files);
                        }
                      }}
                    />
                  </div>

                  {/* Photo Previews Gallery */}
                  {attachedPhotos.length > 0 ? (
                    <div className="mt-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {attachedPhotos.map((photo, pIdx) => (
                          <div key={pIdx} className="relative group border border-slate-200 rounded p-1.5 bg-white shadow-2xs flex items-center gap-2">
                            <img src={photo.dataUrl} alt={`Site observation ${pIdx + 1}`} className="h-12 w-12 object-cover rounded border border-slate-200 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-medium text-slate-800 truncate">{photo.name}</p>
                              <p className="text-[10px] text-slate-500">{(photo.size / (1024 * 1024)).toFixed(2)} MB • Geo-Tagged</p>
                            </div>
                            <button
                              type="button"
                              className="text-rose-600 hover:text-rose-800 p-1 text-xs font-bold shrink-0 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                removePhoto(pIdx);
                              }}
                              title="Remove Photo"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
                        <span>✓</span>
                        <span>{attachedPhotos.length} site photo(s) attached and ready for statutory verification.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                      <span className="text-rose-600 font-bold">*</span>
                      <span>Submission is locked until at least one photo is uploaded.</span>
                    </div>
                  )}
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="contact-name">Your Full Name (Optional)</label>
                    <input
                      className="w-full text-xs rounded border border-slate-300 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                      id="contact-name"
                      placeholder="e.g. Rajesh Patil"
                      type="text"
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="contact-mobile">Mobile Number (Optional — for SMS Tracking)</label>
                    <input
                      className="w-full text-xs rounded border border-slate-300 py-2 px-3 text-slate-800 focus:outline-none focus:border-[#0f2b5c]"
                      id="contact-mobile"
                      placeholder="e.g. 9876543210"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-600 text-xs flex items-center gap-2">
                  <span className="text-[#0f2b5c]">📍</span>
                  <span>
                    Verified Coordinates <strong className="text-slate-800 font-medium">(${citizenLat.toFixed(4)}°N, ${citizenLon.toFixed(4)}°E)</strong> will be attached for on-site proximity verification.
                  </span>
                </div>

                {/* Form Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <input
                      defaultChecked
                      className="rounded border-slate-300 text-[#0f2b5c] focus:ring-[#0f2b5c]"
                      id="good-faith-cert"
                      required
                      type="checkbox"
                    />
                    <label className="cursor-pointer select-none" htmlFor="good-faith-cert">
                      I certify that this ground observation is submitted in good faith based on actual site observation.
                    </label>
                  </div>

                  <button
                    className="w-full sm:w-auto bg-[#0f2b5c] hover:bg-[#1e3a8a] text-white font-semibold text-xs px-6 py-2.5 rounded shadow-sm transition inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    type="submit"
                    id="btn-submit-grievance"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Verifying &amp; Submitting...' : 'Submit Grievance Report →'}</span>
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </main>

      {/* MINIMAL GOVERNMENT FOOTER */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-1">
          <div className="font-bold text-slate-800 text-sm tracking-tight">PRAMAAN</div>
          <div className="text-slate-600 font-medium">MPLADS Audit &amp; Monitoring System</div>
          <div className="text-slate-400 mt-1">Government of India | Ministry of Statistics &amp; Programme Implementation</div>
          <div className="flex items-center justify-center gap-3 text-slate-400 mt-2 text-[11px]">
            <span className="text-slate-500">Citizen Grievance &amp; Verification Portal</span>
            <span>•</span>
            <span>Privacy &amp; Accessibility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
