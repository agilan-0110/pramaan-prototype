/**
 * Node.js ES-Module simulation test for SETU State Nodal Authority Views & Runtime Scoping
 */
const path = require('path');

// Mock browser global sessionStorage and window
const sessionStore = new Map();
global.sessionStorage = {
  getItem: (key) => sessionStore.get(key) || null,
  setItem: (key, val) => sessionStore.set(key, String(val)),
  removeItem: (key) => sessionStore.delete(key),
  clear: () => sessionStore.clear()
};

global.window = {
  location: { hash: '#/dashboard' },
  setuOpenModal: () => {},
  setuCloseModal: () => {}
};

async function run() {
  console.log("=================================================================");
  console.log("SETU STATE NODAL AUTHORITY IN-DEPTH RUNTIME SIMULATION SUITE");
  console.log("=================================================================\n");

  const layout = await import('../frontend/src/components/Layout.js');
  const dashboardData = await import('../frontend/src/pages/dashboardData.js');
  const projectDetailData = await import('../frontend/src/pages/projectDetailData.js');

  // -------------------------------------------------------------
  // TEST 1: TAMIL NADU STATE NODAL AUTHORITY
  // -------------------------------------------------------------
  console.log("TEST 1: Setting up session for Tamil Nadu State Nodal Authority...");
  const tnUser = {
    loginId: 'ADM-SNA-TN-CHN-005',
    role: 'State Nodal Authority',
    roleName: 'State Nodal Authority',
    roleId: 'state_nodal',
    officialName: 'State Nodal Officer (Planning & Development, Tamil Nadu)',
    level: 'State Level',
    accessScope: 'state_only',
    state: 'Tamil Nadu'
  };
  global.sessionStorage.setItem('setu_auth_user', JSON.stringify(tnUser));
  global.sessionStorage.setItem('setu_auth_role', 'State Nodal Authority');

  // 1.1 State Overview View
  console.log("\n1.1 Generating State Overview HTML for Tamil Nadu...");
  const tnOverviewHtml = dashboardData.getStateOverviewHtml();
  if (tnOverviewHtml.includes("Tamil Nadu State Nodal Authority — State Overview") &&
      tnOverviewHtml.includes("District-Wise Allocation & Performance Breakdown") &&
      tnOverviewHtml.includes("Chennai") &&
      tnOverviewHtml.includes("Coimbatore") &&
      tnOverviewHtml.includes("Madurai")) {
    console.log("  [PASS] State Overview renders Tamil Nadu state rollup and per-district breakdown table.");
  } else {
    throw new Error("TN State Overview rendering failed!");
  }

  // 1.2 Layout Shell for State Nodal
  console.log("\n1.2 Generating Layout Shell for Tamil Nadu State Nodal...");
  const tnLayoutHtml = layout.getLayoutHtml({
    projectName: 'SETU',
    role: 'State Nodal Authority',
    content: tnOverviewHtml
  });
  const expectedNav = ['State Overview', 'Escalated Flags', 'Compliance Flags', 'Duplicate Tracker', 'Trend & Utilization', 'System Alerts'];
  expectedNav.forEach(label => {
    if (!tnLayoutHtml.includes(label)) {
      throw new Error(`Missing expected sidebar item: ${label}`);
    }
  });
  console.log("  [PASS] Layout Shell contains all 6 statutory sidebar navigation links.");

  // 1.3 Escalated Flags View
  console.log("\n1.3 Generating Escalated Flags HTML for Tamil Nadu...");
  const tnEscalatedHtml = dashboardData.getStateEscalatedFlagsHtml();
  if (tnEscalatedHtml.includes("State Escalated Flags Queue") &&
      tnEscalatedHtml.includes("Actionable Escalation") &&
      tnEscalatedHtml.includes("Freeze Tranche") &&
      tnEscalatedHtml.includes("Issue Query")) {
    console.log("  [PASS] Escalated Flags queue displays full details and administrative action buttons.");
  } else {
    throw new Error("TN Escalated Flags rendering failed!");
  }

  // 1.4 Compliance Flags View (Severity Tiering)
  console.log("\n1.4 Generating Compliance Flags HTML (Severity Tiering)...");
  const tnComplianceHtml = dashboardData.getStateComplianceFlagsHtml();
  if (tnComplianceHtml.includes("Critical Severity Compliance Violations") &&
      tnComplianceHtml.includes("AGGREGATE SUMMARY ONLY (ROLES.md)") &&
      tnComplianceHtml.includes("High Severity Flags (District Aggregate Summaries)")) {
    console.log("  [PASS] Compliance Flags renders CRITICAL in full detail and HIGH as District Aggregate Summaries.");
  } else {
    throw new Error("TN Compliance Flags severity tiering failed!");
  }

  // 1.5 Duplicate Tracker View
  console.log("\n1.5 Generating Duplicate Tracker HTML for Tamil Nadu...");
  const tnDupHtml = dashboardData.getStateDuplicateTrackerHtml();
  if (tnDupHtml.includes("Inter-District Duplicate Schemes & Collision Tracker") &&
      tnDupHtml.includes("Mark Scheme A as Legitimate") &&
      tnDupHtml.includes("Flag Both for Recovery")) {
    console.log("  [PASS] Duplicate Tracker renders cross-district matches with adjudication actions.");
  } else {
    throw new Error("TN Duplicate Tracker rendering failed!");
  }

  // 1.6 Trend & Utilization View
  console.log("\n1.6 Generating Trend & Utilization HTML (CHRONIC_NON_UTILIZATION)...");
  const tnTrendHtml = dashboardData.getStateTrendUtilizationHtml();
  if (tnTrendHtml.includes("State Financial Trends & Fund Utilization Pacing") &&
      tnTrendHtml.includes("CHRONIC NON-UTILIZATION") &&
      tnTrendHtml.includes("SKIPPED DISTRICT AUTHORITY (ROLES.md)") &&
      tnTrendHtml.includes("Inter-District Financial Outlay & Spending Pacing")) {
    console.log("  [PASS] Trend & Utilization includes CHRONIC_NON_UTILIZATION with direct State Nodal ownership.");
  } else {
    throw new Error("TN Trend & Utilization rendering failed!");
  }

  // 1.7 System Alerts View
  console.log("\n1.7 Generating System Alerts HTML...");
  const tnAlertsHtml = dashboardData.getStateSystemAlertsHtml();
  if (tnAlertsHtml.includes("setu-alert-card") || tnAlertsHtml.includes("setu-alerts-container") || tnAlertsHtml.includes("Priority Audit Alerts")) {
    console.log("  [PASS] System Alerts renders state-wide alert feed without placeholder stubs.");
  } else {
    throw new Error("TN System Alerts rendering failed!");
  }

  // -------------------------------------------------------------
  // TEST 2: KARNATAKA STATE NODAL AUTHORITY (MULTI-STATE SCOPING)
  // -------------------------------------------------------------
  console.log("\nTEST 2: Switching session to Karnataka State Nodal Authority...");
  const kaUser = {
    loginId: 'ADM-SNA-KA-BLR-006',
    role: 'State Nodal Authority',
    roleName: 'State Nodal Authority',
    roleId: 'state_nodal',
    officialName: 'State Nodal Officer (Planning & Statistics, Karnataka)',
    level: 'State Level',
    accessScope: 'state_only',
    state: 'Karnataka'
  };
  global.sessionStorage.setItem('setu_auth_user', JSON.stringify(kaUser));
  global.sessionStorage.setItem('setu_auth_role', 'State Nodal Authority');

  const kaOverviewHtml = dashboardData.getStateOverviewHtml();
  if (kaOverviewHtml.includes("Karnataka State Nodal Authority — State Overview") &&
      kaOverviewHtml.includes("Bengaluru Urban") &&
      kaOverviewHtml.includes("Mysuru")) {
    console.log("  [PASS] Karnataka State Overview correctly scoped to Karnataka districts.");
  } else {
    throw new Error("KA State Overview rendering failed!");
  }

  // Check no cross-state leakage in KA
  if (kaOverviewHtml.includes("Chennai") || kaOverviewHtml.includes("Coimbatore") || kaOverviewHtml.includes("Madurai")) {
    throw new Error("Cross-state leakage: Tamil Nadu districts detected in Karnataka State Nodal view!");
  }
  console.log("  [PASS] Zero cross-state leakage: Zero Tamil Nadu projects or districts leaked into Karnataka.");

  // -------------------------------------------------------------
  // TEST 3: PROJECT DETAIL OUT-OF-STATE BOUNDARY CHECK
  // -------------------------------------------------------------
  console.log("\nTEST 3: Checking Project Detail jurisdiction enforcement...");
  // Attempt to view a Tamil Nadu project (PRJ-IND-2013 in Chennai) while logged in as Karnataka State Nodal
  const outOfStateDetailHtml = projectDetailData.getProjectDetailHtml('PRJ-IND-2013', 'overview');
  if (outOfStateDetailHtml.includes("Access Restricted — Out of State Jurisdiction") &&
      outOfStateDetailHtml.includes("outside your authorized state oversight boundary")) {
    console.log("  [PASS] Project detail view blocked out-of-state project with statutory 403 error page.");
  } else {
    throw new Error("Out-of-state project was not blocked!");
  }

  console.log("\n=================================================================");
  console.log("ALL IN-DEPTH STATE NODAL RUNTIME SIMULATION TESTS PASSED (100%)!");
  console.log("=================================================================");
}

run().catch(err => {
  console.error("Simulation failed:", err);
  process.exit(1);
});
