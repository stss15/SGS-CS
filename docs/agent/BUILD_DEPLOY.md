# Build and Deploy

This document is the canonical build and deploy workflow for the site.

## Local Build

```bash
npm ci
npm run build
```

This renders Nunjucks templates in `src/pages/` into `public/` and updates `meta/site-manifest.json`.
The build clears `public/` before copying `src/static/` and rendering templates, so treat `public/` as disposable output.

## Local Preview

```bash
npx serve public
```

## Link Check (Local)

Run the link audit script before deploy:

```bash
python3 scripts/link_audit.py
```

This writes a report to `meta/link_audit_report.md` and prints a summary to stdout.

## Static HTML Audit (Local)

```bash
python3 scripts/static_html_audit.py
```

This writes a report to `meta/static_html_report.md` showing which HTML files are outside the build pipeline.

## Firebase Preview (Recommended)

```bash
npm run build
firebase hosting:channel:deploy preview
```

## Production Deploy

```bash
npm run build
firebase deploy --only hosting
```

## CI

GitHub Actions runs the build and deploys on push to `main`.
See `.github/workflows/firebase-hosting.yml`.

## Notes

- Static assets and standalone HTML are sourced from `src/static/` and copied into `public/` during build.
- Add redirects or rewrites in `firebase.json` if URLs move.

## Regression Checklist

- `npm run build` completes successfully.
- `python3 scripts/link_audit.py` report reviewed (`meta/link_audit_report.md`).
- `python3 scripts/static_html_audit.py` report reviewed (`meta/static_html_report.md`).
- `meta/site-manifest.json` timestamp updated and page count looks reasonable.
- Spot-check critical entry points in a local preview (`npx serve public`).
