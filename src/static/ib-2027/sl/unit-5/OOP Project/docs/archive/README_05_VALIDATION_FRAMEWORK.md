README_05_VALIDATION_FRAMEWORK.md

Purpose

This document specifies how validate.py works in every level folder.

The validator is the control mechanism that makes this project viable:
	•	it prevents interface drift (wrong method names/parameters/attributes)
	•	it provides fast, consistent sign-off
	•	it allows each level to be self-contained
	•	it keeps the engine stable while students write code from scratch

Non-negotiables:
	•	Validation must produce clear PASS/FAIL with actionable error messages.
	•	Validation must be deterministic.
	•	Validation must not require students to play the game manually.
	•	Validation must not depend on future-level content.

⸻

High-level approach

Each level has a validate.py script that performs three layers of checks:
	1.	Structure checks
Confirm required modules/classes/methods/attributes exist.
	2.	Signature checks
Confirm methods can be called with the required parameters (no missing/extra args).
	3.	Behaviour checks
Run small, scripted scenarios that confirm the required behaviour for the level.

Optional guardrails (configurable per level):
	•	Engine file tamper check (hash-based)
	•	Forbidden import scanning
	•	Student file presence checks (exact filenames)

⸻

Required validator behaviours

Output format (strict)

The validator must print:
	•	a short header identifying the level
	•	a list of checks performed
	•	the final result: PASS or FAIL

On failure it must print:
	•	the failing check name
	•	what was expected
	•	what was found
	•	the minimal hint required to fix it (without giving code)

Example style (not code, just output policy):
	•	FAIL: Player class not found in student/player.py
	•	FAIL: Method 'take_damage' expected 2 parameters (self, amount) but found different signature
	•	FAIL: Health should not drop below 0 after applying damage

Determinism (strict)
	•	No randomness unless seeded inside the validator.
	•	Behaviour checks must use fixed inputs and fixed expected outcomes.

Fast runtime
	•	Validator should run in under a few seconds.
	•	No loops that depend on interactive input.
	•	No long simulations.

⸻

What validate.py must check (by category)

1) Import and load checks
	•	Student modules import successfully.
	•	Import errors are caught and reported clearly:
	•	missing file
	•	syntax error
	•	name error during import
	•	circular import (if it occurs)

Policy:
	•	If import fails, stop early and report the import error cleanly (do not spam stack traces unless needed for debugging). Provide a short “where” and “why”.

2) Class existence checks

For each required class:
	•	confirm the class object exists in the expected module
	•	confirm it is a class type

Example checks:
	•	Player exists in student/player.py
	•	Inventory exists in student/inventory.py

3) Constructor and attribute checks

After constructing the object(s) using the required constructor signature:
	•	confirm required attributes exist
	•	confirm attributes are the correct basic type where relevant
	•	confirm initial values meet constraints (e.g., health is within allowed range)

Important:
	•	The validator should not assume internal implementation details.
	•	It checks observable state only (attributes/method outputs).

4) Method presence and callability checks

For each required method:
	•	method exists on the class
	•	is callable
	•	can be called using the required parameter structure

Parameter validation policy:
	•	Prefer calling the method with test values and catching TypeError to detect wrong arg counts.
	•	If type hints exist, do not rely on them for validation (they are optional).

5) Behaviour checks (scripted scenarios)

Behaviour checks are level-specific and should:
	•	construct minimal objects
	•	call methods in a fixed sequence
	•	compare results/state to expected values

Allowed kinds of assertions:
	•	return values
	•	attribute values after calls
	•	presence/absence of items in inventory (by name/id)
	•	boolean flags (e.g., “is_alive”)
	•	simple string outputs if required, but avoid fragile exact-match prints:
	•	prefer checking “contains key phrase” over exact formatting if output is student-owned

Important: do not validate by “what was printed” unless the spec explicitly requires a specific message. Printing varies too easily.

⸻

Validator design principles (to prevent future pain)

A) Validate contracts, not implementations

The validator must only test the contract defined in the worksheet/spec:
	•	required names
	•	required parameters
	•	required behaviour outcomes

It must not:
	•	enforce a particular internal algorithm
	•	require specific private attribute names
	•	require specific control flow choices

B) Keep checks narrowly scoped per level

A level validator checks only what that level introduces plus what is needed for that level to run.

It must not:
	•	test features not yet introduced
	•	require “final game” features early

C) Provide one clear failure at a time

When possible:
	•	fail fast on the first structural/signature break
	•	then proceed to behaviour checks only once structure is correct

This keeps the feedback loop clean for students.

D) Make error messages teacher-friendly

Teachers should be able to read a failed validator output and know:
	•	what the student likely did wrong
	•	what to check in their file
	•	whether it’s a naming/signature issue or behaviour issue

⸻

Standard structure of validate.py (logical sections)

Every validator should follow the same conceptual structure:
	1.	Metadata

	•	level name / identifier
	•	list of required modules/classes/methods for that level (as data)

	2.	Utility functions

	•	safe import function
	•	safe constructor/call wrapper
	•	simple assertion helpers that raise a controlled “ValidationError” with a clean message

	3.	Checks

	•	check_imports()
	•	check_structure()
	•	check_signatures()
	•	check_behaviour()

	4.	Result printer

	•	consistent PASS/FAIL summary output

	5.	Exit code

	•	PASS -> exit code 0
	•	FAIL -> non-zero exit code

⸻

Optional guardrails (use carefully)

These are optional and should be enabled only if they help, not if they create busywork.

1) Engine tamper detection (hash)

Goal:
	•	discourage editing engine files instead of student files

Approach:
	•	validator stores expected hashes for key engine files
	•	compares at runtime and fails if modified

Caveat:
	•	This can be annoying if the teacher updates engine code mid-rollout.
	•	If used, keep the hash list short and document update workflow.

2) Forbidden import scanning

Goal:
	•	prevent students from bypassing learning goals using disallowed libraries or shortcuts

Approach:
	•	scan student files for import statements
	•	fail if non-allowed imports are detected

Caveat:
	•	Avoid over-policing. Keep it limited to clearly banned things.

3) File presence and location enforcement

Goal:
	•	ensure the expected file names and paths exist

Approach:
	•	validator checks required file paths exist before import

⸻

Validation scope examples (what each kind of level should test)

These are examples of validation focus, not code.

Foundation level (first class)
	•	class exists
	•	constructor works
	•	required attributes exist
	•	a couple of methods exist and behave correctly on fixed inputs

Inheritance level
	•	base and subclasses exist
	•	overridden method behaves differently
	•	engine-facing interface still consistent

Inventory level
	•	Inventory operations work (add/remove/list/check)
	•	capacity rule (if introduced) behaves correctly
	•	Player owns Inventory and calls delegate methods properly

Interaction level
	•	using a key on a door triggers a state change
	•	invalid usage gives a controlled outcome (no crash)

Save/load level
	•	save writes file to correct place
	•	load restores state correctly
	•	missing/corrupt file handled gracefully

⸻

Minimum requirements for student-facing clarity

Every worksheet must include:
	•	the instruction: “Run validate.py until you get PASS before asking for sign-off.”
	•	the rule: “If validation fails, fix the first failure shown, then re-run.”
	•	a reminder: “Do not edit engine files.”

⸻

How validation links to level progression
	•	Students pass validate.py → teacher signs off → student moves to the next level download.
	•	Next level download includes a teacher reference baseline for previous components, ensuring compatibility.
	•	The validator is the enforcement mechanism that makes per-level packaging reliable and prevents the project becoming a debugging nightmare.