import * as fs from 'fs';
import { writeFile, mkdir as mkDir, unlink} from 'fs/promises';
import { basename, dirname, join, resolve  } from 'path';
import { pipeline } from 'stream/promises';
export const cat = async (pathToFile) => {
    const rs = fs.createReadStream(pathToFile, {encoding: 'utf8'})
    rs.on('data', (chunk) => { 
      process.stdout.write(chunk) 
    }); 
     
    rs.on('end', () => {
        process.stdout.write('\n')
    });
     
    rs.on('error', (err) => {
        console.log(err)
        console.log("No such file");
    });

}
export const add = async (currDir, newFileName) => {
    try {
      const newFilePath = join(currDir, newFileName)
      await writeFile(newFilePath, '')
      console.log('File created successfully');
    } catch (error) {
        console.error(`Operation failed! Error going up: ${error.message}`);
    }
}
export const mkdir = async (currDir, newDirName) => {
    try {
      const newDirPath = join(currDir, newDirName)
      await mkDir(newDirPath, { recursive: true })
      console.log('Directory created successfully');

    } catch(error) {
        console.error(`Operation failed! Error going up: ${error.message}`);
    }
}
export const rn = (currDir, pathToFile, newFileName) => {
    const oldFilePath = resolve(currDir, pathToFile)
    const newFilePath = join(dirname(oldFilePath), newFileName)
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error('Operation failed! Error renaming file:', err);
      } else {
        console.log('File renamed successfully');
      }
    })
}
export const cp = (pathToFile, pathToNewDir) => {
    const sourcePath = basename(pathToFile);
    const destinationPath = join(pathToNewDir, sourcePath);
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(destinationPath); 

    readStream.pipe(writeStream);

    readStream.on('error', (err) => {
      console.error('Operation failed! Read error:', err);
    });
    
    writeStream.on('error', (err) => {
      console.error('Operation failed! Write error:', err);
    });
    
    writeStream.on('finish', () => {
      console.log('File copied successfully.');
    });
}
export const mv = async (pathToFile, pathToNewDir) => {
  try {
    const sourcePath = basename(pathToFile);
    const destinationPath = join(pathToNewDir, sourcePath);
    await pipeline(
      fs.createReadStream(pathToFile),
      fs.createWriteStream(destinationPath)
    );

    await unlink(pathToFile);
    console.log('File moved successfully.');

  } catch (error) {
    console.error(`Operation failed! Error going up: ${error.message}`);
  }
}
export const rm = async (pathToFile) => {
  try {
    await unlink(pathToFile)
    console.log('File deleted successfully.');

  } catch (error) {
    console.error(`Operation failed! Error going up: ${error.message}`);
  }
}