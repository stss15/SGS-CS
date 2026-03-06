from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

TASK_FILE = "data/tasks.json"
USER_FILE = "data/users.json"


def load_tasks():
    if not os.path.exists(TASK_FILE):
        return []

    with open(TASK_FILE) as f:
        return json.load(f)


def save_tasks(tasks):
    with open(TASK_FILE, "w") as f:
        json.dump(tasks, f, indent=4)


def load_users():
    with open(USER_FILE) as f:
        return json.load(f)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/users")
def get_users():
    return jsonify(load_users())


@app.route("/tasks")
def get_tasks():
    tasks = load_tasks()
    users = load_users()

    for task in tasks:
        for user in users:
            if user["user_id"] == task["user_id"]:
                task["username"] = user["username"]

    return jsonify(tasks)


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    tasks = load_tasks()

    new_id = 1

    if len(tasks) > 0:
        new_id = tasks[-1]["task_id"] + 1

    new_task = {
        "task_id": new_id,
        "title": data["title"],
        "user_id": int(data["user_id"]),
        "priority": data["priority"],
        "due_date": data["due_date"],
        "status": "open"
    }

    tasks.append(new_task)
    save_tasks(tasks)

    return jsonify({"status": "success"})


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    tasks = load_tasks()
    tasks = [t for t in tasks if t["task_id"] != task_id]
    save_tasks(tasks)
    return jsonify({"status": "deleted"})


@app.route("/tasks/<int:task_id>/complete", methods=["PATCH"])
def complete_task(task_id):
    tasks = load_tasks()

    for task in tasks:
        if task["task_id"] == task_id:
            task["status"] = "completed"

    save_tasks(tasks)

    return jsonify({"status": "completed"})


if __name__ == "__main__":
    app.run(debug=True)
