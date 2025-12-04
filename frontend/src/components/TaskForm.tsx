import { useState, useEffect } from 'react'
import { Task } from '../types/task'

interface TaskFormProps {
  task: Task | null
  onSave: (task: Omit<Task, 'id'>) => Promise<void>
  onClose: () => void
}

/**
 * TaskForm component for creating or editing tasks
 * @param task Task to edit (null for creating new)
 * @param onSave Callback when saving task
 * @param onClose Callback when closing form
 */
export default function TaskForm({ task, onSave, onClose }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 60,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Populate form when editing
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        duration: task.duration,
      })
    }
  }, [task])

  /**
   * Handle form input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value,
    }))
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }
    if (formData.duration <= 0) {
      setError('Duration must be greater than 0')
      return
    }

    try {
      setLoading(true)
      await onSave(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {task ? 'Edit Task' : 'New Task'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration (minutes) *
          </label>
          <input
            id="duration"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            placeholder="Enter duration in minutes"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        <div className="flex space-x-2 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition duration-150"
          >
            {loading ? 'Saving...' : 'Save Task'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-150"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
