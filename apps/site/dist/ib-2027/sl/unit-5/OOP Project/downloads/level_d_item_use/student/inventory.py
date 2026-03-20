# =============================================================================
# Inventory class - Complete from Level C, plus consume() for Level D
# =============================================================================

class Inventory:

    MAX_CAPACITY = 10

    def __init__(self):
        self._items = []

    def add(self, item_id: str) -> bool:
        if self.is_full() or self.has_item(item_id):
            return False
        self._items.append(item_id)
        return True

    def remove(self, item_id: str) -> bool:
        if item_id in self._items:
            self._items.remove(item_id)
            return True
        return False

    def list_items(self) -> list:
        return self._items.copy()

    def has_item(self, item_id: str) -> bool:
        return item_id in self._items

    def is_full(self) -> bool:
        return len(self._items) >= self.MAX_CAPACITY

    def count(self) -> int:
        return len(self._items)
    
    # =========================================================================
    # YOUR TASK: Add the consume() method
    # =========================================================================
    # consume(self, item_id): 
    #   - Use and remove an item (same as remove)
    #   - Return True if consumed, False if not found
    # =========================================================================
