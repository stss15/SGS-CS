# Repo Cleanup Archive (2026-02-07)

This archive contains files moved out of the active codebase during the streamline pass.

## Why These Files Were Archived

- Not required for the current Firebase deploy path.
- Legacy diagnostics/plans/templates no longer needed for active operations.
- Generated output snapshots (`public`, Astro dist, `.astro`, manifest snapshots).
- Legacy scripts/workflows superseded by the active build chain.

## Active Build/Deploy Path (Kept Outside Archive)

- `src/`
- `apps/site/`
- `packages/`
- `scripts/build.js`
- `scripts/migration/alias-framework-html-routes.js`
- `scripts/migration/harden-framework-dist.js`
- `meta/migration/pilot-routes.json`
- `meta/migration/wave2-routes.json`
- `firebase.json`, `.firebaserc`, root npm scripts

## Note

Generated artifacts are intentionally archived, not deleted, for traceability.
