function loadUsers() {
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

            const completeButton = document.createElement("button")
            completeButton.textContent = "Complete"
            completeButton.className = "btn btn-success btn-sm ms-2"
            completeButton.onclick = () => completeTask(task.task_id)

            li.appendChild(info)
            li.appendChild(completeButton)
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

function completeTask(id) {
    fetch("/tasks/" + id + "/complete", {
        method: "PATCH"
    })
    .then(() => loadTasks())
}

loadUsers()
loadTasks()
