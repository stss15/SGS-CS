# SGS-CS Codebase Diagnosis: Executive Summary

> **Date**: 2025-12-14  
> **Purpose**: Comprehensive review of codebase structure to identify refactoring opportunities while maintaining current functionality and appearance.

---

## Status (updated 2025-12-14)

- The key implementation items across the diagnosis reports have been applied (CSS/JS extraction, templating markers, documentation consolidation, navigation/breadcrumb consistency).
- URL-changing file renames remain intentionally unexecuted unless explicitly approved.

## ⚠️ For AI Agents: Read This First

> [!CAUTION]
> **Before making ANY changes from these diagnosis reports:**
> 1. Read the specific diagnosis file for your task
> 2. Follow the step-by-step procedures EXACTLY
> 3. Use the verification checklists at EVERY pause point
> 4. If ANYTHING breaks: STOP and REVERT immediately
> 5. Never batch multiple files - process one at a time

**Golden Rule**: The site must look and work IDENTICALLY after any refactoring.

---

## 🔴 Critical Issues Identified

| Category | Issue Count | Impact |
|----------|------------|--------|
| **Inline CSS/JS** | ~20 files | Very High - prevents caching, duplicates code |
| **Mixed File Types** | 125 HTML + 72 NJK | High - unclear which to edit |
| **Documentation Sprawl** | 97 MD + 74 TXT | Medium - conflicting agent instructions |
| **Inconsistent Templates** | 7 layouts with overlap | Medium - maintenance burden |
| **Build Dependency** | NJK requires build step | Medium - deployment friction |

---

## 📊 Codebase Statistics

```
Directory Structure:
├── public/          # 317 files (HTML, CSS, JS, images)
│   ├── css/         # 8 files (shared stylesheets)
│   ├── js/          # 5 files (shared scripts)
│   └── [ib|igcse|ks3]/  # 125 HTML pages
├── src/             # 72 NJK template sources
│   ├── pages/       # 63 page templates
│   └── templates/   # 9 layout/macro files
├── docs/            # 227 documentation files
└── scripts/         # 3 build scripts
```

---

## 📁 Detailed Reports (With AI-Safe Procedures)

Each report includes:
- ✓ Step-by-step procedures with checkboxes
- ✓ DO NOT lists for common mistakes
- ✓ Verification checkpoints
- ✓ Pause points after each file
- ✓ Emergency rollback procedures
- ✓ Absolute file paths

| Report | Focus Area |
|--------|------------|
| [01_CSS_DIAGNOSIS.md](./01_CSS_DIAGNOSIS.md) | Inline CSS extraction procedures |
| [02_JS_DIAGNOSIS.md](./02_JS_DIAGNOSIS.md) | Inline JS extraction procedures |
| [03_TEMPLATING_DIAGNOSIS.md](./03_TEMPLATING_DIAGNOSIS.md) | NJK template modifications |
| [04_DOCUMENTATION_DIAGNOSIS.md](./04_DOCUMENTATION_DIAGNOSIS.md) | Doc consolidation |
| [05_DIRECTORY_STRUCTURE.md](./05_DIRECTORY_STRUCTURE.md) | File organization |
| [06_NAVIGATION_DIAGNOSIS.md](./06_NAVIGATION_DIAGNOSIS.md) | Nav/breadcrumb fixes |
| [07_REFACTORING_PLAN.md](./07_REFACTORING_PLAN.md) | **Master plan with safety gates** |

---

## 🎯 Recommended Starting Point

**Start with**: [07_REFACTORING_PLAN.md](./07_REFACTORING_PLAN.md)

This master plan:
1. Defines all pre-work requirements
2. Orders tasks by priority and risk
3. Provides completion gates between tiers
4. Links to specific procedure documents
5. Includes emergency rollback instructions

---

## 🚫 Things That Are OFF LIMITS

| Action | Reason |
|--------|--------|
| Editing `public/*.html` if it has a `.njk` source | Will be overwritten by build |
| Deleting any files | Archive instead |
| Changing CSS colors/sizes | Visual changes not approved |
| Refactoring JS logic | Only MOVE code, don't IMPROVE it |
| Batch processing multiple files | Must verify each file individually |
| Skipping verification steps | Non-negotiable safety measure |

---

## ✅ Quick Reference: File Types

**Generated Files** (edit .njk source, not HTML):
- Check: Is file in `meta/site-manifest.json`?
- Check: Does `src/pages/[same-path].njk` exist?

**Standalone Files** (edit directly):
- `/public/ib/B2/B2.2.4 Recursion Visualisor.html`
- `/public/ib/B4/LL_Visualisation.html`
- `/public/ib/B4/BST_Visualisation.html`
- `/public/ks3/year7/unit2/Online-behaviour.html`
- `/public/igcse/topic1/binary-addition-game.html`
- All files in `/public/ib/Learn Python Map/`

---

## 🔧 Key Commands

```bash
# Build the site (REQUIRED after template changes)
cd /Users/StevenStewart/SGS-CSC\ REMIX
npm run build

# Check for JS syntax errors
node --check public/js/[new-file].js

# Find all references before moving/renaming
grep -r "filename" . --include="*.html" --include="*.njk"
```
