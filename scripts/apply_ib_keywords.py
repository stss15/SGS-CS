
import os
import re

# Configuration
# Path to the directory containing slide decks (HTML files) relative to script location
SLIDES_DIR = "." 
# Path to the directory containing keyword files relative to script location
# Adjusted to reach docs/content/ib-content/ib/keywords from public/ib
KEYWORDS_DIR = "../../docs/content/ib-content/ib/keywords"

# Regex to find definition boxes (assuming they don't have nested divs for now, or simple nesting)
DEF_BOX_PATTERN = re.compile(r'<div class="key-term[^"]*"[^>]*>.*?</div>', re.DOTALL | re.IGNORECASE)

def load_keywords(topic_prefix=None):
    """
    Loads keywords from .txt files in the KEYWORDS_DIR.
    If topic_prefix is provided (e.g. "B1"), only loads tokens for that topic if matches naming convention,
    BUT for IB our files are named A1_keywords.txt etc. so we can load specific ones or all.
    Let's simple load specific topic file.
    Returns a dictionary: { "term": "definition", ... }
    """
    keywords = {}
    
    if not os.path.exists(KEYWORDS_DIR):
        print(f"Error: Keywords directory not found at {KEYWORDS_DIR}")
        return keywords
        
    # Determine which file to load
    target_file = f"{topic_prefix}_keywords.txt"
    filepath = os.path.join(KEYWORDS_DIR, target_file)
    
    if not os.path.exists(filepath):
        # process quietly if file doesn't exist (maybe empty topic)
        return keywords

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line or "–" not in line: 
                    # Fallback for hyphen if en-dash missing
                    if "-" not in line: continue
                    parts = line.split("-", 1)
                else:
                    parts = line.split("–", 1) # en-dash
                
                if len(parts) >= 2:
                    term = parts[0].strip()
                    definition = parts[1].strip()
                    definition = definition.replace('"', '&quot;')
                    
                    if len(term) > 1:
                        keywords[term] = definition
                        # Add plurals
                        if term + "s" not in keywords: keywords[term + "s"] = definition
                        if term + "es" not in keywords: keywords[term + "es"] = definition
    except Exception as e:
        print(f"Error reading {target_file}: {e}")
                
    return keywords

def process_html_file(file_path, keywords):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Remove Definition Boxes (Only if they exist - strictly speaking we might want to keep them if hardcoded? 
    # But IGCSE script removes them to re-generate or assumes they are dynamic. 
    # Let's keep this line to be safe if that's the IGCSE pattern, but maybe comment out if risky.
    # Actually, for IB we strictly want <span class="keyword">.
    # Let's SKIP removing boxes unless we are sure.
    # content = DEF_BOX_PATTERN.sub('', content)

    # 1.5 Unwrap existing keywords to ensure definition updates
    UNWRAP_PATTERN = re.compile(r'<span class="keyword" data-def=".*?">(.*?)</span>', re.DOTALL | re.IGNORECASE)
    content = UNWRAP_PATTERN.sub(r'\1', content)
    
    # 2. Replace Keywords
    tokens = re.split(r'(<[^>]+>)', content)
    new_tokens = []
    
    in_script_style = False
    inside_keyword_span = False # track if we are inside a span we just created? No, tokens split tags.
    
    sorted_keys = sorted(keywords.keys(), key=len, reverse=True)
    if not sorted_keys:
        return

    pattern_str = r'\b(' + '|'.join(map(re.escape, sorted_keys)) + r')\b'
    pattern = re.compile(pattern_str, re.IGNORECASE)
    
    def master_replace(match):
        matched_text = match.group(1)
        lower_match = matched_text.lower()
        
        # Exact match attempt
        if matched_text in keywords:
             return f'<span class="keyword" data-def="{keywords[matched_text]}">{matched_text}</span>'
        
        # Case insensitive attempt
        for k in keywords:
            if k.lower() == lower_match:
                return f'<span class="keyword" data-def="{keywords[k]}">{matched_text}</span>'
        
        return matched_text

    for token in tokens:
        if not token: continue
        
        if token.startswith('<'):
            tag_lower = token.lower()
            if tag_lower.startswith('<script') or tag_lower.startswith('<style') or tag_lower.startswith('<title'):
                in_script_style = True
            elif tag_lower.startswith('</script') or tag_lower.startswith('</style') or tag_lower.startswith('</title'):
                in_script_style = False
            
            # Check for existing spans (should be unwrapped above, but if any remain...)
            if 'class="keyword"' in tag_lower:
                pass 

            new_tokens.append(token)
        else:
            if not in_script_style:
                text = pattern.sub(master_replace, token)
                new_tokens.append(text)
            else:
                new_tokens.append(token)
                
    new_content = "".join(new_tokens)
    
    if new_content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

def main():
    strands = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"]
    
    for strand in strands:
        # Load keywords for this strand
        keywords = load_keywords(strand)
        if not keywords:
            continue
            
        # Target directory: public/ib/A1, public/ib/B1 etc.
        # Script is in public/ib, so just strand name
        topic_dir = os.path.join(SLIDES_DIR, strand)
        
        if not os.path.exists(topic_dir):
            continue
            
        print(f"Processing {strand} with {len(keywords)} keywords...")
        
        for root, dirs, files in os.walk(topic_dir):
            for file in files:
                if file.endswith(".html") and "index" not in file:
                    process_html_file(os.path.join(root, file), keywords)

if __name__ == "__main__":
    main()
