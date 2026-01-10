from student.inventory import Inventory

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

    def get_status(self) -> str:
        return f"{self.name}: {self.health}/{self.max_health} HP"

    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)

    def heal(self, amount: int) -> None:
        self.health = min(self.max_health, self.health + amount)

    # USE ITEM (YOUR TASK FOR THIS LEVEL)
    # - Receives: item_id, target
    # - Check if you have the item
    # - Handle med_patch: heal 20, consume item, return message
    # - Return appropriate message for other items
    pass
