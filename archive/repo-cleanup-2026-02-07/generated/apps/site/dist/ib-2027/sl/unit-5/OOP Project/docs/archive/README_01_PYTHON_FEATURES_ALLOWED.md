README_01_PYTHON_FEATURES_ALLOWED.md

Purpose

This document defines the only Python language features and standard-library tools that are allowed/required for this project.

If a feature/library is not listed here, it must not be introduced into the game engine, the validators, or the student tasks.

This is intentionally strict to prevent scope creep and “random extra Python” appearing in the build.

⸻

Non-negotiable constraints
	•	Student-facing website worksheets contain zero Python code. This document is teacher/agent-facing.
	•	Students write their code from scratch in the downloadable level folders (no method/class skeletons).
	•	Each level must remain simple enough for students who are learning OOP for the first time.
	•	No Big O or complexity analysis as part of game mechanics.
	•	Each level’s downloadable folder contains only the content required for that level.

⸻

Allowed Python constructs (core language)

These are permitted throughout the project.

Variables and data types
	•	Variable assignment and reassignment
	•	Basic data types:
	•	int, float
	•	bool
	•	str
	•	Scope awareness:
	•	local variables inside functions/methods
	•	instance attributes on objects
	•	class attributes (used sparingly; see “Static vs dynamic” below)

Operators
	•	Arithmetic: + - * / // % **
	•	Comparison: == != < <= > >=
	•	Boolean: and, or, not
	•	Membership: in, not in

Strings (required for command parsing)

Allowed string operations:
	•	indexing and slicing
	•	.lower(), .strip(), .split(), .join()
	•	concatenation using + (limited) and f-strings for output

Notes:
	•	The command parser may use string splitting/tokenisation.
	•	Avoid advanced parsing frameworks.

Selection (branching)
	•	if, elif, else
	•	nested conditionals where necessary

Iteration (loops)
	•	for loops over ranges and iterables
	•	while loops where condition-based repetition makes sense
	•	loop control:
	•	break, continue (used sparingly and clearly)

Functions and modularity
	•	Defining functions with parameters and return values
	•	Defining helper functions inside student modules (allowed where specified by the level)
	•	Modular structure using multiple .py files
	•	Imports restricted to:
	•	teacher-owned modules inside the project
	•	standard library modules listed in this document

⸻

Allowed built-in collections and data structures

These are the only collection types that may be used for game logic.

Lists (required)

Allowed:
	•	1D lists for inventories, stacks, lists of items, lists of rooms, etc.
	•	2D lists (nested lists) only when needed for a simple grid/map representation

Operations allowed:
	•	indexing, slicing (basic)
	•	.append(), .pop(), .insert(), .remove() (where appropriate)
	•	iteration through a list
	•	length checks using len(...)

Dictionaries (allowed with restrictions)

Dictionaries are allowed only for:
	•	mapping identifiers to objects (e.g., room_id -> Room)
	•	simple lookup tables (e.g., command -> handler name)
	•	lightweight save/load key-value state (if introduced)

Allowed operations:
	•	dict[key] access
	•	.get(key, default)
	•	iteration through keys/items where necessary

Restrictions:
	•	Do not use dictionaries to create complex, nested “game database” structures.
	•	Do not introduce advanced patterns (e.g., dispatch tables that obscure readability) unless explicitly required in a level spec.

Sets (not used by default)

Sets are not part of the core plan and should not be introduced casually.

If sets are ever added later, they must be explicitly approved and added to this document first, including:
	•	the exact reason they are needed
	•	the exact limited use case
	•	the specific level(s) they appear in

Until then: treat sets as out of scope.

⸻

Stacks and queues in Python (concept implemented using Python tools)

Python does not have a dedicated “stack” or “queue” built-in type in the way some other languages present them, but the concept must still be implemented.

The rule for this project:
	•	We implement stack behaviour using a list wrapper.
	•	We implement queue behaviour using a collections.deque wrapper.

These implementations are acceptable because they demonstrate the operations and behaviour explicitly.

Stack (LIFO) implementation policy

Must provide these operations (names may vary by level spec, but behaviour must match):
	•	push(x) — add to top
	•	pop() — remove and return top (must handle empty case)
	•	peek() — return top without removing (must handle empty case)
	•	is_empty() — returns boolean

Recommended internal storage:
	•	a Python list where “top” is the end of the list:
	•	push → append
	•	pop → pop
	•	peek → stack[-1]

Allowed use cases in the game:
	•	movement history (simple backtrack)
	•	command history (optional)
	•	puzzle state history (only if the level requires it)

Restrictions:
	•	No complex “undo everything” mechanic that rewinds inventory + battles + world state.
	•	If backtrack is used, it must be a movement-only, controlled feature (introduced late and kept simple).

Queue (FIFO) implementation policy

Must provide these operations:
	•	enqueue(x) — add to back
	•	dequeue() — remove and return front (must handle empty case)
	•	front() — return front without removing (must handle empty case)
	•	is_empty() — returns boolean

Required standard library tool:
	•	collections.deque

Recommended internal storage:
	•	deque where:
	•	enqueue → append
	•	dequeue → popleft
	•	front → q[0]

Allowed use cases in the game:
	•	event queue (e.g., room events/messages processed in order)
	•	turn queue (only if a simple encounter hook is introduced)

Restrictions:
	•	Avoid building a complex scheduler or asynchronous system.
	•	No threading or concurrency.

⸻

Static vs dynamic structures (concept demonstration policy)

Python lists are dynamic by default. This project may demonstrate the concept of a “static array” by simulating fixed capacity.

Allowed approach: fixed-capacity list wrapper

A “static list” demonstration may be done using:
	•	a fixed maximum capacity MAX
	•	a counter size
	•	rules:
	•	cannot add beyond MAX
	•	remove decreases size
	•	optional: store values in a pre-sized list and manage empty slots

This must be used only in small, localised tasks (e.g., “fixed-capacity inventory variant” or “fixed-capacity buffer”), not across the entire engine.

Restrictions:
	•	Do not introduce type systems, generics, or third-party libraries for this.
	•	Keep it as a teaching demonstration, not a core dependency.

⸻

File I/O (save/load and simple logs)

File I/O is allowed to support:
	•	save/load checkpoints
	•	simple log output (optional)

Allowed operations:
	•	open(path, mode, encoding="utf-8")
	•	read:
	•	.read(), .readline(), .readlines()
	•	write:
	•	.write()
	•	use of context managers:
	•	with open(...) as f: ... (preferred)

Allowed file formats:
	•	plain text
	•	simple key-value lines (e.g., key=value)
	•	simple line-based formats (one item id per line)

Restrictions:
	•	No databases
	•	No JSON/YAML unless explicitly added later (currently out of scope)
	•	No cloud storage
	•	No network calls

⸻

Exception handling (required, but used deliberately)

Allowed:
	•	try/except
	•	else and finally where appropriate
	•	raising exceptions only when explicitly taught/required

Expected use cases:
	•	invalid user commands (handled gracefully)
	•	file not found / malformed save files
	•	empty stack/queue operations (either return None or raise a controlled exception depending on level spec)

Restrictions:
	•	Avoid “catch everything” (except:) unless there is a very clear reason.
	•	Prefer specific exceptions (e.g., FileNotFoundError, ValueError) when feasible.

⸻

Input/output

Allowed:
	•	print() for game output and debugging during development
	•	input() for command entry (engine-controlled)

Restrictions:
	•	Do not build GUI frameworks.
	•	No external UI libraries.

⸻

Standard library modules allowed

Only the following standard library modules may be imported unless this document is updated:
	•	collections (specifically deque)
	•	dataclasses (teacher-owned engine only; optional)
	•	abc (for abstract base classes; teacher-owned engine and/or student tasks where specified)
	•	typing (type hints allowed; optional; do not overcomplicate)

Notes:
	•	Type hints are allowed but must remain simple. They are not a teaching goal.

⸻

Explicitly out of scope (must not appear in the build)

The following are banned unless this document is revised explicitly:
	•	Big O / complexity analysis as part of game mechanics
	•	recursion-specific content as core game progression (handled separately later if needed)
	•	third-party libraries of any kind
	•	web frameworks, hosting code, APIs
	•	databases (SQLite included)
	•	JSON/YAML parsing
	•	threading / async / concurrency
	•	graphics, curses, terminal UI libraries beyond plain text
	•	encryption/authentication systems beyond simple local checks (if any)

⸻

Required “tightness” principle

When choosing between two implementations:
	•	prefer the simpler one that is easiest to understand and validate
	•	prefer explicit behaviour over clever abstractions
	•	avoid designs that require tracking lots of hidden state

This is a teaching project, not a production game engine.