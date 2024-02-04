import { access } from 'fs/promises';

export const path = async (pathToFile) => {
  try {
    await access(pathToFile);
    return true; 
  } catch {
    return false; 
  }
};