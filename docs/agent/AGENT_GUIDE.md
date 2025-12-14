# AI Agent Guide for SGS-CS Website

> **Read this first before making any changes to the codebase.**

## Quick Reference

### What Type of Content Are You Creating?

| Content Type | Source Location | Output Location | Template |
|--------------|-----------------|-----------------|----------|
| Standard page | `src/pages/*.njk` | `public/*.html` | `layouts/base.njk` |
| Slide deck | `src/pages/*.njk` | `public/*.html` | `layouts/slide-deck.njk` / `layouts/igcse-slide.njk` |
| KS3 slide deck | `src/pages/*.njk` | `public/*.html` | `layouts/ks3-slide.njk` / `layouts/ks3-standalone.njk` |
| Game/Visualizer | `public/*.html` (direct) | Same | None |

### Key Commands

```bash
# Build the site (REQUIRED after template changes)
npm run build

# The build writes to:
# - public/ (HTML files)
# - meta/site-manifest.json (page manifest)
```

### Critical Rules

1. **NEVER edit HTML files in `public/` if they have a `.njk` source**
   - Check: `rg -n "permalink:" src/pages/` or `rg -n "layout:" src/pages/`
   - If a source exists in `src/pages/`, edit the `.njk` file instead

2. **ALWAYS run `npm run build` after template changes**

3. **DO NOT add inline CSS/JS to new files**
   - Use shared files in `public/css/` and `public/js/`

4. **Use `breadcrumbs` (not `backLink`) for navigation**

### Detailed Guides

- [Slide Deck Creation](./igcse-slide-deck-guide.md)
- [Codebase Navigation](../ai-navigation.md)
- [Slide Workflow](../../.agent/workflows/generate_slides.md)

### Codebase Diagnosis

See `diagnosis/` for detailed analysis and refactoring plans.

