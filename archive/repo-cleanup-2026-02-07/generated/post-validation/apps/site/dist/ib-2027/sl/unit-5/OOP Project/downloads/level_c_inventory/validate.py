#!/usr/bin/env python3
"""
Validator for Level C - Inventory

Run this to check if your Inventory class is correct.

Usage:
    python3 validate.py
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


class ValidationResult:
    def __init__(self):
        self.passed = []
        self.failed = []
    
    def add_pass(self, name: str):
        self.passed.append(name)
        print(f"  ✓ {name}")
    
    def add_fail(self, name: str, reason: str):
        self.failed.append((name, reason))
        print(f"  ✗ {name}")
        print(f"    → {reason}")
    
    def summary(self) -> bool:
        print()
        print("=" * 50)
        if self.failed:
            print(f"FAIL: {len(self.failed)} check(s) failed")
            print("=" * 50)
            return False
        else:
            print(f"PASS: All {len(self.passed)} checks passed!")
            print("=" * 50)
            print()
            print("Great work! You can now run the game:")
            print("  python3 run_game.py")
            print()
            return True


def main():
    print()
    print("=" * 50)
    print("  LEVEL C VALIDATOR")
    print("  Checking Inventory class...")
    print("=" * 50)
    
    results = ValidationResult()
    
    # Import checks
    print("\n--- Import Checks ---")
    try:
        from student.inventory import Inventory
        results.add_pass("Import Inventory class")
    except ImportError as e:
        results.add_fail("Import Inventory class", str(e))
        results.summary()
        sys.exit(1)
    
    # Class variable check
    print("\n--- Class Variable Checks ---")
    if hasattr(Inventory, 'MAX_CAPACITY'):
        if Inventory.MAX_CAPACITY > 0:
            results.add_pass("MAX_CAPACITY exists and is positive")
        else:
            results.add_fail("MAX_CAPACITY", "Should be a positive number")
    else:
        results.add_fail("MAX_CAPACITY", "Class variable not found")
    
    # Instantiation check
    print("\n--- Method Checks ---")
    try:
        inv = Inventory()
        results.add_pass("Create Inventory instance")
    except Exception as e:
        results.add_fail("Create Inventory instance", str(e))
        results.summary()
        sys.exit(1)
    
    # Empty inventory checks
    try:
        if inv.count() == 0:
            results.add_pass("Empty inventory has count() == 0")
        else:
            results.add_fail("count()", f"Expected 0, got {inv.count()}")
    except Exception as e:
        results.add_fail("count()", str(e))
    
    try:
        if inv.is_full() == False:
            results.add_pass("Empty inventory is_full() returns False")
        else:
            results.add_fail("is_full()", "Should be False when empty")
    except Exception as e:
        results.add_fail("is_full()", str(e))
    
    # Add checks
    try:
        result = inv.add("keycard")
        if result == True:
            results.add_pass("add() returns True on success")
        else:
            results.add_fail("add()", f"Expected True, got {result}")
    except Exception as e:
        results.add_fail("add()", str(e))
    
    try:
        if inv.has_item("keycard"):
            results.add_pass("has_item() returns True for existing item")
        else:
            results.add_fail("has_item()", "Should return True for 'keycard'")
    except Exception as e:
        results.add_fail("has_item()", str(e))
    
    # Duplicate check
    try:
        result = inv.add("keycard")
        if result == False:
            results.add_pass("add() returns False for duplicate")
        else:
            results.add_fail("add() duplicate", "Should return False")
    except Exception as e:
        results.add_fail("add() duplicate", str(e))
    
    # list_items check
    try:
        items = inv.list_items()
        if isinstance(items, list) and "keycard" in items:
            results.add_pass("list_items() returns list with added item")
        else:
            results.add_fail("list_items()", f"Expected list with 'keycard', got {items}")
    except Exception as e:
        results.add_fail("list_items()", str(e))
    
    # Remove check
    try:
        result = inv.remove("keycard")
        if result == True and not inv.has_item("keycard"):
            results.add_pass("remove() works correctly")
        else:
            results.add_fail("remove()", "Should return True and remove item")
    except Exception as e:
        results.add_fail("remove()", str(e))
    
    # Capacity check
    print("\n--- Capacity Checks ---")
    try:
        inv2 = Inventory()
        for i in range(Inventory.MAX_CAPACITY):
            inv2.add(f"item_{i}")
        
        if inv2.is_full():
            results.add_pass("is_full() returns True at capacity")
        else:
            results.add_fail("is_full()", "Should return True when at MAX_CAPACITY")
        
        if inv2.add("one_more") == False:
            results.add_pass("add() returns False when full")
        else:
            results.add_fail("add() when full", "Should return False")
    except Exception as e:
        results.add_fail("Capacity checks", str(e))
    
    # Player integration check
    print("\n--- Integration Checks ---")
    try:
        from student.player import Player
        p = Player("Test")
        if hasattr(p, 'inventory'):
            results.add_pass("Player has inventory attribute")
        else:
            results.add_fail("Player integration", "Player should have inventory attribute")
    except Exception as e:
        results.add_fail("Player integration", str(e))
    
    # Summary
    if results.summary():
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
