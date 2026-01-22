"""
Data Structures - Student reference implementation.

Stack and Queue classes for the terminal puzzle.
"""

from collections import deque


class Stack:
    """
    A LIFO (Last In, First Out) data structure.
    
    Items added last are removed first.
    Think of a stack of plates - you take from the top.
    """
    
    def __init__(self):
        """Create an empty stack."""
        self._items = []
    
    def push(self, item) -> None:
        """
        Add an item to the top of the stack.
        
        Args:
            item: The item to push.
        """
        self._items.append(item)
    
    def pop(self):
        """
        Remove and return the top item.
        
        Returns:
            The top item, or None if empty.
        """
        if self._items:
            return self._items.pop()
        return None
    
    def peek(self):
        """
        Return the top item without removing it.
        
        Returns:
            The top item, or None if empty.
        """
        if self._items:
            return self._items[-1]
        return None
    
    def is_empty(self) -> bool:
        """
        Check if the stack is empty.
        
        Returns:
            True if empty, False otherwise.
        """
        return len(self._items) == 0
    
    def size(self) -> int:
        """
        Get the number of items in the stack.
        
        Returns:
            The item count.
        """
        return len(self._items)


class Queue:
    """
    A FIFO (First In, First Out) data structure.
    
    Items added first are removed first.
    Think of a queue of people - first in line is served first.
    """
    
    def __init__(self):
        """Create an empty queue."""
        self._items = deque()
    
    def enqueue(self, item) -> None:
        """
        Add an item to the back of the queue.
        
        Args:
            item: The item to enqueue.
        """
        self._items.append(item)
    
    def dequeue(self):
        """
        Remove and return the front item.
        
        Returns:
            The front item, or None if empty.
        """
        if self._items:
            return self._items.popleft()
        return None
    
    def front(self):
        """
        Return the front item without removing it.
        
        Returns:
            The front item, or None if empty.
        """
        if self._items:
            return self._items[0]
        return None
    
    def is_empty(self) -> bool:
        """
        Check if the queue is empty.
        
        Returns:
            True if empty, False otherwise.
        """
        return len(self._items) == 0
    
    def size(self) -> int:
        """
        Get the number of items in the queue.
        
        Returns:
            The item count.
        """
        return len(self._items)
