#!/usr/bin/env python3
"""
Slide Structure Validator
=========================
Checks Reveal.js slides for common structural issues that cause rendering problems.

Issue #1: Nested sections with sibling content
When a <section> contains both regular content AND nested <section> elements,
Reveal.js renders them incorrectly (overlapping).

CORRECT:
<section>
    <section>Main content here</section>
    <section>Sub-slide here (Quick Check)</section>
</section>

INCORRECT:
<section>
    <h3>Main content here</h3>
    <section>Sub-slide here (Quick Check)</section>  <!-- BROKEN! -->
</section>

Usage: python validate_slide_structure.py [file_or_directory]
"""

import os
import sys
import re
from pathlib import Path

def check_file(filepath):
    """Check a single HTML file for slide structure issues."""
    issues = []
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all sections
    section_pattern = re.compile(r'<section\b[^>]*>', re.IGNORECASE)
    end_section_pattern = re.compile(r'</section>', re.IGNORECASE)
    
    # Simple heuristic: look for content followed by nested section within same parent
    # Pattern: non-section content, then nested section, all within a section
    
    # Find sections that contain BOTH content elements AND nested sections
    bad_pattern = re.compile(
        r'<section\b[^>]*>\s*'  # Opening section
        r'(?=.*?<(?:h[1-6]|div|p|pre|code|ul|ol)\b)'  # Must have content elements
        r'(?=.*?<section\b)',  # Must have nested section
        re.IGNORECASE | re.DOTALL
    )
    
    # More specific check: section tag immediately followed by content (not another section)
    # then later contains a section
    lines = content.split('\n')
    in_section = 0
    section_start_lines = []
    has_content_before_nested = False
    
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        
        # Track section depth
        section_opens = len(section_pattern.findall(line))
        section_closes = len(end_section_pattern.findall(line))
        
        if section_opens > 0:
            # Check if parent section has content before this nested section
            if in_section > 0 and section_start_lines and has_content_before_nested:
                # Found a nested section after content -- this is the bug!
                parent_line = section_start_lines[-1]
                issues.append({
                    'file': filepath,
                    'line': i,
                    'parent_line': parent_line,
                    'message': f'Nested <section> at line {i} appears after content in parent section (started line {parent_line}). This causes overlapping slides.'
                })
            
            section_start_lines.append(i)
            in_section += section_opens
            has_content_before_nested = False
        
        # Check for content elements (that indicate this section has inline content)
        if in_section > 0:
            content_patterns = ['<h1', '<h2', '<h3', '<h4', '<h5', '<h6', '<div class', '<p>', '<p ', '<ul', '<ol', '<pre', '<table']
            for pattern in content_patterns:
                if pattern in stripped.lower() and '<section' not in stripped.lower():
                    has_content_before_nested = True
                    break
        
        if section_closes > 0:
            for _ in range(section_closes):
                if section_start_lines:
                    section_start_lines.pop()
                if in_section > 0:
                    in_section -= 1
            has_content_before_nested = False
    
    return issues

def main():
    if len(sys.argv) < 2:
        # Default: check all slide files in public/ib-2027
        base_path = Path(__file__).parent.parent / 'public'
        files = list(base_path.rglob('slides/*.html'))
        if not files:
            files = list(base_path.rglob('*.html'))
    else:
        target = Path(sys.argv[1])
        if target.is_dir():
            files = list(target.rglob('*.html'))
        else:
            files = [target]
    
    all_issues = []
    for filepath in files:
        if 'node_modules' in str(filepath):
            continue
        issues = check_file(filepath)
        all_issues.extend(issues)
    
    if all_issues:
        print(f"\n⚠️  Found {len(all_issues)} slide structure issue(s):\n")
        for issue in all_issues:
            print(f"  {issue['file']}:{issue['line']}")
            print(f"    {issue['message']}\n")
        print("\nTo fix: Wrap the main content in its own <section> tag, making it a sibling")
        print("of the Quick Check <section> inside a wrapper <section>.")
        sys.exit(1)
    else:
        print(f"✓ Checked {len(files)} file(s). No slide structure issues found.")
        sys.exit(0)

if __name__ == '__main__':
    main()
