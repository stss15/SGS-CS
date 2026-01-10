class Player:

    # CONSTRUCTOR
    def __init__(self, name: str):
        self.name = name
        stats = self.get_starting_stats()
        self.health = stats["health"]
        self.max_health = stats["max_health"]
        self.armour = stats["armour"]
        self.accuracy = stats["accuracy"]

    # GET STARTING STATS
    def get_starting_stats(self) -> dict:
        return {
            "health": 100,
            "max_health": 100,
            "armour": 2,
            "accuracy": 85
        }

    # GET STATUS
    def get_status(self) -> str:
        return f"{self.name}: {self.health}/{self.max_health} HP"

    # TAKE DAMAGE
    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)

    # HEAL
    def heal(self, amount: int) -> None:
        self.health = min(self.max_health, self.health + amount)
