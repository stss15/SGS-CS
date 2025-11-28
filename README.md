## Overview

Source lives under `src/` and the compiled site lives in `public/`. Run `npm run build` to render the Nunjucks templates into `public/` (standalone games/simulations are left as-is). The build script also writes a machine-readable page manifest to `meta/site-manifest.json`.

## Project structure

- `scripts/build.js`: Nunjucks build pipeline that outputs to `public/`.
- `src/templates/layouts`: shared layouts (`base`, `listing`, `arcade`, `slide-deck`, `ks3-slide`) plus `components.njk` macros.
- `src/pages`: templated pages (subject/topic landing pages, specifications, teacher toolkits, unit pages, slide decks).
- `public/`: compiled site root and legacy static content.
  - `public/css`: global theme + variants (`style.css`, `resource-style.css`, `specification.css`, `unit.css`, `toolkit.css`, `slide-deck.css`, `ks3-deck.css`, `igcse-deck.css`).
  - `public/js`: shared behaviours (`slide-deck.js`, `site.js`, `toolkit.js`).
  - `public/images`: logo and thumbnails.
- `docs/agent`: AI-facing guides and slide/lesson templates.
- `meta/site-manifest.json`: generated index of templated pages (paths, titles, layouts).

## Usage

```bash
npm install
npm run build   # regenerates templated HTML into public/ and refreshes the manifest
```

Serve `public/` locally (e.g. `npx serve public`) to preview the site.

### Adding/editing pages

- Create/edit a `.njk` under `src/pages/...` mirroring the desired output path under `public/`.
- Front matter drives rendering:
  - `layout`: `layouts/base.njk` (default), `layouts/listing.njk`, `layouts/arcade.njk`, or `layouts/slide-deck.njk`.
  - `hero`, `backLink`, `extraStyles`, `scripts` for base/arcade/listing pages.
  - `cards`/`resources` arrays for arcade pages (images are prefixed with the computed `basePath` automatically).
  - Slide decks: set `backHref`, `courseFooter`, optional `headContent` (inline deck-specific CSS), and `deckScripts` for deck-specific JS. Only include `<section>` slides in the template; Reveal init/date are handled centrally.
- Run `npm run build` to regenerate pages.

## Notes

- `scripts/build.js` auto-computes `basePath`, so asset links stay correct regardless of nesting.
- Password-protected resources use `data-protected-password` + `public/js/site.js` (see `public/igcse/topic4/assessments.html`).
- Standalone games/sims remain raw HTML under `public/` (e.g. `public/igcse/topic1/binary_game.html`).
- `.gitignore` excludes `node_modules/`; install dependencies before building on a new machine.
