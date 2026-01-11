from .inventory import Inventory

class Player:
    """Base player class with inventory, items, dialogue, and combat."""

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

    def use_item(self, item_id: str, target: str) -> str:
        if not self.inventory.has_item(item_id):
            return f"You don't have '{item_id}'."
        if item_id == "med_patch" and target == "self":
            self.heal(20)
            self.inventory.consume("med_patch")
            return "You apply the med patch. +20 HP."
        return f"You use the {item_id} on the {target}."

    def respond_to_npc(self, options: list) -> int:
        for i, option in enumerate(options):
            print(f"{i+1}: {option}")
        while True:
            try:
                choice = int(input("Choose an option: ")) - 1
                if 0 <= choice < len(options):
                    return choice
                print("Invalid choice.")
            except ValueError:
                print("Please enter a number.")

    # CHOOSE ACTION (YOUR TASK FOR THIS LEVEL)
    # - Receives: options (list of combat actions)
    # - Display each option with a number
    # - Get user input and validate it
    # - Return the chosen index (0-based)
    pass

    # COMPUTE DAMAGE (YOUR TASK FOR THIS LEVEL)
    # - Receives: base (base damage), armour (target's armour)
    # - Calculate: damage = base - armour
    # - Return: the damage (minimum 0, cannot be negative)
    pass
