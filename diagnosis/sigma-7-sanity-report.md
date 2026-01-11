# Sigma-7 OOP Project Sanity Report (IB 2027 Unit 5)
Date: 2026-01-11
Version context: v2.0 (Immersion Update) per handover

## Scope and method
- Reviewed downloads for levels A-I, P1, P2 under `public/ib-2027/sl/unit-5/OOP Project/downloads/`.
- Compared ZIP contents with folder contents.
- Compared download engines with `public/ib-2027/sl/unit-5/OOP Project/level_x_final_game/engine`.
- Ran `python3 validate.py` in each level with a validator.
- Scanned hints for code giveaways.
- Checked website instructions under `src/pages/ib-2027/sl/unit-5/oop-project/` for alignment with downloads.
- Attempted `run_game.py` for Level I (timed out because gameplay is interactive and requires continuous input). No full interactive playthroughs were completed.

## High-level summary (risk ordered)

### Critical
1) Missing `student_reference/` in every download that uses the full engine (levels E-I). This causes the game to exit during character creation/load because the engine imports `student_reference`, not `student`.
2) Level E ("no new code") and Level F use rooms with combat encounters, but `Player` at those levels does not implement `choose_action` / `compute_damage`. Encounter code calls `compute_damage` unguarded, so exploration can crash.

### Major
1) Duplicate menu printing is back: some student templates print options even though the engine prints options. This conflicts with the "engine prints options" rule and causes double menus.
2) Several hints and website instructions teach outdated method signatures or behavior (e.g., returning action strings vs 0-based index, printing options in student code).
3) Level P1 validator passes even when student methods are still `pass` because it does not assert failures on incorrect results.
4) Full P1/P2 solution code is already present in Level E-I student folders, creating answer leakage before those tasks.
5) Combat defense appears to apply armor reduction twice for defending enemies (balance/logic bug).

### Minor
1) ZIPs include `__pycache__/` and one `.DS_Store`.
2) Minor doc string mismatch about `student_reference` in engine `__init__.py` vs download engines.

## Detailed findings

### F-001 (Critical) Missing `student_reference` in downloads
- Evidence: Engine imports `student_reference` during character creation and load:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_e_exploring/engine/game_loop.py:167`
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_e_exploring/engine/game_loop.py:715`
  - Same in Level F/G/H/I (shared engine).
- Evidence: No `student_reference/` directory exists in downloads.
- Impact: `run_game.py` fails at character creation or load, regardless of student code.
- Notes: `level_x_final_game` includes `student_reference/`, but it is not copied into downloads.

### F-002 (Critical) Level E/F encounter triggers require Level G methods
- Evidence: Level E/F rooms include encounters:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_e_exploring/engine/content/rooms.json:18`
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_f_npc_dialogue/engine/content/rooms.json:18`
- Evidence: Encounter manager calls `player.compute_damage` without `hasattr` guard:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_g_encounters/engine/encounter.py:183`
- Impact: Level E (no new code) and Level F can crash as soon as a combat encounter triggers because Player lacks `choose_action`/`compute_damage` before Level G.

### F-003 (Major) Duplicate menu printing in templates
- Evidence: Engine prints options for NPC and combat:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_h_save_load/engine/game_loop.py:668`
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_g_encounters/engine/encounter.py:145`
- Evidence: Student templates in Level H/I print options again:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_h_save_load/student/player.py:36`
- Impact: Students see duplicated option lists; conflicts with the intended "engine prints options" pattern.

### F-004 (Major) Hints teach outdated method signatures/behavior (Level F)
- Evidence: Hint 1 uses `respond_to_npc(self, npc_name, dialogue_tree)` and a dialogue tree dict, which does not match engine or template:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_f_npc_dialogue/hints/hint_1.txt:8`
- Impact: Students may implement a wrong method signature and fail validation or runtime.

### F-005 (Major) Hints teach outdated behavior (Level G)
- Evidence: Hints say `choose_action` returns a chosen action string and instruct printing options, but engine expects a 0-based index and prints options itself:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_g_encounters/hints/hint_1.txt:8`
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_g_encounters/hints/hint_2.txt:5`
- Impact: Students may implement the wrong return type and duplicate menu output.

### F-006 (Major) P1 validator does not fail on incorrect behavior
- Evidence: The validator only adds passes; it does not add fails when expectations are not met for most checks:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_p1_stacks_queues/validate.py:32`
- Observed: Level P1 passed validation even though student methods are all `pass`.
- Impact: Students can pass validation without correct implementations.

### F-007 (Major) Solution leakage in Level E-I student folders
- Evidence: Level E-I include full implementations for data structures and log search:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_e_exploring/student/data_structs.py`
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_e_exploring/student/log_search.py`
- Impact: Later-level challenge answers are exposed before P1/P2.

### F-008 (Major) Combat defend damage applies armor twice (defense over-nerfs)
- Evidence: `compute_damage` is already called with doubled armor while defending, then `enemy.take_damage` applies armor again when `is_defending`:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_g_encounters/engine/encounter.py:183`
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_g_encounters/engine/encounter.py:69`
- Impact: Defending enemies take less damage than intended (extra armor reduction).

### F-009 (Minor) ZIPs include `__pycache__` and one `.DS_Store`
- Evidence: All ZIPs include `__pycache__/` and .pyc files; Level I includes `.DS_Store`.
- Impact: Clutter and potential confusion for students (not functional breakage).

### F-010 (Minor) Engine doc string mismatch
- Evidence: Engine `__init__.py` in level_x_final_game references `student_reference`, but some downloads say only `student/`:
  - `public/ib-2027/sl/unit-5/OOP Project/level_x_final_game/engine/__init__.py`
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_e_exploring/engine/__init__.py`
- Impact: Documentation mismatch.

## Validator results (baseline templates)
- Level A: FAIL (expected, Player is `pass`).
- Level B: FAIL (expected, Brute/Scout are `pass`).
- Level C: FAIL (expected, Inventory is `pass`).
- Level D: FAIL (expected, Inventory.consume and Player.use_item missing).
- Level E: No validator.
- Level F: FAIL (expected, respond_to_npc missing).
- Level G: FAIL (expected, choose_action/compute_damage missing).
- Level H: FAIL (expected, to_save_data/from_save_data missing).
- Level I: PASS (expected, completed solution).
- Level P1: PASS (unexpected, validator missing failure assertions).
- Level P2: FAIL (expected, load_logs_from_file and others missing).

## Website vs downloads alignment

### Level F website vs engine behavior
- Website instructs students to display options, but engine already prints options.
- Evidence: `src/pages/ib-2027/sl/unit-5/oop-project/level-f-npcs.njk:184`.

### Level G website vs engine behavior
- Website instructs students to display options; engine already prints options.
- Evidence: `src/pages/ib-2027/sl/unit-5/oop-project/level-g-encounters.njk:149`.

### Missing feature mentions on the site
- No references to critical hit bonus, ASCII maps, typewriter effects, or help/partial matching tips in the .njk pages.
- Evidence: `src/pages/ib-2027/sl/unit-5/oop-project/` (no matches for "critical", "ASCII", "map", "typewriter", "help", "partial").

### Level G README vs template
- README does not mention bonus `calculate_critical_hit` method.
- Evidence: `public/ib-2027/sl/unit-5/OOP Project/downloads/level_g_encounters/README.md`.

## Hint system giveaways (beyond allowed lambda/enumerate examples)

### Level F
- Hint 3 provides almost complete method implementation for `respond_to_npc`.
- Evidence: `public/ib-2027/sl/unit-5/OOP Project/downloads/level_f_npc_dialogue/hints/hint_3.txt:5`.

### Level G
- Hint 3 provides complete implementations for `choose_action` and `compute_damage`, plus a full `calculate_critical_hit` example.
- Evidence: `public/ib-2027/sl/unit-5/OOP Project/downloads/level_g_encounters/hints/hint_3.txt:11`.

### Level H
- Hint 3 provides near-complete `to_save_data` and `from_save_data` structures with explicit attribute assignments.
- Evidence: `public/ib-2027/sl/unit-5/OOP Project/downloads/level_h_save_load/hints/hint_3.txt`.

### Level D
- Hint 2 provides the full `consume` implementation (`return self.remove(item_name)`).
- Evidence: `public/ib-2027/sl/unit-5/OOP Project/downloads/level_d_item_use/hints/hint_2.txt:7`.

### Level P2
- Hint 3 provides a near-complete `load_logs_from_file` skeleton and explicit parsing steps.
- Evidence: `public/ib-2027/sl/unit-5/OOP Project/downloads/level_p2_log_search/hints/hint_3.txt:5`.

### Level A/B/C
- Hints include code snippets and method outlines (partial but still close to code). These may be acceptable or might need trimming depending on strictness.
- Evidence examples:
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_a_player/hints/hint_2.txt:14`
  - `public/ib-2027/sl/unit-5/OOP Project/downloads/level_c_inventory/hints/hint_3.txt:11`

## Packaging integrity
- ZIP contents match their respective folder contents after stripping the leading folder name.
- ZIPs include cached files (`__pycache__/`, `.pyc`) and one `.DS_Store`.

## Engine propagation notes
- Levels A-D use minimal engines (expected), but they differ from `level_x_final_game/engine` by design. These need explicit confirmation that divergence is intentional.
- Levels E-I share the full engine but still import `student_reference`, which is missing from downloads. This is likely a propagation packaging issue.

## Additional observations
- `Level H` game loop uses `student_reference` for character creation and save/load, so student work in `student/` is not exercised in gameplay even if validation passes.

## Instructions for the next AI agent (plan and review only, no fixes yet)
1) Confirm the intended runtime source for player classes in downloads (student vs student_reference). Decide whether to copy `student_reference/` into downloads or update engine imports to use `student/`.
2) Decide how Level E and Level F should avoid combat dependency before Level G:
   - remove or delay encounters in those levels, or
   - add temporary combat stubs for earlier levels, or
   - gate encounters behind Level G.
3) Align website instructions and hint files with engine expectations (do not print options in student methods; return 0-based indices).
4) Audit hints across all levels to reduce solution giveaways. Keep enumerate/lambda examples only where explicitly allowed.
5) Fix Level P1 validator to fail when methods return incorrect results (or update expected behavior). Verify P2 validator still fails on stubs.
6) Remove P1/P2 solution leakage from Level E-I student folders if they are not meant to be provided early.
7) Confirm the combat defend damage logic (armor applied twice) and decide the correct intended behavior.
8) Rebuild ZIPs without `__pycache__/` and `.DS_Store`.
9) Re-run validators and a minimal smoke test after any changes.

## Open questions
- Should `student_reference` be shipped with every download, or should all engines import from `student/` only?
- Are Level E/F intended to be exploration-only (no encounters), or should combat stubs be provided earlier?
- How strict should hints be (no code at all vs partial skeletons)?

