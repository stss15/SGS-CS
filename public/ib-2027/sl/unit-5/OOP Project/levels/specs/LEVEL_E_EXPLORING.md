# Level Specification: Level E - Exploring the Facility

**Type**: Code reading / Engine expansion (no new student code)  
**Estimated Time**: 1 lesson  
**Prerequisites**: P2

---

## Overview

This level expands the world to the full 10 rooms but requires NO new student code. Students learn by reading and understanding the engine's architecture.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Read and trace engine code to understand how rooms are connected
2. Explain how JSON content files are loaded
3. Understand how the command parser routes input
4. Identify how their student code integrates with the engine
5. Read code they didn't write (important real-world skill)

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Code reading | Understanding existing code written by others |
| JSON | A data format for structured information |
| Parser | Code that interprets and routes user input |
| Content loading | Reading external files to populate game data |
| Integration | How separate code modules work together |

---

## Student Deliverables

**None** — this is a code reading level.

---

## Worksheet Content

### Part 1: Understanding rooms.json

Questions:
- How many rooms are defined?
- What fields does each room have?
- How are exits represented?
- What is the difference between first-visit and revisit descriptions?

### Part 2: Understanding the World Loader

Questions:
- What function loads the rooms from JSON?
- How does the engine look up a room by ID?
- What happens if a room ID is not found?

### Part 3: Understanding the Command Parser

Questions:
- How does the parser interpret "go north"?
- What synonyms are supported?
- How is the parsed command routed to a handler?

### Part 4: Tracing Your Code

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
- None yet

### Encounters
- None yet

---

## Validator Scope

Validator for Level E:
- Runs all previous level checks
- No new checks (no new student code)

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
- Expands the world without expanding student responsibilities
- Provides a natural "checkpoint" for understanding
- Prepares students for the more complex encounter level (G)
- Demonstrates that games are mostly content, not just code
