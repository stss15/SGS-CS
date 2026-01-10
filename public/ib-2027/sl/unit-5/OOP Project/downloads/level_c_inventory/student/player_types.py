from student.player import Player

class Brute(Player):
    def get_starting_stats(self) -> dict:
        return {"health": 120, "max_health": 120, "armour": 3, "accuracy": 70}

class Scout(Player):
    def get_starting_stats(self) -> dict:
        return {"health": 80, "max_health": 80, "armour": 1, "accuracy": 95}
