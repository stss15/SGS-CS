#!/usr/bin/env python3
"""
Validator for Level A - Player Class

Run this to check if your Player class implementation is correct.

Usage:
    python3 validate.py
"""

import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


class ValidationResult:
    """Tracks validation results."""
    
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
        """Print summary and return True if all passed."""
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
    print("  LEVEL A VALIDATOR")
    print("  Checking Player class...")
    print("=" * 50)
    
    results = ValidationResult()
    
    # Import check
    print("\n--- Import Checks ---")
    try:
        from student.player import Player
        results.add_pass("Import Player class")
    except ImportError as e:
        results.add_fail("Import Player class", str(e))
        results.summary()
        sys.exit(1)
    
    # Constructor check
    print("\n--- Constructor Checks ---")
    try:
        p = Player("TestPlayer")
        if hasattr(p, 'name') and p.name == "TestPlayer":
            results.add_pass("Player stores name correctly")
        else:
            results.add_fail("Player stores name", "self.name should equal the name passed to __init__")
    except Exception as e:
        results.add_fail("Player constructor", str(e))
        results.summary()
        sys.exit(1)
    
    # Attribute checks
    print("\n--- Attribute Checks ---")
    required_attrs = ['health', 'max_health', 'armour', 'accuracy']
    for attr in required_attrs:
        if hasattr(p, attr):
            results.add_pass(f"Player has '{attr}' attribute")
        else:
            results.add_fail(f"Missing attribute", f"Player should have a '{attr}' attribute")
    
    # Check attribute values are sensible
    print("\n--- Initial Values Check ---")
    try:
        if p.health == 100 and p.max_health == 100:
            results.add_pass("Health and max_health are 100")
        else:
            results.add_fail("Initial health", f"Expected health=100, max_health=100, got {p.health}, {p.max_health}")
        
        if p.armour == 2:
            results.add_pass("Armour is 2")
        else:
            results.add_fail("Initial armour", f"Expected armour=2, got {p.armour}")
        
        if p.accuracy == 85:
            results.add_pass("Accuracy is 85")
        else:
            results.add_fail("Initial accuracy", f"Expected accuracy=85, got {p.accuracy}")
    except Exception as e:
        results.add_fail("Initial values", str(e))
    
    # Method checks
    print("\n--- Method Checks ---")
    
    # get_status check
    try:
        status = p.get_status()
        if isinstance(status, str) and "TestPlayer" in status:
            results.add_pass("get_status returns string with player name")
        else:
            results.add_fail("get_status", "Should return string containing player name")
    except Exception as e:
        results.add_fail("get_status", str(e))
    
    # take_damage check
    print("\n--- Behaviour Checks ---")
    try:
        p.health = 100
        p.take_damage(30)
        if p.health == 70:
            results.add_pass("take_damage reduces health correctly")
        else:
            results.add_fail("take_damage", f"After take_damage(30), health should be 70, got {p.health}")
    except Exception as e:
        results.add_fail("take_damage", str(e))
    
    # take_damage clamping check
    try:
        p.health = 50
        p.take_damage(999)
        if p.health == 0:
            results.add_pass("take_damage clamps at 0 (no negative health)")
        else:
            results.add_fail("take_damage clamping", f"Health should be 0, not {p.health}")
    except Exception as e:
        results.add_fail("take_damage clamping", str(e))
    
    # heal check
    try:
        p.health = 50
        p.max_health = 100
        p.heal(20)
        if p.health == 70:
            results.add_pass("heal increases health correctly")
        else:
            results.add_fail("heal", f"After heal(20), health should be 70, got {p.health}")
    except Exception as e:
        results.add_fail("heal", str(e))
    
    # heal clamping check
    try:
        p.health = 90
        p.max_health = 100
        p.heal(999)
        if p.health == 100:
            results.add_pass("heal clamps at max_health")
        else:
            results.add_fail("heal clamping", f"Health should be 100, not {p.health}")
    except Exception as e:
        results.add_fail("heal clamping", str(e))
    
    # Summary
    if results.summary():
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
