import { lstat } from 'fs/promises';
import { join, resolve } from 'path'; 
import { readdir, stat } from 'fs/promises'; 
 
export async function cd(currentDir, path) {
  const absPath = resolve(currentDir, path);

  try {
      const stats = await lstat(absPath);

      if (stats.isDirectory()) {
          return absPath;
      } else {
          console.error('Invalid directory path');
          return currentDir;
      }
  } catch (error) {
      if (error.code === 'ENOENT') {
          console.error('Directory does not exist');
      } else {
          console.error(`Error checking directory: ${error.message}`);
      }
      return currentDir;
  }
}
 
  export async function ls(currentDir) { 
    try { 
        const contents = await readdir(currentDir, { withFileTypes: true }); 
        const file = []; 
        for (const content of contents) { 
            const name = content.name; 
            const path = join(currentDir, name); 
            const stats = await stat(path); 
            if (stats.isDirectory()) { 
                file.push({ Name: name, Type: 'directory' }); 
              } else if (stats.isFile() && !stats.isSymbolicLink()) { 
                const fileName = `${name}`; 
                file.push({ Name: fileName, Type: 'file' }); 
              } 
        } 
        const sortedContents = file.sort(async (a, b) => { 
            if (a.Type === b.Type) { 
                return a.Name.localeCompare(b.Name); 
              } else if (a.Type === 'directory') { 
                return -1; 
              } else { 
                return 1; 
              } 
        }); 
        console.table(sortedContents); 
    } catch (error) { 
        console.log(`Error: ${error.message}`); 
    } 
}