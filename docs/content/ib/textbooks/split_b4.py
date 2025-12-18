import re
import os

def split_b4_textbook():
    input_file_path = '/Users/StevenStewart/SGS-CSC/docs/ib-content/textbooks/B4.txt'
    output_dir = '/Users/StevenStewart/SGS-CSC/docs/ib-content/textbooks/B4_chapters'
    
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created directory: {output_dir}")

    with open(input_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find chapter headers like "B4.1.2 Linked lists"
    # We look for B4 followed by digits and dots, then a space and text
    # Note: B4.1 Fundamentals... appears as a header on many pages, catch it but treat as noise if needed?
    # User requirement: "new chapter starts such as b4.1 to b4.2"
    # Based on grep, we have B4.1.2, B4.1.3, B4.1.4, B4.1.6
    # Also "B4 End-of-topic questions"
    
    # Let's define the split pattern more carefully to capture the title line
    # Pattern: generic B4.x or B4.x.x at start of line
    
    lines = content.split('\n')
    
    chapters = []
    current_chapter_title = "B4_Intro"
    current_chapter_content = []
    
    # Regex for distinct section headers we want to split by
    # 1. B4.1.X ...
    # 2. B4 X ... (like End-of-topic questions)
    # 3. B4.1 Fundamentals... is often a page header, but the first one effectively starts the section.
    #    However, looking at the file, B4.1.2 comes *after* some intro text.
    
    chapter_pattern = re.compile(r'^(B4(\.\d+)+(\.\d+)?|B4 End-of-topic questions).*')

    # To avoid splitting on Page Headers like "B4.1 Fundamentals of abstract data types" appearing mid-text,
    # we might need to be careful. But the user said "read the whole file first".
    # From grep output, "B4.1 Fundamentals..." appears many times.
    # Actual distinct sections seem to be:
    # - Start of file (Intro)
    # - B4.1.2 Linked lists (line 24) -> This seems too early? Let's check line 24.
    #   Wait, line 1 is "B4 Abstract data types...", line 24 is "B4.1.2 Linked lists".
    #   So B4.1 Fundamentals seems to be the general topic. 
    #   Actually, the grep showed B4.1.2 at line 24.
    
    # Let's iterate and control the split.
    
    excluded_headers = [
        "B4 Abstract data types (ADTs) (HL)",
        "B4 Abstract data types (ADTs) (HL only)", 
        "B4.1 Fundamentals of abstract data types", # This repeats a lot as header
        "B4.1 Fundamentals of ADTs"
    ]

    for line in lines:
        stripped_line = line.strip()
        is_new_chapter = False
        match = chapter_pattern.match(line)
        
        if match:
            # Check if it's one of the recurring page headers
            is_header_noise = False
            for excluded in excluded_headers:
                 if excluded in line:
                     is_header_noise = True
                     break
            
            # Additional check: B4.1.2, B4.1.3 etc are valid new chapters
            # "B4.1 Fundamentals..." is tricky. It appears at lines 88, 273, 449...
            # But "B4.1.2 Linked lists" is at line 24.
            # "B4.1.3 Linked lists" is at 233? Wait, repeating title?
            # Let's look at specific distinct headers found in grep (approx):
            # B4.1.2 Linked lists
            # B4.1.3 Linked lists (Wait, is it repeated?)
            # B4.1.4 Structures and properties
            # B4.1.6 Core principles...
            # B4 End-of-topic questions
            
            # Strategy: If it looks like a specifically numbered sub-section B4.x.x, take it.
            # If it is just B4 or B4.1, treat as noise/content unless it's clearly distinct (like End-of-topic).
            
            if not is_header_noise:
                # One more check: specifically B4.x.x or specialized B4 titles
                if re.match(r'^B4\.\d+\.\d+', line) or "End-of-topic" in line:
                    is_new_chapter = True

        if is_new_chapter:
            # Save previous chapter
            if current_chapter_content:
                chapters.append({
                    'title': current_chapter_title,
                    'content': '\n'.join(current_chapter_content)
                })
            
            # Start new chapter
            current_chapter_title = stripped_line.replace(':', '').replace('/', '-').replace('\\', '-')
            # Sanitize filename safe
            current_chapter_title = re.sub(r'[^\w\-_\. ]', '', current_chapter_title).strip()
            current_chapter_content = [line]
        else:
            current_chapter_content.append(line)
            
    # Append the last chapter
    if current_chapter_content:
        chapters.append({
            'title': current_chapter_title,
            'content': '\n'.join(current_chapter_content)
        })

    # Write files
    for chapter in chapters:
        # Create a filename
        filename = f"{chapter['title']}.txt"
        file_path = os.path.join(output_dir, filename)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(chapter['content'])
        print(f"Written: {filename}")

if __name__ == "__main__":
    split_b4_textbook()
