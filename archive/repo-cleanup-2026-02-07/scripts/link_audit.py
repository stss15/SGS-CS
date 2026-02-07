#!/usr/bin/env python3
"""
Full Site Link Audit
Checks all href and src attributes in HTML files against actual file existence.
"""

import os
import re
from pathlib import Path
from urllib.parse import unquote
import json

ROOT_DIR = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT_DIR / "public"
OUTPUT_FILE = ROOT_DIR / "meta" / "link_audit_report.md"

# Patterns to find links
HREF_PATTERN = re.compile(r'href=["\']([^"\']+)["\']', re.IGNORECASE)
SRC_PATTERN = re.compile(r'src=["\']([^"\']+)["\']', re.IGNORECASE)

# External link prefixes to skip
EXTERNAL_PREFIXES = ('http://', 'https://', '//', 'mailto:', 'tel:', 'javascript:', 'data:', '#')

def get_all_html_files():
    """Get all HTML files in public directory."""
    return list(PUBLIC_DIR.rglob("*.html"))

def resolve_link(link, source_file):
    """Resolve a relative link to an absolute path."""
    if link.startswith('/'):
        # Absolute path from root
        return PUBLIC_DIR / link.lstrip('/')
    else:
        # Relative path from current file's directory
        return (source_file.parent / link).resolve()

def check_file_exists(resolved_path):
    """Check if a file exists, handling .html extension and index.html."""
    if resolved_path.exists():
        return True
    
    if resolved_path.suffix in ('', '.html'):
        # Try with .html extension
        if resolved_path.with_suffix('.html').exists():
            return True
        
        # Try as directory with index.html
        if (resolved_path / 'index.html').exists():
            return True
    
    return False

def audit_links():
    """Audit all links in all HTML files."""
    html_files = get_all_html_files()
    
    broken_links = []
    all_files = set()
    
    for html_file in html_files:
        rel_path = html_file.relative_to(PUBLIC_DIR)
        all_files.add(str(rel_path))
        
        try:
            content = html_file.read_text(encoding='utf-8', errors='ignore')
        except Exception as e:
            print(f"Error reading {html_file}: {e}")
            continue
        
        # Find all hrefs and srcs
        hrefs = HREF_PATTERN.findall(content)
        srcs = SRC_PATTERN.findall(content)
        
        all_links = [('href', h) for h in hrefs] + [('src', s) for s in srcs]
        
        for link_type, link in all_links:
            # Skip external links
            if any(link.startswith(prefix) for prefix in EXTERNAL_PREFIXES):
                continue
            
            # Skip empty links
            if not link.strip():
                continue
            
            # Remove query strings and fragments
            clean_link = link.split('?')[0].split('#')[0]
            if not clean_link:
                continue
            
            # Resolve the link
            try:
                resolved = resolve_link(unquote(clean_link), html_file)
            except Exception as e:
                broken_links.append({
                    'source': str(rel_path),
                    'link': link,
                    'type': link_type,
                    'error': str(e)
                })
                continue
            
            # Check if file exists
            if not check_file_exists(resolved):
                broken_links.append({
                    'source': str(rel_path),
                    'link': link,
                    'type': link_type,
                    'resolved': str(resolved.relative_to(PUBLIC_DIR) if resolved.is_relative_to(PUBLIC_DIR) else resolved)
                })
    
    return broken_links, sorted(all_files)

def generate_report(broken_links, all_files):
    """Generate markdown report."""
    report = ["# Site Link Audit Report", "", f"**Date**: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M')}", ""]
    
    # Summary
    report.append(f"## Summary")
    report.append(f"- Total HTML files: {len(all_files)}")
    report.append(f"- Broken links found: {len(broken_links)}")
    report.append("")
    
    if broken_links:
        report.append("## Broken Links")
        report.append("")
        
        # Group by source file
        by_source = {}
        for bl in broken_links:
            src = bl['source']
            if src not in by_source:
                by_source[src] = []
            by_source[src].append(bl)
        
        for source, links in sorted(by_source.items()):
            report.append(f"### `{source}`")
            report.append("")
            report.append("| Type | Link | Issue |")
            report.append("|------|------|-------|")
            for link in links:
                resolved = link.get('resolved', link.get('error', 'unknown'))
                report.append(f"| {link['type']} | `{link['link'][:60]}` | Not found |")
            report.append("")
    else:
        report.append("## ✅ No broken links found!")
        report.append("")
    
    # Directory structure
    report.append("## Directory Structure")
    report.append("")
    report.append("```")
    
    # Build tree
    dirs = {}
    for f in all_files:
        parts = Path(f).parts
        current = dirs
        for part in parts[:-1]:
            if part not in current:
                current[part] = {}
            current = current[part]
        if '__files__' not in current:
            current['__files__'] = []
        current['__files__'].append(parts[-1])
    
    def print_tree(d, prefix=""):
        items = sorted([k for k in d.keys() if k != '__files__'])
        files = sorted(d.get('__files__', []))
        
        for i, item in enumerate(items):
            is_last = (i == len(items) - 1) and not files
            report.append(f"{prefix}{'└── ' if is_last else '├── '}{item}/")
            print_tree(d[item], prefix + ("    " if is_last else "│   "))
        
        for i, f in enumerate(files):
            is_last = i == len(files) - 1
            report.append(f"{prefix}{'└── ' if is_last else '├── '}{f}")
    
    report.append("public/")
    print_tree(dirs, "")
    report.append("```")
    
    return "\n".join(report)

if __name__ == "__main__":
    print("Scanning HTML files...")
    broken, files = audit_links()
    print(f"Found {len(broken)} broken links in {len(files)} HTML files")
    
    report = generate_report(broken, files)
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(report)
    print(f"Report saved to: {OUTPUT_FILE}")
    
    # Also print broken links to stdout
    if broken:
        print("\nBroken links:")
        for bl in broken[:30]:  # First 30
            print(f"  {bl['source']}: {bl['type']}={bl['link'][:50]}")
        if len(broken) > 30:
            print(f"  ... and {len(broken) - 30} more")
