"""
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
