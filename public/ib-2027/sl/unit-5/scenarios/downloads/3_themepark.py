# ==========================================
# SCENARIO 3: THEME PARK MANAGER
# Focus: Encapsulation & Static Variables
# ==========================================

# ------------------------------------------
# STEP 1: The Visitor Class (With Static Variable)
# ------------------------------------------
class Visitor:
    # STATIC VARIABLE (Class Level) - Shared by all visitors
    total_visitors = 0 
    
    def __init__(self, height_cm, money):
        # INSTANCE VARIABLES (Object Level) - Unique to this visitor
        self.height_cm = height_cm
        self.money = money
        
        # Increment the static counter
        Visitor.total_visitors += 1

# ------------------------------------------
# STEP 2: The Ride Class (Encapsulation)
# ------------------------------------------
class Ride:
    def __init__(self, name, min_height, cost):
        self.name = name
        self._min_height = min_height  # Protected/Private convention
        self._cost = cost
        self._earnings = 0
        
    def attempt_ride(self, visitor):
        print(f"\nVisitor trying to ride {self.name}...")
        
        # TODO: Check 1 - Is the visitor tall enough?
        
        # TODO: Check 2 - Can they afford it?
        
        # SUCCESS LOGIC
        # 1. Deduct cost, add to earnings
        pass

    def get_earnings(self):
        return self._earnings

# ------------------------------------------
# STEP 3: The Simulation
# ------------------------------------------
# print(f"Park Visitors at start: {Visitor.total_visitors}")

# v1 = Visitor(120, 50)
# v2 = Visitor(160, 20)

# print(f"Park Visitors now: {Visitor.total_visitors}")
# Note how we access the variable via the CLASS name, not the object!
