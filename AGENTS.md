# Agent conventions for this project

- Build ONE task at a time. Do not add features not explicitly requested in the current prompt.
- After completing a task, append a one-line entry to PROGRESS.md: `[timestamp] - [task] - [status: done/blocked/needs-review]`
- Do not touch files outside the scope of the current task.
- Match the API contract in API_CONTRACT.md exactly — do not invent field names.
- Match role permissions in ROLES.md exactly — do not grant a role access beyond what's listed there.
- Mocked features (Invoice/GST OCR, Physical Evidence CV verification) must show a visible "Simulated" badge in the UI — never present mocked output as real.
- Follow the design tokens in /frontend/src/theme once created — do not introduce new colors/fonts ad hoc.
- Commit only after a task is verified working by the user — do not self-commit.
- No feature creep past what is explicitly scoped in the current prompt.