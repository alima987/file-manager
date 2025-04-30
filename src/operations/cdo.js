import fs from 'fs';
import zlib from 'zlib';

export const compress = (pathToFile, pathToDest) => {
      const readStream = fs.createReadStream(pathToFile);
      const writeStream = fs.createWriteStream(pathToDest);
      
      const brotli = zlib.createBrotliCompress();

      readStream.on('error', (error) => {
        console.error(`Error reading readStream file: ${error.message}`);
        writeStream.destroy();
      });

      writeStream.on('error', (error) => {
          console.error(`Error writing writeStream file: ${error.message}`);
          readStream.destroy();
      });
  
      brotli.on('error', (error) => {
          console.error(`Operation failed! Error compressing file: ${error.message}`);
          readStream.destroy();
          writeStream.destroy();
      });
      
      const stream = readStream.pipe(brotli).pipe(writeStream);
      
      stream.on('finish', () => {
        console.log('Done compressing');
      });
}
export const decompress = (pathToFile, pathToDest) => {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToDest);
    
    const brotli = zlib.createBrotliDecompress();

    readStream.on('error', (error) => {
        console.error(`Error reading readStream file: ${error.message}`);
        writeStream.destroy();
    });

    writeStream.on('error', (error) => {
        console.error(`Error writing writeStream file: ${error.message}`);
        readStream.destroy();
    });

    brotli.on('error', (error) => {
        console.error(`Operation failed! Error decompressing file: ${error.message}`);
        readStream.destroy();
        writeStream.destroy();
    });

    
    const stream = readStream.pipe(brotli).pipe(writeStream);
    
    stream.on('finish', () => {
      console.log('Done decompressing');
    });
}