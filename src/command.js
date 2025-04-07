// command handling logic
import minimist from 'minimist'
import { handleInitCommand } from './handlers/index.js'

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

  // Check if initialized for commands that require it
  

  // Process specific commands 
  switch (command) {
    // Init 
    case 'init':
      console.log('init case is hit')
      handleInitCommand();
      break;

    case 'add':
      // TODO 
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


    // undefined
      // if already initialized, show all tasks by default 


      // if not initialized, show help and init instruction 
    
    // default 
      // display error and help 

  }

}

// Main 
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