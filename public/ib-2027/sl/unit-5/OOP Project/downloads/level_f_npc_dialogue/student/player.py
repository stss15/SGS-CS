# =============================================================================
# Player class - Complete from Levels A-E, plus respond_to_npc() for Level F
# =============================================================================

from .inventory import Inventory

class Player:
    """Base player class with inventory, item usage, and NPC interaction."""

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

    def use_item(self, item_id: str, target: str) -> str:
        if not self.inventory.has_item(item_id):
            return f"You don't have '{item_id}'."
        if item_id == "med_patch" and target == "self":
            self.heal(20)
            self.inventory.consume("med_patch")
            return "You apply the med patch. +20 HP."
        return f"You use the {item_id} on the {target}."

    # =========================================================================
    # YOUR TASK: Add the respond_to_npc() method
    # =========================================================================
    # respond_to_npc(self, options):
    #   - options is a list of dialogue choices (strings)
    #   - Display each option with a number (1, 2, 3...)
    #   - Use input() to get user's choice
    #   - Validate the input (must be a number in valid range)
    #   - Return the index (0-based) of the chosen option
    # 
    # Example: If options = ["Ask about the station", "Say goodbye"]
    #   Display:  1. Ask about the station
    #             2. Say goodbye
    #   If user types "1", return 0
    #   If user types "2", return 1
    # =========================================================================
