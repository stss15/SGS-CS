# Level B: Specialisation - Brute & Scout

## Your Task

Create two subclasses that inherit from Player:
- **Brute**: High HP (120), High Armour (3), Low Accuracy (70)
- **Scout**: Low HP (80), Low Armour (1), High Accuracy (95)

## Files

```
level_b_specialisation/
├── student/
│   ├── player.py        ← Completed from Level A
│   └── player_types.py  ← YOUR CODE GOES HERE
├── run_game.py
├── validate.py
└── README.md
```

## How to Work

1. Open `student/player_types.py`
2. Create `Brute` class that inherits from `Player`
3. Call `super().__init__(name)` to set up the base Player
4. Override the stats with Brute-specific values
5. Create `Scout` class the same way
6. Run `python3 validate.py` to check your work

## The Pattern

```
class Brute(Player):
    def __init__(self, name):
        super().__init__(name)  # Set up as Player first
        # Then customize stats...
```

This pattern is standard in OOP: call the parent constructor first, then customize what's different.
