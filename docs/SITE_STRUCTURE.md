# Site Structure

## Active Source Directories

- `apps/site/src`: Astro pages/layout/components that define the framework shell and route entry points.
- `packages/content-schema/src`: Adapters that expose legacy source/content to Astro routes.
- `src/pages`: Legacy templates/content still used by build.
- `src/static`: Static assets copied into the legacy output (`public/`) and then synced into framework dist when needed.
- `src/data`: Listing/topic data consumed during rendering.
- `src/printables`: LaTeX sources for printable PDFs generated into `public/` during build.

## IGCSE Index Source

- Sectioned topic indexes live in `src/pages/igcse/topic*/index.njk` and render via `src/templates/layouts/arcade.njk`.
- Shared styling for the new IGCSE index layout lives in `src/static/css/igcse-index.css` (with `resource-style.css` + `unit.css`).
- Topic textbook placeholders live in `src/pages/igcse/topic*/textbook.njk` and use `src/templates/layouts/reader.njk`.

## Generated Output

- `public/`: Generated legacy output used as framework input (treat as build artifact; do not hand-edit).
- `apps/site/dist`: Final static site output deployed to Firebase.
- `meta/site-manifest.json`: Generated during legacy build (not kept as active source file).

## Build Scripts Kept Active

- `scripts/build.js`
- `scripts/build-pdfs.js`
- `scripts/migration/alias-framework-html-routes.js`
- `scripts/migration/harden-framework-dist.js`

All other legacy scripts were archived.
