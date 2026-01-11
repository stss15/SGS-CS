#!/usr/bin/env python3
"""Level E - Logbook Micro-Lab"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


def main():
    print("\n" + "=" * 50)
    print("  LEVEL E MICRO-LAB: MISSION LOG")
    print("=" * 50 + "\n")

    from student.player import Player
    from student.logbook import Logbook

    player = Player("Cadet")
    logbook = Logbook()
    player.attach_logbook(logbook)

    player.record_event("Arrived at Sigma-7 airlock.")
    player.record_event("Power systems unstable. Proceeding with caution.")
    player.record_event("Noted a maintenance drone in the main corridor.")

    print("Logbook entries:")
    for entry in logbook.list_entries():
        print(f"- {entry}")

    print(f"\nTotal entries: {logbook.count()}")
    print(f"Latest entry: {logbook.latest()}")


if __name__ == "__main__":
    main()
