// Inport Task type from Task.ts
import type { Task } from './Task'
import { populateTaskList, updateTaskCounter } from './utils'
import * as taskStore from './taskStore'

const form = document.querySelector<HTMLFormElement>('#task-form')

// Load tasks from local storage if available
taskStore.loadFromStorage()

populateTaskList()
updateTaskCounter()

// When user submits the form, add the task to the task-list
form?.addEventListener('submit', (event) => {
  event.preventDefault()
  const taskInput = document.querySelector<HTMLInputElement>('#task-input')

  if (taskInput && taskInput.value.trim() !== '') {
    // Create new Task using the Task type
    const task: Task = {
      id: crypto.randomUUID(), // Generate a unique ID
      title: taskInput.value.trim(),
      completed: false,
      createdAt: new Date(),
    }
    taskStore.add(task) // Add task to the task store
    populateTaskList()
    updateTaskCounter()
    // Clear the input field
    taskInput.value = ''
  }
})


