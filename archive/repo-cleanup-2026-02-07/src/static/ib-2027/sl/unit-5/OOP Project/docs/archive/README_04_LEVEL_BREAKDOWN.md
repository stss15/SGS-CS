README_04_LEVEL_BREAKDOWN.md

Purpose

This document defines the level progression for the Python text-adventure OOP project.

Levels are not numbered. Each level is referred to by a short name (e.g., "Preflight: OOP Intro", "Foundation: Player"). Each level is a self-contained deliverable with:
	•	a student-facing HTML worksheet (no Python code)
	•	a downloadable PyCharm folder containing only that level's content (except Preflight which is website-only)
	•	a validate.py that confirms interface + behaviour for that level
	•	a stable teacher-owned engine for that level

Core progression principle:
	•	Start from the Final Game target (modest scope), then peel it back into levels.
	•	Students do not carry their own code forward into future level folders. Each new level begins from a teacher reference baseline for all previously completed parts, to prevent integration drift.

Theme: Abandoned Research Facility

All levels use a consistent "abandoned research facility" setting. Room names include:
	•	Airlock
	•	Main Corridor
	•	Storage Cage
	•	Lab Bench
	•	Control Terminal

⸻

Delivery pattern per level (fixed)

Each level must ship with:
	•	Website worksheet page:
	•	objective, keywords, UML, method names + parameters (plain text), acceptance criteria, map visual
	•	no Python code
	•	link to download the level folder
	•	Downloadable folder:
	•	engine subset required for that level only
	•	current level's map/rooms/assets only
	•	student-editable files for that level only (blank; comments allowed; no method/class skeletons)
	•	validate.py (clear PASS/FAIL + actionable errors)
	•	optional run_game.py (play the current level scenario)

Exception: Preflight is website-only (no download).

⸻

Level sequence overview

Preflight — OOP Intro: Classic Examples (Teacher-Led)

Goal: Warm up students with classic OOP concepts before diving into the game. Teacher-led, no download.

Format
	•	Website worksheet only (no PyCharm download)
	•	3–4 short teacher-led exercises using familiar real-world examples
	•	Students follow along in a shared environment or their own scratch files

Content (classic examples)
	1.	Library Book class
	•	Attributes: title, author, is_checked_out
	•	Methods: check_out(), return_book(), get_info()
	•	Demonstrates: class, object, constructor, instance attributes, methods
	2.	Car class
	•	Attributes: make, model, fuel_level
	•	Methods: drive(distance), refuel(amount), get_status()
	•	Demonstrates: state changes, validation (fuel cannot go negative)
	3.	Student and Teacher classes (inheritance intro)
	•	Base: Person with name, age
	•	Student adds: grade, get_grade()
	•	Teacher adds: subject, get_subject()
	•	Demonstrates: inheritance, super(), method additions
	4.	Bank Account (encapsulation)
	•	Private balance via _balance
	•	Methods: deposit(amount), withdraw(amount), get_balance()
	•	Demonstrates: protected state, controlled updates

Teacher notes
	•	Run these as live coding in front of class
	•	Let students predict outcomes before running
	•	No validation required — this is warmup
	•	Each example takes ~15 minutes

Worksheet sections
	•	Objectives, keywords table, concept explanations
	•	Exercise steps (what the teacher will demonstrate)
	•	Space for student notes/predictions
	•	Exit ticket questions (conceptual, not code)

Progression note
	•	This is the only level without a download
	•	Students do not submit anything for Preflight
	•	Preflight prepares students for Level A

⸻

Level A — Foundation: Player Class and Basic Commands

Goal: Students create the first class and see it used by the engine.

Student builds
	•	Player class from UML with:
	•	Attributes: name (str), health (int)
	•	Methods: get_status() -> str, take_damage(amount) -> None, heal(amount) -> None
	•	Validation: health must not go below 0 or above max_health

Engine provides
	•	command loop (very small)
	•	help, status, look (minimal version)
	•	a single-room "Airlock" with static description

Acceptance criteria
	•	Player object can be created and displayed via status
	•	take_damage clamps health at 0
	•	heal clamps health at max_health

Validation focus
	•	class exists, constructor works
	•	required attributes created with correct initial values
	•	methods exist with correct parameter counts
	•	behaviour checks for clamping

Packaging rule
	•	Only one room and no future entities/assets.

⸻

Level B — Player Types: Inheritance and Overriding

Goal: Introduce inheritance and polymorphism without expanding the world.

Student builds
	•	Two subclasses of Player:
	•	Brute — overrides get_starting_stats() to return {"health": 120, "armour": 2, "accuracy": 70}
	•	Scout — overrides get_starting_stats() to return {"health": 80, "armour": 0, "accuracy": 95}
	•	Both subclasses inherit from Player
	•	Overridden method: get_starting_stats() -> dict

Engine provides
	•	player-type selection at start ("Choose: Brute or Scout")
	•	engine calls get_starting_stats() through the base interface
	•	identical single-room environment reused from Level A

Acceptance criteria
	•	choosing Brute produces different stats than Scout
	•	base-class interface remains consistent
	•	subclasses can be instantiated with just name parameter

Validation focus
	•	subclasses exist and inherit from Player
	•	get_starting_stats() returns dict with required keys
	•	values differ between subclasses

Packaging rule
	•	No new world complexity; keep the environment identical so focus stays on inheritance.

⸻

Level C — Inventory: Composition and Controlled Updates

Goal: Add a "has-a" relationship and reinforce encapsulation.

Student builds
	•	Inventory class from UML:
	•	Attributes: _items (list, internal)
	•	Methods: add(item_id) -> bool, remove(item_id) -> bool, list_items() -> list, has_item(item_id) -> bool
	•	integration into Player via composition (Player creates an Inventory in __init__)

Engine provides
	•	one room containing 1–2 takeable items (Keycard, Torch)
	•	take <item> and inventory commands (engine calls student code)
	•	Items are engine-owned; students only store item IDs

Acceptance criteria
	•	items can be taken and appear in inventory listing
	•	invalid actions handled cleanly (e.g., taking missing item returns False)
	•	Player.inventory is an Inventory object

Validation focus
	•	Inventory interface and behaviours
	•	Player has Inventory created correctly
	•	controlled state changes (add returns True on success, False on duplicate)

Packaging rule
	•	Only the current items exist; no future item types or maps.

⸻

Level C+ — Terminal Puzzle: Stacks and Queues (Data Structures Segment)

Goal: Teach stack and queue ADTs in a self-contained puzzle context.

Context
	•	This segment exists within the same project but does not alter the main game progression.
	•	Validator checks Stack/Queue classes exist and behave correctly.
	•	Main game can run without these classes.

Student builds

Stack class (LIFO):
	•	Attributes: _items (list, internal)
	•	Methods: push(item) -> None, pop() -> item or None, peek() -> item or None, is_empty() -> bool
	•	Implemented using Python list (append/pop from end)

Queue class (FIFO):
	•	Attributes: _items (deque, internal)
	•	Methods: enqueue(item) -> None, dequeue() -> item or None, front() -> item or None, is_empty() -> bool
	•	Implemented using collections.deque

Engine provides
	•	A "Terminal" object in the Control Terminal room
	•	Terminal presents a simple puzzle: "process these commands in order" (queue) or "undo these actions" (stack)
	•	Puzzle is optional but validator checks class implementation

Acceptance criteria
	•	Stack operations behave as LIFO
	•	Queue operations behave as FIFO
	•	Empty operations return None (no exceptions)

Validation focus
	•	class existence and method signatures
	•	push/pop/enqueue/dequeue behaviour with fixed test data
	•	empty-case handling

Packaging rule
	•	Same download as Level C or separate mini-download
	•	Does not add new rooms or core game features

⸻

Level D — Interactions: Objects and Simple Targeting

Goal: Teach object interaction without building a large object system.

Decision: Option 2 — Player/Inventory methods for using items (engine-owned Item classes)

Student builds
	•	Player method: use_item(item_id, target) -> str
	•	Inventory method: consume(item_id) -> bool (removes item if consumable)
	•	Logic: use_item checks inventory, applies effect, returns outcome message

Engine provides
	•	a door and chest object (engine-owned)
	•	interact <thing> and use <item> on <thing> routing
	•	one simple "gate" (locked door opened by Keycard)
	•	engine validates target exists before calling student code

Items are engine-owned:
	•	Keycard (unlocks door)
	•	Med Patch (heals player)
	•	Crowbar (opens stuck chest)

Acceptance criteria
	•	use_item with Keycard on door returns success message and door unlocks
	•	use_item with Med Patch heals player and removes item from inventory
	•	incorrect usage returns clear failure message

Validation focus
	•	method contracts for interaction are followed
	•	state changes occur only through allowed methods
	•	use_item returns string (not None)

Packaging rule
	•	Keep object variety minimal (1 door, 1 chest). No puzzle chains.

⸻

Level E — Rooms and Movement: Multiple Rooms, Navigation, and Map Awareness

Goal: Expand to a small map while keeping mechanics stable.

Student builds
	•	No new student code. Level E is engine/world expansion only.
	•	Students may review the engine structure to understand how rooms are connected.

Engine provides
	•	a small map (5 rooms): Airlock, Main Corridor, Storage Cage, Lab Bench, Control Terminal
	•	move <direction> command
	•	look shows room details, exits, visible objects

Acceptance criteria
	•	movement works with blocked exits handled properly
	•	room descriptions and exits update correctly

Validation focus
	•	No student validation for this level (engine-only)
	•	Optional: students can play and explore the map

Packaging rule
	•	only these rooms exist; no future map files or assets.

⸻

Level F — NPC Talk: Simple Dialogue Interface

Goal: Add a non-combat interaction loop, still lightweight.

Student builds
	•	Player method: respond_to_npc(options: list) -> int
	•	Returns index of chosen response (0, 1, or 2)
	•	Simple decision hook for the engine

Engine provides
	•	one NPC: Maintenance Drone (in Main Corridor)
	•	talk <npc> command
	•	Drone delivers 2-line hint, no branching choices, no persistent state

Acceptance criteria
	•	NPC talk works end-to-end
	•	respond_to_npc returns a valid index
	•	Drone hint is displayed

Validation focus
	•	method exists and returns int
	•	return value is within valid range (0 to len(options)-1)

Packaging rule
	•	dialogue scripts remain small; no branching trees.

⸻

Level G — Encounter Hook: Controlled State Change in a Turn Loop

Goal: Introduce a simple encounter sequence without building a combat system.

Student builds
	•	Player method: choose_action(options: list) -> int
	•	Returns index of chosen action (attack, defend, use item, run)
	•	Player method: compute_damage(base: int, armour: int) -> int
	•	Simple calculation: max(0, base - armour)

Engine provides
	•	the encounter loop (engine-controlled)
	•	one enemy: Security Bot (fixed behaviour, seeded randomness)
	•	enemy has health, damage, armour (engine-owned)
	•	engine calls student methods for player decisions

Acceptance criteria
	•	player can survive/lose under clear conditions
	•	state changes are valid (health never below 0)
	•	encounter ends when player or enemy health reaches 0

Death handling
	•	On player death: print outcome, restart from level snapshot start state
	•	No permadeath, no branching

Validation focus
	•	player interface is present and behaves correctly
	•	encounter can be simulated by validator with seeded inputs
	•	compute_damage returns int

Packaging rule
	•	only one encounter scenario; no enemy bestiary.

⸻

Level H — Save/Load: File I/O + Exceptions (Checkpoint Style)

Goal: Add persistence to demonstrate file I/O and error handling.

Student builds
	•	Player method: to_save_data() -> dict
	•	Returns dict with keys: name, health, stats, inventory (list of item IDs)
	•	Player class method: from_save_data(data: dict) -> Player
	•	Reconstructs player from saved dict
	•	(Alternative: separate SaveState class — teacher choice)

Engine provides
	•	save and load commands
	•	a fixed save location: saves/game_save.txt
	•	engine handles file I/O wrapper, calls student serialisation
	•	graceful handling of missing/corrupt saves

File format: simple key=value lines or JSON (teacher choice; JSON recommended)

Acceptance criteria
	•	save writes a file containing minimal state
	•	load restores room + player + inventory reliably
	•	bad saves don't crash the game (returns error message)

Validation focus
	•	to_save_data returns dict with required keys
	•	from_save_data reconstructs equivalent player
	•	round-trip test: save then load produces same state

Packaging rule
	•	saves stored in a dedicated folder in the level project; no cloud or DB.

⸻

Level I — Final Playthrough Build (Read-only for students)

Goal: Students can play the complete modest game and inspect the engine structure without being given code on worksheets.

Student builds
	•	nothing new (or an optional extension task that does not affect core playthrough)

Engine provides
	•	the complete modest final game: map, items, NPC, one encounter, save/load

Final game item list (8 items):
	•	Keycard
	•	Crowbar
	•	Torch
	•	Battery
	•	Med Patch
	•	Access Code Note
	•	Shield Plate
	•	Signal Beacon

Acceptance criteria
	•	full playthrough works
	•	core systems behave consistently

Validation focus
	•	optional (this can be "play and reflect" rather than a build/validate step)

Packaging rule
	•	this is the first time the full content appears, and only here.

⸻

Cross-level design rules (prevent drift and scope creep)

1) Contract-first for every level

For each student-built class/method, the worksheet must define:
	•	class name
	•	required attributes
	•	required method names + parameters (plain text)
	•	behavioural expectations (what changes, what outputs, what returns)

2) Teacher reference baseline between levels
	•	After sign-off, the next level folder uses a teacher reference solution for previously taught components.
	•	Students do not paste their old code forward into the next official folder.
	•	Reference solutions stored in private teacher-only area (never packaged).

3) Validator must be deterministic
	•	Prefer deterministic scenarios.
	•	If randomness exists, seed it.
	•	Validators should check behaviour with small scripted calls, not full interactive sessions.

4) Keep each level's "new mechanic count" low
	•	Introduce at most one major new concept per level.
	•	Reuse existing content to practise, not expand.

5) No "systems explosion"

Avoid adding:
	•	deep item systems
	•	complex object graphs
	•	multiple interdependent puzzles
	•	long dialogue trees
	•	multiple enemy types
	•	world state flags everywhere

If a proposed level requires any of the above, it is too big and must be split or simplified.

⸻

Per-level folder template (example)

Each level folder should follow the same structure:

level_<letter>_<slug>/
  engine/
    __init__.py
    game_loop.py
    command_parser.py
    world/
      world.json
  student/
    player.py
    inventory.py
    (only the files needed for this level)
  spec/
    level_spec.md
    uml/
      (PlantUML source + PNG exports)
  saves/
    (empty folder for save files)
  validate.py
  run_game.py
  README_LEVEL.md

Rules:
	•	student/ contains only blank files (comments allowed; no method/class skeletons).
	•	engine/ contains only what the current level needs.
	•	spec/ is teacher/agent-facing; student-facing guidance lives on the website worksheet.
	•	World content in JSON format (world.json).

⸻

Time estimates per level

| Level | Estimated Time | New Concept |
|-------|---------------|-------------|
| Preflight | 1 lesson | OOP warmup (teacher-led) |
| Level A | 2-3 lessons | Classes, objects, constructors |
| Level B | 2-3 lessons | Inheritance, polymorphism |
| Level C | 2-3 lessons | Composition, encapsulation |
| Level C+ | 1-2 lessons | Stacks, queues (data structures) |
| Level D | 2-3 lessons | Object interaction |
| Level E | 1 lesson | Map/world review (engine-only) |
| Level F | 1-2 lessons | NPC dialogue hooks |
| Level G | 2-3 lessons | Encounter mechanics |
| Level H | 2-3 lessons | File I/O, serialisation |
| Level I | 1 lesson | Final playthrough |

Total: approximately 18-24 lessons

⸻

What comes next

After this breakdown is agreed, the next build step is to create:
	1.	the level folder template (directory structure)
	2.	the worksheet HTML template
	3.	the world.json schema + loader
	4.	the validator helper utilities (so validate.py stays consistent)
	5.	the Preflight worksheet (website-only)
	6.	Level A folder + worksheet (first full deliverable)