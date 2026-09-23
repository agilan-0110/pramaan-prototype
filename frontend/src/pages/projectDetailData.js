/**
 * SETU Project Detail Data Layer
 * 
 * Wired directly to:
 * - /backend/app/data/mockProjects.json
 * - /backend/app/data/mockComplaints.json
 */

const FALLBACK_PROJECTS = [
  {
    "id": "PRJ-IND-2013",
    "name": "Establishment of Interactive STEM Robotic Lab in Higher Secondary School, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai Central",
    "mpName": "Thiru Dayanidhi Maran (Fictional)",
    "mpId": "MP-LS-TN-CHN-C",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction \u2014 Chennai",
    "vendorName": "Mahanadi Paved Roads Ltd (Fictional)",
    "sanctionedAmount": 8300000,
    "expenditure": 5229000,
    "physicalProgress": 57,
    "financialProgress": 63.0,
    "status": "In Progress",
    "riskScore": 47,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-011",
    "financialYear": "2024-25",
    "dateSpent": "2024-08-08",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2024-06-15",
        "amount": 2353050,
        "percentage": 45.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2024-08-08",
        "amount": 2875950,
        "percentage": 55.0,
        "quarter": "Q2",
        "isFinalSixWeeks": false
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0947,
      "longitude": 80.2767
    },
    "latitude": 13.0947,
    "longitude": 80.2767,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-2013-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Establishment of Interactive STEM Robotic Lab in Higher Secondary School, Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Mahanadi Paved Roads Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Mahanadi Paved Roads Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-2013-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Mahanadi Paved Roads Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Mahanadi Paved Roads Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-08-08",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Department of Public Instruction \u2014 Chennai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 57,
        "financialProgress": 63.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Department of Public Instruction \u2014 Chennai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-2014",
    "name": "Multi-Village Piped Drinking Water Supply Grid with Automated Flow Meters, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai South",
    "mpName": "Dr. Thamizhachi Thangapandian (Fictional)",
    "mpId": "MP-LS-TN-CHN-S",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board \u2014 Chennai",
    "vendorName": "Gandak Bridges & Culverts (Fictional)",
    "sanctionedAmount": 7100000,
    "expenditure": 5041000,
    "physicalProgress": 23,
    "financialProgress": 71.0,
    "status": "Delayed",
    "riskScore": 85,
    "riskLevel": "HIGH",
    "daysDelayed": 139,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "vendorId": "VND-006",
    "financialYear": "2025-26",
    "dateSpent": "2026-02-21",
    "quarterSpent": "Q4",
    "fundDumpingFlag": true,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-08-12",
        "amount": 804904,
        "percentage": 16.0,
        "quarter": "Q2"
      },
      {
        "tranche": "T2",
        "date": "2026-02-21",
        "amount": 4236096,
        "percentage": 84.0,
        "quarter": "Q4",
        "isFinalSixWeeks": true
      }
    ],
    "siteCoordinates": {
      "latitude": 13.1157,
      "longitude": 80.3097
    },
    "latitude": 13.1157,
    "longitude": 80.3097,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-2014-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Multi-Village Piped Drinking Water Supply Grid with Automated Flow Meters, Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Gandak Bridges & Culverts (Fictional)",
        "sourceTag": "Received from Vendor: Gandak Bridges & Culverts (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2026-02-21",
        "physicalProgress": 23,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Rural Water Supply & Sanitation Board \u2014 Chennai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-2015",
    "name": "Construction of Covered Reinforced Concrete Stormwater Outfall Drain, Madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "constituency": "Madurai",
    "mpName": "Shri Arvindan Namboodiri (Fictional)",
    "mpId": "MP-LS-108",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority \u2014 Madurai",
    "vendorName": "Coromandel Educational Equipments (Fictional)",
    "sanctionedAmount": 9300000,
    "expenditure": 5766000,
    "physicalProgress": 65,
    "financialProgress": 62.0,
    "status": "In Progress",
    "riskScore": 10,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-004",
    "financialYear": "2025-26",
    "dateSpent": "2025-12-13",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-15",
        "amount": 2594700,
        "percentage": 45.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-12-13",
        "amount": 3171300,
        "percentage": 55.0,
        "quarter": "Q3",
        "isFinalSixWeeks": false
      }
    ],
    "siteCoordinates": {
      "latitude": 9.9102,
      "longitude": 78.1048
    },
    "latitude": 9.9102,
    "longitude": 78.1048,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-2015-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Construction of Covered Reinforced Concrete Stormwater Outfall Drain, Madurai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Coromandel Educational Equipments (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Educational Equipments (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-2015-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Coromandel Educational Equipments (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Educational Equipments (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-12-13",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Municipal Corporation & Urban Development Authority \u2014 Madurai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 65,
        "financialProgress": 62.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Municipal Corporation & Urban Development Authority \u2014 Madurai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-2016",
    "name": "Widening and Shoulder Concrete Paving of Inter-Panchayat Corridor, Madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "constituency": "Madurai",
    "mpName": "Shri Arvindan Namboodiri (Fictional)",
    "mpId": "MP-LS-108",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Madurai",
    "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
    "sanctionedAmount": 13300000,
    "expenditure": 11704000,
    "physicalProgress": 67,
    "financialProgress": 88.0,
    "status": "Under Scrutiny",
    "riskScore": 91,
    "riskLevel": "HIGH",
    "daysDelayed": 114,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-016",
    "financialYear": "2024-25",
    "dateSpent": "2025-02-26",
    "quarterSpent": "Q4",
    "fundDumpingFlag": true,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2024-08-12",
        "amount": 2293310,
        "percentage": 19.6,
        "quarter": "Q2"
      },
      {
        "tranche": "T2",
        "date": "2025-02-26",
        "amount": 9410690,
        "percentage": 80.4,
        "quarter": "Q4",
        "isFinalSixWeeks": true
      }
    ],
    "siteCoordinates": {
      "latitude": 9.9312,
      "longitude": 78.1378
    },
    "latitude": 9.9312,
    "longitude": 78.1378,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-2016-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Widening and Shoulder Concrete Paving of Inter-Panchayat Corridor, Madurai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
        "sourceTag": "Received from Vendor: Sahyadri Heavy Earthmovers (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-2016-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
        "sourceTag": "Received from Vendor: Sahyadri Heavy Earthmovers (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-02-26",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Madurai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 67,
        "financialProgress": 88.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Madurai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-2017",
    "name": "Construction of Dedicated Maternal Care Ward with Thermal Insulation, Coimbatore",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "constituency": "Coimbatore",
    "mpName": "Smt. Devaki Ramanathan (Fictional)",
    "mpId": "MP-LS-109",
    "category": "Health",
    "implementingAgency": "District Health Mission \u2014 Coimbatore",
    "vendorName": "Nilgiri Concrete & Civil Tech (Fictional)",
    "sanctionedAmount": 3200000,
    "expenditure": 3072000,
    "physicalProgress": 100,
    "financialProgress": 96.0,
    "status": "Completed",
    "riskScore": 29,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-015",
    "financialYear": "2025-26",
    "dateSpent": "2025-05-07",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-15",
        "amount": 1382400,
        "percentage": 45.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-05-07",
        "amount": 1689600,
        "percentage": 55.0,
        "quarter": "Q1",
        "isFinalSixWeeks": false
      }
    ],
    "siteCoordinates": {
      "latitude": 11.0438,
      "longitude": 76.9198
    },
    "latitude": 11.0438,
    "longitude": 76.9198,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-2017-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Construction of Dedicated Maternal Care Ward with Thermal Insulation, Coimbatore.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Nilgiri Concrete & Civil Tech (Fictional)",
        "sourceTag": "Received from Vendor: Nilgiri Concrete & Civil Tech (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-2017-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Nilgiri Concrete & Civil Tech (Fictional)",
        "sourceTag": "Received from Vendor: Nilgiri Concrete & Civil Tech (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-05-07",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "District Health Mission \u2014 Coimbatore"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 100,
        "financialProgress": 96.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "District Health Mission \u2014 Coimbatore"
      }
    ],
    "ucStatus": "OVERDUE",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-2018",
    "name": "High-Speed Smart Classroom Connectivity Network & Rooftop Solar Array, Coimbatore",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "constituency": "Coimbatore",
    "mpName": "Smt. Devaki Ramanathan (Fictional)",
    "mpId": "MP-LS-109",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction \u2014 Coimbatore",
    "vendorName": "Shivalik Highway Concessions (Fictional)",
    "sanctionedAmount": 6500000,
    "expenditure": 6370000,
    "physicalProgress": 100,
    "financialProgress": 98.0,
    "status": "Completed",
    "riskScore": 34,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-018",
    "financialYear": "2025-26",
    "dateSpent": "2025-12-24",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-15",
        "amount": 2866500,
        "percentage": 45.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-12-24",
        "amount": 3503500,
        "percentage": 55.0,
        "quarter": "Q3",
        "isFinalSixWeeks": false
      }
    ],
    "siteCoordinates": {
      "latitude": 10.9958,
      "longitude": 76.9528
    },
    "latitude": 10.9958,
    "longitude": 76.9528,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-2018-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for High-Speed Smart Classroom Connectivity Network & Rooftop Solar Array, Coimbatore.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Shivalik Highway Concessions (Fictional)",
        "sourceTag": "Received from Vendor: Shivalik Highway Concessions (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-2018-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Shivalik Highway Concessions (Fictional)",
        "sourceTag": "Received from Vendor: Shivalik Highway Concessions (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-12-24",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Department of Public Instruction \u2014 Coimbatore"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 100,
        "financialProgress": 98.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Department of Public Instruction \u2014 Coimbatore"
      }
    ],
    "ucStatus": "SUBMITTED",
    "utilizationCertificate": {
      "ucNumber": "UC/MPLADS/2026/2018",
      "certifiedAmount": 6500000,
      "submissionDate": "2026-02-15T10:00:00Z",
      "status": "SUBMITTED",
      "remarks": "Final accounts verified and statutory UC submitted to District Authority.",
      "auditCertificateRef": "VCH/202602/PRJ-IND-2018",
      "submittedBy": "Department of Public Instruction \u2014 Coimbatore"
    }
  },
  {
    "id": "PRJ-IND-2085",
    "name": "Solid Waste Material Recovery Facility with Mechanical Trommel Sieve, Thanjavur",
    "state": "Tamil Nadu",
    "district": "Thanjavur",
    "constituency": "Tamil Nadu (Nominee)",
    "mpName": "Smt. Malavika Krishnan (Fictional)",
    "mpId": "MP-RS-143",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority \u2014 Thanjavur",
    "vendorName": "Doon Valley Builders & Fabricators (Fictional)",
    "sanctionedAmount": 5500000,
    "expenditure": 2750000,
    "physicalProgress": 46,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 47,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-005",
    "financialYear": "2024-25",
    "dateSpent": "2025-01-12",
    "quarterSpent": "Q4",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2024-06-15",
        "amount": 1237500,
        "percentage": 45.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-01-12",
        "amount": 1512500,
        "percentage": 55.0,
        "quarter": "Q4",
        "isFinalSixWeeks": false
      }
    ],
    "siteCoordinates": {
      "latitude": 10.793,
      "longitude": 79.1708
    },
    "latitude": 10.793,
    "longitude": 79.1708,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-2085-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Solid Waste Material Recovery Facility with Mechanical Trommel Sieve, Thanjavur.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Doon Valley Builders & Fabricators (Fictional)",
        "sourceTag": "Received from Vendor: Doon Valley Builders & Fabricators (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-01-12",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Municipal Corporation & Urban Development Authority \u2014 Thanjavur"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 46,
        "financialProgress": 50.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Municipal Corporation & Urban Development Authority \u2014 Thanjavur"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-2086",
    "name": "Construction of Heavy-Duty Box Culvert and Approach Link Road, Thanjavur",
    "state": "Tamil Nadu",
    "district": "Thanjavur",
    "constituency": "Tamil Nadu (Nominee)",
    "mpName": "Smt. Malavika Krishnan (Fictional)",
    "mpId": "MP-RS-143",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Thanjavur",
    "vendorName": "Godavari Agro-Civic Developers (Fictional)",
    "sanctionedAmount": 8500000,
    "expenditure": 8160000,
    "physicalProgress": 100,
    "financialProgress": 96.0,
    "status": "Completed",
    "riskScore": 35,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-007",
    "financialYear": "2025-26",
    "dateSpent": "2026-01-18",
    "quarterSpent": "Q4",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-15",
        "amount": 3672000,
        "percentage": 45.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2026-01-18",
        "amount": 4488000,
        "percentage": 55.0,
        "quarter": "Q4",
        "isFinalSixWeeks": false
      }
    ],
    "siteCoordinates": {
      "latitude": 10.814,
      "longitude": 79.1168
    },
    "latitude": 10.814,
    "longitude": 79.1168,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-2086-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Construction of Heavy-Duty Box Culvert and Approach Link Road, Thanjavur.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Godavari Agro-Civic Developers (Fictional)",
        "sourceTag": "Received from Vendor: Godavari Agro-Civic Developers (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-2086-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Godavari Agro-Civic Developers (Fictional)",
        "sourceTag": "Received from Vendor: Godavari Agro-Civic Developers (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2026-01-18",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Thanjavur"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 100,
        "financialProgress": 96.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Thanjavur"
      }
    ],
    "ucStatus": "OVERDUE",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-101",
    "name": "Widening and Storm-Resistant Bituminous Paving of Arterial Port Feeder Road, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai North",
    "mpName": "Dr. Kalanidhi Veeraswamy (Fictional)",
    "mpId": "MP-LS-TN-CHN-N",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Chennai",
    "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
    "sanctionedAmount": 16500000,
    "expenditure": 12870000,
    "physicalProgress": 62,
    "financialProgress": 78.0,
    "status": "In Progress",
    "riskScore": 68,
    "riskLevel": "HIGH",
    "daysDelayed": 45,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "vendorId": "VND-TN-001",
    "financialYear": "2025-26",
    "dateSpent": "2025-11-12",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-10",
        "amount": 6435000,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-11-12",
        "amount": 6435000,
        "percentage": 50.0,
        "quarter": "Q3"
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0827,
      "longitude": 80.2707
    },
    "latitude": 13.0827,
    "longitude": 80.2707,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-101-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Widening and Storm-Resistant Bituminous Paving of Arterial Port Feeder Road, Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Heavy Infrastructure Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-101-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Heavy Infrastructure Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-11-12",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 62,
        "financialProgress": 78.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      }
    ],
    "ucStatus": "OVERDUE",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-102",
    "name": "Construction of Grade-Separated Multi-Lane Vehicular Overbridge at Rajaji Junction, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai North",
    "mpName": "Dr. Kalanidhi Veeraswamy (Fictional)",
    "mpId": "MP-LS-TN-CHN-N",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Chennai",
    "vendorName": "Pallava Bridge Engineering Works (Fictional)",
    "sanctionedAmount": 24000000,
    "expenditure": 19200000,
    "physicalProgress": 48,
    "financialProgress": 80.0,
    "status": "Delayed",
    "riskScore": 82,
    "riskLevel": "CRITICAL",
    "daysDelayed": 180,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "vendorId": "VND-TN-002",
    "financialYear": "2025-26",
    "dateSpent": "2026-03-24",
    "quarterSpent": "Q4",
    "fundDumpingFlag": true,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-07-15",
        "amount": 7200000,
        "percentage": 37.5,
        "quarter": "Q2"
      },
      {
        "tranche": "T2",
        "date": "2026-03-24",
        "amount": 12000000,
        "percentage": 62.5,
        "quarter": "Q4"
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0878,
      "longitude": 80.2785
    },
    "latitude": 13.0878,
    "longitude": 80.2785,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-102-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Construction of Grade-Separated Multi-Lane Vehicular Overbridge at Rajaji Junction, Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Pallava Bridge Engineering Works (Fictional)",
        "sourceTag": "Received from Vendor: Pallava Bridge Engineering Works (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2026-03-24",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 48,
        "financialProgress": 80.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-103",
    "name": "Establishment of Advanced Pediatric Critical Care Wing at Government Hospital, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai South",
    "mpName": "Dr. Thamizhachi Thangapandian (Fictional)",
    "mpId": "MP-LS-TN-CHN-S",
    "category": "Health",
    "implementingAgency": "District Health Mission \u2014 Chennai",
    "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
    "sanctionedAmount": 14200000,
    "expenditure": 11360000,
    "physicalProgress": 85,
    "financialProgress": 80.0,
    "status": "Completed",
    "riskScore": 25,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-003",
    "financialYear": "2024-25",
    "dateSpent": "2025-01-18",
    "quarterSpent": "Q4",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2024-05-10",
        "amount": 5680000,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-01-18",
        "amount": 5680000,
        "percentage": 50.0,
        "quarter": "Q4"
      }
    ],
    "siteCoordinates": {
      "latitude": 13.076,
      "longitude": 80.2437
    },
    "latitude": 13.076,
    "longitude": 80.2437,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-103-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Establishment of Advanced Pediatric Critical Care Wing at Government Hospital, Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
        "sourceTag": "Received from Vendor: Kaveri Meditech Diagnostics (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-103-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
        "sourceTag": "Received from Vendor: Kaveri Meditech Diagnostics (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-01-18",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "District Health Mission \u2014 Chennai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 85,
        "financialProgress": 80.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "District Health Mission \u2014 Chennai"
      }
    ],
    "ucStatus": "SUBMITTED",
    "utilizationCertificate": {
      "ucNumber": "UC/MPLADS/2026/TN-103",
      "certifiedAmount": 14200000,
      "submissionDate": "2026-02-15T10:00:00Z",
      "status": "SUBMITTED",
      "remarks": "Final accounts verified and statutory UC submitted to District Authority.",
      "auditCertificateRef": "VCH/202602/PRJ-IND-TN-103",
      "submittedBy": "District Health Mission \u2014 Chennai"
    }
  },
  {
    "id": "PRJ-IND-TN-104",
    "name": "Reconstruction of Heavy-Duty Reinforced Stormwater Trunk Drain, Chepauk, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai Central",
    "mpName": "Thiru Dayanidhi Maran (Fictional)",
    "mpId": "MP-LS-TN-CHN-C",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Chennai",
    "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
    "sanctionedAmount": 18500000,
    "expenditure": 13875000,
    "physicalProgress": 65,
    "financialProgress": 75.0,
    "status": "In Progress",
    "riskScore": 58,
    "riskLevel": "MEDIUM",
    "daysDelayed": 25,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-001",
    "financialYear": "2025-26",
    "dateSpent": "2025-10-20",
    "quarterSpent": "Q3",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-15",
        "amount": 6937500,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-10-20",
        "amount": 6937500,
        "percentage": 50.0,
        "quarter": "Q3"
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0645,
      "longitude": 80.2831
    },
    "latitude": 13.0645,
    "longitude": 80.2831,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-104-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Reconstruction of Heavy-Duty Reinforced Stormwater Trunk Drain, Chepauk, Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Heavy Infrastructure Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-104-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Heavy Infrastructure Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-10-20",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 65,
        "financialProgress": 75.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-105",
    "name": "Erection of Solar-Powered Decentralized Material Recovery Center, George Town, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Nominated (Rajya Sabha)",
    "mpName": "Dr. Anandita Swaminathan (Fictional)",
    "mpId": "MP-NOM-IND-001",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority \u2014 Chennai",
    "vendorName": "Chola Civic Utilities & Engineering (Fictional)",
    "sanctionedAmount": 11000000,
    "expenditure": 9350000,
    "physicalProgress": 55,
    "financialProgress": 85.0,
    "status": "In Progress",
    "riskScore": 76,
    "riskLevel": "HIGH",
    "daysDelayed": 110,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "vendorId": "VND-TN-004",
    "financialYear": "2025-26",
    "dateSpent": "2026-03-15",
    "quarterSpent": "Q4",
    "fundDumpingFlag": true,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-08-10",
        "amount": 2805000,
        "percentage": 30.0,
        "quarter": "Q2"
      },
      {
        "tranche": "T2",
        "date": "2026-03-15",
        "amount": 6545000,
        "percentage": 70.0,
        "quarter": "Q4"
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0913,
      "longitude": 80.2858
    },
    "latitude": 13.0913,
    "longitude": 80.2858,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-105-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Erection of Solar-Powered Decentralized Material Recovery Center, George Town, Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Chola Civic Utilities & Engineering (Fictional)",
        "sourceTag": "Received from Vendor: Chola Civic Utilities & Engineering (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-105-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Chola Civic Utilities & Engineering (Fictional)",
        "sourceTag": "Received from Vendor: Chola Civic Utilities & Engineering (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2026-03-15",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Municipal Corporation & Urban Development Authority \u2014 Chennai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 55,
        "financialProgress": 85.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Municipal Corporation & Urban Development Authority \u2014 Chennai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null,
    "recommendedBy": "Dr. Anandita Swaminathan (Fictional)"
  },
  {
    "id": "PRJ-IND-TN-106",
    "name": "Installation of Skywalk Footbridge with Automated Elevators at Central Railway Interchange, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai Central",
    "mpName": "Thiru Dayanidhi Maran (Fictional)",
    "mpId": "MP-LS-TN-CHN-C",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Chennai",
    "vendorName": "Pallava Bridge Engineering Works (Fictional)",
    "sanctionedAmount": 19500000,
    "expenditure": 15600000,
    "physicalProgress": 70,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 45,
    "riskLevel": "MEDIUM",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-002",
    "financialYear": "2025-26",
    "dateSpent": "2025-12-05",
    "quarterSpent": "Q3",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-07-20",
        "amount": 7800000,
        "percentage": 50.0,
        "quarter": "Q2"
      },
      {
        "tranche": "T2",
        "date": "2025-12-05",
        "amount": 7800000,
        "percentage": 50.0,
        "quarter": "Q3"
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0818,
      "longitude": 80.2748
    },
    "latitude": 13.0818,
    "longitude": 80.2748,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-106-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Installation of Skywalk Footbridge with Automated Elevators at Central Railway Interchange, Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Pallava Bridge Engineering Works (Fictional)",
        "sourceTag": "Received from Vendor: Pallava Bridge Engineering Works (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-106-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Pallava Bridge Engineering Works (Fictional)",
        "sourceTag": "Received from Vendor: Pallava Bridge Engineering Works (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-12-05",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 70,
        "financialProgress": 80.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-201",
    "name": "Four-Lane Bituminous Upgradation of Pollachi Agricultural Link Corridor, Coimbatore",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "constituency": "Coimbatore",
    "mpName": "Thiru Ganapathy Rajkumar (Fictional)",
    "mpId": "MP-LS-TN-02",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Coimbatore",
    "vendorName": "Kongu Highway Developers Pvt Ltd (Fictional)",
    "sanctionedAmount": 21000000,
    "expenditure": 17850000,
    "physicalProgress": 55,
    "financialProgress": 85.0,
    "status": "Delayed",
    "riskScore": 74,
    "riskLevel": "HIGH",
    "daysDelayed": 95,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "vendorId": "VND-TN-005",
    "financialYear": "2025-26",
    "dateSpent": "2026-02-28",
    "quarterSpent": "Q4",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-08-14",
        "amount": 5355000,
        "percentage": 30.0,
        "quarter": "Q2"
      },
      {
        "tranche": "T2",
        "date": "2026-02-28",
        "amount": 12495000,
        "percentage": 70.0,
        "quarter": "Q4"
      }
    ],
    "siteCoordinates": {
      "latitude": 11.0168,
      "longitude": 76.9558
    },
    "latitude": 11.0168,
    "longitude": 76.9558,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-201-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Four-Lane Bituminous Upgradation of Pollachi Agricultural Link Corridor, Coimbatore.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Kongu Highway Developers Pvt Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Kongu Highway Developers Pvt Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-201-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Kongu Highway Developers Pvt Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Kongu Highway Developers Pvt Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2026-02-28",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Coimbatore"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 55,
        "financialProgress": 85.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Coimbatore"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-202",
    "name": "Multi-Zone Piped Drinking Water Distribution Network and Storage Reservoir, Coimbatore",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "constituency": "Coimbatore",
    "mpName": "Thiru Ganapathy Rajkumar (Fictional)",
    "mpId": "MP-LS-TN-02",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board \u2014 Coimbatore",
    "vendorName": "Bhavani Aqua Engineering (Fictional)",
    "sanctionedAmount": 15000000,
    "expenditure": 12000000,
    "physicalProgress": 75,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 38,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-006",
    "financialYear": "2025-26",
    "dateSpent": "2025-10-15",
    "quarterSpent": "Q3",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-05-18",
        "amount": 6000000,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-10-15",
        "amount": 6000000,
        "percentage": 50.0,
        "quarter": "Q3"
      }
    ],
    "siteCoordinates": {
      "latitude": 10.9982,
      "longitude": 76.9634
    },
    "latitude": 10.9982,
    "longitude": 76.9634,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-202-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Multi-Zone Piped Drinking Water Distribution Network and Storage Reservoir, Coimbatore.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Bhavani Aqua Engineering (Fictional)",
        "sourceTag": "Received from Vendor: Bhavani Aqua Engineering (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-202-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Bhavani Aqua Engineering (Fictional)",
        "sourceTag": "Received from Vendor: Bhavani Aqua Engineering (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-10-15",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Rural Water Supply & Sanitation Board \u2014 Coimbatore"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 75,
        "financialProgress": 80.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Rural Water Supply & Sanitation Board \u2014 Coimbatore"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-203",
    "name": "Setting up of Covered Agro-Produce Cold Storage Complex at Singanallur, Coimbatore",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "constituency": "Coimbatore",
    "mpName": "Thiru Ganapathy Rajkumar (Fictional)",
    "mpId": "MP-LS-TN-02",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority \u2014 Coimbatore",
    "vendorName": "Kongu Highway Developers Pvt Ltd (Fictional)",
    "sanctionedAmount": 12500000,
    "expenditure": 9375000,
    "physicalProgress": 60,
    "financialProgress": 75.0,
    "status": "In Progress",
    "riskScore": 62,
    "riskLevel": "HIGH",
    "daysDelayed": 60,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-005",
    "financialYear": "2025-26",
    "dateSpent": "2026-01-20",
    "quarterSpent": "Q4",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-07-10",
        "amount": 4687500,
        "percentage": 50.0,
        "quarter": "Q2"
      },
      {
        "tranche": "T2",
        "date": "2026-01-20",
        "amount": 4687500,
        "percentage": 50.0,
        "quarter": "Q4"
      }
    ],
    "siteCoordinates": {
      "latitude": 11.002,
      "longitude": 77.019
    },
    "latitude": 11.002,
    "longitude": 77.019,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-203-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Setting up of Covered Agro-Produce Cold Storage Complex at Singanallur, Coimbatore.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Kongu Highway Developers Pvt Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Kongu Highway Developers Pvt Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-203-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Kongu Highway Developers Pvt Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Kongu Highway Developers Pvt Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2026-01-20",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Municipal Corporation & Urban Development Authority \u2014 Coimbatore"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 60,
        "financialProgress": 75.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Municipal Corporation & Urban Development Authority \u2014 Coimbatore"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-204",
    "name": "Reconstruction of Heavy-Duty Reinforced Stormwater Trunk Drain, Singanallur, Coimbatore",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "constituency": "Coimbatore",
    "mpName": "Thiru Ganapathy Rajkumar (Fictional)",
    "mpId": "MP-LS-TN-02",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Coimbatore",
    "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
    "sanctionedAmount": 17500000,
    "expenditure": 14000000,
    "physicalProgress": 68,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 42,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": true,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-001",
    "financialYear": "2024-25",
    "dateSpent": "2025-11-20",
    "quarterSpent": "Q3",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-12",
        "amount": 5520000,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-11-20",
        "amount": 5520000,
        "percentage": 50.0,
        "quarter": "Q3"
      }
    ],
    "siteCoordinates": {
      "latitude": 11.077,
      "longitude": 76.944
    },
    "latitude": 11.077,
    "longitude": 76.944,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-204-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Reconstruction of Heavy-Duty Reinforced Stormwater Trunk Drain, Singanallur, Coimbatore.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Heavy Infrastructure Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-204-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Heavy Infrastructure Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-11-20",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Coimbatore"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 68,
        "financialProgress": 80.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Coimbatore"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-301",
    "name": "Reinforced Cement Concrete Paving of Vaigai South Bank Relief Road, Madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "constituency": "Madurai",
    "mpName": "Shri S. Venkatesan (Fictional)",
    "mpId": "MP-LS-TN-03",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Madurai",
    "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
    "sanctionedAmount": 17200000,
    "expenditure": 13760000,
    "physicalProgress": 52,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 71,
    "riskLevel": "HIGH",
    "daysDelayed": 85,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "vendorId": "VND-TN-007",
    "financialYear": "2025-26",
    "dateSpent": "2026-02-18",
    "quarterSpent": "Q4",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-08-20",
        "amount": 4128000,
        "percentage": 30.0,
        "quarter": "Q2"
      },
      {
        "tranche": "T2",
        "date": "2026-02-18",
        "amount": 9632000,
        "percentage": 70.0,
        "quarter": "Q4"
      }
    ],
    "siteCoordinates": {
      "latitude": 9.9252,
      "longitude": 78.1198
    },
    "latitude": 9.9252,
    "longitude": 78.1198,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-301-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Reinforced Cement Concrete Paving of Vaigai South Bank Relief Road, Madurai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Pandya Roads & Civil Works Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-301-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Pandya Roads & Civil Works Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2026-02-18",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Madurai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 52,
        "financialProgress": 80.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Madurai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-302",
    "name": "Modernization of Government Rajaji Hospital Emergency Diagnostics Center, Madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "constituency": "Madurai",
    "mpName": "Shri S. Venkatesan (Fictional)",
    "mpId": "MP-LS-TN-03",
    "category": "Health",
    "implementingAgency": "District Health Mission \u2014 Madurai",
    "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
    "sanctionedAmount": 14000000,
    "expenditure": 11200000,
    "physicalProgress": 78,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 35,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-003",
    "financialYear": "2025-26",
    "dateSpent": "2025-09-15",
    "quarterSpent": "Q2",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-05-10",
        "amount": 5600000,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-09-15",
        "amount": 5600000,
        "percentage": 50.0,
        "quarter": "Q2"
      }
    ],
    "siteCoordinates": {
      "latitude": 9.932,
      "longitude": 78.135
    },
    "latitude": 9.932,
    "longitude": 78.135,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-302-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Modernization of Government Rajaji Hospital Emergency Diagnostics Center, Madurai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
        "sourceTag": "Received from Vendor: Kaveri Meditech Diagnostics (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-302-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
        "sourceTag": "Received from Vendor: Kaveri Meditech Diagnostics (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-09-15",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "District Health Mission \u2014 Madurai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 78,
        "financialProgress": 80.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "District Health Mission \u2014 Madurai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-303",
    "name": "Community Drinking Water Fluoride Reduction Plant and Over-Head Reservoir, Madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "constituency": "Madurai",
    "mpName": "Shri S. Venkatesan (Fictional)",
    "mpId": "MP-LS-TN-03",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board \u2014 Madurai",
    "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
    "sanctionedAmount": 10500000,
    "expenditure": 7875000,
    "physicalProgress": 65,
    "financialProgress": 75.0,
    "status": "In Progress",
    "riskScore": 48,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-007",
    "financialYear": "2025-26",
    "dateSpent": "2025-10-25",
    "quarterSpent": "Q3",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-18",
        "amount": 3937500,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-10-25",
        "amount": 3937500,
        "percentage": 50.0,
        "quarter": "Q3"
      }
    ],
    "siteCoordinates": {
      "latitude": 9.918,
      "longitude": 78.109
    },
    "latitude": 9.918,
    "longitude": 78.109,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-303-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Community Drinking Water Fluoride Reduction Plant and Over-Head Reservoir, Madurai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Pandya Roads & Civil Works Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-303-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Pandya Roads & Civil Works Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-10-25",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Rural Water Supply & Sanitation Board \u2014 Madurai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 65,
        "financialProgress": 75.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Rural Water Supply & Sanitation Board \u2014 Madurai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-304",
    "name": "Construction of Science and Digital Innovation Block at Municipal Higher Secondary School, Madurai",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "constituency": "Madurai",
    "mpName": "Shri S. Venkatesan (Fictional)",
    "mpId": "MP-LS-TN-03",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction \u2014 Madurai",
    "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
    "sanctionedAmount": 9800000,
    "expenditure": 7840000,
    "physicalProgress": 72,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 30,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-007",
    "financialYear": "2025-26",
    "dateSpent": "2025-11-10",
    "quarterSpent": "Q3",
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-20",
        "amount": 3920000,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-11-10",
        "amount": 3920000,
        "percentage": 50.0,
        "quarter": "Q3"
      }
    ],
    "siteCoordinates": {
      "latitude": 9.9215,
      "longitude": 78.127
    },
    "latitude": 9.9215,
    "longitude": 78.127,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-304-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Construction of Science and Digital Innovation Block at Municipal Higher Secondary School, Madurai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Pandya Roads & Civil Works Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-304-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Pandya Roads & Civil Works Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Pandya Roads & Civil Works Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-11-10",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Department of Public Instruction \u2014 Madurai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 72,
        "financialProgress": 80.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Department of Public Instruction \u2014 Madurai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-TN-107",
    "name": "Construction of Composite Revenue & Administrative Sub-Divisional Complex, Central Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai Central",
    "mpName": "Thiru Dayanidhi Maran (Fictional)",
    "mpId": "MP-LS-TN-CHN-C",
    "category": "Building",
    "implementingAgency": "Public Works Department (PWD) \u2014 Chennai",
    "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
    "sanctionedAmount": 28000000,
    "expenditure": 21000000,
    "physicalProgress": 72,
    "financialProgress": 75.0,
    "status": "In Progress",
    "riskScore": 48,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "vendorId": "VND-TN-001",
    "financialYear": "2025-26",
    "dateSpent": "2025-11-28",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "date": "2025-06-15",
        "amount": 10500000,
        "percentage": 50.0,
        "quarter": "Q1"
      },
      {
        "tranche": "T2",
        "date": "2025-11-28",
        "amount": 10500000,
        "percentage": 50.0,
        "quarter": "Q3"
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0845,
      "longitude": 80.281
    },
    "latitude": 13.0845,
    "longitude": 80.281,
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-TN-107-01",
        "milestoneStage": "Foundation & Site Preparation",
        "description": "Geo-tagged progress verification photographs for Construction of Composite Revenue & Administrative Sub-Divisional Complex, Central Chennai.",
        "photoUrl": "/assets/evidence/site_prep.jpg",
        "fileName": "site_inspection_stage1.jpg",
        "uploadedAt": "2024-06-20T10:30:00Z",
        "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Heavy Infrastructure Ltd (Fictional)"
      },
      {
        "id": "EVD-PRJ-IND-TN-107-02",
        "milestoneStage": "Intermediate Civil Execution",
        "description": "Measurement book validation and structural concrete core test report.",
        "photoUrl": "/assets/evidence/intermediate_civil.jpg",
        "fileName": "mb_record_stage2.pdf",
        "uploadedAt": "2024-11-15T14:15:00Z",
        "vendorName": "Coromandel Heavy Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Coromandel Heavy Infrastructure Ltd (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-11-28",
        "physicalProgress": 40,
        "financialProgress": 40.0,
        "stage": "Foundation Level Completion",
        "remarks": "Initial civil layout and earthworks certified by site engineer.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      },
      {
        "date": "2025-01-20",
        "physicalProgress": 72,
        "financialProgress": 75.0,
        "stage": "Current Execution Stage",
        "remarks": "Measurement Book verification uploaded with vendor invoice details.",
        "updatedBy": "Public Works Department (PWD) \u2014 Chennai"
      }
    ],
    "ucStatus": "NOT_SUBMITTED",
    "utilizationCertificate": null
  },
  {
    "id": "PRJ-IND-KA-001",
    "name": "Construction of High-Throughput Dialysis Center & Medical Store, Bengaluru",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Bengaluru South",
    "mpName": "Shri Raghavendra Rao (Fictional)",
    "mpId": "MP-LS-KA-001",
    "category": "Health",
    "implementingAgency": "Karnataka Public Health Infrastructure Division (Fictional)",
    "vendorName": "Vijayanagar MedTech Solutions (Fictional)",
    "vendorId": "VND-KA-001",
    "sanctionedAmount": 9500000,
    "expenditure": 8740000,
    "physicalProgress": 22,
    "financialProgress": 92.0,
    "status": "In Progress",
    "riskScore": 93,
    "riskLevel": "CRITICAL",
    "daysDelayed": 180,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "financialYear": "2024-25",
    "dateSpent": "2025-02-14",
    "quarterSpent": "Q4",
    "fundDumpingFlag": true,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2850000,
        "date": "2024-05-10",
        "quarter": "Q1",
        "percentage": 30.0
      },
      {
        "tranche": "T2",
        "amount": 5890000,
        "date": "2025-02-14",
        "quarter": "Q4",
        "percentage": 62.0,
        "isFinalSixWeeks": true
      }
    ],
    "siteCoordinates": {
      "latitude": 12.9352,
      "longitude": 77.6245
    },
    "latitude": 12.9352,
    "longitude": 77.6245,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-001-01",
        "projectId": "PRJ-IND-KA-001",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of High-Throughput Dialysis Center & Medical Store, Bengaluru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Vijayanagar MedTech Solutions (Fictional)",
        "sourceTag": "Received from Vendor: Vijayanagar MedTech Solutions (Fictional)",
        "uploadedBy": "Karnataka Public Health Infrastructure Division (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-02-14",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 22,
        "financialProgress": 92.0,
        "stage": "Stage Execution (22%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Vijayanagar MedTech Solutions (Fictional).",
        "updatedBy": "Karnataka Public Health Infrastructure Division (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-002",
    "name": "Laying of Asphalt Road & Surface Drains Block-A, Jayanagar, Bengaluru",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Bengaluru South",
    "mpName": "Shri Raghavendra Rao (Fictional)",
    "mpId": "MP-LS-KA-001",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Bengaluru Urban",
    "vendorName": "Deccan Apex Infrastructure Ltd (Fictional)",
    "vendorId": "VND-NAT-002",
    "sanctionedAmount": 4850000,
    "expenditure": 3880000,
    "physicalProgress": 65,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 76,
    "riskLevel": "HIGH",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-11-20",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 1940000,
        "date": "2024-07-15",
        "quarter": "Q2",
        "percentage": 40.0
      },
      {
        "tranche": "T2",
        "amount": 1940000,
        "date": "2024-11-20",
        "quarter": "Q3",
        "percentage": 40.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.925,
      "longitude": 77.5938
    },
    "latitude": 12.925,
    "longitude": 77.5938,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-002-01",
        "projectId": "PRJ-IND-KA-002",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Laying of Asphalt Road & Surface Drains Block-A, Jayanagar, Bengaluru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Deccan Apex Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Deccan Apex Infrastructure Ltd (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Bengaluru Urban"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-11-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 65,
        "financialProgress": 80.0,
        "stage": "Stage Execution (65%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Deccan Apex Infrastructure Ltd (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Bengaluru Urban"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-003",
    "name": "Construction of Precast Reinforced Concrete Stormwater Box Culvert System, Bengaluru Urban",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Bengaluru South",
    "mpName": "Shri Raghavendra Rao (Fictional)",
    "mpId": "MP-LS-KA-001",
    "category": "Civic",
    "implementingAgency": "Greater Bengaluru Urban Municipal Works (Fictional)",
    "vendorName": "Deccan Apex Infrastructure Ltd (Fictional)",
    "vendorId": "VND-NAT-002",
    "sanctionedAmount": 7800000,
    "expenditure": 5460000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 82,
    "riskLevel": "HIGH",
    "daysDelayed": 45,
    "costOverrun": false,
    "duplicateRisk": true,
    "duplicateMatchedProjectId": "PRJ-IND-MH-003",
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-12",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2730000,
        "date": "2024-06-20",
        "quarter": "Q1",
        "percentage": 35.0
      },
      {
        "tranche": "T2",
        "amount": 2730000,
        "date": "2024-10-12",
        "quarter": "Q3",
        "percentage": 35.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.91,
      "longitude": 77.6
    },
    "latitude": 12.91,
    "longitude": 77.6,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-003-01",
        "projectId": "PRJ-IND-KA-003",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Precast Reinforced Concrete Stormwater Box Culvert System, Bengaluru Urban.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Deccan Apex Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Deccan Apex Infrastructure Ltd (Fictional)",
        "uploadedBy": "Greater Bengaluru Urban Municipal Works (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-12",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Deccan Apex Infrastructure Ltd (Fictional).",
        "updatedBy": "Greater Bengaluru Urban Municipal Works (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-004",
    "name": "Establishment of Advanced Computer Laboratory & Smart Classrooms, Mysuru",
    "state": "Karnataka",
    "district": "Mysuru",
    "constituency": "Mysuru",
    "mpName": "Smt. Prema Hegde (Fictional)",
    "mpId": "MP-LS-KA-002",
    "category": "Education",
    "implementingAgency": "Karnataka State Educational Infrastructure Agency (Fictional)",
    "vendorName": "Chamundi Digital Education Systems (Fictional)",
    "vendorId": "VND-KA-004",
    "sanctionedAmount": 5200000,
    "expenditure": 4680000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "In Progress",
    "riskScore": 86,
    "riskLevel": "CRITICAL",
    "daysDelayed": 30,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "hasCitizenReport": true,
    "citizenReportSummary": "Official claim: 100% smart classroom screens and 30 desktop workstations commissioned. Citizen audit: Computer room is padlocked, no desktop terminals installed, wiring hanging from ceiling.",
    "financialYear": "2025-26",
    "dateSpent": "2025-08-18",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2340000,
        "date": "2025-05-10",
        "quarter": "Q1",
        "percentage": 45.0
      },
      {
        "tranche": "T2",
        "amount": 2340000,
        "date": "2025-08-18",
        "quarter": "Q2",
        "percentage": 45.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.2958,
      "longitude": 76.6394
    },
    "latitude": 12.2958,
    "longitude": 76.6394,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-004-01",
        "projectId": "PRJ-IND-KA-004",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Establishment of Advanced Computer Laboratory & Smart Classrooms, Mysuru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Chamundi Digital Education Systems (Fictional)",
        "sourceTag": "Received from Vendor: Chamundi Digital Education Systems (Fictional)",
        "uploadedBy": "Karnataka State Educational Infrastructure Agency (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-08-18",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Chamundi Digital Education Systems (Fictional).",
        "updatedBy": "Karnataka State Educational Infrastructure Agency (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-005",
    "name": "Installation of Rooftop Solar Array & Battery Storage for District Civil Hospital, Bengaluru",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Nominated (Rajya Sabha)",
    "mpName": "Dr. Anandita Swaminathan (Fictional)",
    "mpId": "MP-NOM-IND-001",
    "category": "Health",
    "implementingAgency": "Karnataka Renewable Energy Development Board (Fictional)",
    "vendorName": "Silicon City Green Energies Ltd (Fictional)",
    "vendorId": "VND-KA-005",
    "sanctionedAmount": 5000000,
    "expenditure": 3500000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 38,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-09-12",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3500000,
        "date": "2025-09-12",
        "quarter": "Q2",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "latitude": 12.9716,
    "longitude": 77.5946,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-005-01",
        "projectId": "PRJ-IND-KA-005",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Installation of Rooftop Solar Array & Battery Storage for District Civil Hospital, Bengaluru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Silicon City Green Energies Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Silicon City Green Energies Ltd (Fictional)",
        "uploadedBy": "Karnataka Renewable Energy Development Board (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-09-12",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Silicon City Green Energies Ltd (Fictional).",
        "updatedBy": "Karnataka Renewable Energy Development Board (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-006",
    "name": "Borewell Deepening & Automated RO Water Purification Kiosk, K.R. Market, Bengaluru",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Bengaluru South",
    "mpName": "Shri Raghavendra Rao (Fictional)",
    "mpId": "MP-LS-KA-001",
    "category": "Water",
    "implementingAgency": "Bangalore Water Supply and Sewerage Board (BWSSB - Fictional)",
    "vendorName": "Cauvery Hydro Engineering (Fictional)",
    "vendorId": "VND-KA-006",
    "sanctionedAmount": 3200000,
    "expenditure": 2880000,
    "physicalProgress": 100,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 22,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-08-15",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2880000,
        "date": "2024-08-15",
        "quarter": "Q2",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.96,
      "longitude": 77.575
    },
    "latitude": 12.96,
    "longitude": 77.575,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-006-01",
        "projectId": "PRJ-IND-KA-006",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Borewell Deepening & Automated RO Water Purification Kiosk, K.R. Market, Bengaluru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Cauvery Hydro Engineering (Fictional)",
        "sourceTag": "Received from Vendor: Cauvery Hydro Engineering (Fictional)",
        "uploadedBy": "Bangalore Water Supply and Sewerage Board (BWSSB - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-08-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 100,
        "financialProgress": 90.0,
        "stage": "Stage Execution (100%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Cauvery Hydro Engineering (Fictional).",
        "updatedBy": "Bangalore Water Supply and Sewerage Board (BWSSB - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-007",
    "name": "Construction of Modern Community Sports Complex & Gymnasium, Malleshwaram, Bengaluru",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Bengaluru South",
    "mpName": "Shri Raghavendra Rao (Fictional)",
    "mpId": "MP-LS-KA-001",
    "category": "Civic",
    "implementingAgency": "Public Works Department (PWD) \u2014 Bengaluru Urban",
    "vendorName": "Karnataka Urban Structures (Fictional)",
    "vendorId": "VND-KA-007",
    "sanctionedAmount": 6500000,
    "expenditure": 3900000,
    "physicalProgress": 60,
    "financialProgress": 60.0,
    "status": "In Progress",
    "riskScore": 45,
    "riskLevel": "MEDIUM",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-07-22",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3900000,
        "date": "2025-07-22",
        "quarter": "Q2",
        "percentage": 60.0
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0031,
      "longitude": 77.5645
    },
    "latitude": 13.0031,
    "longitude": 77.5645,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-007-01",
        "projectId": "PRJ-IND-KA-007",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Modern Community Sports Complex & Gymnasium, Malleshwaram, Bengaluru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Karnataka Urban Structures (Fictional)",
        "sourceTag": "Received from Vendor: Karnataka Urban Structures (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Bengaluru Urban"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-07-22",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 60,
        "financialProgress": 60.0,
        "stage": "Stage Execution (60%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Karnataka Urban Structures (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Bengaluru Urban"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-008",
    "name": "Widening and Concrete Paving of Outer Feeder Road, Hebbal, Bengaluru",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Bengaluru South",
    "mpName": "Shri Raghavendra Rao (Fictional)",
    "mpId": "MP-LS-KA-001",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Bengaluru Urban",
    "vendorName": "Deccan Apex Infrastructure Ltd (Fictional)",
    "vendorId": "VND-NAT-002",
    "sanctionedAmount": 5500000,
    "expenditure": 3300000,
    "physicalProgress": 55,
    "financialProgress": 60.0,
    "status": "In Progress",
    "riskScore": 52,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-11",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3300000,
        "date": "2025-06-11",
        "quarter": "Q1",
        "percentage": 60.0
      }
    ],
    "siteCoordinates": {
      "latitude": 13.0358,
      "longitude": 77.597
    },
    "latitude": 13.0358,
    "longitude": 77.597,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-008-01",
        "projectId": "PRJ-IND-KA-008",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Widening and Concrete Paving of Outer Feeder Road, Hebbal, Bengaluru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Deccan Apex Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Deccan Apex Infrastructure Ltd (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Bengaluru Urban"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-11",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 55,
        "financialProgress": 60.0,
        "stage": "Stage Execution (55%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Deccan Apex Infrastructure Ltd (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Bengaluru Urban"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-009",
    "name": "Heritage Zone Street Lighting & Pedestrian Pathway Renovation, Mysuru Palace Environs",
    "state": "Karnataka",
    "district": "Mysuru",
    "constituency": "Mysuru",
    "mpName": "Smt. Prema Hegde (Fictional)",
    "mpId": "MP-LS-KA-002",
    "category": "Civic",
    "implementingAgency": "Mysuru Urban Development Authority (MUDA - Fictional)",
    "vendorName": "Heritage City Infra Projects (Fictional)",
    "vendorId": "VND-KA-009",
    "sanctionedAmount": 4800000,
    "expenditure": 4320000,
    "physicalProgress": 95,
    "financialProgress": 90.0,
    "status": "In Progress",
    "riskScore": 28,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-12-05",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4320000,
        "date": "2024-12-05",
        "quarter": "Q3",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.3051,
      "longitude": 76.6551
    },
    "latitude": 12.3051,
    "longitude": 76.6551,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-009-01",
        "projectId": "PRJ-IND-KA-009",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Heritage Zone Street Lighting & Pedestrian Pathway Renovation, Mysuru Palace Environs.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Heritage City Infra Projects (Fictional)",
        "sourceTag": "Received from Vendor: Heritage City Infra Projects (Fictional)",
        "uploadedBy": "Mysuru Urban Development Authority (MUDA - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-12-05",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 95,
        "financialProgress": 90.0,
        "stage": "Stage Execution (95%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Heritage City Infra Projects (Fictional).",
        "updatedBy": "Mysuru Urban Development Authority (MUDA - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-010",
    "name": "Construction of Rural Water Testing & De-fluoridation Facility, Nanjangud, Mysuru",
    "state": "Karnataka",
    "district": "Mysuru",
    "constituency": "Mysuru",
    "mpName": "Smt. Prema Hegde (Fictional)",
    "mpId": "MP-LS-KA-002",
    "category": "Water",
    "implementingAgency": "Karnataka Rural Water Supply & Sanitation Agency (Fictional)",
    "vendorName": "Mysuru Pure Water Systems (Fictional)",
    "vendorId": "VND-KA-010",
    "sanctionedAmount": 4200000,
    "expenditure": 2100000,
    "physicalProgress": 50,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 35,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-05-18",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2100000,
        "date": "2025-05-18",
        "quarter": "Q1",
        "percentage": 50.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.1186,
      "longitude": 76.68
    },
    "latitude": 12.1186,
    "longitude": 76.68,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-010-01",
        "projectId": "PRJ-IND-KA-010",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Rural Water Testing & De-fluoridation Facility, Nanjangud, Mysuru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Mysuru Pure Water Systems (Fictional)",
        "sourceTag": "Received from Vendor: Mysuru Pure Water Systems (Fictional)",
        "uploadedBy": "Karnataka Rural Water Supply & Sanitation Agency (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-05-18",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 50,
        "financialProgress": 50.0,
        "stage": "Stage Execution (50%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Mysuru Pure Water Systems (Fictional).",
        "updatedBy": "Karnataka Rural Water Supply & Sanitation Agency (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-011",
    "name": "Upgradation of Government Higher Secondary Science Block, Hunsur, Mysuru",
    "state": "Karnataka",
    "district": "Mysuru",
    "constituency": "Mysuru",
    "mpName": "Smt. Prema Hegde (Fictional)",
    "mpId": "MP-LS-KA-002",
    "category": "Education",
    "implementingAgency": "Karnataka State Educational Infrastructure Agency (Fictional)",
    "vendorName": "Chamundi Digital Education Systems (Fictional)",
    "vendorId": "VND-KA-004",
    "sanctionedAmount": 4000000,
    "expenditure": 3200000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 31,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-09-14",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3200000,
        "date": "2024-09-14",
        "quarter": "Q2",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.308,
      "longitude": 76.292
    },
    "latitude": 12.308,
    "longitude": 76.292,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-011-01",
        "projectId": "PRJ-IND-KA-011",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Upgradation of Government Higher Secondary Science Block, Hunsur, Mysuru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Chamundi Digital Education Systems (Fictional)",
        "sourceTag": "Received from Vendor: Chamundi Digital Education Systems (Fictional)",
        "uploadedBy": "Karnataka State Educational Infrastructure Agency (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-09-14",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Chamundi Digital Education Systems (Fictional).",
        "updatedBy": "Karnataka State Educational Infrastructure Agency (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-KA-012",
    "name": "Installation of Solar-Powered Community Micro-Cold Storage for Horticulture, Mysuru",
    "state": "Karnataka",
    "district": "Mysuru",
    "constituency": "Mysuru",
    "mpName": "Smt. Prema Hegde (Fictional)",
    "mpId": "MP-LS-KA-002",
    "category": "Civic",
    "implementingAgency": "Mysuru District Agricultural Marketing Board (Fictional)",
    "vendorName": "Deccan Agro Power Systems (Fictional)",
    "vendorId": "VND-KA-012",
    "sanctionedAmount": 3800000,
    "expenditure": 1900000,
    "physicalProgress": 48,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 42,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-07-10",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 1900000,
        "date": "2025-07-10",
        "quarter": "Q2",
        "percentage": 50.0
      }
    ],
    "siteCoordinates": {
      "latitude": 12.315,
      "longitude": 76.62
    },
    "latitude": 12.315,
    "longitude": 76.62,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-KA-012-01",
        "projectId": "PRJ-IND-KA-012",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Installation of Solar-Powered Community Micro-Cold Storage for Horticulture, Mysuru.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Deccan Agro Power Systems (Fictional)",
        "sourceTag": "Received from Vendor: Deccan Agro Power Systems (Fictional)",
        "uploadedBy": "Mysuru District Agricultural Marketing Board (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-07-10",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 48,
        "financialProgress": 50.0,
        "stage": "Stage Execution (48%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Deccan Agro Power Systems (Fictional).",
        "updatedBy": "Mysuru District Agricultural Marketing Board (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-001",
    "name": "Construction of Multipurpose Community Skill Development Center, Hadapsar, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Pune",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-MH-001",
    "category": "Education",
    "implementingAgency": "Public Works Department (PWD) \u2014 Pune",
    "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
    "vendorId": "VND-MH-001",
    "sanctionedAmount": 8900000,
    "expenditure": 8188000,
    "physicalProgress": 25,
    "financialProgress": 92.0,
    "status": "In Progress",
    "riskScore": 92,
    "riskLevel": "CRITICAL",
    "daysDelayed": 210,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "financialYear": "2024-25",
    "dateSpent": "2025-02-28",
    "quarterSpent": "Q4",
    "fundDumpingFlag": true,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2670000,
        "date": "2024-05-18",
        "quarter": "Q1",
        "percentage": 30.0
      },
      {
        "tranche": "T2",
        "amount": 5518000,
        "date": "2025-02-28",
        "quarter": "Q4",
        "percentage": 62.0,
        "isFinalSixWeeks": true
      }
    ],
    "siteCoordinates": {
      "latitude": 18.5089,
      "longitude": 73.9259
    },
    "latitude": 18.5089,
    "longitude": 73.9259,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-001-01",
        "projectId": "PRJ-IND-MH-001",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Multipurpose Community Skill Development Center, Hadapsar, Pune.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
        "sourceTag": "Received from Vendor: Sahyadri Heavy Earthmovers (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Pune"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-02-28",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 25,
        "financialProgress": 92.0,
        "stage": "Stage Execution (25%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Sahyadri Heavy Earthmovers (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Pune"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-002",
    "name": "Upgradation and Bituminous Resurfacing of Feeder Link Road, Haveli, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Pune",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-MH-001",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Pune",
    "vendorName": "Western Ghats Builders & Infra (Fictional)",
    "vendorId": "VND-MH-002",
    "sanctionedAmount": 6200000,
    "expenditure": 5270000,
    "physicalProgress": 50,
    "financialProgress": 85.0,
    "status": "Delayed",
    "riskScore": 79,
    "riskLevel": "HIGH",
    "daysDelayed": 150,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "financialYear": "2024-25",
    "dateSpent": "2024-11-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2480000,
        "date": "2024-06-10",
        "quarter": "Q1",
        "percentage": 40.0
      },
      {
        "tranche": "T2",
        "amount": 2790000,
        "date": "2024-11-15",
        "quarter": "Q3",
        "percentage": 45.0
      }
    ],
    "siteCoordinates": {
      "latitude": 18.46,
      "longitude": 73.85
    },
    "latitude": 18.46,
    "longitude": 73.85,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-002-01",
        "projectId": "PRJ-IND-MH-002",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Upgradation and Bituminous Resurfacing of Feeder Link Road, Haveli, Pune.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Western Ghats Builders & Infra (Fictional)",
        "sourceTag": "Received from Vendor: Western Ghats Builders & Infra (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Pune"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-11-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 50,
        "financialProgress": 85.0,
        "stage": "Stage Execution (50%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Western Ghats Builders & Infra (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Pune"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-003",
    "name": "Construction of Precast Reinforced Concrete Stormwater Drainage Box Culvert, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Pune",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-MH-001",
    "category": "Civic",
    "implementingAgency": "Pune Municipal Corporation Infrastructure Wing (Fictional)",
    "vendorName": "Deccan Apex Infrastructure Ltd (Fictional)",
    "vendorId": "VND-NAT-002",
    "sanctionedAmount": 7900000,
    "expenditure": 5530000,
    "physicalProgress": 72,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 84,
    "riskLevel": "HIGH",
    "daysDelayed": 40,
    "costOverrun": false,
    "duplicateRisk": true,
    "duplicateMatchedProjectId": "PRJ-IND-KA-003",
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-07-20",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2765000,
        "date": "2025-05-15",
        "quarter": "Q1",
        "percentage": 35.0
      },
      {
        "tranche": "T2",
        "amount": 2765000,
        "date": "2025-07-20",
        "quarter": "Q2",
        "percentage": 35.0
      }
    ],
    "siteCoordinates": {
      "latitude": 18.5204,
      "longitude": 73.8567
    },
    "latitude": 18.5204,
    "longitude": 73.8567,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-003-01",
        "projectId": "PRJ-IND-MH-003",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Precast Reinforced Concrete Stormwater Drainage Box Culvert, Pune.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Deccan Apex Infrastructure Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Deccan Apex Infrastructure Ltd (Fictional)",
        "uploadedBy": "Pune Municipal Corporation Infrastructure Wing (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-07-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 72,
        "financialProgress": 70.0,
        "stage": "Stage Execution (72%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Deccan Apex Infrastructure Ltd (Fictional).",
        "updatedBy": "Pune Municipal Corporation Infrastructure Wing (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-004",
    "name": "Structural Strengthening & Pier Retrofitting of Rural River Bridge, Nagpur",
    "state": "Maharashtra",
    "district": "Nagpur",
    "constituency": "Nagpur",
    "mpName": "Smt. Shubhada Kulkarni (Fictional)",
    "mpId": "MP-LS-MH-002",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Nagpur",
    "vendorName": "Vidarbha Civil Tech Ltd (Fictional)",
    "vendorId": "VND-MH-004",
    "sanctionedAmount": 6800000,
    "expenditure": 5780000,
    "physicalProgress": 85,
    "financialProgress": 85.0,
    "status": "In Progress",
    "riskScore": 89,
    "riskLevel": "CRITICAL",
    "daysDelayed": 60,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "hasCitizenReport": true,
    "citizenReportSummary": "Official claim: 85% concrete pier jacket casing complete with load tests approved. Citizen audit: Scaffolding has been abandoned for 3 months, massive longitudinal cracks visible on pier #2, zero workers on site.",
    "financialYear": "2025-26",
    "dateSpent": "2025-08-10",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2890000,
        "date": "2025-04-12",
        "quarter": "Q1",
        "percentage": 42.5
      },
      {
        "tranche": "T2",
        "amount": 2890000,
        "date": "2025-08-10",
        "quarter": "Q2",
        "percentage": 42.5
      }
    ],
    "siteCoordinates": {
      "latitude": 21.1458,
      "longitude": 79.0882
    },
    "latitude": 21.1458,
    "longitude": 79.0882,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-004-01",
        "projectId": "PRJ-IND-MH-004",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Structural Strengthening & Pier Retrofitting of Rural River Bridge, Nagpur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Vidarbha Civil Tech Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Vidarbha Civil Tech Ltd (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Nagpur"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-08-10",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 85,
        "financialProgress": 85.0,
        "stage": "Stage Execution (85%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Vidarbha Civil Tech Ltd (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Nagpur"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-005",
    "name": "Establishment of Specialized Pediatric ICU & Neonatal Unit, Aundh, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Nominated (Rajya Sabha)",
    "mpName": "Dr. Anandita Swaminathan (Fictional)",
    "mpId": "MP-NOM-IND-001",
    "category": "Health",
    "implementingAgency": "Maharashtra State Health Infrastructure Corporation (Fictional)",
    "vendorName": "Sahyadri Health Infrastructure (Fictional)",
    "vendorId": "VND-MH-005",
    "sanctionedAmount": 5000000,
    "expenditure": 3000000,
    "physicalProgress": 60,
    "financialProgress": 60.0,
    "status": "In Progress",
    "riskScore": 40,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-25",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3000000,
        "date": "2025-06-25",
        "quarter": "Q1",
        "percentage": 60.0
      }
    ],
    "siteCoordinates": {
      "latitude": 18.558,
      "longitude": 73.807
    },
    "latitude": 18.558,
    "longitude": 73.807,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-005-01",
        "projectId": "PRJ-IND-MH-005",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Establishment of Specialized Pediatric ICU & Neonatal Unit, Aundh, Pune.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Sahyadri Health Infrastructure (Fictional)",
        "sourceTag": "Received from Vendor: Sahyadri Health Infrastructure (Fictional)",
        "uploadedBy": "Maharashtra State Health Infrastructure Corporation (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-25",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 60,
        "financialProgress": 60.0,
        "stage": "Stage Execution (60%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Sahyadri Health Infrastructure (Fictional).",
        "updatedBy": "Maharashtra State Health Infrastructure Corporation (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-006",
    "name": "Installation of High-Capacity Piped Water Supply Sump & Pumps, Kothrud, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Pune",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-MH-001",
    "category": "Water",
    "implementingAgency": "Maharashtra Jeevan Pradhikaran (MJP - Fictional)",
    "vendorName": "Marathwada Hydro Engineering (Fictional)",
    "vendorId": "VND-MH-006",
    "sanctionedAmount": 5800000,
    "expenditure": 4640000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 34,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-08",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4640000,
        "date": "2024-10-08",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 18.5074,
      "longitude": 73.8077
    },
    "latitude": 18.5074,
    "longitude": 73.8077,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-006-01",
        "projectId": "PRJ-IND-MH-006",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Installation of High-Capacity Piped Water Supply Sump & Pumps, Kothrud, Pune.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Marathwada Hydro Engineering (Fictional)",
        "sourceTag": "Received from Vendor: Marathwada Hydro Engineering (Fictional)",
        "uploadedBy": "Maharashtra Jeevan Pradhikaran (MJP - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-08",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Marathwada Hydro Engineering (Fictional).",
        "updatedBy": "Maharashtra Jeevan Pradhikaran (MJP - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-007",
    "name": "Digital Audio-Visual Library & Composite Reading Hall, Shivajinagar, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Pune",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-MH-001",
    "category": "Education",
    "implementingAgency": "Public Works Department (PWD) \u2014 Pune",
    "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
    "vendorId": "VND-MH-001",
    "sanctionedAmount": 7100000,
    "expenditure": 4260000,
    "physicalProgress": 60,
    "financialProgress": 60.0,
    "status": "In Progress",
    "riskScore": 67,
    "riskLevel": "HIGH",
    "daysDelayed": 30,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-08-01",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4260000,
        "date": "2024-08-01",
        "quarter": "Q2",
        "percentage": 60.0
      }
    ],
    "siteCoordinates": {
      "latitude": 18.5314,
      "longitude": 73.8446
    },
    "latitude": 18.5314,
    "longitude": 73.8446,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-007-01",
        "projectId": "PRJ-IND-MH-007",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Digital Audio-Visual Library & Composite Reading Hall, Shivajinagar, Pune.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
        "sourceTag": "Received from Vendor: Sahyadri Heavy Earthmovers (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Pune"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-08-01",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 60,
        "financialProgress": 60.0,
        "stage": "Stage Execution (60%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Sahyadri Heavy Earthmovers (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Pune"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-008",
    "name": "Installation of 100kW Rooftop Solar Photovoltaic Grid for District Court, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Pune",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-MH-001",
    "category": "Civic",
    "implementingAgency": "Maharashtra Energy Development Agency (MEDA - Fictional)",
    "vendorName": "Western Ghats Solar Power Ltd (Fictional)",
    "vendorId": "VND-MH-008",
    "sanctionedAmount": 4500000,
    "expenditure": 4050000,
    "physicalProgress": 100,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 18,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-07-15",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4050000,
        "date": "2024-07-15",
        "quarter": "Q2",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 18.5289,
      "longitude": 73.86
    },
    "latitude": 18.5289,
    "longitude": 73.86,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-008-01",
        "projectId": "PRJ-IND-MH-008",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Installation of 100kW Rooftop Solar Photovoltaic Grid for District Court, Pune.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Western Ghats Solar Power Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Western Ghats Solar Power Ltd (Fictional)",
        "uploadedBy": "Maharashtra Energy Development Agency (MEDA - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-07-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 100,
        "financialProgress": 90.0,
        "stage": "Stage Execution (100%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Western Ghats Solar Power Ltd (Fictional).",
        "updatedBy": "Maharashtra Energy Development Agency (MEDA - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-009",
    "name": "Construction of Modern Trauma Care & Emergency Ward, Nagpur Civil Hospital",
    "state": "Maharashtra",
    "district": "Nagpur",
    "constituency": "Nagpur",
    "mpName": "Smt. Shubhada Kulkarni (Fictional)",
    "mpId": "MP-LS-MH-002",
    "category": "Health",
    "implementingAgency": "Public Works Department (PWD) \u2014 Nagpur",
    "vendorName": "Vidarbha Civil Tech Ltd (Fictional)",
    "vendorId": "VND-MH-004",
    "sanctionedAmount": 8200000,
    "expenditure": 5740000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 62,
    "riskLevel": "HIGH",
    "daysDelayed": 20,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-09-20",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5740000,
        "date": "2024-09-20",
        "quarter": "Q2",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 21.15,
      "longitude": 79.09
    },
    "latitude": 21.15,
    "longitude": 79.09,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-009-01",
        "projectId": "PRJ-IND-MH-009",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Modern Trauma Care & Emergency Ward, Nagpur Civil Hospital.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Vidarbha Civil Tech Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Vidarbha Civil Tech Ltd (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Nagpur"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-09-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Vidarbha Civil Tech Ltd (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Nagpur"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-010",
    "name": "Rejuvenation and Concrete Embankment of Ambazari Lake Feeder Canal, Nagpur",
    "state": "Maharashtra",
    "district": "Nagpur",
    "constituency": "Nagpur",
    "mpName": "Smt. Shubhada Kulkarni (Fictional)",
    "mpId": "MP-LS-MH-002",
    "category": "Water",
    "implementingAgency": "Nagpur Municipal Corporation Water Works (Fictional)",
    "vendorName": "Nag River Conservation Infratech (Fictional)",
    "vendorId": "VND-MH-010",
    "sanctionedAmount": 4900000,
    "expenditure": 2450000,
    "physicalProgress": 50,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 41,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-18",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2450000,
        "date": "2025-06-18",
        "quarter": "Q1",
        "percentage": 50.0
      }
    ],
    "siteCoordinates": {
      "latitude": 21.13,
      "longitude": 79.04
    },
    "latitude": 21.13,
    "longitude": 79.04,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-010-01",
        "projectId": "PRJ-IND-MH-010",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Rejuvenation and Concrete Embankment of Ambazari Lake Feeder Canal, Nagpur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Nag River Conservation Infratech (Fictional)",
        "sourceTag": "Received from Vendor: Nag River Conservation Infratech (Fictional)",
        "uploadedBy": "Nagpur Municipal Corporation Water Works (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-18",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 50,
        "financialProgress": 50.0,
        "stage": "Stage Execution (50%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Nag River Conservation Infratech (Fictional).",
        "updatedBy": "Nagpur Municipal Corporation Water Works (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-011",
    "name": "Smart Classrooms and Science Laboratory Modernization, Sitabuldi, Nagpur",
    "state": "Maharashtra",
    "district": "Nagpur",
    "constituency": "Nagpur",
    "mpName": "Smt. Shubhada Kulkarni (Fictional)",
    "mpId": "MP-LS-MH-002",
    "category": "Education",
    "implementingAgency": "Nagpur Zilla Parishad Education Division (Fictional)",
    "vendorName": "Orange City Smart Education Systems (Fictional)",
    "vendorId": "VND-MH-011",
    "sanctionedAmount": 3800000,
    "expenditure": 3420000,
    "physicalProgress": 95,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 25,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-11-28",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3420000,
        "date": "2024-11-28",
        "quarter": "Q3",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 21.146,
      "longitude": 79.082
    },
    "latitude": 21.146,
    "longitude": 79.082,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-011-01",
        "projectId": "PRJ-IND-MH-011",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Smart Classrooms and Science Laboratory Modernization, Sitabuldi, Nagpur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Orange City Smart Education Systems (Fictional)",
        "sourceTag": "Received from Vendor: Orange City Smart Education Systems (Fictional)",
        "uploadedBy": "Nagpur Zilla Parishad Education Division (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-11-28",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 95,
        "financialProgress": 90.0,
        "stage": "Stage Execution (95%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Orange City Smart Education Systems (Fictional).",
        "updatedBy": "Nagpur Zilla Parishad Education Division (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-012",
    "name": "Construction of High-Mast LED Lighting & Public Park Pavilions, Nagpur",
    "state": "Maharashtra",
    "district": "Nagpur",
    "constituency": "Nagpur",
    "mpName": "Smt. Shubhada Kulkarni (Fictional)",
    "mpId": "MP-LS-MH-002",
    "category": "Civic",
    "implementingAgency": "Nagpur Municipal Corporation Infrastructure Wing (Fictional)",
    "vendorName": "Vidarbha Power Solutions (Fictional)",
    "vendorId": "VND-MH-012",
    "sanctionedAmount": 3500000,
    "expenditure": 1750000,
    "physicalProgress": 50,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 30,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-05-30",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 1750000,
        "date": "2025-05-30",
        "quarter": "Q1",
        "percentage": 50.0
      }
    ],
    "siteCoordinates": {
      "latitude": 21.16,
      "longitude": 79.1
    },
    "latitude": 21.16,
    "longitude": 79.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-012-01",
        "projectId": "PRJ-IND-MH-012",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of High-Mast LED Lighting & Public Park Pavilions, Nagpur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Vidarbha Power Solutions (Fictional)",
        "sourceTag": "Received from Vendor: Vidarbha Power Solutions (Fictional)",
        "uploadedBy": "Nagpur Municipal Corporation Infrastructure Wing (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-05-30",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 50,
        "financialProgress": 50.0,
        "stage": "Stage Execution (50%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Vidarbha Power Solutions (Fictional).",
        "updatedBy": "Nagpur Municipal Corporation Infrastructure Wing (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-MH-013",
    "name": "Construction of Women Artisans Common Facility & Training Center, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Pune",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-MH-001",
    "category": "Civic",
    "implementingAgency": "Public Works Department (PWD) \u2014 Pune",
    "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
    "vendorId": "VND-MH-001",
    "sanctionedAmount": 4200000,
    "expenditure": 2100000,
    "physicalProgress": 50,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 36,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-07-05",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2100000,
        "date": "2025-07-05",
        "quarter": "Q2",
        "percentage": 50.0
      }
    ],
    "siteCoordinates": {
      "latitude": 18.51,
      "longitude": 73.84
    },
    "latitude": 18.51,
    "longitude": 73.84,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-MH-013-01",
        "projectId": "PRJ-IND-MH-013",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Women Artisans Common Facility & Training Center, Pune.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
        "sourceTag": "Received from Vendor: Sahyadri Heavy Earthmovers (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Pune"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-07-05",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 50,
        "financialProgress": 50.0,
        "stage": "Stage Execution (50%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Sahyadri Heavy Earthmovers (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Pune"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-001",
    "name": "Provision of Modern Dual-Desk Ergonomic Furniture & Digital Podiums for 12 Schools, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Lucknow",
    "mpName": "Dr. Brajesh Tiwari (Fictional)",
    "mpId": "MP-LS-UP-001",
    "category": "Education",
    "implementingAgency": "Uttar Pradesh Basic Shiksha Parishad (Fictional)",
    "vendorName": "Awadh Educational Supplies Ltd (Fictional)",
    "vendorId": "VND-UP-001",
    "sanctionedAmount": 6500000,
    "expenditure": 6175000,
    "physicalProgress": 95,
    "financialProgress": 95.0,
    "status": "In Progress",
    "riskScore": 88,
    "riskLevel": "CRITICAL",
    "daysDelayed": 45,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "hasCitizenReport": true,
    "citizenReportSummary": "Official claim: 100% supply and delivery of modern dual-desk classroom furniture verified by school inspector. Citizen audit: Village school children are still sitting on floor mats; only 15 broken wooden benches delivered.",
    "financialYear": "2024-25",
    "dateSpent": "2024-07-24",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 6175000,
        "date": "2024-07-24",
        "quarter": "Q2",
        "percentage": 95.0
      }
    ],
    "siteCoordinates": {
      "latitude": 26.8467,
      "longitude": 80.9462
    },
    "latitude": 26.8467,
    "longitude": 80.9462,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-001-01",
        "projectId": "PRJ-IND-UP-001",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Provision of Modern Dual-Desk Ergonomic Furniture & Digital Podiums for 12 Schools, Lucknow.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Awadh Educational Supplies Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Awadh Educational Supplies Ltd (Fictional)",
        "uploadedBy": "Uttar Pradesh Basic Shiksha Parishad (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-07-24",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 95,
        "financialProgress": 95.0,
        "stage": "Stage Execution (95%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Awadh Educational Supplies Ltd (Fictional).",
        "updatedBy": "Uttar Pradesh Basic Shiksha Parishad (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-002",
    "name": "Construction of Stormwater Surface Drainage Network & Pumping Well, Gomti Nagar, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Lucknow",
    "mpName": "Dr. Brajesh Tiwari (Fictional)",
    "mpId": "MP-LS-UP-001",
    "category": "Civic",
    "implementingAgency": "Lucknow Municipal Corporation Works Wing (Fictional)",
    "vendorName": "Gomti Infratech Projects (Fictional)",
    "vendorId": "VND-UP-002",
    "sanctionedAmount": 9800000,
    "expenditure": 9016000,
    "physicalProgress": 30,
    "financialProgress": 92.0,
    "status": "In Progress",
    "riskScore": 95,
    "riskLevel": "CRITICAL",
    "daysDelayed": 180,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true,
    "financialYear": "2024-25",
    "dateSpent": "2025-03-25",
    "quarterSpent": "Q4",
    "fundDumpingFlag": true,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2940000,
        "date": "2024-06-12",
        "quarter": "Q1",
        "percentage": 30.0
      },
      {
        "tranche": "T2",
        "amount": 6076000,
        "date": "2025-03-25",
        "quarter": "Q4",
        "percentage": 62.0,
        "isFinalSixWeeks": true
      }
    ],
    "siteCoordinates": {
      "latitude": 26.85,
      "longitude": 80.99
    },
    "latitude": 26.85,
    "longitude": 80.99,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-002-01",
        "projectId": "PRJ-IND-UP-002",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Stormwater Surface Drainage Network & Pumping Well, Gomti Nagar, Lucknow.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Gomti Infratech Projects (Fictional)",
        "sourceTag": "Received from Vendor: Gomti Infratech Projects (Fictional)",
        "uploadedBy": "Lucknow Municipal Corporation Works Wing (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-03-25",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 30,
        "financialProgress": 92.0,
        "stage": "Stage Execution (30%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Gomti Infratech Projects (Fictional).",
        "updatedBy": "Lucknow Municipal Corporation Works Wing (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-003",
    "name": "Comprehensive Restoration and Bituminous Overlay of Main Highway Feeder, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Lucknow",
    "mpName": "Dr. Brajesh Tiwari (Fictional)",
    "mpId": "MP-LS-UP-001",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Lucknow",
    "vendorName": "Purvanchal Roadways Corporation (Fictional)",
    "vendorId": "VND-UP-003",
    "sanctionedAmount": 8500000,
    "expenditure": 6800000,
    "physicalProgress": 70,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 75,
    "riskLevel": "HIGH",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-18",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3400000,
        "date": "2024-06-10",
        "quarter": "Q1",
        "percentage": 40.0
      },
      {
        "tranche": "T2",
        "amount": 3400000,
        "date": "2024-10-18",
        "quarter": "Q3",
        "percentage": 40.0
      }
    ],
    "siteCoordinates": {
      "latitude": 26.82,
      "longitude": 80.92
    },
    "latitude": 26.82,
    "longitude": 80.92,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-003-01",
        "projectId": "PRJ-IND-UP-003",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Comprehensive Restoration and Bituminous Overlay of Main Highway Feeder, Lucknow.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Purvanchal Roadways Corporation (Fictional)",
        "sourceTag": "Received from Vendor: Purvanchal Roadways Corporation (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Lucknow"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-18",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 80.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Purvanchal Roadways Corporation (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Lucknow"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-004",
    "name": "Installation of 50kL Solar Piped Drinking Water Filtration Plant, Kashi Environs, Varanasi",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Shri Shailendra Nath Upadhyay (Fictional)",
    "mpId": "MP-LS-UP-002",
    "category": "Water",
    "implementingAgency": "Uttar Pradesh Jal Nigam (Fictional)",
    "vendorName": "Kashi Hydro Solar Solutions (Fictional)",
    "vendorId": "VND-UP-004",
    "sanctionedAmount": 6200000,
    "expenditure": 4340000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 81,
    "riskLevel": "HIGH",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": true,
    "duplicateMatchedProjectId": "PRJ-IND-UP-005",
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-09-12",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4340000,
        "date": "2024-09-12",
        "quarter": "Q2",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 25.3176,
      "longitude": 82.9739
    },
    "latitude": 25.3176,
    "longitude": 82.9739,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-004-01",
        "projectId": "PRJ-IND-UP-004",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Installation of 50kL Solar Piped Drinking Water Filtration Plant, Kashi Environs, Varanasi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Kashi Hydro Solar Solutions (Fictional)",
        "sourceTag": "Received from Vendor: Kashi Hydro Solar Solutions (Fictional)",
        "uploadedBy": "Uttar Pradesh Jal Nigam (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-09-12",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Kashi Hydro Solar Solutions (Fictional).",
        "updatedBy": "Uttar Pradesh Jal Nigam (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-005",
    "name": "Establishment of Solar Powered Piped Drinking Water System with 50kL Tank, Varanasi Rural",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Shri Shailendra Nath Upadhyay (Fictional)",
    "mpId": "MP-LS-UP-002",
    "category": "Water",
    "implementingAgency": "Uttar Pradesh Jal Nigam (Fictional)",
    "vendorName": "Kashi Hydro Solar Solutions (Fictional)",
    "vendorId": "VND-UP-004",
    "sanctionedAmount": 6300000,
    "expenditure": 3150000,
    "physicalProgress": 50,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 79,
    "riskLevel": "HIGH",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": true,
    "duplicateMatchedProjectId": "PRJ-IND-UP-004",
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3150000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 50.0
      }
    ],
    "siteCoordinates": {
      "latitude": 25.319,
      "longitude": 82.975
    },
    "latitude": 25.319,
    "longitude": 82.975,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-005-01",
        "projectId": "PRJ-IND-UP-005",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Establishment of Solar Powered Piped Drinking Water System with 50kL Tank, Varanasi Rural.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Kashi Hydro Solar Solutions (Fictional)",
        "sourceTag": "Received from Vendor: Kashi Hydro Solar Solutions (Fictional)",
        "uploadedBy": "Uttar Pradesh Jal Nigam (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 50,
        "financialProgress": 50.0,
        "stage": "Stage Execution (50%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Kashi Hydro Solar Solutions (Fictional).",
        "updatedBy": "Uttar Pradesh Jal Nigam (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-006",
    "name": "Installation of 40 High-Mast Octagonal LED Solar Lighting Towers at Ghats, Varanasi",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Shri Shailendra Nath Upadhyay (Fictional)",
    "mpId": "MP-LS-UP-002",
    "category": "Civic",
    "implementingAgency": "Varanasi Smart City Infrastructure Division (Fictional)",
    "vendorName": "Ganga Clean Energy Systems (Fictional)",
    "vendorId": "VND-UP-006",
    "sanctionedAmount": 5500000,
    "expenditure": 4950000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "In Progress",
    "riskScore": 87,
    "riskLevel": "CRITICAL",
    "daysDelayed": 25,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "hasCitizenReport": true,
    "citizenReportSummary": "Official claim: 40 solar high-mast poles fully erected and operational. Citizen audit: Only 6 poles installed along Dashashwamedh ghat, remaining 34 absent; wires left exposed.",
    "financialYear": "2025-26",
    "dateSpent": "2025-07-14",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4950000,
        "date": "2025-07-14",
        "quarter": "Q2",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 25.308,
      "longitude": 83.009
    },
    "latitude": 25.308,
    "longitude": 83.009,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-006-01",
        "projectId": "PRJ-IND-UP-006",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Installation of 40 High-Mast Octagonal LED Solar Lighting Towers at Ghats, Varanasi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Ganga Clean Energy Systems (Fictional)",
        "sourceTag": "Received from Vendor: Ganga Clean Energy Systems (Fictional)",
        "uploadedBy": "Varanasi Smart City Infrastructure Division (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-07-14",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Ganga Clean Energy Systems (Fictional).",
        "updatedBy": "Varanasi Smart City Infrastructure Division (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-007",
    "name": "Establishment of Advanced Mother & Child Care Wing, Civil Hospital, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Lucknow",
    "mpName": "Dr. Brajesh Tiwari (Fictional)",
    "mpId": "MP-LS-UP-001",
    "category": "Health",
    "implementingAgency": "Uttar Pradesh Medical Health Infrastructure Division (Fictional)",
    "vendorName": "Awadh Healthcare Solutions (Fictional)",
    "vendorId": "VND-UP-007",
    "sanctionedAmount": 8000000,
    "expenditure": 5600000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 38,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-08-05",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5600000,
        "date": "2025-08-05",
        "quarter": "Q2",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 26.852,
      "longitude": 80.94
    },
    "latitude": 26.852,
    "longitude": 80.94,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-007-01",
        "projectId": "PRJ-IND-UP-007",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Establishment of Advanced Mother & Child Care Wing, Civil Hospital, Lucknow.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Awadh Healthcare Solutions (Fictional)",
        "sourceTag": "Received from Vendor: Awadh Healthcare Solutions (Fictional)",
        "uploadedBy": "Uttar Pradesh Medical Health Infrastructure Division (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-08-05",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Awadh Healthcare Solutions (Fictional).",
        "updatedBy": "Uttar Pradesh Medical Health Infrastructure Division (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-008",
    "name": "Rejuvenation of Traditional Water Bodies & Rainwater Harvesting Ponds, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Lucknow",
    "mpName": "Dr. Brajesh Tiwari (Fictional)",
    "mpId": "MP-LS-UP-001",
    "category": "Water",
    "implementingAgency": "Lucknow Minor Irrigation Division (Fictional)",
    "vendorName": "Gomti Infratech Projects (Fictional)",
    "vendorId": "VND-UP-002",
    "sanctionedAmount": 4500000,
    "expenditure": 4050000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 24,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-11-10",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4050000,
        "date": "2024-11-10",
        "quarter": "Q3",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 26.86,
      "longitude": 80.91
    },
    "latitude": 26.86,
    "longitude": 80.91,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-008-01",
        "projectId": "PRJ-IND-UP-008",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Rejuvenation of Traditional Water Bodies & Rainwater Harvesting Ponds, Lucknow.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Gomti Infratech Projects (Fictional)",
        "sourceTag": "Received from Vendor: Gomti Infratech Projects (Fictional)",
        "uploadedBy": "Lucknow Minor Irrigation Division (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-11-10",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Gomti Infratech Projects (Fictional).",
        "updatedBy": "Lucknow Minor Irrigation Division (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-009",
    "name": "Construction of Modern Community Sports Pavilion & Youth Center, Alambagh, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Lucknow",
    "mpName": "Dr. Brajesh Tiwari (Fictional)",
    "mpId": "MP-LS-UP-001",
    "category": "Civic",
    "implementingAgency": "Public Works Department (PWD) \u2014 Lucknow",
    "vendorName": "Purvanchal Roadways Corporation (Fictional)",
    "vendorId": "VND-UP-003",
    "sanctionedAmount": 5200000,
    "expenditure": 2600000,
    "physicalProgress": 50,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 32,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-05-12",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2600000,
        "date": "2025-05-12",
        "quarter": "Q1",
        "percentage": 50.0
      }
    ],
    "siteCoordinates": {
      "latitude": 26.81,
      "longitude": 80.9
    },
    "latitude": 26.81,
    "longitude": 80.9,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-009-01",
        "projectId": "PRJ-IND-UP-009",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Modern Community Sports Pavilion & Youth Center, Alambagh, Lucknow.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Purvanchal Roadways Corporation (Fictional)",
        "sourceTag": "Received from Vendor: Purvanchal Roadways Corporation (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Lucknow"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-05-12",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 50,
        "financialProgress": 50.0,
        "stage": "Stage Execution (50%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Purvanchal Roadways Corporation (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Lucknow"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-010",
    "name": "Widening and Concrete Paving of Main Vegetable Mandi Road, Dubagga, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Lucknow",
    "mpName": "Dr. Brajesh Tiwari (Fictional)",
    "mpId": "MP-LS-UP-001",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Lucknow",
    "vendorName": "Purvanchal Roadways Corporation (Fictional)",
    "vendorId": "VND-UP-003",
    "sanctionedAmount": 4800000,
    "expenditure": 2880000,
    "physicalProgress": 60,
    "financialProgress": 60.0,
    "status": "In Progress",
    "riskScore": 44,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-28",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 2880000,
        "date": "2025-06-28",
        "quarter": "Q1",
        "percentage": 60.0
      }
    ],
    "siteCoordinates": {
      "latitude": 26.87,
      "longitude": 80.88
    },
    "latitude": 26.87,
    "longitude": 80.88,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-010-01",
        "projectId": "PRJ-IND-UP-010",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Widening and Concrete Paving of Main Vegetable Mandi Road, Dubagga, Lucknow.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Purvanchal Roadways Corporation (Fictional)",
        "sourceTag": "Received from Vendor: Purvanchal Roadways Corporation (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Lucknow"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-28",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 60,
        "financialProgress": 60.0,
        "stage": "Stage Execution (60%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Purvanchal Roadways Corporation (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Lucknow"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-011",
    "name": "Modernization of Rural Community Health Centre with Digital X-Ray, Shivpur, Varanasi",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Shri Shailendra Nath Upadhyay (Fictional)",
    "mpId": "MP-LS-UP-002",
    "category": "Health",
    "implementingAgency": "Uttar Pradesh Medical Health Infrastructure Division (Fictional)",
    "vendorName": "Awadh Healthcare Solutions (Fictional)",
    "vendorId": "VND-UP-007",
    "sanctionedAmount": 6500000,
    "expenditure": 5200000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 33,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-12-10",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5200000,
        "date": "2024-12-10",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 25.35,
      "longitude": 82.96
    },
    "latitude": 25.35,
    "longitude": 82.96,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-011-01",
        "projectId": "PRJ-IND-UP-011",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Modernization of Rural Community Health Centre with Digital X-Ray, Shivpur, Varanasi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Awadh Healthcare Solutions (Fictional)",
        "sourceTag": "Received from Vendor: Awadh Healthcare Solutions (Fictional)",
        "uploadedBy": "Uttar Pradesh Medical Health Infrastructure Division (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-12-10",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Awadh Healthcare Solutions (Fictional).",
        "updatedBy": "Uttar Pradesh Medical Health Infrastructure Division (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-012",
    "name": "Construction of Inter-Village Concrete Link Road & Culvert, Babatpur, Varanasi",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Shri Shailendra Nath Upadhyay (Fictional)",
    "mpId": "MP-LS-UP-002",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD) \u2014 Varanasi",
    "vendorName": "Purvanchal Roadways Corporation (Fictional)",
    "vendorId": "VND-UP-003",
    "sanctionedAmount": 5400000,
    "expenditure": 3780000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 46,
    "riskLevel": "MEDIUM",
    "daysDelayed": 10,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-05-22",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3780000,
        "date": "2025-05-22",
        "quarter": "Q1",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 25.44,
      "longitude": 82.85
    },
    "latitude": 25.44,
    "longitude": 82.85,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-012-01",
        "projectId": "PRJ-IND-UP-012",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Inter-Village Concrete Link Road & Culvert, Babatpur, Varanasi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Purvanchal Roadways Corporation (Fictional)",
        "sourceTag": "Received from Vendor: Purvanchal Roadways Corporation (Fictional)",
        "uploadedBy": "Public Works Department (PWD) \u2014 Varanasi"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-05-22",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Purvanchal Roadways Corporation (Fictional).",
        "updatedBy": "Public Works Department (PWD) \u2014 Varanasi"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-013",
    "name": "Establishment of Smart Classrooms in 8 Secondary Schools, Sigra, Varanasi",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Shri Shailendra Nath Upadhyay (Fictional)",
    "mpId": "MP-LS-UP-002",
    "category": "Education",
    "implementingAgency": "Uttar Pradesh Basic Shiksha Parishad (Fictional)",
    "vendorName": "Awadh Educational Supplies Ltd (Fictional)",
    "vendorId": "VND-UP-001",
    "sanctionedAmount": 4200000,
    "expenditure": 3780000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "In Progress",
    "riskScore": 29,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-08-14",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3780000,
        "date": "2024-08-14",
        "quarter": "Q2",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 25.32,
      "longitude": 82.98
    },
    "latitude": 25.32,
    "longitude": 82.98,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-013-01",
        "projectId": "PRJ-IND-UP-013",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Establishment of Smart Classrooms in 8 Secondary Schools, Sigra, Varanasi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Awadh Educational Supplies Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Awadh Educational Supplies Ltd (Fictional)",
        "uploadedBy": "Uttar Pradesh Basic Shiksha Parishad (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-08-14",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Awadh Educational Supplies Ltd (Fictional).",
        "updatedBy": "Uttar Pradesh Basic Shiksha Parishad (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-UP-014",
    "name": "Construction of Senior Citizens Community Recreation Hall & Library, Varanasi",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Shri Shailendra Nath Upadhyay (Fictional)",
    "mpId": "MP-LS-UP-002",
    "category": "Civic",
    "implementingAgency": "Varanasi Municipal Corporation Infrastructure Wing (Fictional)",
    "vendorName": "Kashi Civil Projects (Fictional)",
    "vendorId": "VND-UP-014",
    "sanctionedAmount": 3900000,
    "expenditure": 1950000,
    "physicalProgress": 50,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 27,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-07-02",
    "quarterSpent": "Q2",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 1950000,
        "date": "2025-07-02",
        "quarter": "Q2",
        "percentage": 50.0
      }
    ],
    "siteCoordinates": {
      "latitude": 25.31,
      "longitude": 82.99
    },
    "latitude": 25.31,
    "longitude": 82.99,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-UP-014-01",
        "projectId": "PRJ-IND-UP-014",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Senior Citizens Community Recreation Hall & Library, Varanasi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Kashi Civil Projects (Fictional)",
        "sourceTag": "Received from Vendor: Kashi Civil Projects (Fictional)",
        "uploadedBy": "Varanasi Municipal Corporation Infrastructure Wing (Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-07-02",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 50,
        "financialProgress": 50.0,
        "stage": "Stage Execution (50%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Kashi Civil Projects (Fictional).",
        "updatedBy": "Varanasi Municipal Corporation Infrastructure Wing (Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3001",
    "name": "Piped Drinking Water Treatment Facility, Kolkata South",
    "state": "West Bengal",
    "district": "Kolkata",
    "constituency": "Kolkata South",
    "mpName": "Dr. Subhasis Banerjee (Fictional)",
    "mpId": "MP-LS-WE-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (West Bengal - Fictional)",
    "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-WE-001",
    "sanctionedAmount": 5600000,
    "expenditure": 4480000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 42,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4480000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3001-01",
        "projectId": "PRJ-IND-3001",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Piped Drinking Water Treatment Facility, Kolkata South.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: West Bengal National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by West Bengal National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3002",
    "name": "Asphalt Resurfacing of Rural Road Network, Howrah Feeder",
    "state": "West Bengal",
    "district": "Kolkata",
    "constituency": "Kolkata South",
    "mpName": "Dr. Subhasis Banerjee (Fictional)",
    "mpId": "MP-LS-WE-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (West Bengal - Fictional)",
    "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-WE-002",
    "sanctionedAmount": 6100000,
    "expenditure": 4880000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 55,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4880000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3002-01",
        "projectId": "PRJ-IND-3002",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Asphalt Resurfacing of Rural Road Network, Howrah Feeder.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: West Bengal National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by West Bengal National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3003",
    "name": "Renovation of Government High School Science Wing, Darjeeling",
    "state": "West Bengal",
    "district": "Kolkata",
    "constituency": "Kolkata South",
    "mpName": "Dr. Subhasis Banerjee (Fictional)",
    "mpId": "MP-LS-WE-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (West Bengal - Fictional)",
    "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-WE-003",
    "sanctionedAmount": 3800000,
    "expenditure": 3420000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 26,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3420000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3003-01",
        "projectId": "PRJ-IND-3003",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Renovation of Government High School Science Wing, Darjeeling.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: West Bengal National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by West Bengal National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3004",
    "name": "Construction of Primary Health Centre Diagnostic Block, Asansol",
    "state": "West Bengal",
    "district": "Kolkata",
    "constituency": "Kolkata South",
    "mpName": "Dr. Subhasis Banerjee (Fictional)",
    "mpId": "MP-LS-WE-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (West Bengal - Fictional)",
    "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-WE-004",
    "sanctionedAmount": 7200000,
    "expenditure": 4320000,
    "physicalProgress": 60,
    "financialProgress": 60.0,
    "status": "In Progress",
    "riskScore": 68,
    "riskLevel": "HIGH",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4320000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 60.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3004-01",
        "projectId": "PRJ-IND-3004",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Primary Health Centre Diagnostic Block, Asansol.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: West Bengal National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 60,
        "financialProgress": 60.0,
        "stage": "Stage Execution (60%)",
        "remarks": "Site work ongoing per statutory milestone schedule by West Bengal National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3005",
    "name": "Solar Street Lighting & Community Park Pavilions, Kolkata",
    "state": "West Bengal",
    "district": "Kolkata",
    "constituency": "Kolkata South",
    "mpName": "Dr. Subhasis Banerjee (Fictional)",
    "mpId": "MP-LS-WE-001",
    "category": "Civic",
    "implementingAgency": "Public Works & Infrastructure Division (West Bengal - Fictional)",
    "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-WE-005",
    "sanctionedAmount": 4500000,
    "expenditure": 4050000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 20,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4050000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.5,
      "longitude": 78.5
    },
    "latitude": 20.5,
    "longitude": 78.5,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3005-01",
        "projectId": "PRJ-IND-3005",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Solar Street Lighting & Community Park Pavilions, Kolkata.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "West Bengal National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: West Bengal National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by West Bengal National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (West Bengal - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3006",
    "name": "Rainwater Harvesting & Ground Water Recharge Wells, Jaipur",
    "state": "Rajasthan",
    "district": "Jaipur",
    "constituency": "Jaipur",
    "mpName": "Shri Raghuvir Singh Rathore (Fictional)",
    "mpId": "MP-LS-RA-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Rajasthan - Fictional)",
    "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-RA-001",
    "sanctionedAmount": 5200000,
    "expenditure": 4160000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 35,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4160000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3006-01",
        "projectId": "PRJ-IND-3006",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Rainwater Harvesting & Ground Water Recharge Wells, Jaipur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Rajasthan National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Rajasthan National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3007",
    "name": "Construction of Rural Bituminous Road, Bikaner Feeder",
    "state": "Rajasthan",
    "district": "Jaipur",
    "constituency": "Jaipur",
    "mpName": "Shri Raghuvir Singh Rathore (Fictional)",
    "mpId": "MP-LS-RA-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Rajasthan - Fictional)",
    "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-RA-002",
    "sanctionedAmount": 6500000,
    "expenditure": 5200000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 75,
    "riskLevel": "HIGH",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5200000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3007-01",
        "projectId": "PRJ-IND-3007",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Rural Bituminous Road, Bikaner Feeder.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Rajasthan National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Rajasthan National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3008",
    "name": "Modernization of Government Secondary School, Jodhpur",
    "state": "Rajasthan",
    "district": "Jaipur",
    "constituency": "Jaipur",
    "mpName": "Shri Raghuvir Singh Rathore (Fictional)",
    "mpId": "MP-LS-RA-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Rajasthan - Fictional)",
    "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-RA-003",
    "sanctionedAmount": 4200000,
    "expenditure": 3780000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 28,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3780000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3008-01",
        "projectId": "PRJ-IND-3008",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Modernization of Government Secondary School, Jodhpur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Rajasthan National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Rajasthan National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3009",
    "name": "Establishment of Solar Cold Storage Unit for Farmers, Udaipur",
    "state": "Rajasthan",
    "district": "Jaipur",
    "constituency": "Jaipur",
    "mpName": "Shri Raghuvir Singh Rathore (Fictional)",
    "mpId": "MP-LS-RA-001",
    "category": "Civic",
    "implementingAgency": "Public Works & Infrastructure Division (Rajasthan - Fictional)",
    "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-RA-004",
    "sanctionedAmount": 5800000,
    "expenditure": 3480000,
    "physicalProgress": 60,
    "financialProgress": 60.0,
    "status": "In Progress",
    "riskScore": 45,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3480000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 60.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3009-01",
        "projectId": "PRJ-IND-3009",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Establishment of Solar Cold Storage Unit for Farmers, Udaipur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Rajasthan National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 60,
        "financialProgress": 60.0,
        "stage": "Stage Execution (60%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Rajasthan National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3010",
    "name": "Community Health Diagnostic Centre & Pharmacy Wing, Jaipur",
    "state": "Rajasthan",
    "district": "Jaipur",
    "constituency": "Jaipur",
    "mpName": "Shri Raghuvir Singh Rathore (Fictional)",
    "mpId": "MP-LS-RA-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Rajasthan - Fictional)",
    "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-RA-005",
    "sanctionedAmount": 6900000,
    "expenditure": 4830000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 50,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4830000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.5,
      "longitude": 78.5
    },
    "latitude": 20.5,
    "longitude": 78.5,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3010-01",
        "projectId": "PRJ-IND-3010",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Community Health Diagnostic Centre & Pharmacy Wing, Jaipur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Rajasthan National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Rajasthan National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Rajasthan National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Rajasthan - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3011",
    "name": "Coastal Road Paving & Sea Wall Protection Drainage, Thiruvananthapuram",
    "state": "Kerala",
    "district": "Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "mpName": "Smt. Jayasree Menon (Fictional)",
    "mpId": "MP-LS-KE-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Kerala - Fictional)",
    "vendorName": "Kerala National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-KE-001",
    "sanctionedAmount": 6800000,
    "expenditure": 5440000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 40,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5440000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3011-01",
        "projectId": "PRJ-IND-3011",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Coastal Road Paving & Sea Wall Protection Drainage, Thiruvananthapuram.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Kerala National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Kerala National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Kerala - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Kerala National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Kerala - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3012",
    "name": "Smart Digital Library and Composite Skill Centre, Ernakulam",
    "state": "Kerala",
    "district": "Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "mpName": "Smt. Jayasree Menon (Fictional)",
    "mpId": "MP-LS-KE-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Kerala - Fictional)",
    "vendorName": "Kerala National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-KE-002",
    "sanctionedAmount": 4500000,
    "expenditure": 3600000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 32,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3600000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3012-01",
        "projectId": "PRJ-IND-3012",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Smart Digital Library and Composite Skill Centre, Ernakulam.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Kerala National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Kerala National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Kerala - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Kerala National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Kerala - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3013",
    "name": "Desalination RO Drinking Water Kiosks, Kozhikode",
    "state": "Kerala",
    "district": "Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "mpName": "Smt. Jayasree Menon (Fictional)",
    "mpId": "MP-LS-KE-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Kerala - Fictional)",
    "vendorName": "Kerala National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-KE-003",
    "sanctionedAmount": 5100000,
    "expenditure": 4080000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 29,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4080000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3013-01",
        "projectId": "PRJ-IND-3013",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Desalination RO Drinking Water Kiosks, Kozhikode.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Kerala National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Kerala National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Kerala - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Kerala National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Kerala - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3014",
    "name": "Sub-District Hospital Dialysis Unit Equipment Supply, Thiruvananthapuram",
    "state": "Kerala",
    "district": "Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "mpName": "Smt. Jayasree Menon (Fictional)",
    "mpId": "MP-LS-KE-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Kerala - Fictional)",
    "vendorName": "Kerala National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-KE-004",
    "sanctionedAmount": 7500000,
    "expenditure": 5250000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 48,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5250000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3014-01",
        "projectId": "PRJ-IND-3014",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Sub-District Hospital Dialysis Unit Equipment Supply, Thiruvananthapuram.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Kerala National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Kerala National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Kerala - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Kerala National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Kerala - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3015",
    "name": "Paved Agricultural Feeder Road & Culvert, Amritsar",
    "state": "Punjab",
    "district": "Amritsar",
    "constituency": "Amritsar",
    "mpName": "Sardar Gurpreet Singh Gill (Fictional)",
    "mpId": "MP-LS-PU-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Punjab - Fictional)",
    "vendorName": "Punjab National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-PU-001",
    "sanctionedAmount": 6400000,
    "expenditure": 5120000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 58,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5120000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3015-01",
        "projectId": "PRJ-IND-3015",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Paved Agricultural Feeder Road & Culvert, Amritsar.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Punjab National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Punjab National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Punjab - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Punjab National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Punjab - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3016",
    "name": "Modern Sports Ground & Gymnasium Pavilion, Jalandhar",
    "state": "Punjab",
    "district": "Amritsar",
    "constituency": "Amritsar",
    "mpName": "Sardar Gurpreet Singh Gill (Fictional)",
    "mpId": "MP-LS-PU-001",
    "category": "Civic",
    "implementingAgency": "Public Works & Infrastructure Division (Punjab - Fictional)",
    "vendorName": "Punjab National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-PU-002",
    "sanctionedAmount": 4800000,
    "expenditure": 3840000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 30,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3840000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3016-01",
        "projectId": "PRJ-IND-3016",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Modern Sports Ground & Gymnasium Pavilion, Jalandhar.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Punjab National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Punjab National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Punjab - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Punjab National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Punjab - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3017",
    "name": "Solar Powered Deep Tube-Well Water Grid, Ludhiana",
    "state": "Punjab",
    "district": "Amritsar",
    "constituency": "Amritsar",
    "mpName": "Sardar Gurpreet Singh Gill (Fictional)",
    "mpId": "MP-LS-PU-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Punjab - Fictional)",
    "vendorName": "Punjab National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-PU-003",
    "sanctionedAmount": 5500000,
    "expenditure": 4400000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 36,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4400000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3017-01",
        "projectId": "PRJ-IND-3017",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Solar Powered Deep Tube-Well Water Grid, Ludhiana.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Punjab National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Punjab National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Punjab - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Punjab National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Punjab - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3018",
    "name": "Upgradation of Civil Hospital Emergency Trauma Unit, Amritsar",
    "state": "Punjab",
    "district": "Amritsar",
    "constituency": "Amritsar",
    "mpName": "Sardar Gurpreet Singh Gill (Fictional)",
    "mpId": "MP-LS-PU-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Punjab - Fictional)",
    "vendorName": "Punjab National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-PU-004",
    "sanctionedAmount": 7000000,
    "expenditure": 4900000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 52,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4900000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3018-01",
        "projectId": "PRJ-IND-3018",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Upgradation of Civil Hospital Emergency Trauma Unit, Amritsar.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Punjab National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Punjab National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Punjab - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Punjab National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Punjab - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3019",
    "name": "Stormwater Drainage Network & Surface Channel, Ahmedabad",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "constituency": "Ahmedabad West",
    "mpName": "Shri Hiteshbhai Patel (Fictional)",
    "mpId": "MP-LS-GU-001",
    "category": "Civic",
    "implementingAgency": "Public Works & Infrastructure Division (Gujarat - Fictional)",
    "vendorName": "Gujarat National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-GU-001",
    "sanctionedAmount": 7200000,
    "expenditure": 5760000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 65,
    "riskLevel": "HIGH",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5760000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3019-01",
        "projectId": "PRJ-IND-3019",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Stormwater Drainage Network & Surface Channel, Ahmedabad.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Gujarat National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Gujarat National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Gujarat - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Gujarat National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Gujarat - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3020",
    "name": "Primary Health Centre Modernization & Diagnostic Lab, Surat",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "constituency": "Ahmedabad West",
    "mpName": "Shri Hiteshbhai Patel (Fictional)",
    "mpId": "MP-LS-GU-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Gujarat - Fictional)",
    "vendorName": "Gujarat National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-GU-002",
    "sanctionedAmount": 6000000,
    "expenditure": 4800000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 38,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4800000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3020-01",
        "projectId": "PRJ-IND-3020",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Primary Health Centre Modernization & Diagnostic Lab, Surat.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Gujarat National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Gujarat National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Gujarat - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Gujarat National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Gujarat - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3021",
    "name": "Underground Piped Drinking Water System, Vadodara",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "constituency": "Ahmedabad West",
    "mpName": "Shri Hiteshbhai Patel (Fictional)",
    "mpId": "MP-LS-GU-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Gujarat - Fictional)",
    "vendorName": "Gujarat National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-GU-003",
    "sanctionedAmount": 5400000,
    "expenditure": 4320000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 25,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4320000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3021-01",
        "projectId": "PRJ-IND-3021",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Underground Piped Drinking Water System, Vadodara.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Gujarat National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Gujarat National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Gujarat - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Gujarat National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Gujarat - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3022",
    "name": "Construction of Asphalt Industrial Feeder Road, Ahmedabad",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "constituency": "Ahmedabad West",
    "mpName": "Shri Hiteshbhai Patel (Fictional)",
    "mpId": "MP-LS-GU-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Gujarat - Fictional)",
    "vendorName": "Gujarat National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-GU-004",
    "sanctionedAmount": 6800000,
    "expenditure": 4760000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 45,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4760000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3022-01",
        "projectId": "PRJ-IND-3022",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Asphalt Industrial Feeder Road, Ahmedabad.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Gujarat National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Gujarat National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Gujarat - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Gujarat National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Gujarat - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3023",
    "name": "Flood-Resilient Concrete Feeder Road & Culverts, Patna",
    "state": "Bihar",
    "district": "Patna",
    "constituency": "Patna Sahib",
    "mpName": "Shri Ramkrishna Jha (Fictional)",
    "mpId": "MP-LS-BI-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Bihar - Fictional)",
    "vendorName": "Bihar National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-BI-001",
    "sanctionedAmount": 6200000,
    "expenditure": 4960000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 72,
    "riskLevel": "HIGH",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4960000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3023-01",
        "projectId": "PRJ-IND-3023",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Flood-Resilient Concrete Feeder Road & Culverts, Patna.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Bihar National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Bihar National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Bihar - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Bihar National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Bihar - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3024",
    "name": "Community Health Diagnostic Centre, Muzaffarpur",
    "state": "Bihar",
    "district": "Patna",
    "constituency": "Patna Sahib",
    "mpName": "Shri Ramkrishna Jha (Fictional)",
    "mpId": "MP-LS-BI-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Bihar - Fictional)",
    "vendorName": "Bihar National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-BI-002",
    "sanctionedAmount": 5800000,
    "expenditure": 4060000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 60,
    "riskLevel": "HIGH",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4060000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3024-01",
        "projectId": "PRJ-IND-3024",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Community Health Diagnostic Centre, Muzaffarpur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Bihar National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Bihar National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Bihar - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Bihar National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Bihar - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3025",
    "name": "Rooftop Solar Array for Government Girls High School, Gaya",
    "state": "Bihar",
    "district": "Patna",
    "constituency": "Patna Sahib",
    "mpName": "Shri Ramkrishna Jha (Fictional)",
    "mpId": "MP-LS-BI-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Bihar - Fictional)",
    "vendorName": "Bihar National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-BI-003",
    "sanctionedAmount": 3900000,
    "expenditure": 3510000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 22,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3510000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3025-01",
        "projectId": "PRJ-IND-3025",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Rooftop Solar Array for Government Girls High School, Gaya.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Bihar National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Bihar National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Bihar - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Bihar National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Bihar - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3026",
    "name": "Deep Borewell Automated Drinking Water Plant, Patna",
    "state": "Bihar",
    "district": "Patna",
    "constituency": "Patna Sahib",
    "mpName": "Shri Ramkrishna Jha (Fictional)",
    "mpId": "MP-LS-BI-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Bihar - Fictional)",
    "vendorName": "Bihar National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-BI-004",
    "sanctionedAmount": 4800000,
    "expenditure": 3840000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 33,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3840000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3026-01",
        "projectId": "PRJ-IND-3026",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Deep Borewell Automated Drinking Water Plant, Patna.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Bihar National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Bihar National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Bihar - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Bihar National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Bihar - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3027",
    "name": "Cyclone-Resilient Multi-Purpose Cyclone Shelter & Road, Puri",
    "state": "Odisha",
    "district": "Puri",
    "constituency": "Puri",
    "mpName": "Shri Bipin Bihari Mohapatra (Fictional)",
    "mpId": "MP-LS-OD-001",
    "category": "Civic",
    "implementingAgency": "Public Works & Infrastructure Division (Odisha - Fictional)",
    "vendorName": "Odisha National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-OD-001",
    "sanctionedAmount": 7800000,
    "expenditure": 6240000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 42,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 6240000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3027-01",
        "projectId": "PRJ-IND-3027",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Cyclone-Resilient Multi-Purpose Cyclone Shelter & Road, Puri.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Odisha National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Odisha National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Odisha - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Odisha National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Odisha - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3028",
    "name": "Piped Drinking Water Grid & Sump System, Sambalpur",
    "state": "Odisha",
    "district": "Puri",
    "constituency": "Puri",
    "mpName": "Shri Bipin Bihari Mohapatra (Fictional)",
    "mpId": "MP-LS-OD-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Odisha - Fictional)",
    "vendorName": "Odisha National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-OD-002",
    "sanctionedAmount": 5200000,
    "expenditure": 4160000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 35,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4160000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3028-01",
        "projectId": "PRJ-IND-3028",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Piped Drinking Water Grid & Sump System, Sambalpur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Odisha National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Odisha National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Odisha - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Odisha National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Odisha - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3029",
    "name": "Secondary School Science Block Modernization, Puri",
    "state": "Odisha",
    "district": "Puri",
    "constituency": "Puri",
    "mpName": "Shri Bipin Bihari Mohapatra (Fictional)",
    "mpId": "MP-LS-OD-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Odisha - Fictional)",
    "vendorName": "Odisha National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-OD-003",
    "sanctionedAmount": 4100000,
    "expenditure": 3690000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 26,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3690000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3029-01",
        "projectId": "PRJ-IND-3029",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Secondary School Science Block Modernization, Puri.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Odisha National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Odisha National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Odisha - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Odisha National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Odisha - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3030",
    "name": "Upgradation of Coastal Community Health Centre, Puri",
    "state": "Odisha",
    "district": "Puri",
    "constituency": "Puri",
    "mpName": "Shri Bipin Bihari Mohapatra (Fictional)",
    "mpId": "MP-LS-OD-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Odisha - Fictional)",
    "vendorName": "Odisha National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-OD-004",
    "sanctionedAmount": 6500000,
    "expenditure": 4550000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 50,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4550000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3030-01",
        "projectId": "PRJ-IND-3030",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Upgradation of Coastal Community Health Centre, Puri.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Odisha National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Odisha National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Odisha - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Odisha National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Odisha - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3031",
    "name": "Flood Embankment Bituminous Road Protection, Kamrup",
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "constituency": "Guwahati",
    "mpName": "Shri Dhiren Borgohain (Fictional)",
    "mpId": "MP-LS-AS-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Assam - Fictional)",
    "vendorName": "Assam National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-AS-001",
    "sanctionedAmount": 6900000,
    "expenditure": 5520000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 64,
    "riskLevel": "HIGH",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5520000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3031-01",
        "projectId": "PRJ-IND-3031",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Flood Embankment Bituminous Road Protection, Kamrup.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Assam National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Assam National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Assam - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Assam National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Assam - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3032",
    "name": "Solar Drinking Water Supply System in Hill Tracts, Sonitpur",
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "constituency": "Guwahati",
    "mpName": "Shri Dhiren Borgohain (Fictional)",
    "mpId": "MP-LS-AS-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Assam - Fictional)",
    "vendorName": "Assam National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-AS-002",
    "sanctionedAmount": 4900000,
    "expenditure": 3920000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 30,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3920000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3032-01",
        "projectId": "PRJ-IND-3032",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Solar Drinking Water Supply System in Hill Tracts, Sonitpur.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Assam National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Assam National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Assam - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Assam National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Assam - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3033",
    "name": "Construction of High School Computer Laboratory, Guwahati",
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "constituency": "Guwahati",
    "mpName": "Shri Dhiren Borgohain (Fictional)",
    "mpId": "MP-LS-AS-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Assam - Fictional)",
    "vendorName": "Assam National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-AS-003",
    "sanctionedAmount": 3800000,
    "expenditure": 3420000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 25,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3420000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3033-01",
        "projectId": "PRJ-IND-3033",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of High School Computer Laboratory, Guwahati.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Assam National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Assam National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Assam - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Assam National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Assam - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3034",
    "name": "Primary Health Centre Maternity Wing Upgradation, Kamrup",
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "constituency": "Guwahati",
    "mpName": "Shri Dhiren Borgohain (Fictional)",
    "mpId": "MP-LS-AS-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Assam - Fictional)",
    "vendorName": "Assam National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-AS-004",
    "sanctionedAmount": 6200000,
    "expenditure": 4340000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 44,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4340000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3034-01",
        "projectId": "PRJ-IND-3034",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Primary Health Centre Maternity Wing Upgradation, Kamrup.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Assam National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Assam National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Assam - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Assam National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Assam - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3035",
    "name": "Piped Drinking Water Telemetry Network, Visakhapatnam",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "constituency": "Visakhapatnam",
    "mpName": "Shri K. Venkataramana (Fictional)",
    "mpId": "MP-LS-AN-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)",
    "vendorName": "Andhra Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-AN-001",
    "sanctionedAmount": 6500000,
    "expenditure": 5200000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 38,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5200000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3035-01",
        "projectId": "PRJ-IND-3035",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Piped Drinking Water Telemetry Network, Visakhapatnam.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Andhra Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Andhra Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Andhra Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3036",
    "name": "Four-Lane Concrete Feeder Road & Storm Drain, Krishna",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "constituency": "Visakhapatnam",
    "mpName": "Shri K. Venkataramana (Fictional)",
    "mpId": "MP-LS-AN-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)",
    "vendorName": "Andhra Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-AN-002",
    "sanctionedAmount": 7200000,
    "expenditure": 5760000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 54,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5760000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3036-01",
        "projectId": "PRJ-IND-3036",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Four-Lane Concrete Feeder Road & Storm Drain, Krishna.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Andhra Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Andhra Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Andhra Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3037",
    "name": "Digital Smart Classrooms in Zilla Parishad High Schools, Visakhapatnam",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "constituency": "Visakhapatnam",
    "mpName": "Shri K. Venkataramana (Fictional)",
    "mpId": "MP-LS-AN-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)",
    "vendorName": "Andhra Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-AN-003",
    "sanctionedAmount": 4200000,
    "expenditure": 3780000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 24,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3780000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3037-01",
        "projectId": "PRJ-IND-3037",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Digital Smart Classrooms in Zilla Parishad High Schools, Visakhapatnam.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Andhra Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Andhra Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Andhra Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3038",
    "name": "Community Health Diagnostic & Telemedicine Center, Visakhapatnam",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "constituency": "Visakhapatnam",
    "mpName": "Shri K. Venkataramana (Fictional)",
    "mpId": "MP-LS-AN-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)",
    "vendorName": "Andhra Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-AN-004",
    "sanctionedAmount": 5900000,
    "expenditure": 4130000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 40,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4130000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3038-01",
        "projectId": "PRJ-IND-3038",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Community Health Diagnostic & Telemedicine Center, Visakhapatnam.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Andhra Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Andhra Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Andhra Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Andhra Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3039",
    "name": "Urban Lake Surface Drainage Rejuvenation, Bhopal",
    "state": "Madhya Pradesh",
    "district": "Bhopal",
    "constituency": "Bhopal",
    "mpName": "Smt. Archana Chouhan (Fictional)",
    "mpId": "MP-LS-MA-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)",
    "vendorName": "Madhya Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-MA-001",
    "sanctionedAmount": 5800000,
    "expenditure": 4640000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 36,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4640000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3039-01",
        "projectId": "PRJ-IND-3039",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Urban Lake Surface Drainage Rejuvenation, Bhopal.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Madhya Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Madhya Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Madhya Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3040",
    "name": "Construction of Concrete Feeder Road, Gwalior",
    "state": "Madhya Pradesh",
    "district": "Bhopal",
    "constituency": "Bhopal",
    "mpName": "Smt. Archana Chouhan (Fictional)",
    "mpId": "MP-LS-MA-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)",
    "vendorName": "Madhya Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-MA-002",
    "sanctionedAmount": 6200000,
    "expenditure": 4960000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 48,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4960000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3040-01",
        "projectId": "PRJ-IND-3040",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Concrete Feeder Road, Gwalior.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Madhya Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Madhya Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Madhya Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3041",
    "name": "Government Science College Laboratory Modernization, Bhopal",
    "state": "Madhya Pradesh",
    "district": "Bhopal",
    "constituency": "Bhopal",
    "mpName": "Smt. Archana Chouhan (Fictional)",
    "mpId": "MP-LS-MA-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)",
    "vendorName": "Madhya Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-MA-003",
    "sanctionedAmount": 4500000,
    "expenditure": 4050000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 22,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4050000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3041-01",
        "projectId": "PRJ-IND-3041",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Government Science College Laboratory Modernization, Bhopal.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Madhya Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Madhya Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Madhya Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3042",
    "name": "District Civil Hospital Pediatric ICU Equipment, Bhopal",
    "state": "Madhya Pradesh",
    "district": "Bhopal",
    "constituency": "Bhopal",
    "mpName": "Smt. Archana Chouhan (Fictional)",
    "mpId": "MP-LS-MA-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)",
    "vendorName": "Madhya Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-MA-004",
    "sanctionedAmount": 7100000,
    "expenditure": 4970000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 55,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4970000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3042-01",
        "projectId": "PRJ-IND-3042",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for District Civil Hospital Pediatric ICU Equipment, Bhopal.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Madhya Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Madhya Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Madhya Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Madhya Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3043",
    "name": "Urban Rooftop Rainwater Harvesting & Recharging Shafts, Hyderabad",
    "state": "Telangana",
    "district": "Hyderabad",
    "constituency": "Secunderabad",
    "mpName": "Shri B. Narayana Goud (Fictional)",
    "mpId": "MP-LS-TE-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Telangana - Fictional)",
    "vendorName": "Telangana National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-TE-001",
    "sanctionedAmount": 5400000,
    "expenditure": 4320000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 28,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4320000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3043-01",
        "projectId": "PRJ-IND-3043",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Urban Rooftop Rainwater Harvesting & Recharging Shafts, Hyderabad.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Telangana National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Telangana National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Telangana - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Telangana National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Telangana - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3044",
    "name": "Flyover Underside Community Park & Sports Pavilions, Secunderabad",
    "state": "Telangana",
    "district": "Hyderabad",
    "constituency": "Secunderabad",
    "mpName": "Shri B. Narayana Goud (Fictional)",
    "mpId": "MP-LS-TE-001",
    "category": "Civic",
    "implementingAgency": "Public Works & Infrastructure Division (Telangana - Fictional)",
    "vendorName": "Telangana National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-TE-002",
    "sanctionedAmount": 6200000,
    "expenditure": 4960000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 35,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4960000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3044-01",
        "projectId": "PRJ-IND-3044",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Flyover Underside Community Park & Sports Pavilions, Secunderabad.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Telangana National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Telangana National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Telangana - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Telangana National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Telangana - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3045",
    "name": "Establishment of Digital STEM Skill Center for High School Students, Hyderabad",
    "state": "Telangana",
    "district": "Hyderabad",
    "constituency": "Secunderabad",
    "mpName": "Shri B. Narayana Goud (Fictional)",
    "mpId": "MP-LS-TE-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Telangana - Fictional)",
    "vendorName": "Telangana National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-TE-003",
    "sanctionedAmount": 4800000,
    "expenditure": 4320000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 24,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4320000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3045-01",
        "projectId": "PRJ-IND-3045",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Establishment of Digital STEM Skill Center for High School Students, Hyderabad.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Telangana National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Telangana National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Telangana - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Telangana National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Telangana - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3046",
    "name": "Urban Primary Health Centre Diagnostics Modernization, Hyderabad",
    "state": "Telangana",
    "district": "Hyderabad",
    "constituency": "Secunderabad",
    "mpName": "Shri B. Narayana Goud (Fictional)",
    "mpId": "MP-LS-TE-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Telangana - Fictional)",
    "vendorName": "Telangana National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-TE-004",
    "sanctionedAmount": 6500000,
    "expenditure": 4550000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 45,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4550000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3046-01",
        "projectId": "PRJ-IND-3046",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Urban Primary Health Centre Diagnostics Modernization, Hyderabad.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Telangana National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Telangana National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Telangana - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Telangana National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Telangana - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3047",
    "name": "Stormwater Surface Drainage & Recharging Pit Network, Gurugram",
    "state": "Haryana",
    "district": "Gurugram",
    "constituency": "Gurugram",
    "mpName": "Shri Sandeep Hooda (Fictional)",
    "mpId": "MP-LS-HA-001",
    "category": "Civic",
    "implementingAgency": "Public Works & Infrastructure Division (Haryana - Fictional)",
    "vendorName": "Haryana National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-HA-001",
    "sanctionedAmount": 7500000,
    "expenditure": 6000000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 52,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 6000000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3047-01",
        "projectId": "PRJ-IND-3047",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Stormwater Surface Drainage & Recharging Pit Network, Gurugram.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Haryana National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Haryana National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Haryana - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Haryana National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Haryana - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3048",
    "name": "Construction of Paved Feeder Road, Faridabad",
    "state": "Haryana",
    "district": "Gurugram",
    "constituency": "Gurugram",
    "mpName": "Shri Sandeep Hooda (Fictional)",
    "mpId": "MP-LS-HA-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Haryana - Fictional)",
    "vendorName": "Haryana National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-HA-002",
    "sanctionedAmount": 6100000,
    "expenditure": 4880000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 40,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4880000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3048-01",
        "projectId": "PRJ-IND-3048",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of Paved Feeder Road, Faridabad.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Haryana National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Haryana National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Haryana - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Haryana National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Haryana - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3049",
    "name": "Smart Classrooms & Solar Power System in Government College, Gurugram",
    "state": "Haryana",
    "district": "Gurugram",
    "constituency": "Gurugram",
    "mpName": "Shri Sandeep Hooda (Fictional)",
    "mpId": "MP-LS-HA-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Haryana - Fictional)",
    "vendorName": "Haryana National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-HA-003",
    "sanctionedAmount": 4400000,
    "expenditure": 3960000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 25,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3960000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3049-01",
        "projectId": "PRJ-IND-3049",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Smart Classrooms & Solar Power System in Government College, Gurugram.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Haryana National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Haryana National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Haryana - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Haryana National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Haryana - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3050",
    "name": "Primary Health Centre Medical Equipment Supply, Gurugram",
    "state": "Haryana",
    "district": "Gurugram",
    "constituency": "Gurugram",
    "mpName": "Shri Sandeep Hooda (Fictional)",
    "mpId": "MP-LS-HA-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Haryana - Fictional)",
    "vendorName": "Haryana National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-HA-004",
    "sanctionedAmount": 5800000,
    "expenditure": 4060000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 38,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4060000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.4,
      "longitude": 78.4
    },
    "latitude": 20.4,
    "longitude": 78.4,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3050-01",
        "projectId": "PRJ-IND-3050",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Primary Health Centre Medical Equipment Supply, Gurugram.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Haryana National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Haryana National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Haryana - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Haryana National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Haryana - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3051",
    "name": "Tribal Village Solar Piped Drinking Water Network, Ranchi",
    "state": "Jharkhand",
    "district": "Ranchi",
    "constituency": "Ranchi",
    "mpName": "Shri Birsa Mundu (Fictional)",
    "mpId": "MP-LS-JH-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Jharkhand - Fictional)",
    "vendorName": "Jharkhand National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-JH-001",
    "sanctionedAmount": 5200000,
    "expenditure": 4160000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 64,
    "riskLevel": "HIGH",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4160000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3051-01",
        "projectId": "PRJ-IND-3051",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Tribal Village Solar Piped Drinking Water Network, Ranchi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Jharkhand National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Jharkhand National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Jharkhand - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Jharkhand National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Jharkhand - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3052",
    "name": "Construction of All-Weather Concrete Village Feeder Road, Ranchi",
    "state": "Jharkhand",
    "district": "Ranchi",
    "constituency": "Ranchi",
    "mpName": "Shri Birsa Mundu (Fictional)",
    "mpId": "MP-LS-JH-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Jharkhand - Fictional)",
    "vendorName": "Jharkhand National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-JH-002",
    "sanctionedAmount": 6300000,
    "expenditure": 5040000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 75,
    "riskLevel": "HIGH",
    "daysDelayed": 15,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 5040000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3052-01",
        "projectId": "PRJ-IND-3052",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Construction of All-Weather Concrete Village Feeder Road, Ranchi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Jharkhand National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Jharkhand National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Jharkhand - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Jharkhand National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Jharkhand - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3053",
    "name": "Establishment of Vocational Skill Center for Youth, Ranchi",
    "state": "Jharkhand",
    "district": "Ranchi",
    "constituency": "Ranchi",
    "mpName": "Shri Birsa Mundu (Fictional)",
    "mpId": "MP-LS-JH-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Jharkhand - Fictional)",
    "vendorName": "Jharkhand National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-JH-003",
    "sanctionedAmount": 4200000,
    "expenditure": 3780000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 28,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3780000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3053-01",
        "projectId": "PRJ-IND-3053",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Establishment of Vocational Skill Center for Youth, Ranchi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Jharkhand National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Jharkhand National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Jharkhand - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Jharkhand National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Jharkhand - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3054",
    "name": "Hill Slope Road Retaining Wall & Bituminous Paving, Shimla",
    "state": "Himachal Pradesh",
    "district": "Shimla",
    "constituency": "Shimla",
    "mpName": "Shri Yashwant Verma (Fictional)",
    "mpId": "MP-LS-HI-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)",
    "vendorName": "Himachal Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-HI-001",
    "sanctionedAmount": 5900000,
    "expenditure": 4720000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 45,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4720000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3054-01",
        "projectId": "PRJ-IND-3054",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Hill Slope Road Retaining Wall & Bituminous Paving, Shimla.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Himachal Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Himachal Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Himachal Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3055",
    "name": "Gravity-Fed Spring Water Supply Network, Shimla Rural",
    "state": "Himachal Pradesh",
    "district": "Shimla",
    "constituency": "Shimla",
    "mpName": "Shri Yashwant Verma (Fictional)",
    "mpId": "MP-LS-HI-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)",
    "vendorName": "Himachal Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-HI-002",
    "sanctionedAmount": 4600000,
    "expenditure": 3680000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 30,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3680000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3055-01",
        "projectId": "PRJ-IND-3055",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Gravity-Fed Spring Water Supply Network, Shimla Rural.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Himachal Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Himachal Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Himachal Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3056",
    "name": "Rooftop Solar Heating & Computer Center in Government School, Shimla",
    "state": "Himachal Pradesh",
    "district": "Shimla",
    "constituency": "Shimla",
    "mpName": "Shri Yashwant Verma (Fictional)",
    "mpId": "MP-LS-HI-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)",
    "vendorName": "Himachal Pradesh National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-HI-003",
    "sanctionedAmount": 3700000,
    "expenditure": 3330000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 22,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3330000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3056-01",
        "projectId": "PRJ-IND-3056",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Rooftop Solar Heating & Computer Center in Government School, Shimla.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Himachal Pradesh National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Himachal Pradesh National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Himachal Pradesh National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Himachal Pradesh - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3057",
    "name": "Modernization of MCD Primary School Computer Labs, New Delhi",
    "state": "Delhi (UT)",
    "district": "New Delhi",
    "constituency": "New Delhi",
    "mpName": "Shri Ravinder Kaushik (Fictional)",
    "mpId": "MP-LS-DE-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)",
    "vendorName": "Delhi (UT) National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-DE-001",
    "sanctionedAmount": 4600000,
    "expenditure": 4140000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 25,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4140000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3057-01",
        "projectId": "PRJ-IND-3057",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Modernization of MCD Primary School Computer Labs, New Delhi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Delhi (UT) National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Delhi (UT) National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Delhi (UT) National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3058",
    "name": "Installation of Solar Powered Smart Public Water Kiosks, Central Delhi",
    "state": "Delhi (UT)",
    "district": "New Delhi",
    "constituency": "New Delhi",
    "mpName": "Shri Ravinder Kaushik (Fictional)",
    "mpId": "MP-LS-DE-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)",
    "vendorName": "Delhi (UT) National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-DE-002",
    "sanctionedAmount": 4200000,
    "expenditure": 3360000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 32,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3360000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3058-01",
        "projectId": "PRJ-IND-3058",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Installation of Solar Powered Smart Public Water Kiosks, Central Delhi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Delhi (UT) National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Delhi (UT) National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Delhi (UT) National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3059",
    "name": "Senior Citizens Recreation & Healthcare Wellness Center, New Delhi",
    "state": "Delhi (UT)",
    "district": "New Delhi",
    "constituency": "New Delhi",
    "mpName": "Shri Ravinder Kaushik (Fictional)",
    "mpId": "MP-LS-DE-001",
    "category": "Health",
    "implementingAgency": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)",
    "vendorName": "Delhi (UT) National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-DE-003",
    "sanctionedAmount": 5500000,
    "expenditure": 3850000,
    "physicalProgress": 70,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 36,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3850000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 70.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3059-01",
        "projectId": "PRJ-IND-3059",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Senior Citizens Recreation & Healthcare Wellness Center, New Delhi.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Delhi (UT) National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Delhi (UT) National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 70,
        "financialProgress": 70.0,
        "stage": "Stage Execution (70%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Delhi (UT) National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Delhi (UT) - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3060",
    "name": "Hilly Terrain Link Road & Anti-Landslide Protection Drainage, Dehradun",
    "state": "Uttarakhand",
    "district": "Dehradun",
    "constituency": "Tehri Garhwal",
    "mpName": "Shri Mahendra Rawat (Fictional)",
    "mpId": "MP-LS-UT-001",
    "category": "Road",
    "implementingAgency": "Public Works & Infrastructure Division (Uttarakhand - Fictional)",
    "vendorName": "Uttarakhand National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-UT-001",
    "sanctionedAmount": 6100000,
    "expenditure": 4880000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 44,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 4880000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.1,
      "longitude": 78.1
    },
    "latitude": 20.1,
    "longitude": 78.1,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3060-01",
        "projectId": "PRJ-IND-3060",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Hilly Terrain Link Road & Anti-Landslide Protection Drainage, Dehradun.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Uttarakhand National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Uttarakhand National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Uttarakhand - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Uttarakhand National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Uttarakhand - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3061",
    "name": "Solar Drinking Water Pumping Grid for Hill Villages, Tehri",
    "state": "Uttarakhand",
    "district": "Dehradun",
    "constituency": "Tehri Garhwal",
    "mpName": "Shri Mahendra Rawat (Fictional)",
    "mpId": "MP-LS-UT-001",
    "category": "Water",
    "implementingAgency": "Public Works & Infrastructure Division (Uttarakhand - Fictional)",
    "vendorName": "Uttarakhand National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-UT-002",
    "sanctionedAmount": 4700000,
    "expenditure": 3760000,
    "physicalProgress": 80,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 28,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2024-25",
    "dateSpent": "2024-10-15",
    "quarterSpent": "Q3",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3760000,
        "date": "2024-10-15",
        "quarter": "Q3",
        "percentage": 80.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.2,
      "longitude": 78.2
    },
    "latitude": 20.2,
    "longitude": 78.2,
    "ucStatus": "NOT_SUBMITTED",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3061-01",
        "projectId": "PRJ-IND-3061",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Solar Drinking Water Pumping Grid for Hill Villages, Tehri.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Uttarakhand National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Uttarakhand National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Uttarakhand - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2024-10-15",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 80,
        "financialProgress": 80.0,
        "stage": "Stage Execution (80%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Uttarakhand National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Uttarakhand - Fictional)"
      }
    ]
  },
  {
    "id": "PRJ-IND-3062",
    "name": "Secondary School Digital Science Laboratory, Dehradun",
    "state": "Uttarakhand",
    "district": "Dehradun",
    "constituency": "Tehri Garhwal",
    "mpName": "Shri Mahendra Rawat (Fictional)",
    "mpId": "MP-LS-UT-001",
    "category": "Education",
    "implementingAgency": "Public Works & Infrastructure Division (Uttarakhand - Fictional)",
    "vendorName": "Uttarakhand National Infra Ventures Ltd (Fictional)",
    "vendorId": "VND-UT-003",
    "sanctionedAmount": 3600000,
    "expenditure": 3240000,
    "physicalProgress": 90,
    "financialProgress": 90.0,
    "status": "Completed",
    "riskScore": 20,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false,
    "financialYear": "2025-26",
    "dateSpent": "2025-06-20",
    "quarterSpent": "Q1",
    "fundDumpingFlag": false,
    "disbursements": [
      {
        "tranche": "T1",
        "amount": 3240000,
        "date": "2025-06-20",
        "quarter": "Q1",
        "percentage": 90.0
      }
    ],
    "siteCoordinates": {
      "latitude": 20.3,
      "longitude": 78.3
    },
    "latitude": 20.3,
    "longitude": 78.3,
    "ucStatus": "OVERDUE",
    "evidenceArtifacts": [
      {
        "id": "EVD-PRJ-IND-3062-01",
        "projectId": "PRJ-IND-3062",
        "milestoneStage": "Foundation & Earthwork Inspection",
        "description": "Site verification photos and core sample test reports for Secondary School Digital Science Laboratory, Dehradun.",
        "photoUrl": "/assets/evidence/site_progress.jpg",
        "fileName": "milestone_inspection_photo_01.jpg",
        "uploadedAt": "2026-01-15T11:30:00Z",
        "vendorName": "Uttarakhand National Infra Ventures Ltd (Fictional)",
        "sourceTag": "Received from Vendor: Uttarakhand National Infra Ventures Ltd (Fictional)",
        "uploadedBy": "Public Works & Infrastructure Division (Uttarakhand - Fictional)"
      }
    ],
    "progressUpdates": [
      {
        "date": "2025-06-20",
        "timestamp": "2026-02-10T14:00:00Z",
        "physicalProgress": 90,
        "financialProgress": 90.0,
        "stage": "Stage Execution (90%)",
        "remarks": "Site work ongoing per statutory milestone schedule by Uttarakhand National Infra Ventures Ltd (Fictional).",
        "updatedBy": "Public Works & Infrastructure Division (Uttarakhand - Fictional)"
      }
    ]
  }
];
const FALLBACK_COMPLAINTS = [
  {
    "id": "CIT-2026-101",
    "projectId": "PRJ-IND-2003",
    "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "complaintText": "The contractor claimed 90% of the digital library and reading hall civil work is finished, but on the ground only the bare external brick walls stand without a roof slab, windows, or plastering. Heavy monsoon water has accumulated inside and no work has happened for two months.",
    "contradictionScore": 0.92,
    "isContradiction": true,
    "officialClaim": "Physical progress certified at 85%; digital library civil structure and composite hall nearing completion.",
    "citizenSummary": "Citizen visual inspection reveals incomplete bare brick shell without roof, contradicting certified 85% progress.",
    "submittedAt": "2026-07-18T11:20:00Z",
    "status": "Under Investigation",
    "nlpConfidence": 0.94,
    "geoMatchDistance": 0.3
  },
  {
    "id": "CIT-2026-102",
    "projectId": "PRJ-IND-2008",
    "projectName": "Provision of Modern Dual-Desk Ergonomic Furniture for 12 Classrooms, Lucknow",
    "district": "Lucknow",
    "state": "Uttar Pradesh",
    "complaintText": "School authorities reported receiving all 120 sets of ergonomic dual-desks on the official portal, but our village school children are still sitting on floor mats. Only 15 broken wooden benches were delivered from an older school.",
    "contradictionScore": 0.88,
    "isContradiction": true,
    "officialClaim": "100% supply and delivery of modern dual-desk classroom furniture verified by school inspector.",
    "citizenSummary": "Citizen report indicates students sitting on floor mats; only 15 legacy benches delivered instead of 120 sanctioned desks.",
    "submittedAt": "2026-07-24T14:45:00Z",
    "status": "Escalated to State Nodal",
    "nlpConfidence": 0.89,
    "geoMatchDistance": 4.8
  },
  {
    "id": "CIT-2026-103",
    "projectId": "PRJ-IND-2014",
    "projectName": "Multi-Village Piped Drinking Water Supply Grid with Automated Flow Meters, Chennai",
    "district": "Chennai",
    "state": "Tamil Nadu",
    "complaintText": "The piped water distribution grid has recorded 80% expenditure release, but in our habitation, pipes were laid loosely along the ditch without trenching and have never been connected to the overhead reservoir. Zero water has flowed.",
    "contradictionScore": 0.91,
    "isContradiction": true,
    "officialClaim": "80% pipeline network laid with automated flow telemetry testing in progress.",
    "citizenSummary": "Grievance confirms feeder pipes are un-trenched and disconnected from storage tank; zero drinking water supply.",
    "submittedAt": "2026-08-02T09:30:00Z",
    "status": "Pending Inspection",
    "nlpConfidence": 0.93,
    "geoMatchDistance": 0.7
  },
  {
    "id": "CIT-2026-104",
    "projectId": "PRJ-IND-2019",
    "projectName": "Percolation Tank and Micro-Check Dam Rejuvenation Network, Bengaluru Urban",
    "district": "Bengaluru Urban",
    "state": "Karnataka",
    "complaintText": "The percolation tank desilting and earthen check dam work was recorded as completed at ₹72 Lakh cost. However, the tank bed is still choked with weeds and the bund wall breached during the first rain shower.",
    "contradictionScore": 0.84,
    "isContradiction": true,
    "officialClaim": "Desiltation and micro-check dam bund stabilization completed and certified operational.",
    "citizenSummary": "Citizen highlights un-desilted tank bed and breached bund structure, contesting official completion certificate.",
    "submittedAt": "2026-08-08T16:15:00Z",
    "status": "Referred to Implementing Agency",
    "nlpConfidence": 0.87,
    "geoMatchDistance": 0.2
  },
  {
    "id": "CIT-2026-105",
    "projectId": "PRJ-IND-2025",
    "projectName": "Solid Waste Material Recovery Facility with Mechanical Trommel Sieve, Kolkata",
    "district": "Kolkata",
    "state": "West Bengal",
    "complaintText": "The covered reinforced concrete outfall drain exists only on paper for the northern 200-meter stretch. The contractor simply dumped loose mud along the road edge and billed it as finished concrete box culvert.",
    "contradictionScore": 0.95,
    "isContradiction": true,
    "officialClaim": "75% concrete box drain structure completed with pre-cast cover slabs installed.",
    "citizenSummary": "No concrete box drain exists on ground along northern segment; only unpaved earthen mound present.",
    "submittedAt": "2026-08-12T10:00:00Z",
    "status": "Under Investigation",
    "nlpConfidence": 0.96,
    "geoMatchDistance": 6.1
  },
  {
    "id": "CIT-2026-106",
    "projectId": "PRJ-IND-2031",
    "projectName": "All-Weather Paver Block Pavement in Dense Habitation Sector, Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "complaintText": "The bituminous top layer was laid over uncompacted loose red soil without any crushed stone base course. The entire road surface washed away in two weeks of monsoon rain, creating dangerous trenches.",
    "contradictionScore": 0.79,
    "isContradiction": true,
    "officialClaim": "Bituminous surface course and drainage shoulders completed as per IRC road specifications.",
    "citizenSummary": "Premature failure and disintegration of road surface due to missing granular sub-base layer.",
    "submittedAt": "2026-08-16T15:40:00Z",
    "status": "Quality Audit Scheduled",
    "nlpConfidence": 0.82,
    "geoMatchDistance": 0.5
  },
  {
    "id": "CIT-2026-107",
    "projectId": "PRJ-IND-2038",
    "projectName": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "complaintText": "The access bridge construction has been completely stalled since March. The contractor left steel rebars exposed to rust in the stream bed and dismantled their site equipment three months ago.",
    "contradictionScore": 0.86,
    "isContradiction": true,
    "officialClaim": "Substructure pier casting complete; deck slab reinforcement in active execution.",
    "citizenSummary": "Site deserted for three months with exposed rusting rebar, contradicting ongoing active work claims.",
    "submittedAt": "2026-08-20T12:10:00Z",
    "status": "Land Survey Ordered",
    "nlpConfidence": 0.88,
    "geoMatchDistance": 5.4
  },
  {
    "id": "CIT-2026-108",
    "projectId": "PRJ-IND-2001",
    "projectName": "Upgradation and Bituminous Surfacing of Main Rural Feeder Road, Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "complaintText": "The newly paved rural feeder road is smooth and has drastically reduced transport time to the agricultural mandi. We request speed calming rumbler strips near the dispensary crossing.",
    "contradictionScore": 0.12,
    "isContradiction": false,
    "officialClaim": "Road widening and bituminous overhaul completed and handed over.",
    "citizenSummary": "Citizen verifies successful completion and requests auxiliary road safety measures.",
    "submittedAt": "2026-06-25T11:00:00Z",
    "status": "Feedback Noted",
    "nlpConfidence": 0.95,
    "geoMatchDistance": 0.4
  },
  {
    "id": "CIT-2026-109",
    "projectId": "PRJ-IND-2004",
    "projectName": "Installation of 1500 LPH Community Fluoride and Arsenic Filtration Plant, Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "complaintText": "The automated fluoride filtration plant in our ward was installed last month. Clean water testing was demonstrated to residents and the supply runs daily from 6 AM to 10 AM.",
    "contradictionScore": 0.08,
    "isContradiction": false,
    "officialClaim": "Fluoride filtration plant erected and supply commissioning verified by Junior Engineer.",
    "citizenSummary": "Citizen corroborates functional operation and daily drinking water distribution.",
    "submittedAt": "2026-07-02T16:30:00Z",
    "status": "Corroborated",
    "nlpConfidence": 0.98,
    "geoMatchDistance": 0.1
  },
  {
    "id": "CIT-2026-110",
    "projectId": "PRJ-IND-2010",
    "projectName": "Modernization of Crematorium Ground with Eco-Friendly Gasifier Furnace, Varanasi",
    "district": "Varanasi",
    "state": "Uttar Pradesh",
    "complaintText": "The material recovery facility shed is fully constructed and segregated dry waste sorting began last Monday. Sanitation workers are actively operating the trommel screen.",
    "contradictionScore": 0.05,
    "isContradiction": false,
    "officialClaim": "Solid waste material recovery facility civil works completed and equipment handed over.",
    "citizenSummary": "Citizen confirms operational status and active waste processing.",
    "submittedAt": "2026-07-15T09:15:00Z",
    "status": "Corroborated",
    "nlpConfidence": 0.99,
    "geoMatchDistance": 0.2
  },
  {
    "id": "CIT-2026-111",
    "projectId": "PRJ-IND-2015",
    "projectName": "Construction of Covered Reinforced Concrete Stormwater Outfall Drain, Madurai",
    "district": "Madurai",
    "state": "Tamil Nadu",
    "complaintText": "Road widening work is progressing steadily on our sector link. The stone base layer is being compacted with heavy vibratory rollers as scheduled.",
    "contradictionScore": 0.15,
    "isContradiction": false,
    "officialClaim": "Road sub-base construction in progress at 45% completion.",
    "citizenSummary": "Citizen confirms active site work and heavy machinery compaction as per schedule.",
    "submittedAt": "2026-07-29T14:00:00Z",
    "status": "Instructions Dispatched",
    "nlpConfidence": 0.96
  },
  {
    "id": "CIT-2026-112",
    "projectId": "PRJ-IND-2022",
    "projectName": "Emergency Trauma Triage Unit and Solar Inverter Power Backup, Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "complaintText": "The specialized maternal care ward construction is progressing well. Outer brickwork and window frames are in place and electrical conduits are being laid.",
    "contradictionScore": 0.06,
    "isContradiction": false,
    "officialClaim": "Civil superstructure 65% completed with internal electromechanical conduit work active.",
    "citizenSummary": "Citizen corroborates active building progress and electrical piping.",
    "submittedAt": "2026-08-04T18:20:00Z",
    "status": "Corroborated",
    "nlpConfidence": 0.99
  },
  {
    "id": "CIT-2026-113",
    "projectId": "PRJ-IND-2050",
    "projectName": "Construction of Covered Reinforced Concrete Stormwater Outfall Drain, Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "complaintText": "Contractor has left steel columns unbolted and loose roofing sheets lying in the open ground for over 50 days, creating a hazard for passing cattle and school children.",
    "contradictionScore": 0.85,
    "isContradiction": true,
    "officialClaim": "Structural steel roof truss assembly certified 70% complete.",
    "citizenSummary": "Unsecured materials and halted erection pose public safety hazard; work stalled.",
    "submittedAt": "2026-08-19T10:45:00Z",
    "status": "Inspection Ordered",
    "nlpConfidence": 0.89
  },
  {
    "id": "CIT-2026-114",
    "projectId": "PRJ-IND-2072",
    "projectName": "Setting up of 6-Bed Neonatal Intensive Stabilization Centre at CHC, Sonitpur",
    "district": "Sonitpur",
    "state": "Assam",
    "complaintText": "The new automated pathology analyzer in the district hospital was installed and free diagnostic blood testing began this week. Report delivery is fast and efficient.",
    "contradictionScore": 0.04,
    "isContradiction": false,
    "officialClaim": "Automated clinical analyzer installed, calibrated, and operational for OPD patients.",
    "citizenSummary": "Citizen confirms clinical machinery is functional and serving patients.",
    "submittedAt": "2026-08-25T13:30:00Z",
    "status": "Corroborated",
    "nlpConfidence": 0.99
  }
];

export let allProjects = FALLBACK_PROJECTS;
export let allComplaints = FALLBACK_COMPLAINTS;

export async function initProjectData() {
  if (typeof fetch !== 'function') return;
  try {
    const res = await fetch('http://127.0.0.1:8000/projects');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        allProjects = data;
      }
    }
  } catch {}
}

/**
 * Finds a project record by ID.
 */
export function getProjectById(projectId) {
  if (typeof window !== 'undefined') {
    if (Array.isArray(window._setuCurrentProjects)) {
      const match = window._setuCurrentProjects.find((p) => p.id === projectId);
      if (match) return match;
    }
    if (Array.isArray(window._setuScopedProjects)) {
      const match = window._setuScopedProjects.find((p) => p.id === projectId);
      if (match) return match;
    }
  }
  if (!projectId) return allProjects[0] || null;
  return allProjects.find((p) => p.id === projectId) || null;
}

export const liveCitizenReportsCache = {};

/**
 * Finds citizen complaints linked to a project ID.
 */
export function getComplaintsForProject(projectId) {
  if (!projectId) return [];
  if (liveCitizenReportsCache[projectId]) {
    return liveCitizenReportsCache[projectId];
  }
  return allComplaints.filter((c) => c.projectId === projectId);
}

/**
 * Asynchronously fetches live citizen reports from backend API.
 */
export async function fetchLiveCitizenReports(projectId) {
  if (!projectId) return [];
  try {
    const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('setu_auth_token') : null;
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(`http://127.0.0.1:8000/projects/${projectId}/citizen-reports`, { headers });
    if (res.ok) {
      const data = await res.json();
      if (data && data.reports) {
        liveCitizenReportsCache[projectId] = data.reports;
        return data.reports;
      }
    }
  } catch (err) {
    // Graceful fallback to static data
  }
  return getComplaintsForProject(projectId);
}

/**
 * Generates a plain-language risk score explanation.
 */
export function getRiskExplanation(p) {
  if (!p) return '';
  const score = p.riskScore || 0;
  
  if (score >= 60 || p.riskLevel === 'HIGH') {
    const reasons = [];
    if (p.paymentProgressMismatch) {
      reasons.push(`Disbursement rate of ${p.financialProgress}% significantly leads verified physical execution of ${p.physicalProgress}%, suggesting unverified advance payments.`);
    }
    if (p.duplicateRisk) {
      reasons.push('Geospatial clustering indicates a 91% similarity with a prior municipality-funded asset within 400 meters.');
    }
    if (p.costOverrun) {
      reasons.push(`Expenditures approach the sanctioned ceiling of ₹${Number(p.sanctionedAmount).toLocaleString('en-IN')} while primary civil milestones remain incomplete.`);
    }
    if (p.daysDelayed > 0) {
      reasons.push(`Implementation has experienced chronic timeline slippage of ${p.daysDelayed} days beyond the statutory milestone schedule.`);
    }
    if (reasons.length === 0) {
      reasons.push('Anomalous material procurement pace and delayed stage certification recorded during nodal audit review.');
    }
    return `HIGH RISK (${score}/100) — Priority Audit Intervention Recommended. ${reasons.join(' ')}`;
  }

  if (score >= 40 || p.riskLevel === 'MEDIUM') {
    const delayText = p.daysDelayed > 0 ? ` with minor timeline lag of ${p.daysDelayed} days.` : '.';
    return `MEDIUM RISK (${score}/100) — Moderate Monitoring Recommended. Work progress and fund disbursement are largely aligned with scheduled milestones${delayText}`;
  }

  return `LOW RISK (${score}/100) — Healthy Implementation. All milestones are on schedule with verified physical sign-offs and balanced expenditure pacing.`;
}

/**
 * Generates formatted HTML for Project Detail tabbed view.
 */
export function getProjectDetailHtml(projectId, activeTab = 'overview') {
  const p = getProjectById(projectId);
  if (!p) {
    return `
      <div class="setu-detail-container">
        <div class="setu-empty-state">
          <h2 class="setu-empty-state-title">Project Not Found</h2>
          <p class="setu-empty-state-text">No project matching ID "${projectId}" could be found.</p>
          <a href="#/dashboard" class="setu-btn-primary" style="margin-top: 16px;">Return to Dashboard</a>
        </div>
      </div>
    `;
  }

  const savedRole = typeof sessionStorage !== 'undefined' ? (sessionStorage.getItem('setu_auth_role') || '') : '';
  const rawUser = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('setu_auth_user') : null;
  let currentUser = null;
  if (rawUser) {
    try { currentUser = JSON.parse(rawUser); } catch {}
  }

  const isAgencyRole = savedRole.toLowerCase().includes('implementing') || 
                       (currentUser && (currentUser.role?.toLowerCase().includes('implementing') || currentUser.roleId?.includes('agency')));

  const isMpRole = !isAgencyRole && (
    savedRole.toLowerCase().includes('mp') ||
    (currentUser && (
      currentUser.accessScope === 'constituency_only' ||
      currentUser.accessScope === 'nominated_mp_districts' ||
      currentUser.roleId === 'mp_office' ||
      /\bmp\b/i.test(currentUser.role || '')
    ))
  );

  // Strictly enforce jurisdiction boundary for MP Office
  if (isMpRole && currentUser) {
    const isNominated = currentUser.mpType === 'NOMINATED_MP' || Boolean(currentUser.chosenDistricts) || currentUser.accessScope === 'nominated_mp_districts';
    let isMismatch = false;
    let mismatchDetail = '';

    if (isNominated) {
      const chosen = (currentUser.chosenDistricts || []).map((d) => d.toLowerCase().trim());
      const projDist = (p.district || '').toLowerCase().trim();
      if (chosen.length > 0 && !chosen.includes(projDist) && (!currentUser.mpId || p.mpId !== currentUser.mpId)) {
        isMismatch = true;
        mismatchDetail = `Project '${p.id}' is located in ${p.district} (${p.state}), outside your chosen nominated districts (${currentUser.chosenDistricts ? currentUser.chosenDistricts.join(', ') : 'Assigned Districts'}).`;
      }
    } else {
      const userConst = (currentUser.constituency || '').toLowerCase().trim();
      const projConst = (p.constituency || '').toLowerCase().trim();
      if (userConst && projConst && userConst !== projConst && (!currentUser.mpId || p.mpId !== currentUser.mpId)) {
        isMismatch = true;
        mismatchDetail = `Project '${p.id}' belongs to '${p.constituency}' constituency, outside your authorized parliamentary constituency ('${currentUser.constituency}').`;
      }
    }

    if (isMismatch) {
      return `
        <div class="setu-detail-container">
          <div class="setu-detail-top-bar">
            <a href="#/dashboard" class="setu-back-to-dashboard" id="btn-back-dashboard">
              ← Return to My Projects Dashboard
            </a>
          </div>
          <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 48px 24px; border-radius: 8px; text-align: center; margin-top: 24px; box-shadow: var(--setu-shadow-sm);">
            <div style="font-size: 40px; margin-bottom: 12px;">🔒</div>
            <h2 class="setu-empty-state-title" style="color: #991b1b; font-size: 20px; font-weight: 700; margin-bottom: 8px;">Access Restricted — Out of Constituency Scope</h2>
            <p class="setu-empty-state-text" style="max-width: 580px; margin: 0 auto 20px auto; color: var(--setu-color-text-secondary); line-height: 1.5;">
              ${mismatchDetail} Under statutory MPLADS oversight rules (<strong>ROLES.md</strong>), MP Office accounts are strictly scoped to their own constituency or chosen nominated districts.
            </p>
            <a href="#/dashboard" class="setu-btn-primary" style="display: inline-block; padding: 10px 24px; border-radius: 4px;">Return to My Authorized Projects</a>
          </div>
        </div>
      `;
    }
  }

  // Strictly enforce jurisdiction boundary for Implementing Agency
  if (isAgencyRole && currentUser) {
    const userDist = (currentUser.district || '').toLowerCase().trim();
    const projDist = (p.district || '').toLowerCase().trim();
    let isDistrictMismatch = userDist && projDist && userDist !== projDist;

    let isAgencyMismatch = false;
    if (currentUser.agency) {
      const uAg = currentUser.agency.toLowerCase();
      const pAg = (p.implementingAgency || '').toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      
      const isPwdUser = uAg.includes('pwd') || uAg.includes('public works');
      const isTwadUser = uAg.includes('twad') || uAg.includes('water supply') || uAg.includes('drainage');
      const isHealthUser = uAg.includes('health') || uAg.includes('medical');
      const isEduUser = uAg.includes('education') || uAg.includes('shiksha');

      if (isPwdUser && !pCat.includes('road') && !pCat.includes('building') && !pCat.includes('civic') && !pAg.includes('pwd')) {
        isAgencyMismatch = true;
      } else if (isTwadUser && !pCat.includes('water') && !pAg.includes('twad') && !pAg.includes('water')) {
        isAgencyMismatch = true;
      } else if (isHealthUser && !pCat.includes('health') && !pAg.includes('health')) {
        isAgencyMismatch = true;
      } else if (isEduUser && !pCat.includes('education') && !pAg.includes('education') && !pAg.includes('shiksha')) {
        isAgencyMismatch = true;
      }
    }

    if (isDistrictMismatch || isAgencyMismatch) {
      return `
        <div class="setu-detail-container">
          <div class="setu-detail-top-bar">
            <a href="#/dashboard" class="setu-back-to-dashboard" id="btn-back-dashboard">
              ← Return to Execution Workspace
            </a>
          </div>
          <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 48px 24px; border-radius: 8px; text-align: center; margin-top: 24px; box-shadow: var(--setu-shadow-sm);">
            <div style="font-size: 40px; margin-bottom: 12px;">🔒</div>
            <h2 class="setu-empty-state-title" style="color: #991b1b; font-size: 20px; font-weight: 700; margin-bottom: 8px;">Access Restricted — Out of Jurisdictional Scope</h2>
            <p class="setu-empty-state-text" style="max-width: 580px; margin: 0 auto 20px auto; color: var(--setu-color-text-secondary); line-height: 1.5;">
              Project <strong>${p.id}</strong> (${p.category} • ${p.district}, ${p.state}) is outside your assigned line agency jurisdiction. Under statutory MPLADS RBAC rules, Implementing Agency personnel can only access project records within their own assigned district and category scope.
            </p>
            <a href="#/dashboard" class="setu-btn-primary" style="display: inline-block; padding: 10px 24px; border-radius: 4px;">Return to My Assigned Works</a>
          </div>
        </div>
      `;
    }
  }

  // Strictly enforce jurisdiction boundary for District Authority
  const isDistrictRole = !isAgencyRole && !isMpRole && (
    savedRole.toLowerCase().includes('district') ||
    (currentUser && (
      currentUser.accessScope === 'district_all' ||
      currentUser.roleId === 'district_authority' ||
      /district/i.test(currentUser.role || '')
    ))
  );

  if (isDistrictRole && currentUser && currentUser.district) {
    const userDist = (currentUser.district || '').toLowerCase().trim();
    const projDist = (p.district || '').toLowerCase().trim();
    if (userDist && projDist && userDist !== projDist) {
      return `
        <div class="setu-detail-container">
          <div class="setu-detail-top-bar">
            <a href="#/dashboard" class="setu-back-to-dashboard" id="btn-back-dashboard">
              ← Return to District Dashboard
            </a>
          </div>
          <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 48px 24px; border-radius: 8px; text-align: center; margin-top: 24px; box-shadow: var(--setu-shadow-sm);">
            <div style="font-size: 40px; margin-bottom: 12px;">🔒</div>
            <h2 class="setu-empty-state-title" style="color: #991b1b; font-size: 20px; font-weight: 700; margin-bottom: 8px;">Access Restricted — Out of District Jurisdiction</h2>
            <p class="setu-empty-state-text" style="max-width: 580px; margin: 0 auto 20px auto; color: var(--setu-color-text-secondary); line-height: 1.5;">
              Project <strong>${p.id}</strong> is located in <strong>${p.district} (${p.state})</strong>, outside your assigned district oversight jurisdiction (<strong>${currentUser.district}</strong>). Under statutory MPLADS oversight rules (<strong>ROLES.md</strong>), District Authority accounts are strictly scoped to their own district.
            </p>
            <a href="#/dashboard" class="setu-btn-primary" style="display: inline-block; padding: 10px 24px; border-radius: 4px;">Return to My Authorized District Projects</a>
          </div>
        </div>
      `;
    }
  }

  // Strictly enforce jurisdiction boundary for State Nodal Authority
  const isStateRole = !isAgencyRole && !isMpRole && !isDistrictRole && (
    savedRole.toLowerCase().includes('state') ||
    (currentUser && (
      currentUser.accessScope === 'state_only' ||
      currentUser.roleId === 'state_nodal' ||
      /state/i.test(currentUser.role || '')
    ))
  );

  if (isStateRole && currentUser && currentUser.state) {
    const userState = (currentUser.state || '').toLowerCase().trim();
    const projState = (p.state || '').toLowerCase().trim();
    if (userState && projState && userState !== projState) {
      return `
        <div class="setu-detail-container">
          <div class="setu-detail-top-bar">
            <a href="#/dashboard" class="setu-back-to-dashboard" id="btn-back-dashboard">
              ← Return to State Dashboard
            </a>
          </div>
          <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 48px 24px; border-radius: 8px; text-align: center; margin-top: 24px; box-shadow: var(--setu-shadow-sm);">
            <div style="font-size: 40px; margin-bottom: 12px;">🔒</div>
            <h2 class="setu-empty-state-title" style="color: #991b1b; font-size: 20px; font-weight: 700; margin-bottom: 8px;">Access Restricted — Out of State Jurisdiction</h2>
            <p class="setu-empty-state-text" style="max-width: 580px; margin: 0 auto 20px auto; color: var(--setu-color-text-secondary); line-height: 1.5;">
              Project <strong>${p.id}</strong> is registered in <strong>${p.state}</strong> (${p.district}), outside your authorized state oversight boundary (<strong>${currentUser.state}</strong>). Under statutory MPLADS oversight rules (<strong>ROLES.md</strong>), State Nodal Authority accounts are strictly scoped to their own state.
            </p>
            <a href="#/dashboard" class="setu-btn-primary" style="display: inline-block; padding: 10px 24px; border-radius: 4px;">Return to Authorized State Projects</a>
          </div>
        </div>
      `;
    }
  }

  // ==========================================
  // 1. IMPLEMENTING AGENCY ROLE VIEW
  // ==========================================
  if (isAgencyRole) {
    const ucStatus = p.ucStatus || 'NOT_SUBMITTED';
    const ucBadgeStyle = ucStatus === 'SUBMITTED'
      ? 'background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;'
      : ucStatus === 'OVERDUE'
      ? 'background-color: #fef2f2; color: #991b1b; border: 1px solid #fecaca;'
      : 'background-color: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;';

    const agencyTabs = [
      { id: 'overview', label: 'Overview & Scope' },
      { id: 'progress', label: 'Progress Updates', badge: (p.progressUpdates || []).length },
      { id: 'evidence', label: 'Milestone Evidence', badge: (p.evidenceArtifacts || []).length },
      { id: 'invoices', label: 'Invoices & Bills', badge: (p.invoices || []).length },
      { id: 'utilization-certificate', label: 'Utilization Certificate' },
      { id: 'audit-trail', label: 'Execution Log' },
    ];

    const effectiveTab = agencyTabs.some(t => t.id === activeTab) ? activeTab : 'overview';

    const tabsHtml = agencyTabs.map(t => {
      const isActive = (t.id === effectiveTab) ? 'active' : '';
      const badgeHtml = t.badge !== undefined ? `
        <span class="setu-tab-badge">${t.badge}</span>
      ` : '';
      return `
        <button type="button" class="setu-tab-btn ${isActive}" data-tab="${t.id}" id="tab-btn-${t.id}">
          ${t.label} ${badgeHtml}
        </button>
      `;
    }).join('');

    let agencyContentHtml = '';

    if (effectiveTab === 'overview') {
      const sanctionedFormatted = `₹${Number(p.sanctionedAmount).toLocaleString('en-IN')}`;
      const expenditureFormatted = `₹${Number(p.expenditure).toLocaleString('en-IN')}`;
      const balance = Math.max(0, p.sanctionedAmount - p.expenditure);
      const balanceFormatted = `₹${Number(balance).toLocaleString('en-IN')}`;
      const finRate = p.financialProgress ? p.financialProgress.toFixed(1) : '0.0';

      agencyContentHtml = `
        <div class="setu-info-grid">
          <div class="setu-info-card">
            <h3 class="setu-info-card-title">Geographic & Parliamentary Scope</h3>
            <div class="setu-kv-list">
              <div class="setu-kv-row">
                <span class="setu-kv-label">State</span>
                <span class="setu-kv-value">${p.state}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">District</span>
                <span class="setu-kv-value">${p.district}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Constituency</span>
                <span class="setu-kv-value">${p.constituency}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Member of Parliament</span>
                <span class="setu-kv-value">${p.mpName}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">MP Code</span>
                <span class="setu-kv-value" style="font-family: var(--setu-font-mono);">${p.mpId}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Implementing Agency</span>
                <span class="setu-kv-value">${p.implementingAgency}</span>
              </div>
            </div>
          </div>

          <div class="setu-info-card">
            <h3 class="setu-info-card-title">Execution & Contract Details</h3>
            <div class="setu-kv-list">
              <div class="setu-kv-row">
                <span class="setu-kv-label">Assigned Vendor</span>
                <span class="setu-kv-value" style="font-weight: 700; color: var(--setu-color-primary-navy);">
                  ${p.vendorName || 'Not Assigned'}
                </span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Scheme Category</span>
                <span class="setu-kv-value">${p.category}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Current Work Status</span>
                <span class="setu-kv-value"><span class="setu-status-tag">${p.status}</span></span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">UC Status</span>
                <span class="setu-kv-value">
                  <span class="setu-badge" style="${ucBadgeStyle}; font-size: 11px;">${ucStatus}</span>
                </span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Physical Progress</span>
                <span class="setu-kv-value" style="font-weight: 700;">${p.physicalProgress}%</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Financial Progress</span>
                <span class="setu-kv-value">${finRate}%</span>
              </div>
            </div>
            <div class="setu-progress-container" style="margin-top: var(--setu-space-3);">
              <div class="setu-progress-track">
                <div class="setu-progress-bar" style="width: ${p.physicalProgress}%; background: ${p.physicalProgress === 100 ? '#059669' : 'var(--setu-color-primary-navy)'};"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="setu-metric-grid" style="margin-top: var(--setu-space-4);">
          <div class="setu-metric-box">
            <span class="setu-metric-label">Sanctioned Budget</span>
            <span class="setu-metric-value">${sanctionedFormatted}</span>
            <span class="setu-metric-meta">Approved Administrative Sanction</span>
          </div>
          <div class="setu-metric-box">
            <span class="setu-metric-label">Disbursed Expenditure</span>
            <span class="setu-metric-value">${expenditureFormatted}</span>
            <span class="setu-metric-meta">${finRate}% of Sanctioned Budget</span>
          </div>
          <div class="setu-metric-box">
            <span class="setu-metric-label">Unspent Balance</span>
            <span class="setu-metric-value">${balanceFormatted}</span>
            <span class="setu-metric-meta">Remaining Project Funds</span>
          </div>
          <div class="setu-metric-box">
            <span class="setu-metric-label">Physical Stage</span>
            <span class="setu-metric-value" style="color: ${p.physicalProgress === 100 ? '#059669' : 'var(--setu-color-primary-navy)'};">
              ${p.physicalProgress}%
            </span>
            <span class="setu-metric-meta">${p.status}</span>
          </div>
        </div>

        <div class="setu-card" style="margin-top: var(--setu-space-4); background: #f8fafc; border: 1px solid var(--setu-color-border-subtle); padding: 20px;">
          <h4 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: var(--setu-color-primary-navy);">
            ⚡ Quick Execution Actions
          </h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenProgressModal) window.setuOpenProgressModal('${p.id}', ${p.physicalProgress || 0}, ${p.financialProgress || 0});" style="padding: 8px 16px; font-size: 13px; cursor: pointer; border-radius: 4px; display: inline-flex; align-items: center; gap: 6px;">
              <span>📈</span> Record Progress Update
            </button>
            <button type="button" class="setu-btn-secondary" onclick="if(window.setuOpenEvidenceModal) window.setuOpenEvidenceModal('${p.id}', '${(p.vendorName || 'Assigned Contractor').replace(/'/g, "\\'")}');" style="padding: 8px 16px; font-size: 13px; cursor: pointer; border-radius: 4px; background: white; border: 1px solid var(--setu-color-border-subtle); display: inline-flex; align-items: center; gap: 6px;">
              <span>📸</span> Upload Milestone Evidence
            </button>
            <button type="button" class="setu-btn-secondary" onclick="if(window.setuOpenInvoiceModal) window.setuOpenInvoiceModal('${p.id}', '${(p.vendorName || 'Assigned Contractor').replace(/'/g, "\\'")}', ${p.sanctionedAmount || 5000000});" style="padding: 8px 16px; font-size: 13px; cursor: pointer; border-radius: 4px; background: white; border: 1px solid var(--setu-color-border-subtle); display: inline-flex; align-items: center; gap: 6px;">
              <span>📄</span> Submit Contractor Invoice
            </button>
            ${(p.physicalProgress === 100 || p.status === 'Completed') ? `
              <button type="button" onclick="if(window.setuOpenUCModal) window.setuOpenUCModal('${p.id}', ${p.sanctionedAmount || 0});" style="padding: 8px 16px; font-size: 13px; cursor: pointer; border-radius: 4px; background: #059669; color: white; border: none; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                <span>📜</span> Submit Utilization Certificate
              </button>
            ` : `
              <button type="button" disabled title="UC can only be submitted when physical work reaches 100%" style="padding: 8px 16px; font-size: 13px; border-radius: 4px; background: #f1f5f9; color: #94a3b8; border: 1px solid #e2e8f0; cursor: not-allowed; display: inline-flex; align-items: center; gap: 6px;">
                <span>📜</span> Submit UC (Requires 100% Completion)
              </button>
            `}
          </div>
        </div>
      `;
    } else if (effectiveTab === 'progress') {
      const updates = p.progressUpdates || [];
      agencyContentHtml = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--setu-space-4); flex-wrap: wrap; gap: 12px;">
            <div>
              <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-primary-navy); margin: 0;">
                Physical & Financial Progress Log (${updates.length})
              </h3>
              <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
                Certified stage progress entries submitted by Junior Technical Engineers & Site Inspectors
              </span>
            </div>
            <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenProgressModal) window.setuOpenProgressModal('${p.id}', ${p.physicalProgress || 0}, ${p.financialProgress || 0});" style="padding: 8px 16px; font-size: 13px; cursor: pointer; border-radius: 4px; display: inline-flex; align-items: center; gap: 6px;">
              <span>➕</span> Record New Progress Update
            </button>
          </div>

          ${updates.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${updates.map((u, idx) => `
                <div class="setu-card" style="padding: 16px; border: 1px solid var(--setu-color-border-subtle); border-left: 4px solid var(--setu-color-primary-navy); background: white;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-weight: 700; font-size: 14px; color: var(--setu-color-primary-navy);">
                        ${u.stage || `Stage Milestone #${idx + 1}`}
                      </span>
                      <span style="font-size: 11px; color: var(--setu-color-text-muted); font-family: var(--setu-font-mono);">
                        ${u.date || '2026-08'}
                      </span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                      <span class="setu-badge" style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 11px;">
                        Physical: <strong>${u.physicalProgress}%</strong>
                      </span>
                      ${u.financialProgress != null ? `
                        <span class="setu-badge" style="background: #f8fafc; color: #475569; border: 1px solid #cbd5e1; font-size: 11px;">
                          Financial: <strong>${u.financialProgress}%</strong>
                        </span>
                      ` : ''}
                    </div>
                  </div>
                  <p style="font-size: 13px; color: var(--setu-color-text-primary); margin: 0 0 8px 0; line-height: 1.5;">
                    ${u.remarks || 'Stage progress verified and certified in Measurement Book.'}
                  </p>
                  <div style="font-size: 11px; color: var(--setu-color-text-muted);">
                    Recorded by: <strong>${u.submittedBy || p.implementingAgency}</strong>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 36px; border-radius: 8px; text-align: center;">
              <h4 class="setu-empty-state-title" style="margin-bottom: 6px;">No Stage Updates Recorded</h4>
              <p class="setu-empty-state-text" style="margin-bottom: 16px;">
                Initial work order stage. Click below to record the first physical inspection milestone.
              </p>
              <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenProgressModal) window.setuOpenProgressModal('${p.id}', ${p.physicalProgress || 0}, ${p.financialProgress || 0});" style="padding: 8px 20px; font-size: 13px; cursor: pointer; border-radius: 4px;">
                Record Initial Progress
              </button>
            </div>
          `}
        </div>
      `;
    } else if (effectiveTab === 'evidence') {
      const artifacts = p.evidenceArtifacts || [];
      agencyContentHtml = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--setu-space-4); flex-wrap: wrap; gap: 12px;">
            <div>
              <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-primary-navy); margin: 0;">
                Milestone Evidence & Vendor Uploads (${artifacts.length})
              </h3>
              <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
                Geo-tagged inspection photos, test certificates, and Measurement Book extracts
              </span>
            </div>
            <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenEvidenceModal) window.setuOpenEvidenceModal('${p.id}', '${(p.vendorName || 'Assigned Contractor').replace(/'/g, "\\'")}');" style="padding: 8px 16px; font-size: 13px; cursor: pointer; border-radius: 4px; display: inline-flex; align-items: center; gap: 6px;">
              <span>📸</span> Upload Milestone Evidence
            </button>
          </div>

          ${artifacts.length > 0 ? `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
              ${artifacts.map((ev, idx) => `
                <div class="setu-card" style="padding: 16px; border: 1px solid var(--setu-color-border-subtle); background: white; border-radius: 6px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                      <div style="font-weight: 700; font-size: 14px; color: var(--setu-color-primary-navy);">
                        ${ev.milestoneStage || `Milestone Stage #${idx + 1}`}
                      </div>
                      <span style="font-size: 11px; color: var(--setu-color-text-muted); font-family: var(--setu-font-mono);">
                        ${ev.uploadedAt ? ev.uploadedAt.split('T')[0] : '2026-08'}
                      </span>
                    </div>

                    <!-- CRITICAL: Statutory Vendor Provenance Auto-Tag -->
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 6px 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                      <span style="font-size: 12px;">🏷️</span>
                      <span style="font-size: 12px; font-weight: 600; color: #1e40af;">
                        ${ev.sourceTag || `Received from Vendor: ${p.vendorName || 'Assigned Contractor'}`}
                      </span>
                    </div>

                    <p style="font-size: 13px; color: var(--setu-color-text-primary); margin: 0 0 10px 0; line-height: 1.4;">
                      ${ev.description || 'Physical inspection verified on site with geo-coordinates recorded.'}
                    </p>
                  </div>

                  <div style="border-top: 1px solid var(--setu-color-border-subtle); padding-top: 8px; margin-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--setu-color-text-muted);">
                    <span style="font-family: var(--setu-font-mono);">${ev.fileName || 'site_inspection.jpg'}</span>
                    <span style="color: #059669; font-weight: 600;">✓ Verified</span>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 36px; border-radius: 8px; text-align: center;">
              <h4 class="setu-empty-state-title" style="margin-bottom: 6px;">No Milestone Evidence Uploaded</h4>
              <p class="setu-empty-state-text" style="margin-bottom: 16px;">
                Upload site inspection photographs and stage test certificates to maintain statutory audit trail.
              </p>
              <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenEvidenceModal) window.setuOpenEvidenceModal('${p.id}', '${(p.vendorName || 'Assigned Contractor').replace(/'/g, "\\'")}');" style="padding: 8px 20px; font-size: 13px; cursor: pointer; border-radius: 4px;">
                Upload Initial Evidence
              </button>
            </div>
          `}
        </div>
      `;
    } else if (effectiveTab === 'invoices') {
      const invoices = p.invoices || [];
      const vName = p.vendorName || 'Assigned Contractor';
      agencyContentHtml = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--setu-space-4); flex-wrap: wrap; gap: 12px;">
            <div>
              <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-primary-navy); margin: 0;">
                Contractor Invoices & GST Verification (${invoices.length})
              </h3>
              <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
                Stage billing tax invoices submitted by registered contractor ${vName}
              </span>
            </div>
            <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenInvoiceModal) window.setuOpenInvoiceModal('${p.id}', '${vName.replace(/'/g, "\\'")}', ${p.sanctionedAmount || 5000000});" style="padding: 8px 16px; font-size: 13px; cursor: pointer; border-radius: 4px; background: #0284c7; border-color: #0284c7; display: inline-flex; align-items: center; gap: 6px;">
              <span>📄</span> Submit Contractor Invoice
            </button>
          </div>

          <!-- Simulated Notice -->
          <div style="background: #f8fafc; border: 1px solid var(--setu-color-border-subtle); border-radius: 6px; padding: 10px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--setu-color-text-secondary);">
            <span style="background: #e2e8f0; color: #475569; font-weight: 700; padding: 2px 6px; border-radius: 3px; font-size: 10px; text-transform: uppercase;">Simulated</span>
            <span>Invoice & GST OCR Verification: GSTIN format validated via statutory regex; claimed amount verified against stage budget ceiling. (Simulated Government Verification).</span>
          </div>

          ${invoices.length > 0 ? `
            <div class="setu-table-card">
              <div class="setu-table-container">
                <table class="setu-table">
                  <thead>
                    <tr>
                      <th>Invoice Number</th>
                      <th>Executing Vendor & Stage</th>
                      <th>Claimed Amount</th>
                      <th>GSTIN</th>
                      <th>Status</th>
                      <th>Verification Summary</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoices.map((inv) => {
                      const isVerif = inv.status === 'Verified';
                      const badge = isVerif
                        ? `<span class="setu-badge" style="background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">✓ Verified</span>`
                        : `<span class="setu-badge" style="background-color: #fef3c7; color: #92400e; border: 1px solid #fde68a;">⚠️ Under Review</span>`;
                      return `
                        <tr>
                          <td>
                            <div style="font-weight: 700; color: var(--setu-color-primary-navy);">${inv.invoiceNumber}</div>
                            <div style="font-size: 11px; color: var(--setu-color-text-muted); font-family: var(--setu-font-mono);">${inv.fileName || 'tax_invoice.pdf'}</div>
                          </td>
                          <td>
                            <div style="font-weight: 600;">${inv.vendorName || vName}</div>
                            <div style="font-size: 11px; color: var(--setu-color-text-secondary);">${inv.milestoneRef || 'Milestone Stage'}</div>
                          </td>
                          <td style="font-weight: 700; color: #059669;">
                            ₹${Number(inv.claimedAmount || 0).toLocaleString('en-IN')}
                          </td>
                          <td style="font-family: var(--setu-font-mono); font-size: 12px;">
                            ${inv.gstin}
                          </td>
                          <td>
                            ${badge}
                            <div style="font-size: 10px; color: var(--setu-color-text-muted); margin-top: 2px;">Simulated Format Check</div>
                          </td>
                          <td style="font-size: 12px; color: var(--setu-color-text-secondary); max-width: 250px;">
                            ${inv.verificationSummary || 'GSTIN format structure validated via regex.'}
                          </td>
                          <td style="font-size: 11px; color: var(--setu-color-text-muted);">
                            ${inv.submittedAt?.split('T')[0] || '2026-08'}
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : `
            <div class="setu-empty-state" style="background: white; border: 1px solid var(--setu-color-border-subtle); padding: 36px; border-radius: 8px; text-align: center;">
              <h4 class="setu-empty-state-title" style="margin-bottom: 6px;">No Invoices Submitted Yet</h4>
              <p class="setu-empty-state-text" style="margin-bottom: 16px;">
                Submit stage billing tax invoices from registered contractor <strong>${vName}</strong> for GST format validation and disbursement ceiling checks.
              </p>
              <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenInvoiceModal) window.setuOpenInvoiceModal('${p.id}', '${vName.replace(/'/g, "\\'")}', ${p.sanctionedAmount || 5000000});" style="padding: 8px 20px; font-size: 13px; cursor: pointer; border-radius: 4px; background: #0284c7; border-color: #0284c7;">
                Submit Initial Invoice
              </button>
            </div>
          `}
        </div>
      `;
    } else if (effectiveTab === 'utilization-certificate') {
      const isCompleted = p.physicalProgress === 100 || p.status === 'Completed';
      const ucRefNo = `UC/MPLADS/2026/${p.id.replace('PRJ-IND-', '')}`;

      agencyContentHtml = `
        <div>
          <div style="margin-bottom: var(--setu-space-4);">
            <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-primary-navy); margin: 0;">
              Statutory Utilization Certificate (Form GFR-12A)
            </h3>
            <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
              Mandatory completion certificate under Rule 238(1) of General Financial Rules for MPLADS scheme closure
            </span>
          </div>

          <!-- UC Status Banner -->
          ${ucStatus === 'SUBMITTED' ? `
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 18px; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 14px;">
              <div style="font-size: 28px; line-height: 1;">✅</div>
              <div>
                <div style="font-size: 16px; font-weight: 700; color: #065f46; margin-bottom: 4px;">
                  Utilization Certificate Successfully Transmitted
                </div>
                <div style="font-size: 13px; color: #047857; line-height: 1.5;">
                  Statutory Form GFR-12A has been certified by Executive Engineer, ${p.implementingAgency}, and recorded on the SETU central audit ledger. Project financial accounts are officially closed.
                </div>
                <div style="margin-top: 8px; font-family: var(--setu-font-mono); font-size: 12px; color: #065f46;">
                  Ref: <strong>${ucRefNo}</strong> • Certified Expenditure: ₹${Number(p.expenditure).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ` : ucStatus === 'OVERDUE' ? `
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 18px; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 14px;">
              <div style="font-size: 28px; line-height: 1;">⚠️</div>
              <div>
                <div style="font-size: 16px; font-weight: 700; color: #991b1b; margin-bottom: 4px;">
                  CRITICAL: Utilization Certificate OVERDUE (>30 Days Since Completion)
                </div>
                <div style="font-size: 13px; color: #b91c1c; line-height: 1.5;">
                  Physical work reached 100% completion more than 30 days ago without statutory Form GFR-12A submission. Immediate submission is required to prevent administrative escalation to the District Magistrate.
                </div>
                <div style="margin-top: 12px;">
                  <button type="button" onclick="if(window.setuOpenUCModal) window.setuOpenUCModal('${p.id}', ${p.sanctionedAmount || 0});" style="padding: 8px 18px; background: #dc2626; color: white; border: none; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 13px;">
                    Transmit Statutory UC Now →
                  </button>
                </div>
              </div>
            </div>
          ` : isCompleted ? `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 14px;">
              <div style="font-size: 28px; line-height: 1;">📜</div>
              <div>
                <div style="font-size: 16px; font-weight: 700; color: #166534; margin-bottom: 4px;">
                  Physical Work Completed — Ready for Utilization Certificate Submission
                </div>
                <div style="font-size: 13px; color: #15803d; line-height: 1.5;">
                  All civil milestones are 100% certified. Complete and transmit statutory Form GFR-12A to conclude project accounting.
                </div>
                <div style="margin-top: 12px;">
                  <button type="button" onclick="if(window.setuOpenUCModal) window.setuOpenUCModal('${p.id}', ${p.sanctionedAmount || 0});" style="padding: 8px 18px; background: #059669; color: white; border: none; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 13px;">
                    Submit Form GFR-12A →
                  </button>
                </div>
              </div>
            </div>
          ` : `
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 14px;">
              <div style="font-size: 28px; line-height: 1;">ℹ️</div>
              <div>
                <div style="font-size: 16px; font-weight: 700; color: #334155; margin-bottom: 4px;">
                  UC Pending Physical Work Completion
                </div>
                <div style="font-size: 13px; color: #64748b; line-height: 1.5;">
                  Under MPLADS guidelines, Utilization Certificates (Form GFR-12A) can only be generated and submitted once physical progress reaches 100%. Current physical progress: <strong>${p.physicalProgress}%</strong>.
                </div>
              </div>
            </div>
          `}

          <!-- Statutory Certificate Summary Box -->
          <div class="setu-card" style="padding: 24px; border: 1px solid var(--setu-color-border-subtle); background: white;">
            <div style="border-bottom: 2px solid var(--setu-color-primary-navy); padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--setu-color-primary-navy);">
                  FORM GFR 12 - A
                </h4>
                <div style="font-size: 11px; color: var(--setu-color-text-muted);">
                  [See Rule 238 (1)] Form of Utilization Certificate for MPLADS Works
                </div>
              </div>
              <span class="setu-badge" style="${ucBadgeStyle}; font-size: 12px;">
                ${ucStatus}
              </span>
            </div>

            <div class="setu-kv-list">
              <div class="setu-kv-row">
                <span class="setu-kv-label">Scheme / Program</span>
                <span class="setu-kv-value">Members of Parliament Local Area Development Scheme (MPLADS)</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Unique Project Identifier</span>
                <span class="setu-kv-value" style="font-family: var(--setu-font-mono); font-weight: 600;">${p.id}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Project Title</span>
                <span class="setu-kv-value">${p.name}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Executing Vendor</span>
                <span class="setu-kv-value" style="font-weight: 600;">${p.vendorName || 'Not Assigned'}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Implementing Agency</span>
                <span class="setu-kv-value">${p.implementingAgency}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Sanction Order Reference</span>
                <span class="setu-kv-value">AS/${p.district.toUpperCase().slice(0,3)}/2025/${p.id.slice(-4)}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Total Sanctioned Grant</span>
                <span class="setu-kv-value" style="font-weight: 700;">₹${Number(p.sanctionedAmount).toLocaleString('en-IN')}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Actual Certified Expenditure</span>
                <span class="setu-kv-value" style="font-weight: 700; color: #059669;">₹${Number(p.expenditure).toLocaleString('en-IN')}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Statutory Certification</span>
                <span class="setu-kv-value" style="font-size: 12px; color: var(--setu-color-text-secondary);">
                  Certified that out of ₹${Number(p.sanctionedAmount).toLocaleString('en-IN')} of grants sanctioned during the financial period in favour of ${p.implementingAgency}, a sum of ₹${Number(p.expenditure).toLocaleString('en-IN')} has been utilized for the purpose for which it was sanctioned and that the balance of ₹${Number(Math.max(0, p.sanctionedAmount - p.expenditure)).toLocaleString('en-IN')} remaining unutilized has been surrendered / refunded.
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (effectiveTab === 'audit-trail') {
      agencyContentHtml = `
        <div>
          <div style="margin-bottom: var(--setu-space-4);">
            <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-primary-navy); margin: 0;">
              Project Execution Timeline
            </h3>
            <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
              Chronological engineering and administrative milestones recorded by ${p.implementingAgency}
            </span>
          </div>

          <div class="setu-timeline">
            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">2025-08-14 • 10:30 AM</span>
              <span class="setu-timeline-action">Work Proposal Submitted</span>
              <span class="setu-timeline-actor">Initiated by ${p.mpName} (${p.constituency})</span>
            </div>

            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">2025-09-22 • 03:15 PM</span>
              <span class="setu-timeline-action">Technical Feasibility & Cost Estimation Sanctioned</span>
              <span class="setu-timeline-actor">Verified by Executive Engineer, ${p.implementingAgency}</span>
            </div>

            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">2025-10-18 • 11:45 AM</span>
              <span class="setu-timeline-action">Administrative Sanction Order Issued (₹${Number(p.sanctionedAmount).toLocaleString('en-IN')})</span>
              <span class="setu-timeline-actor">Authorized by District Magistrate / Collectorate, ${p.district}</span>
            </div>

            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">2025-11-05 • 10:00 AM</span>
              <span class="setu-timeline-action">Contract Awarded to Vendor</span>
              <span class="setu-timeline-actor">Assigned to ${p.vendorName || 'Selected Contractor'}</span>
            </div>

            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">2026-02-10 • 02:00 PM</span>
              <span class="setu-timeline-action">Milestone Physical Progress Recorded (${p.physicalProgress}%)</span>
              <span class="setu-timeline-actor">Inspected by Junior Technical Engineer, ${p.implementingAgency}</span>
            </div>

            ${ucStatus === 'SUBMITTED' ? `
              <div class="setu-timeline-item">
                <div class="setu-timeline-dot" style="background-color: #059669;"></div>
                <span class="setu-timeline-date">2026-08-15 • 04:30 PM</span>
                <span class="setu-timeline-action">Statutory Utilization Certificate (GFR-12A) Transmitted</span>
                <span class="setu-timeline-actor">Certified by Executive Engineer, ${p.implementingAgency}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    return `
      <div class="setu-detail-container">
        <!-- Breadcrumbs & Back Link -->
        <div class="setu-detail-top-bar">
          <a href="#/dashboard" class="setu-back-to-dashboard" id="btn-back-dashboard">
            ← Return to Execution Workspace
          </a>
          <div style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted);">
            Implementing Agency Project Record • ${p.implementingAgency}
          </div>
        </div>

        <!-- Project Header Card (Clean: NO risk scores) -->
        <div class="setu-detail-header-card">
          <div class="setu-detail-meta-row" style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span class="setu-detail-id-tag">${p.id}</span>
            <span class="setu-status-tag">${p.status}</span>
            <span class="setu-badge" style="${ucBadgeStyle}; font-size: 11px;">UC: ${ucStatus}</span>
            <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
              <span style="color: #64748b;">Vendor:</span> <strong style="color: var(--setu-color-primary-navy);">${p.vendorName || 'Not Assigned'}</strong>
            </span>
            <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
              ${p.district}, ${p.state}
            </span>
          </div>
          <h1 class="setu-detail-title">${p.name}</h1>
        </div>

        <!-- Horizontal Tab Navigation Strip -->
        <div class="setu-tab-wrapper">
          <nav class="setu-tab-nav" id="setu-detail-tab-nav">
            ${tabsHtml}
          </nav>

          <!-- Tab Panel Content Area -->
          <div class="setu-tab-panel" id="setu-detail-tab-content">
            ${agencyContentHtml}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 2. MP OFFICE ROLE VIEW (Constituency MP & Nominated MP per ROLES.md)
  // ==========================================
  if (isMpRole) {
    const isHighRisk = (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH';
    const badgeClass = isHighRisk ? 'setu-badge-risk-high' : 'setu-badge-risk-neutral';
    const riskLevel = p.riskLevel || (p.riskScore >= 60 ? 'HIGH' : p.riskScore >= 40 ? 'MED' : 'LOW');
    const isRejected = p.status === 'Rejected' || p.status?.toLowerCase().includes('reject');
    const hasFlag = p.flagPresent || p.hasOpenFlags || isHighRisk || p.costOverrun;
    const plainExplanation = p.plainLanguageExplanation || getRiskExplanation(p);

    const mpTabs = [
      { id: 'overview', label: 'Overview & Recommendations' },
      { id: 'financials', label: 'Financial Allocation' },
      { id: 'audit-trail', label: 'Milestone Timeline' },
    ];

    const effectiveTab = mpTabs.some((t) => t.id === activeTab) ? activeTab : 'overview';

    const tabsHtml = mpTabs
      .map((t) => {
        const isActive = t.id === effectiveTab ? 'active' : '';
        return `
          <button type="button" class="setu-tab-btn ${isActive}" data-tab="${t.id}" id="tab-btn-${t.id}">
            ${t.label}
          </button>
        `;
      })
      .join('');

    let mpContentHtml = '';

    if (effectiveTab === 'overview') {
      mpContentHtml = `
        <div class="setu-info-grid">
          <div class="setu-info-card">
            <h3 class="setu-info-card-title">Geographic & Parliamentary Scope</h3>
            <div class="setu-kv-list">
              <div class="setu-kv-row">
                <span class="setu-kv-label">State</span>
                <span class="setu-kv-value">${p.state}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">District</span>
                <span class="setu-kv-value">${p.district}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Constituency</span>
                <span class="setu-kv-value">${p.constituency || 'Nominated (Multi-District)'}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Member of Parliament</span>
                <span class="setu-kv-value">${p.mpName}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">MP Code</span>
                <span class="setu-kv-value" style="font-family: var(--setu-font-mono);">${p.mpId}</span>
              </div>
            </div>
          </div>

          <div class="setu-info-card">
            <h3 class="setu-info-card-title">Scheme Implementation Details</h3>
            <div class="setu-kv-list">
              <div class="setu-kv-row">
                <span class="setu-kv-label">Scheme Category</span>
                <span class="setu-kv-value">${p.category}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Current Work Status</span>
                <span class="setu-kv-value"><span class="setu-status-tag">${p.status}</span></span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Implementing Agency</span>
                <span class="setu-kv-value">${p.implementingAgency}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Executing Vendor</span>
                <span class="setu-kv-value">${p.vendorName || 'Not Assigned'}</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Physical Completion</span>
                <span class="setu-kv-value">${p.physicalProgress || 0}%</span>
              </div>
            </div>
            <div class="setu-progress-container" style="margin-top: var(--setu-space-2);">
              <div class="setu-progress-track">
                <div class="setu-progress-bar" style="width: ${p.physicalProgress || 0}%;"></div>
              </div>
            </div>
          </div>
        </div>

        ${p.workDescription ? `
          <div class="setu-card" style="margin-top: 16px; padding: 20px; background: white; border: 1px solid var(--setu-color-border-subtle);">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: var(--setu-color-primary-navy);">
              Work Description & Public Utility Justification
            </h4>
            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: var(--setu-color-text-primary);">
              ${p.workDescription}
            </p>
          </div>
        ` : ''}

        <div class="setu-card" style="margin-top: 16px; border-left: 3px solid ${isHighRisk ? 'var(--setu-color-accent-base)' : 'var(--setu-color-primary-base)'}; padding: 18px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--setu-color-primary-navy); margin-bottom: 4px;">
            Statutory Predictive Risk Assessment (Read-Only)
          </div>
          <p style="font-size: 13px; line-height: 1.6; color: var(--setu-color-text-primary); margin: 0;">
            ${plainExplanation}
          </p>
        </div>
      `;
    } else if (effectiveTab === 'financials') {
      const sanctionedFormatted = `₹${Number(p.sanctionedAmount || p.estimatedCost || 0).toLocaleString('en-IN')}`;
      const expenditureFormatted = `₹${Number(p.expenditure || 0).toLocaleString('en-IN')}`;
      const balance = Math.max(0, (p.sanctionedAmount || p.estimatedCost || 0) - (p.expenditure || 0));
      const balanceFormatted = `₹${Number(balance).toLocaleString('en-IN')}`;
      const finRate = p.financialProgress ? p.financialProgress.toFixed(1) : '0.0';

      mpContentHtml = `
        <div class="setu-metric-grid">
          <div class="setu-metric-box">
            <span class="setu-metric-label">Sanctioned Budget</span>
            <span class="setu-metric-value">${sanctionedFormatted}</span>
            <span class="setu-metric-meta">Approved Administrative Sanction</span>
          </div>
          <div class="setu-metric-box">
            <span class="setu-metric-label">Total Expenditure</span>
            <span class="setu-metric-value">${expenditureFormatted}</span>
            <span class="setu-metric-meta">${finRate}% of Sanctioned Budget</span>
          </div>
          <div class="setu-metric-box">
            <span class="setu-metric-label">Unspent Balance</span>
            <span class="setu-metric-value">${balanceFormatted}</span>
            <span class="setu-metric-meta">Remaining Project Funds</span>
          </div>
          <div class="setu-metric-box ${isHighRisk ? 'setu-metric-box-alert' : ''}">
            <span class="setu-metric-label">Risk Evaluation</span>
            <span class="setu-metric-value" style="${isHighRisk ? 'color: var(--setu-color-accent-dark);' : ''}">
              ${p.riskScore || 12} <span style="font-size: var(--setu-font-size-small);">/ 100</span>
            </span>
            <span class="setu-metric-meta">${riskLevel} Risk Level</span>
          </div>
        </div>

        <div class="setu-info-grid" style="margin-top: var(--setu-space-4);">
          <div class="setu-info-card">
            <h3 class="setu-info-card-title">Fund Absorption & Progress</h3>
            <div class="setu-kv-list">
              <div class="setu-kv-row">
                <span class="setu-kv-label">Physical Completion</span>
                <span class="setu-kv-value">${p.physicalProgress || 0}%</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Financial Utilization</span>
                <span class="setu-kv-value">${finRate}%</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Expenditure Status</span>
                <span class="setu-kv-value">Expenditure and tranche releases verified by District Authority</span>
              </div>
            </div>
          </div>

          <div class="setu-info-card">
            <h3 class="setu-info-card-title">MPLADS Statutory Allocation Framework</h3>
            <div class="setu-kv-list">
              <div class="setu-kv-row">
                <span class="setu-kv-label">Annual Entitlement</span>
                <span class="setu-kv-value">₹5.00 Crore / Year</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Tranche Structure</span>
                <span class="setu-kv-value">Two ₹2.5 Crore Installments</span>
              </div>
              <div class="setu-kv-row">
                <span class="setu-kv-label">Sanctioning Authority</span>
                <span class="setu-kv-value">District Magistrate / Collectorate (${p.district})</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (effectiveTab === 'audit-trail') {
      mpContentHtml = `
        <div>
          <div style="margin-bottom: var(--setu-space-4);">
            <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-primary-navy); margin: 0;">
              Constituency Project Milestone Timeline
            </h3>
            <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
              Statutory timeline of recommendation, administrative sanction, and field progress
            </span>
          </div>

          <div class="setu-timeline">
            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">${p.submittedAt ? p.submittedAt.split('T')[0] : '2025-08-14'} • 10:30 AM</span>
              <span class="setu-timeline-action">Scheme Recommended by MP Office</span>
              <span class="setu-timeline-actor">Initiated by ${p.mpName} (${p.constituency || p.district})</span>
            </div>

            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">2025-09-22 • 03:15 PM</span>
              <span class="setu-timeline-action">Technical Feasibility & BOQ Verified</span>
              <span class="setu-timeline-actor">Verified by Executive Engineer, ${p.implementingAgency}</span>
            </div>

            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">2025-10-18 • 11:45 AM</span>
              <span class="setu-timeline-action">Administrative Sanction Issued (₹${Number(p.sanctionedAmount || p.estimatedCost || 0).toLocaleString('en-IN')})</span>
              <span class="setu-timeline-actor">Authorized by District Magistrate, ${p.district}</span>
            </div>

            <div class="setu-timeline-item">
              <div class="setu-timeline-dot"></div>
              <span class="setu-timeline-date">2026-02-10 • 02:00 PM</span>
              <span class="setu-timeline-action">Milestone Progress Certified (${p.physicalProgress || 0}%)</span>
              <span class="setu-timeline-actor">Inspected by Technical Division, ${p.implementingAgency}</span>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="setu-detail-container">
        <!-- Breadcrumbs & Back Link -->
        <div class="setu-detail-top-bar">
          <a href="#/dashboard" class="setu-back-to-dashboard" id="btn-back-dashboard">
            ← Return to My Projects Dashboard
          </a>
          <div style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted);">
            MP Office Scheme Record • ${p.constituency || p.district}
          </div>
        </div>

        <!-- Project Header Card -->
        <div class="setu-detail-header-card">
          <div class="setu-detail-meta-row" style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span class="setu-detail-id-tag">${p.id}</span>
            <span class="setu-status-tag">${p.status}</span>
            <span class="setu-badge ${badgeClass}">Risk ${p.riskScore || 12}/100 (${riskLevel})</span>
            ${hasFlag ? `
              <span class="setu-badge" style="background-color: #fef3c7; color: #92400e; border: 1px solid #fde68a; font-size: 11px; font-weight: 600;">
                ⚠️ Flag Present
              </span>
            ` : `
              <span class="setu-badge" style="background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 600;">
                ✓ Clear
              </span>
            `}
            <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
              ${p.district}, ${p.state}
            </span>
          </div>
          <h1 class="setu-detail-title">${p.name}</h1>

          ${isRejected ? `
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 14px 18px; margin-top: 14px; display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 24px;">⚠️</span>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #991b1b;">Proposal Rejected by District Authority</div>
                <div style="font-size: 12px; color: #b91c1c; margin-top: 2px;">Reason: <strong>${p.rejectionReason || 'Technical or financial feasibility criteria not met under statutory MPLADS operational guidelines.'}</strong></div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Horizontal Tab Navigation Strip -->
        <div class="setu-tab-wrapper">
          <nav class="setu-tab-nav" id="setu-detail-tab-nav">
            ${tabsHtml}
          </nav>

          <!-- Tab Panel Content Area -->
          <div class="setu-tab-panel" id="setu-detail-tab-content">
            ${mpContentHtml}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 3. STANDARD OVERSIGHT ROLES VIEW (District, State, MoSPI, CAG)
  // ==========================================

  const complaints = getComplaintsForProject(p.id);
  const isHighRisk = (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH';
  const badgeClass = isHighRisk ? 'setu-badge-risk-high' : 'setu-badge-risk-neutral';
  const riskLevel = p.riskLevel || (p.riskScore >= 60 ? 'HIGH' : p.riskScore >= 40 ? 'MED' : 'LOW');

  const isProposed = p.status === 'Proposed - Under Scrutiny' || p.status?.includes('Proposed');
  const isRejected = p.status === 'Rejected' || p.status?.toLowerCase().includes('reject');
  const isCompleted = p.status === 'Completed' || p.physicalProgress === 100;
  const assetTransferStatus = p.assetTransferStatus || (isCompleted ? 'PENDING_TRANSFER' : 'NOT_APPLICABLE');

  // Check if current milestone evidence is ACCEPTED
  const evidenceList = p.evidenceArtifacts || [];
  const invoiceList = p.invoices || [];
  const hasAcceptedEvidence = (evidenceList.length > 0 && evidenceList.some(e => e.status === 'ACCEPTED')) ||
                              (invoiceList.length > 0 && invoiceList.some(i => i.status === 'ACCEPTED')) ||
                              (p.physicalProgress >= 50 && evidenceList.length === 0);

  const pendingEvidenceCount = evidenceList.filter(e => e.status === 'PENDING' || !e.status).length +
                               invoiceList.filter(i => i.status === 'PENDING' || !i.status).length;

  // Count compliance flags
  const complianceCount = (p.costOverrun ? 1 : 0) + 
                          (p.duplicateRisk ? 1 : 0) + 
                          (p.paymentProgressMismatch ? 1 : 0) + 
                          (p.daysDelayed > 45 ? 1 : 0);

  // Tab buttons
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'financials', label: 'Financials & Tranches' },
    { id: 'evidence-review', label: 'Evidence & Invoices', badge: pendingEvidenceCount > 0 ? pendingEvidenceCount : undefined, isAlert: pendingEvidenceCount > 0 },
    { id: 'compliance', label: 'Compliance', badge: complianceCount, isAlert: complianceCount > 0 },
    { id: 'citizen-reports', label: 'Citizen Reports', badge: complaints.length, isAlert: complaints.some(c => c.isContradiction) },
    { id: 'audit-trail', label: 'Audit Trail' }
  ];

  const tabsHtml = tabs.map(t => {
    const isActive = (t.id === activeTab) ? 'active' : '';
    const badgeHtml = t.badge !== undefined ? `
      <span class="setu-tab-badge ${t.isAlert ? 'setu-tab-badge-alert' : ''}">${t.badge}</span>
    ` : '';
    return `
      <button type="button" class="setu-tab-btn ${isActive}" data-tab="${t.id}" id="tab-btn-${t.id}">
        ${t.label} ${badgeHtml}
      </button>
    `;
  }).join('');

  // Tab Panels Content
  let tabContentHtml = '';

  if (activeTab === 'overview') {
    tabContentHtml = `
      ${isProposed && isDistrictRole ? `
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid var(--setu-color-primary-navy); border-radius: 6px; padding: 18px 20px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="font-size: 14px; font-weight: 700; color: var(--setu-color-primary-navy);">
                📋 MP Scheme Proposal Pending Administrative Scrutiny & Sanction Order
              </div>
              <div style="font-size: 12px; color: var(--setu-color-text-secondary); margin-top: 4px;">
                Submitted by <strong>${p.mpName} (${p.constituency || p.district})</strong>. Review statutory guidelines, single-tender limits, and technical feasibility before granting sanction.
              </div>
            </div>
            <div style="display: flex; gap: 10px;">
              <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenProposalApproveModal) window.setuOpenProposalApproveModal('${p.id}', '${(p.name || '').replace(/'/g, "\\'")}', ${p.sanctionedAmount || p.estimatedCost || 5000000}, '${p.district}');" style="padding: 8px 16px; font-size: 13px; cursor: pointer; background: #059669; border: none; border-radius: 4px; color: white; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                <span>✓</span> Approve & Sanction
              </button>
              <button type="button" onclick="if(window.setuOpenProposalRejectModal) window.setuOpenProposalRejectModal('${p.id}', '${(p.name || '').replace(/'/g, "\\'")}');" style="padding: 8px 16px; font-size: 13px; cursor: pointer; background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; color: #991b1b; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                <span>✕</span> Reject Proposal
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      ${isRejected ? `
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 14px 18px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 24px;">⚠️</span>
          <div>
            <div style="font-size: 13px; font-weight: 700; color: #991b1b;">Proposal Rejected by District Authority</div>
            <div style="font-size: 12px; color: #b91c1c; margin-top: 2px;">Reason: <strong>${p.rejectionReason || 'Technical or financial feasibility criteria not met under statutory MPLADS operational guidelines.'}</strong></div>
          </div>
        </div>
      ` : ''}

      <div class="setu-info-grid">
        <div class="setu-info-card">
          <h3 class="setu-info-card-title">Geographic & Parliamentary Scope</h3>
          <div class="setu-kv-list">
            <div class="setu-kv-row">
              <span class="setu-kv-label">State</span>
              <span class="setu-kv-value">${p.state}</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">District</span>
              <span class="setu-kv-value">${p.district}</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Constituency</span>
              <span class="setu-kv-value">${p.constituency}</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Member of Parliament</span>
              <span class="setu-kv-value">${p.mpName}</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">MP Code</span>
              <span class="setu-kv-value" style="font-family: var(--setu-font-mono);">${p.mpId}</span>
            </div>
          </div>
        </div>

        <div class="setu-info-card">
          <h3 class="setu-info-card-title">Scheme Implementation Details</h3>
          <div class="setu-kv-list">
            <div class="setu-kv-row">
              <span class="setu-kv-label">Scheme Category</span>
              <span class="setu-kv-value">${p.category}</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Current Work Status</span>
              <span class="setu-kv-value"><span class="setu-status-tag">${p.status}</span></span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Implementing Agency</span>
              <span class="setu-kv-value">${p.implementingAgency}</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Executing Vendor</span>
              <span class="setu-kv-value">${p.vendorName || 'Not Assigned'}</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Physical Completion</span>
              <span class="setu-kv-value">${p.physicalProgress}%</span>
            </div>
          </div>
          <div class="setu-progress-container" style="margin-top: var(--setu-space-2);">
            <div class="setu-progress-track">
              <div class="setu-progress-bar" style="width: ${p.physicalProgress}%;"></div>
            </div>
          </div>
        </div>
      </div>

      ${isCompleted ? `
        <div class="setu-card" style="margin-top: var(--setu-space-4); border-left: 4px solid #0284c7; background: #f0f9ff; padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="font-size: 14px; font-weight: 700; color: #0369a1;">
                🏛️ Institutional Asset Transfer & Handover Status: <strong style="font-family: var(--setu-font-mono);">${assetTransferStatus}</strong>
              </div>
              <div style="font-size: 12px; color: #0284c7; margin-top: 4px;">
                ${assetTransferStatus === 'TRANSFERRED' 
                  ? `Asset successfully transferred to <strong>${p.assetTransferAgency || 'Greater Chennai Corporation / Local Body'}</strong> on ${p.assetTransferDate ? p.assetTransferDate.split('T')[0] : '2026-08'}. Voucher Ref: <code>${p.assetTransferRef || 'HO-CONFIRMED'}</code>` 
                  : `Work is 100% physically completed. Asset is pending handover to the user department or municipal local body.`}
              </div>
            </div>
            <div>
              ${assetTransferStatus === 'TRANSFERRED' ? `
                <span class="setu-badge" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 12px; padding: 6px 12px; font-weight: 700;">
                  ✓ Transferred
                </span>
              ` : `
                <button type="button" onclick="if(window.setuOpenAssetTransferModal) window.setuOpenAssetTransferModal('${p.id}', '${p.district}');" style="padding: 8px 18px; font-size: 13px; font-weight: 600; background: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                  <span>🏛️</span> Execute Asset Handover
                </button>
              `}
            </div>
          </div>
        </div>
      ` : ''}
    `;
  } else if (activeTab === 'financials') {
    const sanctionedFormatted = `₹${Number(p.sanctionedAmount).toLocaleString('en-IN')}`;
    const expenditureFormatted = `₹${Number(p.expenditure).toLocaleString('en-IN')}`;
    const balance = Math.max(0, p.sanctionedAmount - p.expenditure);
    const balanceFormatted = `₹${Number(balance).toLocaleString('en-IN')}`;
    const finRate = p.financialProgress ? p.financialProgress.toFixed(1) : '0.0';

    tabContentHtml = `
      <div class="setu-metric-grid">
        <div class="setu-metric-box">
          <span class="setu-metric-label">Sanctioned Amount</span>
          <span class="setu-metric-value">${sanctionedFormatted}</span>
          <span class="setu-metric-meta">Statutory MPLADS Sanction</span>
        </div>
        <div class="setu-metric-box">
          <span class="setu-metric-label">Total Expenditure</span>
          <span class="setu-metric-value">${expenditureFormatted}</span>
          <span class="setu-metric-meta">${finRate}% of Sanctioned Budget</span>
        </div>
        <div class="setu-metric-box">
          <span class="setu-metric-label">Unspent Balance</span>
          <span class="setu-metric-value">${balanceFormatted}</span>
          <span class="setu-metric-meta">Remaining Project Funds</span>
        </div>
        <div class="setu-metric-box ${isHighRisk ? 'setu-metric-box-alert' : ''}">
          <span class="setu-metric-label">Risk Evaluation</span>
          <span class="setu-metric-value" style="${isHighRisk ? 'color: var(--setu-color-accent-dark);' : ''}">
            ${p.riskScore} <span style="font-size: var(--setu-font-size-small);">/ 100</span>
          </span>
          <span class="setu-metric-meta">${riskLevel} Risk Level</span>
        </div>
      </div>

      <!-- Milestone Gated Tranche Disbursement Control Card -->
      <div class="setu-card" style="margin-top: var(--setu-space-4); border-left: 4px solid ${hasAcceptedEvidence ? '#059669' : '#cbd5e1'}; background: ${hasAcceptedEvidence ? '#f0fdf4' : '#f8fafc'}; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div style="max-width: 620px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: ${hasAcceptedEvidence ? '#065f46' : 'var(--setu-color-primary-navy)'};">
                💳 Statutory Milestone Tranche Disbursement Control
              </h4>
              <span class="setu-badge" style="${hasAcceptedEvidence ? 'background: #dcfce7; color: #15803d; border: 1px solid #86efac;' : 'background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0;'} font-size: 11px;">
                ${hasAcceptedEvidence ? '✓ Gating Clearance Granted' : '🔒 Evidence Gate Locked'}
              </span>
            </div>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: var(--setu-color-text-secondary); line-height: 1.5;">
              ${hasAcceptedEvidence 
                ? 'Milestone physical evidence & contractor invoices have been ACCEPTED by District Authority. Next fund installment can now be disbursed.' 
                : 'Tranche release gated: District Authority must inspect and ACCEPT the Junior Technical Engineer photo artifacts and GST invoice under the "Evidence & Invoices" tab before subsequent funds can be released.'}
            </p>
          </div>
          <div>
            ${hasAcceptedEvidence ? `
              <button type="button" class="setu-btn-primary" onclick="if(window.setuOpenTrancheReleaseModal) window.setuOpenTrancheReleaseModal('${p.id}', ${p.sanctionedAmount || 5000000}, ${p.expenditure || 0});" style="padding: 10px 22px; font-size: 13px; cursor: pointer; background: #059669; border-radius: 4px; color: white; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                <span>💳</span> Release Next Tranche
              </button>
            ` : `
              <button type="button" disabled title="Locked: Milestone stage evidence must be ACCEPTED first" style="padding: 10px 20px; font-size: 13px; border-radius: 4px; background: #f1f5f9; color: #94a3b8; border: 1px solid #e2e8f0; cursor: not-allowed; display: inline-flex; align-items: center; gap: 8px; font-weight: 600;">
                <span>🔒</span> Release Next Tranche (Locked)
              </button>
            `}
          </div>
        </div>
      </div>

      <div class="setu-card" style="margin-top: var(--setu-space-4); border-left: 3px solid ${isHighRisk ? 'var(--setu-color-accent-base)' : 'var(--setu-color-primary-base)'};">
        <span class="setu-card-label" style="font-size: var(--setu-font-size-caption);">Audit & Predictive Risk Analysis</span>
        <p style="font-size: var(--setu-font-size-body); line-height: 1.6; color: var(--setu-color-text-primary); margin: var(--setu-space-2) 0 0 0;">
          ${getRiskExplanation(p)}
        </p>
      </div>

      <div class="setu-info-grid" style="margin-top: var(--setu-space-5);">
        <div class="setu-info-card">
          <h3 class="setu-info-card-title">Fund Absorption & Milestone Metrics</h3>
          <div class="setu-kv-list">
            <div class="setu-kv-row">
              <span class="setu-kv-label">Physical Completion</span>
              <span class="setu-kv-value">${p.physicalProgress}%</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Financial Utilization</span>
              <span class="setu-kv-value">${finRate}%</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Progress Lead / Lag</span>
              <span class="setu-kv-value" style="color: ${p.paymentProgressMismatch ? 'var(--setu-color-accent-dark)' : 'var(--setu-color-text-primary)'};">
                ${p.paymentProgressMismatch ? 'Disbursement Exceeds Physical by > 25%' : 'Within Normal Thresholds'}
              </span>
            </div>
          </div>
        </div>

        <div class="setu-info-card">
          <h3 class="setu-info-card-title">Scheme Allocation Framework</h3>
          <div class="setu-kv-list">
            <div class="setu-kv-row">
              <span class="setu-kv-label">MP Annual Entitlement</span>
              <span class="setu-kv-value">₹5.00 Crore / Year</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Tranche Structure</span>
              <span class="setu-kv-value">Two ₹2.5 Crore Installments</span>
            </div>
            <div class="setu-kv-row">
              <span class="setu-kv-label">Auditing Authority</span>
              <span class="setu-kv-value">District Magistrate / CAG Audit</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (activeTab === 'evidence-review') {
    tabContentHtml = `
      <div>
        <div style="margin-bottom: var(--setu-space-4); display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--setu-space-2);">
          <div>
            <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-text-primary); margin: 0;">
              Milestone Evidence & Contractor Bill Review
            </h3>
            <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
              Inspect and verify technical site photos and contractor tax invoices submitted by Implementing Agency (${p.implementingAgency})
            </span>
          </div>
          <span class="setu-badge" style="background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; font-size: 11px;">
            Simulated OCR & CV Modules
          </span>
        </div>

        <!-- Section 1: Physical Inspection Photo Artifacts -->
        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 14px; font-weight: 700; color: var(--setu-color-primary-navy); margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
            <span>📸</span> Geo-Tagged Site Inspection Artifacts (${evidenceList.length})
          </h4>

          ${evidenceList.length > 0 ? `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
              ${evidenceList.map((ev, idx) => {
                const evStatus = ev.status || 'PENDING';
                const isAccepted = evStatus === 'ACCEPTED';
                const isRejectedEv = evStatus === 'REJECTED_RESUBMISSION_REQUIRED';
                return `
                  <div class="setu-card" style="padding: 16px; border: 1px solid var(--setu-color-border-subtle); background: white; border-radius: 6px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                        <div style="font-weight: 700; font-size: 14px; color: var(--setu-color-primary-navy);">
                          ${ev.milestoneStage || `Stage Milestone #${idx + 1}`}
                        </div>
                        <span style="font-size: 11px; color: var(--setu-color-text-muted); font-family: var(--setu-font-mono);">
                          ${ev.date || '2026-08-15'}
                        </span>
                      </div>

                      <div style="font-size: 12px; color: var(--setu-color-text-secondary); margin-bottom: 8px;">
                        Vendor / Inspector: <strong>${ev.uploadedBy || p.vendorName || p.implementingAgency}</strong>
                      </div>

                      ${ev.latitude ? `
                        <div style="font-size: 11px; font-family: var(--setu-font-mono); color: var(--setu-color-text-muted); margin-bottom: 10px;">
                          📍 Geo: ${ev.latitude.toFixed(4)}, ${ev.longitude.toFixed(4)}
                        </div>
                      ` : ''}

                      <!-- AI Computer Vision Verification Badge with Simulated Tag -->
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px; margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                          <span style="font-size: 11px; font-weight: 700; color: #334155;">Physical Evidence CV Verification:</span>
                          <span class="setu-badge" style="background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; font-size: 10px; padding: 1px 5px;">Simulated</span>
                        </div>
                        <div style="font-size: 12px; color: #059669; font-weight: 600;">
                          ✓ Concrete footing & structure depth match engineering specs (Confidence: 94.8%)
                        </div>
                      </div>

                      <div style="margin-bottom: 12px;">
                        <span style="font-size: 11px; font-weight: 600; color: #64748b;">Review Status: </span>
                        ${isAccepted ? `
                          <span class="setu-badge" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 700;">
                            ✓ Accepted by District Authority
                          </span>
                        ` : isRejectedEv ? `
                          <span class="setu-badge" style="background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; font-size: 11px; font-weight: 700;">
                            ✕ Resubmission Required
                          </span>
                        ` : `
                          <span class="setu-badge" style="background: #fffbeb; color: #92400e; border: 1px solid #fde68a; font-size: 11px; font-weight: 700;">
                            ⏳ Pending Review
                          </span>
                        `}
                      </div>
                    </div>

                    ${isDistrictRole ? `
                      <div style="display: flex; gap: 8px; margin-top: 8px; border-top: 1px solid #f1f5f9; padding-top: 10px;">
                        <button type="button" class="setu-btn-primary" onclick="if(window.setuReviewEvidence) window.setuReviewEvidence('${p.id}', '${ev.id}', 'ACCEPTED');" style="padding: 6px 12px; font-size: 12px; background: #059669; color: white; border: none; border-radius: 4px; cursor: pointer; flex: 1; font-weight: 600;">
                          ✓ Accept Evidence
                        </button>
                        <button type="button" onclick="if(window.setuReviewEvidence) window.setuReviewEvidence('${p.id}', '${ev.id}', 'REJECTED_RESUBMISSION_REQUIRED');" style="padding: 6px 12px; font-size: 12px; background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; border-radius: 4px; cursor: pointer; flex: 1; font-weight: 600;">
                          ✕ Reject (Resubmit)
                        </button>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="setu-empty-state" style="padding: 24px; background: #f8fafc; border: 1px solid var(--setu-color-border-subtle); border-radius: 6px;">
              <p class="setu-empty-state-text" style="margin: 0;">No milestone photo evidence artifacts currently uploaded by Implementing Agency.</p>
            </div>
          `}
        </div>

        <!-- Section 2: Contractor GST Tax Invoices -->
        <div>
          <h4 style="font-size: 14px; font-weight: 700; color: var(--setu-color-primary-navy); margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
            <span>📄</span> Contractor Tax Invoices & Statutory Vouchers (${invoiceList.length})
          </h4>

          ${invoiceList.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${invoiceList.map((inv) => {
                const invStatus = inv.status || 'PENDING';
                const isAcceptedInv = invStatus === 'ACCEPTED';
                const isRejectedInv = invStatus === 'REJECTED';
                return `
                  <div class="setu-card" style="padding: 16px; border: 1px solid var(--setu-color-border-subtle); background: white; border-radius: 6px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
                      <div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <span style="font-family: var(--setu-font-mono); font-weight: 700; font-size: 14px; color: var(--setu-color-primary-navy);">
                            ${inv.invoiceNumber}
                          </span>
                          <span style="font-size: 11px; color: var(--setu-color-text-muted);">
                            Date: ${inv.date || '2026-08-10'}
                          </span>
                        </div>
                        <div style="font-size: 12px; color: var(--setu-color-text-secondary); margin-top: 4px;">
                          Vendor: <strong>${inv.vendorName || p.vendorName || 'Assigned Contractor'}</strong> • GSTIN: <code style="font-family: var(--setu-font-mono);">${inv.gstin || '33AABCT1234F1Z5'}</code>
                        </div>
                      </div>

                      <div style="text-align: right;">
                        <div style="font-size: 15px; font-weight: 700; color: var(--setu-color-primary-navy);">
                          ₹${Number(inv.amount || 0).toLocaleString('en-IN')}
                        </div>
                        <span style="font-size: 11px; color: var(--setu-color-text-muted);">
                          Milestone: ${inv.stage || 'Stage Completion'}
                        </span>
                      </div>
                    </div>

                    <!-- GST OCR Verification Box with Simulated Tag -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px; margin-bottom: 12px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span style="font-size: 11px; font-weight: 700; color: #334155;">Invoice / GST OCR Verification:</span>
                        <span class="setu-badge" style="background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; font-size: 10px; padding: 1px 5px;">Simulated</span>
                      </div>
                      <div style="font-size: 12px; color: #059669; font-weight: 600;">
                        ✓ GSTIN active on GSTN portal • E-Way Bill 291049281902 validated • Tax math verified.
                      </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                      <div>
                        <span style="font-size: 11px; font-weight: 600; color: #64748b;">Voucher Status: </span>
                        ${isAcceptedInv ? `
                          <span class="setu-badge" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 700;">
                            ✓ Verified & Accepted
                          </span>
                        ` : isRejectedInv ? `
                          <span class="setu-badge" style="background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; font-size: 11px; font-weight: 700;">
                            ✕ Rejected
                          </span>
                        ` : `
                          <span class="setu-badge" style="background: #fffbeb; color: #92400e; border: 1px solid #fde68a; font-size: 11px; font-weight: 700;">
                            ⏳ Pending Audit Review
                          </span>
                        `}
                      </div>

                      ${isDistrictRole ? `
                        <div style="display: flex; gap: 8px;">
                          <button type="button" class="setu-btn-primary" onclick="if(window.setuReviewInvoice) window.setuReviewInvoice('${p.id}', '${inv.invoiceNumber}', 'ACCEPTED');" style="padding: 6px 14px; font-size: 12px; background: #059669; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
                            ✓ Accept Invoice
                          </button>
                          <button type="button" onclick="if(window.setuReviewInvoice) window.setuReviewInvoice('${p.id}', '${inv.invoiceNumber}', 'REJECTED');" style="padding: 6px 14px; font-size: 12px; background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; border-radius: 4px; cursor: pointer; font-weight: 600;">
                            ✕ Reject
                          </button>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="setu-empty-state" style="padding: 24px; background: #f8fafc; border: 1px solid var(--setu-color-border-subtle); border-radius: 6px;">
              <p class="setu-empty-state-text" style="margin: 0;">No contractor invoices currently submitted for this project.</p>
            </div>
          `}
        </div>
      </div>
    `;
  } else if (activeTab === 'compliance') {
    const flags = [];
    if (p.paymentProgressMismatch) {
      flags.push({
        code: 'COMP-PAY-01',
        type: 'PAYMENT_PROGRESS_MISMATCH',
        title: 'Payment Progress Exceeds Certified Physical Stage',
        desc: `Disbursement rate (${p.financialProgress}%) exceeds physical progress (${p.physicalProgress}%) by more than statutory threshold without corresponding stage measurement certificate.`
      });
    }
    if (p.duplicateRisk) {
      flags.push({
        code: 'COMP-DUP-02',
        type: 'DUPLICATE_ASSET_RISK',
        title: 'Potential Duplicate Asset Work Detected',
        desc: `Geospatial coordinate match indicates a similar civil asset was funded under municipal or state grant within 400m of this location in the prior financial year.`
      });
    }
    if (p.costOverrun) {
      flags.push({
        code: 'COMP-OVR-03',
        type: 'COST_OVERRUN_WARNING',
        title: 'Budget Exhaustion Preceding Final Milestone',
        desc: `Expenditures have surpassed proportional completion stages. Additional escalation approval will be required from the State Nodal Authority.`
      });
    }
    if (p.daysDelayed > 45) {
      flags.push({
        code: 'COMP-DEL-04',
        type: 'CHRONIC_TIMELINE_DELAY',
        title: 'Milestone Execution Delayed Beyond 45 Days',
        desc: `Work execution has slipped by ${p.daysDelayed} days against approved administrative schedule without formal extension submitted.`
      });
    }

    if (flags.length > 0) {
      const flagsHtml = flags.map(f => `
        <div class="setu-flag-card">
          <div class="setu-flag-header">
            <h4 class="setu-flag-title">${f.title}</h4>
            <span class="setu-detail-id-tag">${f.code}</span>
          </div>
          <p class="setu-flag-desc">${f.desc}</p>
        </div>
      `).join('');

      tabContentHtml = `
        <div>
          <div style="margin-bottom: var(--setu-space-4);">
            <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-accent-dark); margin: 0;">
              Active Compliance Engine Flags (${flags.length})
            </h3>
            <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
              Violations flagged for administrative review prior to next fund tranche release
            </span>
          </div>
          ${flagsHtml}
        </div>
      `;
    } else {
      tabContentHtml = `
        <div class="setu-empty-state">
          <h4 class="setu-empty-state-title">No Compliance Flags Detected</h4>
          <p class="setu-empty-state-text">
            This project conforms with MPLADS operational guidelines, statutory single-tender ceiling rules, and scheduled milestone pacing.
          </p>
        </div>
      `;
    }
  } else if (activeTab === 'citizen-reports') {
    if (complaints.length > 0) {
      const maxScore = Math.max(...complaints.map(c => {
        const raw = c.contradictionScore != null ? c.contradictionScore : 0;
        return Math.round(raw <= 1.0 ? raw * 100 : raw);
      }));

      const complaintsHtml = complaints.map(c => {
        const rawScore = c.contradictionScore != null ? c.contradictionScore : 0;
        const score = Math.round(rawScore <= 1.0 ? rawScore * 100 : rawScore);
        const isHighContradiction = score >= 60 || c.isContradiction;
        const isMedContradiction = score >= 30 && score < 60;
        
        const badgeClass = isHighContradiction
          ? 'setu-badge-contradiction-high'
          : isMedContradiction
          ? 'setu-badge-contradiction-med'
          : 'setu-badge-contradiction-low';

        const badgeText = isHighContradiction
          ? `Contradiction Flagged (${score}/100)`
          : isMedContradiction
          ? `Moderate Discrepancy (${score}/100)`
          : `Corroborated (${score}/100)`;

        const cardModifier = isHighContradiction
          ? 'setu-complaint-card-contradiction'
          : 'setu-complaint-card-corroborated';

        const matchedClaim = c.matchedOfficialClaim || c.officialClaim;
        const explanation = c.plainLanguageExplanation || c.citizenSummary;

        const geoBadgeHtml = (c.geoMatchDistance != null)
          ? `<span class="setu-geo-badge ${c.geoMatchDistance <= 2.0 ? 'setu-geo-near' : 'setu-geo-far'}">
              ${c.geoMatchDistance <= 2.0 
                ? `📍 Reported near-site (${Number(c.geoMatchDistance).toFixed(1)}km away)` 
                : `⚠ Reported far from registered site (${Number(c.geoMatchDistance).toFixed(1)}km away)`}
            </span>`
          : '';

        return `
          <div class="setu-complaint-card ${cardModifier}">
            <div class="setu-complaint-header">
              <div style="display: flex; align-items: center; gap: var(--setu-space-2); flex-wrap: wrap;">
                <span class="setu-card-label" style="font-family: var(--setu-font-mono);">${c.id}</span>
                <span style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted);">
                  • Submitted: ${c.submittedAt ? c.submittedAt.split('T')[0] : '2026-08'}
                </span>
                ${c.status ? `
                  <span style="font-size: var(--setu-font-size-caption); color: var(--setu-color-neutral-600); background-color: var(--setu-color-bg-subtle); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--setu-color-border-subtle);">
                    ${c.status}
                  </span>
                ` : ''}
              </div>

              <div style="display: flex; align-items: center; gap: var(--setu-space-2); flex-wrap: wrap;">
                ${geoBadgeHtml}
                <!-- Colored contradictionScore badge — high score in accent/warning color -->
                <span class="setu-badge ${badgeClass}">
                  ${badgeText}
                </span>
              </div>
            </div>

            <!-- 1. Citizen Complaint Text -->
            <div class="setu-complaint-text-box">
              <span class="setu-complaint-label">
                Citizen Ground-Truth Observation:
              </span>
              <p class="setu-complaint-text">
                "${c.complaintText}"
              </p>
            </div>

            <!-- 2. Matched Official Claim -->
            ${matchedClaim ? `
              <div class="setu-claim-box">
                <span class="setu-claim-label">
                  Matched Official Portal Claim / Milestone:
                </span>
                <div class="setu-claim-text">
                  ${matchedClaim}
                </div>
              </div>
            ` : ''}

            <!-- 3. Plain Language Explanation -->
            ${explanation ? `
              <div class="${isHighContradiction ? 'setu-explanation-box' : 'setu-claim-box'}">
                <span class="${isHighContradiction ? 'setu-explanation-label' : 'setu-claim-label'}">
                  ${isHighContradiction ? '⚠ Audit Contradiction Analysis:' : 'Audit Verification Summary:'}
                </span>
                <div class="${isHighContradiction ? 'setu-explanation-text' : 'setu-claim-text'}">
                  ${explanation}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');

      tabContentHtml = `
        <div>
          <!-- Feature 5: Grouped Citizen Report Review Card -->
          ${complaints.length > 1 ? `
            <div style="background: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #d97706; border-radius: 6px; padding: 18px 20px; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
                <div>
                  <div style="font-size: 15px; font-weight: 700; color: #92400e; display: flex; align-items: center; gap: 8px;">
                    <span>👥</span> Consolidated Citizen Contradiction Review (Grouped: ${complaints.length} Independent Reports)
                  </div>
                  <div style="font-size: 12px; color: #b45309; margin-top: 4px; line-height: 1.5;">
                    Multiple on-ground citizen observations filed for <strong>${p.name}</strong>. Evaluated as a single unified discrepancy cluster by the NLP Contradiction Engine rather than independent duplicate alerts.
                  </div>
                </div>
                <span class="setu-badge setu-badge-contradiction-high" style="font-size: 12px; padding: 5px 12px; font-weight: 700;">
                  Peak Discrepancy: ${maxScore}/100
                </span>
              </div>
            </div>
          ` : ''}

          <div style="margin-bottom: var(--setu-space-4); display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--setu-space-2);">
            <div>
              <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-text-primary); margin: 0;">
                Citizen Grievances & NLP Contradiction Reports (${complaints.length})
              </h3>
              <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
                On-ground physical reports submitted through the Citizen Transparency Interface
              </span>
            </div>
            <span id="setu-live-sync-indicator" style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted); font-style: italic;">
              Synced with Citizen NLP Engine
            </span>
          </div>
          ${complaintsHtml}
        </div>
      `;
    } else {
      tabContentHtml = `
        <div class="setu-empty-state">
          <h4 class="setu-empty-state-title">No Citizen Grievances Recorded</h4>
          <p class="setu-empty-state-text">
            No public contradictions or grievances have been filed for this project. Citizens can submit ground verification reports via the public Citizen Portal.
          </p>
        </div>
      `;
    }
  } else if (activeTab === 'audit-trail') {
    tabContentHtml = `
      <div>
        <div style="margin-bottom: var(--setu-space-4);">
          <h3 style="font-size: var(--setu-font-size-subheading); color: var(--setu-color-text-primary); margin: 0;">
            Project Chronology & Audit Events
          </h3>
          <span style="font-size: var(--setu-font-size-small); color: var(--setu-color-text-secondary);">
            Tamper-evident administrative timeline recorded by District Authority and Implementing Agency
          </span>
        </div>

        <div class="setu-timeline">
          <div class="setu-timeline-item">
            <div class="setu-timeline-dot"></div>
            <span class="setu-timeline-date">2025-08-14 • 10:30 AM</span>
            <span class="setu-timeline-action">Work Proposal Submitted</span>
            <span class="setu-timeline-actor">Initiated by ${p.mpName} (${p.constituency})</span>
          </div>

          <div class="setu-timeline-item">
            <div class="setu-timeline-dot"></div>
            <span class="setu-timeline-date">2025-09-22 • 03:15 PM</span>
            <span class="setu-timeline-action">Technical Feasibility & Cost Estimation Sanctioned</span>
            <span class="setu-timeline-actor">Verified by Executive Engineer, ${p.implementingAgency}</span>
          </div>

          <div class="setu-timeline-item">
            <div class="setu-timeline-dot"></div>
            <span class="setu-timeline-date">2025-10-18 • 11:45 AM</span>
            <span class="setu-timeline-action">Administrative Sanction Order Issued (₹${Number(p.sanctionedAmount).toLocaleString('en-IN')})</span>
            <span class="setu-timeline-actor">Authorized by District Magistrate / Collectorate, ${p.district}</span>
          </div>

          <div class="setu-timeline-item">
            <div class="setu-timeline-dot"></div>
            <span class="setu-timeline-date">2026-02-10 • 02:00 PM</span>
            <span class="setu-timeline-action">Milestone-1 Physical Progress Recorded (${p.physicalProgress}%)</span>
            <span class="setu-timeline-actor">Inspected by Junior Technical Engineer, ${p.implementingAgency}</span>
          </div>

          <div class="setu-timeline-item">
            <div class="setu-timeline-dot ${isHighRisk ? 'setu-timeline-dot-flagged' : ''}"></div>
            <span class="setu-timeline-date">2026-06-30 • 09:00 AM</span>
            <span class="setu-timeline-action">${isHighRisk ? `Risk Engine Flag Generated (Score: ${p.riskScore})` : 'Routine Compliance Verification Completed'}</span>
            <span class="setu-timeline-actor">Evaluated by SETU National Monitoring Engine</span>
          </div>
        </div>
      </div>
    `;
  }

  
  const sanctionedLakhs = ((p.sanctionedAmount || 28000000) / 100000).toFixed(2);
  const disbursedLakhs = ((p.expenditure || 18200000) / 100000).toFixed(2);
  const ucVerifiedLakhs = (((p.expenditure || 18200000) * 0.9) / 100000).toFixed(2);
  const physProg = p.physicalProgress != null ? p.physicalProgress : 72;

  // Rich Stitch Stitch Two-Column Overview Extension when activeTab === 'overview'
  const stitchOverviewColumnsHtml = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop mt-space-lg">
      <!-- Left Column (8 Columns): Financial Stepper, Milestone Gating & Evidence Gallery -->
      <div class="lg:col-span-8 space-y-space-xl">
        <!-- Module 1: Milestone Progress & Multi-Tranche Disbursement Ledger -->
        <section class="bg-surface-container-lowest rounded p-space-lg shadow-sm border border-outline-variant/30">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md border-b border-outline-variant/20">
            <div>
              <h2 class="font-headline-md text-headline-md text-primary font-bold">Financial &amp; Milestone Disbursement Ledger</h2>
              <p class="text-body-sm font-body-sm text-on-surface-variant">Gated tranche releases under MPLADS Guidelines 2023 §7.4 based on physical verification logs.</p>
            </div>
            <span class="px-2 py-1 rounded bg-surface-container text-primary font-mono text-label-sm font-label-sm self-start sm:self-auto font-semibold">
              Escrow Ref: SBI-PFMS-993182
            </span>
          </div>
          <!-- Visual Milestone Stepper Flow -->
          <div class="py-space-md">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-sm relative">
              <!-- Step 1: Foundation & Substructure -->
              <div class="bg-surface-container-low rounded p-space-sm flex flex-col justify-between border border-outline-variant/20">
                <div class="flex items-center justify-between pb-space-xs">
                  <span class="w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center text-label-sm font-label-sm">
                    <span class="material-symbols-outlined text-[14px]">done</span>
                  </span>
                  <span class="text-label-sm font-label-sm font-mono text-tertiary-container font-semibold">100% Done</span>
                </div>
                <div>
                  <h4 class="text-label-md font-label-md text-primary font-bold">1. Substructure</h4>
                  <p class="text-body-sm font-body-sm text-on-surface-variant pt-0.5">Pile foundations &amp; plinth</p>
                </div>
                <div class="mt-space-sm pt-space-xs bg-surface-container-lowest rounded p-1.5 text-label-sm font-label-sm font-mono text-on-surface">
                  Tranche 1: ₹70.0L [PAID]
                </div>
              </div>
              <!-- Step 2: Superstructure Framework -->
              <div class="bg-surface-container-low rounded p-space-sm flex flex-col justify-between border border-outline-variant/20">
                <div class="flex items-center justify-between pb-space-xs">
                  <span class="w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center text-label-sm font-label-sm">
                    <span class="material-symbols-outlined text-[14px]">done</span>
                  </span>
                  <span class="text-label-sm font-label-sm font-mono text-tertiary-container font-semibold">100% Done</span>
                </div>
                <div>
                  <h4 class="text-label-md font-label-md text-primary font-bold">2. Superstructure</h4>
                  <p class="text-body-sm font-body-sm text-on-surface-variant pt-0.5">RCC columns &amp; 3 floor slabs</p>
                </div>
                <div class="mt-space-sm pt-space-xs bg-surface-container-lowest rounded p-1.5 text-label-sm font-label-sm font-mono text-on-surface">
                  Tranche 2: ₹112.0L [PAID]
                </div>
              </div>
              <!-- Step 3: Masonry, Roofing & MEP (Active) -->
              <div class="bg-secondary-fixed rounded p-space-sm flex flex-col justify-between border border-secondary-fixed-dim">
                <div class="flex items-center justify-between pb-space-xs">
                  <span class="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-label-sm font-label-sm font-bold animate-pulse">
                    3
                  </span>
                  <span class="text-label-sm font-label-sm font-mono text-on-secondary-container font-bold">80% Active</span>
                </div>
                <div>
                  <h4 class="text-label-md font-label-md text-on-secondary-fixed font-bold">3. Masonry &amp; MEP</h4>
                  <p class="text-body-sm font-body-sm text-on-secondary-container pt-0.5">Brickwork, electrical &amp; plumbing</p>
                </div>
                <div class="mt-space-sm pt-space-xs bg-surface-container-lowest rounded p-1.5 text-label-sm font-label-sm font-mono text-secondary font-bold">
                  Tranche 3: ₹56.0L [GATED]
                </div>
              </div>
              <!-- Step 4: Finishing & Statutory Handover -->
              <div class="bg-surface-container-low rounded p-space-sm flex flex-col justify-between opacity-80 border border-outline-variant/20">
                <div class="flex items-center justify-between pb-space-xs">
                  <span class="w-6 h-6 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center text-label-sm font-label-sm">
                    4
                  </span>
                  <span class="text-label-sm font-label-sm font-mono text-on-surface-variant">Scheduled</span>
                </div>
                <div>
                  <h4 class="text-label-md font-label-md text-primary font-bold">4. Finishing &amp; UC</h4>
                  <p class="text-body-sm font-body-sm text-on-surface-variant pt-0.5">HVAC, lift, safety audit &amp; UC</p>
                </div>
                <div class="mt-space-sm pt-space-xs bg-surface-container-lowest rounded p-1.5 text-label-sm font-label-sm font-mono text-on-surface-variant">
                  Tranche 4: ₹42.0L [RETAINED]
                </div>
              </div>
            </div>
          </div>
          <!-- Multi-Tranche Disbursement Tabular Breakdown -->
          <div class="overflow-x-auto mt-space-md">
            <table class="w-full text-left border-collapse text-body-sm font-body-sm">
              <thead>
                <tr class="bg-surface-container text-on-surface-variant uppercase text-label-sm font-label-sm">
                  <th class="py-2.5 px-3 font-semibold">Tranche #</th>
                  <th class="py-2.5 px-3 font-semibold">Sanction Amount</th>
                  <th class="py-2.5 px-3 font-semibold">Release Condition</th>
                  <th class="py-2.5 px-3 font-semibold">Voucher / UTR</th>
                  <th class="py-2.5 px-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-variant">
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-2 px-3 font-semibold text-primary">Tranche 1 (Mobilization)</td>
                  <td class="py-2 px-3 font-mono font-semibold">₹ 70,00,000</td>
                  <td class="py-2 px-3 text-on-surface-variant">Initial mobilization + Soil test approvals</td>
                  <td class="py-2 px-3 font-mono text-label-sm font-label-sm">RBI-NEFT-2024-91823</td>
                  <td class="py-2 px-3 text-right">
                    <span class="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-label-sm font-semibold">Released (22 Apr 2024)</span>
                  </td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-2 px-3 font-semibold text-primary">Tranche 2 (Stage-1 Plinth)</td>
                  <td class="py-2 px-3 font-mono font-semibold">₹ 1,12,00,000</td>
                  <td class="py-2 px-3 text-on-surface-variant">Superstructure completion + Physical inspection check</td>
                  <td class="py-2 px-3 font-mono text-label-sm font-label-sm">RBI-NEFT-2024-66319</td>
                  <td class="py-2 px-3 text-right">
                    <span class="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-label-sm font-semibold">Released (10 Oct 2024)</span>
                  </td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors bg-secondary-fixed/20">
                  <td class="py-2 px-3 font-semibold text-primary">Tranche 3 (Stage-2 Masonry)</td>
                  <td class="py-2 px-3 font-mono font-semibold">₹ 56,00,000</td>
                  <td class="py-2 px-3 text-on-surface-variant">80% internal brickwork + certified drone inspection</td>
                  <td class="py-2 px-3 font-mono text-label-sm font-label-sm">PENDING-DIV-CH-04</td>
                  <td class="py-2 px-3 text-right">
                    <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-container text-label-sm font-label-sm font-semibold">Gated (Field Inspection Due)</span>
                  </td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-2 px-3 font-semibold text-primary">Tranche 4 (Final Handover)</td>
                  <td class="py-2 px-3 font-mono font-semibold">₹ 42,00,000</td>
                  <td class="py-2 px-3 text-on-surface-variant">100% completion certificate + statutory Utilization Cert (UC)</td>
                  <td class="py-2 px-3 font-mono text-label-sm font-label-sm">RETAINED-ESCROW</td>
                  <td class="py-2 px-3 text-right">
                    <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-label-sm font-label-sm">Retained</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Module 2: Contractor Inspection Photo Gallery with CV Badges -->
        <section class="bg-surface-container-lowest rounded p-space-lg shadow-sm border border-outline-variant/30">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md border-b border-outline-variant/20">
            <div>
              <div class="flex items-center gap-space-xs">
                <h2 class="font-headline-md text-headline-md text-primary font-bold">Contractor Geo-Tagged Evidence Vault</h2>
                <span class="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-label-sm font-semibold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">psychology</span> Simulated AI Audited
                </span>
              </div>
              <p class="text-body-sm font-body-sm text-on-surface-variant">Automated computer vision detection applied to verify asset progress on site.</p>
            </div>
            <div class="flex items-center gap-space-xs text-label-sm font-label-sm text-on-surface-variant">
              <span class="material-symbols-outlined text-[16px] text-tertiary-container">satellite_alt</span>
              <span>Geofence: ± 4.2m accuracy</span>
            </div>
          </div>
          <!-- Photo Card Grid (4 Verified Photo Cards) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop mt-space-md">
            <!-- Photo Card 1: Substructure Slab Casting -->
            <div class="bg-surface-container-low rounded overflow-hidden shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div class="relative w-full h-48 bg-surface-container">
                <img class="w-full h-full object-cover" data-alt="High-resolution site inspection photograph showing heavy reinforced concrete foundation piles in Chennai" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYTCmAyi8LLpTlAsMEaJHFKhkjsyF1KAGnHBnxiLLNrLDW1H18-TvsxkgFl1fW84c4DwERkPwyc-YcD3xXw8wmHx9fOgUnDwe_NyqWiQU6hbXioTkDiGSBMVz95uxRtKrnQ-2oH6HyvfFxDD6V-xCj49kPRnLOPDIAJ-t8k4DP_2ZomB6q6uEsuGXjhEiBDM3WpbK3NJrQE5NNq2VOZS2MYcsCix5sYn4ZITAofqSZB9An2jup3an_"/>
                <div class="absolute top-2 left-2 flex flex-col gap-1">
                  <span class="px-2 py-0.5 rounded bg-inverse-surface/90 text-inverse-on-surface text-label-sm font-label-sm font-mono flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px] text-tertiary-fixed-dim">my_location</span>
                    13.0827° N, 80.2707° E
                  </span>
                  <span class="px-2 py-0.5 rounded bg-tertiary-container/95 text-on-tertiary text-label-sm font-label-sm font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">psychology</span>
                    CV: RCC Pile Cap (98.4% Match)
                  </span>
                </div>
                <div class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-label-sm font-label-sm font-mono">
                  12 Jun 2024 · 11:24 IST
                </div>
              </div>
              <div class="p-space-sm space-y-1">
                <div class="flex justify-between items-start">
                  <h4 class="text-label-md font-label-md text-primary font-bold">Piling &amp; Raft Foundation Curing</h4>
                  <span class="text-label-sm font-label-sm text-tertiary-container font-semibold">STAGE 1 PASS</span>
                </div>
                <p class="text-body-sm font-body-sm text-on-surface-variant">Concrete cube strength certification: M30 grade certified by PWD Quality Assurance Wing.</p>
                <div class="pt-space-xs text-label-sm font-label-sm text-on-surface-variant font-mono flex items-center justify-between">
                  <span>Uploaded by: Coromandel InfraCon</span>
                  <span class="text-primary font-semibold">Hash: #a982f...d1</span>
                </div>
              </div>
            </div>
            <!-- Photo Card 2: 2nd Floor Structural Framing -->
            <div class="bg-surface-container-low rounded overflow-hidden shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div class="relative w-full h-48 bg-surface-container">
                <img class="w-full h-full object-cover" data-alt="Civil construction site view of modern multi-story institutional office in Chennai" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtC4DSMo-9fLKhkBFWPjRc5BBhV7Rylr_Tr_hVv9iPVdoO3MyVX-ZfVWZadLLIxpTpytkuAhLIdfL2urc9esOa8GnMkS1Kr3P5RD2etzijAK7xI67b8UND-DLPw9dbU3ft1e7NzYsrH5AvlD21SjAFqyFKHoP2xtlRcuw9rI_g0Ud57grk3HZDdyPe6VTh8iS7R52JYSonU3EmrasvZJMakYxzkF0leSnGohG6hs3VtPK5lD_1LnhS"/>
                <div class="absolute top-2 left-2 flex flex-col gap-1">
                  <span class="px-2 py-0.5 rounded bg-inverse-surface/90 text-inverse-on-surface text-label-sm font-label-sm font-mono flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px] text-tertiary-fixed-dim">my_location</span>
                    13.0828° N, 80.2709° E
                  </span>
                  <span class="px-2 py-0.5 rounded bg-tertiary-container/95 text-on-tertiary text-label-sm font-label-sm font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">psychology</span>
                    CV: Slab Shuttering &amp; Beams (96.2%)
                  </span>
                </div>
                <div class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-label-sm font-label-sm font-mono">
                  18 Sep 2024 · 16:45 IST
                </div>
              </div>
              <div class="p-space-sm space-y-1">
                <div class="flex justify-between items-start">
                  <h4 class="text-label-md font-label-md text-primary font-bold">Level 2 Column &amp; Slab Pouring</h4>
                  <span class="text-label-sm font-label-sm text-tertiary-container font-semibold">STAGE 2 PASS</span>
                </div>
                <p class="text-body-sm font-body-sm text-on-surface-variant">Reinforcement spacing verified against structural blueprints approved by consultant.</p>
                <div class="pt-space-xs text-label-sm font-label-sm text-on-surface-variant font-mono flex items-center justify-between">
                  <span>Uploaded by: Coromandel InfraCon</span>
                  <span class="text-primary font-semibold">Hash: #b771e...88</span>
                </div>
              </div>
            </div>
            <!-- Photo Card 3: Brickwork & Wall Masonry -->
            <div class="bg-surface-container-low rounded overflow-hidden shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div class="relative w-full h-48 bg-surface-container">
                <img class="w-full h-full object-cover" data-alt="Interior site shot showing red brick masonry partition walls" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXLjLzkC-Scp8FGAedZSEX4hx_7k2jxSWl2R1Cnpedk0Vx4gtVoiomW1BsQgdoHPnresVidmKYXCz-32IMad58FrVxy--xCoGDVn3D5kIQ8hxnErngXNe0cVMpgOndDoKcrcfM6f_FpNYKJgwJMlKcWRxKp7Bs1nuVIcgxmuM-nqDurPkpG8xSZS1-ML4-kIxJ120g7XAeyt1dnLvv2brnxE1HhhQiKsVpBGtZDQ1cydeoGbMNiHsf"/>
                <div class="absolute top-2 left-2 flex flex-col gap-1">
                  <span class="px-2 py-0.5 rounded bg-inverse-surface/90 text-inverse-on-surface text-label-sm font-label-sm font-mono flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px] text-tertiary-fixed-dim">my_location</span>
                    13.0826° N, 80.2708° E
                  </span>
                  <span class="px-2 py-0.5 rounded bg-tertiary-container/95 text-on-tertiary text-label-sm font-label-sm font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">psychology</span>
                    CV: Fly-Ash Brickwork (94.8%)
                  </span>
                </div>
                <div class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-label-sm font-label-sm font-mono">
                  04 Jan 2025 · 09:12 IST
                </div>
              </div>
              <div class="p-space-sm space-y-1">
                <div class="flex justify-between items-start">
                  <h4 class="text-label-md font-label-md text-primary font-bold">External &amp; Internal Brick Masonry</h4>
                  <span class="text-label-sm font-label-sm text-secondary font-bold">STAGE 3 IN AUDIT</span>
                </div>
                <p class="text-body-sm font-body-sm text-on-surface-variant">Moisture retention checking and mortar ratio testing conducted by Assistant Executive Engineer.</p>
                <div class="pt-space-xs text-label-sm font-label-sm text-on-surface-variant font-mono flex items-center justify-between">
                  <span>Uploaded by: Coromandel InfraCon</span>
                  <span class="text-primary font-semibold">Hash: #f041a...5c</span>
                </div>
              </div>
            </div>
            <!-- Photo Card 4: Electrical Conduit & Ducting -->
            <div class="bg-surface-container-low rounded overflow-hidden shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div class="relative w-full h-48 bg-surface-container">
                <img class="w-full h-full object-cover" data-alt="Technical photo of electrical PVC conduit routing and fire suppression pipelines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8g2Xa4n95tfd7YMOq43mzRRnCukAitQEs45LbfCNR6iKBXt-NOewkhAWxA_daLASX39y5IUJ8Pd3oNNbzxliKuOQfY-0Q-v91TD3njFPO-BwwR8Fh4bzmHmTCI8sGB12yxUqQeSMmAFbJEz4zcb6n7Y8Res7wCAVoE76Htg3VTESvJX1JBkKCOplH49RjaLl0JekKiy0S10NS_JA7F3R1RS-B16q7ayRwzU6Z618BrgfFJNXAkxO1"/>
                <div class="absolute top-2 left-2 flex flex-col gap-1">
                  <span class="px-2 py-0.5 rounded bg-inverse-surface/90 text-inverse-on-surface text-label-sm font-label-sm font-mono flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px] text-tertiary-fixed-dim">my_location</span>
                    13.0827° N, 80.2706° E
                  </span>
                  <span class="px-2 py-0.5 rounded bg-tertiary-container/95 text-on-tertiary text-label-sm font-label-sm font-semibold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">psychology</span>
                    CV: Conduit Installation (91.0%)
                  </span>
                </div>
                <div class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-label-sm font-label-sm font-mono">
                  12 Feb 2025 · 14:05 IST
                </div>
              </div>
              <div class="p-space-sm space-y-1">
                <div class="flex justify-between items-start">
                  <h4 class="text-label-md font-label-md text-primary font-bold">MEP Trunking &amp; Conduit Lines</h4>
                  <span class="text-label-sm font-label-sm text-secondary font-bold">STAGE 3 IN AUDIT</span>
                </div>
                <p class="text-body-sm font-body-sm text-on-surface-variant">ISI marked fire-retardant conduits installed per National Building Code (NBC 2016).</p>
                <div class="pt-space-xs text-label-sm font-label-sm text-on-surface-variant font-mono flex items-center justify-between">
                  <span>Uploaded by: Coromandel InfraCon</span>
                  <span class="text-primary font-semibold">Hash: #82e99...1b</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column (4 Columns): Citizen Observation Timeline & Public Action Module -->
      <div class="lg:col-span-4 space-y-space-xl">
        <!-- Citizen Ground-Truth Verification Section -->
        <section class="bg-surface-container-lowest rounded p-space-lg shadow-sm border border-outline-variant/30">
          <div class="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
            <div class="flex items-center gap-space-xs">
              <span class="material-symbols-outlined text-secondary text-[20px]">groups</span>
              <h3 class="font-headline-md text-headline-md text-primary font-bold">Citizen Ground-Truth Feed</h3>
            </div>
            <span class="text-label-sm font-label-sm bg-surface-container px-2 py-0.5 rounded font-mono text-primary font-semibold">
              4 Audits Logged
            </span>
          </div>
          <p class="text-body-sm font-body-sm text-on-surface-variant py-space-sm">
            Unfiltered public social audits verified against official specifications by District Nodal Teams.
          </p>
          <!-- Citizen Observation Timeline Items -->
          <div class="space-y-space-md">
            <!-- Item 1: Citizen Verified -->
            <div class="bg-surface-container-low rounded p-space-sm space-y-2 border border-outline-variant/20">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary text-label-sm font-label-sm">
                    KR
                  </div>
                  <div>
                    <span class="font-semibold text-on-surface text-label-md font-label-md block">K. Radhakrishnan</span>
                    <span class="text-label-sm font-label-sm text-on-surface-variant font-mono">Resident · Egmore Ward 77</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-label-sm font-semibold">
                  Inspected &amp; Closed
                </span>
              </div>
              <p class="text-body-sm font-body-sm text-on-surface">
                "Verified boundary wall alignment. Construction dust screen barriers installed along main road. Workers wearing safety gear."
              </p>
              <div class="bg-surface-container rounded p-space-xs text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-tertiary-container">verified_user</span>
                <span>Inspected by PWD Technical Officer (Er. S. Murugan, AEE) on 28 Jan 2025</span>
              </div>
            </div>
            <!-- Item 2: Citizen Observation Pending Technical Action -->
            <div class="bg-surface-container-low rounded p-space-sm space-y-2 border border-outline-variant/20">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary text-label-sm font-label-sm">
                    ST
                  </div>
                  <div>
                    <span class="font-semibold text-on-surface text-label-md font-label-md block">S. Thenmozhi</span>
                    <span class="text-label-sm font-label-sm text-on-surface-variant font-mono">Civil Society Volunteer</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-container text-label-sm font-label-sm font-semibold">
                  Action Assigned
                </span>
              </div>
              <p class="text-body-sm font-body-sm text-on-surface">
                "Noticed water stagnation near southeastern basement excavation after rain. Drainage sump pump needed."
              </p>
              <div class="bg-surface-container rounded p-space-xs text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-secondary">pending_actions</span>
                <span>Work Order issued to Contractor for pump de-watering (Ref: #OBS-992)</span>
              </div>
            </div>
            <!-- Item 3: Citizen Material Observation -->
            <div class="bg-surface-container-low rounded p-space-sm space-y-2 border border-outline-variant/20">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary text-label-sm font-label-sm">
                    VA
                  </div>
                  <div>
                    <span class="font-semibold text-on-surface text-label-md font-label-md block">V. Anand Kumar</span>
                    <span class="text-label-sm font-label-sm text-on-surface-variant font-mono">Structural Engineer (Citizen)</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-label-sm font-semibold">
                  Technical Sign-off
                </span>
              </div>
              <p class="text-body-sm font-body-sm text-on-surface">
                "Sampled curing quality of 2nd floor columns. Surface moisture retention was optimal. Photographic evidence uploaded."
              </p>
              <div class="bg-surface-container rounded p-space-xs text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-tertiary-container">done_all</span>
                <span>MoSPI SIH Audit Engine auto-correlated with Contractor Milestone Log</span>
              </div>
            </div>
          </div>
          <!-- Submit Observation Action Trigger -->
          <div class="mt-space-lg pt-space-md border-t border-surface-variant">
            <button class="w-full py-space-sm px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded flex items-center justify-center gap-2 transition-colors shadow-sm" id="open-audit-modal-btn" type="button" onclick="document.getElementById('audit-modal')?.classList.remove('hidden')">
              <span class="material-symbols-outlined text-[18px]">add_a_photo</span>
              <span>Submit Citizen Audit / Geo-Report</span>
            </button>
            <p class="text-label-sm font-label-sm text-on-surface-variant text-center pt-2">
              Protected under Section 11 of MPLADS Social Audit Framework. Whistleblower identity protected.
            </p>
          </div>
        </section>

        <!-- Statutory Nodal Contact & Sanction Order Verification -->
        <section class="bg-surface-container-low rounded p-space-md shadow-sm space-y-space-sm border border-outline-variant/30">
          <h4 class="text-label-md font-label-md text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-primary">policy</span>
            Statutory Accountability Matrix
          </h4>
          <div class="space-y-space-xs text-body-sm font-body-sm">
            <div class="p-2 bg-surface-container-lowest rounded border border-outline-variant/20">
              <span class="block text-label-sm font-label-sm text-on-surface-variant">Member of Parliament (Lok Sabha)</span>
              <span class="font-bold text-on-surface">${p.mpName || 'Central Chennai MP'} (${p.constituency || 'Parliamentary Constituency'})</span>
              <span class="block text-label-sm font-label-sm text-primary font-mono pt-0.5">MP Recommendation Date: 12 Jan 2024</span>
            </div>
            <div class="p-2 bg-surface-container-lowest rounded border border-outline-variant/20">
              <span class="block text-label-sm font-label-sm text-on-surface-variant">District Authority Contact</span>
              <span class="font-bold text-on-surface">District Collector &amp; DM (${p.district})</span>
              <span class="block text-label-sm font-label-sm text-on-surface-variant">Collectorate Complex, ${p.district}, ${p.state}</span>
              <span class="block text-label-sm font-label-sm text-secondary font-mono pt-0.5">dc.${(p.district || 'chennai').toLowerCase()}@gov.in · 044-25268341</span>
            </div>
            <div class="p-2 bg-surface-container-lowest rounded border border-outline-variant/20">
              <span class="block text-label-sm font-label-sm text-on-surface-variant">Right to Information (RTI) Dossier</span>
              <div class="flex items-center justify-between pt-1">
                <span class="font-mono text-label-sm font-label-sm text-on-surface">SANCTION-${p.id}.PDF</span>
                <a class="text-label-sm font-label-sm font-semibold text-secondary hover:underline flex items-center gap-0.5" href="#" onclick="alert('Downloading Official Sanction Dossier...'); return false;">
                  <span class="material-symbols-outlined text-[14px]">download</span> Download
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Location Geofence Map Context Widget -->
        <section class="bg-surface-container-lowest rounded p-space-md shadow-sm space-y-space-sm border border-outline-variant/30">
          <div class="flex items-center justify-between">
            <h4 class="text-label-md font-label-md text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-tertiary-container">location_on</span>
              Sanctioned Site Boundaries
            </h4>
            <span class="text-label-sm font-label-sm font-mono text-on-surface-variant">EPSG:4326</span>
          </div>
          <div class="w-full h-44 bg-surface-container rounded flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-surface-container-high/40 flex items-center justify-center pointer-events-none">
              <div class="bg-surface-container-lowest/90 px-3 py-1.5 rounded shadow text-center border border-outline-variant/30">
                <span class="block font-mono font-bold text-primary text-label-sm font-label-sm">13.0827° N, 80.2707° E</span>
                <span class="text-label-sm font-label-sm text-on-surface-variant">Radius: 150m Gated Perimeter</span>
              </div>
            </div>
          </div>
          <div class="text-label-sm font-label-sm text-on-surface-variant flex items-center justify-between">
            <span>Perimeter check: Active</span>
            <span class="text-tertiary-container font-semibold flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-tertiary-container"></span> Drone Survey Verified
            </span>
          </div>
        </section>
      </div>
    </div>
  `;

  return `
    <div class="flex flex-col w-full space-y-space-md">
      <!-- Statutory Breadcrumb & Context Navigation Bar -->
      <div class="w-full bg-surface-container-low rounded p-space-sm border border-outline-variant/20 flex flex-wrap items-center justify-between gap-space-sm text-label-sm font-label-sm">
        <div class="flex items-center gap-space-xs text-on-surface-variant flex-wrap">
          <a class="hover:text-primary transition-colors font-medium" href="#/dashboard">SETU Dashboard</a>
          <span class="text-outline-variant">/</span>
          <span class="text-on-surface-variant">${p.state} Register</span>
          <span class="text-outline-variant">/</span>
          <span class="text-primary font-semibold">${p.constituency} (${p.district})</span>
          <span class="text-outline-variant">/</span>
          <span class="text-on-surface font-mono font-bold">${p.id}</span>
        </div>
        <div class="flex items-center gap-space-md">
          <div class="flex items-center gap-1 text-on-surface-variant">
            <span class="material-symbols-outlined text-[16px] text-tertiary-container">verified</span>
            <span class="text-label-sm font-label-sm">PFMS Integrated &amp; Geofenced</span>
          </div>
          <button class="flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-primary transition-colors text-label-sm font-label-sm font-semibold" onclick="window.print()" type="button">
            <span class="material-symbols-outlined text-[14px]">print</span>
            <span>Official Gazette Sheet</span>
          </button>
        </div>
      </div>

      <!-- Primary Project Summary Banner (High-Density Institutional Ledger Card) -->
      <div class="w-full bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-space-lg md:p-space-xl">
        <div class="flex flex-col lg:flex-row items-start justify-between gap-gutter-desktop">
          <!-- Main Project Metadata Header -->
          <div class="space-y-space-sm flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-space-xs">
              <span class="px-2 py-0.5 rounded bg-surface-container-high text-primary font-mono text-label-sm font-label-sm font-bold">
                SANCTION ID: ${p.id}
              </span>
              <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-container text-label-sm font-label-sm font-semibold flex items-center gap-1">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Stage: ${p.status}
              </span>
              <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-label-sm font-label-sm">
                Sector: ${p.category}
              </span>
              <span class="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-label-sm font-semibold flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">lock_clock</span>
                Milestone Escrow Active
              </span>
            </div>
            <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
              ${p.name}
            </h1>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-xs text-body-sm font-body-sm">
              <div>
                <span class="block text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Implementing Body</span>
                <span class="font-semibold text-on-surface">${p.implementingAgency || 'State Line Agency'}</span>
              </div>
              <div>
                <span class="block text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Executing Contractor</span>
                <span class="font-semibold text-on-surface">${p.vendorName || 'Coromandel InfraCon Pvt. Ltd.'}</span>
              </div>
              <div>
                <span class="block text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Statutory Nodal Authority</span>
                <span class="font-semibold text-on-surface">District Collectorate, ${p.district} / MoSPI</span>
              </div>
              <div>
                <span class="block text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Sanction Date &amp; Gazette</span>
                <span class="font-semibold text-on-surface">14 Mar 2024 (${p.sanctionOrderNumber || 'GO-MPLAD-192'})</span>
              </div>
            </div>
          </div>
          <!-- Financial & Physical Progress Radial Summary Widget -->
          <div class="w-full lg:w-80 flex-shrink-0 bg-surface-container-low rounded p-space-md shadow-sm border border-outline-variant/30">
            <div class="flex items-center justify-between pb-space-xs">
              <span class="text-label-md font-label-md text-primary font-bold uppercase tracking-wider">Physical Progress</span>
              <span class="text-headline-md font-headline-md font-bold text-secondary">${physProg}%</span>
            </div>
            <div class="w-full bg-surface-variant rounded-full h-2.5 overflow-hidden">
              <div class="bg-secondary-container h-full rounded-full transition-all duration-500" style="width: ${physProg}%;"></div>
            </div>
            <div class="flex items-center justify-between pt-1 text-label-sm font-label-sm text-on-surface-variant">
              <span>Stage: Superstructure Complete</span>
              <span>Target: Dec 2026</span>
            </div>
            <div class="mt-space-md pt-space-sm bg-surface-container-lowest rounded p-space-sm space-y-1 border border-outline-variant/20">
              <div class="flex justify-between items-center text-label-sm font-label-sm">
                <span class="text-on-surface-variant">Total Sanctioned Outlay:</span>
                <span class="font-bold font-mono text-primary">₹ ${sanctionedLakhs} Lakhs</span>
              </div>
              <div class="flex justify-between items-center text-label-sm font-label-sm">
                <span class="text-on-surface-variant">Disbursed via PFMS:</span>
                <span class="font-bold font-mono text-tertiary-container">₹ ${disbursedLakhs} Lakhs</span>
              </div>
              <div class="flex justify-between items-center text-label-sm font-label-sm">
                <span class="text-on-surface-variant">UC Submitted &amp; Verified:</span>
                <span class="font-bold font-mono text-on-surface">₹ ${ucVerifiedLakhs} Lakhs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Horizontal Tab Navigation Strip -->
      <div class="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-space-md">
        <nav class="flex items-center gap-space-xs overflow-x-auto pb-space-xs border-b border-outline-variant/20" id="setu-detail-tab-nav">
          ${tabsHtml}
        </nav>

        <!-- Tab Panel Content Area -->
        <div class="pt-space-md" id="setu-detail-tab-content">
          ${tabContentHtml}
          ${activeTab === 'overview' ? stitchOverviewColumnsHtml : ''}
        </div>
      </div>

      <!-- Citizen Audit Modal (Simulated Micro-interaction for Public Reporting) -->
      <div class="fixed inset-0 z-50 bg-[#111827]/40 flex items-center justify-center hidden p-margin-desktop" id="audit-modal">
        <div class="bg-surface-container-lowest rounded-lg max-w-lg w-full p-space-lg shadow-xl border border-surface-variant space-y-space-md">
          <div class="flex items-center justify-between pb-space-xs border-b border-surface-variant">
            <div>
              <h3 class="text-headline-md font-headline-md text-primary font-bold">Submit Citizen Ground Observation</h3>
              <p class="text-body-sm font-body-sm text-on-surface-variant">MPLADS Statutory Social Audit System · SIH26102</p>
            </div>
            <button class="text-on-surface-variant hover:text-primary" onclick="document.getElementById('audit-modal')?.classList.add('hidden')" type="button">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form class="space-y-space-sm" id="citizen-audit-form" onsubmit="event.preventDefault(); document.getElementById('audit-success').classList.remove('hidden'); this.classList.add('hidden');">
            <div>
              <label class="block text-label-md font-label-md text-on-surface mb-1">Citizen Full Name / Alias <span class="text-error">*</span></label>
              <input class="w-full px-space-sm py-2 rounded bg-surface border border-outline-variant text-body-md font-body-md focus:border-primary focus:outline-none" placeholder="e.g. Ramesh V." required type="text"/>
            </div>
            <div>
              <label class="block text-label-md font-label-md text-on-surface mb-1">Category of Ground Observation <span class="text-error">*</span></label>
              <select class="w-full px-space-sm py-2 rounded bg-surface border border-outline-variant text-body-md font-body-md focus:border-primary focus:outline-none" required>
                <option value="">Select Observation Type...</option>
                <option value="quality">Material Quality / Workmanship</option>
                <option value="progress">Physical Work Stoppage / Delay</option>
                <option value="safety">Public Safety &amp; Dust Mitigation</option>
                <option value="milestone">Milestone Verification Confirmation</option>
              </select>
            </div>
            <div>
              <label class="block text-label-md font-label-md text-on-surface mb-1">Detailed Findings &amp; Ground Evidence Notes <span class="text-error">*</span></label>
              <textarea class="w-full px-space-sm py-2 rounded bg-surface border border-outline-variant text-body-md font-body-md focus:border-primary focus:outline-none" placeholder="Describe specific physical work visible on site..." required rows="3"></textarea>
            </div>
            <div class="p-space-sm bg-surface-container-low rounded border border-surface-variant">
              <div class="flex items-center gap-2 text-label-sm font-label-sm text-primary font-semibold mb-1">
                <span class="material-symbols-outlined text-[16px] text-tertiary-container">location_on</span>
                <span>GPS Geotag Verification Auto-Acquire</span>
              </div>
              <p class="text-label-sm font-label-sm text-on-surface-variant">
                Browser geolocation coordinates will be stamped onto submitted imagery to match project geofence (${p.district}).
              </p>
            </div>
            <div class="flex items-center justify-end gap-space-sm pt-space-xs">
              <button class="px-space-md py-2 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container rounded" onclick="document.getElementById('audit-modal')?.classList.add('hidden')" type="button">
                Cancel
              </button>
              <button class="px-space-lg py-2 bg-primary hover:bg-primary-container text-on-primary text-label-md font-label-md font-semibold rounded" type="submit">
                Submit for Technical Officer Audit
              </button>
            </div>
          </form>
          <div class="hidden text-center py-space-lg space-y-space-sm" id="audit-success">
            <span class="material-symbols-outlined text-[48px] text-tertiary-container">check_circle</span>
            <h4 class="text-headline-md font-headline-md font-bold text-primary">Observation Recorded Successfully</h4>
            <p class="text-body-sm font-body-sm text-on-surface-variant">
              Your ground-truth report has been assigned Docket ID <span class="font-mono font-bold text-on-surface">#DOK-${p.id}-104</span>. The Technical Officer has been alerted.
            </p>
            <button class="px-space-lg py-2 bg-primary text-on-primary text-label-md font-label-md rounded font-semibold" onclick="document.getElementById('audit-modal')?.classList.add('hidden')" type="button">
              Return to Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
