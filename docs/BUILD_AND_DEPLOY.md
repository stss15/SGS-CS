# Build and Deploy

## Prerequisites

- Node 20+
- Firebase CLI authenticated for project `sgs-science`

## Build

```bash
npm ci
npm run framework:build
```

`framework:build` runs:

1. `npm run build:legacy`
- Generates `public/` from `src/`.
- Also compiles LaTeX printables from `src/printables` into `public/` (PDF downloads).
  - To skip PDF compilation: `SKIP_LATEX_PDFS=1 npm run framework:build`

2. Astro static build in `apps/site`.

3. Post-build route aliasing + non-HTML asset sync.

4. Dist hardening.

Final deployable output:
- `apps/site/dist`

Generated intermediates (`public/`, `apps/site/dist/`, `meta/site-manifest.json`) are build artifacts, not active source-of-truth files.

## Deploy

```bash
npm run deploy
```

## Local Preview

```bash
npm run framework:dev
```

This command first regenerates `public/` so legacy-backed route adapters have source content.
