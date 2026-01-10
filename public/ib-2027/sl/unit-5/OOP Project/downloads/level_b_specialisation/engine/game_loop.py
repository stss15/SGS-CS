"""
Minimal game loop for Level B - tests Player types.

This version lets you choose a character type and shows the stats difference.
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def main():
    """Test character selection with different player types."""
    print()
    print("=" * 50)
    print("  SIGMA-7 RESEARCH STATION")
    print("  Level B: Character Selection Test")
    print("=" * 50)
    print()
    
    try:
        from student.player import Player
        from student.player_types import Brute, Scout
    except ImportError as e:
        print(f"Error: Could not import classes.")
        print(f"Make sure you've implemented Brute and Scout in student/player_types.py")
        print(f"Details: {e}")
        sys.exit(1)
    
    print("The station's security system scans you...")
    print()
    print("Choose your specialisation:")
    print("  1. Brute (High HP, High Armour, Low Accuracy)")
    print("  2. Scout (Low HP, Low Armour, High Accuracy)")
    print("  3. Standard (Balanced)")
    print()
    
    choice = input("Enter 1, 2, or 3: ").strip()
    
    name = input("Enter your name: ").strip() or "Unknown"
    
    if choice == "1":
        player = Brute(name)
        print(f"\nYou are registered as a BRUTE.")
    elif choice == "2":
        player = Scout(name)
        print(f"\nYou are registered as a SCOUT.")
    else:
        player = Player(name)
        print(f"\nYou are registered as STANDARD.")
    
    print()
    print("-" * 50)
    print(f"Name:     {player.name}")
    print(f"Health:   {player.health}/{player.max_health}")
    print(f"Armour:   {player.armour}")
    print(f"Accuracy: {player.accuracy}%")
    print("-" * 50)
    print()
    print("Level B test complete! Run validate.py for full checks.")
    print()


if __name__ == "__main__":
    main()
