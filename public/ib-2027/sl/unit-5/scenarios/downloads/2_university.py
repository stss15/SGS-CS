# ==========================================
# SCENARIO 2: THE UNIVERSITY SYSTEM
# Focus: Object Relationships
# 1. Aggregation (Empty Diamond): Weak link (Student exists without Uni)
# 2. Composition (Filled Diamond): Strong link (Department dies with Uni)
# ==========================================

# ------------------------------------------
# STEP 1: The Components
# ------------------------------------------
class Student:
    def __init__(self, name):
        self.name = name

class Department:
    def __init__(self, name):
        self.name = name
    
    def announce(self):
        return f"The {self.name} Department is open."

# ------------------------------------------
# STEP 2: The Container (University)
# ------------------------------------------
class University:
    def __init__(self, name):
        self.name = name
        self.students = []      # Aggregation list
        self.departments = []   # Composition list
        
        # COMPOSITION: The University creates its own Departments
        # If the University is deleted, these objects go with it.
        self.departments.append(Department("Computer Science"))
        self.departments.append(Department("Engineering"))

    def enroll_student(self, student):
        # AGGREGATION: The student is created OUTSIDE and passed in.
        # If the University is deleted, the student still exists elsewhere.
        self.students.append(student)
        
    def show_details(self):
        print(f"Welcome to {self.name}")
        print("--- DEPARTMENTS (Composition) ---")
        for dept in self.departments:
            print(dept.announce())
            
        print("\n--- STUDENTS (Aggregation) ---")
        # TODO: Loop through self.students and print their names
        pass

# ------------------------------------------
# STEP 3: The Simulation
# ------------------------------------------
# 1. Create a University
# 2. Create a Student (independently)
# 3. Enroll the student
# 4. Run show_details()
# 5. Question: If you delete the university object, what happens to the student variable?
