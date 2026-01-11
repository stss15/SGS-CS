#!/usr/bin/env python3
"""
Puzzle Runner for Level P1 - Stacks & Queues
Enhanced with immersion effects.
"""
import time
import sys


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
    print("  ▸ SIGMA-7 TERMINAL INTERFACE")
    print("    Level P1: Data Structure Protocols")
    print("═" * 50)
    print()


# === MAIN PUZZLE ===
def main():
    show_header()
    
    try:
        from student.data_structs import Stack, Queue
    except ImportError as e:
        print("❌ Could not import Stack/Queue from student/data_structs.py")
        print(f"   Error: {e}")
        print("\n   Make sure you've created your Stack and Queue classes!")
        sys.exit(1)
    
    dramatic_pause(0.5)
    type_text("Initiating data structure protocols...")
    dramatic_pause(0.8)
    type_text_fast('  "Security bypass requires proper LIFO/FIFO handling."')
    print()
    
    commands = ["POWER_ON", "CONNECT_NET", "BYPASS_FIREWALL", "UNLOCK_DOOR"]
    print(f"Command sequence to process: {commands}")
    print()
    
    # === STACK TEST ===
    dramatic_pause(0.5)
    print("─" * 50)
    type_text("[1] STACK PROTOCOL (LIFO - Last In, First Out)")
    print("─" * 50)
    
    s = Stack()
    for cmd in commands:
        s.push(cmd)
        print(f"  → Pushed: {cmd}")
        time.sleep(0.15)
    
    print()
    type_text_fast("Processing stack (should be REVERSE order):")
    results_stack = []
    while not s.is_empty():
        item = s.pop()
        results_stack.append(item)
        print(f"  ← Popped: {item}")
        time.sleep(0.25)
    
    expected_stack = list(reversed(commands))
    if results_stack == expected_stack:
        print()
        type_text("  ✓ STACK PROTOCOL: SUCCESS")
    else:
        print()
        type_text("  ✗ STACK PROTOCOL: FAILURE")
        print(f"    Expected: {expected_stack}")
        print(f"    Got: {results_stack}")
        return
    
    # === QUEUE TEST ===
    dramatic_pause(0.8)
    print()
    print("─" * 50)
    type_text("[2] QUEUE PROTOCOL (FIFO - First In, First Out)")
    print("─" * 50)
    
    q = Queue()
    for cmd in commands:
        q.enqueue(cmd)
        print(f"  → Enqueued: {cmd}")
        time.sleep(0.15)
    
    print()
    type_text_fast("Processing queue (should be ORIGINAL order):")
    results_queue = []
    while not q.is_empty():
        item = q.dequeue()
        results_queue.append(item)
        print(f"  ← Dequeued: {item}")
        time.sleep(0.25)
    
    if results_queue == commands:
        print()
        type_text("  ✓ QUEUE PROTOCOL: SUCCESS")
    else:
        print()
        type_text("  ✗ QUEUE PROTOCOL: FAILURE")
        print(f"    Expected: {commands}")
        print(f"    Got: {results_queue}")
        return
    
    # === SUCCESS ===
    dramatic_pause(1)
    print()
    print("═" * 50)
    type_text("  🔓 ACCESS GRANTED")
    type_text_fast("  Security door unlocked.")
    print("═" * 50)
    print()
    
    # Learning summary
    print("─" * 50)
    print("  📚 LEARNING SUMMARY")
    print("─" * 50)
    print()
    print("  Stack (LIFO):")
    print("    → push() adds to TOP")
    print("    → pop() removes from TOP")
    print("    → Last item in = First item out")
    print()
    print("  Queue (FIFO):")
    print("    → enqueue() adds to BACK")
    print("    → dequeue() removes from FRONT")
    print("    → First item in = First item out")
    print()
    print("  These are ABSTRACT DATA TYPES (ADTs)")
    print("  → You define the interface (push/pop/etc)")
    print("  → Implementation details are hidden")
    print()


if __name__ == "__main__":
    main()
