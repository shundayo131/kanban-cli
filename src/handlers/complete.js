import { displayError, displaySuccess, displayTask } from "../display.js";
import { completeTask } from "../storage.js";

export const handleCompleteCommand = async (args) => {
  const id = args._[1];
  
  if (!id) {
    displayError('Missing task ID');
    console.log('Usage: npx kanban complete <id>');
    return;
  }

  try {
    const task = await completeTask(id);
    displaySuccess(`Task marked as complete`);
    displayTask(task);
  } catch (e) {
    displayError(e.message);
  }
}