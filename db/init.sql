-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on title for faster queries
CREATE INDEX IF NOT EXISTS idx_tasks_title ON tasks(title);

-- Insert sample data
INSERT INTO tasks (title, description, duration) VALUES
    ('Setup development environment', 'Install all necessary tools and dependencies', 120),
    ('Design database schema', 'Create and review database structure', 180),
    ('Implement API endpoints', 'Build RESTful API for task management', 240);
