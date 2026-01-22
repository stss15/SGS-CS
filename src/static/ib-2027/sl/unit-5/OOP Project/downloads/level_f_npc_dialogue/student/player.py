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
            return "You apply the med patch. +20 HP."
        return f"You use the {item_id} on the {target}."

    def attach_logbook(self, logbook) -> None:
        self.logbook = logbook

    def record_event(self, entry: str) -> str:
        if self.logbook is None:
            return "No logbook attached."
        self.logbook.add_entry(entry)
        return "Logbook updated."

    # =========================================================================
    # YOUR TASK: Add the respond_to_npc() method
    # =========================================================================
    # respond_to_npc(self, options)
    #   - options is a list of dialogue choices (strings)
    #   - The ENGINE displays the options - don't print them again!
    #   - Use input() to get user's choice (a number 1, 2, 3...)
    #   - Validate the input (must be in valid range)
    #   - Return the 0-based INDEX of the chosen option
    # 
    # Example: If options = ["Ask about the station", "Say goodbye"]
    #   Engine shows:  1. Ask about the station
    #                  2. Say goodbye
    #   If user types "1", return 0
    #   If user types "2", return 1
    # =========================================================================
