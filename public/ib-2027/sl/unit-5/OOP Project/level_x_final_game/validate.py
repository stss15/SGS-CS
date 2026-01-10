#!/usr/bin/env python3
"""
Validator for Level X - Final Game

This script checks that all student-built code meets the required contracts.
Run this before playing to ensure your code is correct.

Usage:
    python validate.py

Output:
    PASS - All checks passed
    FAIL - One or more checks failed (with details)
"""

import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


class ValidationResult:
    """Tracks validation results."""
    
    def __init__(self):
        self.passed = []
        self.failed = []
    
    def add_pass(self, name: str):
        self.passed.append(name)
        print(f"  ✓ {name}")
    
    def add_fail(self, name: str, reason: str):
        self.failed.append((name, reason))
        print(f"  ✗ {name}")
        print(f"    → {reason}")
    
    def summary(self) -> bool:
        """Print summary and return True if all passed."""
        print()
        print("=" * 60)
        if self.failed:
            print(f"FAIL: {len(self.failed)} check(s) failed, {len(self.passed)} passed")
            print("=" * 60)
            print("\nFailed checks:")
            for name, reason in self.failed:
                print(f"  • {name}: {reason}")
            return False
        else:
            print(f"PASS: All {len(self.passed)} checks passed!")
            print("=" * 60)
            return True


def check_imports(results: ValidationResult):
    """Check that all required modules can be imported."""
    print("\n--- Structure Checks ---")
    
    # Player
    try:
        from student_reference.player import Player
        results.add_pass("Import Player class")
    except ImportError as e:
        results.add_fail("Import Player class", str(e))
        return False
    
    # Player types
    try:
        from student_reference.player_types import Brute, Scout
        results.add_pass("Import Brute and Scout classes")
    except ImportError as e:
        results.add_fail("Import Brute and Scout classes", str(e))
        return False
    
    # Inventory
    try:
        from student_reference.inventory import Inventory
        results.add_pass("Import Inventory class")
    except ImportError as e:
        results.add_fail("Import Inventory class", str(e))
        return False
    
    # Data structures
    try:
        from student_reference.data_structs import Stack, Queue
        results.add_pass("Import Stack and Queue classes")
    except ImportError as e:
        results.add_fail("Import Stack and Queue classes", str(e))
        return False
    
    # Log search functions
    try:
        from student_reference.log_search import search_logs, sort_logs, validate_code
        results.add_pass("Import search_logs, sort_logs, validate_code")
    except ImportError as e:
        results.add_fail("Import log search functions", str(e))
        return False
    
    return True


def check_player(results: ValidationResult):
    """Check Player class implementation."""
    print("\n--- Player Class Checks ---")
    
    from student_reference.player import Player
    
    # Constructor
    try:
        p = Player("Test")
        if p.name == "Test":
            results.add_pass("Player constructor sets name")
        else:
            results.add_fail("Player constructor sets name", f"Expected 'Test', got '{p.name}'")
    except Exception as e:
        results.add_fail("Player constructor", str(e))
        return
    
    # Check initial attributes
    try:
        if p.health == 100 and p.max_health == 100:
            results.add_pass("Player has correct initial health (100)")
        else:
            results.add_fail("Initial health", f"Expected 100, got health={p.health}")
        
        if hasattr(p, 'armour') and hasattr(p, 'accuracy'):
            results.add_pass("Player has armour and accuracy attributes")
        else:
            results.add_fail("Attributes", "Missing armour or accuracy")
    except Exception as e:
        results.add_fail("Initial attributes", str(e))
    
    # take_damage clamping
    try:
        p.health = 100
        p.take_damage(999)
        if p.health == 0:
            results.add_pass("take_damage clamps at 0")
        else:
            results.add_fail("take_damage clamps at 0", f"Health is {p.health}, expected 0")
    except Exception as e:
        results.add_fail("take_damage", str(e))
    
    # heal clamping
    try:
        p.health = 50
        p.max_health = 100
        p.heal(999)
        if p.health == 100:
            results.add_pass("heal clamps at max_health")
        else:
            results.add_fail("heal clamps at max_health", f"Health is {p.health}, expected 100")
    except Exception as e:
        results.add_fail("heal", str(e))
    
    # get_status returns string
    try:
        status = p.get_status()
        if isinstance(status, str) and "Test" in status:
            results.add_pass("get_status returns string with name")
        else:
            results.add_fail("get_status", "Should return string containing player name")
    except Exception as e:
        results.add_fail("get_status", str(e))
    
    # compute_damage
    try:
        damage = p.compute_damage(20, 5)
        if damage == 15:
            results.add_pass("compute_damage(20, 5) returns 15")
        else:
            results.add_fail("compute_damage", f"Expected 15, got {damage}")
        
        damage = p.compute_damage(5, 20)
        if damage == 0:
            results.add_pass("compute_damage(5, 20) returns 0 (not negative)")
        else:
            results.add_fail("compute_damage negative", f"Expected 0, got {damage}")
    except Exception as e:
        results.add_fail("compute_damage", str(e))
    
    # to_save_data
    try:
        data = p.to_save_data()
        required = {"name", "health", "inventory"}
        if isinstance(data, dict) and required.issubset(set(data.keys())):
            results.add_pass("to_save_data returns dict with required keys")
        else:
            results.add_fail("to_save_data", f"Missing keys or not a dict")
    except Exception as e:
        results.add_fail("to_save_data", str(e))


def check_player_types(results: ValidationResult):
    """Check Brute and Scout classes."""
    print("\n--- Player Types Checks ---")
    
    from student_reference.player import Player
    from student_reference.player_types import Brute, Scout
    
    # Inheritance
    try:
        b = Brute("Test")
        if isinstance(b, Player):
            results.add_pass("Brute inherits from Player")
        else:
            results.add_fail("Brute inheritance", "Brute should inherit from Player")
    except Exception as e:
        results.add_fail("Brute creation", str(e))
        return
    
    try:
        s = Scout("Test")
        if isinstance(s, Player):
            results.add_pass("Scout inherits from Player")
        else:
            results.add_fail("Scout inheritance", "Scout should inherit from Player")
    except Exception as e:
        results.add_fail("Scout creation", str(e))
        return
    
    # Different stats (via direct attribute access)
    try:
        brute = Brute("Test")
        scout = Scout("Test")
        
        if brute.health != scout.health:
            results.add_pass("Brute and Scout have different health")
        else:
            results.add_fail("Different stats", "Brute and Scout should have different health")
        
        if brute.accuracy != scout.accuracy:
            results.add_pass("Brute and Scout have different accuracy")
        else:
            results.add_fail("Different stats", "Brute and Scout should have different accuracy")
    except Exception as e:
        results.add_fail("Stats comparison", str(e))


def check_inventory(results: ValidationResult):
    """Check Inventory class."""
    print("\n--- Inventory Checks ---")
    
    from student_reference.inventory import Inventory
    
    # Constructor
    try:
        inv = Inventory()
        if inv.count() == 0:
            results.add_pass("Inventory starts empty")
        else:
            results.add_fail("Inventory empty", f"Count is {inv.count()}, expected 0")
    except Exception as e:
        results.add_fail("Inventory creation", str(e))
        return
    
    # MAX_CAPACITY exists
    try:
        if hasattr(Inventory, 'MAX_CAPACITY') and Inventory.MAX_CAPACITY > 0:
            results.add_pass(f"MAX_CAPACITY class variable exists ({Inventory.MAX_CAPACITY})")
        else:
            results.add_fail("MAX_CAPACITY", "Should be a positive class variable")
    except Exception as e:
        results.add_fail("MAX_CAPACITY", str(e))
    
    # add returns True
    try:
        if inv.add("keycard"):
            results.add_pass("add() returns True on success")
        else:
            results.add_fail("add() success", "Should return True")
    except Exception as e:
        results.add_fail("add()", str(e))
    
    # add duplicate returns False
    try:
        if not inv.add("keycard"):
            results.add_pass("add() returns False for duplicate")
        else:
            results.add_fail("add() duplicate", "Should return False for duplicate")
    except Exception as e:
        results.add_fail("add() duplicate", str(e))
    
    # has_item
    try:
        if inv.has_item("keycard"):
            results.add_pass("has_item() returns True for existing")
        else:
            results.add_fail("has_item()", "Should return True for existing item")
    except Exception as e:
        results.add_fail("has_item()", str(e))
    
    # list_items
    try:
        items = inv.list_items()
        if isinstance(items, list) and "keycard" in items:
            results.add_pass("list_items() returns list with items")
        else:
            results.add_fail("list_items()", "Should return list containing added items")
    except Exception as e:
        results.add_fail("list_items()", str(e))
    
    # remove
    try:
        if inv.remove("keycard") and not inv.has_item("keycard"):
            results.add_pass("remove() works correctly")
        else:
            results.add_fail("remove()", "Should remove the item")
    except Exception as e:
        results.add_fail("remove()", str(e))


def check_data_structures(results: ValidationResult):
    """Check Stack and Queue classes."""
    print("\n--- Data Structure Checks ---")
    
    from student_reference.data_structs import Stack, Queue
    
    # Stack LIFO
    try:
        s = Stack()
        s.push("A")
        s.push("B")
        s.push("C")
        
        if s.pop() == "C" and s.pop() == "B" and s.pop() == "A":
            results.add_pass("Stack follows LIFO order")
        else:
            results.add_fail("Stack LIFO", "Pop order should be C, B, A")
    except Exception as e:
        results.add_fail("Stack operations", str(e))
    
    # Stack empty returns None
    try:
        s = Stack()
        if s.pop() is None:
            results.add_pass("Stack pop() returns None when empty")
        else:
            results.add_fail("Stack empty pop", "Should return None")
    except Exception as e:
        results.add_fail("Stack empty pop", str(e))
    
    # Queue FIFO
    try:
        q = Queue()
        q.enqueue("A")
        q.enqueue("B")
        q.enqueue("C")
        
        if q.dequeue() == "A" and q.dequeue() == "B" and q.dequeue() == "C":
            results.add_pass("Queue follows FIFO order")
        else:
            results.add_fail("Queue FIFO", "Dequeue order should be A, B, C")
    except Exception as e:
        results.add_fail("Queue operations", str(e))
    
    # Queue empty returns None
    try:
        q = Queue()
        if q.dequeue() is None:
            results.add_pass("Queue dequeue() returns None when empty")
        else:
            results.add_fail("Queue empty dequeue", "Should return None")
    except Exception as e:
        results.add_fail("Queue empty dequeue", str(e))


def check_log_functions(results: ValidationResult):
    """Check log search functions."""
    print("\n--- Log Function Checks ---")
    
    from student_reference.log_search import search_logs, sort_logs, validate_code
    
    # Test data
    logs = [
        {"timestamp": 100, "author": "Alice", "content": "First"},
        {"timestamp": 200, "author": "Bob", "content": "Second"},
        {"timestamp": 50, "author": "Alice", "content": "Third"},
    ]
    
    # search_logs
    try:
        alice_logs = search_logs(logs, "Alice")
        if len(alice_logs) == 2:
            results.add_pass("search_logs finds correct entries")
        else:
            results.add_fail("search_logs", f"Expected 2 entries, found {len(alice_logs)}")
    except Exception as e:
        results.add_fail("search_logs", str(e))
    
    # sort_logs ascending
    try:
        sorted_logs = sort_logs(logs, "timestamp")
        if sorted_logs[0]["timestamp"] == 50:
            results.add_pass("sort_logs ascending works")
        else:
            results.add_fail("sort_logs ascending", "First entry should have timestamp 50")
    except Exception as e:
        results.add_fail("sort_logs ascending", str(e))
    
    # sort_logs descending
    try:
        sorted_logs = sort_logs(logs, "timestamp", descending=True)
        if sorted_logs[0]["timestamp"] == 200:
            results.add_pass("sort_logs descending works")
        else:
            results.add_fail("sort_logs descending", "First entry should have timestamp 200")
    except Exception as e:
        results.add_fail("sort_logs descending", str(e))
    
    # validate_code
    try:
        used = {"ABC", "DEF"}
        if validate_code("GHI", used) and not validate_code("ABC", used):
            results.add_pass("validate_code checks set membership correctly")
        else:
            results.add_fail("validate_code", "Should return True for new, False for used")
    except Exception as e:
        results.add_fail("validate_code", str(e))
    
    # load_logs_from_file (B2.5 File I/O)
    try:
        from student_reference.log_search import load_logs_from_file
        import os
        log_path = os.path.join(os.path.dirname(__file__), "engine", "content", "logs.txt")
        loaded_logs = load_logs_from_file(log_path)
        if len(loaded_logs) >= 10:
            results.add_pass(f"load_logs_from_file reads {len(loaded_logs)} entries")
        else:
            results.add_fail("load_logs_from_file", f"Expected >=10 entries, got {len(loaded_logs)}")
        
        # Check structure of loaded log
        if loaded_logs and "timestamp" in loaded_logs[0] and "author" in loaded_logs[0]:
            results.add_pass("Loaded log entries have correct structure")
        else:
            results.add_fail("Log structure", "Missing timestamp or author keys")
    except ImportError:
        results.add_fail("load_logs_from_file", "Function not found - may be optional for this level")
    except Exception as e:
        results.add_fail("load_logs_from_file", str(e))


def check_engine_smoke_test(results: ValidationResult):
    """Smoke test: verify engine boots without crashing."""
    print("\n--- Engine Smoke Test ---")
    
    # Import engine modules
    try:
        from engine.world_loader import WorldLoader
        results.add_pass("Import WorldLoader")
    except Exception as e:
        results.add_fail("Import WorldLoader", str(e))
        return False
    
    try:
        from engine.command_parser import CommandParser
        results.add_pass("Import CommandParser")
    except Exception as e:
        results.add_fail("Import CommandParser", str(e))
        return False
    
    try:
        from engine.encounter import EncounterManager
        results.add_pass("Import EncounterManager")
    except Exception as e:
        results.add_fail("Import EncounterManager", str(e))
        return False
    
    try:
        from engine.save_load import SaveLoadManager
        results.add_pass("Import SaveLoadManager")
    except Exception as e:
        results.add_fail("Import SaveLoadManager", str(e))
        return False
    
    try:
        from engine.game_loop import Game, GameState
        results.add_pass("Import Game and GameState")
    except Exception as e:
        results.add_fail("Import Game/GameState", str(e))
        return False
    
    # Load world content
    try:
        world = WorldLoader()
        room_count = len(world.rooms)
        item_count = len(world.items)
        npc_count = len(world.npcs)
        encounter_count = len(world.encounters)
        
        if room_count >= 10:
            results.add_pass(f"World loads {room_count} rooms")
        else:
            results.add_fail("World rooms", f"Expected >=10 rooms, got {room_count}")
        
        if item_count >= 10:
            results.add_pass(f"World loads {item_count} items")
        else:
            results.add_fail("World items", f"Expected >=10 items, got {item_count}")
    except Exception as e:
        results.add_fail("World loading", str(e))
        return False
    
    # Test starting room exists
    try:
        start_room = world.get_room("airlock")
        if start_room and "name" in start_room:
            results.add_pass("Starting room 'airlock' exists")
        else:
            results.add_fail("Starting room", "Room 'airlock' not found or invalid")
    except Exception as e:
        results.add_fail("Starting room", str(e))
    
    # Test game state creation
    try:
        state = GameState()
        if state.current_room == "airlock":
            results.add_pass("GameState initializes correctly")
        else:
            results.add_fail("GameState init", f"current_room should be 'airlock'")
    except Exception as e:
        results.add_fail("GameState creation", str(e))
    
    # Test Game class can be instantiated (but don't start it)
    try:
        game = Game()
        if game.world and game.parser and game.state:
            results.add_pass("Game object initializes correctly")
        else:
            results.add_fail("Game init", "Game missing world/parser/state")
    except Exception as e:
        results.add_fail("Game creation", str(e))
        return False
    
    return True


def main():
    """Run all validation checks."""
    print()
    print("=" * 60)
    print("       SIGMA-7 LEVEL X VALIDATOR")
    print("=" * 60)
    
    results = ValidationResult()
    
    # Run checks
    if not check_imports(results):
        results.summary()
        sys.exit(1)
    
    check_player(results)
    check_player_types(results)
    check_inventory(results)
    check_data_structures(results)
    check_log_functions(results)
    
    # Engine smoke test (catches syntax errors, import failures)
    if not check_engine_smoke_test(results):
        results.summary()
        sys.exit(1)
    
    # Summary
    if results.summary():
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
