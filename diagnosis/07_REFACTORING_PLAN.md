# Master Refactoring Plan

> **Purpose**: Tiered implementation plan for improving the SGS-CS codebase developer experience while maintaining current functionality and appearance.

---

## ⚠️ CRITICAL Safety Rules for AI Agents

> [!CAUTION]
> **BEFORE starting ANY refactoring task:**
> 1. Create a git branch: `git checkout -b refactor/[task-name]`
> 2. Commit current state: `git add -A && git commit -m "Before refactoring"`
> 3. Take screenshots of key pages BEFORE changes
> 4. Run `npm run build` to verify baseline works
> 5. DO NOT proceed if build fails

> [!WARNING]
> **Golden Rule**: The site must look and work IDENTICALLY after refactoring.
> If ANY visual or functional difference is detected, IMMEDIATELY REVERT.

---

## Guiding Principles

1. **Zero visual/functional changes**: Site looks and works identically after refactoring
2. **Incremental approach**: Complete ONE file at a time, verify, then proceed
3. **Test after EVERY change**: Never batch multiple files without verification
4. **Immediate rollback**: If anything breaks, revert before continuing
5. **Document as you go**: Update docs to reflect new patterns

---

## Pre-Work Checklist (REQUIRED before any Tier)

```
□ Git is clean: git status shows no uncommitted changes
□ Create branch: git checkout -b refactor/[tier-name]
□ Baseline build works: npm run build completes without errors
□ Screenshot key pages (save to diagnosis/screenshots/before/):
  □ Homepage: public/index.html
  □ IGCSE Index: public/igcse/index.html
  □ Sample slide deck: public/igcse/topic1/1.1_number_representation.html
  □ Sample visualizer: public/ib/B2/B2.2.4 Recursion Visualisor.html
  □ Sample game: public/igcse/topic1/binary-addition-game.html
□ All screenshots saved
□ Commit baseline: git add -A && git commit -m "Baseline before refactoring"
```

> [!IMPORTANT]
> **STOP. Do not proceed until ALL items above are checked.**

---

## Tier 1: High Priority (Major Developer Impact)

### 1.1 Extract Inline CSS/JS from Top 5 Standalone Files

**Effort**: 1-2 days  
**Impact**: High  
**Risk**: Low (no template changes)

**Files to Process** (in exact order):

| Order | File | CSS Guide | JS Guide |
|-------|------|-----------|----------|
| 1 | `public/ks3/year7/unit2/Online-behaviour.html` | [01_CSS_DIAGNOSIS.md](./01_CSS_DIAGNOSIS.md) | [02_JS_DIAGNOSIS.md](./02_JS_DIAGNOSIS.md) |
| 2 | `public/ib/B2/B2.2.4 Recursion Visualisor.html` | [01_CSS_DIAGNOSIS.md](./01_CSS_DIAGNOSIS.md) | [02_JS_DIAGNOSIS.md](./02_JS_DIAGNOSIS.md) |
| 3 | `public/ib/B4/LL_Visualisation.html` | [01_CSS_DIAGNOSIS.md](./01_CSS_DIAGNOSIS.md) | [02_JS_DIAGNOSIS.md](./02_JS_DIAGNOSIS.md) |
| 4 | `public/ib/B4/BST_Visualisation.html` | [01_CSS_DIAGNOSIS.md](./01_CSS_DIAGNOSIS.md) | [02_JS_DIAGNOSIS.md](./02_JS_DIAGNOSIS.md) |
| 5 | `public/igcse/topic1/binary-addition-game.html` | [01_CSS_DIAGNOSIS.md](./01_CSS_DIAGNOSIS.md) | [02_JS_DIAGNOSIS.md](./02_JS_DIAGNOSIS.md) |

**Per-File Procedure**:
```
□ Step 1: Follow CSS extraction procedure in 01_CSS_DIAGNOSIS.md
□ Step 2: PAUSE and verify CSS extraction works
□ Step 3: Follow JS extraction procedure in 02_JS_DIAGNOSIS.md
□ Step 4: PAUSE and verify JS extraction works
□ Step 5: Test ALL interactive features
□ Step 6: Take screenshot (save to diagnosis/screenshots/after/)
□ Step 7: Compare before/after screenshots - MUST be identical
□ Step 8: Commit: git add -A && git commit -m "Extracted CSS/JS from [filename]"
□ Step 9: Proceed to next file ONLY if above passes
```

> [!IMPORTANT]
> **PAUSE after each file. Do NOT batch multiple files.**

**New Files Created**:
- `public/css/activity-online-behaviour.css`
- `public/css/visualizer-recursion.css`
- `public/css/visualizer-linked-list.css`
- `public/css/visualizer-bst.css`
- `public/css/game-binary-addition.css`
- `public/js/activity-online-behaviour.js`
- `public/js/visualizer-recursion.js`
- `public/js/visualizer-linked-list.js`
- `public/js/visualizer-bst.js`
- `public/js/game-binary-addition.js`

**Tier 1.1 Completion Checklist**:
```
□ All 5 files have CSS extracted
□ All 5 files have JS extracted
□ All 5 files load without errors
□ All interactive features work
□ Before/after screenshots match
□ Git commits for each file
□ Final commit: git add -A && git commit -m "Tier 1.1 complete"
```

---

### 1.2 Consolidate Agent Documentation

**Effort**: 0.5 days  
**Impact**: Medium  
**Risk**: Low (documentation only)

**Procedure**:
```
□ Step 1: Follow procedure in 04_DOCUMENTATION_DIAGNOSIS.md
□ Step 2: Create docs/agent/AGENT_GUIDE.md
□ Step 3: Update docs/ai-navigation.md
□ Step 4: Create docs/README.md
□ Step 5: Verify all internal links work
□ Step 6: Commit: git add -A && git commit -m "Consolidated agent documentation"
```

---

### 1.3 Add Source/Output Markers

**Effort**: 0.5 days  
**Impact**: Medium  
**Risk**: Low

**Procedure**:
```
□ Step 1: Follow procedure in 03_TEMPLATING_DIAGNOSIS.md (Procedure 1)
□ Step 2: Modify scripts/build.js to add GENERATED comment
□ Step 3: Run npm run build
□ Step 4: Verify marker in generated files:
           head -1 public/index.html
□ Step 5: Verify NO marker in standalone files:
           head -1 public/ib/B2/B2.2.4\ Recursion\ Visualisor.html
□ Step 6: Create public/README.md (see 05_DIRECTORY_STRUCTURE.md)
□ Step 7: Commit: git add -A && git commit -m "Added source/output markers"
```

---

## Tier 1 Completion Gate

> [!IMPORTANT]
> **MANDATORY VERIFICATION before proceeding to Tier 2:**

```
□ All Tier 1 tasks committed
□ npm run build succeeds
□ All 5 refactored files work correctly
□ Documentation updated
□ No visual changes to any page
□ Merge to main: git checkout main && git merge refactor/tier-1
□ Delete branch: git branch -d refactor/tier-1
```

---

## Tier 2: Medium Priority (Scalability)

### 2.1 Standardize Template Layouts

**Effort**: 2-3 days  
**Impact**: Medium  
**Risk**: MEDIUM - affects many pages

> [!CAUTION]
> **This task has higher risk. Extra verification required.**

**See**: [03_TEMPLATING_DIAGNOSIS.md](./03_TEMPLATING_DIAGNOSIS.md) for detailed procedure.

**Pre-Task Checklist**:
```
□ Create branch: git checkout -b refactor/tier-2-templates
□ List ALL pages using each template (commands in 03_TEMPLATING_DIAGNOSIS.md)
□ Have list of ALL pages to test after changes
```

---

### 2.2 Complete Breadcrumb Migration

**Effort**: 1 day  
**Impact**: Medium  
**Risk**: Low

**See**: [06_NAVIGATION_DIAGNOSIS.md](./06_NAVIGATION_DIAGNOSIS.md)

---

### 2.3 Standardize File Naming

**Effort**: 1-2 days  
**Impact**: Low-Medium  
**Risk**: MEDIUM - URL changes break external links

> [!WARNING]
> **Requires explicit user approval before starting.**
> URL changes can break bookmarks and external references.

**See**: [05_DIRECTORY_STRUCTURE.md](./05_DIRECTORY_STRUCTURE.md)

---

## Tier 3: Lower Priority (Nice to Have)

### 3.1-3.4: Future Improvements

These tasks are lower priority and should only be attempted after Tier 1 and 2 are complete and stable.

See individual diagnosis files for details if/when these are prioritized.

---

## Emergency Rollback Procedures

### If a single file is broken:
```bash
# Revert specific file
git checkout -- /Users/StevenStewart/SGS-CSC\ REMIX/public/[path-to-file]

# Delete any newly created files
rm /Users/StevenStewart/SGS-CSC\ REMIX/public/css/[new-file].css
rm /Users/StevenStewart/SGS-CSC\ REMIX/public/js/[new-file].js
```

### If build is broken:
```bash
# Revert to last working commit
git log --oneline -5  # Find last good commit
git checkout [commit-hash] -- .
npm run build  # Verify it works
```

### If entire tier is broken:
```bash
# Discard all changes and return to main
git checkout main
git branch -D refactor/[tier-name]

# Verify main works
npm run build
```

---

## Verification Commands Reference

```bash
# Build the site
npm run build

# Check for JavaScript syntax errors in new files
node --check public/js/[new-file].js

# Check for CSS syntax errors (basic)
cat public/css/[new-file].css | head -50

# Find all references to a file (before moving/renaming)
grep -r "filename" /Users/StevenStewart/SGS-CSC\ REMIX/ --include="*.html" --include="*.njk"

# Compare file counts
find public -name "*.html" | wc -l
find public/css -name "*.css" | wc -l
find public/js -name "*.js" | wc -l
```

---

## Summary: Safe Refactoring Workflow

```
1. CREATE BRANCH before starting
2. ONE FILE at a time
3. TEST after every change
4. SCREENSHOT before and after
5. COMMIT after each successful file
6. PAUSE if anything breaks
7. REVERT if you can't fix quickly
8. MERGE only when tier is complete
```
