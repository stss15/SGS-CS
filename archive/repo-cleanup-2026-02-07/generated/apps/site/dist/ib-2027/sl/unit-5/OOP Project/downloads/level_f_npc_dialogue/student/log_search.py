def load_logs_from_file(filepath: str) -> list:
    """
    Read logs from a file.
    Format: timestamp|author|content|corrupted
    Returns a list of dicts.
    """
    pass

def search_logs(logs: list, author: str) -> list:
    """
    Return a list of log entries written by the specific author.
    """
    pass

def sort_logs(logs: list, key: str, descending: bool = False) -> list:
    """
    Return a list of log entries sorted by the key.
    If descending is True, highest values come first.
    """
    pass

def validate_code(code: str, used_codes: set) -> bool:
    """
    Return True if code is NOT in used_codes set.
    """
    pass
