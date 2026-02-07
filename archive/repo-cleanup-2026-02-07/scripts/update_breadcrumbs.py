#!/usr/bin/env python3
"""
Script to update Nunjucks templates from backLink to breadcrumbs format.
"""

import os
import re
from pathlib import Path

# Base directory for pages
PAGES_DIR = Path('/Users/StevenStewart/SGS-CSC/src/pages')

# Define breadcrumb mappings for each page type
BREADCRUMB_MAPPINGS = {
    # IGCSE topic indexes
    'igcse/topic3/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 3', 'href': 'igcse/topic3/index.html'},
        ]
    },
    'igcse/topic4/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 4', 'href': 'igcse/topic4/index.html'},
        ]
    },
    'igcse/topic5/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 5', 'href': 'igcse/topic5/index.html'},
        ]
    },
    'igcse/topic6/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 6', 'href': 'igcse/topic6/index.html'},
        ]
    },
    'igcse/topic7/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 7', 'href': 'igcse/topic7/index.html'},
        ]
    },
    'igcse/topic8/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 8', 'href': 'igcse/topic8/index.html'},
        ]
    },
    'igcse/topic9/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 9', 'href': 'igcse/topic9/index.html'},
        ]
    },
    'igcse/topic10/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'igcse',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IGCSE', 'href': 'igcse/index.html'},
            {'label': 'Topic 10', 'href': 'igcse/topic10/index.html'},
        ]
    },
    # IB topic indexes
    'ib/A1/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'A1', 'href': 'ib/A1/index.html'},
        ]
    },
    'ib/A2/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'A2', 'href': 'ib/A2/index.html'},
        ]
    },
    'ib/A3/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'A3', 'href': 'ib/A3/index.html'},
        ]
    },
    'ib/A4/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'A4', 'href': 'ib/A4/index.html'},
        ]
    },
    'ib/B1/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B1', 'href': 'ib/B1/index.html'},
        ]
    },
    'ib/B2/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B2', 'href': 'ib/B2/index.html'},
        ]
    },
    'ib/B3/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B3', 'href': 'ib/B3/index.html'},
        ]
    },
    'ib/B4/index.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ib',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'IB', 'href': 'ib/index.html'},
            {'label': 'B4', 'href': 'ib/B4/index.html'},
        ]
    },
    # KS3
    'ks3/year7/unit2.njk': {
        'title_old': 'SGSD', 'title_new': 'SGS',
        'section': 'ks3',
        'breadcrumbs': [
            {'label': 'Home', 'href': 'index.html'},
            {'label': 'KS3', 'href': 'ks3/index.html'},
            {'label': 'Year 7', 'href': 'ks3/index.html'},
            {'label': 'Unit 2', 'href': 'ks3/year7/unit2.html'},
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
    content = content.replace(mapping['title_old'], mapping['title_new'])
    
    # Remove backLink and add activeSection + breadcrumbs
    # Match backLink block
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
