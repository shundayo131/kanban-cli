import { listTasks } from '../storage.js';

export const handleListCommand = async (args) => {
  const state = args._[1];

  // If state includes but not 'todo', 'in_progress', or 'done', return display error 
  if (state && !['todo', 'in_progress', 'done'].includes(state)) {
    console.error('Invalid state. Must be "todo", "in_progress", or "done"');
    return;
  }

  try {
    const tasks = await listTasks(state);   
    // display result 
    console.log('task list: ', tasks); // TODO: update with display function 
  } catch (e) {
    console.error('error": ', e);
  } 
}