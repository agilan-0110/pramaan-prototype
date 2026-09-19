/**
 * Static dummy data conforming to API_CONTRACT.md fields:
 * id, name, district, state, category, status, riskScore, contradictionFlag, vendorName, implementingAgency
 */

export const summaryStats = [
  { label: 'Total Projects', value: '1,284', meta: 'All active jurisdictions', isAccent: false },
  { label: 'High Risk Count', value: '42', meta: 'Immediate audit review required', isAccent: true },
  { label: 'Compliance Violations', value: '19', meta: 'Fund-splitting & milestone lag', isAccent: false },
  { label: 'Pending Alerts', value: '8', meta: 'Awaiting authority response', isAccent: false },
];

export const dummyProjects = [
  {
    id: 'PRJ-2026-0814',
    name: 'District Secondary Hospital Annex Construction',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Health',
    status: 'Under Review',
    riskScore: 84,
    contradictionFlag: true,
    vendorName: 'Apex Infrastructure Pvt Ltd',
    implementingAgency: 'PWD',
  },
  {
    id: 'PRJ-2026-0422',
    name: 'Rural Piped Drinking Water Supply Phase-II',
    district: 'Patna',
    state: 'Bihar',
    category: 'Water',
    status: 'In Progress',
    riskScore: 42,
    contradictionFlag: false,
    vendorName: 'Jal Seva Projects Ltd',
    implementingAgency: 'Water Resources',
  },
  {
    id: 'PRJ-2026-0199',
    name: 'Smart Classrooms Infrastructure Upgradation',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    category: 'Education',
    status: 'Completed',
    riskScore: 18,
    contradictionFlag: false,
    vendorName: 'Shiksha Digital Solutions',
    implementingAgency: 'Education Dept',
  },
  {
    id: 'PRJ-2026-0905',
    name: 'Urban Stormwater Drainage Network Rehabilitation',
    district: 'Ranchi',
    state: 'Jharkhand',
    category: 'Municipal',
    status: 'Flagged for Audit',
    riskScore: 78,
    contradictionFlag: true,
    vendorName: 'Urban Civil Works Corp',
    implementingAgency: 'Municipal',
  },
];

/**
 * Returns HTML string representation of the Dashboard for vanilla layout embedding.
 */
export function getDashboardHtml() {
  const statsHtml = summaryStats
    .map(
      (stat) => `
      <div class="setu-card">
        <span class="setu-card-label">${stat.label}</span>
        <span class="setu-card-value ${stat.isAccent ? 'setu-card-value-accent' : ''}">${stat.value}</span>
        <span class="setu-card-meta">${stat.meta}</span>
      </div>`
    )
    .join('');

  const rowsHtml = dummyProjects
    .map((p) => {
      const isHighRisk = p.riskScore >= 70;
      const badgeClass = isHighRisk ? 'setu-badge-risk-high' : 'setu-badge-risk-neutral';
      const riskLevel = isHighRisk ? 'HIGH' : p.riskScore >= 35 ? 'MED' : 'LOW';

      return `
      <tr>
        <td>
          <div class="setu-project-name">${p.name}</div>
          <div class="setu-project-id">${p.id}</div>
        </td>
        <td>${p.district}</td>
        <td>${p.category}</td>
        <td><span class="setu-status-tag">${p.status}</span></td>
        <td>
          <span class="setu-badge ${badgeClass}">
            ${p.riskScore} (${riskLevel})
          </span>
        </td>
      </tr>`;
    })
    .join('');

  return `
    <div class="setu-dashboard">
      <div class="setu-page-header">
        <h1 class="setu-page-title">Projects Audit Dashboard</h1>
        <p class="setu-page-desc">National Monitoring & Risk Engine Overview</p>
      </div>

      <div class="setu-stat-grid">
        ${statsHtml}
      </div>

      <div class="setu-table-card">
        <div class="setu-table-card-header">
          <div>
            <h2 class="setu-table-title">Audited Projects</h2>
            <span class="setu-table-subtitle">Recent priority projects flagged by Risk & Contradiction engines</span>
          </div>
        </div>
        <div class="setu-table-container">
          <table class="setu-table">
            <thead>
              <tr>
                <th>Project Name & ID</th>
                <th>District</th>
                <th>Category</th>
                <th>Status</th>
                <th>Risk Score</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
