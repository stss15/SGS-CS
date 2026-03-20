# Sigma-7 Research Station - Level X (Final Game)

This is the **complete final game** — the integration target that all earlier levels peel back from.

## Quick Start

1. Run the validator first:
   ```
   python validate.py
   ```

2. If all checks pass, run the game:
   ```
   python run_game.py
   ```

## Folder Structure

```
level_x_final_game/
├── engine/                     # Teacher-owned game engine (do not edit)
│   ├── __init__.py
│   ├── game_loop.py           # Main game controller
│   ├── command_parser.py      # Input parsing
│   ├── world_loader.py        # Content loading
│   ├── encounter.py           # Combat system
│   ├── save_load.py           # Persistence
│   └── content/               # Game world data (JSON)
│       ├── rooms.json         # 10 rooms
│       ├── items.json         # 14 items
│       ├── npcs.json          # 3 NPCs
│       └── encounters.json    # 4 encounters
├── student_reference/          # Reference implementations
│   ├── player.py              # Player class
│   ├── player_types.py        # Brute & Scout subclasses
│   ├── inventory.py           # Inventory class
│   ├── data_structs.py        # Stack & Queue
│   └── log_search.py          # Search/sort functions
├── saves/                      # Save files (auto-created)
├── run_game.py                # Game entry point
├── validate.py                # Validation script
└── README.md                  # This file
```

## Game Summary

- **Setting**: Sigma-7 Research Station — an orbital facility that went dark
- **Goal**: Discover what happened and escape before the station systems fail
- **Rooms**: 10 explorable areas
- **Items**: 14 collectible items (keys, healing, tools)
- **NPCs**: 3 characters (M-Unit 7, Dr. Aria Chen, SIGMA AI)
- **Encounters**: 4 combat sequences (same system, different enemies)
- **Puzzles**: 3 contained puzzles (Stack/Queue, Log Search, Code Validation)

## Commands

| Command | Description |
|---------|-------------|
| `look` | Describe current room |
| `look <thing>` | Examine something |
| `north/south/east/west` | Move in direction |
| `take <item>` | Pick up item |
| `inventory` | Show carried items |
| `use <item>` | Use item on self |
| `use <item> on <target>` | Use item on something |
| `talk <npc>` | Talk to character |
| `status` | Show your health |
| `save` | Save game |
| `load` | Load saved game |
| `help` | Show commands |
| `quit` | Exit game |

## For Teachers

This Level X folder serves as:
1. The integration target (proof the full game works)
2. Reference implementations for all student contracts
3. Template for creating per-level folders

Per-level folders are created by:
1. Copying this structure
2. Removing student_reference/
3. Adding empty student/ folder
4. Reducing engine content to level-appropriate scope
5. Updating validator to check only that level's contracts
