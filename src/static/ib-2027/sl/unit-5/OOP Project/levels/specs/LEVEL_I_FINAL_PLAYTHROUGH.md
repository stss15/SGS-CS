# Level Specification: Level I - Mission Complete: Final Playthrough

**Type**: Playthrough and reflection (no new student code)  
**Estimated Time**: 1 lesson  
**Prerequisites**: Level H

---

## Overview

Students play through the complete game, then read the main loop code and reflect on how all their code integrates together.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Play the complete text adventure from start to finish
2. Identify where their code is called in the engine
3. Trace the flow from user input to game response
4. Reflect on the OOP concepts they've applied
5. Appreciate how modular design enables complex systems

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Integration | How separate modules work together as a whole |
| Main loop | The central game cycle (input → process → output) |
| Modular design | Building systems from independent, replaceable parts |
| Reflection | Thinking about what you've learned and built |
| Tracing | Following code execution step by step |

---

## Student Deliverables

**None** — this is a playthrough and reflection level.

**Optional extension**: Add a custom status message or item flavour text.

---

## Worksheet Content

### Part 1: Play the Game (20 minutes)

Play from start to escape. Try to:
- Explore all 10 rooms
- Collect key items
- Talk to NPCs
- Complete at least one encounter
- Save and load your game
- Reach the ending

### Part 2: Read the Main Loop (15 minutes)

Read excerpts from `engine/game_loop.py`:
- The command parsing flow
- How look/move/take are handled
- Where your player methods are called
- How the encounter loop works

### Part 3: Reflection Questions (15 minutes)

1. **Encapsulation**: How does the Inventory class protect its internal data?
2. **Inheritance**: How do Brute and Scout differ from base Player?
3. **Composition**: What is the relationship between Player and Inventory?
4. **Polymorphism**: How does the engine call the same method and get different results?
5. **Separation of concerns**: Why doesn't the student code do file I/O directly?
6. **Real-world parallel**: How would this design apply to a commercial game?

---

## Engine Content for This Level

### Complete Final Game
- All 10 rooms
- All 14 items
- All 3 NPCs (M-Unit 7, Aria, SIGMA)
- All 4 encounters
- All 3 contained puzzles
- Save/load fully functional
- Victory condition active

---

## Validator Scope

The final validator runs ALL checks from ALL previous levels:
- 32+ checks total
- All structure checks
- All behaviour checks
- Full coverage

---

## Reference Baseline

Ships with teacher's fully complete game:
- All student code implemented
- All engine components working
- Ready to play start-to-finish

---

## Worksheet Focus

- Playing the complete experience
- Reading main loop code
- Integration understanding
- OOP concept reflection
- Real-world connections

---

## Code Reading Excerpts

The worksheet includes excerpts from:

1. **game_loop.py** — The Game.start() method
2. **game_loop.py** — The command routing (_handle_command)
3. **game_loop.py** — How player.use_item() is called
4. **encounter.py** — How player.choose_action() and compute_damage() are used

---

## Reflection Exercise

Students complete a reflection document answering:

1. What OOP concept was most challenging to learn?
2. What OOP concept do you understand best now?
3. How did modular design help build this complex game?
4. If you were to add a new feature, what would it be and which module would need changes?
5. How might professional game developers use similar patterns?

---

## Notes for Teachers

- This level celebrates completion
- Allow time for playing and exploring
- The reflection is important for consolidation
- Consider peer discussion of reflection questions
- Optional: Have students present their favourite part
- Optional: Extension task for advanced students

---

## Success Criteria

Students demonstrate completion by:
- [ ] Reaching the victory screen
- [ ] Answering reflection questions thoughtfully
- [ ] Validator passes all 32+ checks
- [ ] Understanding of code integration demonstrated

---

## Optional Extension

For advanced students who finish early:

1. Add a custom status message to get_status()
2. Add flavour text for a new item in use_item()
3. Create a simple documentation of their code
4. Design (on paper) a new room/item/encounter

These extensions don't affect the core game but provide additional practice.
