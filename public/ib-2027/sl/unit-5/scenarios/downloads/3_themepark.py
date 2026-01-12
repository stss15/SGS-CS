# ==========================================
# SCENARIO 3: THEME PARK MANAGER
# Focus: Encapsulation & Static Variables
# ==========================================

# ------------------------------------------
# STEP 1: The Visitor Class (With Static Variable)
# ------------------------------------------
# TODO: Create class 'Visitor'
# 1. Define a STATIC variable 'total_visitors = 0' at the top of the class
# 2. In __init__(self, height_cm, money):
#    - Set instance variables
#    - Increment the STATIC counter (Visitor.total_visitors += 1)


# ------------------------------------------
# STEP 2: The Ride Class (Encapsulation)
# ------------------------------------------
# TODO: Create class 'Ride'
# 1. __init__(self, name, min_height, cost):
#    - Set protected attributes (use _underscore prefix for min_height, cost, earnings)

# 2. attempt_ride(self, visitor):
#    - Print "Visitor trying to ride..."
#    - Check 1: If visitor.height_cm < self._min_height -> Print "Too short" & return
#    - Check 2: If visitor.money < self._cost -> Print "Too poor" & return
#    - Success: Deduct money, Add to _earnings, Print "Success!"

# 3. get_earnings(self):
#    - Return self._earnings (Accessor method)


# ------------------------------------------
# STEP 3: The Simulation
# ------------------------------------------
# TODO:
# 1. Print Visitor.total_visitors (Should be 0)
# 2. Create a Ride ("Dragon Loop", 140cm, $5.00)
# 3. Create a Visitor (120cm, $20) -> Try ride (Should fail height)
# 4. Create a Visitor (175cm, $50) -> Try ride (Should succeed)
# 5. Print final Ride Earnings and final Visitor.total_visitors
