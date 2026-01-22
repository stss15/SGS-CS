README_03_FINAL_GAME_SPEC.md

Purpose

This document defines the final target game in plain terms: what it does, what exists in the world, what commands work, what gets saved, and what the user experience should feel like.

This target must remain modest. The levels will be created by “peeling back” from this target and reintroducing parts gradually.

Non-negotiables:
	•	No Big O / complexity mechanics.
	•	No sprawling RPG systems.
	•	No complex undo that rewinds world state.
	•	Student worksheets contain zero Python code (this file is teacher/agent-facing).

⸻

Final game experience (player-facing)

A short, immersive, text-based adventure where the player:
	•	chooses a name and a player type
	•	explores a small set of rooms
	•	looks around and interacts with objects (doors, chests, terminals)
	•	collects and uses items via an inventory
	•	talks to NPCs to receive hints and story context
	•	triggers a small encounter sequence (engine-controlled)
	•	can save and load from a simple text file (checkpoint style)

Tone and style
	•	Clear, atmospheric descriptions (short paragraphs, not walls of text)
	•	Consistent command vocabulary
	•	Output always tells the player:
	•	where they are
	•	what they can see
	•	what obvious actions exist

⸻

Command set (fixed vocabulary)

Commands are intentionally limited. Do not add extra command families unless required.

Core commands
	•	help
Shows available commands and a brief usage guide.
	•	look
Prints the current room description, visible objects, NPCs, and exits.
	•	move <north|south|east|west>
Moves the player if the exit exists and is not blocked.
	•	interact <thing>
Generic interaction with an object/NPC in the room (engine routes to the target).
	•	take <item>
Picks up an item if it is takeable and present.
	•	use <item> [on <thing>]
Uses an item, optionally on a target (e.g., key on door). Keep this simple.
	•	talk <npc>
Starts a short dialogue (one or a few steps) with an NPC.
	•	inventory
Lists carried items (with minimal metadata: name, maybe weight if used).
	•	status
Shows player status (name, type, basic stats if any, and any conditions).

Optional but allowed (only if needed for clarity)
	•	open <thing>
Alias to interact for doors/chests, if the UX benefits.
	•	save / load
Save/load checkpoint (only after save/load has been introduced).

Restrictions:
	•	No free-text parsers. Keep parsing to simple token commands.
	•	No synonyms explosion. If you allow aliases, keep them few and documented.

⸻

World model

The world is small and structured. No procedural generation.

Rooms

Each room has:
	•	unique id (engine-internal)
	•	name/title
	•	description text
	•	exits: north/south/east/west (some may be missing)
	•	contents: objects/items/NPCs/enemies present

Room count target (final game): ~8–12 rooms.
Keep the map small enough to understand.

Map design
	•	A compact layout with a clear main path and 1–2 optional side areas.
	•	“Gates” should be simple:
	•	locked door requiring a key item
	•	NPC gives a hint
	•	one lightweight puzzle condition (not complex state machines)

Objects and interactions

There are a small number of object types, e.g.:
	•	Door (may be locked/unlocked)
	•	Chest (contains one or two items; can be opened once)
	•	Terminal/Sign (prints information/hints)
	•	Lever/Switch (toggles one thing; keep state minimal)

Rules:
	•	Objects should have one primary interaction.
	•	Avoid multi-step object state graphs unless absolutely necessary.

⸻

Player model

Player creation

At game start:
	•	player chooses a name
	•	player chooses one of two player types (subclasses)

Player attributes (keep modest)

Must exist at minimum:
	•	name
	•	player_type (or inferred via subclass)
	•	health (or similar survivability metric)
	•	inventory (composition relationship; Inventory object)

Optional but permitted:
	•	a small number of simple stats (2–3 maximum), only if they are used directly:
	•	e.g., strength, agility
	•	Do not introduce large stat matrices.

Player behaviours

At minimum, the player supports:
	•	movement attempt (engine performs navigation; player may influence via hooks)
	•	interaction hooks (engine asks player to respond/act)
	•	inventory operations (delegated to Inventory)

⸻

Inventory model (deliberately simple)

Inventory must support:
	•	add item
	•	remove item
	•	list items
	•	check if item exists (by name/id)
	•	optional capacity constraint (either item count or weight)

Rules:
	•	Inventory is a teaching feature (composition + validation).
	•	Do not implement crafting, equipment slots, or stacking quantities unless specifically required later.

⸻

Items

Items should be small and few (final game target: ~8–15 items).

Minimum item metadata:
	•	id or name (unique enough for commands)
	•	description
	•	takeable: yes/no

Optional metadata (only if used):
	•	weight (to support fixed-capacity inventory demonstration)
	•	“usable on” simple target types (e.g., key on door)

Rules:
	•	Use items to teach object interaction and composition, not to create a full RPG.

⸻

NPCs (simple dialogue)

NPCs exist to:
	•	provide hints
	•	reinforce story
	•	direct the player

Dialogue is intentionally limited:
	•	1-step “say a line”
	•	or a small menu with 2–3 choices maximum
	•	no long conversation trees

Rules:
	•	NPCs do not require complex emotional state or memory.
	•	NPC scripts belong to the engine (content), not student code (unless a specific level asks for a class).

⸻

Encounters (simple hook, engine-controlled)

Encounters exist to:
	•	make the world feel alive
	•	practise controlled state changes (health changes, validation)

Design requirement:
	•	The encounter loop is engine-controlled.
	•	Student code exposes a small interface the engine calls (e.g., choose an action / compute damage / respond to event).

Encounter complexity constraints:
	•	one enemy at a time
	•	fixed action set (e.g., attack, defend, use item, run) with simple outcomes
	•	no status effects, no multi-enemy party systems
	•	no spatial combat, no grids

If an encounter exists, it must be:
	•	deterministic enough to validate (or bounded randomness with seeded behaviour)
	•	short (a few turns)

⸻

Save/load (checkpoint, text-based)

Save/load exists to:
	•	demonstrate file I/O and exception handling
	•	support continuity between sessions

Save behaviour constraints:
	•	Save writes a single text file (or a small fixed set of files) into a known folder.
	•	Load reads and validates the file content.
	•	If file is missing or corrupted, the game fails gracefully with a clear message.

What is saved (keep minimal):
	•	current room id
	•	player name and player type
	•	player health (and small stats if used)
	•	inventory item ids

What is NOT saved:
	•	full world history
	•	complex object graphs
	•	any “rewind” or time travel state

⸻

Output style rules (immersion + clarity)

The game output should be consistent:
	•	Every room entry prints:
	•	room name
	•	short description
	•	visible notable objects/NPCs
	•	exits available
	•	Every command produces a clear outcome message:
	•	success/fail
	•	what changed (if anything)
	•	what to try next if relevant

Avoid:
	•	dumping raw data structures
	•	long scrolling paragraphs
	•	hidden state changes without telling the player

⸻

Visuals for the website worksheets (no code)

Worksheets may include:
	•	a simple map image of the current level’s rooms
	•	a room “card” view (name, description, exits, objects)
	•	UML diagrams for any student-built classes

Rules:
	•	no Python code examples
	•	method names and parameters may be listed as plain text
	•	acceptance criteria must be explicit (what should work, what should print, what should be stored)

⸻

Explicit non-goals (to prevent scope explosion)

Do not implement:
	•	complex undo across movement + inventory + encounters
	•	large branching narratives with many persistent flags
	•	crafting, equipment systems, levelling systems, skill trees
	•	procedural generation
	•	databases or cloud sync
	•	GUI frameworks
	•	“engine plugin systems” or dynamic loading of modules beyond simple imports

The final game must remain a small, teachable target that can be reached by peeling back into beginner-friendly levels.