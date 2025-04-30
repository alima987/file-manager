import { readdir, stat } from 'fs/promises'; 
import { lstat } from 'fs/promises';
import { join, resolve } from 'path'; 

export const cd = async (currDir, path) => {
    if (!path) {
        console.log('No path specified');
        return currDir;
    }
    const absPath = resolve(currDir, path)
  try {
    const stat = await lstat(absPath)
    if (stat.isDirectory()) {
        return absPath
    } else {
        console.log(`Invalid directory`);
        return currDir
    }
  } catch (error) {
    console.log(`Operation failed! Error: ${error.message}`);
    return currDir
  }
}
export const ls = async(currDir) => {
    try {
      const files = await readdir(currDir);
      const table = []
      for (const file of files) {
        const filePath = join(currDir, file)
        const fileStat = await stat(filePath)
        table.push({
            Name: file,
            Type: fileStat.isDirectory() ? 'directory' : 'file'
        })
      }
      const sortedTable = table.sort((a, b) => {
        if (a.Type === b.Type) {
           return a.Name.localeCompare(b.Name)
        } else if (a.Type === 'directory') {
           return -1
        } else {
           return 1
        }
       })
      console.table(sortedTable)
    } catch(error) {
        console.error(`Operation failed! Error reading directory: ${error.message}`);
    }
}


