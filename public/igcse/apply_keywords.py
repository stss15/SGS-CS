
import os
import re

# Configuration - use relative path from script location for CI compatibility
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = SCRIPT_DIR  # Script is in public/igcse/
REPO_ROOT = os.path.dirname(os.path.dirname(BASE_DIR))  # Go up to repo root
CHAPTER_FILES_DIR = os.path.join(REPO_ROOT, "docs", "igcse-content", "chapter-text-files")

# Regex to find definition boxes (assuming they don't have nested divs for now, or simple nesting)
DEF_BOX_PATTERN = re.compile(r'<div class="key-term[^"]*"[^>]*>.*?</div>', re.DOTALL | re.IGNORECASE)

def load_keywords(chapter_num):
    filename = f"Chapter {chapter_num} key words.txt"
    path = os.path.join(CHAPTER_FILES_DIR, filename)
    keywords = {}
    if not os.path.exists(path):
        print(f"Warning: {filename} not found.")
        return keywords
    
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    current_key = None
    for line in lines:
        line = line.strip()
        if not line or line.startswith("Key terms"):
            continue
        
        parts = re.split(r'\s+[–-]\s+', line, maxsplit=1)
        if len(parts) == 2:
            key = parts[0].strip()
            definition = parts[1].strip()
            definition = definition.replace('"', '&quot;')
            keywords[key] = definition
            current_key = key
        elif current_key:
            # Continuation of previous definition
            keywords[current_key] += " " + line.replace('"', '&quot;')
            
    # Add plurals after loading all
    keys = list(keywords.keys())
    for key in keys:
        definition = keywords[key]
        if key + "s" not in keywords:
            keywords[key + "s"] = definition
        if key + "es" not in keywords:
            keywords[key + "es"] = definition
                
    return keywords

def process_html_file(file_path, keywords):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Remove Definition Boxes (Only if they exist)
    content = DEF_BOX_PATTERN.sub('', content)

    # 1.5 Unwrap existing keywords to ensure definitions are updated
    # Matches <span class="keyword" data-def="...">text</span> and replaces with text
    # We use a non-greedy match for the attribute and content
    UNWRAP_PATTERN = re.compile(r'<span class="keyword" data-def=".*?">(.*?)</span>', re.DOTALL | re.IGNORECASE)
    # We might need to run this multiple times if there's nesting (shouldn't be, but good practice or just one pass is likely enough)
    content = UNWRAP_PATTERN.sub(r'\1', content)
    
    # 2. Replace Keywords in Text Nodes
    tokens = re.split(r'(<[^>]+>)', content)
    
    new_tokens = []
    in_script_style = False
    inside_keyword_span = False
    
    # Sort keywords by length (descending)
    sorted_keys = sorted(keywords.keys(), key=len, reverse=True)
    
    # Create master regex
    if not sorted_keys:
        return

    # Use word boundaries for all keys
    pattern_str = r'\b(' + '|'.join(map(re.escape, sorted_keys)) + r')\b'
    pattern = re.compile(pattern_str, re.IGNORECASE)
    
    def master_replace(match):
        matched_text = match.group(1)
        # Find the definition (need to match case insensitive key back to dict)
        lower_match = matched_text.lower()
        
        # Try exact match first
        if matched_text in keywords:
             return f'<span class="keyword" data-def="{keywords[matched_text]}">{matched_text}</span>'
             
        # Try case-insensitive lookup
        for k in keywords:
            if k.lower() == lower_match:
                return f'<span class="keyword" data-def="{keywords[k]}">{matched_text}</span>'
        
        return matched_text

    in_title = False
    
    for token in tokens:
        if not token:
            continue
            
        if token.startswith('<'):
            # It's a tag
            tag_lower = token.lower()
            
            # Check for script/style/title (don't apply keywords inside these)
            if tag_lower.startswith('<script') or tag_lower.startswith('<style') or tag_lower.startswith('<title'):
                in_script_style = True
                if tag_lower.startswith('<title'):
                    in_title = True
            elif tag_lower.startswith('</script') or tag_lower.startswith('</style') or tag_lower.startswith('</title'):
                in_script_style = False
                in_title = False
            
            # Check for keyword span
            # We want to avoid wrapping inside an existing keyword span
            if 'class="keyword"' in tag_lower or "class='keyword'" in tag_lower:
                if not tag_lower.startswith('</'):
                    inside_keyword_span = True
            
            if tag_lower.startswith('</span>') and inside_keyword_span:
                 inside_keyword_span = False
                 
            new_tokens.append(token)
        else:
            # It's text
            if not in_script_style and not inside_keyword_span:
                # Perform replacement
                text = pattern.sub(master_replace, token)
                new_tokens.append(text)
            else:
                new_tokens.append(token)
                
    new_content = "".join(new_tokens)
    
    if new_content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        # print(f"No changes for {file_path}")
        pass

def main():
    for i in range(1, 11):
        chapter_keywords = load_keywords(i)
        if not chapter_keywords:
            continue
            
        topic_dir = os.path.join(BASE_DIR, f"topic{i}")
        if not os.path.exists(topic_dir):
            # print(f"Topic directory {topic_dir} not found.")
            continue
            
        print(f"Processing Topic {i} with {len(chapter_keywords)} keywords (including plurals)...")
        
        for root, dirs, files in os.walk(topic_dir):
            for file in files:
                if file.endswith(".html"):
                    process_html_file(os.path.join(root, file), chapter_keywords)

if __name__ == "__main__":
    main()
