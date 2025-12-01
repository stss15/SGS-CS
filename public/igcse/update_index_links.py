import os
import re

BASE_DIR = "/Users/StevenStewart/SGSD-CSC/public/igcse"

def get_title(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Try to find h1 main-title first
    match = re.search(r'<h1 class="main-title">(.*?)</h1>', content)
    if match:
        return match.group(1).split(' ', 1)[1] if ' ' in match.group(1) else match.group(1) # Remove "1.1 " prefix if present
    
    # Fallback to title tag
    match = re.search(r'<title>(.*?)</title>', content)
    if match:
        title = match.group(1).split('|')[0].strip()
        # Remove "1.1 " prefix
        if re.match(r'\d+\.\d+', title):
             parts = title.split(' ', 1)
             if len(parts) > 1:
                 return parts[1]
        return title
    
    return "Slide Deck"

def create_button_html(filename, number, title):
    return f'''
                <a href="{filename}" class="resource-btn">
                    <span class="resource-number">
                        {number}
                    </span>
                    <div class="resource-info">
                        <span class="resource-name">{title}</span>
                        <span class="resource-type">Slide Deck • Presentation</span>
                    </div>
                    <i class="fa-solid fa-arrow-right resource-arrow"></i>
                </a>
'''

def update_topic(topic_num):
    topic_dir = os.path.join(BASE_DIR, f"topic{topic_num}")
    index_path = os.path.join(topic_dir, "index.html")
    
    if not os.path.exists(index_path):
        return

    with open(index_path, 'r', encoding='utf-8') as f:
        index_content = f.read()

    # Find existing links to avoid duplicates (double check)
    existing_links = set(re.findall(r'href=["\']([^"\']+)["\']', index_content))

    # Find slide decks
    files = os.listdir(topic_dir)
    slide_decks = []
    for f in files:
        # Match pattern like 2.1_something.html
        if re.match(r'^\d+\.\d+_.*\.html$', f):
            if f not in existing_links:
                slide_decks.append(f)
    
    slide_decks.sort() # Sort by filename (usually implies sort by number)

    if not slide_decks:
        print(f"Topic {topic_num}: No new slide decks to add.")
        return

    print(f"Topic {topic_num}: Adding {len(slide_decks)} decks: {slide_decks}")

    new_buttons = ""
    for deck in slide_decks:
        # Extract number (e.g. 2.1)
        number = deck.split('_')[0]
        title = get_title(os.path.join(topic_dir, deck))
        new_buttons += create_button_html(deck, number, title)

    # Insert before the Teacher Toolkit button if it exists, or append to resource-grid
    # Look for <div class="resource-grid">
    
    # We want to insert at the BEGINNING of the resource grid usually, or in order.
    # But simpler is to insert before "Teacher Toolkit" or "Assessments"
    
    marker = 'href="teacher_toolkit.html"'
    if marker in index_content:
        # Insert before the <a> containing this marker
        # We need to find the start of that <a> tag.
        # This is tricky with regex. 
        # Let's try to find the resource-grid opening and append there? 
        # But then it might be before existing 1.1 buttons if we are adding 1.2?
        # Actually, if 1.1 is there, we want 1.2 after it.
        # If the grid is empty of slide decks, we can put them at the start.
        
        # Strategy: Find <div class="resource-grid"> and insert after it.
        # This puts them at the top. If there are existing ones, they will be below.
        # But wait, if 2.1 is missing but 2.2 is there (unlikely), this might mess order.
        # Given the task, it seems ALL slide decks are missing for these topics.
        
        pattern = r'(<div class="resource-grid">\s*)'
        index_content = re.sub(pattern, r'\1' + new_buttons, index_content, count=1)
        
    else:
        # If no teacher toolkit, just put in resource grid
        pattern = r'(<div class="resource-grid">\s*)'
        if re.search(pattern, index_content):
            index_content = re.sub(pattern, r'\1' + new_buttons, index_content, count=1)
        else:
            print(f"Topic {topic_num}: Could not find resource-grid.")
            return

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print(f"Topic {topic_num}: Updated index.html")

def main():
    # Topics identified as having missing links
    topics = [2, 3, 5, 7, 8, 9, 10]
    for t in topics:
        update_topic(t)

if __name__ == "__main__":
    main()
