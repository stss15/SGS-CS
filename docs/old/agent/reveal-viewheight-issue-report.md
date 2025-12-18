# Reveal.js Viewheight & Footer Clipping Issue Report

## Problem Description
Users are experiencing an issue where the content of Reveal.js slides is being clipped or hidden behind the footer elements (navigation arrows, "IGCSE Computer Science" text, logo) at the bottom of the viewport. This is particularly noticeable when the "Scale to Fit" feature of Reveal.js is active.

**Symptoms:**
- Content at the bottom of the slide is cut off.
- Content overlaps with the footer UI.
- The "view height" window does not seem to account for the footer element, treating it as available space.

**Suspected Causes (based on research):**
1.  **Reveal.js Height Calculation:** Reveal.js calculates available slide height by subtracting its UI elements. If custom footers are not accounted for, it overestimates available space.
2.  **`minScale` too high:** Reveal stops shrinking content before it fits within the reduced effective viewport.
3.  **`r-stretch` elements:** These force elements to fill remaining space, potentially causing overflow if the calculation is off.
4.  **Fixed heights (`100vh`):** Sections with fixed heights fight against Reveal's scaling.

## Potential Fixes Identified
The following solutions were suggested:

1.  **Adjust Reveal Configuration:**
    - Decrease `minScale` (e.g., to `0.15` or `0.2`) to allow more shrinking.
    - Decrease `margin` (e.g., to `0.04`) to maximize space.
2.  **CSS Adjustments:**
    - Apply `position: absolute` to footer/banner elements *inside* sections (if any exist).
    - Set `html, body { overflow: hidden; }` to prevent document scrollbars.
    - Remove `height: 100vh` or `min-height: 100vh` from sections.
    - Replace `r-stretch` with `max-height: 55vh` if it causes overflow.

## Actions Taken (Attempted Fix)
We applied the following changes to the codebase:

1.  **Modified `public/js/slide-deck.js`:**
    - Updated `minScale` from `0.5` to `0.2`.
    - Updated `margin` from `0.06` to `0.04`.
2.  **Modified `public/css/slide-deck.css` & `docs/agent/templates/slide-deck-template.css`:**
    - Added `html, body { overflow: hidden; }`.
3.  **Codebase Search:**
    - Searched for `class="footer"` and `class="unit-footer"` inside `public/igcse` to see if they were inside `<section>` tags.
    - **Result:** No such elements were found *inside* the slide sections. The footers appear to be outside the `.reveal` container in the main HTML structure.

## Current Status
The user reports that **the above fixes did not resolve the issue**. The problem persists, suggesting that simply adjusting the scale and margin is insufficient, or that the interaction between the external footer (outside Reveal) and the Reveal viewport calculation is more complex than anticipated.

## Next Steps for Investigation
- Investigate if the footer elements (outside `.reveal`) are overlapping the `.reveal` container.
- Check if the `.reveal` container needs `height: calc(100vh - [footer_height])` to explicitly reserve space for the footer.
- Inspect the DOM to see exactly what element is intercepting the view height.
