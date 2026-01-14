# ==========================================
# DARWIN'S MUSEUM - Teacher Solution
# Uses ONLY attributes shown in UML and Method Specs
# ==========================================

# ============ SPECIES (Base Class) ============
class Species:
    """Base class for all museum specimens."""
    
    def __init__(self, specimen_id: str):
        # UML: _specimen_id, species_name, common_name
        self._specimen_id = specimen_id
        self.species_name = "Unknown"
        self.common_name = "Unknown"
    
    @property
    def specimen_id(self) -> str:
        """Read-only specimen ID (encapsulation demo)."""
        return self._specimen_id
    
    def describe(self) -> str:
        """Return a description of the species."""
        return f"{self.common_name} ({self.species_name})"
    
    def sound(self) -> str:
        """Return what sound this species makes."""
        return "..."
    
    def move(self) -> str:
        """Return how this species moves."""
        return f"The {self.common_name} moves."


# ============ DINOSAUR ============
class Dinosaur(Species):
    """Dinosaur branch - inherits from Species."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        # UML: clade, tail_length_m, has_feathers
        self.clade = "Dinosauria"
        self.tail_length_m = 0.0
        self.has_feathers = False
    
    def get_skeletal_note(self) -> str:
        """Return skeletal features: clade and tail length."""
        return f"Clade: {self.clade}, Tail: {self.tail_length_m}m"


# ============ THEROPOD ============
class Theropod(Dinosaur):
    """Theropod - inherits from Dinosaur."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        # UML: stance, hand_claws, hunting_style
        self.stance = "bipedal"
        self.hand_claws = 3
        self.hunting_style = "ambush"
    
    def hunt(self) -> str:
        """Return hunting behavior using hunting_style."""
        return f"The {self.common_name} hunts using {self.hunting_style} tactics."
    
    def get_trait_evolution(self) -> str:
        """Return summary of evolved traits: hand_claws, stance."""
        return f"Evolved {self.hand_claws} clawed hands, {self.stance} stance."


# ============ TREX ============
class TRex(Theropod):
    """T-Rex - inherits from Theropod."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.species_name = "Tyrannosaurus rex"
        self.common_name = "T-Rex"
        # UML: bite_force_n, arm_length_m, top_speed_kmh
        self.bite_force_n = 57000
        self.arm_length_m = 1.0
        self.top_speed_kmh = 32.0
        self.tail_length_m = 4.5
    
    def sound(self) -> str:
        return "ROOOAAARRR! The T-Rex roars!"
    
    def move(self) -> str:
        return f"The T-Rex charges at {self.top_speed_kmh} km/h!"
    
    def intimidate(self) -> str:
        """Return intimidation display mentioning bite force."""
        return f"The T-Rex opens its jaws ({self.bite_force_n:,}N bite force) and ROARS!"
    
    def get_museum_fact(self) -> str:
        """Return museum-worthy fact about T-Rex."""
        return f"Despite {self.arm_length_m}m arms, T-Rex had the strongest bite of any land animal."


# ============ VELOCIRAPTOR ============
class Velociraptor(Theropod):
    """Velociraptor - inherits from Theropod."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.species_name = "Velociraptor mongoliensis"
        self.common_name = "Velociraptor"
        # UML: pack_size, claw_length_cm, feather_display
        self.pack_size = 6
        self.claw_length_cm = 6.5
        self.feather_display = "brown striped"
        self.has_feathers = True
        self.hunting_style = "pack"
    
    def sound(self) -> str:
        return "SKREEE! The Velociraptor screeches!"
    
    def move(self) -> str:
        return "The Velociraptor runs and leaps with agility."
    
    def pack_hunt(self) -> str:
        """Return pack hunting description using pack_size."""
        return f"A pack of {self.pack_size} velociraptors coordinates their attack."
    
    def leap_attack(self) -> str:
        """Return leap attack using claw_length_cm."""
        return f"The Velociraptor leaps, striking with its {self.claw_length_cm}cm sickle claw!"


# ============ BIRD ============
class Bird(Species):
    """Bird branch - inherits from Species."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        # UML: wing_span_m, beak_type, flight_capable
        self.wing_span_m = 0.0
        self.beak_type = "general"
        self.flight_capable = True
    
    def move(self) -> str:
        if self.flight_capable:
            return f"The {self.common_name} flies with {self.wing_span_m}m wingspan."
        return f"The {self.common_name} walks (flightless)."
    
    def lay_eggs(self) -> str:
        """Return egg-laying behavior."""
        return f"The {self.common_name} lays eggs in a nest."


# ============ CHICKEN ============
class Chicken(Bird):
    """Chicken - inherits from Bird."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.species_name = "Gallus gallus domesticus"
        self.common_name = "Chicken"
        # UML: breed, domesticated, egg_per_week
        self.breed = "Rhode Island Red"
        self.domesticated = True
        self.egg_per_week = 5
        self.flight_capable = False
        self.wing_span_m = 0.6
        self.beak_type = "pointed"
    
    def sound(self) -> str:
        return "BAWK BAWK BAWK! The chicken clucks."
    
    def forage(self) -> str:
        """Return foraging behavior."""
        return f"The {self.breed} chicken scratches the ground for food."


# ============ PENGUIN ============
class Penguin(Bird):
    """Penguin - inherits from Bird."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.species_name = "Aptenodytes forsteri"
        self.common_name = "Emperor Penguin"
        # UML: swim_speed_kmh, colony_size
        self.swim_speed_kmh = 22.0
        self.colony_size = 5000
        self.flight_capable = False
        self.wing_span_m = 0.76
        self.beak_type = "pointed"
    
    def sound(self) -> str:
        return "HONK HONK! The penguin brays."
    
    def move(self) -> str:
        return f"The penguin waddles on land but swims at {self.swim_speed_kmh} km/h!"
    
    def swim(self) -> str:
        """Return swimming behavior using swim_speed_kmh."""
        return f"The penguin dives and swims at {self.swim_speed_kmh} km/h."
    
    def huddle(self) -> str:
        """Return huddling behavior using colony_size."""
        return f"The penguins form a huddle of {self.colony_size} to stay warm."


# ============ MAIN ============
def run_museum_tour():
    """Demonstrate polymorphism with a museum tour."""
    print("=" * 50)
    print("   DARWIN'S MUSEUM TOUR")
    print("=" * 50)
    
    # Create specimens
    rex = TRex("TREX-001")
    raptor = Velociraptor("VELOC-001")
    hen = Chicken("CHIK-001")
    penguin = Penguin("PENG-001")
    
    # POLYMORPHISM: same method, different behaviors
    exhibits = [rex, raptor, hen, penguin]
    
    print("\n🦴 Calling sound() on each exhibit:")
    for exhibit in exhibits:
        print(f"  {exhibit.common_name}: {exhibit.sound()}")
    
    print("\n🦶 Calling move() on each exhibit:")
    for exhibit in exhibits:
        print(f"  {exhibit.common_name}: {exhibit.move()}")
    
    print("\n🔒 ENCAPSULATION DEMO:")
    print(f"  Rex specimen ID: {rex.specimen_id}")
    try:
        rex.specimen_id = "NEW-ID"
    except AttributeError:
        print("  ✅ Cannot modify - @property makes it read-only!")
    
    print("\n" + "=" * 50)
    print("   Tour Complete!")
    print("=" * 50)


if __name__ == "__main__":
    run_museum_tour()
