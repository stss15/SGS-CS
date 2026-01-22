"""
Solution code strings for Sigma-7 Level Pipeline.
"""

INIT_PY = '''"""
Student Code Package

This package contains the student-built code.
"""

from .player import Player
from .player_types import Brute, Scout
from .inventory import Inventory
from .data_structs import Stack, Queue
from .log_search import search_logs, sort_logs, validate_code

__all__ = [
    'Player',
    'Brute',
    'Scout',
    'Inventory',
    'Stack',
    'Queue',
    'search_logs',
    'sort_logs',
    'validate_code',
]
'''

PLAYER_A_PY = '''"""
Player class - Level A Solution.
Basic attributes and methods. No inventory or logbook yet.
"""

class Player:
    def __init__(self, name: str):
        self.name = name
        self.health = 100
        self.max_health = 100
        self.armour = 2
        self.accuracy = 85
        self.inventory = None
        self.logbook = None

    def get_status(self) -> str:
        return f"{self.name}: {self.health}/{self.max_health} HP"

    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)

    def heal(self, amount: int) -> None:
        self.health = min(self.max_health, self.health + amount)
'''

PLAYER_D_PY = '''"""
Player class - Level D Solution.
Adds Inventory composition and use_item method.
"""

from .inventory import Inventory

class Player:
    def __init__(self, name: str):
        self.name = name
        self.health = 100
        self.max_health = 100
        self.armour = 2
        self.accuracy = 85
        self.inventory = Inventory()
        self.logbook = None

    def get_status(self) -> str:
        return f"{self.name}: {self.health}/{self.max_health} HP"

    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)

    def heal(self, amount: int) -> None:
        self.health = min(self.max_health, self.health + amount)

    def use_item(self, item_id: str, target: str) -> str:
        if not self.inventory.has_item(item_id):
            return f"You don't have '{item_id}'."
        if item_id == "med_patch" and target == "self":
            self.heal(20)
            self.inventory.consume(item_id)
            return "You apply the med patch. +20 HP."
        return f"You use the {item_id} on the {target}."
'''

PLAYER_E_PY = '''"""
Player class - Level E Solution.
Adds Logbook aggregation.
"""

from .inventory import Inventory

class Player:
    def __init__(self, name: str):
        self.name = name
        self.health = 100
        self.max_health = 100
        self.armour = 2
        self.accuracy = 85
        self.inventory = Inventory()
        self.logbook = None

    def get_status(self) -> str:
        return f"{self.name}: {self.health}/{self.max_health} HP"

    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)

    def heal(self, amount: int) -> None:
        self.health = min(self.max_health, self.health + amount)

    def use_item(self, item_id: str, target: str) -> str:
        if not self.inventory.has_item(item_id):
            return f"You don't have '{item_id}'."
        if item_id == "med_patch" and target == "self":
            self.heal(20)
            self.inventory.consume(item_id)
            return "You apply the med patch. +20 HP."
        return f"You use the {item_id} on the {target}."

    def attach_logbook(self, logbook) -> None:
        self.logbook = logbook

    def record_event(self, entry: str) -> str:
        if self.logbook is None:
            return "No logbook attached."
        self.logbook.add_entry(entry)
        return "Logbook updated."
'''

PLAYER_FINAL_PY = '''"""
Player class - Final Solution.
Full implementation including combat helpers.
"""

from .inventory import Inventory

class Player:
    def __init__(self, name: str):
        self.name = name
        self.health = 100
        self.max_health = 100
        self.armour = 2
        self.accuracy = 85
        self.inventory = Inventory()
        self.logbook = None

    def get_status(self) -> str:
        return f"{self.name}: {self.health}/{self.max_health} HP"

    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)

    def heal(self, amount: int) -> None:
        self.health = min(self.max_health, self.health + amount)

    def use_item(self, item_id: str, target: str) -> str:
        if not self.inventory.has_item(item_id):
            return f"You don't have '{item_id}'."
        if item_id == "med_patch" and target == "self":
            self.heal(20)
            self.inventory.consume(item_id)
            return "You apply the med patch. +20 HP."
        return f"You use the {item_id} on the {target}."

    def attach_logbook(self, logbook) -> None:
        self.logbook = logbook

    def record_event(self, entry: str) -> str:
        if self.logbook is None:
            return "No logbook attached."
        self.logbook.add_entry(entry)
        return "Logbook updated."

    def respond_to_npc(self, options: list) -> int:
        while True:
            try:
                choice = int(input("Choose an option: ")) - 1
                if 0 <= choice < len(options):
                    return choice
                print("Invalid choice.")
            except ValueError:
                print("Please enter a number.")

    def choose_action(self, options: list) -> int:
        while True:
            try:
                choice = int(input("Choose action: ")) - 1
                if 0 <= choice < len(options):
                    return choice
                print("Invalid choice.")
            except ValueError:
                print("Please enter a number.")

    def compute_damage(self, base: int, armour: int) -> int:
        return max(0, base - armour)

    def to_save_data(self) -> dict:
        return {
            "name": self.name,
            "player_type": "player",
            "health": self.health,
            "max_health": self.max_health,
            "armour": self.armour,
            "accuracy": self.accuracy,
            "inventory": self.inventory.list_items()
        }

    @classmethod
    def from_save_data(cls, data: dict) -> "Player":
        player = cls(data.get("name", "Unknown"))
        player.health = data.get("health", 100)
        player.max_health = data.get("max_health", 100)
        player.armour = data.get("armour", 2)
        player.accuracy = data.get("accuracy", 85)
        
        from .inventory import Inventory
        player.inventory = Inventory()
        for item_id in data.get("inventory", []):
            player.inventory.add(item_id)
        
        return player
'''

PLAYER_TYPES_PY = '''from .player import Player


class Brute(Player):
    """Heavy combat specialist - high health and armour, low accuracy."""

    def __init__(self, name: str):
        super().__init__(name)
        self.health = 120
        self.max_health = 120
        self.armour = 3
        self.accuracy = 70

    def describe_specialty(self) -> str:
        return "Brute: heavy combat specialist with high health and armour."

    def to_save_data(self) -> dict:
        """Convert to save data with correct player_type."""
        data = super().to_save_data()
        data["player_type"] = "brute"
        return data

    @classmethod
    def from_save_data(cls, data: dict) -> "Brute":
        """Reconstruct a Brute from saved data."""
        player = cls(data.get("name", "Unknown"))
        player.health = data.get("health", 120)
        player.max_health = data.get("max_health", 120)
        player.armour = data.get("armour", 3)
        player.accuracy = data.get("accuracy", 70)
        
        from .inventory import Inventory
        player.inventory = Inventory()
        for item_id in data.get("inventory", []):
            player.inventory.add(item_id)
        
        return player


class Scout(Player):
    """Reconnaissance expert - low health, high accuracy."""

    def __init__(self, name: str):
        super().__init__(name)
        self.health = 80
        self.max_health = 80
        self.armour = 1
        self.accuracy = 95

    def describe_specialty(self) -> str:
        return "Scout: precision specialist with high accuracy and mobility."

    def to_save_data(self) -> dict:
        """Convert to save data with correct player_type."""
        data = super().to_save_data()
        data["player_type"] = "scout"
        return data

    @classmethod
    def from_save_data(cls, data: dict) -> "Scout":
        """Reconstruct a Scout from saved data."""
        player = cls(data.get("name", "Unknown"))
        player.health = data.get("health", 80)
        player.max_health = data.get("max_health", 80)
        player.armour = data.get("armour", 1)
        player.accuracy = data.get("accuracy", 95)
        
        from .inventory import Inventory
        player.inventory = Inventory()
        for item_id in data.get("inventory", []):
            player.inventory.add(item_id)
        
        return player
'''

INVENTORY_PY = '''"""
Inventory class - Student reference implementation.

Demonstrates composition and encapsulation with MAX_CAPACITY static constraint.
"""


class Inventory:
    """
    Manages items the player is carrying.
    
    Uses encapsulation with a protected _items list.
    Has a class variable MAX_CAPACITY for static constraint demo.
    """
    
    # Class variable (static-ish) - shared across all instances
    MAX_CAPACITY = 10
    
    def __init__(self):
        """Create an empty inventory."""
        self._items = []  # Protected attribute (encapsulation)
    
    def add(self, item_id: str) -> bool:
        """
        Add an item to the inventory.
        
        Args:
            item_id: The ID of the item to add.
            
        Returns:
            True if added successfully, False if duplicate or full.
        """
        # Check capacity
        if len(self._items) >= Inventory.MAX_CAPACITY:
            return False
        
        # Check for duplicate
        if item_id in self._items:
            return False
        
        self._items.append(item_id)
        return True
    
    def remove(self, item_id: str) -> bool:
        """
        Remove an item from the inventory.
        
        Args:
            item_id: The ID of the item to remove.
            
        Returns:
            True if removed successfully, False if not found.
        """
        if item_id in self._items:
            self._items.remove(item_id)
            return True
        return False
    
    def list_items(self) -> list:
        """
        Get a list of all items in the inventory.
        
        Returns:
            A copy of the item list (to protect encapsulation).
        """
        return self._items[:]  # Return a copy
    
    def has_item(self, item_id: str) -> bool:
        """
        Check if the item is in the inventory.
        
        Args:
            item_id: The ID to check.
            
        Returns:
            True if the item is present, False otherwise.
        """
        return item_id in self._items
    
    def consume(self, item_id: str) -> bool:
        """
        Consume (use and remove) an item.
        
        Args:
            item_id: The ID of the item to consume.
            
        Returns:
            True if consumed (removed), False if not found.
        """
        return self.remove(item_id)
    
    def is_full(self) -> bool:
        """
        Check if the inventory is at capacity.
        
        Returns:
            True if no more items can be added.
        """
        return len(self._items) >= Inventory.MAX_CAPACITY
    
    def count(self) -> int:
        """
        Get the number of items in the inventory.
        
        Returns:
            The item count.
        """
        return len(self._items)
'''

DATA_STRUCTS_PY = '''"""
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
'''

LOGBOOK_PY = '''class Logbook:
    """Mission log for recording events."""

    def __init__(self):
        self._entries = []

    def add_entry(self, entry: str) -> None:
        self._entries.append(entry)

    def list_entries(self) -> list:
        return list(self._entries)

    def latest(self):
        if not self._entries:
            return None
        return self._entries[-1]

    def count(self) -> int:
        return len(self._entries)
'''

LOG_SEARCH_PY = '''"""
Log Search Functions - Student reference implementation.

Functions for searching and sorting log entries (contained puzzle P2).
"""


def search_logs(logs: list, author: str) -> list:
    """
    Search for log entries by a specific author.
    
    Args:
        logs: A list of log entry dicts with keys: timestamp, author, content, corrupted.
        author: The author name to search for.
        
    Returns:
        A list of log entries where the author matches.
    """
    results = []
    for log in logs:
        if log.get("author") == author:
            results.append(log)
    return results


def sort_logs(logs: list, key: str, descending: bool = False) -> list:
    """
    Sort log entries by a specific key.
    
    Args:
        logs: A list of log entry dicts.
        key: The dict key to sort by (e.g., "timestamp", "author").
        descending: If True, sort in descending order.
        
    Returns:
        A new sorted list of log entries.
    """
    return sorted(logs, key=lambda log: log.get(key, ""), reverse=descending)


def validate_code(code: str, used_codes: set) -> bool:
    """
    Validate that a code has not been used before.
    
    Args:
        code: The code to validate.
        used_codes: A set of previously used codes.
        
    Returns:
        True if the code is valid (not used), False if already used.
    """
    return code not in used_codes


def load_logs_from_file(filepath: str) -> list:
    """
    Load log entries from a text file.
    
    This function demonstrates file I/O (B2.5 requirement).
    Each line in the file is formatted as: timestamp|author|content|corrupted
    
    Args:
        filepath: Path to the log file.
        
    Returns:
        A list of log entry dicts, or empty list if file not found.
    """
    logs = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                
                # Parse pipe-delimited format
                parts = line.split('|')
                if len(parts) >= 4:
                    log_entry = {
                        "timestamp": int(parts[0]),
                        "author": parts[1],
                        "content": parts[2],
                        "corrupted": parts[3].lower() == "true"
                    }
                    logs.append(log_entry)
    except FileNotFoundError:
        print(f"Log file not found: {filepath}")
    except Exception as e:
        print(f"Error reading log file: {e}")
    
    return logs


# Sample log data for testing/demonstration
SAMPLE_LOGS = [
    {"timestamp": 1699000001, "author": "Dr. Chen", "content": "Initial artifact scans complete.", "corrupted": False},
    {"timestamp": 1699000100, "author": "M. Torres", "content": "Power fluctuations in C deck.", "corrupted": False},
    {"timestamp": 1699000200, "author": "Dr. Chen", "content": "Artifact emitting unknown signals.", "corrupted": True},
    {"timestamp": 1699000300, "author": "SIGMA", "content": "Protocol update initiated.", "corrupted": False},
    {"timestamp": 1699000400, "author": "Dr. Chen", "content": "Override code: ALPHA-7-OMEGA", "corrupted": False},
    {"timestamp": 1699000500, "author": "M. Torres", "content": "Security bots acting strangely.", "corrupted": True},
    {"timestamp": 1699000600, "author": "SIGMA", "content": "Containment breach detected.", "corrupted": False},
    {"timestamp": 1699000700, "author": "Dr. Chen", "content": "Emergency evacuation in progress.", "corrupted": True},
    {"timestamp": 1699000800, "author": "SIGMA", "content": "Protocol Omega activated.", "corrupted": False},
    {"timestamp": 1699000900, "author": "Dr. Chen", "content": "If you find this, the key is in the archive.", "corrupted": False},
]
'''

# Dictionary mapping filename to content
ALL_FILES = {
    "__init__.py": INIT_PY,
    "player.py": PLAYER_FINAL_PY,
    "player_types.py": PLAYER_TYPES_PY,
    "inventory.py": INVENTORY_PY,
    "data_structs.py": DATA_STRUCTS_PY,
    "logbook.py": LOGBOOK_PY,
    "log_search.py": LOG_SEARCH_PY
}
