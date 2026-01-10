# Level Specification: Level F - First Contact: Drone Dialogue

**Type**: Student builds code  
**Estimated Time**: 1-2 lessons  
**Prerequisites**: Level E

---

## Overview

Students implement a simple NPC interaction hook. The engine handles dialogue scripting; students only provide the response selection method.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Implement a method that returns an index from a list
2. Handle user input and validate it's in range
3. Understand how hooks work (student code called by engine)
4. Integrate simple user interaction into the game

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Hook | A method the engine calls at a specific point |
| Index | The position of an item in a list (0-based) |
| Input validation | Checking that user input is acceptable |
| Range check | Ensuring a number is within valid bounds |
| NPC | Non-Player Character — a game character controlled by the engine |

---

## Student Deliverables

### Addition to: `student/player.py`

#### New Method: `respond_to_npc`

| Aspect | Value |
|--------|-------|
| Signature | `respond_to_npc(self, options: list) -> int` |
| Purpose | Choose a dialogue option when talking to an NPC |
| Returns | Integer index (0 to len(options)-1) |

**Behaviour Requirements**:
- Receive a list of dialogue options
- Get player input (prompt for number)
- Validate input is in range
- Return the chosen index (0-based)
- If invalid input, keep asking until valid

---

## Engine Content for This Level

### Rooms
- All 10 rooms

### Items
- 8 items

### NPCs
- **M-Unit 7** (Maintenance Drone) in Main Corridor
  - 4 dialogue exchanges
  - Provides hints about the game

### Encounters
- None yet

### New Commands
- `talk <npc>` — initiate dialogue

---

## Validator Scope

1. **Structure**
   - respond_to_npc method exists on Player

2. **Behaviour**
   - Returns an integer
   - Returns value in valid range (0 to len-1)

Note: Validator can only check that a valid integer is returned. 
Interactive input cannot be tested automatically.

---

## Reference Baseline

Ships with teacher's completed all Level E code.

---

## Worksheet Focus

- What is a hook method?
- How the engine uses student code
- Input validation patterns
- Converting 1-based user input to 0-based index

---

## Example Behaviour

```
# Engine calls:
options = ["Ask about the door", "Ask about the escape", "Ask what happened"]
choice = player.respond_to_npc(options)

# Student's method:
# - Displays options (or engine displays them)
# - Gets input from player
# - Returns 0, 1, or 2

# Engine then shows the NPC's response for that choice
```

---

## UML Diagram

```
┌────────────────────────────────────┐
│              Player                │
├────────────────────────────────────┤
│ + respond_to_npc(options): int     │←── NEW
└────────────────────────────────────┘
        ↑
        │ called by
        │
┌───────┴────────────┐
│    Engine NPC      │
│    Dialogue Loop   │
└────────────────────┘
```

---

## Notes for Teachers

- This is a simple "hook" method
- Engine handles all dialogue content
- Student code just selects which option
- Good opportunity to discuss separation of concerns
- Common mistake: returning 1-based instead of 0-based
- Common mistake: not handling invalid input
