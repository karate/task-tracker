// Inport Task type from Task.ts
import type { Task } from './Task'
import { populateTaskList, updateTaskCounter } from './utils'
import TaskStore from './TaskStore'

const form = document.querySelector<HTMLFormElement>('#task-form')
const taskStore = new TaskStore()

// Load tasks from local storage if available
const storedTasks = localStorage.getItem('TASKS')
const storedTasksArray = await JSON.parse(storedTasks || '[]') as Task[]
taskStore.addAll(storedTasksArray)

populateTaskList(taskStore)
updateTaskCounter(taskStore)

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
    populateTaskList(taskStore)
    updateTaskCounter(taskStore)
    // Clear the input field
    taskInput.value = ''
  }
})


