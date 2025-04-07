import { init } from '../storage.js'

export const handleInitCommand = async () => {
  console.log('handleInitCommand is caled');
  try {
    const result = await init();
  
    if (result.success) {
      console.log('You can now add tasks with: ');
      console.log('npx kanban add "Task title" --desc "Task description"');
    } else {
      console.log('error', error.message)
    }
  } catch (e) {
    console.log('error', error.message)
  }
}