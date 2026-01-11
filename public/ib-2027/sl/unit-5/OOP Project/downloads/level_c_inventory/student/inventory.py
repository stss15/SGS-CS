# =============================================================================
# LEVEL C: THE INVENTORY CLASS
# =============================================================================
#
# Your task: Create an Inventory class with the following:
#
# CLASS VARIABLE:
#   - MAX_CAPACITY = 10 (maximum items that can be held)
#
# ATTRIBUTES (set in __init__):
#   - _items: an empty list to store item IDs (use underscore prefix for "private")
#
# METHODS:
#   - __init__(self): Create empty inventory
#   - add(self, item_id): Add item if not full and not duplicate. Return True/False
#   - remove(self, item_id): Remove item if present. Return True/False
#   - list_items(self): Return a copy of the items list
#   - has_item(self, item_id): Return True if item is in inventory
#   - is_full(self): Return True if at MAX_CAPACITY
#   - count(self): Return number of items
#
# =============================================================================

class Inventory:
    MAX_CAPACITY = 10  # This is given - don't change it
    
    pass  # Remove this 'pass' and write your code here
