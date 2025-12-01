# Build & Deploy Log

Use this file to record every full-site build and deploy. Append a new entry each time you run the build and push to main.

## How to build and deploy
- Run `npm run build` from repo root (generates `public/` + `meta/site-manifest.json`).
- Review `git status` for unexpected changes.
- Commit with a clear message, then `git push origin main`.
- Verify GitHub Pages deploy completes in Actions.
- Add a log entry below.

## Log entries (newest first)
- 2025-11-29: Complete pedagogical rebrand of all IGCSE slide decks. Consolidated documentation. Updated templates.
- 2025-11-29: Built site (`npm run build`), committed topic 1/6 resource sync and pushed to `main` (commit `941e132`). Triggered GitHub Pages deploy.
