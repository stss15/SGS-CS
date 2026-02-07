# Framework Branch Setup

Date: 2026-02-06

## Purpose

Use a dedicated long-lived migration branch in this repository for framework rollout.

## Active Branch

- `codex/framework-full-migration`

## Setup Steps

1. Refresh local `main`:

```bash
git checkout main
git pull origin main
```

2. Create or switch to migration branch:

```bash
git checkout -b codex/framework-full-migration
# or, if it already exists
git checkout codex/framework-full-migration
```

3. Confirm branch and working state:

```bash
git branch --show-current
git status --short --branch
```

4. Run migration guardrails before framework route work:

```bash
npm run migration:baseline-routes
npm run migration:route-parity
npm run migration:route-parity:pilot
```

5. Push branch for collaboration:

```bash
git push -u origin codex/framework-full-migration
```

## Optional GitHub CLI Re-auth

If `git push` or `gh` commands fail due auth state:

```bash
gh auth login -h github.com
gh auth status
```
