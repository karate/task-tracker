import type { Task } from "./Task"

export default class TaskStore {
  private tasks: Task[] = []

  constructor() {
    this.load()
  }

  getAll(): Task[] {
    return this.tasks
  }

  add(task: Task): void {
    this.tasks.unshift(task)
    this.save()
  }

  addAll(tasks: Task[]): void {
    this.tasks = tasks
    this.save()
  }

  update(updatedTask: Task): void {
    this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    // Sort completed tasks at the end
    this.tasks.sort((a, b) => Number(a.completed) - Number(b.completed))
    this.save()
  }

  remove(taskId: string): void {
    this.tasks = this.tasks.filter(t => t.id !== taskId)
    this.save()
  }

  countCompleted(): number {
    return this.tasks.filter(t => t.completed).length
  }

  countAll(): number {
    return this.tasks.length
  }

  private save(): void {
    try {
      localStorage.setItem('TASKS', JSON.stringify(this.tasks))
    } catch (e) {
      alert('Could not save tasks: ' + (e instanceof Error ? e.message : e))
    }
  }

  private load(): void {
    try {
      const savedTasks = localStorage.getItem('TASKS')
      this.tasks = savedTasks ? JSON.parse(savedTasks) : []
    } catch (e) {
      alert('Could not load tasks: ' + (e instanceof Error ? e.message : e))
      this.tasks = []
    }
  }
}
