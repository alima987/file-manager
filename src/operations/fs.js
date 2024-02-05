import { writeFile, rm as removeFile } from 'fs/promises'; 
import { createReadStream, createWriteStream, unlink } from 'fs';
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
    try {
        const filePath = resolve(currentDir, fileName);

        await writeFile(filePath, '');
        console.log(`Empty file ${fileName} created successfully in ${currentDir}`);
    } catch (error) {
        console.error(`No such file`);
    }
}
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

    readStream.on('error', () => {
        console.error('Error reading source file');
    });

    writeStream.on('error', () => {
        console.error('Error writing to destination file');
    });

    writeStream.on('finish', () => {
        console.log(`File ${sourceFile} copied to ${destinationFile} successfully`);
    });
}

export async function mv(sourceFilePath, destinationDir) {
    try {
        const sourceFile = resolve(sourceFilePath);
        const destinationFile = join(destinationDir, basename(sourceFile));

        const readStream = createReadStream(sourceFile);
        const writeStream = createWriteStream(destinationFile);

        readStream.pipe(writeStream);

        return new Promise((resolve, reject) => {
            readStream.on('error', reject);
            writeStream.on('error', reject);
            writeStream.on('finish', () => {
                console.log('File is moved successfully');
                unlink(sourceFile, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
    } catch (error) {
        console.error(`Error moving file`);
    }
}
export async function rm(filePath) {
    try {
        await removeFile(filePath);
        console.log('File is deleted successfully');
    } catch (error) {
        console.error(`Error deleting file`);
    }
}