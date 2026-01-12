"""
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
