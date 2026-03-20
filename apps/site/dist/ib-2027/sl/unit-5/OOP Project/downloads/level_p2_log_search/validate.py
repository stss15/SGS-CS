#!/usr/bin/env python3
"""Validator for Level P2 - Log Search"""
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
        print(f"PASS: All {len(self.passed)} checks passed!\n\npython3 run_puzzle.py"); return True

def main():
    print("\n" + "="*50 + "\n  LEVEL P2 VALIDATOR\n" + "="*50)
    r = ValidationResult()
    
    try:
        from student import log_search
        
        # 1. Test load_logs_from_file
        print("\n--- File I/O Check ---")
        test_file = "test_logs.txt"
        with open(test_file, "w") as f:
            f.write("100|Alice|Msg1|False\n200|Bob|Msg2|True")
        
        try:
            logs = log_search.load_logs_from_file(test_file)
            if isinstance(logs, list) and len(logs) == 2:
                r.add_pass("load_logs_from_file returns list of correct size")
                if logs[0]["timestamp"] == "100" or logs[0]["timestamp"] == 100:
                     r.add_pass("Log parsing structure valid")
                else: r.add_fail("Log parsing", f"Unexpected format: {logs[0]}")
            else:
                 r.add_fail("load_logs_from_file", "Failed to return valid list")
        except Exception as e:
            r.add_fail("load_logs_from_file crash", str(e))
        finally:
            if os.path.exists(test_file): os.remove(test_file)

        # 2. Test search_logs
        print("\n--- Search Check ---")
        sample_logs = [
            {"author": "Alice", "id": 1},
            {"author": "Bob", "id": 2},
            {"author": "Alice", "id": 3}
        ]
        res = log_search.search_logs(sample_logs, "Alice")
        if len(res) == 2 and res[0]["id"] == 1 and res[1]["id"] == 3:
            r.add_pass("search_logs filters correctly")
        else:
            r.add_fail("search_logs", f"Expected 2 matches, got {len(res)}")

        # 3. Test sort_logs
        print("\n--- Sort Check ---")
        sort_sample = [
             {"val": 10}, {"val": 30}, {"val": 20}
        ]
        # Ascending
        asc = log_search.sort_logs(sort_sample, "val")
        if asc[0]["val"] == 10 and asc[-1]["val"] == 30:
            r.add_pass("sort_logs ascending works")
        else:
            r.add_fail("sort_logs ascending", f"Result: {asc}")

        # Descending
        desc = log_search.sort_logs(sort_sample, "val", descending=True)
        if desc[0]["val"] == 30 and desc[-1]["val"] == 10:
            r.add_pass("sort_logs descending works")
        else:
            r.add_fail("sort_logs descending", f"Result: {desc}")

        # 4. Test validate_code
        print("\n--- Set Logic Check ---")
        used = {"A", "B"}
        if log_search.validate_code("C", used) == True:
            r.add_pass("validate_code returns True for flexible")
        else:
            r.add_fail("validate_code", "Should return True for unused code")
            
        if log_search.validate_code("A", used) == False:
            r.add_pass("validate_code returns False for used")
        else:
            r.add_fail("validate_code", "Should return False for used code")
            
    except Exception as e:
        r.add_fail("Crash", str(e))

    sys.exit(0 if r.summary() else 1)

if __name__ == "__main__": main()
