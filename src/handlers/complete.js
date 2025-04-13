import { completeTask } from "../storage.js";

export const handleCompleteCommand = async (args) => {
  const id = args._[1];
  
  if (!id) {
    console.error('Missing task ID');
    console.log('Usage: npx kanban complete <id>');
    return;
  }

  try {
    const task = await completeTask(id);
    console.log(`Task marked as complete`);
    console.log(task);
  } catch (e) {
    console.error(e.message);
  }
}