import { createReadStream } from "fs"; 
import { writeFile } from 'fs/promises'; 
import { path } from "../utils/path.js"; 
import { resolve, dirname, join } from 'path';
import fs from 'fs';
 
export async function cat(filePath) { 
 if (!await path(filePath)) { 
     console.error('No such file'); 
 } 
 
 const readStream = createReadStream(filePath, { encoding: 'utf8' }); 
 
 readStream.on('data', (chunk) => { 
     process.stdout.write(chunk) 
 }); 
 
 readStream.on('end', () => { 
     process.stdout.write('\n'); 
 }); 
 
 readStream.on('error', (error) => { 
     console.error(`Error reading file: ${error.message}`); 
 }); 
} 
 
export function add(currentDir, fileName) { 
    const filePath = resolve(currentDir, fileName); 
 
    if (path(filePath)) { 
     console.error('Such file already exists'); 
    }  
     
    writeFile(filePath, '', (err) => { 
        if (err) { 
            console.error('Error creating file:', err); 
        } else { 
            console.log(`Empty file ${fileName} created successfully in ${currentDir}`); 
        } 
    }); 
};

export function rn(currentDir, oldFileName, newFileName) {
    const oldFilePath = resolve(currentDir, oldFileName);
    const newFilePath = join(dirname(oldFilePath), newFileName);

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
        } else {
            console.log(`File ${oldFileName} renamed to ${newFileName} successfully in ${currentDir}`);
        }
    });
}