#!/usr/bin/env python3
"""Puzzle Runner for Level P1"""
import time, sys
try:
    from student.data_structs import Stack, Queue
except ImportError:
    print("Could not import Stack/Queue. Run validate.py first.")
    sys.exit(1)

def main():
    print("\n--- TERMINAL HACK ---\n")
    print("Initiating Stack/Queue Protocol...")
    
    commands = ["POWER_ON", "CONNECT_NET", "BYPASS_FIREWALL", "UNLOCK_DOOR"]
    print(f"Sequence to Process: {commands}\n")
    
    #STACK
    print("[1] STACK PROTOCOL (LIFO)")
    s = Stack()
    for cmd in commands:
        s.push(cmd)
        print(f"  > Pushed: {cmd}")
    
    print("\n  Processing Stack (Reverse Order):")
    results_stack = []
    while not s.is_empty():
        item = s.pop()
        results_stack.append(item)
        print(f"  < Popped: {item}")
        time.sleep(0.3)
        
    expected_stack = list(reversed(commands))
    if results_stack == expected_stack:
        print("  [SUCCESS] Stack logic valid.\n")
    else:
        print("  [FAILURE] Stack logic invalid.\n")
        return

    # QUEUE
    print("[2] QUEUE PROTOCOL (FIFO)")
    q = Queue()
    for cmd in commands:
        q.enqueue(cmd)
        print(f"  > Enqueued: {cmd}")
        
    print("\n  Processing Queue (Forward Order):")
    results_queue = []
    while not q.is_empty():
        item = q.dequeue()
        results_queue.append(item)
        print(f"  < Dequeued: {item}")
        time.sleep(0.3)
        
    if results_queue == commands:
        print("  [SUCCESS] Queue logic valid.\n")
    else:
        print("  [FAILURE] Queue logic invalid.\n")
        return

    print("ACCESS GRANTED.")
    print("Door unlocked.")

if __name__ == "__main__": main()
