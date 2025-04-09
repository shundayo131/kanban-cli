// JSON file storage operations 

import { error } from 'console';
import fs from 'fs/promises';
import path from 'path';

// Configuration 
const DATA_DIR = '.kanban';
const TASKS_FILE = 'tasks.json'

// Generate a random ID for task 
const generateId = () => {
  return Math.random().toString(36).substring(2, 8);
}

// Initalize storage 
export const init = async () => {
  console.log('init function in storage is called')
  try {
    // Check if directory exists, create if not
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR);
    }
    
    // Check if tasks file exists. create if not.
    const tasksPath = path.join(DATA_DIR, TASKS_FILE);
    try {
      await fs.access(tasksPath);
    } catch {
      await fs.writeFile(tasksPath, JSON.stringify([]));
    }

    return {
      success: true,
      message: 'kanban board initialized successfully.'
    };
  
  } catch (e) {
    return { 
      success: false, 
      message: `Failed to initialize kanban board: ${error.message}`
    }; 
  }
}

// Check if kanban is initialized
export const isInitialized = async () => {
  try {
    await fs.access(DATA_DIR);
    await fs.access(path.join(DATA_DIR, TASKS_FILE));
    return true;
  } catch {
    return false; 
  }
}

// Helper function to check if kanban is initialized
const ensureInitialized = async () => {
  console.log('ensureInitiated called')
  try {
    await fs.access(DATA_DIR);
    await fs.access(path.join(DATA_DIR, TASKS_FILE));
  } catch {
    throw new Error('Kanban board is not initialized. Run "npx kanban init" first.');
  }
}

// Read tasks in file 
const readTasks = async () => {
  try {
    const tasksPath = path.join(DATA_DIR, TASKS_FILE);
    console.log('tasksPath in readTasks: ', tasksPath)
    const data = await fs.readFile(tasksPath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    throw new Error(`Cound not read tasks: ${e.message}`);
  }
}

// Write tasks to file 
const writeTasks = async (tasks) => {
  try {
    const tasksPath = path.join(DATA_DIR, TASKS_FILE);
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  } catch (e) {
    throw new Error(`Could not write tasks: ${error.message}`);
  }
}

// Add task to task table 
export const addTask = async (title, description) => {
  try {
    // Check if kanban is initalized 
    await ensureInitialized();
  
    const tasks = await readTasks();
  
    const newTask = {
      id: generateId(),
      title,
      description,
      state: 'todo',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  
    tasks.push(newTask);
    await writeTasks(tasks);

    return newTask;
  } catch (e) {
    throw e;
  }
}

// List tasks per status, optionally with state 
export const listTasks = async (state = null) => {
  try {
    // check if kanban is initialized
    await ensureInitialized();

    // Get all tasks
    const tasks = await readTasks();

    // Filter tasks by state 
    if (state) {
      console.log('filtering')
      return tasks.filter(task => task.state === state);
    }

    return tasks;
  } catch (e) {
    throw e;
  } 
}