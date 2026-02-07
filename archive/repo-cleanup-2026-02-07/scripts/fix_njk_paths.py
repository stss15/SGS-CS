#!/usr/bin/env python3
"""
Convert all navigation hrefs in Nunjucks files to absolute paths.
This fixes Firebase routing issues where relative paths break due to 
cleanUrls or trailingSlash configuration.

The script identifies the path context from the file's location and 
converts relative hrefs to proper absolute paths.
"""

import os
import re
from pathlib import Path

SRC_PAGES = Path("/Users/StevenStewart/SGS-CSC REMIX/src/pages")

def get_absolute_path(file_path, relative_href):
    """Convert a relative href to an absolute path based on file location."""
    # Get the directory this file is in, relative to src/pages
    rel_dir = file_path.parent.relative_to(SRC_PAGES)
    
    # If relative href starts with /, it's already absolute
    if relative_href.startswith('/'):
        return relative_href
    
    # Build the absolute path
    if str(rel_dir) == '.':
        # File is directly in src/pages (e.g., index.njk)
        return '/' + relative_href
    else:
        # File is in a subdirectory
        return '/' + str(rel_dir / relative_href)

def fix_yaml_hrefs(content, file_path):
    """Fix href values in YAML frontmatter."""
    fixes = 0
    
    # Pattern to match href: something.html (relative paths without /)
    def replace_href(match):
        nonlocal fixes
        prefix = match.group(1)  # Everything before the path
        path = match.group(2)    # The path itself
        
        # Skip if already absolute or external
        if path.startswith('/') or path.startswith('http') or path.startswith('#'):
            return match.group(0)
        
        # Skip if it's index.html at root level
        if path == 'index.html':
            return f'{prefix}/index.html'
        
        abs_path = get_absolute_path(file_path, path)
        fixes += 1
        return f'{prefix}{abs_path}'
    
    # Match href: path patterns in YAML
    new_content = re.sub(
        r'(href:\s*)([^\s\'"}\]]+\.html)',
        replace_href,
        content
    )
    
    return new_content, fixes

def process_file(file_path):
    """Process a single Nunjucks file."""
    try:
        content = file_path.read_text()
        new_content, fixes = fix_yaml_hrefs(content, file_path)
        
        if fixes > 0:
            file_path.write_text(new_content)
            rel_path = file_path.relative_to(SRC_PAGES)
            print(f"Fixed {fixes} hrefs in {rel_path}")
            return fixes
        return 0
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return 0

def main():
    """Process all Nunjucks files."""
    njk_files = list(SRC_PAGES.rglob("*.njk"))
    total_fixes = 0
    files_fixed = 0
    
    print(f"Scanning {len(njk_files)} Nunjucks files...")
    
    for njk_file in njk_files:
        fixes = process_file(njk_file)
        if fixes > 0:
            total_fixes += fixes
            files_fixed += 1
    
    print(f"\n=== Summary ===")
    print(f"Files fixed: {files_fixed}")
    print(f"Total hrefs converted: {total_fixes}")

if __name__ == "__main__":
    main()
