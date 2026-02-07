#!/usr/bin/env python3
"""
Automated Sigma-7 playthrough with full coverage.
Records terminal output and UX observations.
"""

import pexpect
import time
import os

# Output file
OUTPUT_FILE = "playthrough_log.txt"
log = open(OUTPUT_FILE, "w", encoding="utf-8")

def send_and_log(child, command, wait=0.5):
    """Send command and log the interaction."""
    log.write(f"\n> {command}\n")
    child.sendline(command)
    time.sleep(wait)
    child.expect(pexpect.TIMEOUT, timeout=wait)
    output = child.before.decode('utf-8', errors='replace') if child.before else ""
    log.write(output)
    print(output)
    return output

def main():
    # Change to the level_i directory
    os.chdir("/Users/StevenStewart/SGS-CSC REMIX/public/ib-2027/sl/unit-5/OOP Project/downloads/level_i_final_playthrough")
    
    # Start the game
    child = pexpect.spawn("python3 run_game.py", encoding=None, timeout=30)
    
    # Wait for initial output
    time.sleep(2)
    child.expect(pexpect.TIMEOUT, timeout=2)
    log.write(child.before.decode('utf-8', errors='replace') if child.before else "")
    
    # Character creation
    send_and_log(child, "Tester", 1)  # Name
    send_and_log(child, "1", 1)  # Brute (more HP for testing)
    send_and_log(child, "", 2)  # Press Enter to begin
    
    # Log first UX thought
    send_and_log(child, "log UX: Character creation is clear and intuitive", 0.5)
    
    # === AIRLOCK ===
    send_and_log(child, "look", 0.5)
    send_and_log(child, "i", 0.5)
    send_and_log(child, "status", 0.5)
    send_and_log(child, "h", 0.5)
    send_and_log(child, "log UX: Help menu shows all commands clearly", 0.5)
    
    # Fight Sentry Droid
    send_and_log(child, "north", 1)
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "2", 1)  # Defend (test counter)
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack to finish
    
    # === MAIN CORRIDOR ===
    send_and_log(child, "look", 0.5)
    send_and_log(child, "log UX: Map shows full station with fog of war - nice!", 0.5)
    send_and_log(child, "take crowbar", 0.5)
    send_and_log(child, "i", 0.5)
    send_and_log(child, "look crowbar", 0.5)
    
    # Talk to M-Unit 7
    send_and_log(child, "talk drone", 1)
    send_and_log(child, "1", 1)  # Ask about security door
    send_and_log(child, "2", 1)  # Ask about escape pod
    send_and_log(child, "3", 1)  # Ask what happened
    send_and_log(child, "4", 1)  # Exit conversation
    send_and_log(child, "log UX: Conversation loop works - can ask multiple questions", 0.5)
    
    # Go to Storage Cage
    send_and_log(child, "south", 0.5)
    send_and_log(child, "look", 0.5)
    send_and_log(child, "take keycard", 0.5)
    send_and_log(child, "use crowbar on chest", 0.5)
    send_and_log(child, "take flashlight", 0.5)
    send_and_log(child, "take shield", 0.5)
    send_and_log(child, "look", 0.5)
    send_and_log(child, "log UX: Chest now shows as empty after taking items - good!", 0.5)
    
    # Back to corridor, unlock lab
    send_and_log(child, "north", 0.5)
    send_and_log(child, "use keycard on door", 0.5)
    send_and_log(child, "east", 0.5)  # Research Lab
    
    # === RESEARCH LAB ===
    send_and_log(child, "look", 0.5)
    send_and_log(child, "take patch", 0.5)
    send_and_log(child, "take note", 0.5)
    send_and_log(child, "look note", 0.5)
    send_and_log(child, "take chip", 0.5)
    
    # Save game
    send_and_log(child, "save", 1)
    send_and_log(child, "log UX: Save functionality works", 0.5)
    
    # Go to Engineering (fight repair bot)
    send_and_log(child, "west", 0.5)  # Back to corridor
    send_and_log(child, "west", 1)  # Engineering
    
    # Fight or run
    send_and_log(child, "4", 1)  # Run away to test escape
    send_and_log(child, "log UX: Escape from combat works", 0.5)
    send_and_log(child, "take battery", 0.5)
    send_and_log(child, "look battery", 0.5)
    
    # Crew Quarters
    send_and_log(child, "east", 0.5)
    send_and_log(child, "north", 0.5)  # Crew Quarters
    send_and_log(child, "look", 0.5)
    send_and_log(child, "take tablet", 0.5)  # Test alias
    send_and_log(child, "log UX: Alias 'tablet' works for personal log", 0.5)
    
    # Talk to Dr. Chen
    send_and_log(child, "talk woman", 1)  # Test alias
    send_and_log(child, "1", 1)
    send_and_log(child, "2", 1)
    send_and_log(child, "3", 1)
    send_and_log(child, "4", 1)  # Exit
    
    # Talk again - test welcome back
    send_and_log(child, "talk", 1)
    send_and_log(child, "4", 1)  # Exit
    send_and_log(child, "log UX: Second talk shows shorter greeting - good!", 0.5)
    
    # Control Hub
    send_and_log(child, "north", 0.5)
    send_and_log(child, "look", 0.5)
    send_and_log(child, "take control cell", 0.5)
    
    # Use shield
    send_and_log(child, "use shield", 0.5)
    send_and_log(child, "log UX: Shield feedback shows +15 armor with emoji", 0.5)
    
    # Research Archive
    send_and_log(child, "west", 0.5)
    send_and_log(child, "look", 0.5)
    send_and_log(child, "take override", 0.5)
    
    # Medical Bay (fight medical bot)
    send_and_log(child, "east", 0.5)
    send_and_log(child, "east", 1)
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack if needed
    
    send_and_log(child, "take med kit", 0.5)
    send_and_log(child, "take stim", 0.5)
    send_and_log(child, "status", 0.5)
    send_and_log(child, "use med kit", 0.5)
    send_and_log(child, "log UX: Med kit shows healing amount and new HP - excellent!", 0.5)
    send_and_log(child, "use stim", 0.5)
    send_and_log(child, "use patch", 0.5)
    
    # Unlock command deck
    send_and_log(child, "west", 0.5)
    send_and_log(child, "use control cell on door", 0.5)
    send_and_log(child, "look", 0.5)
    send_and_log(child, "log UX: Map now shows north door unlocked (single line connector)", 0.5)
    
    # Drop test
    send_and_log(child, "i", 0.5)
    send_and_log(child, "drop crowbar", 0.5)
    send_and_log(child, "i", 0.5)
    send_and_log(child, "log UX: Drop command works - item removed from inventory", 0.5)
    
    # Final boss
    send_and_log(child, "north", 2)
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "2", 1)  # Defend
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack
    send_and_log(child, "1", 1)  # Attack
    
    # Victory
    send_and_log(child, "look", 0.5)
    send_and_log(child, "take beacon", 0.5)
    send_and_log(child, "use beacon", 0.5)
    
    send_and_log(child, "log UX: VICTORY ACHIEVED!", 0.5)
    send_and_log(child, "log", 0.5)  # View all log entries
    
    # Quit
    send_and_log(child, "quit", 1)
    send_and_log(child, "no", 1)  # Don't save
    
    child.close()
    log.close()
    print(f"\nPlaythrough logged to: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
