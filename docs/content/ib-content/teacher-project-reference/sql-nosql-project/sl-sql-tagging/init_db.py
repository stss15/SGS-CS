import sqlite3


def init_database():
    conn = sqlite3.connect("tasks.db")

    with open("schema.sql") as f:
        conn.executescript(f.read())

    users = [
        ("Alice",),
        ("Bob",),
        ("Charlie",)
    ]

    conn.executemany(
        "INSERT INTO users (username) VALUES (?)",
        users
    )

    conn.commit()
    conn.close()

    print("Database created successfully.")


if __name__ == "__main__":
    init_database()
