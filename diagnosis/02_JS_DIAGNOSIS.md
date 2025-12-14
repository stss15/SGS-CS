# JavaScript Diagnosis Report

> **Focus**: Script centralization, inline JS issues, shared functionality

---

## Status (updated 2025-12-14)

- JS extraction for the standalone files listed in this report has been completed (see `public/js/activity-online-behaviour.js`, `public/js/visualizer-recursion.js`, `public/js/visualizer-linked-list.js`, `public/js/visualizer-bst.js`, `public/js/game-binary-addition.js`).
- The KS3 template inline JS item is tracked and completed in [03_TEMPLATING_DIAGNOSIS.md](./03_TEMPLATING_DIAGNOSIS.md).

## ⚠️ AI Agent Safety Rules

> [!CAUTION]
> **BEFORE making any changes to JavaScript:**
> 1. DO NOT modify any function logic - only MOVE code to external files
> 2. DO NOT rename functions or variables
> 3. DO NOT remove any code that seems "unused" - it may be called dynamically
> 4. DO NOT change the order of script loading
> 5. ALWAYS test ALL interactive features after each file change
> 6. If something breaks, IMMEDIATELY revert and report

---

## Current State

### Centralized JS Files (5 files in `public/js/`)

| File | Absolute Path | Purpose |
|------|---------------|---------|
| `nav.js` | `/Users/StevenStewart/SGS-CSC REMIX/public/js/nav.js` | Navigation dropdown, mobile menu |
| `feedback.js` | `/Users/StevenStewart/SGS-CSC REMIX/public/js/feedback.js` | Bug report and feature request modals |
| `site.js` | `/Users/StevenStewart/SGS-CSC REMIX/public/js/site.js` | Password protection for links |
| `slide-deck.js` | `/Users/StevenStewart/SGS-CSC REMIX/public/js/slide-deck.js` | Reveal.js initialization |
| `toolkit.js` | `/Users/StevenStewart/SGS-CSC REMIX/public/js/toolkit.js` | Teacher toolkit features |

---

## Issues Identified

### 🔴 Issue 1: Massive Inline JS in Standalone HTML Files

**Files with Inline JavaScript** (exact paths):

| File Path | Inline JS Location | Est. Lines |
|-----------|-------------------|------------|
| `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/B2.2.4 Recursion Visualisor.html` | Lines 275-1030 | ~750 |
| `/Users/StevenStewart/SGS-CSC REMIX/public/ks3/year7/unit2/Online-behaviour.html` | After `</style>` to end | ~900 |
| `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/LL_Visualisation.html` | `<script>` blocks | ~600 |
| `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/BST_Visualisation.html` | `<script>` blocks | ~700 |

### 🔴 Issue 2: Inline JS in NJK Templates

**Template with Inline JS**:
- `/Users/StevenStewart/SGS-CSC REMIX/src/templates/layouts/ks3-standalone.njk` (lines 182-372)

---

## Step-by-Step Extraction Procedure

### For Each Standalone HTML File with Inline JS:

#### Phase A: Analysis (REQUIRED before any changes)

```
□ Step A1: Open the target HTML file
□ Step A2: Locate ALL <script>...</script> blocks (may be multiple)
□ Step A3: For each script block, note:
           - Start line number
           - End line number
           - Whether it contains DOM-ready handlers (DOMContentLoaded, window.onload)
           - Whether it references other scripts
           
□ Step A4: Open the page in browser
□ Step A5: Open browser DevTools (F12) → Console
□ Step A6: Verify NO JavaScript errors before starting
□ Step A7: Test ALL interactive features and document what they are:
           - List all buttons and what they do
           - List all animations
           - List all form inputs
```

> [!IMPORTANT]
> **PAUSE POINT**: Do not proceed until you have a complete list of interactive features to test.

#### Phase B: Create External JS File

```
□ Step B1: Create new file at: public/js/[appropriate-name].js
           - For visualizers: public/js/visualizer-[name].js
           - For games: public/js/game-[name].js
           
□ Step B2: Add header comment:
           /**
            * Extracted from [original-file-name].html on [date]
            * DO NOT modify function logic - only moved from inline
            * 
            * Features: [list features from Step A7]
            */
            
□ Step B3: Copy the ENTIRE content of each <script> block
□ Step B4: Paste into the new JS file
□ Step B5: If there are multiple script blocks, combine them but add comments:
           // === FROM FIRST SCRIPT BLOCK ===
           [code]
           
           // === FROM SECOND SCRIPT BLOCK ===
           [code]
```

#### Phase C: Update HTML File

```
□ Step C1: Determine correct relative path from HTML to public/js/
           - From public/ib/B2/ → ../../js/
           - From public/ks3/year7/unit2/ → ../../../js/
           - From public/igcse/topic1/ → ../../js/
           
□ Step C2: Add <script> tag at SAME LOCATION as original inline script:
           <script src="[relative-path]/[new-js-file].js"></script>
           
           IMPORTANT: Position matters! If original script was at end of body,
           put the new <script> at end of body.
           
□ Step C3: Delete the inline <script>...</script> block(s)
□ Step C4: Save the HTML file
```

#### Phase D: Verification (REQUIRED - DO NOT SKIP)

```
□ Step D1: Refresh the page in browser (Ctrl+Shift+R for hard refresh)
□ Step D2: Check browser console for ANY JavaScript errors
           If errors exist: STOP, REVERT, and report
           
□ Step D3: Test EVERY interactive feature from your list in Step A7:
           □ Feature 1: _________________________ ✓/✗
           □ Feature 2: _________________________ ✓/✗
           □ Feature 3: _________________________ ✓/✗
           (add more as needed)
           
□ Step D4: Test page load behavior:
           □ Page loads without freezing
           □ No visual glitches on load
           □ Animations start correctly
           
□ Step D5: If ANY feature is broken: IMMEDIATELY revert by:
           1. Delete the new .js file
           2. Restore the inline <script> from git: git checkout -- [file]
           3. Report the issue
```

> [!IMPORTANT]
> **PAUSE POINT**: Only proceed to next file after ALL checks pass.

---

## File-by-File Extraction Checklist

### File 1: B2.2.4 Recursion Visualisor.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/B2.2.4 Recursion Visualisor.html`
- **New JS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/js/visualizer-recursion.js`
- **Link Path**: `../../js/visualizer-recursion.js`
- **Script Location**: End of `<body>` tag

**Features to Test**:
- [ ] Algorithm dropdown selector works
- [ ] "Next Step" button advances visualization
- [ ] "Previous" button works
- [ ] "Reset" button resets state
- [ ] Code highlighting updates with steps
- [ ] Call stack displays correctly
- [ ] Tree/visualization renders correctly

```
□ Analysis completed
□ JS file created
□ HTML updated
□ All features verified working
□ No console errors
```

### File 2: Online-behaviour.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/ks3/year7/unit2/Online-behaviour.html`
- **New JS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/js/activity-online-behaviour.js`
- **Link Path**: `../../../js/activity-online-behaviour.js`

**Features to Test**:
- [ ] Key modal appears on page load
- [ ] Start button dismisses modal and shows game
- [ ] Card swipe gestures work (up/down/left/right)
- [ ] Direction buttons work
- [ ] Cards flip correctly
- [ ] Progress bar updates
- [ ] Score tracking works
- [ ] End screen appears

```
□ Analysis completed
□ JS file created
□ HTML updated
□ All features verified working
□ No console errors
```

### File 3: LL_Visualisation.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/LL_Visualisation.html`
- **New JS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/js/visualizer-linked-list.js`
- **Link Path**: `../../js/visualizer-linked-list.js`

**Features to Test**:
- [ ] List all operations (insert head, insert end, delete, etc.)
- [ ] Each operation animates correctly
- [ ] Code panel shows correct Python
- [ ] Step controls work
- [ ] Node workspace displays correctly

```
□ Analysis completed
□ JS file created
□ HTML updated
□ All features verified working
□ No console errors
```

### File 4: BST_Visualisation.html

- **Source**: `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/BST_Visualisation.html`
- **New JS File**: `/Users/StevenStewart/SGS-CSC REMIX/public/js/visualizer-bst.js`
- **Link Path**: `../../js/visualizer-bst.js`

**Features to Test**:
- [ ] Insert node works
- [ ] Delete node works
- [ ] Search works
- [ ] Tree renders correctly
- [ ] Traversal animations work
- [ ] Code panel updates

```
□ Analysis completed
□ JS file created
□ HTML updated
□ All features verified working
□ No console errors
```

---

## DO NOT List

> [!WARNING]
> **Things AI agents must NEVER do:**
> - ❌ Refactor or "improve" JavaScript code
> - ❌ Remove functions that aren't called (they may be event handlers or callbacks)
> - ❌ Change function names or variable names
> - ❌ Add 'use strict' or other directives
> - ❌ Convert to ES6 modules without explicit approval
> - ❌ Minify or compress code
> - ❌ Remove console.log statements (they may be intentional)
> - ❌ Change the script loading position (defer, async, head vs body)
> - ❌ Skip testing ANY interactive feature

---

## Emergency Rollback Procedure

If something breaks after extraction:

```bash
# Revert the HTML file to its original state
git checkout -- /Users/StevenStewart/SGS-CSC\ REMIX/public/[path-to-file].html

# Delete the newly created JS file
rm /Users/StevenStewart/SGS-CSC\ REMIX/public/js/[new-file].js

# Verify the page works again
# Open in browser and test
```

---

## Files to Reference

When implementing changes, key reference files:
- `public/js/slide-deck.js` - Good example of centralized logic
- `public/js/feedback.js` - Example of modal/form handling
- `src/templates/layouts/base.njk` - How scripts are linked in templates
