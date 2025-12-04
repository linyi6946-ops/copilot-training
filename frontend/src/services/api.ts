import { Task, NewTask } from '../types/task'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

/**
 * API service for communicating with the backend
 * This service wraps the generated OpenAPI client and provides convenient methods
 */
export const apiService = {
  /**
   * Fetch all tasks
   * @returns Array of tasks
   */
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) throw new Error('Failed to fetch tasks')
    const data = await response.json()
    return data.tasks || data
  },

  /**
   * Fetch a single task by ID
   * @param id Task ID
   * @returns Task object
   */
  async getTask(id: number): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch task ${id}`)
    return response.json()
  },

  /**
   * Create a new task
   * @param task Task data to create
   * @returns Created task with ID
   */
  async createTask(task: NewTask): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    if (!response.ok) throw new Error('Failed to create task')
    return response.json()
  },

  /**
   * Update an existing task
   * @param id Task ID
   * @param task Updated task data
   * @returns Updated task
   */
  async updateTask(id: number, task: NewTask): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    if (!response.ok) throw new Error('Failed to update task')
    return response.json()
  },

  /**
   * Delete a task
   * @param id Task ID
   */
  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete task')
  },
}
