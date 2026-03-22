# SGS Education — Design Refinement Plan

> **Scope:** Base shell (header, sidebar, footer), global tokens/styles, and index pages for Home, Year 7, Year 8, Year 9, and IB only.
> **Not in scope:** IGCSE pages, textbook content, activities, worksheets, playgrounds, slide decks.
> **Approach:** Style-only changes. No content manipulation. No new features.
> **Inspiration:** Stitch design folder — used as a mood board for brand direction, not a blueprint.

---

## Current State Assessment

### What's Working
- Solid Astro build pipeline with `BaseLayout.astro` → `SiteNav.astro` → `tokens.css` generating all pages
- Clean component architecture (SiteNav, CourseExplorer, HeroPanel, Breadcrumbs)
- Good accessibility foundations (skip links, aria labels, keyboard nav)
- Responsive mobile drawer working correctly

### Issues Identified
1. **Root landing page** uses `Outfit` + `Source Sans 3` fonts (via `style.css`) while the Astro shell uses `Plus Jakarta Sans` + `Inter` (via `tokens.css`) — font mismatch across the site
2. **Root landing page** layout is generic — oversized hero, centred card grid that lacks hierarchy or visual weight
3. **Navbar** is functional but bland — plain white bar with grey text links, no brand presence, no visual distinction from a generic template
4. **Active nav state** is just a colour change (`color: navy`) with no background — hard to spot at a glance
5. **Sidebar collapse/expand button** is a raw `‹` / `›` character in a 1.6rem box, positioned absolute, covers content when sidebar is expanded, and looks like an afterthought
6. **Footer** is a single line of copyright text with no styling — disconnected from the brand
7. **Year 7/8/9 index pages** are generated from the old `style.css` pipeline (Outfit/Source Sans 3) not the new `tokens.css` — they look different from IB pages that use the Astro shell
8. **Hero sections** on year pages use huge `clamp(2.2rem, 4.5vw, 3.2rem)` centred titles that feel oversized for a content index page
9. **Hover effects** are inconsistent — some elements translateX, some translateY, some just change colour
10. **Icon system** is mixed — Font Awesome on generated pages, but the stitch inspiration uses Material Symbols; no unified approach
11. **Colour palette** has too many hardcoded hex values scattered across `style.css`, `tokens.css`, and inline `<style>` blocks
12. **Card design** on landing page has centred text + centred icon which feels static and template-like

---

## Design Direction

Drawing from the stitch inspiration (the "Academic Atelier" aesthetic) while respecting the existing codebase:

### Typography
- **Keep:** `Plus Jakarta Sans` (display) + `Inter` (body) — already in `tokens.css`, these are the right choice
- **Remove:** `Outfit` + `Source Sans 3` from `style.css` and all generated pages — unify everything on the tokens.css fonts
- **Remove:** `Instrument Serif` import from `BaseLayout.astro` (currently loaded but appears unused — the "odd cursive font" referenced)
- **Tighten heading scale:** Reduce hero titles from 3.2rem max to ~2.4rem max on index pages — less "poster", more "wayfinding"

### Colour Palette
- **Primary:** `--navy-800: #0e214b` (keep)
- **Accent:** `--gold-500: #be9a5e` (keep — use more prominently in nav and interactive elements)
- **Background:** `--color-bg: #f8f6f2` (keep — warm, not clinical white)
- **Surface:** `--color-surface: #ffffff` (keep)
- **New addition:** `--navy-50: #f0f2f7` — a very light navy tint for hover states and active nav items, replacing the current `rgba(14, 33, 75, 0.06)` pattern scattered everywhere

### Hover & Interaction Philosophy
- **Standard hover:** Subtle background fill + border-colour shift. No translateX/Y on nav items.
- **Card hover:** Gentle shadow lift (`--shadow` → `--shadow-md`), subtle border-colour warm to `--gold-500`. No Y-translation.
- **Active/Current states:** Solid background fill, not just colour changes.
- **Transitions:** Standardise on `--transition-fast` (150ms) for micro-interactions, `--transition-base` (250ms) for panels.

### Icon System
- **Keep:** Font Awesome 6 — already loaded across the entire site, well-supported, consistent
- **Standardise:** All icons use `fa-solid` weight, 1rem default size in nav, 0.85rem in sidebar
- **No mixing:** Remove any stray Lucide or Material Symbols usage on pages within scope

---

## Specific Changes

### 1. `tokens.css` — Global Design Tokens

**File:** `apps/site/src/styles/tokens.css`

| Line(s) | Current | Change | Reason |
|---------|---------|--------|--------|
| 1-2 | Font vars defined | Add `--navy-50: #f0f2f7;` and `--gold-100: #faf5eb;` | Light tint tokens for hover/active states |
| 41 | `--header-height: 3.25rem` | Change to `--header-height: 3.5rem` | Slightly taller header for breathing room |
| 173-180 | `.site-header` border-bottom + plain white bg | Add a subtle gold accent line: `border-bottom: 2px solid var(--navy-800);` with a `::after` pseudo-element for a thin gold accent strip | Brand presence in the header |
| 193-203 | `.site-brand` plain text | Increase font-weight to 800, add gold accent to the logo area | Stronger brand mark |
| 212-238 | `.site-primary-nav a` — grey text, transparent bg, no active indicator | Restyle: active state gets `background: var(--navy-50); color: var(--navy-800);` with `border-radius: var(--radius-md)` pill shape. Hover gets the same bg at 50% opacity. Add a 2px bottom gold accent on active. | Nav feels premium and clearly indicates current section |
| 413-478 | `.sidebar-collapse-btn` / `.sidebar-expand-btn` — raw `‹›` characters, 1.6rem box, absolute positioned | Redesign: use a proper chevron SVG icon, make the collapse btn sit flush at the top-right of the sidebar with `right: -0.75rem` so it overlaps the border elegantly. Make expand btn a slim vertical tab that hugs the left edge (`left: 0; width: 2rem; height: 3rem; border-radius: 0 var(--radius-md) var(--radius-md) 0`). Both get `background: var(--color-surface); border: 1px solid var(--color-border); box-shadow: var(--shadow-soft);` | Current buttons are oversized, ugly, and cover content |
| 500-506 | `.course-explorer` padding | Reduce top padding from 1.2rem to 0.85rem | Sidebar content starts closer to top, less wasted space |
| 517-528 | `.course-explorer__badge` — 4.25rem square | Reduce to 3rem square, border-radius to 0.75rem | Badge is oversized for a sidebar — feels clunky |
| 539-545 | `.course-explorer__title` — 1.55rem | Reduce to 1.25rem | Sidebar title is too large |
| 725-730 | `.hero` — border-bottom | Keep border-bottom but make it `var(--color-border)` consistently | Cleaner separation |

### 2. `tokens.css` — New Header Brand Strip

Add after the `.site-header` block:

```css
.site-header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--navy-800) 0%, var(--gold-500) 50%, var(--navy-800) 100%);
}
```

This adds a subtle navy-to-gold gradient line under the header — the "soul gradient" idea from stitch adapted as a thin accent strip. Premium without being heavy.

### 3. `tokens.css` — Refined Sidebar Toggle Buttons

Replace the current collapse/expand button styles:

```css
.sidebar-collapse-btn {
  display: none;
  position: absolute;
  top: 0.75rem;
  right: -0.65rem;
  width: 1.3rem;
  height: 1.3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.7rem;
  cursor: pointer;
  z-index: 2;
  box-shadow: var(--shadow-soft);
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.sidebar-collapse-btn:hover {
  color: var(--navy-800);
  border-color: var(--color-border-strong);
}

.sidebar-expand-btn {
  display: none;
  position: fixed;
  top: calc(var(--header-height) + 1rem);
  left: 0;
  width: 1.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-left: none;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.7rem;
  cursor: pointer;
  z-index: 121;
  box-shadow: var(--shadow-soft);
  transition: color var(--transition-fast), border-color var(--transition-fast), width var(--transition-fast);
}

.sidebar-expand-btn:hover {
  color: var(--navy-800);
  border-color: var(--color-border-strong);
  width: 1.75rem;
}
```

### 4. `tokens.css` — Footer Styling

Add new footer styles (currently the footer in `tokens.css` has no styling — only the old `style.css` has minimal footer rules):

```css
.site-footer {
  margin-top: auto;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
  text-align: center;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.site-footer p {
  margin: 0;
}
```

### 5. `SiteNav.astro` — Nav Link Active Indicator

**File:** `apps/site/src/components/SiteNav.astro`

Add a gold underline indicator to the active nav link. In the nav link rendering, add a `data-active` attribute or rely on the existing `.active` class, then in `tokens.css`:

```css
.site-primary-nav a.active {
  color: var(--navy-800);
  background: var(--navy-50, #f0f2f7);
  border-radius: var(--radius-md);
  position: relative;
}

.site-primary-nav a.active::after {
  content: '';
  position: absolute;
  bottom: 0.15rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.2rem;
  height: 2px;
  background: var(--gold-500);
  border-radius: 1px;
}
```

### 6. `BaseLayout.astro` — Remove Instrument Serif Font

**File:** `apps/site/src/layouts/BaseLayout.astro`

**Line 103:** Change the Google Fonts import from:
```
Instrument+Serif&family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800
```
to:
```
Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800
```

Remove `Instrument Serif` entirely — it's the "odd cursive font" that doesn't appear anywhere else and creates brand inconsistency.

### 7. `style.css` — Unify Fonts for Generated Pages

**File:** `public/css/style.css`

The generated (non-Astro) pages like the root `index.html`, Year 7/8/9 index pages still use `Outfit` + `Source Sans 3`. These need to be aligned:

| Line(s) | Current | Change |
|---------|---------|--------|
| 3 | `--font-display: 'Outfit'` | `--font-display: 'Plus Jakarta Sans'` |
| 4 | `--font-body: 'Source Sans 3'` | `--font-body: 'Inter'` |

**All generated HTML pages** (index.html, year7/index.html, year8/index.html, year9/index.html, ib-2027/index.html):
Change the Google Fonts `<link>` from `Outfit` + `Source Sans 3` to `Plus Jakarta Sans` + `Inter` to match `BaseLayout.astro`.

### 8. `style.css` — Navbar Refinement for Generated Pages

Update the `.main-header` and `.nav-link` styles to match the refined Astro tokens:

```css
.main-header {
  background: rgba(255, 255, 255, 0.98);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 2px solid var(--navy-800);
  transition: box-shadow var(--transition-base);
}

/* Add the gold accent strip */
.main-header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--navy-800) 0%, var(--gold-500) 50%, var(--navy-800) 100%);
}

.nav-link.active {
  color: var(--primary-color);
  background: #f0f2f7;
  border-radius: 8px;
  position: relative;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0.15rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.2rem;
  height: 2px;
  background: var(--gold-500);
  border-radius: 1px;
}
```

### 9. Root `index.html` — Landing Page Layout Refinement

**File:** `public/index.html` (generated from Astro source)

The landing page needs structural CSS adjustments (no content changes):

**In `style.css`:**

```css
/* Refined hero — left-aligned, tighter, more editorial */
.hero-title {
  font-size: clamp(1.8rem, 3vw, 2.4rem);  /* Down from 3.2rem */
  text-align: left;
}

.hero-text {
  text-align: left;
  max-width: 1200px;
  margin-inline: auto;
  margin-bottom: 0.75rem;
}

.hero-subtitle {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);  /* Down from 1.3rem */
}

/* Cards — tighter grid, left-aligned text, less padding */
.card {
  text-align: left;
  align-items: flex-start;
  padding: 1.25rem;
  border-radius: var(--radius-lg);
}

.card-icon {
  font-size: 1.4rem;  /* Down from default */
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f7;
  border-radius: var(--radius);
  color: var(--primary-color);
  margin-bottom: 0.75rem;
}

.card:hover {
  border-color: var(--accent-color);
  box-shadow: var(--shadow-hover);
}

.card:hover .card-icon {
  background: var(--primary-color);
  color: #fff;
}
```

This shifts the landing page from a centred "splash page" feel to a more editorial, content-forward layout. Icons get a contained background that inverts on hover — a refined interaction.

### 10. `style.css` — Footer Styling for Generated Pages

```css
footer {
  margin-top: auto;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-default);
  background: var(--background-color);
  text-align: center;
  font-size: 0.82rem;
  color: var(--text-muted);
}
```

### 11. Year 7/8/9 Index Pages — Topic List Refinement

**In `style.css`**, the `.topic-item` and `.papers-wrapper` styles:

```css
.papers-wrapper {
  max-width: 700px;  /* Constrain width — full 1200px is too wide for a simple list */
}

.paper-title {
  font-size: 1.3rem;  /* Down from default oversized */
}

.topic-item {
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.topic-item:hover {
  border-color: var(--accent-color);
}

.topic-item:hover .topic-arrow {
  color: var(--accent-color);
}
```

---

## Files to Modify (Complete List)

### Source files (Astro — source of truth for shell pages)
1. **`apps/site/src/styles/tokens.css`** — Primary: new colour tokens, header brand strip, refined nav active states, smaller sidebar elements, sidebar toggle redesign, footer styling
2. **`apps/site/src/layouts/BaseLayout.astro`** — Remove Instrument Serif font import, update sidebar toggle button markup (replace `‹›` with proper SVG chevrons)
3. **`apps/site/src/components/SiteNav.astro`** — No structural changes needed (styling handled in tokens.css)

### Generated/static files (built output + legacy pages)
4. **`public/css/style.css`** — Unify fonts to Plus Jakarta Sans + Inter, header brand strip, nav active pill + gold underline, hero size reduction, card left-alignment, footer styling, topic list refinement
5. **`public/index.html`** — Update Google Fonts `<link>` to Plus Jakarta Sans + Inter
6. **`public/ks3/year7/index.html`** — Update Google Fonts `<link>`
7. **`public/ks3/year8/index.html`** — Update Google Fonts `<link>`
8. **`public/ks3/year9/index.html`** — Update Google Fonts `<link>`
9. **`public/ib-2027/index.html`** — Update Google Fonts `<link>` (already partially correct)

### Files NOT touched
- `public/igcse/**` — explicitly excluded
- `public/css/reader.css` — textbook styles
- `public/css/slide-deck.css` — presentation styles
- `public/css/tool-sql-playground.css` — tool styles
- `public/css/sql-worksheet.css` — worksheet styles
- Any content HTML, activities, worksheets, playgrounds

---

## Build & Rebuild Note

The generated pages in `public/` say `<!-- GENERATED FILE - Edit source in src/pages/ instead -->`. However, `style.css` is a standalone static file, not generated by Astro. The font `<link>` tags in the generated HTML files are baked into the Astro templates. So:

- **`tokens.css`** changes propagate automatically on rebuild via `BaseLayout.astro`
- **`style.css`** is edited directly (static asset)
- **Font `<link>` changes** in generated HTML files need to be made in the Astro page sources (`apps/site/src/pages/`) AND in the current `public/` output
- **`BaseLayout.astro`** font import change will propagate to all Astro-built pages on next build

---

## Visual Summary

| Element | Before | After |
|---------|--------|-------|
| **Header** | Plain white bar, grey border | White bar with navy-to-gold gradient accent strip |
| **Nav links** | Grey text, barely visible active | Pill-shaped active with light navy bg + gold underline |
| **Sidebar toggle** | Oversized `‹›` box covering content | Small circular collapse button; slim tab expand button |
| **Sidebar badge** | 4.25rem square (too large) | 3rem square (proportionate) |
| **Landing hero** | Centred, oversized (3.2rem) | Left-aligned, editorial (2.4rem max) |
| **Landing cards** | Centred text, bare icons | Left-aligned, icons in contained boxes with hover invert |
| **Fonts** | Mixed (Outfit/Source Sans 3 vs Plus Jakarta Sans/Inter) | Unified: Plus Jakarta Sans + Inter everywhere |
| **Footer** | Unstyled single line | Bordered, muted, consistent with header |
| **Hover effects** | Inconsistent (translateX, translateY, colour-only) | Standardised: shadow lift + border-colour warm |

---

## Approval Checklist

- [ ] Typography unification (Plus Jakarta Sans + Inter everywhere)
- [ ] Remove Instrument Serif import
- [ ] Header brand strip (navy-to-gold gradient line)
- [ ] Nav active state (pill bg + gold underline)
- [ ] Sidebar toggle redesign (smaller, circular/tab)
- [ ] Sidebar element size reduction
- [ ] Landing page hero size reduction + left-alignment
- [ ] Landing page card refinement
- [ ] Footer styling
- [ ] Year 7/8/9 topic list tightening
- [ ] Hover effect standardisation
- [ ] Font link updates across all in-scope HTML files

**Once approved, I will implement all changes file by file.**
