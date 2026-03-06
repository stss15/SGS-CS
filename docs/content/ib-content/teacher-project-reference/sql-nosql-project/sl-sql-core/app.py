from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect("tasks.db")
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/users", methods=["GET"])
def get_users():
    conn = get_db_connection()
    users = conn.execute(
        "SELECT user_id, username FROM users"
    ).fetchall()
    conn.close()

    result = []

    for user in users:
        result.append({
            "user_id": user["user_id"],
            "username": user["username"]
        })

    return jsonify(result)


@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = get_db_connection()

    tasks = conn.execute("""
        SELECT
            tasks.task_id,
            tasks.title,
            tasks.priority,
            tasks.due_date,
            tasks.status,
            users.username
        FROM tasks
        JOIN users
        ON tasks.user_id = users.user_id
        ORDER BY tasks.task_id DESC
    """).fetchall()

    conn.close()

    result = []

    for task in tasks:
        result.append({
            "task_id": task["task_id"],
            "title": task["title"],
            "priority": task["priority"],
            "due_date": task["due_date"],
            "status": task["status"],
            "username": task["username"]
        })

    return jsonify(result)


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    title = data["title"]
    user_id = data["user_id"]
    priority = data["priority"]
    due_date = data["due_date"]

    conn = get_db_connection()

    conn.execute(
        """
        INSERT INTO tasks (title, user_id, priority, due_date)
        VALUES (?, ?, ?, ?)
        """,
        (title, user_id, priority, due_date)
    )

    conn.commit()
    conn.close()

    return jsonify({"status": "success"})


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    conn = get_db_connection()
    conn.execute(
        "DELETE FROM tasks WHERE task_id = ?",
        (task_id,)
    )
    conn.commit()
    conn.close()
    return jsonify({"status": "deleted"})


@app.route("/tasks/<int:task_id>/complete", methods=["PATCH"])
def complete_task(task_id):
    conn = get_db_connection()
    conn.execute(
        "UPDATE tasks SET status = 'completed' WHERE task_id = ?",
        (task_id,)
    )
    conn.commit()
    conn.close()
    return jsonify({"status": "completed"})


if __name__ == "__main__":
    app.run(debug=True)
