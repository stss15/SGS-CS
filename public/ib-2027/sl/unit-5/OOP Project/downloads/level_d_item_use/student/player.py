# =============================================================================
# Player class - Complete from Levels A-C, plus use_item() for Level D
# =============================================================================

from .inventory import Inventory

class Player:
    """Base player class with inventory and item usage."""

    def __init__(self, name: str):
        self.name = name
        self.health = 100
        self.max_health = 100
        self.armour = 2
        self.accuracy = 85
        self.inventory = Inventory()

    def get_status(self) -> str:
        return f"{self.name}: {self.health}/{self.max_health} HP"

    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)

    def heal(self, amount: int) -> None:
        self.health = min(self.max_health, self.health + amount)

    # =========================================================================
    # YOUR TASK: Add the use_item() method
    # =========================================================================
    # use_item(self, item_id, target):
    #   - Check if you have the item (return message if not)
    #   - If item_id is "med_patch" and target is "self":
    #       - Heal 20 HP
    #       - Consume (remove) the item
    #       - Return a success message
    #   - For other items: return a generic "You use the X on Y" message
    # =========================================================================
