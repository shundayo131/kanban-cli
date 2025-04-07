// JSON file storage operations 

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
    await fs.access(path.json(DATA_DIR, TASKS_FILE));
    return true;
  } catch {
    return false; 
  }
}