---
name: repo-archive-cleanup
description: Use when triaging repository bloat and moving non-essential files into archive while preserving the current production build/deploy path.
---

# Repo Archive Cleanup

## When To Use

Use this skill for:
- Streamlining repo structure
- Archiving legacy files, scripts, docs, and generated artifacts
- Keeping only assets needed for active build/deploy and current site operations

## Keep Criteria

Keep files only if they are required to:
- Build current deployment output (`apps/site/dist`)
- Deploy with Firebase (`firebase.json`, `.firebaserc`)
- Edit active site content/source (`src`, `apps/site/src`, `packages`)
- Run active build scripts (`scripts/build.js`, active migration hardening/alias scripts)
- Maintain active site documentation and agent operations

## Archive Rules

- Move, do not delete, into dated archive trees under `archive/`.
- Preserve original relative structure inside archive for traceability.
- If uncertain, prefer archive over deletion.

## Required Post-Cleanup Validation

```bash
npm run framework:build
```

If build fails, restore only the minimal archived files required and rerun.

## Current Archive Namespace

Primary cleanup archive path in this repo:
- `archive/repo-cleanup-2026-02-07`
