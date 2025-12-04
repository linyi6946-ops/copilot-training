import { Task } from '../types/task'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

/**
 * TaskList component displays all tasks in a responsive table
 * @param tasks Array of tasks to display
 * @param loading Loading state
 * @param onEdit Callback when editing a task
 * @param onDelete Callback when deleting a task
 */
export default function TaskList({ tasks, loading, onEdit, onDelete }: TaskListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-500 py-8">No tasks yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Duration (min)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {task.description || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.duration}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="inline-block px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="inline-block px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition duration-150"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
