import { addTask } from '../storage.js';
import { displayTask, displayError } from '../display.js';

export const handleAddCommand = async (args) => {
  const title = args._[1];
  const description = args.desc || '';

  if (!title) {
    displayError('Missing task title')
    // TODO: add explanation message
    return;;
  }

  try {
    const task = await addTask(title, description); 
    displayTask(task);
  } catch (e) {
    displayError(e.message);
  }
}