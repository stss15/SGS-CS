from student.inventory import Inventory

class Player:

    def __init__(self, name: str):
        self.name = name
        stats = self.get_starting_stats()
        self.health = stats["health"]
        self.max_health = stats["max_health"]
        self.armour = stats["armour"]
        self.accuracy = stats["accuracy"]
        self.inventory = Inventory()

    def get_starting_stats(self) -> dict:
        return {"health": 100, "max_health": 100, "armour": 2, "accuracy": 85}

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

    # RESPOND TO NPC (NEW)
    respond_to_npc()
