# ==========================================
# SCENARIO 2: THE UNIVERSITY SYSTEM
# Focus: Association & Composition
# "Objects containing other Objects"
# ==========================================

# ------------------------------------------
# STEP 1: The Student Class
# ------------------------------------------
class Student:
    def __init__(self, name, id_number):
        self.name = name
        self.id_number = id_number
        
    def introduce(self):
        return f"I am {self.name} (ID: {self.id_number})"

# ------------------------------------------
# STEP 2: The Teacher Class
# ------------------------------------------
class Teacher:
    def __init__(self, name, subject):
        self.name = name
        self.subject = subject
        
    def introduce(self):
        return f"I am Prof. {self.name}, I teach {self.subject}"

# ------------------------------------------
# STEP 3: The Course Class ( The Container )
# ------------------------------------------
class Course:
    def __init__(self, course_name, teacher):
        self.course_name = course_name
        self.teacher = teacher  # Association: The course HAS A teacher
        self.students = []      # Composition: The course HAS MANY students
        
    def enroll_student(self, student):
        # TODO: Add the student object to the self.students list
        pass
        
    def roll_call(self):
        print(f"--- ROLL CALL: {self.course_name} ---")
        print(f"Teacher: {self.teacher.introduce()}")
        print("Students:")
        # TODO: Loop through self.students and print their introduction
        pass

# ------------------------------------------
# STEP 4: Bringing it Together
# ------------------------------------------
# 1. Create a Teacher
# 2. Create a Course (pass the teacher in!)
# 3. Create 3 Students
# 4. Enroll the students in the course
# 5. Run the roll_call() method
