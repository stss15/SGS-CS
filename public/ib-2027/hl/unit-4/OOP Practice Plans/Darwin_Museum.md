# HL OOP Scenario Pack — Darwin’s Museum (AI Agent Build Spec)
Version: 1.0  
Target language: Python (HL)  
Primary OOP focus: Inheritance + overriding + polymorphism (plus light encapsulation conventions)  
Secondary skills: file I/O, collections (list/dict), defensive programming, basic validation, readable output

---

## 0) Build goal (what you are producing)
Create a **downloadable project folder** (`darwin_museum/`) containing:

1) A **fully working museum “engine”** (provided by teacher) that:
- loads a list of exhibit class names from a data file
- instantiates exhibit objects
- runs a guided “tour” (terminal)
- calls exhibit methods polymorphically
- prints meaningful errors if student code doesn’t meet the contract

2) **Student code files** (stubs + TODOs) that students implement:
- a base class + multiple subclasses in an inheritance chain
- overridden behaviours in subclasses
- attributes that demonstrate “traits accumulate/change” over time

3) A **worksheet** (markdown) that includes:
- scenario description + success criteria
- minimum requirements vs stretch goals
- contract table (classes, attributes, methods, signatures)
- UML diagram (PlantUML) with extensive attributes/methods
- step-by-step student tasks
- a self-check rubric + debugging guidance

4) Optional: **contract_tests.py** for automated checks (signature + smoke tests)

This spec is ONLY for content + Python project structure (no HTML/CSS/JS).

---

## 1) Learning design (teacher intent)
Students should see that:
- **Inheritance**: subclasses reuse base attributes/methods; add new traits
- **Overriding**: same method name returns different output per subclass
- **Polymorphism**: museum treats all exhibits as `Species` and calls shared methods without caring about concrete type
- **(Optional) Encapsulation concept**: underscore conventions + @property use for read-only “traits” (Python-friendly)

Important: Do NOT require students to write identical method bodies.  
**Only enforce interface contract** (names, params, return types, side effects).

---

## 2) Scenario narrative (student-facing)
Darwin returns from an expedition with fossils and living specimens.  
The museum is opening a new exhibit called **“From Theropods to Birds”**.  
A tour guide (NPC) introduces visitors to each exhibit. Students implement the specimen classes so the exhibit tour can run.

---

## 3) Scaffolding level (Darwin is the most scaffolded of the 3)
For Darwin:
- Provide the full museum engine, CLI, output formatting, and data files.
- Provide student class files as **stubs** with:
  - class names
  - docstrings
  - method signatures
  - TODO sections
- Provide a **contract checker** that gives friendly errors:
  - missing class
  - missing method
  - wrong method parameters
  - wrong return type (where checkable)

Students mainly write:
- attributes and constructor logic
- overridden methods returning descriptive strings
- a small amount of “trait logic” so outputs differ meaningfully

---

## 4) Required project folder layout
Create exactly this structure:

darwin_museum/
  README.md
  CONTRACT.md
  WORKSHEET_DARWIN.md
  run_museum.py
  museum_engine.py
  npc_guide.py
  errors.py
  formatting.py
  contract_tools.py
  contract_tests.py                # optional but recommended
  data/
    exhibits.txt
    exhibit_facts.json             # optional stretch
  student_code/
    __init__.py
    species.py
    dinosaur.py
    theropod.py
    trex.py
    bird.py
    chicken.py

Notes:
- `run_museum.py` is the only file students run.
- `student_code/` is the only place students edit.
- Museum engine imports student classes by name from `student_code`.

---

## 5) The “interface contract” principle (hard requirement)
The engine will assume:
- exact class names
- exact method names + signatures
- methods return strings (unless stated otherwise)
- `__str__` returns a one-line summary

Students can implement internal logic however they like as long as they satisfy contract.

Contract is enforced by:
- `contract_tools.py` (runtime checks + human-friendly errors)
- optional `contract_tests.py` (automated)

---

## 6) Minimum requirements vs stretch goals

### Minimum requirements (students must do)
Students implement the class hierarchy (below) so the museum tour runs:
- `Species` (base)
- `Dinosaur(Species)`
- `Theropod(Dinosaur)`
- `TRex(Theropod)`
- `Bird(Species)`  (teaching model)
- `Chicken(Bird)`

They must implement:
- attributes that clearly accumulate/change along the chain
- overridden methods that clearly differ
- at least 1 new method introduced in a deeper subclass

### Stretch goals (pick 1–3)
- Branching: add another bird subclass (e.g., `Eagle`, `Penguin`) and update `exhibits.txt`
- Data-driven traits: load extra facts from `exhibit_facts.json`
- Add a `Visitor` class to track favourite exhibits (engine can optionally support this)
- Add “museum quiz mode” (MCQ facts) inside engine (teacher-provided)
- Add sorting of exhibits by name/era (engine uses student `get_sort_key()`)

---

## 7) Contract table (authoritative)
This table is duplicated in CONTRACT.md and WORKSHEET_DARWIN.md.

### 7.1 Base class: Species (student implements)
Class name: `Species`

Required attributes (instance):
- `species_name: str`            (e.g., "Tyrannosaurus rex")
- `common_name: str`             (e.g., "T-Rex")
- `era: str`                     (e.g., "Late Cretaceous")
- `diet: str`                    (e.g., "Carnivore")
- `avg_mass_kg: float`           (e.g., 7000.0)
- `covering: str`                (e.g., "scales", "feathers")
- `locomotion: str`              (e.g., "bipedal", "flight", "walking")
- `temperature_regulation: str`  (e.g., "unknown", "endothermic")
- `notable_traits: list[str]`    (strings; can grow in subclasses)
- `_specimen_id: str`            (generated in __init__; underscore = internal)

Required methods:
- `__init__(self, specimen_id: str)`  
  Sets `_specimen_id` and defaults for all other attributes (sensible base defaults).

- `get_lineage(self) -> list[str]`  
  Returns list of class names from base to concrete (e.g., ["Species","Dinosaur","Theropod","TRex"]).

- `describe(self) -> str`  
  One paragraph description: name, era, diet, covering.

- `display_card(self) -> str`  
  Multi-line “museum placard” including traits, mass, locomotion.

- `sound(self) -> str`  
  Base sound (overridden in subclasses).

- `move(self) -> str`  
  Base movement description (often overridden).

- `eat(self) -> str`  
  Base feeding description (may be overridden).

- `compare_to_ancestor(self, ancestor: "Species") -> str`  
  Compares key attributes vs a provided ancestor object and returns a short summary.

- `get_sort_key(self) -> str`  
  Returns a key used for sorting exhibits (default: `common_name.lower()`).

- `specimen_id(self) -> str`  (property, read-only)  
  Returns `_specimen_id` (encapsulation demonstration via @property).

- `__str__(self) -> str`  
  One line summary: "Chicken (Bird) — feathers, omnivore, walking"

Notes:
- This is not “private/protected enforcement”. It’s convention + a read-only property.

---

### 7.2 Dinosaur(Species)
Class name: `Dinosaur`

Additional / changed attributes:
- `clade: str`                 (e.g., "Dinosauria")
- `tail_length_m: float`
- `tooth_type: str`            (e.g., "serrated", "beak")
- `has_feathers: bool`         (can be True in some dinos for teaching model)

Overrides:
- `describe()`
- `move()`
- `sound()`

New methods:
- `get_skeletal_note(self) -> str`  
  Returns a short “fossil note” used by museum.

---

### 7.3 Theropod(Dinosaur)
Class name: `Theropod`

Additional / changed attributes:
- `stance: str`                ("bipedal")
- `hand_claws: int`
- `vision: str`                ("forward-facing")
- `hunting_style: str`         ("ambush", "pursuit")
- `intelligence_hint: str`     ("low/medium/high" — teaching-friendly)

Overrides:
- `eat()`
- `move()`

New methods:
- `hunt(self) -> str`
- `get_trait_evolution(self) -> str`  
  Returns 2–3 lines describing which traits improved from Dinosaur -> Theropod.

---

### 7.4 TRex(Theropod)
Class name: `TRex`

Additional / changed attributes:
- `bite_force_n: int`
- `arm_length_m: float`
- `top_speed_kmh: float`
- `notable_traits` must include at least:
  - "massive bite force"
  - "binocular vision"
  - "powerful legs"

Overrides:
- `sound()` (iconic roar)
- `display_card()` (adds bite force)

New methods:
- `intimidate(self) -> str`
- `get_museum_fact(self) -> str`  
  Used by the quiz extension.

---

### 7.5 Bird(Species)
Class name: `Bird`

Additional / changed attributes:
- `wing_span_m: float`
- `beak_type: str`
- `flight_capable: bool`
- `nesting_style: str`

Overrides:
- `move()` (can be flight or walking depending on attribute)
- `sound()`
- `eat()`

New methods:
- `lay_eggs(self) -> str`
- `get_adaptation_summary(self) -> str`  
  Explains 2–3 “adaptations” (feathers, hollow bones etc — teaching model).

---

### 7.6 Chicken(Bird)
Class name: `Chicken`

Additional / changed attributes:
- `breed: str`
- `domesticated: bool`
- `egg_per_week: int`

Overrides:
- `sound()` ("cluck")
- `display_card()` (adds domestication info)

New methods:
- `forage(self) -> str`
- `produce_egg_report(self) -> str`  (short text report)

---

## 8) UML diagram (extensive; PlantUML source)
This UML must appear in the worksheet and CONTRACT.md.

```plantuml
@startuml
skinparam classAttributeIconSize 0

abstract class Species {
  -_specimen_id: str
  +species_name: str
  +common_name: str
  +era: str
  +diet: str
  +avg_mass_kg: float
  +covering: str
  +locomotion: str
  +temperature_regulation: str
  +notable_traits: list<str>

  +__init__(specimen_id: str)
  +specimen_id: str <<property>>
  +get_lineage(): list<str>
  +describe(): str
  +display_card(): str
  +sound(): str
  +move(): str
  +eat(): str
  +compare_to_ancestor(ancestor: Species): str
  +get_sort_key(): str
  +__str__(): str
}

class Dinosaur {
  +clade: str
  +tail_length_m: float
  +tooth_type: str
  +has_feathers: bool

  +describe(): str
  +move(): str
  +sound(): str
  +get_skeletal_note(): str
}

class Theropod {
  +stance: str
  +hand_claws: int
  +vision: str
  +hunting_style: str
  +intelligence_hint: str

  +eat(): str
  +move(): str
  +hunt(): str
  +get_trait_evolution(): str
}

class TRex {
  +bite_force_n: int
  +arm_length_m: float
  +top_speed_kmh: float

  +sound(): str
  +display_card(): str
  +intimidate(): str
  +get_museum_fact(): str
}

class Bird {
  +wing_span_m: float
  +beak_type: str
  +flight_capable: bool
  +nesting_style: str

  +move(): str
  +sound(): str
  +eat(): str
  +lay_eggs(): str
  +get_adaptation_summary(): str
}

class Chicken {
  +breed: str
  +domesticated: bool
  +egg_per_week: int

  +sound(): str
  +display_card(): str
  +forage(): str
  +produce_egg_report(): str
}

Species <|-- Dinosaur
Dinosaur <|-- Theropod
Theropod <|-- TRex
Species <|-- Bird
Bird <|-- Chicken
@enduml