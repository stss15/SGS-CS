from collections import deque

class Stack:
    """LIFO Structure: Last In, First Out."""
    
    def __init__(self):
        self._items = []

    def push(self, item):
        pass

    def pop(self):
        pass

    def peek(self):
        pass

    def is_empty(self) -> bool:
        pass

    def size(self) -> int:
        pass


class Queue:
    """FIFO Structure: First In, First Out."""

    def __init__(self):
        self._items = deque()

    def enqueue(self, item):
        pass

    def dequeue(self):
        pass

    def front(self):
        pass

    def is_empty(self) -> bool:
        pass

    def size(self) -> int:
        pass
