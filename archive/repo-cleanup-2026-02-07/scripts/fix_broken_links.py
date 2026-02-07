#!/usr/bin/env python3
"""
Fix all broken links found by the link audit.
"""

import os
import re
from pathlib import Path

PUBLIC_DIR = Path("/Users/StevenStewart/SGS-CSC REMIX/public")

def fix_ks3_index():
    """Fix KS3 index page - point missing units to coming-soon."""
    ks3_index = PUBLIC_DIR / "ks3" / "index.html"
    content = ks3_index.read_text()
    
    # Replace missing year7 unit
    content = content.replace('href="year7/unit6.html"', 'href="../coming-soon.html"')
    
    # Replace all year8 units
    for i in range(1, 7):
        content = content.replace(f'href="year8/unit{i}.html"', 'href="../coming-soon.html"')
    
    # Replace all year9 units
    for i in range(1, 7):
        content = content.replace(f'href="year9/unit{i}.html"', 'href="../coming-soon.html"')
    
    ks3_index.write_text(content)
    print(f"Fixed: {ks3_index}")

def fix_igcse_eou_tests():
    """Fix IGCSE End of Unit Test CSS references."""
    for topic_num in [2, 3, 4, 5, 6, 7, 8, 9, 10]:
        topic_dir = PUBLIC_DIR / "igcse" / f"topic{topic_num}"
        test_file = topic_dir / f"Topic{topic_num}_End_of_unit_Test.html"
        
        if test_file.exists():
            content = test_file.read_text()
            # Replace the old CSS reference with the base assessment CSS
            old_css = f'href="../../css/end-of-unit-test-igcse-topic{topic_num}.css"'
            new_css = 'href="../../css/assessment-base.css"'
            content = content.replace(old_css, new_css)
            test_file.write_text(content)
            print(f"Fixed: {test_file}")

def fix_ib_legacy_index_pages():
    """Fix IB legacy index pages - remove broken links to non-existent files."""
    ib_sections = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4']
    
    for section in ib_sections:
        index_file = PUBLIC_DIR / "ib" / section / "index.html"
        if index_file.exists():
            content = index_file.read_text()
            
            # Replace broken links with coming-soon
            broken_links = ['flashcards.html', 'teacher_toolkit.html', 'assessments.html']
            
            for link in broken_links:
                # Check if file exists
                if not (index_file.parent / link).exists():
                    content = content.replace(f'href="{link}"', 'href="../../coming-soon.html"')
            
            # For specification.html - only replace if it doesn't exist
            if not (index_file.parent / 'specification.html').exists():
                content = content.replace('href="specification.html"', 'href="../../coming-soon.html"')
            
            index_file.write_text(content)
            print(f"Fixed: {index_file}")

def fix_ib2027_unit_pages():
    """Fix IB-2027 unit index pages - remove broken flashcard and teacher links."""
    # Process all unit index.html files in ib-2027
    for unit_index in PUBLIC_DIR.glob("ib-2027/*/*/index.html"):
        content = unit_index.read_text()
        
        # Check if flashcards.html exists
        if not (unit_index.parent / 'flashcards.html').exists():
            content = content.replace('href="flashcards.html"', 'href="../../../coming-soon.html"')
        
        # Check if teacher/index.html exists
        if not (unit_index.parent / 'teacher' / 'index.html').exists():
            content = content.replace('href="teacher/index.html"', 'href="../../../coming-soon.html"')
        
        unit_index.write_text(content)
        print(f"Fixed: {unit_index}")

def fix_ks3_year7_unit2():
    """Fix KS3 year7 unit2.html - remove broken toolkit/assessment links."""
    unit2_file = PUBLIC_DIR / "ks3" / "year7" / "unit2.html"
    if unit2_file.exists():
        content = unit2_file.read_text()
        
        if not (unit2_file.parent / 'teacher_toolkit.html').exists():
            content = content.replace('href="teacher_toolkit.html"', 'href="../../coming-soon.html"')
        
        if not (unit2_file.parent / 'assessments.html').exists():
            content = content.replace('href="assessments.html"', 'href="../../coming-soon.html"')
        
        unit2_file.write_text(content)
        print(f"Fixed: {unit2_file}")

def fix_ks3_cover_year8():
    """Fix KS3 cover/year8.html placeholder links."""
    year8_file = PUBLIC_DIR / "ks3" / "cover" / "year8.html"
    if year8_file.exists():
        content = year8_file.read_text()
        
        # Replace broken placeholder links
        content = content.replace('href="manual.html"', 'href="../../coming-soon.html"')
        content = content.replace('href="page.html"', 'href="../../coming-soon.html"')
        content = content.replace('src="file.png"', 'src="../../images/Logo.png"')
        
        year8_file.write_text(content)
        print(f"Fixed: {year8_file}")

if __name__ == "__main__":
    print("Fixing broken links...")
    
    fix_ks3_index()
    fix_igcse_eou_tests()
    fix_ib_legacy_index_pages()
    fix_ib2027_unit_pages()
    fix_ks3_year7_unit2()
    fix_ks3_cover_year8()
    
    print("\nDone! Run link_audit.py again to verify.")
