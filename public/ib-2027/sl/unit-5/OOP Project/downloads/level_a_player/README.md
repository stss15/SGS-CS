# Level A: Foundation - The Player Class

## Welcome to Sigma-7

You've woken up in the emergency airlock of a space station. Before you can explore, you need to build the code that represents YOU in the game.

## Your Task

Create the `Player` class in `student/player.py`. This class will store your character's information and handle damage/healing.

## Files in This Folder

```
level_a_player/
├── student/
│   └── player.py      ← YOUR CODE GOES HERE
├── engine/
│   └── game_loop.py   # Minimal test engine
├── run_game.py        # Run this to test your class
├── validate.py        # Run this to check your code
└── README.md          # You are here
```

## How to Work

1. Open `student/player.py`
2. Read the docstrings and TODO comments
3. Implement each method
4. Run `python3 validate.py` to check your work
5. When all checks pass, run `python3 run_game.py` to see it in action!

## What You Need to Build

The `Player` class needs:

| Attribute | Type | Purpose |
|-----------|------|---------|
| `name` | str | The player's name |
| `health` | int | Current health points |
| `max_health` | int | Maximum health |
| `armour` | int | Damage reduction |
| `accuracy` | int | Hit chance (0-100) |

| Method | Return | Purpose |
|--------|--------|---------|
| `__init__(name)` | None | Set up the player |
| `get_starting_stats()` | dict | Return initial stat values |
| `get_status()` | str | Return formatted status |
| `take_damage(amount)` | None | Reduce health (clamp at 0) |
| `heal(amount)` | None | Increase health (clamp at max) |

## Need Help?

Check the worksheet on the website for:
- UML diagram
- Step-by-step hints
- Key term definitions

Good luck, survivor!
