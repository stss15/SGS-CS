README_11_WORLD_CONTENT_MODEL.md

Purpose

This document defines the data format and schema for world content (rooms, items, NPCs, encounters) used across all levels.

World content is engine-owned. Students interact with items/NPCs/rooms through defined interfaces but never create or modify content files.

⸻

File format decision

Format: JSON

Rationale:
	•	Easy to validate and parse
	•	Human-readable for debugging
	•	Can generate worksheet visuals from data
	•	Keeps content separate from engine code
	•	Python's json module is standard library

File location per level:
	•	engine/world/world.json (single file per level)

⸻

World content schema

Top-level structure

{
  "meta": { ... },
  "rooms": [ ... ],
  "items": [ ... ],
  "npcs": [ ... ],
  "encounters": [ ... ],
  "start_state": { ... }
}

⸻

Meta section

Purpose: Level identification and versioning.

Fields:
	•	level_name (string): human-readable level name
	•	level_id (string): short identifier (e.g., "level_a")
	•	version (string): content version (e.g., "v1.0")
	•	theme (string): setting description

Example:
{
  "meta": {
    "level_name": "Foundation: Player Class",
    "level_id": "level_a",
    "version": "v1.0",
    "theme": "Abandoned Research Facility"
  }
}

⸻

Rooms section

Purpose: Define all rooms available in this level.

Each room object:
	•	id (string): unique room identifier (e.g., "airlock")
	•	name (string): display name (e.g., "Airlock")
	•	description (string): room description text
	•	exits (object): direction -> room_id mapping (north/south/east/west)
	•	items (array): list of item IDs present in room
	•	npcs (array): list of NPC IDs present in room
	•	objects (array): list of interactive object IDs (doors, chests, terminals)

Example:
{
  "rooms": [
    {
      "id": "airlock",
      "name": "Airlock",
      "description": "A tight, metallic chamber. Warning lights blink overhead. The outer door is sealed.",
      "exits": {
        "east": "main_corridor"
      },
      "items": [],
      "npcs": [],
      "objects": []
    },
    {
      "id": "main_corridor",
      "name": "Main Corridor",
      "description": "A long corridor stretches ahead. Flickering lights reveal doors on either side.",
      "exits": {
        "west": "airlock",
        "north": "lab_bench",
        "south": "storage_cage",
        "east": "control_terminal"
      },
      "items": ["torch"],
      "npcs": ["maintenance_drone"],
      "objects": []
    }
  ]
}

Room list (final game):
	•	airlock
	•	main_corridor
	•	storage_cage
	•	lab_bench
	•	control_terminal

Earlier levels use subsets of this map.

⸻

Items section

Purpose: Define all items in this level.

Each item object:
	•	id (string): unique item identifier
	•	name (string): display name
	•	description (string): item description
	•	takeable (boolean): can player pick this up?
	•	consumable (boolean): is item consumed on use?
	•	use_on (array): list of target IDs this item can be used on (empty if no targeting)
	•	effect (string): effect type (e.g., "unlock", "heal", "open")

Example:
{
  "items": [
    {
      "id": "keycard",
      "name": "Keycard",
      "description": "A worn security keycard with a faded ID photo.",
      "takeable": true,
      "consumable": false,
      "use_on": ["security_door"],
      "effect": "unlock"
    },
    {
      "id": "med_patch",
      "name": "Med Patch",
      "description": "An emergency medical patch. Apply to heal minor injuries.",
      "takeable": true,
      "consumable": true,
      "use_on": [],
      "effect": "heal"
    }
  ]
}

Final game item list (8 items):
	•	keycard — unlocks security_door
	•	crowbar — opens stuck_chest
	•	torch — illumination (no special effect)
	•	battery — powers terminal puzzles
	•	med_patch — heals player (+20 health)
	•	access_code_note — reveals code (read effect)
	•	shield_plate — adds temporary armour
	•	signal_beacon — triggers ending sequence

⸻

NPCs section

Purpose: Define all NPCs in this level.

Each NPC object:
	•	id (string): unique NPC identifier
	•	name (string): display name
	•	description (string): NPC description
	•	room (string): room ID where NPC is located
	•	dialogue (array): list of dialogue lines (in order)
	•	repeatable (boolean): can player talk again after first interaction?

Example:
{
  "npcs": [
    {
      "id": "maintenance_drone",
      "name": "Maintenance Drone",
      "description": "A battered drone hovers at eye level, emitting occasional sparks.",
      "room": "main_corridor",
      "dialogue": [
        "DRONE: System status... critical. Primary power offline.",
        "DRONE: Keycard required for Lab Bench access. Storage Cage... may contain supplies."
      ],
      "repeatable": true
    }
  ]
}

NPC design rules:
	•	No branching dialogue trees
	•	No persistent conversation state
	•	Dialogue is linear (first line, then second, etc.)
	•	Repeatable NPCs restart from beginning

⸻

Objects section (interactive environment)

Purpose: Define doors, chests, terminals, and other interactive objects.

Each object:
	•	id (string): unique object identifier
	•	type (string): object type (door, chest, terminal, lever)
	•	name (string): display name
	•	description (string): object description
	•	room (string): room ID where object is located
	•	state (string): initial state (locked/unlocked, open/closed)
	•	requires (string or null): item ID required to interact
	•	contains (array): items inside (for chests)
	•	on_interact (string): effect when interacted with

Example:
{
  "objects": [
    {
      "id": "security_door",
      "type": "door",
      "name": "Security Door",
      "description": "A heavy reinforced door blocks access to the Lab Bench.",
      "room": "main_corridor",
      "state": "locked",
      "requires": "keycard",
      "contains": [],
      "on_interact": "unlock"
    },
    {
      "id": "supply_chest",
      "type": "chest",
      "name": "Supply Chest",
      "description": "A battered supply chest. Rusted shut.",
      "room": "storage_cage",
      "state": "closed",
      "requires": "crowbar",
      "contains": ["med_patch", "battery"],
      "on_interact": "open"
    }
  ]
}

⸻

Encounters section

Purpose: Define encounter scenarios for Level G+.

Each encounter:
	•	id (string): unique encounter identifier
	•	name (string): display name
	•	room (string): room where encounter triggers
	•	enemy (object): enemy definition
	•	trigger (string): trigger condition (e.g., "on_enter", "on_interact")

Enemy object:
	•	id (string): enemy identifier
	•	name (string): display name
	•	health (int): starting health
	•	damage (int): base damage per attack
	•	armour (int): damage reduction
	•	behaviour (string): AI behaviour type (e.g., "aggressive", "defensive")

Example:
{
  "encounters": [
    {
      "id": "security_bot_encounter",
      "name": "Security Bot Encounter",
      "room": "control_terminal",
      "enemy": {
        "id": "security_bot",
        "name": "Security Bot",
        "health": 50,
        "damage": 15,
        "armour": 5,
        "behaviour": "aggressive"
      },
      "trigger": "on_enter"
    }
  ]
}

Encounter rules:
	•	One enemy at a time
	•	Engine controls encounter loop
	•	Student code provides player action choices

⸻

Start state section

Purpose: Define the starting snapshot for this level (matches README_10).

Fields:
	•	room (string): starting room ID
	•	player_health (int): starting health
	•	player_type (string or null): if type already assigned
	•	inventory (array): list of item IDs the player starts with
	•	flags (object): world state flags (doors unlocked, etc.)

Example:
{
  "start_state": {
    "room": "airlock",
    "player_health": 100,
    "player_type": null,
    "inventory": [],
    "flags": {}
  }
}

For later levels:
{
  "start_state": {
    "room": "main_corridor",
    "player_health": 100,
    "player_type": "brute",
    "inventory": ["keycard", "torch"],
    "flags": {
      "security_door_unlocked": true
    }
  }
}

⸻

Schema validation rules

Engine should validate world.json on load:
	•	All room exit targets must be valid room IDs
	•	All item IDs in rooms must exist in items array
	•	All NPC IDs in rooms must exist in npcs array
	•	All object room references must be valid
	•	Start state room must exist
	•	Start state inventory items must exist

Validation errors should print clear messages and halt game start.

⸻

Content authoring workflow

1) Create world.json with required schema sections
2) Validate schema (can be automated)
3) Ensure only current-level content is present
4) Generate worksheet map visual from rooms data
5) Test in-game with run_game.py
6) Package level folder

⸻

Per-level content limits

To prevent scope creep, each level should contain:

| Level | Rooms | Items | NPCs | Objects | Encounters |
|-------|-------|-------|------|---------|------------|
| A | 1 | 0 | 0 | 0 | 0 |
| B | 1 | 0 | 0 | 0 | 0 |
| C | 1 | 2 | 0 | 0 | 0 |
| C+ | 1 | 0 | 0 | 1 (terminal) | 0 |
| D | 2 | 3 | 0 | 2 | 0 |
| E | 5 | 4 | 1 | 2 | 0 |
| F | 5 | 4 | 1 | 2 | 0 |
| G | 5 | 6 | 1 | 2 | 1 |
| H | 5 | 6 | 1 | 2 | 1 |
| I | 5 | 8 | 1 | 3 | 1 |

⸻
