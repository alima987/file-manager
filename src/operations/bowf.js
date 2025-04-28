import * as fs from 'fs';
import { writeFile, mkdir as mkDir} from 'fs/promises';
import { join  } from 'path';
export const cat = async (pathToFile) => {
  try {
    const rs = fs.createReadStream(pathToFile, {encoding: 'utf8'})
    rs.on('data', function(chunk) {
        process.stdout.write(chunk)
     });
     
     rs.on('end',function() {
        process.stdout.write('\n')
     });
     
     rs.on('error', (err) => {
        console.log(err)
        console.log("No such file");
     });

  } catch (error) {
    console.error(`Error going up: ${error.message}`);
  }
}
export const add = async (currDir, newFileName) => {
    try {
      const newFilePath = join(currDir, newFileName)
      const newFile = await writeFile(newFilePath, '')
      console.log('File created successfully');
      return newFile
    } catch (error) {
        console.error(`Error going up: ${error.message}`);
    }
}
export const mkdir = async (currDir, newDirName) => {
    try {
      const newDirPath = join(currDir, newDirName)
      const newDir = await mkDir(newDirPath, { recursive: true })
      console.log('Directory created successfully');
      return newDir

    } catch(error) {
        console.error(`Error going up: ${error.message}`);
    }
}