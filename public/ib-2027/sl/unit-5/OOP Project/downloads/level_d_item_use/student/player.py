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

    # USE ITEM (NEW)
    use_item()
