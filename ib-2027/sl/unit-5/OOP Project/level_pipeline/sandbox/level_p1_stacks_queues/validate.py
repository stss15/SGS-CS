#!/usr/bin/env python3
"""Validator for Level P1 - Stacks & Queues"""
import sys, os
from collections import deque
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
    print("\n" + "="*50 + "\n  LEVEL P1 VALIDATOR\n" + "="*50)
    r = ValidationResult()
    
    try:
        from student.data_structs import Stack, Queue
        
        # Test Stack
        print("\n--- Stack Tests ---")
        s = Stack()
        if hasattr(s, "_items") and isinstance(s._items, list):
            r.add_pass("Stack uses list for storage")
        else:
            r.add_fail("Stack storage", "Must use self._items = []")
        
        if s.is_empty():
            r.add_pass("New stack is empty")
        else:
            r.add_fail("New stack is empty", "Expected True for empty stack")
        s.push(10)
        s.push(20)
        if s.size() == 2:
            r.add_pass("Stack size is correct")
        else:
            r.add_fail("Stack size is correct", f"Expected 2, got {s.size()}")
        if s.peek() == 20:
            r.add_pass("Peek returns top item")
        else:
            r.add_fail("Peek returns top item", f"Expected 20, got {s.peek()}")
        if s.pop() == 20:
            r.add_pass("Pop returns top item (LIFO)")
        else:
            r.add_fail("Pop returns top item (LIFO)", "Expected 20 on first pop")
        if s.pop() == 10:
            r.add_pass("Pop LIFO order correct")
        else:
            r.add_fail("Pop LIFO order correct", "Expected 10 on second pop")
        if s.pop() is None:
            r.add_pass("Pop empty returns None")
        else:
            r.add_fail("Pop empty returns None", "Expected None on empty pop")

        # Test Queue
        print("\n--- Queue Tests ---")
        q = Queue()
        if hasattr(q, "_items") and isinstance(q._items, deque):
            r.add_pass("Queue uses deque for storage")
        else:
            r.add_fail("Queue storage", "Must use self._items = deque()")
            
        if q.is_empty():
            r.add_pass("New queue is empty")
        else:
            r.add_fail("New queue is empty", "Expected True for empty queue")
        q.enqueue("A")
        q.enqueue("B")
        if q.size() == 2:
            r.add_pass("Queue size is correct")
        else:
            r.add_fail("Queue size is correct", f"Expected 2, got {q.size()}")
        if q.front() == "A":
            r.add_pass("Front returns first item")
        else:
            r.add_fail("Front returns first item", f"Expected 'A', got {q.front()}")
        if q.dequeue() == "A":
            r.add_pass("Dequeue returns first item (FIFO)")
        else:
            r.add_fail("Dequeue returns first item (FIFO)", "Expected 'A' on first dequeue")
        if q.dequeue() == "B":
            r.add_pass("Dequeue FIFO order correct")
        else:
            r.add_fail("Dequeue FIFO order correct", "Expected 'B' on second dequeue")
        if q.dequeue() is None:
            r.add_pass("Dequeue empty returns None")
        else:
            r.add_fail("Dequeue empty returns None", "Expected None on empty dequeue")
            
    except Exception as e:
        r.add_fail("Crash", str(e))

    sys.exit(0 if r.summary() else 1)

if __name__ == "__main__": main()
