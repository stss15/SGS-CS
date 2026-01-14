# ==========================================
# DARWIN'S MUSEUM - Teacher Solution
# All classes in one file for reference
# ==========================================

# ============ SPECIES (Base Class) ============
class Species:
    """Base class for all museum specimens."""
    
    def __init__(self, specimen_id: str):
        self._specimen_id = specimen_id
        self.species_name = "Unknown Species"
        self.common_name = "Unknown"
        self.era = "Unknown"
        self.diet = "Unknown"
        self.avg_mass_kg = 0.0
        self.covering = "skin"
        self.locomotion = "walking"
        self.temperature_regulation = "unknown"
        self.notable_traits = []
    
    @property
    def specimen_id(self) -> str:
        """Read-only specimen ID."""
        return self._specimen_id
    
    def get_lineage(self) -> list:
        """Return class hierarchy as a list."""
        return ["Species"]
    
    def describe(self) -> str:
        """Return a description of the species."""
        return f"{self.common_name} ({self.species_name}) is a {self.diet.lower()} from the {self.era}."
    
    def display_card(self) -> str:
        """Return a formatted museum display card."""
        return f"""
╔══════════════════════════════════════╗
║  {self.common_name.upper():^36}  ║
╠══════════════════════════════════════╣
║  Species: {self.species_name:<26}  ║
║  Era: {self.era:<30}  ║
║  Diet: {self.diet:<29}  ║
║  Mass: {self.avg_mass_kg:<29} kg  ║
╚══════════════════════════════════════╝
"""
    
    def sound(self) -> str:
        return "..."
    
    def move(self) -> str:
        return f"The {self.common_name} moves by {self.locomotion}."
    
    def eat(self) -> str:
        return f"The {self.common_name} is a {self.diet.lower()}."
    
    def compare_to_ancestor(self, ancestor: 'Species') -> str:
        return f"Compared to {ancestor.common_name}: mass difference = {abs(self.avg_mass_kg - ancestor.avg_mass_kg):.1f}kg"
    
    def get_sort_key(self) -> str:
        return self.species_name
    
    def __str__(self) -> str:
        return f"{self.common_name} ({self.species_name})"


# ============ DINOSAUR ============
class Dinosaur(Species):
    """Dinosaur branch of the museum."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.clade = "Dinosauria"
        self.tail_length_m = 0.0
        self.tooth_type = "varied"
        self.has_feathers = False
        self.era = "Mesozoic"
        self.temperature_regulation = "debated"
    
    def get_lineage(self) -> list:
        return ["Species", "Dinosaur"]
    
    def describe(self) -> str:
        feathers = "feathered" if self.has_feathers else "scaly"
        return f"{self.common_name} is a {feathers} dinosaur from the {self.era} era."
    
    def move(self) -> str:
        return f"The {self.common_name} walks on powerful legs with a {self.tail_length_m}m tail for balance."
    
    def sound(self) -> str:
        return f"The {self.common_name} bellows loudly."
    
    def get_skeletal_note(self) -> str:
        return f"Skeletal structure: {self.clade}, tail {self.tail_length_m}m, teeth: {self.tooth_type}"


# ============ THEROPOD ============
class Theropod(Dinosaur):
    """Theropod (bipedal carnivore) branch."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.stance = "bipedal"
        self.hand_claws = 3
        self.vision = "binocular"
        self.hunting_style = "ambush"
        self.intelligence_hint = "moderate"
        self.diet = "Carnivore"
        self.locomotion = "running"
    
    def get_lineage(self) -> list:
        return ["Species", "Dinosaur", "Theropod"]
    
    def eat(self) -> str:
        return f"The {self.common_name} hunts and eats meat using {self.hunting_style} tactics."
    
    def move(self) -> str:
        return f"The {self.common_name} runs on two powerful legs in a {self.stance} stance."
    
    def hunt(self) -> str:
        return f"The {self.common_name} hunts using {self.hunting_style} tactics with {self.vision} vision."
    
    def get_trait_evolution(self) -> str:
        return f"Evolved traits: {self.hand_claws} clawed hands, {self.vision} vision, {self.intelligence_hint} intelligence."


# ============ TREX ============
class TRex(Theropod):
    """Tyrannosaurus Rex - apex predator."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.species_name = "Tyrannosaurus rex"
        self.common_name = "T-Rex"
        self.era = "Late Cretaceous"
        self.bite_force_n = 57000
        self.arm_length_m = 1.0
        self.top_speed_kmh = 32.0
        self.avg_mass_kg = 8000.0
        self.tail_length_m = 4.5
        self.tooth_type = "serrated"
        self.hunting_style = "ambush/pursuit"
        self.notable_traits = ["apex predator", "tiny arms", "massive bite"]
    
    def get_lineage(self) -> list:
        return ["Species", "Dinosaur", "Theropod", "TRex"]
    
    def sound(self) -> str:
        return "ROOOAAARRR! The T-Rex unleashes a bone-shaking roar!"
    
    def display_card(self) -> str:
        return f"""
╔══════════════════════════════════════╗
║  🦖 {self.common_name.upper():^32} 🦖  ║
╠══════════════════════════════════════╣
║  Species: {self.species_name:<26}  ║
║  Era: {self.era:<30}  ║
║  Mass: {self.avg_mass_kg:,.0f} kg                       ║
║  Bite Force: {self.bite_force_n:,} N              ║
║  Top Speed: {self.top_speed_kmh} km/h                 ║
║  Arm Length: {self.arm_length_m} m (tiny!)            ║
╚══════════════════════════════════════╝
"""
    
    def intimidate(self) -> str:
        return f"The T-Rex opens its massive jaws ({self.bite_force_n:,}N bite force) and ROARS!"
    
    def get_museum_fact(self) -> str:
        return f"Despite its {self.arm_length_m}m arms, T-Rex was the apex predator of the Late Cretaceous."


# ============ VELOCIRAPTOR ============
class Velociraptor(Theropod):
    """Velociraptor - intelligent pack hunter."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.species_name = "Velociraptor mongoliensis"
        self.common_name = "Velociraptor"
        self.era = "Late Cretaceous"
        self.pack_size = 6
        self.claw_length_cm = 6.5
        self.feather_display = "brown and tan striped"
        self.avg_mass_kg = 15.0
        self.covering = "feathers"
        self.has_feathers = True
        self.intelligence_hint = "high"
        self.hunting_style = "pack"
        self.notable_traits = ["pack hunter", "sickle claw", "highly intelligent"]
    
    def get_lineage(self) -> list:
        return ["Species", "Dinosaur", "Theropod", "Velociraptor"]
    
    def sound(self) -> str:
        return "SKREEE! The Velociraptor screeches to coordinate with its pack!"
    
    def pack_hunt(self) -> str:
        return f"A pack of {self.pack_size} velociraptors coordinates their attack."
    
    def leap_attack(self) -> str:
        return f"The Velociraptor leaps, striking with its deadly {self.claw_length_cm}cm sickle claw!"


# ============ BIRD ============
class Bird(Species):
    """Bird branch of the museum."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.wing_span_m = 0.0
        self.beak_type = "general"
        self.flight_capable = True
        self.nesting_style = "tree"
        self.covering = "feathers"
        self.locomotion = "flying/walking"
        self.temperature_regulation = "endothermic"
    
    def get_lineage(self) -> list:
        return ["Species", "Bird"]
    
    def move(self) -> str:
        if self.flight_capable:
            return f"The {self.common_name} soars through the air with a {self.wing_span_m}m wingspan."
        return f"The {self.common_name} walks/swims (flightless)."
    
    def sound(self) -> str:
        return f"The {self.common_name} chirps and calls."
    
    def eat(self) -> str:
        return f"The {self.common_name} uses its {self.beak_type} beak to eat."
    
    def lay_eggs(self) -> str:
        return f"The {self.common_name} lays eggs in a {self.nesting_style} nest."
    
    def get_adaptation_summary(self) -> str:
        flight = "can fly" if self.flight_capable else "is flightless"
        return f"The {self.common_name} {flight} and has a {self.beak_type} beak."


# ============ CHICKEN ============
class Chicken(Bird):
    """Domesticated chicken - modern descendant."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.species_name = "Gallus gallus domesticus"
        self.common_name = "Chicken"
        self.breed = "Rhode Island Red"
        self.domesticated = True
        self.egg_per_week = 5
        self.flight_capable = False
        self.beak_type = "pointed"
        self.wing_span_m = 0.6
        self.avg_mass_kg = 3.5
        self.diet = "Omnivore"
        self.nesting_style = "ground"
        self.notable_traits = ["domesticated", "egg producer", "descendant of theropods"]
    
    def get_lineage(self) -> list:
        return ["Species", "Bird", "Chicken"]
    
    def sound(self) -> str:
        return "BAWK BAWK BAWK! The chicken clucks loudly."
    
    def display_card(self) -> str:
        return f"""
╔══════════════════════════════════════╗
║  🐔 {self.common_name.upper():^32} 🐔  ║
╠══════════════════════════════════════╣
║  Species: {self.species_name:<26}  ║
║  Breed: {self.breed:<28}  ║
║  Mass: {self.avg_mass_kg} kg                        ║
║  Eggs/Week: {self.egg_per_week}                          ║
║  Related to: T-Rex! (via theropods)  ║
╚══════════════════════════════════════╝
"""
    
    def forage(self) -> str:
        return f"The {self.breed} chicken scratches the ground, searching for food."
    
    def produce_egg_report(self) -> str:
        return f"This {self.breed} produces approximately {self.egg_per_week} eggs per week."


# ============ PENGUIN ============
class Penguin(Bird):
    """Emperor Penguin - aquatic specialist."""
    
    def __init__(self, specimen_id: str):
        super().__init__(specimen_id)
        self.species_name = "Aptenodytes forsteri"
        self.common_name = "Emperor Penguin"
        self.swim_speed_kmh = 22.0
        self.colony_size = 5000
        self.flight_capable = False
        self.beak_type = "pointed"
        self.wing_span_m = 0.76
        self.avg_mass_kg = 23.0
        self.diet = "Carnivore"
        self.locomotion = "swimming/walking"
        self.nesting_style = "ground"
        self.notable_traits = ["excellent swimmer", "cold adapted", "colonial nester"]
    
    def get_lineage(self) -> list:
        return ["Species", "Bird", "Penguin"]
    
    def move(self) -> str:
        return f"The {self.common_name} waddles on land but swims at {self.swim_speed_kmh} km/h!"
    
    def sound(self) -> str:
        return "HONK HONK! The Emperor Penguin brays to find its chick among thousands."
    
    def swim(self) -> str:
        return f"The {self.common_name} dives deep, swimming at {self.swim_speed_kmh} km/h to catch fish."
    
    def huddle(self) -> str:
        return f"The penguins form a huddle of {self.colony_size} to survive the Antarctic winter."


# ============ MAIN - MUSEUM TOUR ============
def run_museum_tour():
    """Run the museum tour demonstrating polymorphism."""
    print("=" * 60)
    print("   DARWIN'S MUSEUM: From Theropods to Birds")
    print("=" * 60)
    print()
    
    # Create specimens
    rex = TRex("TREX-001")
    raptor = Velociraptor("VELOC-001")
    hen = Chicken("CHIK-001")
    penguin = Penguin("PENG-001")
    
    # Put all exhibits in a single list - POLYMORPHISM!
    exhibits = [rex, raptor, hen, penguin]
    
    print("🦴 EXHIBIT TOUR")
    print("-" * 60)
    
    # Same method calls, different behaviors
    for exhibit in exhibits:
        print(f"\n📍 {exhibit}")
        print(f"   Lineage: {' → '.join(exhibit.get_lineage())}")
        print(f"   Sound: {exhibit.sound()}")
        print(f"   Movement: {exhibit.move()}")
    
    print("\n" + "=" * 60)
    print("   EVOLUTIONARY CONNECTION")
    print("=" * 60)
    
    print(f"\nT-Rex lineage:  {' → '.join(rex.get_lineage())}")
    print(f"Chicken lineage: {' → '.join(hen.get_lineage())}")
    print("\n💡 Notice: Both share Species as a common ancestor!")
    print("   This is why we can call sound() and move() on both.")
    
    print("\n" + "=" * 60)
    print("   MUSEUM DISPLAY CARDS")
    print("=" * 60)
    
    print(rex.display_card())
    print(hen.display_card())
    
    print("\n" + "=" * 60)
    print("   ENCAPSULATION DEMO")
    print("=" * 60)
    
    print(f"\nRex specimen ID: {rex.specimen_id}")
    print("Attempting to modify specimen_id...")
    try:
        rex.specimen_id = "NEW-ID"
    except AttributeError:
        print("✅ Cannot modify - @property makes it read-only!")
    
    print("\n" + "=" * 60)
    print("   Tour Complete! Thank you for visiting.")
    print("=" * 60)


if __name__ == "__main__":
    run_museum_tour()
