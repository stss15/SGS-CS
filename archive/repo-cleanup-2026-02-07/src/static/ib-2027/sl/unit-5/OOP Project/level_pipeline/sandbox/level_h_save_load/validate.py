#!/usr/bin/env python3
"""Validator for Level H - Save & Load"""
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
    print("\n" + "="*50 + "\n  LEVEL H VALIDATOR\n" + "="*50)
    r = ValidationResult()
    
    print("\n--- Method Check ---")
    try:
        from student.player import Player
        p = Player("TestSave")
        p.inventory.add("keycard")
        
        # Check to_save_data
        if hasattr(p, 'to_save_data'):
            r.add_pass("to_save_data exists")
            try:
                data = p.to_save_data()
                if isinstance(data, dict):
                    r.add_pass("to_save_data returns dict")
                    required = ["name", "health", "inventory"]
                    if all(k in data for k in required):
                        r.add_pass("to_save_data has required keys")
                    else:
                        r.add_fail("to_save_data keys", f"Missing keys. Got: {list(data.keys())}")
                else:
                    r.add_fail("to_save_data return", "Should return a dictionary")
            except Exception as e:
                r.add_fail("to_save_data crash", str(e))
        else:
            r.add_fail("to_save_data", "Method not found")
            
        # Check from_save_data
        if hasattr(Player, 'from_save_data'):
            r.add_pass("from_save_data exists")
            try:
                # Test round trip
                p2 = Player.from_save_data(data)
                if isinstance(p2, Player):
                    r.add_pass("from_save_data returns Player")
                    if p2.name == "TestSave" and p2.inventory.has_item("keycard"):
                        r.add_pass("Restored state matches original")
                    else:
                        r.add_fail("State mismatch", f"Name: {p2.name}, Has keycard: {p2.inventory.has_item('keycard')}")
                else:
                    r.add_fail("from_save_data return", "Should return Player instance")
            except Exception as e:
                r.add_fail("from_save_data crash", str(e))
        else:
            r.add_fail("from_save_data", "Method not found")
            
    except Exception as e:
        r.add_fail("Player class", str(e))

    sys.exit(0 if r.summary() else 1)

if __name__ == "__main__": main()
