import { deleteTask } from "../storage.js";

export const handleDeleteCommand = async (args) => {
  const id = args._[1];
  
  if (!id) {
    console.error('Missing task ID');
    console.log('Usage: npx kanban complete <id>');
    return;
  }

  try {
    await deleteTask(id);
    console.log('Task deleted successfully');
  } catch (e) {
    console.error(e.message);
  }  
}