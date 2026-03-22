"""
Player Types - Student reference implementation.

Brute and Scout subclasses demonstrating inheritance.
Each subclass calls the parent constructor, then customizes specific attributes.
"""

from .player import Player


class Brute(Player):
    """
    Heavy combat specialist.
    
    High health and armour, but lower accuracy.
    When you hit, you hit hard.
    """
    
    def __init__(self, name: str):
        """
        Create a Brute player.
        
        First calls the parent constructor to set up base Player,
        then overrides specific stats for the Brute archetype.
        """
        super().__init__(name)  # Set up as a Player first
        
        # Then customize for Brute
        self.health = 120
        self.max_health = 120
        self.armour = 3
        self.accuracy = 70

    def describe_specialty(self) -> str:
        """Return a short description of the Brute's strengths."""
        return "Brute: heavy combat specialist with high health and armour."
    
    def to_save_data(self) -> dict:
        """
        Convert to save data with correct player type.
        """
        data = super().to_save_data()
        data["player_type"] = "brute"
        return data
    
    @classmethod
    def from_save_data(cls, data: dict) -> "Brute":
        """
        Reconstruct a Brute from saved data.
        """
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
    """
    Reconnaissance expert.
    
    Lower health and armour, but excellent accuracy.
    Every shot counts.
    """
    
    def __init__(self, name: str):
        """
        Create a Scout player.
        
        First calls the parent constructor to set up base Player,
        then overrides specific stats for the Scout archetype.
        """
        super().__init__(name)  # Set up as a Player first
        
        # Then customize for Scout
        self.health = 80
        self.max_health = 80
        self.armour = 1
        self.accuracy = 95

    def describe_specialty(self) -> str:
        """Return a short description of the Scout's strengths."""
        return "Scout: precision specialist with high accuracy and mobility."
    
    def to_save_data(self) -> dict:
        """
        Convert to save data with correct player type.
        """
        data = super().to_save_data()
        data["player_type"] = "scout"
        return data
    
    @classmethod
    def from_save_data(cls, data: dict) -> "Scout":
        """
        Reconstruct a Scout from saved data.
        """
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
