#!/usr/bin/env python3
"""
Convert all relative asset paths to absolute paths in static HTML files.
This fixes the trailing slash issue with Firebase hosting.
"""

import os
import re
from pathlib import Path

PUBLIC_DIR = Path("/Users/StevenStewart/SGS-CSC REMIX/public")

# Patterns for relative paths that need fixing
PATTERNS = [
    # CSS references (href for stylesheets)
    (re.compile(r'href="(\.\./)+css/'), 'href="/css/'),
    (re.compile(r'href="(\.\./)+images/'), 'href="/images/'),
    
    # JS references (src for scripts)  
    (re.compile(r'src="(\.\./)+js/'), 'src="/js/'),
    (re.compile(r'src="(\.\./)+images/'), 'src="/images/'),
    
    # Navigation links that should be absolute
    (re.compile(r'href="(\.\./)+index\.html"'), 'href="/index.html"'),
    (re.compile(r'href="(\.\./)+coming-soon\.html"'), 'href="/coming-soon.html"'),
    (re.compile(r'href="(\.\./)+admin\.html"'), 'href="/admin.html"'),
    (re.compile(r'href="(\.\./)+ks3/index\.html"'), 'href="/ks3/index.html"'),
    (re.compile(r'href="(\.\./)+igcse/index\.html"'), 'href="/igcse/index.html"'),
    (re.compile(r'href="(\.\./)+ib-2027/index\.html"'), 'href="/ib-2027/index.html"'),
    (re.compile(r'href="(\.\./)+ib/index\.html"'), 'href="/ib/index.html"'),
]

# Count changes
stats = {
    'files_checked': 0,
    'files_modified': 0,
    'replacements': 0
}

def fix_file(file_path):
    """Fix relative paths in a single HTML file."""
    global stats
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        original = content
        
        for pattern, replacement in PATTERNS:
            new_content, count = pattern.subn(replacement, content)
            if count > 0:
                stats['replacements'] += count
            content = new_content
        
        if content != original:
            file_path.write_text(content)
            stats['files_modified'] += 1
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Process all HTML files."""
    # Find all HTML files
    html_files = list(PUBLIC_DIR.rglob("*.html"))
    stats['files_checked'] = len(html_files)
    
    print(f"Scanning {len(html_files)} HTML files...")
    
    for html_file in html_files:
        if fix_file(html_file):
            rel_path = html_file.relative_to(PUBLIC_DIR)
            print(f"  Fixed: {rel_path}")
    
    print(f"\n=== Summary ===")
    print(f"Files checked: {stats['files_checked']}")
    print(f"Files modified: {stats['files_modified']}")
    print(f"Total replacements: {stats['replacements']}")

if __name__ == "__main__":
    main()
