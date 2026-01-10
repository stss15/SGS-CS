#!/usr/bin/env python3
"""
Sigma-7 Research Station - Level C

Run this file to test your Inventory!

Usage:
    python3 run_game.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def main():
    print()
    print("=" * 50)
    print("  SIGMA-7 RESEARCH STATION")
    print("  Level C: Inventory Test")
    print("=" * 50)
    print()
    
    try:
        from student.player import Player
        from student.inventory import Inventory
    except ImportError as e:
        print(f"Error: Could not import classes. {e}")
        sys.exit(1)
    
    player = Player("Tester")
    print(f"Welcome, {player.name}!")
    print(f"Your inventory capacity: {Inventory.MAX_CAPACITY}")
    print()
    
    # Test adding items
    items = ["keycard", "crowbar", "torch"]
    for item in items:
        if player.inventory.add(item):
            print(f"Picked up: {item}")
        else:
            print(f"Couldn't add: {item}")
    
    print()
    print(f"Inventory: {player.inventory.list_items()}")
    print(f"Items: {player.inventory.count()}/{Inventory.MAX_CAPACITY}")
    print()
    print("Level C test complete!")

if __name__ == "__main__":
    main()
