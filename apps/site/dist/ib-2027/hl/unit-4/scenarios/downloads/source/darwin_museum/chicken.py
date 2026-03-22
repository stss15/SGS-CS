# chicken.py - Inherits from Bird
from bird import Bird

class Chicken(Bird):
    """Domesticated chicken - modern descendant."""
    
    def __init__(self, specimen_id: str):
        pass
    
    # Success criteria:
    # - Inherits from Bird (sibling to Penguin)
    # - Adds chicken-specific attributes from UML
    # - Overrides sound(), display_card()
    # - Implements forage(), produce_egg_report()
