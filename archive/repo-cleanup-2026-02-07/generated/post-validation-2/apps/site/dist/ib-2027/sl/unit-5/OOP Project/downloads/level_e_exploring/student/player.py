from .inventory import Inventory

class Player:
    """Base player class with inventory and item usage."""

    def __init__(self, name: str):
        self.name = name
        # Direct attribute assignment
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

    # =========================================================================
    # YOUR TASK: Add the attach_logbook() method
    # =========================================================================
    # attach_logbook(self, logbook)
    #   - Store the provided logbook object on the player
    #   - This shows aggregation (the logbook can exist without the player)
    # =========================================================================

    # =========================================================================
    # YOUR TASK: Add the record_event() method
    # =========================================================================
    # record_event(self, entry)
    #   - If no logbook is attached, return a helpful message
    #   - Otherwise add the entry to the logbook and return a confirmation string
    # =========================================================================
