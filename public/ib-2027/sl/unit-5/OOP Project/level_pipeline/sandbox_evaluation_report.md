# Sandbox Evaluation Report: Sigma-7 Level QA Pipeline

**Date**: 2026-01-12
**Status**: 11/11 Levels Verified (PASS)

## 1. Executive Summary
The goal of this sandbox evaluation was to establish a robust Automated QA Pipeline to verify that each game level (`level_a` through `level_i`) functions as a self-contained "black box".

**Key Achievement**: We confirmed that early levels (A, B) initially **FAILED** to run when isolated, due to hidden dependencies on future content (e.g., Level A's engine pre-loading Level B's `Brute` class). We successfully developed and verified patches for the Game Engine (`game_loop.py`) to allow these levels to run gracefullly with *only* the code expected from the student at that stage.

## 2. Methodology
The pipeline (`pipeline_runner.py`) performs the following for each level:
1.  **Sandbox Isolation**: Copies the level's `downloads` folder to a temporary sandbox.
2.  **Solution Injection**: Injects the *precise* solution code expected for that level (e.g., a simple `Player` for Level A, vs a complex `Player` with Inventory for Level D).
3.  **Validation**: Runs the level's specific `validate.py` script.
4.  **Game Launch Simulation**: Runs `run_game.py` and interacts with the process (sends inputs like "Tester", "1", etc.) and monitors for crashes or exit codes.

## 3. Critical Findings & Fixes

### A. The "Future Code" Dependency (Level A & B)
*   **Observation**: When running Level A with only the basic `Player` class (as per teacher guide), `run_game.py` crashed immediately.
*   **Error**: `ImportError: cannot import name 'Brute' from 'student.player_types'`.
*   **Root Cause**: The Game Engine (`game_loop.py`) was hard-coded to import `Brute` and `Scout` for the character creation screen, functionalities that don't exist until Level B.
*   **Fix Implemented**: Modified `game_loop.py` (for Levels A/B/C) to wrap these imports in `try/except` blocks. If subclasses are missing, the engine now skips the class selection screen and defaults to the base `Player`. A generic "Level Complete" message is shown to indicate success.

### B. The "Inventory" Crash (Level A & B)
*   **Observation**: Even after fixing the import error, picking up an item in Level A caused a crash.
*   **Error**: `AttributeError: 'Player' object has no attribute 'inventory'`.
*   **Root Cause**: The engine's item pickup logic assumed `player.inventory` always exists. In Level A, the `Player` class implementation (correctly) has `self.inventory = None`.
*   **Fix Implemented**: Added guards to `_take_handler`, `_handle_hidden_item`, and `_chest_handler` in `game_loop.py`:
    ```python
    if getattr(self.player, 'inventory', None) is None:
        print("You verify the item but have no inventory yet.")
        return
    ```

### C. Solution Precision
*   **Observation**: Earlier pipeline runs passed Level A because we were injecting the *Final* `Player` class (which includes Inventory). This masked the fact that the *actual* student code (without Inventory) would fail.
*   **Fix Implemented**: Refactored `solutions.py` to contain progressive versions of the code (`PLAYER_A_PY` vs `PLAYER_D_PY` vs `PLAYER_FINAL_PY`). The pipeline now injects the exact version corresponding to the level being tested.

## 4. Final Verification
After applying these patches to the sandbox engine files:
*   **Level A**: Runs with bare-minimum Player. Shows "LEVEL A COMPLETE" message.
*   **Level B**: Runs with Player + Subclasses.
*   **Level D**: Validation passes strict checks for `use_item` logic (healing + consumption).
*   **All Levels**: `validate.py` and `run_game.py` execute without error.

## 5. Next Steps
Applying the verified patches from the sandbox (`level_pipeline/sandbox/...`) to the main codebase (`public/ib-2027/...`) to ensure student downloads match the robust "black box" standard.
