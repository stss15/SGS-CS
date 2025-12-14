# CSS Diagnosis Report

> **Focus**: Stylesheet organization, inline CSS issues, centralization opportunities

---

## ⚠️ AI Agent Safety Rules

> [!CAUTION]
> **BEFORE making any changes to CSS:**
> 1. DO NOT modify any CSS that affects layout, colors, or spacing without explicit user approval
> 2. DO NOT remove any CSS rules - only MOVE them to external files
> 3. DO NOT change class names or selectors
> 4. ALWAYS test in browser after each file change

---

## Current State

### Centralized CSS Files (8 files in `public/css/`)

| File | Absolute Path | Purpose |
|------|---------------|---------|
| `style.css` | `/Users/StevenStewart/SGS-CSC REMIX/public/css/style.css` | Main site styles (header, nav, cards, modals) |
| `slide-deck.css` | `/Users/StevenStewart/SGS-CSC REMIX/public/css/slide-deck.css` | Reveal.js slide deck base styles |
| `ks3-deck.css` | `/Users/StevenStewart/SGS-CSC REMIX/public/css/ks3-deck.css` | KS3-specific slide deck overrides |
| `igcse-deck.css` | `/Users/StevenStewart/SGS-CSC REMIX/public/css/igcse-deck.css` | IGCSE-specific slide deck overrides |
| `specification.css` | `/Users/StevenStewart/SGS-CSC REMIX/public/css/specification.css` | Specification page styles |
| `toolkit.css` | `/Users/StevenStewart/SGS-CSC REMIX/public/css/toolkit.css` | Teacher toolkit page styles |
| `unit.css` | `/Users/StevenStewart/SGS-CSC REMIX/public/css/unit.css` | Unit page specific styles |
| `resource-style.css` | `/Users/StevenStewart/SGS-CSC REMIX/public/css/resource-style.css` | Resource listing styles |

---

## Issues Identified

### 🔴 Issue 1: Massive Inline CSS in Standalone HTML Files

**Problem**: Many standalone HTML files contain hundreds of lines of inline CSS that should be extracted.

**Files with Inline CSS** (exact paths):

| File Path | Total Lines | Inline CSS Location |
|-----------|-------------|---------------------|
| `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/B2.2.4 Recursion Visualisor.html` | 1,035 | Lines 9-149 (`<style>` block) |
| `/Users/StevenStewart/SGS-CSC REMIX/public/ks3/year7/unit2/Online-behaviour.html` | 2,373 | Lines 8-750 (`<style>` block) |
| `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/LL_Visualisation.html` | ~1,000 | `<style>` block in `<head>` |
| `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/BST_Visualisation.html` | ~1,200 | `<style>` block in `<head>` |
| `/Users/StevenStewart/SGS-CSC REMIX/public/igcse/topic1/binary-addition-game.html` | ~800 | `<style>` block in `<head>` |

### 🟠 Issue 2: TailwindCSS CDN in Some Files

**Files Using Tailwind CDN** (DO NOT remove Tailwind - convert separately):
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/B2.2.4 Recursion Visualisor.html`

### 🟡 Issue 3: CSS Variables Not Fully Utilized

**Reference for variables** (in `public/css/style.css` lines 1-17):
```css
:root {
    --primary-color: #0E214B;
    --accent-color: #BE9A5E;
    --background-color: #FFFFFF;
    --card-bg: #FFFFFF;
    --text-color: #000000;
    --text-light: #FFFFFF;
}
```

---

## Step-by-Step Extraction Procedure

### For Each Standalone HTML File with Inline CSS:

#### Phase A: Preparation

```
□ Step A1: Open the target HTML file and locate the <style> block
□ Step A2: Copy the ENTIRE content between <style> and </style> to clipboard
□ Step A3: Note the exact line numbers of the <style> block
□ Step A4: Take a screenshot of the page in browser (BEFORE state)
```

#### Phase B: Create External CSS File

```
□ Step B1: Create new file at: public/css/[appropriate-name].css
           - For visualizers: public/css/visualizer-[name].css
           - For games: public/css/game-[name].css
           
□ Step B2: Paste the copied CSS into the new file
□ Step B3: Add header comment:
           /* Extracted from [original-file-name].html on [date] */
           /* DO NOT EDIT - Changes should match original inline styles */
```

#### Phase C: Update HTML File

```
□ Step C1: Add <link> tag in <head> section, BEFORE the closing </head>:
           <link rel="stylesheet" href="../../css/[new-css-file].css">
           (Adjust path based on file depth)
           
□ Step C2: Delete the entire <style>...</style> block from HTML
□ Step C3: Save the HTML file
```

#### Phase D: Verification (REQUIRED)

```
□ Step D1: Open the HTML file in browser
□ Step D2: Take screenshot of the page (AFTER state)
□ Step D3: Compare BEFORE and AFTER screenshots - they MUST be identical
□ Step D4: Test ALL interactive elements still work:
           - Buttons clickable
           - Animations play
           - Hover effects work
           - Layout doesn't shift
           
□ Step D5: Check browser console for CSS-related errors (F12 → Console)
□ Step D6: If ANY visual difference detected: STOP and REVERT changes
```

> [!IMPORTANT]
> **PAUSE POINT**: After each file, verify before proceeding to next file.
> Do NOT batch multiple files without verification between each.

---

## File-by-File Extraction Checklist

### File 1: Online-behaviour.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/ks3/year7/unit2/Online-behaviour.html`
- **New CSS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/css/activity-online-behaviour.css`
- **Link Path in HTML**: `../../../css/activity-online-behaviour.css`

```
□ Completed extraction
□ Visual verification passed
□ All interactions work
```

### File 2: B2.2.4 Recursion Visualisor.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/B2.2.4 Recursion Visualisor.html`
- **New CSS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/css/visualizer-recursion.css`
- **Link Path in HTML**: `../../css/visualizer-recursion.css`
- **Note**: This file also uses TailwindCSS CDN - DO NOT remove the Tailwind script

```
□ Completed extraction
□ Visual verification passed
□ All interactions work
□ Confirmed Tailwind script still present
```

### File 3: LL_Visualisation.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/LL_Visualisation.html`
- **New CSS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/css/visualizer-linked-list.css`
- **Link Path in HTML**: `../../css/visualizer-linked-list.css`

```
□ Completed extraction
□ Visual verification passed
□ All interactions work
```

### File 4: BST_Visualisation.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/BST_Visualisation.html`
- **New CSS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/css/visualizer-bst.css`
- **Link Path in HTML**: `../../css/visualizer-bst.css`

```
□ Completed extraction
□ Visual verification passed
□ All interactions work
```

### File 5: binary-addition-game.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/igcse/topic1/binary-addition-game.html`
- **New CSS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/css/game-binary-addition.css`
- **Link Path in HTML**: `../../css/game-binary-addition.css`

```
□ Completed extraction
□ Visual verification passed
□ All interactions work
```

---

## DO NOT List

> [!WARNING]
> **Things AI agents must NEVER do:**
> - ❌ Modify CSS property values (colors, sizes, positions)
> - ❌ Rename CSS classes
> - ❌ Remove CSS rules that seem "unused"
> - ❌ Combine multiple inline CSS files into one without explicit approval
> - ❌ Change the order of CSS rules (specificity matters)
> - ❌ Remove vendor prefixes (-webkit-, -moz-)
> - ❌ Remove TailwindCSS from files that use it
> - ❌ Skip verification steps

---

## Files to Reference

When implementing changes, key reference files:
- `public/css/style.css` - Main site variables and patterns
- `public/css/slide-deck.css` - Slide deck component patterns
- `src/templates/layouts/base.njk` - How CSS is linked in templates
