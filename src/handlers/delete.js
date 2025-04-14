import { displayError, displaySuccess } from "../display.js";
import { deleteTask } from "../storage.js";

export const handleDeleteCommand = async (args) => {
  const id = args._[1];
  
  if (!id) {
    displayError('Missing task ID');
    console.log('Usage: npx kanban complete <id>');
    return;
  }

  try {
    await deleteTask(id);
    displaySuccess('Task deleted successfully');
  } catch (e) {
    displayError(e.message);
  }  
}