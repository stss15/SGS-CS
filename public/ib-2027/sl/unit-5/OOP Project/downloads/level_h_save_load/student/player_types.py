# =============================================================================
# Player Types - Brute and Scout with save/load support
# NOTE: These are provided complete. Focus on implementing Player's methods.
# =============================================================================

from .player import Player


class Brute(Player):
    """Heavy combat specialist - high health and armour, low accuracy."""

    def __init__(self, name: str):
        super().__init__(name)
        self.health = 120
        self.max_health = 120
        self.armour = 3
        self.accuracy = 70

    def to_save_data(self) -> dict:
        """Convert Brute to dictionary for saving."""
        return {
            "name": self.name,
            "player_type": "brute",
            "health": self.health,
            "max_health": self.max_health,
            "armour": self.armour,
            "accuracy": self.accuracy,
            "inventory": self.inventory.list_items()
        }

    @classmethod
    def from_save_data(cls, data: dict) -> "Brute":
        """Reconstruct a Brute from saved data."""
        player = cls(data.get("name", "Unknown"))
        player.health = data.get("health", 120)
        player.max_health = data.get("max_health", 120)
        player.armour = data.get("armour", 3)
        player.accuracy = data.get("accuracy", 70)
        
        from .inventory import Inventory
        player.inventory = Inventory()
        for item_id in data.get("inventory", []):
            player.inventory.add(item_id)
        
        return player


class Scout(Player):
    """Reconnaissance expert - low health, high accuracy."""

    def __init__(self, name: str):
        super().__init__(name)
        self.health = 80
        self.max_health = 80
        self.armour = 1
        self.accuracy = 95

    def to_save_data(self) -> dict:
        """Convert Scout to dictionary for saving."""
        return {
            "name": self.name,
            "player_type": "scout",
            "health": self.health,
            "max_health": self.max_health,
            "armour": self.armour,
            "accuracy": self.accuracy,
            "inventory": self.inventory.list_items()
        }

    @classmethod
    def from_save_data(cls, data: dict) -> "Scout":
        """Reconstruct a Scout from saved data."""
        player = cls(data.get("name", "Unknown"))
        player.health = data.get("health", 80)
        player.max_health = data.get("max_health", 80)
        player.armour = data.get("armour", 1)
        player.accuracy = data.get("accuracy", 95)
        
        from .inventory import Inventory
        player.inventory = Inventory()
        for item_id in data.get("inventory", []):
            player.inventory.add(item_id)
        
        return player
