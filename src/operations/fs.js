import { writeFile } from 'fs/promises'; 
import { path } from "../utils/path.js"; 
import { createReadStream, createWriteStream } from 'fs';
import { resolve, dirname, join, basename } from 'path';
import fs from 'fs';
 
export async function cat(filePath) { 
 
 const readStream = createReadStream(filePath, { encoding: 'utf8' }); 
 
 readStream.on('data', (chunk) => { 
     process.stdout.write(chunk) 
 }); 
 
 readStream.on('end', () => { 
     process.stdout.write('\n'); 
 }); 
 
 readStream.on('error', () => { 
     console.error(`No such file`); 
 }); 
} 
 
export async function add(currentDir, fileName) { 

    const filePath = resolve(currentDir, fileName); 
     
    fs.writeFile(filePath, '', (err) => { 
        if (err) { 
            console.error('No such file');
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
            console.error('No such file');
        } else {
            console.log(`File ${oldFileName} renamed to ${newFileName} successfully in ${currentDir}`);
        }
    });
}
export function cp(sourceFilePath, destinationDir) {
    const sourceFile = basename(sourceFilePath);
    const destinationFile = join(destinationDir, sourceFile);

    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(destinationFile);

    readStream.pipe(writeStream);

    readStream.on('error', (err) => {
        console.error('Error reading source file:', err);
    });

    writeStream.on('error', (err) => {
        console.error('Error writing to destination file:', err);
    });

    writeStream.on('finish', () => {
        console.log(`File ${sourceFile} copied to ${destinationFile} successfully`);
    });
}

export async function mv(sourceFilePath, destinationDir) {
    if (!await path(sourceFilePath)) {
		throw new Error('Not correct path to original file');      
	} 
    if (!await path(destinationDir)) {
		throw new Error('Not correct path to destination file');      
	} 
    const sourceFile = resolve(sourceFilePath);
    const destinationFile = join(destinationDir, basename(sourceFile));

    const readStream = createReadStream(sourceFile);
    const writeStream = createWriteStream(destinationFile);

    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
        readStream.on('error', reject);
        writeStream.on('error', reject);
        writeStream.on('finish', () => {
            console.log('File is moved successfully')
            fs.unlink(sourceFile, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
}
export async function rm(filePath) {
    if (!await path(filePath)) {
		throw new Error('Not correct path');      
	} 
      return new Promise ((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            console.log('File is deleted successfully')
            if(err) {
                reject(err)
            } else {
                resolve()
            }
        })
      })
}