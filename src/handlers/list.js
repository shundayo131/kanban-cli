import { listTasks } from '../storage.js';
import { displayTaskList, displayError } from '../display.js';

export const handleListCommand = async (args) => {
  const state = args._[1];

  // If state includes but not 'todo', 'in_progress', or 'done', return display error 
  if (state && !['todo', 'in_progress', 'done'].includes(state)) {
    displayError('Invalid state. Must be "todo", "in_progress", or "done"');
    return;
  }

  try {
    const tasks = await listTasks(state);   
    displayTaskList(tasks, state); 
  } catch (e) {
    displayError(e.message);
  } 
}