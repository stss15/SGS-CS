#!/usr/bin/env python3
"""
COMPREHENSIVE asset path converter.
Converts ALL relative paths (../*, ./*) to absolute paths (/*) for:
- CSS links (href)
- JavaScript sources (src)
- Images (src, href)
- Any other local assets
"""

import os
import re
from pathlib import Path

PUBLIC_DIR = Path("/Users/StevenStewart/SGS-CSC REMIX/public")

# External prefixes to NOT convert
EXTERNAL_PREFIXES = ('http://', 'https://', '//', 'data:', 'javascript:', 'mailto:', 'tel:', '#')

# Track all fixes
stats = {
    'files_checked': 0,
    'files_modified': 0,
    'fixes': {}
}

def is_external(path):
    """Check if a path is external (HTTP, data:, etc)."""
    return any(path.startswith(p) for p in EXTERNAL_PREFIXES)

def convert_relative_to_absolute(match, attr_name, file_path):
    """Convert a relative path to absolute."""
    full_match = match.group(0)
    path = match.group(1)
    
    # Skip external URLs
    if is_external(path):
        return full_match
    
    # Skip already absolute paths
    if path.startswith('/'):
        return full_match
    
    # Skip empty paths
    if not path.strip():
        return full_match
    
    # Calculate absolute path
    # Remove '../' and './' prefixes and resolve
    original_path = path
    
    # Count how many levels up
    clean_path = path
    while clean_path.startswith('../'):
        clean_path = clean_path[3:]
    while clean_path.startswith('./'):
        clean_path = clean_path[2:]
    
    # Resolve to absolute path from file location
    try:
        file_dir = file_path.parent
        resolved = (file_dir / path).resolve()
        
        # Make it relative to PUBLIC_DIR
        if resolved.is_relative_to(PUBLIC_DIR):
            absolute_path = '/' + str(resolved.relative_to(PUBLIC_DIR))
            absolute_path = absolute_path.replace('//', '/')
            
            # Track fix
            pattern = f'{attr_name}="{path[:20]}..."' if len(path) > 20 else f'{attr_name}="{path}"'
            if pattern not in stats['fixes']:
                stats['fixes'][pattern] = 0
            stats['fixes'][pattern] += 1
            
            return f'{attr_name}="{absolute_path}"'
    except (ValueError, OSError):
        pass
    
    return full_match

def fix_file(file_path):
    """Fix all relative paths in a file."""
    global stats
    
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        original = content
        
        # Fix href attributes (CSS, links)
        content = re.sub(
            r'href="(\.\./[^"]*|\.\/[^"]*)"',
            lambda m: convert_relative_to_absolute(m, 'href', file_path),
            content
        )
        
        # Fix src attributes (JS, images)
        content = re.sub(
            r'src="(\.\./[^"]*|\.\/[^"]*)"',
            lambda m: convert_relative_to_absolute(m, 'src', file_path),
            content
        )
        
        # Fix url() in inline styles
        content = re.sub(
            r'url\("(\.\./[^"]*|\.\/[^"]*)"\)',
            lambda m: convert_relative_to_absolute(m, 'url(', file_path).replace('url(="', 'url("'),
            content
        )
        
        content = re.sub(
            r"url\('(\.\./[^']*|\.\/[^']*)'\)",
            lambda m: convert_relative_to_absolute(m, "url(", file_path).replace("url(='", "url('"),
            content
        )
        
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
    html_files = list(PUBLIC_DIR.rglob("*.html"))
    stats['files_checked'] = len(html_files)
    
    print(f"Scanning {len(html_files)} HTML files for relative paths...")
    
    for html_file in html_files:
        if fix_file(html_file):
            rel_path = html_file.relative_to(PUBLIC_DIR)
            print(f"  Fixed: {rel_path}")
    
    print(f"\n=== Summary ===")
    print(f"Files checked: {stats['files_checked']}")
    print(f"Files modified: {stats['files_modified']}")
    
    if stats['fixes']:
        print(f"\nTop patterns fixed:")
        sorted_fixes = sorted(stats['fixes'].items(), key=lambda x: -x[1])[:15]
        for pattern, count in sorted_fixes:
            print(f"  {pattern}: {count}")

if __name__ == "__main__":
    main()
