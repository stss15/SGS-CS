# AI Navigation Cheatsheet

This repo is split into **source** (`src/`) and **output** (`public/`). Build templates with `npm run build`; the script writes HTML into `public/` and a manifest to `meta/site-manifest.json`.

## Directory map
- `src/pages/` — Nunjucks sources. Output path mirrors this tree under `public/`.
- `src/templates/` — layouts (`base`, `listing`, `arcade`, `slide-deck`, `ks3-slide`) and macros (components + KS3 lesson blocks).
- `public/` — compiled site + legacy static games/sims.
  - `public/css` — shared stylesheets.
  - `public/js` — shared scripts.
  - `public/images` — logos/thumbnails.
- `scripts/build.js` — build pipeline (renders templates, computes `basePath`, writes manifest).
- `docs/agent/` — authoring guides and slide/lesson templates for AI agents.

## Naming conventions
- Use **kebab-case** for new files/directories; keep syllabus numbering prefixes (e.g., `topic4/4.1-types-of-software.html`).
- Place shared assets only in `public/css`, `public/js`, and `public/images`; avoid page-specific inline CSS/JS unless scoped via `headContent`/`inlineScripts`.
- Generated HTML belongs in `public/`; never mix source and output in `src/`.

## Editing rules
- Prefer updating `.njk` sources; avoid editing compiled HTML directly.
- Keep layout imports minimal: `css/style.css` for base pages, add `extraStyles` only when needed. Slide decks should rely on `css/slide-deck.css` + `css/igcse-deck.css`/`css/ks3-deck.css`.
- Password-protected links need `data-protected-password` plus `public/js/site.js`.
- Standalone sims/games stay raw HTML; do not auto-template them.

## Build & verify
- `npm run build` → renders templates into `public/` and refreshes `meta/site-manifest.json`.
- Serve `public/` locally (e.g., `npx serve public`) to spot missing assets or path issues.
- Check the manifest for quick navigation of templated pages and their layouts.
