import { displaySuccess } from '../display.js';
import { init } from '../storage.js'

export const handleInitCommand = async () => {
  console.log('handleInitCommand is caled');
  try {
    const result = await init();
  
    if (result.success) {
      displaySuccess(result.message);
      console.log('\nYou can now add tasks with: ');
      console.log(' npx kanban add "Task title" --desc "Task description"');
    } else {
      displayError(result.message);
    }
  } catch (e) {
    displayError(e.message);
  }
}