"""
Minimal game loop for Level A - tests Player class only.

This simplified version just creates a player and shows status.
Full game functionality will be unlocked in later levels.
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def main():
    """Simple test of Player class."""
    print()
    print("=" * 50)
    print("  SIGMA-7 RESEARCH STATION")
    print("  Level A: Player Class Test")
    print("=" * 50)
    print()
    
    try:
        from student.player import Player
    except ImportError as e:
        print(f"Error: Could not import Player class.")
        print(f"Make sure you've implemented it in student/player.py")
        print(f"Details: {e}")
        sys.exit(1)
    
    # Get player name
    print("You wake up in the station's emergency airlock.")
    print("The intercom crackles: 'Identify yourself, survivor.'")
    print()
    name = input("Enter your name: ").strip()
    if not name:
        name = "Unknown"
    
    # Create player
    try:
        player = Player(name)
    except Exception as e:
        print(f"\nError creating Player: {e}")
        print("Check your __init__ method.")
        sys.exit(1)
    
    print()
    print("-" * 50)
    
    # Show status
    try:
        status = player.get_status()
        print(f"Status: {status}")
    except Exception as e:
        print(f"Error calling get_status(): {e}")
    
    # Test damage
    print()
    print("A piece of debris falls from the ceiling!")
    try:
        player.take_damage(15)
        print(f"You took 15 damage. {player.get_status()}")
    except Exception as e:
        print(f"Error calling take_damage(): {e}")
    
    # Test healing
    print()
    print("You find a medical kit and use it.")
    try:
        player.heal(10)
        print(f"You healed 10 HP. {player.get_status()}")
    except Exception as e:
        print(f"Error calling heal(): {e}")
    
    print()
    print("-" * 50)
    print("Level A test complete! Run validate.py for full checks.")
    print()


if __name__ == "__main__":
    main()
