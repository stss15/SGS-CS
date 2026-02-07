class Logbook:
    """Mission log for recording events."""

    def __init__(self):
        self._entries = []

    def add_entry(self, entry: str) -> None:
        self._entries.append(entry)

    def list_entries(self) -> list:
        return list(self._entries)

    def latest(self):
        if not self._entries:
            return None
        return self._entries[-1]

    def count(self) -> int:
        return len(self._entries)
