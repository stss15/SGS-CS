#!/usr/bin/env python3
"""Level D - Item Use Test"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def main():
    print("\n" + "="*50 + "\n  SIGMA-7: Level D Test\n" + "="*50 + "\n")
    from student.player import Player
    p = Player("Tester")
    p.inventory.add("keycard")
    p.inventory.add("med_patch")
    p.take_damage(40)
    print(f"Health: {p.health}/{p.max_health}")
    print(f"Inventory: {p.inventory.list_items()}\n")
    print("Using keycard on door:", p.use_item("keycard", "door"))
    print("Using med_patch:", p.use_item("med_patch", "self"))
    print(f"\nHealth after: {p.health}/{p.max_health}")
    print(f"Inventory after: {p.inventory.list_items()}")

if __name__ == "__main__": main()
