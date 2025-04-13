import { addTask } from '../storage.js';

export const handleAddCommand = async (args) => {
  const title = args._[1];
  const description = args.desc || '';

  if (!title) {
    // error
    console.error('Missing task title')
    // TODO: add explanation message
    return;;
  }

  try {
    const task = await addTask(title, description); 
    console.log(task);
  } catch (e) {
    console.error('error: ', e);
  }
}