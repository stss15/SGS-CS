"""
Log Search Functions - Student reference implementation.

Functions for searching and sorting log entries (contained puzzle P2).
"""


def search_logs(logs: list, author: str) -> list:
    """
    Search for log entries by a specific author.
    
    Args:
        logs: A list of log entry dicts with keys: timestamp, author, content, corrupted.
        author: The author name to search for.
        
    Returns:
        A list of log entries where the author matches.
    """
    results = []
    for log in logs:
        if log.get("author") == author:
            results.append(log)
    return results


def sort_logs(logs: list, key: str, descending: bool = False) -> list:
    """
    Sort log entries by a specific key.
    
    Args:
        logs: A list of log entry dicts.
        key: The dict key to sort by (e.g., "timestamp", "author").
        descending: If True, sort in descending order.
        
    Returns:
        A new sorted list of log entries.
    """
    return sorted(logs, key=lambda log: log.get(key, ""), reverse=descending)


def validate_code(code: str, used_codes: set) -> bool:
    """
    Validate that a code has not been used before.
    
    Args:
        code: The code to validate.
        used_codes: A set of previously used codes.
        
    Returns:
        True if the code is valid (not used), False if already used.
    """
    return code not in used_codes


def load_logs_from_file(filepath: str) -> list:
    """
    Load log entries from a text file.
    
    This function demonstrates file I/O (B2.5 requirement).
    Each line in the file is formatted as: timestamp|author|content|corrupted
    
    Args:
        filepath: Path to the log file.
        
    Returns:
        A list of log entry dicts, or empty list if file not found.
    """
    logs = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                
                # Parse pipe-delimited format
                parts = line.split('|')
                if len(parts) >= 4:
                    log_entry = {
                        "timestamp": int(parts[0]),
                        "author": parts[1],
                        "content": parts[2],
                        "corrupted": parts[3].lower() == "true"
                    }
                    logs.append(log_entry)
    except FileNotFoundError:
        print(f"Log file not found: {filepath}")
    except Exception as e:
        print(f"Error reading log file: {e}")
    
    return logs


# Sample log data for testing/demonstration
SAMPLE_LOGS = [
    {"timestamp": 1699000001, "author": "Dr. Chen", "content": "Initial artifact scans complete.", "corrupted": False},
    {"timestamp": 1699000100, "author": "M. Torres", "content": "Power fluctuations in C deck.", "corrupted": False},
    {"timestamp": 1699000200, "author": "Dr. Chen", "content": "Artifact emitting unknown signals.", "corrupted": True},
    {"timestamp": 1699000300, "author": "SIGMA", "content": "Protocol update initiated.", "corrupted": False},
    {"timestamp": 1699000400, "author": "Dr. Chen", "content": "Override code: ALPHA-7-OMEGA", "corrupted": False},
    {"timestamp": 1699000500, "author": "M. Torres", "content": "Security bots acting strangely.", "corrupted": True},
    {"timestamp": 1699000600, "author": "SIGMA", "content": "Containment breach detected.", "corrupted": False},
    {"timestamp": 1699000700, "author": "Dr. Chen", "content": "Emergency evacuation in progress.", "corrupted": True},
    {"timestamp": 1699000800, "author": "SIGMA", "content": "Protocol Omega activated.", "corrupted": False},
    {"timestamp": 1699000900, "author": "Dr. Chen", "content": "If you find this, the key is in the archive.", "corrupted": False},
]

