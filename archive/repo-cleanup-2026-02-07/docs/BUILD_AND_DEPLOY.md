# Build and Deploy Guide

> **Purpose:** Technical guide for building, testing, and deploying the SGS-CS website.

---

## Build System Overview

The repository now maintains two build paths:

- **Framework (primary deploy path):** Astro workspace output to `apps/site/dist`
- **Legacy (rollback-compatible path):** Nunjucks templates output to `public/`

```
npm run framework:build  →  apps/site/dist
npm run build:legacy     →  public/*.html
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Framework app | `apps/site/` | Astro framework output |
| Framework aliasing | `scripts/migration/alias-framework-html-routes.js` | HTML parity aliasing + static asset sync |
| Legacy build script | `scripts/build.js` | Compiles Nunjucks → HTML (rollback path) |
| Page templates | `src/pages/` | Content pages |
| Layout templates | `src/templates/layouts/` | Page structures |
| Framework output | `apps/site/dist/` | Production deploy artifact |
| Legacy output | `public/` | Rollback artifact |
| Manifest | `meta/site-manifest.json` | Page registry |

---

## Build Commands

```bash
# From project root
npm run framework:build
```

### What It Does

1. Builds Astro routes in `apps/site/`.
2. Runs framework postbuild aliasing/parity support.
3. Syncs non-HTML static assets from legacy output into framework dist.

Legacy rollback build remains available:

```bash
npm run build:legacy
```

### Expected Output

```
Built igcse/index.html
Built igcse/topic1/1.1_number_representation.html
Built igcse/topic1/specification.html
... (72 pages total)
Wrote manifest to meta/site-manifest.json
```

---

## Keyword Highlighting (IGCSE)

IGCSE slides use red keyword highlighting. This is applied by a Python script.

```bash
python3 scripts/apply_igcse_keywords.py
```

### What It Does

1. Reads keyword definitions from `docs/content/igcse/chapter-text-files/Chapter X key words.txt`
2. Finds matching terms in IGCSE HTML files
3. Wraps them in `<span class="keyword" data-def="...">` tags
4. Removes old yellow `<div class="key-term">` boxes
5. Skips `<script>`, `<style>`, `<title>`, and existing spans

### Keyword File Format

```
term – definition text here
bit – the basic computing element that is either 0 or 1
hexadecimal – a number system based on the value 16
```

### CSS for Keywords

```css
.keyword {
    color: var(--sg-red) !important;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 1px dashed var(--sg-red);
}
```

---

## Deployment

### Automatic Deployment (Recommended)

Just push to `main` — GitHub Actions handles everything:

```bash
git add -A
git commit -m "Description of changes"
git push origin main
```

The CI workflows (`.github/workflows/pages.yml`, `.github/workflows/firebase-hosting.yml`) automatically:
1. Run sequential migration/source gates.
2. Run framework performance budgets.
3. Run browser smoke checks.
4. Deploy framework dist artifact.

### Verify Deployment

1. Check GitHub Actions: https://github.com/stss15/SGS-CS/actions
2. Wait for green checkmark
3. **Hard refresh browser** (`Cmd+Shift+R`) to clear CSS cache

### Manual Local Testing

```bash
# Build framework output
npm run framework:build

# Serve locally
npx serve apps/site/dist

# Open in browser
open http://localhost:3000
```

---

## Reveal.js Configuration

All slide decks use a shared configuration in `public/js/slide-deck.js`.

### Standard Settings

```javascript
{
    width: 1600,
    height: 900,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 1.5,
    slideNumber: 'c/t',
    autoAnimate: true,
    autoAnimateDuration: 0.6,
    autoAnimateEasing: 'ease-out'
}
```

### Auto-Fit Plugin

The slide deck system includes an auto-fit plugin that:
- Wraps each slide in `<div class="slide-inner js-autofit">`
- Scales content to fit the viewport
- Prevents scrollbars and clipped content

### Script Loading Order (Important!)

```html
<!-- 1. Optional deck-specific options -->
<script>
  window.__deckOptions = { /* overrides */ };
</script>

<!-- 2. Reveal.js core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>

<!-- 3. Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/plugin/highlight/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/plugin/notes/notes.min.js"></script>

<!-- 4. Shared initialization (MUST be last) -->
<script src="{{ basePath }}js/slide-deck.js"></script>
```

### Opting Out of Auto-Fit

For slides that shouldn't scale:

```html
<section class="no-autofit">
  <!-- Content won't be auto-scaled -->
</section>
```

Or use data attribute:

```html
<section data-no-autofit>
  <!-- Content won't be auto-scaled -->
</section>
```

### Scrollable Slides (Escape Hatch)

For genuinely dense content:

```html
<div class="slide-inner scrollable">
  <!-- This can scroll if needed -->
</div>
```

---

## CSS Organization

### Global Stylesheets

| File | Purpose |
|------|---------|
| `style.css` | Global site styles, CSS variables, header, nav, cards |
| `slide-deck.css` | Reveal.js base styles |
| `ks3-deck.css` | KS3 slide overrides |
| `igcse-deck.css` | IGCSE slide overrides |
| `specification.css` | Specification page styles |
| `standalone-nav.css` | Navigation for standalone files |

### CSS Variables

Defined in `style.css`:

```css
:root {
    --primary-color: #0E214B;   /* Deep Blue */
    --accent-color: #BE9A5E;    /* Gold */
    --background-color: #FFFFFF;
    --text-color: #000000;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --radius: 12px;
    --font-main: 'Inter', sans-serif;
}
```

### Naming Convention

```
[type]-[context]-[name].css

Examples:
- activity-online-behaviour.css
- assessment-igcse-topic1-1-1.css
- game-binary-addition.css
- visualizer-recursion.css
```

---

## JavaScript Organization

### Core Scripts

| File | Purpose |
|------|---------|
| `nav.js` | Navigation dropdown, mobile menu |
| `feedback.js` | Bug report and feature request modals |
| `site.js` | Password protection for links |
| `slide-deck.js` | Reveal.js initialization, auto-fit |
| `ks3-widgets.js` | KS3 timer widgets |

### Naming Convention

Same as CSS:
```
[type]-[context]-[name].js
```

---

## Template System

### Available Layouts

| Layout | Purpose | Used By |
|--------|---------|---------|
| `base.njk` | Standard pages (nav, footer, modals) | Most pages |
| `slide-deck.njk` | IGCSE Reveal.js slides | IGCSE decks |
| `ks3-slide.njk` | KS3 Reveal.js slides | KS3 decks |
| `ks3-standalone.njk` | KS3 standalone lessons | KS3 lessons |
| `igcse-slide.njk` | Minimal IGCSE wrapper | Some IGCSE |
| `listing.njk` | Resource listings | Index pages |
| `arcade.njk` | Game arcade layout | Games |

### Frontmatter Options

```yaml
---
layout: layouts/base.njk          # Which layout to use
title: "Page Title"               # Browser title
activeSection: "igcse"            # Nav highlighting (ks3/igcse/ib)
breadcrumbs:                      # Navigation path
  - { label: "Home", href: "index.html" }
  - { label: "Current Page" }
extraStyles:                      # Additional CSS files
  - "css/specification.css"
---
```

---

## Troubleshooting

### Build Fails

1. Check error message for file and line number
2. Verify Nunjucks syntax is correct
3. Ensure all referenced files exist
4. Run `npm install` if dependencies missing

### CSS Not Updating

1. Hard refresh browser: `Cmd+Shift+R`
2. Clear browser cache
3. Check if file path is correct
4. Verify CSS file was saved

### Slides Overflow/Scroll

1. Check content isn't too dense for one slide
2. Ensure `slide-deck.js` is loaded last
3. Add `scrollable` class if truly necessary
4. Consider splitting into vertical slides

### Keywords Not Highlighting

1. Run `python3 scripts/apply_igcse_keywords.py`
2. Check keyword file format (`term – definition`)
3. Verify keyword file exists for that chapter
4. Check for typos in keyword spelling

### GitHub Actions Fails

1. Check Actions tab for error details
2. Verify all dependencies are in `package.json`
3. Ensure Python script has no errors
4. Check file paths are correct for Linux

---

## Pre-Deploy Checklist

```
□ npm run build completes without errors
□ Tested in browser (multiple pages)
□ No JavaScript console errors
□ No broken images or links
□ Slides fit without scrollbars
□ Mobile view works (resize browser)
□ Keywords highlighted (IGCSE only)
□ Commit message is descriptive
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `scripts/build.js` | Build pipeline |
| `scripts/apply_igcse_keywords.py` | Keyword highlighting |
| `public/js/slide-deck.js` | Reveal.js config |
| `public/css/style.css` | Global styles |
| `.github/workflows/pages.yml` | CI/CD workflow |
| `meta/site-manifest.json` | Page manifest |
