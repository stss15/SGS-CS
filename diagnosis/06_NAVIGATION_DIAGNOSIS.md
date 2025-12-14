# Navigation and Breadcrumb Diagnosis Report

> **Focus**: Site navigation, breadcrumb system, back buttons, consistency

---

## ⚠️ AI Agent Safety Rules

> [!CAUTION]
> **BEFORE making any changes to navigation:**
> 1. DO NOT modify base.njk navigation without testing ALL pages
> 2. DO NOT remove backLink support until ALL pages use breadcrumbs
> 3. DO NOT change link paths without verifying they resolve correctly
> 4. ALWAYS test on mobile and desktop after changes
> 5. Navigation changes can break user experience site-wide

---

## Current State

### Navigation Architecture

The site uses two navigation systems:

1. **Primary Nav** (in `base.njk`): KS3 | IGCSE | IB links
2. **Breadcrumbs** (in `base.njk`): Hierarchical path to current page

**Key Files**:
- Template: `/Users/StevenStewart/SGS-CSC REMIX/src/templates/layouts/base.njk`
- Styles: `/Users/StevenStewart/SGS-CSC REMIX/public/css/style.css` (lines 182-315)
- Script: `/Users/StevenStewart/SGS-CSC REMIX/public/js/nav.js`

### Breadcrumb Configuration Pattern

In NJK page frontmatter:
```yaml
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "IGCSE", href: "igcse/index.html" }
  - { label: "Topic 1", href: "igcse/topic1/index.html" }
  - { label: "1.1 Number Representation" }  # No href = current page
```

---

## Issues Identified

### 🔴 Issue 1: Standalone Files Have Inconsistent Navigation

**Problem**: Each standalone file implements its own back button differently.

**Audit Results**:

| File | Current Navigation | Back Link Works? |
|------|-------------------|------------------|
| `/public/ib/B2/B2.2.4 Recursion Visualisor.html` | Simple `<a href="index.html">` | ✓ Yes |
| `/public/ks3/year7/unit2/Online-behaviour.html` | None visible | ❌ Missing |
| `/public/ib/B4/LL_Visualisation.html` | Back to index | ✓ Yes |
| `/public/igcse/topic1/binary-addition-game.html` | Back button | ✓ Yes |

### 🟠 Issue 2: activeSection Not Always Set

**Pages missing `activeSection`** (causes no nav highlighting):
- Check each NJK page for `activeSection: "ks3"`, `"igcse"`, or `"ib"`

---

## Step-by-Step Procedures

### Procedure 1: Add Consistent Navigation to Standalone Files

#### Goal: All standalone apps have working back button and home link

#### For Each Standalone File:

```
□ Step 1: Open the standalone HTML file
           
□ Step 2: Locate the <header> or first content after <body>
           
□ Step 3: Add navigation snippet (adjust paths based on file depth):

For files in public/ib/B2/:
<div style="position:fixed;top:10px;left:10px;z-index:1000;display:flex;gap:10px;">
    <a href="index.html" style="padding:8px 16px;background:#0E214B;color:white;border-radius:8px;text-decoration:none;font-family:Inter,sans-serif;">
        ← Back
    </a>
    <a href="../../index.html" style="padding:8px 16px;background:#BE9A5E;color:white;border-radius:8px;text-decoration:none;font-family:Inter,sans-serif;">
        🏠 Home
    </a>
</div>

□ Step 4: Adjust href paths based on file depth:
           - From public/ib/B2/ to home: ../../index.html
           - From public/ks3/year7/unit2/ to home: ../../../index.html
           - From public/igcse/topic1/ to home: ../../index.html
           
□ Step 5: Save file
           
□ Step 6: Open in browser and verify:
           □ Back button returns to correct parent index
           □ Home button returns to site homepage
           □ Navigation doesn't overlap with page content
```

> [!IMPORTANT]
> **PAUSE POINT**: Verify each file before proceeding to next.

---

### Procedure 2: Verify Breadcrumbs in All Templated Pages

#### Goal: All pages have working breadcrumb navigation

```
□ Step 1: List all NJK pages with breadcrumbs:
           grep -l "breadcrumbs:" /Users/StevenStewart/SGS-CSC\ REMIX/src/pages/**/*.njk
           
□ Step 2: For pages WITHOUT breadcrumbs, add them:
           (See template below)
           
□ Step 3: Run build:
           npm run build
           
□ Step 4: Spot-check 5 pages for working breadcrumbs:
           □ Page 1: _________________________ ✓/✗
           □ Page 2: _________________________ ✓/✗
           □ Page 3: _________________________ ✓/✗
           □ Page 4: _________________________ ✓/✗
           □ Page 5: _________________________ ✓/✗
```

**Breadcrumb Template** (add to frontmatter):
```yaml
breadcrumbs:
  - { label: "Home", href: "index.html" }
  - { label: "[Section]", href: "[section]/index.html" }
  - { label: "[Current Page Title]" }
```

---

### Procedure 3: Add activeSection to Pages Missing It

```
□ Step 1: Find pages without activeSection:
           grep -L "activeSection:" /Users/StevenStewart/SGS-CSC\ REMIX/src/pages/**/*.njk
           
□ Step 2: For each page found, add appropriate activeSection:
           - Pages in src/pages/ks3/ → activeSection: "ks3"
           - Pages in src/pages/igcse/ → activeSection: "igcse"
           - Pages in src/pages/ib/ → activeSection: "ib"
           
□ Step 3: Run build: npm run build
           
□ Step 4: Open each modified page and verify nav link is highlighted
```

---

## DO NOT List

> [!WARNING]
> **Things AI agents must NEVER do with navigation:**
> - ❌ Modify navigation structure in base.njk without testing ALL pages
> - ❌ Remove existing back buttons or navigation elements
> - ❌ Change the breadcrumb href format (must be relative to site root)
> - ❌ Hardcode absolute URLs in navigation
> - ❌ Remove mobile hamburger menu functionality
> - ❌ Change navigation link order without approval

---

## Verification Checklist

After any navigation changes:

```
□ Build completes: npm run build
□ Test on desktop:
  □ Main nav links work (KS3, IGCSE, IB)
  □ Breadcrumbs clickable and go to correct pages
  □ Active section highlighted in nav
  
□ Test on mobile (resize browser to <768px):
  □ Hamburger menu appears
  □ Menu opens and closes
  □ Mobile nav links work
  
□ Test breadcrumbs on sample pages:
  □ /public/index.html - No breadcrumbs (home page)
  □ /public/igcse/index.html - Home > IGCSE
  □ /public/igcse/topic1/index.html - Home > IGCSE > Topic 1
  □ /public/igcse/topic1/specification.html - Full path
  
□ Test standalone file navigation:
  □ Back buttons return to correct page
  □ Home buttons return to homepage
```

---

## File Reference

| Purpose | File Path |
|---------|-----------|
| Main nav template | `/Users/StevenStewart/SGS-CSC REMIX/src/templates/layouts/base.njk` |
| Nav styles | `/Users/StevenStewart/SGS-CSC REMIX/public/css/style.css` |
| Nav script | `/Users/StevenStewart/SGS-CSC REMIX/public/js/nav.js` |
| Breadcrumb logic | base.njk lines 77-92 |
| Mobile menu logic | nav.js |

---

## Navigation Testing Commands

```bash
# Find pages without breadcrumbs
grep -L "breadcrumbs:" /Users/StevenStewart/SGS-CSC\ REMIX/src/pages/**/*.njk

# Find pages without activeSection  
grep -L "activeSection:" /Users/StevenStewart/SGS-CSC\ REMIX/src/pages/**/*.njk

# Check if nav.js has errors (after any changes)
node --check /Users/StevenStewart/SGS-CSC\ REMIX/public/js/nav.js
```
