import { moveTask } from "../storage.js";
import { displayError, displaySuccess, displayTask } from "../display.js";

export const handleMoveCommand = async (args) => {
  // Receive task id and state 
  const id = args._[1];
  const state = args._[2];

  if (!id) {
    displayError('missing task ID');
    console.log('Usage: npx kanbdan move <id> <state>');
  }

  // if there is no state, return error 
  if (!state) {
    displayError('missing state');
    console.log('Usage: npx kanbdan move <id> <state>');
  }

  // if state is not correct, return error 
  if (!['todo', 'in_progress', 'done'].includes(state)) {
    displayError('Invalid state. Must be "todo", "in_progress", or "done"');
    return;
  }

  // call moveTask by passing task id and state 
  try {
    const task = await moveTask(id, state)
    displaySuccess(`Task moved to ${state}`);
    displayTask(task);
  } catch (e) {
    displayError(e.message);
  }
}
