# bird.py - Inherits from Species (parallel branch to Dinosaur)
from species import Species

class Bird(Species):
    """Bird branch of the museum."""
    
    def __init__(self, specimen_id: str):
        pass
    
    # Success criteria:
    # - Inherits from Species (parallel to Dinosaur)
    # - Adds bird-specific attributes from UML
    # - Overrides move(), sound(), eat()
    # - Implements lay_eggs(), get_adaptation_summary()
