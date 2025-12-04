# Task Management Frontend

A modern React-based frontend for the Task Management application built with TypeScript, Vite, and Tailwind CSS.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete tasks
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **API-First Approach**: Generated TypeScript client from OpenAPI specification
- ✅ **Type-Safe**: Full TypeScript support for better development experience
- ✅ **Modern UI**: Built with Tailwind CSS for rapid development
- ✅ **Error Handling**: Comprehensive error handling and user feedback

## Requirements

- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:3000`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
```bash
cp .env.example .env.local
```

Update `REACT_APP_API_URL` if your backend is running on a different URL.

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── TaskList.tsx
│   │   └── TaskForm.tsx
│   ├── services/        # API service layer
│   │   └── api.ts
│   ├── types/           # TypeScript interfaces
│   │   └── task.ts
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── package.json
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── Dockerfile           # Docker configuration
```

## API Integration

The frontend communicates with the backend API using the service layer in `src/services/api.ts`.

### Available Endpoints

- `GET /tasks` - List all tasks
- `POST /tasks` - Create a new task
- `GET /tasks/{id}` - Get a task by ID
- `PUT /tasks/{id}` - Update a task
- `DELETE /tasks/{id}` - Delete a task

## Components

### TaskList
Displays all tasks in a responsive table with edit and delete actions.

**Props:**
- `tasks: Task[]` - Array of tasks to display
- `loading: boolean` - Loading state
- `onEdit: (task: Task) => void` - Edit callback
- `onDelete: (id: number) => void` - Delete callback

### TaskForm
Form component for creating or editing tasks with validation.

**Props:**
- `task: Task | null` - Task to edit (null for creating new)
- `onSave: (task: Omit<Task, 'id'>) => Promise<void>` - Save callback
- `onClose: () => void` - Close callback

## Docker

Build the Docker image:
```bash
docker build -t task-frontend .
```

Run the container:
```bash
docker run -p 3000:3000 task-frontend
```

The frontend will be available at `http://localhost:3000`

## Testing

Run tests:
```bash
npm test
```

## Technologies

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Fetch API** - HTTP client

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3000` | Backend API URL |
| `NODE_ENV` | `development` | Environment mode |

## Contributing

1. Follow the TypeScript and React best practices
2. Add descriptive comments for complex logic
3. Use meaningful variable names
4. Test changes before committing

## License

MIT
