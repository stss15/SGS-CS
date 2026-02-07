#!/usr/bin/env python3
"""Validator for Level G - Encounters"""
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
    print("\n" + "="*50 + "\n  LEVEL G VALIDATOR\n" + "="*50)
    r = ValidationResult()
    
    print("\n--- Method Check ---")
    try:
        from student.player import Player
        p = Player("Test")
        
        if hasattr(p, 'choose_action'):
            r.add_pass("choose_action exists")
        else:
            r.add_fail("choose_action", "Method not found")
            
        if hasattr(p, 'compute_damage'):
            r.add_pass("compute_damage exists")
            
            # Test compute_damage logic
            try:
                # Normal case
                dmg = p.compute_damage(20, 5)
                if dmg == 15:
                    r.add_pass("compute_damage(20, 5) -> 15")
                else:
                    r.add_fail("compute_damage logic", f"Expected 15, got {dmg}")
                
                # Zero case
                dmg = p.compute_damage(5, 5)
                if dmg == 0:
                    r.add_pass("compute_damage(5, 5) -> 0")
                else:
                    r.add_fail("compute_damage logic", f"Expected 0, got {dmg}")
                
                # Negative case (should clamp to 0)
                dmg = p.compute_damage(5, 20)
                if dmg == 0:
                    r.add_pass("compute_damage(5, 20) -> 0 (min clamp)")
                else:
                    r.add_fail("compute_damage logic", f"Expected 0 (min clamp), got {dmg}")
                    
            except Exception as e:
                r.add_fail("compute_damage crash", str(e))
        else:
            r.add_fail("compute_damage", "Method not found")
            
    except Exception as e:
        r.add_fail("Player class", str(e))

    sys.exit(0 if r.summary() else 1)

if __name__ == "__main__": main()
