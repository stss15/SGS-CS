README_09_ENGINE_STUDENT_INTERFACE.md

Purpose

This document defines the boundary between the teacher-owned engine and the student-owned code, and how the engine should import and use student classes safely and consistently.

This boundary is what prevents:
	•	“engine edits” becoming the default fix
	•	interface drift between levels
	•	fragile coupling that breaks validation
	•	scope creep caused by students (or the engine) relying on implementation details

Non-negotiables:
	•	Students only edit /student files.
	•	The engine is stable and trusted.
	•	The engine only depends on documented contracts (names, parameters, behaviours).
	•	The validator checks the same contracts the engine uses.

⸻

Roles (strict)

Engine responsibilities (teacher-owned)
	•	run the command loop for the current level
	•	parse input into commands and arguments
	•	hold the level’s world content (rooms, exits, objects, NPCs, encounter scripts)
	•	manage the level’s configured start state
	•	call student code through a defined interface
	•	handle error conditions cleanly (bad input, missing targets, invalid actions)

Student code responsibilities
	•	implement the class(es) and behaviours defined in the worksheet contract
	•	ensure naming/signatures match exactly
	•	ensure behaviours meet acceptance criteria
	•	pass validate.py

Student code must not be required to:
	•	parse user input
	•	manage world files
	•	implement a full game loop
	•	manage content-heavy data structures for rooms/NPC scripts

⸻

Core engine design goal

The engine should be able to run in a predictable way even when student code is partially broken, and fail with clear messages during validation rather than failing mysteriously at runtime.

Practical implication:
	•	In run_game.py, engine errors should be caught and shown as “your code is not ready yet; run validate.py”.
	•	Validation remains the official sign-off path.

⸻

Import strategy (robust and level-safe)

Where the engine imports from
	•	The engine imports only from:
	•	student/ (student-owned contracts)
	•	engine/ (teacher-owned runtime)
	•	It does not import from:
	•	spec/
	•	future content (not present anyway)

Import rules
	•	Imports must be explicit and minimal:
	•	import only the classes required for this level
	•	The engine must not search directories, dynamically load modules, or perform plugin discovery.

Reason:
	•	Dynamic loading increases complexity and creates hard-to-debug behaviour.

Handling import failures

If student code fails to import:
	•	the validator must report this clearly
	•	the runtime launcher should guide students back to validation

Runtime should not:
	•	print a full stack trace by default
	•	continue with partially imported student modules

⸻

Contract-first interface policy

For every student-built class used by the engine, the engine must treat it as a black box with only these guarantees:
	•	class name
	•	constructor parameters
	•	public attributes listed in the contract
	•	public method names + parameter lists listed in the contract
	•	behavioural guarantees listed in the contract

The engine must not depend on:
	•	private attributes
	•	internal data structures (e.g., “inventory is a list”)
	•	specific algorithms
	•	accidental side effects

If the engine wants a behaviour, it must be part of the contract and therefore part of validation.

⸻

Engine calling conventions (stable patterns)

1) Engine owns the flow; student code supplies decisions or state changes

Examples of allowed patterns:
	•	engine asks the player object for a decision from a fixed set
	•	engine calls player methods to apply a state change (damage/heal, add/remove item)
	•	engine calls player methods to produce a display summary string

Avoid patterns where:
	•	student code runs the loop
	•	student code manipulates the world directly
	•	engine must inspect deep internals of student objects to proceed

2) Engine mediates world access

World objects are engine-owned.
Student code may interact only through engine calls such as:
	•	take item → engine checks item exists and is takeable → engine calls student inventory add
	•	use item on target → engine resolves target and validates action → engine calls student method(s) as needed

This keeps world complexity from spilling into student code.

3) Engine should normalise and validate command inputs before touching student code

The engine should:
	•	parse and normalise input tokens
	•	handle missing arguments and unknown commands
	•	resolve target names within the current room
	•	handle “not found” results cleanly

Only after those checks does it call student methods.

⸻

Error handling policy at the boundary

Student code errors

If a student method throws an exception during gameplay:
	•	runtime should show a short message:
	•	“Your implementation raised an error. Run validate.py to find and fix the issue.”
	•	the validator remains the diagnostic tool.

Do not silently swallow errors. The goal is:
	•	students see that something is wrong
	•	the workflow pushes them to validation

Engine errors

Engine errors are teacher-owned and should be treated as bugs to fix in the engine, not as “student mistakes”.

⸻

Interface stability over time (between levels)

Because each new level folder contains a teacher reference baseline for previously introduced components, the engine interface rules must be consistent:
	•	The engine contract for previously taught components must not change across levels unless absolutely necessary.
	•	If a contract must change, it requires:
	•	a dedicated “refactor level” with explicit worksheet explanation
	•	a validator update
	•	a clean baseline update

Default stance: avoid contract changes.

⸻

How this supports differentiation (without breaking progression)

Optional challenges must not change:
	•	required interfaces
	•	required behaviours validated by validate.py

Therefore:
	•	the engine must never depend on optional student extensions
	•	if optional features exist, they must be either:
	•	ignored by the engine, or
	•	only used in an optional “sandbox mode” that is clearly not part of validation

⸻

Practical guardrails for the engine design

To keep the project achievable:
	•	keep public contracts small
	•	introduce one major new concept per level
	•	keep engine calls to student code simple and repeatable
	•	prefer “engine does X, student provides Y” patterns

Avoid:
	•	deep chains of callbacks
	•	event systems
	•	plugin architectures
	•	branching state machines

⸻


