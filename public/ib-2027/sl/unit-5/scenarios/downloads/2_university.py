# ==========================================
# SCENARIO 2: THE UNIVERSITY SYSTEM
# Focus: Object Relationships
# 1. Aggregation (Weak): Student exists without Uni
# 2. Composition (Strong): Department dies with Uni
# ==========================================

# ------------------------------------------
# STEP 1: The Components
# ------------------------------------------
# TODO: Create a 'Student' class with a 'name' attribute


# TODO: Create a 'Department' class with a 'name' attribute
# - Add a method 'announce()' that returns "The [Name] Department is open."


# ------------------------------------------
# STEP 2: The Container (University)
# ------------------------------------------
# TODO: Create a 'University' class
# 1. __init__(self, name):
#    - self.name = name
#    - self.students = []      (List for Aggregation)
#    - self.departments = []   (List for Composition)
#
#    - COMPOSITION TASK: Create 2 Department objects *inside* the __init__ 
#      and append them to self.departments. (e.g., "Computer Science", "Engineering")

# 2. enroll_student(self, student):
#    - AGGREGATION TASK: Append the passed 'student' object to self.students

# 3. show_details(self):
#    - Print the university name
#    - Loop through self.departments and call .announce()
#    - Loop through self.students and print their names


# ------------------------------------------
# STEP 3: The Simulation
# ------------------------------------------
# TODO:
# 1. Create a University ("Tech Uni")
# 2. Create a Student ("Alice") *outside* the university
# 3. Enroll the student
# 4. Call uni.show_details()
