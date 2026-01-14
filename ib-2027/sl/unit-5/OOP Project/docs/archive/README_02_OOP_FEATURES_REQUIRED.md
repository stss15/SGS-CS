README_02_OOP_FEATURES_REQUIRED.md

Purpose

This document defines the required OOP concepts and design features that must appear across the game project.

It is written as project requirements, not as theory notes. The goal is to ensure:
	•	the game stays coherent and buildable in levels
	•	students repeatedly practise core OOP patterns
	•	the engine can reliably call student code through stable interfaces
	•	we avoid adding random extra OOP ideas that inflate complexity

If an OOP feature is not listed here, it must not be introduced into the engine, validators, or student tasks without explicitly updating this document.

⸻

Non-negotiable constraints
	•	Student-facing worksheets contain zero Python code. They may include UML, method names/parameters as plain text, definitions, maps, and step-by-step tasks.
	•	Students write required classes from scratch (no class/method skeletons pre-written in editable files).
	•	The engine is teacher-owned and stable. Students edit only designated /student files.
	•	Each level is packaged to include only that level’s required content. No future-level entities or maps are shipped early.
	•	Avoid feature creep: keep the “final game” modest and achievable for students new to OOP.

⸻

OOP features that MUST be covered in the project

1) Classes and objects (foundation)

Students must implement classes based on UML and use them as objects.

Required behaviours:
	•	Create objects by calling a constructor
	•	Store data in attributes
	•	Implement behaviours as methods

Minimum concepts in the project:
	•	instance attributes (per object)
	•	class attributes (used sparingly; only when there is a clear “shared across all instances” reason)

2) Constructors and initialisation

Students must write constructors for key entities.

Requirements:
	•	constructors initialise all required attributes
	•	constructors enforce basic validity (or delegate to validation methods/properties)

3) Encapsulation and validation (controlled state changes)

The project must require students to protect internal state and update it safely.

Required patterns (at least one must be used meaningfully):
	•	validation methods (e.g., “apply damage” clamps at minimum)
	•	controlled updates via getters/setters OR Python properties

Rules:
	•	The game engine must not reach into student objects and freely mutate internal attributes.
	•	Student classes should expose explicit methods for state change (e.g., “take_damage”, “heal”, “add_item”).

Python-specific guidance (allowed approaches):
	•	naming conventions for “protected” attributes (leading underscore)
	•	Python name-mangling (__x) may be used but is not required
	•	@property may be used for controlled access where it supports clarity

4) Inheritance (shared behaviour with specialisation)

The project must include inheritance in a way that is visible and useful.

Minimum requirement:
	•	one base class with at least two subclasses that meaningfully override behaviour

Examples that fit the game without inflating complexity:
	•	Player base class with two subclasses (different behaviour in at least one method)
	•	Item base class with subclasses (e.g., consumable vs key item) only if needed later
	•	Interaction or Action base class with subclasses only if it remains simple

Rules:
	•	Inheritance must not be used as an excuse to build huge class trees.
	•	Keep the hierarchy shallow.

5) Polymorphism via overriding (common interface, different behaviour)

The engine must call methods on a base type and get different outcomes depending on the subclass.

Minimum requirement:
	•	at least one method that is overridden in subclasses and called by the engine through a common interface

Examples:
	•	Player.interact(...) overridden by different player types
	•	Player.choose_action(context) overridden to produce different choices (even if simple)

Rules:
	•	Avoid complicated dispatch logic in the engine. Let polymorphism do the work.

6) Abstraction (interface contracts)

The project must include at least one clear abstraction boundary so that:
	•	the engine relies on a stable interface
	•	student implementations can vary internally without breaking integration

Allowed approaches:
	•	abstract base classes (abc.ABC) for key interfaces where appropriate
	•	explicit “required method contract” enforced by validate.py

Important: abstraction must remain lightweight.
	•	Do not introduce large frameworks.
	•	Do not create elaborate interface hierarchies.

7) Composition and aggregation (has-a relationships)

The project must include “has-a” relationships and require students to reason about object relationships.

Minimum requirement:
	•	at least one composition relationship and one aggregation relationship, used meaningfully

Definitions for project use (keep it practical):
	•	Composition: A owns B; B’s lifecycle is tied to A (created/destroyed with A).
	•	Aggregation: A references B; B can exist independently (shared or external).

Examples that fit well:
	•	Composition:
	•	Player has an Inventory created when the player is created
	•	Aggregation:
	•	Room references Item objects that exist independently of the room
	•	World references Room objects loaded from data

Rules:
	•	UML must explicitly show these relationships in worksheets.
	•	The engine must not require students to build a complex world editor.

8) Object interaction patterns (message passing)

The game must require objects to interact through methods rather than global state.

Required pattern:
	•	“tell, don’t ask” where reasonable:
	•	engine calls player.interact(target)
	•	player calls inventory.add(item)
	•	room calls describe(), etc.

Restrictions:
	•	Avoid global variables holding “the entire game state”.
	•	Keep shared state inside a small number of engine-owned objects.

⸻

What is NOT required (and should be avoided unless added later)

These are common OOP additions that easily cause scope explosion:
	•	deep multi-level inheritance trees
	•	multiple inheritance
	•	operator overloading
	•	metaclasses
	•	complex event systems / observer patterns across the whole game
	•	dependency injection frameworks
	•	“everything is a class” purity that hurts clarity

If any of the above are ever introduced, they must be justified and added to this document explicitly.

⸻

Interfaces and contracts (preventing integration drift)

This project depends on stable interfaces. Therefore:

1) Every student-built class must have a defined contract

For each required class, the worksheet must provide:
	•	class name
	•	required attributes (names + purpose)
	•	required methods (names + parameters + return expectations written in plain text)
	•	allowed side effects (what it is allowed to change)

2) The engine calls the contract, not student “interpretations”

The engine must:
	•	call methods exactly as specified
	•	avoid reaching into internal attributes directly
	•	treat return values as the authoritative outcome

3) validate.py enforces the contract

For each level, validate.py must check:
	•	required class/method existence
	•	method signatures (parameter count)
	•	required attributes after initialisation
	•	small behaviour expectations for that level

This is how we prevent “it works for me” code that breaks everything later.

⸻

Minimum required class set (high-level)

The final game target (kept modest) should include these entities, though not all are student-built at once:
	•	Player (student-built in early levels)
	•	Player subclasses (student-built when inheritance is introduced)
	•	Inventory (student-built when composition is introduced)
	•	Room (engine-owned initially; could be student-built later only if needed)
	•	Item (engine-owned initially; student-built only when appropriate)
	•	NPC / Enemy (engine-owned initially; student-built only if it supports learning objectives without inflating complexity)

Rule of thumb:
	•	students build core learning classes (Player, subclasses, Inventory)
	•	the engine owns world content (rooms, NPC scripts, encounters) unless there is a clear learning reason otherwise

⸻

Scope guardrail for OOP

When deciding whether to add a new class or relationship, apply this test:
	•	Does it teach one of the required OOP features above clearly and repeatedly?
	•	Can it be validated with small, deterministic checks?
	•	Does it keep the game simple enough for beginners?

If any answer is “no”, do not add it.