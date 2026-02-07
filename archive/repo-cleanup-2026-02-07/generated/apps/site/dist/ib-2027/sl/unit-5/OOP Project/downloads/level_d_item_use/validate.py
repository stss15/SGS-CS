#!/usr/bin/env python3
"""Validator for Level D - Item Use"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

class ValidationResult:
    def __init__(self):
        self.passed, self.failed = [], []
    def add_pass(self, n): self.passed.append(n); print(f"  ✓ {n}")
    def add_fail(self, n, r): self.failed.append((n,r)); print(f"  ✗ {n}\n    → {r}")
    def summary(self):
        print("\n" + "="*50)
        if self.failed: print(f"FAIL: {len(self.failed)} check(s) failed"); return False
        print(f"PASS: All {len(self.passed)} checks passed!\n\npython3 run_game.py"); return True

def main():
    print("\n" + "="*50 + "\n  LEVEL D VALIDATOR\n" + "="*50)
    r = ValidationResult()
    
    print("\n--- Import Checks ---")
    try:
        from student.player import Player
        from student.inventory import Inventory
        r.add_pass("Import classes")
    except ImportError as e:
        r.add_fail("Import", str(e)); r.summary(); sys.exit(1)
    
    print("\n--- Method Existence ---")
    if hasattr(Player, 'use_item'): r.add_pass("Player.use_item exists")
    else: r.add_fail("Player.use_item", "Method not found")
    
    if hasattr(Inventory, 'consume'): r.add_pass("Inventory.consume exists")
    else: r.add_fail("Inventory.consume", "Method not found")
    
    print("\n--- Behaviour Checks ---")
    try:
        p = Player("Test")
        result = p.use_item("nonexistent", "door")
        if isinstance(result, str) and "don't have" in result.lower():
            r.add_pass("use_item returns error for missing item")
        else:
            r.add_fail("use_item missing item", f"Should indicate item not found, got: {result}")
    except Exception as e:
        r.add_fail("use_item", str(e))
    
    try:
        inv = Inventory()
        inv.add("test_item")
        if inv.consume("test_item") == True and not inv.has_item("test_item"):
            r.add_pass("consume removes item")
        else:
            r.add_fail("consume", "Should remove item and return True")
    except Exception as e:
        r.add_fail("consume", str(e))
    
    try:
        p = Player("Test")
        p.inventory.add("med_patch")
        old_health = p.health
        p.take_damage(30)
        result = p.use_item("med_patch", "self")
        if p.health > old_health - 30 and not p.inventory.has_item("med_patch"):
            r.add_pass("med_patch heals and is consumed")
        else:
            r.add_fail("med_patch", f"Should heal and remove from inventory. Health: {p.health}, Has item: {p.inventory.has_item('med_patch')}")
    except Exception as e:
        r.add_fail("med_patch", str(e))
    
    sys.exit(0 if r.summary() else 1)

if __name__ == "__main__": main()
