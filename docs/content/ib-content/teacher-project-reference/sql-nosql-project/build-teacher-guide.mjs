import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const guideDir = path.join(__dirname, 'teacher-guide');

const read = async (relativePath) => {
  return fs.readFile(path.join(__dirname, relativePath), 'utf8');
};

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const joinList = (items, ordered = false) => {
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag} class="list-tight">${items.map((item) => `<li>${item}</li>`).join('')}</${tag}>`;
};

const qaTable = (rows) => `
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Prompt for the class</th>
          <th>Expected answer / direction</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            ([question, answer]) => `
              <tr>
                <td>${question}</td>
                <td>${answer}</td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  </div>
`;

const noteCard = (title, body) => `
  <section class="note-card">
    <h4>${title}</h4>
    ${body}
  </section>
`;

const buildStepCard = ({ step, fileName, title, intro = '', language, code, notes = [] }) => `
  <section class="step-card">
    <div class="step-top">
      <span class="step-number">Step ${step}</span>
      <div class="step-heading">
        <p class="kicker">Write this in ${fileName}</p>
        <h4>${title}</h4>
      </div>
    </div>
    ${intro ? `<p>${intro}</p>` : ''}
    <pre><code class="language-${language}">${escapeHtml(code)}</code></pre>
    ${notes.length ? noteCard('What this block does', joinList(notes)) : ''}
  </section>
`;

const buildStepsSection = ({ kicker, title, intro = '', steps = [] }) =>
  section({
    kicker,
    title,
    intro,
    content: `<div class="step-stack">${steps.map((step) => buildStepCard(step)).join('')}</div>`
  });

const codeCard = ({ fileName, language, code, notes = [], rawHref }) => `
  <section class="code-card">
    <header>
      <div>
        <p class="kicker">Whole file after this step</p>
        <h4>${fileName}</h4>
      </div>
      <div class="raw-links">
        <span class="file-badge">${language.toUpperCase()}</span>
        ${rawHref ? `<a class="card-link" href="${rawHref}">Open raw file</a>` : ''}
      </div>
    </header>
    <pre><code class="language-${language}">${escapeHtml(code)}</code></pre>
    ${notes.length ? noteCard('Teaching notes for this file', joinList(notes)) : ''}
  </section>
`;

const diagramCard = ({ title, svg, note }) => `
  <section class="note-card">
    <h4>${title}</h4>
    ${svg}
    ${note ? `<p>${note}</p>` : ''}
  </section>
`;

const section = ({ kicker, title, intro = '', content = '' }) => `
  <section class="lesson-section">
    <div class="section-head">
      ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
      <h2>${title}</h2>
      ${intro ? `<p>${intro}</p>` : ''}
    </div>
    ${content}
  </section>
`;

const hero = ({ stepLabel, title, summary, tags = [] }) => `
  <header class="hero">
    <p class="kicker">${stepLabel}</p>
    <h1>${title}</h1>
    <p>${summary}</p>
    ${tags.length ? `<div class="meta">${tags.map((tag) => `<span>${tag}</span>`).join('')}</div>` : ''}
  </header>
`;

const stageGroups = [
  {
    title: 'Planning and data modelling',
    pages: ['problem-specification', 'planning-and-answers', 'sql-schema', 'init-db']
  },
  {
    title: 'SQL feature build',
    pages: [
      'feature-base-html-shell',
      'feature-task-list-display',
      'feature-add-task-modal',
      'feature-form-inputs',
      'feature-fetch-render',
      'feature-create-task',
      'feature-delete-task',
      'feature-mark-complete',
      'feature-filter-sort',
      'testing-and-evidence'
    ]
  },
  {
    title: 'SL extension',
    pages: ['sl-tagging-algorithm', 'sl-database-extension']
  },
  {
    title: 'HL bridge',
    pages: ['hl-json-theory', 'hl-json-practice', 'hl-modelling-comparison']
  },
  {
    title: 'HL JSON build',
    pages: [
      'hl-json-backend-setup',
      'hl-json-fetch-render',
      'hl-json-create-task',
      'hl-json-delete-task',
      'hl-json-mark-complete',
      'hl-json-filter-sort',
      'hl-json-tagging'
    ]
  }
];

const layout = ({
  currentSlug,
  title,
  stepLabel,
  summary,
  body,
  assetBase,
  pageBase,
  homeHref,
  previous,
  next,
  home = false
}) => {
  const navMarkup = stageGroups
    .map((group) => {
      const hasCurrent = group.pages.includes(currentSlug);
      const links = group.pages
        .map((slug) => {
          const page = allPages.find((item) => item.slug === slug);
          if (!page) return '';
          return `
            <a class="nav-link ${slug === currentSlug ? 'is-current' : ''}" href="${pageBase}/${page.slug}.html">
              <strong>${page.navTitle}</strong>
              <small>${page.navSummary}</small>
            </a>
          `;
        })
        .join('');
      return `
        <details ${hasCurrent ? 'open' : ''}>
          <summary>${group.title}</summary>
          <div>${links}</div>
        </details>
      `;
    })
    .join('');

  const previousMarkup = previous
    ? `<a href="${pageBase}/${previous.slug}.html"><small>Previous</small><strong>${previous.navTitle}</strong></a>`
    : `<span class="is-disabled"><small>Previous</small><strong>Start of guide</strong></span>`;

  const nextMarkup = next
    ? `<a href="${pageBase}/${next.slug}.html"><small>Next</small><strong>${next.navTitle}</strong></a>`
    : `<span class="is-disabled"><small>Next</small><strong>End of guide</strong></span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | IB 2027 Teacher Guide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark-reasonable.min.css">
  <link rel="stylesheet" href="${assetBase}/teacher-guide.css">
</head>
<body>
  <div class="page">
    <aside class="sidebar">
      <a class="home-link" href="${homeHref}">Teacher guide home</a>
      <div>
        <p class="kicker">IB 2027 Teacher Guide</p>
        <h2>SQL / NoSQL project build</h2>
        <p class="muted">Use this as the teacher script: lesson intent, answer key, expected code state, and next step.</p>
      </div>
      ${navMarkup}
    </aside>
    <main class="content">
      ${hero({ stepLabel, title, summary, tags: home ? ['Teacher only', 'Local guide'] : ['Teacher only', 'Exact target state'] })}
      ${body}
      <nav class="lesson-nav">
        ${previousMarkup}
        <div class="nav-center">
          <small>Guide navigation</small>
          <strong>${title}</strong>
        </div>
        ${nextMarkup}
      </nav>
    </main>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
  <script src="${assetBase}/teacher-guide.js"></script>
</body>
</html>`;
};

const htmlShell = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Task Manager</title>
<link
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
rel="stylesheet">
</head>
<body>
<div class="container mt-5">
<h1 class="mb-4">Task Manager</h1>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="/static/index.js"></script>
</body>
</html>`;

const jsPlaceholder = `// JavaScript starts in the fetch and render lesson.`;

const htmlTaskList = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Task Manager</title>
<link
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
rel="stylesheet">
</head>
<body>
<div class="container mt-5">
<h1 class="mb-4">Task Manager</h1>
<ul id="taskList" class="list-group"></ul>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="/static/index.js"></script>
</body>
</html>`;

const htmlModalShell = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Task Manager</title>
<link
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
rel="stylesheet">
</head>
<body>
<div class="container mt-5">
<h1 class="mb-4">Task Manager</h1>
<button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#taskModal">
Add Task
</button>
<ul id="taskList" class="list-group"></ul>
</div>

<div class="modal fade" id="taskModal">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title">Create Task</h5>
<button class="btn-close" data-bs-dismiss="modal"></button>
</div>
<div class="modal-body">
<p class="text-muted mb-0">Form controls are added in the next step.</p>
</div>
<div class="modal-footer">
<button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
<button class="btn btn-primary">Save Task</button>
</div>
</div>
</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="/static/index.js"></script>
</body>
</html>`;

const htmlFilterSort = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Task Manager</title>
<link
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
rel="stylesheet">
</head>
<body>
<div class="container mt-5">
<h1 class="mb-4">Task Manager</h1>
<div class="d-flex flex-wrap gap-2 mb-3">
<select id="filterUser" class="form-select w-auto">
<option value="">All users</option>
</select>
<select id="filterPriority" class="form-select w-auto">
<option value="">All priorities</option>
<option value="Low">Low</option>
<option value="Medium">Medium</option>
<option value="High">High</option>
</select>
<select id="sortTasks" class="form-select w-auto">
<option value="newest">Newest first</option>
<option value="due_asc">Due date (earliest first)</option>
<option value="due_desc">Due date (latest first)</option>
<option value="priority_desc">Priority</option>
</select>
</div>
<button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#taskModal">
Add Task
</button>
<ul id="taskList" class="list-group"></ul>
</div>

<div class="modal fade" id="taskModal">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title">Create Task</h5>
<button class="btn-close" data-bs-dismiss="modal"></button>
</div>
<div class="modal-body">
<div class="mb-3">
<label class="form-label">Task Title</label>
<input id="taskTitle" class="form-control">
</div>
<div class="mb-3">
<label class="form-label">Assign User</label>
<select id="taskUser" class="form-select"></select>
</div>
<div class="mb-3">
<label class="form-label">Priority</label>
<select id="taskPriority" class="form-select">
<option value="Low">Low</option>
<option value="Medium">Medium</option>
<option value="High">High</option>
</select>
</div>
<div class="mb-3">
<label class="form-label">Due Date</label>
<input type="date" id="taskDate" class="form-control">
</div>
</div>
<div class="modal-footer">
<button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
<button class="btn btn-primary" id="saveTaskButton">Save Task</button>
</div>
</div>
</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="/static/index.js"></script>
</body>
</html>`;

const sqlAppFetchRender = `from flask import Flask, render_template, jsonify
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


if __name__ == "__main__":
    app.run(debug=True)`;

const jsFetchRender = `function loadUsers() {
    fetch("/users")
    .then(response => response.json())
    .then(users => {
        const select = document.getElementById("taskUser")
        select.innerHTML = ""

        for (let i = 0; i < users.length; i++) {
            const option = document.createElement("option")
            option.value = users[i].user_id
            option.textContent = users[i].username
            select.appendChild(option)
        }
    })
}

function loadTasks() {
    fetch("/tasks")
    .then(response => response.json())
    .then(tasks => {
        const list = document.getElementById("taskList")
        list.innerHTML = ""

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]

            const li = document.createElement("li")
            li.className = "list-group-item"
            li.textContent =
                task.title +
                " | " +
                task.username +
                " | " +
                task.priority +
                " | " +
                (task.due_date || "") +
                " | " +
                task.status

            list.appendChild(li)
        }
    })
}

loadUsers()
loadTasks()`;

const sqlAppCreate = `from flask import Flask, render_template, request, jsonify
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


if __name__ == "__main__":
    app.run(debug=True)`;

const jsCreate = `function loadUsers() {
    fetch("/users")
    .then(response => response.json())
    .then(users => {
        const select = document.getElementById("taskUser")
        select.innerHTML = ""

        for (let i = 0; i < users.length; i++) {
            const option = document.createElement("option")
            option.value = users[i].user_id
            option.textContent = users[i].username
            select.appendChild(option)
        }
    })
}

function loadTasks() {
    fetch("/tasks")
    .then(response => response.json())
    .then(tasks => {
        const list = document.getElementById("taskList")
        list.innerHTML = ""

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]

            const li = document.createElement("li")
            li.className = "list-group-item"
            li.textContent =
                task.title +
                " | " +
                task.username +
                " | " +
                task.priority +
                " | " +
                (task.due_date || "") +
                " | " +
                task.status

            list.appendChild(li)
        }
    })
}

document.getElementById("saveTaskButton").onclick = function () {
    const title = document.getElementById("taskTitle").value
    const user_id = document.getElementById("taskUser").value
    const priority = document.getElementById("taskPriority").value
    const due_date = document.getElementById("taskDate").value

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            user_id: user_id,
            priority: priority,
            due_date: due_date
        })
    })
    .then(() => loadTasks())
}

loadUsers()
loadTasks()`;

const sqlAppDelete = `from flask import Flask, render_template, request, jsonify
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


if __name__ == "__main__":
    app.run(debug=True)`;

const jsDelete = `function loadUsers() {
    fetch("/users")
    .then(response => response.json())
    .then(users => {
        const select = document.getElementById("taskUser")
        select.innerHTML = ""

        for (let i = 0; i < users.length; i++) {
            const option = document.createElement("option")
            option.value = users[i].user_id
            option.textContent = users[i].username
            select.appendChild(option)
        }
    })
}

function loadTasks() {
    fetch("/tasks")
    .then(response => response.json())
    .then(tasks => {
        const list = document.getElementById("taskList")
        list.innerHTML = ""

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]

            const li = document.createElement("li")
            li.className = "list-group-item d-flex justify-content-between align-items-center"

            const info = document.createElement("span")
            info.textContent =
                task.title +
                " | " +
                task.username +
                " | " +
                task.priority +
                " | " +
                (task.due_date || "") +
                " | " +
                task.status

            const deleteButton = document.createElement("button")
            deleteButton.textContent = "Delete"
            deleteButton.className = "btn btn-danger btn-sm ms-2"
            deleteButton.onclick = () => deleteTask(task.task_id)

            li.appendChild(info)
            li.appendChild(deleteButton)

            list.appendChild(li)
        }
    })
}

document.getElementById("saveTaskButton").onclick = function () {
    const title = document.getElementById("taskTitle").value
    const user_id = document.getElementById("taskUser").value
    const priority = document.getElementById("taskPriority").value
    const due_date = document.getElementById("taskDate").value

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            user_id: user_id,
            priority: priority,
            due_date: due_date
        })
    })
    .then(() => loadTasks())
}

function deleteTask(id) {
    fetch("/tasks/" + id, {
        method: "DELETE"
    })
    .then(() => loadTasks())
}

loadUsers()
loadTasks()`;

const sqlAppFilterSort = `from flask import Flask, render_template, request, jsonify
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
    user_id = request.args.get("user_id")
    priority = request.args.get("priority")
    sort = request.args.get("sort", "newest")

    order_map = {
        "newest": "tasks.task_id DESC",
        "due_asc": "tasks.due_date ASC, tasks.task_id DESC",
        "due_desc": "tasks.due_date DESC, tasks.task_id DESC",
        "priority_desc": "CASE tasks.priority WHEN 'High' THEN 1 WHEN 'Medium' THEN 2 ELSE 3 END, tasks.task_id DESC"
    }

    conn = get_db_connection()

    query = """
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
    """

    conditions = []
    params = []

    if user_id:
        conditions.append("tasks.user_id = ?")
        params.append(user_id)

    if priority:
        conditions.append("tasks.priority = ?")
        params.append(priority)

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY " + order_map.get(sort, order_map["newest"])

    tasks = conn.execute(query, params).fetchall()
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
    app.run(debug=True)`;

const jsFilterSort = `function loadUsers() {
    fetch("/users")
    .then(response => response.json())
    .then(users => {
        const taskUserSelect = document.getElementById("taskUser")
        const filterUserSelect = document.getElementById("filterUser")

        taskUserSelect.innerHTML = ""
        filterUserSelect.innerHTML = '<option value="">All users</option>'

        for (let i = 0; i < users.length; i++) {
            const option = document.createElement("option")
            option.value = users[i].user_id
            option.textContent = users[i].username
            taskUserSelect.appendChild(option)

            const filterOption = document.createElement("option")
            filterOption.value = users[i].user_id
            filterOption.textContent = users[i].username
            filterUserSelect.appendChild(filterOption)
        }
    })
}

function buildTaskQuery() {
    const params = new URLSearchParams()
    const userId = document.getElementById("filterUser").value
    const priority = document.getElementById("filterPriority").value
    const sort = document.getElementById("sortTasks").value

    if (userId) {
        params.set("user_id", userId)
    }

    if (priority) {
        params.set("priority", priority)
    }

    if (sort) {
        params.set("sort", sort)
    }

    const queryString = params.toString()
    return queryString ? "?" + queryString : ""
}

function loadTasks() {
    fetch("/tasks" + buildTaskQuery())
    .then(response => response.json())
    .then(tasks => {
        const list = document.getElementById("taskList")
        list.innerHTML = ""

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]

            const li = document.createElement("li")
            li.className = "list-group-item d-flex justify-content-between align-items-center"

            const info = document.createElement("span")
            info.textContent =
                task.title +
                " | " +
                task.username +
                " | " +
                task.priority +
                " | " +
                (task.due_date || "") +
                " | " +
                task.status

            const buttonGroup = document.createElement("div")

            const completeButton = document.createElement("button")
            completeButton.textContent = "Complete"
            completeButton.className = "btn btn-success btn-sm ms-2"
            completeButton.onclick = () => completeTask(task.task_id)

            const deleteButton = document.createElement("button")
            deleteButton.textContent = "Delete"
            deleteButton.className = "btn btn-danger btn-sm ms-2"
            deleteButton.onclick = () => deleteTask(task.task_id)

            buttonGroup.appendChild(completeButton)
            buttonGroup.appendChild(deleteButton)

            li.appendChild(info)
            li.appendChild(buttonGroup)

            list.appendChild(li)
        }
    })
}

document.getElementById("saveTaskButton").onclick = function () {
    const title = document.getElementById("taskTitle").value
    const user_id = document.getElementById("taskUser").value
    const priority = document.getElementById("taskPriority").value
    const due_date = document.getElementById("taskDate").value

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            user_id: user_id,
            priority: priority,
            due_date: due_date
        })
    })
    .then(() => loadTasks())
}

function deleteTask(id) {
    fetch("/tasks/" + id, {
        method: "DELETE"
    })
    .then(() => loadTasks())
}

function completeTask(id) {
    fetch("/tasks/" + id + "/complete", {
        method: "PATCH"
    })
    .then(() => loadTasks())
}

document.getElementById("filterUser").addEventListener("change", loadTasks)
document.getElementById("filterPriority").addEventListener("change", loadTasks)
document.getElementById("sortTasks").addEventListener("change", loadTasks)

loadUsers()
loadTasks()`;

const jsonAppFetchRender = `from flask import Flask, render_template, jsonify
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


if __name__ == "__main__":
    app.run(debug=True)`;

const jsonAppCreate = `from flask import Flask, render_template, request, jsonify
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


if __name__ == "__main__":
    app.run(debug=True)`;

const jsonAppDelete = `from flask import Flask, render_template, request, jsonify
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


if __name__ == "__main__":
    app.run(debug=True)`;

const jsonAppFilterSort = `from flask import Flask, render_template, request, jsonify
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
    user_map = {}

    for user in users:
        user_map[user["user_id"]] = user["username"]

    for task in tasks:
        task["username"] = user_map.get(task["user_id"], "Unknown")

    user_id = request.args.get("user_id")
    priority = request.args.get("priority")
    sort = request.args.get("sort", "newest")

    if user_id:
        tasks = [task for task in tasks if str(task["user_id"]) == str(user_id)]

    if priority:
        tasks = [task for task in tasks if task["priority"] == priority]

    if sort == "due_asc":
        tasks.sort(key=lambda task: task.get("due_date") or "9999-12-31")
    elif sort == "due_desc":
        tasks.sort(key=lambda task: task.get("due_date") or "", reverse=True)
    elif sort == "priority_desc":
        order = {"High": 1, "Medium": 2, "Low": 3}
        tasks.sort(key=lambda task: (order.get(task["priority"], 99), -task["task_id"]))
    else:
        tasks.sort(key=lambda task: task["task_id"], reverse=True)

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
    app.run(debug=True)`;

const genericJsonRead = `import json

with open("inventory.json") as f:
    items = json.load(f)

for item in items:
    print(item["name"], item["stock"])`;

const genericJsonWrite = `import json

new_item = {
    "name": "Glue sticks",
    "stock": 24,
    "location": "Cupboard B"
}

with open("inventory.json") as f:
    items = json.load(f)

items.append(new_item)

with open("inventory.json", "w") as f:
    json.dump(items, f, indent=4)`;

const genericInventoryJson = `[
  {
    "name": "Notebooks",
    "stock": 40,
    "location": "Shelf A"
  },
  {
    "name": "Pens",
    "stock": 120,
    "location": "Drawer 2"
  }
]`;

const modelAJson = `users.json
[
  {"user_id": 1, "username": "Alice"},
  {"user_id": 2, "username": "Bob"}
]

tasks.json
[
  {"task_id": 1, "title": "Prepare slides", "user_id": 1}
]`;

const modelBJson = `tasks.json
[
  {
    "task_id": 1,
    "title": "Prepare slides",
    "user": {
      "user_id": 1,
      "username": "Alice"
    }
  }
]`;

const jsonBackendSetup = `from flask import Flask, render_template
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


if __name__ == "__main__":
    app.run(debug=True)`;

const coreSchema = await read('sl-sql-core/schema.sql');
const initDb = await read('sl-sql-core/init_db.py');
const finalHtml = await read('sl-sql-core/templates/index.html');
const finalJs = await read('sl-sql-core/static/index.js');
const finalSqlApp = await read('sl-sql-core/app.py');
const taggingSchema = await read('sl-sql-tagging/schema.sql');
const taggingApp = await read('sl-sql-tagging/app.py');
const taggingAlgorithm = await read('sl-sql-tagging/tag_algorithm.py');
const jsonCoreApp = await read('hl-json-core/app.py');
const jsonCoreJs = await read('hl-json-core/static/index.js');
const jsonCoreHtml = await read('hl-json-core/templates/index.html');
const jsonUsers = await read('hl-json-core/data/users.json');
const jsonTasks = await read('hl-json-core/data/tasks.json');
const jsonTaggingApp = await read('hl-json-tagging/app.py');
const jsonTaggingAlgorithm = await read('hl-json-tagging/tag_algorithm.py');

const raw = (relativePath) => `../${relativePath}`;

const problemBrief = `
  <div class="callout">
    <p><strong>Client voice brief</strong></p>
    <p>Our team currently keeps track of jobs using spreadsheets and messages. This makes it hard to see who owns a task, when it is due, and whether it has been completed. We need one simple system that lets staff add tasks, assign responsibility, and see progress clearly.</p>
  </div>
`;

const planningWireframeSvg = `
  <svg class="diagram" viewBox="0 0 760 280" role="img" aria-label="Task list planning wireframe">
    <rect x="40" y="36" width="680" height="208" rx="20" fill="#ffffff" stroke="#0e214b" stroke-width="2"></rect>
    <rect x="78" y="72" width="170" height="34" rx="10" fill="#eef3ff" stroke="#c6d2f1"></rect>
    <rect x="266" y="72" width="170" height="34" rx="10" fill="#eef3ff" stroke="#c6d2f1"></rect>
    <rect x="454" y="72" width="150" height="34" rx="10" fill="#eef3ff" stroke="#c6d2f1"></rect>
    <rect x="618" y="72" width="70" height="34" rx="10" fill="#0e214b"></rect>
    <rect x="78" y="128" width="610" height="32" rx="10" fill="#f8faff" stroke="#d7deef"></rect>
    <rect x="78" y="174" width="610" height="32" rx="10" fill="#f8faff" stroke="#d7deef"></rect>
    <text x="120" y="95" font-family="Outfit" font-size="17" fill="#2a447e">Filter by assignee</text>
    <text x="308" y="95" font-family="Outfit" font-size="17" fill="#2a447e">Filter by priority</text>
    <text x="492" y="95" font-family="Outfit" font-size="17" fill="#2a447e">Sort by date</text>
    <text x="634" y="95" font-family="Outfit" font-size="17" fill="#ffffff">Add</text>
  </svg>
`;

const schemaErdSvg = `
  <svg class="diagram" viewBox="0 0 760 280" role="img" aria-label="Core SQL ERD">
    <rect x="50" y="40" width="240" height="150" rx="18" fill="#ffffff" stroke="#0e214b" stroke-width="2"></rect>
    <text x="80" y="78" fill="#0e214b" font-family="Outfit" font-size="26" font-weight="800">users</text>
    <text x="80" y="116" fill="#1f2430" font-family="Source Sans 3" font-size="22">PK user_id</text>
    <text x="80" y="148" fill="#1f2430" font-family="Source Sans 3" font-size="22">username</text>
    <rect x="470" y="40" width="240" height="190" rx="18" fill="#ffffff" stroke="#0e214b" stroke-width="2"></rect>
    <text x="500" y="78" fill="#0e214b" font-family="Outfit" font-size="26" font-weight="800">tasks</text>
    <text x="500" y="116" fill="#1f2430" font-family="Source Sans 3" font-size="22">PK task_id</text>
    <text x="500" y="148" fill="#1f2430" font-family="Source Sans 3" font-size="22">title</text>
    <text x="500" y="180" fill="#1f2430" font-family="Source Sans 3" font-size="22">FK user_id</text>
    <text x="500" y="212" fill="#1f2430" font-family="Source Sans 3" font-size="22">priority, due_date, status</text>
    <line x1="290" y1="116" x2="470" y2="116" stroke="#be9a5e" stroke-width="4"></line>
    <text x="336" y="98" fill="#7d5b21" font-family="Outfit" font-size="18" font-weight="800">1 : many</text>
  </svg>
`;

const taggingErdSvg = `
  <svg class="diagram" viewBox="0 0 920 360" role="img" aria-label="Extended SQL ERD with tagging">
    <rect x="40" y="40" width="220" height="150" rx="18" fill="#ffffff" stroke="#0e214b" stroke-width="2"></rect>
    <text x="66" y="76" fill="#0e214b" font-family="Outfit" font-size="24" font-weight="800">users</text>
    <text x="66" y="112" fill="#1f2430" font-family="Source Sans 3" font-size="20">PK user_id</text>
    <text x="66" y="142" fill="#1f2430" font-family="Source Sans 3" font-size="20">username</text>
    <rect x="350" y="40" width="240" height="190" rx="18" fill="#ffffff" stroke="#0e214b" stroke-width="2"></rect>
    <text x="378" y="76" fill="#0e214b" font-family="Outfit" font-size="24" font-weight="800">tasks</text>
    <text x="378" y="112" fill="#1f2430" font-family="Source Sans 3" font-size="20">PK task_id</text>
    <text x="378" y="142" fill="#1f2430" font-family="Source Sans 3" font-size="20">title</text>
    <text x="378" y="172" fill="#1f2430" font-family="Source Sans 3" font-size="20">FK user_id</text>
    <text x="378" y="202" fill="#1f2430" font-family="Source Sans 3" font-size="20">priority, due_date, status</text>
    <rect x="670" y="40" width="190" height="120" rx="18" fill="#ffffff" stroke="#0e214b" stroke-width="2"></rect>
    <text x="698" y="76" fill="#0e214b" font-family="Outfit" font-size="24" font-weight="800">tags</text>
    <text x="698" y="112" fill="#1f2430" font-family="Source Sans 3" font-size="20">PK tag_id</text>
    <text x="698" y="140" fill="#1f2430" font-family="Source Sans 3" font-size="20">tag_name</text>
    <rect x="620" y="220" width="240" height="110" rx="18" fill="#ffffff" stroke="#be9a5e" stroke-width="2"></rect>
    <text x="648" y="256" fill="#7d5b21" font-family="Outfit" font-size="24" font-weight="800">task_tags</text>
    <text x="648" y="286" fill="#1f2430" font-family="Source Sans 3" font-size="20">PK/FK task_id</text>
    <text x="648" y="314" fill="#1f2430" font-family="Source Sans 3" font-size="20">PK/FK tag_id</text>
    <line x1="260" y1="112" x2="350" y2="112" stroke="#be9a5e" stroke-width="4"></line>
    <text x="278" y="96" fill="#7d5b21" font-family="Outfit" font-size="16" font-weight="800">1 : many</text>
    <line x1="590" y1="180" x2="620" y2="248" stroke="#be9a5e" stroke-width="4"></line>
    <text x="552" y="228" fill="#7d5b21" font-family="Outfit" font-size="16" font-weight="800">1 : many</text>
    <line x1="730" y1="160" x2="740" y2="220" stroke="#be9a5e" stroke-width="4"></line>
    <text x="746" y="198" fill="#7d5b21" font-family="Outfit" font-size="16" font-weight="800">1 : many</text>
  </svg>
`;

const schemaUsersStep = `CREATE TABLE users (
    -- INTEGER PRIMARY KEY AUTOINCREMENT creates a unique id for each user.
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- NOT NULL means every user record must have a username.
    username TEXT NOT NULL
);`;

const schemaTasksStep = `CREATE TABLE tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    priority TEXT NOT NULL,
    due_date TEXT,
    status TEXT NOT NULL DEFAULT 'open',

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);`;

const initDbStep1 = `import sqlite3


def init_database():
    # conn is the live connection object to the SQLite database file.
    conn = sqlite3.connect("tasks.db")`;

const initDbStep2 = `    # Open the schema file and run all of its SQL in one go.
    with open("schema.sql") as f:
        conn.executescript(f.read())`;

const initDbStep3 = `    # Each tuple is one row to insert into the users table.
    users = [
        ("Alice",),
        ("Bob",),
        ("Charlie",)
    ]`;

const initDbStep4 = `    # executemany runs the same SQL once for each tuple in users.
    # The ? is a placeholder: SQLite safely swaps in each username value.
    conn.executemany(
        "INSERT INTO users (username) VALUES (?)",
        users
    )`;

const initDbStep5 = `    # commit saves the changes permanently.
    conn.commit()

    # close releases the database connection.
    conn.close()

    print("Database created successfully.")


if __name__ == "__main__":
    init_database()`;

const featureBaseHtmlStep1 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Task Manager</title>
</head>`;

const featureBaseHtmlStep2 = `    <!-- Bootstrap gives us ready-made layout and component styling. -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-4">Task Manager</h1>
    </div>`;

const featureBaseHtmlStep3 = `    <!-- Put scripts at the end so the page loads first. -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/static/index.js"></script>
</body>
</html>`;

const featureTaskListStep = `    <!-- This empty list is the render target JavaScript will fill later. -->
    <ul id="taskList" class="list-group"></ul>`;

const featureModalStep1 = `    <button
        class="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#taskModal">
        Add Task
    </button>`;

const featureModalStep2 = `    <div class="modal fade" id="taskModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create Task</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted mb-0">Form controls go here next.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary">Save Task</button>
                </div>
            </div>
        </div>
    </div>`;

const featureFormInputsStep1 = `                <div class="mb-3">
                    <label class="form-label">Task Title</label>
                    <input id="taskTitle" class="form-control">
                </div>`;

const featureFormInputsStep2 = `                <div class="mb-3">
                    <label class="form-label">Assign User</label>
                    <select id="taskUser" class="form-select"></select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Priority</label>
                    <select id="taskPriority" class="form-select">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Due Date</label>
                    <input type="date" id="taskDate" class="form-control">
                </div>`;

const featureFetchStep1 = `from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect("tasks.db")
    conn.row_factory = sqlite3.Row
    return conn`;

const featureFetchStep2 = `@app.route("/users", methods=["GET"])
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

    return jsonify(result)`;

const featureFetchStep3 = `@app.route("/tasks", methods=["GET"])
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

    return jsonify(result)`;

const featureFetchStep4 = `function loadUsers() {
    fetch("/users")
    .then(response => response.json())
    .then(users => {
        const select = document.getElementById("taskUser")
        select.innerHTML = ""

        for (let i = 0; i < users.length; i++) {
            const option = document.createElement("option")
            option.value = users[i].user_id
            option.textContent = users[i].username
            select.appendChild(option)
        }
    })
}

function loadTasks() {
    fetch("/tasks")
    .then(response => response.json())
    .then(tasks => {
        const list = document.getElementById("taskList")
        list.innerHTML = ""

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]

            const li = document.createElement("li")
            li.className = "list-group-item"
            li.textContent =
                task.title +
                " | " +
                task.username +
                " | " +
                task.priority +
                " | " +
                (task.due_date || "") +
                " | " +
                task.status

            list.appendChild(li)
        }
    })
}

loadUsers()
loadTasks()`;

const featureCreateStep1 = `from flask import Flask, render_template, request, jsonify`;

const featureCreateStep2 = `@app.route("/tasks", methods=["POST"])
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

    return jsonify({"status": "success"})`;

const featureCreateStep3 = `document.getElementById("saveTaskButton").onclick = function () {
    const title = document.getElementById("taskTitle").value
    const user_id = document.getElementById("taskUser").value
    const priority = document.getElementById("taskPriority").value
    const due_date = document.getElementById("taskDate").value

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            user_id: user_id,
            priority: priority,
            due_date: due_date
        })
    })
    .then(() => loadTasks())
}`;

const featureDeleteStep1 = `@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    conn = get_db_connection()

    conn.execute(
        "DELETE FROM tasks WHERE task_id = ?",
        (task_id,)
    )

    conn.commit()
    conn.close()

    return jsonify({"status": "deleted"})`;

const featureDeleteStep2 = `function deleteTask(id) {
    fetch("/tasks/" + id, {
        method: "DELETE"
    })
    .then(() => loadTasks())
}`;

const featureDeleteStep3 = `const deleteButton = document.createElement("button")
deleteButton.textContent = "Delete"
deleteButton.className = "btn btn-danger btn-sm ms-2"
deleteButton.onclick = () => deleteTask(task.task_id)

li.appendChild(deleteButton)`;

const featureCompleteStep1 = `@app.route("/tasks/<int:task_id>/complete", methods=["PATCH"])
def complete_task(task_id):
    conn = get_db_connection()

    conn.execute(
        "UPDATE tasks SET status = 'completed' WHERE task_id = ?",
        (task_id,)
    )

    conn.commit()
    conn.close()

    return jsonify({"status": "completed"})`;

const featureCompleteStep2 = `function completeTask(id) {
    fetch("/tasks/" + id + "/complete", {
        method: "PATCH"
    })
    .then(() => loadTasks())
}`;

const featureCompleteStep3 = `const completeButton = document.createElement("button")
completeButton.textContent = "Complete"
completeButton.className = "btn btn-success btn-sm ms-2"
completeButton.onclick = () => completeTask(task.task_id)

li.appendChild(completeButton)`;

const featureFilterStep1 = `    <div class="d-flex flex-wrap gap-2 mb-3">
        <select id="filterUser" class="form-select w-auto">
            <option value="">All users</option>
        </select>

        <select id="filterPriority" class="form-select w-auto">
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>

        <select id="sortTasks" class="form-select w-auto">
            <option value="newest">Newest first</option>
            <option value="due_asc">Due date (earliest first)</option>
            <option value="due_desc">Due date (latest first)</option>
            <option value="priority_desc">Priority</option>
        </select>
    </div>`;

const featureFilterStep2 = `function loadTasks() {
    const params = new URLSearchParams()

    const filterUser = document.getElementById("filterUser").value
    const filterPriority = document.getElementById("filterPriority").value
    const sortTasks = document.getElementById("sortTasks").value

    if (filterUser) params.set("user_id", filterUser)
    if (filterPriority) params.set("priority", filterPriority)
    if (sortTasks) params.set("sort", sortTasks)

    fetch("/tasks?" + params.toString())
}

document.getElementById("filterUser").onchange = loadTasks
document.getElementById("filterPriority").onchange = loadTasks
document.getElementById("sortTasks").onchange = loadTasks`;

const featureFilterStep3 = `@app.route("/tasks", methods=["GET"])
def get_tasks():
    user_id = request.args.get("user_id")
    priority = request.args.get("priority")
    sort = request.args.get("sort", "newest")

    sort_map = {
        "newest": "tasks.task_id DESC",
        "due_asc": "tasks.due_date ASC",
        "due_desc": "tasks.due_date DESC",
        "priority_desc": "tasks.priority DESC"
    }

    order_by = sort_map.get(sort, "tasks.task_id DESC")

    # The rest of the route builds the WHERE clause from the chosen filters
    # and then runs the query using the safe mapped order_by value.`;

const featurePage = ({
  stageLabel,
  navTitle,
  navSummary,
  title,
  slug,
  summary,
  studentOutcome,
  prompts,
  sqlSteps = [],
  sqlCards,
  sqlFlow,
  hlSummary,
  hlCards = [],
  watchFor = []
}) => ({
  slug,
  navTitle,
  navSummary,
  title,
  stepLabel: stageLabel,
  summary,
  body: [
    section({
      kicker: 'Teacher use on this page',
      title: 'Lesson focus, student target, and class answers',
      intro: 'Use this as the teaching script for the live build. Start with the outcome, then use the build steps below to write the code in order.',
      content: `<div class="content-stack">
        ${noteCard('What students should finish with', joinList(studentOutcome))}
        ${noteCard('Questions to ask and the answers you want', qaTable(prompts))}
      </div>`
    }),
    sqlSteps.length
      ? buildStepsSection({
          kicker: 'Live build order',
          title: 'Step-by-step code to write with the class',
          intro: 'Write these blocks in order. Each block is smaller than the final file so the teacher can explain what is happening before moving on.',
          steps: sqlSteps
        })
      : '',
    section({
      kicker: 'SQL lesson build',
      title: 'Final file state after this lesson',
      intro: 'Once the smaller blocks are written and explained, this is the exact file state you should expect by the end of the lesson.',
      content: `${sqlCards.join('')}${noteCard('How the files link in this lesson', `<p>${sqlFlow}</p>`)}`
    }),
    section({
      kicker: 'HL variation',
      title: 'What changes when HL rebuilds this feature with JSON',
      intro: hlSummary,
      content: `${hlCards.length ? hlCards.join('') : noteCard('HL note', '<p>The frontend stays the same here. Reuse the SQL HTML and JavaScript, then return to the HL backend pages when you swap out SQLite for JSON storage.</p>')}`
    }),
    watchFor.length
      ? section({
          kicker: 'Watch for',
          title: 'Common mistakes to stop early',
          content: noteCard('Teacher checks', joinList(watchFor))
        })
      : ''
  ].join('')
});

const allPages = [
  {
    slug: 'problem-specification',
    navTitle: 'Stage 1: Problem specification',
    navSummary: 'Client brief, success criteria, and answer key.',
    title: 'Stage 1: Problem specification',
    stepLabel: 'Stage 1',
    summary: 'Read the client brief with the class, pull out the inputs and outputs, and agree the success criteria before any technical design starts.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What this lesson is for',
        intro: 'Students should leave this lesson knowing what the system is meant to solve and what the finished product must be able to do.',
        content: `<div class="grid-2">
          ${noteCard('Teacher flow', joinList([
            'Read the problem brief aloud as if it has arrived from a client.',
            'Underline the operational problem, not the technical solution.',
            'Ask the class to list possible inputs and outputs.',
            'Convert those ideas into a set of measurable success criteria.'
          ], true))}
          ${noteCard('Expected student output', joinList([
            'A notebook list of likely fields such as title, user, priority, due date, and status.',
            'A list of visible outputs such as task rows, status text, and feedback after actions.',
            'A first draft of 6 to 10 success criteria.'
          ]))}
        </div>${problemBrief}`
      }),
      section({
        kicker: 'Teacher answer key',
        title: 'Questions and answers for this page',
        intro: 'These are the answers you are aiming to draw out when the class discusses the brief.',
        content: qaTable([
          ['What is the real problem here?', 'Task ownership and progress are unclear because work is split across spreadsheets and messages.'],
          ['What are the likely inputs?', 'Task title, assigned user, priority, and due date.'],
          ['What are the likely outputs?', 'A readable task list showing title, user, priority, due date, and status.'],
          ['What constraints can we infer?', 'The system must be simple, quick to use, and clear to non-technical staff.'],
          ['What success criteria should the class settle on?', 'Create, view, complete, delete, and later filter tasks, with persistent storage and clear presentation.']
        ])
      }),
      section({
        kicker: 'Success criteria',
        title: 'Teacher model answer',
        intro: 'This is the clean set of outcomes the class should move toward before planning begins.',
        content: noteCard('Suggested final criteria', joinList([
          'A user can create a task with a title, assignee, priority, and optional due date.',
          'The interface displays all current tasks clearly.',
          'The interface shows who owns each task.',
          'A user can mark a task as completed.',
          'A user can delete a task.',
          'The stored data persists after a refresh.',
          'The interface is simple enough to use without technical knowledge.',
          'The system can later be extended with automatically generated tags.'
        ], true))
      })
    ].join('')
  },
  {
    slug: 'planning-and-answers',
    navTitle: 'Stage 2: Planning and answers',
    navSummary: 'Wireframes, field mapping, and planning questions.',
    title: 'Stage 2: Planning the system',
    stepLabel: 'Stage 2',
    summary: 'Translate the brief into screen structure, field choices, and a test plan that will later become evidence.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What the class should do in this lesson',
        intro: 'The goal is to turn the client problem into visible screens and a set of data decisions.',
        content: `<div class="grid-2">
          ${noteCard('Teacher flow', joinList([
            'Show a task-list wireframe and ask what the user can see and do on that screen.',
            'Show an add-task modal wireframe and ask which fields are stored data and which are display-only labels.',
            'Map each visible input back to a likely database field.',
            'Start the test plan by turning success criteria into test statements.'
          ], true))}
          ${noteCard('Expected student output', joinList([
            'Annotated wireframes showing buttons, fields, and output areas.',
            'A field list linked to where each piece of data appears on screen.',
            'A first draft of the test table headings and a few test rows.'
          ]))}
        </div>${diagramCard({ title: 'Planning wireframe to show', svg: planningWireframeSvg, note: 'The list screen should lead the discussion because it reveals the most important data fields and actions.' })}`
      }),
      section({
        kicker: 'Answer key',
        title: 'Questions to ask and the direction to push them',
        intro: 'These are the common prompts from the student pages with the answers you want in notebooks or class discussion.',
        content: qaTable([
          ['Which fields must be mandatory?', 'Title, assigned user, and priority. Due date can be optional in version one.'],
          ['Where will the user view all tasks?', 'On the main list screen, not inside the modal.'],
          ['Where should completion happen?', 'On the task row itself, because completion is a state change on an existing record.'],
          ['What is display-only and what is stored?', 'Buttons, headings, and layout are display-only. Title, user, priority, due date, and status are stored.'],
          ['Why build the test table now?', 'It makes success criteria measurable before the class writes code.']
        ])
      }),
      section({
        kicker: 'Teacher model answers',
        title: 'Field mapping, table planning, and test-table examples',
        intro: 'Use these answers when students need a concrete target.',
        content: `<div class="content-stack">
          ${noteCard('Field mapping answer set', `<div class="table-wrap"><table><thead><tr><th>Field</th><th>Target table</th><th>Why it exists</th><th>Where it appears</th></tr></thead><tbody><tr><td><code>title</code></td><td><code>tasks</code></td><td>Identifies the work item</td><td>Task row and modal input</td></tr><tr><td><code>user_id</code></td><td><code>tasks</code></td><td>Links a task to one owner</td><td>Modal input, displayed later as username</td></tr><tr><td><code>username</code></td><td><code>users</code></td><td>Stores the user name once, not repeated on every task row</td><td>Rendered in the task row after the join</td></tr><tr><td><code>priority</code></td><td><code>tasks</code></td><td>Shows urgency</td><td>Modal input and task row</td></tr><tr><td><code>due_date</code></td><td><code>tasks</code></td><td>Supports planning</td><td>Modal input and task row</td></tr><tr><td><code>status</code></td><td><code>tasks</code></td><td>Shows whether work is finished</td><td>Task row</td></tr></tbody></table></div>`)}
          ${noteCard('Teacher table draft answer', `<div class="table-wrap"><table><thead><tr><th>Table</th><th>Fields to expect</th><th>Design decision</th></tr></thead><tbody><tr><td><code>users</code></td><td><code>user_id</code>, <code>username</code></td><td>Keep user names in one place so they are not duplicated in every task.</td></tr><tr><td><code>tasks</code></td><td><code>task_id</code>, <code>title</code>, <code>user_id</code>, <code>priority</code>, <code>due_date</code>, <code>status</code></td><td>Everything that changes per task belongs here.</td></tr></tbody></table></div><p>This is the first planning answer that should point directly into the table-building lesson.</p>`)}
          ${noteCard('Test table examples', `<div class="table-wrap"><table><thead><tr><th>Test</th><th>Input</th><th>Expected output</th></tr></thead><tbody><tr><td>Create a task</td><td>Valid title, user, priority, date</td><td>Task appears in the list</td></tr><tr><td>Delete a task</td><td>Click Delete</td><td>The chosen task disappears</td></tr><tr><td>Complete a task</td><td>Click Complete</td><td>Status changes to completed</td></tr></tbody></table></div>`)}
        </div>`
      })
    ].join('')
  },
  {
    slug: 'sql-schema',
    navTitle: 'Stage 3: SQL schema',
    navSummary: 'Core two-table schema, normalisation, and ERD.',
    title: 'Stage 3: SQL schema design',
    stepLabel: 'Stage 3',
    summary: 'Build the standard-level two-table model first. Tagging is not part of the core schema lesson.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What the class should understand before coding',
        intro: 'Students need to see how the planning fields become tables, keys, and relationships.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'A two-table ERD with users and tasks.',
            'A clear primary key for each table.',
            'A foreign key from tasks to users.',
            'An explanation of why usernames should not be repeated in every task row.'
          ]))}
          ${noteCard('Normalisation direction', joinList([
            '1NF: one value per field, no repeated groups.',
            '2NF: every non-key field depends on the whole key.',
            '3NF: user details belong in the users table, not repeated in tasks.'
          ]))}
        </div>${diagramCard({ title: 'Core ERD to draw on the board', svg: schemaErdSvg, note: 'This is the expected SL core design before the tagging extension exists.' })}`
      }),
      section({
        kicker: 'Answer key',
        title: 'Questions and answers for schema design',
        intro: 'Use these answers to guide the database conversation.',
        content: qaTable([
          ['Why is <code>user_id</code> a foreign key in tasks?', 'Because each task belongs to one user and the username should live in the users table.'],
          ['Why store <code>status</code> in tasks?', 'Because completion is a property of each task record.'],
          ['Why is <code>username</code> not repeated inside tasks?', 'That would duplicate data and create update problems.'],
          ['What is the relationship between users and tasks?', 'One user can have many tasks; each task belongs to one user.']
        ])
      }),
      section({
        kicker: 'Teacher target',
        title: 'Expected table definitions, field types, and constraints',
        intro: 'The ERD shows the logic. This section makes the physical schema explicit so the class sees what must appear in SQL.',
        content: `<div class="content-stack">
          ${noteCard('users table answer', `<div class="table-wrap"><table><thead><tr><th>Column</th><th>Type</th><th>Constraints</th><th>Why it is written this way</th></tr></thead><tbody><tr><td><code>user_id</code></td><td>INTEGER</td><td><code>PRIMARY KEY AUTOINCREMENT</code></td><td>Each user needs a unique numeric id generated automatically.</td></tr><tr><td><code>username</code></td><td>TEXT</td><td><code>NOT NULL</code></td><td>The app cannot create a usable user record without a name.</td></tr></tbody></table></div>`)}
          ${noteCard('tasks table answer', `<div class="table-wrap"><table><thead><tr><th>Column</th><th>Type</th><th>Constraints</th><th>Why it is written this way</th></tr></thead><tbody><tr><td><code>task_id</code></td><td>INTEGER</td><td><code>PRIMARY KEY AUTOINCREMENT</code></td><td>Each task needs its own unique id.</td></tr><tr><td><code>title</code></td><td>TEXT</td><td><code>NOT NULL</code></td><td>A task without a title is not meaningful.</td></tr><tr><td><code>user_id</code></td><td>INTEGER</td><td><code>NOT NULL</code>, <code>FOREIGN KEY</code></td><td>Every task must belong to one user.</td></tr><tr><td><code>priority</code></td><td>TEXT</td><td><code>NOT NULL</code></td><td>Priority is required for sorting and display.</td></tr><tr><td><code>due_date</code></td><td>TEXT</td><td>Optional</td><td>Version one allows tasks without a due date.</td></tr><tr><td><code>status</code></td><td>TEXT</td><td><code>NOT NULL DEFAULT 'open'</code></td><td>New tasks should automatically start as open.</td></tr></tbody></table></div>`)}
          ${noteCard('Constraint language to explain explicitly', joinList([
            '<code>PRIMARY KEY</code> means the value uniquely identifies the row.',
            '<code>AUTOINCREMENT</code> means SQLite generates the next id for us.',
            '<code>NOT NULL</code> means the column cannot be left empty in the database.',
            '<code>DEFAULT</code> gives a value automatically if the insert does not provide one.',
            '<code>FOREIGN KEY</code> enforces the relationship back to the users table.'
          ]))}
        </div>`
      }),
      buildStepsSection({
        kicker: 'Schema build order',
        title: 'Step-by-step schema to write on the board',
        intro: 'Treat the ERD and the SQL together: first agree the table idea, then write the SQL that makes it real.',
        steps: [
          {
            step: 1,
            fileName: 'schema.sql',
            title: 'Write the users table first',
            intro: 'Start with the simpler table so the class can focus on primary keys and required text fields.',
            language: 'sql',
            code: schemaUsersStep,
            notes: [
              'This is the cleanest place to explain <code>INTEGER PRIMARY KEY AUTOINCREMENT</code>.',
              'Tell the class that <code>username TEXT NOT NULL</code> means SQLite will reject a blank missing value at database level.'
            ]
          },
          {
            step: 2,
            fileName: 'schema.sql',
            title: 'Add the tasks table and relationship',
            intro: 'Only add the second table once the class already understands why users is separate.',
            language: 'sql',
            code: schemaTasksStep,
            notes: [
              'Point at <code>user_id INTEGER NOT NULL</code> and connect it back to the planning decision that every task must have an owner.',
              'Use <code>DEFAULT \'open\'</code> to show that the database can enforce sensible starting state.'
            ]
          }
        ]
      }),
      section({
        kicker: 'File to build',
        title: 'Exact schema file for the SQL core lesson',
        intro: 'This is the whole file students should end up with at this point in the build.',
        content: codeCard({
          fileName: 'schema.sql',
          language: 'sql',
          code: coreSchema,
          rawHref: raw('sl-sql-core/schema.sql'),
          notes: [
            'Keep the core schema to two tables at this point.',
            'Do not introduce tags yet; that belongs to the extension lessons.',
            'Make sure students can explain both primary keys and the single foreign key.'
          ]
        })
      })
    ].join('')
  },
  {
    slug: 'init-db',
    navTitle: 'Stage 3: init_db.py',
    navSummary: 'Create the database from schema.sql and seed users.',
    title: 'Stage 3: Database initialisation',
    stepLabel: 'Stage 3',
    summary: 'Once the schema exists, create the database file and seed the starting users before the web build begins.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'Why this sits before the Flask build',
        intro: 'Students should understand that the database must exist before the web app can read from it.',
        content: `<div class="grid-2">
          ${noteCard('Expected student understanding', joinList([
            'The schema file defines structure; it does not create the live database on its own.',
            'The initial users are seed data, not hard-coded interface content.',
            'Running <code>python init_db.py</code> is a one-time setup step for this stage.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['Why separate <code>schema.sql</code> from <code>init_db.py</code>?', 'Because structure definition and setup logic are different jobs.'],
            ['Why insert users here?', 'Because the interface needs real users to populate the assignee dropdown.'],
            ['When should this script run?', 'After the schema is written and before the app tries to query the database.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Syntax to explain',
        title: 'Important Python and SQLite ideas not to skip',
        intro: 'Students will not know this syntax yet, so the teacher page needs to make the hidden meaning explicit.',
        content: `<div class="content-stack">
          ${noteCard('Key terms for this file', `<div class="table-wrap"><table><thead><tr><th>Code</th><th>What it means</th><th>Why it matters here</th></tr></thead><tbody><tr><td><code>conn</code></td><td>The live connection object to the SQLite database</td><td>Every execute, commit, and close call happens through this object.</td></tr><tr><td><code>sqlite3.connect("tasks.db")</code></td><td>Open or create the database file</td><td>This is how Python starts talking to SQLite.</td></tr><tr><td><code>conn.executescript(...)</code></td><td>Run a whole block of SQL commands</td><td>Ideal for a schema file containing multiple statements.</td></tr><tr><td><code>conn.executemany(...)</code></td><td>Run one SQL statement repeatedly with different values</td><td>Useful for seeding several rows in one go.</td></tr><tr><td><code>?</code></td><td>A placeholder for a value supplied separately</td><td>It avoids building SQL by string concatenation and keeps inserts safe.</td></tr><tr><td><code>conn.commit()</code></td><td>Save the pending changes permanently</td><td>Without it, the inserted users may not persist.</td></tr><tr><td><code>conn.close()</code></td><td>Close the database connection</td><td>Always release the connection once the work is done.</td></tr></tbody></table></div>`)}
          ${noteCard('Teacher explanation of placeholders', '<p>The <code>?</code> symbol is not a mystery character. It marks where SQLite should safely insert the actual value from the tuple. In this file, each tuple in <code>users</code> has one value, so the SQL has one placeholder.</p>')}
        </div>`
      }),
      buildStepsSection({
        kicker: 'Live build order',
        title: 'Step-by-step code to write with the class',
        intro: 'Build this file in short blocks and stop to explain the new Python and SQLite syntax before moving on.',
        steps: [
          {
            step: 1,
            fileName: 'init_db.py',
            title: 'Import SQLite and open the database connection',
            intro: 'Start by showing that Python needs the sqlite3 module before it can talk to the database file.',
            language: 'python',
            code: initDbStep1,
            notes: [
              '<code>sqlite3.connect("tasks.db")</code> returns the connection object, which we store in <code>conn</code>.',
              'From this point onward, <code>conn</code> is the object that runs SQL and manages saving.'
            ]
          },
          {
            step: 2,
            fileName: 'init_db.py',
            title: 'Read schema.sql and execute the full script',
            intro: 'This is where the class turns the written schema into a real database structure.',
            language: 'python',
            code: initDbStep2,
            notes: [
              '<code>with open(...)</code> opens the file safely and closes it automatically when the block ends.',
              '<code>f.read()</code> gives SQLite the full text of the schema file.',
              '<code>executescript()</code> is used because the schema contains more than one SQL statement.'
            ]
          },
          {
            step: 3,
            fileName: 'init_db.py',
            title: 'Prepare the seed data as Python tuples',
            intro: 'Pause here to explain that Python is just building the values that will later be inserted into SQL.',
            language: 'python',
            code: initDbStep3,
            notes: [
              'Each tuple matches one row to insert.',
              'The trailing comma matters because <code>("Alice",)</code> is a one-item tuple, not just brackets around a string.'
            ]
          },
          {
            step: 4,
            fileName: 'init_db.py',
            title: 'Insert all user rows with placeholders',
            intro: 'This is the most important syntax moment in the file because it introduces parameterised SQL.',
            language: 'python',
            code: initDbStep4,
            notes: [
              '<code>executemany()</code> runs the same insert once for each tuple in <code>users</code>.',
              'The <code>?</code> placeholder is replaced by each username value in turn.',
              'This is safer and cleaner than building SQL strings by hand.'
            ]
          },
          {
            step: 5,
            fileName: 'init_db.py',
            title: 'Save, close, and make the file runnable',
            intro: 'End the lesson by making the script executable as a standalone setup step.',
            language: 'python',
            code: initDbStep5,
            notes: [
              '<code>commit()</code> permanently saves the changes.',
              '<code>if __name__ == "__main__"</code> means this setup only runs when the file itself is executed.'
            ]
          }
        ]
      }),
      section({
        kicker: 'File to build',
        title: 'Exact initialisation script',
        intro: 'This is the full file the class should have after the setup lesson.',
        content: codeCard({
          fileName: 'init_db.py',
          language: 'python',
          code: initDb,
          rawHref: raw('sl-sql-core/init_db.py'),
          notes: [
            'Open the schema file and execute it before inserting any data.',
            'Seed the users table so the modal select has something to show later.',
            'Run the script once, then check that <code>tasks.db</code> now exists.'
          ]
        })
      })
    ].join('')
  },
  featurePage({
    stageLabel: 'Implementation step 1',
    navTitle: 'Feature 1: Base HTML shell',
    navSummary: 'HTML boilerplate, Bootstrap links, and page shell.',
    title: 'Feature 1: Base HTML shell',
    slug: 'feature-base-html-shell',
    summary: 'Build the page shell first so students understand the document structure before any dynamic behaviour starts.',
    studentOutcome: [
      'The page loads with valid HTML boilerplate.',
      'Bootstrap CSS and JS are linked correctly.',
      'A titled container appears in the browser.'
    ],
    prompts: [
      ['What does <code>&lt;!DOCTYPE html&gt;</code> tell the browser?', 'It tells the browser to render the page in standards mode as an HTML5 document.'],
      ['Why does the Bootstrap CSS link go in the head?', 'Because the page should know its styles before the body is rendered.'],
      ['Why load the Bootstrap bundle near the end of the body?', 'So the document exists before the script enhances components like modals.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'templates/index.html',
        title: 'Write the HTML document skeleton',
        intro: 'Begin with the parts every HTML page needs before any app-specific content appears.',
        language: 'html',
        code: featureBaseHtmlStep1,
        notes: [
          '<code>&lt;!DOCTYPE html&gt;</code> tells the browser to use HTML5 rules.',
          '<code>lang="en"</code> helps accessibility tools understand the page language.',
          '<code>&lt;meta charset="UTF-8"&gt;</code> makes sure the page can display standard text characters correctly.'
        ]
      },
      {
        step: 2,
        fileName: 'templates/index.html',
        title: 'Add Bootstrap and the visible page shell',
        intro: 'Once the document exists, add the styling link and the first visible container.',
        language: 'html',
        code: featureBaseHtmlStep2,
        notes: [
          '<code>container</code> gives the page a centred Bootstrap layout.',
          '<code>mt-5</code> means margin-top size 5 and <code>mb-4</code> means margin-bottom size 4.',
          'The heading should already match the product the class is building.'
        ]
      },
      {
        step: 3,
        fileName: 'templates/index.html',
        title: 'Finish with the scripts',
        intro: 'Close the document properly and load the libraries the later lessons depend on.',
        language: 'html',
        code: featureBaseHtmlStep3,
        notes: [
          'Bootstrap bundle includes the JavaScript needed for components such as modals.',
          'Link <code>/static/index.js</code> now so the file path is already in place for later lessons.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'templates/index.html',
        language: 'html',
        code: htmlShell,
        notes: [
          'At this step the page is intentionally plain: do not add the task list or modal yet.',
          'The page title and main heading should already match the app the class is building.'
        ]
      }),
      codeCard({
        fileName: 'static/index.js',
        language: 'javascript',
        code: jsPlaceholder,
        notes: ['The JavaScript file exists from the start, but the lesson does not use it yet.']
      })
    ],
    sqlFlow: 'The browser can now load the base page template. Nothing is dynamic yet, but the HTML shell is in place for later DOM targets and Bootstrap components.',
    hlSummary: 'The HL version uses the exact same HTML shell. No backend change matters yet because the page is still static.',
    watchFor: [
      'Students forgetting to include the Bootstrap bundle script.',
      'Putting content outside the body element.',
      'Missing the link to <code>/static/index.js</code>, which will matter later.'
    ]
  }),
  featurePage({
    stageLabel: 'Implementation step 2',
    navTitle: 'Feature 2: Task list display area',
    navSummary: 'Add the DOM target where tasks will later render.',
    title: 'Feature 2: Task list display area',
    slug: 'feature-task-list-display',
    summary: 'Introduce the stable render target before any fetch logic is written.',
    studentOutcome: [
      'The page contains a task list container with a stable identifier.',
      'Students can explain why JavaScript needs a named DOM target.',
      'The interface still loads cleanly without data.'
    ],
    prompts: [
      ['Why add an <code>id</code> here?', 'So JavaScript can reliably find exactly the element it needs to update.'],
      ['Why create the empty list before writing JavaScript?', 'Because the script needs somewhere to place the rendered rows.'],
      ['Why is this called a render target?', 'Because it is the part of the page the code will fill with data later.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'templates/index.html',
        title: 'Add the task list render target',
        intro: 'Place this directly under the main heading so later JavaScript has one stable place to render the task rows.',
        language: 'html',
        code: featureTaskListStep,
        notes: [
          '<code>id="taskList"</code> gives JavaScript one exact element to find with <code>getElementById()</code>.',
          '<code>list-group</code> is a Bootstrap class that makes each later <code>li</code> feel like part of one component.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'templates/index.html',
        language: 'html',
        code: htmlTaskList,
        notes: [
          'Use a single clear target such as <code>taskList</code> rather than many tiny scattered targets.',
          'Leave it empty for now; the fetch/render lesson will fill it.'
        ]
      })
    ],
    sqlFlow: 'The HTML now exposes a render area. Later the JavaScript will find <code>#taskList</code>, clear it, and append rows based on the data returned from Flask.',
    hlSummary: 'No HL variation yet. The JSON track uses the same DOM target and the same HTML structure.',
    watchFor: [
      'Students naming the element one thing in HTML and another thing later in JavaScript.',
      'Using a generic class instead of a unique <code>id</code> when the script needs one exact target.'
    ]
  }),
  featurePage({
    stageLabel: 'Implementation step 3',
    navTitle: 'Feature 3: Add-task modal',
    navSummary: 'Add the button and modal shell before the input controls.',
    title: 'Feature 3: Add-task modal',
    slug: 'feature-add-task-modal',
    summary: 'Students now add the interaction shell for creating tasks, but the inputs themselves are still the next lesson.',
    studentOutcome: [
      'A visible Add Task button appears on the page.',
      'Clicking the button opens a Bootstrap modal shell.',
      'Students can identify the modal header, body, and footer.'
    ],
    prompts: [
      ['Why use a modal here?', 'Because task creation is a temporary focused interaction without leaving the main list page.'],
      ['Why keep the list page visible underneath?', 'The modal supports the main task view rather than replacing it.'],
      ['What belongs in the modal footer?', 'The action buttons such as cancel and save.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'templates/index.html',
        title: 'Add the button that opens the modal',
        intro: 'Start with the control the user clicks so the class can see how Bootstrap triggers work.',
        language: 'html',
        code: featureModalStep1,
        notes: [
          '<code>data-bs-toggle="modal"</code> tells Bootstrap what kind of component to open.',
          '<code>data-bs-target="#taskModal"</code> points to the modal id that should open.'
        ]
      },
      {
        step: 2,
        fileName: 'templates/index.html',
        title: 'Write the modal shell',
        intro: 'Only add the wrapper structure in this lesson. The form controls are the next deliberate step.',
        language: 'html',
        code: featureModalStep2,
        notes: [
          'Teach the hierarchy: modal, modal-dialog, modal-content, then header, body, and footer.',
          'The body is intentionally simple at this stage so students separate structure from inputs.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'templates/index.html',
        language: 'html',
        code: htmlModalShell,
        notes: [
          'Teach the Bootstrap attributes here: <code>data-bs-toggle</code> and <code>data-bs-target</code>.',
          'The modal body can be empty for one lesson; inputs are the next deliberate step.'
        ]
      })
    ],
    sqlFlow: 'The Bootstrap bundle reads the modal markup and turns the button click into a working popup. No custom JavaScript is needed for the open/close behaviour yet.',
    hlSummary: 'The HL version keeps the same modal shell. The storage model does not affect this part of the interface.',
    watchFor: [
      'Missing a modal <code>id</code> that matches the button target.',
      'Forgetting the Bootstrap bundle, which makes the modal appear not to work.'
    ]
  }),
  featurePage({
    stageLabel: 'Implementation step 4',
    navTitle: 'Feature 4: Form inputs',
    navSummary: 'Add the exact fields the schema needs.',
    title: 'Feature 4: Form inputs',
    slug: 'feature-form-inputs',
    summary: 'This is where the interface catches up with the schema. Every input should map directly to planned data.',
    studentOutcome: [
      'The modal contains title, user, priority, and due date controls.',
      'Each control has a clear label and a stable identifier.',
      'Students can explain which input maps to which field in storage.'
    ],
    prompts: [
      ['Why is the assignee control a <code>select</code> and not a plain text input?', 'Because users already exist as stored records and the task should reference one of them.'],
      ['Why is due date an input of type <code>date</code>?', 'Because the browser can provide a date picker and the value is already structured correctly.'],
      ['What do the input <code>id</code> values do?', 'They let JavaScript read each value later when the form is submitted.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'templates/index.html',
        title: 'Add the task title input group',
        intro: 'Start with the simplest text field and make the label-input relationship explicit.',
        language: 'html',
        code: featureFormInputsStep1,
        notes: [
          '<code>label</code> explains the field to the user.',
          '<code>id="taskTitle"</code> is what JavaScript will later use to read the typed value.'
        ]
      },
      {
        step: 2,
        fileName: 'templates/index.html',
        title: 'Add assignee, priority, and due-date controls',
        intro: 'These controls should map directly back to the planned database fields.',
        language: 'html',
        code: featureFormInputsStep2,
        notes: [
          'The user select starts empty because JavaScript will populate it from the database.',
          'Priority is a fixed set of choices, so a select is more appropriate than free text.',
          'Due date uses a browser date input so students see that HTML can help with basic validation and format.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'templates/index.html',
        language: 'html',
        code: finalHtml,
        rawHref: raw('sl-sql-core/templates/index.html'),
        notes: [
          'The modal is now complete enough for JavaScript to read values later.',
          'This page is a good moment to reinforce HTML validation versus later JavaScript and backend validation.'
        ]
      })
    ],
    sqlFlow: 'The HTML now contains every input the backend will need: title, user_id, priority, and due_date. The next step is to fetch stored data and render it.',
    hlSummary: 'The same form is reused in HL. The difference later is what the backend does with the submitted JSON payload.',
    watchFor: [
      'Students giving the form controls different <code>id</code> names to the names the JavaScript will later use.',
      'Using a text input for user instead of a select tied to existing records.'
    ]
  }),
  featurePage({
    stageLabel: 'Implementation step 5',
    navTitle: 'Feature 5: Fetch and render',
    navSummary: 'GET routes plus JavaScript rendering.',
    title: 'Feature 5: Fetch users and render tasks',
    slug: 'feature-fetch-render',
    summary: 'This is the first full-stack lesson: Flask serves JSON, JavaScript receives it, and the DOM is updated with live data.',
    studentOutcome: [
      'Students can explain the route <code>/users</code> and route <code>/tasks</code>.',
      'The assignee select is populated from the database.',
      'The task list renders rows from returned JSON.'
    ],
    prompts: [
      ['Why does Flask return JSON here instead of HTML?', 'Because the page is already loaded; JavaScript only needs the data so it can render the list dynamically.'],
      ['What does <code>response.json()</code> do in JavaScript?', 'It converts the HTTP response body into a JavaScript object or array.'],
      ['Why do we fetch users separately from tasks?', 'Because the assignee dropdown and the task list need different datasets.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'app.py',
        title: 'Add Flask setup and the database connection helper',
        intro: 'Before any route can read data, the app needs a reusable way to connect to SQLite.',
        language: 'python',
        code: featureFetchStep1,
        notes: [
          '<code>jsonify</code> turns Python dictionaries and lists into JSON responses.',
          '<code>row_factory = sqlite3.Row</code> lets the class access query results by column name instead of position.'
        ]
      },
      {
        step: 2,
        fileName: 'app.py',
        title: 'Write the users route',
        intro: 'This is the simplest read route, so teach it before the joined task query.',
        language: 'python',
        code: featureFetchStep2,
        notes: [
          '<code>fetchall()</code> returns every matching row.',
          'The loop converts SQLite rows into plain Python dictionaries ready for JSON.'
        ]
      },
      {
        step: 3,
        fileName: 'app.py',
        title: 'Write the task-list route with the join',
        intro: 'Only once the class understands one-table reads should you add the joined task query.',
        language: 'python',
        code: featureFetchStep3,
        notes: [
          'This is the key join lesson: task data and username are combined before the frontend receives them.',
          'Use the SQL result to explain why usernames are not repeated inside the tasks table.'
        ]
      },
      {
        step: 4,
        fileName: 'static/index.js',
        title: 'Write the JavaScript loader functions',
        intro: 'Now connect the page to the routes by fetching the JSON and preparing the render area.',
        language: 'javascript',
        code: featureFetchStep4,
        notes: [
          '<code>response.json()</code> reads the response body and turns it into a JavaScript structure.',
          '<code>const</code> creates a variable that should not be reassigned.',
          '<code>document.createElement()</code> builds DOM nodes in JavaScript instead of hard-coding them in HTML.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: sqlAppFetchRender,
        notes: [
          'This is the first point where <code>get_db_connection()</code> is essential.',
          'Students should notice that the task query joins users so the frontend receives usernames for display.'
        ]
      }),
      codeCard({
        fileName: 'static/index.js',
        language: 'javascript',
        code: jsFetchRender,
        notes: [
          'Keep this lesson focused on reading and rendering only. Do not add create/delete/complete behaviour yet.',
          'Use this page to teach <code>fetch</code>, promises, <code>const</code>, and DOM creation with <code>document.createElement()</code>. '
        ]
      })
    ],
    sqlFlow: 'The browser loads the template, JavaScript calls <code>/users</code> and <code>/tasks</code>, Flask runs SQL queries, and the returned JSON is rendered into the select and list.',
    hlSummary: 'When HL reaches this same feature, the frontend stays the same. Only the backend swaps from SQL queries to JSON file reading.',
    hlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: jsonAppFetchRender,
        rawHref: raw('hl-json-core/app.py'),
        notes: [
          'This is where HL sees the first backend swap: lists and dictionaries replace SQL query results.',
          'Point out that the route names stay the same even though the storage layer changes.'
        ]
      }),
      codeCard({
        fileName: 'data/users.json',
        language: 'json',
        code: jsonUsers,
        rawHref: raw('hl-json-core/data/users.json'),
        notes: ['HL needs this seed user file before the assignee dropdown can populate.']
      }),
      codeCard({
        fileName: 'data/tasks.json',
        language: 'json',
        code: jsonTasks,
        rawHref: raw('hl-json-core/data/tasks.json'),
        notes: ['The tasks file starts as an empty array, which is the JSON equivalent of an empty table.']
      })
    ],
    watchFor: [
      'Students forgetting that the JavaScript render target must already exist in HTML.',
      'Returning raw SQLite rows without converting them into JSON-safe dictionaries.',
      'Trying to teach GET, POST, and DOM creation all in the same lesson. Keep this one strictly read/render.'
    ]
  }),
  featurePage({
    stageLabel: 'Implementation step 6',
    navTitle: 'Feature 6: Create a task',
    navSummary: 'POST route and Save button handler.',
    title: 'Feature 6: Create a task',
    slug: 'feature-create-task',
    summary: 'Connect the modal to the backend so a submitted form creates a new task record and refreshes the list.',
    studentOutcome: [
      'The Save button sends the form values to the backend.',
      'The backend inserts a new task into storage.',
      'The refreshed list shows the newly created task.'
    ],
    prompts: [
      ['Why is this a POST request?', 'Because the client is sending new data to be stored.'],
      ['What does <code>request.get_json()</code> do?', 'It reads the JSON body sent by the browser and turns it into a Python dictionary.'],
      ['Why call <code>loadTasks()</code> after saving?', 'Because the DOM must be refreshed to show the new record.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'app.py',
        title: 'Import request so Flask can read incoming JSON',
        intro: 'This small import matters because GET-only routes do not need it, but POST routes do.',
        language: 'python',
        code: featureCreateStep1,
        notes: [
          '<code>request</code> gives Flask access to the incoming HTTP request data.'
        ]
      },
      {
        step: 2,
        fileName: 'app.py',
        title: 'Write the POST route that inserts a task',
        intro: 'Build the route from input reading, then the insert, then the JSON response.',
        language: 'python',
        code: featureCreateStep2,
        notes: [
          '<code>request.get_json()</code> turns the incoming JSON body into a Python dictionary.',
          'The four <code>?</code> placeholders match the four values in the tuple.',
          'The response can be small because the frontend will simply reload the task list afterwards.'
        ]
      },
      {
        step: 3,
        fileName: 'static/index.js',
        title: 'Wire the Save button to the POST request',
        intro: 'Collect the values from the modal, turn them into JSON, and send them to the backend.',
        language: 'javascript',
        code: featureCreateStep3,
        notes: [
          '<code>JSON.stringify()</code> converts the JavaScript object into a JSON string for the request body.',
          '<code>Content-Type: application/json</code> tells Flask how to interpret the body.',
          'Refreshing with <code>loadTasks()</code> means the page always reflects stored data, not guessed UI state.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: sqlAppCreate,
        notes: [
          'This is the first write operation against the database.',
          'Keep the route focused: read JSON, insert data, commit, return a small success response.'
        ]
      }),
      codeCard({
        fileName: 'static/index.js',
        language: 'javascript',
        code: jsCreate,
        notes: [
          'The save handler is the bridge from modal inputs to the backend route.',
          'Use this lesson to explain how object keys in JavaScript match the keys the Flask route expects.'
        ]
      })
    ],
    sqlFlow: 'The modal gathers input values, JavaScript packages them as JSON, Flask reads the payload, inserts the row into SQL, then the frontend reloads the tasks.',
    hlSummary: 'The save handler stays the same in HL. Only the backend changes from SQL insertion to appending a new JSON object to <code>tasks.json</code>.',
    hlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: jsonAppCreate,
        rawHref: raw('hl-json-core/app.py'),
        notes: [
          'HL students should compare <code>new_id</code> generation here with SQL auto-increment in the SL route.',
          'This is the clean point to discuss what the database usually does for you automatically.'
        ]
      })
    ],
    watchFor: [
      'Students forgetting to set the JSON content type header.',
      'Students sending the value from the wrong input id.',
      'For HL, students forgetting to convert <code>user_id</code> into an integer before storing it.'
    ]
  }),
  featurePage({
    stageLabel: 'Implementation step 7',
    navTitle: 'Feature 7: Delete a task',
    navSummary: 'Identifier-based deletion in JS and Flask.',
    title: 'Feature 7: Delete a task',
    slug: 'feature-delete-task',
    summary: 'Students now add the first record-removal action and see why identifiers matter.',
    studentOutcome: [
      'Each rendered row has a Delete button.',
      'The delete request targets the correct task id.',
      'The list refreshes and no longer shows the removed task.'
    ],
    prompts: [
      ['Why does the delete route need <code>task_id</code>?', 'Because the backend must know exactly which record to remove.'],
      ['Why attach the button handler inside the render loop?', 'Because each button must delete the specific task on that row.'],
      ['What would go wrong if the frontend did not refresh after deletion?', 'The data would be gone in storage but still visible in the interface.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'app.py',
        title: 'Add the DELETE route in Flask',
        intro: 'Keep the route small: accept the id, run the delete query, save the change, return a simple response.',
        language: 'python',
        code: featureDeleteStep1,
        notes: [
          '<code>&lt;int:task_id&gt;</code> means Flask extracts the id from the URL and converts it to an integer.',
          'The tuple <code>(task_id,)</code> needs the trailing comma because it has one value.'
        ]
      },
      {
        step: 2,
        fileName: 'static/index.js',
        title: 'Write the JavaScript delete function',
        intro: 'This small function sends the request and then reloads the list from the backend.',
        language: 'javascript',
        code: featureDeleteStep2,
        notes: [
          'The browser does not decide what deletion means; it simply asks the backend to delete one id.'
        ]
      },
      {
        step: 3,
        fileName: 'static/index.js',
        title: 'Add the Delete button while rendering each task',
        intro: 'Place the button creation inside the render loop so every task row has its own action.',
        language: 'javascript',
        code: featureDeleteStep3,
        notes: [
          'The arrow function stores the task-specific id at the moment the button is created.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: sqlAppDelete,
        notes: [
          'This is a strong lesson for path parameters such as <code>/tasks/&lt;int:task_id&gt;</code>.',
          'Remind students that delete changes the stored data, not just the interface.'
        ]
      }),
      codeCard({
        fileName: 'static/index.js',
        language: 'javascript',
        code: jsDelete,
        notes: [
          'The render loop now creates action buttons, not just text.',
          'This page is a good moment to discuss arrow functions and why they are useful for event callbacks.'
        ]
      })
    ],
    sqlFlow: 'The rendered task row now includes its own delete action. JavaScript sends the task id in the URL, Flask deletes the matching row, and the list reloads.',
    hlSummary: 'The frontend remains the same in HL. The JSON backend changes by filtering the array and rewriting the file.',
    hlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: jsonAppDelete,
        rawHref: raw('hl-json-core/app.py'),
        notes: [
          'This is the cleanest HL comparison with SQL deletion: the end-user action is the same, but the storage operation is a list rewrite rather than a SQL statement.'
        ]
      })
    ],
    watchFor: [
      'Students placing the delete button outside the loop so every row shares the wrong id.',
      'Deleting from the DOM but forgetting to delete from storage.',
      'For HL, rebuilding the array incorrectly and losing unrelated tasks.'
    ]
  }),
  featurePage({
    stageLabel: 'Implementation step 8',
    navTitle: 'Feature 8: Mark complete',
    navSummary: 'Status updates and PATCH route.',
    title: 'Feature 8: Mark a task complete',
    slug: 'feature-mark-complete',
    summary: 'Students add record updates and see that not every change is a new insert or a deletion.',
    studentOutcome: [
      'Each row has a Complete button.',
      'The stored status changes to completed.',
      'The list refresh shows the updated state.'
    ],
    prompts: [
      ['Why is this an update, not a new record?', 'Because the task already exists; only one field is changing.'],
      ['Why is PATCH a sensible HTTP method here?', 'Because it signals a partial update to an existing resource.'],
      ['Why keep <code>status</code> in the database or JSON file instead of only changing the UI?', 'Because completion must persist after refresh and be available for later queries.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'app.py',
        title: 'Add the PATCH route that updates status',
        intro: 'Teach this as a small targeted update rather than a whole-row rewrite.',
        language: 'python',
        code: featureCompleteStep1,
        notes: [
          '<code>UPDATE</code> changes an existing row rather than inserting a new one.',
          'This is a good point to explain why status was designed as a field in the tasks table.'
        ]
      },
      {
        step: 2,
        fileName: 'static/index.js',
        title: 'Write the JavaScript helper that sends the PATCH request',
        intro: 'Like delete, this function is intentionally small: send the request, then refresh the list.',
        language: 'javascript',
        code: featureCompleteStep2,
        notes: [
          'The method name matters because it tells the backend what kind of change is being requested.'
        ]
      },
      {
        step: 3,
        fileName: 'static/index.js',
        title: 'Add the Complete button to each task row',
        intro: 'Render the button inside the task loop so it can target one specific task id.',
        language: 'javascript',
        code: featureCompleteStep3,
        notes: [
          'Students should compare this to the Delete button and notice the shared pattern.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: finalSqlApp,
        rawHref: raw('sl-sql-core/app.py'),
        notes: [
          'This is the full SQL core backend state after the CRUD lessons are complete.',
          'It is a good point to pause and make students trace one full request from button click to SQL update and back to the UI.'
        ]
      }),
      codeCard({
        fileName: 'static/index.js',
        language: 'javascript',
        code: finalJs,
        rawHref: raw('sl-sql-core/static/index.js'),
        notes: [
          'This is the full SQL core frontend state after create, delete, and complete are all working.',
          'Notice that the interface actions all end by calling <code>loadTasks()</code> again.'
        ]
      })
    ],
    sqlFlow: 'The complete button triggers a PATCH request. Flask updates the status field in storage, then JavaScript refreshes the displayed list so the state stays honest.',
    hlSummary: 'In HL the interface is unchanged. The backend now updates the <code>status</code> field inside the correct JSON object and writes the file back.',
    hlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: jsonCoreApp,
        rawHref: raw('hl-json-core/app.py'),
        notes: [
          'This is the full HL JSON core backend after create, delete, and complete all exist.',
          'Use this page to compare SQL update statements with a loop that mutates one JSON object in memory.'
        ]
      })
    ],
    watchFor: [
      'Students forgetting to save the JSON file after changing the status in HL.',
      'Updating the DOM text only, instead of persisting the new status in storage.'
    ]
  }),
  featurePage({
    stageLabel: 'Implementation step 9',
    navTitle: 'Feature 9: Filtering and sorting',
    navSummary: 'Teacher target for conditional reads and ordered output.',
    title: 'Feature 9: Filtering and sorting',
    slug: 'feature-filter-sort',
    summary: 'This is the first lesson after core CRUD where the class uses query parameters and conditional retrieval rather than just reading everything.',
    studentOutcome: [
      'The page contains filter controls for user and priority plus a sort control.',
      'Changing those controls reloads the task list with the chosen conditions.',
      'Students can explain that filtering changes the read query, not the stored data.'
    ],
    prompts: [
      ['Why put filter values into the query string?', 'Because the frontend is describing how it wants the backend to return the data.'],
      ['Why does filtering belong in the GET route?', 'Because it changes how records are read, not how they are stored.'],
      ['Why are HTML and JavaScript validation useful but not enough?', 'Because a client could bypass them; the backend must still control the final data handling and query logic.']
    ],
    sqlSteps: [
      {
        step: 1,
        fileName: 'templates/index.html',
        title: 'Add the filter and sort controls above the list',
        intro: 'Put the read controls near the task list because they change what the list shows.',
        language: 'html',
        code: featureFilterStep1,
        notes: [
          'These controls change the query, not the stored data.',
          'The user filter starts empty and is populated from the same user data already loaded for the modal.'
        ]
      },
      {
        step: 2,
        fileName: 'static/index.js',
        title: 'Turn the selected controls into query parameters',
        intro: 'Teach <code>URLSearchParams</code> here so the class sees how the browser describes a filtered read request.',
        language: 'javascript',
        code: featureFilterStep2,
        notes: [
          'Only add parameters when the user has actually chosen a value.',
          'This keeps the request URL clean and predictable.'
        ]
      },
      {
        step: 3,
        fileName: 'app.py',
        title: 'Read the query parameters and map safe sort options',
        intro: 'The backend owns the final query logic, so this is where filtering and ordering become real.',
        language: 'python',
        code: featureFilterStep3,
        notes: [
          '<code>request.args</code> reads the query string values sent by the browser.',
          'The sort map is important because it whitelists safe ORDER BY options rather than trusting raw client input.'
        ]
      }
    ],
    sqlCards: [
      codeCard({
        fileName: 'templates/index.html',
        language: 'html',
        code: htmlFilterSort,
        notes: [
          'The filter bar sits above the Add Task button so the list tools are visible before data is rendered.',
          'The modal stays the same as the previous lesson.'
        ]
      }),
      codeCard({
        fileName: 'static/index.js',
        language: 'javascript',
        code: jsFilterSort,
        notes: [
          'This lesson is ideal for teaching <code>URLSearchParams</code>.',
          'The same <code>loadTasks()</code> function now supports different read conditions without changing the render logic.'
        ]
      }),
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: sqlAppFilterSort,
        notes: [
          'This is a teacher target state, because the supplied anchor code did not include filtering and sorting yet.',
          'Use <code>request.args</code> to read query parameters and map sort names to safe ORDER BY fragments.'
        ]
      })
    ],
    sqlFlow: 'HTML provides the filter controls, JavaScript converts the selected values into query parameters, and Flask applies them when building the SQL query before returning the result set.',
    hlSummary: 'The same frontend can be reused in HL. The JSON backend filters and sorts lists in Python rather than delegating the work to SQL.',
    hlCards: [
      codeCard({
        fileName: 'app.py',
        language: 'python',
        code: jsonAppFilterSort,
        notes: [
          'This is the HL teacher target for the filter/sort lesson.',
          'Use it to compare database-side ordering with list operations and Python sort keys.'
        ]
      })
    ],
    watchFor: [
      'Students hard-coding sort logic in JavaScript instead of teaching the backend to own the returned order.',
      'Unsafe SQL string building without a whitelist for ORDER BY.',
      'For HL, sorting missing due dates without deciding where empty values should appear.'
    ]
  }),
  {
    slug: 'testing-and-evidence',
    navTitle: 'Feature 10: Testing and evidence',
    navSummary: 'Use the earlier success criteria as the assessment checkpoint.',
    title: 'Feature 10: Testing and evidence',
    stepLabel: 'Implementation step 10',
    summary: 'Close the core build by turning the original criteria into evidence. This is the teacher checkpoint before the extension lessons.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What this lesson should produce',
        intro: 'Students should not just say the app works. They should produce evidence against the criteria agreed at the beginning.',
        content: `<div class="grid-2">
          ${noteCard('Expected student evidence', joinList([
            'A completed test table with actual outputs and pass/fail judgements.',
            'Short explanations linking each test to one of the original success criteria.',
            'Screenshots or live demonstrations of the working create, delete, complete, and read features.'
          ]))}
          ${noteCard('Teacher prompts and answers', qaTable([
            ['Why revisit the original criteria now?', 'Because evaluation only means something if it traces back to the original problem and success measures.'],
            ['What counts as good evidence?', 'A concrete test, a real input, a visible result, and a clear judgement.'],
            ['What should happen if a test fails?', 'The class should record the failure honestly and identify what needs fixing.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Teacher model',
        title: 'Example completed test entries',
        intro: 'Use this as the standard the class should reach when filling the test plan.',
        content: `<div class="table-wrap"><table><thead><tr><th>Test</th><th>Input</th><th>Expected output</th><th>Actual output</th><th>Pass / Fail</th></tr></thead><tbody><tr><td>Create a task</td><td>Prepare report, Alice, High, 2026-03-10</td><td>Task appears at the top of the list</td><td>Task appears at the top with the correct fields</td><td>Pass</td></tr><tr><td>Delete a task</td><td>Delete the newest task</td><td>Task is removed and does not return after refresh</td><td>Task disappears and stays deleted</td><td>Pass</td></tr><tr><td>Complete a task</td><td>Click Complete on an open task</td><td>Status changes to completed</td><td>Status changes and persists after reload</td><td>Pass</td></tr></tbody></table></div>`
      })
    ].join('')
  },
  {
    slug: 'sl-tagging-algorithm',
    navTitle: 'SL extension: Tagging algorithm',
    navSummary: 'Plain-English logic, Python function, and integration point.',
    title: 'SL extension: Tagging algorithm',
    stepLabel: 'Stage 5',
    summary: 'Once the core task manager works, introduce the non-standard algorithm as a separate design lesson before changing the database.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'Run this as an algorithm-first lesson',
        intro: 'Students should design the steps in English and as a flowchart before touching the code.',
        content: `<div class="grid-2">
          ${noteCard('Plain-English target', joinList([
            'Read the task title.',
            'Convert the text to lowercase.',
            'Split it into words.',
            'Remove common stop words.',
            'Count the remaining words.',
            'Keep only words that appear once.',
            'Limit the list to three tags.'
          ], true))}
          ${noteCard('Questions and answers', qaTable([
            ['Why remove stop words?', 'Because very common words do not help describe the task meaningfully.'],
            ['Why keep only words that appear once?', 'It stops repeated words dominating the tag list.'],
            ['Why limit the number of tags?', 'Because the output should stay readable and controlled.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Code to show',
        title: 'Exact algorithm file and the integrated SQL backend',
        intro: 'Teach the pure function first, then show how the Flask route uses it.',
        content: `${codeCard({ fileName: 'tag_algorithm.py', language: 'python', code: taggingAlgorithm, rawHref: raw('sl-sql-tagging/tag_algorithm.py'), notes: ['Keep the class focused on list processing, counting, and slicing before they think about the database changes.'] })}${codeCard({ fileName: 'app.py', language: 'python', code: taggingApp, rawHref: raw('sl-sql-tagging/app.py'), notes: ['Show the class exactly where the algorithm connects: after the task insert, before the commit.', 'This is also the lesson to explain why an existing tag must be looked up before inserting a duplicate.'] })}`
      }),
      section({
        kicker: 'HL variation',
        title: 'How the same algorithm is used in the JSON version',
        intro: 'The algorithm itself stays the same. Only the storage step changes.',
        content: `${codeCard({ fileName: 'tag_algorithm.py', language: 'python', code: jsonTaggingAlgorithm, rawHref: raw('hl-json-tagging/tag_algorithm.py'), notes: ['The HL algorithm file can stay functionally identical to the SQL one.'] })}${codeCard({ fileName: 'app.py', language: 'python', code: jsonTaggingApp, rawHref: raw('hl-json-tagging/app.py'), notes: ['In HL the generated tags are stored directly inside the JSON task object rather than in separate relational tables.'] })}`
      })
    ].join('')
  },
  {
    slug: 'sl-database-extension',
    navTitle: 'SL extension: Database extension',
    navSummary: 'tags, task_tags, composite key, and ERD update.',
    title: 'SL extension: Database extension',
    stepLabel: 'Stage 6',
    summary: 'After the algorithm is understood, extend the SQL data model to support the new many-to-many relationship cleanly.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What the class should understand in this extension',
        intro: 'Students should see that the new feature changes the data model, not just the Python code.',
        content: `<div class="grid-2">
          ${noteCard('Expected student understanding', joinList([
            'A task can have many tags.',
            'A tag can belong to many tasks.',
            'A many-to-many relationship needs a junction table.',
            'The junction table uses a composite primary key to prevent duplicates.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['Why not store one tag field directly inside the tasks table?', 'Because one task can need many tags, so that approach does not scale cleanly.'],
            ['Why do we need <code>task_tags</code>?', 'Because it resolves the many-to-many relationship between tasks and tags.'],
            ['What does the composite key stop?', 'It stops the same task-tag pair being inserted more than once.']
          ]))}
        </div>${diagramCard({ title: 'Updated ERD after the extension', svg: taggingErdSvg, note: 'This is the final SL relational model after the algorithm is connected to the database.' })}`
      }),
      section({
        kicker: 'Code to show',
        title: 'Exact extended schema',
        intro: 'This is the full SQL schema after the tagging extension has been added.',
        content: codeCard({
          fileName: 'schema.sql',
          language: 'sql',
          code: taggingSchema,
          rawHref: raw('sl-sql-tagging/schema.sql'),
          notes: [
            'Use this side-by-side with the earlier two-table schema so the class can identify exactly what changed.',
            'The existing users and tasks tables stay intact; the extension is additive.'
          ]
        })
      })
    ].join('')
  },
  {
    slug: 'hl-json-theory',
    navTitle: 'HL Stage 1: JSON theory',
    navSummary: 'Objects, arrays, documents, and SQL vs NoSQL.',
    title: 'HL Stage 1: JSON and NoSQL theory',
    stepLabel: 'HL Stage 1',
    summary: 'Use this as the conceptual bridge before HL students rebuild the same product with a different storage model.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What HL students need to understand first',
        intro: 'Before writing the JSON backend, students should be able to describe how documents differ from relational tables.',
        content: `<div class="grid-2">
          ${noteCard('Core ideas to secure', joinList([
            'A JSON object stores key-value pairs.',
            'A JSON array stores an ordered list of values or objects.',
            'A document-based model is flexible but can duplicate data more easily than SQL.',
            'The same frontend can sit on top of either storage model.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['What is the JSON equivalent of a table row?', 'A JSON object inside an array or collection.'],
            ['What is the strength of SQL here?', 'Strong structure, joins, and controlled relationships.'],
            ['What is the strength of JSON here?', 'Flexible structure and very direct file-based storage.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Teacher model answers',
        title: 'SQL versus JSON comparison table',
        intro: 'This is the comparison students should be able to explain by the end of the theory lesson.',
        content: `<div class="table-wrap"><table><thead><tr><th>SQL</th><th>JSON / NoSQL</th></tr></thead><tbody><tr><td>Tables</td><td>Documents / arrays of objects</td></tr><tr><td>Rows</td><td>Objects</td></tr><tr><td>Joins express relationships</td><td>ID links or embedded data express relationships</td></tr><tr><td>Schema is fixed</td><td>Structure is more flexible</td></tr></tbody></table></div>`
      })
    ].join('')
  },
  {
    slug: 'hl-json-practice',
    navTitle: 'HL Stage 2: Python JSON practice',
    navSummary: 'Generic read/write JSON examples before the project backend.',
    title: 'HL Stage 2: Python JSON practice',
    stepLabel: 'HL Stage 2',
    summary: 'Keep this stage generic. The class should practice reading and writing JSON before touching the project backend.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'Run this as a low-risk Python lab',
        intro: 'The examples here are deliberately not the project code. They are syntax practice that prepares students for the HL backend later.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'Read a JSON file into Python.',
            'Append a new object to a list.',
            'Write the updated structure back to disk with indentation.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['Why practise on a generic file first?', 'Because the project backend should not be the first time students have seen JSON file I/O.'],
            ['What does <code>json.load()</code> return?', 'A Python structure such as a list or dictionary based on the JSON file contents.'],
            ['Why use <code>indent=4</code> when writing?', 'It keeps the file readable for humans.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Generic examples',
        title: 'Use these examples before the project backend',
        intro: 'These are safe syntax demonstrations, not the task-manager implementation.',
        content: `${codeCard({ fileName: 'inventory.json', language: 'json', code: genericInventoryJson, notes: ['Use a harmless data file so students focus on the JSON shape rather than the project itself.'] })}${codeCard({ fileName: 'read_inventory.py', language: 'python', code: genericJsonRead, notes: ['Teach <code>with open(...)</code> and <code>json.load()</code> here.'] })}${codeCard({ fileName: 'update_inventory.py', language: 'python', code: genericJsonWrite, notes: ['Teach append, then save back to disk with <code>json.dump()</code>.'] })}`
      })
    ].join('')
  },
  {
    slug: 'hl-modelling-comparison',
    navTitle: 'HL Stage 3: Modelling comparison',
    navSummary: 'Separate files versus embedded documents.',
    title: 'HL Stage 3: JSON data modelling comparison',
    stepLabel: 'HL Stage 3',
    summary: 'Before HL students build the JSON version, compare two modelling options and make the teacher decision explicit.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'Use this lesson to justify the chosen HL model',
        intro: 'Students should compare two JSON structures for the same idea and decide which one better matches the project and the SQL comparison.',
        content: `<div class="grid-2">
          ${codeCard({ fileName: 'Model A', language: 'text', code: modelAJson, notes: ['Model A keeps user data separate and uses IDs to link tasks back to users.'] })}
          ${codeCard({ fileName: 'Model B', language: 'text', code: modelBJson, notes: ['Model B embeds user data inside every task, which makes reads simple but duplicates data.'] })}
        </div>`
      }),
      section({
        kicker: 'Teacher answer key',
        title: 'What conclusion to steer them toward',
        intro: 'The cleaner choice for this project is Model A.',
        content: qaTable([
          ['Which model reduces duplication?', 'Model A, because the user record is stored once and tasks reference it by id.'],
          ['Which model aligns better with the SQL version?', 'Model A, because it preserves the idea of relationships through identifiers.'],
          ['Which model should the class implement for HL?', 'Model A, with <code>users.json</code> and <code>tasks.json</code> kept separate.']
        ])
      }),
      section({
        kicker: 'Where the class goes next',
        title: 'Move into the HL backend build',
        intro: 'The next part of the teacher guide breaks the JSON implementation into its own feature pages so you can run the HL rebuild step by step.',
        content: `<div class="raw-links"><a class="card-link" href="./hl-json-backend-setup.html">Start the HL JSON backend setup</a><a class="card-link" href="./hl-json-fetch-render.html">Go to HL fetch and render</a><a class="card-link" href="./hl-json-tagging.html">See the final HL tagging state</a></div>`
      })
    ].join('')
  },
  {
    slug: 'hl-json-backend-setup',
    navTitle: 'HL Stage 4: JSON backend setup',
    navSummary: 'Create JSON files and Python helper functions.',
    title: 'HL Stage 4: JSON backend setup',
    stepLabel: 'HL Stage 4',
    summary: 'Start the HL rebuild by swapping out SQLite for JSON files. The HTML and frontend flow from SL stay in place.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What this HL lesson should establish',
        intro: 'Students should understand that they are rebuilding the storage layer, not starting the whole app again.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'A data folder with <code>users.json</code> and <code>tasks.json</code>.',
            'An <code>app.py</code> file with JSON helper functions for reading and writing.',
            'A clear explanation that the frontend can remain unchanged while the backend changes.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['Why keep the same HTML and JavaScript?', 'Because the user-facing behaviour is the same; only the storage layer changes.'],
            ['What replaces the SQL tables in HL?', 'JSON files that hold arrays of objects.'],
            ['Why do we need helper functions such as <code>load_tasks()</code> and <code>save_tasks()</code>?', 'Because file reading and writing will happen repeatedly across routes.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Files to build',
        title: 'Exact starting files for the HL rebuild',
        intro: 'These are the files students should create before adding the first JSON routes.',
        content: `${codeCard({
          fileName: 'data/users.json',
          language: 'json',
          code: jsonUsers,
          rawHref: raw('hl-json-core/data/users.json'),
          notes: [
            'Keep the seed users aligned with the SQL version so later comparisons stay clean.',
            'This file replaces the SQL users table.'
          ]
        })}${codeCard({
          fileName: 'data/tasks.json',
          language: 'json',
          code: jsonTasks,
          rawHref: raw('hl-json-core/data/tasks.json'),
          notes: [
            'Start with an empty array because the class will create tasks through the app.',
            'This file replaces the SQL tasks table.'
          ]
        })}${codeCard({
          fileName: 'app.py',
          language: 'python',
          code: jsonBackendSetup,
          notes: [
            'At this point the backend knows where the JSON files live and how to load or save them.',
            'Do not add the GET routes yet; those belong to the next lesson.'
          ]
        })}${codeCard({
          fileName: 'templates/index.html',
          language: 'html',
          code: jsonCoreHtml,
          rawHref: raw('hl-json-core/templates/index.html'),
          notes: [
            'Reuse the same frontend structure from SL.',
            'This is a good moment to reinforce that architecture is about separation of concerns.'
          ]
        })}`
      }),
      section({
        kicker: 'How the pieces link',
        title: 'Storage model and page flow',
        intro: 'Use this explanation to make the architecture explicit before the class writes the first HL route.',
        content: noteCard('Teacher explanation', '<p><code>templates/index.html</code> still serves the page, but the Python backend now reads users and tasks from JSON files instead of SQL queries. The browser does not care where the data comes from as long as the routes return the same shape.</p>')
      })
    ].join('')
  },
  {
    slug: 'hl-json-fetch-render',
    navTitle: 'HL Feature 1: Fetch and render',
    navSummary: 'Read JSON data and render it through the existing frontend.',
    title: 'HL Feature 1: Fetch users and render tasks from JSON',
    stepLabel: 'HL Stage 4',
    summary: 'This is the HL equivalent of the first full-stack lesson: read from JSON files, return JSON responses, and reuse the existing render logic.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What students should finish with',
        intro: 'The goal is to make the backend swap visible while keeping the frontend behaviour familiar.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'A working <code>/users</code> route that returns JSON from <code>users.json</code>.',
            'A working <code>/tasks</code> route that enriches task objects with usernames.',
            'A rendered task list driven by the same frontend pattern used in SL.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['Why is the frontend code almost unchanged?', 'Because the route names and returned data shape are still the same.'],
            ['How do tasks get usernames if the JSON task object only stores <code>user_id</code>?', 'The backend reads both files and matches ids before returning the list.'],
            ['What has replaced the SQL JOIN?', 'A Python loop that matches task <code>user_id</code> values to user records.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Files to build',
        title: 'Exact files after the HL fetch/render lesson',
        intro: 'Show the students that the page is the same while the data access logic is different.',
        content: `${codeCard({
          fileName: 'app.py',
          language: 'python',
          code: jsonAppFetchRender,
          notes: [
            'This is the first point where students feel the difference between querying a database and reading Python structures from files.',
            'Keep attention on the data shape returned by each route.'
          ]
        })}${codeCard({
          fileName: 'static/index.js',
          language: 'javascript',
          code: jsFetchRender,
          notes: [
            'The JavaScript can be reused from the SQL build because the route names and response shape are unchanged.',
            'Use this to reinforce interface and storage separation.'
          ]
        })}`
      }),
      section({
        kicker: 'How the pieces link',
        title: 'Teacher explanation for the board',
        intro: 'This is the key message in the HL rebuild.',
        content: noteCard('Architecture point', '<p>The browser still calls <code>/users</code> and <code>/tasks</code>. Flask still returns JSON. The difference is that the backend now loads Python lists and dictionaries from files instead of running SQL statements. Same frontend contract, different storage layer.</p>')
      })
    ].join('')
  },
  {
    slug: 'hl-json-create-task',
    navTitle: 'HL Feature 2: Create a task',
    navSummary: 'Append a new task object to tasks.json.',
    title: 'HL Feature 2: Create a task in JSON storage',
    stepLabel: 'HL Stage 4',
    summary: 'Build the create route by appending a new task object to the JSON file, then reusing the existing Save button workflow.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What this lesson should secure',
        intro: 'Students should see that POST still exists even though the storage model has changed.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'The Save button sends a POST request to <code>/tasks</code>.',
            'The backend creates a new JSON object with a unique <code>task_id</code>.',
            'The updated file is saved and the list refreshes.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['How is a new id created without SQL autoincrement?', 'By looking at the last task id in the array and adding one.'],
            ['Why convert <code>user_id</code> to an integer?', 'Because the select value arrives as text but the stored JSON should keep a numeric id.'],
            ['Why does the page call <code>loadTasks()</code> after saving?', 'So the interface reflects the new stored data immediately.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Files to build',
        title: 'Exact files after the HL create-task lesson',
        intro: 'Keep the HTML unchanged here. The work is in JavaScript and Python.',
        content: `${codeCard({
          fileName: 'app.py',
          language: 'python',
          code: jsonAppCreate,
          notes: [
            'The create route reads the current task array, calculates the next id, appends the new object, and saves the file.',
            'This is a good comparison point with the SQL insert lesson.'
          ]
        })}${codeCard({
          fileName: 'static/index.js',
          language: 'javascript',
          code: jsCreate,
          notes: [
            'The frontend create logic is reused from SL.',
            'Use this to show that a POST request can stay identical even when the storage model changes.'
          ]
        })}`
      }),
      section({
        kicker: 'How the pieces link',
        title: 'Teacher explanation for the flow',
        intro: 'This is the build story students should be able to say back to you.',
        content: noteCard('Request flow', '<p>The modal collects values, JavaScript sends them as JSON, Flask converts them into a new Python dictionary, appends it to the task list, saves the file, and then the browser reloads the rendered list.</p>')
      })
    ].join('')
  },
  {
    slug: 'hl-json-delete-task',
    navTitle: 'HL Feature 3: Delete a task',
    navSummary: 'Remove one task object from tasks.json.',
    title: 'HL Feature 3: Delete a task from JSON storage',
    stepLabel: 'HL Stage 4',
    summary: 'Teach deletion in HL as a list filtering operation rather than a SQL DELETE statement.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What this lesson should secure',
        intro: 'Students should understand that deletion is still identifier-based, even though the implementation is now file based.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'Each task row has a Delete button.',
            'The correct task object is removed from the JSON list.',
            'The file is saved and the list refreshes without the deleted task.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['What tells the backend which task to remove?', 'The <code>task_id</code> in the route path.'],
            ['How is deletion done in Python here?', 'By building a new list that excludes the chosen task id.'],
            ['Why is this still safer than deleting by title?', 'Because task ids are unique but titles may repeat.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Files to build',
        title: 'Exact files after the HL delete lesson',
        intro: 'Students can compare this directly with the SQL delete feature.',
        content: `${codeCard({
          fileName: 'app.py',
          language: 'python',
          code: jsonAppDelete,
          notes: [
            'Deletion is a list-comprehension style filter instead of a SQL statement.',
            'Emphasise that the route pattern and the frontend action stay the same.'
          ]
        })}${codeCard({
          fileName: 'static/index.js',
          language: 'javascript',
          code: jsDelete,
          notes: [
            'The delete handler is unchanged from the SQL build.',
            'This is another strong architecture comparison point.'
          ]
        })}`
      })
    ].join('')
  },
  {
    slug: 'hl-json-mark-complete',
    navTitle: 'HL Feature 4: Mark complete',
    navSummary: 'Update the status field in the correct JSON object.',
    title: 'HL Feature 4: Mark a task complete in JSON storage',
    stepLabel: 'HL Stage 4',
    summary: 'Students now update one field inside an existing JSON object and persist the changed file back to disk.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What this lesson should secure',
        intro: 'This is the point where students see how an update works without SQL.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'Each task row has a Complete button.',
            'The correct task object has its <code>status</code> changed to <code>completed</code>.',
            'The updated state persists after reload.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['Why is this an update and not a new object?', 'Because the task already exists and only one field is changing.'],
            ['What must happen after the loop changes the task status?', 'The updated task list must be written back to the JSON file.'],
            ['Why is persistence important here?', 'Because a UI-only change would disappear on refresh and would not be real evidence of data storage.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Files to build',
        title: 'Exact files after the HL complete-task lesson',
        intro: 'At this point the HL core backend reaches the same behaviour as the SL core build.',
        content: `${codeCard({
          fileName: 'app.py',
          language: 'python',
          code: jsonCoreApp,
          rawHref: raw('hl-json-core/app.py'),
          notes: [
            'This is the complete HL core backend after create, delete, and complete all exist.',
            'Walk through the update loop line by line so students can see how one matching object is changed.'
          ]
        })}${codeCard({
          fileName: 'static/index.js',
          language: 'javascript',
          code: jsonCoreJs,
          rawHref: raw('hl-json-core/static/index.js'),
          notes: [
            'The frontend is still the same as the SQL build.',
            'This is the checkpoint where students should be able to compare both backends confidently.'
          ]
        })}`
      })
    ].join('')
  },
  {
    slug: 'hl-json-filter-sort',
    navTitle: 'HL Feature 5: Filtering and sorting',
    navSummary: 'Filter and order JSON data in Python.',
    title: 'HL Feature 5: Filter and sort JSON task data',
    stepLabel: 'HL Stage 4',
    summary: 'Teach filtering and sorting in HL as Python list operations that still sit behind the same GET route contract.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What this lesson should secure',
        intro: 'Students should understand that query parameters still describe the read request, even though the backend now filters Python lists instead of SQL results.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'The same filter and sort controls from SL are reused.',
            'The backend reads query parameters and applies them to the task list in Python.',
            'Students can explain why filtering changes the read logic, not the stored data.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['What still stays the same from the SQL version?', 'The HTML controls, query-string pattern, and rendered UI behaviour.'],
            ['What changes in HL?', 'Python code filters and sorts in memory instead of SQL doing the work.'],
            ['Why still teach the backend as the owner of the returned order?', 'Because the client should request data, not decide the authoritative dataset logic.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Files to build',
        title: 'Exact files after the HL filter/sort lesson',
        intro: 'This is the teacher target state for the HL filtering lesson.',
        content: `${codeCard({
          fileName: 'templates/index.html',
          language: 'html',
          code: htmlFilterSort,
          notes: [
            'Reuse the same filter controls from the SQL track so the comparison stays direct.',
            'The UI should not split into a second design language in HL.'
          ]
        })}${codeCard({
          fileName: 'static/index.js',
          language: 'javascript',
          code: jsFilterSort,
          notes: [
            'The query-string building can remain identical to the SQL version.',
            'This is a good moment to revisit <code>URLSearchParams</code>.'
          ]
        })}${codeCard({
          fileName: 'app.py',
          language: 'python',
          code: jsonAppFilterSort,
          notes: [
            'Teach filtering first, then ordering, so students do not collapse both ideas together.',
            'Be explicit about how empty due dates are handled during sorting.'
          ]
        })}`
      })
    ].join('')
  },
  {
    slug: 'hl-json-tagging',
    navTitle: 'HL Stage 5: JSON tagging',
    navSummary: 'Apply the tagging algorithm to the JSON backend.',
    title: 'HL Stage 5: Tagging in the JSON version',
    stepLabel: 'HL Stage 5',
    summary: 'Finish the HL path by applying the same tagging algorithm to the JSON-backed app and showing how the storage decision changes the implementation.',
    body: [
      section({
        kicker: 'Teacher objective',
        title: 'What this final HL lesson should secure',
        intro: 'The algorithm stays the same. The storage outcome changes because JSON can embed the tags directly inside each task object.',
        content: `<div class="grid-2">
          ${noteCard('Expected student output', joinList([
            'The same tag-generation logic used in SL.',
            'A new <code>tags</code> array stored inside each task object.',
            'A clear explanation of why HL does not need a junction table in this JSON version.'
          ]))}
          ${noteCard('Questions and answers', qaTable([
            ['Why does HL not need <code>task_tags</code>?', 'Because the JSON version can store the generated tags directly in each task object.'],
            ['What stays the same from SL?', 'The algorithm steps and the idea of generating up to three useful tags from the title.'],
            ['What is the architecture lesson here?', 'The same feature can require different storage structures depending on the data model.']
          ]))}
        </div>`
      }),
      section({
        kicker: 'Files to build',
        title: 'Exact files after the HL tagging lesson',
        intro: 'Use these two files together so students can compare algorithm logic with backend integration.',
        content: `${codeCard({
          fileName: 'tag_algorithm.py',
          language: 'python',
          code: jsonTaggingAlgorithm,
          rawHref: raw('hl-json-tagging/tag_algorithm.py'),
          notes: [
            'Keep the algorithm identical to the SQL tagging lesson where possible.',
            'This helps students separate algorithm thinking from storage thinking.'
          ]
        })}${codeCard({
          fileName: 'app.py',
          language: 'python',
          code: jsonTaggingApp,
          rawHref: raw('hl-json-tagging/app.py'),
          notes: [
            'The create route now calls the algorithm and stores the returned tag list inside the task object.',
            'This is the cleanest contrast with the SL relational extension.'
          ]
        })}`
      }),
      section({
        kicker: 'Teacher close',
        title: 'Final comparison to make explicit',
        intro: 'End the unit by making the modelling choice visible.',
        content: noteCard('SQL versus JSON storage outcome', '<p>In SL the tagging feature forces a many-to-many relational extension, so the class adds <code>tags</code> and <code>task_tags</code>. In HL the JSON version stores tags directly inside each task object. Same feature goal, different data model consequence.</p>')
      })
    ].join('')
  }
];

const homeBody = [
  section({
    kicker: 'How to use this guide',
    title: 'Teacher workflow',
    intro: 'Open this file locally, then move through the linked lesson pages in order. Each page is written from the teacher perspective: what to teach, what students should produce, the likely questions, and the exact code state to aim for.',
    content: `<div class="grid-3">
      ${noteCard('What is included', joinList(['Stage-by-stage teacher notes.', 'One implementation page per feature.', 'Inline syntax-highlighted code with the file name above it.', 'Answer keys for the prompts raised on the student side.']))}
      ${noteCard('What is not included', joinList(['Hosted routes for students.', 'Copy-paste project code for the student site.', 'Every possible extension beyond the supplied task-manager brief.']))}
      ${noteCard('Direct raw code states', `<div class="raw-links"><a href="./sl-sql-core/app.py">SL SQL core</a><a href="./sl-sql-tagging/app.py">SL SQL tagging</a><a href="./hl-json-core/app.py">HL JSON core</a><a href="./hl-json-tagging/app.py">HL JSON tagging</a></div>`)}
    </div>`
  }),
  section({
    kicker: 'Guide sequence',
    title: 'Move through the teacher guide in this order',
    intro: 'This sequence is deliberately slower and more explicit than the student version so you can run the build lesson by lesson.',
    content: `<div class="card-grid">${allPages
      .map(
        (page, index) => `
          <article class="summary-card">
            <p class="kicker">Step ${index + 1}</p>
            <h4>${page.navTitle}</h4>
            <p>${page.navSummary}</p>
            <a class="card-link" href="./teacher-guide/${page.slug}.html">Open step</a>
          </article>
        `
      )
      .join('')}</div>`
  }),
  section({
    kicker: 'Teaching note',
    title: 'How the implementation pages are organised',
    intro: 'The implementation steps follow the teacher build order you described, not just the current student-roadmap labels.',
    content: noteCard('Build order used in this guide', joinList([
      'Problem specification and planning first.',
      'Core SQL schema before any Flask routes.',
      'Database initialisation before the web app queries anything.',
      'HTML shell and interface structure before JavaScript behaviour.',
      'Flask and JavaScript built together, one small function or feature at a time.',
      'Algorithm and database extension only after the core SL build works.',
      'HL theory and JSON practice before the HL backend rebuild.',
      'A separate HL JSON implementation run after the modelling comparison.',
      'A final HL tagging lesson showing how the same algorithm lands differently in JSON.'
    ], true))
  })
].join('');

const writePage = async ({ filePath, html }) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html, 'utf8');
};

for (let index = 0; index < allPages.length; index += 1) {
  const page = allPages[index];
  const previous = allPages[index - 1] || null;
  const next = allPages[index + 1] || null;

  await writePage({
    filePath: path.join(guideDir, `${page.slug}.html`),
    html: layout({
      currentSlug: page.slug,
      title: page.title,
      stepLabel: page.stepLabel,
      summary: page.summary,
      body: page.body,
      assetBase: './assets',
      pageBase: '.',
      homeHref: '../teacher-reference.html',
      previous,
      next,
      home: false
    })
  });
}

await writePage({
  filePath: path.join(__dirname, 'teacher-reference.html'),
  html: layout({
    currentSlug: 'home',
    title: 'Teacher guide home',
    stepLabel: 'Teacher guide index',
    summary: 'Local teacher-facing guide for the IB 2027 SQL / NoSQL project. Use it to run the project one lesson step at a time with the exact expected code state visible.',
    body: homeBody,
    assetBase: './teacher-guide/assets',
    pageBase: './teacher-guide',
    homeHref: './teacher-reference.html',
    previous: null,
    next: allPages[0],
    home: true
  })
});
