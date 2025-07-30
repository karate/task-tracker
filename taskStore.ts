import type { Task } from "./Task"

let tasks: Task[] = []

function save() {
  try {
    localStorage.setItem('TASKS', JSON.stringify(tasks))
  } catch (e) {
    alert('Could not save tasks: ' + (e instanceof Error ? e.message : e))
  }
}

export function loadFromStorage() {
  try {
    const savedTasks = localStorage.getItem('TASKS')
    tasks = savedTasks ? JSON.parse(savedTasks) : []
  } catch (e) {
    alert('Could not load tasks: ' + (e instanceof Error ? e.message : e))
    tasks = []
  }
}

export function getAll(): Task[] {
  return tasks
}

export function add(task: Task): void {
  tasks.unshift(task)
  save()
}

export function update(updatedTask: Task): void {
  tasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
  // Sort completed tasks at the end
  tasks.sort((a, b) => Number(a.completed) - Number(b.completed))
  save()
}

export function remove(taskId: string): void {
  tasks = tasks.filter(t => t.id !== taskId)
  save()
}

export function countCompleted(): number {
  return tasks.filter(t => t.completed).length
}

export function countAll(): number {
  return tasks.length
}
