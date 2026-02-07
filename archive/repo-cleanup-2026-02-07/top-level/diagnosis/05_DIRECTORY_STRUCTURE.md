# Directory Structure Diagnosis Report

> **Focus**: File organization, naming conventions, source vs output separation

---

## ⚠️ AI Agent Safety Rules

> [!CAUTION]
> **BEFORE making any changes to directory structure:**
> 1. DO NOT rename or move files without updating ALL internal links
> 2. DO NOT delete any files - archive instead
> 3. DO NOT move generated files out of public/ without also updating the build script
> 4. ALWAYS run `grep -r "filename"` to find all references before moving
> 5. URL changes can break external links and bookmarks

---

## Current State

### Top-Level Structure

```
/Users/StevenStewart/SGS-CSC REMIX/
├── .agent/                  # Agent workflows
├── .github/                 # GitHub Actions
├── diagnosis/               # This diagnosis folder (NEW)
├── docs/                    # Documentation (227 files)
├── meta/                    # Build manifest
│   └── site-manifest.json
├── node_modules/            # Dependencies (DO NOT TOUCH)
├── public/                  # Output + standalone (317 files)
├── scripts/                 # Build scripts (3 files)
├── src/                     # Template sources (72 files)
├── package.json
└── README.md
```

### Generated vs Standalone Files

**How to Identify Generated Files**:
1. Check if a `.njk` source exists:
   ```bash
   # For any HTML file in public/, check if it has a source:
   ls src/pages/[same-path-as-public].njk
   ```

2. Check the manifest:
   ```bash
   cat /Users/StevenStewart/SGS-CSC\ REMIX/meta/site-manifest.json | grep "filename"
   ```

**Standalone Files List** (updated 2025-12-14 — confirmed *no* `.njk` source; edit directly):
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/recursion-visualizer.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/B2.2.4 Recursion Visualisor.html` (legacy filename retained as redirect stub)
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/Big_0_notation.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/LL_Visualisation.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/BST_Visualisation.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/B4.1.2_linked_lists.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ks3/year7/unit2/Online-behaviour.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/ks3/year7/unit2/student_activities.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/igcse/topic1/binary-addition-game.html`
- `/Users/StevenStewart/SGS-CSC REMIX/public/igcse/topic1/binary_game.html`
- All files in `/Users/StevenStewart/SGS-CSC REMIX/public/ib/Learn Python Map/`

---

## Issues Identified

### 🔴 Issue 1: Naming Inconsistencies

**Files with Spaces in Names** (problematic for URLs and scripts):
| Current Name | Recommended Name |
|--------------|------------------|
| `B2.2.4 Recursion Visualisor.html` | `recursion-visualizer.html` |

> Updated 2025-12-14: a small number of space-removal renames have been executed with redirect stubs retained (to avoid breaking bookmarks). Broader renames (e.g., underscores → hyphens across many pages) remain intentionally unexecuted.

**Files with Underscores** (lower priority):
| Current Name | Recommended Name |
|--------------|------------------|
| `1.1_number_representation.html` | `1-1-number-representation.html` |

### 🟠 Issue 2: Empty Directories

> Updated 2025-12-14: these directories are not present in `public/ks3/` (no action required).

---

## Step-by-Step Procedures

### Procedure 1: Create public/README.md

#### Goal: Document which files are standalone vs generated

```
□ Step 1: Create new file:
           /Users/StevenStewart/SGS-CSC REMIX/public/README.md
           
□ Step 2: Add content (see template below)
           
□ Step 3: Save file
           
□ Step 4: Verify file exists:
           cat /Users/StevenStewart/SGS-CSC\ REMIX/public/README.md
```

**Template for public/README.md**:
```markdown
# Public Directory

This directory contains both generated and standalone files.

## ⚠️ Important: Know Which Files to Edit

### Generated Files (from NJK templates)
These files are built from `src/pages/*.njk`. **DO NOT edit directly.**

Run `npm run build` to regenerate these after editing the `.njk` source.

Check `meta/site-manifest.json` for the complete list of generated pages.

### Standalone Files (edit directly)
These files have no template source. Edit them directly:

- `ib/B2/B2.2.4 Recursion Visualisor.html`
- `ib/B4/LL_Visualisation.html`
- `ib/B4/BST_Visualisation.html`
- `ks3/year7/unit2/Online-behaviour.html`
- `ks3/year7/unit2/digital-footprint-app.html`
- `igcse/topic1/binary-addition-game.html`
- `igcse/topic1/binary_game.html`

### Separate Project
The React app in `ib/Learn Python Map/` is a separate project.
See its own README for build instructions.
```

---

### Procedure 2: Rename File with Spaces (REQUIRES USER APPROVAL)

> [!WARNING]
> **DO NOT execute this without explicit user approval.**
> Renaming files will break any external links to the old URL.

#### Pre-Rename Checklist

```
□ Step 1: Find ALL references to the current filename:
           grep -r "B2.2.4 Recursion Visualisor" /Users/StevenStewart/SGS-CSC\ REMIX/
           
□ Step 2: Note every file that references it:
           File 1: _________________________
           File 2: _________________________
           (etc.)
           
□ Step 3: Get explicit user approval to proceed
```

#### Rename Steps (ONLY after approval)

```
□ Step 4: Rename the file:
           mv "/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/B2.2.4 Recursion Visualisor.html" \
              "/Users/StevenStewart/SGS-CSC REMIX/public/ib/B2/recursion-visualizer.html"
           
□ Step 5: Update EVERY reference found in Step 2:
           For each file, replace "B2.2.4 Recursion Visualisor.html"
           with "recursion-visualizer.html"
           
□ Step 6: Verify the page loads at new URL:
           Open: file:///Users/StevenStewart/SGS-CSC%20REMIX/public/ib/B2/recursion-visualizer.html
           
□ Step 7: Verify all internal links to it work:
           Open pages that link to it and click the links
```

> [!IMPORTANT]
> **PAUSE POINT**: Do NOT rename multiple files at once. Complete verification for each file before proceeding.

---

## DO NOT List

> [!WARNING]
> **Things AI agents must NEVER do with directory structure:**
> - ❌ Move files without updating ALL internal links
> - ❌ Delete any files or directories
> - ❌ Rename generated files (rename the .njk source instead)
> - ❌ Make URL changes without user approval (breaks bookmarks)
> - ❌ Modify node_modules/ in any way
> - ❌ Move the Learn Python Map folder without understanding its build

---

## Verification Commands

### Check if a file is generated or standalone
```bash
# Check manifest for a file
grep "recursion" /Users/StevenStewart/SGS-CSC\ REMIX/meta/site-manifest.json

# Check for NJK source
ls /Users/StevenStewart/SGS-CSC\ REMIX/src/pages/ib/B2/*.njk
```

### Find all references to a file before moving
```bash
# Find all occurrences of a filename in the codebase
grep -r "filename.html" /Users/StevenStewart/SGS-CSC\ REMIX/ --include="*.html" --include="*.njk" --include="*.md"
```

### Count files after changes
```bash
# Compare file counts before/after
find /Users/StevenStewart/SGS-CSC\ REMIX/public -name "*.html" | wc -l
```

---

## Safe Operations

| Operation | Safe? | Notes |
|-----------|-------|-------|
| Add new file | ✓ Yes | Follow naming conventions |
| Add README.md | ✓ Yes | Informational only |
| Rename standalone HTML | ⚠️ Needs approval | Must update all links |
| Move files to subdirectory | ⚠️ Needs approval | URL changes |
| Delete empty directories | ⚠️ Needs approval | May be placeholders |
| Delete any other files | ❌ No | Archive instead |
