# LEVEL_LIST_FINAL_NAMING_DRAFT.md

**Purpose**: Propose the final level set with official names and one-line purposes.

**Date**: 2026-01-10  
**Status**: Draft for Review

---

## Naming Convention

Each level has:
- **Level ID**: A letter (A–I) for ordering
- **Slug**: Short hyphenated name for folder/file names
- **Display Name**: Human-readable title for worksheets
- **Tagline**: One-line purpose statement

---

## Final Level List

### Preflight

| Field | Value |
|-------|-------|
| **Level ID** | — (no letter) |
| **Slug** | `preflight-oop-intro` |
| **Display Name** | OOP Foundations: Classic Examples |
| **Tagline** | Warm up with real-world OOP patterns before entering the facility. |
| **Student Builds** | Nothing (teacher-led demo) |
| **Time** | 1 lesson |

---

### Level A

| Field | Value |
|-------|-------|
| **Level ID** | A |
| **Slug** | `level-a-player-class` |
| **Display Name** | Foundation: The Player Class |
| **Tagline** | Create your first class and see it come alive in the Airlock. |
| **Student Builds** | `Player` class with constructor, `get_status()`, `take_damage()`, `heal()` |
| **Time** | 2–3 lessons |

---

### Level B

| Field | Value |
|-------|-------|
| **Level ID** | B |
| **Slug** | `level-b-inheritance` |
| **Display Name** | Specialisation: Brute and Scout |
| **Tagline** | Extend the Player class into two distinct specialists. |
| **Student Builds** | `Brute` and `Scout` subclasses with overridden `get_starting_stats()` |
| **Time** | 2–3 lessons |

---

### Level C

| Field | Value |
|-------|-------|
| **Level ID** | C |
| **Slug** | `level-c-inventory` |
| **Display Name** | Carrying Capacity: The Inventory System |
| **Tagline** | Give your player the ability to collect and manage items. |
| **Student Builds** | `Inventory` class with `add()`, `remove()`, `list_items()`, `has_item()`, `MAX_CAPACITY` |
| **Time** | 2–3 lessons |

---

### Level C+

| Field | Value |
|-------|-------|
| **Level ID** | C+ |
| **Slug** | `level-c-plus-data-structs` |
| **Display Name** | Terminal Access: Stacks and Queues |
| **Tagline** | Build data structures to unlock the research terminal. |
| **Student Builds** | `Stack` class (push/pop/peek), `Queue` class (enqueue/dequeue/front) |
| **Time** | 1–2 lessons |

---

### Level D

| Field | Value |
|-------|-------|
| **Level ID** | D |
| **Slug** | `level-d-interactions` |
| **Display Name** | Making Things Happen: Item Interactions |
| **Tagline** | Use items on the world to unlock doors and heal wounds. |
| **Student Builds** | `Player.use_item()`, `Inventory.consume()` |
| **Time** | 2–3 lessons |

---

### Level E

| Field | Value |
|-------|-------|
| **Level ID** | E |
| **Slug** | `level-e-world-expansion` |
| **Display Name** | Exploring the Facility: Rooms and Navigation |
| **Tagline** | The full facility map unlocks—explore five connected rooms. |
| **Student Builds** | Code reading exercise (no new classes) |
| **Time** | 1 lesson |

---

### Level F

| Field | Value |
|-------|-------|
| **Level ID** | F |
| **Slug** | `level-f-npc-dialogue` |
| **Display Name** | First Contact: Talking to the Drone |
| **Tagline** | Connect with the Maintenance Drone and receive crucial hints. |
| **Student Builds** | `Player.respond_to_npc()` |
| **Time** | 1–2 lessons |

---

### Level G

| Field | Value |
|-------|-------|
| **Level ID** | G |
| **Slug** | `level-g-encounter` |
| **Display Name** | Threat Response: The Security Bot |
| **Tagline** | Face the Security Bot using turn-based decision hooks. |
| **Student Builds** | `Player.choose_action()`, `Player.compute_damage()` |
| **Time** | 2–3 lessons |

---

### Level H

| Field | Value |
|-------|-------|
| **Level ID** | H |
| **Slug** | `level-h-persistence` |
| **Display Name** | Checkpoints: Save and Load Progress |
| **Tagline** | Persist your game state to file and restore it later. |
| **Student Builds** | `Player.to_save_data()`, `Player.from_save_data()` |
| **Time** | 2–3 lessons |

---

### Level I

| Field | Value |
|-------|-------|
| **Level ID** | I |
| **Slug** | `level-i-final-playthrough` |
| **Display Name** | Mission Complete: Final Playthrough |
| **Tagline** | Experience the full adventure and reflect on your OOP journey. |
| **Student Builds** | Nothing new (optional polish task) |
| **Time** | 1 lesson |

---

## Level Summary Table

| ID | Slug | Display Name | Builds | Time |
|----|------|--------------|--------|------|
| — | preflight-oop-intro | OOP Foundations | — | 1 |
| A | level-a-player-class | Foundation: The Player Class | Player class | 2–3 |
| B | level-b-inheritance | Specialisation: Brute and Scout | Brute, Scout | 2–3 |
| C | level-c-inventory | Carrying Capacity: Inventory | Inventory class | 2–3 |
| C+ | level-c-plus-data-structs | Terminal Access: Stacks and Queues | Stack, Queue | 1–2 |
| D | level-d-interactions | Making Things Happen: Item Use | use_item, consume | 2–3 |
| E | level-e-world-expansion | Exploring the Facility | Code reading | 1 |
| F | level-f-npc-dialogue | First Contact: Talking to Drone | respond_to_npc | 1–2 |
| G | level-g-encounter | Threat Response: Security Bot | choose_action, compute_damage | 2–3 |
| H | level-h-persistence | Checkpoints: Save and Load | to_save_data, from_save_data | 2–3 |
| I | level-i-final-playthrough | Mission Complete | — | 1 |

**Total Time**: 18–24 lessons

---

## Folder Structure

Each level folder should be named using the slug:

```
levels/
├── preflight-oop-intro/
│   └── (website-only, no download)
├── level-a-player-class/
│   ├── engine/
│   ├── student/
│   ├── spec/
│   ├── saves/
│   ├── validate.py
│   ├── run_game.py
│   └── README_LEVEL.md
├── level-b-inheritance/
│   └── ...
├── level-c-inventory/
│   └── ...
├── level-c-plus-data-structs/
│   └── ...
├── level-d-interactions/
│   └── ...
├── level-e-world-expansion/
│   └── ...
├── level-f-npc-dialogue/
│   └── ...
├── level-g-encounter/
│   └── ...
├── level-h-persistence/
│   └── ...
└── level-i-final-playthrough/
    └── ...
```

---

## Worksheet URL Structure

Website pages should follow:

```
/ib-2027/sl/unit-5/oop-project/
├── index.html                    (overview page)
├── preflight.html                (Preflight worksheet)
├── level-a.html                  (Level A worksheet)
├── level-b.html                  (Level B worksheet)
├── level-c.html                  (Level C worksheet)
├── level-c-plus.html             (Level C+ worksheet)
├── level-d.html                  (Level D worksheet)
├── level-e.html                  (Level E worksheet)
├── level-f.html                  (Level F worksheet)
├── level-g.html                  (Level G worksheet)
├── level-h.html                  (Level H worksheet)
└── level-i.html                  (Level I worksheet)
```

---

## Narrative Arc

The level names and taglines create a cohesive story:

1. **OOP Foundations** — Learn the tools before the mission
2. **Foundation** — Awaken in the Airlock as a new entity
3. **Specialisation** — Choose your identity (Brute or Scout)
4. **Carrying Capacity** — Gain the ability to collect resources
5. **Terminal Access** — Unlock the research terminal
6. **Making Things Happen** — Interact with the environment
7. **Exploring the Facility** — Discover the full map
8. **First Contact** — Meet another intelligence (the Drone)
9. **Threat Response** — Face the Security Bot
10. **Checkpoints** — Ensure progress is not lost
11. **Mission Complete** — Escape and reflect

---

## Verification Checklist

Before finalising names:

- [ ] Each level name is distinct and memorable
- [ ] Each tagline conveys the core learning outcome
- [ ] Slugs work as folder names (no spaces, lowercase)
- [ ] Display names work as worksheet titles
- [ ] Narrative arc feels coherent
- [ ] Time estimates are realistic

---

## Alternative Names Considered

| Level | Final Name | Alternatives Considered |
|-------|-----------|------------------------|
| A | Foundation: The Player Class | First Steps, Awakening, Genesis |
| B | Specialisation: Brute and Scout | Branching Paths, Identity, Evolution |
| C | Carrying Capacity: Inventory | Backpack, Collection, Storage |
| C+ | Terminal Access: Stacks and Queues | Data Structures, The Terminal, Access Codes |
| D | Making Things Happen | Interactions, Object Use, Mechanisms |
| E | Exploring the Facility | Navigation, The Map, Orientation |
| F | First Contact | The Drone, Communication, Dialogue |
| G | Threat Response | Combat, The Bot, Confrontation |
| H | Checkpoints | Persistence, Save Points, Memory |
| I | Mission Complete | Endgame, Finale, Reflection |

---

## Summary

This document proposes 11 level units (Preflight + A–I) with:
- Clear, thematic display names
- Developer-friendly slugs for folder/URL naming
- One-line taglines for quick understanding
- Consistent time estimates
- A coherent narrative arc

Ready for review and approval before folder creation begins.
