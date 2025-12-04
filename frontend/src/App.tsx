import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { Task } from './types/task'
import { apiService } from './services/api'

/**
 * Main application component
 * Manages the overall state and coordinates between TaskList and TaskForm
 */
function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  /**
   * Fetch all tasks from the API
   */
  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getTasks()
      setTasks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle task creation or update
   */
  const handleSaveTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      if (selectedTask) {
        // Update existing task
        await apiService.updateTask(selectedTask.id, taskData)
      } else {
        // Create new task
        await apiService.createTask(taskData)
      }
      await fetchTasks()
      setShowForm(false)
      setSelectedTask(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task')
    }
  }

  /**
   * Handle task deletion
   */
  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await apiService.deleteTask(id)
      await fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
    }
  }

  /**
   * Handle editing a task
   */
  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setShowForm(true)
  }

  /**
   * Handle closing the form
   */
  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedTask(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize and manage your tasks efficiently</p>
        </header>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task List */}
          <div className="lg:col-span-2">
            <TaskList
              tasks={tasks}
              loading={loading}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </div>

          {/* Task Form */}
          <div className="lg:col-span-1">
            {showForm || selectedTask ? (
              <TaskForm
                task={selectedTask}
                onSave={handleSaveTask}
                onClose={handleCloseForm}
              />
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                + New Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
