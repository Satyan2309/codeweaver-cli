import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Read a file safely and return its content as string.
 * @param {string} filePath - Path to the file
 * @returns {string|null} - File content or null if error
 */
export function readFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      console.log(chalk.red(`❌ File not found: ${absolutePath}`));
      return null;
    }
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return content;
  } catch (err) {
    console.log(chalk.red(`❌ Error reading file ${filePath}: ${err.message}`));
    return null;
  }
}

/**
 * Read all files in a folder recursively with specific extensions
 * @param {string} folderPath - Path to folder
 * @param {Array<string>} extensions - Array of extensions to filter (e.g., ['.js', '.ts'])
 * @returns {Array<{ path: string, content: string }>} - Array of file objects
 */
export function readFolder(folderPath, extensions = ['.js', '.ts', '.tsx']) {
  const files = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (extensions.includes(path.extname(entry.name))) {
        const content = readFile(fullPath);
        if (content !== null) {
          files.push({ path: fullPath, content });
        }
      }
    }
  }

  try {
    walk(path.resolve(folderPath));
  } catch (err) {
    console.log(chalk.red(`❌ Error reading folder ${folderPath}: ${err.message}`));
  }

  return files;
}
