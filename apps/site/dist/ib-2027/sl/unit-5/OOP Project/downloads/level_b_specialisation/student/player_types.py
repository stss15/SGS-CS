from .player import Player


class Brute(Player):
    # CONSTRUCTOR
    # - Call parent constructor with name
    # - Then override: health=120, max_health=120, armour=3, accuracy=70
    pass

    # describe_specialty(self) -> str
    # - Return a short string describing the Brute's strengths
    # - This demonstrates method overriding (same method name, different output)


class Scout(Player):
    # CONSTRUCTOR
    # - Call parent constructor with name
    # - Then override: health=80, max_health=80, armour=1, accuracy=95
    pass

    # describe_specialty(self) -> str
    # - Return a short string describing the Scout's strengths
