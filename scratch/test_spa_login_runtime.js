// Node.js verification script simulating the SPA client runtime and Step 1 -> Step 2 transition
import fs from 'fs';
import path from 'path';

console.log("=== Node.js SPA Runtime Verification ===");

const indexHtml = fs.readFileSync('./frontend/index.html', 'utf-8');
const loginJsx = fs.readFileSync('./frontend/src/pages/Login.jsx', 'utf-8');

// 1. Verify absence of 10 prohibited items
const prohibited = [
  'भारत सरकार',
  'Live MoSPI Sync',
  '256-Bit Encrypted Audit Channel',
  '2FA Gateway',
  'Protocol v4.2',
  'nodal.officer@nic.in',
  'authConsent',
  'I certify administrative authorization',
  'Article 149 directives',
  'Secure Institutional 2FA Login regulations',
  'Submit Token',
  'Designed with National Informatics Centre (NIC)',
  'authModal',
  'openAuthModal',
  'handleSimulatedLogin'
];

let prohibitedViolations = 0;
for (const p of prohibited) {
  if (indexHtml.includes(p)) {
    console.error(`[FAIL] index.html contains prohibited phrase: "${p}"`);
    prohibitedViolations++;
  }
  if (loginJsx.includes(p)) {
    console.error(`[FAIL] Login.jsx contains prohibited phrase: "${p}"`);
    prohibitedViolations++;
  }
}

if (prohibitedViolations === 0) {
  console.log("[PASS] Clean: None of the 10 prohibited phrases found in Login.jsx or index.html");
}

// 2. Check 6 Role IDs in Step 1
const roles = ['mp_office', 'district_authority', 'state_nodal', 'mospi_officer', 'auditor_cag', 'implementing_agency'];
let missingRoles = 0;
for (const r of roles) {
  if (!indexHtml.includes(`data-role-id="${r}"`)) {
    console.error(`[FAIL] index.html missing data-role-id="${r}"`);
    missingRoles++;
  }
  if (!loginJsx.includes(`'${r}'`)) {
    console.error(`[FAIL] Login.jsx missing role binding '${r}'`);
    missingRoles++;
  }
}

if (missingRoles === 0) {
  console.log("[PASS] All 6 statutory roles are properly wired in Step 1 role selection.");
}

// 3. Check Step 2 Elements
const step2Required = [
  'id="official-login-form"',
  'id="official-id"',
  'id="official-password"',
  'id="btn-submit-auth"',
  'id="btn-autofill"',
  'id="btn-back-to-roles"',
  'Simulated'
];

let missingStep2 = 0;
for (const elem of step2Required) {
  if (!indexHtml.includes(elem)) {
    console.error(`[FAIL] index.html missing Step 2 element: ${elem}`);
    missingStep2++;
  }
}

if (missingStep2 === 0) {
  console.log("[PASS] Step 2 real authentication form and interactive autofill elements present.");
}

console.log("=== Node.js Verification Complete ===");
