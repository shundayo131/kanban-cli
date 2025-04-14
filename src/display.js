import chalk from 'chalk';

// Color mapping for different states
const stateColors = {
  todo: chalk.yellow,
  in_progress: chalk.blue,
  done: chalk.green
};

// Format a single task 
const formatTask = (task) => {
  const stateColor = stateColors[task.state] || chalk.white;
  return `${chalk.bold(task.id)} ${stateColor(`[${task.state}]`)} ${task.title}`;
}

// Display a single task with details
export const displayTask = (task) => {
  console.log(formatTask(task));
  
  if (task.description) {
    console.log(`  Discription: ${chalk.gray(task.description)}`);
  }
  
  console.log(`  ${chalk.dim(`Created: ${new Date(task.created_at).toLocaleString()}`)}`);
  
  if (task.created_at !== task.updated_at) {
    console.log(`  ${chalk.dim(`Updated: ${new Date(task.updated_at).toLocaleString()}`)}`);
  }
  
  console.log('');
}

// Display a list of tasks
export const displayTaskList = (tasks, state = null) => {
  if (tasks.length === 0) {
    if (state) {
      console.log(chalk.dim(`No tasks in ${state} state.`));
    } else {
      console.log(chalk.dim('No tasks found.'));
    }
    return;
  }

  // Group tasks by state if no specific state is specified
  if (!state) {
    // Find all tasks in 'todo' state
    const todoTasks = tasks.filter(task => task.state === 'todo');
    if (todoTasks.length > 0) {
      console.log(`\n${chalk.yellow.bold('📋 TODO:')}`);
      todoTasks.forEach(task => {
        console.log(`  ${chalk.bold(task.id)} ${task.title}`);
      });
    }

    // Find all tasks in 'in_progress' state
    const inProgressTasks = tasks.filter(task => task.state === 'in_progress');
    if (inProgressTasks.length > 0) {
      console.log(`\n${chalk.blue.bold('🔄 IN PROGRESS:')}`);
      inProgressTasks.forEach(task => {
        console.log(`  ${chalk.bold(task.id)} ${task.title}`);
      });
    }

    // Find all tasks in 'done' state
    const doneTasks = tasks.filter(task => task.state === 'done');
    if (doneTasks.length > 0) {
      console.log(`\n${chalk.green.bold('✅ DONE:')}`);
      doneTasks.forEach(task => {
        console.log(`  ${chalk.bold(task.id)} ${task.title}`);
      });
    }
  } else {
    // Display tasks for a specific state
    const stateColor = stateColors[state] || chalk.white;
    console.log(`\n${stateColor.bold(`Tasks in ${state} state:`)}`);
    
    tasks.forEach(task => {
      console.log(`  ${chalk.bold(task.id)} ${task.title}`);
      if (task.description) {
        console.log(`    ${chalk.gray(task.description)}`);
      }
    });
  }
  
  console.log(''); // Add a blank line for better readability
}

// Display success message
export const displaySuccess = (message) => {
  console.log(`${chalk.green('✓')} ${message}`);
}

// Display error message
export const displayError = (message) => {
  console.error(`${chalk.red('✗')} ${message}`);
}

// Display initialization instructions
export const displayInitInstructions = () => {
  console.log(`\nTo get started with the kanban board, run:`);
  console.log(`  ${chalk.cyan('npx kanban init')}`);
  console.log(`\nThis will set up a kanban board in your current directory.`);
}