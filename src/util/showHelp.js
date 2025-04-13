// Show help message
export const showHelp = () => {
  console.log
  (`
    CLI Kanban - Simple task management for your projects

    USAGE:
      npx kanban <command> [options]

    COMMANDS:
      init                    Initialize kanban board in current directory
      add <title>             Add a new task
        --desc, -d            Task description

      list [state]            List all tasks
                              state can be: todo, in_progress, done

      move <id> <state>       Move a task to a different state
                              state must be: todo, in_progress, done

      complete <id>           Mark a task as complete (shortcut for move <id> done)

      delete <id>             Delete a task

      help                    Show this help message
      version                 Show version

    EXAMPLES:
      npx kanban init
      npx kanban add "Implement login form" --desc "Create UI and validation"
      npx kanban list
      npx kanban list todo
      npx kanban move abc123 in_progress
      npx kanban complete xyz789
      `
  );
}
