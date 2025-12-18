# Reveal Slide Deck Sizing Guide

Purpose: keep all Reveal.js decks filling the viewport without scrollbars or clipped content. Applies to KS3 templated decks and standalone IGCSE decks (Topic 4.1/4.2).

## Approach overview
- Use a single shared config in `public/js/slide-deck.js` (1600x900, margin 0.04, minScale 0.2, maxScale 1.5, slide numbers `c/t`, auto-animate enabled).
- Auto-wrap every leaf slide in `.slide-inner.js-autofit` so a helper plugin can scale the block to the available space.
- Base CSS pins each slide to full height, centres with flex, keeps `.slide-inner` flex (with gap) for stacked content, and sets `transform-origin: top left` for smooth scaling. Optional `.scrollable` class remains as an escape hatch.
- Auto-fit plugin scales per-slide on `ready`, `slidechanged`, `fragment` events, and `resize`, and skips overview/print modes.

Why this works: Reveal’s native scaling handles the viewport; the helper then scales the main block to avoid overflow. Flex centring and consistent sizing remove the mixed “short/fat vs long/thin” configs that previously forced scrollbars.

## What to include in decks
1) Scripts (order matters):
```
<script>
  window.__deckOptions = {
    slideNumber: 'c/t',
    showSlideNumber: 'all',
    autoAnimate: true,
    autoAnimateDuration: 0.6,
    autoAnimateEasing: 'ease-out'
  };
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/plugin/highlight/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/plugin/notes/notes.min.js"></script>
<script src="{{ basePath }}js/slide-deck.js"></script>
```
- `slide-deck.js` defines the shared config, registers Highlight/Notes/AutoFit plugins, and auto-wraps slides.
- Leave `__deckOptions` empty unless you need overrides; avoid per-deck width/height/margin tweaks.

2) Markup expectations:
- Normal slides: no manual wrapper needed; the helper wraps each leaf `<section>` in `<div class="slide-inner js-autofit">...</div>`.
- To opt out, add `class="no-autofit"` or `data-no-autofit` on the `<section>`.
- If content is truly too dense, add `.scrollable` to the inner wrapper (rare).

3) CSS requirements:
- `public/css/slide-deck.css`, `public/css/ks3-deck.css`, and `public/css/igcse-deck.css` already include:
  - `.reveal .slides section { display:flex; align-items:center; justify-content:center; padding: clamp(...); gap: 0.75rem; }`
  - `.reveal .slide-inner { max-width:100%; max-height:100%; width:100%; }`
  - `.reveal .js-autofit { transform-origin: top left; }`
  - `.slide-inner.scrollable { max-height:100%; overflow-y:auto; }`
- Do not reintroduce fixed heights or generic overflow rules on sections.

## KS3 vs IGCSE usage
- KS3: use the `layouts/ks3-standalone.njk` template. It already pulls in `slide-deck.js`; custom slides added via page content will be wrapped automatically.
- IGCSE: Topic 4.1 and 4.2 use `layouts/slide-deck.njk`, which also consumes `slide-deck.js`. Keep content in standard `<section>` blocks; avoid inline `Reveal.initialize`.

## Quick checklist before shipping a deck
- [ ] No inline `Reveal.initialize`; rely on `slide-deck.js`.
- [ ] Sections that must not scale are tagged `no-autofit`/`data-no-autofit`.
- [ ] Only genuinely dense slides use `.scrollable`.
- [ ] Load order: options → Reveal core → plugins → `slide-deck.js`.
- [ ] Test at laptop and 1080p: no vertical scrollbars, no clipped content, slide numbers show `c/t`.
- [ ] Overview mode and `?print-pdf` remain readable (AutoFit already skips these).
