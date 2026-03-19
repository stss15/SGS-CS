This archive holds the legacy `/ib/` site that has been removed from the active build while the shared-shell rollout focuses on `KS3`, `IGCSE`, and `IB-2027`.

Contents moved here:
- Legacy Astro passthrough routes that previously exposed `/ib/*`
- Legacy Nunjucks source pages from `src/pages/ib`
- Legacy static HTML and support assets that previously shipped from `public/ib`
- Legacy IB-only CSS and JS support files that were copied from `src/static`

Build impact:
- Files in this archive are not read by the Astro app route tree
- Files in this archive are not read by the legacy Nunjucks build in `scripts/build.js`
- Files in this archive are not copied into the active `public` output

Retention:
- Keep this archive while the post-rollout site is monitored
- Restore from here only if a missing legacy dependency is discovered
