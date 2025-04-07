import { addTask } from '../storage.js';

export const handleAddCommand = async (args) => {
  const title = args._[1];
  const description = args.desc || '';

  console.log('args: ', args);
  console.log('title', title);

  // TODO: resolve error - no description passed.
  // Also see error in the add operation

  if (!title) {
    // error
    console.error('Missing task title')
    // TODO: add explanation message
    return;
  }

  try {
    const task = await addTask(title, description); 
    console.log('task added successfully.')
    console.log('task: ', task);
  } catch (e) {
    console.error('error: ', e);
  }
}