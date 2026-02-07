---
name: site-build-deploy
description: Use when building, validating, or deploying the current SGS site to Firebase. Covers the active build chain (legacy source render + Astro dist hardening) and deploy-safe checks.
---

# Site Build and Deploy

## When To Use

Use this skill for:
- Build failures
- Deployment requests
- Route/output parity checks for current production site behavior

## Active Build Chain

1. Render legacy source to `public/`:
- Command: `npm run build:legacy`
- Script: `scripts/build.js`

2. Build Astro site to `apps/site/dist`:
- Command: `npm run build --workspace @sgs/site`

3. Add route aliases and copy required non-HTML legacy assets:
- Script: `scripts/migration/alias-framework-html-routes.js`

4. Harden generated HTML (auth gate, metadata, legacy inline event runtime, header normalization):
- Script: `scripts/migration/harden-framework-dist.js`

5. Deploy from `apps/site/dist` using Firebase Hosting:
- Command: `npm run deploy`

## Required Validation

Run before finalizing deploy work:

```bash
npm run framework:build
```

If the task includes deployment, run:

```bash
npm run deploy
```

## Critical Constraints

- Do not hand-edit `apps/site/dist` as source content.
- Source edits belong in `src/`, `apps/site/src/`, `packages/`, or active scripts.
- Preserve compatibility with `firebase.json` rewrites/redirects.
