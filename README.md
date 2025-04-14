### CLI Kanban

A simple command line Kanban board for task management. 

### Version 

v0.1 (MVP)

### Tech Stack 

- JavaScript 
- Node.js (ES Modules)
- minimist (command-line argument parsing)
- Chalk (terminal output)

### Features 

- Initialize a project-specific Kanban board
- Create tasks with titles and optional descriptions
- View tasks organized by state (Todo, In Progress, Done)
- Move tasks between states
- Mark tasks as complete
- Delete tasks
- Local JSON storage (.kanban/tasks.json)

### Usage

```bash
# Initialize
kanban init

# Add tasks
kanban add "Task title" --desc "Optional description"

# List tasks
kanban list

# Update tasks
kanban move abc123 in_progress
kanban complete xyz789
kanban delete def456

# Help 
kanban -help
```

### License 

MIT