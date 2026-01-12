# ==========================================
# SCENARIO 1: THE ANIMAL KINGDOM
# Focus: Inheritance & Polymorphism
# ==========================================

# ------------------------------------------
# STEP 1: The Parent Class (Superclass)
# ------------------------------------------
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        # This is a generic method intended to be overridden
        # We can return a generic sound or "..."
        return "..."

# ------------------------------------------
# STEP 2: The Child Classes (Subclasses)
# ------------------------------------------
# TODO: Create a class 'Dog' that inherits from Animal
# - Override the speak() method to return "Woof!"

# TODO: Create a class 'Cat' that inherits from Animal
# - Override the speak() method to return "Meow!"


# ------------------------------------------
# STEP 3: Testing Polymorphism
# ------------------------------------------
# This code will run once you implement the classes above

# dog = Dog("Buddy")
# cat = Cat("Whiskers")

# print(f"{dog.name} says: {dog.speak()}")
# print(f"{cat.name} says: {cat.speak()}")

# ------------------------------------------
# CHALLENGE: 
# Create a list of animals called 'zoo'
# Add a Dog and a Cat to it
# Loop through the list and make each one speak
