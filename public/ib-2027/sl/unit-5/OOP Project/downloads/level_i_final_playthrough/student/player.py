from student.inventory import Inventory

class Player:
    """Complete Player class implementation for the final game."""

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

    def choose_action(self, options: list) -> int:
        for i, option in enumerate(options):
            print(f"{i+1}: {option}")
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
        """Convert player to dictionary for saving."""
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
        """Create a Player from saved dictionary data."""
        player = cls(data.get("name", "Unknown"))
        player.health = data.get("health", 100)
        player.max_health = data.get("max_health", 100)
        player.armour = data.get("armour", 2)
        player.accuracy = data.get("accuracy", 85)
        
        from student.inventory import Inventory
        player.inventory = Inventory()
        for item_id in data.get("inventory", []):
            player.inventory.add(item_id)
        
        return player
