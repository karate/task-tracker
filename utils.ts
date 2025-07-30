import type { Task } from "./Task";
import TaskStore from "./TaskStore";

export function updateTaskCounter(taskStore: TaskStore): void {
    const taskCounter = document.querySelector<HTMLElement>('#task-count')
    if (taskCounter) {
      taskCounter.classList.remove('completed')
      if (taskStore.countAll() == 0) {
        taskCounter.innerHTML = "No tasks yet"
      } else {
        taskCounter.innerHTML = taskStore.countCompleted() + " out of " + taskStore.countAll() + " completed"
        if (taskStore.countCompleted() > 0 && taskStore.countCompleted() == taskStore.countAll()) {
          taskCounter.classList.add('completed')
          taskCounter.innerHTML += '!'
        }
      }
    }
}


export function updateTask(task: Task, taskStore: TaskStore): void {
  // Update task in Store
  taskStore.update(task)
  // Update task in DOM
  const taskElement = document.getElementById(task.id)
  taskElement?.classList.toggle('completed', task.completed)

}

export function populateTaskList(taskStore: TaskStore): any {
  const taskList = document.querySelector<HTMLUListElement>('#task-list')
  // Delete taskList contents
  if (taskList) {
    taskList.innerHTML = ''
  }

  // Render existing tasks from TASKS array
  for (const task of taskStore.getAll()) {
    // Append the new task to the task list
    taskList?.appendChild(createTaskElement(task, taskStore))
  }
  return taskList
}

export function createTaskElement(task: Task, taskStore: TaskStore): HTMLLIElement {
    const newTask = document.createElement('li')
    // add data-id attribute
    newTask.id = task.id
    newTask.classList.add('task')
    newTask.classList.toggle('completed', task.completed)

    // "Completed" checkbox
    const taskCheckbox = document.createElement('input')
    taskCheckbox.type = 'checkbox'
    taskCheckbox.checked = task.completed
    taskCheckbox.title = "Mark as Completed"
    taskCheckbox.addEventListener('change', () => {
      task.completed = taskCheckbox.checked
      // Update local storage
      taskStore.update(task)
      updateTask(task, taskStore)
      updateTaskCounter(taskStore)
    })
    newTask.appendChild(taskCheckbox)

    // Task title
    const taskTitle = document.createElement('span')
    taskTitle.textContent = task.title
    newTask.appendChild(taskTitle)

    // Delete button
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('mini')
    deleteButton.textContent = '❌'
    deleteButton.title = 'Delete Task'
    deleteButton.addEventListener('click', () => {
      // Confirm deletion if the task is not completed
      if (!task.completed) {
        if (!confirm('This task is not completed yet. Are you sure you want to delete it?')) {
          return
        }
      }
      // Remove task from the DOM
      taskStore.remove(task.id)
      newTask.remove()
      updateTaskCounter(taskStore)
    })
    newTask.appendChild(deleteButton)
    return newTask
}
