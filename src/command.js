// command handling logic
import minimist from 'minimist'
import { handleAddCommand, handleInitCommand } from './handlers/index.js'
import { isInitialized } from './storage.js';

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
    // TODO: Call showHelp function
    console.log('Calling showHelp to display help')
    return;
  }

  if (args.version) {
    // TODO: Call showVersion function 
    console.log('Calling showVersion to display version')
  }

  // Rerutn error message if kanban is not initalized AND the command is not init or undefined
  const initialized = await isInitialized();
  if (!initialized && command !== 'init' && command !== 'undefined') {
    console.error('Kanban board has not been initalized.');
    // TODO: display instruction 
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
      // TODO 
      break;

    // move 
    case 'move':
      // TODO 
      break;

    // complete 
    case 'complete':
      // TODO 
      break;

    // delete
    case 'delete':
      // TODO 
      break;

    // undefined
      // if already initialized, show all tasks by default 

      // if not initialized, show help and init instruction 
    
    // default 
      // display error and help 

  }

}

// Main function 
const main = async () => {
  try {
    const args = parseArg();
    await processCommand(args);
  } catch (e) {
    // Display error - to be updated 
    console.error({error: `${e}`}); 
  }
};

// Run the application
main();