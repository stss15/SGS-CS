#!/usr/bin/env python3
"""
Script to update Nunjucks templates from backLink to breadcrumbs format.
Phase 2: Specification and sub-pages
"""

import os
import re
from pathlib import Path

# Base directory for pages
PAGES_DIR = Path('/Users/StevenStewart/SGS-CSC/src/pages')

# Define breadcrumb mappings for specification and sub-pages
BREADCRUMB_MAPPINGS = {
    # IGCSE specifications
    'igcse/topic1/specification.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 1', 'href': 'igcse/topic1/index.html'},
            {'label': 'Specification', 'href': 'igcse/topic1/specification.html'},
        ]
    },
    'igcse/topic2/specification.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 2', 'href': 'igcse/topic2/index.html'},
            {'label': 'Specification', 'href': 'igcse/topic2/specification.html'},
        ]
    },
    'igcse/topic3/specification.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 3', 'href': 'igcse/topic3/index.html'},
            {'label': 'Specification', 'href': 'igcse/topic3/specification.html'},
        ]
    },
    'igcse/topic4/specification.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 4', 'href': 'igcse/topic4/index.html'},
            {'label': 'Specification', 'href': 'igcse/topic4/specification.html'},
        ]
    },
    'igcse/topic7/specification.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 7', 'href': 'igcse/topic7/index.html'},
            {'label': 'Specification', 'href': 'igcse/topic7/specification.html'},
        ]
    },
    'igcse/topic8/specification.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 8', 'href': 'igcse/topic8/index.html'},
            {'label': 'Specification', 'href': 'igcse/topic8/specification.html'},
        ]
    },
    'igcse/topic9/specification.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 9', 'href': 'igcse/topic9/index.html'},
            {'label': 'Specification', 'href': 'igcse/topic9/specification.html'},
        ]
    },
    'igcse/topic10/specification.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 10', 'href': 'igcse/topic10/index.html'},
            {'label': 'Specification', 'href': 'igcse/topic10/specification.html'},
        ]
    },
    # IGCSE teacher toolkits and assessments
    'igcse/topic4/teacher_toolkit.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 4', 'href': 'igcse/topic4/index.html'},
            {'label': 'Teacher Toolkit', 'href': 'igcse/topic4/teacher_toolkit.html'},
        ]
    },
    'igcse/topic4/assessments.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 4', 'href': 'igcse/topic4/index.html'},
            {'label': 'Assessments', 'href': 'igcse/topic4/assessments.html'},
        ]
    },
    'igcse/topic8/teacher_toolkit.njk': {
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 8', 'href': 'igcse/topic8/index.html'},
            {'label': 'Teacher Toolkit', 'href': 'igcse/topic8/teacher_toolkit.html'},
        ]
    },
    # IB specifications
    'ib/B1/specification.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B1', 'href': 'ib/B1/index.html'},
            {'label': 'Specification', 'href': 'ib/B1/specification.html'},
        ]
    },
    'ib/B2/specification.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B2', 'href': 'ib/B2/index.html'},
            {'label': 'Specification', 'href': 'ib/B2/specification.html'},
        ]
    },
    'ib/B3/specification.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B3', 'href': 'ib/B3/index.html'},
            {'label': 'Specification', 'href': 'ib/B3/specification.html'},
        ]
    },
    'ib/B4/specification.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B4', 'href': 'ib/B4/index.html'},
            {'label': 'Specification', 'href': 'ib/B4/specification.html'},
        ]
    },
    # KS3 lessons
    'ks3/year7/unit2/L1_digital_you.njk': {
        'section': 'ks3',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'KS3', 'href': 'ks3/index.html'},
            {'label': 'Unit 2', 'href': 'ks3/year7/unit2.html'},
            {'label': 'L1', 'href': 'ks3/year7/unit2/L1_digital_you.html'},
        ]
    },
    'ks3/year7/unit2/L2_the_trail_you_leave_behind.njk': {
        'section': 'ks3',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'KS3', 'href': 'ks3/index.html'},
            {'label': 'Unit 2', 'href': 'ks3/year7/unit2.html'},
            {'label': 'L2', 'href': 'ks3/year7/unit2/L2_the_trail_you_leave_behind.html'},
        ]
    },
    'ks3/year7/unit2/L3_what_will_people_think.njk': {
        'section': 'ks3',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'KS3', 'href': 'ks3/index.html'},
            {'label': 'Unit 2', 'href': 'ks3/year7/unit2.html'},
            {'label': 'L3', 'href': 'ks3/year7/unit2/L3_what_will_people_think.html'},
        ]
    },
    'ks3/year7/unit2/L4_public_vs_private_data.njk': {
        'section': 'ks3',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'KS3', 'href': 'ks3/index.html'},
            {'label': 'Unit 2', 'href': 'ks3/year7/unit2.html'},
            {'label': 'L4', 'href': 'ks3/year7/unit2/L4_public_vs_private_data.html'},
        ]
    },
    # IB B2 Student Resources
    'ib/B2/student_resources.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B2', 'href': 'ib/B2/index.html'},
            {'label': 'Student Resources', 'href': 'ib/B2/student_resources.html'},
        ]
    },
    'ib/B2/B2.1_revision.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B2', 'href': 'ib/B2/index.html'},
            {'label': 'Student Resources', 'href': 'ib/B2/student_resources.html'},
            {'label': 'B2.1 Fundamentals', 'href': 'ib/B2/B2.1_revision.html'},
        ]
    },
    'ib/B2/B2.2_revision.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B2', 'href': 'ib/B2/index.html'},
            {'label': 'Student Resources', 'href': 'ib/B2/student_resources.html'},
            {'label': 'B2.2 Data Structures', 'href': 'ib/B2/B2.2_revision.html'},
        ]
    },
    'ib/B2/B2.2_recursion.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B2', 'href': 'ib/B2/index.html'},
            {'label': 'Student Resources', 'href': 'ib/B2/student_resources.html'},
            {'label': 'B2.2 Recursion', 'href': 'ib/B2/B2.2_recursion.html'},
        ]
    },
    'ib/B2/B2.4_revision.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B2', 'href': 'ib/B2/index.html'},
            {'label': 'Student Resources', 'href': 'ib/B2/student_resources.html'},
            {'label': 'B2.4 Algorithms', 'href': 'ib/B2/B2.4_revision.html'},
        ]
    },
    'ib/B2/B2.5_revision.njk': {
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B2', 'href': 'ib/B2/index.html'},
            {'label': 'Student Resources', 'href': 'ib/B2/student_resources.html'},
            {'label': 'B2.5 File Processing', 'href': 'ib/B2/B2.5_revision.html'},
        ]
    },
}


def format_breadcrumbs(crumbs):
    """Format breadcrumbs list as YAML."""
    lines = ['breadcrumbs:']
    for crumb in crumbs:
        lines.append(f'  - {{ label: "{crumb["label"]}", href: "{crumb["href"]}" }}')
    return '\n'.join(lines)


def update_frontmatter(content, mapping):
    """Update the frontmatter of a file."""
    # Replace SGSD with SGS in title
    content = content.replace('SGSD', 'SGS')
    
    # Remove backLink and add activeSection + breadcrumbs
    # Match backLink block (with or without quotes around label)
    backlink_pattern = r'backLink:\s*\n\s+href:.*\n\s+label:.*\n'
    
    breadcrumbs_yaml = f"activeSection: {mapping['section']}\n{format_breadcrumbs(mapping['breadcrumbs'])}\n"
    
    content = re.sub(backlink_pattern, breadcrumbs_yaml, content)
    
    return content


def main():
    updated_files = []
    
    for rel_path, mapping in BREADCRUMB_MAPPINGS.items():
        file_path = PAGES_DIR / rel_path
        
        if not file_path.exists():
            print(f"Warning: File not found: {file_path}")
            continue
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        new_content = update_frontmatter(content, mapping)
        
        if new_content != content:
            with open(file_path, 'w') as f:
                f.write(new_content)
            updated_files.append(rel_path)
            print(f"Updated: {rel_path}")
        else:
            print(f"No changes needed: {rel_path}")
    
    print(f"\nTotal files updated: {len(updated_files)}")


if __name__ == '__main__':
    main()
