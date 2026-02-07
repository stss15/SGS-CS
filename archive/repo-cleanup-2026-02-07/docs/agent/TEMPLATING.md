# Templating System

## Build Pipeline

- Entry: `scripts/build.js`
- Inputs: `src/pages/**/*.njk`, `src/pages/**/*.html`, plus static assets under `src/static/`
- Outputs: `public/**.html` with a generated-file marker (templates) and copied static files (no marker)
- Manifest: `meta/site-manifest.json`

Static assets (CSS/JS/images) and standalone HTML (games, legacy tools) live under `src/static/` and are copied to `public/` before template rendering.
If a static file shares a path with a generated template, the template output wins.

## Layouts

Layouts live in `src/templates/layouts/`:
- `base.njk`: standard pages
- `listing.njk`: topic listings
- `arcade.njk`: cards + resources
- `slide-deck.njk`: Reveal.js decks
- `ks3-standalone.njk`: KS3 deck variant

## Macros

- Shared macros in `src/templates/components.njk`

## Front Matter Conventions

Common keys:
- `layout` (defaults to base)
- `title`, `description`
- `activeSection`
- `listingKey` (pulls shared listing data)
- `topicKey` (pulls shared arcade topic data)
- `breadcrumbs`
- `hero`
- `extraStyles`, `scripts` (arcade pages default to `css/resource-style.css`)
- `resourcesSecondary`, `resourcesSecondaryTitle` (second resource grid for arcade-style pages)

## basePath

`build.js` computes `basePath` so assets load correctly regardless of nesting depth.
Use `basePath` for assets that are relative to `public/` when nesting varies.

## Shared Data

- Listing content lives in `src/data/site.json`.
- Set `listingKey` in front matter to pull `sections` (and optional `wrapperClass`) from shared data.
- Arcade topic cards/resources live in `src/data/topics.json`.
- Set `topicKey` to pull `title`, `description`, `breadcrumbs`, `hero`, `extraStyles`, `cards`, `resources`, and optional `resourcesTitle`.

## Resource Items

Resource list entries can include:
- `href`, `number` or `icon`, `name`, `type`
- `target` (for example, `_blank` to open slides in a new tab)

## Slides

- Slide decks live in `src/pages/**/slides/*.html` or `*.njk`.
- Only include slide sections in templates; Reveal init is centralized.
