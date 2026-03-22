# dinosaur.py - Inherits from Species
from species import Species

class Dinosaur(Species):
    """Dinosaur branch of the museum."""
    
    def __init__(self, specimen_id: str):
        pass
    
    # Success criteria:
    # - Inherits from Species using super()
    # - Adds dinosaur-specific attributes from UML
    # - Overrides describe(), move(), sound()
    # - Implements get_skeletal_note()
