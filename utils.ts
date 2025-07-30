import type { Task } from "./Task";
import * as taskStore from "./taskStore"; // Import all taskStore functions

export function updateTaskCounter(): void {
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

export function populateTaskList(): any {
  const taskList = document.querySelector<HTMLUListElement>('#task-list')
  if (taskList) {
    taskList.innerHTML = ''
  }
  for (const task of taskStore.getAll()) {
    taskList?.appendChild(createTaskElement(task))
  }
  return taskList
}

export function createTaskElement(task: Task): HTMLLIElement {
  const newTask = document.createElement('li')
  newTask.id = task.id
  newTask.classList.add('task')
  newTask.classList.toggle('completed', task.completed)

  const taskCheckbox = document.createElement('input')
  taskCheckbox.type = 'checkbox'
  taskCheckbox.checked = task.completed
  taskCheckbox.title = "Mark as Completed"
  taskCheckbox.addEventListener('change', () => {
    task.completed = taskCheckbox.checked
    taskStore.update(task)
    populateTaskList()
    updateTaskCounter()
  })
  newTask.appendChild(taskCheckbox)

  const taskTitle = document.createElement('span')
  taskTitle.textContent = task.title
  newTask.appendChild(taskTitle)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('mini')
  deleteButton.textContent = '❌'
  deleteButton.title = 'Delete Task'
  deleteButton.addEventListener('click', () => {
    if (!task.completed) {
      if (!confirm('This task is not completed yet. Are you sure you want to delete it?')) {
        return
      }
    }
    taskStore.remove(task.id)
    newTask.remove()
    updateTaskCounter()
  })
  newTask.appendChild(deleteButton)
  return newTask
}
