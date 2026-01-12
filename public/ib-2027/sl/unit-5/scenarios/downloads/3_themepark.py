# ==========================================
# SCENARIO 3: THEME PARK MANAGER
# Focus: Encapsulation & Logic
# "Private Data & Public Methods"
# ==========================================

# ------------------------------------------
# STEP 1: The Visitor Class
# ------------------------------------------
class Visitor:
    def __init__(self, height_cm, money):
        self.height_cm = height_cm
        self.money = money

# ------------------------------------------
# STEP 2: The Ride Class
# ------------------------------------------
class Ride:
    def __init__(self, name, min_height, cost):
        self.name = name
        self._min_height = min_height  # Private-ish (by convention)
        self._cost = cost
        self._earnings = 0
        
    def attempt_ride(self, visitor):
        print(f"\nVisitor trying to ride {self.name}...")
        
        # TODO: Check 1 - Is the visitor tall enough?
        # If visitor.height_cm < self._min_height: print "Too short!" and return
        
        # TODO: Check 2 - Can they afford it?
        # If visitor.money < self._cost: print "Too expensive!" and return
        
        # SUCCESS LOGIC
        # 1. Deduct money from visitor
        # 2. Add money to self._earnings
        # 3. Print "Enjoy the ride!"
        pass

    def get_earnings(self):
        # Getter method to safely see earnings
        return self._earnings

# ------------------------------------------
# STEP 3: The Simulation
# ------------------------------------------

# roller_coaster = Ride("Dragon Loop", min_height=140, cost=5.00)
# little_kid = Visitor(height_cm=110, money=20.00)
# teenager = Visitor(height_cm=160, money=20.00)

# roller_coaster.attempt_ride(little_kid)  # Should fail (height)
# roller_coaster.attempt_ride(teenager)    # Should succeed
