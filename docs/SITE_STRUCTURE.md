# Site Structure

## Active Source Directories

- `apps/site/src`: Astro pages/layout/components that define the framework shell and route entry points.
- `packages/content-schema/src`: Adapters that expose legacy source/content to Astro routes.
- `src/pages`: Legacy templates/content still used by build.
- `src/static`: Static assets copied into the legacy output (`public/`) and then synced into framework dist when needed.
- `src/data`: Listing/topic data consumed during rendering.

## Generated Output

- `public/`: Generated intermediate legacy output (ignored in git).
- `apps/site/dist`: Final static site output deployed to Firebase.
- `meta/site-manifest.json`: Generated during legacy build (not kept as active source file).

## Build Scripts Kept Active

- `scripts/build.js`
- `scripts/migration/alias-framework-html-routes.js`
- `scripts/migration/harden-framework-dist.js`

All other legacy scripts were archived.
