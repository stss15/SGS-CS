# @sgs/content-schema

## Purpose

Typed content adapters and schema contracts for framework migration routes.

## Current Contracts

- `FeatureCard`:
  - Required: `href`, `title`
  - Optional: `desc`, `icon`, `id`, `comingSoon`
- `IGCSEListing`:
  - `sections[]` with `title`, optional `subtitle`, and `items[]`
  - each item requires `href`, `number`, `name`
- `CurriculumListingPage`:
  - Required: `title`, `listingKey`, `hero.title`
  - Optional: `description`, `activeSection`, `breadcrumbs[]`, `hero.subtitle`
  - Includes `sections[]` using the same `TopicSection` contract as `IGCSEListing`
- `Ib2027PathwayIndex`:
  - Required: `title`, `hero.title`, `pathways[]`
  - `pathways[]` requires `href`, `title`, `desc`; optional `id`
- `LegacyContentPage`:
  - Required: `title`, `bodyHtml`
  - Optional: `description`, `activeSection`, `breadcrumbs[]`, `extraStyles[]`
  - Used for legacy-rich pages where body HTML is preserved as authored
- `Ib2027SlideRoute`:
  - Required: `level`, `unitSegment`, `unitNumber`, `slideSlug`, `routePath`
  - Used to discover SL/HL unit slide routes from legacy source structure
- `LegacyAliasRoute`:
  - Required: `routePath`
  - Used for legacy alias/passthrough route families (`ib-2027`, `ib`, `igcse`, `ks3`)
- `UnitPlanFrontmatter`:
  - Required: `title`, `unitNumber`, `unitName`, `level`
  - Arrays: `viewSlidesButtons`, `concepts`, `terminology`, `syllabusPoints`, `applications`
- `UnitIndexFrontmatter`:
  - Required: `title`, `hero.title`
  - Arrays: `cards`, `resources`
  - Optional fields: `description`, `resourcesTitle`, `resourcesSecondaryTitle`, `resourcesSecondary[]`

## Source Mapping

- Home cards: `src/pages/index.njk` frontmatter
- IGCSE listing: `src/data/site.json`
- IB 2027 pathway index (`/ib-2027/index.html`): `src/pages/ib-2027/index.njk` frontmatter + adapter card map
- IB 2027 SL curriculum index (`/ib-2027/sl/index.html`): `src/pages/ib-2027/sl/index.njk` frontmatter + `src/data/site.json` listing key `ib-2027-sl`
- IB 2027 HL curriculum index (`/ib-2027/hl/index.html`): `src/pages/ib-2027/hl/index.njk` frontmatter + `src/data/site.json` listing key `ib-2027-hl`
- IB 2027 SL Unit 5 scenarios (`/ib-2027/sl/unit-5/scenarios/scenario-{1..3}.html`):
  - `src/pages/ib-2027/sl/unit-5/scenarios/scenario-{1..3}.njk` via `getIbSlUnit5Scenario(scenarioSlug)`
  - preserves authored body HTML and frontmatter metadata (`breadcrumbs`, `extraStyles`)
- IB 2027 SL Unit 5 OOP Project pages (`/ib-2027/sl/unit-5/oop-project/**`):
  - `src/pages/ib-2027/sl/unit-5/oop-project/**/*.njk` via `getIbSlUnit5OopProjectPage(pagePath)`
  - preserves authored body HTML/frontmatter and normalizes `{{ basePath }}` links to root-relative paths
- IB 2027 SL/HL unit slide pages (`/ib-2027/{sl,hl}/unit-*/slides/*.html`):
  - route discovery via `getIb2027UnitSlideRoutes()`
  - source HTML passthrough via `getIb2027UnitSlideHtml(level, unitSegment, slideSlug)`
- IB 2027 legacy alias slide/scenario pages:
  - route discovery via `getIb2027SlideAliasRoutes()` and `getIb2027ScenarioAliasRoutes()`
  - source HTML passthrough via `getIb2027AliasRouteHtml(routePath)` from `public/ib-2027/*`
- IB legacy Nunjucks-backed pages (`/ib/index.html` + `/ib/<section>/*.html`):
  - route discovery via `getIbLegacyNunjucksRoutes()` from `src/pages/ib/**/*.njk`
  - source HTML passthrough via `getIbLegacyRouteHtml(routePath)` from `public/ib/*`
- IB legacy extra pages (non-Nunjucks-backed `/ib/**/*.html`):
  - route discovery via `getIbLegacyAllRoutes()` from `public/ib/**/*.html`
  - source HTML passthrough via `getIbLegacyRouteHtml(routePath)` from `public/ib/*`
- IGCSE legacy pages (`/igcse/**/*.html`):
  - route discovery via `getIgcseLegacyRoutes()` from `public/igcse/**/*.html`
  - source HTML passthrough via `getIgcseLegacyRouteHtml(routePath)` from `public/igcse/*`
  - note: textbook routes (`/igcse/topic*/textbook`) are now Astro content-collection routes and are explicitly excluded from the legacy catch-all passthrough in `apps/site/src/pages/igcse/[...route].astro`
- KS3 legacy pages (`/ks3/**/*.html`):
  - route discovery via `getKs3LegacyRoutes()` from `public/ks3/**/*.html`
  - source HTML passthrough via `getKs3LegacyRouteHtml(routePath)` from `public/ks3/*`
- Root utility legacy pages (`/404.html`, `/admin.html`, `/coming-soon.html`):
  - source HTML passthrough via `getRootLegacyRouteHtml(routePath)` from `public/`
- SL Unit plans: `src/pages/ib-2027/sl/unit-{1..12}/unit-plan.njk` via `getIbSlUnitPlan(unitNumber)`
- HL Unit plans: `src/pages/ib-2027/hl/unit-{1..11}/unit-plan.njk` via `getIbHlUnitPlan(unitNumber)`
- SL Unit indexes: `src/pages/ib-2027/sl/unit-{1..12}/index.njk` via `getIbSlUnitIndex(unitNumber)`
- HL Unit indexes: `src/pages/ib-2027/hl/unit-{1..11}/index.njk` via `getIbHlUnitIndex(unitNumber)`

## Build-Time Validation

Run:

```bash
npm run migration:validate-content-models
```

This validates required fields and data shape for currently migrated route families.
