/**
 * Task interface representing a task object
 */
export interface Task {
  id: number
  title: string
  description: string
  duration: number
}

/**
 * NewTask interface for creating tasks (without id)
 */
export interface NewTask extends Omit<Task, 'id'> {}
