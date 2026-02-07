from .player import Player


class Brute(Player):
    """Heavy combat specialist - high health and armour, low accuracy."""

    def __init__(self, name: str):
        super().__init__(name)
        self.health = 120
        self.max_health = 120
        self.armour = 3
        self.accuracy = 70

    def describe_specialty(self) -> str:
        return "Brute: heavy combat specialist with high health and armour."


class Scout(Player):
    """Reconnaissance expert - low health, high accuracy."""

    def __init__(self, name: str):
        super().__init__(name)
        self.health = 80
        self.max_health = 80
        self.armour = 1
        self.accuracy = 95

    def describe_specialty(self) -> str:
        return "Scout: precision specialist with high accuracy and mobility."
