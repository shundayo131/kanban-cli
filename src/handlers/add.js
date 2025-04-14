import { addTask } from '../storage.js';
import { displayTask, displayError, displaySuccess } from '../display.js';

export const handleAddCommand = async (args) => {
  const title = args._[1];
  const description = args.desc || '';
  
  if (!title) {
    displayError('Missing task title')
    console.log('Usage: npx kanban add "Task title" [--desc "Task description"]');
    return;
  }

  try {
    const task = await addTask(title, description); 
    displaySuccess('Task added successfully');
    displayTask(task);
  } catch (e) {
    displayError(e.message);
  }
}