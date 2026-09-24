/**
 * Node.js test simulating browser runtime navigation across routes in SETU
 */
const fs = require('fs');
const path = require('path');

async function run() {
  console.log("=================================================================");
  console.log("SIMULATING SETU BROWSER RUNTIME MODULES & DOM RENDERING");
  console.log("=================================================================\n");

  // Load modules
  const tokens = await import('../frontend/src/theme/tokens.js');
  const loginData = await import('../frontend/src/pages/loginData.js');
  const landingData = await import('../frontend/src/pages/landingData.js');
  const dashboardData = await import('../frontend/src/pages/dashboardData.js');
  const projectDetailData = await import('../frontend/src/pages/projectDetailData.js');
  const citizenPortalData = await import('../frontend/src/pages/citizenPortalData.js');
  const layout = await import('../frontend/src/components/Layout.js');

  console.log("1. Testing Root Landing Page HTML generation...");
  const landingHtml = landingData.getLandingHtml();
  if (landingHtml && landingHtml.includes("PRAMAAN") && (landingHtml.includes("MPLADS") || landingHtml.includes("Citizen Portal"))) {
    console.log("  [PASS] Landing page HTML generated successfully (" + landingHtml.length + " chars)");
  } else {
    throw new Error("Failed to generate landing HTML");
  }

  console.log("\n2. Testing MP Office Dashboard HTML generation...");
  const mpDashboardHtml = dashboardData.getDashboardHtml(
    { role: 'MP Office', roleId: 'mp_office', accessScope: 'constituency_only', constituency: 'Chennai Central' }
  );
  if (mpDashboardHtml && mpDashboardHtml.includes("Constituency Schemes") || mpDashboardHtml.includes("Constituency Projects")) {
    console.log("  [PASS] Constituency MP Dashboard HTML generated (" + mpDashboardHtml.length + " chars)");
  } else {
    throw new Error("Failed to generate MP dashboard HTML");
  }

  console.log("\n3. Testing Nominated MP Dashboard HTML generation...");
  const nomDashboardHtml = dashboardData.getDashboardHtml(
    { role: 'MP Office', roleId: 'mp_office', mpType: 'NOMINATED_MP', accessScope: 'nominated_mp_districts', chosenDistricts: ['Chennai', 'Bengaluru Urban', 'Pune'] }
  );
  if (nomDashboardHtml && nomDashboardHtml.includes("Nominated Works Portfolio")) {
    console.log("  [PASS] Nominated MP Dashboard HTML generated (" + nomDashboardHtml.length + " chars)");
  } else {
    throw new Error("Failed to generate Nominated MP dashboard HTML");
  }

  console.log("\n4. Testing Layout Shell HTML generation...");
  const layoutHtml = layout.getLayoutHtml({
    projectName: 'SETU',
    role: 'MP Office',
    content: mpDashboardHtml
  });
  if (layoutHtml && layoutHtml.includes("My Projects") && layoutHtml.includes("Submit Proposal")) {
    console.log("  [PASS] Layout shell HTML generated with MP scoped sidebar (" + layoutHtml.length + " chars)");
  } else {
    throw new Error("Failed to generate Layout HTML");
  }

  console.log("\n5. Testing Project Detail HTML generation...");
  const detailHtml = projectDetailData.getProjectDetailHtml('PRJ-IND-2013', 'overview');
  if (detailHtml && detailHtml.includes("PRJ-IND-2013")) {
    console.log("  [PASS] Project Detail HTML generated (" + detailHtml.length + " chars)");
  } else {
    throw new Error("Failed to generate project detail HTML");
  }

  console.log("\n6. Testing Proposal Form HTML generation...");
  const propFormHtml = dashboardData.getProposalFormHtml();
  if (propFormHtml && propFormHtml.includes("Submit New Project Proposal")) {
    console.log("  [PASS] Proposal form HTML generated (" + propFormHtml.length + " chars)");
  } else {
    throw new Error("Failed to generate proposal form HTML");
  }

  console.log("\n=================================================================");
  console.log("ALL IN-BROWSER HTML & COMPONENT GENERATORS EXECUTED FLAWLESSLY!");
  console.log("=================================================================");
}

run().catch(err => {
  console.error("Simulation error:", err);
  process.exit(1);
});
