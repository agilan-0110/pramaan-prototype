/**
 * SETU Project Detail Data Layer
 * 
 * Wired directly to:
 * - /backend/app/data/mockProjects.json
 * - /backend/app/data/mockComplaints.json
 */

const FALLBACK_PROJECTS = [
  {
    "id": "PRJ-IND-2001",
    "name": "Upgradation and Bituminous Surfacing of Main Rural Feeder Road, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Baramati",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-101",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
    "sanctionedAmount": 12900000,
    "expenditure": 7224000,
    "physicalProgress": 57,
    "financialProgress": 56.0,
    "status": "In Progress",
    "riskScore": 43,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2002",
    "name": "Installation of High-Capacity Automated Clinical Pathology Analyzer, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Baramati",
    "mpName": "Shri Aloknath Deshpande (Fictional)",
    "mpId": "MP-LS-101",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Vihan Infrastructure & Logistics LLP (Fictional)",
    "sanctionedAmount": 11900000,
    "expenditure": 7259000,
    "physicalProgress": 56,
    "financialProgress": 61.0,
    "status": "In Progress",
    "riskScore": 15,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2003",
    "name": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Shirur",
    "mpName": "Smt. Priyamvada Acharya (Fictional)",
    "mpId": "MP-LS-102",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Shivalik Highway Concessions (Fictional)",
    "sanctionedAmount": 4800000,
    "expenditure": 2448000,
    "physicalProgress": 17,
    "financialProgress": 51.0,
    "status": "In Progress",
    "riskScore": 67,
    "riskLevel": "HIGH",
    "daysDelayed": 153,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true
  },
  {
    "id": "PRJ-IND-2004",
    "name": "Installation of 1500 LPH Community Fluoride and Arsenic Filtration Plant, Pune",
    "state": "Maharashtra",
    "district": "Pune",
    "constituency": "Shirur",
    "mpName": "Smt. Priyamvada Acharya (Fictional)",
    "mpId": "MP-LS-102",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Narmada Water Resource Works (Fictional)",
    "sanctionedAmount": 11600000,
    "expenditure": 9280000,
    "physicalProgress": 56,
    "financialProgress": 80.0,
    "status": "In Progress",
    "riskScore": 76,
    "riskLevel": "HIGH",
    "daysDelayed": 199,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2005",
    "name": "Development of Green Community Recreation Park with Rainwater Harvesting, Nagpur",
    "state": "Maharashtra",
    "district": "Nagpur",
    "constituency": "Nagpur",
    "mpName": "Shri Jayant Kulkarni (Fictional)",
    "mpId": "MP-LS-103",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Brahmaputra Engineering Guild (Fictional)",
    "sanctionedAmount": 10000000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 15,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2006",
    "name": "All-Weather Paver Block Pavement in Dense Habitation Sector, Nagpur",
    "state": "Maharashtra",
    "district": "Nagpur",
    "constituency": "Nagpur",
    "mpName": "Shri Jayant Kulkarni (Fictional)",
    "mpId": "MP-LS-103",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Utkal Rural Development Projects (Fictional)",
    "sanctionedAmount": 4500000,
    "expenditure": 4500000,
    "physicalProgress": 100,
    "financialProgress": 100.0,
    "status": "Completed",
    "riskScore": 16,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2007",
    "name": "Mobile Diagnostic & Telemedicine Van with Satellite Uplink, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Mohanlalganj",
    "mpName": "Shri Harivansh Chaturvedi (Fictional)",
    "mpId": "MP-LS-104",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Chola Urban Infrastructure Corp (Fictional)",
    "sanctionedAmount": 7000000,
    "expenditure": 3290000,
    "physicalProgress": 49,
    "financialProgress": 47.0,
    "status": "In Progress",
    "riskScore": 53,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2008",
    "name": "Provision of Modern Dual-Desk Ergonomic Furniture for 12 Classrooms, Lucknow",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "constituency": "Mohanlalganj",
    "mpName": "Shri Harivansh Chaturvedi (Fictional)",
    "mpId": "MP-LS-104",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Vindhya Power & Pumping Solutions (Fictional)",
    "sanctionedAmount": 5700000,
    "expenditure": 2679000,
    "physicalProgress": 41,
    "financialProgress": 47.0,
    "status": "Delayed",
    "riskScore": 83,
    "riskLevel": "HIGH",
    "daysDelayed": 68,
    "costOverrun": false,
    "duplicateRisk": true,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2009",
    "name": "Groundwater Recharge Shafts with Silt Traps along Lake Catchment, Varanasi",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Smt. Vasundhara Sen (Fictional)",
    "mpId": "MP-LS-105",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Konkan Coastal Engineering (Fictional)",
    "sanctionedAmount": 3000000,
    "expenditure": 3000000,
    "physicalProgress": 100,
    "financialProgress": 100.0,
    "status": "Completed",
    "riskScore": 27,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2010",
    "name": "Modernization of Crematorium Ground with Eco-Friendly Gasifier Furnace, Varanasi",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "constituency": "Varanasi",
    "mpName": "Smt. Vasundhara Sen (Fictional)",
    "mpId": "MP-LS-105",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Aravalli Stone & Macadam Works (Fictional)",
    "sanctionedAmount": 8300000,
    "expenditure": 4482000,
    "physicalProgress": 45,
    "financialProgress": 54.0,
    "status": "Delayed",
    "riskScore": 54,
    "riskLevel": "MEDIUM",
    "daysDelayed": 22,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2011",
    "name": "Reinforced Concrete Access Bridge Across Local Drainage Stream, Kanpur Nagar",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "constituency": "Kanpur",
    "mpName": "Shri Tanmay Goswami (Fictional)",
    "mpId": "MP-LS-106",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Mithilanchal Public Works (Fictional)",
    "sanctionedAmount": 9800000,
    "expenditure": 9408000,
    "physicalProgress": 100,
    "financialProgress": 96.0,
    "status": "Completed",
    "riskScore": 17,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2012",
    "name": "Setting up of 6-Bed Neonatal Intensive Stabilization Centre at CHC, Kanpur Nagar",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "constituency": "Kanpur",
    "mpName": "Shri Tanmay Goswami (Fictional)",
    "mpId": "MP-LS-106",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Doon Valley Builders & Fabricators (Fictional)",
    "sanctionedAmount": 14300000,
    "expenditure": 11154000,
    "physicalProgress": 59,
    "financialProgress": 78.0,
    "status": "Delayed",
    "riskScore": 66,
    "riskLevel": "HIGH",
    "daysDelayed": 214,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2013",
    "name": "Establishment of Interactive STEM Robotic Lab in Higher Secondary School, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai Central",
    "mpName": "Smt. Meenakshi Sundaram (Fictional)",
    "mpId": "MP-LS-107",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
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
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2014",
    "name": "Multi-Village Piped Drinking Water Supply Grid with Automated Flow Meters, Chennai",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "constituency": "Chennai Central",
    "mpName": "Smt. Meenakshi Sundaram (Fictional)",
    "mpId": "MP-LS-107",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
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
    "paymentProgressMismatch": true
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
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
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
    "paymentProgressMismatch": false
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
    "implementingAgency": "Public Works Department (PWD)",
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
    "paymentProgressMismatch": false
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
    "implementingAgency": "District Health Mission",
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
    "paymentProgressMismatch": false
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
    "implementingAgency": "Department of Public Instruction",
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
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2019",
    "name": "Percolation Tank and Micro-Check Dam Rejuvenation Network, Bengaluru Urban",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Bengaluru North",
    "mpName": "Shri Prabhakar Hegde (Fictional)",
    "mpId": "MP-LS-110",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
    "sanctionedAmount": 15700000,
    "expenditure": 14915000,
    "physicalProgress": 72,
    "financialProgress": 95.0,
    "status": "Delayed",
    "riskScore": 79,
    "riskLevel": "HIGH",
    "daysDelayed": 99,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2020",
    "name": "Erection of Covered Farmers Vegetable Trading Platform and Cold Store Room, Bengaluru Urban",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "constituency": "Bengaluru North",
    "mpName": "Shri Prabhakar Hegde (Fictional)",
    "mpId": "MP-LS-110",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Brahmaputra Engineering Guild (Fictional)",
    "sanctionedAmount": 15800000,
    "expenditure": 11692000,
    "physicalProgress": 59,
    "financialProgress": 74.0,
    "status": "In Progress",
    "riskScore": 75,
    "riskLevel": "HIGH",
    "daysDelayed": 172,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2021",
    "name": "Elevated Storm-Proof Feeder Link to Primary Agricultural Cooperative, Mysuru",
    "state": "Karnataka",
    "district": "Mysuru",
    "constituency": "Mysore",
    "mpName": "Shri Ravindra Goud (Fictional)",
    "mpId": "MP-LS-111",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Malwa GeoStructures Pvt Ltd (Fictional)",
    "sanctionedAmount": 5800000,
    "expenditure": 3248000,
    "physicalProgress": 58,
    "financialProgress": 56.0,
    "status": "In Progress",
    "riskScore": 22,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2022",
    "name": "Emergency Trauma Triage Unit and Solar Inverter Power Backup, Mysuru",
    "state": "Karnataka",
    "district": "Mysuru",
    "constituency": "Mysore",
    "mpName": "Shri Ravindra Goud (Fictional)",
    "mpId": "MP-LS-111",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Chola Urban Infrastructure Corp (Fictional)",
    "sanctionedAmount": 13000000,
    "expenditure": 10010000,
    "physicalProgress": 67,
    "financialProgress": 77.0,
    "status": "Delayed",
    "riskScore": 57,
    "riskLevel": "MEDIUM",
    "daysDelayed": 31,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2023",
    "name": "Installation of RO Safe Drinking Water Station and Sanitary Incinerator, Dharwad",
    "state": "Karnataka",
    "district": "Dharwad",
    "constituency": "Dharwad",
    "mpName": "Smt. Rekha Vidyarthi (Fictional)",
    "mpId": "MP-LS-112",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Satpura Civil Constructors (Fictional)",
    "sanctionedAmount": 5300000,
    "expenditure": 5088000,
    "physicalProgress": 100,
    "financialProgress": 96.0,
    "status": "Completed",
    "riskScore": 20,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2024",
    "name": "High-Yield Deep Borewell and Overhead Storage Reservoir with Solar Pump, Dharwad",
    "state": "Karnataka",
    "district": "Dharwad",
    "constituency": "Dharwad",
    "mpName": "Smt. Rekha Vidyarthi (Fictional)",
    "mpId": "MP-LS-112",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Konkan Coastal Engineering (Fictional)",
    "sanctionedAmount": 15500000,
    "expenditure": 11315000,
    "physicalProgress": 53,
    "financialProgress": 73.0,
    "status": "Under Scrutiny",
    "riskScore": 94,
    "riskLevel": "HIGH",
    "daysDelayed": 68,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2025",
    "name": "Solid Waste Material Recovery Facility with Mechanical Trommel Sieve, Kolkata",
    "state": "West Bengal",
    "district": "Kolkata",
    "constituency": "Kolkata Dakshin",
    "mpName": "Smt. Anuradha Mukherjee (Fictional)",
    "mpId": "MP-LS-113",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Kalinga Water Filtration Works (Fictional)",
    "sanctionedAmount": 5300000,
    "expenditure": 3551000,
    "physicalProgress": 27,
    "financialProgress": 67.0,
    "status": "In Progress",
    "riskScore": 72,
    "riskLevel": "HIGH",
    "daysDelayed": 153,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true
  },
  {
    "id": "PRJ-IND-2026",
    "name": "Construction of Heavy-Duty Box Culvert and Approach Link Road, Kolkata",
    "state": "West Bengal",
    "district": "Kolkata",
    "constituency": "Kolkata Dakshin",
    "mpName": "Smt. Anuradha Mukherjee (Fictional)",
    "mpId": "MP-LS-113",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Mithilanchal Public Works (Fictional)",
    "sanctionedAmount": 9200000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 27,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2027",
    "name": "Installation of High-Capacity Automated Clinical Pathology Analyzer, Howrah",
    "state": "West Bengal",
    "district": "Howrah",
    "constituency": "Uluberia",
    "mpName": "Shri Tejasvi Majumdar (Fictional)",
    "mpId": "MP-LS-114",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Godavari Agro-Civic Developers (Fictional)",
    "sanctionedAmount": 11200000,
    "expenditure": 11200000,
    "physicalProgress": 100,
    "financialProgress": 100.0,
    "status": "Completed",
    "riskScore": 16,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2028",
    "name": "Modular Multi-Disciplinary Science Laboratory Block with Safety Hoods, Howrah",
    "state": "West Bengal",
    "district": "Howrah",
    "constituency": "Uluberia",
    "mpName": "Shri Tejasvi Majumdar (Fictional)",
    "mpId": "MP-LS-114",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Mahanadi Paved Roads Ltd (Fictional)",
    "sanctionedAmount": 14300000,
    "expenditure": 7865000,
    "physicalProgress": 50,
    "financialProgress": 55.0,
    "status": "In Progress",
    "riskScore": 69,
    "riskLevel": "HIGH",
    "daysDelayed": 182,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2029",
    "name": "Installation of 1500 LPH Community Fluoride and Arsenic Filtration Plant, Paschim Bardhaman",
    "state": "West Bengal",
    "district": "Paschim Bardhaman",
    "constituency": "Asansol",
    "mpName": "Shri Upendra Nath Das (Fictional)",
    "mpId": "MP-LS-115",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Thar Water Purifiers & Pipes (Fictional)",
    "sanctionedAmount": 8000000,
    "expenditure": 7680000,
    "physicalProgress": 100,
    "financialProgress": 96.0,
    "status": "Completed",
    "riskScore": 11,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2030",
    "name": "Installation of Energy-Saving Smart LED High-Mast Lighting Grid, Paschim Bardhaman",
    "state": "West Bengal",
    "district": "Paschim Bardhaman",
    "constituency": "Asansol",
    "mpName": "Shri Upendra Nath Das (Fictional)",
    "mpId": "MP-LS-115",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Coromandel Educational Equipments (Fictional)",
    "sanctionedAmount": 11700000,
    "expenditure": 11700000,
    "physicalProgress": 100,
    "financialProgress": 100.0,
    "status": "Completed",
    "riskScore": 22,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2031",
    "name": "All-Weather Paver Block Pavement in Dense Habitation Sector, Thiruvananthapuram",
    "state": "Kerala",
    "district": "Thiruvananthapuram",
    "constituency": "Attingal",
    "mpName": "Shri Padmanabhan Nair (Fictional)",
    "mpId": "MP-LS-116",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Vihan Infrastructure & Logistics LLP (Fictional)",
    "sanctionedAmount": 5800000,
    "expenditure": 5336000,
    "physicalProgress": 70,
    "financialProgress": 92.0,
    "status": "In Progress",
    "riskScore": 78,
    "riskLevel": "HIGH",
    "daysDelayed": 90,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2032",
    "name": "Provision of Medical Gas Pipeline Network and Central Oxygen Manifold, Thiruvananthapuram",
    "state": "Kerala",
    "district": "Thiruvananthapuram",
    "constituency": "Attingal",
    "mpName": "Shri Padmanabhan Nair (Fictional)",
    "mpId": "MP-LS-116",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Nilgiri Concrete & Civil Tech (Fictional)",
    "sanctionedAmount": 9200000,
    "expenditure": 8648000,
    "physicalProgress": 74,
    "financialProgress": 94.0,
    "status": "In Progress",
    "riskScore": 94,
    "riskLevel": "HIGH",
    "daysDelayed": 95,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2033",
    "name": "Provision of Modern Dual-Desk Ergonomic Furniture for 12 Classrooms, Ernakulam",
    "state": "Kerala",
    "district": "Ernakulam",
    "constituency": "Ernakulam",
    "mpName": "Smt. Revathi Pillai (Fictional)",
    "mpId": "MP-LS-117",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Narmada Water Resource Works (Fictional)",
    "sanctionedAmount": 10100000,
    "expenditure": 9797000,
    "physicalProgress": 100,
    "financialProgress": 97.0,
    "status": "Completed",
    "riskScore": 25,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2034",
    "name": "Submersible Solar Pumping Installation with Elevated Staging Tank, Ernakulam",
    "state": "Kerala",
    "district": "Ernakulam",
    "constituency": "Ernakulam",
    "mpName": "Smt. Revathi Pillai (Fictional)",
    "mpId": "MP-LS-117",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
    "sanctionedAmount": 4900000,
    "expenditure": 3136000,
    "physicalProgress": 63,
    "financialProgress": 64.0,
    "status": "In Progress",
    "riskScore": 55,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2035",
    "name": "Modernization of Crematorium Ground with Eco-Friendly Gasifier Furnace, Kozhikode",
    "state": "Kerala",
    "district": "Kozhikode",
    "constituency": "Vadakara",
    "mpName": "Shri Bimaleshwar Jha (Fictional)",
    "mpId": "MP-LS-118",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Utkal Rural Development Projects (Fictional)",
    "sanctionedAmount": 5500000,
    "expenditure": 5445000,
    "physicalProgress": 100,
    "financialProgress": 99.0,
    "status": "Completed",
    "riskScore": 15,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2036",
    "name": "Upgradation and Bituminous Surfacing of Main Rural Feeder Road, Kozhikode",
    "state": "Kerala",
    "district": "Kozhikode",
    "constituency": "Vadakara",
    "mpName": "Shri Bimaleshwar Jha (Fictional)",
    "mpId": "MP-LS-118",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Malwa GeoStructures Pvt Ltd (Fictional)",
    "sanctionedAmount": 14200000,
    "expenditure": 12354000,
    "physicalProgress": 67,
    "financialProgress": 87.0,
    "status": "Delayed",
    "riskScore": 67,
    "riskLevel": "HIGH",
    "daysDelayed": 169,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2037",
    "name": "Setting up of 6-Bed Neonatal Intensive Stabilization Centre at CHC, Jaipur",
    "state": "Rajasthan",
    "district": "Jaipur",
    "constituency": "Jaipur",
    "mpName": "Shri Trilok Chand Lodha (Fictional)",
    "mpId": "MP-LS-119",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Vindhya Power & Pumping Solutions (Fictional)",
    "sanctionedAmount": 10500000,
    "expenditure": 5250000,
    "physicalProgress": 50,
    "financialProgress": 50.0,
    "status": "Delayed",
    "riskScore": 44,
    "riskLevel": "MEDIUM",
    "daysDelayed": 45,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2038",
    "name": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Jaipur",
    "state": "Rajasthan",
    "district": "Jaipur",
    "constituency": "Jaipur",
    "mpName": "Shri Trilok Chand Lodha (Fictional)",
    "mpId": "MP-LS-119",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Satpura Civil Constructors (Fictional)",
    "sanctionedAmount": 13300000,
    "expenditure": 10374000,
    "physicalProgress": 56,
    "financialProgress": 78.0,
    "status": "Delayed",
    "riskScore": 89,
    "riskLevel": "HIGH",
    "daysDelayed": 183,
    "costOverrun": true,
    "duplicateRisk": true,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2039",
    "name": "Multi-Village Piped Drinking Water Supply Grid with Automated Flow Meters, Jodhpur",
    "state": "Rajasthan",
    "district": "Jodhpur",
    "constituency": "Jodhpur",
    "mpName": "Shri Jagdish Prasad Khatri (Fictional)",
    "mpId": "MP-LS-120",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Aravalli Stone & Macadam Works (Fictional)",
    "sanctionedAmount": 8100000,
    "expenditure": 8019000,
    "physicalProgress": 100,
    "financialProgress": 99.0,
    "status": "Completed",
    "riskScore": 20,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2040",
    "name": "Development of Green Community Recreation Park with Rainwater Harvesting, Jodhpur",
    "state": "Rajasthan",
    "district": "Jodhpur",
    "constituency": "Jodhpur",
    "mpName": "Shri Jagdish Prasad Khatri (Fictional)",
    "mpId": "MP-LS-120",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Kalinga Water Filtration Works (Fictional)",
    "sanctionedAmount": 5300000,
    "expenditure": 4134000,
    "physicalProgress": 60,
    "financialProgress": 78.0,
    "status": "Delayed",
    "riskScore": 90,
    "riskLevel": "HIGH",
    "daysDelayed": 108,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2041",
    "name": "Widening and Shoulder Concrete Paving of Inter-Panchayat Corridor, Udaipur",
    "state": "Rajasthan",
    "district": "Udaipur",
    "constituency": "Udaipur",
    "mpName": "Shri Suresh Chandra Bohra (Fictional)",
    "mpId": "MP-LS-121",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Doon Valley Builders & Fabricators (Fictional)",
    "sanctionedAmount": 10000000,
    "expenditure": 5900000,
    "physicalProgress": 64,
    "financialProgress": 59.0,
    "status": "In Progress",
    "riskScore": 26,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2042",
    "name": "Mobile Diagnostic & Telemedicine Van with Satellite Uplink, Udaipur",
    "state": "Rajasthan",
    "district": "Udaipur",
    "constituency": "Udaipur",
    "mpName": "Shri Suresh Chandra Bohra (Fictional)",
    "mpId": "MP-LS-121",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Godavari Agro-Civic Developers (Fictional)",
    "sanctionedAmount": 5400000,
    "expenditure": 5130000,
    "physicalProgress": 100,
    "financialProgress": 95.0,
    "status": "Completed",
    "riskScore": 10,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2043",
    "name": "High-Speed Smart Classroom Connectivity Network & Rooftop Solar Array, Patna",
    "state": "Bihar",
    "district": "Patna",
    "constituency": "Patliputra",
    "mpName": "Shri Someshwar Thakur (Fictional)",
    "mpId": "MP-LS-122",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Gandak Bridges & Culverts (Fictional)",
    "sanctionedAmount": 4400000,
    "expenditure": 3124000,
    "physicalProgress": 72,
    "financialProgress": 71.0,
    "status": "In Progress",
    "riskScore": 41,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2044",
    "name": "Groundwater Recharge Shafts with Silt Traps along Lake Catchment, Patna",
    "state": "Bihar",
    "district": "Patna",
    "constituency": "Patliputra",
    "mpName": "Shri Someshwar Thakur (Fictional)",
    "mpId": "MP-LS-122",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Thar Water Purifiers & Pipes (Fictional)",
    "sanctionedAmount": 11400000,
    "expenditure": 9006000,
    "physicalProgress": 54,
    "financialProgress": 79.0,
    "status": "In Progress",
    "riskScore": 79,
    "riskLevel": "HIGH",
    "daysDelayed": 169,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2045",
    "name": "Erection of Covered Farmers Vegetable Trading Platform and Cold Store Room, Gaya",
    "state": "Bihar",
    "district": "Gaya",
    "constituency": "Gaya",
    "mpName": "Shri Giridharilal Joshi (Fictional)",
    "mpId": "MP-LS-123",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
    "sanctionedAmount": 7700000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 15,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2046",
    "name": "Reinforced Concrete Access Bridge Across Local Drainage Stream, Gaya",
    "state": "Bihar",
    "district": "Gaya",
    "constituency": "Gaya",
    "mpName": "Shri Giridharilal Joshi (Fictional)",
    "mpId": "MP-LS-123",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Vihan Infrastructure & Logistics LLP (Fictional)",
    "sanctionedAmount": 4700000,
    "expenditure": 3290000,
    "physicalProgress": 67,
    "financialProgress": 70.0,
    "status": "In Progress",
    "riskScore": 46,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2047",
    "name": "Emergency Trauma Triage Unit and Solar Inverter Power Backup, Muzaffarpur",
    "state": "Bihar",
    "district": "Muzaffarpur",
    "constituency": "Muzaffarpur",
    "mpName": "Smt. Kalyani Varma (Fictional)",
    "mpId": "MP-LS-124",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Shivalik Highway Concessions (Fictional)",
    "sanctionedAmount": 8400000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 21,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2048",
    "name": "Establishment of Interactive STEM Robotic Lab in Higher Secondary School, Muzaffarpur",
    "state": "Bihar",
    "district": "Muzaffarpur",
    "constituency": "Muzaffarpur",
    "mpName": "Smt. Kalyani Varma (Fictional)",
    "mpId": "MP-LS-124",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Narmada Water Resource Works (Fictional)",
    "sanctionedAmount": 5700000,
    "expenditure": 4275000,
    "physicalProgress": 51,
    "financialProgress": 75.0,
    "status": "In Progress",
    "riskScore": 65,
    "riskLevel": "HIGH",
    "daysDelayed": 212,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2049",
    "name": "High-Yield Deep Borewell and Overhead Storage Reservoir with Solar Pump, Ahmedabad",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "constituency": "Ahmedabad West",
    "mpName": "Shri Mohan Lal Mittal (Fictional)",
    "mpId": "MP-LS-125",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Brahmaputra Engineering Guild (Fictional)",
    "sanctionedAmount": 6600000,
    "expenditure": 3300000,
    "physicalProgress": 52,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 50,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2050",
    "name": "Construction of Covered Reinforced Concrete Stormwater Outfall Drain, Ahmedabad",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "constituency": "Ahmedabad West",
    "mpName": "Shri Mohan Lal Mittal (Fictional)",
    "mpId": "MP-LS-125",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Utkal Rural Development Projects (Fictional)",
    "sanctionedAmount": 8000000,
    "expenditure": 5120000,
    "physicalProgress": 29,
    "financialProgress": 64.0,
    "status": "Delayed",
    "riskScore": 90,
    "riskLevel": "HIGH",
    "daysDelayed": 153,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true
  },
  {
    "id": "PRJ-IND-2051",
    "name": "Construction of Heavy-Duty Box Culvert and Approach Link Road, Surat",
    "state": "Gujarat",
    "district": "Surat",
    "constituency": "Navsari",
    "mpName": "Smt. Geetanjali Trivedi (Fictional)",
    "mpId": "MP-LS-126",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Chola Urban Infrastructure Corp (Fictional)",
    "sanctionedAmount": 8100000,
    "expenditure": 8019000,
    "physicalProgress": 100,
    "financialProgress": 99.0,
    "status": "Completed",
    "riskScore": 35,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2052",
    "name": "Construction of Dedicated Maternal Care Ward with Thermal Insulation, Surat",
    "state": "Gujarat",
    "district": "Surat",
    "constituency": "Navsari",
    "mpName": "Smt. Geetanjali Trivedi (Fictional)",
    "mpId": "MP-LS-126",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Vindhya Power & Pumping Solutions (Fictional)",
    "sanctionedAmount": 15200000,
    "expenditure": 10488000,
    "physicalProgress": 50,
    "financialProgress": 69.0,
    "status": "Delayed",
    "riskScore": 68,
    "riskLevel": "HIGH",
    "daysDelayed": 211,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2053",
    "name": "Modular Multi-Disciplinary Science Laboratory Block with Safety Hoods, Vadodara",
    "state": "Gujarat",
    "district": "Vadodara",
    "constituency": "Vadodara",
    "mpName": "Shri Chandrakant Salunke (Fictional)",
    "mpId": "MP-LS-127",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Konkan Coastal Engineering (Fictional)",
    "sanctionedAmount": 4600000,
    "expenditure": 3588000,
    "physicalProgress": 76,
    "financialProgress": 78.0,
    "status": "In Progress",
    "riskScore": 37,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2054",
    "name": "Percolation Tank and Micro-Check Dam Rejuvenation Network, Vadodara",
    "state": "Gujarat",
    "district": "Vadodara",
    "constituency": "Vadodara",
    "mpName": "Shri Chandrakant Salunke (Fictional)",
    "mpId": "MP-LS-127",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Aravalli Stone & Macadam Works (Fictional)",
    "sanctionedAmount": 7600000,
    "expenditure": 3800000,
    "physicalProgress": 53,
    "financialProgress": 50.0,
    "status": "In Progress",
    "riskScore": 23,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2055",
    "name": "Installation of Energy-Saving Smart LED High-Mast Lighting Grid, Amritsar",
    "state": "Punjab",
    "district": "Amritsar",
    "constituency": "Amritsar",
    "mpName": "Smt. Jaswinder Kaur Grewal (Fictional)",
    "mpId": "MP-LS-128",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Mithilanchal Public Works (Fictional)",
    "sanctionedAmount": 14500000,
    "expenditure": 9280000,
    "physicalProgress": 55,
    "financialProgress": 64.0,
    "status": "Delayed",
    "riskScore": 86,
    "riskLevel": "HIGH",
    "daysDelayed": 144,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2056",
    "name": "Elevated Storm-Proof Feeder Link to Primary Agricultural Cooperative, Amritsar",
    "state": "Punjab",
    "district": "Amritsar",
    "constituency": "Amritsar",
    "mpName": "Smt. Jaswinder Kaur Grewal (Fictional)",
    "mpId": "MP-LS-128",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Doon Valley Builders & Fabricators (Fictional)",
    "sanctionedAmount": 13600000,
    "expenditure": 11560000,
    "physicalProgress": 65,
    "financialProgress": 85.0,
    "status": "Under Scrutiny",
    "riskScore": 80,
    "riskLevel": "HIGH",
    "daysDelayed": 187,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2057",
    "name": "Provision of Medical Gas Pipeline Network and Central Oxygen Manifold, Ludhiana",
    "state": "Punjab",
    "district": "Ludhiana",
    "constituency": "Ludhiana",
    "mpName": "Shri Dharamveer Bajwa (Fictional)",
    "mpId": "MP-LS-129",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Mahanadi Paved Roads Ltd (Fictional)",
    "sanctionedAmount": 5200000,
    "expenditure": 4940000,
    "physicalProgress": 100,
    "financialProgress": 95.0,
    "status": "Completed",
    "riskScore": 14,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2058",
    "name": "Installation of RO Safe Drinking Water Station and Sanitary Incinerator, Ludhiana",
    "state": "Punjab",
    "district": "Ludhiana",
    "constituency": "Ludhiana",
    "mpName": "Shri Dharamveer Bajwa (Fictional)",
    "mpId": "MP-LS-129",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Gandak Bridges & Culverts (Fictional)",
    "sanctionedAmount": 4200000,
    "expenditure": 2226000,
    "physicalProgress": 60,
    "financialProgress": 53.0,
    "status": "Delayed",
    "riskScore": 58,
    "riskLevel": "MEDIUM",
    "daysDelayed": 49,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2059",
    "name": "Submersible Solar Pumping Installation with Elevated Staging Tank, Jalandhar",
    "state": "Punjab",
    "district": "Jalandhar",
    "constituency": "Jalandhar",
    "mpName": "Shri Navneet Chhabra (Fictional)",
    "mpId": "MP-LS-130",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Coromandel Educational Equipments (Fictional)",
    "sanctionedAmount": 8900000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 9,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2060",
    "name": "Solid Waste Material Recovery Facility with Mechanical Trommel Sieve, Jalandhar",
    "state": "Punjab",
    "district": "Jalandhar",
    "constituency": "Jalandhar",
    "mpName": "Shri Navneet Chhabra (Fictional)",
    "mpId": "MP-LS-130",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
    "sanctionedAmount": 15300000,
    "expenditure": 11322000,
    "physicalProgress": 55,
    "financialProgress": 74.0,
    "status": "Delayed",
    "riskScore": 72,
    "riskLevel": "HIGH",
    "daysDelayed": 175,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2061",
    "name": "Upgradation and Bituminous Surfacing of Main Rural Feeder Road, Bhopal",
    "state": "Madhya Pradesh",
    "district": "Bhopal",
    "constituency": "Bhopal",
    "mpName": "Shri Bhupendra Rawat (Fictional)",
    "mpId": "MP-LS-131",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Nilgiri Concrete & Civil Tech (Fictional)",
    "sanctionedAmount": 6000000,
    "expenditure": 4380000,
    "physicalProgress": 60,
    "financialProgress": 73.0,
    "status": "In Progress",
    "riskScore": 66,
    "riskLevel": "HIGH",
    "daysDelayed": 105,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2062",
    "name": "Installation of High-Capacity Automated Clinical Pathology Analyzer, Bhopal",
    "state": "Madhya Pradesh",
    "district": "Bhopal",
    "constituency": "Bhopal",
    "mpName": "Shri Bhupendra Rawat (Fictional)",
    "mpId": "MP-LS-131",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Shivalik Highway Concessions (Fictional)",
    "sanctionedAmount": 10400000,
    "expenditure": 9880000,
    "physicalProgress": 100,
    "financialProgress": 95.0,
    "status": "Completed",
    "riskScore": 15,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2063",
    "name": "Construction of Digital Audio-Visual Library & Composite Reading Hall, Gwalior",
    "state": "Madhya Pradesh",
    "district": "Gwalior",
    "constituency": "Gwalior",
    "mpName": "Shri Tarunendra Saxena (Fictional)",
    "mpId": "MP-LS-132",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
    "sanctionedAmount": 5800000,
    "expenditure": 5568000,
    "physicalProgress": 100,
    "financialProgress": 96.0,
    "status": "Completed",
    "riskScore": 21,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2064",
    "name": "Installation of 1500 LPH Community Fluoride and Arsenic Filtration Plant, Gwalior",
    "state": "Madhya Pradesh",
    "district": "Gwalior",
    "constituency": "Gwalior",
    "mpName": "Shri Tarunendra Saxena (Fictional)",
    "mpId": "MP-LS-132",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Brahmaputra Engineering Guild (Fictional)",
    "sanctionedAmount": 6100000,
    "expenditure": 4026000,
    "physicalProgress": 51,
    "financialProgress": 66.0,
    "status": "Delayed",
    "riskScore": 82,
    "riskLevel": "HIGH",
    "daysDelayed": 112,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2065",
    "name": "Development of Green Community Recreation Park with Rainwater Harvesting, Sambalpur",
    "state": "Odisha",
    "district": "Sambalpur",
    "constituency": "Sambalpur",
    "mpName": "Smt. Shanta Mahapatra (Fictional)",
    "mpId": "MP-LS-133",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Malwa GeoStructures Pvt Ltd (Fictional)",
    "sanctionedAmount": 6500000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 17,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2066",
    "name": "All-Weather Paver Block Pavement in Dense Habitation Sector, Sambalpur",
    "state": "Odisha",
    "district": "Sambalpur",
    "constituency": "Sambalpur",
    "mpName": "Smt. Shanta Mahapatra (Fictional)",
    "mpId": "MP-LS-133",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Chola Urban Infrastructure Corp (Fictional)",
    "sanctionedAmount": 2600000,
    "expenditure": 2548000,
    "physicalProgress": 100,
    "financialProgress": 98.0,
    "status": "Completed",
    "riskScore": 37,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2067",
    "name": "Mobile Diagnostic & Telemedicine Van with Satellite Uplink, Puri",
    "state": "Odisha",
    "district": "Puri",
    "constituency": "Puri",
    "mpName": "Smt. Sarojini Panigrahi (Fictional)",
    "mpId": "MP-LS-134",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Satpura Civil Constructors (Fictional)",
    "sanctionedAmount": 10900000,
    "expenditure": 8502000,
    "physicalProgress": 58,
    "financialProgress": 78.0,
    "status": "Delayed",
    "riskScore": 68,
    "riskLevel": "HIGH",
    "daysDelayed": 182,
    "costOverrun": true,
    "duplicateRisk": true,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2068",
    "name": "Provision of Modern Dual-Desk Ergonomic Furniture for 12 Classrooms, Puri",
    "state": "Odisha",
    "district": "Puri",
    "constituency": "Puri",
    "mpName": "Smt. Sarojini Panigrahi (Fictional)",
    "mpId": "MP-LS-134",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Konkan Coastal Engineering (Fictional)",
    "sanctionedAmount": 8100000,
    "expenditure": 3564000,
    "physicalProgress": 35,
    "financialProgress": 44.0,
    "status": "Delayed",
    "riskScore": 84,
    "riskLevel": "HIGH",
    "daysDelayed": 107,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2069",
    "name": "Groundwater Recharge Shafts with Silt Traps along Lake Catchment, Kamrup Metropolitan",
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "constituency": "Guwahati",
    "mpName": "Smt. Indrani Borgohain (Fictional)",
    "mpId": "MP-LS-135",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Kalinga Water Filtration Works (Fictional)",
    "sanctionedAmount": 10300000,
    "expenditure": 10300000,
    "physicalProgress": 100,
    "financialProgress": 100.0,
    "status": "Completed",
    "riskScore": 34,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2070",
    "name": "Modernization of Crematorium Ground with Eco-Friendly Gasifier Furnace, Kamrup Metropolitan",
    "state": "Assam",
    "district": "Kamrup Metropolitan",
    "constituency": "Guwahati",
    "mpName": "Smt. Indrani Borgohain (Fictional)",
    "mpId": "MP-LS-135",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Mithilanchal Public Works (Fictional)",
    "sanctionedAmount": 12000000,
    "expenditure": 9120000,
    "physicalProgress": 75,
    "financialProgress": 76.0,
    "status": "In Progress",
    "riskScore": 56,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2071",
    "name": "Reinforced Concrete Access Bridge Across Local Drainage Stream, Sonitpur",
    "state": "Assam",
    "district": "Sonitpur",
    "constituency": "Tezpur",
    "mpName": "Smt. Hemlata Sonowal (Fictional)",
    "mpId": "MP-LS-136",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Godavari Agro-Civic Developers (Fictional)",
    "sanctionedAmount": 4200000,
    "expenditure": 4074000,
    "physicalProgress": 100,
    "financialProgress": 97.0,
    "status": "Completed",
    "riskScore": 37,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2072",
    "name": "Setting up of 6-Bed Neonatal Intensive Stabilization Centre at CHC, Sonitpur",
    "state": "Assam",
    "district": "Sonitpur",
    "constituency": "Tezpur",
    "mpName": "Smt. Hemlata Sonowal (Fictional)",
    "mpId": "MP-LS-136",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Mahanadi Paved Roads Ltd (Fictional)",
    "sanctionedAmount": 7900000,
    "expenditure": 5609000,
    "physicalProgress": 24,
    "financialProgress": 71.0,
    "status": "Delayed",
    "riskScore": 69,
    "riskLevel": "HIGH",
    "daysDelayed": 186,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": true
  },
  {
    "id": "PRJ-IND-2073",
    "name": "Establishment of Interactive STEM Robotic Lab in Higher Secondary School, Shimla",
    "state": "Himachal Pradesh",
    "district": "Shimla",
    "constituency": "Shimla",
    "mpName": "Shri Digvijay Khurana (Fictional)",
    "mpId": "MP-LS-137",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Thar Water Purifiers & Pipes (Fictional)",
    "sanctionedAmount": 6100000,
    "expenditure": 3904000,
    "physicalProgress": 56,
    "financialProgress": 64.0,
    "status": "Delayed",
    "riskScore": 46,
    "riskLevel": "MEDIUM",
    "daysDelayed": 36,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2074",
    "name": "Multi-Village Piped Drinking Water Supply Grid with Automated Flow Meters, Shimla",
    "state": "Himachal Pradesh",
    "district": "Shimla",
    "constituency": "Shimla",
    "mpName": "Shri Digvijay Khurana (Fictional)",
    "mpId": "MP-LS-137",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Coromandel Educational Equipments (Fictional)",
    "sanctionedAmount": 3100000,
    "expenditure": 2945000,
    "physicalProgress": 100,
    "financialProgress": 95.0,
    "status": "Completed",
    "riskScore": 23,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2075",
    "name": "Construction of Covered Reinforced Concrete Stormwater Outfall Drain, Ranchi",
    "state": "Jharkhand",
    "district": "Ranchi",
    "constituency": "Ranchi",
    "mpName": "Smt. Urmila Soren (Fictional)",
    "mpId": "MP-LS-138",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Vihan Infrastructure & Logistics LLP (Fictional)",
    "sanctionedAmount": 6000000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 28,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2076",
    "name": "Widening and Shoulder Concrete Paving of Inter-Panchayat Corridor, Ranchi",
    "state": "Jharkhand",
    "district": "Ranchi",
    "constituency": "Ranchi",
    "mpName": "Smt. Urmila Soren (Fictional)",
    "mpId": "MP-LS-138",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Nilgiri Concrete & Civil Tech (Fictional)",
    "sanctionedAmount": 12600000,
    "expenditure": 9828000,
    "physicalProgress": 58,
    "financialProgress": 78.0,
    "status": "Delayed",
    "riskScore": 64,
    "riskLevel": "HIGH",
    "daysDelayed": 130,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2077",
    "name": "Construction of Dedicated Maternal Care Ward with Thermal Insulation, Krishna",
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "constituency": "Vijayawada",
    "mpName": "Shri Somnath Reddy (Fictional)",
    "mpId": "MP-LS-139",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Narmada Water Resource Works (Fictional)",
    "sanctionedAmount": 9500000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 31,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2078",
    "name": "High-Speed Smart Classroom Connectivity Network & Rooftop Solar Array, Krishna",
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "constituency": "Vijayawada",
    "mpName": "Shri Somnath Reddy (Fictional)",
    "mpId": "MP-LS-139",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Kaveri Meditech Diagnostics (Fictional)",
    "sanctionedAmount": 5400000,
    "expenditure": 4968000,
    "physicalProgress": 72,
    "financialProgress": 92.0,
    "status": "In Progress",
    "riskScore": 89,
    "riskLevel": "HIGH",
    "daysDelayed": 47,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2079",
    "name": "Percolation Tank and Micro-Check Dam Rejuvenation Network, Visakhapatnam",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "constituency": "Visakhapatnam",
    "mpName": "Smt. Suhasini Rao (Fictional)",
    "mpId": "MP-LS-140",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Utkal Rural Development Projects (Fictional)",
    "sanctionedAmount": 8200000,
    "expenditure": 5822000,
    "physicalProgress": 75,
    "financialProgress": 71.0,
    "status": "In Progress",
    "riskScore": 57,
    "riskLevel": "MEDIUM",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2080",
    "name": "Erection of Covered Farmers Vegetable Trading Platform and Cold Store Room, Visakhapatnam",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "constituency": "Visakhapatnam",
    "mpName": "Smt. Suhasini Rao (Fictional)",
    "mpId": "MP-LS-140",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Malwa GeoStructures Pvt Ltd (Fictional)",
    "sanctionedAmount": 9100000,
    "expenditure": 4914000,
    "physicalProgress": 58,
    "financialProgress": 54.0,
    "status": "Delayed",
    "riskScore": 89,
    "riskLevel": "HIGH",
    "daysDelayed": 55,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2081",
    "name": "Elevated Storm-Proof Feeder Link to Primary Agricultural Cooperative, Thane",
    "state": "Maharashtra",
    "district": "Thane",
    "constituency": "Maharashtra (Nominee)",
    "mpName": "Smt. Archana Kulkarni (Fictional)",
    "mpId": "MP-RS-141",
    "category": "Road",
    "implementingAgency": "Public Works Department (PWD)",
    "vendorName": "Vindhya Power & Pumping Solutions (Fictional)",
    "sanctionedAmount": 5100000,
    "expenditure": 5100000,
    "physicalProgress": 100,
    "financialProgress": 100.0,
    "status": "Completed",
    "riskScore": 36,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2082",
    "name": "Emergency Trauma Triage Unit and Solar Inverter Power Backup, Thane",
    "state": "Maharashtra",
    "district": "Thane",
    "constituency": "Maharashtra (Nominee)",
    "mpName": "Smt. Archana Kulkarni (Fictional)",
    "mpId": "MP-RS-141",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Satpura Civil Constructors (Fictional)",
    "sanctionedAmount": 8000000,
    "expenditure": 6400000,
    "physicalProgress": 75,
    "financialProgress": 80.0,
    "status": "Delayed",
    "riskScore": 47,
    "riskLevel": "MEDIUM",
    "daysDelayed": 21,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2083",
    "name": "Installation of RO Safe Drinking Water Station and Sanitary Incinerator, Gorakhpur",
    "state": "Uttar Pradesh",
    "district": "Gorakhpur",
    "constituency": "Uttar Pradesh (Nominee)",
    "mpName": "Shri Hemant Kumar Shukla (Fictional)",
    "mpId": "MP-RS-142",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Aravalli Stone & Macadam Works (Fictional)",
    "sanctionedAmount": 5500000,
    "expenditure": 3134999,
    "physicalProgress": 60,
    "financialProgress": 57.0,
    "status": "In Progress",
    "riskScore": 27,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2084",
    "name": "High-Yield Deep Borewell and Overhead Storage Reservoir with Solar Pump, Gorakhpur",
    "state": "Uttar Pradesh",
    "district": "Gorakhpur",
    "constituency": "Uttar Pradesh (Nominee)",
    "mpName": "Shri Hemant Kumar Shukla (Fictional)",
    "mpId": "MP-RS-142",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Kalinga Water Filtration Works (Fictional)",
    "sanctionedAmount": 8700000,
    "expenditure": 8613000,
    "physicalProgress": 75,
    "financialProgress": 99.0,
    "status": "Delayed",
    "riskScore": 88,
    "riskLevel": "HIGH",
    "daysDelayed": 90,
    "costOverrun": true,
    "duplicateRisk": true,
    "paymentProgressMismatch": false
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
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
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
    "paymentProgressMismatch": false
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
    "implementingAgency": "Public Works Department (PWD)",
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
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2087",
    "name": "Installation of High-Capacity Automated Clinical Pathology Analyzer, Darjeeling",
    "state": "West Bengal",
    "district": "Darjeeling",
    "constituency": "West Bengal (Nominee)",
    "mpName": "Shri Debabrata Bose (Fictional)",
    "mpId": "MP-RS-144",
    "category": "Health",
    "implementingAgency": "District Health Mission",
    "vendorName": "Gandak Bridges & Culverts (Fictional)",
    "sanctionedAmount": 6900000,
    "expenditure": 0,
    "physicalProgress": 0,
    "financialProgress": 0.0,
    "status": "Approved - Work Not Started",
    "riskScore": 14,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2088",
    "name": "Modular Multi-Disciplinary Science Laboratory Block with Safety Hoods, Darjeeling",
    "state": "West Bengal",
    "district": "Darjeeling",
    "constituency": "West Bengal (Nominee)",
    "mpName": "Shri Debabrata Bose (Fictional)",
    "mpId": "MP-RS-144",
    "category": "Education",
    "implementingAgency": "Department of Public Instruction",
    "vendorName": "Thar Water Purifiers & Pipes (Fictional)",
    "sanctionedAmount": 12900000,
    "expenditure": 10320000,
    "physicalProgress": 56,
    "financialProgress": 80.0,
    "status": "Delayed",
    "riskScore": 81,
    "riskLevel": "HIGH",
    "daysDelayed": 102,
    "costOverrun": true,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
  },
  {
    "id": "PRJ-IND-2089",
    "name": "Installation of 1500 LPH Community Fluoride and Arsenic Filtration Plant, Bikaner",
    "state": "Rajasthan",
    "district": "Bikaner",
    "constituency": "Rajasthan (Nominee)",
    "mpName": "Smt. Poonamchand Rathore (Fictional)",
    "mpId": "MP-RS-145",
    "category": "Water",
    "implementingAgency": "Rural Water Supply & Sanitation Board",
    "vendorName": "Sahyadri Heavy Earthmovers (Fictional)",
    "sanctionedAmount": 8900000,
    "expenditure": 7031000,
    "physicalProgress": 35,
    "financialProgress": 79.0,
    "status": "Under Scrutiny",
    "riskScore": 83,
    "riskLevel": "HIGH",
    "daysDelayed": 62,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": true
  },
  {
    "id": "PRJ-IND-2090",
    "name": "Installation of Energy-Saving Smart LED High-Mast Lighting Grid, Bikaner",
    "state": "Rajasthan",
    "district": "Bikaner",
    "constituency": "Rajasthan (Nominee)",
    "mpName": "Smt. Poonamchand Rathore (Fictional)",
    "mpId": "MP-RS-145",
    "category": "Civic",
    "implementingAgency": "Municipal Corporation & Urban Development Authority",
    "vendorName": "Vihan Infrastructure & Logistics LLP (Fictional)",
    "sanctionedAmount": 2800000,
    "expenditure": 2660000,
    "physicalProgress": 100,
    "financialProgress": 95.0,
    "status": "Completed",
    "riskScore": 20,
    "riskLevel": "LOW",
    "daysDelayed": 0,
    "costOverrun": false,
    "duplicateRisk": false,
    "paymentProgressMismatch": false
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

let fetchedProjects = null;
let fetchedComplaints = null;

try {
  if (typeof fetch === 'function') {
    const [prRes, cmRes] = await Promise.all([
      fetch('/backend/app/data/mockProjects.json'),
      fetch('/backend/app/data/mockComplaints.json'),
    ]);
    if (prRes.ok) fetchedProjects = await prRes.json();
    if (cmRes.ok) fetchedComplaints = await cmRes.json();
  }
} catch {
  // Non-HTTP environment or offline: fallback gracefully
}

export const allProjects = fetchedProjects || FALLBACK_PROJECTS;
export const allComplaints = fetchedComplaints || FALLBACK_COMPLAINTS;

/**
 * Finds a project record by ID.
 */
export function getProjectById(projectId) {
  if (!projectId) return allProjects[0] || null;
  return allProjects.find((p) => p.id === projectId) || allProjects[0] || null;
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

  const complaints = getComplaintsForProject(p.id);
  const isHighRisk = (p.riskScore != null && p.riskScore >= 60) || p.riskLevel === 'HIGH';
  const badgeClass = isHighRisk ? 'setu-badge-risk-high' : 'setu-badge-risk-neutral';
  const riskLevel = p.riskLevel || (p.riskScore >= 60 ? 'HIGH' : p.riskScore >= 40 ? 'MED' : 'LOW');

  // Count compliance flags
  const complianceCount = (p.costOverrun ? 1 : 0) + 
                          (p.duplicateRisk ? 1 : 0) + 
                          (p.paymentProgressMismatch ? 1 : 0) + 
                          (p.daysDelayed > 45 ? 1 : 0);

  // Tab buttons
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'financials', label: 'Financials' },
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

  return `
    <div class="setu-detail-container">
      <!-- Breadcrumbs & Back Link -->
      <div class="setu-detail-top-bar">
        <a href="#/dashboard" class="setu-back-to-dashboard" id="btn-back-dashboard">
          ← Return to Projects Audit Dashboard
        </a>
        <div style="font-size: var(--setu-font-size-caption); color: var(--setu-color-text-muted);">
          MPLADS Institutional Project Record
        </div>
      </div>

      <!-- Project Header Card -->
      <div class="setu-detail-header-card">
        <div class="setu-detail-meta-row">
          <span class="setu-detail-id-tag">${p.id}</span>
          <span class="setu-status-tag">${p.status}</span>
          <span class="setu-badge ${badgeClass}">Risk ${p.riskScore} (${riskLevel})</span>
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
          ${tabContentHtml}
        </div>
      </div>
    </div>
  `;
}
