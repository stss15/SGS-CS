#!/usr/bin/env python3
"""
Fix vertical slide structure in Reveal.js Nunjucks files.

The issue: When a <section> has both direct content AND nested <section> tags,
the nested sections overlap incorrectly. 

The fix: Wrap the parent content in its own <section> tag.

Before:
<section>
    <h3>Title</h3>
    <div class="cols">...</div>
    <section data-background="#fff3e0">Quick Check</section>
</section>

After:
<section>
    <section>
        <h3>Title</h3>
        <div class="cols">...</div>
        <p class="small-text" style="margin-top:0.5em;"><i class="fa-solid fa-arrow-down"></i> Quick Check</p>
    </section>
    <section data-background="#fff3e0">Quick Check</section>
</section>
"""

import re
import sys
from pathlib import Path

def fix_vertical_slides(content: str) -> str:
    """Fix all instances of the vertical slide issue in the content."""
    
    # Pattern to find sections with direct content followed by nested section
    # This is complex because we need to find parent <section> that:
    # 1. Has direct content (not starting with <section>)
    # 2. Ends with a nested <section data-background...>...</section></section>
    
    lines = content.split('\n')
    result_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Look for pattern: </div> followed by <section data-background
        if i > 0 and '</div>' in lines[i-1] if i > 0 else False:
            pass
        
        # Check if this line starts a section with direct content that will have a nested section
        if re.match(r'^<section>\s*$', line.strip()):
            # Look ahead to see if this section has:
            # 1. Direct content (h3, div, etc.)
            # 2. Followed by a nested <section data-background
            
            section_start = i
            j = i + 1
            has_direct_content = False
            has_nested_section = False
            nested_section_start = -1
            
            # Scan through the section
            depth = 1
            while j < len(lines) and depth > 0:
                scan_line = lines[j]
                
                # Check for nested section with data-background
                if re.search(r'<section\s+data-background', scan_line):
                    has_nested_section = True
                    nested_section_start = j
                    break
                
                # Check for direct content (not wrapped in section)
                if re.search(r'<(h[1-6]|div|p|pre|table)', scan_line) and not re.search(r'<section', scan_line):
                    has_direct_content = True
                
                # Track depth
                if '<section' in scan_line and '</section>' not in scan_line:
                    depth += 1
                if '</section>' in scan_line and '<section' not in scan_line:
                    depth -= 1
                
                j += 1
            
            # If we found the problematic pattern, fix it
            if has_direct_content and has_nested_section and nested_section_start > section_start + 1:
                # Emit the opening <section>
                result_lines.append(line)
                i += 1
                
                # Add inner <section> wrapper
                result_lines.append('    <section>')
                
                # Copy content until the nested section, adjusting indentation
                while i < nested_section_start:
                    content_line = lines[i]
                    # Add extra indentation
                    if content_line.strip():
                        result_lines.append('    ' + content_line)
                    else:
                        result_lines.append(content_line)
                    i += 1
                
                # Add the "Press down" hint before closing inner section
                result_lines.append('        <p class="small-text" style="margin-top:0.5em;"><i class="fa-solid fa-arrow-down"></i> Quick Check</p>')
                result_lines.append('    </section>')
                
                # Now copy the nested section (remove extra indentation if any)
                while i < len(lines):
                    nested_line = lines[i]
                    result_lines.append(nested_line)
                    if '</section>' in nested_line:
                        # Check if this closes the parent
                        i += 1
                        if i < len(lines) and '</section>' in lines[i]:
                            result_lines.append(lines[i])
                            i += 1
                        break
                    i += 1
                
                continue
        
        result_lines.append(line)
        i += 1
    
    return '\n'.join(result_lines)


def fix_file(filepath: Path) -> bool:
    """Fix a single file. Returns True if changes were made."""
    content = filepath.read_text(encoding='utf-8')
    
    # Simple pattern-based fix
    # Find: </div>\n    <section data-background
    # This indicates a nested section directly after closing div (problematic pattern)
    
    pattern = r'(<!-- \d+\. [^>]+-->\n<section>)\n(.*?)(</div>\n)(\s*<section data-background[^>]*>.*?</section>\n</section>)'
    
    def fix_match(m):
        comment_and_open = m.group(1)
        content = m.group(2)
        closing_div = m.group(3)
        nested_section_and_close = m.group(4)
        
        # Wrap content in inner section
        fixed = f'{comment_and_open}\n    <section>\n{content}{closing_div}        <p class="small-text" style="margin-top:0.5em;"><i class="fa-solid fa-arrow-down"></i> Quick Check</p>\n    </section>\n{nested_section_and_close}'
        return fixed
    
    # This is getting complex - let's just report which files need fixing
    # and rebuild manually
    
    matches = re.findall(r'</div>\n\s*<section data-background="#fff3e0">', content)
    return len(matches) > 0


if __name__ == '__main__':
    files = [
        'src/pages/ib/A2/A2.1_network_fundamentals.njk',
        'src/pages/ib/A2/A2.2_network_architecture.njk',
        'src/pages/ib/A2/A2.3_data_transmission.njk',
        'src/pages/ib/A2/A2.4_network_security.njk',
        'src/pages/ib/B1/B1.1_problem_specification.njk',
        'src/pages/ib/B1/B1.2_computational_thinking.njk',
        'src/pages/ib/B1/B1.3_flowcharts_pseudocode.njk',
        'src/pages/ib/B1/B1.4_algorithm_design.njk',
    ]
    
    base = Path(__file__).parent.parent
    
    for f in files:
        fp = base / f
        if fp.exists():
            needs_fix = fix_file(fp)
            print(f"{'NEEDS FIX' if needs_fix else 'OK'}: {f}")



