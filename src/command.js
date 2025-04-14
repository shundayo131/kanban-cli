// command handling logic
import minimist from 'minimist'
import { 
  handleAddCommand, 
  handleInitCommand, 
  handleListCommand, 
  handleMoveCommand,
  handleCompleteCommand,
  handleDeleteCommand, 
} from './handlers/index.js'
import { isInitialized } from './storage.js';
import { showHelp } from './util/showHelp.js';
import { showVersion } from './util/version.js';
import { displayError, displayInitInstructions } from './display.js';

const argv = minimist(process.argv.slice(2));

// Parse command line arguments 
const parseArg = () => {
  return minimist(process.argv.slice(2), {
    boolean: ['help', 'version'], // Flags
    string: ['desc'], // Treat as string 
    alias: {
      d: 'desc',
      h: 'help',
      v: 'version',
    }
  })
}

// Process command 
const processCommand = async (args) => {
  const command = args._[0];

  // Handle help and version flags 
  if (args.help) {
    showHelp();
    return;
  }

  if (args.version) {
    const version = await showVersion();
    console.log(`CLI kanban version: ${version}`);
    return;
  }

  // Rerutn error message if kanban is not initalized AND the command is not init or undefined
  const initialized = await isInitialized();
  if (!initialized && command !== 'init' && command !== 'undefined') {
    displayError('Kanban board has not been initalized.');
    displayInitInstructions();
    return;
  }

  // Process specific commands 
  switch (command) {
    // Init 
    case 'init':
      await handleInitCommand();
      break;

    // Add
    case 'add':
      await handleAddCommand(args);
      break;

    // list 
    case 'list':
      await handleListCommand(args);
      break;

    // move 
    case 'move':
      await handleMoveCommand(args);
      break;

    // complete 
    case 'complete':
      await handleCompleteCommand(args); 
      break;

    // delete
    case 'delete':
      await handleDeleteCommand(args);
      break;

    // undefined
    case undefined:
      // No command provided
      if (initialized) {
        // if already initialized, show all tasks by default 
        await handleListCommand(args);
      } else {
        // if not initialized, show help and init instruction 
        showHelp();
        displayInitInstructions();
      }
    
    // default 
    default:
      displayError(`Unknown command: ${command}`);
      showHelp();
      break;
  }
}

// Main function 
const main = async () => {
  try {
    const args = parseArg();
    await processCommand(args);
  } catch (e) {
    // Display error - to be updated 
    displayError({error: `${e}`}); 
  }
};

// Run the application
main();