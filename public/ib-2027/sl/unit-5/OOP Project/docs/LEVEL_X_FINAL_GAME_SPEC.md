# LEVEL_X_FINAL_GAME_SPEC.md

**Purpose**: Define the complete final game (Level X) — the integration target that all earlier levels peel back from.

**Date**: 2026-01-10  
**Status**: FROZEN

---

## 1) Narrative Overview

### Setting
The **Sigma-7 Research Station** — an orbital facility that went dark three months ago. The player awakens in an emergency pod with fragmented memories. Their mission: discover what happened and escape before the station's failing systems become fatal.

### Story Arc (Linear)

1. **Awakening** (Airlock) — Player wakes, chooses character type
2. **Exploration** (Main Corridor, Storage, Lab) — Gather items, read logs, piece together story
3. **First Contact** (Drone encounter) — Meet the Maintenance Drone, get hints
4. **Terminal Access** (Control Hub) — Stack/Queue puzzle to unlock systems
5. **Data Recovery** (Research Archive) — Search/sort logs to find critical code
6. **Confrontations** (3-5 encounters with Security Bots/Malfunctioning Units)
7. **Escape Sequence** (Command Deck) — Use collected items to activate escape pod
8. **Ending** — Escape successful, mystery partially revealed

### Tone
Atmospheric sci-fi horror-lite. Tension from isolation and discovery, not gore. Think *Alien* meets *System Shock* meets *Zork*.

---

## 2) World Map (10 Rooms)

```
                    ┌─────────────────┐
                    │  Command Deck   │
                    │   (final goal)  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────┴─────────┐    │    ┌─────────┴─────────┐
    │  Research Archive │    │    │   Medical Bay     │
    │   (P2: log sort)  │    │    │   (healing items) │
    └───────────────────┘    │    └───────────────────┘
                             │
                    ┌────────┴────────┐
                    │   Control Hub   │
                    │ (P1: terminal)  │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
┌────────┴────────┐ ┌────────┴────────┐ ┌────────┴────────┐
│  Engineering    │ │  Main Corridor  │ │  Crew Quarters  │
│  (encounter 2)  │ │  (central hub)  │ │    (NPC: Aria)  │
└─────────────────┘ └────────┬────────┘ └─────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────┴─────────┐    │    ┌─────────┴─────────┐
    │   Storage Cage    │    │    │    Lab Bench      │
    │   (items, chest)  │    │    │   (items, logs)   │
    └───────────────────┘    │    └───────────────────┘
                             │
                    ┌────────┴────────┐
                    │     Airlock     │
                    │ (start, enc. 1) │
                    └─────────────────┘
```

### Room Details

| Room ID | Display Name | Description | Key Content |
|---------|--------------|-------------|-------------|
| airlock | Emergency Airlock | Cramped pod bay, emergency lights flickering, escape pod visible but offline | Start location, Encounter 1 (Sentry Droid) |
| storage_cage | Storage Cage | Reinforced cage with scattered supplies, locked chest | Chest (crowbar needed), Keycard, Torch |
| lab_bench | Lab Bench | Research station with broken equipment, scattered notes | Med Patch, Access Code Note, Data Chip |
| main_corridor | Main Corridor | Central hub, damaged ceiling panels, three-way junction | Crowbar (hidden), Maintenance Drone spawn |
| engineering | Engineering Bay | Massive engine core, sparking conduits, warning signs | Battery, Shield Plate, Encounter 2 (Repair Bot) |
| crew_quarters | Crew Quarters | Personal bunks, belongings scattered, signs of hasty departure | NPC: Aria (survivor), Personal Log |
| control_hub | Control Hub | Central terminal room, screens showing error codes | P1: Stack/Queue puzzle, Power Cell |
| research_archive | Research Archive | Banks of data servers, corrupted displays | P2: Log search/sort puzzle, Override Key |
| medical_bay | Medical Bay | Sterile room, supply cabinets, emergency stretcher | Med Kit, Stim Pack, Encounter 3 (Medical Bot) |
| command_deck | Command Deck | Bridge with panoramic view of stars, captain's chair | Final goal, Signal Beacon, Encounter 4 (Security Chief) |

---

## 3) Items (14 Total)

| Item ID | Display Name | Location | Purpose | Consumable |
|---------|-------------|----------|---------|------------|
| keycard | Security Keycard | storage_cage | Unlocks lab_bench door | No |
| crowbar | Crowbar | main_corridor (hidden) | Opens storage chest | No |
| torch | Flashlight | storage_cage (chest) | Reveals hidden items, some rooms | No |
| battery | Power Cell | engineering | Powers terminal puzzle | No |
| med_patch | Med Patch | lab_bench | Heals +20 HP | Yes |
| access_code_note | Access Code Note | lab_bench | Reveals terminal hints | No |
| data_chip | Corrupted Data Chip | lab_bench | Used in research_archive puzzle | No |
| shield_plate | Shield Plate | engineering | +15 temporary armour | Yes |
| power_cell | Control Cell | control_hub | Unlocks command_deck | No |
| override_key | Override Key | research_archive | Final unlock for escape pod | No |
| med_kit | Medical Kit | medical_bay | Heals +50 HP | Yes |
| stim_pack | Emergency Stim | medical_bay | Temporary +10 damage | Yes |
| personal_log | Aria's Log | crew_quarters | Story/lore item | No |
| signal_beacon | Distress Beacon | command_deck | Triggers ending sequence | No |

---

## 4) NPCs (3 Total)

| NPC ID | Display Name | Location | Role | Dialogue |
|--------|-------------|----------|------|----------|
| maintenance_drone | M-Unit 7 | main_corridor | Helper/hints | 4 lines: hints about storage, terminal, archive, escape route |
| aria | Dr. Aria Chen | crew_quarters | Survivor/story | 6 lines: backstory, what happened, warning about Security Chief |
| ship_ai | SIGMA (Ship AI) | control_hub (voice only) | Antagonist hints | 3 lines: cryptic warnings after puzzle solved |

### Dialogue Design
- No branching trees
- Fixed responses triggered by `talk <npc>` command
- Player can choose response index (1, 2, or 3) but outcomes are similar
- NPC dialogue advances after certain story flags (engine-owned)

---

## 5) Encounters (4 Total)

All encounters use the **same encounter system** with content-only variations.

| Encounter ID | Enemy | HP | Damage | Armour | Location | Trigger |
|--------------|-------|-----|--------|--------|----------|---------|
| sentry_droid | Sentry Droid | 40 | 12 | 3 | airlock | First room exit attempt |
| repair_bot | Malfunctioning Repair Bot | 55 | 15 | 5 | engineering | On first entry |
| medical_bot | Corrupted Medical Unit | 35 | 18 | 2 | medical_bay | On first entry |
| security_chief | Security Chief Unit | 80 | 20 | 8 | command_deck | Final boss, on first entry |

### Encounter Flow (Engine-Owned)

1. Trigger encounter
2. Display intro text
3. Loop:
   - Show options: [Attack, Defend, Use Item, Run]
   - Call `player.choose_action(options)` → get index
   - Apply player action
   - Apply enemy action (fixed pattern)
   - Check end conditions
4. End: player wins, loses, or runs

### Enemy Behaviour (Fixed Patterns)
- Sentry: Attack, Attack, Defend, repeat
- Repair Bot: Defend, Attack, Attack, repeat
- Medical Bot: Attack every turn
- Security Chief: Attack, Attack, Defend, Attack, repeat

---

## 6) Contained Puzzles (3 Total)

### P1: Stack/Queue Terminal (Control Hub)

**Narrative**: The terminal requires processing a sequence of commands in the correct order.

**Mechanics**:
- Engine presents a list of 5 "commands" (strings)
- Student's Stack/Queue classes are used to process them
- Stack puzzle: "Undo sequence" — push all, pop in reverse
- Queue puzzle: "Execute in order" — enqueue all, dequeue in order

**Success**: Returns correct sequence → unlocks passage to command_deck

### P2: Log Search/Sort (Research Archive)

**Narrative**: Thousands of corrupted log entries. Find the one with the override code.

**Mechanics**:
- Engine provides list of 20 log entry dicts: `{timestamp, author, content, corrupted}`
- Student's `search_logs(logs, author)` or `sort_logs(logs, key)` is called
- Task: sort by timestamp descending, find first non-corrupted entry by "Dr. Chen"

**Success**: Returns correct log entry → reveals override_key location

### Access Code Validator (Control Hub or Research Archive)

**Narrative**: Security system requires codes that haven't been used before.

**Mechanics**:
- Student's `validate_code(code, used_codes)` is called
- Uses set membership to check uniqueness
- Engine tracks used codes; student function validates

**Success**: Correct validation → allows passage

---

## 7) Save/Load Model

### What is Saved

| Data | Source |
|------|--------|
| player_name | Player.name |
| player_type | "brute" or "scout" |
| player_health | Player.health |
| player_stats | Player.health, max_health, armour, accuracy |
| inventory_items | Inventory.list_items() |
| current_room | Engine state |
| world_flags | Engine state (doors unlocked, encounters defeated) |

### File Format
- JSON at `saves/game_save.json`
- Engine handles file I/O
- Student provides `to_save_data()` and `from_save_data()`

### Error Handling
- Missing file: fresh start
- Corrupt file: fresh start with message
- No exceptions leak to student code

---

## 8) Player Types (2 Subclasses)

| Type | Health | Armour | Accuracy | Special |
|------|--------|--------|----------|---------|
| Brute | 120 | 3 | 70 | Higher damage, lower accuracy |
| Scout | 80 | 1 | 95 | Lower damage, higher accuracy |

Both override `describe_specialty() -> str`.

---

## 9) Commands (Engine-Owned Parser)

| Command | Action |
|---------|--------|
| look | Show room description + exits + visible items |
| examine \<thing\> | Detailed description of item/object/NPC |
| move \<direction\> | Move to adjacent room (north/south/east/west/up/down) |
| take \<item\> | Pick up item, add to inventory |
| inventory | List inventory contents |
| use \<item\> | Use item on self |
| use \<item\> on \<target\> | Use item on target |
| talk \<npc\> | Initiate NPC dialogue |
| save | Save game state |
| load | Load saved game state |
| help | Show available commands |
| status | Show player status |
| quit | Exit game |

---

## 10) Content Quality Standards (AAA Feel)

### Room Descriptions
Each room has:
- **First visit**: 80-120 words, atmospheric, sets scene
- **Revisit**: 30-50 words, reminder of key features
- **Dark variant**: Different text if torch not equipped (some rooms)

### Item Descriptions
- **In-room**: 1-2 sentences visible in room
- **Examine**: 40-60 words with flavour, hints at use
- **In-inventory**: Short confirmation of possession

### Lore Integration
- Access Code Note contains hints
- Personal logs reveal story
- Environmental details (scratches on walls, spent shell casings)
- SIGMA's cryptic messages

### NPC Voice
- M-Unit 7: Stilted, robotic, helpful
- Aria: Exhausted, frightened, grateful
- SIGMA: Cold, omniscient, slightly menacing

---

## 11) Scope Guardrails

### Explicitly NOT Included

| Excluded | Reason |
|----------|--------|
| Multiple endings | Scope creep |
| Branching dialogue | Complexity |
| Skill trees | Not OOP focused |
| Crafting system | Unnecessary |
| Timed events | Complexity |
| Multiple save slots | Keep simple |
| Permadeath | Frustrating |
| Complex puzzles | Keep accessible |

### Hard Limits

- 10 rooms (exactly)
- 14 items (exactly)
- 3 NPCs (exactly)
- 4 encounters (exactly)
- 3 contained puzzles (exactly)
- Linear story only

---

## 12) Success Criteria

Level X is complete when:
- [ ] Game runs from start to escape ending
- [ ] All 10 rooms navigable
- [ ] All 14 items takeable/usable
- [ ] All 3 NPCs talkable
- [ ] All 4 encounters completable
- [ ] All 3 puzzles solvable
- [ ] Save/load works correctly
- [ ] Both player types playable
- [ ] Content feels polished and immersive
- [ ] validate.py passes all contracts
