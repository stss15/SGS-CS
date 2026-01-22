README_06_LEVEL_PACKAGING_RULES.md

Purpose

This document defines the rules for packaging each level into a downloadable PyCharm project folder.

Packaging is a core design constraint. If students can see future content or copy future solutions, the learning design collapses. If level folders contain too much, the project becomes unmanageable.

Non-negotiables:
	•	Each download contains only what is required for that level to run.
	•	No future maps, no future rooms, no future enemies, no future items, no future validators.
	•	Student-editable files contain no pre-written methods or class skeletons. Comments/instructions are allowed.
	•	The engine is teacher-owned and stable. Students do not edit it.

⸻

Packaging goals

Each level folder must:
	•	run independently in PyCharm
	•	validate independently via validate.py
	•	expose only the current level’s world content and required interfaces
	•	minimise “student browsing spoilers”
	•	keep the codebase small enough to understand and debug

⸻

Folder structure (standard)

Every level folder follows the same layout:

level_<name>/
  engine/
    ...
  student/
    ...
  spec/
    ...
  validate.py
  run_game.py
  README_LEVEL.md

Rules:
	•	engine/ contains teacher-owned runtime code for this level only.
	•	student/ contains the only files students edit (blank except comments).
	•	spec/ contains level spec files and UML assets used by teacher/agent. (Student-facing instructions live on the website worksheet.)
	•	validate.py is the single source of sign-off truth.
	•	run_game.py launches the current level scenario.

⸻

“Current level only” content rules

Maps and rooms
	•	A level may include one or more rooms, but only those rooms.
	•	Do not ship a master map with unused areas “locked off”.
	•	Do not ship the final map early.

Approved approaches:
	•	level-specific map data file containing only the rooms needed
	•	level-specific room definitions

Not approved:
	•	a complete world file with future rooms disabled by flags
	•	hidden “future room” objects that are inaccessible but visible in files

Entities (items/NPCs/enemies)
	•	Ship only the objects needed for the current level objectives.
	•	Avoid generic “item database” files that include future items.
	•	Avoid “enemy bestiary” files early.

Approved approach:
	•	level-local entity definitions (small lists)

Dialogue scripts and story text
	•	Include only the dialogue needed for the current level.
	•	Do not ship later story text.

⸻

Student-editable file rules (strict)

Allowed contents in student files
	•	file headers explaining purpose
	•	task notes and acceptance criteria
	•	reminders to use UML and validate
	•	placeholders that are not code, e.g.:
	•	“Write your Player class here”
	•	“Your class must match the UML on the worksheet”

Forbidden contents in student files
	•	any pre-written method definition
	•	any pre-written class definition
	•	any skeleton like def ... with pass
	•	any example code, even incomplete

Reason:
	•	Students must write from scratch to build fluency.
	•	The worksheet provides UML and method signatures as plain text, not executable code.

⸻

Engine ownership rules

Engine is teacher-owned and stable
	•	Students are told not to edit engine/ files.
	•	The validator may optionally enforce this (hash check), but packaging must assume students can browse.

Engine must not contain “student solutions”
	•	Do not place completed versions of student classes anywhere in the level folder where students can access them.
	•	If the engine requires a correct implementation of earlier classes, it must be embedded in engine code only in sanitised form and only when necessary, and ideally not human-readable as a “copyable class” that students can lift.

Preferred approach:
	•	The engine depends on student code only for the current level’s objectives.
	•	Previously completed components are part of the engine baseline only in the next level, not visible as “your old work”.

⸻

Reference baseline rule (between levels)

When moving to the next level:
	•	The new level folder includes the teacher reference baseline for all previously introduced student-built components.
	•	Students do not bring their own code forward into the official next level folder.

Why:
	•	Prevents interface drift
	•	Ensures predictable integration for each new level
	•	Prevents “carry mistakes forever” debugging

Packaging implication:
	•	Each level folder is built from a clean template + the reference baseline for past components + new blank student files for new tasks.

⸻

No future-level leakage checks (must be part of release process)

Before publishing a level folder:
	1.	Search the folder for references to future level names, maps, room ids, item ids.
	2.	Confirm that only current-level assets exist.
	3.	Confirm no unused files remain in engine/, spec/, or root.
	4.	Confirm there are no TODO notes that reveal future tasks.
	5.	Confirm that student files contain no executable code.

This should be a checklist the teacher/agent runs before uploading the zip.

⸻

Distribution format rules

Download is a zip
	•	Every level download is a zip of the level folder.
	•	The zip name should match the level name and date/version.

Website download links
	•	Worksheet provides a single download button for that level zip.
	•	No “bundle downloads” of multiple levels.

⸻

Versioning rules (simple but disciplined)

Each level folder must include:
	•	README_LEVEL.md with:
	•	level name
	•	release version string (e.g., v0.3)
	•	known issues (if any)
	•	what files students should open/edit
	•	how to run validation and gameplay

Engine file names should be stable so:
	•	worksheets can refer to them reliably
	•	teacher support is consistent

⸻

Security and “spoiler prevention” (realistic expectations)

Students can always browse files in a local project. Packaging aims to reduce temptation and accidental spoilers, not provide real security.

Therefore:
	•	don’t ship future content
	•	keep folders minimal
	•	keep specs teacher-facing
	•	rely on validators + level-by-level downloads for pacing

⸻

What we explicitly will not do
	•	ship a single mega-project with all levels included
	•	“lock” future levels with passwords or obfuscation
	•	hide solutions in plain view
	•	include code snippets anywhere students can copy-paste from (worksheets must have zero code; student files must have zero scaffolds)

⸻

Authoring workflow for new levels

This section defines the step-by-step workflow for producing a level folder and worksheet.

Step 1 — Define level scope
	•	Identify the new concept(s) this level introduces
	•	Confirm which student-built class(es)/method(s) are required
	•	Draft the interface contract (attribute names, method signatures)

Step 2 — Peel back from final game
	•	Start with the final game as reference
	•	Remove all content/features not needed for this level
	•	Keep only the rooms, items, NPCs required for demo

Step 3 — Create level folder structure
	•	Copy the per-level folder template
	•	Add engine code for this level only
	•	Create blank student files (comments allowed, no code)
	•	Add world.json with current-level content only

Step 4 — Write UML and spec
	•	Create PlantUML source for required classes
	•	Export to PNG for worksheet
	•	Write level_spec.md with detailed requirements
	•	Store in spec/

Step 5 — Build validate.py
	•	Structure checks (class/method presence)
	•	Signature checks (correct parameters)
	•	Behaviour checks (scripted scenarios)
	•	Use validator helper utilities for consistency

Step 6 — Write run_game.py
	•	Set up engine with level's start state
	•	Allow student to test their implementation
	•	Print friendly errors if student code fails

Step 7 — Write README_LEVEL.md
	•	Follow template from README_08
	•	Include version, file list, run instructions
	•	Include rules reminder

Step 8 — Create website worksheet
	•	Follow structure from README_07
	•	No Python code anywhere
	•	Include download button for level zip
	•	Include UML diagrams

Step 9 — Package and validate
	•	Run release checklist (see below)
	•	Zip level folder with correct naming
	•	Upload to /downloads/
	•	Link from worksheet

⸻

Release checklist (must complete before upload)

Run this checklist for every level before publishing:

Content checks:
	•	[ ] Only current-level rooms/items/NPCs in world.json
	•	[ ] No references to future level names or IDs
	•	[ ] No TODO notes that reveal future tasks
	•	[ ] No unused files in engine/, spec/, or root

Student file checks:
	•	[ ] All student files are blank (comments only)
	•	[ ] No method definitions or class skeletons
	•	[ ] No code snippets anywhere

Validation checks:
	•	[ ] validate.py runs without errors on reference solution
	•	[ ] validate.py produces clear PASS/FAIL output
	•	[ ] validate.py fails correctly on broken student code
	•	[ ] run_game.py works with reference solution

Documentation checks:
	•	[ ] README_LEVEL.md is present and correct
	•	[ ] Version string is updated
	•	[ ] File paths match actual files in student/
	•	[ ] Worksheet matches level folder exactly

Package checks:
	•	[ ] Zip file named correctly (level_<letter>_<slug>_v<N>.zip)
	•	[ ] Zip contains correct folder structure
	•	[ ] Download link on worksheet works

Final sanity check:
	•	[ ] Fresh unzip + run validate.py confirms expected FAIL
	•	[ ] Reference solution produces PASS
	•	[ ] run_game.py produces playable scenario

Owner: Agent runs automated checks; teacher does final manual pass before upload.

⸻
