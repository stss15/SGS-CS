# Deployment Plan: Sigma-7 Level Updates

**Date**: 2026-01-12
**Objective**: Update main codebase downloads with verified robust engines.

## 1. Engine Patches
The `game_loop.py` file must be updated in the following directories to include the robust "black box" logic (missing subclass handling + inventory guards).

*   **Source**: `public/ib-2027/sl/unit-5/OOP Project/downloads/level_a_player/engine/game_loop.py` (This file currently holds the verified patch in the main repo—I applied it during Verification).
*   **Targets**:
    *   `public/ib-2027/sl/unit-5/OOP Project/downloads/level_a_player/engine/game_loop.py` (Already done, verify only)
    *   `public/ib-2027/sl/unit-5/OOP Project/downloads/level_b_specialisation/engine/game_loop.py` (Must match Level A)
    *   `public/ib-2027/sl/unit-5/OOP Project/downloads/level_c_inventory/engine/game_loop.py` (Must match Level A)

*Note*: Levels D+ effectively have the full engine features unlocked by the student's expected progress, so they use the standard engine. However, propagating the robust engine is safe and recommended for consistency.

## 2. Hints & Instructions Check
Verify that the `hints` files in the download folders match the user's request for alignment with the teacher guide.
*   **Level A Hints**: Ensure they don't reference future concepts.
*   **Teacher Guide Alignment**: Ensure `level-a.njk` code matches the student expectation.

## 3. Zip File Regeneration
The `downloads/` folders are just directories. The user downloads them as `.zip` files.
*   **Action**: I must verify if there are pre-existing `.zip` files that need updating.
*   **Method**: `zip -r level_a_player.zip level_a_player/` etc.

## 4. Build & Deploy
*   **NJK Build**: Ensure the site builds correctly.
*   **Git Commit**: Commit all changes to the main branch.
