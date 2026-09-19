/**
 * Official Login Roles & Demo Credentials
 * 
 * Conforms to ROLES.md (6 official roles excluding Citizen):
 * - MP Office
 * - District Authority
 * - State Nodal Authority
 * - Central Nodal Agency (MoSPI)
 * - Implementing Agency
 * - Auditor / CAG
 * 
 * Concise single-line descriptions tailored for dense government portal layout.
 * Demo credentials use fictional IDs tied to Tamil Nadu administrative places.
 */

export const officialRoles = [
  {
    id: 'mp_office',
    name: 'MP Office',
    level: 'Constituency Level',
    description: 'Constituency project tracking and proposal submission.',
    demoId: 'MP-CHE-SOUTH',
    demoPassword: 'demo123',
    jurisdiction: 'Chennai South Constituency',
  },
  {
    id: 'district_authority',
    name: 'District Authority',
    level: 'District Level',
    description: 'Proposal approvals, milestone monitoring, and district compliance.',
    demoId: 'DIST-MDU-001',
    demoPassword: 'demo123',
    jurisdiction: 'Madurai District Administration',
  },
  {
    id: 'state_nodal',
    name: 'State Nodal Authority',
    level: 'State Level',
    description: 'Cross-district aggregation, duplicate tracking, and MoSPI reporting.',
    demoId: 'SNA-TN-04',
    demoPassword: 'demo123',
    jurisdiction: 'Tamil Nadu State Nodal Office',
  },
  {
    id: 'mospi_officer',
    name: 'Central Nodal Agency (MoSPI)',
    level: 'National Oversight',
    description: 'Apex fund-flow authority under MPLADS — monitors national implementation, reviews predictive risk insights, and issues directives across states.',
    demoId: 'MOSPI-SZ-CHN',
    demoPassword: 'demo123',
    jurisdiction: 'MoSPI Southern Zonal Cell',
  },
  {
    id: 'implementing_agency',
    name: 'Implementing Agency',
    level: 'Execution Agency',
    description: 'Work progress submissions and vendor evidence uploads.',
    demoId: 'PWD-CBE-DIV2',
    demoPassword: 'demo123',
    jurisdiction: 'Coimbatore PWD Division 2',
  },
  {
    id: 'auditor_cag',
    name: 'Auditor / CAG',
    level: 'Statutory Audit',
    description: 'Statutory audit trails and cross-regional compliance inspection.',
    demoId: 'CAG-SZ-TRICHY',
    demoPassword: 'demo123',
    jurisdiction: 'CAG Southern Zonal Cell, Tiruchirappalli',
  },
];

/**
 * Handles simulated authentication submission to POST /auth/login.
 * 
 * @param {Object} credentials { username, password, roleId }
 * @returns {Promise<{ success: boolean, token?: string, role?: string, error?: string }>}
 */
export async function authenticateOfficial({ username, password, roleId }) {
  const role = officialRoles.find((r) => r.id === roleId);

  // Attempt real POST /auth/login if backend is available
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role: role ? role.name : roleId }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, token: data.token, role: role ? role.name : 'Official' };
    }
  } catch {
    // Backend not running/ready: Fallback to mock verification
  }

  // Simulated stub authentication verification per AGENTS.md
  if (!username || !password) {
    return { success: false, error: 'Please enter both Official ID and Password.' };
  }

  // Accept valid demo credentials or generic demo123 password
  if (password === 'demo123') {
    const roleName = role ? role.name : 'District Authority';
    const mockToken = `mock-jwt-token-${roleId}-${Date.now()}`;
    return {
      success: true,
      token: mockToken,
      role: roleName,
    };
  }

  return {
    success: false,
    error: 'Authentication failed. Invalid Official ID or password. Use demo credentials shown below.',
  };
}
