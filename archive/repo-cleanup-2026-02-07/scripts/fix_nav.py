#!/usr/bin/env python3
"""
Update outdated simple nav to dropdown nav structure.
This fixes files that have main-nav but not nav-dropdown.
"""

import re
from pathlib import Path

# The correct dropdown nav HTML
DROPDOWN_NAV = '''            <nav class="main-nav" aria-label="Main navigation">
                <div class="nav-dropdown">
                    <button class="nav-link" aria-expanded="false">KS3 <i class="fa-solid fa-chevron-down"></i></button>
                    <div class="nav-dropdown-menu">
                        <a href="/coming-soon.html" class="nav-dropdown-item"><i class="fa-solid fa-flask"></i> Science</a>
                        <a href="/ks3/index.html" class="nav-dropdown-item"><i class="fa-solid fa-laptop-code"></i> Computer Science</a>
                    </div>
                </div>
                <div class="nav-dropdown">
                    <button class="nav-link" aria-expanded="false">IGCSE <i class="fa-solid fa-chevron-down"></i></button>
                    <div class="nav-dropdown-menu">
                        <a href="/coming-soon.html" class="nav-dropdown-item"><i class="fa-solid fa-flask"></i> Science</a>
                        <a href="/igcse/index.html" class="nav-dropdown-item"><i class="fa-solid fa-laptop-code"></i> Computer Science</a>
                    </div>
                </div>
                <div class="nav-dropdown">
                    <button class="nav-link" aria-expanded="false">IB <i class="fa-solid fa-chevron-down"></i></button>
                    <div class="nav-dropdown-menu">
                        <a href="/coming-soon.html" class="nav-dropdown-item"><i class="fa-solid fa-flask"></i> Science</a>
                        <a href="/ib-2027/index.html" class="nav-dropdown-item"><i class="fa-solid fa-laptop-code"></i> Computer Science</a>
                    </div>
                </div>
            </nav>'''

# Pattern to match the old simple nav
OLD_NAV_PATTERN = re.compile(
    r'<nav class="main-nav"[^>]*>.*?</nav>',
    re.DOTALL
)

def fix_nav(file_path):
    """Replace simple nav with dropdown nav."""
    try:
        content = Path(file_path).read_text()
        
        # Check if already has dropdown
        if 'nav-dropdown' in content:
            print(f"SKIP: {file_path} (already has dropdown)")
            return False
        
        # Check if has main-nav
        if 'main-nav' not in content:
            print(f"SKIP: {file_path} (no main-nav)")
            return False
        
        # Replace the nav
        new_content = OLD_NAV_PATTERN.sub(DROPDOWN_NAV, content)
        
        if new_content != content:
            Path(file_path).write_text(new_content)
            print(f"FIXED: {file_path}")
            return True
        else:
            print(f"NO CHANGE: {file_path}")
            return False
            
    except Exception as e:
        print(f"ERROR: {file_path}: {e}")
        return False

def main():
    files_to_fix = [
        "/Users/StevenStewart/SGS-CSC REMIX/public/404.html",
        "/Users/StevenStewart/SGS-CSC REMIX/public/ib-2027/hl/unit-4/scenarios/scenario-darwin-museum.html",
        "/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/student_resources.html",
        "/Users/StevenStewart/SGS-CSC REMIX/public/ib/B4/B4.1.2_linked_lists.html",
    ]
    
    fixed = 0
    for f in files_to_fix:
        if fix_nav(f):
            fixed += 1
    
    print(f"\n=== Fixed {fixed} files ===")

if __name__ == "__main__":
    main()
