# Level Specification: Level E - Exploring the Facility

**Type**: Micro-lab + Engine exploration  
**Estimated Time**: 1–2 lessons  
**Prerequisites**: P2

---

## Overview

This level expands the world to the full 10 rooms and adds a small OOP micro-lab focused on aggregation (a Logbook that can exist outside the Player).

---

## Learning Objectives

By the end of this level, students will be able to:
1. Build a simple Logbook class and attach it to a Player (aggregation)
2. Record events through object-to-object interaction
3. Read and trace engine code to understand how rooms are connected
4. Explain how JSON content files are loaded
5. Understand how the command parser routes input
6. Read code they didn't write (important real-world skill)

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Code reading | Understanding existing code written by others |
| JSON | A data format for structured information |
| Parser | Code that interprets and routes user input |
| Content loading | Reading external files to populate game data |
| Integration | How separate code modules work together |
| Aggregation | A has-a relationship where objects exist independently |

---

## Student Deliverables

1. `Logbook` class in `student/logbook.py`
2. `Player.attach_logbook()` and `Player.record_event()` in `student/player.py`
3. Run `run_lab.py` to verify logbook output

---

## Worksheet Content

### Part 1: Logbook Micro-Lab (Aggregation)

Tasks:
- Create a Logbook class that stores entries in a list
- Add methods to add entries, list entries, and read the latest entry
- Attach the Logbook to Player using a dedicated method
- Record events through Player, not by editing Logbook directly

### Part 2: Understanding rooms.json

Questions:
- How many rooms are defined?
- What fields does each room have?
- How are exits represented?
- What is the difference between first-visit and revisit descriptions?

### Part 3: Understanding the World Loader

Questions:
- What function loads the rooms from JSON?
- How does the engine look up a room by ID?
- What happens if a room ID is not found?

### Part 4: Understanding the Command Parser

Questions:
- How does the parser interpret "go north"?
- What synonyms are supported?
- How is the parsed command routed to a handler?

### Part 5: Tracing Your Code

Questions:
- When you call `player.get_status()`, where does it go?
- How does the engine use `player.inventory.list_items()`?
- What would happen if your Inventory class didn't have has_item()?

---

## Engine Content for This Level

### Rooms
- All 10 rooms unlocked:
  - Airlock
  - Storage Cage
  - Lab Bench
  - Main Corridor
  - Engineering
  - Crew Quarters
  - Control Hub
  - Research Archive
  - Medical Bay
  - Command Deck

### Items
- 8 items: Previous + Battery, Data Chip

### NPCs
- Maintenance Drone (M-Unit 7) in Main Corridor

### Encounters
- Sentry Droid (Airlock exit)
- Repair Bot (Engineering)

---

## Validator Scope

Validator for Level E:
- Checks Logbook methods exist and work
- Checks Player.attach_logbook and record_event integrate correctly

---

## Reference Baseline

Ships with teacher's completed all previous code.

Students have a fully working game world to explore.

---

## Worksheet Focus

- Code reading comprehension
- JSON structure understanding
- Following function call chains
- Identifying integration points

---

## Code Reading Excerpts

The worksheet will include excerpts from:

1. **rooms.json** — showing 2-3 room examples
2. **world_loader.py** — showing get_room() method
3. **command_parser.py** — showing synonym handling
4. **game_loop.py** — showing the move handler

Students answer questions about these excerpts WITHOUT seeing complete files.

---

## No UML Diagram

This level focuses on reading existing code, not designing new classes.

---

## Notes for Teachers

- This level prevents cognitive overload before adding more features
- Students practice reading code (essential skill)
- Good opportunity for class discussion
- Can be shortened if time is limited
- Validates understanding before encounter system
- Consider pair work: one student reads, other traces

---

## Purpose of This Level

From the master spec:

> Level E is allowed to be "engine/content growth + code reading" with no student code.

This level:
- Adds a small, focused OOP lab (aggregation)
- Provides a natural "checkpoint" for understanding
- Prepares students for the more complex encounter level (G)
- Demonstrates that games are mostly content, not just code
