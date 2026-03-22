# =============================================================================
# Player class - Complete from Levels A-G, plus save/load for Level H
# =============================================================================

from .inventory import Inventory

class Player:
    """Base player class with full functionality including save/load."""

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

    # =========================================================================
    # YOUR TASK: Add the to_save_data() method
    # =========================================================================
    # to_save_data(self):
    #   - Return a dictionary containing all player data
    #   - Keys: "name", "player_type", "health", "max_health", "armour", 
    #           "accuracy", "inventory"
    #   - For player_type, use "player" (subclasses will override)
    #   - For inventory, use self.inventory.list_items()
    # =========================================================================

    # =========================================================================
    # YOUR TASK: Add the from_save_data() class method
    # =========================================================================
    # @classmethod
    # def from_save_data(cls, data):
    #   - Create a new Player using cls(data["name"])
    #   - Set health, max_health, armour, accuracy from the dictionary
    #   - Add each item from data["inventory"] to the player's inventory
    #   - Return the new player instance
    # =========================================================================
