# Templating System Diagnosis Report

> **Focus**: Nunjucks templates, layout patterns, build process, NJK vs HTML separation

---

## ⚠️ AI Agent Safety Rules

> [!CAUTION]
> **BEFORE making any changes to templates:**
> 1. DO NOT modify templates without running `npm run build` after EVERY change
> 2. DO NOT delete any template files without explicit approval
> 3. DO NOT change template inheritance (`{% extends %}`) without testing all pages that use it
> 4. ALWAYS verify the build completes without errors
> 5. ALWAYS spot-check at least 3 pages that use the modified template

---

## Current State

### Template Architecture

**Absolute Paths**:

```
/Users/StevenStewart/SGS-CSC REMIX/src/
├── templates/
│   ├── components.njk              # Reusable component macros
│   ├── igcse/macros.njk            # IGCSE-specific macros
│   └── layouts/
│       ├── base.njk                # Main site layout (nav, footer, modals)
│       ├── slide-deck.njk          # Reveal.js IGCSE slides
│       ├── ks3-slide.njk           # KS3 Reveal.js slides
│       ├── ks3-standalone.njk      # KS3 standalone lessons
│       ├── arcade.njk              # Game arcade layout
│       ├── listing.njk             # Simple listing layout
│       └── igcse-slide.njk         # Minimal IGCSE wrapper
└── pages/
    ├── index.njk
    ├── ib/                         # 24 IB pages
    ├── igcse/                      # 28 IGCSE pages
    └── ks3/                        # 10 KS3 pages
```

### Build Command

```bash
# Run from project root
cd /Users/StevenStewart/SGS-CSC\ REMIX
npm run build
```

---

## Issues Identified

### 🔴 Issue 1: Mixed Templated and Standalone HTML in `public/`

**Problem**: `public/` contains both generated HTML and manually-written HTML.

**Generated Files** (from NJK templates - DO NOT edit directly):
- All files matching manifest in `/Users/StevenStewart/SGS-CSC REMIX/meta/site-manifest.json`
- ~72 pages total

**Standalone Files** (edit directly - NOT from templates):
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/B2.2.4 Recursion Visualisor.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/LL_Visualisation.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/BST_Visualisation.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ks3/year7/unit2/Online-behaviour.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ks3/year7/unit2/digital-footprint-app.html`
- All files in `/Users/StevenStewart/SGS-CSC REMIX/public/ib/Learn Python Map/`

### 🟠 Issue 2: Inline JS in Templates

**Template with significant inline JS**:
- Path: `/Users/StevenStewart/SGS-CSC REMIX/src/templates/layouts/ks3-standalone.njk`
- Lines: 182-372 (~200 lines of timer widget code)

---

## Step-by-Step Procedures

### Procedure 1: Adding Source/Output Markers

#### Goal: Make it clear which HTML files are generated vs standalone

```
□ Step 1: Open build script
           File: /Users/StevenStewart/SGS-CSC REMIX/scripts/build.js
           
□ Step 2: Find the line that writes the HTML output (around line 99):
           await fs.writeFile(outPath, html);
           
□ Step 3: Modify to inject comment at top:
           const marker = '<!-- GENERATED FILE - Edit source in src/pages/ instead -->\n';
           await fs.writeFile(outPath, marker + html);
           
□ Step 4: Save build.js
           
□ Step 5: Run build:
           cd /Users/StevenStewart/SGS-CSC\ REMIX && npm run build
           
□ Step 6: Verify by checking any generated file:
           head -1 /Users/StevenStewart/SGS-CSC\ REMIX/public/index.html
           # Should show the GENERATED comment
           
□ Step 7: Verify standalone files do NOT have the marker:
           head -1 /Users/StevenStewart/SGS-CSC\ REMIX/public/ib/B2/B2.2.4\ Recursion\ Visualisor.html
           # Should show <!DOCTYPE html>
```

> [!IMPORTANT]
> **PAUSE POINT**: Verify build completes and markers are correct before proceeding.

---

### Procedure 2: Extracting Inline JS from ks3-standalone.njk

#### Phase A: Analysis

```
□ Step A1: Open template file:
           /Users/StevenStewart/SGS-CSC REMIX/src/templates/layouts/ks3-standalone.njk
           
□ Step A2: Locate inline script block (lines ~182-372)
           Note the exact content between <script> and </script>
           
□ Step A3: Identify which pages use this template:
           grep -r "layout: layouts/ks3-standalone.njk" /Users/StevenStewart/SGS-CSC\ REMIX/src/pages/
           
□ Step A4: List all pages found: ___________________________
```

#### Phase B: Create External JS File

```
□ Step B1: Create new file:
           /Users/StevenStewart/SGS-CSC REMIX/public/js/ks3-widgets.js
           
□ Step B2: Add header comment:
           /**
            * KS3 Widget Functions
            * Extracted from ks3-standalone.njk
            * Includes: Timer widget, Floating timer, Date display
            */
            
□ Step B3: Copy ENTIRE script content from template (lines 183-371)
           DO NOT include the <script> tags themselves
           
□ Step B4: Add document ready wrapper if not present:
           document.addEventListener('DOMContentLoaded', function() {
               initFloatingTimer();
           });
```

#### Phase C: Update Template

```
□ Step C1: In ks3-standalone.njk, replace the inline <script>...</script> block with:
           <script src="{{ basePath }}js/ks3-widgets.js"></script>
           
□ Step C2: Keep tiny inline script for date display if it uses template variables:
           <script>
               document.getElementById('live-date-display').innerText = 
                   new Date().toLocaleDateString('en-GB', dateOptions);
           </script>
           
□ Step C3: Save the template
```

#### Phase D: Verification

```
□ Step D1: Run build:
           npm run build
           # MUST complete without errors
           
□ Step D2: For EACH page from Step A4, open in browser and verify:
           □ Page loads without JavaScript errors (check console)
           □ Floating timer widget appears in corner
           □ Timer starts/stops/resets correctly
           □ Date shows correctly
           □ Reveal.js slides work (arrow keys, fragments)
           
□ Step D3: If ANY page is broken: REVERT:
           git checkout -- src/templates/layouts/ks3-standalone.njk
           rm public/js/ks3-widgets.js
```

> [!IMPORTANT]
> **PAUSE POINT**: Do NOT proceed until ALL KS3 pages verify correctly.

---

## Template Usage Reference

Before modifying any template, check which pages use it:

| Template | Command to Find Pages |
|----------|----------------------|
| base.njk | `grep -r "layout: layouts/base.njk" src/pages/` |
| slide-deck.njk | `grep -r "layout: layouts/slide-deck.njk" src/pages/` |
| ks3-standalone.njk | `grep -r "layout: layouts/ks3-standalone.njk" src/pages/` |
| ks3-slide.njk | `grep -r "layout: layouts/ks3-slide.njk" src/pages/` |

---

## DO NOT List

> [!WARNING]
> **Things AI agents must NEVER do with templates:**
> - ❌ Edit generated HTML files in `public/` if they have a `.njk` source
> - ❌ Delete template files
> - ❌ Change template inheritance without testing ALL pages
> - ❌ Modify Nunjucks filters or global variables without understanding build.js
> - ❌ Skip the build step after any template change
> - ❌ Assume a change works without checking actual rendered pages

---

## Build Process Notes

### Build Command
```bash
cd /Users/StevenStewart/SGS-CSC\ REMIX
npm run build
```

### Expected Output
```
Built igcse/index.html
Built igcse/topic1/1.1_number_representation.html
... (72 pages total)
Wrote manifest to meta/site-manifest.json
```

### If Build Fails
1. Check error message for file and line number
2. Revert recent changes: `git checkout -- [file]`
3. Try build again
4. Report error if persists

---

## Verification Checklist After Any Template Change

```
□ npm run build completes without errors
□ meta/site-manifest.json was updated (check timestamp)
□ At least 3 sample pages load correctly:
  □ /public/index.html
  □ /public/igcse/index.html
  □ /public/ib/index.html
□ No JavaScript console errors
□ No missing CSS (check for broken layouts)
□ Navigation works (breadcrumbs, main nav)
```
