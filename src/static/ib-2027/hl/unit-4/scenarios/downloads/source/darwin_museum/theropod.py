# theropod.py - Inherits from Dinosaur
from dinosaur import Dinosaur

class Theropod(Dinosaur):
    """Theropod (bipedal carnivore) branch."""
    
    def __init__(self, specimen_id: str):
        pass
    
    # Success criteria:
    # - Inherits from Dinosaur
    # - Adds hunting-related attributes from UML
    # - Overrides eat(), move()
    # - Implements hunt(), get_trait_evolution()
