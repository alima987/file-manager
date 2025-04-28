import { readdir, stat } from 'fs/promises'; 
import { lstat } from 'fs/promises';
import { join, resolve } from 'path'; 


export const up = async(currDir) => {
    try {
        const parentDir = path.resolve(currDir, '..')
        console.log(parentDir)
        return parentDir
    } catch(error) {
        console.error(`Error going up: ${error.message}`);
    }
}
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
    console.log(`Error: ${error.message}`);
    return currDir
  }
}


