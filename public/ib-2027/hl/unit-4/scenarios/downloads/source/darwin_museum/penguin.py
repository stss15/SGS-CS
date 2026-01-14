# penguin.py - Inherits from Bird (sibling to Chicken)
from bird import Bird

class Penguin(Bird):
    """Emperor Penguin - aquatic specialist."""
    
    def __init__(self, specimen_id: str):
        pass
    
    # Success criteria:
    # - Inherits from Bird (sibling to Chicken)
    # - Adds penguin-specific attributes from UML
    # - Overrides move(), sound()
    # - Implements swim(), huddle()
