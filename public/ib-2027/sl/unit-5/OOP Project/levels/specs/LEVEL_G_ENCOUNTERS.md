# Level Specification: Level G - Threat Response: Security Bot

**Type**: Student builds code  
**Estimated Time**: 2-3 lessons  
**Prerequisites**: Level F

---

## Overview

Students implement combat hooks for the encounter system. The engine owns the combat loop; students provide action selection and damage calculation.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Implement action selection from a list of options
2. Write a damage calculation formula
3. Understand how the engine drives combat while using student methods
4. Apply arithmetic operations in game context

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Encounter | A combat sequence between player and enemy |
| Action selection | Choosing what to do in combat (attack, defend, etc.) |
| Damage calculation | Formula for computing actual damage dealt |
| Armour | A value that reduces incoming damage |
| Combat loop | The turn-by-turn flow of combat (engine-owned) |

---

## Student Deliverables

### Addition to: `student/player.py`

#### Method: `choose_action`

| Aspect | Value |
|--------|-------|
| Signature | `choose_action(self, options: list) -> int` |
| Purpose | Choose a combat action |
| Returns | Integer index (0 to len(options)-1) |

**Behaviour**: Same pattern as respond_to_npc — get input, validate, return index.

#### Method: `compute_damage`

| Aspect | Value |
|--------|-------|
| Signature | `compute_damage(self, base: int, armour: int) -> int` |
| Purpose | Calculate actual damage after armour reduction |
| Returns | Integer: max(0, base - armour) |

---

## Engine Content for This Level

### Rooms
- All 10 rooms

### Items
- 10 items (adds Shield Plate, Stim Pack)

### NPCs
- M-Unit 7

### Encounters
- **Sentry Droid** in Airlock (first encounter)
  - HP: 40, Damage: 12, Armour: 3
  - Blocks exit until defeated

### Combat Options
Engine presents: ["Attack", "Defend", "Use Item", "Run"]

---

## Validator Scope

1. **Structure**
   - choose_action method exists on Player
   - compute_damage method exists on Player

2. **Behaviour**
   - choose_action returns integer in valid range
   - compute_damage(20, 5) returns 15
   - compute_damage(5, 20) returns 0 (not negative)

---

## Reference Baseline

Ships with teacher's completed all Level F code.

---

## Worksheet Focus

- The encounter loop (engine-owned)
- Action selection hooks
- Damage formula: base - armour, minimum 0
- How player stats (accuracy, armour) affect combat

---

## Example Behaviour

```python
# Combat round
options = ["Attack", "Defend", "Use Item", "Run"]
action = player.choose_action(options)  # Player picks 0 (Attack)

# Player attacks
base_damage = 15  # Player's attack strength
enemy_armour = 3  # Enemy's armour
actual_damage = player.compute_damage(base_damage, enemy_armour)
# Returns 12

# Enemy attacks
enemy_damage = 12
player_armour = player.armour  # From stats
damage_to_player = player.compute_damage(enemy_damage, player_armour)
```

---

## UML Diagram

```
┌──────────────────────────────────────┐
│              Player                  │
├──────────────────────────────────────┤
│ + choose_action(options): int        │←── NEW
│ + compute_damage(base, armour): int  │←── NEW
└──────────────────────────────────────┘
         ↑
         │ called by
         │
┌────────┴───────────┐
│  Engine Encounter  │
│       Loop         │
│                    │
│  - Shows options   │
│  - Gets choice     │
│  - Applies damage  │
│  - Checks HP       │
└────────────────────┘
```

---

## Notes for Teachers

- Engine handles the full combat loop
- Student code is just two hooks
- Emphasise the damage formula: max(0, base - armour)
- Defending doubles effective armour (engine handles)
- Multiple encounters use same hooks (3-5 in final game)
- Common mistake: returning negative damage
- Common mistake: not using max()
