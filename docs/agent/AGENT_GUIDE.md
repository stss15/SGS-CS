# SGS Computer Science - Agent Guide (Canonical)

This is the single source of truth for AI agents working on the SGS Computer Science site.
If any other doc conflicts with this guide, update this guide and then align the others.

## Quick Start

- Source templates live under `src/pages/`.
- Static assets and standalone HTML sources live under `src/static/` and are copied to `public/` during build.
- Generated HTML lives under `public/`.
- `npm run build` clears `public/`, copies `src/static/`, renders Nunjucks templates, and updates `meta/site-manifest.json`.
- Shared content data lives under `src/data/` (listings in `site.json`, arcade topics in `topics.json`).
- Standalone HTML files do not have templates; edit them under `src/static/` and rebuild.

## Where To Look First

- Site map and URL conventions: `docs/agent/SITE_MAP.md`
- Build and deploy workflow: `docs/agent/BUILD_DEPLOY.md`
- Templating and layouts: `docs/agent/TEMPLATING.md`
- Dependencies: `docs/agent/DEPENDENCIES.md`
- Agent change log: `docs/agent/CHANGELOG.md`
- Assessments architecture: `docs/agent/ASSESSMENTS.md`

## Generated vs Standalone

Generated files:
- Have a source under `src/pages/`.
- Are listed in `meta/site-manifest.json`.
- Include a marker comment in `public/` output.

Standalone files:
- Live under `src/static/` (alongside static assets) and are copied to `public/`.
- Are not listed in `meta/site-manifest.json`.
- Common for games, sims, or legacy tools.
- Reviewed via `meta/static_html_report.md` (not exhaustive).

Do not edit generated `public/` files directly. Edit the source in `src/pages/` and rebuild.
Do not edit standalone `public/` files directly. Edit the source in `src/static/` and rebuild.

## Build / Preview

- `npm run build`
- `npx serve public` to preview locally

See `docs/agent/BUILD_DEPLOY.md` for Firebase preview channels and deployment details.

## Rules Of Engagement

- Work in a dedicated branch or worktree for large refactors.
- Update `docs/agent/CHANGELOG.md` for every material change.
- Avoid breaking existing URLs; add redirects when moving or renaming pages.
- Prefer shared templates/macros over per-page duplication.

## Pointers To Curriculum Guides

- KS3: `docs/KS3_GUIDE.md`
- IGCSE: `docs/IGCSE_GUIDE.md`
- IB: `docs/IB_GUIDE.md`
- Slide engagement: `docs/REVEAL_TECHNIQUES.md`
- Writing style: `docs/curriculum content guides/agent_content.md`
