#!/usr/bin/env python3
"""
Migrate slide decks from public/ib/ to src/pages/ib-2027/
Updates paths for new location depth.
"""
import os
import re

BASE = "/Users/StevenStewart/SGS-CSC REMIX"
PUBLIC_IB = f"{BASE}/public/ib"
SL_BASE = f"{BASE}/src/pages/ib-2027/sl"
HL_BASE = f"{BASE}/src/pages/ib-2027/hl"

# Mappings: (source_topic, source_file, target_level, target_unit)
MAPPINGS = [
    # SL Units
    ("B2", "B2.2_data_structures.html", "sl", 3),
    ("B2", "B2.2_recursion.html", "sl", 3),
    ("B2", "B2.3_programming_constructs.html", "sl", 4),
    ("B2", "B2.4_programming_algorithms.html", "sl", 4),
    ("B2", "B2.5_file_processing.html", "sl", 4),
    ("B3", "B3.1_oop_fundamentals.html", "sl", 5),
    ("A3", "A3.1_database_fundamentals.html", "sl", 6),
    ("A3", "A3.2_database_design.html", "sl", 6),
    ("A3", "A3.3_database_programming.html", "sl", 6),
    ("A4", "A4.1_machine_learning_fundamentals.html", "sl", 7),
    ("A4", "A4.4_ethical_considerations.html", "sl", 7),
    ("A1", "A1.1_computer_hardware.html", "sl", 9),
    ("A1", "A1.2_data_representation.html", "sl", 10),
    ("A1", "A1.3_operating_systems.html", "sl", 10),
    ("A2", "A2.1_network_fundamentals.html", "sl", 11),
    ("A2", "A2.2_network_architecture.html", "sl", 11),
    ("A2", "A2.3_data_transmission.html", "sl", 11),
    ("A2", "A2.4_network_security.html", "sl", 11),
    # HL Units
    ("A1", "A1.1_computer_hardware.html", "hl", 1),
    ("A1", "A1.4_translation.html", "hl", 1),
    ("A1", "A1.3_operating_systems.html", "hl", 2),
    ("B2", "B2.4_programming_algorithms.html", "hl", 3),
    ("B3", "B3.2_inheritance_polymorphism.html", "hl", 4),
    ("A3", "A3.3_database_programming.html", "hl", 5),
    ("A3", "A3.4_alternative_databases_and_data_warehouses.html", "hl", 5),
    ("B4", "B4.1_fundamentals_of_ADTs.html", "hl", 6),
    ("A4", "A4.2_data_preprocessing.html", "hl", 7),
    ("A4", "A4.3_machine_learning_approaches.html", "hl", 7),
    ("A2", "A2.1_network_fundamentals.html", "hl", 11),
    ("A2", "A2.2_network_architecture.html", "hl", 11),
    ("A2", "A2.3_data_transmission.html", "hl", 11),
    ("A2", "A2.4_network_security.html", "hl", 11),
]

def migrate_slide(topic, filename, level, unit):
    """Read slide from public/ib, update paths, write to new location."""
    src_path = f"{PUBLIC_IB}/{topic}/{filename}"
    
    if not os.path.exists(src_path):
        print(f"MISSING: {src_path}")
        return False
    
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update paths - old files use ../../ (2 levels to public/)
    # New files need ../../../../ (4 levels to public/)
    
    # CSS/JS paths
    content = re.sub(r'href="\.\.\/\.\.\/css/', 'href="../../../../css/', content)
    content = re.sub(r'src="\.\.\/\.\.\/js/', 'src="../../../../js/', content)
    content = re.sub(r'src="\.\.\/\.\.\/images/', 'src="../../../../images/', content)
    
    # Back button - update to ../index.html
    content = re.sub(r'href="\.\.\/\.\.\/ib\/[^"]+/index\.html"', 'href="../index.html"', content)
    
    # Determine target directory
    if level == "sl":
        target_dir = f"{SL_BASE}/unit-{unit}/slides"
    else:
        target_dir = f"{HL_BASE}/unit-{unit}/slides"
    
    os.makedirs(target_dir, exist_ok=True)
    
    # Handle long filename
    dst_filename = filename
    if "alternative_databases_and_data_warehouses" in filename:
        dst_filename = "A3.4_alternative_databases.html"
    
    dst_path = f"{target_dir}/{dst_filename}"
    
    with open(dst_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"{level.upper()} Unit {unit}: {filename}")
    return True

def main():
    count = 0
    for topic, filename, level, unit in MAPPINGS:
        if migrate_slide(topic, filename, level, unit):
            count += 1
    
    print(f"\nMigrated {count} slide decks!")

if __name__ == "__main__":
    main()
