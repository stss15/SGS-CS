# Documentation Diagnosis Report

> **Focus**: MD and TXT file sprawl, agent guidance conflicts, documentation organization

---

## Status (updated 2025-12-14)

- Consolidated entry points are in place:
  - `docs/agent/AGENT_GUIDE.md` (single “read first” entry point)
  - `docs/README.md` (documentation index)
  - `docs/ai-navigation.md` updated to point to the agent guide and reference `breadcrumbs` instead of `backLink`

## ⚠️ AI Agent Safety Rules

> [!CAUTION]
> **BEFORE making any changes to documentation:**
> 1. DO NOT delete any documentation files without explicit approval
> 2. DO NOT modify source content TXT files (`docs/igcse-content/`, `docs/ib-content/`)
> 3. DO NOT move files without updating all references to them
> 4. ARCHIVE rather than delete when consolidating

---

## Current State

### Documentation Structure (Absolute Paths)

```
/Users/StevenStewart/SGS-CSC REMIX/docs/
├── ai-navigation.md                    # AI agent cheatsheet
├── Year 7 Unit Plans/                  # 15 TXT files
├── agent/                              # 83 files
│   ├── README.md                       # Entry point for agents
│   ├── igcse-slide-deck-guide.md       # 20KB comprehensive guide
│   ├── plans/                          # 35 slide deck plans
│   ├── image-prompts/                  # 31 image generation prompts
│   └── templates/                      # 7 HTML/CSS templates
├── ib-content/                         # 30 files (textbook sources)
├── igcse-content/                      # 58 files (chapter content)
└── self marked questions/              # 40 files
```

---

## Issues Identified

### 🔴 Issue 1: Multiple Entry Points for Agent Guidance

**Current Entry Points** (agents may get confused):

| File | Absolute Path | Content |
|------|---------------|---------|
| ai-navigation.md | `/Users/StevenStewart/SGS-CSC REMIX/docs/ai-navigation.md` | High-level navigation |
| README.md | `/Users/StevenStewart/SGS-CSC REMIX/docs/agent/README.md` | Slide deck creation |
| Workflow | `/Users/StevenStewart/SGS-CSC REMIX/.agent/workflows/generate_slides.md` | Slide workflow |

### 🟠 Issue 2: Deprecated Information

**File with outdated content**:
- Path: `/Users/StevenStewart/SGS-CSC REMIX/docs/ai-navigation.md`
- Issue: References `backLink` which has been deprecated for `breadcrumbs`
- Line to update: "Password-protected links need `data-protected-password`..."

---

## Step-by-Step Procedures

### Procedure 1: Create Consolidated Agent Guide

#### Goal: Single entry point for all AI agents

```
□ Step 1: Create new file:
           /Users/StevenStewart/SGS-CSC REMIX/docs/agent/AGENT_GUIDE.md
           
□ Step 2: Add content (template below)
           
□ Step 3: Verify no broken links in the new guide
           
□ Step 4: Update docs/ai-navigation.md to reference the new guide
```

**Template for AGENT_GUIDE.md**:
```markdown
# AI Agent Guide for SGS-CS Website

> **Read this first before making any changes to the codebase.**

## Quick Reference

### What Type of Content Are You Creating?

| Content Type | Source Location | Output Location | Template |
|--------------|-----------------|-----------------|----------|
| Standard page | `src/pages/*.njk` | `public/*.html` | base.njk |
| Slide deck | `src/pages/*.njk` | `public/*.html` | slide-deck.njk |
| Game/Visualizer | `public/*.html` (direct) | Same | None |

### Key Commands

```bash
# Build the site (REQUIRED after template changes)
npm run build

# The build writes to:
# - public/ (HTML files)
# - meta/site-manifest.json (page manifest)
```

### Critical Rules

1. **NEVER edit HTML files in public/ if they have a .njk source**
   - Check: `grep -r "filename" src/pages/`
   - If found, edit the .njk file instead

2. **ALWAYS run npm run build after template changes**

3. **DO NOT add inline CSS/JS to new files**
   - Use existing files in public/css/ and public/js/

4. **Use breadcrumbs (not backLink) for navigation**

### Detailed Guides

- [Slide Deck Creation](./igcse-slide-deck-guide.md)
- [Codebase Navigation](../ai-navigation.md)
- [Slide Workflow](../../.agent/workflows/generate_slides.md)

### Diagnosis Reports

See `/diagnosis/` folder for detailed codebase analysis.
```

```
□ Step 5: Save the file
           
□ Step 6: Verify file exists:
           cat /Users/StevenStewart/SGS-CSC\ REMIX/docs/agent/AGENT_GUIDE.md
```

> [!IMPORTANT]
> **PAUSE POINT**: Read through the guide to ensure it's accurate.

---

### Procedure 2: Update Deprecated Documentation

#### Fix ai-navigation.md

```
□ Step 1: Open file:
           /Users/StevenStewart/SGS-CSC REMIX/docs/ai-navigation.md
           
□ Step 2: Find any references to backLink
           
□ Step 3: Update to reference breadcrumbs instead:
           
           BEFORE: "Place shared assets... avoid page-specific inline CSS/JS unless scoped via headContent/inlineScripts."
           AFTER: "Place shared assets... avoid page-specific inline CSS/JS. Use breadcrumbs (not backLink) for navigation."
           
□ Step 4: Add link to diagnosis folder:
           "## Codebase Diagnosis\nSee `diagnosis/` folder for detailed analysis and refactoring plans."
           
□ Step 5: Save file
```

---

### Procedure 3: Create Documentation Index

```
□ Step 1: Create new file:
           /Users/StevenStewart/SGS-CSC REMIX/docs/README.md
           
□ Step 2: Add content:

# Documentation Index

## For AI Agents
- [Quick Start](agent/AGENT_GUIDE.md) - Read this first
- [Navigation Cheatsheet](ai-navigation.md) - Codebase structure
- [Slide Deck Guide](agent/igcse-slide-deck-guide.md) - Creating slides

## Codebase Diagnosis
- [Diagnosis Reports](../diagnosis/) - Refactoring analysis and plans

## Course Content (DO NOT EDIT without approval)
- [IGCSE Content](igcse-content/) - Chapter text and keywords
- [IB Content](ib-content/) - Textbook content
- [KS3 Unit Plans](Year 7 Unit Plans/) - Lesson plans

## Workflows
- [Generate Slides](../.agent/workflows/generate_slides.md)

□ Step 3: Save file
           
□ Step 4: Verify all links are valid:
           - Check each linked file exists
           - DO NOT fix broken links by deleting content
```

---

## DO NOT List

> [!WARNING]
> **Things AI agents must NEVER do with documentation:**
> - ❌ Delete content source files (TXT files in igcse-content, ib-content)
> - ❌ Move files without updating all references
> - ❌ Modify slide deck plans without checking if slides are already built
> - ❌ Remove "outdated" documentation without archiving first
> - ❌ Combine multiple docs files into one without explicit approval

---

## Verification Checklist

After any documentation changes:

```
□ All internal links work (manually check each)
□ No duplicate/conflicting instructions between files
□ Content source files (TXT) are untouched
□ git diff shows only expected changes
```

---

## Files Safe to Modify

| File | Safe to Update? | Notes |
|------|-----------------|-------|
| `docs/ai-navigation.md` | ✓ Yes | Update for accuracy |
| `docs/agent/README.md` | ✓ Yes | Expand as needed |
| `docs/agent/plans/*.md` | ✓ Yes | Add status markers |
| `docs/igcse-content/**/*.txt` | ❌ No | Source content |
| `docs/ib-content/**/*.txt` | ❌ No | Source content |
| `docs/content/ks3/**/*.txt` | ❌ No | Source content |
