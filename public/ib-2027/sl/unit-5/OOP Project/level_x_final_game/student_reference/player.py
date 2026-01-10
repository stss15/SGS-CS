"""
Player class - Student reference implementation.

This file shows the correct implementation of the Player class.
In per-level downloads, students build this themselves (blank file).
"""


class Player:
    """
    Represents a player character in the game.
    
    Attributes:
        name (str): The player's name.
        health (int): Current health points.
        max_health (int): Maximum health points.
        armour (int): Damage reduction value.
        accuracy (int): Hit chance percentage (0-100).
        inventory (Inventory): The player's inventory (composition).
    """
    
    def __init__(self, name: str):
        """
        Create a new player.
        
        Args:
            name: The player's name.
        """
        self.name = name
        
        # Set starting stats directly
        self.health = 100
        self.max_health = 100
        self.armour = 2
        self.accuracy = 85
        
        # Composition: Player has-a Inventory
        from student_reference.inventory import Inventory
        self.inventory = Inventory()
    
    def get_status(self) -> str:
        """
        Get a formatted status string for the player.
        
        Returns:
            A string showing name, health, and stats.
        """
        items = self.inventory.list_items()
        item_count = len(items)
        
        return (
            f"\n--- {self.name} ---\n"
            f"Health: {self.health}/{self.max_health}\n"
            f"Armour: {self.armour}\n"
            f"Accuracy: {self.accuracy}%\n"
            f"Items: {item_count}/{self.inventory.MAX_CAPACITY}"
        )
    
    def take_damage(self, amount: int) -> None:
        """
        Reduce health by the given amount.
        
        Health cannot go below 0.
        
        Args:
            amount: The amount of damage to take.
        """
        self.health = max(0, self.health - amount)
    
    def heal(self, amount: int) -> None:
        """
        Increase health by the given amount.
        
        Health cannot exceed max_health.
        
        Args:
            amount: The amount to heal.
        """
        self.health = min(self.max_health, self.health + amount)
    
    def use_item(self, item_id: str, target: str) -> str:
        """
        Use an item on a target.
        
        Args:
            item_id: The ID of the item to use.
            target: What to use it on ("self" or an object ID).
            
        Returns:
            A string describing the outcome.
        """
        # Check if we have the item
        if not self.inventory.has_item(item_id):
            return f"You don't have '{item_id}'."
        
        # Handle specific items
        if item_id == "keycard":
            if target == "security_door" or target == "door":
                return "You swipe the keycard. The security door's lock clicks open."
            else:
                return "The keycard doesn't work on that."
        
        elif item_id == "crowbar":
            if target == "chest" or target == "storage_chest":
                return "You pry the chest open with the crowbar. Metal shrieks as the lock gives way."
            else:
                return "You can't use the crowbar on that."
        
        elif item_id == "med_patch":
            if target == "self" or target.lower() == self.name.lower():
                self.heal(20)
                self.inventory.consume(item_id)
                return "You apply the med patch. A cool sensation spreads as nano-repair compounds go to work. +20 HP"
            else:
                return "You can only use the med patch on yourself."
        
        elif item_id == "med_kit":
            if target == "self" or target.lower() == self.name.lower():
                self.heal(50)
                self.inventory.consume(item_id)
                return "You use the medical kit. Advanced healing compounds flood your system. +50 HP"
            else:
                return "You can only use the med kit on yourself."
        
        elif item_id == "battery" or item_id == "power_cell":
            if "terminal" in target.lower():
                return "You insert the power cell. The terminal hums to life, displays flickering."
            else:
                return "The power cell doesn't fit there."
        
        elif item_id == "torch":
            return "You switch on the flashlight. Its beam cuts through the darkness."
        
        elif item_id == "signal_beacon":
            if target == "self" or "console" in target.lower() or "beacon" in target.lower():
                return "You activate the distress beacon. A pulse of light signals your salvation."
            else:
                return "You need to activate the beacon at the command console."
        
        else:
            return f"You're not sure how to use the {item_id} on {target}."
    
    def respond_to_npc(self, options: list) -> int:
        """
        Choose a response when talking to an NPC.
        
        Args:
            options: A list of dialogue options.
            
        Returns:
            The index of the chosen option (0 to len(options)-1).
        """
        print("\nChoose your response (enter number):")
        for i, opt in enumerate(options):
            print(f"  {i + 1}. {opt}")
        
        while True:
            try:
                choice = input("> ").strip()
                choice_num = int(choice) - 1  # Convert to 0-indexed
                if 0 <= choice_num < len(options):
                    return choice_num
                print(f"Please enter a number between 1 and {len(options)}.")
            except ValueError:
                print("Please enter a number.")
    
    def choose_action(self, options: list) -> int:
        """
        Choose an action during combat.
        
        Args:
            options: A list of action options (e.g., ["Attack", "Defend", "Use Item", "Run"]).
            
        Returns:
            The index of the chosen action (0 to len(options)-1).
        """
        while True:
            try:
                choice = input("Enter action number: ").strip()
                choice_num = int(choice) - 1  # Convert to 0-indexed
                if 0 <= choice_num < len(options):
                    return choice_num
                print(f"Please enter a number between 1 and {len(options)}.")
            except ValueError:
                print("Please enter a number.")
    
    def compute_damage(self, base: int, armour: int) -> int:
        """
        Calculate damage after armour reduction.
        
        Args:
            base: The base damage amount.
            armour: The target's armour value.
            
        Returns:
            The actual damage dealt (minimum 0).
        """
        return max(0, base - armour)
    
    def to_save_data(self) -> dict:
        """
        Convert the player to a serialisable dictionary.
        
        Returns:
            A dict containing all player data needed to restore state.
        """
        return {
            "name": self.name,
            "player_type": "player",  # Overridden in subclasses
            "health": self.health,
            "max_health": self.max_health,
            "armour": self.armour,
            "accuracy": self.accuracy,
            "inventory": self.inventory.list_items()
        }
    
    @classmethod
    def from_save_data(cls, data: dict) -> "Player":
        """
        Reconstruct a player from saved data.
        
        Args:
            data: The dict returned by to_save_data().
            
        Returns:
            A new Player instance with the saved state.
        """
        # Create player with saved name
        player = cls(data.get("name", "Unknown"))
        
        # Restore stats
        player.health = data.get("health", 100)
        player.max_health = data.get("max_health", 100)
        player.armour = data.get("armour", 2)
        player.accuracy = data.get("accuracy", 85)
        
        # Restore inventory
        from student_reference.inventory import Inventory
        player.inventory = Inventory()
        for item_id in data.get("inventory", []):
            player.inventory.add(item_id)
        
        return player
