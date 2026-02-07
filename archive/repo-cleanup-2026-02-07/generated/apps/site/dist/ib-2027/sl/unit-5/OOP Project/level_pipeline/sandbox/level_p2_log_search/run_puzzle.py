#!/usr/bin/env python3
"""
Puzzle Runner for Level P2 - Log Search
Enhanced with immersion effects.
"""
import time
import sys
import os


# === IMMERSION ===
def type_text(text, delay=0.02):
    for char in text:
        print(char, end='', flush=True)
        time.sleep(delay)
    print()


def type_text_fast(text, delay=0.012):
    for char in text:
        print(char, end='', flush=True)
        time.sleep(delay)
    print()


def dramatic_pause(seconds=0.8):
    time.sleep(seconds)


def show_header():
    print()
    print("═" * 50)
    print("  ▸ SIGMA-7 DATA RECOVERY SYSTEM")
    print("    Level P2: Log Analysis & Search")
    print("═" * 50)
    print()


# === MAIN PUZZLE ===
def main():
    show_header()
    
    try:
        from student import log_search
    except ImportError as e:
        print("❌ Could not import log_search from student/")
        print(f"   Error: {e}")
        print("\n   Make sure you've created your log search functions!")
        sys.exit(1)
    
    dramatic_pause(0.5)
    type_text("Accessing corrupted data archive...")
    dramatic_pause(0.8)
    
    log_file = "engine/content/logs.txt"
    if not os.path.exists(log_file):
        print(f"❌ Error: {log_file} not found.")
        sys.exit(1)
    
    type_text_fast(f'  "Located archive: {log_file}"')
    print()
    
    # Load logs
    print("─" * 50)
    type_text("[1] LOADING LOG ENTRIES")
    print("─" * 50)
    
    logs = log_search.load_logs_from_file(log_file)
    type_text_fast(f"  Loaded {len(logs)} entries from archive.")
    dramatic_pause(0.5)
    
    # Search
    print()
    print("─" * 50)
    type_text("[2] SEARCHING FOR DR. CHEN'S ENTRIES")
    print("─" * 50)
    
    target_author = "Dr. Chen"
    chen_logs = log_search.search_logs(logs, target_author)
    type_text_fast(f'  Found {len(chen_logs)} entries by "{target_author}"')
    dramatic_pause(0.5)
    
    # Sort
    print()
    print("─" * 50)
    type_text("[3] SORTING BY TIMESTAMP (NEWEST FIRST)")
    print("─" * 50)
    
    sorted_logs = log_search.sort_logs(chen_logs, "timestamp", descending=True)
    type_text_fast("  Entries sorted chronologically.")
    dramatic_pause(0.5)
    
    # Scan for key
    print()
    print("─" * 50)
    type_text("[4] SCANNING FOR UNCORRUPTED DATA")
    print("─" * 50)
    print()
    
    found_key = False
    
    for log in sorted_logs:
        status = "CORRUPTED" if str(log["corrupted"]) == "True" else "CLEAN"
        status_icon = "❌" if status == "CORRUPTED" else "✓"
        
        print(f"  [{log['timestamp']}] {status_icon} {status}")
        type_text_fast(f"    \"{log['content'][:40]}...\"" if len(log['content']) > 40 else f"    \"{log['content']}\"")
        time.sleep(0.3)
        
        if str(log["corrupted"]) == "False":
            print()
            type_text("  ✓ Clean entry found!")
            if "7734" in log["content"]:
                dramatic_pause(0.5)
                type_text("  Override key identified: 7734")
                found_key = True
                break
    
    # Result
    print()
    print("═" * 50)
    if found_key:
        type_text("  🔓 ACCESS GRANTED")
        type_text_fast("  Override key recovered successfully.")
    else:
        type_text("  ❌ ACCESS DENIED")
        type_text_fast("  Could not recover override key.")
    print("═" * 50)
    print()
    
    # Learning summary
    if found_key:
        print("─" * 50)
        print("  📚 LEARNING SUMMARY")
        print("─" * 50)
        print()
        print("  You used collection processing algorithms:")
        print()
        print("  1. LOAD: Parse structured data from a file")
        print("  2. SEARCH: Filter by matching criteria")
        print("  3. SORT: Order by a specific field")
        print()
        print("  These are fundamental data operations used in:")
        print("    → Database queries")
        print("    → Log analysis tools")
        print("    → Data science pipelines")
        print()


if __name__ == "__main__":
    main()
