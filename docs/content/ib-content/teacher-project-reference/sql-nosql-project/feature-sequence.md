# Feature Sequence Reference

This document links the student-facing feature pages to the internal reference states.

## SQL Core Build

### Feature 1 - Project directory structure
Expected state:
- `app.py` exists
- `schema.sql` exists
- `init_db.py` exists
- `templates/index.html` exists
- `static/index.js` exists

### Feature 2 - Base HTML page
Expected state:
- HTML boilerplate added
- Bootstrap CSS and JS linked
- page title and main container visible

### Feature 3 - Task list display area
Expected state:
- task list render target exists in `templates/index.html`
- empty list can be targeted by JavaScript later

### Feature 4 - Add Task button and modal
Expected state:
- add-task button appears
- modal structure exists with header, body, footer

### Feature 5 - Form inputs
Expected state:
- title, user, priority, and due date inputs exist
- labels and sensible control types are in place

### Feature 6 - Fetch and display tasks
Expected state:
- GET route for `/tasks` exists
- GET route for `/users` exists
- `loadUsers()` and `loadTasks()` render returned data

### Feature 7 - Create task
Expected state:
- POST route for `/tasks` inserts a task into SQL
- Save button sends JSON payload
- list refresh happens after create

### Feature 8 - Delete task
Expected state:
- DELETE route removes one task by `task_id`
- Delete button calls the correct endpoint

### Feature 9 - Mark task complete
Expected state:
- PATCH route updates `status`
- Complete button triggers the update and refreshes the list

### Feature 10 - Filtering and sorting
Expected state:
- UI controls exist for filter/sort
- backend supports filtered or ordered output

### Feature 11 - Testing and evaluation
Expected state:
- testing table is completed with actual outputs and judgements

## SQL Tagging Extension

After the SQL core build, the reference state moves from `sl-sql-core` to `sl-sql-tagging`.

Students then add:
- `tag_algorithm.py`
- `tags` table
- `task_tags` table
- tagging logic during task creation

## JSON Core Build

The feature order stays the same as SQL core.

Key difference:
- `schema.sql` and `init_db.py` are replaced conceptually by `data/tasks.json` and `data/users.json`
- the frontend remains aligned with the SQL track
- backend routes read and write JSON documents instead of SQL rows

## JSON Tagging Extension

After the JSON core build, the reference state moves from `hl-json-core` to `hl-json-tagging`.

Students then add:
- `tag_algorithm.py`
- automatic `tags` generation from the task title
- JSON tasks that include a `tags` array
