#!/usr/bin/env python3
"""
Validator for Level B - Brute & Scout

Run this to check if your Brute and Scout classes are correct.

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
    print("  LEVEL B VALIDATOR")
    print("  Checking Brute & Scout classes...")
    print("=" * 50)
    
    results = ValidationResult()
    
    # Import checks
    print("\n--- Import Checks ---")
    try:
        from student.player import Player
        results.add_pass("Import Player class")
    except ImportError as e:
        results.add_fail("Import Player class", str(e))
        results.summary()
        sys.exit(1)
    
    try:
        from student.player_types import Brute
        results.add_pass("Import Brute class")
    except ImportError as e:
        results.add_fail("Import Brute class", str(e))
    
    try:
        from student.player_types import Scout
        results.add_pass("Import Scout class")
    except ImportError as e:
        results.add_fail("Import Scout class", str(e))
    
    # Inheritance checks
    print("\n--- Inheritance Checks ---")
    try:
        if issubclass(Brute, Player):
            results.add_pass("Brute inherits from Player")
        else:
            results.add_fail("Brute inheritance", "Brute should inherit from Player")
    except:
        results.add_fail("Brute inheritance", "Could not check inheritance")
    
    try:
        if issubclass(Scout, Player):
            results.add_pass("Scout inherits from Player")
        else:
            results.add_fail("Scout inheritance", "Scout should inherit from Player")
    except:
        results.add_fail("Scout inheritance", "Could not check inheritance")
    
    # Instantiation checks
    print("\n--- Instantiation Checks ---")
    try:
        brute = Brute("TestBrute")
        results.add_pass("Create Brute instance")
    except Exception as e:
        results.add_fail("Create Brute instance", str(e))
        brute = None
    
    try:
        scout = Scout("TestScout")
        results.add_pass("Create Scout instance")
    except Exception as e:
        results.add_fail("Create Scout instance", str(e))
        scout = None
    
    # Stats checks
    print("\n--- Stats Checks ---")
    if brute:
        if brute.health == 120:
            results.add_pass("Brute has correct health (120)")
        else:
            results.add_fail("Brute health", f"Expected 120, got {brute.health}")
        
        if brute.armour == 3:
            results.add_pass("Brute has correct armour (3)")
        else:
            results.add_fail("Brute armour", f"Expected 3, got {brute.armour}")
        
        if brute.accuracy == 70:
            results.add_pass("Brute has correct accuracy (70)")
        else:
            results.add_fail("Brute accuracy", f"Expected 70, got {brute.accuracy}")
    
    if scout:
        if scout.health == 80:
            results.add_pass("Scout has correct health (80)")
        else:
            results.add_fail("Scout health", f"Expected 80, got {scout.health}")
        
        if scout.armour == 1:
            results.add_pass("Scout has correct armour (1)")
        else:
            results.add_fail("Scout armour", f"Expected 1, got {scout.armour}")
        
        if scout.accuracy == 95:
            results.add_pass("Scout has correct accuracy (95)")
        else:
            results.add_fail("Scout accuracy", f"Expected 95, got {scout.accuracy}")
    
    # Polymorphism check
    print("\n--- Polymorphism Check ---")
    if brute and scout:
        base = Player("Base")
        if (brute.get_starting_stats() != base.get_starting_stats() and
            scout.get_starting_stats() != base.get_starting_stats() and
            brute.get_starting_stats() != scout.get_starting_stats()):
            results.add_pass("Each class returns different stats (polymorphism)")
        else:
            results.add_fail("Polymorphism", "Brute, Scout, and Player should all have different stats")
    
    # Summary
    if results.summary():
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
