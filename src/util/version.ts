import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get package version
export const showVersion = async (): Promise<string> => {
  try {
    // Read package.json from the root directory (two level up from util/)
    const packagePath = path.join(__dirname, '..', '..', 'package.json');
    const packageJson = await readFile(packagePath, 'utf8');
    const { version } = JSON.parse(packageJson);
    return version;
  } catch (error) {
    console.error('Error reading package version:', error);
    return 'unknown';
  }
}