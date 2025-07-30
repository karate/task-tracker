# Task-Tracker

## This is a simple to-do-list application in vanilla Typescript written as an assignment during a job interview.

### Objective
Create a minimal Task Tracker web application that allows a user to:
    - Add a new task
    - Mark a task as completed
    - Delete a task
    - Persist tasks in local storage

###  Tech Stack
    - Vanilla TypeScript
    - HTML/CSS
    - No frameworks or libraries (e.g., React, jQuery, Bootstrap, etc.)

### Requirements
1. UI Design
You must create the following UI components:
    - Input field to enter the task name
    - "Add Task" button
    - A list to display tasks
    - Each task should have:
        - A checkbox to mark it complete
        - A delete icon or button
    - Use minimal but clean styling with CSS (inline or external).

2. Features
    - Add a task: should appear in the list with the entered text.
    - Mark as completed: checked items should display with strikethrough.
    - Delete task: removes the task from the list.
    - Save to local storage and retrieve on page reload.

3. Code Quality
    - Use TypeScript interfaces or types to represent tasks.
    - Follow clean code principles: meaningful naming, small functions, avoid global scope.
    - DOM manipulation and event handling should be done properly.

4. Bonus Points (Optional)
    - Add a task counter (e.g., “3 of 5 tasks completed”)
    - Sort tasks: incomplete tasks appear before completed ones
    - Add basic input validation (e.g., avoid empty tasks)

### Deliverables
A zipped folder with the following structure:
```
    task-tracker/
    ├── index.html
    ├── styles.css
    ├── script.ts
    ├── README.md
```

Your README.md should include:
    - How to run the app (e.g., compile TypeScript)
    - Any known issues
    - Bonus features implemented (if any)

---

## How to run the app
1. Ensure you have node version 20.19.0 or higher installed.
2. Clone the repository:
   ```bash
   https://github.com/karate/mts-assignment.git
    ```
3. Install dependencies by running:
   ```bash
   npm install
   ```
4. Run development server:
    ```bash
    npm run dev
    ```
5. Visit `http://localhost:5173/` in your browser.

## Known issues


## Bonus features implemented
- Task counter that displays the number of completed tasks, and changes color when all tasks are completed.
- Tasks are sorted with incomplete tasks appearing before completed ones.
- Deleting a non-completed task requires user confirmation.
- Basic input validation to prevent empty tasks from being added.
- Responsive layout.
- Use of `utils.ts` for utility functions.
- Use of `Task.ts` for custom Task type.
- Use of `TaskStorage.ts` for local storage management (avoiding usage of global variables).

## Further improvements
- Implement a filter to show only completed or incomplete tasks.
- Add a search functionality to find tasks by name.
- Implement drag-and-drop functionality to reorder tasks.
- Unit testing
- Design a better confirmation dialog for deleting tasks.
