import React, { useState, useEffect, useRef } from 'react';
import './ProjectDetail.css';
import { getProjectDetailHtml, getRiskExplanation, fetchLiveCitizenReports } from './projectDetailData.js';

export { getProjectDetailHtml, getRiskExplanation, fetchLiveCitizenReports };

/**
 * SETU Project Detail Component
 * 
 * Renders complete project details with strict RBAC:
 * - Oversight roles (MP, District, State, MoSPI, CAG): Full financial, compliance, citizen grievance, and risk tabs.
 * - Implementing Agency: Scoped execution workspace with Vendor provenance, progress updates, evidence uploads, and UC workflows. Redacts all risk/compliance/citizen alert data.
 */
export default function ProjectDetail({ projectId }) {
  const [activeTab, setActiveTab] = useState('overview');
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = getProjectDetailHtml(projectId, activeTab);

      const tabNav = containerRef.current.querySelector('#setu-detail-tab-nav');
      if (tabNav) {
        tabNav.querySelectorAll('.setu-tab-btn').forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const targetTab = btn.getAttribute('data-tab');
            if (targetTab && targetTab !== activeTab) {
              setActiveTab(targetTab);
              if (targetTab === 'citizen-reports') {
                await fetchLiveCitizenReports(projectId);
              }
            }
          });
        });
      }
    }
  }, [projectId, activeTab]);

  return <div ref={containerRef} />;
}
