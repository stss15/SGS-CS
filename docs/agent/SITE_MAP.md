# Site Map and URL Conventions

This document describes the public URL layout and how it maps to source templates.

## Top-Level Routes

- `/` -> `public/index.html` (from `src/pages/index.njk`)
- `/ks3/` -> KS3 Computer Science
- `/igcse/` -> IGCSE Computer Science
- `/ib/` -> Legacy IB topic pages
- `/ib-2027/` -> IB 2027 curriculum (HL + SL)

## IB 2027 (HL/SL)

- HL: `/ib-2027/hl/index.html`
- SL: `/ib-2027/sl/index.html`
- Unit structure: `/ib-2027/{hl|sl}/unit-N/index.html`

Redirects exist for legacy short routes:
- `/hl/...` -> `/ib-2027/hl/...`
- `/sl/...` -> `/ib-2027/sl/...`

## KS3

- Index: `/ks3/index.html`
- Year 7 units live under `/ks3/year7/`
- Year 8/9 units are planned; some routes may redirect to `/coming-soon.html`.

## IGCSE

- Index: `/igcse/index.html`
- Topics live under `/igcse/topicN/`
- Many topic resources are standalone HTML sourced under `src/static/igcse/` and copied to `public/igcse/`.

## Source-to-Output Mapping

Generated pages:
- Source in `src/pages/`
- Output in `public/`
- Listed in `meta/site-manifest.json`

Standalone pages:
- Live under `src/static/` and are copied into `public/`
- Not listed in the manifest
- Tracked via `meta/static_html_report.md`

## URL Rules

- Prefer absolute links beginning with `/` in templates.
- Use Nunjucks `basePath` for assets when nesting depth varies.
- Avoid relative paths in content cards unless scoped to the same directory.
- When moving content, add Firebase redirects in `firebase.json`.
