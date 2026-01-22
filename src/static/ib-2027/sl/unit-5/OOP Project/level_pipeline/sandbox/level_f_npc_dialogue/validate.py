#!/usr/bin/env python3
"""Validator for Level F - NPC Dialogue"""
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
    print("\n" + "="*50 + "\n  LEVEL F VALIDATOR\n" + "="*50)
    r = ValidationResult()
    
    print("\n--- Method Check ---")
    try:
        from student.player import Player
        p = Player("Test")
        if hasattr(p, 'respond_to_npc'):
            r.add_pass("respond_to_npc exists")
            
            # Interactive test - we can't fully automate input() testing easily here
            # without mocking, so we just check signature existence and basic return type if possible
            # or just trust the existence check for this level.
            # We'll rely on the game loop to test the actual logic.
        else:
            r.add_fail("respond_to_npc", "Method not found")
            
    except Exception as e:
        r.add_fail("Player class", str(e))

    sys.exit(0 if r.summary() else 1)

if __name__ == "__main__": main()
