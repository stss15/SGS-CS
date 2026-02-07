README_07_WEBSITE_WORKSHEET_SPEC.md

Purpose

This document defines the standard structure and rules for the student-facing website worksheets (HTML pages), one per level.

The worksheet pages must:
	•	look and read like a worksheet (not a blog post)
	•	teach the concept(s) for the level clearly
	•	give step-by-step tasks tied to the level’s downloadable project
	•	specify exact required interfaces and behaviours (without any Python code)
	•	support fast iteration by starting each level from a known start state (students should not replay earlier content just to test the current level)

Non-negotiable:
	•	Worksheets must contain ZERO Python code (no snippets, no partial methods, no example lines).

⸻

Core principles
	1.	Worksheet first, game second
The page teaches and directs. The “world/story” is used as context, not as an excuse for bloated mechanics.
	2.	Explicit requirements, no code
Students get UML, method names + parameters as plain text, and acceptance criteria. They write code themselves.
	3.	Current-level iteration
Each level folder runs from a preconfigured start state that assumes prior progress (inventory/health/key items) so students can test the current level quickly.
	4.	Optional challenge ≠ required progression
Differentiation must not create “some/most/all” dependencies. Optional tasks must never be required for later levels.

⸻

Page layout and required sections (every worksheet)

Each level worksheet must follow this layout in this order. Keep sections short and scannable.

1) Header block (always)

Must include:
	•	Level title (short, clear)
	•	Estimated time range (rough, not precious)
	•	This level’s focus (one sentence)
	•	Download button for the level folder (zip)

2) Objectives

A small bullet list (3–5 bullets):
	•	what students will build
	•	what they will practise
	•	what they will verify with validate.py

3) Keywords and definitions

A compact table:
	•	keyword
	•	definition (student-friendly, accurate, short)
	•	“common mistake” note (optional)

Rules:
	•	No code.
	•	Use plain English definitions. Keep it tight.

4) Concept explanation (mini-notes)

This is the “teaching” section. It must read like a worksheet:
	•	short paragraphs
	•	bullet points
	•	minimal diagrams if helpful

It must answer:
	•	what the concept is (in this game context)
	•	why it exists in this level (what it enables)
	•	what students must do (in plain terms)

Examples of content types allowed:
	•	UML diagrams
	•	object interaction diagrams (arrows + labels)
	•	“before/after” state diagrams (text + arrows)
	•	command flow diagrams

5) What you are building in this level

A clear description of the deliverable:
	•	which class(es) students must write
	•	what the engine will do with those classes
	•	what success looks like

This is not story text. It is a build brief.

6) Starting state for this level (critical)

This section prevents replaying earlier content. It must include:
	•	Where you start: room name + short description
	•	What you already have (assumed):
	•	inventory items (names)
	•	health/status (if relevant)
	•	any flags that matter (e.g., “door A already unlocked”)
	•	What you do NOT have yet: (if relevant)

Rule:
	•	The level download must be configured so that running run_game.py drops the player into this start state immediately.

7) Files you will edit (student-only)

A short list of exact file paths inside /student that students must edit.

Rules:
	•	No mention of engine files here.
	•	Remind: “Do not edit /engine files.”

8) UML and interface contract (required)

This is the heart of the worksheet. Provide:
	•	UML diagram image(s) for the class(es)
	•	A plain-text “Required interface” list:

For each required class:
	•	Required attributes (names + purpose)
	•	Required methods as plain text, formatted like:
	•	method_name(parameter1, parameter2) -> return description
	•	Notes on validation rules:
	•	constraints (e.g., “health must not go below 0”)
	•	expected behaviour outcomes

Rules:
	•	No Python syntax examples.
	•	Method names and parameter names are allowed as plain text only.

9) Task list (step-by-step)

This must be a numbered checklist students can follow.

Each task should:
	•	be small enough to complete in 5–15 minutes
	•	state what to run/test after completing it

Example task types (allowed):
	•	“Create the class and initialise required attributes”
	•	“Add method X and ensure it updates attribute Y safely”
	•	“Implement validation rule Z”
	•	“Run validate.py and fix the first failing check”

10) Acceptance criteria (what “done” means)

A strict checklist. Must include:
	•	required features implemented
	•	required behaviours observed
	•	validator result = PASS

Keep it binary and unambiguous.

11) Validation and sign-off instructions

Must include:
	•	“Run validate.py until PASS”
	•	“Fix the first failure shown, then re-run”
	•	“Only request teacher sign-off once PASS is achieved”

No screenshots needed.

12) Reflection / practice questions (optional, non-mechanical)

This is where you place:
	•	trace table questions
	•	“what happens next?” flow questions
	•	small reading comprehension about the class design
	•	vocabulary checks

Rule:
	•	These questions must not be required game mechanics.
	•	They can be used after validation as consolidation.

13) Optional challenge (differentiation without progression risk)

This section is allowed, but must follow strict rules.

Allowed challenge types
	•	design extension (UML-only): “Propose one extra attribute/method and justify it”
	•	reasoning questions: “Explain how overriding changes behaviour”
	•	extra validator-style test planning: “Write a test plan in plain English”
	•	“sandbox coding”: students may implement extra features in a personal copy that will not be used later

Rules for sandbox coding challenges
	•	Must be clearly labelled: “Optional — not required for next levels”
	•	Must not change the required interface
	•	Must not be required for validation
	•	Must not be assumed later by the engine

If you want optional coding challenges, the worksheet must explicitly tell students to:
	•	keep it in a personal copy of the folder, or
	•	keep it behind a clearly named “extras” section they understand won’t carry forward

Do not pretend optional code will persist across levels.

⸻

Visual and formatting requirements (worksheet look-and-feel)

Each HTML worksheet should be designed to feel printable and structured:

Required visual components
	•	A clear top header panel (title, objectives, download)
	•	Boxed sections (keywords, contract, tasks)
	•	A “Start state” callout box
	•	UML diagrams displayed cleanly (click to enlarge)
	•	A consistent “Done checklist” section at the end

Print-friendly mode

Provide a print stylesheet so teachers/students can print the worksheet:
	•	black text on white
	•	avoid huge backgrounds
	•	ensure diagrams scale sensibly
	•	page breaks between major sections

⸻

“Current level only” iteration model (how levels should run)

Students must be able to test the level they’re on without replaying earlier content.

Therefore, each level download must:
	•	start directly in the relevant scenario
	•	assume the “optimal prior path” has been taken
	•	preload any required inventory/health/flags

Start-state implementation rule (engine-side)

The level download must include an engine-owned configuration that sets the start state for that level.

Constraints:
	•	Do not require databases.
	•	Keep it simple and deterministic.
	•	Prefer a small engine-owned config file or a level config module.

The worksheet must mirror exactly what the level config sets (so students are never surprised by missing items or wrong location).

⸻

Required worksheet-to-download linking

Every worksheet must include:
	•	Download button for that level zip
	•	A “Quick start” box:
	•	unzip
	•	open folder in PyCharm
	•	run validate.py
	•	run run_game.py (if the level includes play testing)

Keep it procedural and short.

⸻

Content rules (what must not appear)

Worksheets must not include:
	•	any Python code (including partial lines, function headers, or “pseudo-Python”)
	•	any future-level spoilers (future class names, future maps, future enemies)
	•	any mention of later validators or later mechanics
	•	any references to complexity analysis

Worksheets may include:
	•	UML
	•	method names and parameter names (plain text)
	•	definitions and conceptual explanations
	•	maps/visuals
	•	acceptance criteria and checklists

⸻

Minimum per-level worksheet template (authoring checklist)

When creating a new level worksheet, confirm you have:
	•	Objectives (3–5 bullets)
	•	Keywords table
	•	Concept explanation (short)
	•	Build brief (what you are building)
	•	Start state (location + assumed inventory/health/flags)
	•	Files to edit (exact student paths)
	•	UML diagram(s)
	•	Required interface list (plain text)
	•	Step-by-step tasks
	•	Acceptance criteria checklist
	•	Validation instructions
	•	Optional reflection questions
	•	Optional challenge (clearly labelled, non-progressing)

⸻
