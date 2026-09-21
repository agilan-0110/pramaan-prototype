---
name: roles
description: Final role/workflow spec for SETU — 7 logins (MP Office, District Authority, State Nodal, Central Nodal Agency/MoSPI, Implementing Agency, Auditor/CAG, Citizen), severity-tiered visibility, single-owner escalation chain, resolution actions per flag type
---

# SETU — Final Roles & Workflow Specification

## Core Principles
- **Single ownership**: only one role owns an active flag at a time. Every other permitted viewer sees a read-only status line, never a duplicate action control.
- **Severity-tiered visibility**: fixed by role and severity (see matrix below), not ad hoc.
- **Escalation transfers ownership, never duplicates it.**
- **Nothing closes silently**: every resolution, escalation, or override is logged and stays visible to Auditor/CAG regardless of project status.
- **Implementing Agency is deliberately blind to oversight** — they execute and report; they never see the monitoring layer watching them.
- **Vendor/Contractor is a data field only, never a login.** `vendorName` is attached to every project record — used by Compliance's fund-splitting rule (grouped by vendor across projects), Duplicate Detection's vendor-match weighting, and the Agency evidence-upload tag ("Received from Vendor: [name]"). No dashboard, no credentials, no system access.

---

## The Full Lifecycle
1. **MP Office** submits a proposal (description, cost, category, location) → **District Authority** approves/rejects (rejection requires a recorded reason, visible to MP Office).
2. Approved work routes automatically to the category-matched **Implementing Agency** (Road→PWD, Health→Health Dept, Education→Education Dept, Water→Water Board, Civic→Municipal Corporation/Panchayat).
3. Agency executes, submits progress + milestone evidence (photo, tagged "Received from Vendor: [vendorName]").
4. **District Authority reviews each evidence submission**: Accept / Reject-Resubmission-Required — evidence never sits in "Pending" indefinitely.
5. **Fund release is milestone-gated**: District's "Release Next Tranche" action only unlocks once current milestone evidence is Accepted — never an automatic lump sum.
6. Backend engines run continuously: Financial Risk (Isolation Forest + SHAP or honestly-labeled fallback), Compliance Rules (ceiling breach, deadline breach, category mismatch, fund-splitting, agency-category mismatch), Duplicate Work Detection (fuzzy + geo + cross-year + vendor-match), Trend Analysis (+ seasonal fund-dumping + chronic non-utilization), Citizen NLP contradiction scoring.
7. Any engine independently generates a flag — tagged type, severity (LOW/MEDIUM/HIGH/CRITICAL), location.
8. Flag visibility routes by the Severity Matrix.
9. **District Authority owns resolution by default** for same-district flags.
10. Ownership escalates upward only on defined triggers — never duplicates across tiers.
11. **Auditor/CAG** operates independently at all times; a HIGH/CRITICAL observation can reopen any Resolved flag.
12. On completion, open flags do **not** auto-close — an unresolved issue on a "completed" project is a stronger audit finding, not a weaker one.
13. **Utilization Certificate** and **Asset Transfer to User Agency** are tracked as distinct statuses beyond "Completed" — a project isn't fully closed until both resolve.
14. Multiple citizen reports on the same project are grouped into one project-level view, never treated as separate duplicate-triggering flags.

---

## Roles

### MP Office
**Scope:** `CONSTITUENCY_MP` — own constituency only. `NOMINATED_MP` — own chosen districts, which may span multiple states (per real MPLADS rules for Rajya Sabha members with no fixed constituency).
**Sees:** own projects (scoped per `mpType`), risk score (read-only, plain-language explanation only), passive "flag present" badge with zero detail, rejection reasons.
**Can do:** submit new proposal (Nominated MPs may select any district nationally as location), track status.
**Cannot:** see alert detail, edit anything, upload evidence, act on any flag, view other constituencies.

### District Authority — operational center of the workflow
**Scope:** own district.
**Sees:** all projects in district, full detail on every flag type/severity while they own it, evidence review queue, milestone/tranche gate status.
**Can do:**
- Approve/reject proposals (with recorded reason)
- Add milestones, record progress
- Own and resolve flags by default: Open → Inspection Ordered → Resolved (Confirmed / False Positive)
- Accept/Reject evidence uploads
- Release gated fund tranches once evidence is Accepted
- Group multiple citizen reports on one project into a single review
- Mark completed projects' Asset Transfer status (Pending Transfer → Transferred)
**Cannot:** upload evidence themselves, view state rollups, take statutory audit action.

### State Nodal Authority
**Scope:** own state, aggregated across districts.
**Sees:** state-wide rollup, per-district breakdown, HIGH severity as aggregate summary, CRITICAL in full detail, cross-district Duplicate matches, CHRONIC_NON_UTILIZATION signal for their state.
**Can do:**
- Own flags escalated to them: confirmed-CRITICAL, inaction-timeout, cross-district Duplicates (adjudicate which project is legitimate)
- Freeze next tranche release as an administrative consequence
- Issue formal query to a non-responsive District Authority
- Flag a district for review, including inaction-timeout patterns
- Forward consolidated reports to MoSPI
**Cannot:** edit milestones/evidence directly, act as an execution role.

### Central Nodal Agency (MoSPI)
**Scope:** national.
**Sees:** everything, always, full detail regardless of severity, full Citizen NLP raw data, national Predictive Insights, CHRONIC_NON_UTILIZATION nationally.
**Can do:**
- Own flags escalated from State Nodal
- Own cross-state Duplicate Work matches directly (skips State Nodal — only MoSPI has cross-state visibility)
- Issue binding directives: task Auditor/CAG for a formal audit, direct a State Nodal Department's corrective action, initiate state-level performance review for systemic patterns
**Cannot:** execute, approve, or personally re-verify site-level facts — actions are institutional/directive, not operational.

### Implementing Agency
**Scope:** own jurisdiction (district + category auto-matched).
**Sees:** only their assigned projects, `vendorName` field on each.
**Can do:** submit progress, upload evidence (auto-tagged "Received from Vendor: [vendorName]"), submit Utilization Certificate (NOT_SUBMITTED / SUBMITTED / OVERDUE — auto-flags overdue past 30 days of project completion).
**Cannot:** see any risk score, compliance flag, citizen data, or alert of any kind — zero oversight visibility, by design.

### Auditor / CAG — independent, cross-cutting, never a live chain participant
**Scope:** everything, always, regardless of severity/ownership/project status.
**Sees:** full audit trail per project, complete status-change history (owner, duration, outcome), inaction-timeouts as a standalone finding, unresolved flags on completed projects.
**Can do:** attach severity-tagged formal audit observations to any project, any time. A HIGH/CRITICAL observation **reopens** a previously Resolved flag — the check on the administrative chain.
**Cannot:** approve, execute, or act as a participant in live resolution — review and override only.

### Citizen (no login)
**Scope:** public.
**Sees:** public-safe status, own submission confirmation only — never the resulting contradiction score.
**Can do:** submit a complaint (grouped per-project on the backend, never duplicated).
**Cannot:** access anything internal.

---

## Severity → Visibility Matrix

| Severity | District | State Nodal | MoSPI | Auditor/CAG | MP Office | Agency |
|---|---|---|---|---|---|---|
| LOW/MED | Full | — | — | Full | Passive badge | None |
| HIGH | Full | Aggregate | — | Full | Passive badge | None |
| CRITICAL | Full | Full | Full | Full | Passive badge | None |

CHRONIC_NON_UTILIZATION is the one exception: it skips District Authority entirely (not a site-verifiable issue) and surfaces directly as an aggregate/full-detail signal to State Nodal and MoSPI per the same split.

---

## Resolution Actions by Flag Type
- **Financial Risk:** District orders inspection → Confirmed (freeze tranche) or False Positive.
- **Compliance Violation:** District corrects record or requires Agency's revised sanction; ceiling breaches needing higher sign-off escalate to State Nodal.
- **Duplicate Work:** same-district → District orders GPS survey; cross-district → State Nodal adjudicates; cross-state → MoSPI adjudicates directly.
- **Citizen Contradiction:** District dispatches Technical Inspector for site + geotag verification → Confirmed (triggers Financial Risk re-check + possible Compliance action against Agency) or Not Substantiated.

---

## Escalation Triggers
- **Confirmed CRITICAL** → auto-escalates ownership upward.
- **Inaction timeout** (no status change within a defined window) → auto-escalates upward, tagged distinctly from Confirmed-Critical, and stands as its own audit finding.
- **Cross-jurisdiction scope:** duplicate spans two districts → State Nodal; spans two states → MoSPI directly, skipping State Nodal.

---

## Audit Override Mechanism
Auditor/CAG's HIGH/CRITICAL observation reopens a Resolved flag — the answer to "who checks the checkers," and what makes independent access a real mechanism rather than cosmetic text.

---

## Additions Beyond "Completed" Status
- **Utilization Certificate:** own status (Submitted / Overdue past 30 days) — distinct from generic Compliance deadline breach.
- **Asset Transfer to User Agency:** status field (Not Applicable / Pending Transfer / Transferred) on completed projects — lightweight flag, not a full workflow.

---

## Built This Cycle (beyond original scope, added later)
- Nominated MP handling (`mpType`, multi-state district selection)
- Non-lapsable/carried-forward multi-year fund balance tracking → CHRONIC_NON_UTILIZATION alert

## Explicit Roadmap (state plainly if asked — not built)
- Vendor Network Analysis (cross-project vendor pattern detection across multiple fund-splitting flags)
- Interest-on-unspent-funds compliance rule
- SC/ST mandatory allocation compliance check (15%/7.5% statutory requirement)
- Cross-constituency/outside-state MP contribution tracking (₹25 lakh exception)
- Third-party physical monitoring agency integration (e.g. NABCONS-style channel)
- Real-time push notifications (visibility is on-dashboard-login only)

---

## Interconnection Summary
- **MP Office** originates and passively observes — informed, never empowered to act on oversight.
- **District Authority** is the load-bearing role — approves, monitors, resolves, gates funds, reviews evidence.
- **Implementing Agency** executes and reports, walled off entirely from the oversight layer watching them.
- **State Nodal** aggregates, adjudicates cross-district disputes, enforces administrative consequences on confirmed/escalated issues.
- **MoSPI** issues institutional directives and manages systemic/cross-state problems — acts on what's escalated, not every individual case.
- **Auditor/CAG** runs orthogonally to the entire hierarchy — independent, always-on, with override power.
- **Citizen** feeds ground-truth from outside the hierarchy entirely, closing the loop between official claims and physical reality.