# species.py - Base class for all museum specimens
# See the UML diagram for required attributes and methods

class Species:
    """Base class - all other species inherit from this."""
    
    def __init__(self, specimen_id: str):
        pass
    
    # Success criteria:
    # - All attributes from UML are set with sensible defaults
    # - specimen_id property is read-only
    # - describe() returns a paragraph about the species
    # - sound(), move(), eat() return descriptive strings
    # - get_lineage() returns class hierarchy as a list
    # - __str__() returns a one-line summary
