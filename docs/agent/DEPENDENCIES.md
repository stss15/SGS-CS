# Dependencies

## Runtime / Build Tools

- Node.js (CI uses Node 20).
- npm (lockfile in `package-lock.json`).
- Python 3 (utility scripts under `scripts/`).
- Firebase CLI (deploys and preview channels).

## Key Libraries

- Nunjucks (template engine).
- fast-glob, gray-matter, fs-extra (build pipeline).
- Reveal.js (slide decks in `public/` and templates).

## Environment

- Build output: `public/`
- Templates: `src/templates/`
- Pages: `src/pages/`
- Manifest: `meta/site-manifest.json`
