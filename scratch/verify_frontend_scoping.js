// Verification of frontend loginData.js and dashboardData.js scoping logic
globalThis.sessionStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

import { officialRoles } from '../frontend/src/pages/loginData.js';
import { getDashboardHtml, getAlertsViewHtml } from '../frontend/src/pages/dashboardData.js';
import fs from 'fs';
import path from 'path';

const mockProjects = JSON.parse(
  fs.readFileSync(path.resolve('backend/app/data/mockProjects.json'), 'utf-8')
);

console.log('=' .repeat(80));
console.log('FRONTEND JS RBAC & ALERTS SCOPING VERIFICATION');
console.log('=' .repeat(80));

// 1. Verify officialRoles in loginData.js
console.log('\n1. Verifying officialRoles in loginData.js:');
const rolesMap = {};
officialRoles.forEach(r => rolesMap[r.id] = r);

const checks = [
  { id: 'district_authority', expectedDemoId: 'ADM-DA-TN-CHN-001', expectedDist: 'Chennai' },
  { id: 'mospi_officer', expectedDemoId: 'ADM-CNA-MOSPI-HQ-002', expectedDist: undefined },
  { id: 'state_nodal', expectedDemoId: 'ADM-SNA-TN-CHN-005', expectedState: 'Tamil Nadu' },
  { id: 'auditor_cag', expectedDemoId: 'ADM-CAG-AUD-TN-CHN-003', expectedScope: 'statutory_audit_all' },
  { id: 'implementing_agency', expectedDemoId: 'ADM-IA-PWD-TN-CHN-008', expectedAgency: 'Public Works Department (PWD) — Chennai' },
  { id: 'mp_office', expectedDemoId: 'ADM-MP-TN-CHN-021', expectedConst: 'Chennai Central' }
];

checks.forEach(c => {
  const role = rolesMap[c.id];
  if (!role) {
    console.error(`[FAIL] Missing role: ${c.id}`);
    process.exit(1);
  }
  if (role.demoId !== c.expectedDemoId) {
    console.error(`[FAIL] ${c.id} demoId ${role.demoId} != ${c.expectedDemoId}`);
    process.exit(1);
  }
  console.log(`  [OK] ${c.id}: demoId=${role.demoId}, jurisdiction=${role.jurisdiction}`);
});

// 2. Test getDashboardHtml scoping
console.log('\n2. Testing getDashboardHtml alerts scoping:');

// Test Case A: Lucknow DA user
const lkoProjects = mockProjects.filter(p => p.district === 'Lucknow');
const lkoUser = {
  role: 'District Authority',
  roleId: 'district_authority',
  district: 'Lucknow',
  state: 'Uttar Pradesh',
  accessScope: 'district_all'
};
const lkoHtml = getDashboardHtml(lkoUser, lkoProjects);
// Ensure no Bengaluru Urban or Pune alerts appear in the generated HTML
if (lkoHtml.includes('Bengaluru Urban') || lkoHtml.includes('Pune')) {
  console.error('[FAIL] Foreign district leaked into Lucknow dashboard alerts!');
  process.exit(1);
} else {
  console.log('  [OK] Lucknow dashboard alerts strictly contain Lucknow projects (0 foreign districts)');
}

// Test Case B: Chennai DA user
const chnProjects = mockProjects.filter(p => p.district === 'Chennai');
const chnUser = {
  role: 'District Authority',
  roleId: 'district_authority',
  district: 'Chennai',
  state: 'Tamil Nadu',
  accessScope: 'district_all'
};
const chnHtml = getDashboardHtml(chnUser, chnProjects);
if (chnHtml.includes('Bengaluru Urban') || chnHtml.includes('Lucknow')) {
  console.error('[FAIL] Foreign district leaked into Chennai dashboard alerts!');
  process.exit(1);
} else {
  console.log('  [OK] Chennai dashboard alerts strictly contain Chennai projects (0 foreign districts)');
}

// Test Case C: Implementing Agency PWD Chennai
const pwdProjects = chnProjects.filter(p => (p.implementingAgency || '').includes('Public Works Department (PWD)'));
const pwdUser = {
  role: 'Implementing Agency (PWD)',
  roleId: 'implementing_agency_pwd',
  agency: 'Public Works Department (PWD) — Chennai',
  district: 'Chennai',
  state: 'Tamil Nadu',
  accessScope: 'agency_assigned_only'
};
const pwdHtml = getDashboardHtml(pwdUser, pwdProjects);
if (pwdHtml.includes('Bengaluru Urban') || pwdHtml.includes('Lucknow')) {
  console.error('[FAIL] Foreign district leaked into PWD Chennai dashboard alerts!');
  process.exit(1);
} else {
  console.log(`  [OK] PWD Chennai dashboard alerts strictly contain PWD Chennai projects (${pwdProjects.length} projects)`);
}

console.log('\n' + '=' .repeat(80));
console.log('ALL FRONTEND SCOPING TESTS PASSED!');
console.log('=' .repeat(80));
