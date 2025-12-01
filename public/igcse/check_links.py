import os
import re

BASE_DIR = "/Users/StevenStewart/SGSD-CSC/public/igcse"

def check_topic(topic_num):
    topic_dir = os.path.join(BASE_DIR, f"topic{topic_num}")
    index_path = os.path.join(topic_dir, "index.html")
    
    if not os.path.exists(index_path):
        print(f"Topic {topic_num}: index.html missing")
        return

    with open(index_path, 'r', encoding='utf-8') as f:
        index_content = f.read()

    # Find all hrefs
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', index_content)
    linked_files = set()
    for href in hrefs:
        # Resolve relative paths if needed, but usually they are just filenames
        if '/' not in href:
            linked_files.add(href)
        else:
            # Handle relative paths like ./file.html or just file.html
            basename = os.path.basename(href)
            linked_files.add(basename)

    # List all html files in dir
    all_files = os.listdir(topic_dir)
    html_files = [f for f in all_files if f.endswith('.html') and f != 'index.html']

    missing_links = []
    for f in html_files:
        if f not in linked_files:
            missing_links.append(f)

    if missing_links:
        print(f"Topic {topic_num} - Unlinked files:")
        for f in missing_links:
            print(f"  - {f}")
    else:
        print(f"Topic {topic_num}: All HTML files linked.")

def main():
    for i in range(1, 11):
        check_topic(i)

if __name__ == "__main__":
    main()
