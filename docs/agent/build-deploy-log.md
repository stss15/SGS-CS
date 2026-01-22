# Build and Deploy Log

Append a new entry for each build or deploy.

Format:
- Date:
- Branch:
- Build command:
- Deploy command:
- Notes:

---

- Date: 2026-01-22
- Branch: main
- Build command: npm run build (pre-merge on refactor/scale-audit)
- Deploy command: firebase deploy --only hosting
- Notes: Deployed merged refactor/scale-audit changes to https://sgs-science.web.app.
- Date: 2026-01-22
- Branch: main
- Build command: none
- Deploy command: firebase deploy --only hosting
- Notes: Deployed Firebase redirect/rewrites fix for legacy `/hl`/`/sl` and course entrypoints.
- Date:
- Branch:
- Build command:
- Deploy command:
- Notes:
