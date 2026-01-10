#!/usr/bin/env python3
"""Puzzle Runner for Level P2"""
import sys, os
try:
    from student import log_search
except ImportError:
    print("Could not import log_search. Run validate.py first.")
    sys.exit(1)

def main():
    print("\n--- DATA RECOVERY ---\n")
    
    log_file = "engine/content/logs.txt"
    if not os.path.exists(log_file):
        print(f"Error: {log_file} not found.")
        sys.exit(1)
        
    print(f"Loading {log_file}...")
    logs = log_search.load_logs_from_file(log_file)
    print(f"Loaded {len(logs)} entries.")
    
    target_author = "Dr. Chen"
    print(f"\nSearching for logs by {target_author}...")
    chen_logs = log_search.search_logs(logs, target_author)
    print(f"Found {len(chen_logs)} entries.")
    
    print("\nSorting by timestamp (newest first)...")
    sorted_logs = log_search.sort_logs(chen_logs, "timestamp", descending=True)
    
    print("\nScanning for uncorrupted data...")
    found_key = False
    
    for log in sorted_logs:
        status = "CORRUPTED" if str(log["corrupted"]) == "True" else "CLEAN"
        print(f"  [{log['timestamp']}] {status}: {log['content']}")
        
        if str(log["corrupted"]) == "False":
            print(f"\nSUCCESS! Clean entry found: '{log['content']}'")
            if "7734" in log["content"]:
                print("Override Key Identified: 7734")
                found_key = True
                break
    
    if found_key:
        print("\nACCESS GRANTED.")
    else:
        print("\nFAILURE: Could not retrieve override key.")

if __name__ == "__main__": main()
