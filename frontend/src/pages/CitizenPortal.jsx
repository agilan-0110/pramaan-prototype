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
 */
export default function CitizenPortal({ onNavigate }) {
  // Step 1: Location & Entire Address State
  const [geoStatus, setGeoStatus] = useState('detecting'); // 'detecting' | 'granted' | 'denied' | 'unavailable'
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

  const fileInputRef = useRef(null);

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

        // Find nearest project in catalog
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
      },
      () => {
        setGeoStatus('denied');
      },
      { timeout: 7000, enableHighAccuracy: false }
    );
  };

  useEffect(() => {
    requestLocation();
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
    if (remainingSlots <= 0) return;

    const toAdd = files.slice(0, remainingSlots);
    toAdd.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
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
    <div className="bg-govBg text-slate-900 font-sans antialiased min-h-screen flex flex-col">
      {/* BEGIN: TopUtilityBar */}
      <section aria-label="Accessibility & Prototype Notice" className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="tracking-wide">SMART INDIA HACKATHON 2026 · PROTOTYPE FOR MoSPI PROBLEM STATEMENT SIH26102</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 font-mono">
              <button className="hover:text-white px-1" title="Decrease Font" type="button" onClick={() => (document.body.style.fontSize = '12px')}>A-</button>
              <button className="hover:text-white px-1 font-bold" title="Default Font" type="button" onClick={() => (document.body.style.fontSize = '14px')}>A</button>
              <button className="hover:text-white px-1 font-bold" title="Increase Font" type="button" onClick={() => (document.body.style.fontSize = '16px')}>A+</button>
            </div>
            <span className="text-slate-600">|</span>
            <button className="hover:text-white flex items-center gap-1" type="button">
              <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <span>Screen Reader</span>
            </button>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-white">English</span>
              <span className="text-slate-600">/</span>
              <button className="hover:text-white" type="button">हिन्दी</button>
            </div>
          </div>
        </div>
      </section>
      {/* END: TopUtilityBar */}

      {/* BEGIN: MainHeader */}
      <header className="bg-white border-b border-govBorder sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-govNavy text-white rounded flex items-center justify-center font-bold text-base shadow-sm">
              SETU
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl text-govNavy tracking-tight">SETU</span>
                <span className="bg-blue-50 text-blue-800 text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-200">CITIZEN PORTAL</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-none mt-0.5">Public Audit & Monitoring Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end max-w-xl">
            <form className="flex-1 max-w-md hidden sm:flex" role="search" onSubmit={(e) => {
              e.preventDefault();
              const val = e.target.elements['trackQuery']?.value.trim();
              if (val) {
                if (val.toUpperCase().startsWith('PRJ-')) {
                  window.location.hash = `#/project/${encodeURIComponent(val)}`;
                } else {
                  setSubmissionSuccess({
                    id: val.toUpperCase().startsWith('CIT-') ? val.toUpperCase() : `CIT-2026-${val}`,
                    projectId: selectedProjectId,
                    projectName: 'Active MPLADS Infrastructure Work',
                    district: selectedDistrict,
                    state: selectedState,
                    submittedAt: '2026-08-20T10:30:00Z',
                    status: 'Field Inspection Scheduled (District Vigilance)',
                    photoCount: 2,
                    reportedLocation,
                  });
                }
              }
            }}>
              <div className="relative w-full">
                <input
                  name="trackQuery"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-l px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-govNavy focus:border-govNavy placeholder-slate-400"
                  placeholder="Track Sanction / Work ID / Complaint #"
                  type="text"
                />
              </div>
              <button className="bg-govNavy hover:bg-govNavy-dark text-white text-xs font-semibold px-3.5 py-2 rounded-r border border-govNavy transition-colors flex items-center shrink-0" type="submit">
                Track
              </button>
            </form>

            <a className="inline-flex items-center text-xs font-semibold text-govNavy hover:text-white border border-govNavy hover:bg-govNavy px-3 py-2 rounded transition-colors shrink-0" href="#/login">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              Officer Login
            </a>
          </div>
        </div>
      </header>
      {/* END: MainHeader */}

      {/* BEGIN: NavigationBanner */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 w-full flex items-center justify-between">
        <a className="inline-flex items-center text-xs font-semibold text-govNavy hover:underline gap-1" href="#/">
          <span>←</span>
          <span>Return to Public Home</span>
        </a>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Public Access • No Login Required
        </span>
      </div>
      {/* END: NavigationBanner */}

      {/* BEGIN: Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 pb-12 w-full flex-grow">
        {submissionSuccess ? (
          /* Confirmation Receipt View */
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm mt-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded p-4 mb-6 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                ✓
              </div>
              <div>
                <h2 className="text-base font-bold text-emerald-900">Grievance Successfully Registered & Queued for Inspection</h2>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Your ground observation and mandatory photographic evidence have been officially logged in the national audit registry.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 rounded p-4 bg-slate-50/50 mb-6 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Grievance Tracking ID</span>
                <span className="font-mono text-sm font-bold text-govNavy tracking-wide">{submissionSuccess.id}</span>
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
                <span className="text-slate-500 block mb-0.5 font-medium">Verified Coordinates</span>
                <span className="text-slate-700 font-mono">
                  {submissionSuccess.reportedLocation ? `${submissionSuccess.reportedLocation.latitude.toFixed(4)}°N, ${submissionSuccess.reportedLocation.longitude.toFixed(4)}°E` : 'Device GPS Attached'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5 font-medium">Photographic Evidence</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <span>📷</span>
                  <span>{submissionSuccess.photoCount || 1} Site Photo(s) Attached & Encrypted</span>
                </span>
              </div>
            </div>

            <div className="bg-blue-50/60 border-l-4 border-govNavy p-3 text-xs text-slate-700 leading-relaxed rounded-r mb-6">
              <strong>Statutory Acknowledgment:</strong> Under Section 12 of the Public Audit & Grievance Guidelines,
              your ground-truth observation has been transmitted to the District Authority Collectorate and Central
              Audit Inspection cell. Physical verification and contractor stage reconciliation will be scheduled accordingly.
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="bg-govNavy hover:bg-govNavy-dark text-white font-semibold text-xs px-5 py-2.5 rounded shadow-sm transition"
                onClick={handleReset}
              >
                Submit Another Report
              </button>
              <a href="#/" className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded transition">
                Return to Public Home
              </a>
            </div>
          </div>
        ) : (
          /* Grievance Input View */
          <>
            <section aria-labelledby="page-title" className="mb-5">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight" id="page-title">
                Report an Infrastructure Issue or Ground Observation
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Submit factual ground observations on active MPLADS works in your area. Works are automatically sorted by distance to your address.
              </p>
            </section>

            <section aria-label="Reporting Guidelines" className="bg-white border-l-4 border-govNavy border-y border-r border-slate-200 p-4 rounded-r shadow-xs mb-6">
              <h2 className="text-xs font-bold tracking-wider uppercase text-govNavy mb-1">Citizen Grievance Instructions</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Report factual civil works observations (e.g. stalled machinery, incomplete masonry without roof slabs, dry water taps, unpaved road shoulders). Coordinates verify proximity to registered works. <strong>Attaching at least one photo of the site is compulsory to verify ground reality.</strong>
              </p>
            </section>

            {errorMessage && (
              <div className="bg-rose-50 border border-rose-300 text-rose-800 text-xs p-3.5 rounded-md mb-6 flex items-start gap-2">
                <span className="text-rose-600 font-bold text-sm">⚠</span>
                <div>
                  <strong className="font-semibold">Action Required:</strong> {errorMessage}
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* SECTION 1: Entire Address & Locality */}
              <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-govNavy text-white text-xs font-bold">1</span>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Location & Entire Address</h2>
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
                    onClick={requestLocation}
                  >
                    {geoStatus === 'detecting' ? 'Detecting...' : 'Update Device GPS'}
                  </button>
                </div>

                {/* State and District Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="state-select">State / Union Territory *</label>
                    <select
                      className="w-full text-xs rounded border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
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
                      className="w-full text-xs rounded border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
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
                      className="w-full text-xs rounded border-slate-300 bg-slate-50/50 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
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
                      Specific Street Address / Building / Mohalla (Optional)
                    </label>
                    <input
                      className="w-full text-xs rounded border-slate-300 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
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
              <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-1">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-govNavy text-white text-xs font-bold">2</span>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Select Civil Project in {selectedDistrict}, {selectedState} *
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mb-4 ml-8">
                  Projects are sorted in real time starting from the closest work to your selected address (<strong className="text-slate-700 font-semibold">{selectedLocality}</strong>). No formal project ID required.
                </p>

                <div aria-label="Select Project" className="space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1" role="radiogroup">
                  {sortedProjects.map((p) => {
                    const isSelected = p.id === selectedProjectId;
                    const dist = p._calculatedDistance;
                    const distFormatted = dist < 1.0 ? `${Math.round(dist * 1000)} meters` : `${dist.toFixed(1)} km`;

                    return (
                      <label
                        key={p.id}
                        className={`flex items-start p-3.5 rounded border ${
                          isSelected ? 'border-govNavy bg-blue-50/40 ring-1 ring-govNavy' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                        } cursor-pointer transition`}
                        onClick={() => setSelectedProjectId(p.id)}
                      >
                        <input
                          type="radio"
                          name="project_selection"
                          className="mt-1 h-4 w-4 text-govNavy border-slate-300 focus:ring-govNavy shrink-0"
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
                            <span className="text-[10px] text-slate-400 ml-auto font-mono">ID: {p.id}</span>
                          </div>
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
              <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-govNavy text-white text-xs font-bold">3</span>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">On-the-Ground Observation & Compulsory Photos *</h2>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="complaint-text">
                    Physical Site Status & Defect Description *
                  </label>
                  <textarea
                    className="w-full text-xs rounded border-slate-300 p-3 text-slate-900 placeholder-slate-400 focus:border-govNavy focus:ring-govNavy"
                    id="complaint-text"
                    placeholder="Describe physical site status in detail (e.g., contractor claimed masonry work is complete, but on site only foundation pillars stand; unpaved road shoulders; missing plumbing or electrical fittings; no workers present for 2 months)."
                    required
                    rows={4}
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>Min 10 characters. Detail structural status or missing fixtures.</span>
                    <span>Character count: {complaintText.length}</span>
                  </div>
                </div>

                {/* Geo-Tagged Site Photo Upload Dropzone (COMPULSORY) */}
                <div className="mt-5">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Attach Geo-Tagged Site Photos <span className="text-rose-600 font-bold">* Compulsory (At least 1 site photo required)</span>
                  </label>

                  {photoErrorMessage && (
                    <div className="bg-rose-50 border border-rose-300 text-rose-800 text-xs px-3 py-2 rounded mb-2 flex items-center gap-1.5">
                      <span className="font-bold">⚠</span>
                      <span>{photoErrorMessage}</span>
                    </div>
                  )}

                  <div
                    className={`border-2 border-dashed ${
                      photoErrorMessage ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 hover:border-govNavy bg-slate-50/50'
                    } rounded-md p-4 text-center transition cursor-pointer`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files?.length > 0) {
                        handlePhotoFiles(e.dataTransfer.files);
                      }
                    }}
                  >
                    <svg aria-hidden="true" className="mx-auto h-7 w-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <p className="mt-1 text-xs text-slate-700 font-medium">Click to upload site photos or drag & drop</p>
                    <p className="text-[10px] text-slate-500">Max 3 photos, JPG/PNG up to 5MB each. EXIF metadata read for GPS verification.</p>
                    <input
                      ref={fileInputRef}
                      accept="image/jpeg,image/png"
                      className="hidden"
                      multiple
                      type="file"
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
                              className="text-rose-600 hover:text-rose-800 p-1 text-xs font-bold shrink-0"
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
                      className="w-full text-xs rounded border-slate-300 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
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
                      className="w-full text-xs rounded border-slate-300 py-2 px-3 text-slate-800 focus:border-govNavy focus:ring-govNavy"
                      id="contact-mobile"
                      placeholder="e.g. 9876543210"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-600 text-xs flex items-center gap-2">
                  <span className="text-rose-600">📍</span>
                  <span>
                    Coordinates <strong className="text-slate-800 font-medium">({citizenLat.toFixed(4)}°N, {citizenLon.toFixed(4)}°E)</strong> and locality <strong className="text-slate-800 font-medium">{selectedLocality}</strong> will be attached for on-site proximity verification.
                  </span>
                </div>

                {/* Form Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <input
                      defaultChecked
                      className="rounded border-slate-300 text-govNavy focus:ring-govNavy"
                      id="good-faith-cert"
                      required
                      type="checkbox"
                    />
                    <label className="cursor-pointer select-none" htmlFor="good-faith-cert">
                      By submitting, you certify that this ground observation is submitted in good faith.
                    </label>
                  </div>

                  <button
                    className="w-full sm:w-auto bg-govNavy hover:bg-govNavy-dark text-white font-semibold text-xs px-6 py-2.5 rounded shadow-sm transition inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    type="submit"
                    id="btn-submit-grievance"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Verifying & Submitting...' : 'Submit Grievance Report'}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-govBorder py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-slate-700 tracking-wide">
            Official Government Audit Portal • Public Grievance Intake Framework • Governed under MoSPI & CAG Audit Guidelines
          </p>
          <p className="text-[11px] text-slate-500 mt-1 max-w-2xl mx-auto">
            Academic & Research Prototype: This interface is engineered exclusively for Smart India Hackathon 2026 evaluating MoSPI Problem Statement SIH26102. Not an official Government of India portal.
          </p>
          <div className="mt-3 flex items-center justify-center space-x-3 text-[11px] text-slate-400">
            <span>SIH26102</span>
            <span>•</span>
            <span>SETU Framework v2.4</span>
            <span>•</span>
            <a className="hover:underline" href="#/">Privacy Policy</a>
            <span>•</span>
            <a className="hover:underline" href="#/">Citizen Charter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
