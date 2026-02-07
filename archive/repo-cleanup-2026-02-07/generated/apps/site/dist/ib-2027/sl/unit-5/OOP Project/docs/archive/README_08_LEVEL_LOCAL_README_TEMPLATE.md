README_08_LEVEL_LOCAL_README_TEMPLATE.md

Purpose

This document defines the template and content rules for README_LEVEL.md that ships inside every downloadable level folder.

README_LEVEL.md is not the worksheet. It is the local “how to run this level” guide that:
	•	tells students exactly what to open/edit
	•	tells them how to run validation and the game
	•	repeats the rules about not editing engine files
	•	stays short and procedural

Non-negotiables:
	•	README_LEVEL.md must not include Python code examples.
	•	It must not include future-level spoilers.
	•	It must not include teaching notes already covered on the website worksheet.
	•	It must not include any scaffolding instructions that amount to “write this code”.

⸻

File naming and placement
	•	File name: README_LEVEL.md
	•	Location: root of the level folder (next to validate.py and run_game.py)

⸻

Required sections and exact headings

Each README_LEVEL.md must use these headings exactly, in this order:
	1.	Level overview
	2.	What you must do
	3.	Files you are allowed to edit
	4.	How to run validation
	5.	How to run the level
	6.	Rules (read before you start)
	7.	Troubleshooting (common issues)

Keep each section short.

⸻

Template content (copy/paste structure)

Use the following structure for every level and fill in the placeholders.

1) Level overview

Must include:
	•	Level title
	•	Version string (e.g., v0.4)
	•	One sentence: what this level focuses on
	•	Link reminder: “Full worksheet is on the course website for this level” (no URL needed in the file if you don’t want it)

2) What you must do

A short checklist (3–6 bullets):
	•	what you are building (class names only)
	•	what must work
	•	what counts as “done” (PASS in validator)

No teaching explanation here. Just deliverables.

3) Files you are allowed to edit

Must list exact student file paths, e.g.:
	•	student/player.py
	•	student/inventory.py

Rules:
	•	List only files that exist in this level folder.
	•	Do not mention engine files here.
	•	Add a single line: “Do not edit anything outside the student/ folder.”

4) How to run validation

Must include:
	•	instruction to run validate.py
	•	what PASS means
	•	what to do if FAIL happens

Required lines (adapt wording but keep meaning):
	•	“Run validate.py until you get PASS.”
	•	“If it fails, fix the first error shown, then run it again.”

Avoid long troubleshooting here; keep it brief.

5) How to run the level

Must include:
	•	instruction to run run_game.py
	•	note that this level starts in a preconfigured state (so they don’t need to replay earlier parts)

Example phrasing (plain English):
	•	“Run run_game.py to test your work in the game.”
	•	“This level starts from the correct state for this stage of the game (items/health/location are pre-set).”

Do not list spoilers or item names here unless absolutely needed.

6) Rules (read before you start)

This section must include the non-negotiables:

Required rules:
	•	Only edit files in student/
	•	Do not edit engine/
	•	Do not rename files
	•	Do not change required class/method names from the worksheet contract
	•	Use the worksheet as the single source of truth for UML and required interfaces

Also include:
	•	“No Python code is provided in the worksheet. You must write your solution yourself.”

7) Troubleshooting (common issues)

Keep this as a short bullet list. Focus on common beginner issues:

Must cover:
	•	import errors (file renamed / syntax error)
	•	validator failures due to wrong method name or parameter count
	•	circular imports (if likely)
	•	running the wrong file (students run run_game.py but forgot to validate first)

No code, no deep debugging walkthroughs.

⸻

Content rules (what must NOT appear)

README_LEVEL.md must not contain:
	•	Python code snippets (even tiny ones)
	•	method skeletons or “write this line”
	•	future-level hints (no “later you will…”)
	•	full UML diagrams (those belong on the website)
	•	any requirement beyond what this level needs

⸻

Style rules
	•	Keep it under ~1 page of text.
	•	Use short sentences and bullet points.
	•	Assume students skim.
	•	Make it hard to misunderstand what to run and what to edit.

⸻

Release checklist for README_LEVEL.md

Before publishing a level folder, confirm:
	•	Title and version are correct
	•	File paths listed match actual files in student/
	•	Validation/run instructions match actual entry points
	•	No Python code appears anywhere in the README
	•	No mention of future content
	•	Rules section is present and explicit

⸻

