"""
Player Types - Student reference implementation.

Brute and Scout subclasses demonstrating inheritance and method overriding.
"""

from student_reference.player import Player


class Brute(Player):
    """
    Heavy combat specialist.
    
    High health and armour, but lower accuracy.
    When you hit, you hit hard.
    """
    
    def get_starting_stats(self) -> dict:
        """
        Get Brute starting stats.
        
        Returns:
            Dict with boosted health and armour, reduced accuracy.
        """
        return {
            "health": 120,
            "max_health": 120,
            "armour": 3,
            "accuracy": 70
        }
    
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
        
        from student_reference.inventory import Inventory
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
    
    def get_starting_stats(self) -> dict:
        """
        Get Scout starting stats.
        
        Returns:
            Dict with reduced health and armour, boosted accuracy.
        """
        return {
            "health": 80,
            "max_health": 80,
            "armour": 1,
            "accuracy": 95
        }
    
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
        
        from student_reference.inventory import Inventory
        player.inventory = Inventory()
        for item_id in data.get("inventory", []):
            player.inventory.add(item_id)
        
        return player
