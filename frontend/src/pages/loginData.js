/**
 * Official Login Roles & Verified Credentials
 * 
 * Conforms to ROLES.md & mockCredentials.json (6 statutory roles):
 * - Central Nodal Agency (MoSPI)
 * - Auditor / CAG
 * - State Nodal Authority
 * - District Authority
 * - Implementing Agency
 * - MP Office
 */

export const officialRoles = [
  {
    id: 'district_authority',
    name: 'District Authority',
    level: 'District Level',
    description: 'Proposal approvals, milestone monitoring, and district compliance in Chennai.',
    demoId: 'ADM-DA-TN-CHN-001',
    demoPassword: 'DistAdmin#Pass2026',
    jurisdiction: 'District Collectorate, Rajaji Salai, Chennai (Tamil Nadu)',
    scope: 'district_all',
    district: 'Chennai',
    state: 'Tamil Nadu',
  },
  {
    id: 'mospi_officer',
    name: 'Central Nodal Agency (MoSPI)',
    level: 'National Oversight',
    description: 'Apex fund-flow authority under MPLADS — monitors national implementation, reviews predictive risk insights, and issues directives across states.',
    demoId: 'ADM-CNA-MOSPI-HQ-002',
    demoPassword: 'CentralApex#Pass2026',
    jurisdiction: 'Ministry of Statistics & Programme Implementation, Sardar Patel Bhawan, New Delhi',
    scope: 'national_all',
  },
  {
    id: 'state_nodal',
    name: 'State Nodal Authority',
    level: 'State Level',
    description: 'Cross-district aggregation, duplicate tracking, and MoSPI reporting for Tamil Nadu.',
    demoId: 'ADM-SNA-TN-CHN-005',
    demoPassword: 'StateNodal#Pass2026',
    jurisdiction: 'Planning, Development and Special Initiatives Department, Chennai (Tamil Nadu)',
    scope: 'state_rollup',
    state: 'Tamil Nadu',
  },
  {
    id: 'auditor_cag',
    name: 'Auditor / CAG',
    level: 'Statutory Audit',
    description: 'Statutory audit trails and cross-regional compliance inspection.',
    demoId: 'ADM-CAG-AUD-TN-CHN-003',
    demoPassword: 'CAGAudit#Pass2026',
    jurisdiction: 'Office of the Principal Accountant General (Audit-I), Chennai (Tamil Nadu)',
    scope: 'statutory_audit_all',
  },
  {
    id: 'implementing_agency',
    name: 'Implementing Agency',
    level: 'Execution Agency',
    description: 'Work progress submissions and vendor evidence uploads for Chennai works.',
    demoId: 'ADM-IA-PWD-TN-CHN-008',
    demoPassword: 'PWDWorks#Pass2026',
    jurisdiction: 'Public Works Department, Chepauk, Chennai (Tamil Nadu)',
    scope: 'agency_assigned_only',
    agency: 'Public Works Department (PWD) — Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
  },
  {
    id: 'mp_office',
    name: 'MP Office',
    level: 'Constituency Level',
    description: 'Constituency project tracking and proposal submission for Chennai Central.',
    demoId: 'ADM-MP-TN-CHN-021',
    demoPassword: 'MPOffice#Pass2026',
    jurisdiction: 'Chennai Central Parliamentary Constituency (Tamil Nadu)',
    scope: 'constituency_only',
    constituency: 'Chennai Central',
    district: 'Chennai',
    state: 'Tamil Nadu',
  },
];

/**
 * Authenticates credentials via POST /auth/login with bcrypt validation and returns a signed JWT.
 * 
 * @param {Object} credentials { username, password, roleId }
 * @returns {Promise<{ success: boolean, token?: string, role?: string, user?: Object, error?: string }>}
 */
export async function authenticateOfficial({ username, password, roleId }) {
  const role = officialRoles.find((r) => r.id === roleId);

  if (!username || !password) {
    return { success: false, error: 'Please enter both Official ID and Password.' };
  }

  // Attempt real POST /auth/login against backend API
  const endpoints = ['http://127.0.0.1:8000/auth/login', '/auth/login'];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          role: role ? role.name : undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token || data.token;
        const officialRole = data.role || (role ? role.name : 'District Authority');

        // Store JWT token and session user metadata
        sessionStorage.setItem('setu_auth_token', token);
        sessionStorage.setItem('setu_auth_role', officialRole);
        sessionStorage.setItem('setu_auth_user', JSON.stringify(data));

        return {
          success: true,
          token,
          role: officialRole,
          user: data,
        };
      } else {
        const errData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errData.detail || 'Authentication failed: Invalid credentials.',
        };
      }
    } catch {
      // Try next endpoint or fallback
    }
  }

  return {
    success: false,
    error: 'Authentication failed: Unable to connect to SETU authentication service.',
  };
}
