import { getDashboardHtml } from 'file:///c:/Workspace/AI-Projects/SETU/frontend/src/pages/dashboardData.js';

console.log('=== VERIFYING FRONTEND TIERED ALERTS ACROSS ALL 6 ROLES ===\n');

// Mock projects
const mockProjects = [
  {
    id: 'PRJ-IND-TN-104',
    name: 'Reconstruction of Heavy-Duty Reinforced Stormwater Trunk Drain, Chepauk, Chennai',
    category: 'Road',
    location: 'Chepauk, Chennai Central',
    district: 'Chennai',
    constituency: 'Chennai Central',
    implementingAgency: 'Public Works Department (PWD) — Chennai',
    sanctionedAmount: 18000000,
    expenditure: 14000000,
    physicalProgress: 45,
    status: 'In Progress',
    riskScore: 78,
    riskLevel: 'HIGH',
    hasCitizenReport: true
  },
  {
    id: 'PRJ-IND-TN-106',
    name: 'Installation of Skywalk Footbridge with Automated Elevators at Central Railway Interchange, Chennai',
    category: 'Road',
    location: 'Central Railway Interchange, Chennai',
    district: 'Chennai',
    constituency: 'Chennai Central',
    implementingAgency: 'Public Works Department (PWD) — Chennai',
    sanctionedAmount: 12000000,
    expenditure: 11500000,
    physicalProgress: 100,
    status: 'Completed',
    riskScore: 24,
    riskLevel: 'LOW'
  }
];

// 1. MP Office Verification
console.log('--- 1. MP Office Dashboard ---');
const mpUser = {
  role: 'MP Office',
  roleId: 'mp_office',
  accessScope: 'constituency_only',
  constituency: 'Chennai Central',
  district: 'Chennai',
  state: 'Tamil Nadu'
};
const mpHtml = getDashboardHtml(mpUser, mockProjects);

console.log('MP Office: Shows "Under Review" passive badge:', mpHtml.includes('Under Review'));
console.log('MP Office: Does NOT leak "Recommended Auditor Action":', !mpHtml.includes('Recommended Auditor Action'));
console.log('MP Office: Does NOT leak "CRITICAL":', !mpHtml.includes('badge-critical') && !mpHtml.includes('severity: CRITICAL'));
console.log('MP Office: Does not leak raw alert titles:', !mpHtml.includes('Severe Fund Splitting Anomaly'));

// 2. Implementing Agency Verification
console.log('\n--- 2. Implementing Agency Dashboard ---');
const iaUser = {
  role: 'Implementing Agency (PWD)',
  roleId: 'implementing_agency_pwd',
  accessScope: 'agency_assigned_only',
  agency: 'Public Works Department (PWD) — Chennai',
  district: 'Chennai',
  state: 'Tamil Nadu'
};
const iaHtml = getDashboardHtml(iaUser, mockProjects);

console.log('Agency: Excluded notice present:', iaHtml.includes('Line Agency Execution Space'));
console.log('Agency: Shows Physical Milestone Progress column instead of Risk Score:', iaHtml.includes('Physical Milestone Progress') && !iaHtml.includes('<th>Risk Score</th>'));
console.log('Agency: Pending Alerts count is 0:', iaHtml.includes('Pending Alerts</span>') && iaHtml.includes('<span class="setu-card-value ">0</span>'));

// 3. State Nodal Verification (Aggregate Cards Rendering)
console.log('\n--- 3. State Nodal Dashboard ---');
const snaUser = {
  role: 'State Nodal Authority',
  roleId: 'state_nodal',
  accessScope: 'state_rollup',
  state: 'Tamil Nadu'
};
const snaHtml = getDashboardHtml(snaUser, mockProjects);

console.log('State Nodal: State Oversight alerts header:', snaHtml.includes('State Oversight Alerts & District Aggregates'));
console.log('State Nodal: Audited Projects table rendered:', snaHtml.includes('Audited Projects'));

// 4. District Authority Verification
console.log('\n--- 4. District Authority Dashboard ---');
const daUser = {
  role: 'District Authority',
  roleId: 'district_authority',
  accessScope: 'district_all',
  district: 'Chennai',
  state: 'Tamil Nadu'
};
const daHtml = getDashboardHtml(daUser, mockProjects);
console.log('District Authority: Audited Projects table rendered:', daHtml.includes('Audited Projects'));

// 5. Central Nodal / MoSPI Verification
console.log('\n--- 5. MoSPI Dashboard ---');
const mospiUser = {
  role: 'Central Nodal Agency (MoSPI)',
  roleId: 'mospi_officer',
  accessScope: 'national_all'
};
const mospiHtml = getDashboardHtml(mospiUser, mockProjects);
console.log('MoSPI: Apex Critical stream title rendered:', mospiHtml.includes('National Apex Critical Alerts & Interventions'));
console.log('MoSPI: Apex Critical Stream badge:', mospiHtml.includes('Apex Critical Stream'));

// 6. Auditor / CAG Verification
console.log('\n--- 6. Auditor / CAG Dashboard ---');
const cagUser = {
  role: 'Auditor / CAG',
  roleId: 'auditor_cag',
  accessScope: 'statutory_audit_all'
};
const cagHtml = getDashboardHtml(cagUser, mockProjects);
console.log('Auditor / CAG: Audited Projects header rendered:', cagHtml.includes('Audited Projects'));
console.log('Auditor / CAG: Discrepancies header rendered:', cagHtml.includes('High-Priority Audit Alerts & Discrepancies'));

console.log('\nALL FRONTEND ROLE CHECKS COMPLETED!');
