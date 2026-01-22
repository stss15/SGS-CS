#!/usr/bin/env python3
"""Validator for Level E - Logbook Micro-Lab"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


class ValidationResult:
    def __init__(self):
        self.passed = []
        self.failed = []

    def add_pass(self, name):
        self.passed.append(name)
        print(f"  ✓ {name}")

    def add_fail(self, name, reason):
        self.failed.append((name, reason))
        print(f"  ✗ {name}")
        print(f"    → {reason}")

    def summary(self):
        print("\n" + "=" * 50)
        if self.failed:
            print(f"FAIL: {len(self.failed)} check(s) failed")
            print("=" * 50)
            return False
        print(f"PASS: All {len(self.passed)} checks passed!")
        print("=" * 50)
        print("\npython3 run_lab.py")
        return True


def main():
    print("\n" + "=" * 50)
    print("  LEVEL E VALIDATOR")
    print("=" * 50)
    results = ValidationResult()

    print("\n--- Import Checks ---")
    try:
        from student.player import Player
        from student.logbook import Logbook
        results.add_pass("Import Player and Logbook")
    except ImportError as e:
        results.add_fail("Import", str(e))
        results.summary()
        sys.exit(1)

    print("\n--- Logbook Method Checks ---")
    required = ["add_entry", "list_entries", "latest", "count"]
    for name in required:
        if hasattr(Logbook, name):
            results.add_pass(f"Logbook.{name} exists")
        else:
            results.add_fail(f"Logbook.{name}", "Method not found")

    print("\n--- Logbook Behavior Checks ---")
    try:
        log = Logbook()
        if isinstance(log.list_entries(), list):
            results.add_pass("list_entries returns list")
        else:
            results.add_fail("list_entries", "Should return a list")

        log.add_entry("Entry one")
        if log.count() >= 1:
            results.add_pass("count increases after add_entry")
        else:
            results.add_fail("count", "Should increase after add_entry")

        if log.latest() == "Entry one":
            results.add_pass("latest returns most recent entry")
        else:
            results.add_fail("latest", f"Expected 'Entry one', got {log.latest()}")
    except Exception as e:
        results.add_fail("Logbook behavior", str(e))

    print("\n--- Player Integration Checks ---")
    try:
        player = Player("Test")
        if hasattr(player, "attach_logbook"):
            results.add_pass("Player.attach_logbook exists")
        else:
            results.add_fail("Player.attach_logbook", "Method not found")

        if hasattr(player, "record_event"):
            results.add_pass("Player.record_event exists")
        else:
            results.add_fail("Player.record_event", "Method not found")

        if hasattr(player, "attach_logbook"):
            player.attach_logbook(log)
            player.record_event("Entry two")
            if log.latest() == "Entry two":
                results.add_pass("record_event adds to logbook")
            else:
                results.add_fail("record_event", "Did not add entry to logbook")
    except Exception as e:
        results.add_fail("Player integration", str(e))

    sys.exit(0 if results.summary() else 1)


if __name__ == "__main__":
    main()
