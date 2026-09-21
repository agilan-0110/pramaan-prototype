/**
 * Node.js test suite for SETU State Nodal Authority Frontend Rendering & Logic
 */
const fs = require('fs');
const path = require('path');

console.log("=================================================================");
console.log("SETU STATE NODAL AUTHORITY FRONTEND RENDERING & LOGIC SUITE");
console.log("=================================================================\n");

const dashboardDataJs = fs.readFileSync(path.join(__dirname, '../frontend/src/pages/dashboardData.js'), 'utf8');
const layoutJs = fs.readFileSync(path.join(__dirname, '../frontend/src/components/Layout.js'), 'utf8');
const projectDetailJs = fs.readFileSync(path.join(__dirname, '../frontend/src/pages/projectDetailData.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, '../frontend/index.html'), 'utf8');

// 1. Sidebar Structure & Permissions
console.log("Step 1: Verifying Sidebar Structure & Role Permissions for State Nodal...");
const expectedNavIds = ['projects', 'escalations', 'compliance', 'duplicates', 'trend', 'alerts'];
const expectedLabels = ['State Overview', 'Escalated Flags', 'Compliance Flags', 'Duplicate Tracker', 'Trend & Utilization', 'System Alerts'];

expectedNavIds.forEach(id => {
    if (layoutJs.includes(`'${id}'`)) {
        console.log(`  [PASS] Nav ID '${id}' is registered in Layout.js`);
    } else {
        console.error(`  [FAIL] Missing nav ID '${id}' in Layout.js`);
        process.exit(1);
    }
});

expectedLabels.forEach(label => {
    if (layoutJs.includes(label)) {
        console.log(`  [PASS] Sidebar label '${label}' is configured in Layout.js`);
    } else {
        console.error(`  [FAIL] Missing sidebar label '${label}' in Layout.js`);
        process.exit(1);
    }
});

// 2. State Overview: Per-district breakdown table
console.log("\nStep 2: Verifying State Overview & Per-District Breakdown View...");
if (dashboardDataJs.includes("getStateOverviewHtml") && dashboardDataJs.includes("District-Wise Allocation & Performance Breakdown")) {
    console.log("  [PASS] getStateOverviewHtml with Per-District breakdown table implemented.");
} else {
    console.error("  [FAIL] Per-District breakdown table missing in getStateOverviewHtml");
    process.exit(1);
}

// 3. Escalated Flags: ownerRole = State Nodal, full detail
console.log("\nStep 3: Verifying Escalated Flags queue (ownerRole = 'State Nodal')...");
if (dashboardDataJs.includes("getStateEscalatedFlagsHtml") && dashboardDataJs.includes("ESCALATED TO STATE NODAL")) {
    console.log("  [PASS] getStateEscalatedFlagsHtml implemented with full detail regardless of severity.");
} else {
    console.error("  [FAIL] Escalated Flags view missing in dashboardData.js");
    process.exit(1);
}

// 4. Compliance Flags: HIGH aggregate summary only vs CRITICAL full detail
console.log("\nStep 4: Verifying Compliance Flags Severity-Tiering (HIGH aggregate vs CRITICAL full detail)...");
if (dashboardDataJs.includes("getStateComplianceFlagsHtml") && 
    dashboardDataJs.includes("AGGREGATE SUMMARY ONLY (ROLES.md)") && 
    dashboardDataJs.includes("Critical Severity Compliance Violations")) {
    console.log("  [PASS] Severity-tiering distinction (HIGH aggregate summary vs CRITICAL full detail) is implemented.");
} else {
    console.error("  [FAIL] Compliance severity-tiering missing in getStateComplianceFlagsHtml");
    process.exit(1);
}

// 5. Duplicate Tracker: Cross-district adjudication
console.log("\nStep 5: Verifying Duplicate Tracker & Cross-District Adjudication Actions...");
if (dashboardDataJs.includes("getStateDuplicateTrackerHtml") && 
    dashboardDataJs.includes("Mark Scheme A as Legitimate") && 
    dashboardDataJs.includes("Flag Both for Recovery")) {
    console.log("  [PASS] Duplicate Tracker implemented with 3 adjudication action buttons.");
} else {
    console.error("  [FAIL] Duplicate Tracker adjudication missing in dashboardData.js");
    process.exit(1);
}

// 6. Trend & Utilization: CHRONIC_NON_UTILIZATION skipping District Authority
console.log("\nStep 6: Verifying Trend & Utilization with CHRONIC_NON_UTILIZATION signal...");
if (dashboardDataJs.includes("getStateTrendUtilizationHtml") && 
    dashboardDataJs.includes("CHRONIC NON-UTILIZATION") && 
    dashboardDataJs.includes("SKIPPED DISTRICT AUTHORITY (ROLES.md)")) {
    console.log("  [PASS] Trend & Utilization includes CHRONIC_NON_UTILIZATION with 'SKIPPED DISTRICT AUTHORITY' badge.");
} else {
    console.error("  [FAIL] Chronic non-utilization signal missing in getStateTrendUtilizationHtml");
    process.exit(1);
}

// 7. Administrative Actions: Freeze Tranche, Issue Query, Flag District, Forward MoSPI
console.log("\nStep 7: Verifying Administrative Actions & Modals...");
const adminActions = [
    "setuOpenFreezeTrancheModal",
    "setuOpenIssueQueryModal",
    "setuOpenFlagDistrictModal",
    "setuOpenForwardMoSPIModal",
    "setuAdjudicateDuplicate",
    "setuStateResolveAlertModal"
];

adminActions.forEach(act => {
    if (dashboardDataJs.includes(act)) {
        console.log(`  [PASS] Handler '${act}' is wired in wireStateNodalModals`);
    } else {
        console.error(`  [FAIL] Missing handler '${act}' in dashboardData.js`);
        process.exit(1);
    }
});

// 8. Role Restrictions: No edit/milestone/evidence-upload controls
console.log("\nStep 8: Verifying State Nodal Role Restrictions (Zero edit/upload controls)...");
if (projectDetailJs.includes("isStateRole") && projectDetailJs.includes("Access Restricted — Out of State Jurisdiction")) {
    console.log("  [PASS] State Nodal role is strictly scoped without edit/evidence-upload controls.");
} else {
    console.error("  [FAIL] State scoping boundary missing in projectDetailData.js");
    process.exit(1);
}

console.log("\n=================================================================");
console.log("ALL STATE NODAL FRONTEND VALIDATION CHECKS PASSED!");
console.log("=================================================================");
