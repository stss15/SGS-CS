README_00_HOW_THIS_PROJECT_WORKS.md

1) Purpose

This project is a Python text-adventure used to teach and practise object-oriented programming through a sequence of self-contained “levels”.

Each level:
	•	has a student-facing HTML worksheet (instructions, UML, maps, tasks)
	•	ships as a downloadable PyCharm project folder
	•	is validated by running validate.py
	•	is signed off and then replaced by a clean teacher reference baseline for the next level

This repository contains the specifications required to build:
	•	the final game target (kept deliberately modest)
	•	the per-level downloadable folders
	•	the website worksheets that guide students without giving them code

⸻

2) What we are building (Final Game in plain English)

A small, immersive, text-based adventure where the player:
	•	is created by choosing a name and a player type
	•	can move between rooms, look around, and interact with objects
	•	can pick up and use items via an inventory
	•	can talk to simple non-player characters (NPCs) for guidance
	•	can trigger a small “encounter” sequence (engine-controlled loop; student code provides hooks)
	•	can save and load a basic game state as text (checkpoint style)

Final game feature list (deliberately constrained)

Core gameplay features:
	•	Commands: look, move, interact, take, use, talk, inventory, status, help
	•	Rooms: a small map of rooms with descriptions and exits
	•	Objects: doors/chests/terminals/items with simple interactions
	•	Inventory: add/remove/list items; optional capacity rule
	•	NPC talk: single-step or short branching dialogue (engine-owned)
	•	Encounter hook: a simple, turn-based interaction (engine-owned); the player object supplies decisions/actions via a defined interface
	•	Save/load: text-based checkpoint file with error handling

Non-features (by design):
	•	no sprawling RPG stat systems
	•	no complex equipment trees
	•	no open-world branching state machines
	•	no “undo” system that rewinds inventories, battles, and world state

⸻

3) Delivery model (Website worksheets + Downloadable level folders)

Website (student-facing HTML worksheets)

For each level, the website hosts an HTML worksheet that includes:
	•	the story context and objective for that level
	•	keywords/definitions (e.g., what a class is, what inheritance means)
	•	UML diagrams and relationship diagrams
	•	required method names and parameters written as plain text
	•	step-by-step tasks and acceptance criteria
	•	visuals of the map/room layout (images or diagrams)
	•	a download link for that level’s project folder

Strict rule: worksheets contain zero Python code (no snippets, no method skeletons, no examples).

Downloadable level folders (PyCharm projects)

Each level download is a self-contained folder students open in PyCharm. It includes:
	•	a teacher-owned engine for that level
	•	student-editable files that start blank (comments allowed, no pre-written method/class skeletons)
	•	validate.py to confirm correctness
	•	optional run_game.py to play the level scenario

Strict rule: each level download contains only what is needed for that level. No future maps, no future assets, no future code.

⸻

4) Hard rules (do’s and don’ts)

Do
	•	Keep the engine stable and teacher-owned.
	•	Make students write their classes from scratch using UML and written method signatures.
	•	Use validation to enforce interface correctness (method names, parameters, required attributes).
	•	Package each level so students cannot browse future content.
	•	Keep the final game target modest and achievable.

Don’t
	•	Don’t include any Python code in worksheets (not even “example” code).
	•	Don’t ship future content inside earlier levels.
	•	Don’t scaffold student files with def ...: pass or pre-written class shells.
	•	Don’t design mechanics that force heavy state tracking (complex undo, branching world state, deep RPG).
	•	Don’t embed algorithm analysis (e.g., Big O) into the game’s mechanics.

⸻

5) Roles and responsibilities (Teacher/engine vs Student code)

Teacher-owned (engine)

The engine is responsible for:
	•	the command parser and main loop
	•	the room/map system for the current level
	•	object/NPC/enemy definitions for the current level
	•	calling student code through stable interfaces
	•	controlling any encounter loops (if present in that level)
	•	loading/saving (when introduced)

Students should not edit engine files.

Student-owned code

Students write only the components specified by the worksheet for that level, typically:
	•	a class (or small set of classes) defined by UML and required method signatures
	•	logic inside those methods to meet the behaviour requirements
	•	minimal helper functions inside student modules if allowed by that level spec

Students do not write the main loop. They implement classes that plug into it.

⸻

6) Level progression model (no level numbers; explain “current level only” packaging + reference-solution baseline for next level)

This project progresses through a series of levels that are independent deliverables.

Key progression principles:
	•	Current level only: each downloadable folder includes only the map, assets, and engine features required for that level.
	•	No carry-forward student code: once a level is signed off, the next level starts from a teacher reference solution baseline (sanitised, correct, and compatible).
	•	Peel-back design: the final game is defined first (modest target), then split into levels by removing student-owned components and reintroducing them gradually.

Why reference baselines matter:
	•	student method naming/signature drift breaks future integration
	•	reference baselines guarantee the next level runs consistently
	•	each level can be assessed cleanly with a validator without dragging old mistakes forward

A student may keep their own personal “complete build” separately, but classroom progression uses the teacher baseline per level.

⸻

7) Validation and sign-off (what validate.py checks and how it’s used)

Each level includes a validate.py script that students run locally.

What validate.py checks
	1.	Interface checks

	•	required classes exist
	•	required method names exist
	•	method parameter counts match the spec
	•	required attributes exist after object construction

	2.	Behaviour checks

	•	small scripted scenarios appropriate to the level
	•	checks rely on return values and state, not only printed output
	•	failures produce explicit messages (what failed and why)

	3.	Optional guardrails (if enabled)

	•	verify engine files were not edited (hash check)
	•	verify forbidden imports are not used (policy-driven)

How validation is used
	•	Students run validate.py before asking for help.
	•	Passing validation is the sign-off condition for that level.
	•	Only after sign-off do students move on to the next downloadable folder.

⸻

8) Scope guardrails (how we prevent overcomplexity; what we explicitly will NOT do)

This project will fail if it becomes “a real game engine” rather than a teaching tool. Guardrails:

Guardrails
	•	Keep the final game features small and consistent (movement, interaction, inventory, simple talk, simple encounters, basic save/load).
	•	Prefer simple, testable contracts over clever mechanics.
	•	Avoid systems that require tracking every world mutation across time.
	•	Introduce features only when they are directly teachable and validate-able.

Explicitly not doing
	•	complex undo/redo across world state (inventory, battles, NPC state)
	•	deep RPG mechanics (skill trees, crafting systems, large stat matrices)
	•	large branching narratives with persistent flags everywhere
	•	procedural generation
	•	networked or cloud storage
	•	complicated UI layers beyond plain text output
	•	algorithm analysis as game mechanics

Algorithms and trace tables:
	•	handled outside the game (lesson starters, drills), or
	•	optionally included as worksheet questions after a level,
	•	but not required as core game mechanics.

⸻

9) Document map (list the rest of the README/spec files and what each one is for)
	•	README_01_PYTHON_FEATURES_ALLOWED.md
Definitive list of Python constructs allowed/required in the game build. If it is not listed, it must not be introduced.
	•	README_02_OOP_FEATURES_REQUIRED.md
Definitive list of OOP concepts/features that must appear in the game as design requirements (phrased as game requirements, not syllabus).
	•	README_03_FINAL_GAME_SPEC.md
The final game target: narrative frame, command vocabulary, entities, save/load rules, output style, map visual rules.
	•	README_04_LEVEL_BREAKDOWN.md
The sequence of levels (unnumbered in writing), what students build each time, what the validator checks, and what is packaged.
	•	README_05_VALIDATION_FRAMEWORK.md
How validate.py is structured, what it checks, how errors are reported, and optional guardrails (hash/import checks).
	•	README_06_LEVEL_PACKAGING_RULES.md
Rules to ensure each download contains only current-level content, and how to avoid leaking future solutions.
	•	README_07_WEBSITE_WORKSHEET_SPEC.md
Specification for student-facing HTML worksheet pages: allowed content, forbidden content (no Python code), page template, visuals, download links.
	•	README_08_LEVEL_LOCAL_README_TEMPLATE.md
Template and content rules for the README_LEVEL.md that ships inside every downloadable level folder.

⸻
