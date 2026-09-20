# SETU Role-Based Access Control (RBAC) Specification (`ROLES.md`)

This document defines the statutory roles, access scopes, endpoint permissions, and sidebar visibility for the SETU PM-GatiShakti & MPLADS Monitoring & Audit Platform.

---

## 1. Statutory Role Definitions

| Role Identifier | Role Name | Administrative Level | Default Jurisdiction Scope | Data Filter Key |
| :--- | :--- | :--- | :--- | :--- |
| `mospi_officer` | Central Nodal Agency (MoSPI) | National Oversight | All India | None (Full Access) |
| `auditor_cag` | Auditor / CAG | Statutory Audit | All India | None (Full Access) |
| `state_nodal` | State Nodal Authority | State Level | Assigned State (e.g. Tamil Nadu) | `state` |
| `district_authority` | District Authority | District Level | Assigned District (e.g. Lucknow, Pune) | `district` |
| `implementing_agency` | Implementing Agency | Execution Agency | Assigned Category/Agency (e.g. PWD, Municipal) | `implementingAgency` / `category` |
| `mp_office` | MP Office | Constituency Level | Assigned Constituency (e.g. Baramati) | `constituency` |

---

## 2. Access Scopes & Data Filtering Rules

1. **Central Nodal Agency (MoSPI) & Auditor / CAG**:
   - Access Scope: `national_all` / `statutory_audit_all`
   - Data Filter: Unrestricted national visibility across all states, districts, and agencies.
2. **State Nodal Authority**:
   - Access Scope: `state_rollup`
   - Data Filter: Strict state boundary. Requests return data matching user's `state` claim in JWT.
3. **District Authority**:
   - Access Scope: `district_all`
   - Data Filter: Strict district boundary. Requests return data matching user's `district` claim in JWT.
4. **Implementing Agency**:
   - Access Scope: `agency_assigned_only`
   - Data Filter: Restricts to projects assigned to that agency (matched by `implementingAgency` or agency category).
5. **MP Office**:
   - Access Scope: `constituency_only`
   - Data Filter: Restricts strictly to works recommended under the Member of Parliament's `constituency`.

---

## 3. Sidebar Navigation & Module Visibility Matrix

| Sidebar Nav Item | Route ID | MoSPI / CNA | Auditor / CAG | State Nodal | District Authority | Implementing Agency | MP Office |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Projects Audit** | `projects` | Visible | Visible | Visible | Visible | Visible | Visible |
| **Risk Assessment & SHAP** | `risk` | Visible | Visible | Visible | Visible | Hidden | Hidden |
| **Compliance Flags** | `compliance` | Visible | Visible | Visible | Visible | Visible | Hidden |
| **Duplicate Tracker** | `duplicates` | Visible | Visible | Visible | Hidden | Hidden | Hidden |
| **Citizen Contradictions**| `citizen-reports` | Visible | Visible | Visible | Visible | Hidden | Visible |
| **Audit Trail** | `audit-trail` | Visible | Visible | Visible | Visible | Visible | Hidden |
| **System Alerts** | `alerts` | Visible | Visible | Visible | Visible | Hidden | Visible |

---

## 4. Protected API Endpoints & RBAC Enforcement

All protected endpoints require an `Authorization: Bearer <token>` header containing a verified JWT.

- `POST /auth/login`: Public endpoint for authenticating credentials against bcrypt password hashes.
- `GET /auth/me`: Returns the verified user's profile, role, jurisdiction, and access scope.
- `GET /projects`: Filters list of projects by caller's role scope (`district`, `state`, `constituency`, `implementingAgency`).
- `GET /projects/{id}`: Validates that the requested project falls within the user's jurisdiction; returns 403 Forbidden if accessing an unauthorized jurisdiction.
- `GET /projects/{id}/risk`: Gated to roles with Risk permissions. Scoped by jurisdiction.
- `GET /projects/{id}/compliance`: Gated to roles with Compliance permissions. Scoped by jurisdiction.
- `GET /projects/{id}/duplicates`: Gated to State Nodal, MoSPI, and Auditor. Scoped by jurisdiction.
- `GET /alerts`: Automatically scoped by user's JWT role and region claims.
- `GET /trend`: Scoped by user's state/district.
